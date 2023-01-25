import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import Home from './views/Home/Home';
import Tables from './views/Tables/Tables';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
