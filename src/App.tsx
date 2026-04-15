import { useThemeMode } from './hooks/useThemeMode'
import { Box, useTheme, Button } from '@mui/material'
import { AppRoutes } from './routes'

function App() {
  const { mode, toggleTheme } = useThemeMode()
  const theme = useTheme()

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderBottom: 1, borderColor: 'divider' }}>
         <Button variant="outlined" onClick={toggleTheme}>
            Toggle Theme ({mode})
         </Button>
      </Box>
      <Box sx={{ p: 4, flexGrow: 1 }}>
        <AppRoutes />
      </Box>
    </Box>
  )
}

export default App
