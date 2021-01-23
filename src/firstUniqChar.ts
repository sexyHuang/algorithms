function firstUniqChar(str: string): number {
  const CharCode_A = 'a'.charCodeAt(0);
  const charIdxArr: number[] = [];
  for (let i = 0; i < str.length; i++) {
    charIdxArr[str.charCodeAt(i) - CharCode_A] = i;
  }

  for (let i = 0; i < str.length; i++) {
    const charIdx = str.charCodeAt(i) - CharCode_A;
    if (charIdxArr[charIdx] === i) return i;
    else charIdxArr[charIdx] = -1;
  }
  return -1;
}
