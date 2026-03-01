// components/AIBeginnersGuide.tsx
import { useState } from 'react'
import { useRevealOnScroll } from '../src/hooks/useRevealOnScroll'
import { ArrowRight, CheckCircle, ChevronRight, GraduationCap } from 'lucide-react'

type StepSection = {
  title: string
  items: string[]
}

type Step = {
  id: number
  emoji: string
  title: string
  coreLesson: string
  deeperTruth: string
  whatYouDo?: string[]
  extraSections?: StepSection[]
  project?: string
  reflection?: string[]
  awareness: string
}

type StepTheme = {
  frame: string
  panelFrame: string
  text: string
  bullet: string
  chip: string
  shadow: string
  action: string
}

const steps: Step[] = [
  {
    id: 1,
    emoji: '📖',
    title: 'Understanding What AI Actually Is (And Why You Are Not "Behind")',
    coreLesson:
      'AI is pattern recognition trained on human knowledge. You already use pattern recognition every day: recognizing faces, understanding language, making decisions. AI just does it faster.',
    deeperTruth:
      'Many people force themselves to learn because they fear being left behind. This creates resistance. Instead, approach AI from curiosity: "What becomes possible if I understand this?" When you love learning itself, not the outcome, the struggle disappears.',
    whatYouDo: [
      'Use Arena.ai or Claude (free accounts) to have a conversation.',
      'Ask it to explain something you are genuinely curious about.',
      'Notice: You are already using AI. The barrier was never your capability; it was your belief about your capability.'
    ],
    awareness:
      'Before moving forward, ask yourself: "Am I learning this because I am afraid of falling behind, or because I am genuinely curious?" Neither is wrong, but knowing the difference changes everything.'
  },
  {
    id: 2,
    emoji: '💬',
    title: 'Training Your AI Thinking (How to Ask Better Questions)',
    coreLesson:
      'AI is only as good as your questions. Learning to prompt AI is learning to think clearly about what you actually want.',
    deeperTruth:
      'Most people struggle with AI because they struggle with clarity in general. "Make me a website" is vague. "Create a one-page portfolio website with my name, three project descriptions, and a contact form" is clear. AI forces you to know what you want, which is valuable far beyond technology.',
    whatYouDo: [
      'Start with a vague question: "Help me with my business."',
      'Watch AI struggle to help you.',
      'Refine: "I run a small bakery. Help me create an Instagram content calendar for the next month focusing on behind-the-scenes content and customer stories."',
      'Notice the difference in response quality.'
    ],
    awareness:
      'Unclear prompts = unclear thinking. If AI cannot understand you, perhaps you do not fully understand yourself yet. This is not failure; it is feedback.'
  },
  {
    id: 3,
    emoji: '📄',
    title: 'Creating Real Content (Writing, Images, Ideas)',
    coreLesson:
      'AI can generate text, images, presentations, and more. But it cannot generate your voice or your perspective; it can only amplify it.',
    deeperTruth:
      'Many people fear AI will replace them. But AI without human direction is like a piano without a pianist: capable, but purposeless. You are the consciousness that gives AI meaning. When you understand this, you stop competing with AI and start collaborating with it.',
    whatYouDo: [
      'Text: Use Claude, Arena.ai, or any open-source AI to write a blog post on something you care about. Start with your raw thoughts, let AI structure them, then edit with your voice.',
      'Images: Use DALL-E, Kling AI, or Stable Diffusion to create visual concepts.',
      'Presentations: Use AI to generate a presentation outline, then customize it.'
    ],
    project:
      'Create one piece of content (article, image series, or presentation) that you would actually share with someone. Make it real, not practice.',
    awareness:
      'Notice when you are tempted to let AI do everything. The temptation is not laziness; it is fear of judgment. Your perspective matters. AI amplifies; you direct.'
  },
  {
    id: 4,
    emoji: '💻',
    title: 'Building Without Coding (No-Code AI Tools)',
    coreLesson:
      'You do not need to code to build powerful things anymore. AI tools can generate code, and no-code platforms let you create without writing a single line.',
    deeperTruth:
      'For decades, technology was gatekept by those who could code. That era is ending. If you can think clearly about what you want to build, you can build it. The only real barrier is believing you cannot.',
    whatYouDo: [
      'Use Bolt.new, Replit, v0.dev, or any open source tools to describe an app or website and watch AI build it.',
      'Try: "Create a simple task tracker where I can add tasks, mark them complete, and filter by status."',
      'Customize the output by describing what you want to change.'
    ],
    extraSections: [
      {
        title: 'Example Projects',
        items: [
          'Personal portfolio website',
          'Simple calculator or converter tool',
          'Recipe organizer',
          'Habit tracker'
        ]
      }
    ],
    awareness:
      'When the tool generates something, resist the urge to say "I did not really build this." You directed it. Architects do not lay bricks; they design buildings. You are learning to architect with AI.'
  },
  {
    id: 5,
    emoji: '🛡️',
    title: 'Using AI Responsibly (Ethics, Privacy, Awareness)',
    coreLesson:
      'AI is powerful, which means it can be used well or poorly. Understanding both is essential.',
    deeperTruth:
      'Technology is neutral. A knife can prepare food or cause harm. AI can educate or manipulate. The difference is not the tool; it is the consciousness wielding it. When you love yourself and others, you naturally use AI responsibly. When you are disconnected, you use it for ego or harm.',
    extraSections: [
      {
        title: 'What You Will Learn',
        items: [
          'Privacy: Do not share personal information, passwords, or sensitive data with AI tools.',
          'Bias: AI is trained on human data, which contains human biases. Be aware. Question outputs.',
          'Misinformation: AI can confidently state incorrect information. Always verify important facts.',
          'Attribution: If you use AI-generated content publicly, be transparent about it.',
          'Dependency: Use AI to enhance your thinking, not replace it.'
        ]
      }
    ],
    awareness:
      'Before using AI for something important, ask: "Is this enhancing human connection or replacing it? Am I using this from love (creating value) or fear (manipulating outcomes)?"'
  },
  {
    id: 6,
    emoji: '🤖',
    title: 'Automating Your Life (Practical AI Workflows)',
    coreLesson:
      "AI's real power is not one-off tasks; it is automating repetitive work so you have more time for what matters.",
    deeperTruth:
      'Humans were not meant to do repetitive tasks. That is industrial-era thinking. You are not a machine. You are consciousness with creativity, emotion, and purpose. Let AI handle repetition so you can focus on meaning.',
    extraSections: [
      {
        title: 'Email Management',
        items: [
          'Use AI to draft replies, summarize long emails, or organize your inbox.'
        ]
      },
      {
        title: 'Content Creation Pipeline',
        items: [
          'Idea generation: AI helps brainstorm.',
          'First draft: AI writes the initial version.',
          'Refinement: You add your voice.',
          'Formatting: AI structures it.'
        ]
      },
      {
        title: 'Research and Learning',
        items: [
          'Ask AI to summarize articles, papers, or books.',
          'Create study guides or flashcards from complex material.',
          'Get explanations in simpler terms.'
        ]
      },
      {
        title: 'Daily Workflows',
        items: [
          'Meeting notes: AI transcribes and summarizes.',
          'Task prioritization: AI helps organize your to-do list.',
          'Scheduling: AI suggests optimal time blocks.'
        ]
      }
    ],
    project:
      'Identify one repetitive task in your daily life. Build an AI workflow to handle it. Measure the time saved weekly.',
    awareness:
      'With extra time, what will you do? If the answer is "scroll more" or "work more," you are still trapped in productivity thinking. True freedom is using time for presence, connection, creativity, rest, love.'
  },
  {
    id: 7,
    emoji: '👥',
    title: 'Contributing and Growing (Becoming Part of the Intelligence Economy)',
    coreLesson:
      'The Intelligence Economy rewards those who create value and build reputation. You are now capable of both.',
    deeperTruth:
      'You came here thinking you needed to catch up to AI. But here is what is true: You do not need AI. AI needs you. Without human direction, creativity, and love, AI is just computation. You are the meaning-maker.',
    reflection: [
      'When you love what you are doing, not forcing yourself but genuinely enjoying the process, you contribute naturally. Not because you "should," but because creation is an expression of love.',
      'When you love yourself, you stop seeing yourself as just a body that needs to succeed. You see yourself as consciousness exploring, learning, and contributing.'
    ],
    extraSections: [
      {
        title: 'Build in Public',
        items: [
          'Share one project you built with AI (blog post, tool, artwork, workflow).',
          'Explain your process; transparency builds trust.',
          'Help others who are where you were at Step 1.'
        ]
      },
      {
        title: 'Contribute to Open Source',
        items: [
          'Find an open-source AI project you care about.',
          'Contribute documentation, ideas, or testing (coding optional).'
        ]
      },
      {
        title: 'Create Educational Content',
        items: [
          'Teach what you have learned to someone else.',
          'Make a tutorial, write a guide, or record a video.',
          'Teaching solidifies your own understanding.'
        ]
      },
      {
        title: 'Join Communities',
        items: [
          'AI Discord servers, Reddit communities, GitHub discussions.',
          'Do not just consume; engage, ask questions, share insights.'
        ]
      },
      {
        title: 'Start Your Own Project',
        items: [
          'Use AI to build something that solves a real problem (yours or others).',
          'It does not need to be revolutionary; useful is enough.',
          'Share it freely, build reputation, iterate based on feedback.'
        ]
      }
    ],
    awareness:
      'You have now completed the technical journey. But the real journey is internal. Do you still see yourself as separate from intelligence? Or do you understand that you are intelligence, learning to use new tools? The separation you felt between you and AI, you and technology, you and others was never real. It was the mind creating divisions. When you love yourself, fully and without condition, you realize: learning is not hard. Resistance is hard. And resistance comes from fear, not truth. You have the potential not because you are special, but because everyone is special. Intelligence is universal. Love is universal. You are just remembering what was always there.'
  }
]

