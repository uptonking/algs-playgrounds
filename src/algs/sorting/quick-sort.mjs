/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** 💡️ quickSort排序算法模版，递归版，splice + concat，较快，用空间换时间 */
export function quickSortOutOfPlace(nums) {
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

/**
 * 💡️ quickSort排序算法模版，递归版，原地排序，比非原地排序要慢
 * [用 JavaScript 实现快速排序](https://segmentfault.com/a/1190000037611587)
 */
export function quickSort(nums, start, end) {
  if (start === undefined) start = 0;
  if (end === undefined) end = nums.length - 1;

  if (start >= end) return;

  const pivotIndex = partition(nums, start, end);

  quickSort(nums, start, pivotIndex - 1);
  quickSort(nums, pivotIndex + 1, end);

  return nums;
}

/**
 * 重新排列数组的元素，使得基准值左侧的有元素都<基准值，而右侧的所有元素都>=基准值。
 * 这一步称为分区。
 */
function partition(nums, start, end) {
  // 每次分区都以最后一个元素作为基准值，最后一个元素就固定在最后，在遍历时不参与交换了
  const pivot = nums[end];

  // 用来确定将数组分为2部分时基准值对应的索引
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (nums[i] < pivot) {
      swap(nums, i, pivotIndex);
      pivotIndex++;
    }
  }

  // 将固定在末尾的基准值交换到两部分序列中间的基准位置
  swap(nums, pivotIndex, end);

  return pivotIndex;
}

/**
 * 三路排序算法把排序的数据分为三部分，分别为小于 v，等于 v，大于 v;
 * 对处理大量重复元素的数组非常有效
 */
export function quickSort3Way(nums, start, end) {
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = nums.length - 1;
  }

  if (start >= end) {
    return;
  }

  const [left, right] = partition3Way(nums, start, end);

  quickSort(nums, start, left - 1);
  quickSort(nums, right + 1, end);

  return nums;
}

function partition3Way(nums, start, end) {
  // 每次分区都以最后一个元素作为基准值，最后一个元素就固定在最后，在遍历时不参与交换了
  const pivot = nums[start];

  let left = start;
  let right = end;

  // 用来确定将数组分为3部分时，小于pivot和等于pivot元素的总数
  let cur = start;

  while (cur <= right) {
    if (nums[cur] < pivot) {
      swap(nums, left, cur);
      left++;
      cur++;
    } else if (nums[cur] > pivot) {
      swap(nums, cur, right);
      right--;
    } else {
      cur++;
    }
  }

  return [left, right];
}

/**
 * 对含有可比较类型属性的对象数组进行就地排序；
 *
 * @param {Object[]} objArr 对象数组
 * @param {string} property 对象中要比较的属性名称
 * @param {Function=} comparator 比较函数，返回值是数值类型，默认数值相减
 * @returns 排序后的对象数组
 */
export function quickSortByProperty(
  objArr,
  property,
  comparator = (a, b) => a - b,
) {
  if (objArr.length <= 1) {
    return objArr;
  }

  // console.log(';;current-arr, ', objArr);

  const pivotIndex = Math.floor(objArr.length / 2);
  // 从数组中去掉基准值，并获取这个基准值
  const pivot = objArr.splice(pivotIndex, 1)[0];

  if (
    !['number', 'bigint', 'string', 'boolean'].includes(typeof pivot[property])
  ) {
    console.log(';;pivot-property: ', pivot, property);
    console.log(';;typeof pivot[property]: ', typeof pivot[property]);
    throw new Error(
      '对象数组排序失败，可排序的属性类型支持number/string/boolean，但实际是： ',
      typeof pivot[property],
      '; 需要手动传入第3个参数作为属性值的比较函数',
    );
  }

  const low = [];
  const high = [];

  for (let i = 0; i < objArr.length; i++) {
    if (comparator(objArr[i][property], pivot[property]) < 0) {
      low.push(objArr[i]);
    } else {
      high.push(objArr[i]);
    }
  }

  return [
    ...quickSortByProperty(low, property, comparator),
    pivot,
    ...quickSortByProperty(high, property, comparator),
  ];
}
