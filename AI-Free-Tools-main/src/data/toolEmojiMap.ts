/**
 * Smart emoji + color mapping for tool logos.
 * Each tool gets a semantically meaningful emoji based on what
 * the tool actually IS and what its name means — not generic fallbacks.
 *
 * Used as fallback when simple-icons has no brand SVG match.
 */

export interface EmojiLogo {
  emoji: string
  color: string
}

const map: Record<string, EmojiLogo> = {
  // ── LM Arena — arena/battle for LLMs ──
  'lm-arena': { emoji: '⚔️', color: '#f59e0b' },

  // ── Cocoon — silk cocoon on TON blockchain ──
  'cocoon-tg': { emoji: '🐚', color: '#0098ea' },

  // ── Qwen — Alibaba multilingual model (通义千问 = "thousand questions") ──
  'qwen': { emoji: '🌐', color: '#ef4444' },

  // ── ChatGLM — Chinese bilingual LLM (GLM = General Language Model) ──
  'chatglm': { emoji: '🀄', color: '#2563eb' },

  // ── InternLM — "intern" = researcher in training ──
  'internlm': { emoji: '🎓', color: '#6366f1' },

  // ── Yi (01.AI) — yi = 一 = "one" in Chinese ──
  'yi-01ai': { emoji: '1️⃣', color: '#0ea5e9' },

  // ── Baichuan — 百川 = "hundred rivers" ──
  'baichuan': { emoji: '🏞️', color: '#0891b2' },

  // ── MiniCPM — mini/compact model (小 = small) ──
  'minicpm': { emoji: '🔬', color: '#8b5cf6' },

  // ── Jan — simple/clean local AI (calendar month, clean design) ──
  'jan-ai': { emoji: '🗓️', color: '#3b82f6' },

  // ── Open WebUI — web interface/browser ──
  'open-webui': { emoji: '🖥️', color: '#2563eb' },

  // ── LibreChat — libre = free/freedom, chat ──
  'librechat': { emoji: '🗽', color: '#10b981' },

  // ── Chatbot UI — chat interface ──
  'chatbot-ui': { emoji: '💬', color: '#6366f1' },

  // ── OpenChatKit — toolkit/wrench for building chatbots ──
  'openchatkit': { emoji: '🧰', color: '#f97316' },

  // ── OpenAssistantGPT — robot assistant ──
  'openassistantgpt': { emoji: '🤖', color: '#10b981' },

  // ── n8n — node-to-node workflow automation ──
  'n8n': { emoji: '🔗', color: '#ea4b71' },

  // ── Flowise — flow/river of data ──
  'flowise': { emoji: '🌊', color: '#3b82f6' },

  // ── Langflow — language flow, visual builder ──
  'langflow': { emoji: '🧩', color: '#f97316' },

  // ── Kilo — coding assistant (kilo = measure/weight) ──
  'kilo-ai': { emoji: '⚡', color: '#22c55e' },

  // ── Stable Diffusion — diffusion waves ──
  'stable-diffusion': { emoji: '🌊', color: '#7c3aed' },

  // ── Psychoroid — 3D psychedelic android ──
  'psychoroid-com': { emoji: '🧊', color: '#a855f7' },

  // ── Hunyuan 3D — Tencent 3D model (混元 = primordial chaos) ──
  'hunyuan3d-2-0': { emoji: '🔮', color: '#06b6d4' },

  // ── Fiorino — Italian gold coin (fiorino d'oro) ──
  'fiorino-ai': { emoji: '🪙', color: '#eab308' },

  // ── Evangeler — evangelist/preacher spreading the word ──
  'evangeler-list-of-affiliate-programs': { emoji: '📢', color: '#f97316' },

  // ── Dify — DIY + AI = build it yourself ──
  'dify-ai': { emoji: '🏗️', color: '#6366f1' },
  'dify': { emoji: '🏗️', color: '#6366f1' },

  // ── Tiptap Editor — typing/tapping editor ──
  'tiptap-editor-3-0-beta': { emoji: '✏️', color: '#6366f1' },

  // ── Activepieces — puzzle pieces / automation ──
  'activepieces': { emoji: '🧩', color: '#e11d48' },

  // ── Coder — cloud development environment ──
  'coder': { emoji: '☁️', color: '#3b82f6' },

  // ── Agno — agnostic AI agent library ──
  'agno': { emoji: '🧠', color: '#8b5cf6' },

  // ── Qdrant — vector search (quadrant) ──
  'qdrant-io': { emoji: '📐', color: '#dc2626' },

  // ── Pearai — pear fruit + AI ──
  'pearai': { emoji: '🍐', color: '#22c55e' },

  // ── Suna — sun + AI assistant ──
  'suna': { emoji: '☀️', color: '#f59e0b' },

  // ── SuperAGI — super powered AGI ──
  'superagi-cloud': { emoji: '🦸', color: '#6366f1' },

  // ── CopilotKit — copilot/plane + toolkit ──
  'copilotkit': { emoji: '✈️', color: '#0ea5e9' },

  // ── Skyvern — sky + wyvern (dragon) ──
  'skyvern': { emoji: '🐲', color: '#6366f1' },

  // ── Open Interpreter — terminal/console interpreter ──
  'open-interpreter': { emoji: '🖥️', color: '#22c55e' },

  // ── APIPark — park/garden for APIs ──
  'apipark': { emoji: '🏞️', color: '#06b6d4' },

  // ── LLMChat — chat research platform ──
  'llmchat': { emoji: '💭', color: '#8b5cf6' },

  // ── Screenpipe — screen recording pipe ──
  'screenpipe': { emoji: '📺', color: '#22c55e' },

  // ── Laminar — smooth flow (fluid dynamics) ──
  'laminar': { emoji: '〰️', color: '#6366f1' },

  // ── Langtrace — trace/follow language models ──
  'langtrace-ai': { emoji: '🔍', color: '#3b82f6' },

  // ── Patched — code patches ──
  'patched': { emoji: '🩹', color: '#f97316' },

  // ── Rlama — R + llama ──
  'rlama': { emoji: '🦙', color: '#f97316' },

  // ── Devika — female name, AI developer ──
  'devika-ai': { emoji: '👩‍💻', color: '#8b5cf6' },

  // ── MaxKB — max knowledge base ──
  'maxkb': { emoji: '📚', color: '#3b82f6' },

  // ── Pneumatic — air pressure/pneumatic systems ──
  'pneumatic-workflow': { emoji: '🌬️', color: '#64748b' },

  // ── Qubinets — quantum cubes + kubernetes ──
  'qubinets': { emoji: '🧊', color: '#06b6d4' },

  // ── Blueprints — blueprint/architecture plans ──
  'blueprints': { emoji: '📋', color: '#3b82f6' },

  // ── AI Adventure — adventure game ──
  'ai-adventure': { emoji: '⚔️', color: '#10b981' },

  // ── Qrev — sales revolution/revenue ──
  'qrev-ai': { emoji: '📈', color: '#22c55e' },

  // ── Memoripy — memory + Python ──
  'memoripy': { emoji: '🧠', color: '#a855f7' },

  // ── Ask On Data — question + data ──
  'ask-on-data': { emoji: '📊', color: '#3b82f6' },

  // ── 008 — agent 008, like James Bond ──
  '008': { emoji: '📞', color: '#64748b' },

  // ── Octogen — octopus + code generation ──
  'octogen-an-open-source-code-interpreter': { emoji: '🐙', color: '#7c3aed' },

  // ── LLMonitor — monitoring LLMs ──
  'llmonitor': { emoji: '📡', color: '#f59e0b' },

  // ── JACoB — Just Another Coding Bot ──
  'jacob-just-another-coding-bot': { emoji: '🤖', color: '#22c55e' },

  // ── Hexabot — hexagon + bot ──
  'hexabot': { emoji: '⬡', color: '#06b6d4' },

  // ── Scourhead — scouring/scraping data ──
  'scourhead': { emoji: '🕷️', color: '#475569' },

  // ── Open Agent Kit — agent toolkit ──
  'open-agent-kit-build-agents-in-minutes': { emoji: '🧰', color: '#3b82f6' },

  // ── Matter — matter/substance code review ──
  'matter-ai': { emoji: '🔬', color: '#8b5cf6' },

  // ── MagicAnimate — magic wand + animation ──
  'magicanimate-playground': { emoji: '🪄', color: '#d946ef' },

  // ── Magi 1 — magi = wise men ──
  'magi-1': { emoji: '🌟', color: '#eab308' },

  // ── BreveAI — breve = brief/short ──
  'breveai': { emoji: '📝', color: '#0ea5e9' },

  // ── Chat With Media — chat + documents ──
  'chat-with-media': { emoji: '📄', color: '#6366f1' },

  // ── iAsk — question/ask ──
  'iask': { emoji: '❓', color: '#3b82f6' },

  // ── Civitai Green — AI art community ──
  'civitai-green': { emoji: '🎨', color: '#22c55e' },

  // ── Pollinations — flowers/pollination = creation ──
  'pollinations': { emoji: '🌸', color: '#ec4899' },

  // ── Helicone — helix/spiral (observability) ──
  'helicone-ai': { emoji: '🌀', color: '#f59e0b' },

  // ── DeepSeek R1 — deep search/thinking ──
  'deepseek-r1': { emoji: '🔍', color: '#6366f1' },

  // ── Meilisearch — search engine ──
  'meilisearch': { emoji: '🔎', color: '#f43f5e' },

  // ── Tolgee — tongue/language translator ──
  'tolgee-ai-translator': { emoji: '🌍', color: '#e11d48' },

  // ── FLUX 1 — flux = flow of energy ──
  'flux-1-ai-1': { emoji: '⚡', color: '#fbbf24' },

  // ── Kokoro — kokoro = heart in Japanese ──
  'kokoro-web': { emoji: '❤️', color: '#ef4444' },

  // ── AI Flow — flow/river of AI ──
  'ai-flow': { emoji: '🌊', color: '#0ea5e9' },

  // ── Morphik — morph = change shape ──
  'morphik': { emoji: '🔄', color: '#8b5cf6' },

  // ── Tracardi — customer tracking ──
  'tracardi': { emoji: '👤', color: '#3b82f6' },

  // ── Openkoda — open source code platform ──
  'openkoda': { emoji: '🏢', color: '#475569' },

  // ── DeepSeek Online ──
  'deepseek-online': { emoji: '🔍', color: '#6366f1' },

  // ── Flojoy Studio — flow + joy ──
  'flojoy-studio': { emoji: '🎛️', color: '#22c55e' },

  // ── Lakesail — lake + sailing ──
  'lakesail': { emoji: '⛵', color: '#0ea5e9' },

  // ── API Usage — metrics/tracking ──
  'api-usage': { emoji: '📊', color: '#f59e0b' },

  // ── SoraWebUI — Sora = sky in Japanese ──
  'sorawebui': { emoji: '🎬', color: '#a855f7' },

  // ── Aigur — build/construct ──
  'aigur-dev': { emoji: '🏗️', color: '#6366f1' },

  // ── Yobulk — CSV bulk import ──
  'yobulk': { emoji: '📥', color: '#22c55e' },

  // ── Prst — prompt management ──
  'prst-ai': { emoji: '🎯', color: '#ea580c' },

  // ── Mistral 7B — mistral wind ──
  'the-complete-giude-of-mistral-7b': { emoji: '🌪️', color: '#64748b' },

  // ── Embedefy — embeddings ──
  'embedefy': { emoji: '🧬', color: '#8b5cf6' },

  // ── ChatGPT Sora — video from text ──
  'chatgptsora': { emoji: '🎬', color: '#a855f7' },

  // ── Pongo — orangutan (Pongo = genus of orangutans) ──
  'pongo': { emoji: '🦧', color: '#f97316' },

  // ── Lite Queen — lightweight database queen ──
  'lite-queen': { emoji: '👑', color: '#eab308' },

  // ── Stable Audio Open — audio waveform ──
  'stable-audio-open': { emoji: '🎵', color: '#7c3aed' },

  // ── Domino — domino tiles / chain workflow ──
  'domino': { emoji: '🁣', color: '#475569' },

  // ── TheMog — market analysis mogul ──
  'themog': { emoji: '📈', color: '#10b981' },

  // ── Volamail — flight + email (vola = fly in Italian) ──
  'volamail': { emoji: '✉️', color: '#3b82f6' },

  // ── FluxPicture — flux energy image ──
  'fluxpicture': { emoji: '⚡', color: '#fbbf24' },

  // ── Backmesh — backend mesh ──
  'backmesh': { emoji: '🕸️', color: '#6366f1' },

  // ── Open Source AI Gateway — gateway/door ──
  'open-source-ai-gateway': { emoji: '🚪', color: '#06b6d4' },

  // ── Formsflow — forms flowing through workflow ──
  'formsflow': { emoji: '📋', color: '#0ea5e9' },

  // ── OpenSilver — silver/shiny UI framework ──
  'opensilver': { emoji: '🥈', color: '#94a3b8' },

  // ── AdminForth — admin panel fortress ──
  'adminforth': { emoji: '🏰', color: '#6366f1' },

  // ── Contember — content member studio ──
  'ai-assisted-contember-studio': { emoji: '🧱', color: '#f97316' },

  // ── Stablecog — stable + cognition ──
  'stablecog': { emoji: '🧠', color: '#7c3aed' },

  // ── Distillery — distill/extract images ──
  'distillery-by-followfox': { emoji: '🦊', color: '#f97316' },

  // ── MyGPTReader — reading bot ──
  'mygptreader': { emoji: '📖', color: '#3b82f6' },

  // ── Epigram — short witty saying / news ──
  'epigram': { emoji: '📰', color: '#f59e0b' },

  // ── ArGPT for Monocle — AR glasses ──
  'argpt-for-monocle': { emoji: '👓', color: '#6366f1' },

  // ── Amurex — Amur river + rex = king ──
  'amurex': { emoji: '🐅', color: '#f97316' },

  // ── VoiceInk — voice to ink/text ──
  'voiceink': { emoji: '🎤', color: '#8b5cf6' },

  // ── Chatpad — chat notepad ──
  'chatpad-ai': { emoji: '📝', color: '#3b82f6' },

  // ── Sanctum — sacred/safe place ──
  'sanctum-ai': { emoji: '🏛️', color: '#6366f1' },

  // ── Design System — design tools ──
  'design-system': { emoji: '🎨', color: '#ec4899' },

  // ── Todovex — todo + vex (complex todo) ──
  'todovex': { emoji: '✅', color: '#22c55e' },

  // ── WebDB — web database ──
  'webdb': { emoji: '🗄️', color: '#3b82f6' },

  // ── Llama 3 — llama animal (Meta LLaMA) ──
  'llama-3': { emoji: '🦙', color: '#3b82f6' },

  // ── CyberTraceAI — cyber/network trace ──
  'cybertraceai': { emoji: '🛡️', color: '#06b6d4' },

  // ── Plexo — plexus/interconnected ──
  'plexo': { emoji: '🔗', color: '#8b5cf6' },

  // ── Aurora Terminal Agent — aurora borealis + terminal ──
  'aurora-terminal-agent': { emoji: '🌌', color: '#22d3ee' },

  // ── Reflection 70B — mirror reflection ──
  'reflection-70b': { emoji: '🪞', color: '#6366f1' },

  // ── Prompto — prompt/command ──
  'prompto': { emoji: '💡', color: '#f59e0b' },

  // ── Gnothi — Greek "know thyself" (γνῶθι σεαυτόν) ──
  'gnothi': { emoji: '🏛️', color: '#8b5cf6' },

  // ── Rapid — speed/fast ──
  'rapid-ai': { emoji: '🚀', color: '#ef4444' },

  // ── DeepLiveCam — camera/live streaming ──
  'deeplivecam': { emoji: '📷', color: '#475569' },

  // ── Pygmalion — Greek sculptor who loved his creation ──
  'pygmalion-ai': { emoji: '🗿', color: '#f97316' },

  // ── AI Tamago — tamagotchi virtual pet ──
  'ai-tamago': { emoji: '🥚', color: '#fbbf24' },

  // ── Vizzy — visualization ──
  'vizzy': { emoji: '📊', color: '#06b6d4' },

  // ── Reachat — React + chat ──
  'reachat': { emoji: '⚛️', color: '#61dafb' },

  // ── Continue — play/continue coding ──
  'continue': { emoji: '▶️', color: '#22c55e' },
  'continue-dev': { emoji: '▶️', color: '#22c55e' },

  // ── ChattyUI — chatty/talkative ──
  'chattyui': { emoji: '🗨️', color: '#6366f1' },

  // ── Snowbrain — snow + brain (Snowflake data) ──
  'snowbrain': { emoji: '❄️', color: '#0ea5e9' },

  // ── BotticelliBots — Botticelli (Renaissance painter) + bots ──
  'botticellibots': { emoji: '🖼️', color: '#b45309' },

  // ── PromptCraft — crafting prompts ──
  'promptcraft': { emoji: '⚒️', color: '#f59e0b' },

  // ── TavonnAI — tavern of AI models ──
  'tavonnai': { emoji: '🍺', color: '#a855f7' },

  // ── RepoBase — repository base analysis ──
  'repobase': { emoji: '📦', color: '#475569' },

  // ── Bagel — bagel food ──
  'bagel': { emoji: '🥯', color: '#f97316' },

  // ── AIEditor — AI writing editor ──
  'aieditor': { emoji: '✍️', color: '#6366f1' },

  // ── Refiner — refine/polish code ──
  'refiner': { emoji: '💎', color: '#0ea5e9' },

  // ── SamaritanAI — good samaritan helping ──
  'samaritanai': { emoji: '🤝', color: '#22c55e' },

  // ── LibSwitch — switch between libraries ──
  'libswitch': { emoji: '🔀', color: '#f97316' },

  // ── PapertLab — paper/lab for coding ──
  'papertlab-from-papert-in': { emoji: '🧪', color: '#8b5cf6' },

  // ── CrackCoder — cracking coding interviews ──
  'crackcoder': { emoji: '💻', color: '#22c55e' },

  // ── Components.ai — design components ──
  'components-ai': { emoji: '🧩', color: '#ec4899' },

  // ── Lilac — lilac flower (data quality) ──
  'lilac': { emoji: '💜', color: '#a855f7' },

  // ── LearnHouse — house of learning ──
  'learnhouse': { emoji: '🏠', color: '#22c55e' },

  // ── Recontent — re-content/localization ──
  'recontent-app': { emoji: '🌐', color: '#3b82f6' },

  // ── Learn Prompting — graduation/learning ──
  'learn-prompting': { emoji: '🎓', color: '#6366f1' },

  // ── OSS Insight — open source insight/eye ──
  'oss-insight': { emoji: '👁️', color: '#3b82f6' },

  // ── Constellab — constellation + lab ──
  'constellab': { emoji: '🌟', color: '#6366f1' },

  // ── LangUI — language UI components ──
  'langui': { emoji: '🧱', color: '#06b6d4' },

  // ── AI UX Patterns — UX patterns ──
  'ai-ux-patterns': { emoji: '🎯', color: '#f97316' },

  // ── ChartDB — database diagrams ──
  'chartdb': { emoji: '🗺️', color: '#3b82f6' },

  // ── Hugging Face — hugging ──
  'hugging-face': { emoji: '🤗', color: '#fbbf24' },

  // ── Airbyte — air + byte ──
  'airbyte': { emoji: '🔄', color: '#6366f1' },

  // ── Label Studio — labeling data ──
  'label-studio': { emoji: '🏷️', color: '#f97316' },

  // ── MindSpore — mind + spore (Huawei) ──
  'mindspore-cn': { emoji: '🧠', color: '#ef4444' },

  // ── Huntr — bug hunter ──
  'huntr-com': { emoji: '🎯', color: '#dc2626' },

  // ── CalcForge — calculator + forge ──
  'calcforge': { emoji: '🔧', color: '#475569' },

  // ── Metaflow — meta + flow (Netflix) ──
  'metaflow-org': { emoji: '🌊', color: '#e50914' },

  // ── Spice — spice/seasoning + data ──
  'spice-ai': { emoji: '🌶️', color: '#f97316' },

  // ── OpenLIT — open observability light ──
  'openlit': { emoji: '💡', color: '#06b6d4' },

  // ── AI Grant — money/grants ──
  'aigrant-org': { emoji: '💰', color: '#22c55e' },

  // ── Nat.dev — natural/playground ──
  'nat-dev': { emoji: '🎮', color: '#8b5cf6' },

  // ── Tilemaker — tiles/patterns ──
  'tilemaker': { emoji: '🔲', color: '#6366f1' },

  // ── Resume Matcher — resume/document ──
  'resume-matcher': { emoji: '📄', color: '#3b82f6' },

  // ── Makr.io — maker ──
  'makr-io-15-web-apps-in-30-days': { emoji: '🛠️', color: '#f97316' },

  // ── Embedditor — embeddings editor ──
  'embedditor': { emoji: '🧬', color: '#6366f1' },

  // ── Markup — document markup ──
  'markup-document-annotation': { emoji: '📐', color: '#475569' },

  // ── ThePanel — analytics panel ──
  'thepanel': { emoji: '📊', color: '#3b82f6' },

  // ── Lumina — light/luminous ──
  'lumina-ai': { emoji: '💡', color: '#fbbf24' },

  // ── Zetane — transparent AI ──
  'zetane-com': { emoji: '🔮', color: '#06b6d4' },

  // ── LanguageGUI — language interface ──
  'languagegui': { emoji: '🖼️', color: '#8b5cf6' },

  // ── DVC — data version control ──
  'dvc-ai': { emoji: '📂', color: '#9333ea' },

  // ── EyeGestures — eye tracking ──
  'eyegestures': { emoji: '👁️', color: '#22c55e' },

  // ── ContribHub — hub for contributions ──
  'contribhub': { emoji: '🤝', color: '#f97316' },

  // ── AutoArena — automated arena battles ──
  'autoarena': { emoji: '🏟️', color: '#6366f1' },

  // ── Bakery by Bagel — bakery/baking models ──
  'bakery-by-bagel': { emoji: '🧁', color: '#f97316' },

  // ── Mutatio — mutation/change ──
  'mutatio-dev': { emoji: '🧬', color: '#a855f7' },

  // ── ChatTTS — text to speech ──
  'chattts-site': { emoji: '🗣️', color: '#3b82f6' },

  // ── Overwatch Data — watching/surveillance intelligence ──
  'overwatch-data': { emoji: '🔭', color: '#475569' },

  // ── OpnForm — open forms ──
  'opnform': { emoji: '📝', color: '#6366f1' },

  // ── WebPoster Lab — poster creation ──
  'webposter-lab': { emoji: '🖼️', color: '#ec4899' },

  // ── MONAI — medical AI (MONkeys in AI lol, but really Medical Open Network for AI) ──
  'monai-io': { emoji: '🏥', color: '#22c55e' },

  // ── Quenti — quiz/learning ──
  'quenti': { emoji: '📚', color: '#6366f1' },

  // ── FLUX AI Image Generator ──
  'flux-ai-image-generator-with-flux-1': { emoji: '⚡', color: '#fbbf24' },

  // ── Staticblocks — static building blocks ──
  'staticblocks': { emoji: '🧱', color: '#475569' },

  // ── SwiftSora — swift + sora (sky) ──
  'swiftsora': { emoji: '🎬', color: '#f97316' },

  // ── Frigate NVR — frigate ship (security camera) ──
  'frigate-nvr': { emoji: '🚢', color: '#0ea5e9' },

  // ── ClassroomIO — classroom/school ──
  'classroomio': { emoji: '🏫', color: '#3b82f6' },

  // ── Countless — counting/comparing AI ──
  'countless-dev': { emoji: '♾️', color: '#8b5cf6' },

  // ── Public Prompts — open prompts gallery ──
  'public-prompts': { emoji: '🎭', color: '#a855f7' },

  // ── Hunyuan Video — Tencent video gen ──
  'hunyuan-video': { emoji: '🎬', color: '#06b6d4' },

  // ── HarmonAI — harmony + AI (music) ──
  'harmonai': { emoji: '🎶', color: '#8b5cf6' },

  // ── UseThisPrompt — share prompts ──
  'usethisprompt': { emoji: '💬', color: '#f97316' },

  // ── Text Generator Plugin — text/Obsidian ──
  'text-generator-plugin': { emoji: '📝', color: '#7c3aed' },

  // ── Freenote — free notebook ──
  'freenote': { emoji: '📓', color: '#22c55e' },

  // ── Text Snap — snap/capture text ──
  'text-snap': { emoji: '📸', color: '#3b82f6' },

  // ── GPT4All — GPT for all, local ──
  'gpt4all': { emoji: '💬', color: '#22c55e' },

  // ── LM Studio — studio controls/sliders ──
  'lm-studio': { emoji: '🎛️', color: '#9333ea' },

  // ── Perplexity — questioning/search ──
  'perplexity': { emoji: '❓', color: '#2563eb' },

  // ── Phind — find for developers ──
  'phind': { emoji: '🔎', color: '#22c55e' },

  // ── NotebookLM — Google's research notebook ──
  'notebooklm': { emoji: '📓', color: '#4285f4' },

  // ── Gemini — twins/gemini constellation ──
  'gemini': { emoji: '♊', color: '#4285f4' },

  // ── Grok — deep understanding (from "Stranger in a Strange Land") ──
  'grok': { emoji: '🌌', color: '#0f172a' },

  // ── Cody (Sourcegraph) — code + buddy ──
  'cody': { emoji: '💻', color: '#a112ff' },

  // ── Tabby — tabby cat ──
  'tabby': { emoji: '🐱', color: '#f59e0b' },

  // ── Cline — command line AI agent ──
  'cline': { emoji: '⌨️', color: '#22c55e' },

  // ── OpenHands — open hands helping ──
  'openhands': { emoji: '🤲', color: '#6366f1' },

  // ── Fooocus — focus/target ──
  'fooocus': { emoji: '🎯', color: '#ea580c' },

  // ── ComfyUI — comfy/cozy node editor ──
  'comfyui': { emoji: '🛋️', color: '#d97706' },

  // ── Flux (Black Forest Labs) — flux energy ──
  'flux': { emoji: '⚡', color: '#fbbf24' },

  // ── Whisper — whisper/microphone ──
  'whisper': { emoji: '🎙️', color: '#6b7280' },

  // ── Piper TTS — pied piper (flute) ──
  'piper-tts': { emoji: '🎵', color: '#22c55e' },

  // ── AnythingLLM — anything/everything box ──
  'anythingllm': { emoji: '📦', color: '#475569' },

  // ── PrivateGPT — private lock ──
  'privategpt': { emoji: '🔒', color: '#4f46e5' },

  // ── Bolt.new — lightning bolt ──
  'bolt-new': { emoji: '⚡', color: '#f97316' },

  // ── v0 by Vercel — zero/launch ──
  'v0-dev': { emoji: '🚀', color: '#000000' },

  // ── Replit Agent — replit logo/code ──
  'replit-agent': { emoji: '💻', color: '#f26207' },

  // ── SearXNG — search across engines ──
  'searxng': { emoji: '🔍', color: '#3b82f6' },

  // ── Khoj — khoj = search in Hindi/Urdu ──
  'khoj': { emoji: '🔦', color: '#f59e0b' },

  // ── Llama 3 (Meta) — llama animal ──
  'llama3': { emoji: '🦙', color: '#3b82f6' },

  // ── Gemma (Google) — gemma = gem in Italian ──
  'gemma': { emoji: '💎', color: '#14b8a6' },

  // ── Phi (Microsoft) — Greek letter φ ──
  'phi': { emoji: 'φ', color: '#2563eb' },

  // ── Bark — dog bark (audio generation) ──
  'bark': { emoji: '🐕', color: '#f97316' },

  // ── Upscayl — upscale/magnify ──
  'upscayl': { emoji: '🔎', color: '#a855f7' },

  // ── InvokeAI — invoke/summon magic ──
  'invokeai': { emoji: '🎭', color: '#c026d3' },

  // ── Docling (IBM) — document duckling ──
  'docling': { emoji: '📑', color: '#0f62fe' },

  // ── Marker — highlighter marker ──
  'marker': { emoji: '🖍️', color: '#ef4444' },

  // ── Roop / ReActor — face swap reactor ──
  'reactor': { emoji: '🎭', color: '#ef4444' },

  // ── Aider — aide/helper ──
  'aider': { emoji: '🤝', color: '#22c55e' },
}

