/*
 * @lc app=leetcode.cn id=363 lang=typescript
 *
 * [363] 矩形区域不超过 K 的最大数值和
 */

// @lc code=start
const bisect_left = (arr: number[], target: number) => {
  if (arr[0] >= target) return 0;
  const index = arr.findIndex(
    (value, idx) => value < target && arr[idx + 1] >= target
  );

  return index < 0 ? arr.length : index + 1;
};
function maxSumSubmatrix(matrix: number[][], k: number): number {
  for (let row of matrix) {
    for (let idx of row.keys()) row[idx] += row[idx - 1] ?? 0;
  }
  let ans = -Infinity;
  console.log(matrix);

  for (let i of matrix[0].keys()) {
    for (let j = i; j < matrix[0].length; j++) {
      const pres = [0];
      let pre = 0;
      for (let m of matrix.keys()) {
        pre += matrix[m][j] - (matrix[m][i - 1] ?? 0);
        const idx = bisect_left(pres, pre - k);

        if (idx < pres.length) {
          ans = Math.max(ans, pre - pres[idx]);
        }
        pres.splice(bisect_left(pres, pre), 0, pre);
      }
      console.log(i, j);
      console.log(pres);
    }
  }
  return ans === -Infinity ? -1 : ans;
}
const matrix = [
  [1, 0, 1],
  [0, -2, 3]
];
const k = 2;
const arr = [1, 3, 5, 7, 9];
console.log(bisect_left(arr, 11));

console.log(maxSumSubmatrix(matrix, k));
// @lc code=end

export default {};
