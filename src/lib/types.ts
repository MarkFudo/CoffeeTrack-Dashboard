export type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

export type Sale = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  date: string; // ISO
};