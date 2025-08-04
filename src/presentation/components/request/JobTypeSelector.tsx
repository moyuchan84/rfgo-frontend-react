import React from 'react';
import { RadioGroup } from 'devextreme-react';
import { useRequestStore } from '../../../application/store/requestStore';
import { Box, HStack, Text } from '@chakra-ui/react';

const enum RequestType {
  New = 'NEW',
  Revision = 'REVISION',
}

const requestTypes = [RequestType.New, RequestType.Revision];

const JobTypeSelector: React.FC = () => {
  const { requestType, setRequestType } = useRequestStore();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <HStack>
        <Text fontWeight="bold">작업구분</Text>
        <RadioGroup
          items={requestTypes}
          value={requestType}
          layout="horizontal"
          onValueChanged={(e) => setRequestType(e.value)}
        />
      </HStack>
    </Box>
  );
};

export default JobTypeSelector;