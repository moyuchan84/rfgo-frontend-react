import { gql, ApolloClient, type NormalizedCacheObject } from '@apollo/client';

export const CREATE_BEOL_OPTION = gql`
  mutation createBeolOption($createBeolOptionInput: CreateBeolOptionInput!) {
    createBeolOption(createBeolOptionInput: $createBeolOptionInput) {
      id
    }
  }
`;

export const GET_BEOL_OPTIONS = gql`
  query beolOptions {
    beolOptions {
      id
      optionName
      processplanId
    }
  }
`;

export const GET_BEOL_OPTION = gql`
  query beolOption($id: Int!) {
    beolOption(id: $id) {
      id
      optionName
      processplanId
    }
  }
`;

export const GET_BEOL_OPTIONS_BY_PROCESSPLAN_ID = gql`
  query beolOptionsByProcessplanId($processplanId: Int!) {
    beolOptionsByProcessplanId(processplanId: $processplanId) {
      id
      optionName
      processplanId
    }
  }
`;

export const UPDATE_BEOL_OPTION = gql`
  mutation updateBeolOption($updateBeolOptionInput: UpdateBeolOptionInput!) {
    updateBeolOption(updateBeolOptionInput: $updateBeolOptionInput) {
      id
    }
  }
`;

export const REMOVE_BEOL_OPTION = gql`
  mutation removeBeolOption($id: Int!) {
    removeBeolOption(id: $id) {
      id
    }
  }
`;

export class BeolOptionRepository {
  private client: ApolloClient<object>;

  constructor(client: ApolloClient<object>) {
    this.client = client;
  }

  async createBeolOption(createBeolOptionInput: any) {
    const { data } = await this.client.mutate({
      mutation: CREATE_BEOL_OPTION,
      variables: { createBeolOptionInput },
    });
    return data.createBeolOption;
  }

  async getBeolOptions() {
    const { data } = await this.client.query({
      query: GET_BEOL_OPTIONS,
    });
    return data.beolOptions;
  }

  async getBeolOption(id: number) {
    const { data } = await this.client.query({
      query: GET_BEOL_OPTION,
      variables: { id },
    });
    return data.beolOption;
  }

  async getBeolOptionsByProcessplanId(processplanId: number) {
    const { data } = await this.client.query({
      query: GET_BEOL_OPTIONS_BY_PROCESSPLAN_ID,
      variables: { processplanId },
    });
    return data.beolOptionsByProcessplanId;
  }

  async updateBeolOption(updateBeolOptionInput: any) {
    const { data } = await this.client.mutate({
      mutation: UPDATE_BEOL_OPTION,
      variables: { updateBeolOptionInput },
    });
    return data.updateBeolOption;
  }

  async removeBeolOption(id: number) {
    const { data } = await this.client.mutate({
      mutation: REMOVE_BEOL_OPTION,
      variables: { id },
    });
    return data.removeBeolOption;
  }
}
