import { DisputeDetails } from "@/app/api/dispute/[id]/template/route";

export enum Periods {
  evidence,
  commit,
  vote,
  appeal,
  execution,
}

export const spamEvidenceId = new Set([
  "0-2",
  "0-3",
  "0-4",
  "1-2",
  "1-3",
  "2-2",
]);

const trimChar = (a: string, b: string): string => {
  if (a.charAt(0) === b) {
    return trimChar(a.slice(1), b);
  }
  return a;
};

export const ipfsUrl = (path: string): string =>
  `https://cdn.kleros.link/${trimChar(path, "/")}`;

export const shortenAddress = (address: string, chars = 4) => {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars,
  )}`;
};

type IRulingOptions = Record<string, DisputeDetails["answers"][number]>;

export const getRulingOptions = (
  answers: DisputeDetails["answers"],
): IRulingOptions =>
  answers.reduce(
    (acc: IRulingOptions, answer) => {
      const answerId = answer.id;
      if (answerId) acc[answerId] = answer;
      return acc;
    },
    { "0x0": { title: "Refuse", description: "Refuse to arbitrate" } },
  );

export const processCurrentPeriod = (
  currentPeriod: number,
  currentRound: number,
) => {
  if (currentRound > 0) return 2;
  if (currentPeriod === 0) return 0;
  if (currentPeriod < 3) return 1;
  return 2;
};
