function countSubstrings(s: string): number {
  const length = s.length;
  let res = 0;
  const dp: boolean[] = Array.from(
    {
      length,
    },
    () => true
  );

  for (let j = 1; j < length; j++) {
    for (let i = 0; i < j; i++) {
      const flag = s[i] === s[j] && dp[i + 1];
      flag && (res += 1);
      dp[i] = flag;
    }
  }

  return res + length;
}
const s = 'aaaaa';
console.log(countSubstrings(s));
export default {};
