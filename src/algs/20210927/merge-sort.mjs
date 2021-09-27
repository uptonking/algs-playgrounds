/** mergeSort 排序算法模版，递归版 */
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
