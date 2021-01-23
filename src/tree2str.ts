import TreeNode from './dataStructure/TreeNode';

function tree2str(t: TreeNode | null): string {
  const bfs = (root: TreeNode | null): string => {
    if (!root) return '';
    const { val, left, right } = root;
    const leftStr = bfs(left);
    const rightStr = bfs(right);
    return `${val}${rightStr || leftStr ? `(${leftStr})` : ''}${
      rightStr ? `(${rightStr})` : ''
    }`;
  };
  return bfs(t);
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3));

console.log(tree2str(root));
