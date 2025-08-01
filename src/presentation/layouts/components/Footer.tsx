import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      padding="1.5rem"
      bg="gray.800" // Header와 동일한 배경색
      color="white"   // 기본 텍스트 색상
    >
      <Text>&copy; {new Date().getFullYear()} RFGo. All Rights Reserved.</Text>
    </Flex>
  );
};

export default Footer;