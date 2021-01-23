function permuteUnique(nums: number[]): number[][] {
  const length = nums.length;
  const temp: number[] = [];
  const res: number[][] = [];
  const visited = new Set<number>();
  const dfs = (rootIdx = -1) => {
    const _visited = new Set<number>();

    rootIdx >= 0 && temp.push(nums[rootIdx]);
    visited.add(rootIdx);
    for (let i = 0; i < length; i++) {
      const value = nums[i];
      if (visited.has(i) || _visited.has(value)) continue;
      _visited.add(value);
      dfs(i);
    }
    visited.delete(rootIdx);
    if (temp.length === length) {
      res.push([...temp]);
    }
    rootIdx >= 0 && temp.pop();
  };
  dfs();
  return res;
}
const nums = [1, 1, 2];
console.log(permuteUnique(nums));
export default {};
