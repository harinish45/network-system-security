# 🛡️ Enterprise Network Defense & System Hardening Suite
> **Next-generation zero-trust network policy engine, eBPF packet inspection, and automated system hardening orchestration.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Compliance: CIS Benchmark](https://img.shields.io/badge/Compliance-CIS%20Level%202-success.svg)](https://www.cisecurity.org/)
[![Status: Active Development](https://img.shields.io/badge/Status-Active%20v1.0.0-brightgreen.svg)]()

---

## 🏛️ System Architecture

The **Enterprise Network Defense Suite** enforces Zero-Trust Network Architecture (ZTNA), automated kernel-level firewall orchestration via eBPF / nftables, real-time IDS/IPS threat signatures, and OS-level hardening based on CIS Benchmarks.

```mermaid
graph TD
    A[Inbound Network Traffic] --> B[eBPF / XDP Packet Filter]
    B -->|Blocked / Malicious| C[Drop & Security Event Stream]
    B -->|Verified| D[Stateful Traffic Inspector]
    D --> E[Zero-Trust Policy Engine]
    E --> F[Identity & Micro-Segmentation Check]
    F -->|Authorized| G[Protected Service Mesh / Host Daemon]
    F -->|Violation| H[Dynamic Quarantine & Firewall Ban]
    H --> I[(SIEM / Prometheus Telemetry)]
```

---

## 🚀 Core Capabilities

* **Kernel-Level Packet Inspection (eBPF/XDP):** High-throughput microsecond packet evaluation and DDoS mitigation before network stack processing.
* **Declarative Zero-Trust Policies:** Micro-segmentation rules defined in YAML/JSON enforced across distributed containers and bare-metal nodes.
* **Automated Host Hardening:** One-click compliance audits and continuous drift detection for Linux (Ubuntu, Debian, RHEL) based on CIS Level 1 & 2.
* **Dynamic Intrusion Prevention:** Automated port scan detection, rate-limiting, and distributed IP reputation scoring.
* **Telemetry & Observability:** Native Prometheus metrics, OpenTelemetry traces, and structured JSON audit events.

---

## 📦 Quick Start

### Installation
```bash
npm install @harinish/network-system-security
# or
pnpm add @harinish/network-system-security
```

### Basic Firewall Rule & Policy Enforcement
```typescript
import { NetworkDefenseEngine, ZeroTrustPolicyManager } from '@harinish/network-system-security';

const policyManager = new ZeroTrustPolicyManager();

// Register micro-segmentation rule
policyManager.registerRule({
  id: 'deny-unauthorized-db-access',
  sourceSubnet: '10.0.1.0/24',
  destinationPort: 5432,
  protocol: 'TCP',
  action: 'ALLOW',
  requiredTags: ['role=payments-backend']
});

const engine = new NetworkDefenseEngine({ policyManager });
const evaluation = engine.evaluatePacket({
  sourceIP: '10.0.1.45',
  destinationPort: 5432,
  protocol: 'TCP',
  sourceTags: ['role=payments-backend']
});

console.log('Packet Verdict:', evaluation.verdict); // ALLOW
```

---

## 🤖 Vibe Coding & Autonomous AI Development
This repository is engineered for autonomous AI development:
* [`PRD.md`](./PRD.md) — Comprehensive product requirements and architecture.
* [`ROADMAP.md`](./ROADMAP.md) — Phased milestones.
* [`TODO.md`](./TODO.md) — Atomic implementation checklist with unit test acceptance criteria.
* [`AGENTS.md`](./AGENTS.md) — Architectural invariants and rules for AI agents.

---

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
