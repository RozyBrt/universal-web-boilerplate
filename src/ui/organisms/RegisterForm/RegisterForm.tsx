"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/core/auth/hooks/useAuth";
import { Loader2, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp({ email: data.email, password: data.password });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mendaftar");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md p-8 text-center space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <CheckCircle2 size={48} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
        <p className="text-gray-600">
          Silakan cek email Anda untuk melakukan verifikasi akun sebelum masuk.
        </p>
        <button
          onClick={() => window.location.href = "/login"}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all"
        >
          Ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Buat Akun</h2>
        <p className="mt-2 text-sm text-gray-600">Daftar sekarang untuk memulai</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <User size={18} />
            </div>
            <input
              {...register("name")}
              type="text"
              className={`block w-full pl-10 pr-3 py-2.5 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="Nama Anda"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              {...register("email")}
              type="email"
              className={`block w-full pl-10 pr-3 py-2.5 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="nama@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              {...register("password")}
              type="password"
              className={`block w-full pl-10 pr-3 py-2.5 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Konfirmasi Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`block w-full pl-10 pr-3 py-2.5 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Daftar Sekarang"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  );
};
