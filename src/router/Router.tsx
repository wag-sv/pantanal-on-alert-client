import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Map } from '../pages/Map/Map';
import { About } from '../pages/About/About';
// import { Register } from '../pages/Register/Register';
// import { Authenticate } from '../pages/Authenticate/Authenticate';
// import { Profile } from '../pages/Profile/Profile';
// import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Error } from '../pages/Error/Error';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}
