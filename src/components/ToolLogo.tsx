import { useToolLogo } from '../hooks/useToolLogo'
import { getToolEmoji, getToolEmojiByName } from '../data/toolEmojiMap'

interface Props {
  handle: string
  name: string
  websiteUrl: string
  size?: number
  colorClass?: string
  className?: string
  category?: string
}

export function ToolLogo({ handle, name, websiteUrl, size = 56, colorClass, className = '', category = '' }: Props) {
  const { svgString, brandHex } = useToolLogo(handle, websiteUrl)

  const box = { width: size, height: size }

  // Tier 1: Simple-icons brand SVG match — render inline
  if (svgString && brandHex) {
    const iconSize = Math.round(size * 0.55)
    return (
      <div
        className={`rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 ${className}`}
        style={box}
        aria-label={`${name} logo`}
      >
        <div
          style={{
            width: iconSize,
            height: iconSize,
            color: `#${brandHex}`,
          }}
          dangerouslySetInnerHTML={{
            __html: svgString.replace('<svg', `<svg width="${iconSize}" height="${iconSize}" fill="currentColor"`)
          }}
        />
      </div>
    )
  }

  // Tier 2: Smart emoji logo — specific to each tool
  const emojiData = getToolEmoji(handle) || getToolEmojiByName(name)
  if (emojiData) {
    const { emoji, color } = emojiData
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 ${className}`}
        style={{
          ...box,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${color}25, ${color}10)`,
          border: `1px solid ${color}35`,
        }}
        aria-label={`${name} logo`}
      >
        <span
          style={{ fontSize: Math.round(size * 0.46), lineHeight: 1 }}
          role="img"
          aria-hidden
        >
          {emoji}
        </span>
      </div>
    )
  }

  // Tier 3: no match at all — colored initials
  const PALETTE = [
    '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316',
  ]
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  const bg = colorClass ? undefined : PALETTE[Math.abs(h) % PALETTE.length]

  const words = name.trim().split(/\s+/)
  const inits = words.length === 1
    ? words[0].slice(0, 2).toUpperCase()
    : (words[0][0] + words[1][0]).toUpperCase()

  return (
    <div
      className={`rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass ? `bg-gradient-to-br ${colorClass}` : ''} ${className}`}
      style={{ ...box, ...(bg ? { background: bg } : {}) }}
      aria-label={`${name} logo`}
    >
      <span
        className="text-white font-bold select-none"
        style={{ fontSize: size * 0.35, lineHeight: 1, letterSpacing: '0.04em' }}
      >
        {inits}
      </span>
    </div>
  )
}
