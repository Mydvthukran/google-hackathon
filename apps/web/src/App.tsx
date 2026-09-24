import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Wizard from './pages/Wizard';
import Results from './pages/Results';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wizard />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
