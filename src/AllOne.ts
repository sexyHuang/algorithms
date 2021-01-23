class DlistNodeWithSet {
  set: Set<string>;
  pre?: DlistNodeWithSet;
  next?: DlistNodeWithSet;
  val: number;
  constructor(value: number, pre?: DlistNodeWithSet, next?: DlistNodeWithSet) {
    this.val = value;
    this.pre = pre;
    this.next = next;
    this.set = new Set();
  }
  insertBebind(node: DlistNodeWithSet) {
    const { next } = this;
    node.pre = this;
    node.next = next;
    this.next = node;
    if (next) {
      next.pre = node;
    }
    return node;
  }
  insertBefore(node: DlistNodeWithSet) {
    const { pre } = this;
    node.next = this;
    node.pre = pre;
    this.pre = node;
    if (pre) pre.next = node;
    return node;
  }
  delete() {
    const { next, pre } = this;
    if (next) next.pre = pre;
    if (pre) pre.next = next;
  }
}
class AllOne {
  private head: DlistNodeWithSet = new DlistNodeWithSet(0);
  private tail: DlistNodeWithSet = new DlistNodeWithSet(Infinity);
  private map: Map<string, DlistNodeWithSet>;
  constructor() {
    this.head.next = this.tail;
    this.tail.pre = this.head;
    this.map = new Map<string, DlistNodeWithSet>();
  }
  private initKey(key: string) {
    const { head, map } = this;
    if (head.next!.val > 1) {
      head.insertBebind(new DlistNodeWithSet(1));
    }
    head.next!.set.add(key);
    map.set(key, head.next!);
  }
  inc(key: string) {
    const { map } = this;
    if (!map.has(key)) return this.initKey(key);
    const node = map.get(key)!;
    node.set.delete(key);
    if (node.next!.val === node.val + 1) {
      node.next?.set.add(key);
      map.set(key, node.next!);
    } else {
      const newNode = new DlistNodeWithSet(node.val + 1);
      newNode.set.add(key);
      map.set(key, node.insertBebind(newNode));
    }
    if (!node.set.size) node.delete();
  }
  dec(key: string) {
    const { map } = this;
    if (!map.has(key)) return;
    const node = map.get(key)!;
    node.set.delete(key);
    if (node.val === 1) {
      map.delete(key);
    } else if (node.pre!.val === node.val - 1) {
      node.pre?.set.add(key);
      map.set(key, node.pre!);
    } else {
      const newNode = new DlistNodeWithSet(node.val - 1);
      newNode.set.add(key);
      map.set(key, node.insertBefore(newNode));
    }
    if (!node.set.size) node.delete();
  }
  getMaxKey(): string {
    const [key = ''] = this.tail.pre!.set;
    return key;
  }

  getMinKey(): string {
    const [key = ''] = this.head.next!.set;
    return key;
  }
}

const alList = new AllOne();
alList.inc('hello');
alList.inc('hello');
console.log(alList.getMaxKey(), alList.getMinKey());
alList.inc('leet');
console.log(alList.getMaxKey(), alList.getMinKey());
alList.dec('leet');

console.log(alList.getMaxKey(), alList.getMinKey());
alList.dec('hello');
alList.dec('hello');
console.log(alList.getMaxKey(), alList.getMinKey());

export default {};
