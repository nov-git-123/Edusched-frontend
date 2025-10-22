// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

// const App = () => {
//     return (
//         <Router>
//             <div className="app">
//             <Routes>
//   <Route path="/" element={<Login />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/forgot-password" element={<ForgotPassword />} /> 
//   <Route path="/reset-password" element={<ResetPassword />} />
// </Routes>

//             </div>
//         </Router>
//     );
// };

// export default App;

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';

// import Login from './components/Login';
// import Signup from './components/Signup';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import InstructorDashboard from './components/InstructorDashboard';
// import DeanDashboard from './components/DeanDashboard'; 


// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

// // Simple ProtectedRoute wrapper
// const ProtectedRoute = ({ children, role }) => {
//   const { currentUser, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   if (!currentUser) return <Navigate to="/login" replace />;

//   if (role && currentUser.role !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />

//             {/* Protected Routes */}
//             <Route
//               path="/admin/dashboard"
//               element={
//                 <ProtectedRoute role="admin">
//                   <h1>Admin Dashboard</h1>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/instructor/dashboard"
//               element={
//                 <ProtectedRoute role="instructor">
//                   <InstructorDashboard/>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dean/dashboard"
//               element={
//                 <ProtectedRoute role="dean">
//                   <DeanDashboard/>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/auth/Login.js';
import Signup from './pages/auth/Signup.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import ResetPassword from './pages/auth/ResetPassword.js';
// import InstructorDashboard from './components/InstructorDashboard';
import DeanDashboard from './pages/dean/DeanDashboard.js';

import InstructorsPage from './pages/dean/InstructorsPage.js';
import CoursesPage from './pages/dean/CoursesPage.js';
import RoomsPage from './pages/dean/RoomsPage.js';
import ReportsPage from './pages/dean/SchedulePage.js';
import ProfilePage from './pages/dean/ProfilePage.js';
import ListPage from './pages/dean/ListPage.js';
import InstructorAvailabilityInput from './pages/dean/InstructorAvailabilityInput.js';


import InstructorLayout from "./layouts/InstructorLayout.js";
import InstructorDashboard from "./pages/instructor/InstructorDashboard.js";
import InstructorSchedule from "./pages/instructor/InstructorSchedule.js";
// import RoomsPage from "./components/RoomsPage";
 import InstructorAvailibity from "./pages/instructor/InstructorAvailability.js";
import InstructorProfile from "./pages/instructor/InstructorProfile.js";

import AdminLayout from './layouts/AdminLayout.js';
import AdminDashboard from './pages/admin/AdminDashboard.js';
import UserManagement from './pages/admin/UserManagement.js';
import InstructorManagement from './pages/admin/InstructorManagement.js';
import SubjectManagement from './pages/admin/SubjectManagement.js';
import RoomManagement from './pages/admin/RoomManagement.js';
import ScheduleManagement from './pages/admin/ScheduleManagement.js';

import DeanLayout from './layouts/DeanLayout.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import SchedulePage from './pages/dean/SchedulePage.js';

// ProtectedRoute (unchanged)
const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Other roles (example) */}
          {/* <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute role="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          /> */}

          {/* Dean: Layout + nested pages */}
          <Route
            path="/dean"
            element={
              <ProtectedRoute role="dean">
                <DeanLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DeanDashboard />} />
            <Route path="instructors" element={<InstructorsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="reports" element={<SchedulePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="lists" element={<ListPage />} />
            <Route path="availability" element={<InstructorAvailabilityInput />} />
            {/* Default /dean goes to /dean/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/*instructor */}
          
          <Route
            path="/instructor"
            element={
              <ProtectedRoute role="instructor">
                <InstructorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<InstructorDashboard />} />
            {/* Default /instructor goes to /instructor/dashboard */}
            
            <Route path="schedule" element={<InstructorSchedule />} />
            <Route path="profile" element={<InstructorProfile />} />
            <Route path="rooms" element={<RoomsPage />} />
  <Route path="availability" element={<InstructorAvailibity />} />
  <Route path="profile" element={<ProfilePage />} />
  <Route index element={<Navigate to="dashboard" replace />} /> 

          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="users" element={<UserManagement />} />
             <Route path="instructors" element={<InstructorManagement />} />
              <Route path="subjects" element={<SubjectManagement />} />
            <Route path="rooms" element={<RoomManagement />} />
             <Route path="schedules" element={<ScheduleManagement />} />
              <Route index element={<Navigate to="dashboard" replace />} />

          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
