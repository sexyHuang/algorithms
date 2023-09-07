import TreeNode from './dataStructure/TreeNode';
/*
 * @lc app=leetcode.cn id=144 lang=typescript
 *
 * [144] 二叉树的前序遍历
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

function preorderTraversal(root: TreeNode | null): number[] {
  let node = root;
  const queue: TreeNode[] = [];
  const res: number[] = [];
  while (queue.length || node) {
    while (node) {
      res.push(node.val);
      queue.push(node);
      node = node.left;
    }
    node = queue.pop()!.right ?? null;
  }
  return res;
}
// @lc code=end
