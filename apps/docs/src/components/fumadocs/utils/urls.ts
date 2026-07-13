// oxlint-disable eslint/no-shadow, jsdoc/check-tag-names, unicorn/consistent-function-scoping
export function normalize(urlOrPath: string) {
  if (urlOrPath.length > 1 && urlOrPath.endsWith("/"))
    return urlOrPath.slice(0, -1);

  return urlOrPath;
}

/**
 * @returns if `href` is matching the given pathname
 */
export function isActive(
  href: string,
  pathname: string,
  nested = true,
): boolean {
  href = normalize(href);
  pathname = normalize(pathname);

  return href === pathname || (nested && pathname.startsWith(`${href}/`));
}
