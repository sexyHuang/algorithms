/*
 * @lc app=leetcode.cn id=640 lang=typescript
 *
 * [640] 求解方程
 */

// @lc code=start
function solveEquation(equation: string): string {
  enum Result {
    NoSolution = 'No solution',
    Infinite = 'Infinite solutions'
  }
  const splits = equation.split(/([\=\+\-])/);
  let xCoefficient = 0;
  let constant = 0;

  let [coeFlag, conFlag] = [1, -1];
  enum operatorMap {
    '+' = 1,
    '-' = -1
  }
  let carry = 1;
  for (let val of splits) {
    if (['+', '-'].includes(val)) {
      carry = operatorMap[val as '+' | '-'];
    } else if (/^\d*x$/.test(val)) {
      xCoefficient +=
        coeFlag * carry * Number(val.replace(/^(\d*)x$/, '$1') || '1');
    } else if (val === '=') {
      [coeFlag, conFlag] = [conFlag, coeFlag];
      carry = 1;
    } else {
      constant += conFlag * carry * Number(val);
    }
  }
  if (!xCoefficient) {
    return constant ? Result.NoSolution : Result.Infinite;
  }
  return `x=${constant / xCoefficient}`;
}
// @lc code=end

const equation = '2x+3x-6x=x+2';
console.log(solveEquation(equation));
