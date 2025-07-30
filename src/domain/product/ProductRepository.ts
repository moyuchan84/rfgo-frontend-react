import { ApolloClient, gql } from '@apollo/client';

interface Product {
  id: number;
  beolOptionId: number;
  processplanId: number;
  partId: string;
  productName: string;
}

const GET_PRODUCTS_BY_BEOL_OPTION_ID = gql`
  query GetProductsByBeolOptionId($beolOptionId: Int!) {
    productsByBeolOptionId(beolOptionId: $beolOptionId) {
      id
      productName
      beolOptionId
      processplanId
      partId
    }
  }
`;

const GET_PRODUCTS_BY_PROCESSPLAN_ID = gql`
  query GetProductsByProcessplanId($processplanId: Int!) {
    productsByProcessplanId(processplanId: $processplanId) {
      id
      productName
      beolOptionId
      processplanId
      partId
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $beolOptionId: Int!
    $processplanId: Int!
    $productName: String!
    $partId: String!
  ) {
    createProduct(
      createProductInput: {
        beolOptionId: $beolOptionId
        processplanId: $processplanId
        productName: $productName
        partId: $partId
      }
    ) {
      id
      productName
      beolOptionId
      processplanId
      partId
    }
  }
`;

export class ProductRepository {
  constructor(private client: ApolloClient<any>) {}

  async getProductsByBeolOptionId(beolOptionId: number): Promise<Product[]> {
    const { data } = await this.client.query({
      query: GET_PRODUCTS_BY_BEOL_OPTION_ID,
      variables: { beolOptionId },
    });
    return data.productsByBeolOptionId;
  }

  async getProductsByProcessplanId(processplanId: number): Promise<Product[]> {
    const { data } = await this.client.query({
      query: GET_PRODUCTS_BY_PROCESSPLAN_ID,
      variables: { processplanId },
    });
    return data.productsByProcessplanId;
  }

  async createProduct(
    beolOptionId: number,
    processplanId: number,
    productName: string,
    partId: string,
  ): Promise<Product> {
    const { data } = await this.client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { beolOptionId, processplanId, productName, partId },
    });
    return data.createProduct;
  }
}
