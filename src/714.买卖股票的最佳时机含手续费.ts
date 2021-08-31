/*
 * @lc app=leetcode.cn id=714 lang=typescript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
function maxProfit(prices: number[], fee: number): number {
  let [buy, sell] = [-Infinity, 0];
  for (let price of prices) {
    [buy, sell] = [
      Math.max(buy, sell - price),
      Math.max(sell, buy + price - fee)
    ];
  }
  return sell;
}
// @lc code=end
