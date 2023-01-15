import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Playground from "./Playground";
import HomePage from "./screen/Home/HomePage";
import HomeLayout from "./layout/HomeLayout";
import ClassFeed from "./screen/Classroom/ClassFeed";
import HomeAssignments from "./screen/Home/HomeAssignments";
import ClassLayout from "./layout/ClassLayout";
import { useSelector } from "react-redux";
import { getCurrentStage } from "./store/stage/selector";
import { AllStageType } from "./store/stage/action";
import PostLayout from "./layout/PostLayout";
import Content from "./components/Post/Content";

function AppRoutes() {
  const currentState = useSelector(getCurrentStage);

  const checkState = () => {
    switch (currentState) {
      default:
      case AllStageType.HOME: {
        return (
          <>
            <Route path="/" element={<HomeLayout />}>
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/assignments" element={<HomeAssignments />} />
            </Route>
          </>
        );
      }

      case AllStageType.CLASS: {
        return (
          <>
            <Route path="/:classid" element={<ClassLayout />}>
              <Route path="/:classid" element={<ClassFeed />} />
              <Route
                path="/:classid/assignments"
                element={<HomeAssignments />}
              />
              <Route path="/:classid/exam" element={<> </>} />
            </Route>
          </>
        );
      }

      case AllStageType.POST: {
        return (
          <>
            <Route path="/:classid/post" element={<PostLayout />}>
              <Route path="/:classid/post/:id" element={<Content />}></Route>
            </Route>
          </>
        );
      }

      case AllStageType.EXAM: {
        return (
          <>
            <Route path="/:classid/exam" element={<> EXAM LAYOUT </>}>
              <Route
                path="/:classid/exam"
                element={<> EXAM CONTENT </>}
              ></Route>
            </Route>
          </>
        );
      }
    }
  };

  return (
    <BrowserRouter>
      {/* Using Redux Store to manage State ex; Home Class Exam */}
      <Routes>
        {checkState()}

        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
