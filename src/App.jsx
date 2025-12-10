import AppRouter from "./routes/AppRouter.jsx";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import {store} from "./store/store";   // <-- your Redux store

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
