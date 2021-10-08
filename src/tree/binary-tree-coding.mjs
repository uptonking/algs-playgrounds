import { TreeNode } from './binary-tree.mjs';

/**
 * * 将有序数组转换为二叉搜索树
 * * 思路：数组中间位置作为根节点，递归构建
 * https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/
 *
 */
function sortedArrayToBST(nums) {
  const len = nums.length;
  if (!nums || len === 0) return null;

  if (len === 1) return new TreeNode(nums[0]);

  const mid = Math.floor(len / 2);
  const root = new TreeNode(nums[mid]);

  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
}

/**
 * * 另一棵树的子树
 * https://leetcode-cn.com/problems/subtree-of-another-tree/
 * - 如果一棵二叉树t是另一颗二叉树s的子树，那么有3种情况
 * - 1. s和t完全一样
 * - 2. t在s的左子树中（递归）
 * - 3. t在s的右子树中（递归）
 */

function isSubtree(root, subRoot) {
  if (!root) return false;

  // 值相等后再去判断，可以减少计算
  if (root.val === subRoot.val && isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

/**
 * * 判断2棵树val完全相同
 */
function isSameTree(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2 || root1.val !== root2.val) return false;

  return (
    isSameTree(root1.left, root2.left) && isSameTree(root1.right, root2.right)
  );
}

/**
 * * 二叉树转链表。展开后的单链表应该与二叉树 先序遍历 顺序相同。
 * https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/submissions/
 * https://blog.voyz.vip/2020/12/31/LeetCode%E7%AE%97%E6%B3%95%E7%AC%94%E8%AE%B0-Day54/
 *
 */
export function flatten(root) {
  if (!root) return null;

  let current = root;
  while (current) {
    if (!current.left) {
      current = current.right;
      continue;
    }

    const next = current.left;
    let pre = next;
    while (pre.right) {
      pre = pre.right;
    }
    pre.right = current.right;
    current.right = next;
    current.left = null;
  }

  return root;
}

export function flatten2(root) {
  if (!root) return;

  flatten2(root.right);
  flatten2(root.left);

  // 左右子树已经被拉平
  const left = root.left;
  const right = root.right;

  // 将左子树设为右子树
  root.right = left;
  root.left = null;

  // 将原先的右子树接到当前右子树末端
  let p = root;
  while (p.right) {
    p = p.right;
  }
  p.right = right;
}

/**
 * 前序遍历，将二叉树展开为单链表之后，单链表中的节点顺序即为二叉树的前序遍历访问各节点的顺序
 */
function flattenOutOfPlace(root) {
  const preOrderList = [];

  const dfs = (node) => {
    if (node) {
      preOrderList.push(node);
      dfs(node.left);
      dfs(node.right);
    }
  };
  dfs(root);

  for (let i = 1; i < preOrderList.length; i++) {
    const _pre = preOrderList[i - 1];
    const _curr = preOrderList[i];
    _pre.left = null;
    _pre.right = _curr;
  }
}

/**
 * * 求根到叶子节点数字之和
 * 树的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
 * https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
 * https://github.com/Chocolate1999/leetcode-javascript/issues/43
 */
function sumNumbers(root) {
  let sum = 0;

  const dfs = (root, cur) => {
    // 终止条件
    if (!root) return 0;

    // 计算当前节点的值
    cur = cur * 10 + root.val;

    // 找到一条路径，返回路径和
    if (!root.left && !root.right) {
      return cur;
    }

    // 对左右子树递归，求总和
    return dfs(root.left, cur) + dfs(root.right, cur);
  };

  sum = dfs(root, 0);

  return sum;
}
