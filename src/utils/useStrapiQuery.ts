import { gql, rawRequest } from 'graphql-request';

export default async function getEvents(
  filter: 'gte' | 'lt',
  sort: 'asc' | 'desc',
  paginationStart?: number,
  paginationlimit?: number
): Promise<{ events: EventObject[]; meta: StrapiMetaData } | null> {
  const today = new Date().toISOString().split('T')[0];
  const filterQuery = `{
    or: [
      {From: {${filter}: "${today}"}},
      {To: {${filter}: "${today}"}}
    ]
    }`;
  const sortQuery = `"From:${sort}"`;

  const query = gql`
    query Events {
      events  (
        filters: ${filterQuery},
        sort: ${sortQuery},
        pagination: {
          start: ${paginationStart || 0}
          limit: ${paginationlimit || 100}
        }
      ) {
        data {
          id
          attributes {
            Title
            Description
            Place
            From
            To
            StartingTime
            Poster {
              data {
                attributes {
                  alternativeText
                  url
                  width
                  height
                  formats
                }
              }
            }
          }
        }
        meta {
          pagination {
            page
            pageSize
            pageCount
            total
          }
        }
      }
    }
  `;

  const { status, data, errors } = await rawRequest<EventsData>(
    `${import.meta.env.VITE_STRAPI_URL}/graphql`,
    query
  );

  if (status !== 200) {
    console.error(`Error fetching events: ${JSON.stringify(errors)}`);
    return null;
  }

  return {
    events: data.events.data,
    meta: data.events.meta,
  };
}

interface EventsData {
  events: {
    data: EventObject[];
    meta: StrapiMetaData;
  };
}

export interface EventObject {
  id: number;
  attributes: {
    Title: string | null;
    Description: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
    Place: string | null;
    From: string | null;
    StartingTime: string | null;
    To: string | null;
    Poster?: {
      data?: {
        id?: number;
        attributes?: PosterObject | null;
      } | null;
    } | null;
  };
}

export interface StrapiMetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface PosterObject {
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  } | null;
  hash: string | null;
  ext: string | null;
  mime: string | null;
  size: number | null;
  url: string | null;
  previewUrl: string | null;
  provider: string | null;
  provider_metadata: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
