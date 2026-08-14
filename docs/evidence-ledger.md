# Evidence ledger

## Purpose

An evaluation score without its supporting records is difficult to review, reproduce, or challenge. ReplayLab therefore treats evidence as first-class workflow data: every replay should show the historical or synthetic source, the policy version that applies, and the condition that changed the expected action.

## Minimum evidence record

| Field | Why it matters |
| --- | --- |
| Case or scenario ID | Links a trace to a source workflow |
| Evidence source and timestamp | Shows where a fact or expected outcome came from |
| Policy identifier and version | Prevents evaluation against an unstated or changing rule |
| Mutation definition | Makes a synthetic edge case reproducible |
| Reviewer decision | Records who accepted an ambiguous outcome or release exception |

The UI ledger is deliberately small: it makes provenance visible at the point where a product, engineering, or risk reviewer is deciding whether a trace can be trusted.

## Design principle

The ledger does not imply that retrieved data is true. It records what the agent and evaluator were allowed to rely on, so a reviewer can identify stale, missing, or conflicting evidence.

This aligns with the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) emphasis on documented governance and measurement, and with trace-based agent observability practices such as [OpenAI tracing](https://openai.github.io/openai-agents-js/guides/tracing/).
