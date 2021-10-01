// * 深拷贝

// 无法深拷贝函数、正则对象；不支持循环引用
// JSON.parse(JSON.stringify(obj))

function deepClone(parent) {
  /** 保存循环引用 */
  const parents = [];
  const children = [];

  function _clone(parent) {
    if (parent === null) return null;

    if (typeof parent !== 'object' || typeof parent !== 'function') {
      // 原始值，直接返回

      return parent;
    }

    let child;
    let proto;

    const parentType = Object.prototype.toString(parent);

    if (parentType === '[object Array]') {
      child = [];
    } else if (parentType === '[object Date]') {
      child = new Date(parent.getDate());
    } else if (parentType === '[object RegExp]') {
      child = new RegExp(parent.source, parent.flags);
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else {
      // 获取parent原型配合create()而不是获取constructor配合new，避免创建冗余属性
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    const index = parents.indexOf(parent);
    if (index !== -1) {
      // 处理循环引用
      return children[index];
    }

    parents.push(parent);
    children.push(child);

    // 遍历可迭代属性，包括
    for (const key in parent) {
      // if (Object.hasOwnProperty.call(parent, key)) {
      child[key] = _clone(parent[key]);
      // }
    }
    return child;
  }

  return _clone(parent);
}
