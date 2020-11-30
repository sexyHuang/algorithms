/**
前序中左起第一位1肯定是根结点，我们可以据此找到中序中根结点的位置rootin；
中序中根结点左边就是左子树结点，右边就是右子树结点，即[左子树结点，根结点，右子树结点]，我们就可以得出左子树结点个数为int left = rootin - leftin;；
前序中结点分布应该是：[根结点，左子树结点，右子树结点]；
根据前一步确定的左子树个数，可以确定前序中左子树结点和右子树结点的范围；
如果我们要前序遍历生成二叉树的话，下一层递归应该是：
左子树：root->left = pre_order(前序左子树范围，中序左子树范围，前序序列，中序序列);；
右子树：root->right = pre_order(前序右子树范围，中序右子树范围，前序序列，中序序列);。
每一层递归都要返回当前根结点root；
 */

import TreeNode from "./TreeNode.ts";

type BuildTree = (preorder: number[], inorder: number[]) => TreeNode | null;

export const buildTree: BuildTree = (preorder, inorder) => {
  if (!preorder.length || !inorder.length) return null;
  const rootValue = preorder.shift();

  const rootIndex = inorder.indexOf(rootValue!);

  const [l_inorder, r_inorder] = inorder.reduce(
    (prev: [number[], number[]], curr, currIdx) => {
      if (currIdx > rootIndex) prev[1].push(curr);
      else if (currIdx < rootIndex) prev[0].push(curr);
      return prev;
    },
    [[], []]
  );

  return new TreeNode(
    rootValue!,
    buildTree(preorder, l_inorder),
    buildTree(preorder, r_inorder)
  );
};

export function buildTree2(
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  let rootIdx = 0;

  function _buildTree(leftIdx: number, rightIdx: number): TreeNode | null {
    if (leftIdx === rightIdx) return null;
    const rootValue = preorder[rootIdx++];
    let splitIdx = -1;
    for (let i = leftIdx; i < rightIdx; i++) {
      if (inorder[i] === rootValue) splitIdx = i;
    }
    if (splitIdx >= 0) console.log(splitIdx);
    return new TreeNode(
      rootValue,
      _buildTree(leftIdx, splitIdx),
      _buildTree(splitIdx + 1, rightIdx)
    );
  }

  return _buildTree(0, preorder.length);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  const dfs = (p: TreeNode | null, q: TreeNode | null): boolean => {
    if (!p && !q) return true;
    if (p?.val === q?.val)
      return dfs(p!.left, q!.left) && dfs(p!.right, q!.right);
    else return false;
  };
  return dfs(p, q);
}
