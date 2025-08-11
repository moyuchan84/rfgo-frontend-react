import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { TextBox } from 'devextreme-react/text-box';
import RequestItemDataGrid from '../components/RequestItemDataGrid';

const Home: React.FC = () => {
  return (
    <VStack gap={8} justify="center" align="center" height="75vh">
      <Heading as="h1" size="2xl" mb={4}>
        RFGo
      </Heading>
      <TextBox
        placeholder="Google 검색 또는 URL 입력"
        width="584px"
        height="46px"
        stylingMode="outlined"
        elementAttr={{ class: 'rounded-textbox' }}
      />
      <RequestItemDataGrid />
    </VStack>
  );
};

export default Home;
