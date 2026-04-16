import { AppRoutes } from './routes'

import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <AppRoutes />
      </AppThemeProvider>
    </BrowserRouter>
  )
}

export default App
