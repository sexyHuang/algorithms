const DIRETIONS = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function solve(board: string[][]): void {
  // const checked: [number, number][] = [];
  const dfs = (i: number, j: number) => {
    if (!board[i]?.[j] || board[i][j] !== 'O') return;
    board[i][j] = '.';
    DIRETIONS.forEach(([di, dj]) => dfs(i + di, j + dj));
  };
  const [rowLength, columnLength] = [board.length, board[0].length];
  for (let i = 0; i < rowLength; i++) {
    dfs(i, 0);
    dfs(i, columnLength - 1);
  }
  for (let i = 1; i < columnLength - 1; i++) {
    dfs(0, i);
    dfs(rowLength - 1, i);
  }
  board.forEach((column, i) =>
    column.forEach((value, j) => {
      if (value === '.') board[i][j] = 'O';
      else if (value === 'O') board[i][j] = 'X';
    })
  );
}
