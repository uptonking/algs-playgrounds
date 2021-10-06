import {
  TreeNode,
  inorderTraversal,
  inorderTraversalIterative,
  preorderTraversal,
} from './binary-tree.mjs';

/**
 * * 检查一棵树是否为合法二叉搜索树。
 * * 思路:中序遍历
 * https://leetcode-cn.com/problems/legal-binary-search-tree-lcci/
 */
function isValidBST(root) {
  // 判断是否在界限内部
  function isValidBSTCore(root, lower, upper) {
    // 如果是null，则返回 true
    if (root === null) return true;

    if (lower !== null && root.val <= lower) return false;

    if (upper !== null && root.val >= upper) return false;

    // 对子树进行递归
    return (
      isValidBSTCore(root.left, lower, root.val) &&
      isValidBSTCore(root.right, root.val, upper)
    );
  }

  return isValidBSTCore(root, null, null);
}

export function isValidBST2(root) {
  if (!root) return true;

  const stack = [];
  let current = root;
  let prev;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 下方的左节点
    current = stack.pop();

    if (prev && prev.val >= current.val) {
      return false;
    }

    prev = current;
    current = current.right;
  }

  return true;
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

/**
 * * 二叉搜索树中第K小的元素
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/86
 * 中序遍历二叉搜索树，输出第 k 个既可
 */
export function kthSmallest(root, k) {
  if (!root) return -1;

  const stack = [];
  let current = root;
  let i = 0;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    i++;

    if (i === k) return current.val;

    current = current.right;
  }
}

/**
 * * 二叉搜索树迭代器
 * https://leetcode-cn.com/problems/binary-search-tree-iterator/
 * - 使用二叉搜索树的根节点初始化迭代器。
 * - 调用 next() 将返回二叉搜索树中的下一个最小的数。
 * -
 */
function BSTIterator(root) {
  /** 存放升序序列 */
  this.vals = [];

  // 必须用箭头函数，否则this指向错误，this.vals不存在
  const inOrder = (node) => {
    if (node) {
      inOrder(node.left);
      this.vals.push(node.val);
      inOrder(node.right);
    }
  };

  inOrder(root);
}

BSTIterator.prototype.next = function () {
  return this.vals.shift();
};

BSTIterator.prototype.hasNext = function () {
  return this.vals.length > 0;
};
