// * 二叉树遍历小结
// * - 二叉树的前中后序深度优先遍历都基于stack，访问元素都使用 stack.pop()，只有后序遍历将访问结果unshift插入结果数组的第一个
// * - 二叉树的层序遍历基于queue，访问元素使用 queue.shift()

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

```JS
// 遍历模版
function orderTraversal(root) {
  if (!root) return [];

  const ret = [];

  return ret;
}

// 用于基于循环实现的深度优先遍历
// const stack = [];
// let curr = root;
```;

/**
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/87
 */
export function BinarySearchTree() {
  this.root = null;

  this.insert = () => {};
  this.inorder = () => {};
}

// 插入元素到数组都是push(node.left/right)
// 处理数组元素时，pop()取最后一个，shift()取第一个，unshift()插入到第一个

/**
 * 💡️ 前序遍历，递归版
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/37
 */
export function preorderTraversal(root) {
  const result = [];

  const pretree = (node) => {
    if (node) {
      result.push(node.val);

      pretree(node.left);
      pretree(node.right);
    }
  };

  pretree(root);

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
  let current = root;

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
    return [];
  }
  const result = [];

  const stack = [];
  let current = root;

  while (stack.length || current) {
    // * 先将root的最左边的所有左子孙节点入栈
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
    return [];
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

/**
 * 💡️ 广度优先搜索二叉树，也是层序遍历
 */

function levelorderTraversal(root) {
  if (!root) return [];
  const ret = [];

  function levelTree(node, depth) {
    if (node) {
      ret[depth] = ret[depth] || [];
      ret[depth].push(node.val);

      // 注意这里不能是++depth
      // levelTree(node.left, ++depth);
      levelTree(node.left, depth + 1);
      levelTree(node.right, depth + 1);
    }
  }

  levelTree(root, 0);

  return ret;
}

export function levelorderTraversal(root) {
  const result = [];

  const queue = [root];
  let current = root;

  while (queue.length) {
    // * 每次移除并访问queue中的第1个元素
    current = queue.shift();
    result.push(current.val);

    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }

  return result;
}

/**
 * 层序遍历时，返回的结果按层存储
 */
export function nodesByLevel(root) {
  const result = [];
  const queue = [root];
  let current = root;

  while (queue.length) {
    const level = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      // * 每次移除并访问queue中的第1个元素
      current = queue.shift();
      level.push(current.val);

      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }

    result.push(level);
  }

  return result;
}

/**
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/46
 */
export function nodesByLevel2(root) {
  if (!root) {
    // * 这一步不能省略
    return [];
  }

  const result = [];
  const queue = [root];
  let current = root;

  while (queue.length) {
    const level = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      // * 每次移除并访问queue中的第1个元素
      current = queue.shift();
      level.push(current.val);
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }

    // result.push(level);
    result.unshift(level);
  }

  return result;
}

/**
 * 二叉树的序列化与反序列化
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
 * * 基于层序遍历实现序列化，空子节点序列化为 #
 */

export function serialize(root) {
  if (!root) {
    return '';
  }

  const result = [];

  const queue = [root];
  let current = root;

  while (queue.length) {
    // * 每次取第一个元素
    current = queue.shift();
    if (current) {
      result.push(current.val);

      queue.push(current.left, current.right);
    } else {
      result.push('#');
    }
  }

  return result.toString();
}
/**
 * * 基于层序遍历的字符串，生成二叉树，#代表的空节点反序列化为null
 */
export function deserialize(data) {
  if (!data) {
    return null;
  }

  data = data.split(',');

  const root = new TreeNode(data[0]);
  const queue = [root];
  let cursor = 1;

  while (cursor < data.length) {
    // * 每次取第一个元素作为父节点
    const parent = queue.shift();

    parent.left = data[cursor] != '#' ? new TreeNode(data[cursor]) : null;
    parent.right =
      data[cursor + 1] != '#' ? new TreeNode(data[cursor + 1]) : null;

    parent.left && queue.push(parent.left);
    parent.right && queue.push(parent.right);
    cursor += 2;
  }

  return root;
}
