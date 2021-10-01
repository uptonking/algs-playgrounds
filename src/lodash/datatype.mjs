/**
 * 判断属性来自对象的原型对象，而不是实例
 */
function checkIsPropertyFromPrototype(property, obj) {
  return property in obj && !obj.hasOwnProperty(property);
}

function checkIsNumber(num) {
  // typeof NaN ==  "number" // true
  return typeof num === 'number' && !isNaN(num);
}

function checkIsBuiltinObjectType(obj, type) {
  if (typeof obj !== 'object') return false;

  // 常见的内置对象都重写了继承的toString()，因此要想打印类型，需要使用call()调用Object原型对象上的原始方法
  const typestr = Object.prototype.toString(obj);

  switch (type) {
    case 'Array':
      return typestr === '[object Array]';
    case 'Date':
      return typestr === '[object Date]';
    case 'RegExp':
      return typestr === '[object RegExp]';
    default:
      return false;
  }
}
