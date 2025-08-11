
import { gql } from '@apollo/client';

export const GET_REQUEST_ITEMS_BY_UPDATE_TIME_RANGE = gql`
  query requestItemsByUpdateTimeRange($fromTime: DateTime!, $endTime: DateTime!) {
    requestItemsByUpdateTimeRange(fromTime: $fromTime, endTime: $endTime) {
      id
      title
      description
      requesterName
      updateTime
      product {
        id
        name
        processplan {
          id
          name
        }
        beolOption {
          id
          name
        }
      }
    }
  }
`;
