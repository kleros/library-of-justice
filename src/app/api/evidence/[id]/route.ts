import { NextRequest, NextResponse } from "next/server";

import { spamEvidenceId } from "@/app/utils";

import { fetchEvidences } from "./query";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const evidence = await fetchEvidences(BigInt(id));

  return NextResponse.json({
    evidences: evidence?.evidences.filter(
      (evidence) => !spamEvidenceId.has(evidence.id),
    ),
  });
}
