/*
 * @lc app=leetcode.cn id=328 lang=typescript
 *
 * [328] 奇偶链表
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

function oddEvenList(head: ListNode | null): ListNode | null {
  const oddHead = new ListNode();
  let oddTail = oddHead;
  const evenHead = new ListNode();
  let evenTail = evenHead;
  let idx = 0;
  while (head) {
    if (idx % 2) {
      oddTail.next = head;
      oddTail = oddTail.next;
    } else {
      evenTail.next = head;
      evenTail = evenTail.next;
    }
    head = head.next;
    idx += 1;
  }
  oddTail.next = evenHead.next;
  evenTail.next = null;
  return oddHead.next;
}
// @lc code=end
