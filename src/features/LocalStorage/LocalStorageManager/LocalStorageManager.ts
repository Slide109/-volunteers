import { LocalStorageManagerInterface } from './LocalStorageManagerInterface';

class LocalStorageManager implements LocalStorageManagerInterface {
    public getDataByKey<T>(key: string): T | null {
        const data = window.localStorage.getItem(key);
        return (data && JSON.parse(data)) || null;
    }

    public removeDataByKey(key: string) {
        window.localStorage.removeItem(key);
    }

    public addData<T>(key: string, data: T) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}

export { LocalStorageManager };
