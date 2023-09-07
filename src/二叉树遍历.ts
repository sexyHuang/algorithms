import ListNode from './dataStructure/ListNode';
import TreeNode from './dataStructure/TreeNode';

/**
 * 三种顺序迭代的入栈顺序都是相同的，都是先把root的所有最左侧节点入栈，再用栈顶节点的右节点作为新的root节点进行下一轮入栈迭代；
 * 不同的是出栈的时机和节点取值的时机
 * 前序遍历：节点在开始遍历其右节点树前出栈，在入栈时取值；
 * 中序遍历：节点在开始遍历其右节点树前出栈，在出栈时取值；
 * 后序遍历：节点在结束遍历其右节点树后出栈，在出栈时取值。
 */

/**
 * 中序遍历-迭代
 * @param root
 * @returns
 */
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
/**
 * 中序遍历-递归
 * @param root
 * @returns
 */
function inorderTraversalV2(root: TreeNode | null): number[] {
  const res: number[] = [];
  const dfs = (root: TreeNode | null) => {
    if (!root) return;
    dfs(root.left);
    res.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  return res;
}

/**
 * 中序-morris遍历
 * @param root
 * @returns
 */
function inorderTraversalMorris(root: TreeNode | null): number[] {
  let x = root;
  const res = [];
  while (x) {
    if (!x.left) {
      res.push(x.val);

      x = x.right;
      continue;
    }
    let p = x.left;
    while (p.right && p.right !== x) {
      p = p.right;
    }
    if (!p.right) {
      p.right = x;
      x = x.left;
    } else {
      res.push(x.val);
      p.right = null;
      x = x.right;
    }
  }
  return res;
}

//bfs
function preorderTraversal(root: TreeNode | null): number[] {
  const queue: TreeNode[] = [];
  const res: number[] = [];
  let node = root;
  while (node || queue.length) {
    while (node) {
      res.push(node.val);
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      node = queue.pop()!.right || null;
    }
  }
  return res;
}

function preorderTraversalV2(root: TreeNode | null): number[] {
  const res: number[] = [];
  const bfs = (root: TreeNode | null) => {
    if (!root) return;
    res.push(root.val);
    bfs(root.left);
    bfs(root.right);
  };
  bfs(root);
  return res;
}

function preorderTraversalMorris(root: TreeNode | null): number[] {
  let x = root;
  const res = [];
  while (x) {
    if (!x.left) {
      res.push(x.val);
      x = x.right;
      continue;
    }
    let p = x.left;
    while (p.right && p.right !== x) {
      p = p.right;
    }
    if (!p.right) {
      res.push(x.val);
      p.right = x;
      x = x.left;
    } else {
      p.right = null;
      x = x.right;
    }
  }
  return res;
}

//dfs
function postorderTraversal(root: TreeNode | null): number[] {
  let node = root;
  const queue: TreeNode[] = [];
  const res: number[] = [];
  let prev: TreeNode | null;
  while (queue.length || node) {
    //把所有主节点入栈
    while (node) {
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      // 推出栈顶节点
      node = queue.pop()!;
      // 当前节点如果有未遍历的右节点
      if (node.right && node.right != prev!) {
        // 栈顶节点重新入栈
        queue.push(node);
        // 以右节点作为子树的根节点继续下一轮迭代
        node = node.right;
      }
      // 否则
      else {
        // 组织返回结果
        res.push(node.val);
        // 记录为已遍历，因为栈中只会用到上次的已遍历节点，所以用一个常量记录即可
        prev = node;
        node = null;
      }
    }
  }
  return res;
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

function getMinimumDifference(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let node = root;

  while (queue.length || node) {
    while (node) {
      queue.push(node);
      node = node.left;
    }
    if (queue.length) {
      node = queue.pop()!;
      // console.log(node.val);

      node = node.right;
    }
  }
  return 0;

  //return min;
}

const root = new TreeNode(
  6,
  new TreeNode(
    2,
    new TreeNode(0),
    new TreeNode(4, new TreeNode(2), new TreeNode(6))
  ),
  new TreeNode(8, new TreeNode(7), new TreeNode(9))
);

console.log(getMinimumDifference(root));

function swapPairs(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = new ListNode();
  prev.next = head;
  while (prev?.next?.next) {
    const nodeA: ListNode = prev.next;
    const nodeB: ListNode = prev.next.next!;
    prev.next = nodeB;
    nodeA.next = nodeB.next;
    nodeB.next = nodeA;
    prev = prev.next!.next;
  }
  return head;
}
