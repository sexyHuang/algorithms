function numFriendRequests(ages: number[]): number {
  let res = 0;
  const ageMap = new Map<number, number>();
  ages.forEach((age) => {
    if (!ageMap.has(age)) ageMap.set(age, 0);
    ageMap.set(age, ageMap.get(age)! + 1);
  });
  for (let B = 15; B <= 120; B++) {
    const bCount = ageMap.get(B) ?? 0;
    if (!bCount) continue;
    res += bCount * (bCount - 1);
    for (let A = B + 1; A < 2 * B - 14; A++) {
      const aCount = ageMap.get(A) ?? 0;

      res += bCount * aCount;
    }
  }
  return res;
}

const ages = [16, 16];
console.log(numFriendRequests(ages));
