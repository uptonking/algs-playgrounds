export function binarySearchRecursive(nums, target, low, high) {
  if (!nums) return -1;
  if (low === undefined) {
    low = 0;
  }
  if (high === undefined) {
    high = nums.length - 1;
  }

  // 若参数数组只有1个元素，也应该执行比较，所以这里不能为=
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (nums[mid] === target) {
    return mid;
  }
  if (nums[mid] > target) {
    return binarySearch(nums, target, low, mid - 1);
  } else {
    return binarySearch(nums, target, mid + 1, high);
  }

  // return 'not-found';
}

export function binarySearch(nums, target) {
  if (!nums) return -1;

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

  return -1;
}
