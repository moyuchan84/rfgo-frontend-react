import { gql } from '@apollo/client';

export const CREATE_REQUEST_ITEM = gql`
  mutation CreateRequestItem($createRequestItemInput: CreateRequestItemInput!) {
    createRequestItem(createRequestItemInput: $createRequestItemInput) {
      id
      title
      content
      edmUrls
    }
  }
`;
