// * Mersenne Twister pseudorandom number generator.
// https://github.com/boo1ean/mersenne-twister  /MIT
// 梅森旋转算法（Mersenne Twister）也称马特赛特旋转算法。python的random模块就采用该算法计算随机数。
// 一个伪随机数发生算法。基于有限二进制字段上的矩阵线性递归。
// 可以快速产生高质量的伪随机数，修正了古典随机数发生算法的很多缺陷。
// * 优点
// - 对于一个k位2进制数，可在[0, 2^k-1]的范围内生成离散型均匀分布的随机数。
// - 通过了包括Diehard测试在内的大多数统计随机性测试（除TestU01测试外）
// - 在MT19937-32的情况下对1 ≤ k ≤ 623，满足k-分布
// * 缺点
// - 吞吐量中等，但在SFMT版本中修正
// - 产生的随机数与seed相关，不能用于蒙特卡洛模拟
// - 由相同的初始序列产生的随机状态几乎相同，但在2002年的更新中对MT算法的初始化进行了改进，使得对于相同的初始序列也能产生不同的随机状态
// - 非加密安全的，除CryptMT外

/*
 banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated.
  Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

export function MersenneTwister(seed) {
  if (seed === undefined) {
    // seed = new Date().getTime();
    seed = Date.now();
  }

  /* Period parameters */
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df; /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

  if (seed.constructor === Array) {
    this.init_by_array(seed, seed.length);
  } else {
    this.init_seed(seed);
  }
}

/* initializes mt[N] with a seed */
/* origin name init_genrand */
MersenneTwister.prototype.init_seed = function (s) {
  this.mt[0] = s >>> 0;
  for (this.mti = 1; this.mti < this.N; this.mti++) {
    const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
    this.mt[this.mti] =
      ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
      (s & 0x0000ffff) * 1812433253 +
      this.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    this.mt[this.mti] >>>= 0;
    /* for >32 bit machines */
  }
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
  let i;
  let j;
  let k;
  this.init_seed(19650218);
  i = 1;
  j = 0;
  k = this.N > key_length ? this.N : key_length;
  for (; k; k--) {
    const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
    this.mt[i] =
      (this.mt[i] ^
        (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
          (s & 0x0000ffff) * 1664525)) +
      init_key[j] +
      j; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    j++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
    if (j >= key_length) j = 0;
  }
  for (k = this.N - 1; k; k--) {
    const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
    this.mt[i] =
      (this.mt[i] ^
        (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
          (s & 0x0000ffff) * 1566083941)) -
      i; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
  }

  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
/* origin name genrand_int32 */
MersenneTwister.prototype.random_int = function () {
  let y;
  const mag01 = [0x0, this.MATRIX_A];
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) {
    /* generate N words at one time */
    let kk;

    if (this.mti === this.N + 1)
      /* if init_seed() has not been called, */
      this.init_seed(5489); /* a default initial seed is used */

    for (kk = 0; kk < this.N - this.M; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (; kk < this.N - 1; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] =
        this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y =
      (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
    this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= y >>> 11;
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= y >>> 18;

  return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
/* origin name genrand_int31 */
MersenneTwister.prototype.random_int31 = function () {
  return this.random_int() >>> 1;
};

/* generates a random number on [0,1]-real-interval */
/* origin name genrand_real1 */
MersenneTwister.prototype.random_incl = function () {
  return this.random_int() * (1.0 / 4294967295.0);
  /* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function () {
  return this.random_int() * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
/* origin name genrand_real3 */
MersenneTwister.prototype.random_excl = function () {
  return (this.random_int() + 0.5) * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution */
/* origin name genrand_res53 */
MersenneTwister.prototype.random_long = function () {
  const a = this.random_int() >>> 5;
  const b = this.random_int() >>> 6;
  return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
};

/* These real versions are due to Isaku Wada, 2002/01/09 added */

export default MersenneTwister;
