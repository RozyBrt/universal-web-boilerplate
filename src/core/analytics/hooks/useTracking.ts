"use client";
export function useTracking() {
  const track = (_event: string, _props?: Record<string, unknown>) => {};
  return { track };
}
