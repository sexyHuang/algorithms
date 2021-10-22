const targetMatrix: (0 | 1)[][] = [
  [0, 0, 1, 0, 1, 1, 0],
  [1, 0, 0, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 1]
];

type Vector = number[];

class DirectionVectors {
  protected U: Vector = [];
  protected D: Vector = [];
  protected L: Vector = [];
  protected R: Vector = [];
}

class DancingLinksX extends DirectionVectors {
  total = 0;
  First: Vector = [];
  private ColumnSize: Vector = [];
  private Row: Vector = [];
  private Column: Vector = [];
  private Stack: Vector = [];
  private ans = 0;
  private _builded = false;
  constructor() {
    super();
  }
  build(rows: number, columns: number) {
    const { U, D, L, R } = this;
    this.First = Array.from({ length: rows }, () => 0);
    this.ColumnSize = Array.from({ length: columns + 1 }, () => 0);
    for (let i = 0; i <= columns; i++) {
      (R[i] = i + 1), (L[i] = i - 1), (U[i] = i), (D[i] = i);
    }
    (R[columns] = 0), (L[0] = columns);
    this.total = columns;
    this._builded = true;
  }
  private throwErrorBeforeBuild() {
    if (this._builded) return;
    throw new Error('Please run build before!');
  }
  private remove(column: number) {
    const { L, R, U, D, ColumnSize, Column } = this;
    (L[R[column]] = L[column]), (R[L[column]] = R[column]);
    for (let i = D[column]; i !== column; i = D[i]) {
      for (let j = R[i]; j !== i; j = R[j]) {
        (U[D[j]] = U[j]), (D[U[j]] = D[j]);
        ColumnSize[Column[j]] -= 1;
      }
    }
  }
  private recover(column: number) {
    const { L, R, U, D, ColumnSize, Column } = this;

    L[R[column]] = R[L[column]] = column;
    for (let i = D[column]; i !== column; i = D[i]) {
      for (let j = R[i]; j !== i; j = R[j]) {
        U[D[j]] = D[U[j]] = j;
        ColumnSize[Column[j]] += 1;
      }
    }
  }
  insert(row: number, column: number) {
    const { R, L, D, U, First, ColumnSize, Row, Column } = this;
    const idx = ++this.total;
    Row[idx] = row;
    Column[idx] = column;
    U[idx] = column;
    D[idx] = D[column];
    U[D[column]] = idx;
    D[column] = idx;
    if (!First[row]) {
      First[row] = L[idx] = R[idx] = idx;
    } else {
      L[idx] = First[row];
      R[idx] = R[First[row]];
      L[R[First[row]]] = idx;
      R[First[row]] = idx;
    }
    ColumnSize[column] += 1;
  }
  dance(dep = 1) {
    const { R, D, ColumnSize, Column, Row, Stack } = this;
    if (!R[0]) {
      this.ans = dep;
      return true;
    }
    let c = R[0];
    for (let i = R[0]; i !== 0; i = R[i]) {
      if (ColumnSize[i] < ColumnSize[c]) c = i;
    }
    this.remove(c);
    for (let i = D[c]; i !== c; i = D[i]) {
      Stack[dep] = Row[i];
      for (let j = R[i]; j !== i; j = R[j]) this.remove(Column[j]);
      if (this.dance(dep + 1)) return true;
      for (let j = R[i]; j !== i; j = R[j]) this.recover(Column[j]);
    }
    this.recover(c);
    return false;
  }
  get answer() {
    return this.Stack.slice(1, this.ans + 1);
  }
}

function _DancingLinksX(matrix: (0 | 1)[][]) {
  let [total] = [0, 0, 0];
  let [first, size] = [[], []] as number[][];
  const [U, D, L, R] = [[], [], [], []] as number[][];
  const [row, column] = [[], []] as number[][];
  const stack: number[] = [];
  let ans = 0;
  function build(r: number, c: number) {
    for (let i = 0; i <= c; i++) {
      L[i] = i - 1;
      R[i] = i + 1;
      U[i] = D[i] = i;
    }
    (L[0] = c), (R[c] = 0), (total = c);
    first = Array.from({ length: r }, () => 0);
    size = Array.from({ length: c + 1 }, () => 0);
    total = c;
  }
  function insert(r: number, c: number) {
    row[++total] = r;
    column[total] = c;
    size[c] += 1;
    D[total] = D[c];
    U[total] = c;
    U[D[c]] = total;
    D[c] = total;
    if (!first[r]) {
      first[r] = L[total] = R[total] = total;
    } else {
      L[total] = first[r];
      R[total] = R[first[r]];
      L[R[first[r]]] = total;
      R[first[r]] = total;
    }
  }

  function remove(c: number) {
    R[L[c]] = R[c];
    L[R[c]] = L[c];
    for (let i = D[c]; i !== c; i = D[i]) {
      for (let j = R[i]; j !== i; j = R[j]) {
        D[U[j]] = D[j];
        U[D[j]] = U[j];
        size[column[j]] -= 1;
      }
    }
  }

  function recover(c: number) {
    for (let i = U[c]; i !== c; i = U[i]) {
      for (let j = L[i]; j !== i; j = L[j]) {
        U[D[j]] = D[U[j]] = j;
        size[column[j]] += 1;
      }
    }
    L[R[c]] = R[L[c]] = c;
  }

  function dance(dep = 1) {
    if (!R[0]) {
      ans = dep;
      return true;
    }
    let c = R[0];
    for (let i = R[0]; i != 0; i = R[i]) {
      if (size[c] > size[i]) c = i;
    }
    remove(c);
    for (let i = D[c]; i != c; i = D[i]) {
      stack[dep] = row[i];
      for (let j = R[i]; j != i; j = R[j]) remove(column[j]);
      if (dance(dep + 1)) return true;
      for (let j = R[i]; j != i; j = R[j]) recover(column[j]);
    }
    recover(c);
    return false;
  }

  build(matrix.length, matrix[0].length);
  for (let [i, vector] of matrix.entries()) {
    for (let [j, value] of vector.entries()) {
      if (value) insert(i + 1, j + 1);
    }
  }
  if (dance(1)) {
    return stack.slice(1, ans + 1);
  }
}

export default DancingLinksX;
