export function sort(nums) {
  const len = nums.length;
  if (nums.length <= 1) return nums;

  return nums;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

export function quickSort(nums) {
  const len = nums.length;
  if (nums.length <= 1) return nums;

  const pivotIndex = Math.floor(len / 2);

  const pivot = nums.splice(pivotIndex, 1)[0];

  const low = [];
  const high = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivot) {
      low.push(nums[i]);
    } else {
      high.push(nums[i]);
    }
  }

  return [...quickSort(low), pivot, ...quickSort(high)];
}

export function mergeSort(nums) {
  const len = nums.length;
  if (nums.length <= 1) return nums;

  const mid = Math.floor(len / 2);

  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  const tempArr = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      tempArr.push(arr1.shift());
    } else {
      tempArr.push(arr2.shift());
    }
  }

  return [...tempArr, ...arr1, ...arr2];
}

export function heapSort(nums) {
  const len = nums.length;
  if (nums.length <= 1) return nums;

  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMax(nums, i, len);
  }

  for (let j = len - 1; j >= 0; j--) {
    swap(nums, 0, j);
    heapifyMax(nums, 0, j);
  }

  return nums;
}

function heapifyMax(nums, i, heapSize) {
  for (let j = 2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize && nums[j] < nums[j + 1]) {
      j++;
    }

    if (nums[i] < nums[j]) {
      swap(nums, i, j);
      i = j;
    } else {
      break;
    }
  }
}
