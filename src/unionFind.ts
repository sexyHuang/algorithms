export class Node<T = number> {
  parent: Node<T>;
  rank: number = 0;
  data: T;
  constructor(data: T) {
    this.parent = this;
    this.data = data;
  }
}

export default class UnionFind<T> {
  map = new Map<T, Node<T>>();
  makeSet(data: T) {
    this.map.set(data, new Node(data));
  }
  getParent(node: Node<T>) {
    if (node.parent !== node) node.parent = this.getParent(node.parent);
    return node.parent;
  }
  union(pX: Node<T>, pY: Node<T>) {
    if (pX === pY) return;
    if (pX.rank < pY.rank) {
      pX.parent = pY;
    } else {
      pY.parent = pX;
      if (pX.rank === pY.rank) pX.rank += 1;
    }
  }
}
