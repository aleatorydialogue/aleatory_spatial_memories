# Security and privacy context

## Status and scope

This is a product and engineering baseline, not a complete policy or legal opinion. Before collecting customer applications or capture material, translate it into implemented controls, contracts, public notices, and jurisdiction-appropriate review.

Reality captures can reveal identity, likeness, voice, children, homes, possessions, relationships, location, and other intimate context. Treat leads as confidential and capture media as highly sensitive by default.

## Required principles

- Collect the minimum data necessary for the current purpose.
- Explain collection, purpose, recipients, retention, and choices in plain language.
- Separate service participation consent from optional marketing and publication permission.
- Do not assume one participant can consent for every visible or audible person.
- Obtain guardian authorization and apply stricter publication controls for minors.
- Use private access by default for customer deliverables.
- Encrypt data in transit and at rest using reputable managed services.
- Restrict access by role and review it periodically.
- Define deletion, backup expiry, incident response, and provider exit procedures.
- Never place customer captures, application exports, secrets, or signed releases in Git.

## Data lifecycle to define before launch

For each class—lead details, scheduling data, source imagery, audio, working reconstruction, final deliverable, analytics, consent record, and published example—document:

1. Purpose and legal/consent basis
2. Fields or media collected
3. Collection method
4. Systems and subprocessors involved
5. Who can access it
6. Retention and backup period
7. Deletion and export process
8. Publication status
9. Incident and recovery procedure

Raw source data, working files, delivered outputs, and marketing copies may need different rules.

## Intake baseline

The first interest form should avoid uploads and ask only for enough information to assess fit and reply. It should include the program's experimental status, a privacy notice, required contact consent, optional and unbundled marketing consent, spam protection, server-side validation, rate limiting, and a recorded policy/version context.

Do not send sensitive form contents broadly through chat or email notifications. Notifications should contain minimal detail and direct an authorized person to the protected source record.

For the Founding Captures v0, the founder has accepted email as the temporary application record. The Cloudflare Worker does not intentionally persist a separate copy; Resend processes the outbound message and delivers it to the founder's Gmail address. Resend's current free plan documents 30-day data retention. Applicants are warned not to submit sensitive or third-party identifying information. This exception should be revisited before the form expands, multiple operators need access, or capture media can be uploaded.

## Publication and build in public

Participation in a capture must not require appearing in promotional material unless that is an explicit, prominent condition of a particular program. Permission should separately address names, likenesses, testimonials, final captures, raw or behind-the-scenes footage, Holding the String content, channels, duration, territory, revocation terms, and use involving minors.

## Decisions required

- Service geography and applicable privacy law
- Data controller/processor roles and approved vendors
- Retention periods and whether archival storage is sold
- Customer ownership and licenses
- Rights of bystanders and group participants
- Authentication and sharing model for private deliveries
- Deletion, withdrawal, recapture, and incident policies
- Whether third-party AI systems receive customer media and on what terms
