function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;
  const dp: boolean[] = Array.from(
    {
      length: s2.length,
    },
    () => false
  );
  dp[0] = true;
  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      const pos = i + j - 1;
      if (i > 0) {
        dp[j] = dp[j] && s1[i - 1] === s3[pos];
      }
      if (j > 0) {
        dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[pos]);
      }
    }
  }
  return dp.pop()!;
}
const s1 = '',
  s2 = '',
  s3 = '';

console.log(isInterleave(s1, s2, s3));
