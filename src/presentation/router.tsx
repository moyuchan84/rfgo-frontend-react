import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Request from './pages/Request';
import RequestDetail from './pages/RequestDetail';
import KeyTable from './pages/KeyTable';
import MainLayout from './layouts/MainLayout';

const AppRouter: React.FC = () => {
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

export default AppRouter;
