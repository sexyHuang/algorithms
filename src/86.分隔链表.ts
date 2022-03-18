/*
 * @lc app=leetcode.cn id=86 lang=typescript
 *
 * [86] 分隔链表
 */

import ListNode from './dataStructure/ListNode';

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

function partition(head: ListNode | null, x: number): ListNode | null {
  const sHead = new ListNode();
  let sTail = sHead;
  const lHead = new ListNode();
  let lTail = lHead;
  while (head) {
    if (head.val < x) {
      sTail.next = head;
      sTail = sTail.next;
    } else {
      lTail.next = head;
      lTail = lTail.next;
    }
    head = head.next;
  }
  sTail.next = lHead.next;
  lTail.next = null;
  return sHead.next;
}
// @lc code=end
