// One place to build URLs that carry the browse-apps state (search, category,
// page). Clones the current params and applies updates; `null`/'' deletes a key.
export type ParamUpdates = Record<string, string | number | null | undefined>;

export function buildHref(
  pathname: string,
  current: URLSearchParams | Record<string, string | undefined>,
  updates: ParamUpdates = {},
): string {
  const params =
    current instanceof URLSearchParams
      ? new URLSearchParams(current.toString())
      : new URLSearchParams(
          Object.entries(current).filter(([, value]) => typeof value === 'string') as [
            string,
            string,
          ][],
        );

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === '') params.delete(key);
    else params.set(key, String(value));
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
