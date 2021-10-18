/**
 *  Fi(f, e) : 总层数f，鸡蛋e时，在i层开始的最少尝试次数
 *  F(f, e) : 总层数f，鸡蛋e的最少尝试次数
 *  F(f, e) = Min{F1(f,e), F2(f,e),..., Ff-1(f,e)}
 *  Fi(f, e) = Max{F(f-1,e-1), F(f-i,e)}
 *
 */

function crashEggs(floors: number, eggs: number) {
  const dp = Array.from(
    {
      length: floors + 1
    },
    (_, i) => {
      return Array.from(
        {
          length: eggs + 1
        },
        (_, j) => {
          if (j === 1) return i;
          if (i === 1 && j !== 0) return 1;
          return 0;
        }
      );
    }
  );
  for (let floor = 2; floor <= floors; floor++) {
    for (let egg = 2; egg <= eggs; egg++) {
      let min = Infinity;
      for (let k = 1; k < floor; k++) {
        min = Math.min(
          min,
          Math.max(dp[k - 1][egg - 1], dp[floor - k][egg]) + 1
        );
      }
      dp[floor][egg] = min;
    }
  }
  return dp.pop()!.pop()!;
}

console.log(crashEggs(100, 5));
