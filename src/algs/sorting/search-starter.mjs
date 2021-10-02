import { quickSort } from './quick-sort.mjs';

export function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] > target) {
      high = mid - 1;
    }
    if (nums[mid] < target) {
      low = mid + 1;
    }
  }

  return 'not-found';
}

export function binarySearchRecursive(nums, target, low, high) {
  if (low === undefined) {
    low = 0;
  }
  if (high === undefined) {
    high = nums.length - 1;
  }
  if (low >= high) {
    return;
  }

  const mid = Math.floor((low + high) / 2);

  if (nums[mid] === target) {
    return mid;
  }

  if (nums[mid] < target) {
    return binarySearch(nums, target, mid + 1, high);
  } else {
    return binarySearch(nums, target, low, mid);
  }
}

const arr = [6, 4, -3, 0, 1, 6, 3, 0, -1];

console.log(binarySearch(quickSort(arr), -1));


