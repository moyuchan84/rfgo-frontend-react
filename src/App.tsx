import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './presentation/pages/Home';
import Request from './presentation/pages/Request';
import RequestDetail from './presentation/pages/RequestDetail';
import KeyTable from './presentation/pages/KeyTable';
import MainLayout from './presentation/layouts/MainLayout';
import 'devextreme/dist/css/dx.light.css';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/detail/:id" element={<RequestDetail />} />
          <Route path="/keytable" element={<KeyTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
