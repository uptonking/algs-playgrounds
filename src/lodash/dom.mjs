/**
 * 递归遍历所有子节点，类似深度优先
 */
function traverseDOM(parent) {
  const ret = [];

  const loop = (node) => {
    if (node) {
      ret.push(node);
    }

    // dom nodes转数组
    const children = [...node.children];

    if (children) {
      for (let i = 0; i < children.length; i++) {
        loop(children[i]);
      }
    }
  };

  loop(parent);

  return ret;
}
