/*
 * @lc app=leetcode.cn id=609 lang=typescript
 *
 * [609] 在系统中查找重复文件
 */

// @lc code=start
function findDuplicate(paths: string[]): string[][] {
  const map = new Map<string, string[]>();
  paths.forEach((path) => {
    const [rootPath, ...files] = path.split(" ");
    files.forEach((file) => {
      const [filename, content] = file.split(/[\(\)]/);
      if (!map.has(content)) {
        map.set(content, []);
      }
      map.set(content, [...map.get(content)!, `${rootPath}/${filename}`]);
    });
  });
  return [...map.values()].filter((arr) => arr.length > 1);
}
// @lc code=end
