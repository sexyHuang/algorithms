const BASE_COST = 3.41;
const STEP_COSTS = [0, 0.93, 3.72];
const STEP_COUNTS = [216, 300, Infinity];
const usedWater = (total: number, reduction: number) => {};

function exist(board: string[][], word: string): boolean {
  const length = word.length;
  const visited = new Set<string>();
  const dpos = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const dfs = (rowIdx: number, columnIdx: number, wordIdx: number): boolean => {
    if (wordIdx >= length) return true;
    if (board[rowIdx]?.[columnIdx] !== word[wordIdx]) return false;
    let res = false;
    const idxStr = `${rowIdx}-${columnIdx}`;
    visited.add(idxStr);
    for (let [di, dj] of dpos) {
      if (visited.has(`${rowIdx + di}-${columnIdx + dj}`)) continue;
      res = res || dfs(rowIdx + di, columnIdx + dj, wordIdx + 1);
    }
    visited.delete(idxStr);
    return res;
  };
  return board.some((column, rowIdx) =>
    column.some((_, columnIdx) => dfs(rowIdx, columnIdx, 0))
  );
}
