/*
 * @lc app=leetcode.cn id=1721 lang=typescript
 *
 * [1721] 交换链表中的节点
 */

import ListNode, { genListNode } from './dataStructure/ListNode';

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapNodes(head: ListNode | null, k: number): ListNode | null {
  const sentinel = new ListNode();
  sentinel.next = head;
  let prev = sentinel;
  let i = 0;
  while (prev.next && i++ < k - 1) {
    prev = prev.next;
  }
  let tailPointer = prev.next;
  let prev2 = sentinel;
  while (tailPointer?.next) {
    tailPointer = tailPointer.next;
    prev2 = prev2.next!;
  }
  if (prev === prev2) return head;
  const t1 = prev.next!;
  const t2 = prev2.next!;
  prev.next = t2;
  const next = t2.next;
  t2.next = t1.next;
  prev2.next = t1;
  t1.next = next;

  return sentinel.next;
}
// @lc code=end

const head = genListNode([7, 9, 6, 6, 7, 8, 3, 0, 9, 5]);

console.log(swapNodes(head, 5));
