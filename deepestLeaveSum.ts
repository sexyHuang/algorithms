class TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  constructor(val?: number, left?: TreeNode, right?: TreeNode) {
    this.val = val === undefined ? 0 : val;
    this.left = left;
    this.right = right;
  }
}

function deepestLeavesSum(root: TreeNode | null): number {
  let maxDeep = 0,
    sum = 0;
  const dfs = (node: TreeNode, deep: number) => {
    if (!node.left && !node.right) {
      if (maxDeep === deep) sum += node.val;
      else if (maxDeep < deep) {
        sum = node.val;
        maxDeep = deep;
      }
      return;
    }
    node.left && dfs(node.left, deep + 1);
    node.right && dfs(node.right, deep + 1);
  };
  root && dfs(root, 0);
  return sum;
} 

function isBalanced(root?: TreeNode): boolean {
  let res = true;
  const dfs = (node?: TreeNode): number => {
    if (node) {
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);
      res = res && Math.abs(leftDepth - rightDepth) <= 1;
      return Math.max(leftDepth, rightDepth) + 1;
    }
    return 1;
  };
  dfs(root);
  return res;
}
const root: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: { val: 4 },
      right: { val: 4 },
    },
    right: {
      val: 3,
    },
  },
  right: {
    val: 2,
  },
};

console.log(isBalanced(root));
