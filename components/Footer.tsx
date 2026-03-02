import React, { useState } from 'react'
import { useRevealOnScroll } from '../src/hooks/useRevealOnScroll'

type Status = 'idle' | 'loading' | 'ok' | 'error'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ayuda-chaos',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/ayuda_chaos',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/aishortcut_tools',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/184SerNnxh/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    url: 'https://t.me/+EcVIF9ZoHqUyN2Nh',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
]

export function Footer({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactHoneypot, setContactHoneypot] = useState('')
  const [feedbackName, setFeedbackName] = useState('')
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackHoneypot, setFeedbackHoneypot] = useState('')
  const [feedbackError, setFeedbackError] = useState('')
  const [contactError, setContactError] = useState('')
  const [contactStatus, setContactStatus] = useState<Status>('idle')
  const [feedbackStatus, setFeedbackStatus] = useState<Status>('idle')
  const { ref: sectionRef, isVisible } = useRevealOnScroll<HTMLElement>()

  const submitToApi = async (body: Record<string, unknown>): Promise<{ success: boolean; error?: string }> => {
    // Fetch a short-lived challenge token before submitting
    const challengeRes = await fetch('/api/challenge')
    if (!challengeRes.ok) {
      throw new Error('Unable to verify request. Please refresh and try again.')
    }
    const { token } = (await challengeRes.json()) as { token: string }

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, _challenge: token }),
    })
    const data = (await res.json()) as { success?: boolean; error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Something went wrong. Please try again.')
    }
    return { success: true }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = contactName.trim()
    const trimmedEmail = contactEmail.trim()
    const trimmedMessage = contactMessage.trim()
    const trimmedSubject = contactSubject.trim()

    if (!trimmedName) {
      setContactError('Please enter your name.')
      setContactStatus('error')
      return
    }
    if (trimmedEmail && !trimmedEmail.includes('@')) {
      setContactError('Please enter a valid email address.')
      setContactStatus('error')
      return
    }
    if (!trimmedMessage) {
      setContactError('Please enter a message.')
      setContactStatus('error')
      return
    }

    setContactStatus('loading')
    setContactError('')
    try {
      await submitToApi({
        name: trimmedName,
        email: trimmedEmail || 'anonymous@noreply.local',
        message: trimmedSubject ? `Subject: ${trimmedSubject}\n\n${trimmedMessage}` : trimmedMessage,
        website: contactHoneypot,
      })
      setContactStatus('ok')
      setContactName('')
      setContactEmail('')
      setContactSubject('')
      setContactMessage('')
      setContactHoneypot('')
    } catch (err: unknown) {
      setContactError(err instanceof Error ? err.message : 'Failed to send. Please try again or email contact@aishortcuttools.com directly.')
      setContactStatus('error')
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = feedbackName.trim()
    const trimmedEmail = feedbackEmail.trim()
    const trimmedMessage = feedbackMessage.trim()

    if (!trimmedName) {
      setFeedbackStatus('error')
      setFeedbackError('Please enter your name.')
      return
    }
    if (trimmedEmail && !trimmedEmail.includes('@')) {
      setFeedbackStatus('error')
      setFeedbackError('Please enter a valid email address.')
      return
    }
    if (!trimmedMessage) {
      setFeedbackStatus('error')
      setFeedbackError('Please add a message and try again.')
      return
    }

    setFeedbackStatus('loading')
    setFeedbackError('')
    try {
      await submitToApi({
        name: trimmedName,
        email: trimmedEmail || 'anonymous@noreply.local',
        message: trimmedMessage,
        website: feedbackHoneypot,
      })
      setFeedbackStatus('ok')
      setFeedbackName('')
      setFeedbackEmail('')
      setFeedbackMessage('')
      setFeedbackHoneypot('')
    } catch (err: unknown) {
      setFeedbackStatus('error')
      setFeedbackError(err instanceof Error ? err.message : 'Failed to send feedback. Please try again.')
    }
  }

  return (
    <footer ref={sectionRef} id="community" className="relative overflow-hidden px-6 py-4 text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div id="footer-resources" className="absolute -top-8 h-2 w-2" aria-hidden />
      <div data-section-start className="relative mx-auto max-w-6xl space-y-3">
        <div
          className={`grid gap-3 lg:gap-4 lg:grid-cols-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          {/* Column 1: About + Feedback */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
            <div>
              <div className="text-xl font-semibold text-white mb-2">About Me</div>
              <p className="text-sm text-gray-400">
                I am Aayush Timalsina. Passionate about building and writing about freedom and decentralized AI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://aayushtimalsina.blogspot.com/?m=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-sm text-white hover:opacity-90 transition-opacity"
              >
                About Me / Blog
              </a>
              <button
                onClick={() => scrollToSection('tools')}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm text-white hover:bg-white/15 transition-colors"
              >
                View AI Tools
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/15 transition-colors"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Submit Feedback</div>
              <p className="text-xs text-gray-400">Share your thoughts, suggestions, or report bugs.</p>
              {feedbackStatus === 'ok' ? (
                <div className="text-center py-4 space-y-3">
                  <div className="text-emerald-400 font-semibold text-base">Thank You for your contribution!</div>
                  <p className="text-sm text-gray-300">
                    If you want to personally contact, email me here:
                  </p>
                  <a
                    href="mailto:contact@aishortcuttools.com"
                    className="inline-block text-cyan-400 hover:text-cyan-300 underline text-sm font-medium transition-colors"
                  >
                    contact@aishortcuttools.com
                  </a>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleFeedbackSubmit}>
                  {/* Honeypot - hidden from real users */}
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    value={feedbackHoneypot}
                    onChange={(e) => setFeedbackHoneypot(e.target.value)}
                    className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                  />
                  <input
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="Your name"
                    type="text"
                    required
                    maxLength={100}
                    aria-label="Your name"
                  />
                  <input
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="Your email (optional)"
                    type="text"
                    maxLength={254}
                    aria-label="Your email (optional)"
                  />
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    className="w-full h-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
                    placeholder="Share feedback or issues..."
                    required
                    maxLength={5000}
                    aria-label="Your feedback message"
                  />
                  <button
                    type="submit"
                    disabled={feedbackStatus === 'loading'}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 border border-emerald-400/40 text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {feedbackStatus === 'loading' ? 'Sending...' : 'Send Feedback'}
                  </button>
                  {feedbackStatus === 'error' && (
                    <div className="text-xs text-red-400">{feedbackError || 'Please add a message and try again.'}</div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-xl font-semibold text-white mb-3">Contact Me</h4>
            <p className="text-sm text-gray-400 mb-4">
              Have a question, suggestion, or want to collaborate? Send me a message directly.
            </p>
            {contactStatus === 'ok' ? (
              <div className="text-center py-6 space-y-3">
                <div className="text-emerald-400 font-semibold text-lg">Message Sent!</div>
                <p className="text-sm text-gray-300">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <p className="text-xs text-gray-400">
                  You can also email directly at{' '}
                  <a
                    href="mailto:contact@aishortcuttools.com"
                    className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                  >
                    contact@aishortcuttools.com
                  </a>
                </p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleContactSubmit}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={contactHoneypot}
                  onChange={(e) => setContactHoneypot(e.target.value)}
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Your name"
                  type="text"
                  required
                  maxLength={100}
                  aria-label="Your name"
                />
                <input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Your email (optional)"
                  type="text"
                  maxLength={254}
                  aria-label="Your email (optional)"
                />
                <input
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Subject / Tool name (optional)"
                  type="text"
                  maxLength={200}
                  aria-label="Subject or tool name"
                />
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full h-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
                  placeholder="Your message..."
                  required
                  maxLength={5000}
                  aria-label="Your message"
                />
                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/40 text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {contactStatus === 'error' && (
                  <div className="text-xs text-red-400">{contactError}</div>
                )}
              </form>
            )}
          </div>

          {/* Column 3: Support */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
            <h4 className="text-xl font-semibold text-white">Support the Mission</h4>
            <p className="text-sm text-gray-400">
              If this helps you, you can support with ETH to <span className="text-white font-semibold">aifreedom.eth</span>.
            </p>
            <a
              href="https://app.ens.domains/name/aifreedom.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/15 transition-colors"
            >
              Open ENS Profile
            </a>
            <div className="text-sm text-gray-400">
              Freedom tech is for everyone support blockchain + AI, owned by the people.
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl border border-purple-500/20 bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-6 sm:p-8 shadow-2xl shadow-purple-500/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <p className="text-lg text-gray-200 italic text-center">
            &quot;The AI revolution should be accessible to everyone, everywhere. We believe in a future where innovation is
            free, open, and decentralized.&quot;
          </p>
          <div className="mt-4 text-center text-sm text-purple-300">— The AI &amp; Blockchain Revolution</div>
        </div>

        <div
          className={`text-center text-sm text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          Made with love for BTC and blockchain.
        </div>
      </div>
    </footer>
  )
}
