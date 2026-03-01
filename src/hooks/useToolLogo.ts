import { useMemo } from 'react'
import { getSimpleIcon } from '../data/simpleIconsMap'

/**
 * Returns an inline SVG string + brand color for a tool, or null.
 * Uses simple-icons (bundled at build time, zero network requests).
 *
 * The old Google Favicons API was removed — it leaked browsing data.
 */
export function useToolLogo(handle: string, _websiteUrl: string) {
  const icon = useMemo(() => getSimpleIcon(handle), [handle])

  return {
    svgString: icon?.svg ?? null,
    brandHex: icon?.hex ?? null,
    exhausted: !icon,
  }
}