const stepThemes: StepTheme[] = [
  {
    frame: 'from-cyan-400/70 via-blue-400/35 to-transparent',
    panelFrame: 'from-cyan-400/45 via-blue-400/20 to-transparent',
    text: 'text-cyan-200',
    bullet: 'bg-cyan-300/80',
    chip: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100',
    shadow: 'shadow-[0_0_60px_rgba(34,211,238,0.15)]',
    action: 'border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/10'
  },
  {
    frame: 'from-purple-400/70 via-fuchsia-400/35 to-transparent',
    panelFrame: 'from-purple-400/45 via-fuchsia-400/20 to-transparent',
    text: 'text-purple-200',
    bullet: 'bg-purple-300/80',
    chip: 'border-purple-400/40 bg-purple-500/10 text-purple-100',
    shadow: 'shadow-[0_0_60px_rgba(192,132,252,0.15)]',
    action: 'border-purple-400/40 text-purple-100 hover:bg-purple-500/10'
  },
  {
    frame: 'from-emerald-400/70 via-cyan-400/35 to-transparent',
    panelFrame: 'from-emerald-400/45 via-cyan-400/20 to-transparent',
    text: 'text-emerald-200',
    bullet: 'bg-emerald-300/80',
    chip: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
    shadow: 'shadow-[0_0_60px_rgba(16,185,129,0.15)]',
    action: 'border-emerald-400/40 text-emerald-100 hover:bg-emerald-500/10'
  },
  {
    frame: 'from-blue-400/70 via-indigo-400/35 to-transparent',
    panelFrame: 'from-blue-400/45 via-indigo-400/20 to-transparent',
    text: 'text-blue-200',
    bullet: 'bg-blue-300/80',
    chip: 'border-blue-400/40 bg-blue-500/10 text-blue-100',
    shadow: 'shadow-[0_0_60px_rgba(59,130,246,0.15)]',
    action: 'border-blue-400/40 text-blue-100 hover:bg-blue-500/10'
  },
  {
    frame: 'from-rose-400/70 via-orange-400/35 to-transparent',
    panelFrame: 'from-rose-400/45 via-orange-400/20 to-transparent',
    text: 'text-rose-200',
    bullet: 'bg-rose-300/80',
    chip: 'border-rose-400/40 bg-rose-500/10 text-rose-100',
    shadow: 'shadow-[0_0_60px_rgba(244,114,182,0.15)]',
    action: 'border-rose-400/40 text-rose-100 hover:bg-rose-500/10'
  },
  {
    frame: 'from-cyan-400/70 via-teal-400/35 to-transparent',
    panelFrame: 'from-cyan-400/45 via-teal-400/20 to-transparent',
    text: 'text-cyan-200',
    bullet: 'bg-cyan-300/80',
    chip: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100',
    shadow: 'shadow-[0_0_60px_rgba(34,211,238,0.15)]',
    action: 'border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/10'
  },
  {
    frame: 'from-violet-400/70 via-indigo-400/35 to-transparent',
    panelFrame: 'from-violet-400/45 via-indigo-400/20 to-transparent',
    text: 'text-violet-200',
    bullet: 'bg-violet-300/80',
    chip: 'border-violet-400/40 bg-violet-500/10 text-violet-100',
    shadow: 'shadow-[0_0_60px_rgba(139,92,246,0.15)]',
    action: 'border-violet-400/40 text-violet-100 hover:bg-violet-500/10'
  }
]

