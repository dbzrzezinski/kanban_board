import { LOCAL_STORAGE_KEYS } from "./../Constants/Constants";
import { LocalStorageKeys } from "./../Types/Constants";

export const StorageService = {
  setItem(key: LocalStorageKeys, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: LocalStorageKeys) {
    const value = localStorage.getItem(key);
    return JSON.parse(value || "{}");
  },
  removeItem(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
