import { ApolloClient, gql } from '@apollo/client';

interface Processplan {
  id: number;
  designRule: string;
}

const GET_PROCESSPLANS = gql`
  query GetProcessplans {
    processplans {
      id
      designRule
    }
  }
`;

const CREATE_PROCESSPLAN = gql`
  mutation CreateProcessplan($designRule: String!) {
    createProcessplan(createProcessplanInput: { designRule: $designRule }) {
      id
      designRule
    }
  }
`;

export class ProcessplanRepository {
  constructor(private client: ApolloClient<any>) {}

  async getProcessplans(): Promise<Processplan[]> {
    const { data } = await this.client.query({
      query: GET_PROCESSPLANS,
    });
    return data.processplans;
  }

  async createProcessplan(designRule: string): Promise<Processplan> {
    const { data } = await this.client.mutate({
      mutation: CREATE_PROCESSPLAN,
      variables: { designRule },
    });
    return data.createProcessplan;
  }
}
