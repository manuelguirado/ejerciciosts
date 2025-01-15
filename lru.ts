class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key: number): number {
    if (!this.cache.has(key)) {
        return -1;
    }
    const value = this.cache.get(key);
    if (value !== undefined) {
        this.cache.delete(key);
        this.cache.set(key, value);
    }
    return value !== undefined ? value : -1;
  }
  put(key: number, value: number): void {
    if (this.cache.has(key) ) {
        this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity){
      const lruKey = this.cache.keys().next().value;
      if (lruKey !== undefined) {
        this.cache.delete(lruKey);
      }
    }
    this.cache.set(key, value);
  }
}
let lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
lru.put(3, 2);
console.log(lru.get(2));
console.log(lru.get(1));
