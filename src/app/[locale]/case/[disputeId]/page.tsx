import React from "react";

import { Separator } from "@/components/ui/separator";

import Period from "./components/Period";

interface ICaseDetails {
  params: { disputeId: `${number}` };
}

const CaseDetails: React.FC<ICaseDetails> = ({ params: { disputeId } }) => {
  return (
    <div className="flex flex-col items-center my-32 px-0 md:px-10">
      <h2 className="text-primary-text text-xl font-bold">
        {"CASE "}
        <span className="inline text-primary-blue">#{disputeId}</span>
      </h2>
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <Period current={1} />
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <h3 className="text-primary-text text-lg">Question</h3>
      <Separator className="bg-primary-purple w-3/4 my-8" />
      <h3 className="text-primary-text text-lg">Evidence</h3>
    </div>
  );
};

export default CaseDetails;
