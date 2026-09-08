# Decision records

Decision records preserve the context behind choices that materially constrain future work. Use them for architecture, vendors, data handling, major product scope, and other durable or costly-to-reverse decisions—not routine implementation details.

## Naming

Use sequential names such as `0002-example-decision.md`.

## Status

- `Proposed` — under review and not yet binding
- `Accepted` — current decision
- `Superseded` — replaced by a newer record, linked in both directions
- `Deprecated` — retained for history but no longer recommended
- `Rejected` — considered but not adopted

## Template

```markdown
# NNNN: Decision title

- Status: Proposed
- Date: YYYY-MM-DD
- Owners: Founder, relevant specialist

## Context

## Decision

## Consequences

## Alternatives considered

## Follow-up
```

Update a proposed record during review. Once accepted, preserve its historical reasoning; create a superseding record for a materially different decision.
