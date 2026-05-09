"use client";

import { useSession } from "@/core/auth/hooks/useSession";
import { 
  Users, Briefcase, TrendingUp, 
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useSession();

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 text-lg">Selamat datang kembali, <span className="text-indigo-600 font-semibold">{user.email}</span>. Berikut statistik hari ini.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">1,284</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <h3 className="text-2xl font-bold text-gray-900">42</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Growth</p>
              <h3 className="text-2xl font-bold text-gray-900">+12.5%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                  <Briefcase size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">Project X Update</h4>
                  <p className="text-xs text-gray-500">Modified by Admin • 2 hours ago</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Completed</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
          <h3 className="text-xl font-bold mb-4">Go Premium!</h3>
          <p className="text-indigo-100 mb-8 leading-relaxed">Dapatkan akses ke fitur eksklusif dan statistik yang lebih mendalam dengan berlangganan plan Pro.</p>
          <button className="w-full py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-lg hover:bg-indigo-50 transition-all active:scale-95">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}
