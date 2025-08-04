import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT_METAS, CREATE_PRODUCT_META } from '../../domain/repositories/ProductMetaRepository';

export const useProductMetaService = (productId: number) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_METAS, {
    variables: { productId },
    skip: !productId,
  });

  const [createProductMeta] = useMutation(CREATE_PRODUCT_META);

  return {
    productMetas: data?.productMetas || [],
    loading,
    error,
    createProductMeta,
  };
};
