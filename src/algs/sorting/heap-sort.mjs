/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** 💡️ heapSort 排序算法模版，非递归版 */
export function heapSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  // 以数组存储的完全二叉树，索引i对应的父节点索引为(i-1)/2
  // 数组最后一个元素索引为i-1，所以其父节点索引为 (i-1-1)/2 = i/2 - 1
  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMax(nums, i, len);
  }

  for (let j = len - 1; j > 0; j--) {
    swap(nums, 0, j);
    // j可以代表本轮未排序元素个数
    heapifyMax(nums, 0, j);
  }

  return nums;
}

function heapifyMax(nums, i, heapSize) {
  for (let j = 2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize && nums[j] < nums[j + 1]) {
      j++;
    }

    if (nums[j] > nums[i]) {
      swap(nums, j, i);
      i = j;
    } else {
      break;
    }
  }
}

/** heapSort 排序算法模版，递归版 */
export function heapSortRecursively(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMaxRecursively(nums, i, len);
  }

  for (let j = len - 1; j > 0; j--) {
    swap(nums, 0, j);
    // j可以代表本轮未排序元素个数
    heapifyMaxRecursively(nums, 0, j);
  }

  return nums;
}

function heapifyMaxRecursively(nums, i, heapSize) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  if (left < heapSize && nums[left] > nums[largest]) {
    largest = left;
  }
  if (right < heapSize && nums[right] > nums[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(nums, largest, i);
    heapifyMaxRecursively(nums, largest, heapSize);
  }
}
