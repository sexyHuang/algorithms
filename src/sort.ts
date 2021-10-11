const quickSort = (input: number[]) => {
  const sort = (start = 0, end = input.length) => {
    let middleIdx = Math.floor((start + end) / 2);
    const middleValue = input[middleIdx];
    const swag = (i: number, j: number) => {
      [input[i], input[j]] = [input[j], input[i]];
    };
    let left = start,
      right = end - 1;
    if (right <= left) return;
    while (left < right) {
      while (input[left] < middleValue) {
        left++;
      }
      while (input[right] > middleValue) {
        right--;
      }
      swag(left, right);
      if (left === middleIdx) middleIdx = right;
      else if (right === middleIdx) middleIdx = left;
    }
    sort(start, middleIdx);
    sort(middleIdx + 1, end);
  };
  sort();
};

function tournamentSort(arr: number[]) {
  const length = arr.length;
  const tree: number[] = [];
  const compare = (a: number, b: number) => a - b;
  const winner = (i: number, j: number) => {
    const a = i < length - 1 ? tree[i] : i;
    const b = j < length - 1 ? tree[j] : j;
    return compare(tree[a], tree[b]) < 0 ? a : b;
  };

  const buildTree = () => {
    for (let [i, item] of arr.entries()) tree[length - 1 + i] = item;
    let i = tree.length - 1;
    while (i > 0) {
      const k = Math.floor((i - 1) / 2);
      const j = i - 1;
      tree[k] = winner(i, j);
      i -= 2;
    }

    return tree[0];
  };
  const rebuild = (i: number) => {
    while (i > 0) {
      const k = Math.floor((i - 1) / 2);
      const j = i % 2 === 0 ? i - 1 : i + 1;
      tree[k] = winner(i, j);
      i = k;
    }

    return tree[0];
  };
  let i = buildTree();
  for (let j of arr.keys()) {
    arr[j] = tree[i];
    tree[i] = Infinity;
    i = rebuild(i);
  }
}

/**
 * 堆排序（升序）
 * 1. 建最大堆
 * 2. 以此推出队首
 * @param arr
 */
function heapSort(arr: number[]) {
  const exch = (i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  function compare(i: number, j: number) {
    return arr[i] > arr[j] ? i : j;
  }
  function buildHeap() {
    for (let i = arr.length - 1; i > 0; i -= 2) {
      const k = Math.floor((i - 1) / 2);
      const j = i % 2 ? i + 1 : i - 1;
      const biggerIdx = j < arr.length ? compare(i, j) : i;
      if (arr[biggerIdx] > arr[k]) exch(biggerIdx, k);
    }
  }

  function sink(end: number) {
    let k = 0;
    while (true) {
      let downIdx = 2 * k + 1;
      if (downIdx > end) break;
      if (downIdx <= end - 1) downIdx = compare(downIdx, downIdx + 1);
      if (arr[downIdx] <= arr[k]) break;
      exch(k, downIdx);
      k = downIdx;
    }
  }

  let nextIdx = arr.length - 1;
  buildHeap();
  while (nextIdx > 0) {
    exch(0, nextIdx);
    nextIdx -= 1;
    sink(nextIdx);
  }
}

function mergeSort(arr: number[]) {
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
}

const arr = Array.from(
  {
    length: 10
  },
  () => Math.floor(10000 * Math.random())
);

console.log(arr);

mergeSort(arr);
console.log(arr);

export default {};
