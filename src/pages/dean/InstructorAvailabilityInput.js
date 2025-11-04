// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function InstructorAvailabilityInput() {
//   const [availabilities, setAvailabilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//   const fetchAvailabilities = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(text || "Failed to fetch availability");
//       }
//       const data = await res.json();

//       // Ensure data is an array
//       if (Array.isArray(data)) {
//         setAvailabilities(data);  // Use the data if it's already an array
//       } else {
//         setAvailabilities([data]);  // Wrap the data in an array if it's not
//       }

//       console.log("Fetched availability:", data);
//     } catch (err) {
//       setError(err.message || "Failed to fetch availability");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchAvailabilities();
// }, []);




//   // Group by instructor and day
//   const grouped = availabilities.reduce((acc, item) => {
//   const instructorName = item.instructorName || "Unknown";
//   if (!acc[instructorName]) acc[instructorName] = {};
//   if (!acc[instructorName][item.day]) acc[instructorName][item.day] = [];
//   acc[instructorName][item.day].push({
//     start: item.start_time,
//     end: item.end_time,
//   });
//   return acc;
// }, {});
//   return (
//     <Card className="p-4 shadow-sm">
//       <h3 className="mb-4">Instructor Availability (Time Slots)</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading ? (
//         <div className="text-center py-4"><Spinner animation="border" /></div>
//       ) : availabilities.length === 0 ? (
//         <div className="text-muted">No availability data found.</div>
//       ) : (
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Day</th>
//               <th>Available Slots</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(grouped).map(([instructorName, daysObj], instrIdx) => {
//               // Order days consistently
//               const dayKeys = Object.keys(daysObj)
//                 .sort((a, b) => {
//                   const ia = DAYS_ORDER.indexOf(a);
//                   const ib = DAYS_ORDER.indexOf(b);
//                   if (ia === -1 && ib === -1) return a.localeCompare(b);
//                   if (ia === -1) return 1;
//                   if (ib === -1) return -1;
//                   return ia - ib;
//                 });

//               return dayKeys.map((day, dayIndex) => {
//                 const slots = daysObj[day];
//                 slots.sort((x, y) => (x.start || "").localeCompare(y.start || ""));
//                 return (
//                   <tr key={`${instrIdx}-${day}`}>
//                     {dayIndex === 0 && (
//                       <td rowSpan={dayKeys.length} style={{ verticalAlign: "middle", width: 220 }}>
//                         <strong>{instructorName}</strong>
//                       </td>
//                     )}
//                     <td style={{ width: 120 }}>{day}</td>
//                     <td>
//                       {slots.length > 0 ? (
//                         slots.map((slot, sIdx) => (
//                           <div key={sIdx}>
//                             {slot.start} — {slot.end}
//                           </div>
//                         ))
//                       ) : (
//                         <span className="text-muted">No slots</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               });
//             })}
//           </tbody>
//         </Table>
//       )}
//     </Card>
//   );
// }

///Functional-go

// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function InstructorAvailabilityInput() {
//   const [availabilities, setAvailabilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API}/api/instructor-availability`);
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(text || "Failed to fetch availability");
//         }
//         const data = await res.json();

//         // Ensure data is an array
//         if (Array.isArray(data)) {
//           setAvailabilities(data);  // Use the data if it's already an array
//         } else {
//           setAvailabilities([data]);  // Wrap the data in an array if it's not
//         }

//         console.log("Fetched Availability:", data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch availability");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAvailabilities();
//   }, []);

//   // Group by instructor → day
//   const grouped = availabilities.reduce((acc, item) => {
//     const instructorName = item.instructorName || "Unknown";

//     // Initialize instructor group if not exists
//     if (!acc[instructorName]) acc[instructorName] = {};

//     // Initialize day group if not exists for the instructor
//     if (!acc[instructorName][item.day]) acc[instructorName][item.day] = [];

//     // Add time slots
//     acc[instructorName][item.day].push({
//       start: item.start_time,
//       end: item.end_time,
//     });
//      return acc;
//   }, {});

//   // ✅ Debug logs here:
//   console.log("Availabilities:", availabilities);
//   console.log("Grouped:", grouped);

   

