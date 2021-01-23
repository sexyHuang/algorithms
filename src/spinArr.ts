const coArr = (nums: number[]) => {
  const _nums = [...new Set(nums)].sort((a, b) => a - b);
  return _nums.reduce((prev, curr, currIdx) => {
    if (curr - (_nums[currIdx - 1] ?? -Infinity) === 1) {
      prev[prev.length - 1].push(curr);
    } else prev.push([curr]);
    return prev;
  }, [] as number[][]);
};

const nums = [2, 10, 3, 4, 5, 11, 10, 11, 20];
console.log(coArr(nums));
