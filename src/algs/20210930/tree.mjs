function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

export function orderTraversal(root) {
  if (!root) return [];

  const result = [];

  return result;
}
// const stack = [];
// let current = root;

export function preorderTraversal0(root) {
  if (!root) return [];

  const result = [];

  const preTree = (node) => {
    if (node) {
      result.push(node.val);

      preTree(node.left);
      preTree(node.right);
    }
  };

  preTree(root);

  return result;
}

export function preorderTraversal(root) {
  if (!root) return [];

  const result = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();

    result.push(current.val);

    current.right && stack.push(current.right);
    current.left && stack.push(current.left);
  }

  return result;
}

export function inorderTraversal0(root) {
  if (!root) return [];

  const result = [];

  const inTree = (node) => {
    if (node) {
      inTree(node.left);
      result.push(node.val);
      inTree(node.right);
    }
  };

  inTree(root);

  return result;
}

export function inorderTraversal(root) {
  if (!root) return [];

  const result = [];

  const stack = [];
  let current = root;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.val);

    current = current.right;
  }

  return result;
}

export function postorderTraversal0(root) {
  if (!root) return [];

  const result = [];

  const postTree = (node) => {
    if (node) {
      postTree(node.left);
      postTree(node.right);
      result.push(node.val);
    }
  };

  postTree(root);

  return result;
}

export function postorderTraversal(root) {
  if (!root) return [];

  const result = [];

  const stack = [root];
  let current = root;

  while (stack.length) {
    current = stack.pop();
    result.unshift(current.val);

    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }

  return result;
}

export function levelorderTraversal0(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];
  let current = root;

  while (queue.length) {
    current = queue.shift();
    result.push(current.val);

    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }

  return result;
}

export function levelorderTraversal(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];
  let current = root;

  while (queue.length) {
    const levelArr = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      current = queue.shift();
      levelArr.push(current.val);
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }

    result.push(levelArr);
  }

  return result;
}
