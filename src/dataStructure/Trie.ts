type Next = Array<Trie | undefined>;
const CHAR_CODE_A = 'a'.charCodeAt(0);
export default class Trie {
  next: Next;
  isWord: boolean;
  constructor() {
    this.next = [];
    this.isWord = false;
  }
  insert(word: string) {
    let currPos = this as Trie;
    for (let i = word.length - 1; i >= 0; i--) {
      const charIdx = word.charCodeAt(i) - CHAR_CODE_A;
      if (!currPos.next[charIdx]) {
        currPos.next[charIdx] = new Trie();
      }
      currPos = currPos.next[charIdx]!;
    }
    currPos.isWord = true;
  }
}
