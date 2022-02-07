/*
 * @lc app=leetcode.cn id=1340 lang=typescript
 *
 * [1340] 跳跃游戏 V
 */

// @lc code=start
function maxJumps(arr: number[], d: number): number {
  const maxDeeps = Array.from({ length: arr.length }, () => -1);

  const dfs = (idx: number) => {
    let max = 0;
    let x = 1;
    const height = arr[idx];
    let [leftCanReach, rightCanReach] = [true, true];
    while (x <= d) {
      const [left, right] = [
        arr[idx - x] ?? Infinity,
        arr[idx + x] ?? Infinity
      ];
      if (left < height && leftCanReach) {
        if (maxDeeps[idx - x] < 0) dfs(idx - x);
        max = Math.max(max, maxDeeps[idx - x] + 1);
      } else {
        leftCanReach = false;
      }
      if (right < height && rightCanReach) {
        if (maxDeeps[idx + x] < 0) {
          dfs(idx + x);
        }
        max = Math.max(max, maxDeeps[idx + x] + 1);
      } else {
        rightCanReach = false;
      }
      x += 1;
    }
    maxDeeps[idx] = max;
  };

  for (let i of arr.keys()) {
    dfs(i);
  }
  return Math.max(...maxDeeps) + 1;
}
// @lc code=end

console.log(maxJumps([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2));
