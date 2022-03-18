/*
 * @lc app=leetcode.cn id=61 lang=typescript
 *
 * [61] 旋转链表
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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head) return head;
  const fHead = new ListNode();
  fHead.next = head;

  let length = 0;
  let curr = fHead.next;
  while (curr) {
    length += 1;
    curr = curr.next!;
  }
  k = k % length;
  if (!k) return fHead.next;
  let slowPointer = fHead.next,
    fastPointer = fHead.next;

  while (k > 0) {
    fastPointer = fastPointer.next!;
    k -= 1;
  }
  while (fastPointer.next) {
    slowPointer = slowPointer.next!;
    fastPointer = fastPointer.next!;
  }
  const next = fHead.next;
  fHead.next = slowPointer.next;
  slowPointer.next = null;
  fastPointer.next = next;
  return fHead.next;
}
// @lc code=end
