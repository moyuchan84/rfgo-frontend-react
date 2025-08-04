import React from 'react';
import { TextBox } from 'devextreme-react';
import HtmlEditor from 'devextreme-react/html-editor';
import { useRequestStore } from '../../../application/store/requestStore';
import { Box, Text, VStack } from '@chakra-ui/react';

const RequestDetails: React.FC = () => {
  const { title, content, setTitle, setContent } = useRequestStore();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start" gap={4}>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">의뢰제목</Text>
          <TextBox value={title} onValueChanged={(e) => setTitle(e.value)} width="100%" />
        </VStack>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">의뢰내용</Text>
          <HtmlEditor value={content} onValueChanged={(e) => setContent(e.value)} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default RequestDetails;
