import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { verifyToken } from './challenge';

const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_BYTES = 50 * 1024;

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Content-Type check
  const contentType = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return res.status(415).json({ error: 'Content-Type must be application/json.' });
  }

  // Body-size check
  const contentLength = req.headers['content-length'];
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request too large.' });
  }

  // Origin check
  const origin = req.headers['origin'] as string | undefined;
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  // Parse body
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  // Validate fields manually (no zod dependency issues)
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';
  const challenge = typeof body._challenge === 'string' ? body._challenge.trim() : '';

  if (!name || name.length > 100 || !email || !email.includes('@') || email.length > 254 ||
      !message || message.length > MAX_MESSAGE_LENGTH || !challenge) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  // Honeypot check
  if (website) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  // Challenge token verification
  const secret = process.env.BOT_CHALLENGE_SECRET;
  if (!secret || !verifyToken(challenge, secret)) {
    return res.status(403).json({ error: 'Challenge verification failed.' });
  }

  // Rate limiting
  evictExpired();
  if (isRateLimited(email)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !Number.isFinite(smtpPort) || smtpPort <= 0) {
    return res.status(500).json({ error: 'Service unavailable.' });
  }

  // Send email
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
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
