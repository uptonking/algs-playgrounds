/**
 * * 找出其中所有出现超过 ⌊ n/2 ⌋ 次的元素
 * 假设数组是非空的，并且给定的数组总是存在多数元素，如aabbaa
 * 出现次数大于n/2的最多只有1个元素
 */
function majorityElement2(nums) {
  let count = 0;

  let candidate;

  for (let i = 0; i < nums.length; i++) {
    if (count === 0) candidate = nums[i];

    candidate === nums[i] ? count++ : count--;
  }

  return candidate;
}

/**
 * * 找出其中所有出现超过 ⌊ n/3⌋ 次的元素
 * * 投票法：出现次数大于该数组长度1/3的值最多只有2个
 * https://leetcode-cn.com/problems/majority-element-ii/solution/qiu-zhong-shu-javascript-by-bruceyuj/
 * https://leetcode-cn.com/problems/majority-element-ii/comments/591551
 */
function majorityElement3(nums) {
  const len = nums.length;
  const ret = [];

  let n1 = null;
  let n2 = null;
  let cnt1 = 0;
  let cnt2 = 0;

  for (let i = 0; i < len; i++) {
    if (n1 === nums[i]) {
      cnt1++;
    } else if (n2 === nums[i]) {
      cnt2++;
    } else if (cnt1 === 0) {
      n1 = nums[i];
      cnt1++;
    } else if (cnt2 === 0) {
      n2 = nums[i];
      cnt2++;
    } else {
      cnt1--;
      cnt2--;
    }
  }

  cnt1 = 0;
  cnt2 = 0;

  for (let i = 0; i < len; i++) {
    if (n1 === nums[i]) {
      cnt1++;
    } else if (n2 === nums[i]) {
      cnt2++;
    }
  }

  if (cnt1 > (len / 3) >>> 0) {
    ret.push(n1);
  }
  if (cnt2 > (len / 3) >>> 0) {
    ret.push(n2);
  }

  return ret;
}

/**
 * * 搜索旋转排序数组
 * * 思路：二分查找
 * - 首先判断那边是有序数组 还是在无序数组那边，
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * https://juejin.cn/post/6986639440441507871
 * - 在下标k旋转使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
 * - 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 */
function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    // 求取中间的值
    const mid = Math.floor(l + (r - l) / 2);

    if (nums[l] < nums[mid]) {
      // 如果左边的是有序数列
      // 如果在有序数列中，则缩小范围到左边的数组中
      if (nums[l] <= target && target <= nums[mid]) {
        r = mid;
      } else {
        l = mid + 1;
      }
    } else if (nums[l] > nums[mid]) {
      // 如果右边的有序数列，则还是在左边找，
      // 因为是旋转后的升序数组，所以如果arr[l] <= target || target <= arr[mid]，则有还是在左边数组中
      if (nums[l] <= target || target <= nums[mid]) {
        r = mid;
      } else {
        l = mid + 1;
      }
    } else {
      // 如果遇到了 arr[l]===arr[mid]，有2中情况，第一个遇到了相同的值例如 [3,3,3,5],第二种情况找到了答案
      // 找到了答案
      if (nums[l] === target) {
        return l;
      } else {
        // 过滤掉重复值 继续下一轮循环
        l++;
      }
    }
  }

  return -1;
}

/**
 * * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
 * * 思路1:二分查找法
 * * 思路2:牛顿迭代法
 * https://leetcode-cn.com/problems/sqrtx/
 */
function mySqrt(x) {
  if (x === 1) return 1;
  let min = 0;
  let max = x;

  while (max - min > 1) {
    const m = Math.floor((max + min) / 2);

    x / m < m ? (max = m) : (min = m);
  }

  return min;
}

/**
 * * 螺旋矩阵
 * * 思路1：逐个遍历，在边界先确定方向，再修改索引遍历下一个
 * * 思路2：先遍历外圈，再递归遍历内圈
 * https://leetcode-cn.com/problems/spiral-matrix/
 * https://leetcode-cn.com/problems/spiral-matrix/solution/jsshi-xian-luo-xuan-ju-zhen-by-adorable-deg/
 * m行n列的矩阵 matrix ，请按照 顺时针螺旋顺序，返回矩阵中的所有元素。
 * m == matrix.length; n == matrix[i].length
 */
function spiralOrder(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let i = 0;
  let j = 0;

  const ret = [];

  // 0-右，1-下，2-左，3-上
  let direction = 0;

  for (let curr = 0; curr < m * n; curr++) {
    ret.push(matrix[i][j]);
    // console.log('curr, ', i, j, matrix[i][j]);

    matrix[i][j] = true;

    // 若正在向右，且到底边界 或 右方下一个已访问过了，则改方向
    if (direction === 0 && (j === n - 1 || matrix[i][j + 1] === true)) {
      direction = 1;
    }
    if (direction === 1 && (i === m - 1 || matrix[i + 1][j] === true)) {
      direction = 2;
    }
    if (direction === 2 && (j === 0 || matrix[i][j - 1] === true)) {
      direction = 3;
    }
    if (direction === 3 && (i === 0 || matrix[i - 1][j] === true)) {
      direction = 0;
    }

    if (direction === 0) j++;
    if (direction === 1) i++;
    if (direction === 2) j--;
    if (direction === 3) i--;
  }

  return ret;
}

