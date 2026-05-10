"use client";

import { useSession } from "@/core/auth/hooks/useSession";
import { useProducts } from "@/core/products/hooks/useProducts";
import { useCategory } from "@/core/database/hooks/useCategory";
import { 
  Users, Briefcase, TrendingUp, AlertTriangle, Package, Layers, Loader2
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useSession();
  const { products, loading: productsLoading } = useProducts();
  const { data: categories, loading: categoriesLoading } = useCategory();

  if (!user) return null;

  const loading = productsLoading || categoriesLoading;

  // Calculate Stats
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const lowStockItems = products.filter(p => p.stock < 10).length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Selamat datang kembali, <span className="text-indigo-600 font-semibold">{user.email?.split('@')[0]}</span> bray! ☕
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Total Menu */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Menu</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? <Loader2 className="animate-spin" size={20} /> : totalProducts}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Kategori */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Kategori</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? <Loader2 className="animate-spin" size={20} /> : totalCategories}
              </h3>
            </div>
          </div>
        </div>

        {/* Stok Menipis */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Stok Menipis</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? <Loader2 className="animate-spin" size={20} /> : lowStockItems}
              </h3>
            </div>
          </div>
        </div>

        {/* Estimasi Nilai Aset */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nilai Aset</p>
              <h3 className="text-xl font-bold text-gray-900">
                {loading ? <Loader2 className="animate-spin" size={20} /> : `Rp ${totalStockValue.toLocaleString('id-ID')}`}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Daftar Menu Terlaris</h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Lihat Semua</button>
          </div>
          <div className="space-y-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold uppercase italic text-xs">
                  {product.category.slice(0, 3)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-500">Tersisa {product.stock} pcs • Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                  product.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}>
                  {product.stock < 10 ? "Re-stock" : "Aman"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
            <h3 className="text-xl font-bold mb-4">Butuh Bantuan?</h3>
            <p className="text-indigo-100 mb-8 leading-relaxed text-sm">Hubungi support untuk kustomisasi lebih lanjut pada boilerplate angkringan kamu bray.</p>
            <button className="w-full py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-lg hover:bg-indigo-50 transition-all active:scale-95">Support Center</button>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-3xl p-8">
             <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
             <div className="space-y-3">
                <a href="/dashboard/products" className="block text-sm text-gray-600 hover:text-indigo-600 transition-colors">• Kelola Menu</a>
                <a href="/dashboard/category" className="block text-sm text-gray-600 hover:text-indigo-600 transition-colors">• Edit Kategori</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
