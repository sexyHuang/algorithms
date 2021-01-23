import PriorityQueue from './dataStructure/PriorityQueue';

type CharCount = {
  char: string;
  count: number;
};

function reorganizeString(S: string): string {
  const sLength = S.length;
  const maxCharCount = Math.ceil(sLength / 2);
  const charCountMap: { [key: string]: number } = {};
  let res = '';
  if (sLength < 2) return S;
  for (let i = 0; i < sLength; i++) {
    const count = (charCountMap[S[i]] ?? 0) + 1;
    if (count > maxCharCount) return res;
    charCountMap[S[i]] = count;
  }
  const maxQueue = new PriorityQueue<CharCount>((a, b) => {
    return b.count - a.count;
  });
  Object.entries(charCountMap).forEach(([char, count]) => {
    maxQueue.offer({ char, count });
  });
  while (maxQueue.size) {
    const s1 = maxQueue.poll();
    const s2 = maxQueue.size ? maxQueue.poll() : void 0;
    res += `${s1.char}${s2?.char ?? ''}`;

    if (s1.count - 1 > 0) {
      maxQueue.offer({
        ...s1,
        count: s1.count - 1
      });
    }
    if (s2 && s2.count - 1 > 0) {
      maxQueue.offer({
        ...s2,
        count: s2.count - 1
      });
    }
  }
  return res;
}

const S =
  'tndsewnllhrtwsvxenkscbivijfqnysamckzoyfnapuotmdexzkkrpmppttficzerdndssuveompqkemtbwbodrhwsfpbmkafpwyedpcowruntvymxtyyejqtajkcjakghtdwmuygecjncxzcxezgecrxonnszmqmecgvqqkdagvaaucewelchsmebikscciegzoiamovdojrmmwgbxeygibxxltemfgpogjkhobmhwquizuwvhfaiavsxhiknysdghcawcrphaykyashchyomklvghkyabxatmrkmrfsppfhgrwywtlxebgzmevefcqquvhvgounldxkdzndwybxhtycmlybhaaqvodntsvfhwcuhvuccwcsxelafyzushjhfyklvghpfvknprfouevsxmcuhiiiewcluehpmzrjzffnrptwbuhnyahrbzqvirvmffbxvrmynfcnupnukayjghpusewdwrbkhvjnveuiionefmnfxao';

console.log(reorganizeString(S));
