"use client";
import { useState, useEffect, useCallback } from "react";
import { container } from "@/core/di/Container";
import { Product } from "@/core/database/types";
import { ProductRepository } from "@/core/database/repositories/ProductRepository";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = container.resolve<ProductRepository>("productRepository");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.findAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addProduct = async (product: Partial<Product>) => {
    const newProduct = await repository.create(product);
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const updated = await repository.update(id, product);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await repository.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { 
    products, 
    loading, 
    error, 
    refresh: fetchProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  };
}
