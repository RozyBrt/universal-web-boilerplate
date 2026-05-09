export const featureFlags = {
  enablePayment:   process.env.NEXT_PUBLIC_ENABLE_PAYMENT   === "true",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
};
