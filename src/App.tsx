import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Playground from "./Playground";
import { AppThemes } from "./common/theme/onClassTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AuthPage from "./screen/Auth/AuthPage";
import HomePage from "./screen/Home/HomePage";
import Layout from "./layout/HomeLayout";
import ClassFeed from "./screen/Classroom/ClassFeed";
import HomeAssignments from "./screen/Home/HomeAssignments";
import AppRoutes from "./AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { isLoggedIn } from "./services/auth/api_auth";
import OtpPage from "./screen/Auth/OtpPage";

function App() {

  const isLogin: boolean = useMemo(() => isLoggedIn(), []);

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
