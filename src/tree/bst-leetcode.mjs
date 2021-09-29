import {
  TreeNode,
  inorderTraversal,
  inorderTraversalIterative,
  preorderTraversal,
} from './binary-tree.mjs';

/** 💡️ 检查一棵二叉树是否为二叉搜索树。推荐使用中序遍历
 * https://leetcode-cn.com/problems/legal-binary-search-tree-lcci/
 *  因为递归时，可能存在下层子孙右节点比根节点大的情况
 */
export function isValidBST(root) {
  if (!root) return true;

  // const inorderNodes = [];

  const stack = [];
  let current = root;
  let prev;

  while (stack.length || current) {
    while (current) {
      // console.log('ing-left, ', current);
      stack.push(current);
      current = current.left;
    }

    // 下方的左节点
    current = stack.pop();

    // console.log('ing-cur, ', current);
    // inorderNodes.push(current.val);
    if (prev && prev.val >= current.val) {
      return false;
    }
    prev = current;
    current = current.right;
  }
  // console.log(';;inorderNodes: ', inorderNodes);

  // for (let i = 0; i < inorderNodes.length - 1; i++) {
  //   if (inorderNodes[i] >= inorderNodes[i + 1]) {
  //     return false;
  //   }
  // }

  return true;
}

/** 不推荐，有测试用例未通过 */
export function isValidBST2(root) {
  if (!root) return true;

  if (root.left.val < root.val && root.right.val > root.val) {
    return isValidBST2(root.left) && isValidBST2(root.right);
  } else {
    return false;
  }
}

const root1 = new TreeNode(1, new TreeNode(1));
// const root1 = new TreeNode(
//   5,
//   new TreeNode(1),
//   new TreeNode(4, new TreeNode(3), new TreeNode(6)),
// );

console.log(';;pre,', preorderTraversal(root1));
console.log(';;in1,', inorderTraversal(root1));
console.log(';;in2,', inorderTraversalIterative(root1));
console.log(';;isValidBST,', isValidBST(root1));
