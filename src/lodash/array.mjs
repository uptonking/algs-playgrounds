// * 数组扁平化

/**
 * * 基于队列，访问用shift，插入用unshift
 */
function flatten(arr) {
  const queue = [...arr];

  const result = [];
  let curr;

  while (queue.length) {
    curr = queue.shift();

    if (Array.isArray(curr)) {
      queue.unshift(...curr);
    } else {
      result.push(curr);
    }
  }

  return result;
}

function flatten1(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

function flatten2(arr) {
  return arr.flatten(Infinity);
}

/** 基于递归实现 */
function flatten3(arr) {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? flatten(item) : item)),
  );
}

const numbers = [1, [2, [3, 4], 5], 4, 3, 2, 1];
console.log(flatten2(numbers));

function dedupArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }

  return result;

  // return Array.from(new Set(arr))
}
