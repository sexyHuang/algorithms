/*
 * @lc app=leetcode.cn id=1945 lang=typescript
 *
 * [1945] 字符串转化后的各位数字之和
 */

// @lc code=start
function getLucky(s: string, k: number): number {
  const getNumber = (char: string) => {
    const aCharCode = 'a'.charCodeAt(0);
    return char.charCodeAt(0) - aCharCode + 1;
  };
  const init = () => {
    return [...s].reduce((prev, curr) => `${prev}${getNumber(curr)}`, '');
  };
  let res = init();

  for (let i = 0; i < k; i++)
    res = [...res].reduce((prev, curr) => `${parseInt(prev) + parseInt(curr)}`);

  return parseInt(res);
}
// @lc code=end
console.log(getLucky('dbvmfhnttvr', 5));
