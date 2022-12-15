import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Playground from "./Playground";
import { AppThemes } from "./common/theme/onClassTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AuthPage from "./screen/Auth/AuthPage";
import HomePage from "./screen/Home/HomePage";
import HomeLayout from "./layout/HomeLayout";
import ClassFeed from "./screen/Classroom/ClassFeed";
import HomeAssignments from "./screen/Home/HomeAssignments";
import ClassLayout from "./layout/ClassLayout";

function AppRoutes() {

    return (
        <BrowserRouter>
        {/* Using Redux Store to manage State ex; Home Class Exam */}
          <Routes>
            <Route path="/" element={<HomeLayout />}>

            <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/assignments" element={<HomeAssignments />} />
            </Route>

            <Route path="/:classid" element={<ClassLayout />}>
                <Route path="/:classid" element={<ClassFeed />} />
                <Route path="/:classid/assignments" element={<HomeAssignments />} />
                <Route path="/:classid/exam" element={<> </>} />
           </Route>

            <Route path="/playground" element={<Playground />} />
          </Routes>
        {/* </HomeLayout> */}
        </BrowserRouter>
      );
  }

  export default AppRoutes;