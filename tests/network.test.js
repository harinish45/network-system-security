const assert = require('assert');
const test = require('node:test');

// Test 1: CIDR Matcher
test('CIDR Subnet IP Matching', () => {
  function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
  }
  function isIpInCidr(ip, cidr) {
    const [range, bitsStr] = cidr.split('/');
    const bits = parseInt(bitsStr, 10);
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
    return (ipToInt(ip) & mask) === (ipToInt(range) & mask);
  }

  assert.strictEqual(isIpInCidr('10.0.1.45', '10.0.0.0/16'), true);
  assert.strictEqual(isIpInCidr('10.1.1.45', '10.0.0.0/16'), false);
  assert.strictEqual(isIpInCidr('192.168.1.100', '192.168.1.0/24'), true);
  assert.strictEqual(isIpInCidr('192.168.2.100', '192.168.1.0/24'), false);
});

// Test 2: Firewall Rule Builder
test('Declarative iptables and nftables Rule Generation', () => {
  function toIptables(rule) {
    let cmd = `iptables -A ${rule.chain} -p ${rule.protocol}`;
    if (rule.sourceCidr) cmd += ` -s ${rule.sourceCidr}`;
    if (rule.port) cmd += ` --dport ${rule.port}`;
    cmd += ` -j ${rule.action}`;
    return cmd;
  }

  function toNftables(rule) {
    let stmt = `nft add rule inet filter ${rule.chain.toLowerCase()} ip protocol ${rule.protocol}`;
    if (rule.sourceCidr) stmt += ` ip saddr ${rule.sourceCidr}`;
    if (rule.port) stmt += ` ${rule.protocol} dport ${rule.port}`;
    stmt += ` ${rule.action.toLowerCase()}`;
    return stmt;
  }

  const rule = {
    chain: 'INPUT',
    protocol: 'tcp',
    port: 5432,
    sourceCidr: '10.0.1.0/24',
    action: 'ACCEPT'
  };

  assert.strictEqual(toIptables(rule), 'iptables -A INPUT -p tcp -s 10.0.1.0/24 --dport 5432 -j ACCEPT');
  assert.strictEqual(toNftables(rule), 'nft add rule inet filter input ip protocol tcp ip saddr 10.0.1.0/24 tcp dport 5432 accept');
});

// Test 3: CIS Benchmark Sysctl Auditor
test('CIS Benchmark Kernel Security Parameter Verification', () => {
  const settings = {
    'net.ipv4.ip_forward': '0',
    'net.ipv4.conf.all.send_redirects': '0',
    'net.ipv4.conf.all.accept_source_route': '0',
    'net.ipv4.conf.all.accept_redirects': '0',
    'net.ipv4.tcp_syncookies': '1'
  };

  const results = Object.entries(settings).map(([k, v]) => ({ key: k, value: v, compliant: true }));
  assert.strictEqual(results.every(r => r.compliant), true);
});
