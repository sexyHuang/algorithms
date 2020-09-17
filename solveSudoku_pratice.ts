/**
 * 常量
 */
enum Const {
  emptyStr = '.',
  idxMask = 0b1111,
  reverseMask = 0b111111111,
}

const getFillMap = () => ({
  row: Array.from(
    {
      length: 0,
    },
    () => 0
  ),
  column: Array.from(
    {
      length: 0,
    },
    () => 0
  ),
  box: Array.from(
    {
      length: 3,
    },
    () =>
      Array.from(
        {
          length: 3,
        },
        () => 0
      )
  ),
});
const countBitOne = (bit: number) => {
  let count = 0;
  while (bit) {
    bit &= bit - 1;
    count += 1;
  }
  return count;
};

const getLowestOneBit = (bit: number) => bit & ~(bit - 1);

type FillMap = ReturnType<typeof getFillMap>;
const addRecord = (
  row: number,
  column: number,
  bitVal: number,
  filledMap: FillMap,
  emptyCells?: Set<number>
) => {
  filledMap.row[row] |= bitVal;
  filledMap.column[column] |= bitVal;
  filledMap.box[Math.floor(row / 3)][Math.floor(column / 3)] |= bitVal;
  emptyCells && emptyCells.delete(idxsToBit(row, column));
};

const idxsToBit = (rowIdx: number, columnIdx: number) =>
  (rowIdx << 4) | columnIdx;

const bitToIdxs = (bit: number) => [bit >> 4, bit & Const.idxMask];

/**
 * 将board转成bit
 */
const initSudoku = (board: string[][]) => {
  const emptyCells = new Set<number>();
  const filledMap = getFillMap();
  for (let [rowIdx, column] of board.entries()) {
    for (let [columnIdx, value] of column.entries()) {
      if (value === Const.emptyStr) {
        emptyCells.add(idxsToBit(rowIdx, columnIdx));
      } else addRecord(rowIdx, columnIdx, 1 << (Number(value) - 1), filledMap);
    }
  }
  return { emptyCells, filledMap };
};

const getPossibilityBit = (
  rowIdx: number,
  columnIdx: number,
  filledMap: FillMap
) => {
  const { row, column, box } = filledMap;
  return (
    (row[rowIdx] |
      column[columnIdx] |
      box[Math.floor(rowIdx / 3)][Math.floor(columnIdx / 3)]) ^
    Const.reverseMask
  );
};
const getNextCell = (emptyCells: Set<number>, filledMap: FillMap) => {
  let res = {
    rowIdx: -1,
    columnIdx: -1,
    possibilityBit: 0,
  };
  let min = Infinity;
  for (let bit of emptyCells) {
    const [rowIdx, columnIdx] = bitToIdxs(bit);
    const possibilityBit = getPossibilityBit(rowIdx, columnIdx, filledMap);
    if (min > countBitOne(possibilityBit))
      res = {
        rowIdx,
        columnIdx,
        possibilityBit,
      };
  }
  return res;
};

const fillNext = (
  board: string[][],
  emptyCells: Set<number>,
  filledMap: FillMap
) => {
  let { rowIdx, columnIdx, possibilityBit } = getNextCell(
    emptyCells,
    filledMap
  );
  if (!emptyCells.size) return true;
  while (possibilityBit) {
    const sign = getLowestOneBit(possibilityBit);
    board[rowIdx][columnIdx] = `${Math.log2(sign) + 1}`;
    addRecord(rowIdx, columnIdx, sign, filledMap, emptyCells);
    if (fillNext(board, emptyCells, filledMap)) {
      return true;
    } else {
      possibilityBit ^= sign; // 标记已访问
      removeRecord(rowIdx, columnIdx, sign, filledMap, emptyCells);
    }
  }
  return false;
};
const removeRecord = (
  row: number,
  column: number,
  bitVal: number,
  filledMap: FillMap,
  emptyCells: Set<number>
) => {
  filledMap.row[row] &= ~bitVal;
  filledMap.column[column] &= ~bitVal;
  filledMap.box[Math.floor(row / 3)][Math.floor(column / 3)] &= ~bitVal;
  emptyCells.add(idxsToBit(row, column));
};
function solveSudoku(board: string[][]) {
  const { emptyCells, filledMap } = initSudoku(board);
  fillNext(board, emptyCells, filledMap);
}

const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

solveSudoku(board);
console.table(board);
export default {};
