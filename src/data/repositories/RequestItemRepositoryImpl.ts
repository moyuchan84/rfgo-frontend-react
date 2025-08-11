import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_REQUEST_ITEMS_BY_UPDATE_TIME_RANGE } from '../graphql/queries';
import type { RequestItemRepository } from '../../domain/repositories/RequestItemRepository';
import type { RequestItem } from '../../domain/entities/RequestItem';

// This is a placeholder for the actual Apollo Client instance.
// In a real application, you would import this from a shared module.
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export class RequestItemRepositoryImpl implements RequestItemRepository {
  async getRequestItemsByUpdateTimeRange(fromTime: Date, endTime: Date): Promise<RequestItem[]> {
    const { data } = await apolloClient.query({
      query: GET_REQUEST_ITEMS_BY_UPDATE_TIME_RANGE,
      variables: { fromTime, endTime },
    });
    return data.requestItemsByUpdateTimeRange;
  }
}
