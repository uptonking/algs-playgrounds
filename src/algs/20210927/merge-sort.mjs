// * 只有mergeSort自身从设计上不是原地排序

/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** 💡️ mergeSort 排序算法模版，递归版 */
export function mergeSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  const mid = Math.floor(len / 2);

  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

/** 合并2个数组成有序数组 */
function merge(left, right) {
  const tempArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      tempArr.push(left.shift());
    } else {
      tempArr.push(right.shift());
    }
  }

  return [...tempArr, ...left, ...right];
}

export function mergeSortRecursively2(nums, start, end) {
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = nums.length - 1;
  }

  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);

  mergeSortRecursively2(nums, start, mid);
  mergeSortRecursively2(nums, mid + 1, end);

  let l = start;
  let r = mid + 1;
  const tempArr = [];

  while (l <= mid && r <= end) {
    if (nums[l] <= nums[r]) {
      tempArr.push(nums[l++]);
    } else {
      tempArr.push(nums[r++]);
    }
  }
  while (l <= mid) {
    tempArr.push(nums[l++]);
  }
  while (r <= end) {
    tempArr.push(nums[r++]);
  }

  // 将局部排好序的临时序列写回原数组
  for (l = start, r = 0; l <= end; l++, r++) {
    nums[l] = tempArr[r];
  }

  return nums;
}

function insertSort(nums, start, end) {
  for (let i = start + 1; i <= end; i++) {
    for (let j = i; j >= start && nums[j] < nums[j - 1]; j--) {
      swap(nums, j, j - 1);
    }
  }
}

/**
 * 用不同的方法处理小规模问题能改进大多数递归算法的性能，因为递归会使小规模问题中方法调用太过频繁，所以改进对它们的处理方法就能改进整个算法。
 * 因为插入排序非常简单， 因此一般来说在小数组上比归并排序更快。
 * 这种优化能使归并排序的运行时间缩短10%到15%；
 *
 * 截止范围：待排序序列长度N = 10，虽然在5~20之间任一截止范围都有可能产生类似的结果，
 * 这种做法也避免了一些有害的退化情形。摘自《数据结构与算法分析》Mark Allen Weiness 著
 */
export function mergeSortInsertForShort(nums, start, end) {
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = nums.length - 1;
  }

  if (start >= end) {
    return;
  }

  // 当数组较短时，直接使用插入排序原地排序短序列
  if (end - start < 9) {
    insertSort(nums, start, end);
    return;
  }

  const mid = Math.floor((start + end) / 2);

  mergeSortRecursively2(nums, start, mid);
  mergeSortRecursively2(nums, mid + 1, end);

  let l = start;
  let r = mid + 1;
  const tempArr = [];

  while (l <= mid && r <= end) {
    if (nums[l] <= nums[r]) {
      tempArr.push(nums[l++]);
    } else {
      tempArr.push(nums[r++]);
    }
  }
  while (l <= mid) {
    tempArr.push(nums[l++]);
  }
  while (r <= end) {
    tempArr.push(nums[r++]);
  }

  // 将局部排好序的临时序列写回原数组
  for (l = start, r = 0; l <= end; l++, r++) {
    nums[l] = tempArr[r];
  }

  return nums;
}

/** 三路归并，递归版 */
export function mergeSort3Way(nums) {
  // after array is broken down, sort the elems using insertion sort and return array
  if (nums.length <= 3) {
    const sortedArr = [nums.shift()];
    while (nums.length > 0) {
      if (nums[0] < sortedArr[0]) sortedArr.unshift(nums.shift());
      else if (nums[0] > sortedArr[sortedArr.length - 1])
        sortedArr.push(nums.shift());
      // edge case: remaining element to append will be nested between the other 2
      else sortedArr.splice(1, 0, nums.pop());
    }
    return sortedArr;
  }

  // divide array into 3 equal sections (maintaining 1/3 of the original array)  O( 2/3N )
  const initialSize = nums.length;
  const partialSize = Math.floor(nums.length / 3);
  let arr1 = nums.splice(0, partialSize);
  let arr2 = nums.splice(0, partialSize);

  // recursively sort the 3 sections O( logN )
  arr1 = mergeSort3Way(arr1);
  arr2 = mergeSort3Way(arr2);
  nums = mergeSort3Way(nums);

  // merge the 3 arrays through insert sort and by shifting the lowest value O( N )
  const sortedArr = [];
  for (let i = 0; i < initialSize; i++) {
    if (arr1[0] <= arr2[0] || arr2.length === 0) {
      if (arr1[0] <= nums[0] || nums.length === 0) sortedArr.push(arr1.shift());
      else sortedArr.push(nums.shift());
    } else {
      if (arr2[0] <= nums[0] || nums.length === 0) sortedArr.push(arr2.shift());
      else sortedArr.push(nums.shift());
    }
  }

  return sortedArr;
}
