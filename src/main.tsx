import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './contexts/ThemeContext.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppThemeProvider>
);
