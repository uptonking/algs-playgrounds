/** quickSort排序算法模版，递归版 */
export function quickSort(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

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
