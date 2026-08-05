import { Route } from 'react-router-dom';
import { routes } from '@/routes/constants';
import * as Pages from '@/pages/public';

export const PublicRoutes = (
    <>
        <Route path={routes.public.home} element={<Pages.HomePage />} />
    </>
);
