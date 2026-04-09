import React, { Fragment, useMemo } from "react";

import { getTranslations } from "next-intl/server";

import clsx from "clsx";

import {
  formatTimestamp,
  getDurationBetween,
  processCurrentPeriod,
} from "@/app/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, Clock, FileText, Users } from "lucide-react";

interface IPeriod {
  currentPeriod: number;
  currentRound: number;
  startTime: `${number}`;
  rulingTime: `${number}` | null;
}

const Period: React.FC<IPeriod> = async ({
  currentPeriod,
  currentRound,
  startTime,
  rulingTime,
}) => {
  const processedCurrent = useMemo(
    () => processCurrentPeriod(currentPeriod, currentRound),
    [currentPeriod, currentRound],
  );
  const duration = useMemo(
    () =>
      rulingTime
        ? getDurationBetween(parseInt(startTime), parseInt(rulingTime))
        : undefined,
    [startTime, rulingTime],
  );

  const t = await getTranslations("case.period");

  const periods = [
    {
      title: t("presentation.title"),
      tooltip: t("presentation.tooltip"),
      Icon: FileText,
    },
    {
      title: t("vote.title"),
      tooltip: t("vote.tooltip"),
      Icon: Users,
    },
    {
      title: t("resolved.title"),
      tooltip: t("resolved.tooltip"),
      Icon: CheckCircle,
    },
  ];

  return (
    <Card className="gradient-card shadow-elegant border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold" dir="auto">
          {t("title")}
        </CardTitle>
        <div className="mt-4 space-y-2">
          <div
            className={clsx(
              "flex text-sm text-muted-foreground",
              "justify-center items-center max-md:space-y-4 md:space-x-4 flex-col md:flex-row",
            )}
          >
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span dir="auto">
                {t("time.start", {
                  time: formatTimestamp(parseInt(startTime)),
                })}
              </span>
            </div>
            {rulingTime ? (
              <Fragment>
                <div className="max-md:hidden md:w-px md:h-4 bg-border"></div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span dir="auto">
                    {t("time.resolved", {
                      time: formatTimestamp(parseInt(rulingTime)),
                    })}
                  </span>
                </div>
              </Fragment>
            ) : null}
          </div>
          {duration ? (
            <div className="text-center" dir="auto">
              <Badge variant="secondary" className="text-xs" dir="auto">
                {t("time.duration", {
                  day: duration.days,
                  hour: duration.hours ?? 0,
                })}
              </Badge>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <TooltipProvider>
          <div className="flex justify-center">
            <div
              className={clsx(
                "flex items-center flex-col  md:space-x-8 max-md:space-y-8",
                "md:items-center md:flex-row",
              )}
            >
              {periods.map(({ title, tooltip, Icon }, i) => (
                <Fragment key={title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center cursor-help">
                        <div
                          className={clsx(
                            "size-12 rounded-full  flex items-center justify-center mb-2",
                            processedCurrent === i
                              ? "animate-glow-pulse bg-primary"
                              : "bg-muted",
                          )}
                        >
                          <Icon
                            className={clsx(
                              "size-6 ",
                              processedCurrent === i
                                ? "text-white"
                                : "text-muted-foreground",
                            )}
                          />
                        </div>
                        <span
                          className={clsx(
                            "text-sm",
                            processedCurrent === i
                              ? "text- font-semibold"
                              : "text-muted-foreground",
                          )}
                          dir="auto"
                        >
                          {i + 1}. {title}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p dir="auto">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                  {i !== periods.length - 1 && (
                    <div className="w-px h-16 md:w-16 md:h-px bg-muted"></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default Period;
