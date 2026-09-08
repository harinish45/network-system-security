export interface FirewallRuleDefinition {
  chain: 'INPUT' | 'FORWARD' | 'OUTPUT';
  protocol: 'tcp' | 'udp' | 'icmp';
  port?: number;
  sourceCidr?: string;
  action: 'ACCEPT' | 'DROP' | 'REJECT';
  comment?: string;
}

export class FirewallRuleBuilder {
  public static toIptables(rule: FirewallRuleDefinition): string {
    let cmd = `iptables -A ${rule.chain} -p ${rule.protocol}`;
    if (rule.sourceCidr) {
      cmd += ` -s ${rule.sourceCidr}`;
    }
    if (rule.port) {
      cmd += ` --dport ${rule.port}`;
    }
    cmd += ` -j ${rule.action}`;
    if (rule.comment) {
      cmd += ` -m comment --comment "${rule.comment}"`;
    }
    return cmd;
  }

  public static toNftables(rule: FirewallRuleDefinition): string {
    const verdict = rule.action.toLowerCase();
    let stmt = `nft add rule inet filter ${rule.chain.toLowerCase()} ip protocol ${rule.protocol}`;
    if (rule.sourceCidr) {
      stmt += ` ip saddr ${rule.sourceCidr}`;
    }
    if (rule.port) {
      stmt += ` ${rule.protocol} dport ${rule.port}`;
    }
    stmt += ` ${verdict}`;
    return stmt;
  }
}
