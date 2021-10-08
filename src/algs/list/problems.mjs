/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * * 链表中倒数第k个节点
 * * 思路： 快慢双指针，让第一个先走k步，然后两个指针一起移动，
 * * 当第一个指针到最后一个节点处，第二个指针就在倒数第K个节点
 */
function getKthFromEnd(head, k) {
  let fast = head;
  let slow = head;

  while (k !== 0) {
    fast = fast.next;
    k--;
  }

  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}

/**
 *
 * * 删除链表倒数第 n 个结点。
 * 要求在删除了指定节点后，需要返回的是链表的头结点。所以返回的是head。
 * * 双指针法
 * 快指针先走n个节点，然后快慢指针一起，知道快指针走到null,这时慢指针指向n-1
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/16
 */
function removeNthFromEnd(head, n) {
  let fast = head;
  let slow = head;

  while (--n) {
    fast = fast.next;
  }

  // 若快指针走到最后一个节点了，说明倒数第n个就是头结点
  if (!fast.next) {
    // 删除头结点
    return head.next;
  }

  fast = fast.next;

  // 快指针走到最后一个非空节点
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return head;
}

// 利用数组来实现
function removeNthFromEnd2(head, n) {
  if (head === null) return null;

  const arr = [];
  let p = head;
  while (p) {
    arr.push(p);
    p = p.next;
  }

  const pos = arr.length - n;
  if (pos === 0) {
    return head.next;
  }

  arr[pos - 1].next = arr[pos].next;

  // for (let i = pos + 1; i <= arr.length - 1; i++) {
  //   arr[i - 1] = arr[i];
  // }

  return head;
}

/**
 * * 找到两个单链表相交的起始节点。注意相交节点之后的节点序列共享。
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/17
 * 思路1，标记法，或者用一个新数组存放已访问过的节点。
 * 思路2，链表转数组。
 */
function getIntersectionNode(headA, headB) {
  while (headA) {
    headA.visited = true;

    headA = headA.next;
  }

  while (headB) {
    if (headB.visited) return headB;
    headB = headB.next;
  }

  return null;
}

// 不能过值相等而判断相交节点，因为存在两条链表都相同的情况
// 可直接比较引用
function getIntersectionNode2(headA, headB) {
  if (!headA || !headB) return null;

  const arr1 = listToArray(headA);
  const arr2 = listToArray(headB);
  let retNode = null;

  // console.log(arr1);
  // console.log(arr2);

  // 不是找第一个相同值，而是第一个相交节点
  // retNode = arr1.find((node) => {
  //   const index = arr2.findIndex(node2=>node2.);
  //   return index !== -1 && node.next.val === arr2[index + 1];
  // });
  retNode = arr1.find((node) => arr2.includes(node));

  return retNode;
}

/** 链表转数组 */
function listToArray(head, isValOnly) {
  const arr = [];

  while (head) {
    if (isValOnly) {
      arr.push(head.val);
    } else {
      arr.push(head);
    }

    head = head.next;
  }

  return arr;
}

/**
 * * 两数相加。给定两个用链表表示的整数，每个节点包含一个数位。
 * * 这些数位是反向存放的。并用链表形式返回结果。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/114
 */
function addTwoNumbers(l1, l2) {
  // 用carry存储每次的进位
  let carry = 0;
  // 作为占位的空节点，最后会丢掉
  const root = new ListNode(0);

  let curr = root;

  while (l1 || l2) {
    let sum = 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }

    sum += carry;
    carry = Math.floor(sum / 10);

    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }

  if (carry === 1) {
    curr.next = new ListNode(carry);
    curr = curr.next;
  }

  return root.next;
}

// ❌️ 链表转数组的思路错误，当链表元素很多，超出number范围时就不能这么做
function addTwoNumbers(l1, l2) {
  const arr1 = listToArray(l1, true);
  const arr2 = listToArray(l2, true);

  const num =
    Number(reversedArrayToNumber(arr1)) + Number(reversedArrayToNumber(arr2));

  return numberToReversedList(num);
}

function reversedArrayToNumber(nums) {
  if (nums.length === 1) return nums;

  let ret = 0;

  for (let i = 0; i < nums.length; i++) {
    ret = ret + nums[i] * Math.pow(10, i);
  }

  return ret;
}

function numberToList(num) {
  // str转chars不要用str.split('')，因为可能有其他语言编码的字符，可使用[...str]
  const chars = Array.from(String(num));

  const head = new ListNode(chars[0]);

  let curr = head;
  for (let i = 1; i < chars.length; i++) {
    const node = new ListNode(chars[i]);
    curr.next = node;
    curr = node;
  }

  return head;
}

function numberToReversedList(num) {
  // str转chars不要用str.split('')，因为可能有其他语言编码的字符，可使用[...str]
  const chars = Array.from(String(num));

  const head = new ListNode(chars[chars.length - 1]);

  let curr = head;
  for (let i = chars.length - 2; i >= 0; i--) {
    const node = new ListNode(chars[i]);
    curr.next = node;
    curr = curr.next;
  }

  return head;
}

/**
 * * 删除排序链表中的重复元素，最终链表可包含重复元素中的一个
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
 * 给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
 */
function deleteDuplicates(head) {
  if (!head || !head.next) return head;

  head.next = deleteDuplicates(head.next);

  if (head.val === head.next.val) head.next = head.next.next;

  return head;
}

function deleteDuplicates(head) {
  if (!head || !head.next) return head;

  let curr = head;

  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
}

/**
 * * 删除排序链表中的重复元素，且最终链表不包含该元素
 * * 思路主要思路还是双指针，
 * - prev指针上一个元素，head指针遍历每个元素，当prev和head指向的元素值不同时，两者同时向后移动，
 * - 当prev和head指向的元素值相同时，此时说明出现重复元素，那么prev指针不动，head指针继续向后搜索直到找到不同的元素，
 * - 然后修改指针指向，将重复元素段移除。
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/comments/
 */
 function deleteDuplicates(head) {
  if (!head || !head.next) return head;

  let linkHead = head;
  let prev = head;
  head.prev = null;
  let flag = false;

  while (head.next) {
    head.next.prev = head;
    head = head.next;

    if (head.val === prev.val) {
      if (!flag) {
        flag = true; // 打开开关，开始寻找下一个值不同的元素
      }
    } else {
      if (flag) {
        // 找到不同值的元素，修改指针
        if (!prev.prev) {
          // 如果重复的是列表头元素
          linkHead = head;
          head.prev = null;
        } else {
          // 如果重复的元素位于列表中间
          prev.prev.next = head;
          head.prev = prev.prev;
        }
        flag = false; // 关闭开关，继续寻找相同的元素
      }
      prev = head;
    }
  }

  if (flag) {
    // 如果重复元素段在链表尾部
    if (!prev.prev) {
      linkHead = null;
    } else {
      prev.prev.next = null;
    }
  }

  return linkHead;
}
