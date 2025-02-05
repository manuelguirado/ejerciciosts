import {z} from 'zod';
type cacheStrategy = 'TTL' | 'LRU';
type cacheStrategyConfig<T> = 
   |  {strategy: 'TTL', ttl: number}
    |  {strategy: 'LRU', capacity: number};
type serializadedValue<T> = {
    __metadata : {
        type: string
        timestamp: number

    }
    value : string;
}
interface cacheStrategyImp<T>{
    get(key: string) : T | undefined;
    set(key: string, value : T) : void;
    clear() : void;
}
class TTLStrategy<T>  implements cacheStrategyImp<T>{
     private timers  = new Map<string,NodeJS.Timeout>();
     constructor(private ttl: number){  
     }
    get(key: string): T | undefined {
        if (this.timers.has(key)){
            this.timers.get(key);
        }
        return undefined;
    }
    clear(): void {
        if ( this.timers.size > 0){
            for (const timer of this.timers.values()){
                clearTimeout(timer);
            }
        }else{
            this.timers.clear();
        }
    }
     set(key: string, value: T): void {
         if (this.timers.has(key)){
                clearTimeout(this.timers.get(key)!);
         }
         this.timers.set(key,setTimeout(() => {
             this.timers.delete(key);
             this.ttl
         }))
     }
    delete(key: string): void {
        if (this.timers.has(key)){
            clearTimeout(this.timers.get(key)!);
            this.timers.delete(key);
        }

    }
}
class LRUStrategy<T> implements cacheStrategyImp<T>{
    private cache = new Map<String,T>();
    private order : String[] = [];
    constructor(private maxSize: number){
    }
    get(key: string): T | undefined {
       if (this.cache.has(key)){
            this.updateOrder(key);
            return this.cache.get(key);
       }
    }
    private updateOrder(key: string){
        this.order  = this.order.filter((k) => k !== key);

    }
    set(key: string, value: T): void {
       if ( this.cache.has(key)){
             this.updateOrder(key);
       }else{
          console.log("Cannot set the new value");
       }
    }
    clear(): void { 
        this.cache.clear();
        this.order = [];
    }
    delete(key: string): void {
        if (this.cache.has(key)){
            this.cache.delete(key);
            this.updateOrder(key);
        }
    }

}
class genericCache<T>{
    private storage = new Map<string,serializadedValue<T>>();
    private strategyImpl : cacheStrategyImp<T>;
    constructor(config : cacheStrategyConfig<T>,private schema?: z.Schema<T>,private reviver?: (value: any) =>  T , private replace?:(value : T) => any){
      this.strategyImpl = this.createStrategy(config);
    }
 private createStrategy(config : cacheStrategyConfig<T>) : cacheStrategyImp<T>{
     switch (config.strategy){
         case 'TTL':
             return new TTLStrategy(config.ttl);
         case 'LRU':
             return new LRUStrategy(config.capacity);
         default:
            throw new Error('Invalid strategy');
     }
 }
   private serialize(value : T) : serializadedValue<T>{
      return {
            __metadata: {
                type : typeof value,
                timestamp : Date.now()
            },
            value : this.replace ? this.replace(value) : JSON.stringify(value)
      }

   }
  private deserialize(value : serializadedValue<T>) : T{
        const rawValue = this.reviver ? this.reviver(value.value) : JSON.parse(value.value);
        if (this.schema) {
            const parsed = this.schema.safeParse(rawValue);
            if (parsed.success){
                return parsed.data;
            }
        }
        return rawValue as T;
  }
    get(key : string) : T | undefined{
        const serialized = this.storage.get(key);
        if (!serialized){
            return undefined;
        }
        try{
            return this.deserialize(serialized);
        }catch(errr){
            return undefined;
        }
    }
    
   
}