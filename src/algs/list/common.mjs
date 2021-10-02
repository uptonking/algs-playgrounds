/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * * 合并两个有序链表。
 * 将两个升序链表合并为一个新的 升序 链表并返回。
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 */

function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
}

/**
 * * 判断一个单链表是否有环。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 如果 pos 是 -1，则在该链表中没有环。
 * https://leetcode-cn.com/problems/linked-list-cycle/
 * 标记法：给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标志时，则证明单链表有环
 */
function hasCycle(head) {
  while (head) {
    if (head.flag) return true;

    head.flag = true;
    head = head.next;
  }

  return false;
}

/**
 * 双指针法。
 * 快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇
 */
function hasCycleS2(head) {
  if (!head || !head.next) return false;

  let fast = head.next.next;
  let slow = head.next;
  while (fast !== slow) {
    if (!fast || !fast.next) return false;

    fast = fast.next.next;
    slow = slow.next;
  }
}

function hasCycleS3(head) {
  try {
    JSON.stringify(head);
    return false;
  } catch (err) {
    return true;
  }
}

/**
 * * 反转链表。
 * https://leetcode-cn.com/problems/reverse-linked-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/14
 * 双指针迭代。
 */

function reverseList(head) {
  if (!head || !head.next) return head;
  let prev = null;
  let curr = head;

  while (curr) {
    // 临时存储 curr 后继节点
    const next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }

  head = prev;

  return head;
}

// 从头节点开始，递归反转它的每一个节点，直到 null
function reverseList2(head) {
  if (!head || !head.next) return head;

  return reverse(null, head);
}

function reverse(prev, curr) {
  if (!curr) return prev;

  const nextNode = curr.next;
  curr.next = prev;
  return reverse(curr, nextNode);
}

function reverseList3(head) {
  if (!head || !head.next) return head;
  const next = head.next;

  const reversedHead = reverseList3(next);

  next.next = head;
  head.next = null;

  return reversedHead;
}

/**
 * * 链表排序
 * https://leetcode-cn.com/problems/sort-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/79
 * 类似数组归并排序，先找链表中间节点，然后递归合并
 */

const sortList = function (head) {
  return mergeSortRec(head);
};

// 归并排序
// 若分裂后的两个链表长度不为 1，则继续分裂
// 直到分裂后的链表长度都为 1，
// 然后合并小链表
const mergeSortRec = function (head) {
  if (!head || !head.next) {
    return head;
  }

  // 获取中间节点
  const middle = middleNode(head);
  // 分裂成两个链表
  const temp = middle.next;
  middle.next = null;
  let left = head;
  let right = temp;
  // 继续分裂（递归分裂）
  left = mergeSortRec(left);
  right = mergeSortRec(right);
  // 合并两个有序链表
  return mergeTwoLists(left, right);
};

// 获取中间节点
// - 如果链表长度为奇数，则返回中间节点
// - 如果链表长度为偶数，则有两个中间节点，这里返回第一个
const middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

// 合并两个有序链表
let mergeTwoLists = function (l1, l2) {
  const preHead = new ListNode(-1);
  let cur = preHead;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return preHead.next;
};

/**
 * * 求链表的中间结点
 * https://leetcode-cn.com/problems/middle-of-the-linked-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/15
 *
 */
function middleNode1(head) {
  if (!head || !head.next) return head;

  const arr = [];
  while (head) {
    arr.push(head);
    head = head.next;
  }

  return arr[Math.ceil((arr.length - 1) / 2)];
}

/**
 * 快指针走两步，慢指针走一步，快指针走完，慢指针则为中间值
 */
function middleNode2(head) {
  if (!head || !head.next) return head;
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

/**
 * 删除链表倒数第 n 个结点。
 * 要求在删除了指定节点后，需要返回的是链表的头结点。所以返回的是head。
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/16
 * 快指针先走n个节点，然后快慢指针一起，知道快指针走到null,这时慢指针指向n-1
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
 * 思路2，链表转数组。
 * 思路1，标记法，或者用一个新数组存放已访问过的节点。
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
 * * 给定两个用链表表示的整数，每个节点包含一个数位。这些数位是反向存放的。并用链表形式返回结果。
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
