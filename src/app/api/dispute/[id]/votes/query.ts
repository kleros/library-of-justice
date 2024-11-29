import { gql } from "@urql/core";

import { getClient } from "@/app/api/utils";

type VotesResponseType = {
  dispute: {
    rounds: Array<{
      nbVotes: `${number}`;
      isCurrentRound: boolean;
      penalties: `${number}`;
      jurorsDrawn: boolean;
      drawnJurors: {
        juror: {
          id: string;
          votes: Array<{
            choice: `${number}`;
            voted: boolean;
            justification: {
              reference: string;
            };
          }>;
        };
      };
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
        nbVotes
        isCurrentRound
        penalties
        jurorsDrawn
        drawnJurors {
          juror {
            id
            votes {
              ...on ClassicVote{
                choice
                voted
                justification {
                  reference
                }
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