const getTheme = (index: number) => stepThemes[index] ?? stepThemes[0]

const BulletList = ({
  items,
  bulletClassName,
  textClassName
}: {
  items: string[]
  bulletClassName?: string
  textClassName?: string
}) => (
  <ul className="space-y-4">
    {items.map((item, index) => (
      <li
        key={`${item}-${index}`}
        className={`flex items-start gap-4 text-base leading-relaxed sm:text-lg ${textClassName ?? 'text-gray-200'}`}
      >
        <span
          className={`mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full ${bulletClassName ?? 'bg-cyan-300/80'}`}
        />
        <span className="flex-1">{item}</span>
      </li>
    ))}
  </ul>
)

const DecoratedPanel = ({
  title,
  theme,
  children,
  className
}: {
  title: string
  theme: StepTheme
  children: React.ReactNode
  className?: string
}) => (
  <div className={`rounded-3xl bg-gradient-to-br ${theme.panelFrame} p-[1px]`}>
    <div className={`rounded-3xl bg-black/70 p-6 sm:p-7 lg:p-8 ${className ?? ''}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.text}`}>{title}</p>
      <div className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">{children}</div>
    </div>
  </div>
)

export function AIBeginnersGuide() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll<HTMLElement>(0.12)
  const [selectedStep, setSelectedStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const progress = Math.round((completedSteps.size / steps.length) * 100)
  const currentStep = steps[selectedStep]
  const theme = getTheme(selectedStep)
  const isLastStep = selectedStep === steps.length - 1
  const isCurrentCompleted = completedSteps.has(selectedStep)

  const markAsComplete = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const handleNext = () => {
    markAsComplete(selectedStep)
    setSelectedStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setSelectedStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section ref={sectionRef} id="guide" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-black to-emerald-950/10" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
        <div
          data-section-start
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 px-4 py-2">
            <GraduationCap className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium text-blue-200">Practical AI Learning</span>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI for Complete Beginners
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-Step Guide
            </span>
          </h2>

          <div className="mx-auto mt-6 max-w-4xl space-y-4 text-lg leading-relaxed text-gray-300 sm:text-xl">
            <p>
              No computer science degree required. This practical guide focuses on what you can build today with AI.
              Every step uses free tools and real-world projects.
            </p>
            <p>
              But more importantly: this guide teaches you to learn with love for yourself, not force. When you love
              the process of learning not because you should but because you are genuinely curious, everything becomes
              easier. You are not a body struggling with technology. You are consciousness exploring new tools.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                Your Progress
              </span>
              <span>{progress}% Complete</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-emerald-500/20 opacity-60 blur-md" />
              <div
                className="relative h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index)
              const isSelected = selectedStep === index
              const stepTheme = getTheme(index)

              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(index)}
                  style={{ transitionDelay: `${index * 60}ms` }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                    : isSelected
                      ? `${stepTheme.chip} ${stepTheme.shadow}`
                      : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${stepTheme.frame} opacity-0 transition-opacity duration-300 ${
                      isSelected ? 'opacity-30' : 'group-hover:opacity-15'
                    }`}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{step.emoji}</span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                          Step {step.id}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-snug text-white/90">
                          {step.title}
                        </p>
                      </div>
                    </div>
                    {isCompleted && <CheckCircle className="mt-1 h-4 w-4 text-emerald-300" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className={`rounded-[36px] bg-gradient-to-br ${theme.frame} p-[1.5px]`}>
              <article
                key={selectedStep}
                className={`guide-swap relative overflow-hidden rounded-[34px] bg-[#05070c]/95 p-8 sm:p-10 lg:p-12 ${theme.shadow}`}
              >
                <div
                  className={`pointer-events-none absolute -right-24 top-[-60px] h-56 w-56 rounded-full bg-gradient-to-br ${theme.frame} opacity-35 blur-3xl`}
                />
                <div
                  className={`pointer-events-none absolute bottom-[-80px] left-[-40px] h-52 w-52 rounded-full bg-gradient-to-tr ${theme.frame} opacity-20 blur-3xl`}
                />
                <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.frame} text-2xl`}
                  >
                    {currentStep.emoji}
                  </div>
                  <div className="space-y-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${theme.chip}`}
                    >
                      Step {currentStep.id}
                    </span>
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">{currentStep.title}</h3>
                  </div>
                </header>

              <div className="mt-8 space-y-6">
                <DecoratedPanel title="Core Lesson" theme={theme}>
                  <p>{currentStep.coreLesson}</p>
                </DecoratedPanel>
                <DecoratedPanel title="Deeper Truth" theme={theme}>
                  <p>{currentStep.deeperTruth}</p>
                </DecoratedPanel>
              </div>

              {currentStep.whatYouDo && (
                <div className="mt-8">
                  <DecoratedPanel title="What You Will Do" theme={theme}>
                    <BulletList items={currentStep.whatYouDo} bulletClassName={theme.bullet} />
                  </DecoratedPanel>
                </div>
              )}

              {currentStep.extraSections && (
                <div className="mt-8 space-y-6">
                  {currentStep.extraSections.map((section) => (
                    <DecoratedPanel key={section.title} title={section.title} theme={theme}>
                      <BulletList items={section.items} bulletClassName={theme.bullet} />
                    </DecoratedPanel>
                  ))}
                </div>
              )}

              {currentStep.project && (
                <div className="mt-8">
                  <DecoratedPanel title="Project" theme={theme}>
                    <p>{currentStep.project}</p>
                  </DecoratedPanel>
                </div>
              )}

              {currentStep.reflection && (
                <div className="mt-8">
                  <DecoratedPanel title="Reflection" theme={theme}>
                    <div className="space-y-4">
                      {currentStep.reflection.map((paragraph, index) => (
                        <p key={`${currentStep.id}-reflection-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </DecoratedPanel>
                </div>
              )}

              <div className="mt-8">
                <DecoratedPanel title="Awareness Practice" theme={theme}>
                  <p>{currentStep.awareness}</p>
                </DecoratedPanel>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => markAsComplete(selectedStep)}
                  disabled={isCurrentCompleted}
                  className={`flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-opacity ${
                    isCurrentCompleted
                      ? 'cursor-default border border-emerald-500/30 bg-emerald-500/20 text-emerald-200'
                      : 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:opacity-90'
                  }`}
                >
                  {isCurrentCompleted && <CheckCircle className="h-5 w-5" />}
                  {isCurrentCompleted ? 'Step Completed' : 'Mark Step Done'}
                </button>

                {!isLastStep && (
                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold transition-colors ${theme.action}`}
                  >
                    Complete and Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-gray-400">
                <button
                  onClick={handlePrevious}
                  disabled={selectedStep === 0}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                    selectedStep === 0 ? 'cursor-not-allowed text-gray-600' : 'hover:text-white'
                  }`}
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Previous Step
                </button>
                <button
                  onClick={() => setSelectedStep(Math.min(selectedStep + 1, steps.length - 1))}
                  disabled={isLastStep}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                    isLastStep ? 'cursor-not-allowed text-gray-600' : 'hover:text-white'
                  }`}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {completedSteps.size === steps.length && (
        <section
          className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-8 text-gray-200 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="pointer-events-none absolute -right-16 top-[-40px] h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-14 bottom-[-50px] h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-white">Completion: You Are Not Done, You Are Just Beginning</h3>
            <p className="mt-4">If you have made it here, you understand:</p>
            <div className="mt-4">
              <BulletList
                items={[
                  'Technically: How to use AI tools, create content, build projects, automate workflows.',
                  'Strategically: How the Intelligence Economy works and where you fit.',
                  'Philosophically: That the barrier was never the technology; it was the belief you could not do it.'
                ]}
              />
            </div>
            <p className="mt-6">
              Final truth: Some people will force themselves through this guide and feel exhausted. Others will love
              the process and feel energized. The difference is not capability; it is relationship with self. When you
              love yourself, learning is not hard. Creating is not hard. Contributing is not hard. It is just what
              consciousness does when it is free to explore.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Next Steps</p>
              <div className="mt-4">
                <BulletList
                  items={[
                    'Build one real project using AI.',
                    'Share it publicly (blog, GitHub, social media).',
                    'Help one other person learn AI.',
                    'Continue exploring; you now have the foundation.'
                  ]}
                />
              </div>
            </div>

            <p className="mt-6">
              And most importantly: remember that you are not a body trying to keep up with technology. You are
              awareness using a body as a vehicle to explore, create, and contribute. Technology changes. Your essence
              does not.
            </p>
            <p className="mt-4">
              Welcome to the Intelligence Economy. Not because you forced yourself here, but because you loved yourself
              enough to try.
            </p>
          </div>
        </section>
      )}
      </div>
    </section>
  )
}
