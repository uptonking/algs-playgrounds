// * 手写vdom
// 如何实现一个 Virtual DOM 算法 https://github.com/livoras/blog/issues/13
// https://github.com/livoras/simple-virtual-dom
// https://github.com/funnycoderstar/simple-virtual-dom
// 简单实现一个Virtual DOM https://mp.weixin.qq.com/s/w2b9Wn7QWXhy2qf2JX3Kbw

// 一个DOM标签所需的基本元素: type, props, children, key
// 定义一个类,用来创建 DOM 元素(element.js);
// 比较新旧 DOM 树的差异(diff.js);
// 将差异的部分渲染到DOM树，即只渲染变化了的部分(patch.js)

```
{
  // 标签名
  tagName: 'div',
  // 属性
  properties: {
      // 样式
      style: {},
  },
  // 子节点
  children: [],
  // 唯一标识
  key: 1,
}
```;

/**
 * * 用JS对象模拟DOM树
 */
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

// * vdom递归渲染到真实dom
Element.prototype.render = function () {
  const el = document.createElement(this.tagName); // 根据tagName构建
  const props = this.props;

  for (const propName in props) {
    // 设置节点的DOM属性
    const propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  const children = this.children || [];

  children.forEach(function (child) {
    const childEl =
      child instanceof Element
        ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        : document.createTextNode(child); // 如果字符串，只构建文本节点
    el.appendChild(childEl);
  });

  return el;
};

/**
 * * diff 函数，对比两棵树
 * - 比较两棵DOM树的差异是 Virtual DOM 算法最核心的部分
 * - 对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记
 * - 每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。
 * - 差异类型：新增、删除、更新
 * - 需要给子节点加上唯一标识key，列表对比的时候，使用key进行对比，这样才能复用老的 DOM 树上的节点
 */
function diff(oldTree, newTree) {
  var index = 0; // 当前节点的标志
  var patches = {}; // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

// 对两棵树进行深度优先遍历
// function dfsWalk (oldNode, newNode, index, patches) {
//   // 对比oldNode和newNode的不同，记录下来
//   patches[index] = [...]

//   diffChildren(oldNode.children, newNode.children, index, patches)
// }

// 遍历子节点
function diffChildren(oldChildren, newChildren, index, patches) {
  var leftNode = null;
  var currentNodeIndex = index;
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i];
    currentNodeIndex =
      leftNode && leftNode.count // 计算节点的标识
        ? currentNodeIndex + leftNode.count + 1
        : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches); // 深度遍历子节点
    leftNode = child;
  });
}

/**
 * 把差异应用到真正的DOM树上
 */
function patch(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    // 深度遍历子节点
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches); // 对当前节点进行DOM操作
  }
}

function applyPatches(node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case 'REPLACE':
        node.parentNode.replaceChild(currentPatch.node.render(), node);
        break;
      case 'REORDER':
        // reorderChildren(node, currentPatch.moves)
        break;
      case 'PROPS':
        // setProps(node, currentPatch.props)
        break;
      case 'TEXT':
        node.textContent = currentPatch.content;
        break;
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });
}
