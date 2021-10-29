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
    this.throwErrorBeforeBuild();
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
    this.throwErrorBeforeBuild();

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
    this.throwErrorBeforeBuild();

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
    this.throwErrorBeforeBuild();

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

export default DancingLinksX;
