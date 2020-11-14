function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  const indexMap = new Map<number, number>();
  arr2.forEach((val, idx) => {
    indexMap.set(val, idx);
  });

  return arr1.sort((a, b) => {
    if (indexMap.has(a) && indexMap.has(b)) {
      return indexMap.get(a)! - indexMap.get(b)!;
    }

    if (indexMap.has(a)) return -1;
    if (indexMap.has(b)) return 1;
    return a - b;
  });
}

const arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
  arr2 = [2, 1, 4, 3, 9, 6];
console.log(relativeSortArray(arr1, arr2));

export default {};
