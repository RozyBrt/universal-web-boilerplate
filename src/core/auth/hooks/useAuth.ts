"use client";
import { useCallback } from "react";
import { container } from "@/core/di/Container";
import { AuthProviderInterface } from "../providers/AuthProviderInterface";

export function useAuth() {
  const authProvider = container.resolve<AuthProviderInterface>("auth");

  const signIn = useCallback(async (credentials: any) => {
    return await authProvider.signIn(credentials);
  }, [authProvider]);

  const signUp = useCallback(async (credentials: any) => {
    return await authProvider.signUp(credentials);
  }, [authProvider]);

  const signOut = useCallback(async () => {
    return await authProvider.signOut();
  }, [authProvider]);

  return { signIn, signUp, signOut };
}
