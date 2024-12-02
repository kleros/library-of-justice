import React from "react";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import { type StatusResponseType } from "@/app/api/dispute/[id]/status/query";
import { Separator } from "@/components/ui/separator";

import Evidence from "./components/Evidence";
import Period from "./components/Period";
import Question from "./components/Question";
import Votes from "./components/Votes";

import { Periods } from "@/app/utils";

interface ICaseDetails {
  params: { disputeId: `${number}` };
}

const CaseDetails: React.FC<ICaseDetails> = async ({
  params: { disputeId },
}) => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const data: StatusResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/status`,
  ).then((result) => result.json());

  const t = await getTranslations("case");

  return (
    <div className="flex flex-col items-center my-32 px-0 md:px-10">
      <h2 className="text-primary-text text-xl font-bold">
        {t("title")}
        <span className="inline text-primary-blue"> #{disputeId} </span>
      </h2>
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <Question {...{ disputeId }} />
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <Period
        currentPeriod={Periods[data.period]}
        currentRound={parseInt(data.currentRoundIndex)}
      />
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <Evidence evidenceGroupId={data.externalDisputeId} />
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <Votes {...{ disputeId }} />
    </div>
  );
};

export default CaseDetails;
