import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import './styles/common.scss';
// import 'devextreme/dist/css/dx.common.css';
// - Dark Blue:
// import 'devextreme/dist/css/dx.fluent.saas.dark.blue.css';
// - Light Green (다른 악센트 컬러):
// import 'devextreme/dist/css/dx.fluent.saas.light.green.css';
// - 또는 일반 Fluent Light / Dark (accent color 없이):
// import 'devextreme/dist/css/dx.fluent.light.css';
// import 'devextreme/dist/css/dx.fluent.dark.css';
import App from './App.tsx';
import devextremeConfig from 'devextreme/core/config';
import { licenseKey } from './devextreme-license';

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import client from './infrastructure/apollo-client';

devextremeConfig({ licenseKey });
const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
);
