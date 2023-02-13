import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
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
import Content from "./screen/Post/Content";
import { useParams } from "react-router-dom";
import ClassAssignments from "./screen/Classroom/ClassAssignments";

function AppRoutes() {
  const currentState = useSelector(getCurrentStage);
  const { classid } = useParams();

  // const checkState = () => {
  //   switch (currentState) {
  //     default:
  //     case AllStageType.HOME: {
  //       return (
  //         <Route element={<HomeLayout />}>
  //           <Route path="/" element={<Navigate to="/home" />} />
  //           <Route path="*" element={<Navigate to="/home" />} />
  //           <Route path="/home" element={<HomePage />} />
  //           <Route path="/assignments" element={<HomeAssignments />} />
  //         </Route>
  //       );
  //     }

  //     case AllStageType.CLASS: {
  //       return (
  //         <Route element={<ClassLayout />}>
  //           <Route path="/:classid" element={<ClassFeed />} />
  //           <Route path="/:classid/assignments" element={<ClassAssignments />} />
  //           <Route path="/:classid/exam" element={<> </>} />
  //         </Route>
  //       );
  //     }

  //     case AllStageType.POST: {
  //       return (
  //         <>
  //           <Route element={<PostLayout />}>
  //             <Route path="/:classid/post/:id" element={<Content />}></Route>
  //           </Route>
  //         </>
  //       );
  //     }

  //     case AllStageType.EXAM: {
  //       return (
  //         <>
  //           <Route path="/:classid/exam" element={<> EXAM LAYOUT </>}>
  //             <Route
  //               path="/:classid/exam"
  //               element={<> EXAM CONTENT </>}
  //             ></Route>
  //           </Route>
  //         </>
  //       );
  //     }
  //   }
  // };

  return (
    <Router>
      {/* Using Redux Store to manage State ex; Home Class Exam */}
      <Routes>
        {/* {checkState()} */}
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/assignments" element={<HomeAssignments />} />
        </Route>

        <Route path="/:classid" element={<ClassLayout />}>
          <Route path="/:classid" element={<ClassFeed />} />
          <Route path="/:classid/assignments" element={<ClassAssignments />} />
          <Route path="/:classid/exam" element={<> </>} />
        </Route>

        <Route path="/:classid/post" element={<PostLayout />}>
            <Route path="/:classid/post/:id" element={<Content />}></Route>
          </Route>

        <Route path="/:classid/assignment" element={<PostLayout />}>
          <Route path="/:classid/assignment/:id" element={<Content />}></Route>
        </Route>

        <Route path="/:classid/exam" element={<ClassLayout />}>
          <Route path="/:classid/exam" element={<> EXAM CONTENT </>}></Route>
        </Route>

        <Route path="/playground" element={<Playground />} />
        {/* <Route path="/playground" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
