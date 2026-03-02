import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { aiTools } from '../../data/aiToolsWithWeb3'
import { rankToolsBySearch } from './searchUtils'
import { openSafeExternal } from '../../src/utils/externalLinks'

type NavItem = {
  label: string
  section: string
  highlight?: boolean
  filters?: {
    category?: string
    freeOnly?: boolean
    openSourceOnly?: boolean
    web3Only?: boolean
    searchQuery?: string
  }
}

const navItemIcons: Record<string, string> = {
  hero: '\u{1F680}',
  tools: '\u{1F9F0}',
  manifesto: '\u{1F4DC}',
  guide: '\u{1F4DA}',
  apis: '\u{1F527}',
  opensource: '\u{1F310}',
  community: '\u{1F91D}',
}

export function Navigation({ currentSection, scrollToSection }: { currentSection: string; scrollToSection: (id: string) => void }) {
  const [navSearch, setNavSearch] = useState('')
  const [mobileMenuSearch, setMobileMenuSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileTopSearchOpen, setMobileTopSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const desktopSearchContainerRef = useRef<HTMLDivElement>(null)
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null)
  const mobileTopSearchContainerRef = useRef<HTMLDivElement>(null)

  const getRankedSuggestions = (queryValue: string) => {
    const query = queryValue.trim()
    if (!query) return [] as (typeof aiTools)[number][]
    const alphabetical = [...aiTools].sort((a, b) => a.name.localeCompare(b.name))
    return rankToolsBySearch(alphabetical, query).slice(0, 8)
  }

  const navSuggestions = useMemo(() => getRankedSuggestions(navSearch), [navSearch])
  const mobileMenuSuggestions = useMemo(() => getRankedSuggestions(mobileMenuSearch), [mobileMenuSearch])

  const navItems: NavItem[] = [
    { label: 'AI Revolution', section: 'hero', highlight: true },
    { label: 'AI Tools', section: 'tools', highlight: true, filters: { category: 'All', freeOnly: false, openSourceOnly: false } },
    { label: 'Manifesto', section: 'manifesto', highlight: true },
    { label: 'AI Learning Guide', section: 'guide', highlight: true },
    { label: 'Developer APIs', section: 'apis', highlight: true },
    { label: 'Open Source Models', section: 'opensource', highlight: true },
    { label: 'Resources & Community', section: 'community', highlight: true }
  ]

  // Scroll progress tracking (top nav line)
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const handleClick = (item: NavItem) => {
    setDesktopSearchOpen(false)
    setMobileSearchOpen(false)
    setMobileTopSearchOpen(false)
    if (item.filters && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai-tools:filters', { detail: item.filters }))
    }
    scrollToSection(item.section)
    setMobileMenuOpen(false)
  }

  const handleSearchChange = (value: string) => {
    setNavSearch(value)
  }

  const handleMobileMenuSearchChange = (value: string) => {
    setMobileMenuSearch(value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setDesktopSearchOpen(false)
      setMobileSearchOpen(false)
      setMobileTopSearchOpen(false)
      return
    }
    if (e.key === 'Enter' && navSuggestions.length > 0) {
      handleSuggestionClick(navSuggestions[0])
    }
  }

  const handleMobileMenuSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setMobileSearchOpen(false)
      return
    }
    if (e.key === 'Enter' && mobileMenuSuggestions.length > 0) {
      handleMobileMenuSuggestionClick(mobileMenuSuggestions[0])
    }
  }

  const openToolSite = (toolId: number) => {
    const tool = aiTools.find(item => item.id === toolId)
    setDesktopSearchOpen(false)
    setMobileSearchOpen(false)
    setMobileTopSearchOpen(false)
    openSafeExternal(tool?.website)
  }

  const openToolDetails = (toolId: number) => {
    const tool = aiTools.find(item => item.id === toolId)
    if (!tool) return
    setDesktopSearchOpen(false)
    setMobileSearchOpen(false)
    setMobileTopSearchOpen(false)
    handleSearchChange(tool.name)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai-tools:view', { detail: { toolId: tool.id, source: 'nav' } }))
    }
  }

  const handleSuggestionClick = (tool: (typeof aiTools)[number]) => {
    handleSearchChange(tool.name)
    setDesktopSearchOpen(false)
    setMobileSearchOpen(false)
    setMobileTopSearchOpen(false)
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai-tools:jump', { detail: { toolId: tool.id, source: 'nav' } }))
    }
  }

  const handleMobileMenuSuggestionClick = (tool: (typeof aiTools)[number]) => {
    setMobileMenuSearch(tool.name)
    setMobileSearchOpen(false)
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai-tools:jump', { detail: { toolId: tool.id, source: 'nav' } }))
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    if (mobileMenuOpen) {
      setMobileTopSearchOpen(false)
    } else {
      setMobileSearchOpen(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Dispatch custom event for main content shift
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('menu-toggle', { detail: { open: mobileMenuOpen } }))
  }, [mobileMenuOpen])

  // Auto-focus search input when menu opens
  useEffect(() => {
    if (mobileMenuOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 400)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return

      const clickedDesktopSearch = desktopSearchContainerRef.current?.contains(target) ?? false
      const clickedMobileSearch = mobileSearchContainerRef.current?.contains(target) ?? false
      const clickedMobileTopSearch = mobileTopSearchContainerRef.current?.contains(target) ?? false
      if (clickedDesktopSearch || clickedMobileSearch || clickedMobileTopSearch) return

      setDesktopSearchOpen(false)
      setMobileSearchOpen(false)
      setMobileTopSearchOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const badges = [
    { label: 'Privacy', icon: '\u{1F512}' },
    { label: 'All Free AI', icon: '\u{1F916}' },
    { label: 'No data stored', icon: '\u{1F5C4}' }
  ]
  const mobileTrustBadges = [
    { label: 'Privacy', icon: '\u{1F512}' },
    { label: 'No Data Store', icon: '\u{1F5C4}' },
    { label: 'No Ads', icon: '\u{1F6AB}' }
  ]

  // Half-screen menu portal
  const mobileMenu = typeof document !== 'undefined'
    ? createPortal(
        <>
          {/* Overlay backdrop */}
          <div
            className={`half-menu-overlay ${mobileMenuOpen ? 'active' : ''} md:hidden`}
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Half-screen panel */}
          <div className={`half-menu-panel ${mobileMenuOpen ? 'active' : ''} md:hidden`}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Header with logo & close */}
              <div className="flex items-center justify-between gap-2 px-4 pt-5 pb-4 border-b border-white/5 sm:px-5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    scrollToSection('hero')
                  }}
                  className="min-w-0 flex flex-1 items-center gap-2 text-left pr-1"
                  aria-label="Go to top"
                >
                  <div className="w-8 h-8 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-cyan-500/20 shadow-lg shadow-cyan-500/20 sm:w-9 sm:h-9">
                    <img src="/logo.jpg" alt="AI Shortcut Tools logo" width="64" height="64" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">AI Shortcut Tools</div>
                    <div className="truncate text-[10px] text-gray-500 font-medium">Free & Open Source</div>
                  </div>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 shrink-0 rounded-full glass-card flex items-center justify-center text-cyan-300 hover:text-white transition-colors animate-border-glow sm:w-9 sm:h-9"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content area */}
                <div
                  className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch] px-4 py-4 sm:px-5"
                >
                {/* Search bar */}
                <div ref={mobileSearchContainerRef} className="mb-5">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-cyan-400">{'\u{1F50D}'}</span>
                    <input
                      ref={searchInputRef}
                      value={mobileMenuSearch}
                      onFocus={() => setMobileSearchOpen(true)}
                      onChange={(e) => {
                        setMobileSearchOpen(true)
                        handleMobileMenuSearchChange(e.target.value)
                      }}
                      onKeyDown={handleMobileMenuSearchKeyDown}
                      placeholder="Search AI tools..."
                      className="w-full pl-9 pr-14 py-2.5 rounded-xl bg-white/5 border border-cyan-500/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur transition-all"
                    />
                    {mobileMenuSearch && (
                      <button
                        onClick={() => handleMobileMenuSearchChange('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Search suggestions */}
                  {mobileMenuSearch && mobileSearchOpen && mobileMenuSuggestions.length > 0 && (
                    <div className="mt-3 rounded-xl bg-gray-950 border border-white/10 max-h-64 overflow-y-auto overscroll-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
                      {mobileMenuSuggestions.slice(0, 6).map(tool => (
                      <div
                        key={`mobile-menu-suggest-${tool.id}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleMobileMenuSuggestionClick(tool)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleMobileMenuSuggestionClick(tool)
                          }
                        }}
                        className="w-full text-left px-3 py-2.5 border-b border-white/10 last:border-0 hover:bg-cyan-500/10 active:bg-cyan-500/15 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-white truncate">{tool.name}</div>
                            <div className="text-xs text-gray-400 truncate">{tool.category}</div>
                          </div>
                          <svg className="mt-1 w-4 h-4 text-cyan-500/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {tool.website && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setMobileMenuOpen(false)
                                openToolSite(tool.id)
                              }}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                            >
                              Visit
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              const mobileTool = aiTools.find(item => item.id === tool.id)
                              setMobileSearchOpen(false)
                              if (mobileTool && typeof window !== 'undefined') {
                                window.dispatchEvent(new CustomEvent('ai-tools:view', { detail: { toolId: mobileTool.id, source: 'nav' } }))
                              }
                            }}
                            className="text-[11px] text-gray-300 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {mobileMenuSearch && mobileSearchOpen && mobileMenuSuggestions.length === 0 && (
                    <div className="mt-3 py-4 text-center text-sm text-gray-300">No tools found for "{mobileMenuSearch}"</div>
                  )}
                </div>

                {/* Navigation items */}
                {(!mobileMenuSearch || !mobileSearchOpen) && (
                  <>
                    <div className="mb-3">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Navigate</div>
                    </div>
                    <div className="space-y-1.5">
                      {navItems.map(item => {
                        const isActive = item.highlight && currentSection === item.section
                        return (
                          <button
                            key={`mobile-full-${item.section}-${item.label}`}
                            onClick={() => handleClick(item)}
                            className={`w-full text-left text-xs sm:text-sm font-semibold px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'glass-card bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                : 'text-gray-300 bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-cyan-500/20 hover:text-white active:bg-white/10'
                            }`}
                          >
                            <span className="grid grid-cols-[1.1rem_minmax(0,1fr)_auto] items-center gap-2">
                              <span className="text-sm sm:text-base w-4 sm:w-5 text-center">{navItemIcons[item.section] || '\u2728'}</span>
                              <span className="min-w-0 break-words leading-tight">{item.label}</span>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                              )}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Footer section — pinned to bottom */}
              <div className="px-4 pb-5 pt-3 border-t border-white/5 sm:px-5">
                {/* Stats bar */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 py-2 px-2 rounded-xl glass-card">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 text-[10px] text-cyan-300 font-medium">200+ AI Tools</span>
                  <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 text-[10px] text-purple-300 font-medium">100% Free</span>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 text-[10px] text-cyan-300 font-medium">Open Source</span>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                  {mobileTrustBadges.map(badge => (
                    <span
                      key={`panel-badge-${badge.label}`}
                      className="max-w-full inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-cyan-500/15 bg-cyan-500/5 px-2 py-0.5 text-[10px] text-cyan-100"
                    >
                      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/70 to-cyan-500/70 text-[8px] text-white">
                        {badge.icon}
                      </span>
                      <span>{badge.label}</span>
                    </span>
                  ))}
                </div>

                {/* GitHub link */}
                <a
                  href="https://github.com/ayuda-chaos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl glass-card text-gray-400 hover:text-cyan-300 transition-colors text-xs font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null

  return (
    <nav data-app-nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-6xl">
      <div className="relative flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-xl rounded-2xl px-3 sm:px-4 py-3 border border-white/10 shadow-lg shadow-purple-500/10">
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />

        <div className="min-w-0 flex-1 flex items-center gap-2 sm:gap-3 pr-2 sm:pr-4 border-r border-white/10 md:flex-none">
          <button
            onClick={() => scrollToSection('hero')}
            className="w-10 h-10 rounded-2xl overflow-hidden bg-black/40 border border-cyan-500/20 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
            aria-label="Go to top"
          >
            <img src="/logo.jpg" alt="AI Shortcut Tools logo" width="64" height="64" className="w-full h-full object-cover" />
          </button>
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-semibold text-white truncate">AI Shortcut Tools</div>
            <div className="sm:hidden mt-1 flex flex-wrap items-center gap-1 pr-1">
              {mobileTrustBadges.map(badge => (
                <span
                  key={`mobile-badge-${badge.label}`}
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-cyan-500/15 bg-cyan-500/5 px-1.5 py-0.5 text-[10px] text-cyan-100"
                >
                  <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/70 to-cyan-500/70 text-[8px] text-white">
                    {badge.icon}
                  </span>
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
            <div className="hidden sm:flex gap-1 text-[11px] text-gray-300">
              {badges.map(badge => (
                <span
                  key={badge.label}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1 animate-pulse"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-wrap gap-2 px-1 flex-1">
          {navItems.map(item => {
            const isActive = item.highlight && currentSection === item.section
            return (
              <button
                key={`${item.section}-${item.label}`}
                onClick={() => handleClick(item)}
                className={`px-2.5 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/30 text-white border border-cyan-400/40 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/20'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden ml-auto shrink-0 h-10 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/20 text-white flex items-center gap-2 pl-2.5 pr-3 shadow-md shadow-cyan-500/10 hover:from-cyan-500/25 hover:to-purple-500/25 transition-all"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="-translate-x-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">Menu</span>
          <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
            <span className={`h-[2px] w-full rounded-full bg-cyan-300 transition-all duration-200 ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-full rounded-full bg-cyan-300 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-[2px] w-full rounded-full bg-cyan-300 transition-all duration-200 ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </span>
        </button>
        <div className="hidden md:flex items-center gap-2 min-w-[260px] max-w-[320px] pl-2">
          <span className="text-lg">{'\u{1F50D}'}</span>
          <div ref={desktopSearchContainerRef} className="relative flex-1">
            <input
              value={navSearch}
              onFocus={() => setDesktopSearchOpen(true)}
              onChange={(e) => {
                setDesktopSearchOpen(true)
                handleSearchChange(e.target.value)
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search tools fast"
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-cyan-500/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all"
            />
            {navSearch && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 text-xs px-2 py-1 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-colors"
              >
                Clear
              </button>
            )}

            {navSearch && desktopSearchOpen && (
              <div className="absolute left-0 right-0 mt-3 rounded-2xl bg-gray-950 border border-white/10 shadow-2xl shadow-cyan-500/15 backdrop-blur-xl max-h-80 overflow-y-auto z-50 animate-fade-in">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-cyan-500/30">
                    AI
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AI Shortcut Tools</div>
                    <div className="text-xs text-gray-400">Search results</div>
                  </div>
                </div>
                {navSuggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-300">No tools found.</div>
                ) : (
                  navSuggestions.map(tool => (
                    <div
                      key={`nav-suggest-${tool.id}`}
                      className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 last:border-0 hover:bg-cyan-500/10 cursor-pointer transition-colors"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(tool)}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{tool.name}</div>
                        <div className="text-xs text-gray-300 truncate">{tool.category}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {tool.website && (
                          <button
                            onClick={(e) => { e.stopPropagation(); openToolSite(tool.id) }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                          >
                            Visit
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); openToolDetails(tool.id) }}
                          className="text-xs text-gray-300 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden mt-2 px-1">
        <div ref={mobileTopSearchContainerRef} className="relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg shadow-cyan-500/5 p-2">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-cyan-300">{'\u{1F50D}'}</span>
            <input
              value={navSearch}
              onFocus={() => setMobileTopSearchOpen(true)}
              onChange={(e) => {
                setMobileTopSearchOpen(true)
                handleSearchChange(e.target.value)
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search tools fast"
              className="w-full pl-9 pr-14 py-2.5 rounded-xl bg-white/5 border border-cyan-500/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all"
            />
            {navSearch && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 text-xs px-2 py-1 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {navSearch && mobileTopSearchOpen && (
            <div className="absolute left-2 right-2 top-full mt-2 rounded-2xl bg-gray-950 border border-white/10 shadow-2xl shadow-cyan-500/15 backdrop-blur-xl max-h-80 overflow-y-auto z-50 animate-fade-in">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-cyan-500/30">
                  AI
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">AI Shortcut Tools</div>
                  <div className="text-xs text-gray-400">Search results</div>
                </div>
              </div>
              {navSuggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-300">No tools found.</div>
              ) : (
                navSuggestions.map(tool => (
                  <div
                    key={`mobile-top-nav-suggest-${tool.id}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 last:border-0 hover:bg-cyan-500/10 cursor-pointer transition-colors"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(tool)}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{tool.name}</div>
                      <div className="text-xs text-gray-300 truncate">{tool.category}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {tool.website && (
                        <button
                          onClick={(e) => { e.stopPropagation(); openToolSite(tool.id) }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                        >
                          Visit
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); openToolDetails(tool.id) }}
                        className="text-xs text-gray-300 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden mt-2 px-1">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg shadow-cyan-500/5">
          <div
            className="no-scrollbar flex items-center gap-2 overflow-x-auto px-2 py-2"
            role="tablist"
            aria-label="Quick section navigation"
          >
            {navItems.map((item) => {
              const isActive = item.highlight && currentSection === item.section
              return (
                <button
                  key={`mobile-top-${item.section}-${item.label}`}
                  onClick={() => handleClick(item)}
                  role="tab"
                  aria-selected={isActive}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/25 to-purple-600/25 text-white border-cyan-400/35 shadow-md shadow-cyan-500/15'
                      : 'bg-white/5 text-gray-200 border-white/10 active:bg-white/10'
                  }`}
                >
                  <span className="text-xs" aria-hidden>{navItemIcons[item.section] || '\u2728'}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {mobileMenu}
    </nav>
  )
}
