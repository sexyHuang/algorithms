type Next = Array<Trie | undefined>;
const CHAR_CODE_A = 'a'.charCodeAt(0);
class Trie {
  next: Next;
  isWord: boolean;
  id?: number;
  constructor() {
    this.next = [];
    this.isWord = false;
  }
  insert(word: string, id: number) {
    let currPos = this as Trie;
    for (let i = 0; i < word.length; i++) {
      const charIdx = word.charCodeAt(i) - CHAR_CODE_A;
      if (!currPos.next[charIdx]) {
        currPos.next[charIdx] = new Trie();
      }
      currPos = currPos.next[charIdx]!;
    }
    currPos.isWord = true;
    currPos.id = id;
  }
}
const isPalidrome = (word: string, left: number, right: number) => {
  let i = 0;
  while (left - right + 2 * i++ < 0) {
    if (word[left + i] !== word[right - i]) return false;
  }
  return true;
};

const findWord = (trie: Trie, word: string, left: number, right: number) => {
  let currPos = trie;
  for (let i = right; i >= left; i--) {
    const charIdx = word.charCodeAt(i) - CHAR_CODE_A;
    if (!currPos.next[charIdx]) return -1;
    else currPos = currPos.next[charIdx]!;
  }
  return currPos.id ?? -1;
};

function palindromePairs(words: string[]): number[][] {
  const trie = new Trie();
  words.forEach((word, idx) => trie.insert(word, idx));
  const res: number[][] = [];
  words.forEach((word, i) => {
    const len = word.length;
    for (let j = 0; j <= len; j++) {
      if (isPalidrome(word, j, len - 1)) {
        const id = findWord(trie, word, 0, j - 1);
        if (id !== -1 && id !== i) {
          res.push([i, id]);
        }
      }

      if (j && isPalidrome(word, 0, j - 1)) {
        const id = findWord(trie, word, j, len - 1);
        if (id !== -1 && id !== i) {
          res.push([id, i]);
        }
      }
    }
  });
  return res;
}
const words = ['abcd', 'dcba', 'lls', 's', 'sssll'];

console.log(palindromePairs(words));
