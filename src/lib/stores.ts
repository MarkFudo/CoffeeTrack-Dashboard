import { writable } from 'svelte/store';
import type { Product, Sale } from './types';

// --- Helpers ---
function persistStore<T>(key: string, initial: T) {
  let storedValue: T;

  try {
    const raw = localStorage.getItem(key);
    storedValue = raw ? JSON.parse(raw) : initial;
  } catch {
    storedValue = initial;
  }

  const store = writable<T>(storedValue);

  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}

// --- Stores ---
const defaultProducts: Product[] = [
  { id: 1, name: 'Café Americano', stock: 10, price: 50 },
  { id: 2, name: 'Latte', stock: 5, price: 65 },
  { id: 3, name: 'Croissant', stock: 8, price: 40 }
];

export const products = persistStore<Product[]>('coffeetrack_products', defaultProducts);
export const sales = persistStore<Sale[]>('coffeetrack_sales', []);