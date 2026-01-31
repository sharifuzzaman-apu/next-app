import { useEffect, useState } from 'react';

/**
 * localStorage management with error handling
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsLoaded(true);
        return;
      }

      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
      }
      setError(null);
    } catch (err) {
      console.error(`Error loading ${key} from localStorage:`, err);
      setError(`Failed to load data from storage`);
      // Keep initial value on error
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Save to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setError(null);
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
      setError(`Failed to save data to storage`);
      // Still update state even if localStorage fails
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    }
  };

  // Remove from localStorage
  const removeValue = () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      setError(null);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage:`, err);
      setError(`Failed to remove data from storage`);
      // Still reset state even if localStorage fails
      setStoredValue(initialValue);
    }
  };

  return { value: storedValue, setValue, removeValue, isLoaded, error };
}
