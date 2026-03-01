import nodemailer from 'nodemailer';
import { z } from 'zod';
import { verifyToken } from './challenge';

type ApiHeaders = Record<string, string | string[] | undefined>;

type ApiRequest = {
  method?: string;
  headers: ApiHeaders;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string | string[]) => void;
  json: (body: unknown) => void;
};

// ── Constants ────────────────────────────────────────────────────────────

// Aligned with client-side maxLength=5000 on textarea fields.
const MAX_MESSAGE_LENGTH = 5000;

// Reject payloads larger than 50 KB (well above any legitimate form submission).
const MAX_BODY_BYTES = 50 * 1024;

// ── Schema ───────────────────────────────────────────────────────────────

const FeedbackSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
  website: z.string().trim().optional().default(''),    // honeypot
  _challenge: z.string().trim().min(1),                  // challenge token
});

// ── Helpers ──────────────────────────────────────────────────────────────

function getHeader(headers: ApiHeaders, name: string): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function parseBody(body: unknown): unknown {
  if (typeof body !== 'string') return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

/**
 * Privacy-friendly origin check.
 * Allows:
 *   - Production domain (aishortcuttools.com variants)
 *   - Vercel preview deployments (*.vercel.app)
 *   - localhost for development
 * Does NOT log or store the origin.
 */
function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1') return true;
    if (host === 'aishortcuttools.com' || host.endsWith('.aishortcuttools.com')) return true;
    if (host.endsWith('.vercel.app')) return true;
    return false;
  } catch {
    return false;
  }
}

// ── Rate limiter (in-memory, per warm instance) ──────────────────────────

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function evictExpired() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now >= entry.resetAt) rateLimitMap.delete(key);
  }
}

// ── Handler ──────────────────────────────────────────────────────────────

export default async function handler(req: ApiRequest, res: ApiResponse) {
  // 1. Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // 2. Content-Type check
  const contentType = getHeader(req.headers, 'content-type')?.split(';')[0]?.trim().toLowerCase();
  if (contentType !== 'application/json') {
    return res.status(415).json({ error: 'Content-Type must be application/json.' });
  }

  // 3. Body-size check
  const contentLength = getHeader(req.headers, 'content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request too large.' });
  }

  // 4. Origin check
  const origin = getHeader(req.headers, 'origin');
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  // 5. Parse body
  const raw = parseBody(req.body);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  // 6. Validate schema
  const parsed = FeedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  const { name, email, message, website, _challenge } = parsed.data;

  // 7. Honeypot check
  if (website) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  // 8. Challenge token verification
  const secret = process.env.BOT_CHALLENGE_SECRET;
  if (!secret || !verifyToken(_challenge, secret)) {
    return res.status(403).json({ error: 'Challenge verification failed.' });
  }

  // 9. Rate limiting
  evictExpired();
  if (isRateLimited(email)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // 10. SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPass ||
    !toEmail ||
    !Number.isFinite(smtpPort) ||
    smtpPort <= 0
  ) {
    return res.status(500).json({ error: 'Service unavailable.' });
  }

  // 11. Send email
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      replyTo: email,
      subject: `New feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to send feedback.' });
  }
}
