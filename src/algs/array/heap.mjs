function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

/**
 * * 最小的k个数；堆排序，维护一个 K 大小的小顶堆。
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/59
 *
 * 动态数组可能会插入或删除元素，难道我们每次求 Top k 问题的时候都需要对数组进行重新排序吗？
 */

function getLeastNumbers(arr, k) {
  if (k === 0) return [];
  const len = arr.length;
  if (len <= 1) return arr;

  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMin(arr, i, len);
  }

  for (let j = len - 1; j >= len - k; j--) {
    swap(arr, 0, j);
    heapifyMin(arr, 0, j);
  }

  console.log(arr);

  return arr.slice(-k).reverse();
}

function heapifyMin(arr, i, heapSize) {
  for (let j = 2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize && arr[j] > arr[j + 1]) {
      j++;
    }

    if (arr[i] > arr[j]) {
      swap(arr, i, j);
      i = j;
    } else {
      break;
    }
  }
}

/**
 * * 数组中的第K个最大元素
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/62
 */
function findKthLargest(nums, k) {
  const len = nums.length;
  if (len === 1) return nums[0];

  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapifyMax(nums, i, len);
  }

  for (let j = len - 1; j >= len - k; j--) {
    swap(nums, 0, j);
    heapifyMax(nums, 0, j);
  }

  return nums[len - k];
}

function heapifyMax(nums, i, heapSize, map) {
  for (let j = 2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize) {
      if (!map && nums[j] < nums[j + 1]) {
        j++;
      }

      if (map && map.get(nums[j]) < map.get(nums[j + 1])) {
        j++;
      }
    }

    if (
      (!map && nums[i] < nums[j]) ||
      (map && map.get(nums[i]) < map.get(nums[j]))
    ) {
      swap(nums, i, j);
      i = j;
    } else {
      break;
    }
  }
}

/**
 * * 前 K 个高频元素。给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 * https://leetcode-cn.com/problems/top-k-frequent-elements/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/61
 * 遍历一遍数组统计每个元素的频率，并将元素值（ key ）与出现的频率（ value ）保存到 map 中
 */
function topKFrequent(nums, k) {
  // let map ={};// 最好不用字面量，若扩展到任意数组的元素频率统计，需要区分 1和 '1'
  const map = new Map();

  nums.forEach((num) => {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  });
  const mapSize = map.size;
  const mapKeys = [...map.keys()];

  if (mapSize <= k) {
    return mapKeys;
  }

  for (let i = Math.floor(mapSize / 2 - 1); i >= 0; i--) {
    heapifyMax(mapKeys, i, mapSize, map);
  }

  for (let j = mapSize - 1; j >= mapSize - k; j--) {
    swap(mapKeys, 0, j);
    heapifyMax(mapKeys, 0, j, map);
  }

  return mapKeys.slice(-k).reverse();
}

/**
 * * 数据流的中位数。
 * 维护两个堆：大顶堆：用来存取前 n/2 个小元素；小顶堆：用来存取后 n/2 个小元素
 * n 为奇数：中位数是大顶堆的堆顶元素
 * n 为偶数：中位数是大顶堆的堆顶元素与小顶堆的堆顶元素的平均值
 * 每当数组中插入一个元素时，都需要如何调整堆？
 * 如果插入元素比大顶堆的堆顶要大，则将该元素插入到小顶堆中；如果要小，则插入到大顶堆中。
 * https://leetcode-cn.com/problems/find-median-from-data-stream/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/63
 * 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
 * * 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 */
const MedianFinder = function () {
  // 大顶堆，用来保存前 n/2 小的元素
  this.lowHeap = new MaxHeap();
  // 小顶堆，用来保存后 n/2 小的元素
  this.hightHeap = new MinHeap();
};

