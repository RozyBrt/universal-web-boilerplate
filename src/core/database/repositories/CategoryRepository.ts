import { BaseRepository } from "./BaseRepository";
import { supabase } from "@/core/infrastructure/supabase/client";

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

export class CategoryRepository extends BaseRepository<Category> {
  async findById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) return null;
    return data;
  }

  async findAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return data || [];
  }

  async create(data: Partial<Category>): Promise<Category> {
    const { data: created, error } = await supabase
      .from("categories")
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return created;
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const { data: updated, error } = await supabase
      .from("categories")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
}
