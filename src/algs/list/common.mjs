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
 * * 反转链表 II 反转从位置 left 到位置 right 的链表节点
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/
 * https://xie.infoq.cn/article/f5db6e4a84aef1339e4582d40
 */
function reverseBetween(head, left, right) {
  let prev = null;
  let curr = head;

  // 将prev和head都移动m-1次，prev在m-1位置，head在m位置
  while (left > 1) {
    prev = curr;
    curr = curr.next;

    // 每次循环将m减1，控制移动次数
    left--;
    // 移动指针的同时，需要减少n的数量，完成移动后剩下的n次，即为反转链表的次数
    right--;
  }

  const prevListTail = prev; // prev即为链表反转后，前半段的尾指针

  const reversedListTail = curr; // curr即为链表反转后，反转部分的尾指针

  // 将链表反转n次
  while (right > 0) {
    // 反转链表节点的通用方法
    const next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;

    // 每次循环将n减1，控制移动次数
    right--;
  }

  // 如果prevListTail不为空，即为链表中间的一段进行了反转，需要将前半段与反转后的链表头指针连接起来
  if (prevListTail) {
    // 链表反转后，prev的位置即为反转部分的头指针
    prevListTail.next = prev;
  } else {
    // 链表未空，表示链表从头开始反转，反转后的prev即为新链表的头，因此需要重新设置链表的头指针
    head = prev;
  }

  // 链表反转后，反转部分原来的头，变成了尾部，而curr已加移出了链表，成为了最后一段链表的头指针
  // 因此需要将反转部分的尾指针与最后一段的头指针连接起来，组成新链表
  reversedListTail.next = curr;

  return head;
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
 * * 合并K个升序链表
 * * 思路: 两两合并。 采用分治法，简单来说就是不停的对半划分
 * 给你一个链表数组，每个链表都已经按升序排列。返回合并后的链表。
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/
 * https://juejin.cn/post/6844903844971806727
 */
function mergeKLists(lists) {
  let len = lists.length;
  if (len === 0) return null;
  if (len === 1) return lists[0];

  while (len > 1) {
    const k = Math.floor((len + 1) / 2);
    for (let i = 0; i < Math.floor(len / 2); i++) {
      lists[i] = mergeTwoLists(lists[i], lists[i + k]);
    }
    len = k;
  }
  return lists[0];
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
 * * 寻找环形链表相交的起点
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/
 */
function detectCycle(head) {
  // 如果链表为空，或者链表只有一个元素且无环，此时指针无法行动，则返回null
  if (!head || !head.next) return null;

  // 创建快慢指针
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    // 慢指针走一步，快指针走两步
    slow = slow.next;
    fast = fast.next.next;

    // 如果两个指针的指向相同，则表示已经查找到环。
    // 但两个指针相遇的节点不一定是环的连接点，而是在环的某个位置
    if (slow === fast) {
      break;
    }
  }

  // 前面的退出循环条件有两个，一个是没有找到环，一个是找到了环
  // 通过快慢指针是否相同，判断是否找到环，如果没有，则返回null
  if (slow !== fast) return null;

  // 如果有环，而且快指针的速度是慢指针的两倍。
  // 因此如果创建两个指针，从链表起始点和快慢指针相遇节点分别出发。
  // 两者相遇的节点必然是环的连接点。
  let startNode = head;
  let meetNode = fast;

  // 遍历链表，查找连接点，如果两个指针相等，则表示找到连接点。
  while (startNode !== meetNode) {
    startNode = startNode.next;
    meetNode = meetNode.next;
  }

  return meetNode;
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

/**
 * * 重排链表
 * https://juejin.cn/post/7002949115776598023
 */
function reorderList(head) {
  const list = []; // 使用数组存储链表
  let node = head; // 使用node遍历链表

  // 遍历链表，将每个元素依次存入数组
  while (node) {
    list.push(node);
    node = node.next;
  }

  const newList = []; // 使用新数组，存储新排序的链表节点
  let i = 0; // 使用i指针从头往后遍历list
  let j = list.length - 1; // 使用j指针从后往前遍历list

  // 左右指针不断向中间移动，知道相遇
  while (i <= j) {
    // 将i、j指向的元素，依次存入newList
    newList.push(list[i++], list[j--]);
  }

  let newNode = newList[0]; // 缓存新链表的头节点

  // newList的每个元素，就是新链表的每个节点
  for (let i = 1; i < newList.length; i++) {
    // 将每个节点连接到链表
    newNode.next = newList[i];
    // 将新链表节点向后移动一位，待连接下一个节点
    newNode = newNode.next;
  }
  // 将尾节点的next置为null，避免链表出现环
  newNode.next = null;

  // head也是新链表的头结点
  return head;
}
