/*
 * @lc app=leetcode.cn id=101 lang=typescript
 *
 * [101] 对称二叉树
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

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;
  const isMirror = (
    node1: TreeNode | null,
    node2: TreeNode | null
  ): boolean => {
    if (!node1 || !node2) return !node1 && !node2;
    return (
      node1.val === node2.val &&
      isMirror(node1.left, node2.right) &&
      isMirror(node1.right, node2.left)
    );
  };
  return isMirror(root.left, root.right);
}

function isSymmetric2(root: TreeNode | null): boolean {
  if (!root) return true;
  const queue: (TreeNode | null)[] = [root];

  while (true) {
    const length = queue.length;
    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      if (i < length / 2 && node !== queue[length - 1 - i]) return false;

      queue.push(node?.left ?? null);
      queue.push(node?.right ?? null);
    }
    if (queue.every(node => !node)) return true;
  }
}
// @lc code=end
