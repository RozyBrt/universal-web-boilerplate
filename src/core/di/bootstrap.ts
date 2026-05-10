import { container } from "./Container";
import { SupabaseAuthProvider } from "@/core/auth/providers/SupabaseAuthProvider";
import { ProductRepository } from "@/core/database/repositories/ProductRepository";
import { CategoryRepository } from "@/core/database/repositories/CategoryRepository";
import { modules } from "@/config/modules.config";

export function bootstrapDI() {
  // Register Auth Provider based on config
  if (modules.auth.enabled) {
    if (modules.auth.provider === "supabase") {
      container.registerFactory("auth", () => new SupabaseAuthProvider());
    }
  }

  // Register Repositories
  container.registerFactory("productRepository", () => new ProductRepository());
  container.registerFactory("categoryRepository", () => new CategoryRepository());
}
