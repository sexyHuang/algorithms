/*
 * @lc app=leetcode.cn id=846 lang=typescript
 *
 * [846] 一手顺子
 */

// @lc code=start
function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize > 0) return false;
  const numberMap = new Map<number, number>();
  let min = Infinity,
    max = 0;
  hand.forEach(val => {
    if (!numberMap.has(val)) {
      numberMap.set(val, 0);
    }
    numberMap.set(val, numberMap.get(val)! + 1);
    min = Math.min(min, val);
    max = Math.max(max, val);
  });
  while (min <= max) {
    if (!numberMap.get(min)) {
      min += 1;
      continue;
    }
    for (let i = 0; i < groupSize; i++) {
      const target = min + i;
      if (!numberMap.get(target)) {
        return false;
      }
      numberMap.set(target, numberMap.get(target)! - 1);
    }
  }
  return true;
}
// @lc code=end

const hand = [1, 1, 2, 2, 3, 3],
  groupSize = 2;
console.log(isNStraightHand(hand, groupSize));
