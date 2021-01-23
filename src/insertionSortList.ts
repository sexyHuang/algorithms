import ListNode from './dataStructure/ListNode';

const insertBehind = (head: ListNode, target: ListNode) => {
  [head.next, target.next] = [target, head.next];
};

const deleteBehind = (head: ListNode) => {
  const res = head.next;
  head.next = head.next?.next ?? null;
  res && (res.next = null);
  return res;
};

function insertionSortList(head: ListNode | null): ListNode | null {
  const _head = new ListNode(-Infinity, head);
  let next = _head;
  while (next?.next) {
    console.log(next);
    const targetNode = deleteBehind(next)!;
    let insertedNode = _head;
    while (insertedNode.next!.val < targetNode.val && insertedNode !== next) {
      insertedNode = insertedNode.next!;
    }
    insertBehind(insertedNode, targetNode);
    if (insertedNode === next) next = next.next;
  }
  return _head.next;
}

const head = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));

insertionSortList(head);
