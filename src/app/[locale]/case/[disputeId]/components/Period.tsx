import React, { Fragment } from "react";

import clsx from "clsx";

const periods = ["Evidence", "Voting", "Executed"];

interface IPeriod {
  current: number;
}

const Period: React.FC<IPeriod> = ({ current }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-primary-text text-lg text-center">
        PERIOD
      </h3>
      <ul className="w-full md:max-w-[80%] mt-4 flex items-center">
        {periods.map((period, i) => (
          <Fragment key={period}>
            <li className="m-0.5 md:m-1 flex items-center">
              <div
                className={clsx(
                  "bg-white-background centered font-semibold",
                  "rounded-full text-base md:text-md px-2",
                  "whitespace-nowrap",
                  {
                    "text-secondary-text": current !== i,
                    "text-primary-blue": current === i,
                  }
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
