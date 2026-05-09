export const modules = {
  auth:    { enabled: true, provider: "supabase" as const },
  payment: { enabled: true, provider: "stripe"   as const },
  storage: { enabled: true, provider: "s3"       as const },
};
