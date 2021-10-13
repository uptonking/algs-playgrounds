//  f1(f2(...args))
function compose(...fn) {
  return fn.reduce(
    (f1, f2) =>
      (...args) =>
        f1(f2(...args)),
  );
}

function flatten(arr) {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? flatten(item) : item)),
  );
}

function flatten2(arr) {
  const ret = [];
  const queue = [...arr];
  let curr;

  while (queue.length) {
    curr = queue.shift();
    // console.log(curr)
    Array.isArray(curr) ? queue.unshift(...curr) : ret.push(curr);
  }

  return ret;
}

const aa = [1, [2, [3, 4]]];

console.log(flatten2(aa));

function twoSum(nums, target) {
  const map = {};
  // const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];

    if (map[target - curr] !== undefined) return [i, map[target - curr]];
    // if (map.has(target - curr)) return [i, map.get(target - curr)];

    map[curr] = i;
    // map.set(curr, i);
  }
}
