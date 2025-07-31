import { gql, ApolloClient, type NormalizedCacheObject } from '@apollo/client';

export const CREATE_PROCESSPLAN = gql`
  mutation createProcessplan($createProcessplanInput: CreateProcessplanInput!) {
    createProcessplan(createProcessplanInput: $createProcessplanInput) {
      id
    }
  }
`;

export const GET_PROCESSPLANS = gql`
  query processplans {
    processplans {
      id
      designRule
    }
  }
`;

export const GET_PROCESSPLAN = gql`
  query processplan($id: Int!) {
    processplan(id: $id) {
      id
      designRule
    }
  }
`;

export const UPDATE_PROCESSPLAN = gql`
  mutation updateProcessplan($updateProcessplanInput: UpdateProcessplanInput!) {
    updateProcessplan(updateProcessplanInput: $updateProcessplanInput) {
      id
    }
  }
`;

export const REMOVE_PROCESSPLAN = gql`
  mutation removeProcessplan($id: Int!) {
    removeProcessplan(id: $id) {
      id
    }
  }
`;

export class ProcessplanRepository {
  private client: ApolloClient<object>;

  constructor(client: ApolloClient<object>) {
    this.client = client;
  }

  async createProcessplan(createProcessplanInput: any) {
    const { data } = await this.client.mutate({
      mutation: CREATE_PROCESSPLAN,
      variables: { createProcessplanInput },
    });
    return data.createProcessplan;
  }

  async getProcessplans() {
    try {
      const { data } = await this.client.query({
        query: GET_PROCESSPLANS,
      });
      return data.processplans;
    } catch (ex) {
      console.log(ex);
    }
  }

  async getProcessplan(id: number) {
    const { data } = await this.client.query({
      query: GET_PROCESSPLAN,
      variables: { id },
    });
    return data.processplan;
  }

  async updateProcessplan(updateProcessplanInput: any) {
    const { data } = await this.client.mutate({
      mutation: UPDATE_PROCESSPLAN,
      variables: { updateProcessplanInput },
    });
    return data.updateProcessplan;
  }

  async removeProcessplan(id: number) {
    const { data } = await this.client.mutate({
      mutation: REMOVE_PROCESSPLAN,
      variables: { id },
    });
    return data.removeProcessplan;
  }
}
