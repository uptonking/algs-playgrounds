/**
 * 插入排序每次交换相邻元素在n很大时效率太低，
 * 希尔排序将处在相同间隔gap的元素提取出来单独进行插入排序，先把整个序列排得相对比较有序，然后逐步将间隔减小到1
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function shellSort(nums) {
  const len = nums.length;

  for (let gap = Math.floor(len / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    // * 每次对间隔gap的元素排序都是一套直接插入排序
    for (let i = gap; i < len; i = i + gap) {
      for (let j = i; j > 0 && nums[j] < nums[j - gap]; j = j - gap) {
        const temp = nums[j];
        nums[j] = nums[j - gap];
        nums[j - gap] = temp;
      }
    }
  }

  return nums;
}
