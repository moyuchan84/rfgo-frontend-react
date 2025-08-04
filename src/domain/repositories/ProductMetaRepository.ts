import { gql } from '@apollo/client';

export const GET_PRODUCT_METAS = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      productMeta {
        id
        metaKey
        metaValue
      }
    }
  }
`;

export const CREATE_PRODUCT_META = gql`
  mutation CreateProductMeta($createProductMetaInput: CreateProductMetaInput!) {
    createProductMeta(createProductMetaInput: $createProductMetaInput) {
      id
      metaKey
      metaValue
    }
  }
`;
