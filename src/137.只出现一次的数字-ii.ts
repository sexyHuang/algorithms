/*
 * @lc app=leetcode.cn id=137 lang=typescript
 *
 * [137] 只出现一次的数字 II
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 * 用 a, b 两个 bit 位来表示一个数的出现次数
 * when Xi = 0, [ai, bi] = [ai, bi]
 * when Xi = 1, aibi iterate in [00, 01, 10, 00]
 * tips: 真值表、最小项原则
 * 优化，分步计算，先计算 b，再计算 a
 */

// @lc code=start
function singleNumber(nums: number[]): number {
  let [a, b] = [0, 0];
  for (const num of nums) {
    b = ~a & (b ^ num);
    a = ~b & (a ^ num);
  }
  return b;
}
// @lc code=end
