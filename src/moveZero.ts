const moveZero = (nums: number[]) => {
  let zeroPointer = 0;
  let otherPointer = 0;
  while (zeroPointer < nums.length && otherPointer < nums.length) {
    while (nums[zeroPointer]) zeroPointer++;
    otherPointer = zeroPointer > otherPointer ? zeroPointer : otherPointer;
    while (!nums[otherPointer]) {
      otherPointer++;
    }
    [nums[zeroPointer], nums[otherPointer]] = [
      nums[otherPointer],
      nums[zeroPointer],
    ];
  }
  return nums;
};

const nums = [1, 5, 3, 12];
console.log(moveZero(nums));
export default {};