//   return (
//     <Card className="p-4 shadow-sm">
//       <h3 className="mb-4">Instructor Availability (Time Slots)</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading ? (
//         <div className="text-center py-4"><Spinner animation="border" /></div>
//       ) : availabilities.length === 0 ? (
//         <div className="text-muted">No availability data found.</div>
//       ) : (
//         <div style={{ maxHeight: "100%", overflowY: "auto" }}>
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Day</th>
//               <th>Available Slots</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(grouped).map(([instructorName, daysObj], instrIdx) => {
//               // Order days consistently
//               const dayKeys = Object.keys(daysObj)
//                 .sort((a, b) => {
//                   const ia = DAYS_ORDER.indexOf(a);
//                   const ib = DAYS_ORDER.indexOf(b);
//                   if (ia === -1 && ib === -1) return a.localeCompare(b);
//                   if (ia === -1) return 1;
//                   if (ib === -1) return -1;
//                   return ia - ib;
//                 });

//               return dayKeys.map((day, dayIndex) => {
//                 const slots = daysObj[day];
//                 slots.sort((x, y) => (x.start || "").localeCompare(y.start || ""));
//                 return (
//                   <tr key={`${instrIdx}-${day}`}>
//                     {dayIndex === 0 && (
//                       <td rowSpan={dayKeys.length} style={{ verticalAlign: "middle", width: 220 }}>
//                         <strong>{instructorName}</strong>
//                       </td>
//                     )}
//                     <td style={{ width: 120 }}>{day}</td>
//                     <td>
//                       {slots.length > 0 ? (
//                         slots.map((slot, sIdx) => (
//                           <div key={sIdx}>
//                             {slot.start} — {slot.end}
//                           </div>
//                         ))
//                       ) : (
//                         <span className="text-muted">No slots</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               });
//             })}
//           </tbody>
//         </Table>
//         </div>
//       )}
//     </Card>
//   );
// }

//FUNCTIONAL WITH COURSE
// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function InstructorAvailabilityInput() {
//   const [availabilities, setAvailabilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API}/api/instructor-availability`);
//         if (!res.ok) throw new Error("Failed to fetch availability");
//         const data = await res.json();
//         setAvailabilities(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         setError(err.message || "Failed to fetch availability");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAvailabilities();
//   }, []);

//   // ✅ Group by instructor → day
//   const grouped = availabilities.reduce((acc, item) => {
//     const instructorName = item.instructorName || "Unknown Instructor";
//     const courseName = item.course_name || "No Course Info";
//     const day = item.day || "Unspecified Day";
//     const start = item.start_time || "N/A";
//     const end = item.end_time || "N/A";

//     if (!acc[instructorName]) {
//       acc[instructorName] = {
//         courses: new Set(),
//         days: DAYS_ORDER.reduce((d, day) => ({ ...d, [day]: [] }), {}),
//       };
//     }

//     if (DAYS_ORDER.includes(day)) {
//       acc[instructorName].days[day].push(`${start} - ${end}`);
//     }

//     acc[instructorName].courses.add(courseName);
//     return acc;
//   }, {});

//   return (
//     <Card className="p-4 shadow-sm">
//       <h3 className="mb-4">Instructor Availability (With Course)</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading ? (
//         <div className="text-center py-4">
//           <Spinner animation="border" />
//         </div>
//       ) : availabilities.length === 0 ? (
//         <div className="text-muted">No availability data found.</div>
//       ) : (
//         <div style={{ maxHeight: "100%", overflowX: "auto" }}>
//           <Table bordered hover responsive className="align-middle text-center">
//             <thead className="table-light">
//               <tr>
//                 <th style={{ width: "220px" }}>Instructor</th>
//                 {DAYS_ORDER.map((day) => (
//                   <th key={day}>{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(grouped).map(([instructorName, data], idx) => (
//                 <tr key={idx}>
//                   <td style={{ textAlign: "left" }}>
//                     <strong>{instructorName}</strong>
//                     <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "4px" }}>
//                       {[...data.courses].join(", ")}
//                     </div>
//                   </td>

//                   {DAYS_ORDER.map((day) => (
//                     <td key={day}>
//                       {data.days[day].length > 0 ? (
//                         data.days[day].map((time, i) => <div key={i}>{time}</div>)
//                       ) : (
//                         <span className="text-muted">—</span>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </Card>
//   );
// }


// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Search, RefreshCw, Users, Calendar, Clock, Filter } from "lucide-react";
// import "../../styles/InstructorAvailabilityInput.css"; // ✅ import the CSS file

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

// // ===== Skeleton Loader =====
// const LoadingSkeleton = React.memo(() => (
//   <div className="skeleton-container">
//     {[1, 2, 3, 4, 5].map((i) => (
//       <div key={i} className="skeleton-row">
//         <div className="skeleton-cell skeleton-instructor"></div>
//         <div className="skeleton-cell skeleton-day"></div>
//         <div className="skeleton-cell skeleton-slots"></div>
//       </div>
//     ))}
//   </div>
// ));

