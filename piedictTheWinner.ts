function PredictTheWinner(nums: number[]): boolean {
  const node = (
    startIdx = 0,
    endIdx = nums.length - 1,
    a = -Infinity,
    b = Infinity,
    isMax = true
  ): number => {
    if (startIdx === endIdx) return (isMax ? 1 : -1) * nums[startIdx];
    const nodeArr = [
      [startIdx, 1, 0],
      [endIdx, 0, -1],
    ];
    if (isMax) {
      let max = -Infinity;
      for (let [idx, ds, de] of nodeArr) {
        max = Math.max(
          max,
          node(startIdx + ds, endIdx + de, a, b, false) + nums[idx]
        );
        a = max;
        if (a >= b) break;
      }
      return max;
    } else {
      let min = Infinity;
      for (let [idx, ds, de] of nodeArr) {
        min = Math.min(
          min,
          node(startIdx + ds, endIdx + de, a, b, true) - nums[idx]
        );
        a = min;
        if (a >= b) break;
      }
      return min;
    }
  };

  const maxinmin = node();
  return maxinmin >= 0;
}

function PredictTheWinnerDP(nums: number[]): boolean {
  const dp = nums.slice();

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = i + 1; j < dp.length; j++)
      dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
  }

  return dp.pop()! >= 0;
}

console.log(PredictTheWinnerDP([1, 5, 233, 7]));
