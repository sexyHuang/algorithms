class UnionFind {
  private ancestor: number[];
  private rank: number[];
  constructor(n: number) {
    this.ancestor = Array.from(
      {
        length: n,
      },
      (_, idx) => idx
    );
    this.rank = Array.from(
      {
        length: n,
      },
      () => 0
    );
  }
  find(i: number) {
    if (this.ancestor[i] !== i) {
      this.ancestor[i] = this.find(this.ancestor[i]);
    }
    return this.ancestor[i];
  }
  union(a: number, b: number) {
    const ancestorA = this.find(a);
    const ancestorB = this.find(b);
    const { ancestor, rank } = this;
    const rankA = rank[ancestorA],
      rankB = rank[ancestorB];
    if (rankA < rankB) ancestor[ancestorA] = ancestorB;
    else {
      ancestor[ancestorB] = ancestorA;
      if (rankA === rankB) rank[ancestorA] += 1;
    }
  }
}

function findRedundantDirectedConnection(edges: number[][]): number[] {
  const length = edges.length + 1;
  const parents = Array.from(
    {
      length,
    },
    (_, i) => i
  );
  const uf = new UnionFind(length);
  let conflict = -1;
  let cycle = -1;
  for (let [i, [u, v]] of edges.entries()) {
    if (parents[v] !== v) conflict = i;
    else {
      parents[v] = u;
      if (uf.find(u) === uf.find(v)) cycle = i;
      else uf.union(u, v);
    }
  }
  if (conflict < 0) {
    return edges[cycle];
  }
  const edgeConflict = edges[conflict];
  return cycle < 0 ? edgeConflict : [parents[edgeConflict[1]], edgeConflict[1]];
}
