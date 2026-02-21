function normalizeBasePath(value: string | undefined) {
  if (!value) return "";
  if (value === "/") return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!BASE_PATH) return path;
  if (path.startsWith(`${BASE_PATH}/`)) return path;

  return `${BASE_PATH}${path}`;
}

export function getBasePath() {
  return BASE_PATH;
}
