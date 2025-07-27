import { useLocalStorage } from '../../../utils/localstorage/local-storage.ts';

const STORAGE_KEY = 'rickandmorty25';

const useSearchQuery = (): [string, (value: string) => void] => {
  return useLocalStorage<string>(STORAGE_KEY, '');
};

export { useSearchQuery };
