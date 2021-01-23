function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  const boardRecord = Array.from(
    {
      length: n,
    },
    () => -1
  );
  const isUnderAttack = (row: number, column: number) =>
    boardRecord.some(
      (_column, _row) =>
        _column >= 0 &&
        (_column === column ||
          _row - _column === row - column ||
          row + column === _row + _column)
    );

  const addSolvtion = () =>
    res.push(
      boardRecord.map((column) => 'Q'.padStart(column + 1, '.').padEnd(n, '.'))
    );
  const dps = (row: number = 0) => {
    if (row >= n) {
      addSolvtion();
      return;
    }
    for (let i = 0; i < n; i++) {
      if (isUnderAttack(row, i)) continue;
      boardRecord[row] = i;
      dps(row + 1);
      boardRecord[row] = -1;
    }
  };
  dps();
  return res;
}

const res = solveNQueens(4);
console.log(res);
