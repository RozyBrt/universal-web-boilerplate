"use client";

import React, { useState } from "react";
import { useProducts } from "@/core/products/hooks/useProducts";
import { 
  Plus, Edit2, Trash2, Loader2, 
  Search, X, Save, AlertCircle 
} from "lucide-react";
import { Product } from "@/core/database/types";

export default function ProductsPage() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "Makanan",
    stock: 0,
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: "", price: 0, category: "Makanan", stock: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && products.length === 0) {
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Menu Angkringan</h1>
          <p className="text-gray-500 mt-1">Kelola daftar menu, harga, dan stok barang bray.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <Plus size={20} /> Tambah Menu
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Error: {error}</span>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Menu</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                    Belum ada menu. Klik "Tambah Menu" untuk memulai bray.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900">{product.name}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase italic">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-semibold text-gray-700">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-5 text-gray-600">
                      {product.stock} <span className="text-xs text-gray-400">pcs</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
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
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">
                {editingProduct ? "Edit Menu" : "Tambah Menu Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Nama Menu</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: Sate Usus"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option>Makanan</option>
                    <option>Minuman</option>
                    <option>Camilan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">Stok</label>
                  <input 
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Harga (Rp)</label>
                <input 
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
    </div>
  );
}
