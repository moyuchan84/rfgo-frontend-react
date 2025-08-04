import React, { useEffect } from 'react';
import { TextBox } from 'devextreme-react';
import { useRequestStore } from '../../../application/store/requestStore';
import { useProductMetaService } from '../../../application/services/ProductMetaService';
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { isEqual } from 'lodash';

const MetaInfoDisplay: React.FC = () => {
  const { selectedProductId, productMetas, setProductMetas } = useRequestStore();
  const { productMetas: fetchedMetas, loading: metasLoading } = useProductMetaService(
    selectedProductId || 0,
  );

  useEffect(() => {
    if (fetchedMetas && !isEqual(fetchedMetas, productMetas)) {
      setProductMetas(fetchedMetas);
    }
  }, [fetchedMetas, productMetas, setProductMetas]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start">
        <Text fontWeight="bold">메타정보</Text>
        {metasLoading ? (
          <Text>Loading...</Text>
        ) : (
          <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4}>
            {productMetas && productMetas.map((meta, index) => (
              <Box key={index}>
                <Text>{meta.metaKey}</Text>
                <TextBox value={meta.metaValue} readOnly />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default MetaInfoDisplay;