# 🤖 AI Agent Engineering Guidelines

When working in this repository:
1. **Default Deny:** Every policy evaluator must default to `DENY` if no explicit rule matches.
2. **Deterministic CIDR Evaluation:** IP matchers must handle IPv4 and IPv6 without regex shortcuts.
3. **No External Dependencies for Core:** Base policy logic must rely solely on native TypeScript/JavaScript primitives.
4. **Unit Tests Required:** Every new feature must include a corresponding test under `tests/`.
