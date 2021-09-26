// 二分查找；
// todo 查找出数组中所有元素
// ? 若查找的是重复的元素，该返回哪个索引

export function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return 'not-found';
}

// eslint-disable-next-line max-params
export function binarySearchRecursively(nums, target, low, high) {
  if (low === undefined) {
    low = 0;
  }
  if (high === undefined) {
    high = nums.length - 1;
  }
  if (low > high) {
    return 'not-found';
  }

  const mid = Math.floor((low + high) / 2);

  if (nums[mid] === target) {
    return mid;
  }

  if (nums[mid] < target) {
    return binarySearchRecursively(nums, target, mid, high);
  } else {
    return binarySearchRecursively(nums, target, low, mid - 1);
  }
}
