/**
 * 给你一个整数数组 arr 和一个整数 d 。每一步你可以从下标 i 跳到：

i + x ，其中 i + x < arr.length 且 0 < x <= d 。
i - x ，其中 i - x >= 0 且 0 < x <= d 。
除此以外，你从下标 i 跳到下标 j 需要满足：arr[i] > arr[j] 且 arr[i] > arr[k] ，其中下标 k 是所有 i 到 j 之间的数字（更正式的，min(i, j) < k < max(i, j)）。

你可以选择数组的任意下标开始跳跃。请你返回你 最多 可以访问多少个下标。

请注意，任何时刻你都不能跳到数组的外面。
 */

/**
 * dp[i]为从i下标出发可以访问的最大下标数
 * 转移方程：dp[i] = 1+ max(dp[j]) j范围为i下标可以到达的所有下标
 */
function maxJumps(arr: number[], d: number) {
  const length = arr.length;
  const dp = Array.from(
    {
      length,
    },
    () => 1
  );

  const idxArr = [...arr.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([idx]) => idx);

  idxArr.forEach((idx) => {
    for (let i = idx + 1; i <= idx + d && i < length; i++) {
      if (arr[i] >= arr[idx]) break;
      dp[idx] = Math.max(dp[idx], 1 + dp[i]);
    }
    for (let i = idx - 1; i >= idx - d && i >= 0; i--) {
      if (arr[i] >= arr[idx]) break;
      dp[idx] = Math.max(dp[idx], 1 + dp[i]);
    }
  });
  return Math.max(...dp);
}

const arr = [3, 3, 3, 3, 3],
  d = 3;

console.log(maxJumps(arr, d));
export default {};
