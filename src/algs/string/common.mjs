/**
 * * 翻转字符串里的单词(无空格字符构成一个单词)。
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
 * - 用数组中的第一个字符串作为基准
 * - 匹配后面每个字符串是否都有公共部分，有就退出循环，没有就继续查找
 */

function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  if (strs.length === 1) return strs[0];

  // 取最短的字符串作为基准，也可以简单取第1个字符串作为基准
  const minLenStr = strs.find(
    (i) => i.length === Math.min(...strs.map((i) => i.length)),
  );

  // 从第1个字符开始往后逐次比较
  let ret = '';
  for (let i = 0; i < minLenStr.length; i++) {
    if (
      strs.every((item) => item.slice(0, i + 1) === minLenStr.slice(0, i + 1))
    ) {
      ret = minLenStr.slice(0, i + 1);
    }
  }
  return ret;
}

function longestCommonPrefix(strs) {
  if (strs === null || strs.length === 0) return '';

  let ret = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < ret.length && j < strs[i].length; j++) {
      if (ret.charAt(j) !== strs[i].charAt(j)) break;
    }
    ret = ret.substring(0, j);
    if (ret === '') return '';
  }

  return ret;
}

// ❌️ 测试未通过 ["dog","racecar","car"]
function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return '';

  const first = strs[0];

  let result = first;
  for (let i = 0; i < first.length; i++) {
    const isOverlap = strs.every((item) => item.indexOf(result) !== -1);
    if (isOverlap) {
      break;
    }
    result = result.substr(0, first.length - i);
  }

  return result;
}

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
 * * 判断输入是不是回文字符串。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/20
 */

// 最简单的回文字符串验证，考虑所有字符
function isPalindrome(s) {
  if (typeof s !== 'string') return false;

  return s.split('').reverse().join('') === s;
}

function isPalindrome2(s) {
  if (typeof s !== 'string') return false;
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s.charAt(i) !== s.charAt(j)) return false;
    i++;
    j--;
  }
  return true;
}

function isPalindrome3(s) {
  s = s.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();
}

/**
 * * 反转字符数组。原地修改。
 * * 可以抽象为更一般的反转数组。
 * https://leetcode-cn.com/problems/reverse-string/
 */
function reverseString(s) {
  const len = s.length;
  const mid = Math.floor(len / 2);

  let temp;

  for (let i = 0; i < mid; i++) {
    temp = s[i];
    s[i] = s[len - i - 1];
    s[len - i - 1] = temp;
  }
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
