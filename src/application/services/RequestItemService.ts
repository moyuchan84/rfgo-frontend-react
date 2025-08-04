import { useMutation } from '@apollo/client';
import { CREATE_REQUEST_ITEM } from '../../domain/repositories/RequestItemRepository';

export const useRequestItemService = () => {
  const [createRequestItem, { data, loading, error }] = useMutation(CREATE_REQUEST_ITEM);

  return {
    createRequestItem,
    createdRequestItem: data?.createRequestItem,
    loading,
    error,
  };
};
