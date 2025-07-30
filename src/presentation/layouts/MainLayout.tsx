import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';

const MainLayout: React.FC = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1" p={8}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
