export interface LocalStorageManagerInterface {
    getDataByKey<T>(key: string): T | null;
    removeDataByKey(key: string): void;
    addData<T>(key: string, data: T): void;
}
