import React from 'react';
import { Button } from 'devextreme-react';
import { useRequestStore } from '../../application/store/requestStore';
import { useRequestItemService } from '../../application/services/RequestItemService';
import JobTypeSelector from '../components/request/JobTypeSelector';
import ProductInfoSelector from '../components/request/ProductInfoSelector';
import MetaInfoDisplay from '../components/request/MetaInfoDisplay';
import RequestDetails from '../components/request/RequestDetails';
import EdmUrlManager from '../components/request/EdmUrlManager';
import { Box, HStack, VStack } from '@chakra-ui/react';

const Request: React.FC = () => {
  const { requestType, title, content, edmUrls, selectedProductId } = useRequestStore();
  const { createRequestItem, loading: createLoading } = useRequestItemService();

  const handleSubmit = () => {
    createRequestItem({
      variables: {
        createRequestItemInput: {
          title,
          content,
          edmUrls,
          productId: selectedProductId,
        },
      },
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={5} align="stretch">
        <HStack justifyContent="flex-end">
          <Button text="의뢰" type="default" disabled={createLoading} onClick={handleSubmit} />
          <Button text="취소" type="danger" />
        </HStack>
        <JobTypeSelector />
        {requestType === 'REVISION' && <ProductInfoSelector />}
        <MetaInfoDisplay isEditable={requestType === 'NEW'} />
        <RequestDetails />
        <EdmUrlManager />
      </VStack>
    </Box>
  );
};

export default Request;