import type { Handle } from '@sveltejs/kit';

/**
 * Inject `<meta name="robots" content="noindex,nofollow">` on `/admin/*`
 * responses so accidental crawls (or external links bypassing the
 * `Disallow: /admin/` in `robots.txt`) don't get indexed.
 *
 * Necessary because `src/routes/admin/+layout.ts` sets `ssr = false`, which
 * bypasses the entire SSR pipeline including any `<svelte:head>` blocks the
 * root layout would emit. `transformPageChunk` runs on the final response
 * HTML *after* SSR is decided, so it works for both SSR and shell-only
 * (CSR-only) routes.
 */
export const handle: Handle = async ({ event, resolve }) => {
  const isAdmin = event.url.pathname.startsWith('/admin');

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      if (isAdmin && !/name=["']robots["']/.test(html)) {
        return html.replace(
          '</head>',
          '    <meta name="robots" content="noindex,nofollow" />\n  </head>',
        );
      }
      return html;
    },
  });
};
