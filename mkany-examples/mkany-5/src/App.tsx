import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CommandCenter } from './pages/CommandCenter';
import { RealEstate } from './pages/RealEstate';
import { Agriculture } from './pages/Agriculture';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommandCenter />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/agriculture" element={<Agriculture />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
