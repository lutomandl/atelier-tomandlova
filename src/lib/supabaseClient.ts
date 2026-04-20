import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const POSTERS_BUCKET =
  (import.meta.env.VITE_SUPABASE_POSTERS_BUCKET as string | undefined) || 'posters';

export const IMAGE_TRANSFORMS_ENABLED =
  (import.meta.env.VITE_SUPABASE_IMAGE_TRANSFORMS as string | undefined) === '1';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

type PosterUrlOptions = { width?: number };

export function getPosterPublicUrl(
  path: string | null | undefined,
  options: PosterUrlOptions = {}
): string | null {
  if (!path) return null;
  const client = getSupabase();
  if (!client) return null;

  const transform =
    IMAGE_TRANSFORMS_ENABLED && options.width
      ? { transform: { width: options.width, resize: 'contain' as const } }
      : undefined;

  const { data } = client.storage.from(POSTERS_BUCKET).getPublicUrl(path, transform);
  return data.publicUrl || null;
}

// Relies on RLS on `admins` limiting SELECT to `auth.uid() = user_id`.
// Non-admins see zero rows; admins see their own row.
export async function isAdmin(): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;
  const { data, error } = await client.from('admins').select('user_id').limit(1);
  if (error) return false;
  return (data ?? []).length > 0;
}
