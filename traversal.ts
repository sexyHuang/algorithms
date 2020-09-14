import TreeNode from './TreeNode.ts';
//中序
function inorderTraversal(root: TreeNode | null): number[] {
  const queue: TreeNode[] = [];
  let node = root;
  const result: number[] = [];
  while (queue.length || node) {
    // 先将所有主节点入栈
    while (node) {
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      node = queue.pop()!;
      result.push(node.val);
      node = node.right;
    }
  }
  return result;
}

//bfs
function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: TreeNode[] = [root];
  const result: number[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return result;
}

//dfs
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: TreeNode[] = [root];

  const result: number[] = [];
  while (queue.length) {
    const node = queue.pop()!;
    result.unshift(node.val);

    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return result;
}

class BSTIterator {
  private queue: TreeNode[] = [];
  constructor(root: TreeNode | null) {
    this.queueLeft(root);
  }
  private queueLeft(root: TreeNode | null) {
    let node = root;
    const { queue } = this;
    while (node) {
      queue.push(node);
      node = node.left;
    }
  }
  next(): number {
    const { queue } = this;
    if (!this.hasNext()) throw Error('no next');
    const node = queue.pop()!;
    this.queueLeft(node.right);
    return node.val;
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }
}

const root = new TreeNode(
  7,
  new TreeNode(3),
  new TreeNode(15, new TreeNode(9), new TreeNode(20))
);
