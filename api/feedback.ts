const crypto2 = require('crypto');
const nodemailer2 = require('nodemailer');

function verifyToken(token: string, secret: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [nonce, expiresStr, sig] = parts;
    const expires = Number(expiresStr);
    if (!Number.isFinite(expires) || Date.now() > expires) return false;
    const expected = crypto2.createHmac('sha256', secret).update(`${nonce}.${expiresStr}`).digest('hex');
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) {
        diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
}

function isAllowedOrigin(origin: string | undefined): boolean {
    if (!origin) return false;
    try {
        const host = new URL(origin).hostname.toLowerCase();
        if (host === 'localhost' || host === '127.0.0.1') return true;
        if (host === 'aishortcuttools.com' || host.endsWith('.aishortcuttools.com')) return true;
        if (host.endsWith('.vercel.app')) return true;
        return false;
    } catch {
        return false;
    }
}

module.exports = async function handler(req: any, res: any) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed.' });
        }

        const contentType = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
        if (contentType !== 'application/json') {
            return res.status(415).json({ error: 'Content-Type must be application/json.' });
        }

        const origin = req.headers['origin'];
        if (!isAllowedOrigin(origin)) {
            return res.status(403).json({ error: 'Forbidden.' });
        }

        const body = req.body;
        if (!body || typeof body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body.' });
        }

        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        const message = typeof body.message === 'string' ? body.message.trim() : '';
        const website = typeof body.website === 'string' ? body.website.trim() : '';
        const challenge = typeof body._challenge === 'string' ? body._challenge.trim() : '';

        if (!name || (email && !email.includes('@')) || !message || message.length > 5000 || !challenge) {
            return res.status(400).json({ error: 'Invalid submission.' });
        }

        if (website) {
            return res.status(400).json({ error: 'Invalid submission.' });
        }

        const secret = process.env.BOT_CHALLENGE_SECRET;
        if (!secret || !verifyToken(challenge, secret)) {
            return res.status(403).json({ error: 'Challenge verification failed.' });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT);
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const toEmail = process.env.CONTACT_TO_EMAIL;

        if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !Number.isFinite(smtpPort)) {
            return res.status(500).json({ error: 'Email service not configured.' });
        }

        const transporter = nodemailer2.createTransport({
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
    } catch (err: any) {
        return res.status(500).json({ error: 'Failed to send.', message: err.message });
    }
};
