import TreeNode from './TreeNode.ts';
import ListNode from './ListNode.ts';

function sortedListToBST(head: ListNode | null): TreeNode | null {
  const dfs = (
    head: ListNode | null,
    end: ListNode | null = null
  ): TreeNode | null => {
    let fast = head,
      slow = head;
    if (head === end) return null;
    while (fast?.next?.next && fast.next.next !== end) {
      console.log(fast);
      fast = fast?.next?.next ?? null;
      slow = slow?.next! ?? null;
    }
    console.log(slow);
    const rightHead = slow?.next || null;
    slow && (slow.next = null);
    const leftNode = dfs(head, slow);
    const rightNode = dfs(rightHead, end);
    return slow ? new TreeNode(slow.val, leftNode, rightNode) : null;
  };
  return dfs(head);
}

const createListNode = (arr: number[]) => {
  const head = new ListNode();
  arr.reduce((prev, curr) => {
    const next = new ListNode(curr);
    prev.next = next;
    return next;
  }, head);
  return head.next;
};

const head = createListNode([-10, -3, 0, 5, 9]);
const tree = sortedListToBST(head);
console.log(tree);
