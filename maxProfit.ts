/**
 *  dp转移方程,i为第i天，k为最多k笔
 *  dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 *  dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 *  dp[i][0][0] = 0;
 *  dp[i][0][1] = -Infinity;
 */

/**
 * k = 1;
 *  dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
 *  dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
 * 化简可得：
 *  dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 *  dp[i][1] = max(dp[i-1][1], -prices[i])
 */
function maxProfitI(prices: number[]): number {
  let dp = [0, -Infinity];
  prices.forEach((price) => {
    dp = [Math.max(dp[0], dp[1] + price), Math.max(dp[1], -price)];
  });
  return dp[0];
}

/**
 * 不限制最大交易次数，即
 * k = Infinity;
 * 因为 prices长度是有限自然数；
 * 所以 k - prices.length = Infinity; k始终为Infinity;
 * 可以理解为 k-1 = k;即不必记录k的状态
 * 转移方程可化简为：
 *  dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 *  dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
 *
 */
function maxProfitII(prices: number[]): number {
  let dp = [0, -Infinity];
  prices.forEach((price) => {
    dp = [Math.max(dp[0], dp[1] + price), Math.max(dp[1], dp[0] - price)];
  });
  return dp[0];
}

function maxProfitWithFroze(prices: number[]): number {
  let dp = [0, -Infinity, 0];
  prices.forEach((price) => {
    dp = [
      Math.max(dp[0], dp[1] + price),
      Math.max(dp[1], dp[2] - price),
      dp[0],
    ];
  });
  return dp[0];
}

function maxProfitWithFee(prices: number[], fee: number): number {
  let dp = [0, -Infinity];
  prices.forEach((price) => {
    dp = [Math.max(dp[0], dp[1] + price), Math.max(dp[1], dp[0] - price - fee)];
  });
  return dp[0];
}
function maxProfitWithTimes(prices: number[], k: number) {
  const dp: [number, number][] = Array.from({ length: k + 1 }, () => [
    0,
    -Infinity,
  ]);

  prices.forEach((price) => {
    for (let dk = k; dk > 0; dk--) {
      dp[dk] = [
        Math.max(dp[dk][0], dp[dk][1] + price),
        Math.max(dp[dk][1], dp[dk - 1][0] - price),
      ];
    }
  });
  return dp.pop()![0];
}
const prices = [3, 2, 6, 5, 0, 3];
const k = 2;

console.log(maxProfitWithTimes(prices, k));
