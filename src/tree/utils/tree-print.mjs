/* eslint-disable max-depth */
import { TreeNode } from '../binary-tree.mjs';

/**
 * 打印二叉树图形到控制台
 * @param {BinaryTree} binaryTreeRootNode 二叉树根节点
 */
export function printTree2(binaryTreeRootNode) {
  const io = binaryTreeRootNode.printInOrder();
  const bo = binaryTreeRootNode.printBredthOrder();
  // console.log(';;io-print, ', io);
  // console.log(';;bo-print, ', bo);
  printTree(io, bo);
}

/**
 * 基于中序遍历和广度优先遍历序列，打印节点所代表的二叉树图形到控制台。
 * 支持任意二叉树，不要求完全二叉树。
 * @param inorder 中序遍历序列
 * @param bredthOrder 广度优先遍历序列
 * @param size
 */
export function printTree(inorder, bredthOrder, size) {
  size = size || 2;
  const total = inorder.length;
  // 计算完全二叉树的层数
  const numberOfLevels = Math.ceil(Math.log2(total));
  let pointerBOrder = 0;
  const blank = ' ';

  for (let level = 0; level < numberOfLevels; level++) {
    const itemPerLevel = Math.pow(2, level);
    /** 当前层所有节点内容 */
    let out = [];
    /** 当前层节点内容上一行的连接指示线 */
    const branches = [];
    let slantDirection = true; // up

    for (let itemNumber = 0; itemNumber < itemPerLevel; itemNumber++) {
      const item = bredthOrder[pointerBOrder++];

      // /
      for (let x = 1; x <= inorder.length; x++) {
        const ino = inorder[x - 1];
        const nInd = size * (x - 1);

        if (item == ino) {
          out[nInd] = item;
          if (item) {
            if (bredthOrder[0] == item) {
              branches[nInd] = '|';
            } else if (slantDirection) {
              branches[nInd + 1] = '/';
            } else {
              if (nInd - 1 >= 0) {
                branches[nInd - 1] = '\\';
              }
            }
            slantDirection = !slantDirection;
          }
        } else {
          out[nInd] = out[nInd] || blank;
        }

        branches[nInd] = branches[nInd] || blank;

        // /
        for (let fill = 1; fill <= size - 1; fill++) {
          out[nInd + fill] = blank;
          branches[nInd + fill] = branches[nInd + fill] || blank;
        }
      }
    }

    // console.log(`-------------- level: ${level}  ---------------------`);

    // 打印当前层所有节点上一行的连接指示线
    console.log(branches.join(''));
    // 打印当前层的所有节点
    console.log(out.join(''));

    out = [];
  }
}

export class BinaryTree {
  constructor(value) {
    if (!value) {
      this.root = null;
    }
    if (typeof value === 'object' && value instanceof TreeNode) {
      this.root = value;
    }
    if (typeof value === 'number' || typeof value === 'string') {
      this.root = new TreeNode(value);
    }
  }

  /** 递归插入value节点到正确位置构建二叉查找树 */
  insert(value, node) {
    if (node == null) {
      node = this.root;
    }
    if (node == null) {
      node = new TreeNode(value);
      return;
    }

    if (node.value >= value) {
      if (node.left == null) {
        node.left = new TreeNode(value);
        return;
      } else {
        this.insert(value, node.left);
        return;
      }
    } else {
      if (node.right == null) {
        node.right = new TreeNode(value);
        return;
      } else {
        this.insert(value, node.right);
        return;
      }
    }
  }

  /** 返回node节点左右子节点构成的数组，可能是空数组 */
  getSiblings(node) {
    if (node == null) {
      return [];
    }
    const acc = [];

    if (node.left != null) {
      acc.push(node.left);
    }
    if (node.right != null) {
      acc.push(node.right);
    }
    return acc;
  }

  /**
   * 中序遍历node子树，遍历结果数据保存在 acc数组
   */
  print(node, acc) {
    if (node == null) {
      return acc;
    } else {
      if (node.left != null) {
        acc = this.print(node.left, acc);
      }

      acc.push(node.value);

      if (node.right != null) {
        acc = this.print(node.right, acc);
      }

      return acc;
    }
  }

  printInOrder() {
    return this.print(this.root, []);
  }

  /** 广度优先遍历bst */
  printBredthOrder() {
    const result = [];
    if (!this.root) {
      return [];
    }

    let acc = [this.root];
    let workingAcc = [this.root];
    let tmpAcc = [];

    do {
      tmpAcc = [];
      for (let i = 0; i < workingAcc.length; i++) {
        acc = [...acc, workingAcc[i].left];
        acc = [...acc, workingAcc[i].right];
        const left = this.getSiblings(workingAcc[i].left);
        const right = this.getSiblings(workingAcc[i].right);

        tmpAcc = [...tmpAcc, ...left];
        tmpAcc = [...tmpAcc, ...right];
      }
      acc = [...acc, ...tmpAcc];
      workingAcc = tmpAcc;
    } while (tmpAcc.length !== 0);

    // console.log('acc[i], ', acc);

    for (let i = 0; i < acc.length; i++) {
      if (acc[i]) {
        result.push(acc[i].value);
      } else {
        result.push(0);
      }
    }

    return result;
  }
}

// 打印一颗完全二叉树，用于测试printTree

// const bt = new BinaryTree('h');
// bt.insert('d');
// bt.insert('l');
// bt.insert('b');
// bt.insert('f');
// bt.insert('j');
// bt.insert('n');
// bt.insert('a');
// bt.insert('c');
// bt.insert('e');
// bt.insert('g');
// bt.insert('i');
// bt.insert('k');
// bt.insert('m');
// // bt.insert('o');
// console.log(';;bt-created, ', bt);

// const io = bt.printInOrder();
// const bo = bt.printBredthOrder();
// console.log(';;io-print, ', io);
// console.log(';;bo-print, ', bo);

// printTree(io, bo);
