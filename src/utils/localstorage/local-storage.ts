const localeSorageKey = 'rickandmorty25';

class LocaleStorage {
  public key = '';
  constructor(key: string = localeSorageKey) {
    this.key = key;
  }

  getLocaleStorage(): string {
    const lsValue = localStorage.getItem(this.key);
    if (lsValue) {
      return JSON.parse(lsValue);
    }
    return '';
  }

  setLocaleStorage(value: string): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export { LocaleStorage };
