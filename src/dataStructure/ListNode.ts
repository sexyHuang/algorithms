export default class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export class DListNode<T extends any> {
  val?: T;
  pre?: DListNode<T>;
  next?: DListNode<T>;
  constructor(val?: T, pre?: DListNode<T>, next?: DListNode<T>) {
    this.val = val;
    this.pre = pre;
    this.next = next;
  }
}
