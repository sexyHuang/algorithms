class GNode {
  val: number;
  neighbors: GNode[];
  constructor(val = 0, neighbors: GNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * @param {Node} node
 * @return {Node}
 */
const cloneGraphInBfs = function (node: GNode) {
  const quene = [node];

  const res = new GNode(node.val);
  const seen = new Map([[node, res]]);
  while (quene.length) {
    const head = quene.shift()!;

    for (let node of head.neighbors) {
      if (!seen.has(node)) {
        seen.set(node, new GNode(node.val));
        quene.push(node);
      }
      seen.get(head)?.neighbors.push(seen.get(node)!);
    }
  }
  return res;
};

const cloneGraphInDfs = (node: GNode) => {
  const res = new GNode(node.val);
  const seen = new Map([[node, res]]);
  const dfs = (node: GNode) => {
    node.neighbors.forEach((_node) => {
      if (!seen.has(_node)) {
        seen.set(_node, new GNode(_node.val));
        dfs(_node);
      }
      seen.get(node)?.neighbors.push(seen.get(_node)!);
    });
  };
  dfs(node);
  return res;
};

const createNode = (list: number[][]) => {
  const nodes = Array.from({ length: 4 }, (_, idx) => new GNode(idx + 1));
  list.forEach((neighbors, idx) => {
    nodes[idx].neighbors.push(...neighbors.map((val) => nodes[val - 1]));
  });
  return nodes.shift()!;
};
const node = createNode([
  [2, 4],
  [1, 3],
  [2, 4],
  [1, 3],
]);
console.log(cloneGraphInDfs(node));
