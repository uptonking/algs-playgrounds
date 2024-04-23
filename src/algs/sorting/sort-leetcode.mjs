/**
 * * 洗牌算法。打乱数组。
 * - Fisher-Yates 洗牌算法，
 *   - 时间复杂度： O(n) 空间复杂度：O(n)
 *   * 基本思想就是从原始数组中随机取一个之前没取过的数字到新的数组中
 * - Knuth-Durstenfeld shuffle
 *   - 在Fisher 等人的基础上对算法进行了改进，在原始数组上对数字进行交互，省去了额外O(n)的空间
 * https://leetcode-cn.com/problems/shuffle-an-array/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/74
 * https://leetcode-cn.com/problems/shuffle-an-array/solution/jing-dian-xi-pai-suan-fa-fisher-yates-shufflesuan-/
 * https://segmentfault.com/a/1190000039246947
 * 浅拷贝数组，利用random()方法重制数组下标索引。
 * 可用来实现音乐随机播放。
 *
 */
const Solution = function (nums) {
  this.nums = nums;
};

Solution.prototype.reset = function () {
  return this.nums;
};

// Knuth-Durstenfeld Shuffle
// 将“删除”的数字移至数组末尾，即将每个被删除数字与最后一个未删除的数字进行交换。
Solution.prototype.shuffle = function () {
  // 每次拷贝数组
  const res = [...this.nums];
  const len = res.length;

  // * 相当于每次随机取一个元素，放到数组末尾，尾部元素都是乱序的
  for (let i = len - 1; i >= 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    swap(res, randIndex, i);
  }
  return res;
};

// Fisher–Yates shuffle
// 从第 1 个到剩余的未删除项（包含）之间选择一个随机数 k。
// 从剩余的元素中将第 k 个元素删除并取出，放到新数组中。
// 重复第 1、2 步直到所有元素都被删除。
// 最终将新数组返回
function shuffle(arr) {
  let random;
  const newArr = [];

  while (arr.length) {
    random = Math.floor(Math.random() * arr.length);
    newArr.push(arr[random]);
    arr.splice(random, 1);
  }

  return newArr;
}

const swap = function (arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * * 在排序数组中查找元素的第一个和最后一个位置
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/84
 * 解一：findIndex、lastIndexOf
 * 解二：二分查找
 */

function searchRange(nums, target) {
  let mid;
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) {
      let start = mid;
      let end = mid;
      while (nums[start] === target) start--;
      while (nums[end] === target) end++;

      return [start + 1, end - 1];
    }

    if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return [-1, -1];
}
