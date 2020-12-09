/*
 * @lc app=leetcode.cn id=241 lang=typescript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
function diffWaysToCompute(input: string): number[] {
  const arr = input.split(/(\D)/);
  const dfs = (start = 0, end = arr.length): number[] => {
    if (end - start === 1) return [Number(arr[start])];
    const res: number[] = [];
    for (let i = start + 1; i < end; i += 2) {
      const left = dfs(start, i);
      const right = dfs(i + 1, end);
      for (let l of left)
        for (let r of right) res.push(eval(`${l} ${arr[i]} ${r}`) as number);
    }
    return res;
  };
  return dfs();
}
// @lc code=end
console.log(diffWaysToCompute('2*3-4*5'));
