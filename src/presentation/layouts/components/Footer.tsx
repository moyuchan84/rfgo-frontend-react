import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" py={4} px={8} bg="blue.800" color="white">
      <Text>&copy; {new Date().getFullYear()} RFGo. All Rights Reserved.</Text>
    </Box>
  );
};

export default Footer;
