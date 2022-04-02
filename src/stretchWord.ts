function stretchWord(s: string) {
  let count = 1;
  let ans = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count += 1;
    } else {
      count = 1;
    }
    if (count === 2) {
      ans *= 2;
    }
  }
  return ans;
}

console.log(stretchWord('bbaa'));
