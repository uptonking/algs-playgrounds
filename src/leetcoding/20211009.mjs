function dedupArray(arr) {
  return Array.from(new Set(arr));
}

function maxSlidingWindow(nums, k) {
  const ret = [];

  const deque = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque[0] < i - k + 1) {
      deque.shift();
    }

    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      ret.push(nums[deque[0]]);
    }
  }

  return ret;
}

function shuffle(nums) {
  const len = nums.length;

  const numsCopy = [...nums];

  for (let i = len - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * len);
    swap(numsCopy, i, rand);
  }

  return numsCopy;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
