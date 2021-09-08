/*
 * @lc app=leetcode.cn id=437 lang=typescript
 *
 * [437] 路径总和 III
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

function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;
  const count = (root: TreeNode | null, targetSum: number): number => {
    if (!root) return 0;
    return (
      (root.val === targetSum ? 1 : 0) +
      count(root.left, targetSum - root.val) +
      count(root.right, targetSum - root.val)
    );
  };
  return (
    count(root, targetSum) +
    pathSum(root?.left ?? null, targetSum) +
    pathSum(root?.right ?? null, targetSum)
  );
}
// @lc code=end
const tree = new TreeNode(
  10,
  new TreeNode(
    5,
    new TreeNode(3, new TreeNode(3), new TreeNode(-2)),
    new TreeNode(2, null, new TreeNode(1))
  ),
  new TreeNode(-3, null, new TreeNode(11))
);

console.log(pathSum(tree, 8));
