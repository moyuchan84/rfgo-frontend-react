import React from 'react';
import ProcessplanSelector from '../ProcessplanSelector';
import BeolOptionSelector from '../BeolOptionSelector';
import ProductSelector from '../ProductSelector';
import { useRequestStore } from '../../../application/store/requestStore';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

const ProductInfoSelector: React.FC = () => {
  const {
    selectedProcessplanId,
    selectedBeolOptionId,
    setProcessplanId,
    setBeolOptionId,
    setProductId,
  } = useRequestStore();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start">
        <Text fontWeight="bold">제품정보</Text>
        <HStack gap={4}>
          <ProcessplanSelector onSelect={setProcessplanId} />
          {selectedProcessplanId && (
            <BeolOptionSelector processplanId={selectedProcessplanId} onSelect={setBeolOptionId} />
          )}
          {selectedBeolOptionId && selectedProcessplanId && (
            <ProductSelector
              beolOptionId={selectedBeolOptionId}
              processplanId={selectedProcessplanId}
              onSelect={setProductId}
            />
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductInfoSelector;
