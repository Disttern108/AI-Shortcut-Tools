// Manual logo overrides for tools where the category-icon fallback isn't sufficient.
// Keys are the tool `handle` from aitoollist.ts.
//
// IMPORTANT: All URLs here MUST be allowed by the CSP img-src directive in
// vercel.json. Currently img-src is restricted to 'self' data: blob: only,
// so external URLs will be silently blocked. Only add entries here if they
// point to self-hosted assets (e.g. /logos/toolname.png) or if the CSP is
// updated to allow the specific domain.
//
// The previous external favicon URLs (perplexity.ai, x.ai, gstatic.com, etc.)
// were removed because:
//   1. They were blocked by CSP anyway (not in img-src whitelist)
//   2. External favicon fetches leak user browsing data to third parties
export const logoOverrides: Record<string, string> = {
  // Add self-hosted logo overrides here as needed, e.g.:
  // 'tool-handle': '/logos/tool-handle.png',
}
