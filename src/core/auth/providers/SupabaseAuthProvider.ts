import { SupabaseClient } from "@supabase/supabase-js";
import { AuthProviderInterface } from "./AuthProviderInterface";
import { supabase } from "@/core/infrastructure/supabase/client";

export class SupabaseAuthProvider implements AuthProviderInterface {
  private supabase: SupabaseClient = supabase;

  async signIn(credentials: { email: string; password?: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password || "",
    });
    if (error) throw error;
    return data;
  }

  async signUp(credentials: { email: string; password?: string }) {
    const { data, error } = await this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password || "",
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }
}
