const crypto = require('crypto');

const TOKEN_TTL_MS = 5 * 60 * 1000;

module.exports = function handler(req: any, res: any) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed.' });
        }

        const secret = process.env.BOT_CHALLENGE_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Missing BOT_CHALLENGE_SECRET',
                available: Object.keys(process.env).filter((k: string) =>
                    k.startsWith('BOT') || k.startsWith('SMTP') || k.startsWith('CONTACT')
                ),
            });
        }

        const nonce = crypto.randomBytes(16).toString('hex');
        const expires = Date.now() + TOKEN_TTL_MS;
        const data = `${nonce}.${expires}`;
        const sig = crypto.createHmac('sha256', secret).update(data).digest('hex');

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ token: `${data}.${sig}`, expires });
    } catch (err: any) {
        return res.status(500).json({ error: 'crash', message: err.message, stack: err.stack });
    }
};
