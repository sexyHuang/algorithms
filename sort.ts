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

const arr = Array.from(
  {
    length: 100
  },
  () => Math.floor(10000 * Math.random())
);

console.log(arr);

quickSort(arr);
console.log(arr);

export default {};
