import TreeNode from '../dataStructure/TreeNode';

export default function buildTree(arr: (number | null)[]) {
  const nodeArr: (TreeNode | null)[] = [];
  let i = 0;
  let length = 1;
  while (i < arr.length) {
    for (let j = i; j < i + length; j++) {
      const value = arr[j];
      if (!value) continue;
      const node = new TreeNode(value);
    }
  }
}
