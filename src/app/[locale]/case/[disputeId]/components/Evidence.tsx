import React from "react";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { type EvidenceResponseType } from "@/app/api/evidence/[id]/query";
import { ipfsUrl, shortenAddress } from "@/app/utils";
import { Separator } from "@/components/ui/separator";

interface IEvidence {
  evidenceGroupId: string;
}

const Evidence: React.FC<IEvidence> = async ({ evidenceGroupId }) => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const data: EvidenceResponseType["evidenceGroup"] = await fetch(
    `${protocol}://${host}/api/evidence/${evidenceGroupId}`,
  ).then((result) => result.json());

  const t = await getTranslations("case.evidence");

  return (
    <div className="w-full px-4 space-y-6">
      <h3 className="text-primary-text text-lg text-center">{t("title")}</h3>
      {data.evidences.map((evidence, i) => (
        <div key={evidence.evidenceIndex} className="w-full">
          <h4
            className="text-base md:text-md text-primary-text font-semibold"
            dir="auto"
          >
            #{i + 1} {evidence.name}
          </h4>
          <Separator className="bg-stroke my-1" />
          <p className="text-primary-text text-base pl-2" dir="auto">
            {evidence.description}
          </p>
          <div
            className={
              "mt-1 bg-stroke flex justify-between items-center px-2 py-1"
            }
          >
            <span
              className={
                "text-xs md:text-base align-middle text-secondary-text"
              }
            >
              {t("from", { user: shortenAddress(evidence.sender.id) })}
            </span>
            <Link
              href={ipfsUrl(evidence.fileURI)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src="/attachment.svg"
                  alt="attachment"
                  width="24"
                  height="24"
                  className="inline w-4"
                />
                <span className="text-base text-primary-blue">
                  {t("attachment")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Evidence;
