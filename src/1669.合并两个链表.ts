/*
 * @lc app=leetcode.cn id=1669 lang=typescript
 *
 * [1669] 合并两个链表
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

function mergeInBetween(
  list1: ListNode | null,
  a: number,
  b: number,
  list2: ListNode | null
): ListNode | null {
  if (!list1) return list2;

  let d = b - a + 2;
  let slowPointer = list1,
    fastPointer = list1;
  while (d > 0) {
    d -= 1;
    fastPointer = fastPointer.next!;
  }

  while (a > 1) {
    a -= 1;
    fastPointer = fastPointer.next!;
    slowPointer = slowPointer.next!;
  }
  slowPointer.next = list2;
  while (slowPointer.next) {
    slowPointer = slowPointer.next;
  }
  slowPointer.next = fastPointer;
  return list1;
}
// @lc code=end
