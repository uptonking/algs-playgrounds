/**
 * Definition for a binary tree node.
 * @param {*=} val 树节点中保存的内容
 * @param {TreeNode=} left 左子节点的引用
 * @param {TreeNode=} right 右子节点的引用
 */
export function TreeNode(val, left, right) {
  this.val = val === undefined ? null : val;
  this.value = this.val;
  this.data = this.val;

  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * 广度优先搜索二叉树，也是层序遍历
 */
export function levelorderTraversal(root) {
  const result = [];

  const queue = [root];
  let current = root;

  while (queue.length) {
    // * 每次移除第1个元素
    current = queue.shift();
    result.push(current.val);

    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }

  return result;
}

/**
 * 前序遍历，递归版
 */
export function preorderTraversal(root) {
  const result = [];

  const preTraverse = (node) => {
    if (node) {
      result.push(node.val);

      preTraverse(node.left);
      preTraverse(node.right);
    }
  };

  preTraverse(root);

  return result;
}

export function preorderTraversal2(root) {
  return root
    ? [
        root.val,
        ...preorderTraversal2(root.left),
        ...preorderTraversal2(root.right),
      ]
    : [];
}

export function preorderTraversalIterative(root) {
  if (!root) {
    return [];
  }
  const result = [];

  const stack = [root];
  let current;

  while (stack.length) {
    current = stack.pop();
    result.push(current.val);

    // * 注意输出的顺序和遍历的顺序，必须先将right入栈
    current.right && stack.push(current.right);
    current.left && stack.push(current.left);
  }

  return result;
}

export function inorderTraversal(root) {
  return root
    ? [
        ...inorderTraversal(root.left),
        root.val,
        ...inorderTraversal(root.right),
      ]
    : [];
}

export function inorderTraversalIterative(root) {
  if (!root) {
    return null;
  }
  const result = [];

  const stack = [];
  let current = root;

  while (stack.length || current) {
    // /先将root的最左边的左子孙节点入栈
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();

    // 最左边的节点
    result.push(current.val);

    current = current.right;
  }

  return result;
}

export function postTraversal(root) {
  return root
    ? [...postTraversal(root.left), ...postTraversal(root.right), root.val]
    : [];
}

export function postorderTraversalIterative(root) {
  if (!root) {
    return null;
  }
  const result = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();

    // * 注意这里每次将元素插入到数组第1个位置，要考虑后面顺序
    result.unshift(current.val);

    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }

  return result;
}
