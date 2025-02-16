import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import StudentTeacherPage from "./pages/StudentTeacherPage";
import AttendancePage from "./pages/AttendancePage";
import StatisticsPage from "./pages/StatisticsPage";
import AttendanceHistoryPage from "./pages/AttendanceHistoryPage";
import WeeklyAttendancePage from "./pages/WeeklyAttendancePage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CreateLessonPage from "./pages/CreateLessonPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details/:subject_id/create-lesson" element={<CreateLessonPage />} />
        <Route path="/details/:subject_id" element={<DetailPage />} />
        <Route path="/student-teacher/:subject_id/:lessonId" element={<StudentTeacherPage />} />
        <Route path="/attendance/:subject_id/:lessonId/:studentIdRaw" element={<AttendancePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/attendance-history" element={<AttendanceHistoryPage />} />
        <Route path="/weekly-attendance/:weekId" element={<WeeklyAttendancePage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
