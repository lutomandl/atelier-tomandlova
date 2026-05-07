import { POSTERS_BUCKET, getSupabase } from '$lib/supabaseClient';

type PosterUploadResult = {
  posterPath: string;
};

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_LONG_EDGE = 2000;
const PDF_RENDER_SCALE = 2;

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function canvasToWebpBlob(source: HTMLCanvasElement): Promise<Blob> {
  const longEdge = Math.max(source.width, source.height);
  const scale = longEdge > MAX_LONG_EDGE ? MAX_LONG_EDGE / longEdge : 1;

  let canvas: HTMLCanvasElement = source;
  if (scale < 1) {
    const targetWidth = Math.round(source.width * scale);
    const targetHeight = Math.round(source.height * scale);
    canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Prohlížeč nepodporuje canvas');
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  }

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/webp', 0.86)
  );
  if (!blob) throw new Error('Konverze do WebP se nepovedla');
  return blob;
}

async function imageFileToCanvas(file: File): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Prohlížeč nepodporuje canvas');
  ctx.drawImage(bitmap, 0, 0);
  return canvas;
}

async function pdfFileToCanvas(file: File): Promise<HTMLCanvasElement> {
  const pdfjs = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const data = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data }).promise;
  try {
    const page = await doc.getPage(1);
    const viewport = page.getViewport({ scale: PDF_RENDER_SCALE });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvas, viewport }).promise;
    return canvas;
  } finally {
    await doc.destroy();
  }
}

export async function uploadPoster(file: File): Promise<PosterUploadResult> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase není nastavený');

  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isPdf && !isImage) {
    throw new Error('Plakát musí být JPG, PNG, WebP nebo PDF');
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Plakát je větší než 10 MB');
  }

  const sourceCanvas = isPdf ? await pdfFileToCanvas(file) : await imageFileToCanvas(file);
  const uploadBody = await canvasToWebpBlob(sourceCanvas);

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');

  const fileBase = safeFileName(file.name.replace(/\.[^.]+$/, ''));
  const path = `events/${yyyy}/${mm}/${crypto.randomUUID()}-${fileBase}.webp`;

  const { error } = await supabase.storage.from(POSTERS_BUCKET).upload(path, uploadBody, {
    upsert: true,
    contentType: 'image/webp',
  });

  if (error) throw new Error(error.message);

  return { posterPath: path };
}
