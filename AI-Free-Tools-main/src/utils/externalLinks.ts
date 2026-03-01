const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

export function getSafeExternalUrl(rawUrl: string | null | undefined): string | null {
  if (typeof rawUrl !== 'string') return null;
  const candidate = rawUrl.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function openSafeExternal(rawUrl: string | null | undefined): boolean {
  const safeUrl = getSafeExternalUrl(rawUrl);
  if (!safeUrl) return false;
  window.open(safeUrl, '_blank', 'noopener,noreferrer');
  return true;
}
