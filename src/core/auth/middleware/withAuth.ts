import { NextRequest, NextResponse } from "next/server";
export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // TODO: validate session
    return handler(req);
  };
}
