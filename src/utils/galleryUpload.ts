import { GALLERY_BUCKET, getSupabase } from '$lib/supabaseClient';

type GalleryUploadResult = {
  imagePath: string;
};

// Source file cap — only protects against truly absurd uploads (the
// browser-side WebP conversion below shrinks anything reasonable to a
// few hundred KB before it ever leaves the page). 50 MB covers DSLR
// JPEGs and full-resolution phone photos.
const MAX_FILE_BYTES = 50 * 1024 * 1024;
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

export async function uploadGalleryImage(
  file: File,
  albumId: string
): Promise<GalleryUploadResult> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase není nastavený');
  if (!albumId) throw new Error('Album ID chybí');

  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isImage) {
    throw new Error('Obrázek musí být JPG, PNG nebo WebP');
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Obrázek je větší než 50 MB');
  }

  const uploadBody: Blob = await imageFileToWebpBlob(file);
  const imageMime = 'image/webp';
  const ext = 'webp';

  const fileBase = safeFileName(file.name.replace(/\.[^.]+$/, ''));
  const path = `gallery/albums/${albumId}/${crypto.randomUUID()}-${fileBase}.${ext}`;

  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, uploadBody, {
    upsert: true,
    contentType: imageMime,
  });

  if (error) throw new Error(error.message);

  return { imagePath: path };
}
