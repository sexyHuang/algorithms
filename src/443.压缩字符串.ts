/*
 * @lc app=leetcode.cn id=443 lang=typescript
 *
 * [443] 压缩字符串
 */

// @lc code=start
function compress(chars: string[]): number {
  let charIdx = 0;
  let count = 1;
  const rewriter = () => {
    if (count === 1) return;

    const countStr = `${count}`;
    for (let letter of countStr) {
      chars[++charIdx] = letter;
    }
    count = 1;
  };

  for (let compareIdx = 1; compareIdx < chars.length; compareIdx++) {
    if (chars[charIdx] === chars[compareIdx]) {
      count += 1;
    } else {
      rewriter();
      chars[++charIdx] = chars[compareIdx];
    }
  }
  rewriter();
  return charIdx + 1;
}
// @lc code=end
let chars = ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'];
console.log(compress(chars));

console.log(chars);
