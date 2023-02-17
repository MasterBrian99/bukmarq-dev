import './App.css';

import { MantineProvider } from '@mantine/core';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './layout/MainLayout/MainLayout';
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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
