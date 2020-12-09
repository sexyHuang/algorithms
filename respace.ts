import Trie from './dataStructure/Trie.ts';

type Respace = (dictionary: string[], sentence: string) => number;

const respace: Respace = (dictionary, sentence) => {
  const trie = new Trie();
  dictionary.forEach(word => trie.insert(word));
  const dp: number[] = [0];
  for (let i = 0; i < sentence.length; i++) {
    dp[i + 1] = dp[i] + 1;
    let currPos = trie;
    for (let j = i; j >= 0; j--) {
      const chatIdx = sentence.charCodeAt(j) - 97;
      if (!currPos.next[chatIdx]) {
        break;
      } else if (currPos.next[chatIdx]?.isWord) {
        dp[i + 1] = Math.min(dp[i + 1], dp[j]);
      }
      if (dp[i + 1] === 0) break;
      currPos = currPos.next[chatIdx]!;
    }
  }
  return dp.pop()!;
};

const dictionary = ['looked', 'just', 'like', 'her', 'brother'];
const sentence = 'jesslookedjustliketimherbrother';

console.log(respace(dictionary, sentence));
