import { POSTERS_BUCKET, getSupabase } from '$lib/supabaseClient';

type PosterUploadResult = {
  posterPath: string;
};

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_LONG_EDGE = 2000;

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function imageFileToWebpBlob(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

  const longEdge = Math.max(bitmap.width, bitmap.height);
  const scale = longEdge > MAX_LONG_EDGE ? MAX_LONG_EDGE / longEdge : 1;
  const targetWidth = Math.round(bitmap.width * scale);
  const targetHeight = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Prohlížeč nepodporuje canvas');
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/webp', 0.86)
  );
  if (!blob) throw new Error('Konverze do WebP se nepovedla');
  return blob;
}

export async function uploadPoster(file: File): Promise<PosterUploadResult> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase není nastavený');

  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isImage) {
    throw new Error('Plakát musí být JPG, PNG nebo WebP');
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Plakát je větší než 10 MB');
  }

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');

  const uploadBody: Blob = await imageFileToWebpBlob(file);
  const posterMime = 'image/webp';
  const ext = 'webp';

  const fileBase = safeFileName(file.name.replace(/\.[^.]+$/, ''));
  const path = `events/${yyyy}/${mm}/${crypto.randomUUID()}-${fileBase}.${ext}`;

  const { error } = await supabase.storage.from(POSTERS_BUCKET).upload(path, uploadBody, {
    upsert: true,
    contentType: posterMime,
  });

  if (error) throw new Error(error.message);

  return { posterPath: path };
}
