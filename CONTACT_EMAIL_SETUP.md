# Wildcrown Games contact email setup

The contact form sends a server-side email through Resend to the studio inbox configured in the server function. It never opens the visitor's email application. The visitor's name, email address, enquiry category, and complete message are included in the plain-text email, and Reply-To is set to the visitor's address. The form reports success only after Resend returns an accepted email ID.

## Resend account and sender domain

1. Create or use a Resend account owned by Wildcrown Games.
2. In Resend, add a sending domain. Resend requires at least one verified domain before sending to arbitrary recipients. A dedicated subdomain such as `mail.wildcrown.games` is recommended to isolate transactional sending reputation. The sender example below uses that domain; verify it or change `RESEND_FROM_EMAIL` to an address on the domain you actually verify.
3. Add the DNS records Resend shows for that domain at the provider that manages `wildcrown.games`. Resend supplies the exact DKIM and SPF/return-path records; their values are specific to your account. Wait until the domain is marked verified in Resend. Do not replace existing email-provider MX or SPF records blindly; resolve any conflicts with the DNS/email administrator first.
4. Create a dedicated API key with **Sending access**, restricted to the verified sender domain if Resend offers that option for the key.

You do not need to create an inbox for the sender address solely to send messages. Replies go to the visitor through the message's Reply-To header. The destination inbox is fixed to `aashuprajapati537@gmail.com` in server code.

## Environment variables

Configure these as server-side variables in the Vercel project `wildcrown-games-website`:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The Resend sending-only API key |
| `RESEND_FROM_EMAIL` | A sender on the verified domain, for example `Wildcrown Games <contact@mail.wildcrown.games>` |

Add them to Preview and Production environments (and Development if desired). For local development, put them in the ignored `.env.local` file. The API key must never use a `VITE_` prefix, appear in client code, or be committed to Git. `.env.example` contains placeholders only.

## Local and production behavior

- The form uses a same-origin TanStack Start server function. The existing CSRF middleware checks the origin, and the server validates the fields again before sending.
- A hidden honeypot and a best-effort per-process limit of five submissions per IP per ten minutes reduce automated abuse. Serverless instances may have separate counters; this is not a globally shared rate limiter.
- If Resend is unconfigured or rejects the request, the visitor sees an error and can retry. The server does not log submitted names, email addresses, or message text.
- No website deployment or Git push is performed as part of this setup.

Resend setup references: [verified domains](https://resend.com/docs/dashboard/domains/introduction), [API key management](https://resend.com/docs/dashboard/api-keys/introduction), and [send email API](https://resend.com/docs/api-reference/emails/send-email).
