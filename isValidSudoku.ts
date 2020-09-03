function isValidSudoku(board: string[][]): boolean {
  const bases: string[][] = Array.from({ length: 27 }, () => []);
  const checkExist = (rowIdx: number, columnIdx: number, value: string) => {
    return (
      bases[rowIdx].includes(value) ||
      bases[9 + columnIdx].includes(value) ||
      bases[
        18 + Math.floor(rowIdx / 3) * 3 + Math.floor(columnIdx / 3)
      ].includes(value)
    );
  };
  const addRecord = (rowIdx: number, columnIdx: number, value: string) => {
    bases[rowIdx].push(value);
    bases[9 + columnIdx].push(value);
    bases[18 + Math.floor(rowIdx / 3) * 3 + Math.floor(columnIdx / 3)].push(
      value
    );
  };
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    const row = board[rowIdx];
    for (let columnsIdx = 0; columnsIdx < row.length; columnsIdx++) {
      const value = row[columnsIdx];
      if (value === '.') continue;
      if (checkExist(rowIdx, columnsIdx, value)) return false;
      addRecord(rowIdx, columnsIdx, value);
    }
  }
  return true;
}
