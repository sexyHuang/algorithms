const getCardIdxList = (length: number, d = 2, startIdx = 0): number[] => {
  if (startIdx + d >= length) return [startIdx];
  let count = 1;
  const res = [];
  for (let i = startIdx; i < length; i += d) {
    res.push(i);
    count += 1;
  }
  return [...res, ...getCardIdxList(length, d * 2, startIdx + d / 2)];
};

const cardQuestion = (cards: number[]) => {
  const length = cards.length;
  const idxList = getCardIdxList(length);
  return idxList
    .map((val, idx) => ({
      idx: val,
      val: cards[idx],
    }))
    .sort((a, b) => b.idx - a.idx)
    .map(({ val }) => val);
};

console.log(cardQuestion([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
