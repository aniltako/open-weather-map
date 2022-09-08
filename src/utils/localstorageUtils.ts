const storageType = localStorage || window.localStorage;

export function setLocalStorageItem(key: string, value: string) {
  storageType.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  return storageType.getItem(key);
}

export function removeLocalstorageItem(key: string) {
  return storageType.removeItem(key);
}
