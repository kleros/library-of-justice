import React from "react";

import clsx from "clsx";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { getLangDir } from "rtl-detect";

import { DisputeDetails } from "@/app/api/dispute/[id]/template/route";
import { type VotesResponseType } from "@/app/api/dispute/[id]/votes/query";
import { getRulingOptions, shortenAddress } from "@/app/utils";

interface IVotes {
  disputeId: `${number}`;
}

type IJurorData = Record<
  string,
  {
    shortAddress: string;
    choice: string;
    weight: number;
    justification: string[];
  }
>;

const Votes: React.FC<IVotes> = async ({ disputeId }) => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");

  const voteData: VotesResponseType["dispute"] = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/votes`,
  ).then((result) => result.json());
  const templateData: DisputeDetails = await fetch(
    `${protocol}://${host}/api/dispute/${disputeId}/template`,
  ).then((result) => result.json());

  const rulingOptions = getRulingOptions(templateData.answers);

  const jurors = voteData.rounds[0].drawnJurors.reduce(
    (acc: IJurorData, draw) => {
      const juror = draw.vote?.juror.id;
      if (acc[juror]) {
        acc[juror].weight = acc[juror].weight + 1;
      } else if (typeof juror !== "undefined") {
        acc[juror] = {
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

  const t = await getTranslations("case.justifications");
  const locale = await getLocale();
  const langDir = getLangDir(locale);

  return (
    <div>
      <span className="text-xs md:text-base text-secondary-text text-center block">
        {t("different", { count: Object.keys(jurors).length })}
      </span>
      <h3 className="mt-2 mb-6 text-primary-text text-lg text-center">
        {t("title")}
      </h3>
      <div className="space-y-8">
        {Object.keys(jurors).map((key) => {
          const juror = jurors[key];
          const voteChoice = rulingOptions[juror.choice]?.title;
          return (
            <div
              key={juror.shortAddress}
              className={clsx("px-2 space-y-1", {
                "border-l-stroke border-l-2": langDir === "ltr",
                "border-r-stroke border-r-2": langDir === "rtl",
              })}
            >
              <strong
                className={
                  "block text-primary-text text-base md:text-md font-semibold"
                }
              >
                {juror.shortAddress}
              </strong>
              {voteChoice ? (
                <span
                  className={
                    "text-xs md:text-base text-primary-text font-semibold block"
                  }
                >
                  {`${t("voted")} `}
                  <span dir="auto">{voteChoice}</span>
                </span>
              ) : null}
              <span className="text-xs md:text-base text-secondary-text font-semibold block">
                {t("weight", { count: juror.weight })}
              </span>
              {juror.justification.map((justificationParagraph, i) => (
                <p key={i} dir="auto">
                  {justificationParagraph}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Votes;
