# 📋 Product Requirements Document (PRD)
## Project: Enterprise Network Defense & System Hardening Suite
**Version:** 1.0.0-PROD  
**Owner:** Harinish S V ([@harinish45](https://github.com/harinish45))  

---

## 1. Problem Statement
Cloud-native workloads and distributed microservices face escalating lateral movement threats. Traditional boundary firewalls fail to inspect east-west traffic, while manual host hardening leads to configuration drift, missed CIS benchmark benchmarks, and uncontained intrusions.

## 2. Product Objectives
1. Provide a unified declarative Zero-Trust policy engine for east-west microservice segmentation.
2. Deliver high-performance packet evaluation algorithms and intrusion response heuristics.
3. Automate Linux system hardening checklists (CIS Benchmark Level 1/2).
4. Provide structured telemetry for enterprise SIEM integration.

## 3. Module Hierarchy
* `src/policy/`
  * `zero_trust_policy.ts` — Policy definition, CIDR subnet matching, and micro-segmentation evaluator.
* `src/firewall/`
  * `rule_builder.ts` — Declarative nftables / iptables rule syntax generator.
* `src/hardening/`
  * `cis_auditor.ts` — Kernel parameter verification (`sysctl` checks, SSH hardening, open port scanner).
* `src/telemetry/`
  * `audit_logger.ts` — High-speed structured security event logger.
