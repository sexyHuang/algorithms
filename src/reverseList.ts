import ListNode from './dataStructure/ListNode';

function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let curr = head;
  while (curr) {
    [curr.next, curr, prev] = [prev, curr.next, curr];
  }
  return prev;
}

function reverseList2(head: ListNode | null): ListNode | null {
  const reverse = (
    curr: ListNode | null,
    prev: ListNode | null = null
  ): ListNode | null => {
    if (!curr) return prev;
    const next = curr.next;
    curr.next = prev;
    return reverse(next, curr);
  };
  return reverse(head);
}
const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

console.log(reverseList2(head));
