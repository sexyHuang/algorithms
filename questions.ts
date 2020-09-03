/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(
  a: number,
  b: number,
  callback: (a: null, b: number) => void
) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest: number[]) {
  // 请在此处完善代码
  const promisifyAdd = (a: number, b: number) => {
    return new Promise((resolve) => {
      asyncAdd(a, b, (_, sum) => {
        resolve(sum);
      });
    });
  };
}

function findSubsequences(nums: number[]): number[][] {
  const dfs = (
    idx: number,
    minSize: number = 0,
    before: number = -Infinity
  ): number[][] => {
    const now = nums[idx];
    const res: number[][] = [];
    if (idx >= nums.length) return [[]];
    if (before <= now) {
      res.push(...dfs(idx + 1, 0, now).map((arr) => [now, ...arr]));
      //  console.log(idx, res);
    }

    if (now && before !== now) {
      res.push(...dfs(idx + 1, 0, before));
    }

    return res.filter((arr) => arr.length >= minSize);
  };
  return dfs(0, 2);
}

console.log(findSubsequences([4, 6, 7, 7, 7]));
export default {};
