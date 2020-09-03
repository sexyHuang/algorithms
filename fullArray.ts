function fullArray(nums: number[]) {
  const answers: number[][] = [];
  const dfs = (ans: number[] = []) => {
    if (ans.length === nums.length) {
      answers.push(ans.slice());
      return;
    }
    for (let val of nums) {
      if (ans.includes(val)) continue;
      ans.push(val);
      dfs(ans);
      ans.pop();
    }
  };
  dfs();
  return answers;
}

console.log(fullArray([1, 2, 3]));
