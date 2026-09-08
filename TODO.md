# ✅ Autonomous Implementation Checklist (Vibe Coding Guide)

This checklist is structured for AI coding agents (Antigravity, Cursor, Claude Code, Copilot). Pick the first unchecked item `[ ]`, implement it with unit tests, verify, and mark as `[x]`.

---

## 🎯 Phase 1: Zero-Trust Policy Engine
- [ ] `src/policy/zero_trust_policy.ts`: Zero-Trust Policy Manager
  - [ ] Implement `ZeroTrustPolicyManager` class
  - [ ] Support CIDR subnet parsing (e.g. `10.0.0.0/16`, `192.168.1.0/24`)
  - [ ] Implement packet evaluation: match Source, Destination, Protocol, and Required Tags
  - [ ] Default-deny posture when no rules match
  - [ ] Unit test: `tests/policy/zero_trust_policy.test.ts` (ALLOW on valid tag, DENY on mismatch, default DENY)

## 🎯 Phase 2: Declarative Firewall Rule Builder
- [ ] `src/firewall/rule_builder.ts`: Firewall Rule Generator
  - [ ] Implement `NFTablesRuleBuilder`
  - [ ] Generate valid `nft` syntax for drop, accept, and rate-limit rules
  - [ ] Unit test: `tests/firewall/rule_builder.test.ts`

## 🎯 Phase 3: CIS Benchmark System Hardening
- [ ] `src/hardening/cis_auditor.ts`: Linux System Hardening Auditor
  - [ ] Verify core security sysctl settings (`net.ipv4.conf.all.send_redirects = 0`, `net.ipv4.ip_forward = 0`)
  - [ ] Verify SSH daemon configuration (`PermitRootLogin no`, `PasswordAuthentication no`)
  - [ ] Unit test: `tests/hardening/cis_auditor.test.ts`

## 🎯 Phase 4: CI/CD & Verification
- [ ] `.github/workflows/ci.yml`: Automated GitHub Actions pipeline
  - [ ] Verification of PRD, TODO, and TypeScript syntax
