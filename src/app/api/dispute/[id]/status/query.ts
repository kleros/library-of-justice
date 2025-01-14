import { gql } from "@urql/core";

import { getClient } from "@/app/api/utils";
import { Periods } from "@/app/utils";

export type StatusResponseType = {
  dispute: {
    court: {
      id: string;
    };
    createdAt: `${number}`;
    arbitrated: {
      id: string;
    };
    currentRoundIndex: `${number}`;
    period: keyof typeof Periods;
    ruled: boolean;
    currentRuling: `${number}`;
    tied: boolean;
    overridden: boolean;
    periodDeadline: `${number}`;
    lastPeriodChange: `${number}`;
    externalDisputeId: string;
    disputeKitDispute: Array<{
      localRounds: Array<{
        id: string;
        winningChoice: `${number}`;
      }>;
    }>;
  };
};

const query = gql`
  query DisputeDetails($id: ID!) {
    dispute(id: $id) {
      court {
        id
      }
      createdAt
      arbitrated {
        id
      }
      currentRoundIndex
      period
      ruled
      currentRuling
      tied
      overridden
      periodDeadline
      lastPeriodChange
      externalDisputeId
      disputeKitDispute {
        localRounds {
          id
          ... on ClassicRound {
            winningChoice
          }
        }
      }
    }
  }
`;

export const fetchStatus = async (disputeId: bigint) => {
  const variables = { id: disputeId.toString() };
  const client = getClient(process.env.CORE_SUBGRAPH!);

  return await client
    .query<StatusResponseType>(query, variables)
    .toPromise()
    .then((res) => {
      if (res.error) throw res.error;
      return res.data?.dispute;
    });
};
