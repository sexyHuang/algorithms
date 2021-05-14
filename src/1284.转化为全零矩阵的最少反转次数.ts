/*
 * @lc app=leetcode.cn id=1284 lang=typescript
 *
 * [1284] 转化为全零矩阵的最少反转次数
 */

// @lc code=start

const encode = (mat: number[][]) => {
  return mat.flat().reduce((prev, n) => prev * 2 + n, 0);
};

const decode = (x: number, r: number, c: number) => {
  const mat = Array.from({ length: r }, () =>
    Array.from({ length: c }, () => 0)
  );
  for (let i = r - 1; i >= 0; i--) {
    for (let j = c - 1; j >= 0; j--) {
      mat[i][j] = x & 1;
      x >>= 1;
    }
  }
  return mat;
};

const flip = (mat: number[][], x: number, y: number) => {
  [
    [-1, 0],
    [0, -1],
    [0, 0],
    [1, 0],
    [0, 1]
  ].forEach(([dx, dy]) => {
    if (mat[y + dy]?.[x + dx] !== undefined) mat[y + dy][x + dx] ^= 1;
  });
};
function minFlips(mat: number[][]): number {
  const visitedSet = new Set<number>();
  const queue = [encode(mat)];
  let res = 0;
  const [row, column] = [mat.length, mat[0].length];
  while (queue.length) {
    let length = queue.length;
    while (length--) {
      const state = queue.shift();
      if (!state) return res;
      if (visitedSet.has(state)) continue;

      visitedSet.add(state);

      const mat = decode(state, row, column);
      mat.forEach((v, y) => {
        for (let x of v.keys()) {
          flip(mat, x, y);
          queue.push(encode(mat));
          flip(mat, x, y);
        }
      });
    }
    res += 1;
  }
  return -1;
}
// @lc code=end

const mat = [
  [1, 0, 0],
  [1, 0, 0]
];
console.log(minFlips(mat));
