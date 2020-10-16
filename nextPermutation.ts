/**
 Do not return anything, modify nums in-place instead.
 */

const reverse = (
  target: number[],
  startIdx = 0,
  endIdx = target.length - 1
) => {
  let i = 0;
  while (startIdx + i < endIdx - i) {
    [target[startIdx + i], target[endIdx - i]] = [
      target[endIdx - i],
      target[startIdx + i],
    ];
    i++;
  }
};

function nextPermutation(nums: number[]): void {
  let i = nums.length - 2;
  while ((nums[i] ?? -Infinity) >= nums[i + 1]) i--;
  let j = nums.length - 1;
  while (nums[j] <= (nums[i] ?? -Infinity)) j--;
  if (i >= 0) [nums[i], nums[j]] = [nums[j], nums[i]];
  reverse(nums, i + 1);
}

const nums = [1, 3, 2];

nextPermutation(nums);
console.log(nums);

export default {};
