/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
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
  let next;

  while (curr) {
    // 临时存储 curr 后继节点
    next = curr.next;
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
 * * K个一组翻转链表
 * 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/solution/jsshi-xian-by-huinuo-3/
 */
function reverseKGroup(head, k) {
  if (!head || !head.next) return head;

  const root = new ListNode(0);
  root.next = head;
  let prev = root;

  while (head) {
    let tail = prev;

    // 计算要反转范围的尾指针
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) return root.next;
    }

    const next = tail.next;
    [head, tail] = reverseList1(head, tail);

    prev.next = head;
    tail.next = next;

    prev = tail;
    head = tail.next;
  }

  return root.next;
}

function reverseList1(head, tail) {
  let prev = tail.next;
  let curr = head;
  let next;

  // 循环终止条件是 prev === tail，到尾部了
  while (prev !== tail) {
    next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }

  return [tail, head];
}

/**
 * * 求链表的中间结点
 * https://leetcode-cn.com/problems/middle-of-the-linked-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/15
 */

/**
 * * 双指针法
 * 快指针走两步，慢指针走一步，快指针走完，慢指针则为中间值
 * - 如果链表长度为奇数，则返回中间节点
 * - 如果链表长度为偶数，则有两个中间节点，这里返回第一个
 */
function middleNode(head) {
  // if (!head || !head.next) return head;

  let fast = head;
  let slow = head;

  // 可以走到最后一个节点
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

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

// 合并两个有序链表
function mergeTwoLists2(l1, l2) {
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
}

/**
 * * 链表排序
 * * 类似数组归并排序，先找链表中间节点，然后递归合并
 * https://leetcode-cn.com/problems/sort-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/79
 * - 注意获取中间节点middleNode的方法有一点不同，
 * - mergeTwoLists()方法可以复用
 */

function sortList(head) {
  return mergeSortRec(head);
}

// 类似归并排序
// 若分裂后的两个链表长度不为1，则继续分裂，直到分裂后的链表长度都为 1，
// 然后合并小链表
function mergeSortRec(head) {
  if (!head || !head.next) return head;

  // 获取中间节点
  const middle = middleNode2(head);

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
}

// ⚠️️ 与上面获取中间节点的方法不同
function middleNode2(head) {
  // if (!head || !head.next) return head;

  let fast = head;
  let slow = head;

  // 可以走到倒数第一个节点
  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
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
 * * 判断该链表是否为回文链表
 * * 思路：先反转链表，再判断是否相同
 * https://leetcode-cn.com/problems/palindrome-linked-list/
 * https://leetcode-cn.com/problems/palindrome-linked-list-lcci/solution/js-jie-fa-by-cranky-roentgen-3/
 */

function isPalindrome(head) {
  /** 新链表的头节点 */
  let list2;
  let curr = head;
  let next;

  // 反转链表变体，原链表不变
  while (curr) {
    // 每次都创建一个新节点，然后将已有链表作为next，node就变为了头节点
    const node = new ListNode(curr.val);
    node.next = list2;
    list2 = node;

    curr = curr.next;
  }

  let curr1 = head;
  let curr2 = list2;

  while (curr1 && curr2) {
    if (curr1.val !== curr2.val) return false;
    curr1 = curr1.next;
    curr2 = curr2.next;
  }

  // 两个都遍历完了
  if (!curr1 && !curr2) return true;

  // 两个中有1个没遍历完
  return false;
}

/**
 * * 利用字符串
 */
function isPalindrome(head) {
  let str1 = '';
  let str2 = '';

  while (head) {
    str1 = str1 + head.val;
    str2 = head.val + str2;

    head = head.next;
  }

  return str1 === str2;
}
