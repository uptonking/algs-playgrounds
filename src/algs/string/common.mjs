/**
 * * 翻转字符串里的单词。无空格字符构成一个单词。
 * 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 * https://leetcode-cn.com/problems/reverse-words-in-a-string/
 */

function reverseWords(s) {
  // return s.match(/[\w!,]+/g).reverse().join(" ");
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ');
}

/**
 * * 查找字符串数组中的最长公共前缀。
 * https://leetcode-cn.com/problems/longest-common-prefix/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/19
 * 公共指针法
 */

function longestCommonPrefix(strs) {
  if (!strs || !strs.length) {
    return '';
  }

  // 从0开始依次比较
  let currentIndex = 0;

  while (true) {
    // 取第一个字符串的当前位字符作为参照
    const refer = strs[0][currentIndex];
    // 是否全部匹配
    const currentAllMatch = strs.reduce((pre, str) => {
      return pre && str.charAt(currentIndex) === refer;
    }, true);

    if (currentAllMatch) {
      currentIndex++;
    } else {
      break;
    }
  }

  return strs[0].substring(0, currentIndex);
}

/**
 * 判断输入是不是回文字符串。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/20
 */

function isPlalindrome(input) {
  if (typeof input !== 'string') return false;
  return input.split('').reverse().join('') === input;
}

function isPlalindrome2(input) {
  if (typeof input !== 'string') return false;
  let i = 0;
  let j = input.length - 1;
  while (i < j) {
    if (input.charAt(i) !== input.charAt(j)) return false;
    i++;
    j--;
  }
  return true;
}

/**
 * * 无重复字符的最长子串。
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/21
 * 快慢指针维护一个滑动窗口，如果滑动窗口里面有快指针fastp所指向的元素（记录这重复元素在滑动窗口的索引tmp），
 * 那么滑动窗口要缩小，即慢指针slowp要移动到tmp的后一个元素。
 */

/**
 * 使用一个数组来维护滑动窗口，遍历字符串，判断字符是否在滑动窗口数组里
 * 时间复杂度：O(n2)， 其中 arr.indexOf() 时间复杂度为 O(n) ，arr.splice(0, index+1) 的时间复杂度也为 O(n)
 */
function lengthOfLongestSubstring(s) {
  const arr = [];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const index = arr.indexOf(s[i]);
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(arr.length, max);
  }
  return max;
}

const lengthOfLongestSubstring2 = function (s) {
  let res = 0;
  let slowp = 0;
  let tmp = 0;
  for (let fastp = 0; fastp < s.length; fastp++) {
    tmp = s.substring(slowp, fastp).indexOf(s.charAt(fastp)); // 滑动窗口有没有重复元素
    if (tmp === -1) {
      // 没有
      res = Math.max(res, fastp - slowp + 1); // 上一次值和滑动窗口值大小比较
    } else {
      // 有，移动慢指针， 是slowp+tmp+1不是tmp+1，因为tmp是根据滑动窗口算的
      slowp = slowp + tmp + 1;
    }
  }
  return res;
};

const lengthOfLongestSubstring3 = function (s) {
  let index = 0;
  let max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    index = s.substring(i, j).indexOf(s[j]);
    if (index !== -1) {
      i = i + index + 1;
    }
    max = Math.max(max, j - i + 1);
  }
  return max;
};

/**
 * 字符串相加。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/32
 * 从 num1 ，num2 的尾部开始计算，模拟人工加法，保存到 tmp 中；
 * 计算 tmp 的个位数，并添加到 result 的头部，这里的 result 是 string 类型，不是 number 类型；
 */

function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let move = 0;
  let result = '';

  let n1;
  let n2;

  while (i >= 0 || j >= 0) {
    n1 = i >= 0 ? num1[i] : 0;
    n2 = j >= 0 ? num2[j] : 0;
    const tmp = Number(n1) + Number(n2) + move;
    move = tmp >= 10 ? 1 : 0;
    result = (tmp % 10) + result;
    i--;
    j--;
  }
  return move ? move + result : result;
}

// const addStrings = function (num1, num2) {
//   let a = num1.length;
//   let b = num2.length;
//   let result = '';
//   let tmp = 0;

//   while (a || b) {
//     a ? (tmp += Number(num1[--a])) : '';
//     b ? (tmp += Number(num2[--b])) : '';

//     result = (tmp % 10) + result;

//     if (tmp > 9) tmp = 1;
//     else tmp = 0;
//   }

//   if (tmp) result = 1 + result;

//   return result;
// };

/**
 * 字符串转换整数 (atoi)
 * https://leetcode-cn.com/problems/string-to-integer-atoi/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/132
 * 如果第一个字符不能转换为数字，parseInt会返回 NaN。
 */

function myAtoi(s) {
  // parseInt
  const number = parseInt(s, 10);

  // 判断 parseInt 的结果是否为 NaN，是则返回 0
  if (isNaN(number)) {
    return 0;
  } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
    // 超出
    return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  } else {
    return number;
  }
}

