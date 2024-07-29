import { lazy } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthLayout from '../pages/auth/layout';
import AuthRoutes from './auth';
import AuthGuard from '@/components/auth/guard';
import HomePage from '@/pages/home';
import MobilesPage from '@/pages/mobiles';
import DetailProduct from '@/pages/detail-product';

const Interrupts = lazy(() => import('../pages/error/interrupts'));
const Forbidden = lazy(() => import('../pages/error/forbidden'));
const NotFound = lazy(() => import('../pages/not-found'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/mobiles/:id" element={<MobilesPage />} />
        <Route path="/mobile/:id" element={<DetailProduct />} />

        <Route element={<AuthLayout />}>
          <Route path="auth/*" element={<AuthRoutes />} />
        </Route>

        <Route element={<AuthGuard />}>
      </Route>

        <Route path="interrupts" element={<Interrupts />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;