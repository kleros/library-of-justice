import React from "react";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { type StatusResponseType } from "@/app/api/dispute/[id]/status/query";
import { DisputeDetails } from "@/app/api/dispute/[id]/template/route";
import { Periods, ipfsUrl, processCurrentPeriod } from "@/app/utils";
import { Separator } from "@/components/ui/separator";

interface IQuestion {
  disputeId: `${number}`;
}

const Question: React.FC<IQuestion> = async ({ disputeId }) => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const disputeDetails: DisputeDetails = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/template`,
  ).then((result) => result.json());

  const disputeStatus: StatusResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/status`,
  ).then((result) => result.json());

  const isFinal =
    processCurrentPeriod(
      Periods[disputeStatus.period],
      parseInt(disputeStatus.currentRoundIndex),
    ) === 2;

  const answerId = `0x${parseInt(
    disputeStatus.disputeKitDispute[0].localRounds[0].winningChoice,
  ).toString(16)}`;

  const t = await getTranslations("case.question");

  return (
    <div className="space-y-6">
      <h3 className="text-primary-text text-lg text-center">{t("title")}</h3>
      <h4
        className="text-primary-text text-base md:text-md font-semibold"
        dir="auto"
      >
        {disputeDetails.question}
      </h4>
      {disputeDetails.description ? (
        <p className="text-primary-text" dir="auto">
          {disputeDetails.description}
        </p>
      ) : null}
      {disputeDetails.policyURI ? (
        <div className="flex justify-center">
          <Link
            href={ipfsUrl(disputeDetails.policyURI)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex gap-2 items-center">
              <Image
                src="/attachment.svg"
                alt="attachment"
                width="24"
                height="24"
                className="inline w-4 md:w-5"
              />
              <span className="text-base md:text-md text-primary-blue m-auto">
                {t("policy")}
              </span>
            </div>
          </Link>
        </div>
      ) : null}
      <div className="grid auto-cols-fr grid-flow-col divide-x-2 divide-stroke">
        {disputeDetails.answers.map((answer) => (
          <div key={answer.title}>
            <div
              className={clsx(
                "p-4",
                "relative",
                isFinal &&
                  answerId === answer.id &&
                  "border-2 border-primary-blue",
              )}
            >
              {isFinal && answerId === answer.id ? (
                <span
                  className={clsx([
                    "content-['Winner'] absolute right-1/2",
                    "translate-x-1/2 top-0 -translate-y-1/2",
                    "bg-white-background text-primary-blue px-2",
                  ])}
                >
                  {t("winner")}
                </span>
              ) : null}
              <h4
                className="text-primary-text text-base md:text-md font-semibold"
                dir="auto"
              >
                {answer.title}
              </h4>
              <Separator className="bg-stroke" />
              <p className="text-primary-text text-base" dir="auto">
                {answer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
