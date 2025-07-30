import { ApolloClient, gql } from '@apollo/client';

interface BeolOption {
  id: number;
  optionName: string;
  processplanId: number;
}

const GET_BEOL_OPTIONS_BY_PROCESSPLAN_ID = gql`
  query GetBeolOptionsByProcessplanId($processplanId: Int!) {
    beolOptionsByProcessplanId(processplanId: $processplanId) {
      id
      optionName
      processplanId
    }
  }
`;

const CREATE_BEOL_OPTION = gql`
  mutation CreateBeolOption($processplanId: Int!, $optionName: String!) {
    createBeolOption(createBeolOptionInput: { processplanId: $processplanId, optionName: $optionName }) {
      id
      optionName
      processplanId
    }
  }
`;

export class BeolOptionRepository {
  constructor(private client: ApolloClient<any>) {}

  async getBeolOptionsByProcessplanId(processplanId: number): Promise<BeolOption[]> {
    const { data } = await this.client.query({
      query: GET_BEOL_OPTIONS_BY_PROCESSPLAN_ID,
      variables: { processplanId },
    });
    return data.beolOptionsByProcessplanId;
  }

  async createBeolOption(processplanId: number, optionName: string): Promise<BeolOption> {
    const { data } = await this.client.mutate({
      mutation: CREATE_BEOL_OPTION,
      variables: { processplanId, optionName },
    });
    return data.createBeolOption;
  }
}
