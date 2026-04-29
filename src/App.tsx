import { AppRoutes } from './routes'

import { BrowserRouter } from 'react-router-dom'

import { MobileProvider } from '@/contexts/MobileContext'
import { AppThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

function App() {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <NotificationProvider>
          <MobileProvider>
            <AppRoutes />
          </MobileProvider>
        </NotificationProvider>
      </AppThemeProvider>
    </BrowserRouter>
  )
}

export default App
