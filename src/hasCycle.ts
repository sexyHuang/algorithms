import ListNode from './dataStructure/ListNode';

const hasCycle = (head: ListNode) => {
  let slow: ListNode | null = head;
  let fast = head.next?.next ?? null;
  while (slow && fast) {
    if (slow === fast) return true;
    slow = slow.next ?? null;
    fast = fast.next?.next ?? null;
  }
  return false;
};

function detectCycle(head: ListNode | null): ListNode | null {
  const vSet = new Set<ListNode>();
  let pointer = head;
  while (pointer?.next) {
    if (vSet.has(pointer.next)) return pointer.next;
    vSet.add(pointer.next);
    pointer = pointer.next;
  }
  return null;
}

function detectCycle2(head: ListNode | null): ListNode | null {
  let slow = head?.next ?? null,
    fast = head?.next?.next ?? null,
    target = head;
  while (fast) {
    if (fast === slow) {
      break;
    }
    slow = slow!.next!;
    fast = fast.next?.next ?? null;
  }
  if (!fast) return null;
  while (target !== slow) {
    target = target!.next;
    slow = slow!.next;
  }
  return target;
}
const node = new ListNode(2);
const head = new ListNode(3, node);
node.next = new ListNode(0, new ListNode(4, node));

console.log(detectCycle2(head));
