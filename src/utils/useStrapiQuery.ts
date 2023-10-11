import request, { gql, rawRequest } from 'graphql-request';

export default async function getEvents(filter: string): Promise<EventObject[]> {
  const query = gql`
    query Events {
      events (${filter ? `filters: ${filter}` : ''}) {
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
      }
    }
  `;

  const { status, data, errors } = await rawRequest<EventsData>(
    'http://localhost:1337/graphql',
    query
  );

  if (status !== 200) {
    console.error(`Error fetching events: ${JSON.stringify(errors)}`);
    return [];
  }

  return data.events.data;
}

interface EventsData {
  events: {
    data: EventObject[];
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
