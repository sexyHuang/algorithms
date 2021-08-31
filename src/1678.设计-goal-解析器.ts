/*
 * @lc app=leetcode.cn id=1678 lang=typescript
 *
 * [1678] 设计 Goal 解析器
 */

// @lc code=start
function interpret(command: string): string {
  const commandMap = new Map<string, string>([
    ['G', 'G'],
    ['()', 'o'],
    ['(al)', 'al']
  ]);
  let start = 0;
  let res = '';
  for (let i = 1; i <= command.length; i++) {
    const cmd = command.slice(start, i);
    if (commandMap.has(cmd)) {
      res += commandMap.get(cmd)!;
      start = i;
    }
  }
  return res;
}
// @lc code=end
