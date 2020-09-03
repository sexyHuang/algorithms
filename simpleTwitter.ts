class User {
  followees: number[] = [];
  twitters: number[] = [];
}

class Twitter {
  private users: User[] = [];
  private timeMap: number[] = [];
  private timer = 0;
  private recentMax: number;
  constructor(recentMax: number = 10) {
    this.recentMax = recentMax;
  }
  private getUser(userId: number) {
    return this.users[userId] ?? (this.users[userId] = new User());
  }
  postTweet(userId: number, tweetId: number): void {
    const { recentMax, timeMap } = this;
    const { twitters } = this.getUser(userId);
    twitters.unshift(tweetId);
    if (twitters.length > recentMax) twitters.pop();
    timeMap[tweetId] = this.timer++;
  }

  getNewsFeed(userId: number): number[] {
    const { recentMax, timeMap } = this;
    const { followees, twitters } = this.getUser(userId);
    let res: number[] = twitters.slice();
    for (let followeeId of followees) {
      const followeeTwitters = this.getUser(followeeId).twitters;
      let i = 0,
        j = 0;
      const newRes = [];
      while (i < res.length && j < followeeTwitters.length) {
        if (timeMap[res[i]] > timeMap[followeeTwitters[j]]) {
          newRes.push(res[i]);
          i++;
        } else {
          newRes.push(followeeTwitters[j]);
          j++;
        }
      }
      res = [...newRes, ...res.slice(i), ...followeeTwitters.slice(j)].slice(
        0,
        recentMax
      );
    }
    return res;
  }

  follow(followerId: number, followeeId: number): void {
    const user = this.getUser(followerId);
    if (followeeId === followerId || user.followees.includes(followeeId))
      return;
    user.followees.push(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    const user = this.getUser(followerId);
    user.followees = user.followees.filter((id) => id !== followeeId);
  }
}
const cmd: Array<keyof Twitter> = [
  'postTweet',
  'follow',
  'follow',
  'getNewsFeed',
  'postTweet',
  'getNewsFeed',
  'getNewsFeed',
  'unfollow',
  'getNewsFeed',
  'getNewsFeed',
  'unfollow',
  'getNewsFeed',
  'getNewsFeed',
];

const params: [number, number][] = [
  [1, 5],
  [1, 2],
  [2, 1],
  [2, 0],
  [2, 6],
  [1, 0],
  [2, 0],
  [2, 1],
  [1, 0],
  [2, 0],
  [1, 2],
  [1, 0],
  [2, 0],
];

const run = (cmd: Array<keyof Twitter>, params: [number, number][]) => {
  const twitter = new Twitter();
  cmd.forEach((c, idx) => {
    console.log(twitter[c](...params[idx]));
  });
};

run(cmd, params);
