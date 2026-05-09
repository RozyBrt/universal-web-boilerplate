"use client";
import { useCallback } from "react";
export function useAuth() {
  const signIn  = useCallback(async (credentials: unknown) => {}, []);
  const signOut = useCallback(async () => {}, []);
  return { signIn, signOut };
}
