/*
 * @lc app=leetcode.cn id=720 lang=typescript
 *
 * [720] 词典中最长的单词
 */

// @lc code=start
type Next = Array<Trie | undefined>;
const CHAR_CODE_A = 'a'.charCodeAt(0);
class Trie {
  next: Next;
  isWord: boolean;
  constructor() {
    this.next = [];
    this.isWord = false;
  }
  insert(word: string) {
    let currPos = this as Trie;
    for (let i = 0; i < word.length; i++) {
      const charIdx = word.charCodeAt(i) - CHAR_CODE_A;
      if (!currPos.next[charIdx]) {
        currPos.next[charIdx] = new Trie();
      }
      currPos = currPos.next[charIdx]!;
    }
    currPos.isWord = true;
  }
}

function longestWord(words: string[]): string {
  words.sort();
  const trie = new Trie();
  const findWord = (word: string) => {
    if (!word) return true;
    let head = trie;
    for (let s of word) {
      const next = head.next[s.charCodeAt(0) - CHAR_CODE_A];
      if (!next) return false;
      head = next;
    }
    return true;
  };

  let res = '';
  for (let word of words) {
    if (findWord(word.slice(0, -1))) {
      trie.insert(word);
      if (word.length > res.length) res = word;
    }
  }
  return res;
}
// @lc code=end

const word = ['a', 'banana', 'app', 'appl', 'ap', 'apply', 'apple'];
console.log(longestWord(word));

export default {};
