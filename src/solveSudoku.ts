import DancingLinksX from './dataStructure/dancingLinks';

/**
 * 基础递归逻辑
 *  fake code
 * dfs(row,column){
 *    if(Cell[row][column] is not exist) return true;
 *    if(Cell[row][column] not empty) dfs(nextRow,nextColumn);
 *    for(form 1 to 9){
 *        if(is illegal value){
 *            continue;
 *        }
 *        fill cell with this value;
 *        if(dfs(nextRow,nextColumn)) return true;
 *        else {
 *              clean fill record;
 *        }
 *    }
 *    return false
 * }
 *
 *
 * 优化目标
 * 1. 每次先检索可能性最少的空格
 *    1-1. 管理一个空格Set，存放现有的空格的idx
 *    1-2. 实现一个可以查询空格现有可能性的方法
 *
 * 2. 二进制存数据
 *    2-1. 每一行、列、格用一个9位二进制Bn表示，B[n]意义为该维度上数n+1是否填入；
 *    2-2. 空格Set用8位二进制数存放idx，高位为row，低位为column（反转亦可）；
 *
 * 3. 递归逻辑
 * fake code
 *    dfs(){
 *        if(no EmptyCell) return true;
 *        get min possibility cell;
 *        while(has possibility){
 *            fill cell with this possibility;
 *            if(dfs()){
 *                return true
 *            } else {
 *                disable this possibility;
 *                clean fill record;
 *            }
 *
 *        }
 *        return false;
 *    }
 *
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
      Infinity
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
          count
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

function solveSudokuWithDLX(board: string[][]) {
  const solver = new DancingLinksX();
  solver.build(9 ** 3, 9 ** 2 * 4);
  function getId(row: number, column: number, num: number) {
    return row * 9 ** 2 + column * 9 + num;
  }
  function insert(row: number, column: number, num: number) {
    const id = getId(row, column, num);
    const room = Math.floor(row / 3) * 3 + Math.floor(column / 3);
    solver.insert(id, row * 9 + num);
    solver.insert(id, 81 + column * 9 + num);
    solver.insert(id, 81 * 2 + room * 9 + num);
    solver.insert(id, 81 * 3 + row * 9 + column + 1);
  }

  for (let [row, vector] of board.entries()) {
    for (let [column, value] of vector.entries()) {
      for (let i = 1; i <= 9; i++) {
        if (value !== '.' && Number(value) !== i) continue;
        insert(row, column, i);
      }
    }
  }
  solver.dance();
  const ans = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );
  solver.answer.forEach(rowId => {
    const row = Math.floor((rowId - 1) / 81);
    const column = Math.floor((rowId - 1) / 9) % 9;
    const num = ((rowId - 1) % 9) + 1;
    ans[row][column] = num;
  });
  return ans;
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
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

/* solveSudoku(board);
console.table(board);
 */

console.table(board);
console.table(solveSudokuWithDLX(board));
