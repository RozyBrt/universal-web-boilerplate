"use client";

import { useSession } from "@/core/auth/hooks/useSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { 
  Loader2, LogOut, LayoutDashboard, 
  Users, Briefcase, Settings, 
  Bell, Search, User as UserIcon
} from "lucide-react";
import { useAuth } from "@/core/auth/hooks/useAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSession();
  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Menu Angkringan", href: "/dashboard/products", icon: Briefcase },
    { name: "Kategori", href: "/dashboard/category", icon: Users },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-black text-xl text-indigo-600 tracking-tight">
            <LayoutDashboard size={24} />
            <span>CORE_APP</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a 
                key={item.name}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                    : "text-gray-600 hover:bg-gray-50 font-medium"
                }`}
              >
                <item.icon size={20} /> {item.name}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="relative w-96 hidden md:block">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
              placeholder="Search anything..." 
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none">{user.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Pro Plan</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
