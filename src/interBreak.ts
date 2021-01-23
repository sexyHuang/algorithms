function integerBreak(n: number): number {
  if (n <= 3) return n - 1;
  const q = Math.floor(n / 3);
  const remain = n % 3;
  if (remain === 0) return 3 ** q;
  if (remain === 1) return 3 ** (q - 1) * 4;
  else return 3 ** q * 2;
}
