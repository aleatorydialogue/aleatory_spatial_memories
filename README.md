# Aleatory Spatial Memories

Aleatory Spatial Memories is a consumer-facing reality-capture project for preserving meaningful people, places, objects, and moments as explorable spatial memories.

The project is currently in its experimental v0 phase. The launch product line, **Remembering Presence**, is beginning with a small Founding Captures program in Connecticut. The website is an Astro-based, static-first experience with a configurable application form.

## Start here

- Read [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) for the authoritative vision.
- Read [`AGENTS.md`](AGENTS.md) before contributing or assigning agent work.
- Use [`docs/README.md`](docs/README.md) to find current product, brand, website, technical, and collaboration context.
- Consult [`docs/decisions/`](docs/decisions/) for accepted technical and product decisions.
- Store curated external source material according to [`references/README.md`](references/README.md).

## Development

```sh
npm install
npm run dev
```

Other useful checks:

```sh
npm run check
npm run format:check
npm run build
```

Copy `.env.example` to `.env` and set `PUBLIC_APPLICATION_FORM_ENDPOINT` to an approved HTTPS form endpoint before accepting applications. With no endpoint configured, the application is deliberately displayed in preview mode and cannot submit customer data.

The stack decision is recorded in ADR 0001. Hosting, intake storage, and notification vendors remain open pending privacy review.
