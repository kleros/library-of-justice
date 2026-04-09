import { NextRequest, NextResponse } from "next/server";

import { fetchStatus } from "./query";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const status = await fetchStatus(BigInt(id));

  return NextResponse.json(status);
}
