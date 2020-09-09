/* 洗牌算法：
    1.生成一个0 - arr.length 的随机数
    2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
    3.生成一个0 - arr.length - 1 的随机数
    4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
    依次类推，直至取完所需的10k个元素
*/

const shuffle = (arr: number[], k: number) => {
  const length = arr.length;
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    const end = length - i;
    const targetIdx = Math.floor(Math.random() * end);
    console.log(end, targetIdx);
    result.push(arr[targetIdx]);
    arr[targetIdx] = arr[end - 1];
  }
  return result;
};

console.log(shuffle([1, 2, 3, 4, 5, 6, 66, 7, 8, 11], 5));
