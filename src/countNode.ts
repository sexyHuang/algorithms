import TreeNode from './dataStructure/TreeNode';
import { buildTree } from './buildTree';
const root = buildTree([1, 2, 4, 5, 3, 6], [4, 2, 5, 1, 6, 3]);

const isExistNode = (root: TreeNode | null, idx: number) => {
  const head = new TreeNode(void 0, null, root);
  let bitMask = 2 ** (Number(idx).toString(2).length - 1);
  let res: TreeNode | null = head;
  while (res && bitMask > 0) {
    const nodeStr = (idx & bitMask) > 0 ? 'right' : 'left';
    res = res[nodeStr];
    bitMask >>= 1;
  }
  return !!res;
};

function countNodes(root: TreeNode | null): number {
  if (!root) return 0;
  let n = 0;
  let head = root;
  while (head.left) {
    n += 1;
    head = head.left;
  }
  let [left, right] = [2 ** n, 2 ** (n + 1) - 1];
  while (left <= right) {
    const idx = Math.floor((left + right) / 2);
    if (isExistNode(root, idx)) {
      left = idx + 1;
    } else {
      right = idx - 1;
    }
  }
  return Math.min(left, right);
}

console.log(countNodes(root));
