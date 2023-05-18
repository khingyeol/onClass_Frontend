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
import AssignmentCreate from "./screen/Classroom/AssignmentCreate";
import ClassExam from "./screen/Classroom/ClassExam";
import ExamCreate from "./screen/Classroom/ExamCreate";
import AsmResultScore from "./screen/Post/AsmResultScore";
import GradingPage from "./screen/Grading/GradingPage";
import GradeLayout from "./layout/GradeLayout";
import ClassSetting from "./screen/Classroom/ClassSetting";
import ExamCreateQuestions from "./screen/Classroom/ExamCreateQuestions";
import ExamContent from "./screen/Classroom/ExamContent";
import ClassDetail from "./components/Class/ClassDetail";
import { getClassDetail } from "./store/classsdetail/selector";

function AppRoutes() {
  const currentState = useSelector(getCurrentStage);
  const { classid } = useParams();
  const classDetail = useSelector(getClassDetail);

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
          <Route path="/:classid/detail" element={<ClassDetail classDetail={classDetail} />} />
          <Route path="/:classid/exam" element={<> </>} />
        </Route>

        <Route path="/:classid/post" element={<PostLayout />}>
          <Route path="/:classid/post/:id" element={<Content />}></Route>
        </Route>

        <Route path="/:classid/assignment" element={<PostLayout />}>
          <Route
            path="/:classid/assignment/create"
            element={<AssignmentCreate />}
          ></Route>
          <Route path="/:classid/assignment/:id" element={<Content />}></Route>
          <Route
            path="/:classid/assignment/:id/score"
            element={<AsmResultScore />}
          ></Route>
        </Route>

        <Route path="/:classid/exam" element={<ClassLayout />}>
          <Route path="/:classid/exam/create" element={<ExamCreate />}></Route>
          <Route path="/:classid/exam" element={<ClassExam />}></Route>
        </Route>

        <Route path="/:classid/grading" element={<GradeLayout />}>
          <Route path="/:classid/grading" element={<GradingPage />}></Route>
        </Route>

        <Route path="/:classid/setting" element={<ClassLayout />}>
          <Route
            path="/:classid/setting"
            element={<ClassSetting />}
          ></Route>
        </Route>

          <Route path="/:classid/exam/:id" element={<ExamContent />}></Route>


        <Route path="/playground" element={<Playground />} />
        {/* <Route path="/playground" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