/**
 * Get the smart emoji logo for a tool by handle.
 * Returns null if no mapping exists.
 */
export function getToolEmoji(handle: string): EmojiLogo | null {
  return map[handle] ?? null
}

/**
 * Get emoji by tool name as secondary lookup.
 */
export function getToolEmojiByName(name: string): EmojiLogo | null {
  const lower = name.toLowerCase()

  // Well-known model/tool name patterns
  if (lower.includes('llama')) return { emoji: '🦙', color: '#3b82f6' }
  if (lower.includes('mistral')) return { emoji: '🌪️', color: '#64748b' }
  if (lower.includes('falcon')) return { emoji: '🦅', color: '#eab308' }
  if (lower.includes('deepseek')) return { emoji: '🔍', color: '#6366f1' }
  if (lower.includes('flux')) return { emoji: '⚡', color: '#fbbf24' }
  if (lower.includes('sora')) return { emoji: '🎬', color: '#a855f7' }
  if (lower.includes('whisper')) return { emoji: '🎙️', color: '#6b7280' }
  if (lower.includes('stable')) return { emoji: '🌊', color: '#7c3aed' }
  if (lower.includes('gpt')) return { emoji: '💬', color: '#22c55e' }
  if (lower.includes('chat')) return { emoji: '💬', color: '#6366f1' }

  return null
}
