import { BaseRepository } from "./BaseRepository";
import { Product } from "../types";
import { supabase } from "@/core/infrastructure/supabase/client";

export class ProductRepository extends BaseRepository<Product> {
  async findById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) return null;
    return data;
  }

  async findAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return data || [];
  }

  async create(data: Partial<Product>): Promise<Product> {
    const { data: created, error } = await supabase
      .from("products")
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return created;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const { data: updated, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
}
