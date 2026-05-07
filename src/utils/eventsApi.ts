import { getSupabase } from '../lib/supabaseClient';

export type EventsFilter = 'gte' | 'lt';
export type EventsSort = 'asc' | 'desc';

export default async function getEvents(
  filter: EventsFilter,
  sort: EventsSort,
  paginationStart?: number,
  paginationLimit?: number
): Promise<{ events: EventObject[]; meta: PaginationMeta } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const today = new Date().toISOString().split('T')[0];
  const start = paginationStart || 0;
  const limit = paginationLimit || 100;

  // Upcoming:
  //   from_date >= today OR to_date >= today
  // Past:
  //   from_date < today OR to_date < today
  const op = filter === 'gte' ? 'gte' : 'lt';
  const dateOr = `from_date.${op}.${today},to_date.${op}.${today}`;

  const { data, error, count } = await supabase
    .from('events')
    .select('id,title,description,place,from_date,to_date,poster_path', {
      count: 'exact',
    })
    .eq('published', true)
    .or(dateOr)
    .order('from_date', { ascending: sort === 'asc', nullsFirst: false })
    .range(start, start + limit - 1);

  if (error) {
    console.error(`Error fetching events: ${error.message}`);
    return null;
  }

  const total = count || 0;
  const pageSize = limit;
  const page = Math.floor(start / pageSize) + 1;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return {
    events: (data || []).map((row) => ({
      id: row.id,
      attributes: {
        Title: row.title ?? null,
        Description: row.description ?? null,
        Place: row.place ?? null,
        From: row.from_date ?? null,
        To: row.to_date ?? null,
        PosterPath: row.poster_path ?? null,
      },
    })),
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
}

export interface EventObject {
  id: string;
  attributes: {
    Title: string | null;
    Description: string | null;
    Place: string | null;
    From: string | null;
    To: string | null;
    PosterPath: string | null;
  };
}

export interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
