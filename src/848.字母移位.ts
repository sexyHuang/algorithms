/*
 * @lc app=leetcode.cn id=848 lang=typescript
 *
 * [848] 字母移位
 */

// @lc code=start
function shiftingLetters(s: string, shifts: number[]): string {
  let res = '';
  let shift = 0;
  const chatCodeA = 'a'.charCodeAt(0);
  const charShift = (char: string, shift: number) => {
    return String.fromCharCode(
      ((char.charCodeAt(0) + shift - chatCodeA) % 26) + chatCodeA
    );
  };

  for (let i = s.length - 1; i >= 0; i--) {
    shift += shifts[i];
    res = `${charShift(s[i], shift)}${res}`;
  }
  return res;
}
// @lc code=end
console.log(shiftingLetters('abc', [3, 5, 9]));
