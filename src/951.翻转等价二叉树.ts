/*
 * @lc app=leetcode.cn id=951 lang=typescript
 *
 * [951] 翻转等价二叉树
 */
import TreeNode from './dataStructure/TreeNode';

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function flipEquiv(root1: TreeNode | null, root2: TreeNode | null): boolean {
  if (!root1 || !root2) return !root1 && !root2;
  if (root1.val !== root2.val) return false;
  return (
    (flipEquiv(root1.left, root2.left) &&
      flipEquiv(root1.right, root2.right)) ||
    (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  );
}
// @lc code=end