// // ===== Slot Badge =====
// const SlotBadge = React.memo(({ start, end }) => (
//   <div className="slot-badge">
//     <Clock size={14} className="slot-icon" />
//     <span className="slot-time">
//       {start} — {end}
//     </span>
//   </div>
// ));

// // ===== Slot List =====
// const SlotList = React.memo(({ slots }) => {
//   if (!slots || slots.length === 0) {
//     return <span className="no-slots">No available slots</span>;
//   }
//   return (
//     <div className="slots-container">
//       {slots.map((slot, idx) => (
//         <SlotBadge key={idx} start={slot.start} end={slot.end} />
//       ))}
//     </div>
//   );
// });

// // ===== Instructor Row =====
// const InstructorRow = React.memo(({ instructorName, daysObj, index }) => {
//   const sortedDays = useMemo(() => {
//     return Object.keys(daysObj).sort((a, b) => {
//       const ia = DAYS_ORDER.indexOf(a);
//       const ib = DAYS_ORDER.indexOf(b);
//       if (ia === -1 && ib === -1) return a.localeCompare(b);
//       if (ia === -1) return 1;
//       if (ib === -1) return -1;
//       return ia - ib;
//     });
//   }, [daysObj]);

//   return (
//     <>
//       {sortedDays.map((day, dayIndex) => {
//         const slots = [...daysObj[day]].sort((x, y) =>
//           (x.start || "").localeCompare(y.start || "")
//         );
//         return (
//           <tr key={`${index}-${day}`} className="availability-row fade-in">
//             {dayIndex === 0 && (
//               <td rowSpan={sortedDays.length} className="instructor-cell">
//                 <div className="instructor-info">
//                   <Users size={18} className="instructor-icon" />
//                   <span className="instructor-name">{instructorName}</span>
//                 </div>
//                 <div className="slot-count">
//                   {Object.values(daysObj).flat().length} slots
//                 </div>
//               </td>
//             )}
//             <td className="day-cell">
//               <div className="day-container">
//                 <Calendar size={16} className="day-icon" />
//                 <span className="day-name">{day}</span>
//               </div>
//             </td>
//             <td className="slots-cell">
//               <SlotList slots={slots} />
//             </td>
//           </tr>
//         );
//       })}
//     </>
//   );
// });

// // ===== Table =====
// const AvailabilityTable = React.memo(({ groupedData }) => {
//   if (Object.keys(groupedData).length === 0) {
//     return (
//       <div className="empty-state">
//         <Calendar size={48} className="empty-icon" />
//         <p className="empty-text">No availability data found</p>
//         <p className="empty-subtext">Try adjusting your filters or refresh the data</p>
//       </div>
//     );
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="availability-table">
//         <thead>
//           <tr>
//             <th className="th-instructor">Instructor</th>
//             <th className="th-day">Day</th>
//             <th className="th-slots">Available Time Slots</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(groupedData).map(([instructorName, daysObj], index) => (
//             <InstructorRow
//               key={instructorName}
//               instructorName={instructorName}
//               daysObj={daysObj}
//               index={index}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ===== Main Component =====
// export default function InstructorAvailabilityInput() {
//   const [availabilities, setAvailabilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDay, setSelectedDay] = useState("All");
//   const [sortBy, setSortBy] = useState("name");

//   const fetchAvailabilities = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) throw new Error("Failed to fetch availability");
//       const data = await res.json();
//       const dataArray = Array.isArray(data) ? data : [data];
//       setAvailabilities(dataArray);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAvailabilities();
//   }, [fetchAvailabilities]);

//   const { groupedData, totalInstructors, totalSlots } = useMemo(() => {
//     const grouped = availabilities.reduce((acc, item) => {
//       const name = item.instructorName || "Unknown";
//       if (!acc[name]) acc[name] = {};
//       if (!acc[name][item.day]) acc[name][item.day] = [];
//       acc[name][item.day].push({ start: item.start_time, end: item.end_time });
//       return acc;
//     }, {});

