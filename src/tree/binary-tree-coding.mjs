/**
 * 二叉搜索树中第K小的元素
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

/** 二叉树转链表。展开后的单链表应该与二叉树 先序遍历 顺序相同。
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
