"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/core/infrastructure/supabase/client";

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
