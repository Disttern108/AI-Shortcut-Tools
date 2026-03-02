// components/BlockchainTheme/AIToolsSection.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { getSafeExternalUrl, openSafeExternal } from '../src/utils/externalLinks';
import { useRevealOnScroll } from '../src/hooks/useRevealOnScroll';
import { ToolLogo } from '../src/components/ToolLogo';
import { getEnrichedData } from '../src/data/enrichedTools';
// No lucide-react imports — all icons are inline SVG components defined below

const SearchIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDownLucide = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const NetworkIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 011-1h12a1 1 0 011 1v3" /><line x1="12" y1="12" x2="12" y2="8" />
  </svg>
);

// ── Inline SVG icon components (replace lucide-react shim text labels) ──

const CodeBracketsIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const SparkleIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
  </svg>
);

const ShieldIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ExternalLinkIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
  </svg>
);

const SparklesIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3z" />
    <path d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15z" />
  </svg>
);

const ZapIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ServerIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const TerminalIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// ── Feature icon mapping for Key Features section ──

const PlugIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a6 6 0 01-12 0V8z" />
  </svg>
);

const ChartIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const SearchGlassIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MessageIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

function getFeatureIcon(feature: string) {
  const lower = feature.toLowerCase();
  if (lower.includes('api') || lower.includes('integration')) return PlugIcon;
  if (lower.includes('privacy') || lower.includes('security') || lower.includes('encrypt')) return ShieldIcon;
  if (lower.includes('self-host') || lower.includes('deploy') || lower.includes('server')) return ServerIcon;
  if (lower.includes('analytics') || lower.includes('dashboard') || lower.includes('monitor')) return ChartIcon;
  if (lower.includes('search') || lower.includes('find')) return SearchGlassIcon;
  if (lower.includes('chat') || lower.includes('conversation') || lower.includes('message')) return MessageIcon;
  return StarIcon;
}

// ── Theme badge mapping ──

function getThemeLabel(colorClass: string): { label: string; color: string } {
  if (colorClass.includes('emerald') || (colorClass.includes('cyan') && colorClass.includes('teal'))) return { label: 'Teal', color: '#14b8a6' };
  if (colorClass.includes('purple') && colorClass.includes('indigo')) return { label: 'Violet', color: '#8b5cf6' };
  if (colorClass.includes('fuchsia')) return { label: 'Fuchsia', color: '#d946ef' };
  if (colorClass.includes('sky')) return { label: 'Sky', color: '#0ea5e9' };
  if (colorClass.includes('purple') && colorClass.includes('pink')) return { label: 'Rose', color: '#ec4899' };
  if (colorClass.includes('cyan') && colorClass.includes('blue')) return { label: 'Ocean', color: '#06b6d4' };
  if (colorClass.includes('cyan') && colorClass.includes('purple')) return { label: 'Prism', color: '#a855f7' };
  if (colorClass.includes('indigo') && colorClass.includes('cyan')) return { label: 'Indigo', color: '#6366f1' };
  if (colorClass.includes('cyan') && colorClass.includes('violet')) return { label: 'Cosmic', color: '#7c3aed' };
  if (colorClass.includes('purple')) return { label: 'Purple', color: '#a855f7' };
  if (colorClass.includes('cyan')) return { label: 'Cyan', color: '#06b6d4' };
  return { label: 'Neon', color: '#a855f7' };
}

interface AITool {
  id: number;
  name: string;
  handle: string;
  website: string;
  description: string;
  category: string;
  free: boolean;
  openSource: boolean;
  blockchain?: boolean;
  privacy?: boolean;
  web3?: boolean;
  verified?: boolean;
}

interface Props {
  aiTools: AITool[];
  categories: string[];
}

