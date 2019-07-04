import {store} from '../store';
import { Product } from '../models';

function getAllProducts(): Product[] {
  return store.products;
}

function findProduct(id: number): Product | undefined {
  return store.products.find(p => p.id === id.toString());
}

function getProductsLength(): number {
  return store.products.length;
}

export {
    findProduct,
    getAllProducts,
    getProductsLength,
    Product,
};
