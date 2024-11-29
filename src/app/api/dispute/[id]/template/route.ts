import { getDispute } from "@kleros/kleros-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const dispute = await getDispute({
    disputeId: BigInt(id),
    coreSubgraph: process.env.CORE_SUBGRAPH!,
    dtrSubgraph: process.env.DTR_ARBITRUM_SUBGRAPH!,
    options: {
      additionalContext: {
        graphApiKey: process.env.THEGRAPH_API_KEY,
      },
    },
  });

  return NextResponse.json(dispute);
}
