import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import { WithProviders } from '@/app/providers/withProviders';
import { PortfolioPage } from '@/pages/portfolio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WithProviders>
      <PortfolioPage />
    </WithProviders>
  </StrictMode>,
)
