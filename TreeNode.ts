export default class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const quene = [
    {
      node: root,
      depth: 1,
    },
  ];
  while (quene.length) {
    const { node, depth } = quene.shift()!;
    if (!node.left && !node.right) return depth;
    node.left &&
      quene.push({
        node: node.left,
        depth: depth + 1,
      });
    node.right &&
      quene.push({
        node: node.right,
        depth: depth + 1,
      });
  }
  return 1;
}
