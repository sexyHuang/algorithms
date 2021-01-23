function minimumTotal(triangle: number[][]): number {
  const dp = triangle.pop()!;
  for (let i = triangle.length - 1; i >= 0; i--) {
    triangle[i].forEach((value, idx) => {
      dp[idx] = Math.min(dp[idx], dp[idx + 1]) + value;
    });
  }
  return dp[0];
}

const triangle: number[][] = [];

console.log(minimumTotal(triangle));
