/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const len = nums1.length + nums2.length;
  const isOdd = len & 1;
  const midIdx = len >> 1;
  const idxList = isOdd ? [midIdx] : [midIdx - 1, midIdx];
  let [i, j] = [0, 0];
  let res = 0;
  while (i + j <= midIdx) {
    if (nums1[i] < (nums2[j] ?? Infinity)) {
      if (idxList.includes(i + j)) {
        res += nums1[i];
      }
      i += 1;
    } else {
      if (idxList.includes(i + j)) {
        res += nums2[j];
      }
      j += 1;
    }
  }
  return res / (isOdd ? 1 : 2);
}
// @lc code=end

console.log(findMedianSortedArrays([1, 3], [2, 4]));
debugger;
