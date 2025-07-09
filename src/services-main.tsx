import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ServicesPage from './pages/ServicesPage';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ServicesPage />
  </StrictMode>
);