//     let filtered = { ...grouped };
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       filtered = Object.entries(filtered).reduce((acc, [instructor, days]) => {
//         if (instructor.toLowerCase().includes(term)) acc[instructor] = days;
//         return acc;
//       }, {});
//     }
//     if (selectedDay !== "All") {
//       filtered = Object.entries(filtered).reduce((acc, [instructor, days]) => {
//         if (days[selectedDay]) acc[instructor] = { [selectedDay]: days[selectedDay] };
//         return acc;
//       }, {});
//     }

//     const sorted = Object.entries(filtered).sort(([a], [b]) => {
//       if (sortBy === "name") return a.localeCompare(b);
//       const slotsA = Object.values(filtered[a] || {}).flat().length;
//       const slotsB = Object.values(filtered[b] || {}).flat().length;
//       return slotsB - slotsA;
//     });

//     const sortedFiltered = Object.fromEntries(sorted);
//     const totalInstructors = Object.keys(sortedFiltered).length;
//     const totalSlots = Object.values(sortedFiltered)
//       .flatMap(days => Object.values(days))
//       .flat().length;

//     return { groupedData: sortedFiltered, totalInstructors, totalSlots };
//   }, [availabilities, searchTerm, selectedDay, sortBy]);

//   return (
//     <div className="availability-container">
//       <div className="header-section">
//         <div className="header-content">
//           <div className="header-title-group">
//             <h1 className="header-title">Instructor Availability Overview</h1>
//             <p className="header-subtitle">EduSched Academic Management System</p>
//           </div>

//           <div className="header-stats">
//             <div className="stat-card">
//               <Users size={20} className="stat-icon" />
//               <div className="stat-content">
//                 <div className="stat-value">{totalInstructors}</div>
//                 <div className="stat-label">Instructors</div>
//               </div>
//             </div>
//             <div className="stat-card">
//               <Clock size={20} className="stat-icon" />
//               <div className="stat-content">
//                 <div className="stat-value">{totalSlots}</div>
//                 <div className="stat-label">Time Slots</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="controls-section">
//           <div className="search-container">
//             <Search size={18} className="search-icon" />
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search by instructor name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="filter-group">
//             <div className="filter-container">
//               <Filter size={18} className="filter-icon" />
//               <select
//                 className="filter-select"
//                 value={selectedDay}
//                 onChange={(e) => setSelectedDay(e.target.value)}
//               >
//                 <option value="All">All Days</option>
//                 {DAYS_ORDER.map((day) => (
//                   <option key={day} value={day}>{day}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="filter-container">
//               <select
//                 className="filter-select"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="slots">Sort by Slots</option>
//               </select>
//             </div>

//             <button
//               className="refresh-button"
//               onClick={fetchAvailabilities}
//               disabled={loading}
//               title="Refresh data"
//             >
//               <RefreshCw size={18} className={loading ? "spinning" : ""} />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="error-container">
//           <div className="error-content"><strong>Error:</strong> {error}</div>
//           <button className="error-retry" onClick={fetchAvailabilities}>Try Again</button>
//         </div>
//       )}

//       <div className="content-section">
//         {loading ? <LoadingSkeleton /> : <AvailabilityTable groupedData={groupedData} />}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Search, ChevronDown, ChevronUp, RefreshCw, Calendar, User, Clock } from "lucide-react";
// import { API } from '../../config/api';


const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const API_BASE =
//   process.env.REACT_APP_API_URL ||
//   (window.location.hostname === 'localhost'
//     ? 'http://localhost:5000'
//     : 'https://lavenderblush-chinchilla-571128.hostingersite.com ');

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// EduSched Color Palette
const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#0096C7",
  lighter: "#00B4D8",
  lightest: "#48CAE4",
  pale: "#90E0EF",
  extraPale: "#ADE8F4",
  ultraPale: "#CAF0F8"
};

// Subcomponent: Loading State
function LoadingState() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading availability data...</p>
      <style>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          gap: 1rem;
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid ${COLORS.ultraPale};
          border-top-color: ${COLORS.accent};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-text {
          color: ${COLORS.secondary};
          font-size: 0.95rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Subcomponent: Error Alert
function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert" role="alert" aria-live="polite">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <div className="error-text">
          <strong>Unable to load availability</strong>
          <p>{message}</p>
        </div>
      </div>
      <button onClick={onRetry} className="retry-btn" aria-label="Retry loading data">
        <RefreshCw size={16} />
        Retry
      </button>
      <style>{`
        .error-alert {
          background: linear-gradient(135deg, #fee, #fdd);
          border: 1px solid #fcc;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .error-content {
          display: flex;
          gap: 1rem;
          align-items: start;
        }
        .error-icon {
          font-size: 1.5rem;
        }
        .error-text strong {
          display: block;
          color: #c33;
          margin-bottom: 0.25rem;
        }
        .error-text p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }
        .retry-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .retry-btn:hover {
          background: #f8f8f8;
          border-color: #999;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

// Subcomponent: Empty State
function EmptyState() {
  return (
    <div className="empty-state">
      <Calendar size={64} color={COLORS.pale} />
      <h4>No Availability Data</h4>
      <p>There are currently no instructor availability records to display.</p>
      <style>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          gap: 1rem;
        }
        .empty-state h4 {
          color: ${COLORS.secondary};
          margin: 0.5rem 0 0.25rem;
        }
        .empty-state p {
          color: #666;
          margin: 0;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}

// Subcomponent: Instructor Row
function InstructorRow({ instructorName, courses, dayData, isExpanded, onToggle, isCurrentDay }) {
  return (
    <>
      <tr className="instructor-row">
        <td className="instructor-cell">
          <button 
            onClick={onToggle}
            className="expand-btn"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${instructorName}'s schedule`}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div className="instructor-info">
            <div className="instructor-name">
              <User size={16} />
              {instructorName}
            </div>
            <div className="course-list">{courses}</div>
          </div>
        </td>
        {DAYS_ORDER.map((day) => {
          const times = dayData[day];
          const isToday = isCurrentDay(day);
          return (
            <td key={day} className={`day-cell ${isToday ? 'current-day' : ''}`}>
              {times.length > 0 ? (
                <div className="availability-badge available">
                  <Clock size={14} />
                  {times.length} slot{times.length > 1 ? 's' : ''}
                </div>
              ) : (
                <span className="availability-badge unavailable">—</span>
              )}
            </td>
          );
        })}
      </tr>
      {isExpanded && (
        <tr className="detail-row">
          <td colSpan={DAYS_ORDER.length + 1}>
            <div className="detail-content">
              {DAYS_ORDER.map((day) => {
                const times = dayData[day];
                if (times.length === 0) return null;
                return (
                  <div key={day} className="day-detail">
                    <strong>{day}</strong>
                    <div className="time-slots">
                      {times.map((time, i) => (
                        <span key={i} className="time-slot">{time}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      )}
      <style>{`
        .instructor-row {
          transition: background-color 0.2s;
        }
        .instructor-row:hover {
          background-color: ${COLORS.ultraPale};
        }
        .instructor-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem !important;
          text-align: left !important;
        }
        .expand-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: ${COLORS.accent};
          padding: 0.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .expand-btn:hover {
          background: ${COLORS.extraPale};
        }
        .instructor-info {
          flex: 1;
          min-width: 0;
        }
        .instructor-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }
        .course-list {
          font-size: 0.85rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .day-cell {
          padding: 1rem 0.5rem !important;
          vertical-align: middle !important;
          text-align: center !important;
        }
        .day-cell.current-day {
          background-color: ${COLORS.ultraPale};
        }
        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .availability-badge.available {
          background: linear-gradient(135deg, #d4f4dd, #c8f0d3);
          color: #1b6933;
          border: 1px solid #a5e3b8;
        }
        .availability-badge.unavailable {
          background: #f5f5f5;
          color: #999;
          border: 1px solid #e0e0e0;
        }
        .detail-row {
          background: ${COLORS.ultraPale};
        }
        .detail-content {
          padding: 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .day-detail strong {
          display: block;
          color: ${COLORS.secondary};
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .time-slots {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .time-slot {
          display: inline-block;
          background: white;
          padding: 0.4rem 0.7rem;
          border-radius: 6px;
          font-size: 0.85rem;
          color: ${COLORS.primary};
          border: 1px solid ${COLORS.pale};
        }
      `}</style>
    </>
  );
}

// Main Component
export default function InstructorAvailabilityInput() {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortBy, setSortBy] = useState("name");

  const fetchAvailabilities = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API}/api/instructor-availability`);
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();
      setAvailabilities(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message || "Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailabilities();
  }, [fetchAvailabilities]);

  // Group and process data with memoization
  const grouped = useMemo(() => {
    const result = availabilities.reduce((acc, item) => {
      const instructorName = item.instructorName || "Unknown Instructor";
      const courseName = item.course_name || "No Course Info";
      const day = item.day || "Unspecified Day";
      const start = item.start_time || "N/A";
      const end = item.end_time || "N/A";

      if (!acc[instructorName]) {
        acc[instructorName] = {
          courses: new Set(),
          days: DAYS_ORDER.reduce((d, day) => ({ ...d, [day]: [] }), {}),
        };
      }

      if (DAYS_ORDER.includes(day)) {
        acc[instructorName].days[day].push(`${start} - ${end}`);
      }

      acc[instructorName].courses.add(courseName);
      return acc;
    }, {});

    return Object.entries(result).map(([name, data]) => ({
      name,
      courses: [...data.courses].join(", "),
      days: data.days,
      totalSlots: Object.values(data.days).flat().length
    }));
  }, [availabilities]);

  // Filter and sort
  const filteredData = useMemo(() => {
    let filtered = grouped.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courses.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "slots") {
      filtered.sort((a, b) => b.totalSlots - a.totalSlots);
    }

    return filtered;
  }, [grouped, searchTerm, sortBy]);

  const toggleRow = useCallback((instructorName) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(instructorName)) {
        next.delete(instructorName);
      } else {
        next.add(instructorName);
      }
      return next;
    });
  }, []);

  const isCurrentDay = useCallback((day) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return day === currentDay;
  }, []);

  const handleExpandAll = useCallback(() => {
    setExpandedRows(new Set(filteredData.map(item => item.name)));
  }, [filteredData]);

  const handleCollapseAll = useCallback(() => {
    setExpandedRows(new Set());
  }, []);

  return (
    <div className="availability-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h2 className="dashboard-title">
            <Calendar size={28} />
            Instructor Availability Schedule
          </h2>
          <p className="dashboard-subtitle">
            View and manage instructor availability across all days and courses
          </p>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by instructor name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search instructors or courses"
          />
        </div>

        <div className="action-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="Sort by"
          >
            <option value="name">Sort by Name</option>
            <option value="slots">Sort by Availability</option>
          </select>

          <button onClick={handleExpandAll} className="control-btn" aria-label="Expand all rows">
            Expand All
          </button>
          <button onClick={handleCollapseAll} className="control-btn" aria-label="Collapse all rows">
            Collapse All
          </button>
          <button onClick={fetchAvailabilities} className="refresh-btn" aria-label="Refresh data">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchAvailabilities} />}

      <div className="table-card">
        {loading ? (
          <LoadingState />
        ) : filteredData.length === 0 ? (
          searchTerm ? (
            <EmptyState />
          ) : (
            <EmptyState />
          )
        ) : (
          <div className="table-wrapper">
            <table className="availability-table" role="table">
              <thead>
                <tr>
                  <th style={{ width: '280px' }}>Instructor & Courses</th>
                  {DAYS_ORDER.map((day) => (
                    <th key={day} className={isCurrentDay(day) ? 'current-day-header' : ''}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <InstructorRow
                    key={item.name}
                    instructorName={item.name}
                    courses={item.courses}
                    dayData={item.days}
                    isExpanded={expandedRows.has(item.name)}
                    onToggle={() => toggleRow(item.name)}
                    isCurrentDay={isCurrentDay}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .availability-dashboard {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          background: linear-gradient(135deg, ${COLORS.ultraPale} 0%, #fff 100%);
          min-height: 100vh;
        }

        .dashboard-header {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.15);
        }

        .header-content {
          color: white;
        }

        .dashboard-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .dashboard-subtitle {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .controls-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid ${COLORS.extraPale};
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 3px ${COLORS.ultraPale};
        }

        .action-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .sort-select, .control-btn, .refresh-btn {
          padding: 0.75rem 1rem;
          border: 2px solid ${COLORS.extraPale};
          border-radius: 10px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .sort-select:hover, .control-btn:hover, .refresh-btn:hover {
          border-color: ${COLORS.accent};
          background: ${COLORS.ultraPale};
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem;
        }

        .table-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .availability-table {
          width: 100%;
          border-collapse: collapse;
        }

        .availability-table thead {
          background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
          color: white;
        }

        .availability-table th {
          padding: 1rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .availability-table th.current-day-header {
          background: linear-gradient(135deg, ${COLORS.light} 0%, ${COLORS.lighter} 100%);
        }

        .availability-table tbody tr {
          border-bottom: 1px solid ${COLORS.extraPale};
        }

        .availability-table tbody tr:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .availability-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            padding: 1.5rem;
          }

          .dashboard-title {
            font-size: 1.4rem;
          }

          .controls-bar {
            flex-direction: column;
          }

          .search-container {
            width: 100%;
          }

          .action-controls {
            width: 100%;
            justify-content: space-between;
          }

          .availability-table th,
          .availability-table td {
            font-size: 0.85rem;
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}