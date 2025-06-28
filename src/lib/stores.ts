import { writable } from 'svelte/store';
import type { Product, Sale } from './types';

// --- Helpers ---
export function persistStore<T>(key: string, initialValue: T) {
  const isBrowser = typeof window !== 'undefined';

  let storedValue: T = initialValue;

  if (isBrowser) {
    const json = localStorage.getItem(key);
    if (json) {
      storedValue = JSON.parse(json);
    }
  }

  const store = writable<T>(storedValue);

  if (isBrowser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}

// --- Stores ---
const defaultProducts: Product[] = [
  { id: 1, name: 'Americano', stock: 10, price: 50 },
  { id: 2, name: 'Latte', stock: 5, price: 65 },
  { id: 3, name: 'Croissant', stock: 8, price: 40 }
];

export const products = persistStore<Product[]>('coffeetrack_products', defaultProducts);
export const sales = persistStore<Sale[]>('coffeetrack_sales', []);