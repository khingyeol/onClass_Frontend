import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AppThemes } from "./common/theme/onClassTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AuthPage from "./screen/Auth/AuthPage";
import AppRoutes from "./AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import OtpPage from "./screen/Auth/OtpPage";
import { useSelector } from "react-redux";
import { getIsAuthenticate } from "./store/authentication/selector";
import OCDialog from "./common/OCDialog";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./services/apolloClient"

function App() {
  const isLogin: boolean = useSelector(getIsAuthenticate);

  return (
    <MuiThemeProvider theme={AppThemes}>
      <PersistGate persistor={persistor}>
        {isLogin ? (
          <ApolloProvider client={apolloClient}>
            <AppRoutes />
          </ApolloProvider>
        ) : (
          <Router>
            <Routes>
              {/* This path to /login need to be changed to somewhere the homepage(index) is */}
              <Route path="*" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/otp" element={<OtpPage />} />
            </Routes>
          </Router>
        )}
        <OCDialog />
      </PersistGate>
    </MuiThemeProvider>
  );
}

export default App;