// 插入元素
MedianFinder.prototype.addNum = function (num) {
  // 如果大顶堆为空或大顶堆堆顶元素小于num，则插入大顶堆
  // 否则插入到小顶堆中
  if (!this.lowHeap.getSize() || num < this.lowHeap.getHead()) {
    // 比大顶堆的堆顶小，插入到大顶堆中
    this.lowHeap.insert(num);
  } else {
    // 比小顶堆的堆顶大，插入到小顶堆中
    this.hightHeap.insert(num);
  }

  // 比较大小顶堆的是否依然保持平衡
  if (this.lowHeap.getSize() - this.hightHeap.getSize() > 1) {
    // 大顶堆往小顶堆迁移
    this.hightHeap.insert(this.lowHeap.removeHead());
  }
  if (this.hightHeap.getSize() > this.lowHeap.getSize()) {
    // 小顶堆向大顶堆迁移
    this.lowHeap.insert(this.hightHeap.removeHead());
  }
};
// 获取中位数
MedianFinder.prototype.findMedian = function () {
  if (
    this.lowHeap.getSize() &&
    this.lowHeap.getSize() === this.hightHeap.getSize()
  ) {
    return (this.lowHeap.getHead() + this.hightHeap.getHead()) / 2;
  }
  return this.lowHeap.getHead();
};

// 小顶堆
const MinHeap = function () {
  const heap = [,];
  // 堆中元素数量
  this.getSize = () => heap.length - 1;
  // 插入
  this.insert = (key) => {
    heap.push(key);
    // 获取存储位置
    let i = heap.length - 1;
    while (Math.floor(i / 2) > 0 && heap[i] < heap[Math.floor(i / 2)]) {
      swap(heap, i, Math.floor(i / 2)); // 交换
      i = Math.floor(i / 2);
    }
  };
  // 删除堆头并返回
  this.removeHead = () => {
    if (heap.length > 1) {
      if (heap.length === 2) return heap.pop();
      const num = heap[1];
      heap[1] = heap.pop();
      heapify(1);
      return num;
    }
    return null;
  };
  // 获取堆头
  this.getHead = () => {
    return heap.length > 1 ? heap[1] : null;
  };
  // 堆化
  const heapify = (i) => {
    const k = heap.length - 1;
    // 自上而下式堆化
    while (true) {
      let minIndex = i;
      if (2 * i <= k && heap[2 * i] < heap[i]) {
        minIndex = 2 * i;
      }
      if (2 * i + 1 <= k && heap[2 * i + 1] < heap[minIndex]) {
        minIndex = 2 * i + 1;
      }
      if (minIndex !== i) {
        swap(heap, i, minIndex);
        i = minIndex;
      } else {
        break;
      }
    }
  };
};

// 大顶堆
const MaxHeap = function () {
  const heap = [,];
  // 堆中元素数量
  this.getSize = () => heap.length - 1;
  // 插入大顶堆
  this.insert = (key) => {
    heap.push(key);
    // 获取存储位置
    let i = heap.length - 1;
    while (Math.floor(i / 2) > 0 && heap[i] > heap[Math.floor(i / 2)]) {
      swap(heap, i, Math.floor(i / 2)); // 交换
      i = Math.floor(i / 2);
    }
  };
  // 获取堆头
  this.getHead = () => {
    return heap.length > 1 ? heap[1] : null;
  };
  // 删除堆头并返回
  this.removeHead = () => {
    if (heap.length > 1) {
      if (heap.length === 2) return heap.pop();
      const num = heap[1];
      heap[1] = heap.pop();
      heapify(1);
      return num;
    }
    return null;
  };
  // 堆化
  const heapify = (i) => {
    const k = heap.length - 1;
    // 自上而下式堆化
    while (true) {
      let maxIndex = i;
      if (2 * i <= k && heap[2 * i] > heap[i]) {
        maxIndex = 2 * i;
      }
      if (2 * i + 1 <= k && heap[2 * i + 1] > heap[maxIndex]) {
        maxIndex = 2 * i + 1;
      }
      if (maxIndex !== i) {
        swap(heap, i, maxIndex);
        i = maxIndex;
      } else {
        break;
      }
    }
  };
};
