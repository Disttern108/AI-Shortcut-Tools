import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed.' });
        }

        const secret = process.env.BOT_CHALLENGE_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Missing BOT_CHALLENGE_SECRET',
                envKeys: Object.keys(process.env).filter(k =>
                    k.startsWith('BOT') || k.startsWith('SMTP') || k.startsWith('CONTACT')
                ),
            });
        }

        // Simple token: timestamp.random.hmac
        const crypto = require('crypto');
        const nonce = crypto.randomBytes(16).toString('hex');
        const expires = Date.now() + 5 * 60 * 1000;
        const data = `${nonce}.${expires}`;
        const sig = crypto.createHmac('sha256', secret).update(data).digest('hex');
        const token = `${data}.${sig}`;

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ token, expires });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'Function error', message });
    }
}
