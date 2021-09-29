import { isBalanced } from '../../tree/binary-tree-leetcode.mjs';
import { checkIfTwoArraysEqual } from '../../utils/collection-utils.mjs';

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/** 树遍历的模版 */
function orderTraversal(root) {
  if (!root) {
    return [];
  }

  const resultNodes = [];

  return resultNodes;
}

function preorderTraversal(root) {
  const resultNodes = [];

  const pretree = (node) => {
    if (node) {
      // console.log('pre-ing-node', node);
      resultNodes.push(node.val);
      pretree(node.left);
      pretree(node.right);
    }
  };

  pretree(root);

  return resultNodes;
}
function preorderTraversalIterative(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const resultNodes = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();
    resultNodes.push(current.val);

    current.right && stack.push(current.right);
    current.left && stack.push(current.left);
  }

  return resultNodes;
}

function inorderTraversal(root) {
  const resultNodes = [];

  const intree = (node) => {
    if (node) {
      intree(node.left);
      resultNodes.push(node.val);
      intree(node.right);
    }
  };

  intree(root);

  return resultNodes;
}

function inorderTraversalIterative(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const resultNodes = [];

  const stack = [];
  let current = root;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    resultNodes.push(current.val);

    current = current.right;
  }

  return resultNodes;
}

function postorderTraversal(root) {
  const resultNodes = [];

  const posttree = (node) => {
    if (node) {
      posttree(node.left);
      posttree(node.right);
      resultNodes.push(node.val);
    }
  };

  posttree(root);

  return resultNodes;
}
function postorderTraversalIterative(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const resultNodes = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();
    // * 每次访问元素时，插入第一个位置
    resultNodes.unshift(current.val);

    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }

  return resultNodes;
}

function postorderTraversalIterative2(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const resultNodes = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();
    resultNodes.unshift(current.val);

    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }

  return resultNodes;
}

function levelorderTraversal(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const resultNodes = [];

  const queue = [root];
  let current;

  while (queue.length) {
    // * 每次移除并访问 根、左、右
    current = queue.shift();
    resultNodes.push(current.val);
    // console.log('level-ing-node,', current.val);

    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }

  return resultNodes;
}

function nodesByLevel(root) {
  // * 不要忘了处理特殊条件
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  let current = root;
  while (queue.length) {
    const level = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      current = queue.shift();
      level.push(current.val);

      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    result.push(level);
  }

  return result;
}

const root1 = [1, null, 2, 3];
const root2 = [];
const root3 = [1];
const root0 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
// 用于测试的二叉树
//     3
//    /  \
//   9    20
//       /  \
//     15    7
console.log(';;manual-root0: ', root0);

const expectedPre = [3, 9, 20, 15, 7];
const expectedIn = [9, 3, 15, 20, 7];
const expectedPost = [9, 15, 7, 20, 3];
const expectedLevel = [3, 9, 20, 15, 7];
const expectedByLevel = [[3], [9, 20], [15, 7]];

console.log(
  ';;pretree: ',
  checkIfTwoArraysEqual(preorderTraversal(root0), expectedPre),
);
console.log(
  ';;pretree2: ',
  checkIfTwoArraysEqual(preorderTraversalIterative(root0), expectedPre),
);

console.log(
  ';;intree: ',
  checkIfTwoArraysEqual(inorderTraversal(root0), expectedIn),
);
console.log(
  ';;intree2: ',
  checkIfTwoArraysEqual(inorderTraversalIterative(root0), expectedIn),
);

console.log(
  ';;posttree: ',
  checkIfTwoArraysEqual(postorderTraversal(root0), expectedPost),
);
console.log(
  ';;posttree2: ',
  checkIfTwoArraysEqual(postorderTraversalIterative(root0), expectedPost),
);
// console.log(levelorderTraversal(root0));
console.log(
  ';;leveltree: ',
  checkIfTwoArraysEqual(levelorderTraversal(root0), expectedLevel),
);
console.log(
  ';;leveltree2: ',
  checkIfTwoArraysEqual(nodesByLevel(root0), expectedByLevel),
);

console.log(';;checkIsBalanced, ', isBalanced(root0));
