// import React from "react";
// import { Card, Table, Button } from "react-bootstrap";

// const InstructorDashboard = () => {
//   // Mock data for schedule and assignments
//   const schedule = [
//     { course: "BSIT 3A - Web Development", day: "Mon/Wed", time: "9:00 - 10:30 AM", room: "Lab 301" },
//     { course: "BSCS 2B - Data Structures", day: "Tue/Thu", time: "1:00 - 2:30 PM", room: "Room 204" },
//   ];

//   const notifications = [
//     { id: 1, message: "Reminder: Submit your updated availability before Friday." },
//     { id: 2, message: "Dean approved your schedule adjustments." },
//   ];

//   return (
//     <div className="container-fluid py-4">
//       <h2 className="mb-4 fw-bold">Instructor Dashboard</h2>

//       <div className="row g-4">
//         {/* Schedule Section */}
//         <div className="col-lg-8">
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-primary text-white fw-semibold">
//               📅 My Teaching Schedule
//             </Card.Header>
//             <Card.Body>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Course</th>
//                     <th>Day</th>
//                     <th>Time</th>
//                     <th>Room</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {schedule.map((item, idx) => (
//                     <tr key={idx}>
//                       <td>{item.course}</td>
//                       <td>{item.day}</td>
//                       <td>{item.time}</td>
//                       <td>{item.room}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <Button variant="outline-primary" size="sm">
//                 View Full Schedule
//               </Button>
//             </Card.Body>
//           </Card>
//         </div>

//         {/* Notifications Section */}
//         <div className="col-lg-4">
//           <Card className="shadow-sm border-0 mb-4">
//             <Card.Header className="bg-warning fw-semibold">
//               🔔 Notifications
//             </Card.Header>
//             <Card.Body>
//               {notifications.length > 0 ? (
//                 <ul className="list-unstyled">
//                   {notifications.map((note) => (
//                     <li key={note.id} className="mb-2">
//                       <span className="text-muted">• {note.message}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted">No new notifications</p>
//               )}
//             </Card.Body>
//           </Card>

//           {/* Availability Update */}
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-success text-white fw-semibold">
//               ✅ Update Availability
//             </Card.Header>
//             <Card.Body>
//               <p className="text-muted mb-3">
//                 Keep your availability up-to-date so the dean can adjust schedules accordingly.
//               </p>
//               <Button variant="success" size="sm">
//                 Update Availability
//               </Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;

//FUNCTIONAL

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaCalendarAlt,
//   FaDoorOpen,
//   FaUserClock,
//   FaBook,
//   FaChartBar,
// } from "react-icons/fa";
// import "../../styles/InstructorDashboard.css"; // 🔹 Import the new CSS

// const InstructorDashboard = () => {
//   return (
//     <div className="instructor-dashboard container-fluid py-4">
//       {/* Header */}
//       <div className="dashboard-header mb-5 p-4 rounded-4 shadow-sm">
//         <h2 className="fw-bold text-white mb-2">Instructor Dashboard</h2>
//         <p className="text-white-50 mb-0">
//           Manage your schedule, rooms, and availability — all in one place.
//         </p>
//       </div>

//       {/* Quick Stats */}
//       <div className="row g-4 mb-5">
//         <div className="col-lg-3 col-md-6">
//           <div className="stat-card shadow-sm p-4 text-center rounded-4">
//             <FaBook size={32} className="text-primary mb-2" />
//             <h6 className="fw-semibold mb-1">Total Courses</h6>
//             <p className="text-muted small mb-0">5 Active</p>
//           </div>
//         </div>
//         <div className="col-lg-3 col-md-6">
//           <div className="stat-card shadow-sm p-4 text-center rounded-4">
//             <FaCalendarAlt size={32} className="text-success mb-2" />
//             <h6 className="fw-semibold mb-1">Upcoming Classes</h6>
//             <p className="text-muted small mb-0">3 This Week</p>
//           </div>
//         </div>
//         <div className="col-lg-3 col-md-6">
//           <div className="stat-card shadow-sm p-4 text-center rounded-4">
//             <FaDoorOpen size={32} className="text-warning mb-2" />
//             <h6 className="fw-semibold mb-1">Room Assignments</h6>
//             <p className="text-muted small mb-0">2 Changes</p>
//           </div>
//         </div>
//         <div className="col-lg-3 col-md-6">
//           <div className="stat-card shadow-sm p-4 text-center rounded-4">
//             <FaChartBar size={32} className="text-danger mb-2" />
//             <h6 className="fw-semibold mb-1">Reports</h6>
//             <p className="text-muted small mb-0">Updated Today</p>
//           </div>
//         </div>
//       </div>

