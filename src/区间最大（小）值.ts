const LogN = [-Infinity, 0, 1];
const MaxN = 2000001;
const MaxLog = 21;
for (let i = 3; i < MaxN; i++) {
  LogN[i] = LogN[Math.floor(i / 2)] + 1;
}

/**
 * ST表
 * dp[i][j]为 arr[i] 到 arr[i + 2^j -1] 的最大值;
 * dp[i][0] = arr[i];
 * dp[i][j] = Max{dp[i][j-1], dp[i + 2 ^ (j - 1), j - 1]}
 * @param arr
 * @returns dp
 */
function sparseTable(arr: number[]) {
  const dp = Array.from({ length: arr.length }, (_, i) => [arr[i]]);
  for (let j = 1; j <= MaxLog; j++) {
    for (let i = 0; i + (1 << j) - 1 < arr.length; i++) {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i + (1 << (j - 1))][j - 1]);
    }
  }
  return dp;
}

/**
 * 倍增法
 * @param arr
 * @param query
 * @returns
 */
function RMQ(arr: number[], query: [number, number][]) {
  const st = sparseTable(arr);
  return query.map(([left, right]) => {
    let s = LogN[right - left + 1];
    return Math.max(st[left][s], st[right - (1 << s) + 1][s]);
  });
}
const arr = [9, 3, 1, 7, 5, 6, 0, 8];
const query: [number, number][] = [
  [0, 5],
  [0, 4],
  [1, 6],
  [1, 5],
  [0, 7],
  [3, 7],
  [2, 6],
  [0, 7]
];
console.log(RMQ(arr, query));

export default {};
