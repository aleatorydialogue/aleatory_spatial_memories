# 0002: GitHub Pages and Cloudflare application intake

- Status: Accepted
- Date: 2026-09-08
- Owners: Founder, lead development agent

## Context

The v0 site is static and has a low-volume application form. It does not need a database or CRM yet. The founder controls `rememberingpresence.com` through Cloudflare and wants new applications delivered to `aleatorydialogue@gmail.com` initially.

## Decision

Deploy the static Astro build to GitHub Pages at `https://rememberingpresence.com`. Submit applications to a narrow Cloudflare Worker at `https://forms.rememberingpresence.com/apply`.

The Worker validates input, checks the request origin, uses a honeypot and rate-limit binding, and sends one email through Resend's API. It retains no application database. Resend delivers to `aleatorydialogue@gmail.com` from `applications@send.rememberingpresence.com`; its API key is stored as a secret.

Deployment uses GitHub Actions. Site deployment runs on pushes to `main`; Worker deployment is manual until Cloudflare credentials and email-domain setup are complete.

## Consequences

- The public site remains entirely static and inexpensive to host.
- Application data passes through Cloudflare and Google but is not intentionally stored by the Worker.
- Email becomes the temporary system of record and must be managed accordingly.
- Resend processes and retains email data according to its service terms; its current free plan documents 30-day retention.
- Spam protection is intentionally modest; add Turnstile or stronger controls if abuse appears.
- A future CRM or changed recipient does not require rebuilding the public site architecture.

## Follow-up

- Complete the dashboard and DNS steps in `docs/technical/deployment.md`.
- Send and verify an end-to-end test application.
- Define an operational email-retention period.
- Revisit storage and applicant tracking after real application volume exists.
