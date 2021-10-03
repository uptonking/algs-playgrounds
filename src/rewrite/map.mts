
/**
 * * 实现WeakMap的polyfill
 *
 * https://juejin.cn/post/6921882183242088462
 * - ❌️ 这里实现了只支持object类型作为key的Map，没有实现引用断开时自动回收value
 */


interface WeakMap<K extends object, V> {
  get(key: K): V | undefined
  set(key: K, value: V): this
  has(key: K): boolean
  delete(key: K): boolean
}

interface WeakMapConstructor {
    new <K extends object = object, V = any>(entries?: readonly [K, V][] | null): WeakMap<K, V>;
    readonly prototype: WeakMap<object, any>;
}


class WeakMap<K extends object = object, V = any> implements WeakMap<K, V> {
    uid: symbol

  constructor (entries?: readonly [K, V][] | null | undefined) {

    this.uid = Symbol('WeakMap')
    if (entries !== undefined && entries !== null) {
      if (typeof entries[Symbol.iterator] === 'function') {
        try {
          for (const [key, value] of entries) {
            this.set(key, value)
          }
        } catch {
          throw TypeError(`Iterator value a is not an entry object`)
        }
      } else {
        throw TypeError(
          `${entries} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      }
    }

  }


  // 对象类型保护函数, 是否为合法的 key 值
    isLegal(o: unknown): o is object {
    return Object(o) === o
  }


  set (key: K, value: V): this {
    // key 值非对象时，直接抛出类型错误
    if (!this.isLegal(key)) {
      throw TypeError('Invalid value used as weak map key')
    }

    // 当已设置的情况下，修改原值
    if (this.uid in key) {
      const entry = key[this.uid]
      entry[1] = value
      return this
    }
    Object.defineProperty(key, this.uid, {
      value: [key, value],
      configurable: true,
      writable: true,
      // enumerable 设置为 false，避免原对象在常规的遍历方法中取到我们设置的属性。
      enumerable: false
    })
    return this
  }

  get(key: K): undefined | V {
    if (!this.isLegal(key)) return undefined
    if (!key.hasOwnProperty(this.uid)) return undefined
    const entry = key[this.uid]
    return entry[1]
  }

}


Object.defineProperty(WeakMap.prototype, Symbol.toStringTag, {
  value: 'WeakMap'
})
