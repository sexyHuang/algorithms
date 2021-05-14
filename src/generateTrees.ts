import TreeNode from './dataStructure/TreeNode';

function generateTrees(n: number): Array<TreeNode | null> {
  const dfs = (start: number, end: number): (TreeNode | null)[] => {
    const allTrees: TreeNode[] = [];
    for (let i = start; i <= end; i++) {
      const leftTrees = dfs(start, i - 1);
      const rightTrees = dfs(i + 1, end);
      for (let leftTree of leftTrees) {
        for (let rightTree of rightTrees) {
          const node = new TreeNode(i);
          node.left = leftTree;
          node.right = rightTree;
          allTrees.push(node);
        }
      }
    }

    return allTrees.length ? allTrees : [null];
  };
  return n ? dfs(1, n) : [];
}

console.log(generateTrees(0));
