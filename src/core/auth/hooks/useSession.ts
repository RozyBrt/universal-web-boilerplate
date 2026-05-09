"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env.config";

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Kita buat instance supabase sementara di sini untuk listener
  // (Atau bisa ambil dari container kalau mau lebih strict)
  const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

  useEffect(() => {
    // 1. Ambil session awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen ke perubahan auth (Login, Logout, User Updated)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading, user: session?.user ?? null };
}
