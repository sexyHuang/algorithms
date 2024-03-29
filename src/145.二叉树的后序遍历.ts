import { buildTree } from './buildTree';
import TreeNode from './dataStructure/TreeNode';

/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
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

function postorderTraversal(root: TreeNode | null): number[] {
  let node = root;
  const queue: TreeNode[] = [];
  const res: number[] = [];
  let prev: TreeNode | null;
  while (queue.length || node) {
    while (node) {
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      node = queue.pop()!;
      if (node.right && node.right != prev!) {
        queue.push(node);
        node = node.right;
      } else {
        res.push(node.val);
        prev = node;
        node = null;
      }
    }
  }
  return res;
}

// @lc code=end

const root = buildTree([1, 2, 4, 5, 3, 6], [4, 2, 5, 1, 6, 3]);

console.log(postorderTraversal(root));
debugger;
