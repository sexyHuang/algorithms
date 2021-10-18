/*
 * @lc app=leetcode.cn id=113 lang=typescript
 *
 * [113] 路径总和 II
 */
import TreeNode, { genTreeFromHeap } from './dataStructure/TreeNode';
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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const pathArr: number[] = [];
  const res: number[][] = [];
  const dfs = (node: TreeNode | null, targetSum: number) => {
    if (!node) return;
    if (targetSum === node.val && !node.left && !node.right) {
      res.push([...pathArr, node.val]);
    }
    pathArr.push(node.val);
    dfs(node.left, targetSum - node.val);
    dfs(node.right, targetSum - node.val);
    pathArr.pop();
  };
  dfs(root, targetSum);
  return res;
}
// @lc code=end

const root = genTreeFromHeap([1, -2, -3, 1, 3, -2, null, -1]);
console.log(pathSum(root, -1));

export default {};
