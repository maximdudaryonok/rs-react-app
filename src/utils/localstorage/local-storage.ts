const localeSorageKey = 'rickandmorty25';

const getLocaleStorage = (key: string = localeSorageKey): string => {
  const lsValue = localStorage.getItem(key);

  if (lsValue) {
    return JSON.parse(lsValue);
  }

  return '';
};

const setLocaleStorage = (
  value: string,
  key: string = localeSorageKey
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocaleStorage, setLocaleStorage };
