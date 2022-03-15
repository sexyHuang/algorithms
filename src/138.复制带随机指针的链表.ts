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
    const next = curr.next!.next;

    curr = next;
  }

  const cloneHead = new Node();
  let cloneCurr = cloneHead;
  curr = head;
  while (curr) {
    cloneCurr.next = curr.next!;
    cloneCurr = cloneCurr.next;
    curr.next = curr.next!.next;
  }
  return cloneHead.next;
}
// @lc code=end

export {};
