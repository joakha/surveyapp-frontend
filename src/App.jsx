import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#a7b788',
    },
    text: {
      primary: '#003049',
      secondary: '#4c87a0',
    },
    typography: {
      fontFamily: "'Roboto', sans-serif'",
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
