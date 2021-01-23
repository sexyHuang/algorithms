function numTrees(n: number): number {
  const dp = [
    1,
    ...Array.from(
      {
        length: n,
      },
      () => 0
    ),
  ];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp.pop()!;
}

console.log(numTrees(3));