// 按圈递归处理
function spiralOrderRecursive(matrix) {
  const recursive = (arr, result) => {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!arr[i].length) return result;

      if (i === 0) {
        // 第一行的元素正序插入
        result = result.concat(arr[i]);
      } else if (i === len - 1) {
        // 倒数第一行的元素倒序插入
        result = result.concat(arr[i].reverse());
      } else {
        // 其他取每行的最后一个，即最右边的值
        result.push(arr[i].pop());
      }
    }

    // 移除第一行和最后一行
    arr.shift();
    arr.pop();

    // 访问并移除每行左边第1个值
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].length) {
        // shift 删除第一个元素并返回删除的值
        result.push(arr[i].shift());
      } else {
        return result;
      }
    }

    // 如果数组还有，就递归处理
    if (arr.length) {
      return recursive(arr, result);
    } else {
      return result;
    }
  };

  return recursive(matrix, []);
}

/**
 * * 缺失的第一个正数
 * * 理想情况下，索引i的位置的最小正数是 i+1
 * * 将[1,i+1]之间的数对应的位置置为负数，然后输出不是负数的位置就是最小正数。
 * 未排序的整数数组，请你找出其中没有出现的最小的正整数。
 * https://leetcode-cn.com/problems/first-missing-positive/
 * https://mingtiao.top/2020/06/27/Leetcode-41-%E7%BC%BA%E5%A4%B1%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%AD%A3%E6%95%B0/
 * * 空间复杂度O(1)，不能用额外存储，只能置换
 *
 */
