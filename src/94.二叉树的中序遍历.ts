import TreeNode from './dataStructure/TreeNode';
/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
 */

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

function inorderTraversal(root: TreeNode | null): number[] {
  const queue: TreeNode[] = [];
  let node = root;

  const res = [];
  while (queue.length || node) {
    while (node) {
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      node = queue.pop()!;
      res.push(node.val);
      node = node.right;
    }
  }
  return res;
}
// @lc code=end

export {};
