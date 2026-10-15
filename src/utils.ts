/**
 * Base path handling for GitHub Pages (project sites).
 * BASE_URL is "/" in dev, "/mountain-shadow-academy/" in production builds.
 */
export const BASE: string = import.meta.env.BASE_URL ?? "/";

/** Prefix a site-absolute path (e.g. "/en/curriculum/") with the base path. */
export function href(path: string): string {
  return `${BASE.replace(/\/$/, "")}${path}`;
}
