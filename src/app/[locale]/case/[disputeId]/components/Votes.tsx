"use client";
import React, { useState } from "react";

import { StatusResponseType } from "@/app/api/dispute/[id]/status/query";
import { type DisputeDetails } from "@/app/api/dispute/[id]/template/route";
import { type VotesResponseType } from "@/app/api/dispute/[id]/votes/query";
import {
  Periods,
  getRulingOptions,
  processCurrentPeriod,
  shortenAddress,
} from "@/app/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  HelpCircle,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface IVotes {
  disputeStatus: StatusResponseType["dispute"];
  templateData: DisputeDetails;
  voteData: VotesResponseType["dispute"];
}

type IJurorData = Record<
  string,
  {
    address: string;
    shortAddress: string;
    choice: string;
    weight: number;
    justification: string[];
  }
>;

const Votes: React.FC<IVotes> = ({ disputeStatus, templateData, voteData }) => {
  const t = useTranslations("case.justifications");

  const [expandedJustifications, setExpandedJustifications] = useState<
    Set<number>
  >(new Set());

  const isFinal =
    processCurrentPeriod(
      Periods[disputeStatus.period],
      parseInt(disputeStatus.currentRoundIndex),
    ) === 2;

  const answerId = `0x${parseInt(
    disputeStatus.disputeKitDispute[0].localRounds[0].winningChoice,
  ).toString(16)}`;

  const rulingOptions = getRulingOptions(templateData.answers);

  const jurors = voteData.rounds[0].drawnJurors.reduce(
    (acc: IJurorData, draw) => {
      const juror = draw.vote?.juror.id;
      if (acc[juror]) {
        acc[juror].weight = acc[juror].weight + 1;
      } else if (typeof juror !== "undefined") {
        acc[juror] = {
          address: juror,
          shortAddress: shortenAddress(juror),
          weight: 1,
          justification: draw.vote.justification.reference.split("\n"),
          choice: `0x${parseInt(draw.vote.choice).toString(16)}`,
        };
      }
      return acc;
    },
    {} as IJurorData,
  );

  const toggleJustification = (index: number) => {
    const newExpanded = new Set(expandedJustifications);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedJustifications(newExpanded);
  };

  const handleCopyAddress = (fullAddress: string) => {
    navigator.clipboard.writeText(fullAddress);
    toast.success(t("copy"));
  };

  return (
    <Card className="gradient-card shadow-elegant border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold" dir="auto">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          {Object.keys(jurors).map((key, index) => {
            const juror = jurors[key];
            const voteChoice = rulingOptions[juror.choice]?.title;
            return (
              <div
                key={key}
                className="p-4 rounded-xl border border-border bg-card/50 hover-lift"
              >
                <div
                  className={clsx(
                    "flex flex-col justify-start gap-4 items-start mb-2",
                    "md:flex-row md:items-center md:justify-between",
                  )}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      <span
                        className="text-sm text-muted-foreground"
                        dir="auto"
                      >
                        {t("juror")}
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-mono cursor-pointer hover:bg-secondary/80 flex items-center gap-1"
                        onClick={() => handleCopyAddress(juror.address)}
                      >
                        <span>{juror.shortAddress}</span>
                        <Copy className="size-3" />
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm text-muted-foreground"
                        dir="auto"
                      >
                        {t("voted")}
                      </span>
                      <Badge
                        variant={
                          isFinal && juror.choice !== answerId
                            ? "destructive"
                            : "secondary"
                        }
                        className={`shadow-card ${
                          isFinal && juror.choice === answerId
                            ? "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
                            : ""
                        }`}
                        dir="auto"
                      >
                        {isFinal && juror.choice !== answerId ? (
                          <XCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {voteChoice}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "flex items-center gap-3 flex-wrap max-md:w-full max-md:justify-between",
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="cursor-help">
                          {t("weight", { count: juror.weight })}
                          <HelpCircle className="w-3 h-3 ml-1 rtl:mr-1" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent
                        className="max-w-sm"
                        side="bottom"
                        sideOffset={1}
                      >
                        <p dir="auto">{t("tooltip")}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleJustification(index)}
                      className="text-sm hover-glow"
                      dir="auto"
                    >
                      {expandedJustifications.has(index) ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          {t("button.hide")}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          {t("button.open")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {expandedJustifications.has(index) && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <p
                      className="text-muted-foreground leading-relaxed text-sm"
                      dir="auto"
                    >
                      {juror.justification}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </TooltipProvider>
        {Object.keys(jurors).length === 0 ? (
          <p className="w-full text-center text-secondary-text">
            No votes casted yet
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Votes;
