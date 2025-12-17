import AppRouter from "./routes/AppRouter.jsx";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState, useEffect } from "react";

/* 🔹 Read once on load */
const getInitialMode = () => {
  const saved = localStorage.getItem("themeMode");
  return saved === "light" || saved === "dark" ? saved : "dark";
};

const App = () => {
  const [mode, setMode] = useState(getInitialMode);

  /* 🔹 Persist on change */
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return (
    <Provider store={store}>
      <ThemeProvider mode={mode}>
        <AppRouter mode={mode} setMode={setMode} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
