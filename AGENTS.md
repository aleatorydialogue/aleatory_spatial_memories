# Agent Guide

This repository contains Aleatory Spatial Memories, a consumer-facing reality-capture business under aleatory.ai.

## Read order

Before making changes, read these sources in order:

1. `PROJECT_BRIEF.md` — authoritative product vision and strategic constraints.
2. `docs/README.md` — documentation map and source-of-truth rules.
3. The context documents relevant to the task.
4. Applicable records in `docs/decisions/`.

If supporting documentation conflicts with `PROJECT_BRIEF.md`, follow the brief and flag the conflict. Do not silently reinterpret the brief.

## Current phase

The project is an experimental v0 moving from technical experimentation toward real customers. Favor learning, credibility, and a narrow Founding Captures offer over breadth. Do not present the Memory Dome, unproven deliverables, or future capture capabilities as currently available.

Until application scaffolding is explicitly requested, work is documentation and planning only.

## Product and language guardrails

- Sell the emotional value of preserving a meaningful place, person, object, or moment—not the reconstruction technique.
- Write for a nontechnical consumer. Technical explanations should be optional and subordinate.
- Keep the tone human, curious, artistic, slightly futuristic, and quietly premium.
- Avoid generic startup language, excessive futurism, sentimentality, and unexplained technical jargon.
- Never invent performance, quality, archival-longevity, compatibility, privacy, pricing, availability, or turnaround claims.
- Clearly distinguish current service, active experiments, and long-term vision.
- Do not casually rename the project.

Use `docs/brand/claims-and-terminology.md` when writing public copy.

## Privacy and safety

Reality-capture material may expose faces, children, homes, possessions, location clues, voices, and personal relationships. Treat customer media and lead data as sensitive by default. Do not add real personal data, credentials, raw customer captures, or signed releases to Git. Any workflow involving customer data must follow `docs/technical/security-and-privacy.md` and receive founder review before launch.

## Working conventions

- Keep changes small, reviewable, and tied to an explicit task.
- Preserve user changes and unrelated work.
- Prefer durable conclusions in the correct context document over chat logs or generated research dumps.
- Put external source material and its provenance under `references/`; do not present unverified research as project truth.
- Record consequential, durable, or expensive-to-reverse choices as decision records.
- Do not create abstractions, dependencies, services, or automation before they solve a current need.
- Update documentation when implementation changes documented behavior.

## Validation and handoff

Validate in proportion to the change. Documentation work should at minimum check links, paths, terminology, and Git status. Code work should run the relevant formatter, type checks, tests, build, and critical browser checks once those commands exist.

Handoffs must state:

- Objective and completed scope
- Governing documents
- Files changed
- Assumptions and decisions
- Validation performed
- Open questions, risks, and follow-up work

Use `docs/agent/task-and-handoff-template.md` for multi-agent assignments. Agents may recommend decisions, but the founder owns product scope, taste, customer promises, publication, and real-world operations.
