import { Resend } from 'resend'
import type { Config } from '@netlify/functions'

const resend = new Resend(process.env.RESEND_API_KEY)
const clean = (s: unknown) =>
    String(s ?? '')
        .replace(/[\r\n]+/g, ' ')
        .trim()

const fail = (code: string, status: number, fields?: Record<string, string>) =>
    Response.json({ ok: false, code, fields }, { status })

export default async (req: Request) => {
    if (req.method !== 'POST') return fail('bad_request', 405)

    let data: Record<string, unknown>
    try {
        data = await req.json()
    } catch {
        return fail('bad_request', 405)
    }

    // honeypot: pretend success so bots learn nothing
    if (data.botField) return Response.json({ ok: true })

    const name = clean(data.name)
    const email = clean(data.email)
    const message = String(data.message ?? '').trim()

    const fields: Record<string, string> = {}
    if (!name) fields.name = 'required'
    if (!email) fields.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'invalid'
    if (!message) fields.message = 'required'
    else if (message.length > 5000) fields.message = 'too_long'

    if (Object.keys(fields).length) return fail('invalid_input', 400, fields)

    const { error } = await resend.emails.send({
        from: process.env.MAIL_FROM!,
        to: process.env.MAIL_TO!,
        replyTo: email,
        subject: `New message from the website form.`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    })

    if (error) {
        console.error('Resend error:', error)
        return error.statusCode === 429 ? fail('rate_limited', 429) : fail('send_failed', 502)
    }

    return Response.json({ ok: true })
}

export const config: Config = { path: '/api/contact' }
