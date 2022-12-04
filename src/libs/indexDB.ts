import { oneMoment } from "../utils";

export interface IIndexDB {
    name: string
    version?: number
    storeName: string
    keyPath: string
 }

export class IndexDb {
    public name: string;
    public version: number;
    private openRequest!: IDBOpenDBRequest;
    private db: IDBDatabase | null
    private storeName: string
    private keyPath: string

    constructor({name, version = 1, storeName, keyPath}: IIndexDB) {
        this.db = null
        this.name = name
        this.storeName = storeName 
        this.version = version
        this.keyPath = keyPath
    }

    // Подключение к БД
    public init() {
        return new Promise((resolve, reject) => {
            this.openRequest = indexedDB.open(this.name, this.version);
            this.openRequest.onsuccess = () => {
                this.db = this.openRequest.result
                resolve(this.db)
            };
            this.openRequest.onerror = (err) => {
                console.error('onerror', err);
                reject(err)
            };
            this.openRequest.onupgradeneeded = () => {
                this.openRequest.result.createObjectStore(this.storeName, { keyPath: this.keyPath });
            };
            this.openRequest.onblocked = () => {
                console.log('onblocked')
            }
        })
    }

    // Добавление одной записи в БД
    public add(object: any) {
        return new Promise((resolve, reject) => {
            if (!this.db) return
            const transaction = this.db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.add(object)
            request.onsuccess = function() {
                resolve(request.result)
            };   
            request.onerror = function() {
                reject(request.error)
            };
        })
    }

    // Добавление массива данных в БД
    public addSome<T>(array: T[], setId: (elem: T) => string | number) {
        return new Promise(async(resolve, reject) => {
            if (!this.db) return
            const transaction = this.db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);

            for (let i = 0; i < array.length; i++) {
                const elem = array[i]
                store.add({
                    ...elem,
                    id: setId(elem)
                })
            }

            transaction.oncomplete = function() {
                resolve(true)
            };
            transaction.onerror = function(err) {
                reject(err)
            }
        })
    }
    // Взять одну запись из БД
    public getOne(name: string | number) {
        return new Promise((resolve, reject) => {
            if (!this.db) return
            const transaction = this.db.transaction(this.storeName, "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.get(name)
            request.onsuccess = function() {
                resolve(request.result)
            };   
            request.onerror = function() {
                reject(request.error)
            };
        })
    }

    // Взять массив данных по ренджу
    public getRange<T>(start: number, end: number): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.db) return
            const transaction = this.db.transaction(this.storeName, "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll(IDBKeyRange.bound(start, end))
            request.onsuccess = function() {
                resolve(request.result as T | undefined)
            };   
            request.onerror = function() {
                reject(request.error)
            };
        })
    }
    // Удалить БД
    public deleteDB() {
        return indexedDB.deleteDatabase(this.name)
    }
}