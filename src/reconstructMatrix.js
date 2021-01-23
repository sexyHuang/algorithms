/**
 * @param {number} upper
 * @param {number} lower
 * @param {number[]} colsum
 * @return {number[][]}
 */
const reconstructMatrix = (upper, lower, colsum) => {
  const upperList = new Array(colsum.length).fill(0),
    lowerList = new Array(colsum.length).fill(0);

  for (let i = 0; i < colsum.length; i++) {
    const value = colsum[i];
    if (value !== 2) continue;
    if (upper > 0 && lower > 0) {
      upperList[i] = 1;
      lowerList[i] = 1;
      lower--;
      upper--;
    } else {
      return [];
    }
  }
  for (let i = 0; i < colsum.length; i++) {
    const value = colsum[i];
    if (value !== 1) continue;
    if (upper > 0) {
      upperList[i] = 1;
      upper--;
    } else if (lower > 0) {
      lowerList[i] = 1;
      lower--;
    } else {
      return [];
    }
  }
  if (upper !== 0 && lower !== 0) return [];
  return [upperList, lowerList];
};

const upper = 5,
  lower = 5,
  colsum = [2, 1, 2, 0, 1, 0, 1, 2, 0, 1];

console.log(reconstructMatrix(upper, lower, colsum));
