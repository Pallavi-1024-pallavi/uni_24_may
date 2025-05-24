import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

// Landing Page
import LandingPage from './pages/LandingPage';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import AvailableCourses from './pages/student/AvailableCourses';
import EnrolledCourses from './pages/student/EnrolledCourses';
import StudentProfile from './pages/student/Profile';
import EditProfile from './pages/student/EditProfile';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyCourses from './pages/faculty/Courses';
import FacultyProfile from './pages/faculty/Profile';
import FacultyStudents from './pages/faculty/Students';
import FacultyAttendance from './pages/faculty/Attendance';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import FacultyManagement from './pages/admin/Faculty';
import StudentManagement from './pages/admin/Students';
import CourseManagement from './pages/admin/Courses';
import AssignStudents from './pages/admin/AssignStudents';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/available-courses" element={<AvailableCourses />} />
          <Route path="/student/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/edit-profile" element={<EditProfile />} />
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/courses" element={<FacultyCourses />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/faculty/profile" element={<FacultyProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<FacultyManagement />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/assign-students" element={<AssignStudents />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;