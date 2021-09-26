/**
 * 分为已排序、未排序2部分
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function selectionSort(nums) {
  const len = nums.length;

  for (let i = 0; i < len - 1; i++) {
    let min = i;

    // * 每次循环找出最小值的索引
    for (let j = i; j < len; j++) {
      if (nums[j] < nums[min]) {
        min = j;
      }
    }

    const temp = nums[i];
    nums[i] = nums[min];
    nums[min] = temp;
  }

  return nums;
}
