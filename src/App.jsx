<<<<<<< HEAD
import AppRouter from "./routes/AppRouter.jsx";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import {store} from "./store/store";   // <-- your Redux store
=======
import AppRouter from './routes/AppRouter.jsx';
import ThemeProvider from './theme';
import { Typography } from '@mui/material';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

const App = () => {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <Provider store={store}>
        <AppRouter />
      </Provider>
=======
       <AuthProvider>
          <AppRouter /> 
       </AuthProvider>   
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
    </ThemeProvider>
  );
};

export default App;
