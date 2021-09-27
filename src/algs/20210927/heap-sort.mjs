/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** heapSort 排序算法模版，非递归版 */
export function heapSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

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
