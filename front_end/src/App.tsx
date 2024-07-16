import './i18n';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import {
  privateRouters,
  protectedRoutes,
  publicRoutes,
} from '@/routes/MainRouters';
import { ErrorBoundary } from 'react-error-boundary';
import CustomRouterProvider from "@/routes/CustomRouterProvider";
import { Provider } from 'react-redux';
import {
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
import initStore from '@/store/initStore';
import Constants from '@/lib/Constants';

const store = initStore();

function App() {
  return (
    <div className="App">
      <div className="overflow-hidden">
        <Provider store={store}>
          <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
            <ThemeProvider>
              <Toaster />
             <CustomRouterProvider>
              
             </CustomRouterProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </div>
    </div>
  );
}

export default App;
