/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
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

function reverseList(head: ListNode | null): ListNode | null {
  const HEAD = new ListNode();

  let tail = head;

  while (tail) {
    const curr = HEAD.next;
    HEAD.next = tail;
    tail = tail.next;
    HEAD.next.next = curr;
  }
  return HEAD.next;
}
// @lc code=end
