import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Avatar, Box, Flex, HStack, Spacer, Text, chakra } from '@chakra-ui/react';

const menuItems = [
  { path: '/', name: 'Home' },
  { path: '/request', name: 'Request' },
  { path: '/product-creation', name: 'Product Creation' },
  { path: '/keytable', name: 'Key Table' },
];

const StyledRouterLink = chakra(RouterLink);

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.800"
      color="white"
    >
      <Box>
        <StyledRouterLink
          to="/"
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          _hover={{ textDecoration: 'none' }}
        >
          RFGO
        </StyledRouterLink>
      </Box>
      <Spacer />
      <HStack gap={8} align="center">
        <HStack as="nav" gap={8}>
          {menuItems.map((item) => (
            <StyledRouterLink
              key={item.name}
              to={item.path}
              p={2}
              borderRadius="md"
              bg={location.pathname === item.path ? 'gray.700' : 'transparent'}
              _hover={{
                bg: 'gray.600',
                textDecoration: 'none',
              }}
              fontWeight={location.pathname === item.path ? 'bold' : 'normal'}
              color="white"
            >
              {item.name}
            </StyledRouterLink>
          ))}
        </HStack>
        <HStack gap={4} align="center">
          {/* <Avatar name="Profile" size="sm" /> */}
          <Text>Profile</Text>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