export function AIToolsSection({ aiTools, categories }: Props) {
  const { ref: sectionRef, isVisible } = useRevealOnScroll<HTMLElement>();
  const toolsSearchInputRef = useRef<HTMLInputElement | null>(null);
  const toolsSearchContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopMoreCategoriesRef = useRef<HTMLDivElement | null>(null);
  const mobileMoreCategoriesRef = useRef<HTMLDivElement | null>(null);
  const toolRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [showOnlyFree, setShowOnlyFree] = useState(true);
  const [showOnlyOpenSource, setShowOnlyOpenSource] = useState(false);
  const [showWeb3Tools, setShowWeb3Tools] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showDirectory, setShowDirectory] = useState(false);
  const [showMobileMoreCategories, setShowMobileMoreCategories] = useState(false);
  const [pendingJumpCategory, setPendingJumpCategory] = useState(false);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [pendingJumpId, setPendingJumpId] = useState<number | null>(null);
  const [categoryAnim, setCategoryAnim] = useState(false);
  const prevCategoryRef = useRef(selectedCategory);

  const openToolSite = (tool: AITool) => {
    setShowSearchSuggestions(false);
    openSafeExternal(tool.website);
  };

  const focusToolCard = (tool: AITool) => {
    setShowSearchSuggestions(false);
    setSearchQuery(tool.name);
    setSelectedCategory('All');
    setPendingJumpId(tool.id);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (toolsSearchContainerRef.current?.contains(target)) return;
      setShowSearchSuggestions(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!isFilterOpen && !showMobileMoreCategories) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (
        isFilterOpen &&
        desktopMoreCategoriesRef.current &&
        !desktopMoreCategoriesRef.current.contains(target)
      ) {
        setIsFilterOpen(false);
      }

      if (
        showMobileMoreCategories &&
        mobileMoreCategoriesRef.current &&
        !mobileMoreCategoriesRef.current.contains(target)
      ) {
        setShowMobileMoreCategories(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsFilterOpen(false);
      setShowMobileMoreCategories(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFilterOpen, showMobileMoreCategories]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      if (typeof detail.searchQuery === 'string') setSearchQuery(detail.searchQuery);
      if (typeof detail.category === 'string') setSelectedCategory(detail.category);
      if (typeof detail.freeOnly === 'boolean') setShowOnlyFree(detail.freeOnly);
      if (typeof detail.openSourceOnly === 'boolean') setShowOnlyOpenSource(detail.openSourceOnly);
      if (typeof detail.web3Only === 'boolean') setShowWeb3Tools(detail.web3Only);
      if (detail.jumpToCategory) setPendingJumpCategory(true);
    };

    window.addEventListener('ai-tools:filters', handler as EventListener);
    return () => window.removeEventListener('ai-tools:filters', handler as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      if (detail.source !== 'nav' && typeof detail.searchQuery === 'string') {
        setSearchQuery(detail.searchQuery);
      }
      if (detail.source !== 'nav') {
        setSelectedCategory('All');
      }
      if (typeof detail.toolId === 'number') {
        setPendingJumpId(detail.toolId);
      }
    };

    window.addEventListener('ai-tools:jump', handler as EventListener);
    return () => window.removeEventListener('ai-tools:jump', handler as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      if (typeof detail.toolId !== 'number') return;
      const tool = aiTools.find(item => item.id === detail.toolId);
      if (tool) {
        setSelectedTool(tool);
      }
    };

    window.addEventListener('ai-tools:view', handler as EventListener);
    return () => window.removeEventListener('ai-tools:view', handler as EventListener);
  }, [aiTools]);

  const categoryIcons: Record<string, React.ElementType> = {
    "All": SparklesIcon,
    "AI for Everyday Tasks": MessageIcon,
    "AI for Trading": ChartIcon,
    "AI for YouTube/Video": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
    ),
    "AI for Research": SearchGlassIcon,
    "AI Agents & Automation": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="3" /><line x1="12" y1="8" x2="12" y2="11" /></svg>
    ),
    "AI Website Builders": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
    ),
    "AI Journaling & Notes": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
    ),
    "AI Writing & Editing": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    ),
    "AI for Search & News": SearchGlassIcon,
    "AI for Audio & Voice": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
    ),
    "AI for Career": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
    "Private AI": ShieldIcon,
    "Image Generation": ({ className = '' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    "Web3 & Blockchain": NetworkIcon,
    "Developer APIs": CodeBracketsIcon
  };

  const featuredCategories = [
    { category: "AI for Everyday Tasks", tools: ["LM Arena", "Jan", "Open WebUI", "LibreChat"] },
    { category: "AI for Research", tools: ["Qwen (Alibaba)", "ChatGLM", "InternLM", "Yi (01.AI)"] },
    { category: "AI Agents & Automation", tools: ["n8n", "Flowise", "Langflow", "OpenAssistantGPT"] },
    { category: "Image Generation", tools: ["Stable Diffusion", "Scribble Diffusion AI", "Craion AI"] },
    { category: "Private AI", tools: ["Cocoon (TON Blockchain)", "Jan", "Open WebUI"] },
    { category: "Developer APIs", tools: ["Kilo AI", "ModelSlab", "Qdrant"] },
    { category: "Web3 & Blockchain", tools: ["Cocoon (TON Blockchain)"] }
  ];

  const featureHighlights = [
    "200 open-source and free tools curated from a huge public list",
    "Everyday Tasks category focused on open-source chat assistants",
    "Stronger focus on Chinese open-source models and labs",
    "Enhanced search across names, handles, and descriptions",
    "Category icons and color coding for faster scanning",
    "Quick filters for Open Source and Free"
  ];

  const realWorldFocus = [
    "Help with real tasks people do daily",
    "Open-source or self-hosted whenever possible",
    "Free for community use and experimentation",
    "Built to highlight underrated tools"
  ];

  const sortTools = (tools: AITool[]) => {
    const sorted = [...tools];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'popular') {
      sorted.sort((a, b) => {
        const scoreA = (a.openSource ? 3 : 0) + (a.free ? 2 : 0) + (a.web3 ? 4 : 0);
        const scoreB = (b.openSource ? 3 : 0) + (b.free ? 2 : 0) + (b.web3 ? 4 : 0);
        return scoreB - scoreA;
      });
    }
    return sorted;
  };

  const normalizeSearch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

  const containsAllChars = (text: string, query: string) => {
    if (!query) return true;
    const needed: Record<string, number> = {};
    let remaining = 0;
    for (const ch of query) {
      needed[ch] = (needed[ch] || 0) + 1;
      remaining += 1;
    }
    for (const ch of text) {
      const count = needed[ch];
      if (!count) continue;
      needed[ch] = count - 1;
      remaining -= 1;
      if (remaining === 0) return true;
    }
    return remaining === 0;
  };

  const getSearchScore = (tool: AITool, normalizedQuery: string) => {
    if (!normalizedQuery) return 0;
    const name = normalizeSearch(tool.name);
    const handle = normalizeSearch(tool.handle);
    const category = normalizeSearch(tool.category);
    const description = normalizeSearch(tool.description);

    if (name.startsWith(normalizedQuery)) return 0;
    if (handle.startsWith(normalizedQuery)) return 1;
    if (name.includes(normalizedQuery)) return 2;
    if (handle.includes(normalizedQuery)) return 3;
    if (containsAllChars(name, normalizedQuery)) return 4;
    if (containsAllChars(handle, normalizedQuery)) return 5;
    if (category.includes(normalizedQuery)) return 6;
    if (description.includes(normalizedQuery)) return 7;
    return 8;
  };

  const filteredTools = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);
    let filtered = aiTools.filter(tool => {
      const name = normalizeSearch(tool.name);
      const handle = normalizeSearch(tool.handle);
      const category = normalizeSearch(tool.category);
      const description = normalizeSearch(tool.description);
      const matchesSearch = !normalizedQuery ||
        name.includes(normalizedQuery) ||
        handle.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        category.includes(normalizedQuery) ||
        containsAllChars(name, normalizedQuery) ||
        containsAllChars(handle, normalizedQuery);

      const matchesCategory = 
        selectedCategory === 'All' || tool.category === selectedCategory;

      const matchesFree = !showOnlyFree || tool.free;
      const matchesOpenSource = !showOnlyOpenSource || tool.openSource;
      const matchesWeb3 = !showWeb3Tools || tool.web3;

      return matchesSearch && matchesCategory && matchesFree && matchesOpenSource && matchesWeb3;
    });

    const baseSorted = sortTools(filtered);
    if (!normalizedQuery) return baseSorted;
    return baseSorted.slice().sort((a, b) => {
      const scoreA = getSearchScore(a, normalizedQuery);
      const scoreB = getSearchScore(b, normalizedQuery);
      if (scoreA !== scoreB) return scoreA - scoreB;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, sortBy, showOnlyFree, showOnlyOpenSource, showWeb3Tools, aiTools]);

  const suggestions = filteredTools.slice(0, 8);

  const groupedTools = useMemo(() => {
    if (selectedCategory !== 'All') return [];
    const grouped: Record<string, AITool[]> = {};
    filteredTools.forEach(tool => {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    });

    return categories
      .filter(category => category !== 'All' && grouped[category]?.length)
      .map(category => ({
        category,
        tools: sortTools(grouped[category])
      }));
  }, [filteredTools, categories, selectedCategory, sortBy]);

  const pageSize = viewMode === 'grid' ? 6 : 8;
  const categoryPageSize = viewMode === 'grid' ? 4 : 6;
  const visibleTools = filteredTools.slice(0, visibleCount);
  const showGrouped = selectedCategory === 'All' && groupedTools.length > 0;
  const selectedToolWebsite = selectedTool ? getSafeExternalUrl(selectedTool.website) : null;

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [pageSize, searchQuery, selectedCategory, showOnlyFree, showOnlyOpenSource, showWeb3Tools, sortBy]);

  useEffect(() => {
    setExpandedCategories(new Set());
  }, [searchQuery, selectedCategory, showOnlyFree, showOnlyOpenSource, showWeb3Tools, sortBy, viewMode]);

  useEffect(() => {
    if (pendingJumpCategory) {
      const normalizedQuery = normalizeSearch(searchQuery);
      const match = normalizedQuery ? aiTools.find(tool => {
        const name = normalizeSearch(tool.name);
        const handle = normalizeSearch(tool.handle);
        const category = normalizeSearch(tool.category);
        return name.includes(normalizedQuery) ||
          handle.includes(normalizedQuery) ||
          category.includes(normalizedQuery) ||
          containsAllChars(name, normalizedQuery) ||
          containsAllChars(handle, normalizedQuery);
      }) : null;
      if (match && selectedCategory !== match.category) {
        setSelectedCategory(match.category);
      }
      setPendingJumpCategory(false);
    }
  }, [pendingJumpCategory, searchQuery, aiTools, selectedCategory]);

  useEffect(() => {
    if (pendingJumpId === null) return;
    const target = toolRefs.current[pendingJumpId];
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightId(pendingJumpId);
        setPendingJumpId(null);
      });
    }
  }, [pendingJumpId, filteredTools, viewMode]);

  useEffect(() => {
    if (highlightId === null) return;
    const id = setTimeout(() => setHighlightId(null), 1200);
    return () => clearTimeout(id);
  }, [highlightId]);

  useEffect(() => {
    if (prevCategoryRef.current === selectedCategory) return;
    prevCategoryRef.current = selectedCategory;
    setCategoryAnim(true);
    const timeoutId = setTimeout(() => setCategoryAnim(false), 520);
    return () => clearTimeout(timeoutId);
  }, [selectedCategory]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || SparklesIcon;
  };

  const categoryEmoji: Record<string, string> = {
    "All": "\u2728",
    "AI for Everyday Tasks": "\u{1F4AC}",
    "AI for Trading": "\u{1F4C8}",
    "AI for YouTube/Video": "\u{1F3AC}",
    "AI for Research": "\u{1F52C}",
    "AI Agents & Automation": "\u{1F916}",
    "AI Website Builders": "\u{1F9E9}",
    "AI Journaling & Notes": "\u{1F4D3}",
    "AI Writing & Editing": "\u270D",
    "AI for Search & News": "\u{1F4F0}",
    "AI for Audio & Voice": "\u{1F3A7}",
    "AI for Career": "\u{1F4BC}",
    "Private AI": "\u{1F512}",
    "Image Generation": "\u{1F3A8}",
    "Web3 & Blockchain": "\u26D3",
    "Developer APIs": "\u{1F6E0}"
  };

  const mobilePrimaryCategories = [
    'All',
    'AI for Everyday Tasks',
    'AI for Research',
    'AI Agents & Automation',
    'AI for Search & News',
    'AI Writing & Editing',
    'AI for YouTube/Video',
    'AI for Audio & Voice',
    'Image Generation'
  ];

  const mobileExtraCategories = categories.filter(category =>
    category !== 'All' && !mobilePrimaryCategories.includes(category)
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI for Everyday Tasks": "from-emerald-500 to-cyan-500",
      "AI for Trading": "from-cyan-500 to-blue-500",
      "AI for YouTube/Video": "from-purple-500 to-indigo-500",
      "AI for Research": "from-sky-500 to-cyan-500",
      "AI Agents & Automation": "from-blue-500 to-cyan-500",
      "AI Website Builders": "from-indigo-500 to-cyan-500",
      "AI Journaling & Notes": "from-fuchsia-500 to-purple-500",
      "AI Writing & Editing": "from-fuchsia-500 to-indigo-500",
      "AI for Search & News": "from-teal-500 to-cyan-500",
      "AI for Audio & Voice": "from-purple-500 to-fuchsia-500",
      "AI for Career": "from-emerald-500 to-teal-500",
      "Private AI": "from-indigo-500 to-cyan-500",
      "Image Generation": "from-purple-500 to-pink-500",
      "Web3 & Blockchain": "from-cyan-500 to-purple-500",
      "Developer APIs": "from-cyan-500 to-violet-500"
    };
    return colors[category] || "from-purple-500 to-cyan-500";
  };

  // External logo services (Clearbit, Google Favicons) removed — they leak user
  // browsing data to third parties and are blocked by CSP img-src 'self' anyway.
  // Tool cards use the category icon + gradient as their visual instead.

  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setShowOnlyFree(true);
    setShowOnlyOpenSource(false);
    setShowWeb3Tools(false);
    setSortBy('popular');
    setViewMode('grid');
  };

  const renderToolCard = (tool: AITool, index: number) => {
    const colorClass = getCategoryColor(tool.category);
    const theme = getThemeLabel(colorClass);
    const isExpanded = expandedCardId === tool.id;
    const enriched = getEnrichedData(tool.handle);
    const accent = theme.color;

    // Badge components shared between grid and list
    const themePill = (
      <div
        className="tool-badge flex items-center gap-1.5 rounded-md"
        style={{
          background: `${accent}26`,
          border: `1px solid ${accent}80`,
          color: accent,
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
        />
        {theme.label}
      </div>
    );

    const badges = (
      <div className="flex items-center gap-2 flex-wrap">
        {themePill}
        {tool.openSource && (
          <div className="tool-badge flex items-center gap-1.5 rounded-md" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.5)', color: '#10b981' }}>
            <CodeBracketsIcon className="w-3.5 h-3.5" /> Open Source
          </div>
        )}
        {tool.free && (
          <div className="tool-badge flex items-center gap-1.5 rounded-md" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.5)', color: '#06b6d4' }}>
            <SparkleIcon className="w-3.5 h-3.5" /> Free
          </div>
        )}
        {tool.privacy && (
          <div className="tool-badge flex items-center gap-1.5 rounded-md" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.5)', color: '#8b5cf6' }}>
            <ShieldIcon className="w-3.5 h-3.5" /> Privacy
          </div>
        )}
      </div>
    );

    // Expandable details content
    const expandedContent = (
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isExpanded ? '24rem' : '0' }}
      >
        <div className="pt-4 space-y-3">
          {/* Accent divider line */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}4d, transparent)` }} />

          <a
            href={getSafeExternalUrl(tool.website) ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs hover:opacity-80 truncate block"
            style={{ color: accent }}
          >
            {tool.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
          {enriched?.features && enriched.features.length > 0 && (
            <>
              <div
                className="uppercase tracking-widest"
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: accent, marginBottom: 10 }}
              >
                Key Features
              </div>
              <ul className="space-y-2">
                {enriched.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: accent }}><CheckIcon className="w-3.5 h-3.5" /></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );

    return (
      <div
        key={tool.id}
        onClick={() => setSelectedTool(tool)}
        ref={el => {
          toolRefs.current[tool.id] = el;
        }}
        className={`tool-card tool-card-glow group relative cursor-pointer ${viewMode === 'grid' ? '' : 'flex items-center gap-4'} ${highlightId === tool.id ? 'ring-2 ring-cyan-400/60 ring-offset-2 ring-offset-black/40' : ''}`}
        style={{
          animationDelay: `${400 + index * 50}ms`,
          background: '#0f1117',
          border: '3px solid #434a5e',
          borderRadius: 14,
          padding: viewMode === 'grid' ? 20 : 16,
          boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: 'all 0.25s ease',
          ['--accent' as string]: accent,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = accent;
          el.style.boxShadow = `0 0 20px ${accent}40, 0 8px 40px ${accent}25`;
          el.style.transform = 'translateY(-4px) scale(1.01)';
          el.style.background = '#13161f';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = '#434a5e';
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.background = '#0f1117';
        }}
      >
        {viewMode === 'grid' ? (
          <>
            {/* Visit button — absolute top-right on desktop, hidden on mobile */}
            <a
              href={getSafeExternalUrl(tool.website) ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="tool-card-visit-btn-desktop z-10 flex items-center gap-1.5 rounded-lg font-semibold transition-all"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                background: `${accent}33`,
                border: `1px solid ${accent}99`,
                color: accent,
                borderRadius: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accent}e6`;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${accent}33`;
                e.currentTarget.style.color = accent;
                e.currentTarget.style.borderColor = `${accent}99`;
              }}
            >
              Visit <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>

            {/* Header: Logo + Name */}
            <div className="tool-card-header flex items-start gap-4 mb-3">
              <div
                className="tool-card-logo flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${accent}40, ${accent}1a)`,
                  border: `2px solid ${accent}80`,
                  boxShadow: `0 4px 16px ${accent}40`,
                }}
              >
                <ToolLogo handle={tool.handle} name={tool.name} websiteUrl={tool.website} size={52} colorClass={colorClass} category={tool.category} />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white line-clamp-1 transition-colors"
                  style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  {tool.name}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 400, color: '#94a3b8', marginTop: 4 }}>{tool.category}</p>
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-3" style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, fontWeight: 400, marginTop: 12 }}>
              {tool.description}
            </p>

            {/* Accent divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}4d, transparent)`, margin: '16px 0' }} />

            {/* Badges */}
            <div className="flex items-center justify-between">
              {badges}
            </div>

            {/* Visit button — full-width at bottom on mobile only */}
            <a
              href={getSafeExternalUrl(tool.website) ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="tool-card-visit-btn-mobile flex items-center justify-center gap-1.5 w-full rounded-lg font-semibold"
              style={{
                padding: '10px 16px',
                fontSize: 14,
                fontWeight: 600,
                marginTop: 12,
                background: `${accent}33`,
                border: `1px solid ${accent}99`,
                color: accent,
                borderRadius: 8,
              }}
            >
              Visit <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>

            {/* More details toggle */}
            <div className="mt-3 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCardId(isExpanded ? null : tool.id);
                }}
                className="flex items-center gap-1 transition-colors"
                style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
              >
                More details
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {expandedContent}
          </>
        ) : (
          <>
            <div
              className="flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${accent}40, ${accent}1a)`,
                border: `1px solid ${accent}80`,
                boxShadow: `0 4px 12px ${accent}33`,
              }}
            >
              <ToolLogo handle={tool.handle} name={tool.name} websiteUrl={tool.website} size={48} colorClass={colorClass} category={tool.category} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white transition-colors" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {tool.name}
              </h3>
              <p className="line-clamp-1" style={{ fontSize: 14, color: '#cbd5e1' }}>{tool.description}</p>
            </div>

            <div className="flex items-center gap-2">
              {badges}
            </div>
          </>
        )}

        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ borderRadius: 12, background: `radial-gradient(ellipse at center, ${accent}08, transparent 70%)` }}
        />
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="tools" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Blockchain Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-cyan-950/10" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Web3 Theme */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <SparklesIcon className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Your AI Arsenal
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {aiTools.length}+ Free AI Tools
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              For Real People
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-10">
            No more endless searching. Every tool here is free to start or open-source and actually useful.
            From trading to YouTube, research to automation we have you covered.
          </p>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowDirectory(!showDirectory)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-purple-500/30 text-white bg-white/5 hover:bg-white/10 transition-colors"
              aria-expanded={showDirectory}
            >
              {showDirectory ? 'Hide Enhanced Directory' : 'Show Enhanced Directory'}
              <ChevronDownLucide className={`w-4 h-4 transition-transform ${showDirectory ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showDirectory && (
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 text-left">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Enhanced AI Tools Directory</h3>
                <p className="text-gray-300 mb-4">
                  Enhanced AI Tools Directory now features 200 open-source & free tools across community-focused categories.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-gray-500">
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2">Tools Included</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {featuredCategories.map(row => (
                        <tr key={row.category}>
                          <td className="py-2 pr-4 font-semibold text-white/90">{row.category}</td>
                          <td className="py-2 text-gray-400">{row.tools.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">New Features Added</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {featureHighlights.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-cyan-300 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Real-World Focus</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Every tool is selected for practical daily use, not hype.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {realWorldFocus.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-purple-300 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Search and Filters */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 lg:p-5 shadow-lg shadow-purple-500/10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
                {/* Enhanced Search Bar */}
                <div ref={toolsSearchContainerRef} className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                    <input
                      type="text"
                      placeholder="Search AI tools by name or what they do..."
                      value={searchQuery}
                      onFocus={() => setShowSearchSuggestions(true)}
                      onChange={(e) => {
                        setShowSearchSuggestions(true);
                        setSearchQuery(e.target.value);
                        setSelectedCategory('All');
                      }}
                      ref={toolsSearchInputRef}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-cyan-400/40 transition-all shadow-md shadow-cyan-500/15 backdrop-blur-sm text-lg font-semibold"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {searchQuery && showSearchSuggestions && (
                    <div className="mt-3 rounded-2xl bg-gradient-to-br from-slate-950/95 via-black/95 to-slate-900/95 border border-white/15 ring-1 ring-cyan-500/20 shadow-[0_20px_60px_rgba(14,165,233,0.35)] backdrop-blur-xl max-h-80 overflow-y-auto animate-fade-in">
                      {suggestions.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-400">No tools found.</div>
                      ) : (
                        suggestions.map((tool) => (
                          <div
                            key={`suggest-${tool.id}`}
                            className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => focusToolCard(tool)}
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-white truncate">{tool.name}</div>
                              <div className="text-xs text-gray-400 truncate">{tool.category}</div>
                              <div className="flex gap-2 mt-1">
                                {tool.openSource && <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Open Source</span>}
                                {tool.free && <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">Free</span>}
                                {tool.web3 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-500/30">Web3</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {tool.website && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); openToolSite(tool); }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                                >
                                  Open
                                </button>
                              )}
                              <button
                                onClick={(e) => { e.stopPropagation(); focusToolCard(tool); }}
                                className="text-xs text-gray-300 px-2 py-1 rounded-lg bg-white/5 border border-white/10"
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

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 self-start">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all border ${viewMode === 'grid' ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-purple-400/40 shadow-md shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/10'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all border ${viewMode === 'list' ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-purple-400/40 shadow-md shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/10'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Advanced Filters Row */}
            <div className="flex flex-col xl:flex-row gap-6 xl:items-start">
              {/* Quick Filters stacked */}
                <div className="flex flex-col gap-3 min-w-[180px]">
                  <button
                    onClick={() => setShowOnlyFree(!showOnlyFree)}
                    className={`w-full sm:w-auto text-left sm:text-center px-4 py-2 rounded-full text-sm font-medium transition-all border hover:-translate-y-0.5 ${showOnlyFree ? 'bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-teal-500/40 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">🔌</span>
                      Free Only
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setShowOnlyOpenSource(!showOnlyOpenSource)}
                    className={`w-full sm:w-auto text-left sm:text-center px-4 py-2 rounded-full text-sm font-medium transition-all border hover:-translate-y-0.5 ${showOnlyOpenSource ? 'bg-gradient-to-r from-purple-500/40 via-indigo-500/40 to-blue-500/40 text-white border-purple-400/50 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">🧑‍💻</span>
                      Open Source
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setShowWeb3Tools(!showWeb3Tools)}
                    className={`w-full sm:w-auto text-left sm:text-center px-4 py-2 rounded-full text-sm font-medium transition-all border hover:-translate-y-0.5 ${showWeb3Tools ? 'bg-gradient-to-r from-cyan-500/40 via-sky-500/40 to-purple-500/40 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">⛓️</span>
                      Web3 & Blockchain
                    </span>
                  </button>
                </div>

                {/* Category Filter */}
                <div className="flex-1" ref={mobileMoreCategoriesRef}>
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    {mobilePrimaryCategories.map(category => {
                      const isActive = selectedCategory === category;
                      return (
                        <button
                          key={`mobile-primary-${category}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowMobileMoreCategories(false);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all border ${isActive
                            ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-cyan-400/40 shadow-md shadow-cyan-500/20'
                            : 'bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 border-white/10'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{categoryEmoji[category] || '\u2728'}</span>
                            {category}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        setShowMobileMoreCategories((open) => !open);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all border ${showMobileMoreCategories || mobileExtraCategories.includes(selectedCategory)
                        ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-cyan-400/40 shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{'\u2795'}</span>
                        More
                      </span>
                    </button>
                  </div>

                  {showMobileMoreCategories && mobileExtraCategories.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                      {mobileExtraCategories.map(category => (
                        <button
                          key={`mobile-extra-${category}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowMobileMoreCategories(false);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all border ${selectedCategory === category
                            ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-cyan-400/40 shadow-md shadow-cyan-500/20'
                            : 'bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 border-white/10'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{categoryEmoji[category] || '\u2728'}</span>
                            {category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="hidden sm:flex sm:flex-wrap sm:gap-3 sm:flex-1">
                    {categories.slice(0, 9).map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full sm:w-auto text-left sm:text-center px-4 py-2 rounded-full text-sm font-medium transition-all border hover:-translate-y-0.5 ${selectedCategory === category ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border-cyan-400/40 shadow-md shadow-cyan-500/20' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10 hover:border-cyan-500/30 hover:shadow-md hover:shadow-cyan-500/10'} focus:outline-none focus:ring-2 focus:ring-cyan-500/30`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{categoryEmoji[category] || '\u2728'}</span>
                          {category}
                        </span>
                      </button>
                    ))}

                    {/* More Categories Dropdown */}
                    {categories.length > 9 && (
                      <div className="relative" ref={desktopMoreCategoriesRef}>
                        <button
                          onClick={() => {
                            setIsFilterOpen((open) => !open);
                            setShowMobileMoreCategories(false);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 border hover:-translate-y-0.5 ${isFilterOpen ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'}`}
                        >
                          <span>➕</span>
                          More
                          <ChevronDownLucide className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isFilterOpen && (
                          <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl bg-gradient-to-br from-black/90 via-slate-900/90 to-black/90 border border-white/15 backdrop-blur-xl z-50 shadow-2xl shadow-cyan-500/10 animate-fade-in max-h-48 overflow-y-auto origin-bottom">
                            <div className="space-y-1">
                              {categories.slice(9).map(category => (
                                <button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setIsFilterOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${selectedCategory === category ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'} hover:-translate-y-0.5`}
                                >
                                  {React.createElement(getCategoryIcon(category), { className: "w-4 h-4" })}
                                  {category}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sort & Stats */}
                <div className="flex items-center gap-4 self-start">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'popular' | 'newest' | 'name')}
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-slate-900 via-black to-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 backdrop-blur-sm transition-all duration-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/15"
                    style={{ backgroundColor: '#0b0b10', color: '#e5e7eb' }}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-sm text-gray-200">
                      {filteredTools.length} tools found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid/List */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${categoryAnim ? 'category-swap' : ''}`}>
          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                <SearchIcon className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools match your filters</h3>
              <p className="text-gray-400">Try clearing filters or picking a different category.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : showGrouped ? (
            <div className="space-y-10">
              {groupedTools.map(group => {
                const Icon = getCategoryIcon(group.category);
                const colorClass = getCategoryColor(group.category);
                const isExpanded = expandedCategories.has(group.category);
                const visibleGroupTools = isExpanded
                  ? group.tools
                  : group.tools.slice(0, categoryPageSize);

                return (
                  <div key={group.category}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{group.category}</h3>
                          <p className="text-sm text-gray-400">{group.tools.length} tools</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(group.category)}
                        className="px-3 py-2 rounded-lg border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-colors"
                      >
                        View all
                      </button>
                    </div>

                    <div className={viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5'
                      : 'space-y-4'
                    }>
                      {visibleGroupTools.map((tool, index) => renderToolCard(tool, index))}
                    </div>

                    {group.tools.length > categoryPageSize && (
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => toggleCategoryExpansion(group.category)}
                          className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {isExpanded ? 'Show less' : `Show more ${group.category}`}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5'
                : 'space-y-4'
              }>
                {visibleTools.map((tool, index) => renderToolCard(tool, index))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                {filteredTools.length > visibleCount && (
                  <button
                    onClick={() => setVisibleCount(Math.min(visibleCount + pageSize, filteredTools.length))}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Show more tools
                  </button>
                )}
                {visibleCount > pageSize && (
                  <button
                    onClick={() => setVisibleCount(pageSize)}
                    className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Show less
                  </button>
                )}
              </div>

              <div className="mt-3 text-center text-sm text-gray-400">
                Showing {Math.min(visibleCount, filteredTools.length)} of {filteredTools.length} tools
              </div>
            </>
          )}
        </div>

        {/* Web3 Revolution Stats */}
        <div className={`mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-indigo-500/10 border border-purple-500/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">{aiTools.length}+</div>
              <div className="text-sm text-gray-300">Total Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {aiTools.filter(t => t.openSource).length}
              </div>
              <div className="text-sm text-gray-300">Open Source</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-300 mb-1">
                {aiTools.filter(t => t.web3).length}
              </div>
              <div className="text-sm text-gray-300">Web3 & Blockchain</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {aiTools.filter(t => t.privacy).length}
              </div>
              <div className="text-sm text-gray-300">Privacy Focused</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {aiTools.filter(t => t.free).length}
              </div>
              <div className="text-sm text-gray-300">Free Tools</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-300">
              <span className="text-purple-300 font-semibold">Join the movement:</span>{" "}
              No subscriptions, no tracking, just pure innovation powered by open technology.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Detail Dialog with Blockchain Theme */}
      {selectedTool && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[90] flex min-h-dvh items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-black to-gray-900 border border-purple-500/30 mx-auto my-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <ToolLogo handle={selectedTool.handle} name={selectedTool.name} websiteUrl={selectedTool.website} size={56} colorClass={getCategoryColor(selectedTool.category)} category={selectedTool.category} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedTool.name}</h3>
                    <p className="text-sm text-gray-400">{(() => { const e = getEnrichedData(selectedTool.handle); return e?.tagline || selectedTool.category; })()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-600/60 via-cyan-500/50 to-amber-400/40 border border-white/15 text-white shadow-[0_0_25px_rgba(124,58,237,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] hover:scale-105 transition-all duration-200 backdrop-blur"
                  aria-label="Close tool details"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 via-cyan-400/30 to-amber-300/25 blur-xl opacity-70 animate-pulse"
                  />
                  <span className="relative z-10 text-xl font-bold drop-shadow-lg">✕</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">{selectedTool.description}</p>

              {/* Tags */}
              {(() => {
                const enriched = getEnrichedData(selectedTool.handle);
                return (
                  <>
                    {enriched?.tags && enriched.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {enriched.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTool.web3 && (
                        <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-200 border border-cyan-500/30 text-sm">
                          <span className="flex items-center gap-1.5">
                            <NetworkIcon className="w-4 h-4" />
                            Web3 & Blockchain
                          </span>
                        </div>
                      )}
                      {selectedTool.openSource && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}>
                          <CodeBracketsIcon className="w-4 h-4" />
                          Open Source
                        </div>
                      )}
                      {selectedTool.free && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ background: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.3)', color: '#06b6d4' }}>
                          <SparkleIcon className="w-4 h-4" />
                          Free
                        </div>
                      )}
                      {enriched?.badges.freemium && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold">
                          <SparklesIcon className="w-4 h-4" />
                          Freemium
                        </div>
                      )}
                      {selectedTool.privacy && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ background: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.3)', color: '#8b5cf6' }}>
                          <ShieldIcon className="w-4 h-4" />
                          Privacy First
                        </div>
                      )}
                      {enriched?.badges.selfHostable && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-semibold">
                          <ServerIcon className="w-4 h-4" />
                          Self-Hostable
                        </div>
                      )}
                      {enriched?.badges.noSignup && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-semibold">
                          <CheckIcon className="w-4 h-4" />
                          No Signup
                        </div>
                      )}
                      {enriched?.badges.apiAvailable && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm font-semibold">
                          <TerminalIcon className="w-4 h-4" />
                          API Available
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {enriched?.features && enriched.features.length > 0 ? (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <StarIcon className="w-4 h-4 text-purple-300" />
                          <span className="uppercase tracking-wider">Key Features</span>
                        </h4>
                        <ul className={`text-sm text-gray-300 ${enriched.features.length > 3 ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'space-y-2'}`}>
                          {enriched.features.map((feature, i) => {
                            const FeatureIcon = getFeatureIcon(feature);
                            return (
                              <li key={i} className="flex items-start gap-2">
                                <FeatureIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <StarIcon className="w-4 h-4 text-purple-300" />
                          <span className="uppercase tracking-wider">About This Tool</span>
                        </h4>
                        <p className="text-sm text-gray-300">{selectedTool.description}</p>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedToolWebsite ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    if (selectedToolWebsite) return;
                    event.preventDefault();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  Visit Website
                </a>
                {(() => {
                  const enriched = getEnrichedData(selectedTool.handle);
                  const ghUrl = enriched?.links.github ? getSafeExternalUrl(enriched.links.github) : null;
                  return ghUrl ? (
                    <a
                      href={ghUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-2"
                      title="View on GitHub"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  ) : null;
                })()}
                <button
                  onClick={() => copyToClipboard(selectedTool.website)}
                  className="px-4 py-3 rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-colors"
                >
                  {copiedUrl === selectedTool.website ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    'Copy URL'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
