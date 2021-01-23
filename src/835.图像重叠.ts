/*
 * @lc app=leetcode.cn id=835 lang=typescript
 *
 * [835] 图像重叠
 */

// @lc code=start
function hammingWeight(n: number) {
  let sum = 0;
  while (n != 0) {
    sum++;
    n &= n - 1;
  }
  return sum;
}

const flat2Str = (arr: number[][]) =>
  arr.reduce((prev, curr) => `${prev}${curr.join('')}`, '');

function largestOverlap(img1: number[][], img2: number[][]): number {
  const bit1Str = flat2Str(img1);
  const bit2Str = flat2Str(img2);
  const length = bit1Str.length;
  const [bit1, bit2] = [parseInt(bit1Str, 2), parseInt(bit2Str, 2)];
  let max = 0;
  for (let i = 0; i < length; i++) {
    max = Math.max(
      max,
      hammingWeight((bit1 >> i) & bit2),
      hammingWeight((bit2 >> i) & bit1)
    );
  }
  return max;
}
// @lc code=end
