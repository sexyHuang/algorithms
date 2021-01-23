/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numberOfSubarrays = (nums, k) => {
  const oddIndicesList = [];
  const length = nums.length;
  nums.forEach((value, index) => value % 2 === 1 && oddIndicesList.push(index));
  let sum = 0;
  const oddLength = oddIndicesList.length;
  oddIndicesList.unshift(-1);
  oddIndicesList.push(length);
  for (let i = 1; i <= oddLength - k + 1; i++) {
    sum +=
      (oddIndicesList[i] - oddIndicesList[i - 1]) *
      (oddIndicesList[i + k] - oddIndicesList[i + k - 1]);
  }
  return sum;
};

console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3));
