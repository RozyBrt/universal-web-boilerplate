"use client";

import React, { useState } from "react";
import { useCategory } from "@/core/database/hooks/useCategory";
import { 
  Plus, Edit2, Trash2, Loader2, 
  X, Save, AlertCircle, AlertTriangle 
} from "lucide-react";
import { Category } from "@/core/database/repositories/CategoryRepository";
import { toast } from "react-hot-toast";

export default function CategoryPage() {
  const { data, loading, error, addItem, updateItem, deleteItem } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
  });

  const handleOpenModal = (item?: Category) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (item: Category) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await (editingItem ? updateItem(editingItem.id, formData) : addItem(formData));
      setIsModalOpen(false);
      toast.success(editingItem ? "Kategori diupdate bray!" : "Kategori baru ditambah!");
    } catch (err: any) {
      toast.error("Gagal menyimpan: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete.id);
        setIsDeleteModalOpen(false);
        toast.success("Kategori berhasil dihapus!");
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Kategori Management</h1>
          <p className="text-gray-500 mt-1">Kelola data kategori angkringan kamu bray.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <Plus size={20} /> Add Kategori
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
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No data found. Click "Add Kategori" to start.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-gray-900">{item.name}</td>
                    <td className="px-6 py-5 text-gray-600 text-sm">{item.description || "-"}</td>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">
                {editingItem ? "Edit Kategori" : "Tambah Kategori"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Nama Kategori</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: Makanan Berat"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Deskripsi</label>
                <textarea 
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px]"
                  placeholder="Penjelasan singkat kategori..."
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Simpan
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
            <h3 className="text-2xl font-black text-gray-900 mb-2">Hapus Kategori?</h3>
            <p className="text-gray-500 mb-8">
              Yakin mau hapus <span className="font-bold text-gray-900">"{itemToDelete?.name}"</span>? Kategori ini bakal hilang selamanya bray.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-100"
              >
                Ya, Hapus!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
