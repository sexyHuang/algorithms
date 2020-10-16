function minMutation(start: string, end: string, bank: string[]): number {
  const visited = new Set<string>();
  const queue = [
    {
      node: start,
      depth: 0,
    },
  ];
  const canReach = (target: string, next: string) => {
    let dcount = 0;
    for (let i = 0; i < target.length; i++) {
      if (dcount > 1) return false;
      if (next[i] !== target[i]) dcount += 1;
    }
    return dcount === 1;
  };
  while (queue.length) {
    const { node, depth } = queue.shift()!;
    if (node === end) {
      return depth;
    }
    for (let next of bank) {
      if (visited.has(next) || !canReach(node, next)) continue;
      visited.add(next);
      queue.push({
        node: next,
        depth: depth + 1,
      });
    }
  }
  return -1;
}

const start = 'AACCGGTT';
const end = 'AAACGGTA';
const bank = ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'];

console.log(minMutation(start, end, bank));
export default {};
