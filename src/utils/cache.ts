// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LRUCache<K = any, V = any> {
  max: number;
  cache: Map<K, V>;

  constructor(max = 10) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: K) {
    const item = this.cache.get(key);
    if (item) {
      // refresh key
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, val: V) {
    // refresh key
    if (this.cache.has(key)) this.cache.delete(key);
    // evict oldest
    else if (this.cache.size == this.max) this.cache.delete(this.first());
    this.cache.set(key, val);
  }

  first() {
    return this.cache.keys().next().value;
  }
}
