function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

export function buildTree(preorder, inorder) {
  if (preorder.length !== inorder.length || inorder.length === 0) {
    return null;
  }

  let root = new TreeNode(preorder[0]);
  let i = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, 1));
  root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));

  return root;
}

const preorder = [1, 2, 4, 7, 3, 5, 6, 8];
const inorder = [4, 7, 2, 1, 5, 3, 8, 6];

console.log(';;root, ', buildTree(preorder, inorder));