function firstMissingPositive(nums) {
  const len = nums.length;

  // 逐个循环，将值大小在[1,len]范围内的nums[i]元素值放到正确的位置，即 1,2,3...
  for (let i = 0; i < len; i++) {
    // 如果索引i的位置方的不是 i+1，
    while (nums[i] !== i + 1) {
      // 不为正确的数字

      // 若nums[i]不在1 ~len范围内，
      if (nums[i] <= 0 || nums[i] > len) break;
      // num[nums[i] - 1]位置上已经放置了正确的数字，不必再交换
      if (nums[i] === nums[nums[i] - 1]) break;

      // 若nums[i]的值在长度范围内，则进行交换，使nums[i]放置到正确位置即 nums[i]-1
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return len + 1;
}

// 使用map用空间换时间
function firstMissingPositiveMoreSpace(nums) {
  const map = new Map();

  for (const num of nums) map.set(num, 1);
  for (var i = 1; i <= nums.length; i++)
    if (map.get(i) === undefined) {
      return i;
    }

  return i;
}

// 暴力搜索到数组长度的正数，但时间复杂度为O(n2)
function firstMissingPositiveMoreSpace(nums) {
  for (var i = 1; i <= nums.length; i++)
    if (nums.indexOf(i) === -1) {
      return i;
    }

  return i;
}

/**
 * * 最小覆盖子串
 * * 思路：先找出所有的包含T的子串。找出长度最小的
 * https://leetcode-cn.com/problems/minimum-window-substring/
 * https://github.com/sl1673495/leetcode-javascript/issues/43
 * https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-jshua-dong-chuang-kou-shu/
 * https://leetcode-cn.com/problems/minimum-window-substring/solution/76-zui-xiao-fu-gai-zi-chuan-js-by-6xiaodi/
 * 返回 s 中涵盖 t 所有字符的最小子串
 */
function minWindow(s, t) {
  // 先制定目标 根据t字符串统计出每个字符应该出现的个数
  const targetMap = makeCountMap(t);

  const sl = s.length;
  const tl = t.length;
  let left = 0; // 左边界
  let right = -1; // 右边界
  const countMap = {}; // 当前窗口子串中 每个字符出现的次数
  let min = ''; // 当前计算出的最小子串

  // 循环终止条件是两者有一者超出边界
  while (left <= sl - tl && right <= sl) {
    // 和 targetMap 对比出现次数 确定是否满足条件
    let isValid = true;
    Object.keys(targetMap).forEach((key) => {
      const targetCount = targetMap[key];
      const count = countMap[key];
      if (!count || count < targetCount) {
        isValid = false;
      }
    });

    if (isValid) {
      // 如果满足 记录当前的子串 并且左边界右移
      const currentValidLength = right - left + 1;
      if (currentValidLength < min.length || min === '') {
        min = s.substring(left, right + 1);
      }
      // 也要把map里对应的项去掉
      countMap[s[left]]--;
      left++;
    } else {
      // 否则右边界右移
      addCountToMap(countMap, s[right + 1]);
      right++;
    }
  }

  return min;
}

function addCountToMap(map, str) {
  if (!map[str]) {
    map[str] = 1;
  } else {
    map[str]++;
  }
}

function makeCountMap(strs) {
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    const letter = strs[i];
    addCountToMap(map, letter);
  }
  return map;
}

// console.log(minWindow("aa", "a"))

// 时间消耗很少
function minWindow2(s, t) {
  let left = 0;
  let right = 0;

  // 需要的子串及字符个数
  const need = new Map();

  for (const c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }

  let needTypeCount = need.size; // 需求中不同字符总个数
  let minSub = '';
  while (right < s.length) {
    const current = s[right];
    if (need.has(current)) {
      // 需要对应字符个数减1
      need.set(current, need.get(current) - 1);
      if (need.get(current) === 0) {
        needTypeCount--;
      }
    }

    // 完全满足t字符串的子串了，尝试尽可能减小子串的长度
    while (needTypeCount === 0) {
      const mewMinSub = s.substring(left, right + 1); // 左闭右开

      // 找到最小子串
      // 优化：minSub最开始是空字符串无需逻辑判断，到下一轮再比较长度
      if (!minSub || mewMinSub.length < minSub.length) {
        minSub = mewMinSub;
      }

      const currentLight = s[left];
      // 移动左指针对应字符在需求列表中，对应字符需求数加1（子串减少一个目标字符，就有一个需求量的增加）
      if (need.has(currentLight)) {
        need.set(currentLight, need.get(currentLight) + 1);
        if (need.get(currentLight) === 1) {
          needTypeCount++;
        }
      }
      left++;
    }

    right++;
  }
  return minSub;
}

/**
 * * 比较版本号
 * * 思路1: 单指针，使用split分割成数组
 * * 思路2: 双指针，不使用数组，用双指针去指向当前版本号所在的位置，自己分割字符
 * https://leetcode-cn.com/problems/compare-version-numbers/
 * https://leetcode-cn.com/problems/compare-version-numbers/solution/bi-jiao-ban-ben-hao-dan-zhi-zhen-shuang-zhi-zhen-j/
 * 版本号由一个或多个修订号组成，各修订号由一个 '.' 连接
 * 每个修订号由 多位数字 组成，可能包含 前导零 。
 * 比较修订号时，只需比较 忽略任何前导零后的整数值
 */
function compareVersion(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');

  let pointer = 0;

  // 先比较完相同长度的部分
  while (pointer < arr1.length && pointer < arr2.length) {
    // 💡️ 字符串相减，会先转换成数值再相减；如 '3'-'02' 得到-1
    const res = arr1[pointer] - arr2[pointer];
    if (res === 0) {
      pointer++;
    } else {
      return res > 0 ? 1 : -1;
    }
  }

  // 上面比完若未结束返回，到这里应该相同长度的部分是相等的

  // 若arr1仍有小版本号
  while (pointer < arr1.length) {
    if (Number(arr1[pointer]) > 0) {
      // 第1个大
      return 1;
    } else {
      pointer++;
    }
  }

  // 若arr2仍有小版本号
  while (pointer < arr2.length) {
    if (Number(arr2[pointer]) > 0) {
      // 第1个小
      return -1;
    } else {
      pointer++;
    }
  }

  // 版本号完全相同
  return 0;
}

/**
 * * 双指针法，将字符分割的部分自己实现
 */
function compareVersion(version1, version2) {
  let p1 = 0;
  let p2 = 0;

  /** 寻找当前区间的版本号 */
  const findDigit = (str, start) => {
    let i = start;
    while (str[i] !== '.' && i < str.length) {
      i++;
    }
    return i;
  };

  while (p1 < version1.length && p2 < version2.length) {
    const nextA = findDigit(version1, p1);
    const nextB = findDigit(version2, p2);
    const numA = Number(version1.substr(p1, nextA - p1));
    const numB = Number(version2.substr(p2, nextB - p2));
    if (numA !== numB) {
      return numA > numB ? 1 : -1;
    }
    p1 = nextA + 1;
    p2 = nextB + 1;
  }
  // 若arrayA仍有小版本号
  while (p1 < version1.length) {
    const nextA = findDigit(version1, p1);
    const numA = Number(version1.substr(p1, nextA - p1));
    if (numA > 0) {
      return 1;
    }
    p1 = nextA + 1;
  }
  // 若arrayB仍有小版本号
  while (p2 < version2.length) {
    const nextB = findDigit(version2, p2);
    const numB = Number(version2.substr(p2, nextB - p2));
    if (numB > 0) {
      return -1;
    }
    p2 = nextB + 1;
  }
  // 版本号完全相同
  return 0;
}
