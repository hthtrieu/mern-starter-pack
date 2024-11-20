import './i18n';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import CustomRouterProvider from '@/routes/CustomRouterProvider';
import {
  privateRouters,
  protectedRoutes,
  publicRoutes,
} from '@/routes/MainRouters';
import initStore from '@/store/initStore';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ErrorFallbackRenderer from '@/components/common/error-fallback-render/ErrorFallbackRenderer';
import PageNotFound from '@/components/common/PageNotFound';
import RequireAuth from '@/components/common/RequireAuth';
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from '@/components/themes/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Constants from '@/lib/Constants';

import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MaxWidthWrapper from './components/common/MaxWidthWrapper';

const store = initStore();

function App() {
  return (
    <div className="App flex flex-col">
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
            <ThemeProvider>
              <Toaster />
              <CustomRouterProvider></CustomRouterProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
