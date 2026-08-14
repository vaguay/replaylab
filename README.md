# ReplayLab

**Test AI agents against historical workflows before they touch production systems.**

ReplayLab is a portfolio prototype for evaluating action-taking enterprise agents. Rather than judging a chat response alone, it replays a historical operational case through an agent's tool-call plan and compares the plan against the verified human outcome.

## The problem

Organizations are increasingly piloting agents that can act across systems: CRM, order management, billing, ticketing, internal knowledge bases, and incident tools. The difficult question is not only *“Did the model answer well?”* It is:

> Did the agent take the correct sequence of actions, with the right evidence, permissions, and escalation path?

ReplayLab makes that question visible before production deployment.

## Current prototype

The initial demo implements a scenario-based evaluation suite for customer-support refund workflows. It shows:

- four scenarios: the historical case plus controlled tool-outage, approval-threshold, and security-conflict variations;
- the historical customer case and verified human resolution;
- the agent's proposed tool-call trace;
- a step-by-step action comparison;
- missing evidence, unsafe actions, and approval requirements;
- a release recommendation based on the replay.

The records are fictional and designed solely for product demonstration.

## Product thesis

Agent reliability should be evaluated at the **workflow and action level**, not only by model-response quality. A safe enterprise agent needs to be able to:

1. retrieve the right context;
2. use approved tools in the correct order;
3. stop when a human approval is required;
4. preserve a trace that can be evaluated against the outcome.

## Run locally

No dependencies are required for the first prototype.

```bash
cd ReplayLab
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser.

## Roadmap

- [x] Interactive workflow-replay prototype
- [x] Scenario library with controlled operational variations
- [ ] Add policy versions and a scenario-mutation engine
- [ ] Import JSON traces and historical cases
- [ ] Define an action-evaluation schema
- [ ] Add replay scorecards and release gates
- [ ] Add sandbox connectors for CRM, order, billing, and knowledge-base tools

## Portfolio framing

Built from an applied-AI insight: a system can be technically capable while still being operationally unsafe or wrong. ReplayLab translates that problem into a product for AI teams, FDEs, and operations leaders.
