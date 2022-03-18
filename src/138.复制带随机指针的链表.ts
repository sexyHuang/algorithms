/*
 * @lc app=leetcode.cn id=138 lang=typescript
 *
 * [138] 复制带随机指针的链表
 */

class Node {
  val: number;
  next: Node | null;
  random: Node | null;
  constructor(val?: number, next?: Node, random?: Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}
// @lc code=start

function copyRandomList(head: Node | null): Node | null {
  let curr = head;

  while (curr) {
    const { next } = curr;
    const cloneNode = new Node(curr.val);
    curr.next = cloneNode;
    cloneNode.next = next;
    curr = next;
  }
  curr = head;

  while (curr) {
    const { random } = curr;
    if (random) {
      curr.next!.random = random!.next;
    }

    curr = curr.next!.next;
  }

  curr = head;
  const cloneHead = head?.next ?? null;
  while (curr) {
    const cloneNode = curr.next!;
    curr.next = curr.next!.next;
    curr = curr.next;
    cloneNode.next = curr?.next ?? null;
  }
  return cloneHead;
}
// @lc code=end

export {};
