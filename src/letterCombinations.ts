function letterCombinations(digits: string): string[] {
  const KeyMap: { [key: string]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };
  const res: string[] = [];
  let temp = '';
  const dps = (idx: number) => {
    const key = digits[idx];
    if (!key) {
      temp && res.push(temp);
      return;
    }
    const keys = KeyMap[key];
    for (let i = 0; i < keys.length; i++) {
      temp += keys[i];
      dps(idx + 1);
      temp = temp.slice(0, -1);
    }
  };
  dps(0);
  return res;
}

console.log(letterCombinations('23'));
