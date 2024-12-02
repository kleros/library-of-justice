import { gql } from "@urql/core";

import { getClient } from "@/app/api/utils";

export type VotesResponseType = {
  dispute: {
    rounds: Array<{
      nbVotes: `${number}`;
      isCurrentRound: boolean;
      penalties: `${number}`;
      jurorsDrawn: boolean;
      drawnJurors: Array<{
        vote: {
          juror: {
            id: string;
          };
          voted: boolean;
          choice: `${number}`;
          commited: boolean;
          commit: string;
          justification: {
            reference: string;
          };
        };
      }>;
      court: {
        id: string;
      };
      feeToken: {
        id: string;
      };
    }>;
  };
};

const query = gql`
  query DisputeDetails($id: ID!) {
    dispute(id: $id) {
      rounds {
        id
        nbVotes
        isCurrentRound
        penalties
        jurorsDrawn
        drawnJurors {
          vote {
            juror {
              id
            }
            ...on ClassicVote {
              choice
              voted
              commited
              commit
              justification {
                reference
              }
            }
          }
        }
        court {
          id
        }
        feeToken {
          id
        }
      }
    }
  }
`;

export const fetchVotes = async (disputeId: bigint) => {
  const variables = { id: disputeId.toString() };
  const client = getClient(process.env.CORE_SUBGRAPH!);

  return await client
    .query<VotesResponseType>(query, variables)
    .toPromise()
    .then((res) => {
      if (res.error) throw res.error;
      return res.data?.dispute;
    });
};
