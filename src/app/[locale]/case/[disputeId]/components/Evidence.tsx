import React from "react";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Link from "next/link";

import { type EvidenceResponseType } from "@/app/api/evidence/[id]/query";
import { ipfsUrl, shortenAddress } from "@/app/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface IEvidence {
  evidenceGroupId: string;
}

const Evidence: React.FC<IEvidence> = async ({ evidenceGroupId }) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const data: EvidenceResponseType["evidenceGroup"] = await fetch(
    `${protocol}://${host}/api/evidence/${evidenceGroupId}`,
  ).then((result) => result.json());

  const t = await getTranslations("case.evidence");

  return (
    <Card className="gradient-card shadow-elegant border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold" dir="auto">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data?.evidences?.map((evidence, i) => {
          const hasFileURI = evidence.fileURI && evidence.fileURI.length > 0;
          const isIpfsPath =
            hasFileURI && evidence.fileURI.startsWith("/ipfs/");
          return (
            <div
              key={evidence.id}
              className="p-6 rounded-xl border border-border bg-card/50"
            >
              <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
                <div className="flex flex-col gap-2 items-start">
                  <h4 className="text-lg font-semibold" dir="auto">
                    #{i + 1} {evidence.name}
                  </h4>
                  <p className="text-primary-text text-base" dir="auto">
                    {evidence.description}
                  </p>
                </div>

                {isIpfsPath ? (
                  <Link
                    href={ipfsUrl(evidence.fileURI)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="hover-glow">
                      <Eye className="w-4 h-4 mr-1" />
                      {t("see")}
                    </Button>
                  </Link>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground" dir="auto">
                  {t("from")}
                </span>
                <Badge variant="secondary" className="font-mono">
                  {shortenAddress(evidence.sender.id)}
                </Badge>
              </div>
            </div>
          );
        })}
        {data?.evidences === undefined ? (
          <p className="w-full text-center text-secondary-text">
            No evidence submitted
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Evidence;
