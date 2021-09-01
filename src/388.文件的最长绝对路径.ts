/*
 * @lc app=leetcode.cn id=388 lang=typescript
 *
 * [388] 文件的最长绝对路径
 */

// @lc code=start
const NEW_LINE = `\n`;
const TAB = `\t`;
function lengthLongestPath(input: string): number {
  let start = 0;

  const getPath = () => {
    let point = start;
    let deep = 0;
    let isFile = false;
    while (point < input.length && input[point] !== NEW_LINE) {
      if (input[point] === TAB) {
        deep += 1;
        start += 1;
      }
      if (input[point] === '.') {
        isFile = true;
      }
      point += 1;
    }
    const path = point - start;
    start = point + 1;
    return { path: isFile ? path : path + 1, deep, isFile };
  };

  const queue = [
    {
      path: 0,
      deep: -1
    }
  ];
  let max = 0;
  while (start < input.length) {
    let { deep, path, isFile } = getPath();
    while (queue[queue.length - 1].deep >= deep) {
      queue.pop();
    }
    path += queue[queue.length - 1].path;
    if (isFile) {
      max = Math.max(max, path);
    } else
      queue.push({
        deep,
        path
      });
  }
  return max;
}
// @lc code=end

console.log(lengthLongestPath('dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext'));
