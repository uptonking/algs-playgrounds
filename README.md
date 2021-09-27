# algs-playgrounds

> learning and testing data structures and algorithms

# overview
- my test case
  - auto-generated array of random numbers
  - `array.length` is 20000
  - array contains negative and duplicated values

- 排序算法测试小结
  - 👍🏻️ Array.prototype.sort官方api效率最高，推荐使用，实现基于quickSort -> timSort
  - quickSort一般很快，推荐使用
  - n越大，一些算法就变得越慢，当n很大时排序时间 bubble > selection > insertion/shell >> merge、quick、heap

- 说明
  - 当n大到20w时，能明显感到计算量变大、用时较长
     - 此时heapSort甚至比官方的array.sort还要快
     - heapSort循环版快于递归版

- common sort algorithms
  - [x] selectionSort
  - [x] insertionSort
  - [x] shellSort
  - [x] bubbleSort
  - [x] quickSortRecursively
  - [ ] quickSort3Way
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

node ./src/algs/sort20210926.mjs
```

- view the tests result for 7 sort algorithms in the console
# notes
-  when generating random array, config in `./src/algs/sort20210926.mjs` can be changed

> testing time for sorting algs is in **nanoseconds**

- when `array.length` is 20000
  - 排序时间大多在 0.02s ~ 0.2s

```
┌─────────┬──────────────────────────┬───────────┐
│ (index) │           name           │   time    │
├─────────┼──────────────────────────┼───────────┤
│    0    │ 'baselineFuncReturnOnly' │   92601   │
│    1    │  'baselineJsArraySort'   │  6706871  │
│    2    │        'heapSort'        │  6763543  │
│    3    │       'quickSort'        │ 21245072  │
│    4    │       'mergeSort'        │ 24989733  │
│    5    │       'shellSort'        │ 122806181 │
│    6    │     'insertionSort'      │ 175924980 │
│    7    │     'selectionSort'      │ 467819909 │
│    8    │       'bubbleSort'       │ 655801453 │
└─────────┴──────────────────────────┴───────────┘
```

- when `array.length` is 200000
  - 排序时间大多在 4s ~ 36s

```
┌─────────┬──────────────────────────┬─────────────┐
│ (index) │           name           │    time     │
├─────────┼──────────────────────────┼─────────────┤
│    0    │ 'baselineFuncReturnOnly' │    99852    │
│    1    │        'heapSort'        │  39820951   │
│    2    │  'baselineJsArraySort'   │  68304670   │
│    3    │       'quickSort'        │  130919430  │
│    4    │       'mergeSort'        │ 4112333392  │
│    5    │     'insertionSort'      │ 13314696198 │
│    6    │       'shellSort'        │ 14814836609 │
│    7    │     'selectionSort'      │ 36090947466 │
│    8    │       'bubbleSort'       │ 79329154002 │
└─────────┴──────────────────────────┴─────────────┘
```

