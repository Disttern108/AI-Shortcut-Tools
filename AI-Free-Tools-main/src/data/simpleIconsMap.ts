/**
 * Privacy-safe tool logo system using simple-icons.
 *
 * simple-icons provides 3400+ brand SVGs bundled at build time.
 * Zero network requests at runtime — all SVGs are inlined during build.
 *
 * We use named ESM imports so Vite/Rollup tree-shakes unused icons.
 * Only the mapped icons below end up in the final bundle.
 */

import {
    siGooglegemini,
    siAlibabacloud,
    siHuggingface,
    siPerplexity,
    siSearxng,
    siMeilisearch,
    siAirbyte,
    siDocker,
    siHomeassistant,
    siTon,
    siEthereum,
    siNetflix,
    siDvc,
    siStackblitz,
    siVercel,
    siReplit,
    siCoder,
    siGoogleforms,
    siGoogleclassroom,
    siMeta,
    siObsstudio,
    siN8n,
    siLangchain,
    siChatbot,
} from 'simple-icons'

type IconData = { svg: string; hex: string }

// Map tool handle → simple-icons data.
// Only well-known brands with a simple-icons entry are mapped here.
// All other tools gracefully fall back to colored-initials in ToolLogo.tsx.
const iconMap: Record<string, IconData> = {
    // ── AI Platforms ───────────────────────────────────────────────────
    'gemini': { svg: siGooglegemini.svg, hex: siGooglegemini.hex },
    'qwen': { svg: siAlibabacloud.svg, hex: siAlibabacloud.hex },
    'hugging-face': { svg: siHuggingface.svg, hex: siHuggingface.hex },
    'perplexity': { svg: siPerplexity.svg, hex: siPerplexity.hex },
    'llama-3': { svg: siMeta.svg, hex: siMeta.hex },

    // ── Developer Tools / IDEs ─────────────────────────────────────────
    'coder': { svg: siCoder.svg, hex: siCoder.hex },

    // ── Self-hosted / Search ───────────────────────────────────────────
    'searxng': { svg: siSearxng.svg, hex: siSearxng.hex },
    'meilisearch': { svg: siMeilisearch.svg, hex: siMeilisearch.hex },
    'airbyte': { svg: siAirbyte.svg, hex: siAirbyte.hex },
    'frigate-nvr': { svg: siHomeassistant.svg, hex: siHomeassistant.hex },

    // ── ML / Data / Workflow ───────────────────────────────────────────
    'dvc-ai': { svg: siDvc.svg, hex: siDvc.hex },
    'metaflow-org': { svg: siNetflix.svg, hex: siNetflix.hex },
    'flowise': { svg: siLangchain.svg, hex: siLangchain.hex },

    // ── Blockchain / Web3 ──────────────────────────────────────────────
    'cocoon-tg': { svg: siTon.svg, hex: siTon.hex },
    'bagel': { svg: siEthereum.svg, hex: siEthereum.hex },

    // ── Platforms ──────────────────────────────────────────────────────
    'bolt-new': { svg: siStackblitz.svg, hex: siStackblitz.hex },
    'v0-dev': { svg: siVercel.svg, hex: siVercel.hex },
    'replit-agent': { svg: siReplit.svg, hex: siReplit.hex },
    'n8n': { svg: siN8n.svg, hex: siN8n.hex },

    // ── Chatbots ───────────────────────────────────────────────────────
    'hexabot': { svg: siChatbot.svg, hex: siChatbot.hex },
    'chatpad-ai': { svg: siChatbot.svg, hex: siChatbot.hex },
    'chattyui': { svg: siChatbot.svg, hex: siChatbot.hex },

    // ── Notable ────────────────────────────────────────────────────────
    'deeplivecam': { svg: siObsstudio.svg, hex: siObsstudio.hex },
    'opnform': { svg: siGoogleforms.svg, hex: siGoogleforms.hex },
    'classroomio': { svg: siGoogleclassroom.svg, hex: siGoogleclassroom.hex },

    // ── Docker-based tools ─────────────────────────────────────────────
    'activepieces': { svg: siDocker.svg, hex: siDocker.hex },
}

/**
 * Get a simple-icons SVG for a tool handle.
 * Returns { svg, hex } or null if no mapping exists.
 */
export function getSimpleIcon(handle: string): IconData | null {
    return iconMap[handle] ?? null
}
