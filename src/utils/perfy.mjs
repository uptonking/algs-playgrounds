// See https://nodejs.org/api/process.html#process_process_hrtime

/**
 * A simple, light-weight NodeJS utility for measuring code execution in high-resolution real times.
 * ! 仅支持node，不支持浏览器
 * 基于 `process.hrtime([time]) `实现，returns the current high-resolution real time in a `[seconds, nanoseconds]` tuple Array,
 * where nanoseconds is the remaining part of the real time that can't be represented in second precision.
 * process.hrtime([time]) is the legacy version of `process.hrtime.bigint()`;
 * BigInt类型主流浏览器在202001左右支持，ie不支持。
 *
 *  @module   perfy
 *  @license  MIT
 *  @example
 *      // var perfy = require('perfy');
 *      import perfy from 'perfy';
 *      perfy.start('loop-test');
 *      // some heavy stuff here...
 *      console.log(perfy.end('loop-test').time);
 */

// --------------------------------
//  CLASS: PerfyItem
// --------------------------------

function PerfyItem(name) {
  this.name = name;
  this.reset();
}

PerfyItem.prototype.reset = function () {
  this.time = {
    start: null,
    end: null,
  };
  this.utc = {
    start: null,
    end: null,
  };
  this.result = null;
};

PerfyItem.prototype.start = function () {
  this.reset();
  this.time.start = process.hrtime();
  this.utc.start = Date.now();
};

PerfyItem.prototype.end = function () {
  if (!this.time.start) {
    throw new Error('start() should be called first!');
  }
  this.time.end = process.hrtime(this.time.start);
  this.utc.end = Date.now();

  const o = {
    name: this.name || '',
    seconds: this.time.end[0],
    nanoseconds: this.time.end[1],
    // divide by a million to convert nanoseconds to milliseconds
    milliseconds: this.time.end[1] / 1000000,
    startTime: this.utc.start,
    endTime: this.utc.end,
  };
  const fullMilliseconds = o.seconds * 1000 + o.milliseconds;
  o.fullMilliseconds = Number(fullMilliseconds.toFixed(3));
  o.fullSeconds = o.time = Number((fullMilliseconds / 1000).toFixed(3));
  o.fullNanoseconds = o.seconds * 1000 * 1000000 + o.nanoseconds;

  const n = this.name ? this.name + ': ' : '';
  o.summary = n + o.time + ' sec.';
  this.result = o;
  return o;
};

const ERR = {
  NAME: 'Performance instance name required!',
  NOITEM: 'No performance instance with name: ',
  CALLBACK: 'Callback is not a function!',
};

// --------------------------------
//  CLASS: perfy
// --------------------------------

// storage for PerfyItem instances
let perfList = {};

/**
 * 提供用于测试的方法集合。
 *
 * .start(name [, autoDestroy]);
 * Initializes a new performance instance with the given name; and marks the current high-resolution real time.
 *
 * .end(name);
 * Ends the performance instance with the given name; and calculates the elapsed high-resolution real time.
 *
 * .exec([name,] fn);
 * Initializes a new performance instance right before executing the given function, and automatically ends after the execution is done.
 *
 * .result(name);
 * Gets the calculated result of the performance instance for the given name.
 */
const perfy = {};

perfy.start = function (name, autoDestroy) {
  if (!name) {
    throw new Error(ERR.NAME);
  }
  name = String(name);
  autoDestroy = typeof autoDestroy === 'undefined' ? true : autoDestroy;
  perfList[name] = new PerfyItem(name);
  perfList[name].autoDestroy = autoDestroy;
  perfList[name].start();
  return perfy;
};

perfy.end = function (name) {
  if (!name) {
    throw new Error(ERR.NAME);
  }
  name = String(name);
  const p = perfList[name];
  if (!p) {
    throw new Error(ERR.NOITEM + name);
  }
  // if already ended and has result, return
  if (p.result) {
    return p.result;
  }
  const result = p.end();
  if (p.autoDestroy) {
    delete perfList[name];
  }
  return result;
};

perfy.result = function (name) {
  if (!name) {
    throw new Error(ERR.NAME);
  }
  name = String(name);
  const p = perfList[name];
  if (!p) {
    return null;
  }
  return p.result;
};

perfy.exists = function (name) {
  if (!name) {
    throw new Error(ERR.NAME);
  }
  return Boolean(perfList[name]);
};

perfy.names = function () {
  return Object.keys(perfList);
};

perfy.count = function () {
  return perfy.names().length;
};

perfy.destroy = function (name) {
  if (!name) {
    throw new Error(ERR.NAME);
  }
  if (perfList[name]) {
    delete perfList[name];
  }
  return perfy;
};

perfy.destroyAll = function () {
  perfList = {};
  return perfy;
};

perfy.exec = function (name, fn) {
  if (typeof fn !== 'function') {
    if (typeof name === 'function') {
      fn = name;
      name = null;
    } else {
      throw new Error(ERR.CALLBACK);
    }
  }

  let p;
  if (name) {
    perfList[name] = new PerfyItem(name);
    perfList[name].autoDestroy = false;
    p = perfList[name];
  } else {
    p = new PerfyItem();
  }
  function done() {
    const result = p.end();
    if (name && p.autoDestroy) {
      delete perfList[name];
    }
    return result;
  }
  p.start();
  if (fn.length > 0) {
    fn(done);
    return perfy;
  }
  fn();
  return done();
};

export default perfy;
