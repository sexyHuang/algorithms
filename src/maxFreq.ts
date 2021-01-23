function maxFreq(
  s: string,
  maxLetters: number,
  minSize: number,
  maxSize: number
): number {
  const sArr = [...s];
  const timesMap: {
    [k: string]: number;
  } = {};
  let max = 0;
  for (let i = 0; i < s.length - minSize + 1; i++) {
    const curr = sArr.slice(i, i + minSize);
    console.log(curr);
    const letterSet = new Set(curr);
    const currStr = curr.join('');
    if (letterSet.size <= maxLetters) {
      timesMap[currStr] = (timesMap[currStr] ?? 0) + 1;
      max = Math.max(max, timesMap[currStr]);
    }
  }

  return max;
}

const s = 'aabcabcab',
  maxLetters = 2,
  minSize = 2,
  maxSize = 3;
console.log(maxFreq(s, maxLetters, minSize, maxSize));
