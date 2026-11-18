import React from "react";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Link from "next/link";

import { type StatusResponseType } from "@/app/api/dispute/[id]/status/query";
import { VotesResponseType } from "@/app/api/dispute/[id]/votes/query";
import { Periods, ipfsUrl, processCurrentPeriod } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type DisputeDetails } from "@kleros/kleros-sdk";
import clsx from "clsx";
import { FileText, HelpCircle } from "lucide-react";

interface IPolicy {
  disputeId: `${number}`;
}

type VotesData = Record<
  string,
  {
    id: string;
    count: number;
  }
>;

const Policy: React.FC<IPolicy> = async ({ disputeId }) => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const disputeDetails: DisputeDetails = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/template`,
  ).then((result) => result.json());

  const disputeStatus: StatusResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/status`,
  ).then((result) => result.json());

  const voteData: VotesResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/votes`,
  ).then((result) => result.json());

  const processedAnswers = voteData.rounds[0].drawnJurors.reduce(
    (acc: VotesData, draw) => {
      if (draw?.vote?.choice === undefined) return acc;
      const answerId = `0x${parseInt(draw.vote.choice).toString(16)}`;
      if (acc[answerId]) {
        acc[answerId].count = acc[answerId].count + 1;
      } else {
        acc[answerId] = {
          id: answerId,
          count: 1,
        };
      }
      return acc;
    },
    {} as VotesData,
  );

  const isFinal =
    processCurrentPeriod(
      Periods[disputeStatus.period],
      parseInt(disputeStatus.currentRoundIndex),
    ) === 2;

  const answerId = `0x${parseInt(
    disputeStatus.disputeKitDispute[0].localRounds[0].winningChoice,
  ).toString(16)}`;

  const finalAnswer = disputeDetails.answers.find(
    (answer) => answer.id === answerId,
  );
  const restAnswers = disputeDetails.answers.filter(
    (answer) => answer.id !== answerId,
  );

  const t1 = await getTranslations("case.policy");
  const t2 = await getTranslations("case.result");

  return (
    <div
      className={clsx("grid gap-6", isFinal ? "md:grid-cols-2" : "grid-cols-1")}
    >
      {isFinal ? (
        <Card className="gradient-card shadow-elegant border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold" dir="auto">
              {t2("title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            {finalAnswer ? (
              <p className="text-2xl font-bold text-primary" dir="auto">
                {t2("votes", {
                  number: processedAnswers[finalAnswer.id]?.count ?? 0,
                  answer: finalAnswer.title,
                })}
              </p>
            ) : null}
            {restAnswers.map((answer) => (
              <p
                className="text-lg text-muted-foreground"
                dir="auto"
                key={answer.id}
              >
                {t2("votes", {
                  number: processedAnswers[answer.id]?.count ?? 0,
                  answer: answer.title,
                })}
              </p>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {disputeDetails.policyURI ? (
        <Card className="gradient-card shadow-elegant border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold">{t1("title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={ipfsUrl(disputeDetails.policyURI)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="glass hover-glow">
                      <FileText className="w-4 h-4 mr-2" />
                      {t1("see")}
                      <HelpCircle className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p dir="auto">{t1("tooltip")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default Policy;
