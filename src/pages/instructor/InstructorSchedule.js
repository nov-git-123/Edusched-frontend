// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorSchedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Get logged-in email from localStorage
//     const userEmail = localStorage.getItem("userEmail");
//     console.log("📌 Logged in as:", userEmail);

//     if (!userEmail) {
//       setError("No logged-in email found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     fetch(`${API}/api/schedules/instructor/${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           setError(data.error);
//         } else {
//           setSchedule(data);
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load your schedule.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Spinner animation="border" />;

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         <h5 className="mb-3">My Schedule</h5>
//         {error ? (
//           <Alert variant="danger">{error}</Alert>
//         ) : schedule.length === 0 ? (
//           <p>No schedule assigned yet.</p>
//         ) : (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Course</th>
//                 <th>Room</th>
//                 <th>Day</th>
//                 <th>Time Slot</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schedule.map((s) => (
//                 <tr key={s.id}>
//                   {/* ✅ Fixed field name */}
//                   <td>{s.subject_description}</td>
//                   <td>{s.course_name}</td>
//                   <td>{s.room_name}</td>
//                   <td>{s.day}</td>
//                   <td>{s.time_slot}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorSchedule;

// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";
// import '../../styles/InstructorSchedule.css'; // Custom CSS for design enhancements

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorSchedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Get logged-in email from localStorage
//     const userEmail = localStorage.getItem("userEmail");
//     console.log("📌 Logged in as:", userEmail);

//     if (!userEmail) {
//       setError("No logged-in email found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     fetch(`${API}/api/schedules/instructor/${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           setError(data.error);
//         } else {
//           setSchedule(data);
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load your schedule.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="spinner-container">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="shadow-lg border-0">
//       <Card.Body>
//         <h5 className="mb-4 schedule-heading">My Schedule</h5>
//         {error ? (
//           <Alert variant="danger" className="error-alert">{error}</Alert>
//         ) : schedule.length === 0 ? (
//           <p>No schedule assigned yet.</p>
//         ) : (
//           <Table striped bordered hover responsive className="schedule-table">
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Course</th>
//                 <th>Room</th>
//                 <th>Day</th>
//                 <th>Time Slot</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schedule.map((s) => (
//                 <tr key={s.id}>
//                   <td>{s.subject_description}</td>
//                   <td>{s.course_name}</td>
//                   <td>{s.room_name}</td>
//                   <td>{s.day}</td>
//                   <td>{s.time_slot}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorSchedule;

//functional
// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";
// import '../../styles/InstructorSchedule.css';

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorSchedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // ✅ Get full user info from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     console.log("👤 Stored user:", storedUser);

//     if (!storedUser || !storedUser.email) {
//       setError("No logged-in user found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const userEmail = storedUser.email;
//     console.log("📌 Fetching schedule for:", userEmail);

//     // ✅ Fetch schedule using instructor email
//     fetch(`${API}/api/schedules/instructor/${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("📦 Schedule data:", data);
//         if (data.error) {
//           setError(data.error);
//         } else if (Array.isArray(data) && data.length > 0) {
//           setSchedule(data);
//         } else {
//           setError("No schedule assigned yet.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Fetch error:", err);
//         setError("Failed to load your schedule. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="spinner-container">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="shadow-lg border-0">
//       <Card.Body>
//         <h5 className="mb-4 schedule-heading">My Schedule</h5>

//         {error ? (
//           <Alert variant="danger" className="error-alert">{error}</Alert>
//         ) : (
//           <Table striped bordered hover responsive className="schedule-table">
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Course</th>
//                 <th>Room</th>
//                 <th>Day</th>
//                 <th>Time Slot</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schedule.map((s) => (
//                 <tr key={s.id}>
//                   <td>{s.subject_description}</td>
//                   <td>{s.course_name}</td>
//                   <td>{s.room_name}</td>
//                   <td>{s.day}</td>
//                   <td>{s.time_slot}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorSchedule;

//Functional

// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";
// import "../../styles/InstructorSchedule.css";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorSchedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Helper to format time like "10:43 AM"
//   const formatTime = (timeStr) => {
//     if (!timeStr) return "";
//     const [hours, minutes] = timeStr.split(":");
//     const date = new Date();
//     date.setHours(parseInt(hours), parseInt(minutes));
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser || !storedUser.email) {
//       setError("No logged-in user found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const userEmail = storedUser.email;
//     fetch(`${API}/api/schedules/instructor/${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("📦 Schedule data:", data);

//         if (data.error) {
//           setError(data.error);
//         } else if (Array.isArray(data) && data.length > 0) {
//           setSchedule(data);
//         } else {
//           setError("No schedule assigned yet.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Fetch error:", err);
//         setError("Failed to load your schedule. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   // ✅ Group schedule by subject + room
//   const groupedSchedule = {};
//   schedule.forEach((item) => {
//     const key = `${item.subject_description}-${item.room_name}`;
//     if (!groupedSchedule[key]) {
//       groupedSchedule[key] = {
//         subject: item.subject_description,
//         course: item.course_name,
//         room: item.room_name,
//         days: {},
//       };
//     }
//     const timeRange = `${formatTime(item.start_time)} - ${formatTime(item.end_time)}`;
//     groupedSchedule[key].days[item.day] = timeRange;
//   });

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   if (loading) {
//     return (
//       <div className="spinner-container">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="shadow-lg border-0">
//       <Card.Body>
//         <h5 className="mb-4 schedule-heading">My Schedule</h5>

//         {error ? (
//           <Alert variant="danger" className="error-alert">
//             {error}
//           </Alert>
//         ) : (
//           <Table striped bordered hover responsive className="schedule-table text-center">
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Room</th>
//                 {daysOfWeek.map((day) => (
//                   <th key={day}>{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Object.values(groupedSchedule).map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.subject}</td>
//                   <td>{row.room}</td>
//                   {daysOfWeek.map((day) => (
//                     <td key={day}>{row.days[day] || "-"}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorSchedule;

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { 
//   Calendar, Clock, User, BookOpen, Building, RefreshCw,
//   Download, Grid, List, CheckCircle, AlertCircle, Info
// } from "lucide-react";

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ==================== UTILITY FUNCTIONS ====================
// /**
//  * Converts 24-hour time format (HH:MM:SS) to 12-hour format with AM/PM
//  * @param {string} timeStr - Time string in HH:MM:SS format
//  * @returns {string|null} - Formatted time or null if invalid
//  */
// const formatTime = (timeStr) => {
//   if (!timeStr || timeStr === "00:00:00") return null;
//   const [hour, minute] = timeStr.split(":").map(Number);
//   const period = hour >= 12 ? "PM" : "AM";
//   const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
//   return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${period}`;
// };

// /**
//  * Converts slot index to time range
//  * @param {number} slotIndex - Slot index (e.g., 0, 1, 2...)
//  * @returns {string} - Time range (e.g., "8:00 AM - 9:00 AM")
//  */
// const slotToTime = (slotIndex) => {
//   const startHour = 7 + Number(slotIndex);
//   const endHour = startHour + 1;

//   const formatSlot = (hour) => {
//     const period = hour >= 12 ? "PM" : "AM";
//     const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//     return `${adjusted}:00 ${period}`;
//   };

//   return `${formatSlot(startHour)} - ${formatSlot(endHour)}`;
// };

// // ==================== TOAST NOTIFICATION ====================
// const Toast = React.memo(({ message, type, onClose }) => {
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(onClose, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, onClose]);

//   if (!message) return null;

//   const styles = {
//     success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', Icon: CheckCircle },
//     danger: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', Icon: AlertCircle },
//     info: { bg: '#d1ecf1', border: '#bee5eb', color: '#0c5460', Icon: Info },
//   };

//   const style = styles[type] || styles.success;
//   const Icon = style.Icon;

//   return (
//     <div className="toast-notification" style={{ 
//       background: style.bg, 
//       borderColor: style.border, 
//       color: style.color 
//     }}>
//       <Icon size={20} />
//       <span>{message}</span>
//     </div>
//   );
// });

// // ==================== LOADING SKELETON ====================
// const Skeleton = React.memo(({ width = '100%', height = '40px' }) => (
//   <div className="skeleton" style={{ width, height }} />
// ));

// const ScheduleSkeleton = React.memo(() => (
//   <div className="schedule-skeleton">
//     {[1, 2, 3, 4].map(i => (
//       <div key={i} className="skeleton-row">
//         <Skeleton width="200px" height="60px" />
//         <Skeleton width="120px" height="60px" />
//         {DAYS_ORDER.map(day => (
//           <Skeleton key={day} height="60px" />
//         ))}
//       </div>
//     ))}
//   </div>
// ));

// // ==================== STATS CARD ====================
// const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
//   <div className="stats-card" style={{ borderTopColor: color }}>
//     <div className="stats-icon" style={{ background: `${color}20`, color }}>
//       <Icon size={24} />
//     </div>
//     <div className="stats-content">
//       <div className="stats-value">{value}</div>
//       <div className="stats-label">{label}</div>
//     </div>
//   </div>
// ));

// // ==================== TIME SLOT CELL ====================
// const TimeSlotCell = React.memo(({ timeRange, room }) => {
//   if (!timeRange) {
//     return <div className="empty-slot">—</div>;
//   }

//   return (
//     <div className="time-slot" title={room ? `Room: ${room}` : ''}>
//       <div className="time-range">
//         <Clock size={12} />
//         {timeRange}
//       </div>
//       {room && <div className="slot-room">{room}</div>}
//     </div>
//   );
// });

// // ==================== SCHEDULE ROW ====================
// const ScheduleRow = React.memo(({ row, viewMode }) => {
//   if (viewMode === 'card') {
//     return (
//       <div className="schedule-card-item">
//         <div className="card-header">
//           <div className="card-subject">
//             <BookOpen size={18} />
//             {row.subject}
//           </div>
//           <div className="card-course">{row.course}</div>
//         </div>
//         <div className="card-body">
//           <div className="card-info">
//             <Building size={14} />
//             <span>Room: {row.room}</span>
//           </div>
//           <div className="card-schedule">
//             {DAYS_ORDER.map(day => (
//               row.days[day] && (
//                 <div key={day} className="card-day-item">
//                   <span className="day-badge">{day}</span>
//                   <span className="time-text">{row.days[day]}</span>
//                 </div>
//               )
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <tr className="schedule-row">
//       <td className="subject-cell">
//         <div className="subject-wrapper">
//           <BookOpen size={16} className="subject-icon" />
//           <div>
//             <div className="subject-name">{row.subject}</div>
//             <div className="course-name">{row.course}</div>
//           </div>
//         </div>
//       </td>
//       <td className="room-cell">
//         <div className="room-wrapper">
//           <Building size={14} />
//           {row.room}
//         </div>
//       </td>
//       {DAYS_ORDER.map(day => (
//         <td key={day} className="day-cell">
//           <TimeSlotCell timeRange={row.days[day]} room={row.room} />
//         </td>
//       ))}
//     </tr>
//   );
// });

// // ==================== SCHEDULE TABLE ====================
// const ScheduleTable = React.memo(({ groupedSchedule, viewMode }) => {
//   if (viewMode === 'card') {
//     return (
//       <div className="schedule-cards">
//         {Object.values(groupedSchedule).map((row, index) => (
//           <ScheduleRow key={index} row={row} viewMode="card" />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="schedule-table">
//         <thead>
//           <tr>
//             <th style={{ width: '200px' }}>Subject</th>
//             <th style={{ width: '120px' }}>Room</th>
//             {DAYS_ORDER.map(day => (
//               <th key={day} className="day-header">{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Object.values(groupedSchedule).map((row, index) => (
//             <ScheduleRow key={index} row={row} viewMode="table" />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function InstructorSchedule() {
//   // State Management
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [instructorInfo, setInstructorInfo] = useState(null);
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
//   const [toast, setToast] = useState({ message: '', type: '' });

//   /**
//    * Fetch instructor schedule from API
//    * Uses email from localStorage to identify the instructor
//    */
//   const fetchSchedule = useCallback(async () => {
//     setLoading(true);
    
//     try {
//       // Get user info from localStorage
//       const storedUser = JSON.parse(localStorage.getItem("user"));
      
//       if (!storedUser || !storedUser.email) {
//         throw new Error("No logged-in user found. Please log in again.");
//       }

//       const userEmail = storedUser.email;
//       setInstructorInfo({
//         name: storedUser.name || storedUser.email.split('@')[0],
//         email: storedUser.email
//       });

//       // Fetch schedule data
//       const res = await fetch(`${API}/api/schedules/instructor/${userEmail}`);
//       const data = await res.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       if (Array.isArray(data) && data.length > 0) {
//         setSchedule(data);
//         showToast('Schedule loaded successfully', 'success');
//       } else {
//         setSchedule([]);
//         showToast('No schedule assigned yet', 'info');
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       showToast(err.message || 'Failed to load schedule', 'danger');
//       setSchedule([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchSchedule();
//   }, [fetchSchedule]);

//   /**
//    * Group schedule by subject and room
//    * Consolidates multiple time slots for the same subject/room combination
//    */
//   const groupedSchedule = useMemo(() => {
//     const grouped = {};
    
//     schedule.forEach((item) => {
//       const key = `${item.subject_description}-${item.room_name}`;
      
//       if (!grouped[key]) {
//         grouped[key] = {
//           subject: item.subject_description,
//           course: item.course_name,
//           room: item.room_name,
//           days: {},
//         };
//       }

//       // Format time: prefer actual start_time/end_time, fallback to slot
//       let timeRange;
//       const start = formatTime(item.start_time);
//       const end = formatTime(item.end_time);

//       if (start && end) {
//         timeRange = `${start} - ${end}`;
//       } else {
//         timeRange = slotToTime(item.time_slot);
//       }

//       grouped[key].days[item.day] = timeRange;
//     });

//     return grouped;
//   }, [schedule]);

//   /**
//    * Calculate schedule statistics
//    */
//   const stats = useMemo(() => {
//     const uniqueSubjects = new Set(schedule.map(s => s.subject_description)).size;
//     const uniqueRooms = new Set(schedule.map(s => s.room_name)).size;
//     const totalSlots = schedule.length;
    
//     // Calculate total hours (assuming 1 hour per slot)
//     const totalHours = totalSlots;

//     return {
//       subjects: uniqueSubjects,
//       rooms: uniqueRooms,
//       slots: totalSlots,
//       hours: totalHours,
//     };
//   }, [schedule]);

//   /**
//    * Export schedule to CSV
//    */
//   const handleExport = () => {
//     const csvHeaders = ['Subject', 'Course', 'Room', ...DAYS_ORDER];
//     const csvRows = Object.values(groupedSchedule).map(row => [
//       row.subject,
//       row.course,
//       row.room,
//       ...DAYS_ORDER.map(day => row.days[day] || '-')
//     ]);

//     const csvContent = [
//       csvHeaders.join(','),
//       ...csvRows.map(row => row.join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `schedule_${instructorInfo?.name || 'instructor'}.csv`;
//     link.click();
    
//     showToast('Schedule exported successfully', 'success');
//   };

//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast({ message: '', type: '' }), 4000);
//   };

//   return (
//     <div className="instructor-schedule">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

//       {/* Page Header */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <Calendar size={32} />
//             </div>
//             <div>
//               <h1 className="page-title">My Schedule</h1>
//               {instructorInfo && (
//                 <p className="page-subtitle">
//                   <User size={16} />
//                   {instructorInfo.name} • {instructorInfo.email}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="header-actions">
//             <div className="view-toggle">
//               <button
//                 className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
//                 onClick={() => setViewMode('table')}
//                 title="Table View"
//               >
//                 <List size={18} />
//               </button>
//               <button
//                 className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
//                 onClick={() => setViewMode('card')}
//                 title="Card View"
//               >
//                 <Grid size={18} />
//               </button>
//             </div>

//             <button
//               className="action-btn export"
//               onClick={handleExport}
//               disabled={schedule.length === 0}
//             >
//               <Download size={18} />
//               Export
//             </button>

//             <button
//               className="action-btn refresh"
//               onClick={fetchSchedule}
//               disabled={loading}
//             >
//               <RefreshCw size={18} className={loading ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         {schedule.length > 0 && (
//           <div className="stats-grid">
//             <StatsCard
//               icon={BookOpen}
//               label="Subjects"
//               value={stats.subjects}
//               color={COLORS.accent}
//             />
//             <StatsCard
//               icon={Building}
//               label="Rooms"
//               value={stats.rooms}
//               color={COLORS.light}
//             />
//             <StatsCard
//               icon={Calendar}
//               label="Class Slots"
//               value={stats.slots}
//               color={COLORS.lighter}
//             />
//             <StatsCard
//               icon={Clock}
//               label="Total Hours"
//               value={stats.hours}
//               color={COLORS.primary}
//             />
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="content-section">
//         {loading ? (
//           <ScheduleSkeleton />
//         ) : schedule.length === 0 ? (
//           <div className="empty-state">
//             <Calendar size={64} className="empty-icon" />
//             <h3>No Schedule Assigned</h3>
//             <p>You don't have any classes scheduled yet. Check back later or contact your administrator.</p>
//           </div>
//         ) : (
//           <>
//             <div className="schedule-header">
//               <h2>Weekly Schedule</h2>
//               <p className="schedule-info">
//                 Showing {Object.keys(groupedSchedule).length} subject{Object.keys(groupedSchedule).length !== 1 ? 's' : ''}
//               </p>
//             </div>
//             <ScheduleTable groupedSchedule={groupedSchedule} viewMode={viewMode} />
//           </>
//         )}
//       </div>

//       {/* Inline Styles */}
//       <style jsx>{`
//         .instructor-schedule {
//           min-height: 100vh;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           padding: 2rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== TOAST NOTIFICATION ===== */
//         .toast-notification {
//           position: fixed;
//           top: 2rem;
//           right: 2rem;
//           z-index: 10000;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 1rem 1.5rem;
//           border-radius: 12px;
//           border: 2px solid;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           animation: slideInRight 0.3s ease;
//           max-width: 400px;
//         }

//         /* ===== PAGE HEADER ===== */
//         .page-header {
//           margin-bottom: 2rem;
//         }

//         .header-content {
//           background: white;
//           padding: 2rem;
//           border-radius: 16px;
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 2rem;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//         }

//         .header-title-group {
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           flex: 1;
//         }

//         .header-icon {
//           width: 64px;
//           height: 64px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           border-radius: 16px;
//           color: white;
//         }

//         .page-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//           letter-spacing: -0.5px;
//         }

//         .page-subtitle {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           margin: 0;
//           opacity: 0.8;
//         }

//         .header-actions {
//           display: flex;
//           gap: 1rem;
//           align-items: center;
//         }

//         .view-toggle {
//           display: flex;
//           background: #f0f0f0;
//           border-radius: 10px;
//           padding: 0.25rem;
//         }

//         .toggle-btn {
//           display: flex;
//           align-items: center;
//           padding: 0.5rem 0.75rem;
//           background: transparent;
//           border: none;
//           border-radius: 8px;
//           color: ${COLORS.secondary};
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .toggle-btn:hover {
//           background: #e0e0e0;
//         }

//         .toggle-btn.active {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .action-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.75rem 1.25rem;
//           border: none;
//           border-radius: 10px;
//           font-size: 0.95rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }

//         .action-btn.export {
//           background: ${COLORS.accent};
//           color: white;
//         }

//         .action-btn.export:hover:not(:disabled) {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         .action-btn.refresh {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .action-btn.refresh:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .action-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== STATS GRID ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1.5rem;
//         }

//         .stats-card {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           border-top: 4px solid;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           transition: transform 0.2s ease;
//         }

//         .stats-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
//         }

//         .stats-icon {
//           width: 56px;
//           height: 56px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//         }

//         .stats-content {
//           flex: 1;
//         }

//         .stats-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           line-height: 1;
//         }

//         .stats-label {
//           font-size: 0.9rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin-top: 0.25rem;
//         }

//         /* ===== CONTENT SECTION ===== */
//         .content-section {
//           background: white;
//           border-radius: 16px;
//                     box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
//           padding: 2rem;
//           margin-top: 2rem;
//         }

//         .schedule-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .schedule-header h2 {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: ${COLORS.primary};
//           margin: 0;
//         }

//         .schedule-info {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           opacity: 0.8;
//         }

//         /* ===== SCHEDULE TABLE ===== */
//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .schedule-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.95rem;
//         }

//         .schedule-table th {
//           background: ${COLORS.primary};
//           color: white;
//           padding: 0.75rem 1rem;
//           text-align: center;
//           font-weight: 600;
//         }

//         .schedule-table td {
//           text-align: center;
//           padding: 1rem;
//           border-bottom: 1px solid #e5e7eb;
//           vertical-align: middle;
//         }

//         .subject-cell {
//           text-align: left;
//         }

//         .subject-wrapper {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .subject-icon {
//           color: ${COLORS.accent};
//         }

//         .subject-name {
//           font-weight: 600;
//           color: ${COLORS.primary};
//         }

//         .course-name {
//           font-size: 0.85rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .room-wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           color: ${COLORS.secondary};
//         }

//         .day-cell {
//           font-size: 0.9rem;
//         }

//         /* ===== TIME SLOT CELL ===== */
//         .time-slot {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.25rem;
//           background: ${COLORS.lightest};
//           border-radius: 8px;
//           padding: 0.5rem 0.75rem;
//           font-size: 0.85rem;
//         }

//         .time-range {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           font-weight: 500;
//           color: ${COLORS.primary};
//         }

//         .slot-room {
//           font-size: 0.8rem;
//           color: ${COLORS.secondary};
//           opacity: 0.8;
//         }

//         .empty-slot {
//           color: #aaa;
//           font-style: italic;
//         }

//         /* ===== CARD VIEW ===== */
//         .schedule-cards {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         .schedule-card-item {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//           padding: 1.25rem;
//         }

//         .schedule-card-item:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//         }

//         .card-subject {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 600;
//           color: ${COLORS.primary};
//         }

//         .card-course {
//           font-size: 0.9rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .card-info {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: ${COLORS.secondary};
//           margin-bottom: 0.75rem;
//         }

//         .card-schedule {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .card-day-item {
//           display: flex;
//           justify-content: space-between;
//           background: ${COLORS.lightest};
//           border-radius: 8px;
//           padding: 0.5rem 0.75rem;
//         }

//         .day-badge {
//           background: ${COLORS.accent};
//           color: white;
//           font-size: 0.8rem;
//           font-weight: 600;
//           border-radius: 6px;
//           padding: 0.25rem 0.5rem;
//         }

//         .time-text {
//           font-size: 0.85rem;
//           color: ${COLORS.primary};
//         }

//         /* ===== EMPTY STATE ===== */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 1rem;
//           color: ${COLORS.secondary};
//         }

//         .empty-icon {
//           color: ${COLORS.light};
//           margin-bottom: 1rem;
//         }

//         .empty-state h3 {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//         }

//         .empty-state p {
//           max-width: 480px;
//           margin: 0 auto;
//           color: ${COLORS.secondary};
//           opacity: 0.8;
//         }

//         /* ===== SKELETON ===== */
//         .skeleton {
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
//           background-size: 400% 100%;
//           animation: shimmer 1.4s ease infinite;
//           border-radius: 8px;
//         }

//         .skeleton-row {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         @keyframes shimmer {
//           0% { background-position: -400px 0; }
//           100% { background-position: 400px 0; }
//         }

//         /* ===== ANIMATIONS ===== */
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         /* ===== RESPONSIVE ===== */
//         @media (max-width: 768px) {
//           .header-content {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr 1fr;
//           }

//           .page-title {
//             font-size: 1.5rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .stats-grid {
//             grid-template-columns: 1fr;
//           }

//           .header-actions {
//             flex-direction: column;
//             width: 100%;
//           }

//           .view-toggle {
//             width: 100%;
//             justify-content: space-around;
//           }

//           .schedule-table th,
//           .schedule-table td {
//             padding: 0.5rem;
//             font-size: 0.85rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { 
  Calendar, Clock, User, BookOpen, Building, RefreshCw,
  Download, Grid, List, CheckCircle, AlertCircle, Info
} from "lucide-react";

// ==================== CONSTANTS ====================
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

// ==================== UTILITY FUNCTIONS ====================
/**
 * Converts 24-hour time format (HH:MM:SS) to 12-hour format with AM/PM
 * @param {string} timeStr - Time string in HH:MM:SS format
 * @returns {string|null} - Formatted time or null if invalid
 */
const formatTime = (timeStr) => {
  if (!timeStr || timeStr === "00:00:00") return null;
  const [hour, minute] = timeStr.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

/**
 * Converts slot index to time range
 * @param {number} slotIndex - Slot index (e.g., 0, 1, 2...)
 * @returns {string} - Time range (e.g., "8:00 AM - 9:00 AM")
 */
const slotToTime = (slotIndex) => {
  const startHour = 7 + Number(slotIndex);
  const endHour = startHour + 1;

  const formatSlot = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const adjusted = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjusted}:00 ${period}`;
  };

  return `${formatSlot(startHour)} - ${formatSlot(endHour)}`;
};

// ==================== TOAST NOTIFICATION ====================
const Toast = React.memo(({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', Icon: CheckCircle },
    danger: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', Icon: AlertCircle },
    info: { bg: '#d1ecf1', border: '#bee5eb', color: '#0c5460', Icon: Info },
  };

  const style = styles[type] || styles.success;
  const Icon = style.Icon;

  return (
    <div className="toast-notification" style={{ 
      background: style.bg, 
      borderColor: style.border, 
      color: style.color 
    }}>
      <Icon size={20} />
      <span>{message}</span>
    </div>
  );
});

// ==================== LOADING SKELETON ====================
const Skeleton = React.memo(({ width = '100%', height = '40px' }) => (
  <div className="skeleton" style={{ width, height }} />
));

const ScheduleSkeleton = React.memo(() => (
  <div className="schedule-skeleton">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="skeleton-row">
        <Skeleton width="200px" height="60px" />
        <Skeleton width="120px" height="60px" />
        {DAYS_ORDER.map(day => (
          <Skeleton key={day} height="60px" />
        ))}
      </div>
    ))}
  </div>
));

// ==================== STATS CARD ====================
const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
  <div className="stats-card" style={{ borderTopColor: color }}>
    <div className="stats-icon" style={{ background: `${color}20`, color }}>
      <Icon size={24} />
    </div>
    <div className="stats-content">
      <div className="stats-value">{value}</div>
      <div className="stats-label">{label}</div>
    </div>
  </div>
));

// ==================== TIME SLOT CELL ====================
const TimeSlotCell = React.memo(({ timeRange, room }) => {
  if (!timeRange) {
    return <div className="empty-slot">—</div>;
  }

  return (
    <div className="time-slot" title={room ? `Room: ${room}` : ''}>
      <div className="time-range">
        <Clock size={12} />
        {timeRange}
      </div>
      {room && <div className="slot-room">{room}</div>}
    </div>
  );
});

// ==================== SCHEDULE ROW ====================
const ScheduleRow = React.memo(({ row, viewMode }) => {
  if (viewMode === 'card') {
    return (
      <div className="schedule-card-item">
        <div className="card-header">
          <div className="card-subject">
            <BookOpen size={18} />
            {row.subject}
          </div>
          <div className="card-course">{row.course}</div>
        </div>
        <div className="card-body">
          <div className="card-info">
            <Building size={14} />
            <span>Room: {row.room}</span>
          </div>
          <div className="card-schedule">
            {DAYS_ORDER.map(day => (
              row.days[day] && (
                <div key={day} className="card-day-item">
                  <span className="day-badge">{day}</span>
                  <span className="time-text">{row.days[day]}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr className="schedule-row">
      <td className="subject-cell">
        <div className="subject-wrapper">
          <BookOpen size={16} className="subject-icon" />
          <div>
            <div className="subject-name">{row.subject}</div>
            <div className="course-name">{row.course}</div>
          </div>
        </div>
      </td>
      <td className="room-cell">
        <div className="room-wrapper">
          <Building size={14} />
          {row.room}
        </div>
      </td>
      {DAYS_ORDER.map(day => (
        <td key={day} className="day-cell">
          <TimeSlotCell timeRange={row.days[day]} room={row.room} />
        </td>
      ))}
    </tr>
  );
});

// ==================== SCHEDULE TABLE ====================
const ScheduleTable = React.memo(({ groupedSchedule, viewMode }) => {
  if (viewMode === 'card') {
    return (
      <div className="schedule-cards">
        {groupedSchedule.map((row, index) => (
          <ScheduleRow key={index} row={row} viewMode="card" />
        ))}
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th style={{ width: '200px' }}>Subject</th>
            <th style={{ width: '120px' }}>Room</th>
            {DAYS_ORDER.map(day => (
              <th key={day} className="day-header">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedSchedule.map((row, index) => (
            <ScheduleRow key={index} row={row} viewMode="table" />
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function InstructorSchedule() {
  // State Management
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructorInfo, setInstructorInfo] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [toast, setToast] = useState({ message: '', type: '' });

  /**
   * Fetch instructor schedule from API
   * Uses email from localStorage to identify the instructor
   */
  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    
    try {
      // Get user info from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      if (!storedUser || !storedUser.email) {
        throw new Error("No logged-in user found. Please log in again.");
      }

      const userEmail = storedUser.email;
      setInstructorInfo({
        name: storedUser.name || storedUser.email.split('@')[0],
        email: storedUser.email
      });

      // Fetch schedule data
      const res = await fetch(`${API}/api/schedules/instructor/${userEmail}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (Array.isArray(data) && data.length > 0) {
        setSchedule(data);
        showToast('Schedule loaded successfully', 'success');
      } else {
        setSchedule([]);
        showToast('No schedule assigned yet', 'info');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showToast(err.message || 'Failed to load schedule', 'danger');
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  /**
   * Group schedule by subject and room
   * Consolidates multiple time slots for the same subject/room combination
   */
  const groupedSchedule = useMemo(() => {
    const grouped = {};
    
    schedule.forEach((item) => {
      // Create a unique key combining subject and room
      const key = `${item.subject_description}|||${item.room_name}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          subject: item.subject_description,
          course: item.course_name,
          room: item.room_name,
          days: {},
        };
      }

      // Format time: prefer actual start_time/end_time, fallback to slot
      let timeRange;
      const start = formatTime(item.start_time);
      const end = formatTime(item.end_time);

      if (start && end) {
        timeRange = `${start} - ${end}`;
      } else {
        timeRange = slotToTime(item.time_slot);
      }

      // If this day already has a time, append to it (multiple time slots same day)
      if (grouped[key].days[item.day]) {
        grouped[key].days[item.day] += `, ${timeRange}`;
      } else {
        grouped[key].days[item.day] = timeRange;
      }
    });

    // Convert to array and sort by subject name
    return Object.values(grouped).sort((a, b) => 
      a.subject.localeCompare(b.subject)
    );
  }, [schedule]);

  /**
   * Calculate schedule statistics
   */
  const stats = useMemo(() => {
    const uniqueSubjects = new Set(schedule.map(s => s.subject_description)).size;
    const uniqueRooms = new Set(schedule.map(s => s.room_name)).size;
    const totalSlots = schedule.length;
    
    // Calculate total hours (assuming 1 hour per slot)
    const totalHours = totalSlots;

    return {
      subjects: uniqueSubjects,
      rooms: uniqueRooms,
      slots: totalSlots,
      hours: totalHours,
    };
  }, [schedule]);

  /**
   * Export schedule to CSV
   */
  const handleExport = () => {
    const csvHeaders = ['Subject', 'Course', 'Room', ...DAYS_ORDER];
    const csvRows = groupedSchedule.map(row => [
      row.subject,
      row.course,
      row.room,
      ...DAYS_ORDER.map(day => row.days[day] || '-')
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedule_${instructorInfo?.name || 'instructor'}.csv`;
    link.click();
    
    showToast('Schedule exported successfully', 'success');
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  return (
    <div className="instructor-schedule">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title-group">
            <div className="header-icon">
              <Calendar size={32} />
            </div>
            <div>
              <h1 className="page-title">My Schedule</h1>
              {instructorInfo && (
                <p className="page-subtitle">
                  <User size={16} />
                  {instructorInfo.name} • {instructorInfo.email}
                </p>
              )}
            </div>
          </div>

          <div className="header-actions">
            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                <List size={18} />
              </button>
              <button
                className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="Card View"
              >
                <Grid size={18} />
              </button>
            </div>

            <button
              className="action-btn export"
              onClick={handleExport}
              disabled={schedule.length === 0}
            >
              <Download size={18} />
              Export
            </button>

            <button
              className="action-btn refresh"
              onClick={fetchSchedule}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        {schedule.length > 0 && (
          <div className="stats-grid">
            <StatsCard
              icon={BookOpen}
              label="Subjects"
              value={stats.subjects}
              color={COLORS.accent}
            />
            <StatsCard
              icon={Building}
              label="Rooms"
              value={stats.rooms}
              color={COLORS.light}
            />
            <StatsCard
              icon={Calendar}
              label="Class Slots"
              value={stats.slots}
              color={COLORS.lighter}
            />
            <StatsCard
              icon={Clock}
              label="Total Hours"
              value={stats.hours}
              color={COLORS.primary}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="content-section">
        {loading ? (
          <ScheduleSkeleton />
        ) : schedule.length === 0 ? (
          <div className="empty-state">
            <Calendar size={64} className="empty-icon" />
            <h3>No Schedule Assigned</h3>
            <p>You don't have any classes scheduled yet. Check back later or contact your administrator.</p>
          </div>
        ) : (
          <>
            <div className="schedule-header">
              <h2>Weekly Schedule</h2>
              <p className="schedule-info">
                Showing {groupedSchedule.length} subject{groupedSchedule.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ScheduleTable groupedSchedule={groupedSchedule} viewMode={viewMode} />
          </>
        )}
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .instructor-schedule {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== TOAST NOTIFICATION ===== */
        .toast-notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 2px solid;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.3s ease;
          max-width: 400px;
        }

        /* ===== PAGE HEADER ===== */
        .page-header {
          margin-bottom: 2rem;
        }

        .header-content {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .header-title-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          border-radius: 16px;
          color: white;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: white;
          margin: 0;
          opacity: 0.8;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .view-toggle {
          display: flex;
          background: #f0f0f0;
          border-radius: 10px;
          padding: 0.25rem;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: ${COLORS.secondary};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-btn:hover {
          background: #e0e0e0;
        }

        .toggle-btn.active {
          background: ${COLORS.primary};
          color: white;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .action-btn.export {
          background: ${COLORS.accent};
          color: white;
        }

        .action-btn.export:hover:not(:disabled) {
          background: ${COLORS.light};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
        }

        .action-btn.refresh {
          background: ${COLORS.primary};
          color: white;
        }

        .action-btn.refresh:hover:not(:disabled) {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stats-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border-top: 4px solid;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .stats-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .stats-content {
          flex: 1;
        }

        .stats-value {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
          line-height: 1;
        }

        .stats-label {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin-top: 0.25rem;
        }

        /* ===== CONTENT SECTION ===== */
        .content-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
          padding: 2rem;
          margin-top: 2rem;
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .schedule-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
          margin: 0;
        }

        .schedule-info {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        /* ===== SCHEDULE TABLE ===== */
        .table-wrapper {
          overflow-x: auto;
        }

        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .schedule-table th {
          background: ${COLORS.primary};
          color: white;
          padding: 0.75rem 1rem;
          text-align: center;
          font-weight: 600;
        }

        .schedule-table td {
          text-align: center;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }

        .subject-cell {
          text-align: left;
        }

        .subject-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .subject-icon {
          color: ${COLORS.accent};
        }

        .subject-name {
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .course-name {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .room-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: ${COLORS.secondary};
        }

        .day-cell {
          font-size: 0.9rem;
        }

        /* ===== TIME SLOT CELL ===== */
        .time-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          background: ${COLORS.lightest};
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
        }

        .time-range {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
          color: ${COLORS.primary};
        }

        .slot-room {
          font-size: 0.8rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        .empty-slot {
          color: #aaa;
          font-style: italic;
        }

        /* ===== CARD VIEW ===== */
        .schedule-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .schedule-card-item {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          padding: 1.25rem;
        }

        .schedule-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-subject {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .card-course {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .card-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: ${COLORS.secondary};
          margin-bottom: 0.75rem;
        }

        .card-schedule {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .card-day-item {
          display: flex;
          justify-content: space-between;
          background: ${COLORS.lightest};
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
        }

        .day-badge {
          background: ${COLORS.accent};
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
        }

        .time-text {
          font-size: 0.85rem;
          color: ${COLORS.primary};
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: ${COLORS.secondary};
        }

        .empty-icon {
          color: ${COLORS.light};
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          max-width: 480px;
          margin: 0 auto;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        /* ===== SKELETON ===== */
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
          border-radius: 8px;
        }

        .skeleton-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        /* ===== ANIMATIONS ===== */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .header-actions {
            flex-direction: column;
            width: 100%;
          }

          .view-toggle {
            width: 100%;
            justify-content: space-around;
          }

          .schedule-table th,
          .schedule-table td {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}