/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/**
 * 双向链表节点
 */
class DLinkedNode {
  prev?: DLinkedNode;
  next?: DLinkedNode;
  value?: number;
  key?: number;
  constructor(key?: number, value?: number) {
    this.key = key;
    this.value = value;
  }
  remove() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    return this;
  }
  insertAfter(node: DLinkedNode) {
    node.prev = this;
    node.next = this.next;
    this.next?.prev && (this.next.prev = node);
    this.next = node;
    return this;
  }
}

class LRUCache {
  private capacity: number;
  /**
   * 链表节点HASH表
   */
  private nodeMap = new Map<number, DLinkedNode>();
  private headNode = new DLinkedNode();
  private tailNode = new DLinkedNode();
  private size = 0;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.headNode.next = this.tailNode;
    this.tailNode.prev = this.headNode;
  }
  private get isFull() {
    return this.size >= this.capacity;
  }

  private removeTail() {
    if (!this.size) return;
    this.nodeMap.delete(this.tailNode.prev!.key!);
    this.tailNode.prev?.remove();
  }

  private insert(key: number, value?: number) {
    const targetNode = this.nodeMap.get(key);
    if (targetNode) {
      value && (targetNode.value = value);
      this.headNode.insertAfter(targetNode.remove());
      return;
    }
    if (this.isFull) {
      this.removeTail();
    } else {
      this.size += 1;
    }
    const newNode = new DLinkedNode(key, value);
    this.nodeMap.set(key, newNode);
    this.headNode.insertAfter(newNode);
  }
  get(key: number): number {
    const targetNode = this.nodeMap.get(key);
    if (!targetNode) return -1;
    this.insert(targetNode.key!);
    return targetNode.value!;
  }

  put(key: number, value: number): void {
    this.insert(key, value);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));
cache.put(3, 3);
console.log(cache.get(2));

cache.put(4, 4);
console.log(cache.get(1));
console.log(cache.get(3));
console.log(cache.get(4));

export {};
