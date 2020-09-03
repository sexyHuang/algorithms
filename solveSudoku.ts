/**
 Do not return anything, modify board in-place instead.
 keywords: 回溯、优化空间（位）、剪支（先选择可能性小的格子）
 */
const EMPTY_STR = '.';
const MAX_IDX = 8;
const REVERISE_MASK = 0b111111111;
const getLowestBit = (value: number) => ((value - 1) & value) ^ value;

const countBitOne = (bit: number) => {
  let count = 0;
  while (bit) {
    bit &= bit - 1;
    count++;
  }
  return count;
};

const idxsToBit = (rowIdx: number, colunmIdx: number) =>
  (rowIdx << 4) + colunmIdx;

const bitToIdxs = (bits: number) => [bits >> 4, bits & 0b1111];

function solveSudoku(board: string[][]): void {
  /**
   * 行记录（已填）
   */
  const rows: number[] = Array.from({ length: 9 }, () => 0);

  /**
   * 列记录（已填）
   */
  const columns: number[] = Array.from({ length: 9 }, () => 0);

  /**
   * 九宫格记录（已填）
   */
  const boxs: number[][] = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => 0)
  );

  /**
   * 未填格idxs表（通过idxsToBit方法转换）
   */
  const emptyCells: Set<number> = new Set();

  /**
   * 获取格子可填数字的9位bit
   */
  const getPossibleBits = (rowIdx: number, columnIdx: number) =>
    (rows[rowIdx] |
      columns[columnIdx] |
      boxs[Math.floor(rowIdx / 3)][Math.floor(columnIdx / 3)]) ^
    REVERISE_MASK;

  /**
   * 写入
   */
  const addRecord = (rowIdx: number, columnIdx: number, bits: number) => {
    board[rowIdx][columnIdx] = `${Math.log2(bits) + 1}`;
    rows[rowIdx] |= bits;
    columns[columnIdx] |= bits;
    boxs[Math.floor(rowIdx / 3)][Math.floor(columnIdx / 3)] |= bits;
    emptyCells.delete(idxsToBit(rowIdx, columnIdx));
  };

  /**
   * 移除
   */
  const removeRecord = (rowIdx: number, columnIdx: number, bits: number) => {
    rows[rowIdx] &= ~bits;
    columns[columnIdx] &= ~bits;
    boxs[Math.floor(rowIdx / 3)][Math.floor(columnIdx / 3)] &= ~bits;
    board[rowIdx][columnIdx] = EMPTY_STR;
    emptyCells.add(idxsToBit(rowIdx, columnIdx));
  };

  /**
   * 获取未填格
   */
  const getEmptyCell = () => {
    let [targetRowIdx, targetColumnIdx, targetPossibleBit, min] = [
      -1,
      -1,
      0,
      Infinity,
    ];
    for (let idxBits of emptyCells) {
      const [rowIdxs, columnIdx] = bitToIdxs(idxBits);
      const possibleBit = getPossibleBits(rowIdxs, columnIdx);
      const count = countBitOne(possibleBit);
      if (count < min) {
        [targetRowIdx, targetColumnIdx, targetPossibleBit, min] = [
          rowIdxs,
          columnIdx,
          possibleBit,
          count,
        ];
      }
    }
    return [targetRowIdx, targetColumnIdx, targetPossibleBit];
  };

  /**
   * 填充下一格
   */
  const fillNext = () => {
    if (!emptyCells.size) return true;
    let [rowIdx, colunmIdx, possibleBit] = getEmptyCell();
    while (possibleBit) {
      const sign = getLowestBit(possibleBit);
      addRecord(rowIdx, colunmIdx, sign);
      if (fillNext()) {
        return true;
      } else {
        possibleBit ^= sign;
        removeRecord(rowIdx, colunmIdx, sign);
      }
    }
    return false;
  };

  /**
   * 初始化数独
   */
  const init = () =>
    board.forEach((row, rowIdx) =>
      row.forEach((value, columnIdx) =>
        value !== EMPTY_STR
          ? addRecord(rowIdx, columnIdx, 1 << (parseInt(value) - 1))
          : emptyCells.add(idxsToBit(rowIdx, columnIdx))
      )
    );

  init();
  fillNext();
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
