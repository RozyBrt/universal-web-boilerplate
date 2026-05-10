import prompts from "prompts";
import fs from "fs";
import path from "path";

const BASE_PATH = process.cwd();

const templates = {
  repository: (name: string) => `import { BaseRepository } from "./BaseRepository";
import { supabase } from "@/core/infrastructure/supabase/client";

export interface ${name} {
  id: string;
  name: string;
  created_at?: string;
  // Add more fields here
}

export class ${name}Repository extends BaseRepository<${name}> {
  async findById(id: string): Promise<${name} | null> {
    const { data, error } = await supabase
      .from("${name.toLowerCase()}s")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) return null;
    return data;
  }

  async findAll(): Promise<${name}[]> {
    const { data, error } = await supabase
      .from("${name.toLowerCase()}s")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) return [];
    return data || [];
  }

  async create(data: Partial<${name}>): Promise<${name}> {
    const { data: created, error } = await supabase
      .from("${name.toLowerCase()}s")
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return created;
  }

  async update(id: string, data: Partial<${name}>): Promise<${name}> {
    const { data: updated, error } = await supabase
      .from("${name.toLowerCase()}s")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return updated;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("${name.toLowerCase()}s")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
}
`,
  hook: (name: string) => `"use client";
import { useState, useEffect, useCallback } from "react";
import { container } from "@/core/di/Container";
import { ${name}, ${name}Repository } from "../repositories/${name}Repository";

export function use${name}() {
  const [data, setData] = useState<${name}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = container.resolve<${name}Repository>("${name.toLowerCase()}Repository");

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

  const addItem = async (item: Partial<${name}>) => {
    const newItem = await repository.create(item);
    setData((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateItem = async (id: string, item: Partial<${name}>) => {
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
`,
  page: (name: string) => `"use client";

import React, { useState } from "react";
import { use${name} } from "@/core/database/hooks/use${name}";
import { 
  Plus, Edit2, Trash2, Loader2, 
  X, Save, AlertCircle, AlertTriangle 
} from "lucide-react";
import { ${name} } from "@/core/database/repositories/${name}Repository";
import { toast } from "react-hot-toast";

export default function ${name}Page() {
  const { data, loading, error, addItem, updateItem, deleteItem } = use${name}();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<${name} | null>(null);
  const [itemToDelete, setItemToDelete] = useState<${name} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<${name}>>({
    name: "",
  });

  const handleOpenModal = (item?: ${name}) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "" });
    }
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (item: ${name}) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
        toast.success("${name} diupdate bray!");
      } else {
        await addItem(formData);
        toast.success("${name} ditambah bray!");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error("Gagal menyimpan: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete.id);
        setIsDeleteModalOpen(false);
        toast.success("${name} berhasil dihapus!");
      } catch (err: any) {
        toast.error("Gagal menghapus: " + err.message);
      }
    }
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">${name} Management</h1>
          <p className="text-gray-500 mt-1">Manage your ${name.toLowerCase()} data bray.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <Plus size={20} /> Add ${name}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Error: {error}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No data found. Click "Add ${name}" to start.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-gray-900">{item.name}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">
                {editingItem ? "Edit ${name}" : "Add New ${name}"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Enter name..."
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Delete ${name}?</h3>
            <p className="text-gray-500 mb-8">Are you sure? This action cannot be undone bray.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`
};

async function generate() {
  const response = await prompts({
    type: "text",
    name: "name",
    message: "What is the name of the module? (e.g. Category)",
    validate: (value) => (value.length < 2 ? "Name is too short" : true)
  });

  if (!response.name) return;

  const name = response.name.charAt(0).toUpperCase() + response.name.slice(1);
  const lowerName = name.toLowerCase();

  const paths = {
    repository: path.join(BASE_PATH, "src/core/database/repositories", `${name}Repository.ts`),
    hook: path.join(BASE_PATH, "src/core/database/hooks", `use${name}.ts`),
    page: path.join(BASE_PATH, "src/app/(protected)/dashboard", lowerName, "page.tsx")
  };

  // Ensure directories exist
  Object.values(paths).forEach((p) => {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Write files
  fs.writeFileSync(paths.repository, templates.repository(name));
  fs.writeFileSync(paths.hook, templates.hook(name));
  fs.writeFileSync(paths.page, templates.page(name));

  console.log(`\n✅ Module "${name}" generated successfully with full CRUD UI!`);
  console.log(`\nFiles created:`);
  console.log(`- ${paths.repository}`);
  console.log(`- ${paths.hook}`);
  console.log(`- ${paths.page}`);
  
  console.log(`\n⚠️  Don't forget to:`);
  console.log(`1. Register the repository in "src/core/di/bootstrap.ts":`);
  console.log(`   container.registerFactory("${lowerName}Repository", () => new ${name}Repository());`);
  console.log(`2. Add a link to the sidebar in "src/app/(protected)/dashboard/layout.tsx".`);
}

generate().catch(console.error);
