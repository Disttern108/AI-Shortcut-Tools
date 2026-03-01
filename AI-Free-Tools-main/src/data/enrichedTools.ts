import { aiTools } from '../../aitoollist'
import type { AITool } from '../../aitoollist'

export interface EnrichedToolData {
  tagline?: string
  tags: string[]
  features: string[]
  badges: {
    openSource?: boolean
    free?: boolean
    freemium?: boolean
    paid?: boolean
    privacyFocused?: boolean
    selfHostable?: boolean
    noSignup?: boolean
    apiAvailable?: boolean
  }
  links: {
    website: string
    github?: string
    docs?: string
    huggingface?: string
  }
}

// ── Fully researched tools ─────────────────────────────────────────────
const researched: Record<string, EnrichedToolData> = {
  'lm-arena': {
    tagline: 'Compare LLMs with anonymous head-to-head battles',
    tags: ['benchmark', 'LLM', 'comparison', 'leaderboard'],
    features: [
      'Anonymous side-by-side model battles',
      'Community-driven Elo leaderboard',
      'Multi-turn conversation support',
      'Free and unlimited usage',
    ],
    badges: { openSource: true, free: true, noSignup: true },
    links: {
      website: 'https://lmarena.ai',
      github: 'https://github.com/lm-sys/FastChat',
    },
  },

  'jan-ai': {
    tagline: 'Run LLMs locally on your desktop',
    tags: ['local', 'LLM', 'desktop', 'privacy', 'offline'],
    features: [
      'Run GGUF models fully offline',
      'Built-in model hub with one-click downloads',
      'OpenAI-compatible local API server',
      'Cross-platform (Windows, Mac, Linux)',
      'Zero data collection or telemetry',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, noSignup: true },
    links: {
      website: 'https://jan.ai',
      github: 'https://github.com/janhq/jan',
      docs: 'https://jan.ai/docs',
    },
  },

  'lm-studio': {
    tagline: 'Discover, download, and run local LLMs',
    tags: ['local', 'LLM', 'desktop', 'privacy', 'GGUF'],
    features: [
      'Browse and download models from Hugging Face',
      'Chat with models completely offline',
      'Local OpenAI-compatible API server',
      'GPU acceleration support',
      'Model parameter tuning UI',
    ],
    badges: { free: true, privacyFocused: true, noSignup: true, apiAvailable: true },
    links: {
      website: 'https://lmstudio.ai',
      docs: 'https://lmstudio.ai/docs',
    },
  },

  'gpt4all': {
    tagline: 'Run powerful LLMs locally on consumer hardware',
    tags: ['local', 'LLM', 'desktop', 'privacy', 'open-source'],
    features: [
      'Runs on CPU with no GPU required',
      'Local document Q&A (LocalDocs)',
      'OpenAI-compatible API server',
      'Cross-platform desktop app',
      'Model ecosystem with one-click install',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, noSignup: true },
    links: {
      website: 'https://gpt4all.io',
      github: 'https://github.com/nomic-ai/gpt4all',
      docs: 'https://docs.gpt4all.io',
    },
  },

  'open-webui': {
    tagline: 'Self-hosted ChatGPT-like web interface',
    tags: ['chat', 'self-hosted', 'RAG', 'multi-model', 'privacy'],
    features: [
      'Chat with multiple LLM providers (Ollama, OpenAI, etc.)',
      'Built-in RAG with document upload',
      'Plugin and tool ecosystem',
      'Multi-user with role-based access',
      'Web search integration',
      'Active community with frequent updates',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://openwebui.com',
      github: 'https://github.com/open-webui/open-webui',
      docs: 'https://docs.openwebui.com',
    },
  },

  'perplexity': {
    tagline: 'AI-powered search with real-time sourced answers',
    tags: ['search', 'research', 'citations', 'chat'],
    features: [
      'Real-time web search with source citations',
      'Follow-up question support',
      'Multiple AI model options',
      'Collections for organizing research',
      'Free unlimited basic searches',
    ],
    badges: { freemium: true, noSignup: false },
    links: {
      website: 'https://www.perplexity.ai',
    },
  },

  'phind': {
    tagline: 'AI search engine built for developers',
    tags: ['search', 'code', 'developer', 'chat'],
    features: [
      'Code-focused search results',
      'Source citations for every answer',
      'Follow-up conversation support',
      'VS Code extension available',
    ],
    badges: { free: true, noSignup: true },
    links: {
      website: 'https://www.phind.com',
    },
  },

  'notebooklm': {
    tagline: 'Google AI research assistant for your documents',
    tags: ['research', 'documents', 'summarization', 'audio'],
    features: [
      'Upload and analyze PDFs, docs, and web pages',
      'AI-generated audio overviews (podcasts)',
      'Source-grounded responses only',
      'Multi-document cross-referencing',
      'Free with Google account',
    ],
    badges: { free: true },
    links: {
      website: 'https://notebooklm.google.com',
    },
  },

  'gemini': {
    tagline: 'Google multimodal AI assistant',
    tags: ['chat', 'multimodal', 'image', 'code', 'google'],
    features: [
      'Text, image, and code understanding',
      'Google Workspace integration',
      'Free tier with Gemini 1.5 Flash',
      'Real-time information access',
      'Multi-turn conversation',
    ],
    badges: { freemium: true, apiAvailable: true },
    links: {
      website: 'https://gemini.google.com',
      docs: 'https://ai.google.dev/docs',
    },
  },

  'grok': {
    tagline: 'xAI conversational AI with real-time knowledge',
    tags: ['chat', 'reasoning', 'real-time'],
    features: [
      'Real-time information access via X',
      'Strong reasoning capabilities',
      'Open-source model weights (Grok-1)',
      'Image understanding',
      'Free tier available',
    ],
    badges: { openSource: false, freemium: true },
    links: {
      website: 'https://grok.com',
    },
  },

  'cody': {
    tagline: 'AI coding assistant that understands your codebase',
    tags: ['code', 'autocomplete', 'chat', 'IDE'],
    features: [
      'Full codebase context awareness',
      'AI autocomplete and chat',
      'VS Code and JetBrains support',
      'Multiple LLM provider support',
      'Free tier for individual developers',
    ],
    badges: { openSource: true, free: true, apiAvailable: true },
    links: {
      website: 'https://sourcegraph.com/cody',
      github: 'https://github.com/sourcegraph/cody',
      docs: 'https://sourcegraph.com/docs/cody',
    },
  },

  'continue-dev': {
    tagline: 'Open-source AI code assistant for any IDE',
    tags: ['code', 'autocomplete', 'open-source', 'IDE'],
    features: [
      'Works with any LLM (local or cloud)',
      'VS Code and JetBrains support',
      'Tab autocomplete',
      'Inline code editing',
      'Codebase context with @mentions',
    ],
    badges: { openSource: true, free: true, selfHostable: true },
    links: {
      website: 'https://continue.dev',
      github: 'https://github.com/continuedev/continue',
      docs: 'https://docs.continue.dev',
    },
  },

  'tabby': {
    tagline: 'Self-hosted AI coding assistant',
    tags: ['code', 'self-hosted', 'autocomplete', 'privacy'],
    features: [
      'Self-hosted GitHub Copilot alternative',
      'Supports multiple open-source models',
      'IDE extensions for VS Code, Vim, IntelliJ',
      'Repository-level code context',
      'Full data privacy control',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://tabby.tabbyml.com',
      github: 'https://github.com/TabbyML/tabby',
      docs: 'https://tabby.tabbyml.com/docs',
    },
  },

  'cline': {
    tagline: 'Autonomous coding agent for VS Code',
    tags: ['code', 'agent', 'automation', 'VS Code'],
    features: [
      'Autonomous multi-step coding tasks',
      'File creation and editing',
      'Terminal command execution',
      'Human-in-the-loop oversight',
      'Works with any LLM provider',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://github.com/cline/cline',
      github: 'https://github.com/cline/cline',
    },
  },

  'openhands': {
    tagline: 'Open-source AI software development agents',
    tags: ['agent', 'code', 'automation', 'development'],
    features: [
      'Autonomous coding and debugging',
      'Sandboxed execution environment',
      'Web browsing capability',
      'GitHub integration',
      'Multiple LLM support',
    ],
    badges: { openSource: true, free: true, selfHostable: true },
    links: {
      website: 'https://github.com/All-Hands-AI/OpenHands',
      github: 'https://github.com/All-Hands-AI/OpenHands',
      docs: 'https://docs.all-hands.dev',
    },
  },

  'fooocus': {
    tagline: 'Easy image generation inspired by Midjourney',
    tags: ['image', 'local', 'Stable Diffusion', 'open-source'],
    features: [
      'Minimal UI, maximum quality',
      'Offline and fully local',
      'Runs on consumer GPUs (4GB+ VRAM)',
      'Built-in style presets',
      'Inpaint and outpaint support',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, noSignup: true },
    links: {
      website: 'https://github.com/lllyasviel/Fooocus',
      github: 'https://github.com/lllyasviel/Fooocus',
    },
  },

  'comfyui': {
    tagline: 'Node-based UI for Stable Diffusion workflows',
    tags: ['image', 'nodes', 'workflow', 'Stable Diffusion'],
    features: [
      'Visual node-based workflow editor',
      'Advanced image generation pipelines',
      'Custom node ecosystem',
      'Queue and batch processing',
      'Fully local and private',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true },
    links: {
      website: 'https://www.comfy.org',
      github: 'https://github.com/comfyanonymous/ComfyUI',
    },
  },

  'flux': {
    tagline: 'State-of-the-art open-source text-to-image model',
    tags: ['image', 'text-to-image', 'open-source', 'model'],
    features: [
      'High-quality image generation from text',
      'Multiple model variants (Pro, Dev, Schnell)',
      'Open-weight Schnell model for local use',
      'Commercial-friendly licensing',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://blackforestlabs.ai',
      github: 'https://github.com/black-forest-labs/flux',
      huggingface: 'https://huggingface.co/black-forest-labs',
    },
  },

  'whisper': {
    tagline: 'Open-source speech recognition for 99 languages',
    tags: ['speech', 'transcription', 'local', 'multilingual'],
    features: [
      'Accurate transcription in 99 languages',
      'Translation to English',
      'Run fully locally',
      'Multiple model sizes (tiny to large)',
      'Timestamp-level accuracy',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, noSignup: true },
    links: {
      website: 'https://github.com/openai/whisper',
      github: 'https://github.com/openai/whisper',
      huggingface: 'https://huggingface.co/openai/whisper-large-v3',
    },
  },

  'piper-tts': {
    tagline: 'Fast local text-to-speech in 30+ languages',
    tags: ['voice', 'TTS', 'local', 'open-source'],
    features: [
      'Natural-sounding voices',
      'Runs on Raspberry Pi and low-end devices',
      '30+ language support',
      'ONNX runtime for speed',
      'Home Assistant integration',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, noSignup: true },
    links: {
      website: 'https://github.com/rhasspy/piper',
      github: 'https://github.com/rhasspy/piper',
    },
  },

  'dify': {
    tagline: 'Open-source LLM app development platform',
    tags: ['platform', 'agents', 'workflow', 'RAG', 'no-code'],
    features: [
      'Visual AI workflow builder',
      'Built-in RAG pipeline',
      'Agent framework with tool use',
      'Observability and monitoring',
      'Multi-model support',
      'Self-hostable with Docker',
    ],
    badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://dify.ai',
      github: 'https://github.com/langgenius/dify',
      docs: 'https://docs.dify.ai',
    },
  },

  'dify-ai': {
    tagline: 'Open-source LLM app development platform',
    tags: ['platform', 'agents', 'workflow', 'RAG', 'no-code'],
    features: [
      'Visual AI workflow builder',
      'Built-in RAG pipeline',
      'Agent framework with tool use',
      'Multi-model support',
      'Self-hostable with Docker',
    ],
    badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://dify.ai',
      github: 'https://github.com/langgenius/dify',
      docs: 'https://docs.dify.ai',
    },
  },


  'flowise': {
    tagline: 'Drag-and-drop UI to build LLM apps',
    tags: ['no-code', 'agents', 'workflow', 'chatbot'],
    features: [
      'Visual drag-and-drop builder',
      'Pre-built LangChain components',
      'Custom chatbot deployment',
      'API endpoint generation',
      'Self-hostable with Docker',
    ],
    badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://flowiseai.com',
      github: 'https://github.com/FlowiseAI/Flowise',
      docs: 'https://docs.flowiseai.com',
    },
  },

  'anythingllm': {
    tagline: 'All-in-one AI desktop app for private use',
    tags: ['local', 'chat', 'RAG', 'privacy', 'desktop'],
    features: [
      'Chat with documents privately',
      'Supports any LLM (local or cloud)',
      'Built-in RAG with vector storage',
      'Agent capabilities with tools',
      'Multi-user workspace support',
      'Fully local operation option',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true },
    links: {
      website: 'https://anythingllm.com',
      github: 'https://github.com/Mintplex-Labs/anything-llm',
      docs: 'https://docs.anythingllm.com',
    },
  },

  'librechat': {
    tagline: 'Open-source ChatGPT clone with multi-provider support',
    tags: ['chat', 'multi-model', 'self-hosted', 'open-source'],
    features: [
      'Multiple AI provider support (OpenAI, Anthropic, Google, etc.)',
      'Plugin system and tools',
      'Full conversation history',
      'User authentication and management',
      'Self-hostable with Docker',
    ],
    badges: { openSource: true, free: true, selfHostable: true },
    links: {
      website: 'https://librechat.ai',
      github: 'https://github.com/danny-avila/LibreChat',
      docs: 'https://www.librechat.ai/docs',
    },
  },

  'privategpt': {
    tagline: 'Interact with documents 100% privately',
    tags: ['privacy', 'documents', 'local', 'RAG'],
    features: [
      'Complete offline operation',
      'Document ingestion (PDF, DOCX, etc.)',
      'Local LLM integration',
      'REST API for integration',
      'No data leaves your machine',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, noSignup: true, apiAvailable: true },
    links: {
      website: 'https://privategpt.dev',
      github: 'https://github.com/zylon-ai/private-gpt',
      docs: 'https://docs.privategpt.dev',
    },
  },

  'bolt-new': {
    tagline: 'AI-powered full-stack web app builder',
    tags: ['web', 'app-builder', 'full-stack', 'deployment'],
    features: [
      'Prompt-to-app generation',
      'Live preview in browser',
      'Full-stack support (frontend + backend)',
      'One-click deployment',
      'Open-source fork available',
    ],
    badges: { openSource: true, freemium: true },
    links: {
      website: 'https://bolt.new',
      github: 'https://github.com/stackblitz/bolt.new',
    },
  },

  'v0-dev': {
    tagline: 'AI-powered UI component generation by Vercel',
    tags: ['UI', 'React', 'components', 'design'],
    features: [
      'Generate React/Next.js components from text',
      'Iterative refinement with chat',
      'Copy-paste ready code output',
      'Tailwind CSS styling',
      'Free tier available',
    ],
    badges: { freemium: true },
    links: {
      website: 'https://v0.dev',
    },
  },

  'searxng': {
    tagline: 'Privacy-respecting open-source metasearch engine',
    tags: ['search', 'privacy', 'self-hosted', 'metasearch'],
    features: [
      'Aggregates 70+ search engines',
      'No tracking or profiling',
      'Self-hostable with Docker',
      'Customizable search categories',
      'Tor-friendly',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true, noSignup: true },
    links: {
      website: 'https://docs.searxng.org',
      github: 'https://github.com/searxng/searxng',
      docs: 'https://docs.searxng.org',
    },
  },

  'khoj': {
    tagline: 'Open-source AI personal assistant',
    tags: ['assistant', 'search', 'notes', 'self-hosted'],
    features: [
      'Search your notes, docs, and the web',
      'Self-hostable with offline support',
      'Obsidian and Emacs plugins',
      'Image generation capabilities',
      'Scheduled automations',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true },
    links: {
      website: 'https://khoj.dev',
      github: 'https://github.com/khoj-ai/khoj',
      docs: 'https://docs.khoj.dev',
    },
  },

  'llama3': {
    tagline: 'Meta open-source LLM family',
    tags: ['LLM', 'model', 'open-source', 'research'],
    features: [
      'State-of-the-art open weights',
      'Multiple sizes (8B, 70B, 405B)',
      'Strong reasoning and coding',
      'Multilingual support',
      'Commercial license available',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://llama.meta.com',
      github: 'https://github.com/meta-llama/llama3',
      huggingface: 'https://huggingface.co/meta-llama',
    },
  },

  'gemma': {
    tagline: 'Google lightweight open-source AI models',
    tags: ['LLM', 'model', 'lightweight', 'Google'],
    features: [
      'Optimized for efficient deployment',
      'Multiple sizes (2B, 7B, 27B)',
      'Runs on consumer hardware',
      'Commercial-friendly license',
      'Strong benchmark performance for size',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://ai.google.dev/gemma',
      github: 'https://github.com/google/gemma.cpp',
      huggingface: 'https://huggingface.co/google/gemma-2-9b',
    },
  },

  'upscayl': {
    tagline: 'Free open-source AI image upscaler',
    tags: ['image', 'upscale', 'desktop', 'local'],
    features: [
      'AI-powered image upscaling',
      'Batch processing support',
      'Multiple upscaling models',
      'Local processing, no cloud',
      'Cross-platform desktop app',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, noSignup: true },
    links: {
      website: 'https://upscayl.org',
      github: 'https://github.com/upscayl/upscayl',
    },
  },

  'aider': {
    tagline: 'AI pair programming in your terminal',
    tags: ['code', 'terminal', 'pair-programming', 'git'],
    features: [
      'Edit code with natural language',
      'Git-aware with automatic commits',
      'Works with any LLM (GPT-4, Claude, local)',
      'Multi-file editing support',
      'Voice coding mode',
    ],
    badges: { openSource: true, free: true, noSignup: true },
    links: {
      website: 'https://aider.chat',
      github: 'https://github.com/paul-gauthier/aider',
      docs: 'https://aider.chat/docs',
    },
  },

  'n8n': {
    tagline: 'Workflow automation with AI integrations',
    tags: ['automation', 'workflow', 'no-code', 'integrations'],
    features: [
      'Visual workflow builder with 400+ integrations',
      'AI agent nodes for LLM-powered automation',
      'Self-hostable with Docker',
      'Community nodes marketplace',
      'Credential encryption and audit logging',
    ],
    badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://n8n.io',
      github: 'https://github.com/n8n-io/n8n',
      docs: 'https://docs.n8n.io',
    },
  },

  'stable-diffusion': {
    tagline: 'Open-source image generation model',
    tags: ['image', 'text-to-image', 'open-source', 'local'],
    features: [
      'Text-to-image and image-to-image',
      'Runs locally on consumer GPUs',
      'Massive community model ecosystem',
      'ControlNet and LoRA support',
      'Multiple UI options (A1111, ComfyUI)',
    ],
    badges: { openSource: true, free: true, privacyFocused: true },
    links: {
      website: 'https://stability.ai',
      github: 'https://github.com/Stability-AI/stablediffusion',
      huggingface: 'https://huggingface.co/stabilityai',
    },
  },

  'deepseek-r1': {
    tagline: 'Open-source reasoning model with chain-of-thought',
    tags: ['LLM', 'reasoning', 'open-source', 'research'],
    features: [
      'Transparent chain-of-thought reasoning',
      'Competitive with GPT-4 on benchmarks',
      'Fully open model weights',
      'Multiple distilled sizes available',
      'Free API access',
    ],
    badges: { openSource: true, free: true, apiAvailable: true },
    links: {
      website: 'https://deepseek.com',
      github: 'https://github.com/deepseek-ai/DeepSeek-R1',
      huggingface: 'https://huggingface.co/deepseek-ai',
    },
  },

  'invokeai': {
    tagline: 'Professional open-source creative AI toolkit',
    tags: ['image', 'creative', 'workflow', 'local'],
    features: [
      'Canvas with layers and masking',
      'Node-based workflow editor',
      'ControlNet and IP-Adapter support',
      'Model manager for easy setup',
      'Professional-grade inpainting',
    ],
    badges: { openSource: true, free: true, selfHostable: true, noSignup: true },
    links: {
      website: 'https://invoke.ai',
      github: 'https://github.com/invoke-ai/InvokeAI',
      docs: 'https://invoke-ai.github.io/InvokeAI',
    },
  },

  'open-interpreter': {
    tagline: 'Natural language to code execution on your computer',
    tags: ['agent', 'code', 'terminal', 'automation'],
    features: [
      'Execute code via natural language',
      'File system and web access',
      'Multiple language support (Python, JS, Shell)',
      'Sandboxed execution option',
      'Works with any LLM',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://openinterpreter.com',
      github: 'https://github.com/OpenInterpreter/open-interpreter',
      docs: 'https://docs.openinterpreter.com',
    },
  },

  'langflow': {
    tagline: 'Visual framework for building AI agents and RAG apps',
    tags: ['no-code', 'agents', 'RAG', 'workflow'],
    features: [
      'Drag-and-drop flow builder',
      'LangChain component library',
      'Custom Python components',
      'API export for deployment',
      'Multi-agent orchestration',
    ],
    badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true },
    links: {
      website: 'https://langflow.org',
      github: 'https://github.com/langflow-ai/langflow',
      docs: 'https://docs.langflow.org',
    },
  },

  'screenpipe': {
    tagline: 'AI-powered screen and audio capture for your desktop',
    tags: ['productivity', 'recording', 'local', 'search'],
    features: [
      '24/7 screen and audio recording',
      'Local AI-powered search of your history',
      'Plugin system for automation',
      'Privacy-first — all data stays local',
      'OCR and speech-to-text built in',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, noSignup: true },
    links: {
      website: 'https://screenpi.pe',
      github: 'https://github.com/mediar-ai/screenpipe',
    },
  },

  'bark': {
    tagline: 'Open-source text-to-speech with music and effects',
    tags: ['voice', 'TTS', 'music', 'open-source'],
    features: [
      'Realistic speech generation',
      'Music and sound effects from text',
      'Multilingual voice cloning',
      'Non-verbal cues (laughter, sighs)',
      'Run locally with GPU',
    ],
    badges: { openSource: true, free: true, noSignup: true },
    links: {
      website: 'https://github.com/suno-ai/bark',
      github: 'https://github.com/suno-ai/bark',
      huggingface: 'https://huggingface.co/suno/bark',
    },
  },

  'replit-agent': {
    tagline: 'AI coding assistant and app builder in the browser',
    tags: ['code', 'browser', 'deployment', 'collaboration'],
    features: [
      'Build apps with natural language prompts',
      'In-browser IDE with AI assistance',
      'One-click deployment',
      'Collaborative coding',
      'Free tier with always-on Repls',
    ],
    badges: { freemium: true },
    links: {
      website: 'https://replit.com',
      docs: 'https://docs.replit.com',
    },
  },

  'marker': {
    tagline: 'Convert PDFs to markdown with high accuracy',
    tags: ['PDF', 'markdown', 'document', 'local'],
    features: [
      'High-accuracy PDF to markdown conversion',
      'Handles tables, images, and equations',
      'Fast local processing',
      'Batch processing support',
    ],
    badges: { openSource: true, free: true, privacyFocused: true, noSignup: true },
    links: {
      website: 'https://github.com/VikParuchuri/marker',
      github: 'https://github.com/VikParuchuri/marker',
    },
  },

  'docling': {
    tagline: 'IBM open-source document parser for AI',
    tags: ['documents', 'PDF', 'parsing', 'IBM'],
    features: [
      'Extract structured data from PDFs and DOCX',
      'Table and figure detection',
      'OCR for scanned documents',
      'Multiple export formats',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://github.com/DS4SD/docling',
      github: 'https://github.com/DS4SD/docling',
    },
  },

  'qwen': {
    tagline: 'Alibaba open-source large language models',
    tags: ['LLM', 'model', 'multilingual', 'open-source'],
    features: [
      'Strong multilingual performance',
      'Multiple model sizes available',
      'Vision and audio variants',
      'Commercial-friendly license',
      'Competitive reasoning and coding',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://qwenlm.ai',
      github: 'https://github.com/QwenLM/Qwen2.5',
      huggingface: 'https://huggingface.co/Qwen',
    },
  },

  'phi': {
    tagline: 'Microsoft compact AI models with strong reasoning',
    tags: ['LLM', 'model', 'small', 'efficient'],
    features: [
      'Runs on laptops and mobile devices',
      'Strong reasoning for size class',
      'Efficient fine-tuning support',
      'Open model weights',
    ],
    badges: { openSource: true, free: true },
    links: {
      website: 'https://huggingface.co/microsoft/phi-4',
      github: 'https://github.com/microsoft/phi-3',
      huggingface: 'https://huggingface.co/microsoft/phi-4',
    },
  },

  'cocoon-tg': { tagline: 'Decentralized AI on TON blockchain', tags: ['blockchain', 'privacy', 'decentralized', 'TON'], features: ['Distributed GPU inference', 'Confidential computing', 'TON token rewards', 'Privacy-first AI'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://cocoon.tg' } },
  'chatglm': { tagline: 'Bilingual Chinese-English language model', tags: ['LLM', 'Chinese', 'bilingual', 'research'], features: ['Strong Chinese language understanding', 'Bilingual conversation', 'Open model weights', 'Fine-tuning support'], badges: { openSource: true, free: true }, links: { website: 'https://chatglm.cn' } },
  'internlm': { tagline: 'Foundation models from Shanghai AI Lab', tags: ['LLM', 'research', 'foundation-model'], features: ['Multi-size model variants', 'Strong reasoning ability', 'Tool-use capabilities', 'Open research weights'], badges: { openSource: true, free: true }, links: { website: 'https://internlm.intern-ai.org.cn' } },
  'yi-01ai': { tagline: 'Open-source Yi models for reasoning', tags: ['LLM', 'reasoning', 'multilingual'], features: ['Strong reasoning performance', 'Multilingual support', 'Multiple model sizes', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://www.01.ai' } },
  'baichuan': { tagline: 'Chinese LLMs for general-purpose use', tags: ['LLM', 'Chinese', 'general-purpose'], features: ['Chinese language optimization', 'Multiple model sizes', 'Research-friendly license', 'Strong NLP benchmarks'], badges: { openSource: true, free: true }, links: { website: 'https://www.baichuan-ai.com' } },
  'minicpm': { tagline: 'Efficient small language models', tags: ['SLM', 'efficient', 'edge-deployment'], features: ['Runs on edge devices', 'Compact model size', 'Strong performance per parameter', 'Vision model variants'], badges: { openSource: true, free: true }, links: { website: 'https://openbmb.vercel.app' } },
  'chatbot-ui': { tagline: 'Open-source ChatGPT UI clone', tags: ['chat', 'UI', 'GPT', 'self-hosted'], features: ['Clean chat interface', 'Multiple model support', 'Conversation history', 'Self-hostable'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://chatbotui.com' } },
  'openchatkit': { tagline: 'Open-source chatbot toolkit', tags: ['chatbot', 'toolkit', 'open-source'], features: ['Customizable chatbot framework', 'Fine-tuning support', 'Plugin extensibility', 'Community models'], badges: { openSource: true, free: true }, links: { website: 'https://openchatkit.net' } },
  'openassistantgpt': { tagline: 'Build custom AI chatbot assistants', tags: ['chatbot', 'assistant', 'no-code'], features: ['Custom knowledge base', 'No-code builder', 'Embeddable widgets', 'Multiple AI providers'], badges: { openSource: true, free: true }, links: { website: 'https://www.openassistantgpt.io' } },
  'kilo-ai': { tagline: 'AI coding assistant for VS Code', tags: ['coding', 'VS Code', 'assistant'], features: ['Code autocomplete', 'Inline chat', 'Multi-LLM support', 'Context-aware suggestions'], badges: { openSource: true, free: true }, links: { website: 'https://kilocode.ai' } },
  'psychoroid-com': { tagline: 'AI 3D asset generation engine', tags: ['3D', 'generation', 'text-to-3D'], features: ['Text-to-3D generation', 'Image-to-3D conversion', 'Customizable 3D assets', 'Real-time preview'], badges: { openSource: true, free: true }, links: { website: 'https://psychoroid.com' } },
  'hunyuan3d-2-0': { tagline: 'Tencent 3D asset generation model', tags: ['3D', 'generation', 'Tencent'], features: ['High-quality 3D meshes', 'Text and image input', 'Texture generation', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://3d-models.hunyuan.tencent.com' } },
  'fiorino-ai': { tagline: 'AI cost management for SaaS', tags: ['cost', 'LLM', 'management', 'SaaS'], features: ['Token usage tracking', 'Cost optimization', 'Multi-provider support', 'Usage analytics dashboard'], badges: { openSource: true, free: true }, links: { website: 'https://fiorinoai.tech' } },
  'evangeler-list-of-affiliate-programs': { tagline: 'Open-source affiliate program directory', tags: ['affiliate', 'monetization', 'directory'], features: ['Curated affiliate listings', 'Influencer-friendly', 'Category filtering', 'Open-source platform'], badges: { openSource: true, free: true }, links: { website: 'https://evangeler.com' } },
  'tiptap-editor-3-0-beta': { tagline: 'Headless rich text editor framework', tags: ['editor', 'rich-text', 'headless', 'collaboration'], features: ['Extensible plugin system', 'Real-time collaboration', 'Markdown support', 'Framework agnostic'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://www.tiptap.dev' } },
  'activepieces': { tagline: 'AI-first automation alternative to Zapier', tags: ['automation', 'workflow', 'no-code', 'Zapier-alternative'], features: ['200+ integrations', 'Visual workflow builder', 'AI-powered actions', 'Self-hostable'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://www.activepieces.com' } },
  'coder': { tagline: 'Self-hosted cloud dev environments', tags: ['IDE', 'cloud', 'development', 'self-hosted'], features: ['Remote dev environments', 'Template-based workspaces', 'Git integration', 'Multi-IDE support'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://coder.com' } },
  'agno': { tagline: 'Build fast model-agnostic AI agents', tags: ['agents', 'framework', 'model-agnostic'], features: ['Model-agnostic design', 'Memory and tools support', 'Multi-modal agents', 'Fast inference'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://www.agno.com' } },
  'qdrant-io': { tagline: 'Open-source vector database for AI', tags: ['vector-db', 'search', 'embeddings', 'similarity'], features: ['High-performance vector search', 'Filtering and payload support', 'Horizontal scaling', 'REST and gRPC APIs'], badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true }, links: { website: 'https://qdrant.io' } },
  'pearai': { tagline: 'Open-source AI code editor', tags: ['coding', 'editor', 'AI', 'IDE'], features: ['AI-powered code editing', 'Multi-LLM support', 'Inline suggestions', 'Project-aware context'], badges: { openSource: true, free: true }, links: { website: 'https://trypear.ai' } },
  'suna': { tagline: 'AI assistant for research and analysis', tags: ['research', 'assistant', 'analysis'], features: ['Web research automation', 'Data analysis tools', 'Task automation', 'Multi-source aggregation'], badges: { openSource: true, free: true }, links: { website: 'https://www.suna.so' } },
  'superagi-cloud': { tagline: 'Platform for autonomous AI agents', tags: ['agents', 'autonomous', 'platform'], features: ['Agent marketplace', 'Multi-agent orchestration', 'Tool integration', 'Performance monitoring'], badges: { openSource: true, free: true }, links: { website: 'https://superagi.com' } },
  'copilotkit': { tagline: 'Add AI copilots to React apps', tags: ['React', 'copilot', 'SDK', 'components'], features: ['Plug-and-play React components', 'In-app AI chat', 'AI-powered text areas', 'Custom action support'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://www.copilotkit.ai' } },
  'skyvern': { tagline: 'AI agent for browser automation', tags: ['browser', 'automation', 'LLM', 'vision'], features: ['Visual browser automation', 'LLM-driven navigation', 'Form filling', 'No-code workflows'], badges: { openSource: true, free: true }, links: { website: 'https://www.skyvern.com' } },
  'apipark': { tagline: 'Open-source AI Gateway and portal', tags: ['API', 'gateway', 'management'], features: ['Multi-LLM gateway', 'API marketplace', 'Usage analytics', 'Access control'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://apipark.com' } },
  'llmchat': { tagline: 'Privacy-focused AI research platform', tags: ['chat', 'research', 'privacy'], features: ['Multi-model chat', 'Privacy-first design', 'Conversation export', 'Local storage option'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://llmchat.co' } },
  'laminar': { tagline: 'Trace and evaluate AI applications', tags: ['observability', 'tracing', 'evaluation'], features: ['LLM call tracing', 'Performance metrics', 'Cost tracking', 'A/B evaluation'], badges: { openSource: true, free: true }, links: { website: 'https://www.lmnr.ai' } },
  'langtrace-ai': { tagline: 'Observability for AI agents', tags: ['observability', 'agents', 'OpenTelemetry'], features: ['Agent execution tracing', 'OpenTelemetry native', 'Cost analytics', 'Performance dashboards'], badges: { openSource: true, free: true }, links: { website: 'https://www.langtrace.ai' } },
  'patched': { tagline: 'Automate dev workflows with AI', tags: ['automation', 'development', 'CI/CD'], features: ['Custom AI workflows', 'Code review automation', 'PR generation', 'CI/CD integration'], badges: { openSource: true, free: true }, links: { website: 'https://patched.codes' } },
  'rlama': { tagline: 'Local document QA with AI', tags: ['RAG', 'documents', 'local', 'privacy'], features: ['100% local processing', 'Document ingestion', 'Natural language queries', 'No cloud dependency'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://rlama.dev' } },
  'devika-ai': { tagline: 'Open-source AI software engineer', tags: ['coding', 'agent', 'autonomous'], features: ['Understands high-level instructions', 'Web research capabilities', 'Multi-language code generation', 'Step-by-step planning'], badges: { openSource: true, free: true }, links: { website: 'https://devikaai.org' } },
  'maxkb': { tagline: 'Enterprise AI assistant with RAG', tags: ['RAG', 'enterprise', 'knowledge-base'], features: ['Document knowledge base', 'LLM integration', 'Multi-language support', 'Role-based access'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://maxkb.pro' } },
  'pneumatic-workflow': { tagline: 'Human-AI workflow automation', tags: ['workflow', 'automation', 'business-process'], features: ['Visual workflow designer', 'Human-AI task routing', 'Process analytics', 'Template library'], badges: { openSource: true, free: true }, links: { website: 'https://www.pneumatic.app' } },
  'qubinets': { tagline: 'Simplify AI infrastructure deployment', tags: ['infrastructure', 'deployment', 'big-data'], features: ['One-click AI deployment', 'Big data stack support', 'Auto-scaling', 'Resource monitoring'], badges: { openSource: true, free: true }, links: { website: 'https://qubinets.com' } },
  'blueprints': { tagline: 'Mozilla open-source AI workflow hub', tags: ['workflow', 'templates', 'Mozilla'], features: ['Pre-configured AI templates', 'Mozilla-backed', 'Community contributions', 'Quick setup guides'], badges: { openSource: true, free: true }, links: { website: 'https://blueprints.mozilla.ai' } },
  'ai-adventure': { tagline: 'AI-powered narrative adventure games', tags: ['gaming', 'narrative', 'interactive'], features: ['AI-generated storylines', 'Player choice matters', 'Community content', 'Open-source engine'], badges: { openSource: true, free: true }, links: { website: 'https://ai-adventure.steamship.com' } },
  'qrev-ai': { tagline: 'AI agents for outbound sales', tags: ['sales', 'agents', 'automation'], features: ['Automated outreach', 'Lead qualification', 'Email personalization', 'CRM integration'], badges: { openSource: true, free: true }, links: { website: 'https://qrev.ai' } },
  'memoripy': { tagline: 'AI memory layer for apps', tags: ['memory', 'context', 'RAG'], features: ['Persistent memory management', 'Context-aware responses', 'Semantic retrieval', 'Easy API integration'], badges: { openSource: true, free: true }, links: { website: 'https://memoripy.com' } },
  'ask-on-data': { tagline: 'Chat-based ETL for data engineering', tags: ['ETL', 'data', 'chat', 'analytics'], features: ['Natural language queries', 'Data transformation', 'Multiple data sources', 'Export capabilities'], badges: { openSource: true, free: true }, links: { website: 'https://AskOnData.com' } },
  '008': { tagline: 'VoIP phone with AI transcription', tags: ['VoIP', 'transcription', 'call', 'CRM'], features: ['Real-time transcription', 'Call summarization', 'CRM integration', 'AI call insights'], badges: { openSource: true, free: true }, links: { website: 'https://008agent.ai' } },
  'octogen-an-open-source-code-interpreter': { tagline: 'Code interpreter powered by LLMs', tags: ['code', 'interpreter', 'GPT', 'local'], features: ['GPT-4 and CodeLlama support', 'Local deployment', 'Sandboxed execution', 'Multi-language support'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://octogen.dev' } },
  'llmonitor': { tagline: 'LLM chatbot management platform', tags: ['monitoring', 'chatbot', 'evaluation'], features: ['Chatbot analytics', 'Cost tracking', 'User session replay', 'Model evaluation tools'], badges: { openSource: true, free: true }, links: { website: 'https://llmonitor.com' } },
  'jacob-just-another-coding-bot': { tagline: 'AI coding agent for automation', tags: ['coding', 'agent', 'automation'], features: ['Automated code changes', 'PR review support', 'Code quality checks', 'GitHub integration'], badges: { openSource: true, free: true }, links: { website: 'https://www.jacb.ai' } },
  'hexabot': { tagline: 'AI chatbot builder platform', tags: ['chatbot', 'builder', 'no-code'], features: ['Visual chatbot designer', 'NLU integration', 'Multi-channel support', 'Analytics dashboard'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://hexabot.io' } },
  'scourhead': { tagline: 'AI agent for web data collection', tags: ['scraping', 'data', 'agent'], features: ['Intelligent web scraping', 'Spreadsheet output', 'Automated data organization', 'No-code setup'], badges: { openSource: true, free: true }, links: { website: 'https://scourhead.com' } },
  'open-agent-kit-build-agents-in-minutes': { tagline: 'Build and deploy AI agents fast', tags: ['agents', 'builder', 'deployment'], features: ['Rapid agent creation', 'Custom tool support', 'API deployment', 'Template library'], badges: { openSource: true, free: true }, links: { website: 'https://open-agent-kit.com' } },
  'matter-ai': { tagline: 'AI code reviewer for PRs', tags: ['code-review', 'security', 'agent'], features: ['Automated code review', 'Security issue detection', 'Performance analysis', 'PR integration'], badges: { openSource: true, free: true }, links: { website: 'https://matterai.dev' } },
  'magicanimate-playground': { tagline: 'Animate images with AI', tags: ['animation', 'video', 'image-to-video'], features: ['Single image animation', 'Motion transfer', 'Temporal consistency', 'Open-source model'], badges: { openSource: true, free: true }, links: { website: 'https://www.magicanimate.org' } },
  'magi-1': { tagline: 'Controllable AI video generation', tags: ['video', 'generation', 'text-to-video'], features: ['Chunk-wise prompting', 'Consistent video output', 'Fine-grained control', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://magi-1.io' } },
  'breveai': { tagline: 'LLMs with real-world data', tags: ['LLM', 'data', 'efficiency'], features: ['Real-world data integration', 'Efficient inference', 'Open-source models', 'Developer-friendly API'], badges: { openSource: true, free: true }, links: { website: 'https://breveai.com' } },
  'chat-with-media': { tagline: 'Chat with PDF files using AI', tags: ['PDF', 'chat', 'research', 'documents'], features: ['PDF question answering', 'Document summarization', 'Citation support', 'Multi-file upload'], badges: { openSource: true, free: true }, links: { website: 'https://www.aichatwithmedia.com' } },
  'iask': { tagline: 'Private LLM frontend for files', tags: ['chat', 'files', 'private', 'local'], features: ['File and link analysis', 'Private processing', 'Multiple file formats', 'Clean interface'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://getiask.com' } },
  'civitai-green': { tagline: 'Hub for open-source AI art models', tags: ['models', 'community', 'art', 'generation'], features: ['Model sharing platform', 'Community galleries', 'Model training resources', 'Free model downloads'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://civitai.green' } },
  'pollinations': { tagline: 'Easy AI text and image generation', tags: ['API', 'generation', 'image', 'text'], features: ['Simple REST API', 'No authentication needed', 'Text and image generation', 'Free unlimited usage'], badges: { openSource: true, free: true, noSignup: true, apiAvailable: true }, links: { website: 'https://pollinations.ai' } },
  'helicone-ai': { tagline: 'LLM observability platform', tags: ['observability', 'monitoring', 'LLM'], features: ['Request logging', 'Cost analytics', 'Latency tracking', 'Custom dashboards'], badges: { openSource: true, free: true }, links: { website: 'https://www.helicone.ai' } },
  'meilisearch': { tagline: 'Lightning-fast AI search engine', tags: ['search', 'full-text', 'instant'], features: ['Sub-50ms search results', 'Typo tolerance', 'Faceted search', 'Easy setup and deployment'], badges: { openSource: true, free: true, selfHostable: true, apiAvailable: true }, links: { website: 'https://www.meilisearch.com' } },
  'tolgee-ai-translator': { tagline: 'AI-powered localization platform', tags: ['localization', 'translation', 'i18n'], features: ['Autonomous AI translation', 'Context-aware suggestions', 'Human review workflow', 'SDK integration'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://tolgee.io/features/autonomous-translation' } },
  'flux-1-ai-1': { tagline: 'Fast open-source image generator', tags: ['image', 'generation', 'AI'], features: ['High-quality outputs', 'Fast generation', 'Multiple model variants', 'Text-to-image'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://flux-1.ai' } },
  'kokoro-web': { tagline: 'Free AI voice generator', tags: ['TTS', 'voice', 'text-to-speech'], features: ['Natural voice output', 'Multiple voice styles', 'Browser-based', 'No signup required'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://voice-generator.pages.dev' } },
  'ai-flow': { tagline: 'Drag-and-drop AI workflow builder', tags: ['workflow', 'no-code', 'drag-and-drop'], features: ['Visual workflow editor', 'Multi-model chaining', 'Template library', 'Real-time preview'], badges: { openSource: true, free: true }, links: { website: 'https://ai-flow.net' } },
  'morphik': { tagline: 'AI knowledge base and research agent', tags: ['knowledge', 'research', 'RAG', 'enterprise'], features: ['Enterprise knowledge retrieval', 'Multi-source ingestion', 'Natural language queries', 'Permission controls'], badges: { openSource: true, free: true }, links: { website: 'https://www.morphik.ai' } },
  'tracardi': { tagline: 'Open-source Customer Data Platform', tags: ['CDP', 'automation', 'personalization'], features: ['Customer journey tracking', 'Event-based automation', 'Profile unification', 'Real-time segmentation'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://www.tracardi.com' } },
  'openkoda': { tagline: 'Rapid business app development', tags: ['low-code', 'business', 'framework'], features: ['Pre-built business modules', 'AI-assisted development', 'Multi-tenant support', 'Extensible architecture'], badges: { openSource: true, free: true }, links: { website: 'https://openkoda.com' } },
  'deepseek-online': { tagline: 'Free DeepSeek V3 online access', tags: ['LLM', 'chat', 'DeepSeek', 'free'], features: ['DeepSeek V3 model access', 'No signup required', 'Browser-based chat', 'Code generation support'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://www.deepseekv3.net' } },
  'flojoy-studio': { tagline: 'Open-source hardware testing platform', tags: ['hardware', 'testing', 'automation'], features: ['Visual test builder', 'Instrument integration', 'Cloud connectivity', 'Data export'], badges: { openSource: true, free: true }, links: { website: 'https://www.flojoy.ai' } },
  'lakesail': { tagline: 'Rust framework for Big Data and AI', tags: ['Rust', 'big-data', 'streaming', 'batch'], features: ['Unified stream and batch', 'AI workload support', 'Rust performance', 'Open-source framework'], badges: { openSource: true, free: true }, links: { website: 'https://lakesail.com' } },
  'api-usage': { tagline: 'Track OpenAI API usage and costs', tags: ['API', 'tracking', 'costs', 'OpenAI'], features: ['Usage visualization', 'Cost breakdown', 'Historical trends', 'Multi-key support'], badges: { openSource: true, free: true }, links: { website: 'https://apiusage.info' } },
  'sorawebui': { tagline: 'Web UI for Sora video generation', tags: ['video', 'Sora', 'text-to-video'], features: ['Text-to-video generation', 'Web-based interface', 'Easy deployment', 'Open-source codebase'], badges: { openSource: true, free: true }, links: { website: 'https://sorawebui.com' } },
  'aigur-dev': { tagline: 'Build generative AI apps easily', tags: ['GenAI', 'library', 'pipeline'], features: ['Pipeline-based architecture', 'Multi-model support', 'Easy integration', 'TypeScript SDK'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://aigur.dev' } },
  'yobulk': { tagline: 'AI-powered CSV importer', tags: ['CSV', 'data', 'import', 'SaaS'], features: ['AI column mapping', 'Data validation', 'Bulk import support', 'Embeddable widget'], badges: { openSource: true, free: true }, links: { website: 'https://yobulk.dev' } },
  'prst-ai': { tagline: 'Self-hosted prompt management', tags: ['prompts', 'management', 'self-hosted'], features: ['Prompt versioning', 'A/B testing', 'Model optimization', 'Team collaboration'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://prst.ai' } },
  'the-complete-giude-of-mistral-7b': { tagline: 'Open-source Mistral 7B LLM guide', tags: ['LLM', 'Mistral', 'fine-tuning'], features: ['Multiple fine-tuned variants', 'Strong reasoning', 'Low resource requirements', 'Commercial license'], badges: { openSource: true, free: true }, links: { website: 'https://mistral-7b.com' } },
  'embedefy': { tagline: 'Free open-source embeddings API', tags: ['embeddings', 'API', 'vector', 'free'], features: ['Free embedding generation', 'Multiple model support', 'Fair usage limits', 'REST API'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://www.embedefy.com' } },
  'chatgptsora': { tagline: 'Text-to-video with Sora model', tags: ['video', 'Sora', 'generation'], features: ['Text-to-video creation', 'Web-based interface', 'Multiple video styles', 'Open-source platform'], badges: { openSource: true, free: true }, links: { website: 'https://chatgptsora.co' } },
  'pongo': { tagline: 'Visual language model for images', tags: ['vision', 'VLM', 'image-understanding'], features: ['Image question answering', 'Visual reasoning', 'Text prompt support', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://joinpongo.com' } },
  'lite-queen': { tagline: 'SQLite database management tool', tags: ['SQLite', 'database', 'management'], features: ['Web-based interface', 'Query editor', 'Data export', 'Server deployment'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://litequeen.com' } },
  'stable-audio-open': { tagline: 'Open-source audio from text', tags: ['audio', 'generation', 'sound-effects'], features: ['Text-to-audio generation', 'Sound effect creation', 'Short sample output', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://stable-audio-open.com' } },
  'domino': { tagline: 'No-code AI workflow platform', tags: ['workflow', 'no-code', 'data-science'], features: ['Visual pipeline builder', 'Pre-built operators', 'GPU scheduling', 'Monitoring dashboard'], badges: { openSource: true, free: true }, links: { website: 'https://domino-workflows.io' } },
  'themog': { tagline: 'AI market analysis for emerging markets', tags: ['market', 'analysis', 'emerging-markets'], features: ['Market trend analysis', 'AI-driven insights', 'Data visualization', 'Report generation'], badges: { openSource: true, free: true }, links: { website: 'http://themog.tech' } },
  'volamail': { tagline: 'AI-assisted email editor', tags: ['email', 'editor', 'AI-writing'], features: ['AI content suggestions', 'Visual email builder', 'Template library', 'Direct sending'], badges: { openSource: true, free: true }, links: { website: 'https://www.volamail.com' } },
  'fluxpicture': { tagline: 'AI image generation from text', tags: ['image', 'generation', 'text-to-image'], features: ['Fast image generation', 'Realistic outputs', 'Multiple styles', 'Free usage'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://www.fluxpicture.com' } },
  'backmesh': { tagline: 'BaaS for AI apps', tags: ['backend', 'BaaS', 'LLM', 'serverless'], features: ['Secure LLM API calls', 'No backend needed', 'User authentication', 'Usage tracking'], badges: { openSource: true, free: true }, links: { website: 'https://backmesh.com' } },
  'open-source-ai-gateway': { tagline: 'Manage multiple LLM providers', tags: ['gateway', 'LLM', 'multi-provider'], features: ['Multi-provider routing', 'Rate limiting', 'Caching and retries', 'Unified API interface'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://ai-gateway.dev' } },
  'formsflow': { tagline: 'Low-code forms and workflow platform', tags: ['forms', 'workflow', 'low-code'], features: ['Drag-and-drop form builder', 'Workflow automation', 'Analytics dashboard', 'Integration APIs'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://formsflow.ai' } },
  'opensilver': { tagline: 'Open-source .NET web UI framework', tags: ['.NET', 'UI', 'framework', 'web'], features: ['Silverlight compatibility', 'XAML support', 'Cross-browser', '.NET 6+ support'], badges: { openSource: true, free: true }, links: { website: 'https://opensilver.net' } },
  'adminforth': { tagline: 'Tailwind admin panel framework', tags: ['admin', 'Tailwind', 'Vue3', 'dashboard'], features: ['Pre-built admin UI', 'Vue3 components', 'TypeScript support', 'Customizable themes'], badges: { openSource: true, free: true }, links: { website: 'https://adminforth.dev' } },
  'ai-assisted-contember-studio': { tagline: 'AI-powered backend framework', tags: ['backend', 'CMS', 'TypeScript', 'AI'], features: ['AI-assisted development', 'TypeScript native', 'Content management', 'API-first design'], badges: { openSource: true, free: true }, links: { website: 'https://www.contember.com' } },
  'stablecog': { tagline: 'Free AI image generator', tags: ['image', 'Stable Diffusion', 'Kandinsky'], features: ['Multiple AI models', 'Gallery sharing', 'Upscaling support', 'No signup for basic use'], badges: { openSource: true, free: true }, links: { website: 'https://stablecog.com' } },
  'distillery-by-followfox': { tagline: 'AI text-to-image over Stable Diffusion', tags: ['image', 'generation', 'Stable Diffusion'], features: ['Custom model support', 'Batch generation', 'Style mixing', 'Open-source pipeline'], badges: { openSource: true, free: true }, links: { website: 'https://followfox.ai' } },
  'mygptreader': { tagline: 'Slack bot for content summarization', tags: ['Slack', 'summarization', 'voice'], features: ['URL summarization', 'Voice interaction', 'Slack integration', 'Multi-language support'], badges: { openSource: true, free: true }, links: { website: 'https://www.myreader.io' } },
  'epigram': { tagline: 'AI-powered bite-sized news', tags: ['news', 'summary', 'personalization'], features: ['AI news summarization', 'Personalized feed', 'Category filtering', 'Minimal reading time'], badges: { openSource: true, free: true }, links: { website: 'https://epigram.news' } },
  'argpt-for-monocle': { tagline: 'AR glasses with generative AI', tags: ['AR', 'glasses', 'wearable'], features: ['AR display overlay', 'Voice-activated AI', 'Real-time information', 'Developer SDK'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://brilliant.xyz' } },
  'amurex': { tagline: 'AI workflow unifier', tags: ['workflow', 'knowledge', 'automation'], features: ['Knowledge connection', 'Task automation', 'Cross-platform sync', 'Smart search'], badges: { openSource: true, free: true }, links: { website: 'https://www.amurex.ai' } },
  'voiceink': { tagline: 'Voice-to-text for macOS', tags: ['voice', 'transcription', 'macOS', 'local'], features: ['Local AI processing', 'Offline support', 'System-wide dictation', 'Multiple languages'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://tryvoiceink.com' } },
  'chatpad-ai': { tagline: 'Privacy-first ChatGPT UI', tags: ['chat', 'GPT', 'privacy', 'UI'], features: ['Clean chat interface', 'No data collection', 'Local storage', 'API key management'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://chatpad.ai' } },
  'sanctum-ai': { tagline: 'Private local AI assistant', tags: ['local', 'privacy', 'assistant', 'secure'], features: ['100% local processing', 'No data leaves device', 'Open-source models', 'Encrypted storage'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://sanctum.ai' } },
  'design-system': { tagline: 'AI-powered design system starter', tags: ['design', 'UI', 'components', 'toolkit'], features: ['Component library', 'AI-assisted generation', 'Storybook integration', 'Customizable tokens'], badges: { openSource: true, free: true }, links: { website: 'https://www.kickstartds.com' } },
  'todovex': { tagline: 'AI-powered task management', tags: ['todo', 'tasks', 'AI', 'productivity'], features: ['AI task suggestions', 'Priority prediction', 'Natural language input', 'Smart categorization'], badges: { openSource: true, free: true }, links: { website: 'https://www.todovex.ai' } },
  'webdb': { tagline: 'Open-source database IDE', tags: ['database', 'IDE', 'SQL', 'multi-db'], features: ['Multi-database support', 'Visual query builder', 'Schema browser', 'Data export'], badges: { openSource: true, free: true }, links: { website: 'https://webdb.app' } },
  'llama-3': { tagline: 'Meta open-source chatbot', tags: ['LLM', 'Meta', 'chatbot'], features: ['State-of-the-art performance', 'Open model weights', 'Multiple size variants', 'Commercial license'], badges: { openSource: true, free: true }, links: { website: 'https://llama3.dev' } },
  'cybertraceai': { tagline: 'AI agent for network management', tags: ['network', 'agent', 'management'], features: ['Natural language commands', 'Network diagnostics', 'Automated troubleshooting', 'Real-time monitoring'], badges: { openSource: true, free: true }, links: { website: 'https://cybertraceai.com' } },
  'plexo': { tagline: 'AI-powered project management', tags: ['project', 'management', 'collaboration'], features: ['AI task assignment', 'Team collaboration', 'Sprint planning', 'Progress tracking'], badges: { openSource: true, free: true }, links: { website: 'https://plexo.app' } },
  'aurora-terminal-agent': { tagline: 'AI assistant for terminal', tags: ['terminal', 'CLI', 'assistant'], features: ['Smart command suggestions', 'Error explanation', 'Command generation', 'Shell integration'], badges: { openSource: true, free: true }, links: { website: 'https://aurora.the-box.dev' } },
  'reflection-70b': { tagline: 'Self-correcting 70B AI model', tags: ['LLM', 'Llama', '70B', 'reasoning'], features: ['Self-correction mechanism', 'GPT-4 level performance', 'Llama 70B base', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://reflection70b.net' } },
  'prompto': { tagline: 'LLM interaction and prompt saving', tags: ['prompts', 'LLM', 'playground'], features: ['Multi-LLM testing', 'Prompt library', 'Result comparison', 'Fine-tuning tools'], badges: { openSource: true, free: true }, links: { website: 'https://prompto.asanchez.dev' } },
  'gnothi': { tagline: 'AI-powered journaling and insights', tags: ['journal', 'wellness', 'AI-insights'], features: ['AI-generated insights', 'Mood tracking', 'Book recommendations', 'Therapist integration'], badges: { openSource: true, free: true }, links: { website: 'https://gnothiai.com' } },
  'rapid-ai': { tagline: 'AI engineering implementation', tags: ['engineering', 'implementation', 'models'], features: ['Model deployment tools', 'Engineering best practices', 'Performance optimization', 'Community resources'], badges: { openSource: true, free: true }, links: { website: 'https://rapidai.tech' } },
  'deeplivecam': { tagline: 'Real-time AI face swaps', tags: ['face-swap', 'real-time', 'streaming'], features: ['Live face swapping', 'VTuber avatar creation', 'Real-time processing', 'Multiple face detection'], badges: { openSource: true, free: true }, links: { website: 'https://deeplivecam.net' } },
  'pygmalion-ai': { tagline: 'AI chat and role-play platform', tags: ['chat', 'roleplay', 'character'], features: ['Character creation', 'Role-play conversations', 'Community characters', 'Fine-tuned models'], badges: { openSource: true, free: true }, links: { website: 'https://pygmalion.chat' } },
  'ai-tamago': { tagline: 'Local AI pet companion', tags: ['pet', 'local', 'fun', 'privacy'], features: ['AI virtual pet', 'Local processing', 'No data collection', 'Interactive care'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://ai-tamago.fly.dev' } },
  'vizzy': { tagline: 'AI-powered data visualization', tags: ['visualization', 'data', 'charts', 'GPT'], features: ['Natural language to charts', 'Multiple chart types', 'Data import', 'Export capabilities'], badges: { openSource: true, free: true }, links: { website: 'https://vizzy.rbren.io' } },
  'reachat': { tagline: 'React UI library for chat apps', tags: ['React', 'chat', 'UI', 'components'], features: ['Pre-built chat components', 'LLM integration ready', 'Customizable themes', 'TypeScript support'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://reachat.dev' } },
  'continue': { tagline: 'Open-source AI code assistant', tags: ['coding', 'IDE', 'autocomplete', 'chat'], features: ['Any LLM integration', 'Tab autocomplete', 'Inline editing', 'VS Code and JetBrains'], badges: { openSource: true, free: true }, links: { website: 'https://continue.dev' } },
  'chattyui': { tagline: 'Local browser-based AI chat', tags: ['chat', 'local', 'browser', 'private'], features: ['Browser-based models', 'No server needed', 'Private conversations', 'Gemini-like interface'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://chattyui.com' } },
  'snowbrain': { tagline: 'AI data analyst for Snowflake', tags: ['Snowflake', 'data', 'analytics', 'SQL'], features: ['Natural language to SQL', 'Snowflake integration', 'Data insights', 'Visualization support'], badges: { openSource: true, free: true }, links: { website: 'https://snowbrain.dev' } },
  'botticellibots': { tagline: '.NET bot framework with AI', tags: ['bots', '.NET', 'framework', 'multi-platform'], features: ['Universal bot support', 'AI integration', 'Database connectors', '.NET Core runtime'], badges: { openSource: true, free: true }, links: { website: 'https://botticellibots.com' } },
  'promptcraft': { tagline: 'AI prompt builder tool', tags: ['prompts', 'builder', 'optimization'], features: ['Visual prompt builder', 'Template library', 'A/B testing', 'Shareable prompts'], badges: { openSource: true, free: true }, links: { website: 'https://promptcraft.swishjam.com' } },
  'tavonnai': { tagline: 'Multi-LLM content generation', tags: ['LLM', 'generation', 'chat', 'video'], features: ['30+ open-source LLMs', 'Image generation', 'Video generation', 'Unlimited usage'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://tavonnai.com' } },
  'repobase': { tagline: 'AI analysis for open-source projects', tags: ['analysis', 'open-source', 'investment'], features: ['Project health scoring', 'Growth metrics', 'Community analysis', 'Trend detection'], badges: { openSource: true, free: true }, links: { website: 'https://www.repobase.co' } },
  'bagel': { tagline: 'Unified multimodal AI', tags: ['multimodal', 'generation', 'editing'], features: ['Text, image, and video understanding', 'Content generation', 'AI editing tools', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://bagel-ai.org' } },
  'aieditor': { tagline: 'AI-powered rich text editor', tags: ['editor', 'rich-text', 'Markdown', 'private'], features: ['AI writing assistance', 'Markdown support', 'Private deployment', 'Extensible plugins'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://aieditor.dev' } },
  'refiner': { tagline: 'AI code refactoring service', tags: ['refactoring', 'code', 'generation'], features: ['Automated refactoring', 'Code generation', 'Quality improvements', 'Multi-language support'], badges: { openSource: true, free: true }, links: { website: 'https://refiner.dev' } },
  'samaritanai': { tagline: 'Codebase visualization tool', tags: ['codebase', 'visualization', 'graph'], features: ['Network graph visualization', 'Dependency mapping', 'Contribution insights', 'Open-source focus'], badges: { openSource: true, free: true }, links: { website: 'https://www.samaritanai.xyz' } },
  'libswitch': { tagline: 'AI code conversion between libraries', tags: ['conversion', 'migration', 'libraries'], features: ['Library migration', 'API mapping', 'Automated conversion', 'Multi-framework support'], badges: { openSource: true, free: true }, links: { website: 'https://libswitch.dev' } },
  'papertlab-from-papert-in': { tagline: 'AI pair programmer', tags: ['pair-programming', 'coding', 'AI'], features: ['AI-assisted editing', 'Context-aware suggestions', 'Multi-file support', 'Code review'], badges: { openSource: true, free: true }, links: { website: 'https://papert.in' } },
  'crackcoder': { tagline: 'AI DSA problem solver', tags: ['DSA', 'interview', 'coding', 'career'], features: ['Real-time problem solving', 'Algorithm explanations', 'Interview preparation', 'Open-source tool'], badges: { openSource: true, free: true }, links: { website: 'https://crackcoder.live' } },
  'components-ai': { tagline: 'Build custom design tools', tags: ['design', 'tools', 'no-code'], features: ['Visual tool builder', 'Component generation', 'No-code interface', 'Export capabilities'], badges: { openSource: true, free: true }, links: { website: 'https://components.ai' } },
  'lilac': { tagline: 'Improve data quality for LLMs', tags: ['data', 'quality', 'ML', 'curation'], features: ['Data exploration', 'Quality scoring', 'Clustering and filtering', 'Dataset curation'], badges: { openSource: true, free: true }, links: { website: 'https://lilacml.com' } },
  'learnhouse': { tagline: 'Open-source learning platform', tags: ['LMS', 'courses', 'education'], features: ['Course creation', 'Student management', 'Progress tracking', 'Customizable branding'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://learnhouse.app' } },
  'recontent-app': { tagline: 'Product copy and localization', tags: ['localization', 'copy', 'product', 'teams'], features: ['AI copy generation', 'Multi-language support', 'Team collaboration', 'Version control'], badges: { openSource: true, free: true }, links: { website: 'https://recontent.app' } },
  'learn-prompting': { tagline: 'Free prompt engineering course', tags: ['education', 'prompts', 'course'], features: ['Comprehensive curriculum', 'Interactive exercises', 'Community forum', 'Free and open-source'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://learnprompting.org' } },
  'oss-insight': { tagline: 'GitHub analytics with AI', tags: ['GitHub', 'analytics', 'open-source'], features: ['Natural language queries', 'Repository analytics', 'Developer insights', 'Trend analysis'], badges: { openSource: true, free: true }, links: { website: 'https://ossinsight.io' } },
  'constellab': { tagline: 'AI platform for life sciences', tags: ['life-sciences', 'data', 'research'], features: ['Secure data processing', 'Collaborative workflows', 'ML model integration', 'Compliance-ready'], badges: { openSource: true, free: true }, links: { website: 'https://constellab.io' } },
  'langui': { tagline: 'Tailwind CSS components for AI', tags: ['Tailwind', 'components', 'AI', 'UI'], features: ['Pre-built AI UI components', 'Chat bubbles and prompts', 'Copy-paste ready', 'Responsive design'], badges: { openSource: true, free: true }, links: { website: 'https://www.LangUI.dev' } },
  'ai-ux-patterns': { tagline: 'UX patterns for AI products', tags: ['UX', 'patterns', 'design', 'collection'], features: ['Curated pattern library', 'Real-world examples', 'Category organized', 'Builder-friendly'], badges: { openSource: true, free: true }, links: { website: 'https://aiux.rezza.io' } },
  'chartdb': { tagline: 'Database diagram editor with AI', tags: ['database', 'diagrams', 'DDL', 'visualization'], features: ['Visual schema editor', 'AI DDL generation', 'Multi-DB support', 'Export options'], badges: { openSource: true, free: true }, links: { website: 'https://chartdb.io' } },
  'hugging-face': { tagline: 'AI community for open-source ML', tags: ['models', 'datasets', 'community', 'ML'], features: ['Model hosting and sharing', 'Dataset repository', 'Spaces for demos', 'Inference API'], badges: { openSource: true, free: true, apiAvailable: true }, links: { website: 'https://huggingface.co' } },
  'airbyte': { tagline: 'Open-source data integration', tags: ['ELT', 'data', 'integration', 'connectors'], features: ['350+ connectors', 'Change data capture', 'Custom connector SDK', 'Cloud and self-hosted'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://airbyte.com' } },
  'label-studio': { tagline: 'Data labeling for ML', tags: ['labeling', 'annotation', 'ML', 'data'], features: ['Multi-data-type support', 'Custom labeling UI', 'ML-assisted labeling', 'Team collaboration'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://labelstud.io' } },
  'mindspore-cn': { tagline: 'Huawei AI framework', tags: ['framework', 'deep-learning', 'Huawei'], features: ['Full-scenario support', 'Auto-differentiation', 'Distributed training', 'Model zoo'], badges: { openSource: true, free: true }, links: { website: 'https://mindspore.cn' } },
  'huntr-com': { tagline: 'Bug bounty for AI/ML apps', tags: ['security', 'bug-bounty', 'AI/ML'], features: ['AI-focused bug bounty', 'Responsible disclosure', 'Community researchers', 'Reward payouts'], badges: { openSource: true, free: true }, links: { website: 'https://huntr.com' } },
  'calcforge': { tagline: 'Engineering calculators platform', tags: ['engineering', 'calculators', 'collaboration'], features: ['Pre-built calculators', 'Custom formulas', 'Team sharing', 'Verified results'], badges: { openSource: true, free: true }, links: { website: 'https://calcforge.com' } },
  'metaflow-org': { tagline: 'ML project framework by Netflix', tags: ['ML', 'pipeline', 'Netflix', 'data-science'], features: ['Pipeline orchestration', 'Versioning and tracking', 'AWS integration', 'Python-native'], badges: { openSource: true, free: true }, links: { website: 'https://metaflow.org' } },
  'spice-ai': { tagline: 'Data and AI platform with Web3', tags: ['data', 'AI', 'Web3', 'blockchain'], features: ['Web3 data access', 'SQL query interface', 'Real-time data feeds', 'Blockchain analytics'], badges: { openSource: true, free: true }, links: { website: 'https://spice.ai' } },
  'openlit': { tagline: 'GenAI observability platform', tags: ['observability', 'GenAI', 'OpenTelemetry'], features: ['LLM metrics tracking', 'OpenTelemetry native', 'Cost monitoring', 'Trace visualization'], badges: { openSource: true, free: true }, links: { website: 'https://openlit.io' } },
  'aigrant-org': { tagline: 'Grants for open-source AI', tags: ['grants', 'funding', 'open-source'], features: ['Compute grants', 'Cash grants', 'Fast application', 'Community support'], badges: { openSource: true, free: true }, links: { website: 'https://aigrant.org' } },
  'nat-dev': { tagline: 'LLM testing playground', tags: ['playground', 'LLM', 'testing', 'comparison'], features: ['Multi-model comparison', 'API key support', 'Response streaming', 'Clean interface'], badges: { openSource: true, free: true }, links: { website: 'https://nat.dev' } },
  'tilemaker': { tagline: 'AI seamless tiled images', tags: ['image', 'tiling', 'pattern'], features: ['Seamless pattern generation', 'AI-powered tiling', 'Multiple styles', 'Free to use'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://tilemaker.app' } },
  'resume-matcher': { tagline: 'AI resume optimization tool', tags: ['resume', 'career', 'NLP'], features: ['Job description matching', 'Skills gap analysis', 'Resume scoring', 'NLP-powered insights'], badges: { openSource: true, free: true }, links: { website: 'https://www.resumematcher.fyi' } },
  'makr-io-15-web-apps-in-30-days': { tagline: 'Collection of AI web apps', tags: ['apps', 'collection', 'showcase'], features: ['15 working apps', 'Open-source code', 'AI-built demos', 'Learning resources'], badges: { openSource: true, free: true }, links: { website: 'https://makr.io' } },
  'embedditor': { tagline: 'Editor for vector embeddings', tags: ['embeddings', 'editor', 'LLM'], features: ['Visual embedding editing', 'Search optimization', 'Cost reduction', 'Quality improvement'], badges: { openSource: true, free: true }, links: { website: 'https://embedditor.ai' } },
  'markup-document-annotation': { tagline: 'Document annotation tool', tags: ['annotation', 'documents', 'structured-data'], features: ['Multi-format support', 'Custom schemas', 'Export to JSON', 'Team workflows'], badges: { openSource: true, free: true }, links: { website: 'https://www.getmarkup.com' } },
  'thepanel': { tagline: 'Open-source analytics platform', tags: ['analytics', 'web', 'mobile'], features: ['Event tracking', 'User analytics', 'Custom dashboards', 'Mixpanel alternative'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://thepanel.dev' } },
  'lumina-ai': { tagline: 'Multi-modal AI platform', tags: ['chatbot', 'image', 'video', 'music'], features: ['Chat AI', 'Image generation', 'Video creation', 'Music composition'], badges: { openSource: true, free: true }, links: { website: 'https://luminaai.tech' } },
  'zetane-com': { tagline: 'Transparent AI development', tags: ['transparency', 'explainable', 'high-risk'], features: ['Model interpretability', 'AI transparency tools', 'Risk assessment', 'Compliance reporting'], badges: { openSource: true, free: true }, links: { website: 'https://zetane.com' } },
  'languagegui': { tagline: 'UI Kit for LLM outputs', tags: ['UI', 'LLM', 'formatting', 'components'], features: ['Rich text rendering', 'Code block support', 'Table formatting', 'Custom styling'], badges: { openSource: true, free: true }, links: { website: 'https://languagegui.com' } },
  'dvc-ai': { tagline: 'Version control for ML', tags: ['version-control', 'ML', 'data', 'Git'], features: ['Data versioning', 'Experiment tracking', 'Pipeline management', 'Git integration'], badges: { openSource: true, free: true }, links: { website: 'https://dvc.ai' } },
  'eyegestures': { tagline: 'Webcam-based gaze tracking', tags: ['gaze', 'tracking', 'accessibility'], features: ['Webcam eye tracking', 'No special hardware', 'Accessibility tools', 'Research applications'], badges: { openSource: true, free: true }, links: { website: 'https://eyegestures.com' } },
  'contribhub': { tagline: 'Find open-source projects', tags: ['open-source', 'contributions', 'community'], features: ['Project discovery', 'Skill matching', 'Issue filtering', 'Contributor profiles'], badges: { openSource: true, free: true }, links: { website: 'https://contribhub.com' } },
  'autoarena': { tagline: 'Automated GenAI evaluation', tags: ['evaluation', 'GenAI', 'benchmark'], features: ['Head-to-head comparisons', 'LLM-as-judge', 'Elo ranking', 'Automated benchmarks'], badges: { openSource: true, free: true }, links: { website: 'https://www.autoarena.app' } },
  'bakery-by-bagel': { tagline: 'Fine-tune AI models easily', tags: ['fine-tuning', 'models', 'monetization'], features: ['One-click fine-tuning', 'Model marketplace', 'Custom datasets', 'Deployment tools'], badges: { openSource: true, free: true }, links: { website: 'https://bakery.dev' } },
  'mutatio-dev': { tagline: 'AI prompt engineering platform', tags: ['prompts', 'testing', 'optimization'], features: ['Prompt versioning', 'A/B testing', 'Performance tracking', 'Team collaboration'], badges: { openSource: true, free: true }, links: { website: 'https://mutatio.dev' } },
  'chattts-site': { tagline: 'Realistic dialogue text-to-speech', tags: ['TTS', 'dialogue', 'voice'], features: ['Natural speech output', 'Dialogue generation', 'Multiple speakers', 'Open-source model'], badges: { openSource: true, free: true }, links: { website: 'https://www.chattts.site' } },
  'overwatch-data': { tagline: 'AI-driven news intelligence', tags: ['news', 'intelligence', 'OSINT'], features: ['Tailored news feeds', 'Social media insights', 'Trend analysis', 'Alert system'], badges: { openSource: true, free: true }, links: { website: 'https://overwatchdata.ai' } },
  'opnform': { tagline: 'AI form builder', tags: ['forms', 'surveys', 'builder', 'no-code'], features: ['AI-assisted form creation', 'Conditional logic', 'Custom branding', 'Unlimited forms'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://opnform.com' } },
  'webposter-lab': { tagline: 'AI poster generator', tags: ['poster', 'design', 'AI', 'website'], features: ['Website-to-poster conversion', 'Custom layouts', 'Brand colors', 'Export options'], badges: { openSource: true, free: true }, links: { website: 'https://webposterlab.com' } },
  'monai-io': { tagline: 'Healthcare imaging AI framework', tags: ['healthcare', 'medical-imaging', 'deep-learning'], features: ['Medical image processing', 'Pre-trained models', 'DICOM support', 'Clinical deployment'], badges: { openSource: true, free: true }, links: { website: 'https://monai.io' } },
  'quenti': { tagline: 'Free learning platform', tags: ['education', 'flashcards', 'study'], features: ['AI flashcard creation', 'Study games', 'Progress tracking', 'Collaborative sets'], badges: { openSource: true, free: true }, links: { website: 'https://quenti.io' } },
  'flux-ai-image-generator-with-flux-1': { tagline: 'Multi-model AI image generator', tags: ['image', 'generation', 'multi-model'], features: ['Multiple Flux models', 'Diverse creative styles', 'Text-to-image', 'Free to use'], badges: { openSource: true, free: true }, links: { website: 'https://fluxai.dev' } },
  'staticblocks': { tagline: 'AI static website builder', tags: ['website', 'builder', 'static', 'self-hosted'], features: ['Drag-and-drop builder', 'AI content generation', 'No coding needed', 'Self-hostable'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://staticblocks.com' } },
  'swiftsora': { tagline: 'Sora-based AI video generator', tags: ['video', 'Sora', 'deployment'], features: ['One-click deployment', 'Text-to-video', 'Web-based interface', 'Open-source code'], badges: { openSource: true, free: true }, links: { website: 'https://www.swiftsora.com' } },
  'frigate-nvr': { tagline: 'Local AI camera monitoring', tags: ['NVR', 'detection', 'cameras', 'local'], features: ['Real-time object detection', 'Local AI processing', 'Multi-camera support', 'Event recording'], badges: { openSource: true, free: true, privacyFocused: true, selfHostable: true }, links: { website: 'https://frigate.video' } },
  'classroomio': { tagline: 'Open-source LMS with AI', tags: ['LMS', 'courses', 'education', 'AI'], features: ['Course management', 'AI learning assistant', 'Student progress', 'Custom branding'], badges: { openSource: true, free: true, selfHostable: true }, links: { website: 'https://classroomio.com' } },
  'countless-dev': { tagline: 'Compare AI models side by side', tags: ['comparison', 'models', 'evaluation'], features: ['Side-by-side comparison', 'Multi-provider support', 'Response quality metrics', 'Free unlimited use'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://countless.dev' } },
  'public-prompts': { tagline: 'Free prompts and models collection', tags: ['prompts', 'models', 'embeddings', 'free'], features: ['Curated prompt library', 'Free model downloads', 'Embedding resources', 'Community contributions'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://publicprompts.art' } },
  'hunyuan-video': { tagline: 'Tencent AI video generator', tags: ['video', 'generation', 'Tencent'], features: ['Text-to-video creation', 'High resolution output', 'Open model weights', 'No signup needed'], badges: { openSource: true, free: true }, links: { website: 'https://hunyuanvideoai.com' } },
  'harmonai': { tagline: 'Open-source generative audio', tags: ['audio', 'music', 'generation'], features: ['Music generation', 'Audio synthesis', 'Community tools', 'Open model weights'], badges: { openSource: true, free: true }, links: { website: 'https://www.harmonai.org' } },
  'usethisprompt': { tagline: 'Community prompt sharing', tags: ['prompts', 'productivity', 'community'], features: ['Prompt library', 'Community voting', 'Category browsing', 'Copy-paste ready'], badges: { openSource: true, free: true, noSignup: true }, links: { website: 'https://usethisprompt.io' } },
  'text-generator-plugin': { tagline: 'AI plugin for Obsidian', tags: ['Obsidian', 'writing', 'knowledge', 'plugin'], features: ['Obsidian integration', 'AI text generation', 'Template support', 'Knowledge linking'], badges: { openSource: true, free: true }, links: { website: 'https://text-gen.com' } },
  'freenote': { tagline: 'AI journal with local storage', tags: ['journal', 'notes', 'privacy', 'local'], features: ['Local-first storage', 'AI summaries', 'Tag organization', 'Privacy-focused'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://freenote.app' } },
  'text-snap': { tagline: 'AI text formatting tool', tags: ['text', 'formatting', 'OCR'], features: ['Accurate text capture', 'Format preservation', 'Quick actions', 'Multi-platform support'], badges: { openSource: true, free: true }, links: { website: 'https://www.textsnap.app' } },
  'reactor': { tagline: 'Face swap for Stable Diffusion', tags: ['face-swap', 'Stable Diffusion', 'privacy'], features: ['Local face swapping', 'SD WebUI extension', 'No cloud processing', 'Multiple face support'], badges: { openSource: true, free: true, privacyFocused: true }, links: { website: 'https://github.com/Gourieff/sd-webui-reactor' } },
}

// ── Auto-enrichment for remaining tools ────────────────────────────────
function autoEnrich(tool: AITool): EnrichedToolData {
  const catTag = tool.category
    .replace(/^AI for /, '')
    .replace(/^AI /, '')
    .toLowerCase()

  const tags: string[] = [catTag]
  if (tool.openSource) tags.push('open-source')
  if (tool.web3) tags.push('web3')
  if (tool.privacy) tags.push('privacy')

  return {
    tags,
    features: [],
    badges: {
      openSource: tool.openSource || undefined,
      free: tool.free || undefined,
      privacyFocused: tool.privacy || undefined,
    },
    links: { website: tool.website },
  }
}

// ── Build lookup map ───────────────────────────────────────────────────
const map = new Map<string, EnrichedToolData>()

for (const tool of aiTools) {
  map.set(tool.handle, autoEnrich(tool))
}
for (const [handle, data] of Object.entries(researched)) {
  map.set(handle, data)
}

export function getEnrichedData(handle: string): EnrichedToolData | undefined {
  return map.get(handle)
}
