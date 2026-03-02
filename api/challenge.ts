import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, randomBytes } from 'crypto';

const TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getSecret(): string | null {
    return process.env.BOT_CHALLENGE_SECRET || null;
}

export function createToken(secret: string): { token: string; expires: number } {
    const nonce = randomBytes(16).toString('hex');
    const expires = Date.now() + TOKEN_TTL_MS;
    const data = `${nonce}.${expires}`;
    const sig = createHmac('sha256', secret).update(data).digest('hex');
    return { token: `${data}.${sig}`, expires };
}

export function verifyToken(token: string, secret: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [nonce, expiresStr, sig] = parts;
    const expires = Number(expiresStr);
    if (!Number.isFinite(expires) || Date.now() > expires) return false;

    const expected = createHmac('sha256', secret)
        .update(`${nonce}.${expiresStr}`)
        .digest('hex');

    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) {
        diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const secret = getSecret();
    if (!secret) {
        return res.status(500).json({ error: 'Service unavailable.' });
    }

    const { token, expires } = createToken(secret);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.status(200).json({ token, expires });
}
