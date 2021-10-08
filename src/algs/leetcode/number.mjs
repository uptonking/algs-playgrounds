/**
 * * 用 Rand7() 实现 Rand10()： k进制诸位生成 + 拒绝采样
 * * 思路是先构造一个randN，这个N必须是10的整数倍，然后randN % 10就可以得到了rand10.
 * * 思路：rand7 -> rand49 -> rand40 -> rand10
 * 已有方法rand7()可生成1到7范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。
 * https://leetcode-cn.com/problems/implement-rand10-using-rand7/
 * https://juejin.cn/post/6844904055022583822
 * https://blog.csdn.net/fuxuemingzhu/article/details/81809478
 * https://leetcode-cn.com/problems/implement-rand10-using-rand7/comments/85710
 * rand7() 等概率地产生 1,2,3,4,5,6,7.
 * rand7() - 1 等概率地产生 [0,6].
 * (rand7() - 1) *7 等概率地产生0, 7, 14, 21, 28, 35, 42
 * (rand7() - 1) * 7 + (rand7() - 1) 等概率地产生 [0, 48] 这 49 个数字
 * 如果步骤 4 的结果大于等于 40，那么就重复步骤 4，直到产生的数小于 40
 * 把步骤 5 的结果 mod 10 再加 1， 就会等概率的随机生成 [1, 10]
 */
function rand10() {
  while (true) {
    // 把等概率产生数的空间扩大，使得该空间大于要产生新的数的范围。
    // 找到最接近这个空间的一个值k，使得k%新数==0，k是这个要新生成数的倍数。
    // 对于本例子来讲，就是把等概率产生数的空间扩大至0-48
    const num = (rand7() - 1) * 7 + rand7() - 1;

    // 为什么不直接num = (rand7()-1)*8;
    // 那么得到的随机数只能是[0,8,16,24,32,40,48]

    // 然后取最接近48且为10的倍数的一个值k，这个值是40
    // 每次产生一个新值，若该值小于40，那么对该值mod10
    // 也就是说新空间中的0，10，20，30代表10；1，11，21，31代表1；2，12，22，32代表2；以此类推。
    if (num < 40) {
      return (num % 10) + 1;
    }
  }
}
function rand7() {}

/**
 * * 整数数组所有可能的子集
 * * 思路：dfs，遇到这三种类型（子集，排列，组合） 立马想到使用回溯
 * * 回溯模板
 * - 在外面定义一个结果集 ret
 * - 在外面在定义一个结果集的下一层结果集route
 * - 回溯（这里呢 要确定状态参数，题目给定的nums，和存放最终结果的res 当然在列，还要补上用来锚定回溯定位点的 start锚点）
 * https://leetcode-cn.com/problems/subsets/
 * https://leetcode-cn.com/problems/subsets/solution/js-hui-su-by-liberhome-ngy7/
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 */

function subsets(nums) {
  const ret = [];
  const route = [];

  function backtrack(nums, start, route) {
    // 先把上一轮的一维结果存入最终二维结果集
    ret.push(route.slice(0));

    // 从start锚点向后循环依次把nums[i]加入一维结果集
    for (let i = start; i < nums.length; i++) {
      route.push(nums[i]);

      // 更新锚点和一维结果集，递归回溯
      backtrack(nums, i + 1, route);

      // 最后撤销本轮接入一维结果集的结果 探索未曾出现的可能
      route.pop();
    }
  }

  backtrack(nums, 0, route);

  return ret;
}
