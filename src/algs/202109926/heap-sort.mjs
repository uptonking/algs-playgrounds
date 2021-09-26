/**
 *
 * * 先从后往前逐次构建大顶堆，然后将堆顶最大值调整到末尾，再对除末尾有序堆顶元素外的剩余元素构建大顶堆；
 * 完全二叉树：二叉树除开最后一层，其他层结点数都达到最大，最后一层的所有结点都集中在左边。
 * 对于结点i(i为节点所在数组的索引号)，其子结点为 2i+1 与 2i+2，其父节点为 Math.floor((i+1)/2))-1 或 Math.ceil(i/2)-1；
 *
 * @param nums 数值型数组，可包含负值、浮点数
 * @returns 已排序的数组
 */
export function heapSort(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums;
  }

  // 从最后一个非叶子结点开始，从后往前，依次构建大顶堆；
  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    // 建堆时，从i节点开始，处理其子树
    heapifyMax(nums, i, len);
  }

  // 每次循环将堆顶最大值交换放到数组末尾，然后对数组除末尾有序元素外的其他元素再次构建大顶堆
  for (let i = len - 1; i > 0; i--) {
    // 交换堆顶和当前无序序列的末尾元素，交换后最大值就到了数组后面位置
    swap(nums, 0, i);
    // 建堆时，总是从0号根节点开始，这里的i表示剩余未排序的元素数量
    heapifyMax(nums, 0, i);
  }

  return nums;
}

/**
 * * 从数组的某个非叶节点i，从上往下构建大顶堆，基于循环实现，注意前提是i的子树已经是大顶堆；
 * 实际做得工作是将节点i的值调正到子树大顶堆中的正确位置
 * todo 递归建堆写法
 * @param {number[]} nums i子树是大顶堆的数组
 * @param {number} i 建堆起始节点索引号，是非叶节点，准备将值调整到堆中正确的位置
 * @param {number} heapSize 本次建堆时，未排序节点的数量，不处理剩余已排序的节点
 * @returns {number[]} 修改后的i根节点为大顶堆的数组
 */
function heapifyMax(nums, i, heapSize) {
  for (let j = 2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize && nums[j] < nums[j + 1]) {
      // 找到i的左右子节点中值较大的节点的索引号，注意前提i子树为大顶堆
      j++;
    }

    if (nums[j] > nums[i]) {
      // 若子节点比父节点的值大，则交换，让父节点i的值变为最大值

      swap(nums, i, j);
      // 让j作为新的父节点
      i = j;
    } else {
      // 因为nums本身前提是大顶堆，当temp比子树大时，说明已经调整到正确位置了，不必再继续了
      break;
    }
  }
}

/** 这里与非递归的版本思路和代码完全相同 */
export function heapSortRecursively(nums) {
  const len = nums.length;
  if (len === 1) {
    return nums;
  }

  // 从最后一个非叶子结点开始，从后往前，依次构建大顶堆
  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMaxRecursively(nums, i, len);
  }

  // 每次循环将堆顶最大值交换放到数组末尾，然后对数组除末尾有序元素外的其他元素再次构建大顶堆
  for (let i = len - 1; i > 0; i--) {
    // 交换堆顶和当前无序序列的末尾元素，交换后最大值就到了数组后面位置
    swap(nums, 0, i);
    // 这里的i表示剩余未排序的元素数量
    heapifyMaxRecursively(nums, 0, i);
  }

  return nums;
}

/**
 * * 从节点i开始向下构建大顶堆，基于递归
 */
function heapifyMaxRecursively(nums, i, heapSize) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  // 默认堆顶值最大，但因为之前刚刚交换过顺序,若不是最大，则调整最大值到根节点；若是最大，则本次建堆完成了
  let largest = i;

  if (left < heapSize && nums[left] > nums[largest]) {
    largest = left;
  }
  if (right < heapSize && nums[right] > nums[largest]) {
    largest = right;
  }

  // 若子节点更大，则交换后，再递归处理新的子节点值
  if (largest !== i) {
    swap(nums, i, largest);
    heapifyMaxRecursively(nums, largest, heapSize);
  }
}

/** 交换arr数组中i,j两个位置的值 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
