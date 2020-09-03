function repeatedSubstringPattern(s: string): boolean {
  let repeatSubstring = '';
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (repeatSubstring[j] !== s[i]) {
      repeatSubstring = s.slice(0, i + 1);
      j = 0;
    } else if (j === repeatSubstring.length - 1 && i != s.length - 1) {
      j = 0;
    } else j++;
  }
  return j === repeatSubstring.length;
}

console.log(repeatedSubstringPattern('abacababacab'));
