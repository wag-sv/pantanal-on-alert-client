import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Map } from '../pages/Map';
import { About } from '../pages/About';
import { Register } from '../pages/Register';
import { Authenticate } from '../pages/Authenticate';
import { Profile } from '../pages/Profile';
import { Dashboard } from '../pages/Dashboard';
import { Error } from '../pages/Error';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}
