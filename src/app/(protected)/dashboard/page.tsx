"use client";

import { useSession } from "@/core/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/core/auth/hooks/useAuth";

export default function DashboardPage() {
  const { user, loading } = useSession();
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Kalau sudah selesai loading dan user ternyata tidak ada (belum login)
    // lempar ke halaman login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Simple Navbar for Test */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 font-bold text-indigo-600">
              <LayoutDashboard size={24} />
              <span>My App Template</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Halo, <span className="font-semibold text-gray-900">{user.email}</span></span>
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Selamat Datang di Dashboard!</h1>
          <p className="text-gray-600">
            Ini adalah area terproteksi. Jika kamu bisa melihat halaman ini, berarti sistem 
            <strong> Auth Real-time</strong> dan <strong>Dependency Injection</strong> kita sudah berjalan sempurna bray!
          </p>
          
          <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="text-indigo-800 font-bold mb-2">Debug Info:</h3>
            <pre className="text-xs text-indigo-600 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
