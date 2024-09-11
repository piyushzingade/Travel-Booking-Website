// src/App.js (or src/App.tsx)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store'; // Adjust path if needed

import HomePage from './pages/HomePage';
import PackagePage from './pages/PackagePage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages/:id" element={<PackagePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
