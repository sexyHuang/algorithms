/*
 * @lc app=leetcode.cn id=1515 lang=typescript
 *
 * [1515] 服务中心的最佳位置
 */

// @lc code=start
function getMinDistSum(positions: number[][]): number {
  const [Left, Right] = [0, 100];
  const eps = 1e-6;
  const calcDist = ([x, y]: [number, number]) => {
    return positions.reduce((prev, [cX, cY]) => {
      return prev + Math.sqrt((x - cX) ** 2 + (y - cY) ** 2);
    }, 0);
  };
  const checkOptimal = (x: number) => {
    let [yLeft, yRight] = [Left, Right];
    let res = 0;
    while (yRight - yLeft > eps) {
      const [yFirst, ySecond] = [
        (yLeft * 2 + yRight) / 3,
        (yLeft + yRight * 2) / 3
      ];
      res = calcDist([x, yFirst]);
      if (res > calcDist([x, ySecond])) {
        yLeft = yFirst;
      } else yRight = ySecond;
    }
    return res;
  };
  let [xLeft, xRight] = [Left, Right];
  let res = 0;
  while (xRight - xLeft > eps) {
    const [xFirst, xSecond] = [
      (xLeft * 2 + xRight) / 3,
      (xLeft + xRight * 2) / 3
    ];
    res = checkOptimal(xFirst);
    if (res > checkOptimal(xSecond)) {
      xLeft = xFirst;
    } else xRight = xSecond;
  }
  return res;
}
// @lc code=end
