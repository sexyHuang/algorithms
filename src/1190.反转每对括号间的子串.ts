/*
 * @lc app=leetcode.cn id=1190 lang=typescript
 *
 * [1190] 反转每对括号间的子串
 */
function reverseParentheses_1(s: string): string {
  const sArr = [...s];
  const reverseString = (left: number, right: number) => {
    while (left < right) {
      [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
      left++;
      right--;
    }
  };
  const queue: number[] = [];
  let left = 0;
  while (left < s.length) {
    if (s[left] === '(') {
      queue.push(left + 1);
    }
    if (s[left] === ')') {
      reverseString(queue.pop()!, left - 1);
    }
    left += 1;
  }
  return sArr.filter(val => !['(', ')'].includes(val)).join('');
}

// @lc code=start

function reverseParentheses(s: string): string {
  const queue: number[] = [];
  let left = 0;
  const pairMap = new Map<number, number>();
  while (left < s.length) {
    if (s[left] === '(') queue.push(left);
    if (s[left] === ')') {
      const _l = queue.pop()!;
      pairMap.set(_l, left);
      pairMap.set(left, _l);
    }
    left += 1;
  }
  let res = '';
  let i = 0,
    step = 1;
  while (i < s.length) {
    if (['(', ')'].includes(s[i])) {
      i = pairMap.get(i)!;
      step *= -1;
    } else {
      res += s[i];
    }
    i += step;
  }
  return res;
}
// @lc code=end

console.log(reverseParentheses('((u(love)i)ses(sd))'));
