import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const POSTERS_BUCKET =
  (import.meta.env.VITE_SUPABASE_POSTERS_BUCKET as string | undefined) || 'posters';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

export function getPosterPublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const client = getSupabase();
  if (!client) return null;
  const { data } = client.storage.from(POSTERS_BUCKET).getPublicUrl(path);
  return data.publicUrl || null;
}
