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

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return root;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift()!;
    [node.right, node.left] = [node.left, node.right];
    node.right && queue.push(node.right);
    node.left && queue.push(node.left);
  }
  return root;
}

class MNode {
  val: number;
  left: MNode | null;
  right: MNode | null;
  next: MNode | null;
  constructor(val?: number, left?: MNode, right?: MNode, next?: MNode) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}
function connect(root: MNode | null): MNode | null {
  let head = root;
  while (head?.left) {
    let d = new MNode();
    let curr: MNode | null = head;
    while (curr?.left) {
      d.next = curr.left;
      curr.left.next = curr.right!;
      d = curr.right!;
      curr = curr.next;
    }
    head = head.left;
  }
  return root;
}
const root = new MNode(
  1,
  new MNode(2, new MNode(4), new MNode(5)),
  new MNode(3, new MNode(6), new MNode(7))
);
console.log(connect(root));
