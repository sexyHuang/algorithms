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

export function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const quene = [
    {
      node: root,
      depth: 1
    }
  ];
  while (quene.length) {
    const { node, depth } = quene.shift()!;
    if (!node.left && !node.right) return depth;
    node.left &&
      quene.push({
        node: node.left,
        depth: depth + 1
      });
    node.right &&
      quene.push({
        node: node.right,
        depth: depth + 1
      });
  }
  return 1;
}

export function invertTree(root: TreeNode | null): TreeNode | null {
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
export function connect(root: MNode | null): MNode | null {
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

export function genTreeFromHeap(heap: (number | null)[]) {
  const nodeList: (TreeNode | null)[] = [];

  for (let [i, val] of heap.entries()) {
    if (val === null) continue;
    const node = new TreeNode(val);
    nodeList[i] = node;
    const parentNode = nodeList[Math.floor((i - 1) / 2)];
    if (!parentNode) continue;

    if (i % 2) {
      parentNode!.left = node;
    } else {
      parentNode!.right = node;
    }
  }
  return nodeList[0]!;
}
