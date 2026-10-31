/**
 * After a new version of the site goes live, a page opened before it can
 * still ask for a file from the old version. When that file is gone the
 * page breaks, and loading the page again fixes it. This reloads once,
 * and not again for a minute, so a page that keeps failing shows the
 * error message instead of reloading forever.
 */

const RELOADED_AT = 'hopebegins.staleReload';
const WAIT_MS = 60_000;

export function isStaleBuildError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === 'ChunkLoadError' ||
    /Loading (CSS )?chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      error.message
    )
  );
}

/** Reloads the page if the error came from an old version. Returns whether it did. */
export function reloadIfStale(error: unknown): boolean {
  if (!isStaleBuildError(error)) return false;
  try {
    const last = Number(sessionStorage.getItem(RELOADED_AT) ?? 0);
    if (Date.now() - last < WAIT_MS) return false;
    sessionStorage.setItem(RELOADED_AT, String(Date.now()));
  } catch {
    // Storage blocked: no way to tell a first try from a loop, so stay put.
    return false;
  }
  window.location.reload();
  return true;
}
