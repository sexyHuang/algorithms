import DLinkedNode from './dataStructure/DLinkedNode.ts';
class LRUCache {
  capacity: number;
  head: DLinkedNode = new DLinkedNode();
  tail: DLinkedNode = new DLinkedNode();
  size: number = 0;
  cache: { [key: number]: DLinkedNode } = {};
  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  get(key: number): number {
    const node = this.cache[key];
    if (!node) return -1;
    this.moveToHead(node);
    return node.value!;
  }
  put(key: number, value: number): void {
    let node = this.cache[key];
    if (node) {
      this.moveToHead(node);
    } else {
      node = new DLinkedNode(key, value);
      this.addToHead(node);
      this.cache[key] = node;
      if (this.size >= this.capacity) {
        const dNode = this.removeTail();
        delete this.cache[dNode!.key!];
      } else this.size++;
    }
  }

  private addToHead(node: DLinkedNode) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }
  private removeNode(node: DLinkedNode) {
    node.next!.prev = node.prev;
    node.prev!.next = node.next;
  }
  private removeTail() {
    const tail = this.tail.prev;
    this.removeNode(tail!);
    return tail;
  }
  private moveToHead(node: DLinkedNode) {
    this.removeNode(node);
    this.addToHead(node);
  }
}

const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(2)); //返回 1
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log(cache.get(1)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回  3
console.log(cache.get(4));
