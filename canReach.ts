const canReach = function (arr: number[], start: number): boolean {
  const leftIdx = start - arr[start],
    rightIdx = arr[start] + start;

  if (arr[leftIdx] === 0 || arr[rightIdx] === 0) return true;
  return (
    (leftIdx >= 0 && canReach(arr, leftIdx)) ||
    (rightIdx < arr.length && canReach(arr, rightIdx))
  );
};

const arr = [3, 0, 2, 1, 2],
  start = 2;

console.log(canReach(arr, start));