//       {/* Action Sections */}
//       <h5 className="fw-bold mb-3 section-title">Quick Actions</h5>
//       <div className="row g-4">
//         <div className="col-md-4">
//           <div className="action-card card border-0 shadow-sm h-100 rounded-4">
//             <div className="card-body">
//               <h5 className="card-title fw-semibold">My Schedule</h5>
//               <p className="card-text text-muted small">
//                 Check your upcoming classes and assigned timeslots.
//               </p>
//               <Link
//                 to="/instructor/schedule"
//                 className="btn btn-primary w-100 mt-2"
//               >
//                 <FaCalendarAlt className="me-2" /> View Schedule
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="action-card card border-0 shadow-sm h-100 rounded-4">
//             <div className="card-body">
//               <h5 className="card-title fw-semibold">Room Assignments</h5>
//               <p className="card-text text-muted small">
//                 View which rooms are assigned for your classes.
//               </p>
//               <Link
//                 to="/instructor/rooms"
//                 className="btn btn-success w-100 mt-2"
//               >
//                 <FaDoorOpen className="me-2" /> Check Rooms
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="action-card card border-0 shadow-sm h-100 rounded-4">
//             <div className="card-body">
//               <h5 className="card-title fw-semibold">Update Availability</h5>
//               <p className="card-text text-muted small">
//                 Update your availability to prevent conflicts.
//               </p>
//               <Link
//                 to="/instructor/availability"
//                 className="btn btn-warning w-100 mt-2 text-white"
//               >
//                 <FaUserClock className="me-2" /> Update Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;

// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import {
//   Calendar, BookOpen, Building, Clock, Users, TrendingUp,
//   RefreshCw, Bell, ChevronRight, Sun, Moon, Activity, Award
// } from "lucide-react";

// // ==================== CONSTANTS ====================
// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ==================== UTILITY FUNCTIONS ====================
// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good Morning";
//   if (hour < 18) return "Good Afternoon";
//   return "Good Evening";
// };

// // ==================== ANIMATED COUNTER ====================
// const AnimatedCounter = React.memo(({ end, duration = 1000 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime;
//     const animate = (currentTime) => {
//       if (!startTime) startTime = currentTime;
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       setCount(Math.floor(progress * end));
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };
//     requestAnimationFrame(animate);
//   }, [end, duration]);

//   return <span>{count}</span>;
// });

// // ==================== STAT CARD ====================
// const StatCard = React.memo(({ icon: Icon, label, value, color, trend, isLoading }) => (
//   <div className="stat-card" style={{ borderTopColor: color }}>
//     <div className="stat-icon-wrapper" style={{ background: `${color}15` }}>
//       <Icon size={28} style={{ color }} />
//     </div>
//     <div className="stat-content">
//       <div className="stat-value">
//         {isLoading ? (
//           <div className="skeleton-value"></div>
//         ) : (
//           <AnimatedCounter end={value} />
//         )}
//       </div>
//       <div className="stat-label">{label}</div>
//       {trend && (
//         <div className="stat-trend" style={{ color }}>
//           <TrendingUp size={12} />
//           <span>{trend}</span>
//         </div>
//       )}
//     </div>
//   </div>
// ));

// // ==================== ACTION CARD ====================
// const ActionCard = React.memo(({ icon: Icon, title, description, link, color, badge }) => (
//   <Link to={link} className="action-card">
//     <div className="action-card-content">
//       <div className="action-icon" style={{ background: `${color}15`, color }}>
//         <Icon size={24} />
//       </div>
//       <div className="action-info">
//         <h3 className="action-title">{title}</h3>
//         <p className="action-description">{description}</p>
//       </div>
//       {badge && (
//         <div className="action-badge" style={{ background: color }}>
//           {badge}
//         </div>
//       )}
//     </div>
//     <div className="action-arrow" style={{ color }}>
//       <ChevronRight size={20} />
//     </div>
//   </Link>
// ));

