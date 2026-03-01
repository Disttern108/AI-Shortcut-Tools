// ── Inline SVG icons for Resources & Community section ──
// Each icon is semantically chosen for the specific resource it represents.

const EnsDocIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
)

const HuggingFaceIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
)

const OllamaIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /><path d="M8 13h8" /><path d="M9 17h6" />
  </svg>
)

const GeminiStudioIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
  </svg>
)

const GitHubIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const TelegramIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const TwitterXIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const EnsForumIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
)

const CommunityBadgeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
)

// ── Smart emoji logo containers ──
// Each resource gets a semantically meaningful emoji matching what it actually is.

interface ResourceItem {
  name: string
  description: string
  url: string
  emoji: string
  color: string
  Icon: React.ElementType
}

interface CommunityItem {
  name: string
  description: string
  url: string
  emoji: string
  color: string
  Icon: React.ElementType
}

const resources: ResourceItem[] = [
  {
    name: 'ENS Documentation',
    description: 'Guides and docs for Ethereum Name Service.',
    url: 'https://docs.ens.domains',
    emoji: '📘',       // blue book — documentation
    color: '#5298ff',   // ENS blue
    Icon: EnsDocIcon
  },
  {
    name: 'Hugging Face Models',
    description: 'Explore thousands of open-source AI models.',
    url: 'https://huggingface.co/models',
    emoji: '🤗',       // hugging face — literally their brand
    color: '#ffbd45',   // Hugging Face yellow
    Icon: HuggingFaceIcon
  },
  {
    name: 'Ollama',
    description: 'Run open models locally with privacy-first workflows.',
    url: 'https://ollama.com',
    emoji: '🦙',       // llama — Ollama = run llama locally
    color: '#f97316',   // warm orange
    Icon: OllamaIcon
  },
  {
    name: 'Google AI Studio',
    description: 'Free developer access to Gemini models and tooling.',
    url: 'https://aistudio.google.com',
    emoji: '♊',       // Gemini zodiac — Google Gemini
    color: '#4285f4',   // Google blue
    Icon: GeminiStudioIcon
  }
]

const communityLinks: CommunityItem[] = [
  {
    name: 'GitHub',
    description: 'View our open-source code, report issues, and contribute.',
    url: 'https://github.com/ayuda-chaos',
    emoji: '🐙',       // octocat — GitHub's mascot
    color: '#f0f6fc',   // GitHub white-ish
    Icon: GitHubIcon
  },
  {
    name: 'Telegram',
    description: 'Join our Telegram group for real-time help and updates.',
    url: 'https://t.me/+EcVIF9ZoHqUyN2Nh',
    emoji: '✈️',       // paper plane — Telegram's icon
    color: '#26a5e4',   // Telegram blue
    Icon: TelegramIcon
  },
  {
    name: 'Twitter / X',
    description: 'Follow us for the latest AI and Web3 updates.',
    url: 'https://x.com/ayuda_chaos',
    emoji: '𝕏',        // X logo character
    color: '#f0f0f0',   // X white
    Icon: TwitterXIcon
  },
  {
    name: 'ENS Forums',
    description: 'Deep discussions on decentralized identity.',
    url: 'https://discuss.ens.domains',
    emoji: '🏛️',       // forum/parliament — ENS governance discussions
    color: '#5298ff',   // ENS blue
    Icon: EnsForumIcon
  }
]

export function JoinCommunity() {
  return (
    <section id="resources" className="relative py-14 lg:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-black to-cyan-950/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-6">
            <CommunityBadgeIcon className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Resources and Community
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Build, Learn, Connect
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Everything you need to start building with open AI and connect with the people shaping the future.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${resource.color}25, ${resource.color}10)`,
                  border: `1px solid ${resource.color}35`,
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }} role="img" aria-hidden>{resource.emoji}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{resource.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{resource.description}</p>
            </a>
          ))}
        </div>

        {/* Community Links */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {communityLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${link.color}25, ${link.color}10)`,
                  border: `1px solid ${link.color}35`,
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }} role="img" aria-hidden>{link.emoji}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{link.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
