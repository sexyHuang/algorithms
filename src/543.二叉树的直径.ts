/*
 * @lc app=leetcode.cn id=543 lang=typescript
 *
 * [543] 二叉树的直径
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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let res = 0;
  function dfs(u: TreeNode): number {
    const L = u.left ? dfs(u.left) + 1 : 0;
    const R = u.right ? dfs(u.right) + 1 : 0;
    const max_path = L + R;
    res = Math.max(res, max_path);
    return L > R ? L : R;
  }
  if (root) dfs(root);
  return res;
}
// @lc code=end

export default {};
