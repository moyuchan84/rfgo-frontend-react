import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.75rem"
      bg="blue.800"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          <Link as={RouterLink} to="/">
            RFGo
          </Link>
        </Heading>
      </Flex>

      <Box
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <Link as={RouterLink} to="/" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/request" mr={4}>
          Request
        </Link>
        <Link as={RouterLink} to="/keytable">
          KeyTable
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
