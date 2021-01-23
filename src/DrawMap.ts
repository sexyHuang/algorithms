const IS_JAPAN_SERVICE = false;

const UP_RATE = IS_JAPAN_SERVICE ? 0.008 : 0.007;
const AMOUNT_PER_DAN = 167;

const RANGE = [1, 30];

const factorial = (n: number, before = 1): number =>
  n <= 1 ? before : factorial(n - 1, n * before);
const arrangement = (n: number, m: number): number => {
  let res = 1;
  const min = n - m + 1;
  while (n >= min) {
    res *= n;
    n--;
  }
  return res;
};
const combination = (n: number, m: number): number =>
  arrangement(n, m) / factorial(m);

const getTimes = (n: number) => {
  const times = Math.floor((AMOUNT_PER_DAN * n) / 3);
  return times + (IS_JAPAN_SERVICE ? Math.floor(times / 10) : 0);
};

const getProbability = (n: number, m: number) => {
  const times = getTimes(n);
  return combination(times, m) * (1 - UP_RATE) ** (times - m) * UP_RATE ** m;
};
const getProbabilityArr = (n: number) => {
  const arr = Array.from({ length: 5 }, (_, idx) => {
    return getProbability(n, idx);
  });
  return [...arr, 1 - arr.reduce((prev, curr) => prev + curr)];
};
const getOverProbability = (n: number, m: number) =>
  1 -
  Array.from({ length: m }, (_, idx) => {
    return getProbability(n, idx);
  }).reduce((prev, curr) => prev + curr);

const getDrawMap = ([min, max] = RANGE) => {
  const res = [];
  for (let i = min; i <= max; i++) {
    res.push(getProbabilityArr(i));
  }
  return res;
};
console.table(getDrawMap());
