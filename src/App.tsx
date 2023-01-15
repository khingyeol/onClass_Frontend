import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppThemes } from "./common/theme/onClassTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AuthPage from "./screen/Auth/AuthPage";
import AppRoutes from "./AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import OtpPage from "./screen/Auth/OtpPage";
import { useSelector } from "react-redux";
import { getIsAuthenticate } from "./store/authentication/selector";

function App() {
  const isLogin: boolean = useSelector(getIsAuthenticate);

  useEffect(() => {
    console.log("isLoggedIn", isLogin);
  });

  return (
    <MuiThemeProvider theme={AppThemes}>
      <PersistGate persistor={persistor}>
        {isLogin ? (
          <AppRoutes />
        ) : (
          <BrowserRouter>
            <Routes>
              {/* This path to /login need to be changed to somewhere the homepage(index) is */}
              <Route path="*" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/otp" element={<OtpPage />} />
            </Routes>
          </BrowserRouter>
        )}
      </PersistGate>
    </MuiThemeProvider>
  );
}

export default App;
