export default class DLinkedNode {
  prev?: DLinkedNode;
  next?: DLinkedNode;
  value?: number;
  key?: number;
  constructor(key?: number, value?: number) {
    this.value = value;
    this.key = key;
  }
}
