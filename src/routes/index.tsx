import { Routes, Route, Navigate } from 'react-router-dom';

import UnAuthenticatedLayout from '@/layouts/UnAuthenticated';
import AuthenticatedLayout from '@/layouts/Authenticated';

import { PublicRoutes } from './public';
import { PrivateRoutes } from './private';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UnAuthenticatedLayout />}>
        {PublicRoutes}
      </Route>

      <Route element={<AuthenticatedLayout />}>
        {PrivateRoutes}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
