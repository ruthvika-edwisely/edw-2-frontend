import AppRouter from './routes/AppRouter.jsx';
import ThemeProvider from './theme';
import { Typography } from '@mui/material';
import { AuthProvider } from "./context/AuthContext";

const App = () => {

  return (
    <ThemeProvider>
       <AuthProvider>
          <AppRouter /> 
       </AuthProvider>   
    </ThemeProvider>
  );
}

export default App
