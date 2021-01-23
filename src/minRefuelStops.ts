function minRefuelStops(
  target: number,
  startFuel: number,
  stations: number[][]
): number {
  // dp[i]为加油i次可以到达的最大行程
  const dp = [startFuel];
  const stastionsTotal = stations.length;
  for (let i = 0; i < stastionsTotal; i++) {
    for (let t = i; t >= 0; t--) {
      const [pos, fuels] = stations[i];
      if (pos > dp[t]) continue;
      dp[t + 1] = Math.max(dp[t + 1] ?? 0, dp[t] + fuels);
    }
  }

  return dp.findIndex((val) => val >= target);
}

const target = 100,
  startFuel = 10,
  stations = [
    [10, 60],
    [20, 30],
    [30, 30],
    [60, 40],
  ];

console.log(minRefuelStops(target, startFuel, stations));