// // ==================== QUICK STAT WIDGET ====================
// const QuickStatWidget = React.memo(({ title, stats, icon: Icon }) => (
//   <div className="quick-stat-widget">
//     <div className="widget-header">
//       <div className="widget-icon">
//         <Icon size={20} />
//       </div>
//       <h4>{title}</h4>
//     </div>
//     <div className="widget-stats">
//       {stats.map((stat, index) => (
//         <div key={index} className="widget-stat-item">
//           <div className="stat-item-value">{stat.value}</div>
//           <div className="stat-item-label">{stat.label}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== MAIN DASHBOARD COMPONENT ====================
// export default function InstructorDashboard() {
//   // State Management
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [stats, setStats] = useState({
//     totalCourses: 0,
//     upcomingClasses: 0,
//     roomAssignments: 0,
//     totalHours: 0,
//   });
//   const [instructor, setInstructor] = useState(null);
//   const [notifications, setNotifications] = useState(2);

//   // Fetch dashboard data
//   useEffect(() => {
//     const loadDashboardData = async () => {
//       setLoading(true);
      
//       try {
//         // Get instructor info from localStorage
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (storedUser) {
//           setInstructor({
//             name: storedUser.name || storedUser.email?.split('@')[0] || 'Instructor',
//             email: storedUser.email,
//             department: storedUser.department || 'Faculty'
//           });
//         }

//         // Simulate API call - replace with actual API
//         await new Promise(resolve => setTimeout(resolve, 800));
        
//         // Mock data - replace with actual API response
//         setStats({
//           totalCourses: 5,
//           upcomingClasses: 3,
//           roomAssignments: 2,
//           totalHours: 18,
//         });
//       } catch (err) {
//         console.error('Error loading dashboard:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboardData();
//   }, []);

//   // Greeting message
//   const greeting = useMemo(() => getGreeting(), []);

//   // Handle refresh
//   const handleRefresh = async () => {
//     setLoading(true);
//     // Simulate refresh
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setLoading(false);
//   };

//   return (
//     <div className={`instructor-dashboard ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Dashboard Header */}
//       <div className="dashboard-header">
//         <div className="header-content">
//           <div className="header-left">
//             <div className="welcome-section">
//               <h1 className="welcome-title">
//                 {greeting}, {instructor?.name || 'Instructor'}! 👋
//               </h1>
//               <p className="welcome-subtitle">
//                 Here's your overview for today — {new Date().toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}
//               </p>
//             </div>
//           </div>

//           <div className="header-right">
//             <button 
//               className="header-btn notification-btn"
//               title="Notifications"
//             >
//               <Bell size={20} />
//               {notifications > 0 && (
//                 <span className="notification-badge">{notifications}</span>
//               )}
//             </button>

//             <button
//               className="header-btn theme-toggle"
//               onClick={() => setDarkMode(!darkMode)}
//               title={darkMode ? 'Light Mode' : 'Dark Mode'}
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>

//             <button
//               className="header-btn refresh-btn"
//               onClick={handleRefresh}
//               disabled={loading}
//               title="Refresh Dashboard"
//             >
//               <RefreshCw size={20} className={loading ? 'spinning' : ''} />
//             </button>
//           </div>
//         </div>

//         {/* Breadcrumb */}
//         <div className="breadcrumb">
//           <span className="breadcrumb-item">Home</span>
//           <ChevronRight size={14} className="breadcrumb-separator" />
//           <span className="breadcrumb-item active">Dashboard</span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="stats-section">
//         <div className="stats-grid">
//           <StatCard
//             icon={BookOpen}
//             label="Total Courses"
//             value={stats.totalCourses}
//             color={COLORS.primary}
//             trend="+2 this sem"
//             isLoading={loading}
//           />
//           <StatCard
//             icon={Calendar}
//             label="Upcoming Classes"
//             value={stats.upcomingClasses}
//             color="#10b981"
//             trend="This week"
//             isLoading={loading}
//           />
//           <StatCard
//             icon={Building}
//             label="Room Assignments"
//             value={stats.roomAssignments}
//             color="#f59e0b"
//             trend="Recent changes"
//             isLoading={loading}
//           />
//           <StatCard
//             icon={Clock}
//             label="Teaching Hours"
//             value={stats.totalHours}
//             color={COLORS.accent}
//             trend="Per week"
//             isLoading={loading}
//           />
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="actions-section">
//         <div className="section-header">
//           <h2 className="section-title">Quick Actions</h2>
//           <p className="section-subtitle">Access your most used features</p>
//         </div>

//         <div className="actions-grid">
//           <ActionCard
//             icon={Calendar}
//             title="My Schedule"
//             description="View your upcoming classes and time slots"
//             link="/instructor/schedule"
//             color={COLORS.primary}
//             badge="Updated"
//           />
//           <ActionCard
//             icon={Building}
//             title="Room Assignments"
//             description="Check which rooms are assigned for your classes"
//             link="/instructor/rooms"
//             color="#10b981"
//           />
//           <ActionCard
//             icon={Clock}
//             title="Update Availability"
//             description="Manage your availability to prevent conflicts"
//             link="/instructor/availability"
//             color="#f59e0b"
//             badge="2 Pending"
//           />
//           <ActionCard
//             icon={BookOpen}
//             title="Course Materials"
//             description="Upload and manage course resources"
//             link="/instructor/courses"
//             color={COLORS.accent}
//           />
//           <ActionCard
//             icon={Users}
//             title="Student Lists"
//             description="View enrolled students in your classes"
//             link="/instructor/students"
//             color="#8b5cf6"
//           />
//           <ActionCard
//             icon={Activity}
//             title="Reports & Analytics"
//             description="View insights and performance metrics"
//             link="/instructor/reports"
//             color="#ef4444"
//           />
//         </div>
//       </div>

//       {/* Quick Stats Widgets */}
//       <div className="widgets-section">
//         <div className="widgets-grid">
//           <QuickStatWidget
//             title="This Week"
//             icon={Calendar}
//             stats={[
//               { label: 'Classes', value: '12' },
//               { label: 'Hours', value: '18' },
//               { label: 'Students', value: '156' }
//             ]}
//           />
//           <QuickStatWidget
//             title="Performance"
//             icon={Award}
//             stats={[
//               { label: 'Attendance', value: '94%' },
//               { label: 'Completion', value: '87%' },
//               { label: 'Rating', value: '4.8' }
//             ]}
//           />
//           <QuickStatWidget
//             title="Resources"
//             icon={BookOpen}
//             stats={[
//               { label: 'Materials', value: '24' },
//               { label: 'Assignments', value: '8' },
//               { label: 'Exams', value: '3' }
//             ]}
//           />
//         </div>
//       </div>

//       {/* Inline Styles */}
//       <style jsx>{`
//         .instructor-dashboard {
//           min-height: 100vh;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           padding: 2rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//           transition: all 0.3s ease;
//         }

//         .instructor-dashboard.dark-mode {
//           background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
//           color: #e0e0e0;
//         }

//         /* ===== DASHBOARD HEADER ===== */
//         .dashboard-header {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
//           animation: slideDown 0.5s ease;
//         }

//         .dark-mode .dashboard-header {
//           background: #1e293b;
//         }

//         .header-content {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//         }

//         .header-left {
//           flex: 1;
//         }

//         .welcome-section {
//           animation: fadeIn 0.8s ease;
//         }

//         .welcome-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0 0 0.5rem 0;
//         }

//         .welcome-subtitle {
//           font-size: 1rem;
//           color: ${COLORS.secondary};
//           opacity: 0.8;
//           margin: 0;
//         }

//         .dark-mode .welcome-subtitle {
//           color: #94a3b8;
//         }

//         .header-right {
//           display: flex;
//           gap: 0.75rem;
//         }

//         .header-btn {
//           position: relative;
//           width: 44px;
//           height: 44px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: ${COLORS.lightest};
//           border: none;
//           border-radius: 12px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           color: ${COLORS.primary};
//         }

//         .header-btn:hover {
//           background: ${COLORS.lighter};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
//         }

//         .header-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .dark-mode .header-btn {
//           background: #334155;
//           color: #e0e0e0;
//         }

//         .notification-badge {
//           position: absolute;
//           top: -4px;
//           right: -4px;
//           width: 20px;
//           height: 20px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           font-size: 0.7rem;
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== BREADCRUMB ===== */
//         .breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .breadcrumb-item.active {
//           color: ${COLORS.primary};
//           font-weight: 600;
//           opacity: 1;
//         }

//         .breadcrumb-separator {
//           opacity: 0.5;
//         }

//         /* ===== STATS SECTION ===== */
//         .stats-section {
//           margin-bottom: 2rem;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1.5rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 16px;
//           padding: 1.75rem;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           border-top: 4px solid;
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           transition: all 0.3s ease;
//           animation: fadeInUp 0.5s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
//         }

//         .dark-mode .stat-card {
//           background: #1e293b;
//         }

//         .stat-icon-wrapper {
//           width: 64px;
//           height: 64px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 14px;
//         }

//         .stat-content {
//           flex: 1;
//         }

//         .stat-value {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           line-height: 1;
//           margin-bottom: 0.5rem;
//         }

//         .dark-mode .stat-value {
//           color: #e0e0e0;
//         }

//         .stat-label {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .dark-mode .stat-label {
//           color: #94a3b8;
//         }

//         .stat-trend {
//           display: flex;
//           align-items: center;
//           gap: 0.35rem;
//           font-size: 0.8rem;
//           font-weight: 600;
//           margin-top: 0.5rem;
//         }

//         .skeleton-value {
//           width: 80px;
//           height: 40px;
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         /* ===== ACTIONS SECTION ===== */
//         .actions-section {
//           margin-bottom: 2rem;
//         }

//         .section-header {
//           margin-bottom: 1.5rem;
//         }

//         .section-title {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//         }

//         .dark-mode .section-title {
//           color: #e0e0e0;
//         }

//         .section-subtitle {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin: 0;
//         }

//         .dark-mode .section-subtitle {
//           color: #94a3b8;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 1.5rem;
//         }

//         .action-card {
//           background: white;
//           border-radius: 16px;
//           padding: 1.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           text-decoration: none;
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//           animation: fadeInUp 0.6s ease;
//         }

//         .action-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//           border-color: ${COLORS.lighter};
//         }

//         .dark-mode .action-card {
//           background: #1e293b;
//         }

//         .action-card-content {
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           flex: 1;
//         }

//         .action-icon {
//           width: 56px;
//           height: 56px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//           flex-shrink: 0;
//         }

//         .action-info {
//           flex: 1;
//         }

//         .action-title {
//           font-size: 1.1rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.35rem 0;
//         }

//         .dark-mode .action-title {
//           color: #e0e0e0;
//         }

//         .action-description {
//           font-size: 0.875rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin: 0;
//           line-height: 1.4;
//         }

//         .dark-mode .action-description {
//           color: #94a3b8;
//         }

//         .action-badge {
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           color: white;
//           font-size: 0.75rem;
//           font-weight: 600;
//           white-space: nowrap;
//         }

//         .action-arrow {
//           display: flex;
//           align-items: center;
//           opacity: 0.6;
//           transition: all 0.3s ease;
//         }

//         .action-card:hover .action-arrow {
//           opacity: 1;
//           transform: translateX(4px);
//         }

//         /* ===== WIDGETS SECTION ===== */
//         .widgets-section {
//           margin-bottom: 2rem;
//         }

//         .widgets-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         .quick-stat-widget {
//           background: white;
//           border-radius: 16px;
//           padding: 1.75rem;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           transition: all 0.3s ease;
//           animation: fadeInUp 0.7s ease;
//         }

//         .quick-stat-widget:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
//         }

//         .dark-mode .quick-stat-widget {
//           background: #1e293b;
//         }

//         .widget-header {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1.5rem;
//           padding-bottom: 1rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .dark-mode .widget-header {
//           border-bottom-color: #334155;
//         }

//         .widget-icon {
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
//           color: white;
//           border-radius: 10px;
//         }

//         .widget-header h4 {
//           margin: 0;
//           font-size: 1.1rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }

//         .dark-mode .widget-header h4 {
//           color: #e0e0e0;
//         }

//         .widget-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1.5rem;
//         }

//         .widget-stat-item {
//           text-align: center;
//         }

//         .stat-item-value {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: ${COLORS.accent};
//           margin-bottom: 0.35rem;
//         }

//         .dark-mode .stat-item-value {
//           color: ${COLORS.lighter};
//         }

//         .stat-item-label {
//           font-size: 0.85rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .dark-mode .stat-item-label {
//           color: #94a3b8;
//         }

//         /* ===== ANIMATIONS ===== */
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* ===== RESPONSIVE DESIGN ===== */
//         @media (max-width: 1200px) {
//           .actions-grid {
//             grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           }
//         }

//         @media (max-width: 1024px) {
//           .stats-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .widgets-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .instructor-dashboard {
//             padding: 1rem;
//           }

//           .dashboard-header {
//             padding: 1.5rem;
//           }

//           .header-content {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .header-right {
//             width: 100%;
//             justify-content: flex-end;
//           }

//           .welcome-title {
//             font-size: 1.75rem;
//           }

//           .welcome-subtitle {
//             font-size: 0.9rem;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr;
//           }

//           .actions-grid {
//             grid-template-columns: 1fr;
//           }

//           .widgets-grid {
//             grid-template-columns: 1fr;
//           }

//           .widget-stats {
//             grid-template-columns: repeat(3, 1fr);
//             gap: 1rem;
//           }

//           .stat-item-value {
//             font-size: 1.5rem;
//           }

//           .stat-item-label {
//             font-size: 0.75rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .welcome-title {
//             font-size: 1.5rem;
//           }

//           .welcome-subtitle {
//             font-size: 0.85rem;
//           }

//           .header-btn {
//             width: 40px;
//             height: 40px;
//           }

//           .stat-card {
//             padding: 1.25rem;
//           }

//           .stat-icon-wrapper {
//             width: 52px;
//             height: 52px;
//           }

//           .stat-value {
//             font-size: 2rem;
//           }

//           .action-card {
//             padding: 1.25rem;
//           }

//           .action-icon {
//             width: 48px;
//             height: 48px;
//           }

//           .action-title {
//             font-size: 1rem;
//           }

//           .action-description {
//             font-size: 0.8rem;
//           }

//           .widget-stats {
//             grid-template-columns: 1fr;
//             gap: 1rem;
//           }

//           .widget-stat-item {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             text-align: left;
//           }

//           .stat-item-label {
//             order: -1;
//           }

//           .breadcrumb {
//             flex-wrap: wrap;
//           }
//         }

//         /* ===== ACCESSIBILITY ===== */
//         .action-card:focus {
//           outline: 3px solid ${COLORS.light};
//           outline-offset: 2px;
//         }

//         .header-btn:focus {
//           outline: 2px solid ${COLORS.accent};
//           outline-offset: 2px;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, BookOpen, Building, Clock, Users, TrendingUp,
  RefreshCw, Bell, ChevronRight, Sun, Moon, Activity, Award, AlertCircle, User
} from "lucide-react";
// import { API } from '../../config/api';

// ==================== CONSTANTS ====================
const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ==================== UTILITY FUNCTIONS ====================
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const getDayName = (dayIndex) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex] || 'Unknown';
};

