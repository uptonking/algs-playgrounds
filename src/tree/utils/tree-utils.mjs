/* eslint-disable max-depth */

function printTree(inorder, bredthOrder, size) {
  size = size || 2;
  const total = inorder.length;
  const numberOfLevels = Math.ceil(Math.log2(total));
  let pointerBOrder = 0;
  const blank = ' ';
  for (let level = 0; level < numberOfLevels; level++) {
    const itemPerLevel = Math.pow(2, level);
    let out = [];
    const branches = [];
    let slantDirection = true; // up
    for (let itemNumber = 0; itemNumber < itemPerLevel; itemNumber++) {
      const item = bredthOrder[pointerBOrder++];
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
        for (let fill = 1; fill <= size - 1; fill++) {
          out[nInd + fill] = blank;
          branches[nInd + fill] = branches[nInd + fill] || blank;
        }
      }
    }
    console.log(branches.join(''));
    console.log(out.join(''));
    out = [];
  }
}
class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinaryTree {
  constructor(value) {
    this.root = value == null ? null : new Node(value);
  }

  insert(value, node) {
    if (node == null) {
      node = this.root;
    }
    if (node == null) {
      node = new Node(value);
      return;
    }
    if (node.value >= value) {
      if (node.left == null) {
        node.left = new Node(value);
        return;
      } else {
        this.insert(value, node.left);
        return;
      }
    } else {
      if (node.right == null) {
        node.right = new Node(value);
        return;
      } else {
        this.insert(value, node.right);
        return;
      }
    }
  }

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

  printBredthOrder() {
    const result = [];
    if (this.root == null) {
    } else {
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
      } while (tmpAcc.length != 0);
      for (let i = 0; i < acc.length; i++) {
        result.push(acc[i].value);
      }
    }

    return result;
  }
}

// 完全按照输入顺序、按层序遍历的方式打印一颗完全二叉树

const bt = new BinaryTree('h');
bt.insert('d');
bt.insert('l');
bt.insert('b');
bt.insert('f');
bt.insert('j');
bt.insert('n');
bt.insert('a');
bt.insert('c');
bt.insert('e');
bt.insert('g');
bt.insert('i');
bt.insert('k');
bt.insert('m');
bt.insert('o');
const io = bt.printInOrder();
const bo = bt.printBredthOrder();

printTree(io, bo);
