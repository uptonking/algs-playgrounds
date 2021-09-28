import {
  TreeNode,
  inorderTraversal,
  inorderTraversalIterative,
  levelorderTraversal,
  postTraversal,
  postorderTraversalIterative,
  preorderTraversal,
  preorderTraversal2,
  preorderTraversalIterative,
} from './binary-tree.mjs';
import { BinaryTree, printTree, printTree2 } from './utils/tree-print.mjs';

// * --------  根据 inorder + pre/post 遍历生成二叉树  -------

/**
 * 根据前序遍历和中序遍历生成二叉树。假设树中没有重复的元素。
 * 思路是根据pre-o确定根节点，在in-o遍历中找到该节点，然后递归左右子树。
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @param {Array} preorder
 * @param {Array} inorder
 */
export function buildTree(preorder, inorder) {
  if (preorder.length !== inorder.length || inorder.length === 0) {
    return null;
  }

  // root和i代表的是同一个节点
  const root = new TreeNode(preorder[0]);
  const i = inorder.indexOf(preorder[0]);

  // 递归处理子数组时要去掉i节点，左子树
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));

  root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));

  return root;
}

/**
 * 根据后序遍历和中序遍历生成二叉树。
 * * 注意参数顺序。
 * https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 */
export function buildTree2(inorder, postorder) {
  if (postorder.length !== inorder.length || inorder.length === 0) {
    return null;
  }

  const root = new TreeNode(postorder[postorder.length - 1]);
  const i = inorder.indexOf(postorder[postorder.length - 1]);

  root.left = buildTree2(inorder.slice(0, i), postorder.slice(0, i));

  root.right = buildTree2(inorder.slice(i + 1), postorder.slice(i, -1));

  return root;
}

const preorder1 = [1, 2, 4, 7, 3, 5, 6, 8];
const inorder1 = [4, 7, 2, 1, 5, 3, 8, 6];
const generatedRoot1 = buildTree(preorder1, inorder1);

console.log(`\n--------------------------------`);
console.log(';;generatedRoot1, ', generatedRoot1);
console.log('preloop1, ', preorderTraversal(generatedRoot1));
console.log('in-loop1, ', inorderTraversal(generatedRoot1));
// ? 打印异常，可能因为不是平衡树
printTree2(new BinaryTree(generatedRoot1));
// console.log(';;root, ', buildTree(preorder, inorder));

const manualRoot = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
// console.log(';;my-rootNode, ', generatedRoot2);

const preorder2 = [3, 9, 20, 15, 7];
const inorder2 = [9, 3, 15, 20, 7];
const generatedRoot2 = buildTree(preorder2, inorder2);

console.log(`\n--------------------------------`);
console.log('preloop, ', preorderTraversal(generatedRoot2));
console.log('preloop, ', preorderTraversalIterative(generatedRoot2));
console.log('in-loop, ', inorderTraversal(generatedRoot2));
console.log('posloop, ', postTraversal(generatedRoot2));
console.log('bfsloop, ', levelorderTraversal(generatedRoot2));

printTree2(new BinaryTree(generatedRoot2));

const inorder3 = [9, 3, 15, 20, 7];
const postorder3 = [9, 15, 7, 20, 3];
const generatedRoot3 = buildTree2(inorder3, postorder3);
console.log(`\n--------------------------------`);
console.log('preloop, ', preorderTraversal(generatedRoot3));
console.log('preloop, ', preorderTraversalIterative(generatedRoot3));
console.log('in-loop, ', inorderTraversal(generatedRoot3));
console.log('in-loop, ', inorderTraversalIterative(generatedRoot3));
console.log('posloop, ', postTraversal(generatedRoot3));
console.log('posloop, ', postorderTraversalIterative(generatedRoot3));
console.log('bfsloop, ', levelorderTraversal(generatedRoot3));

printTree2(new BinaryTree(generatedRoot3));
