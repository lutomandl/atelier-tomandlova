import { SITE_URL, allRouteEntries } from '../../utils/routes';

/**
 * Static XML sitemap. Lists every public page once. Prerendered at build time
 * so it ships as a real `/sitemap.xml` file under the build output.
 *
 * `lastmod` uses the build date (YYYY-MM-DD) — accurate enough as a "this
 * site was last updated around here" hint, and renews on every redeploy.
 */
export const prerender = true;

export const GET = async () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allRouteEntries()
      .map(({ path }) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
