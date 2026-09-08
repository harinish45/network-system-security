export class CIDRMatcher {
  public static ipToInt(ip: string): number {
    return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
  }

  public static isIpInCidr(ip: string, cidr: string): boolean {
    if (!cidr.includes('/')) {
      return ip === cidr;
    }
    const [range, bitsStr] = cidr.split('/');
    const bits = parseInt(bitsStr, 10);
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;

    const ipInt = this.ipToInt(ip);
    const rangeInt = this.ipToInt(range);

    return (ipInt & mask) === (rangeInt & mask);
  }
}
