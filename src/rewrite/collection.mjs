/* eslint-disable no-extend-native */

// 实现js原声api的功能

Array.prototype.fn = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};

// * 实现 arr.reduce((prev, curr, index, array) => { ... }, initialValue)

Array.prototype.reduce2 = function (fn, initialVal) {
  const arr = this;
  let acc = arr[0];
  let start = 1;

  if (typeof initialVal !== 'undefined') {
    acc = initialVal;
    start = 0;
  }

  arr.slice(start).forEach((curr, index) => {
    acc = fn(acc, curr, index + start, arr);
  });

  return acc;
};

// * 实现 arr.map(function callbackFn(curr, index, array) { ... }, thisArg)

Array.prototype.map2 = function (fn, thisArgs) {
  const arr = this;
  const result = [];
  arr.forEach((curr, index) => {
    // result.push(fn(curr))

    result[index] = fn.call(thisArgs, curr, index, arr);
  });

  return result;
};

Array.prototype.map3 = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};

Array.prototype.unshift2 = function (fn, context) {
  const arr = this;

  return arr.reduce((prev, curr) => {
    return prev.concat(fn.call(context, curr));
  }, []);
};

/**
 * * findIndex 基于二分查找实现。
 * 查找有序数组
 */
Array.prototype.findIndex2 = function (arr, target) {
  if (!arr || arr.length === 0) return -1;

  console.log(typeof arr);

  arr.sort((a, b) => a - b);
  console.log(arr);

  let low = 0;
  let high = arr.length - 1;
  let mid;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      let start = mid;
      let end = mid;
      while (arr[start] === target) start--;
      while (arr[end] === target) end++;

      return [start + 1, end - 1];

      // return mid;
    }

    if (arr[mid] < target) {
      low = mid + 1;
    }
    if (arr[mid] > target) {
      high = mid - 1;
    }
  }

  return -1;
};

const arr1 = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67];

// console.log(arr1.findIndex2(arr1, 7));

/**
 * * splice 实现原地删除元素和插入元素
 * - array.splice(start) ：删除数组中从下标 start 开始（包含 start ）的所有元素
 * - array.splice(start, deleteCount) ：删除数组中从下标 start （包含）开始的 deleteCount 元素
 * - array.splice(start, deleteCount, item1, item2, ...) ：删除数组中从下标 start 开始（包含 start ）的 deleteCount 元素，然后在相同位置上插入 item1, item2
 */
Array.prototype.splice2 = function (start, deleteCount) {
  const self = this;

  const len = self.length;

  // 插入元素的数量
  const addCount = arguments.length > 2 ? arguments.length - 2 : 0;

  const startIndex = getSpliceStartIndex(start, len);

  const delCount = getSpliceDeleteCount(startIndex, deleteCount, len);
  console.log(
    'startIndex ',
    startIndex,
    '; delCount ',
    delCount,
    '; addCount ',
    addCount,
  );

  let deletedElements = [];
  if (delCount > 0) {
    deletedElements = new Array(delCount);

    // 记录删除元素，用于 Array.prototype.splice() 返回
    for (let i = 0; i < delCount; i++) {
      deletedElements[i] = self[startIndex + i];
    }
  }

  // 密封对象
  if (delCount !== addCount && Object.isSealed(self)) {
    throw new TypeError('the array is sealed');
  }
  // 冻结对象
  if (delCount > 0 && addCount > 0 && Object.isFrozen(self)) {
    throw new TypeError('the array is frozen');
  }

  console.log('before-move,', self);

  // 移动数组元素，便于插入新元素
  moveElements(startIndex, delCount, addCount, self);

  console.log('after-move,', self);

  let i = startIndex;
  let argsIndex = 2;

  while (argsIndex < arguments.length) {
    self[i++] = arguments[argsIndex++];
  }
  self.length = len - delCount + addCount;

  return deletedElements;
};

// 处理负值、越界问题
function getSpliceStartIndex(start, len) {
  if (start < 0) {
    start = start + len;
    return start < 0 ? 0 : start;
  }

  return start > len - 1 ? len - 1 : start;
}

// 处理负值、越界问题
function getSpliceDeleteCount(startIndex, deleteCount, len) {
  if (deleteCount > len - startIndex) {
    deleteCount = len - startIndex;
  }

  if (deleteCount < 0) {
    deleteCount = 0;
  }
  return deleteCount;
}

// 移动数组元素，便于插入新元素
function moveElements(startIndex, delCount, addCount, array) {
  const over = addCount - delCount;
  console.log('move-over, ', over);

  // 插入比删除的多
  if (over) {
    // 向后移
    for (let i = array.length - 1; i >= startIndex + delCount; i--) {
      array[i + over] = array[i];
      // console.log('\n--', array);
    }
  }

  // 插入比删除的少
  if (over < 0) {
    // 向前移
    for (let i = startIndex + delCount; i <= array.length - 1; i++) {
      if (i + Math.abs(over) > array.length - 1) {
        // 删除冗于元素
        delete array[i];
        continue;
      }
      array[i] = array[i + Math.abs(over)];
    }
  }
}

const months = ['Jan', 'March', 'April', 'June'];
console.log(months.splice2(1, 0, 'Feb'));
// []
console.log(months);
// ["Jan", "Feb", "March", "April", "June"]

// console.log(months.splice2(4, 1, 'May'));
// ["June"]
// console.log(months);
// ["Jan", "Feb", "March", "April", "May"]
