import AppRouter from "./routes/AppRouter.jsx";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import {store} from "./store/store";   // <-- your Redux store
import { useState } from "react";
const App = () => {
  const [mode, setMode] = useState("dark");
  return (
    <ThemeProvider mode={mode}>
      <Provider store={store}>
        <AppRouter mode={mode} setMode={setMode}/>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
