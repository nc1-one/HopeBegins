/*
 * HopeBegins offline support. Keeps copies of the site's own pages and
 * files so the home-screen app opens the plan and the tools without data.
 *
 * - Pages: from the network first, so people always get the latest; the
 *   saved copy is used only when there is no connection.
 * - Built files (/_next/static, which never change once published): saved
 *   the first time they load.
 * - Never touched: the API and other sites, admin, carrier and sign-in
 *   pages. Nothing from the server's API is ever saved here, and the plan
 *   stays in the browser's own storage as before.
 */
const PAGES = 'hb-pages-v1';
const FILES = 'hb-files-v1';
const MAX_FILES = 150;
// Saved up front, so the installed app (which opens /action-plan) works
// offline even before those pages are visited again.
const PRECACHE = ['/', '/action-plan'];
const SKIP = /^\/(admin|carrier|login|reset-password|api)(\/|$)/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Go easy on prepaid data: with data saver on, save pages only as they are visited.
      const saveData = self.navigator?.connection?.saveData === true;
      if (!saveData) {
        const pages = await caches.open(PAGES);
        const files = await caches.open(FILES);
        const saving = Promise.all(
          PRECACHE.map(async (path) => {
            try {
              const response = await timedFetch(path);
              if (!response) return;
              if (!response.ok || response.redirected) return;
              const html = await response.clone().text();
              await pages.put(path, response);
              // Route groups like (public) are part of the file names.
              const assets = new Set(
                (html.match(/\/_next\/static\/[^"'\s\\<>{}]+/g) ?? []).map(
                  (url) => url.replace(/\)+$/, '')
                )
              );
              await Promise.all(
                [...assets].map(async (url) => {
                  const asset = await timedFetch(url);
                  if (asset?.ok) await files.put(url, asset);
                })
              );
            } catch {
              // Offline during install: these pages are saved on the next visit.
            }
          })
        );
        // Whatever isn't saved in 20 seconds is saved on the next visit.
        await Promise.race([
          saving,
          new Promise((resolve) => setTimeout(resolve, 20000)),
        ]);
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = [PAGES, FILES];
      for (const key of await caches.keys()) {
        if (key.startsWith('hb-') && !keep.includes(key)) await caches.delete(key);
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || SKIP.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(page(request, url));
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(file(request));
  }
});

// A slow or stuck request must never keep the app from finishing setup.
async function timedFetch(url, ms = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      credentials: 'same-origin',
      signal: controller.signal,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function page(request, url) {
  const cache = await caches.open(PAGES);
  // One saved copy per page: ?lang=tl and ?tool= are read by the page itself.
  const key = url.pathname;
  try {
    const response = await fetch(request);
    if (response.ok && !response.redirected && response.type === 'basic') {
      await cache.put(key, response.clone());
    }
    return response;
  } catch {
    return (await cache.match(key)) ?? offlinePage();
  }
}

async function file(request) {
  const cache = await caches.open(FILES);
  const saved = await cache.match(request);
  if (saved) return saved;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    // Oldest first: keep the list from growing with every release.
    const keys = await cache.keys();
    if (keys.length > MAX_FILES) await cache.delete(keys[0]);
  }
  return response;
}

function offlinePage() {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Offline | HopeBegins</title>
<style>body{margin:0;padding:32px 20px;font-family:system-ui,sans-serif;background:#FCFDFA;color:#6E5F47;line-height:1.5}
main{max-width:32rem;margin:0 auto}h1{font-family:Georgia,serif;font-weight:400;font-size:2rem;margin:0 0 12px}
a{color:#6E5F47;font-weight:700}.crisis{margin-top:24px;padding:16px;border-radius:16px;background:#EFF3E7}</style></head>
<body><main>
<h1>You're offline.</h1>
<p>This page needs a connection. Your plan opens without one once you've visited it on this phone.</p>
<p lang="fil">Kailangan ng internet para sa page na ito. Nabubuksan ang plano mo kahit walang internet kapag nabisita mo na ito sa phone na ito.</p>
<p><a href="/action-plan">Open my plan</a></p>
<p class="crisis">In crisis or thinking of ending your life? Call the NCMH Crisis Hotline, 24/7: <a href="tel:1553">1553</a> or <a href="tel:+639178998727">0917 899 8727</a>.</p>
</main></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
