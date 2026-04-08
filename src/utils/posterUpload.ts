import { POSTERS_BUCKET, getSupabase } from '$lib/supabaseClient';

type PosterUploadResult = {
  posterPath: string;
};

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function imageFileToWebpBlob(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/webp', 0.86)
  );
  if (!blob) throw new Error('WebP conversion failed');
  return blob;
}

export async function uploadPoster(file: File): Promise<PosterUploadResult> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase not configured');

  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isImage) {
    throw new Error('Poster must be JPG, PNG, or WebP');
  }

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');

  let uploadBody: Blob | File = file;
  let posterMime = file.type || ('image/webp');
  let ext = 'webp';

  // Convert JPG/PNG to WebP
  if (file.type !== 'image/webp') {
    uploadBody = await imageFileToWebpBlob(file);
    posterMime = 'image/webp';
    ext = 'webp';
  }

  const fileBase = safeFileName(file.name.replace(/\.[^.]+$/, ''));
  const path = `events/${yyyy}/${mm}/${crypto.randomUUID()}-${fileBase}.${ext}`;

  const { error } = await supabase.storage.from(POSTERS_BUCKET).upload(path, uploadBody, {
    upsert: true,
    contentType: posterMime,
  });

  if (error) throw new Error(error.message);

  return { posterPath: path };
}
