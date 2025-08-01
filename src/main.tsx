import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';
import './index.css';
import App from './App.tsx';
import devextremeConfig from 'devextreme/core/config';
import { licenseKey } from './devextreme-license';
import { ApolloProvider } from '@apollo/client';
import client from './infrastructure/apollo-client';

devextremeConfig({ licenseKey });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      {/* 생성한 테마를 ChakraProvider에 전달합니다. */}
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
);
