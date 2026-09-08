# 0001: Initial web stack

- Status: Accepted
- Date: 2026-09-06
- Owners: Founder, lead development agent

## Context

The first website is primarily a consumer narrative and lead-generation experience. It needs excellent baseline performance and accessibility while supporting selective, visually rich spatial demonstrations. The project is an experimental v0 and should not acquire the complexity of an application platform, customer portal, or CMS before those needs exist.

## Decision

Use Astro with strict TypeScript as the initial web framework. Render the core site statically. Use React islands only for interactions that materially benefit from React, and load any future Three.js or React Three Fiber spatial viewer as an isolated, on-demand enhancement with image and video fallbacks.

Keep initial editorial content in typed repository files using Astro content collections, Markdown/MDX, or structured data. Use CSS custom properties for design tokens and authored CSS by default. Tailwind may be adopted later through a separate explicit decision if rapid component styling warrants it.

Use Zod at input and integration boundaries. Plan for ESLint, Prettier, Vitest, and Playwright when the application is scaffolded. Target static hosting plus a narrow serverless intake boundary; select hosting, forms, analytics, storage, and notification vendors separately after their privacy and operational requirements are known.

## Consequences

- Core content can ship with little client-side JavaScript.
- Rich spatial media does not determine the architecture of every page.
- Content remains versioned and directly reviewable by people and agents.
- Interactive components may span Astro and React conventions.
- A later authenticated customer product may require a separate application or a reassessment of this stack.
- The initial scaffold is now authorized; vendor configuration remains a separate decision.

## Alternatives considered

- **Next.js:** capable and familiar, but its broader application and server-rendering model is unnecessary for the initial static-first site.
- **Plain static HTML:** minimal, but weaker for structured content, reusable components, and progressive spatial experiences as the site grows.
- **Full client-rendered React/Vite:** flexible, but imposes client JavaScript and routing complexity on a content-led site.
- **CMS at launch:** useful for nontechnical editorial workflows, but adds integration and governance cost before publishing cadence demonstrates a need.

## Follow-up

- Define real content and representative media before setting performance budgets.
- Decide deployment and intake providers after privacy review.
- Confirm the spatial viewer approach using an authentic sample capture.
- Scaffold only when implementation is explicitly authorized.
