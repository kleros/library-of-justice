import React from "react";

import { headers } from "next/headers";

import { type StatusResponseType } from "@/app/api/dispute/[id]/status/query";

import Evidence from "./components/Evidence";
import Period from "./components/Period";
import Question from "./components/Question";
import Votes from "./components/Votes";

import { VotesResponseType } from "@/app/api/dispute/[id]/votes/query";
import { Periods } from "@/app/utils";
import { type DisputeDetails } from "@kleros/kleros-sdk";
import Header from "./components/Header";
import Policy from "./components/Policy";

interface ICaseDetails {
  params: Promise<{ disputeId: `${number}` }>;
}

const CaseDetails: React.FC<ICaseDetails> = async (props) => {
  const params = await props.params;

  const { disputeId } = params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const data: StatusResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/status`,
  ).then((result) => result.json());

  const voteData: VotesResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/votes`,
  ).then((result) => result.json());

  const templateData: DisputeDetails = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/template`,
  ).then((result) => result.json());

  return (
    <div className="flex flex-col items-center w-full">
      <Header {...{ disputeId }} />
      <div className="max-w-6xl w-full px-6 py-8 space-y-8">
        <Question {...{ disputeId }} />
        <Period
          currentPeriod={Periods[data.period]}
          currentRound={parseInt(data.currentRoundIndex)}
          startTime={data.createdAt}
          rulingTime={data.rulingTimestamp}
        />
        <Evidence evidenceGroupId={data.externalDisputeId} />
        <Policy {...{ disputeId }} />
        <Votes
          {...{ disputeId, disputeStatus: data, voteData, templateData }}
        />
      </div>
    </div>
  );
};

export default CaseDetails;