const getTimeSlot = (slotIndex) => {
  const slots = [
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
  ];
  return slots[slotIndex] || 'Unknown Time';
};

const formatTime = (timeStr) => {
  if (!timeStr || timeStr === "00:00:00") return null;
  const [hour, minute] = timeStr.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

// ==================== ANIMATED COUNTER ====================
const AnimatedCounter = React.memo(({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
});

// ==================== STAT CARD ====================
const StatCard = React.memo(({ icon: Icon, label, value, color, trend, isLoading }) => (
  <div className="stat-card" style={{ borderTopColor: color }}>
    <div className="stat-icon-wrapper" style={{ background: `${color}15` }}>
      <Icon size={28} style={{ color }} />
    </div>
    <div className="stat-content">
      <div className="stat-value">
        {isLoading ? (
          <div className="skeleton-value"></div>
        ) : (
          <AnimatedCounter end={value} />
        )}
      </div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div className="stat-trend" style={{ color }}>
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  </div>
));

// ==================== ACTION CARD ====================
const ActionCard = React.memo(({ icon: Icon, title, description, link, color, badge }) => (
  <Link to={link} className="action-card">
    <div className="action-card-content">
      <div className="action-icon" style={{ background: `${color}15`, color }}>
        <Icon size={24} />
      </div>
      <div className="action-info">
        <h3 className="action-title">{title}</h3>
        <p className="action-description">{description}</p>
      </div>
      {badge && (
        <div className="action-badge" style={{ background: color }}>
          {badge}
        </div>
      )}
    </div>
    <div className="action-arrow" style={{ color }}>
      <ChevronRight size={20} />
    </div>
  </Link>
));

// ==================== QUICK STAT WIDGET ====================
const QuickStatWidget = React.memo(({ title, stats, icon: Icon }) => (
  <div className="quick-stat-widget">
    <div className="widget-header">
      <div className="widget-icon">
        <Icon size={20} />
      </div>
      <h4>{title}</h4>
    </div>
    <div className="widget-stats">
      {stats.map((stat, index) => (
        <div key={index} className="widget-stat-item">
          <div className="stat-item-value">{stat.value}</div>
          <div className="stat-item-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
));

// ==================== UPCOMING CLASS CARD ====================
const UpcomingClassCard = React.memo(({ schedule }) => (
  <div className="upcoming-class-card">
    <div className="class-time">
      <Clock size={16} />
      <span>
        {schedule.start_time && schedule.end_time 
          ? `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
          : getTimeSlot(schedule.time_slot)
        }
      </span>
    </div>
    <div className="class-details">
      <h5 className="class-subject">{schedule.subject_description}</h5>
      <p className="class-section">{schedule.course_name}</p>
      <div className="class-meta">
        <span className="class-day">{schedule.day}</span>
        <span className="class-room">
          <Building size={14} />
          {schedule.room_name}
        </span>
      </div>
    </div>
  </div>
));

// ==================== MAIN DASHBOARD COMPONENT ====================
export default function InstructorDashboard() {
  // State Management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalSubjects: 0,
    roomsAssigned: 0,
    teachingHours: 0,
  });
  const [instructor, setInstructor] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get instructor info from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        throw new Error("No user found. Please log in.");
      }

      setInstructor({
        name: storedUser.name || storedUser.email?.split('@')[0] || 'Instructor',
        email: storedUser.email,
        department: storedUser.department || 'Faculty',
        id: storedUser.id
      });

      // Fetch schedules for this instructor from the correct endpoint
      const schedRes = await fetch(`${API}/api/schedules/instructor/${storedUser.email}`);
      if (!schedRes.ok) throw new Error("Failed to fetch schedules");
      const instructorSchedules = await schedRes.json();

      setSchedules(instructorSchedules);

      // Get unique subjects
      const uniqueSubjects = new Set(instructorSchedules.map(s => s.subject_description));
      
      // Get unique rooms
      const uniqueRooms = new Set(instructorSchedules.map(s => s.room_name));

      // Calculate total hours per week (count total schedule entries)
      const totalHours = instructorSchedules.length;

      // Get today's day name
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = daysOfWeek[new Date().getDay()];

      // Get today's classes
      const todaySchedules = instructorSchedules
        .filter(s => s.day === today)
        .sort((a, b) => {
          // Sort by time slot
          return a.time_slot - b.time_slot;
        });

      setTodayClasses(todaySchedules);

      // Get upcoming classes (next 5 classes starting from today)
      const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const todayIndex = dayOrder.indexOf(today);
      
      const upcoming = instructorSchedules
        .map(s => ({
          ...s,
          dayIndex: dayOrder.indexOf(s.day)
        }))
        .filter(s => s.dayIndex !== -1 && s.dayIndex >= todayIndex)
        .sort((a, b) => {
          if (a.dayIndex === b.dayIndex) return a.time_slot - b.time_slot;
          return a.dayIndex - b.dayIndex;
        })
        .slice(0, 5);

      setUpcomingClasses(upcoming);

      setStats({
        totalSubjects: uniqueSubjects.size,
        roomsAssigned: uniqueRooms.size,
        teachingHours: totalHours,
      });

      setLoading(false);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Failed to load dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Greeting message
  const greeting = useMemo(() => getGreeting(), []);

  // Handle refresh
  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className={`instructor-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* Error Alert */}
      {error && (
        <div className="error-alert">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="welcome-section">
              <h1 className="welcome-title">
                {greeting}, {instructor?.name || 'Instructor'}! 👋
              </h1>
              <p className="welcome-subtitle">
                Here's your overview for today — {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          <div className="header-right">
            <button
              className="header-btn theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="header-btn refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Refresh Dashboard"
            >
              <RefreshCw size={20} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">Dashboard</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <div className="stats-grid">
          <StatCard
            icon={BookOpen}
            label="Total Subjects"
            value={stats.totalSubjects}
            color={COLORS.primary}
            trend="Teaching this semester"
            isLoading={loading}
          />
          <StatCard
            icon={Building}
            label="Rooms Assigned"
            value={stats.roomsAssigned}
            color="#10b981"
            trend="Active locations"
            isLoading={loading}
          />
          <StatCard
            icon={Clock}
            label="Teaching Hours"
            value={stats.teachingHours}
            color={COLORS.accent}
            trend="Per week"
            isLoading={loading}
          />
        </div>
      </div>

      {/* Quick Actions - Only 3 cards */}
      <div className="actions-section">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-subtitle">Access your essential features</p>
        </div>

        <div className="actions-grid-simple">
          <ActionCard
            icon={Calendar}
            title="My Schedule"
            description="View your complete weekly schedule"
            link="/instructor/schedule"
            color={COLORS.primary}
            badge={upcomingClasses.length > 0 ? "Active" : null}
          />
          <ActionCard
            icon={Clock}
            title="Update Availability"
            description="Manage your teaching availability"
            link="/instructor/availability"
            color="#f59e0b"
          />
          <ActionCard
            icon={User}
            title="View Profile"
            description="View and update your profile information"
            link="/instructor/profile"
            color="#8b5cf6"
          />
        </div>
      </div>

      {/* Today's Schedule & Upcoming Classes */}
      <div className="content-row">
        {/* Today's Classes */}
        <div className="upcoming-section">
          <div className="section-header">
            <h2 className="section-title">Today's Classes</h2>
            <p className="section-subtitle">Your schedule for today</p>
          </div>
          <div className="upcoming-classes-list">
            {loading ? (
              <div className="loading-state">Loading classes...</div>
            ) : todayClasses.length > 0 ? (
              todayClasses.map((schedule, index) => (
                <UpcomingClassCard key={index} schedule={schedule} />
              ))
            ) : (
              <div className="empty-state">
                <Calendar size={48} />
                <p>No classes scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming This Week */}
        <div className="upcoming-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming This Week</h2>
            <p className="section-subtitle">Next classes in your schedule</p>
          </div>
          <div className="upcoming-classes-list">
            {loading ? (
              <div className="loading-state">Loading classes...</div>
            ) : upcomingClasses.length > 0 ? (
              upcomingClasses.map((schedule, index) => (
                <UpcomingClassCard key={index} schedule={schedule} />
              ))
            ) : (
              <div className="empty-state">
                <Calendar size={48} />
                <p>No upcoming classes this week</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .instructor-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          transition: all 0.3s ease;
        }

        .instructor-dashboard.dark-mode {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #e0e0e0;
        }

        /* ===== ERROR ALERT ===== */
        .error-alert {
          background: #fee2e2;
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #dc2626;
          animation: slideDown 0.3s ease;
        }

        .dark-mode .error-alert {
          background: #7f1d1d;
          border-color: #dc2626;
          color: #fecaca;
        }

        /* ===== DASHBOARD HEADER ===== */
        .dashboard-header {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
          animation: slideDown 0.5s ease;
        }

        .dark-mode .dashboard-header {
          background: #1e293b;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1.5rem;
          
          
        }

        .header-left {
          flex: 1;
        }

        .welcome-section {
          animation: fadeIn 0.8s ease;
        }

        .welcome-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.5rem 0;
        }

        .welcome-subtitle {
          font-size: 1rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
          margin: 0;
        }

        .dark-mode .welcome-subtitle {
          color: #94a3b8;
        }

        .header-right {
          display: flex;
          gap: 0.75rem;
        }

        .header-btn {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.lightest};
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${COLORS.primary};
        }

        .header-btn:hover {
          background: ${COLORS.lighter};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
        }

        .header-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dark-mode .header-btn {
          background: #334155;
          color: #e0e0e0;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ===== BREADCRUMB ===== */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .breadcrumb-item.active {
          color: ${COLORS.primary};
          font-weight: 600;
          opacity: 1;
        }

        .breadcrumb-separator {
          opacity: 0.5;
        }

        /* ===== STATS SECTION ===== */
        .stats-section {
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-top: 4px solid;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .dark-mode .stat-card {
          background: #1e293b;
        }

        .stat-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .dark-mode .stat-value {
          color: #e0e0e0;
        }

        .stat-label {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .dark-mode .stat-label {
          color: #94a3b8;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .skeleton-value {
          width: 80px;
          height: 40px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ===== ACTIONS SECTION ===== */
        .actions-section {
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .dark-mode .section-title {
          color: #e0e0e0;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        .dark-mode .section-subtitle {
          color: #94a3b8;
        }

        .actions-grid-simple {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .action-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          animation: fadeInUp 0.6s ease;
        }

        .action-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: ${COLORS.lighter};
        }

        .dark-mode .action-card {
          background: #1e293b;
        }

        .action-card-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .action-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .action-info {
          flex: 1;
        }

        .action-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.35rem 0;
        }

        .dark-mode .action-title {
          color: #e0e0e0;
        }

        .action-description {
          font-size: 0.875rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
          line-height: 1.4;
        }

        .dark-mode .action-description {
          color: #94a3b8;
        }

        .action-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .action-arrow {
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .action-card:hover .action-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        /* ===== CONTENT ROW ===== */
        .content-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        /* ===== UPCOMING CLASSES ===== */
        .upcoming-section {
          grid-column: auto;
        }

        .upcoming-classes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .upcoming-class-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease;
        }

        .upcoming-class-card:hover {
          transform: translateX(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .dark-mode .upcoming-class-card {
          background: #1e293b;
        }

        .class-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: ${COLORS.accent};
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .class-details {
          padding-left: 1.5rem;
        }

        .class-subject {
          font-size: 1.1rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.25rem 0;
        }

        .dark-mode .class-subject {
          color: #e0e0e0;
        }

        .class-section {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
          margin: 0 0 0.75rem 0;
        }

        .dark-mode .class-section {
          color: #94a3b8;
        }

        .class-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
        }

        .class-day {
          padding: 0.25rem 0.75rem;
          background: ${COLORS.lightest};
          border-radius: 6px;
          color: ${COLORS.primary};
          font-weight: 600;
        }

        .dark-mode .class-day {
          background: #334155;
          color: ${COLORS.lighter};
        }

        .class-room {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        .dark-mode .class-room {
          color: #94a3b8;
        }

        .loading-state,
        .empty-state {
          background: white;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          color: ${COLORS.secondary};
        }

        .dark-mode .loading-state,
        .dark-mode .empty-state {
          background: #1e293b;
          color: #94a3b8;
        }

        .empty-state svg {
          margin: 0 auto 1rem;
          opacity: 0.5;
          color: ${COLORS.accent};
        }

        .empty-state p {
          margin: 0;
          font-size: 1rem;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1200px) {
          .actions-grid-simple {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }

          .content-row {
            grid-template-columns: 1fr;
          }

          .upcoming-section {
            grid-column: 1;
          }
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .instructor-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            padding: 1.5rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-right {
            width: 100%;
            justify-content: flex-end;
          }

          .welcome-title {
            font-size: 1.75rem;
          }

          .welcome-subtitle {
            font-size: 0.9rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid-simple {
            grid-template-columns: 1fr;
          }

          .content-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .welcome-title {
            font-size: 1.5rem;
          }

          .welcome-subtitle {
            font-size: 0.85rem;
          }

          .header-btn {
            width: 40px;
            height: 40px;
          }

          .stat-card {
            padding: 1.25rem;
          }

          .stat-icon-wrapper {
            width: 52px;
            height: 52px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .action-card {
            padding: 1.25rem;
          }

          .action-icon {
            width: 48px;
            height: 48px;
          }

          .action-title {
            font-size: 1rem;
          }

          .action-description {
            font-size: 0.8rem;
          }

          .breadcrumb {
            flex-wrap: wrap;
          }

          .class-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        /* ===== ACCESSIBILITY ===== */
        .action-card:focus {
          outline: 3px solid ${COLORS.light};
          outline-offset: 2px;
        }

        .header-btn:focus {
          outline: 2px solid ${COLORS.accent};
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}