/**
 * Runs once when the server starts, which is after every deploy. A minute
 * later it tells Bing (which also feeds Copilot and ChatGPT search) and
 * the other IndexNow engines about every page in the sitemap, so new and
 * changed pages are seen in minutes. Only public page addresses are sent.
 * The key file that proves we own the site is public/<key>.txt.
 */

const INDEXNOW_KEY = 'e287c961d828dc2ff4478821e5412a39';
const HOST = 'hopebegins.today';

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NODE_ENV !== 'production') return;
  if (process.env.NEXT_PHASE === 'phase-production-build') return;

  setTimeout(async () => {
    try {
      const { default: sitemap } = await import('./app/sitemap');
      const urlList = sitemap()
        .map((entry) => entry.url)
        .filter((url) => new URL(url).hostname === HOST);
      if (urlList.length === 0) return;
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
      });
      console.log(
        `IndexNow: ${urlList.length} pages, answered ${response.status}`
      );
    } catch (error) {
      console.error('IndexNow ping failed:', error);
    }
  }, 60_000);
}
