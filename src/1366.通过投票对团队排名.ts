/*
 * @lc app=leetcode.cn id=1366 lang=typescript
 *
 * [1366] 通过投票对团队排名
 */

// @lc code=start

// const CHAR_CODE_A = 'A'.charCodeAt(0);

function rankTeams(votes: string[]): string {
  const voteMap = new Map<string, number[]>();

  const compare = (a: string, b: string) => {
    const [voteA, voteB] = [voteMap.get(a) ?? [], voteMap.get(b) ?? []];

    for (let [i, voteCount] of voteA.entries()) {
      voteCount = voteCount ?? 0;
      const voteCountB = voteB[i] ?? 0;
      if (voteCount > voteCountB) {
        return -1;
      }
      if (voteCount < voteCountB) {
        return 1;
      }
    }
    return a.localeCompare(b);
  };

  for (let vote of votes) {
    for (let i = 0; i < vote.length; i++) {
      const team = vote[i];
      if (!voteMap.get(team)) {
        voteMap.set(team, []);
      }
      const teamVoteArr = voteMap.get(team)!;
      teamVoteArr[i] = (teamVoteArr[i] ?? 0) + 1;
    }
  }
  return votes[0].split('').sort(compare).join('');
}
// @lc code=end

const votes = ['BCA', 'CAB', 'CBA', 'ABC', 'ACB', 'BAC'];
console.log(rankTeams(votes));

export default {};
