import React, { useState } from 'react';
import { Button, TextBox, List } from 'devextreme-react';
import { useRequestStore } from '../../../application/store/requestStore';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

const EdmUrlManager: React.FC = () => {
  const { edmUrls, addEdmUrl, removeEdmUrl } = useRequestStore();
  const [newEdmUrl, setNewEdmUrl] = useState('');

  const handleAddEdmUrl = () => {
    if (newEdmUrl.trim() !== '') {
      addEdmUrl(newEdmUrl);
      setNewEdmUrl('');
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start" spacing={4}>
        <Text fontWeight="bold">EDM URLS</Text>
        <HStack w="100%">
          <TextBox
            value={newEdmUrl}
            onValueChanged={(e) => setNewEdmUrl(e.value)}
            placeholder="Enter EDM URL"
            width="100%"
          />
          <Button text="추가" onClick={handleAddEdmUrl} />
        </HStack>
        <List
          dataSource={edmUrls}
          height={200}
          itemRender={(item) => <div>{item}</div>}
          onItemDeleted={(e) => removeEdmUrl(e.itemData)}
          allowItemDeleting={true}
        />
      </VStack>
    </Box>
  );
};

export default EdmUrlManager;