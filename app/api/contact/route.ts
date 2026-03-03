import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL as string;

/* ─── Rate limiter (in-memory, per IP) ───────────────────────────── */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3;               // max 3 submissions per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) return true;

    entry.count++;
    return false;
}

/* ─── Validation helpers ─────────────────────────────────────────── */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Common disposable/throwaway email domains
const BLOCKED_DOMAINS = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
    'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
    'trashmail.com', 'spam4.me', 'maildrop.cc', 'dispostable.com',
];

// Obvious spam-trigger phrases
const SPAM_KEYWORDS = [
    'casino', 'crypto', 'bitcoin', 'investment opportunity', 'make money',
    'click here', 'free money', 'earn $', 'wire transfer', 'western union',
    'buy now', 'limited offer', 'act now', 'congratulations you',
];

function containsSpam(text: string): boolean {
    const lower = text.toLowerCase();
    return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

function isBlockedEmail(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    return BLOCKED_DOMAINS.includes(domain);
}

/* ─── POST handler ───────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
    try {
        /* Guard — fail fast if env var is missing */
        if (!DISCORD_WEBHOOK_URL) {
            console.error('DISCORD_WEBHOOK_URL is not set');
            return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
        }

        /* Rate limiting */
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            req.headers.get('x-real-ip') ??
            'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many submissions. Please wait 15 minutes before trying again.' },
                { status: 429 },
            );
        }

        const body = await req.json();
        const { name, email, projectType, message, honeypot } = body;

        /* ── Honeypot check (bots fill hidden fields) ── */
        if (honeypot && honeypot.trim() !== '') {
            // Silently accept so bots don't know they were caught
            return NextResponse.json({ success: true }, { status: 200 });
        }

        /* ── Field presence ── */
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
        }

        /* ── Name validation ── */
        const trimmedName = String(name).trim();
        if (trimmedName.length < 2 || trimmedName.length > 80) {
            return NextResponse.json(
                { error: 'Name must be between 2 and 80 characters.' },
                { status: 400 },
            );
        }
        // No numbers / special chars (basic name check)
        if (/[<>{}/\\]/.test(trimmedName)) {
            return NextResponse.json({ error: 'Name contains invalid characters.' }, { status: 400 });
        }

        /* ── Email validation ── */
        const trimmedEmail = String(email).trim().toLowerCase();
        if (!EMAIL_REGEX.test(trimmedEmail)) {
            return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
        }
        if (isBlockedEmail(trimmedEmail)) {
            return NextResponse.json(
                { error: 'Disposable email addresses are not allowed.' },
                { status: 400 },
            );
        }

        /* ── Message validation ── */
        const trimmedMessage = String(message).trim();
        if (trimmedMessage.length < 10) {
            return NextResponse.json(
                { error: 'Message is too short. Please write at least 10 characters.' },
                { status: 400 },
            );
        }
        if (trimmedMessage.length > 2000) {
            return NextResponse.json(
                { error: 'Message is too long. Please keep it under 2000 characters.' },
                { status: 400 },
            );
        }

        /* ── Spam keyword check ── */
        if (containsSpam(trimmedName) || containsSpam(trimmedMessage)) {
            return NextResponse.json(
                { error: 'Your message was flagged as spam. Please revise and try again.' },
                { status: 400 },
            );
        }

        /* ── Project type (optional, sanitise) ── */
        const trimmedType = String(projectType ?? '').trim().slice(0, 100);

        /* ── Send to Discord ── */
        const discordPayload = {
            username: 'Portfolio Contact Form',
            avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
            embeds: [
                {
                    title: '📬 New Contact Form Submission',
                    color: 0xc8ff00,
                    fields: [
                        { name: '👤 Name', value: trimmedName, inline: true },
                        { name: '📧 Email', value: trimmedEmail, inline: true },
                        { name: '🏗️ Project Type', value: trimmedType || '_Not specified_', inline: false },
                        { name: '💬 Message', value: trimmedMessage, inline: false },
                        { name: '🌐 IP', value: ip, inline: true },
                    ],
                    footer: { text: 'om.dev — Portfolio Contact Form' },
                    timestamp: new Date().toISOString(),
                },
            ],
        };

        const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
        });

        if (!discordRes.ok) {
            console.error('Discord webhook error:', await discordRes.text());
            return NextResponse.json({ error: 'Failed to deliver message.' }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Contact API error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
