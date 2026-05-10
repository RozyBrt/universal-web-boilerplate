"use client";
import { useState, useEffect, useCallback } from "react";
import { container } from "@/core/di/Container";
import { Category } from "../repositories/CategoryRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";

export function useCategory() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = container.resolve<CategoryRepository>("categoryRepository");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await repository.findAll();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addItem = async (item: Partial<Category>) => {
    const newItem = await repository.create(item);
    setData((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateItem = async (id: string, item: Partial<Category>) => {
    const updated = await repository.update(id, item);
    setData((prev) => prev.map((i) => (i.id === id ? updated : i)));
    return updated;
  };

  const deleteItem = async (id: string) => {
    await repository.delete(id);
    setData((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    refresh: fetchData, 
    addItem, 
    updateItem, 
    deleteItem 
  };
}
