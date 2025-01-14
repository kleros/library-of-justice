import React, { Fragment, useMemo } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import clsx from "clsx";

import { processCurrentPeriod } from "@/app/utils";

interface IPeriod {
  currentPeriod: number;
  currentRound: number;
}

const Period: React.FC<IPeriod> = async ({ currentPeriod, currentRound }) => {
  const processedCurrent = useMemo(
    () => processCurrentPeriod(currentPeriod, currentRound),
    [currentPeriod, currentRound],
  );

  const t = await getTranslations("case.period");
  const locale = await getLocale();

  const periods = [t("evidence"), t("voting"), t("executed")];

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-primary-text text-lg text-center">{t("title")}</h3>
      <ul className="w-full md:max-w-[80%] mt-6 flex items-center">
        {periods.map((period, i) => (
          <Fragment key={period}>
            <li className="m-0.5 md:m-1 flex items-center">
              <div
                className={clsx(
                  "bg-white-background centered font-semibold",
                  "rounded-full text-base md:text-md px-2",
                  "whitespace-nowrap",
                  {
                    "text-secondary-text": processedCurrent !== i,
                    "text-primary-blue": processedCurrent === i,
                  },
                )}
              >
                {`${i + 1}. ${period}`}
              </div>
            </li>
            {i !== periods.length - 1 && (
              <div className={clsx("h-0.5 w-full bg-stroke")} />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Period;
