import { ApolloClient, gql } from '@apollo/client';

export class ProductKeyTableRepository {
  constructor(private client: ApolloClient<object>) {}

  async getProductKeyTablesByProductId(productId: number): Promise<any[]> {
    const { data } = await this.client.query({
      query: gql`
        query ProductKeyTablesByProductId($productId: Int!) {
          productKeyTablesByProductId(productId: $productId) {
            keyTableJson
            keyTableName
            id
          }
        }
      `,
      variables: { productId },
      fetchPolicy: 'network-only',
    });
    return data.productKeyTablesByProductId;
  }
}
