/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const crackSafe = (n, k) => {
  let result = '';
  let vList = [];
  let start = ''.padEnd(n - 1, '0');
  const dfs = (str) => {
    for (let i = 0; i < k; i++) {
      const v = `${str}${i}`;
      if (vList.includes(v)) continue;
      vList.push(v);
      dfs(v.slice(1));
      result += i;
    }
  };
  dfs(start);
  return `${result}${start}`;
};
console.log(crackSafe(3, 8));
