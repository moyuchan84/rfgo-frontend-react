import { gql, ApolloClient, type NormalizedCacheObject } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`;

export const GET_PRODUCTS = gql`
  query products {
    products {
      id
      partId
      productName
      processplanId
      beolOptionId
    }
  }
`;

export const GET_PRODUCT = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      partId
      productName
      processplanId
      beolOptionId
    }
  }
`;

export const GET_PRODUCTS_BY_PROCESSPLAN_ID = gql`
  query productsByProcessplanId($processplanId: Int!) {
    productsByProcessplanId(processplanId: $processplanId) {
      id
      partId
      productName
      processplanId
      beolOptionId
    }
  }
`;

export const GET_PRODUCTS_BY_BEOL_OPTION_ID = gql`
  query productsByBeolOptionId($beolOptionId: Int!) {
    productsByBeolOptionId(beolOptionId: $beolOptionId) {
      id
      partId
      productName
      processplanId
      beolOptionId
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

export class ProductRepository {
  private client: ApolloClient<object>;

  constructor(client: ApolloClient<object>) {
    this.client = client;
  }

  async createProduct(createProductInput: any) {
    const { data } = await this.client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { createProductInput },
    });
    return data.createProduct;
  }

  async getProducts() {
    const { data } = await this.client.query({
      query: GET_PRODUCTS,
    });
    return data.products;
  }

  async getProduct(id: number) {
    const { data } = await this.client.query({
      query: GET_PRODUCT,
      variables: { id },
    });
    return data.product;
  }

  async getProductsByProcessplanId(processplanId: number) {
    const { data } = await this.client.query({
      query: GET_PRODUCTS_BY_PROCESSPLAN_ID,
      variables: { processplanId },
    });
    return data.productsByProcessplanId;
  }

  async getProductsByBeolOptionId(beolOptionId: number) {
    const { data } = await this.client.query({
      query: GET_PRODUCTS_BY_BEOL_OPTION_ID,
      variables: { beolOptionId },
    });
    return data.productsByBeolOptionId;
  }

  async updateProduct(updateProductInput: any) {
    const { data } = await this.client.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { updateProductInput },
    });
    return data.updateProduct;
  }

  async removeProduct(id: number) {
    const { data } = await this.client.mutate({
      mutation: REMOVE_PRODUCT,
      variables: { id },
    });
    return data.removeProduct;
  }
}
