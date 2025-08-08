import { gql } from '@apollo/client';

export const GET_PRODUCT_METAS = gql`
  query GetProduct($productId: Int!) {
    productMetaByProductId(productId: $productId) {
      customer
      id
      mtoDate
      processId
      productId
      updateTime
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
