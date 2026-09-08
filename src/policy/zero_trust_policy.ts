export type NetworkAction = 'ALLOW' | 'DENY';

export interface SecurityPolicyRule {
  id: string;
  sourceSubnet: string;
  destinationPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  action: NetworkAction;
  requiredTags?: string[];
}

export interface PacketContext {
  sourceIP: string;
  destinationPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  sourceTags?: string[];
}

export interface EvaluationResult {
  verdict: NetworkAction;
  matchedRuleId?: string;
  reason: string;
}

export class ZeroTrustPolicyManager {
  private rules: SecurityPolicyRule[] = [];

  public registerRule(rule: SecurityPolicyRule): void {
    this.rules.push(rule);
  }

  public evaluatePacket(packet: PacketContext): EvaluationResult {
    for (const rule of this.rules) {
      if (rule.protocol !== packet.protocol) continue;
      if (rule.destinationPort !== packet.destinationPort) continue;

      // Tag validation
      if (rule.requiredTags && rule.requiredTags.length > 0) {
        const hasAllTags = rule.requiredTags.every(t => (packet.sourceTags || []).includes(t));
        if (!hasAllTags) continue;
      }

      return {
        verdict: rule.action,
        matchedRuleId: rule.id,
        reason: `Matched rule ${rule.id} with action ${rule.action}`
      };
    }

    // Default Zero-Trust Posture: Explicit Deny
    return {
      verdict: 'DENY',
      reason: 'Default-deny policy enforced: No matching rule allowed this traffic.'
    };
  }
}
