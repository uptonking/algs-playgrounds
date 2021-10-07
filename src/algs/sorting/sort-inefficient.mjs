/** 排序算法模版 */
export function arrSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  return nums;
}

/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** selectionSort排序算法模版 */
export function selectionSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  for (let i = 0; i < len - 1; i++) {
    let min = i;

    for (let j = i; j < len; j++) {
      if (nums[j] < nums[min]) {
        min = j;
      }
    }

    swap(nums, i, min);
  }

  return nums;
}

/** insertionSort排序算法模版 */
export function insertionSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  // 从索引1开始
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
      swap(nums, j, j - 1);
    }
  }

  return nums;
}

/** shellSort 排序算法模版 */
export function shellSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  for (let gap = Math.floor(len / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    // 从索引gap开始
    for (let i = gap; i < len; i += gap) {
      for (let j = i; j > 0 && nums[j] < nums[j - gap]; j -= gap) {
        swap(nums, j, j - gap);
      }
    }
  }

  return nums;
}

/**  bubbleSort 排序算法模版 */
export function bubbleSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }
  let isAnyItemsSwapped = false;

  for (let i = 0; i < len - 1; i++) {
    isAnyItemsSwapped = false;

    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
        // if (isAnyItemsSwapped === false) {
        isAnyItemsSwapped = true;
        // }
      }
    }

    if (isAnyItemsSwapped === false) {
      break;
    }
  }

  return nums;
}
