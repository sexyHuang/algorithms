// 各类背包问题

type Good = {
  cost: number;
  value: number;
  amount: number;
};

const transformFn = (
  { cost, value }: Good,
  maxCost: number,
  valueArr: number[]
) => Math.max(valueArr[maxCost], valueArr[maxCost - cost] + value);

enum PackageType {
  /**
   * 01背包
   */
  zeroOnePack,
  /**
   * 完全背包
   */
  completePack,
  /**
   * 多重背包（二进制优化）
   */
  multiplePack,
  /**
   * 多重背包（单调队列优化）
   */
  multiplePackMQ,
}

const packFunMap = {
  [PackageType.zeroOnePack]: (
    good: Good,
    maxCost: number,
    valueArr: number[]
  ) => {
    for (let weight = maxCost; weight >= good.cost; weight--)
      valueArr[weight] = transformFn(good, weight, valueArr);
  },
  [PackageType.completePack]: (
    good: Good,
    maxCost: number,
    valueArr: number[]
  ) => {
    for (let weight = good.cost; weight <= maxCost; weight++)
      valueArr[weight] = transformFn(good, weight, valueArr);
  },
  [PackageType.multiplePack]: (
    good: Good,
    maxCost: number,
    valueArr: number[]
  ) => {
    let { cost, amount } = good;
    const multiGood = ({ cost, amount, value }: Good, k: number) => ({
      cost: cost * k,
      amount: amount,
      value: value * k,
    });
    if (cost * amount >= maxCost) {
      return packFunMap[PackageType.completePack](good, maxCost, valueArr);
    }
    let k = 1;
    while (k < amount) {
      packFunMap[PackageType.zeroOnePack](
        multiGood(good, k),
        maxCost,
        valueArr
      );
      amount -= k;
      k *= 2;
    }
    packFunMap[PackageType.zeroOnePack](
      multiGood(good, amount),
      maxCost,
      valueArr
    );
  },
  [PackageType.multiplePackMQ]: (
    { cost, value, amount }: Good,
    maxCost: number,
    dp: number[]
  ) => {
    for (let j = 0; j < cost; j++) {
      const mq: { pos: number; value: number }[] = [];
      let head = 0,
        tail = -1;
      for (let k = 0; k <= (maxCost - j) / cost; k++) {
        const res = (dp[j + cost * k] ?? 0) - k * value;

        while (head <= tail && mq[tail]?.value <= res) tail--;
        mq[++tail] = {
          pos: k,
          value: res,
        };
        while (head <= tail && mq[head]?.pos < k - amount) head++;
        dp[j + cost * k] = mq[head].value + k * value;
      }
    }
  },
};

const pack = (
  goods: Good[],
  maxCost: number,
  packageType: PackageType = PackageType.zeroOnePack
) => {
  const valueArr = Array.from(
    {
      length: maxCost + 1,
    },
    () => 0
  );
  for (let good of goods) packFunMap[packageType](good, maxCost, valueArr);
  return valueArr.pop();
};

const good: Good[] = [
  { cost: 1, value: 7, amount: 2 },
  { cost: 2, value: 1, amount: 2 },
  { cost: 3, value: 2, amount: 3 },
  { cost: 3, value: 3, amount: 2 },
  { cost: 4, value: 2, amount: 6 },
  { cost: 5, value: 1, amount: 10 },
];

const goodGroups: Good[][] = [
  [
    { cost: 1, value: 7, amount: 2 },
    { cost: 2, value: 1, amount: 2 },
    { cost: 3, value: 2, amount: 3 },
    { cost: 3, value: 3, amount: 2 },
    { cost: 4, value: 2, amount: 6 },
    { cost: 5, value: 1, amount: 10 },
  ],
  [
    { cost: 3, value: 3, amount: 2 },
    { cost: 4, value: 2, amount: 6 },
    { cost: 5, value: 1, amount: 10 },
  ],
  [
    { cost: 1, value: 7, amount: 2 },
    { cost: 2, value: 1, amount: 2 },
    { cost: 4, value: 2, amount: 6 },
    { cost: 5, value: 1, amount: 10 },
  ],
];

const zeroOnePackWithGroup = (groups: Good[][], maxCost: number) => {
  const dp = Array.from(
    {
      length: maxCost + 1,
    },
    () => 0
  );
  for (let group of groups) {
    for (let weight = maxCost; weight > 0; weight--)
      for (let { cost, value } of group) {
        if (cost <= weight)
          dp[weight] = Math.max(dp[weight], dp[weight - cost] + value);
        //console.log(dp);
      }
  }
  return dp.pop();
};
/* console.log(pack(good, 8, PackageType.multiplePack));
console.log(pack(good, 8, PackageType.multiplePackMQ)); */

console.log(zeroOnePackWithGroup(goodGroups, 8));
