import { gql } from "@urql/core";

import { getClient } from "@/app/api/utils";

type StatusResponseType = {
  evidenceGroup: {
    evidences: Array<{
      evidence: string;
      sender: {
        id: string;
      };
      timestamp: `${number}`;
      fileURI: string;
      fileTypeExtension: string;
      name: string;
      description: string;
      evidenceIndex: `${number}`;
    }>;
  };
};

const query = gql`
  query Evidences($id: ID!) {
    evidenceGroup(id: $id) {
      evidences {
        ...on ClassicEvidence {
          evidence
          sender {
            id
          }
          timestamp
          fileURI
          fileTypeExtension
          name
          description
          evidenceIndex
        }
      }
    }
  }
`;

export const fetchEvidences = async (evidenceGroupId: bigint) => {
  const variables = { id: evidenceGroupId.toString() };
  const client = getClient(process.env.CORE_SUBGRAPH!);

  return await client
    .query<StatusResponseType>(query, variables)
    .toPromise()
    .then((res) => {
      if (res.error) throw res.error;
      return res.data?.evidenceGroup;
    });
};
