import { Sparkles } from 'lucide-react'

const models = [
  {
    name: 'LLaMA 3 (Meta)',
    description: 'State-of-the-art open-source language model for reasoning and coding.',
    url: 'https://llama.meta.com',
    emoji: '\u{1F9E0}'
  },
  {
    name: 'Qwen 2.5 (Alibaba)',
    description: 'High-quality bilingual models with strong performance in Chinese and English.',
    url: 'https://huggingface.co/Qwen',
    emoji: '\u{1F310}'
  },
  {
    name: 'DeepSeek R1',
    description: 'Open-source reasoning model focused on deep, step-by-step thinking.',
    url: 'https://deepseek-r1.com',
    emoji: '\u2728'
  },
  {
    name: 'FLUX.1 Schnell',
    description: 'Fast, open-source text-to-image model with high-quality outputs.',
    url: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    emoji: '\u{1F5BC}'
  },
  {
    name: 'Stable Diffusion XL',
    description: 'Open-source image generation model with high-resolution detail.',
    url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
    emoji: '\u{1F3A8}'
  },
  {
    name: 'BigScience Bloom',
    description: 'Multilingual open-source language model built by a global research collective.',
    url: 'https://huggingface.co/bigscience/bloom',
    emoji: '\u{1F4DA}'
  },
  {
    name: 'Mistral Models',
    description: 'Open-source models optimized for speed and strong reasoning performance.',
    url: 'https://mistral.ai',
    emoji: '\u{1F6E0}'
  }
]

export function OpenSourceModels() {
  return (
    <section id="opensource" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-blue-950/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-section-start className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Open Source Models
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Build with Open Models
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Explore the best free and open-source models for language, image generation, and research.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {models.map(model => {
            return (
              <a
                key={model.name}
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl leading-none" aria-hidden>
                      {model.emoji}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{model.description}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
