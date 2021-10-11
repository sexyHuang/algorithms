import PriorityQueue from './dataStructure/PriorityQueue';

class Matrix {
  array: number[][];
  constructor(value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    this.array = value.reduce((prev, curr, currIdx) => {
      let vector: number[] = [];
      if (currIdx % 3) {
        vector = prev.pop()!;
      }
      return [...prev, [...vector, curr]];
    }, [] as number[][]);
  }
  compare(x: Matrix) {
    for (let [i, vector] of this.array.entries()) {
      for (let [j, item] of vector.entries()) {
        if (item !== x.array[i][j]) return x.array[i][j] - item;
      }
    }
    return 0;
  }
  get vector() {
    return this.array.flat();
  }
  zeroIndex(): [x: number, y: number] {
    for (let [i, vector] of this.array.entries()) {
      for (let [j, item] of vector.entries()) {
        if (!item) {
          return [i, j];
        }
      }
    }
    return [0, 0];
  }
  swap([x, y]: number[], [x1, y1]: number[]) {
    const { array } = this;
    [array[x][y], array[x1][y1]] = [array[x1][y1], array[x][y]];
  }
}

const StandardMatrix = new Matrix([1, 2, 3, 8, 0, 4, 7, 6, 5]);

function revertPartCount(arr: number[]) {
  arr = arr.filter(val => val);
  const t: number[] = [];
  let revertPairCounts = 0;
  function merge(l: number, r: number) {
    const mid = Math.floor((l + r) / 2);
    if (l >= r) return;
    merge(l, mid);
    merge(mid + 1, r);
    let i = l;
    let ll = l;
    let rl = mid + 1;
    while (i <= r) {
      if ((ll <= mid && arr[ll] <= arr[rl]) || rl > r) {
        t[i++] = arr[ll++];
      } else {
        t[i++] = arr[rl++];
        revertPairCounts += mid - ll + 1;
      }
    }
    for (let i = l; i <= r; i++) {
      arr[i] = t[i];
    }
  }
  merge(0, arr.length - 1);
  return revertPairCounts;
}

function h(a: Matrix) {
  let res = 0;
  for (let [i, vector] of a.array.entries()) {
    for (let [j, item] of vector.entries()) {
      if (item !== StandardMatrix.array[i][j]) res += 1;
    }
  }
  return res;
}

class Node {
  matrix: Matrix;
  t: number;
  constructor(m: Matrix, t = 0) {
    this.matrix = m;
    this.t = t;
  }
  compare(x: Node) {
    return x.t + h(x.matrix) - (this.t + h(this.matrix));
  }
}

const stepArr = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

function resetSteps(vector: number[]) {
  if (
    revertPartCount(vector) % 2 !==
    revertPartCount(StandardMatrix.vector) % 2
  )
    return -1;
  const startNode = new Node(new Matrix(vector), 0);
  const queue = new PriorityQueue((a: Node, b: Node) => {
    return b.compare(a);
  });
  queue.offer(startNode);
  const visitedSet = new Set([startNode.matrix.vector.join()]);
  while (queue.size) {
    const node = queue.poll();
    if (!h(node.matrix)) return node.t;
    const [x, y] = node.matrix.zeroIndex();
    for (let [dx, dy] of stepArr) {
      let [_x, _y] = [x + dx, y + dy];
      if (!node.matrix.array[_x]?.[_y]) continue;
      node.matrix.swap([x, y], [_x, _y]);
      if (!visitedSet.has(node.matrix.vector.join())) {
        queue.offer(new Node(new Matrix(node.matrix.vector), node.t + 1));
        visitedSet.add(node.matrix.vector.join());
      }
      node.matrix.swap([x, y], [_x, _y]);
    }
  }
  return -1;
}

console.log(resetSteps([2, 0, 1, 5, 3, 7, 8, 4, 6]));
export default {};
