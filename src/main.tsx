import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './shared/styles/theme.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
);
