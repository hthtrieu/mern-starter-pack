import { lazy } from 'react';

import MainLayout from '@/components/layout/MainLayout';

import { routerPaths } from './path';

const Home = lazy(() => import('@/pages/home/Home'));
const ForgotPassword = lazy(
  () => import('@/pages/forgot-password/ForgotPasswordPage'),
);
const UnAuthorized = lazy(() => import('@/components/common/UnAuthorized'));
const Profile = lazy(() => import('@/pages/profile/Profile'));
const LoginGoogle = lazy(() => import('@/pages/auth/LoginGoogle'));

const publicRoutes = [
  {
    path: routerPaths.HOME,
    component: Home,
    layout: MainLayout,
  },
  {
    path: routerPaths.FORGOT_PASSWORD,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: routerPaths.UNAUTHORIZED,
    component: UnAuthorized,
  },
  {
    path: routerPaths.LOGIN_GOOGLE,
    component: LoginGoogle,
  },
];
const protectedRoutes = [
  {
    path: routerPaths.USER_PROFILE,
    component: Profile,
  },
];

const privateRouters = [
  {
    path: routerPaths.ADMIN_DASHBOARD,
    component: UnAuthorized,
  },
];
export { publicRoutes, protectedRoutes, privateRouters };
