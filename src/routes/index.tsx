import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoutes } from './public';

export const AppRoutes = () => {

  return (
    <Routes>
      {PublicRoutes}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};