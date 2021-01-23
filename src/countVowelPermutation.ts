/**
 * 给你一个整数 n，请你帮忙统计一下我们可以按下述规则形成多少个长度为 n 的字符串：
 * 字符串中的每个字符都应当是小写元音字母（'a', 'e', 'i', 'o', 'u'）
 * 每个元音 'a' 后面都只能跟着 'e'
 * 每个元音 'e' 后面只能跟着 'a' 或者是 'i'
 * 每个元音 'i' 后面 不能 再跟着另一个 'i'
 * 每个元音 'o' 后面只能跟着 'i' 或者是 'u'
 * 每个元音 'u' 后面只能跟着 'a'
 * 由于答案可能会很大，所以请你返回 模 10^9 + 7 之后的结果。
 * tranformfn
 * dp[i][j] = Sum[k](dp[i-1][k]) k为可到达j的字符，dp[i][j]表示i+1长，j字符结束的字符串个数。
 */

const MOD_VAL = 10 ** 9 + 7;
function countVowelPermutation(n: number): number {
  enum Vowel {
    a,
    e,
    i,
    o,
    u,
  }
  const beforeMap = new Map([
    [Vowel.a, [Vowel.e, Vowel.u, Vowel.i]],
    [Vowel.e, [Vowel.a, Vowel.i]],
    [Vowel.i, [Vowel.o, Vowel.e]],
    [Vowel.o, [Vowel.i]],
    [Vowel.u, [Vowel.i, Vowel.o]],
  ]);
  let dp = Array.from(
    {
      length: 5,
    },
    () => 1
  );
  for (let i = 1; i < n; i++) {
    const nextDp: number[] = [];
    dp.forEach((_, idx) => {
      nextDp[idx] = beforeMap
        .get(idx)!
        .reduce((prev, curr) => prev + (dp[curr] % MOD_VAL), 0);
    });
    dp = nextDp;
  }
  return dp.reduce((prev, curr) => prev + curr) % MOD_VAL;
}

console.log(countVowelPermutation(5));
