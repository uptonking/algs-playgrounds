# algs-playgrounds

> learning and testing data structures and algorithms

# overview
- my test case
  - environment: node v14.15.1; ubuntu 20.04
  - auto-generated array of random numbers
  - `array.length` is 20000 / 200000
  - array contains negative and duplicated values

- 排序算法测试小结
  - 👍🏻️ `Array.prototype.sort`官方api效率非常高，推荐使用，实现基于quickSort -> timSort
  - 较快的排序算法包括 quickSort, heapSort, mergeSort，
  - n越大，一些算法就变得越慢，当n很大时排序时间 bubble > selection > insertion/shell >> merge、quick、heap

- 说明
  - 当n大到20w时，能明显感到计算量变大、用时变长
     - 此时heapSort甚至比官方的array.sort还要快
     - 循环版一般快于递归版
  - 选择合适的比较/排序指标也很重要

- common sort algorithms ing
  - [x] selectionSort
  - [x] insertionSort
  - [x] shellSort
  - [x] bubbleSort
  - [x] quickSortRecursively
  - [x] quickSort3Way
  - [x] mergeSortRecursively
  - [ ] mergeSortKWay
  - [x] heapSort (max heap)
  - [ ] heapSort (min heap)
  - [x] heapSortRecursively 
# usage
- no dependencies
- `npm install` not required

```shell
git clone https://github.com/uptonking/algs-playgrounds

node ./src/algs/sort-testing.mjs
```

- view the tests result for 7 sort algorithms in the console
# notes
-  when generating random array, config in `./src/algs/sort-testing.mjs` can be changed

> testing time for sorting algs is in **nanoseconds**

- when `array.length` is 20000
  - 最慢的冒泡排序用时约为 0.66s
  - 普通快排quickSort为  0.009s

```
┌─────────┬───────────────────────────┬───────────┐
│ (index) │           name            │   time    │
├─────────┼───────────────────────────┼───────────┤
│    0    │ 'baselineFuncReturnOnly'  │   94530   │
│    1    │      'quickSort3Way'      │  4378080  │
│    2    │   'baselineJsArraySort'   │  7009133  │
│    3    │   'quickSortOutOfPlace'   │  7035095  │
│    4    │ 'mergeSortInsertForShort' │  7167918  │
│    5    │        'heapSort'         │  7449934  │
│    6    │   'heapSortRecursively'   │  8764923  │
│    7    │        'quickSort'        │  9083507  │
│    8    │  'mergeSortRecursively2'  │ 12065042  │
│    9    │        'mergeSort'        │ 28670287  │
│   10    │        'shellSort'        │ 123943166 │
│   11    │      'insertionSort'      │ 179942132 │
│   12    │      'selectionSort'      │ 471286342 │
│   13    │       'bubbleSort'        │ 665470877 │
└─────────┴───────────────────────────┴───────────┘
```

- when `array.length` is 200000
  - 最慢的冒泡排序用时约为 78s
  - 普通快排quickSort为  0.03s

```
┌─────────┬───────────────────────────┬─────────────┐
│ (index) │           name            │    time     │
├─────────┼───────────────────────────┼─────────────┤
│    0    │ 'baselineFuncReturnOnly'  │   114320    │
│    1    │      'quickSort3Way'      │  30534342   │
│    2    │        'quickSort'        │  31889276   │
│    3    │        'heapSort'         │  36992286   │
│    4    │   'quickSortOutOfPlace'   │  43148233   │
│    5    │ 'mergeSortInsertForShort' │  60909977   │
│    6    │   'heapSortRecursively'   │  61536366   │
│    7    │   'baselineJsArraySort'   │  66492111   │
│    8    │  'mergeSortRecursively2'  │  66664805   │
│    9    │        'mergeSort'        │ 3936281892  │
│   10    │      'insertionSort'      │ 13603887842 │
│   11    │        'shellSort'        │ 14818043188 │
│   12    │      'selectionSort'      │ 36541349120 │
│   13    │       'bubbleSort'        │ 78557186003 │
└─────────┴───────────────────────────┴─────────────┘
```
