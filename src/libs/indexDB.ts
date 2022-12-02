export interface IIndexDB {
    name: string
    version?: number
    storeName: string
    keyPath: string
 }

export class IndexDb {
    public name: string;
    public version: number;
    private openRequest: IDBOpenDBRequest
    private db: IDBDatabase | null
    private storeName: string

    constructor({name, version = 1, storeName, keyPath}: IIndexDB) {
        this.db = null
        this.name = name
        this.storeName = storeName 
        this.version = version
        this.openRequest = indexedDB.open(name, version);
        this.openRequest.onsuccess = () => {
            this.db = this.openRequest.result
        };
        this.openRequest.onerror = (err) => {
            console.error(err);
        };
        this.openRequest.onupgradeneeded = () => {
            this.openRequest.result.createObjectStore(storeName, { keyPath });
        };
    }

    public add(object: any) {
        if (!this.db) return
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        store.add(object)
    }

    public getOne(name: string) {
        if (!this.db) return
        const transaction = this.db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);
        return store.get(name)
    }

    public getRange(start: number, end: number) {
        if (!this.db) return
        const transaction = this.db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);
        return store.getAll(IDBKeyRange.bound(start, end))
    }

    public deleteDB() {
        return indexedDB.deleteDatabase(this.name)
    }
}