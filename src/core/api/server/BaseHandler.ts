import { NextRequest, NextResponse } from "next/server";
export abstract class BaseHandler {
  abstract handle(req: NextRequest): Promise<NextResponse>;
  protected json(data: unknown, status = 200) {
    return NextResponse.json(data, { status });
  }
}
