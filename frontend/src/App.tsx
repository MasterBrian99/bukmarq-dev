import './App.css';

import { MantineProvider } from '@mantine/core';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout/AuthLayout';
import MainLayout from './layout/MainLayout/MainLayout';
import LoginScreen from './screens/AuthScreens/LoginScreen';
import RegisterScreen from './screens/AuthScreens/RegisterScreen';
import MainScreen from './screens/MainScreen';
function App(): ReactElement {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Suspense fallback={<h1>as</h1>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<MainScreen />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="register" element={<RegisterScreen />} />
              <Route path="login" element={<LoginScreen />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
