/**
 * 设计：
 *     1000瓶药，1瓶为喝了7秒后死亡的毒药，
 *     给10只小鼠和7秒，判断哪瓶有毒。
 */

import sleep from './utils/sleep.ts';

const TOTAL = 1000;
const TARGET_INDEX = Math.floor(Math.random() * TOTAL);

const poisonList = Array.from(
  {
    length: TOTAL
  },
  (_, idx) => () => sleep(7000).then(() => (TARGET_INDEX === idx ? 1 : 0))
);

const checkPoison = (
  poisonList: (() => Promise<1 | 0>)[],
  bufferLength = 10
) => {
  let res = 0;
  const promiseList = poisonList.map((fn, idx) => fn().then(res => {}));
};
