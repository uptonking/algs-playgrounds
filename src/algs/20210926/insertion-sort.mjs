/**
 * 分为已排序、未排序2部分
 * 当n很大时，后面的元素移动到前面交换的次数就会变得很多；
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function insertionSort(nums) {
  const len = nums.length;

  for (let i = 1; i < len; i++) {
    // * 每次循环都要将当前项 从后往前 插入到有序序列的正确位置
    for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
      const temp = nums[j];
      nums[j] = nums[j - 1];
      nums[j - 1] = temp;
    }
  }

  return nums;
}
