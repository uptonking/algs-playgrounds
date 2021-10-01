// * 数组扁平化

function flatten(arr) {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? flatten(item) : item)),
  );
}

function flatten2(arr) {
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
