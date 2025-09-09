import React from "react";

import clsx from "clsx";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { getLangDir } from "rtl-detect";

import { type StatusResponseType } from "@/app/api/dispute/[id]/status/query";
import { type DisputeDetails } from "@/app/api/dispute/[id]/template/route";
import { Periods, processCurrentPeriod } from "@/app/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, CircleDotDashed, Gavel } from "lucide-react";

interface IQuestion {
  disputeId: `${number}`;
}

const Question: React.FC<IQuestion> = async ({ disputeId }) => {
  const headersList = await headers();
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
  const locale = await getLocale();

  const langDir = getLangDir(locale);

  return (
    <Card className="gradient-card shadow-elegant border-0">
      <CardHeader className="text-center pb-8 flex flex-col items-center">
        <h3
          className="text-2xl font-bold text-foreground mb-6 leading-tight"
          dir="auto"
        >
          {disputeDetails.question.trim() === ""
            ? disputeDetails.title
            : disputeDetails.question}
        </h3>
      </CardHeader>

      <CardContent>
        <div
          className={clsx(
            "grid md:auto-cols-fr md:grid-flow-col grid-cols-1 divide-x-2 divide-transparent gap-6 items-stretch place-content-center",
            langDir === "rtl" && "divide-x-reverse",
          )}
        >
          {(disputeId === "51"
            ? [
                {
                  id: "0x0",
                  title: "Si.",
                  description: "Si compensar al usuario.",
                },
                ...disputeDetails.answers.slice(1),
              ]
            : disputeDetails.answers.slice(1)
          ).map((answer) => (
            <div key={answer.title}>
              {isFinal && answerId === answer.id ? (
                <div
                  className={clsx(
                    "p-2 md:p-6 rounded-xl border-2 border-primary bg-primary/10 shadow-glow transition-smooth ",
                    "flex flex-col justify-between",
                  )}
                >
                  <div
                    className={clsx(
                      "flex md:flex-row md:items-center md:justify-between mb-3 gap-2",
                      "flex-col items-start justify-start",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-success" />
                      <h4 className="text-lg font-semibold" dir="auto">
                        {answer.title}
                      </h4>
                    </div>
                    <Badge
                      className="gradient-primary text-white shadow-elegant"
                      dir="auto"
                    >
                      <Gavel
                        className={clsx(
                          "size-3 mr-1",
                          langDir === "rtl" && "ml-1",
                        )}
                      />
                      {t("winner")}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground" dir="auto">
                    {answer.description}
                  </p>
                </div>
              ) : (
                <div
                  className={clsx(
                    "p-2 md:p-6 rounded-xl border-2 border-muted bg-muted/30 transition-smooth hover:bg-muted/50 ",
                    "flex flex-col md:justify-between",
                    "h-full justify-start",
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CircleDotDashed className="w-6 h-6 text-primary" />
                    <h4 className="text-lg font-semibold" dir="auto">
                      {answer.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground" dir="auto">
                    {answer.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Question;
