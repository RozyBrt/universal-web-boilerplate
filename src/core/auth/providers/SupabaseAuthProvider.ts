import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AuthProviderInterface } from "./AuthProviderInterface";
import { env } from "@/config/env.config";

export class SupabaseAuthProvider implements AuthProviderInterface {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  async signIn(credentials: { email: string; password?: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
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
