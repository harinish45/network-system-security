export interface CISCheckResult {
  ruleId: string;
  description: string;
  compliant: boolean;
  actualValue: string;
  expectedValue: string;
}

export class CISHardeningAuditor {
  public static auditSysctl(settings: Record<string, string>): CISCheckResult[] {
    const standards: Record<string, { desc: string; expected: string }> = {
      'net.ipv4.ip_forward': { desc: 'Disable IP forwarding', expected: '0' },
      'net.ipv4.conf.all.send_redirects': { desc: 'Disable packet send redirects', expected: '0' },
      'net.ipv4.conf.all.accept_source_route': { desc: 'Disable source routing', expected: '0' },
      'net.ipv4.conf.all.accept_redirects': { desc: 'Disable ICMP redirect acceptance', expected: '0' },
      'net.ipv4.tcp_syncookies': { desc: 'Enable TCP SYN cookies against SYN floods', expected: '1' }
    };

    return Object.entries(standards).map(([key, config]) => {
      const actual = settings[key] || 'unset';
      return {
        ruleId: `CIS-NET-${key}`,
        description: config.desc,
        compliant: actual === config.expected,
        actualValue: actual,
        expectedValue: config.expected
      };
    });
  }
}
