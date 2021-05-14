/*
 * @lc app=leetcode.cn id=450 lang=typescript
 *
 * [450] 删除二叉搜索树中的节点
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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return root;
  const head = new TreeNode();
  let prev = head;
  let target: TreeNode | null = root;
  prev.left = target;
  while (target) {
    if (target.val === key) break;
    if (target.val > key) {
      prev = target;
      target = target.left;
    } else {
      prev = target;
      target = target.right;
    }
  }
  const head2 = new TreeNode();
  head.left = target?.right ?? null;
  let node = head2;
  while (node.left) node = node.left;

  node.left = target?.left ?? null;
  if (prev.left?.val === target?.val) {
    prev.left = node.left;
  } else {
    prev.right = node.left;
  }
  return head.left;
}
// @lc code=end
