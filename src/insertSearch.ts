function searchInsert(nums: number[], target: number): number {
  const search = (startIdx: number, endIndex: number): number => {
    const halfIndex = Math.floor((endIndex + startIdx) / 2);

    if (nums[halfIndex] === target) return halfIndex;
    else if (nums[halfIndex] > target) {
      if (startIdx === endIndex) return halfIndex;
      return search(startIdx, halfIndex - 1);
    } else {
      if (startIdx === endIndex) return halfIndex + 1;
      return search(halfIndex + 1, endIndex);
    }
  };
  return search(0, nums.length - 1);
}
