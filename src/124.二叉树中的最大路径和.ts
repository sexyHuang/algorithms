import TreeNode from './dataStructure/TreeNode';

/*
 * @lc app=leetcode.cn id=124 lang=typescript
 *
 * [124] 二叉树中的最大路径和
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

function maxPathSum(root: TreeNode | null): number {
  let max = -Infinity;
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const maxLeft = dfs(node.left);
    const maxRight = dfs(node.right);
    max = Math.max(max, node.val + maxLeft + maxRight);
    return Math.max(0, node.val + maxLeft, node.val + maxRight);
  }
  dfs(root);
  return max;
}
// @lc code=end

export {};
