export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

import { fetchVotes } from "./query";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const votes = await fetchVotes(BigInt(id));

  return NextResponse.json(votes);
}
