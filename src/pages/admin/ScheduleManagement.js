

//Functional
// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert, Badge, Button } from "react-bootstrap";
// import { Trash2 } from "lucide-react";

// const ScheduleManagement = () => {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // ✅ Fetch all schedules (joined with related data)
//   const fetchSchedules = async () => {
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");
//       const data = await res.json();
//       setSchedules(data);
//     } catch (err) {
//       console.error("Error fetching schedules:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete a schedule
//   const deleteSchedule = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this schedule?")) return;
//     try {
//       const res = await fetch(`${API}/api/scheduler/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete schedule");
//       setSchedules((prev) => prev.filter((s) => s.id !== id));
//     } catch (err) {
//       console.error("Error deleting schedule:", err);
//       alert("Failed to delete schedule. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   // ✅ Convert slot index to readable time
//   const slotToTime = (slotIndex) => {
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;
//     return `${String(start).padStart(2, "0")}:00 - ${String(end).padStart(
//       2,
//       "0"
//     )}:00`;
//   };

//   // ✅ Group schedules by semester and year level
//   const groupedSchedules = schedules.reduce((acc, s) => {
//     const semester = s.semester || "Unspecified Semester";
//     const year = s.year_level || "Unspecified Year";
//     const groupKey = `${year} Year - ${semester} Semester`;

//     if (!acc[groupKey]) acc[groupKey] = [];
//     acc[groupKey].push(s);
//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2">Loading schedules...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="shadow-sm">
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <div className="container-fluid py-4">
//       <h2 className="fw-bold mb-4">Schedule Management</h2>

//       {schedules.length === 0 ? (
//         <Alert variant="info" className="shadow-sm">
//           No schedules have been generated yet by the Dean.
//         </Alert>
//       ) : (
//         Object.keys(groupedSchedules).map((group, groupIndex) => (
//           <Card className="border-0 shadow-sm mb-4" key={groupIndex}>
//             <Card.Header className="bg-primary text-white fw-semibold">
//               {group}
//             </Card.Header>

//             {/** Group schedules further by instructor */}
//             {Object.entries(
//               groupedSchedules[group].reduce((acc, s) => {
//                 const instructor =
//                   s.instructor_name || "Unassigned Instructor";
//                 if (!acc[instructor]) acc[instructor] = [];
//                 acc[instructor].push(s);
//                 return acc;
//               }, {})
//             ).map(([instructor, instructorSchedules], i) => (
//               <Card key={i} className="border-0 mb-3">
//                 <Card.Header className="bg-light fw-semibold">
//                   {instructor}{" "}
//                   <span className="text-muted">
//                     {instructorSchedules[0].course_name
//                       ? `(${instructorSchedules[0].course_name})`
//                       : "(No Course)"}
//                   </span>
//                 </Card.Header>

//                 <Card.Body>
//                   <Table
//                     striped
//                     bordered
//                     hover
//                     responsive
//                     className="align-middle table-sm"
//                   >
//                     <thead className="table-primary text-center align-middle">
//                       <tr>
//                         <th>ID</th>
//                         <th>Day</th>
//                         <th>Time</th>
//                         <th>Subject</th>
//                         <th>Room</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {instructorSchedules.map((s) => (
//                         <tr key={s.id}>
//                           <td className="text-center">{s.id}</td>
//                           <td className="text-center">{s.day}</td>
//                           <td className="text-center">
//                             {slotToTime(s.slot_index)}
//                           </td>
//                           <td>{s.subject_name || s.subject_id}</td>
//                           <td>
//                             {s.room_name ? (
//                               s.room_name
//                             ) : (
//                               <Badge bg="secondary">Unassigned</Badge>
//                             )}
//                           </td>
//                           <td className="text-center">
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() => deleteSchedule(s.id)}
//                             >
//                               <Trash2 size={16} className="me-1" />
//                               Delete
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             ))}
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default ScheduleManagement;

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Card, Table, Spinner, Alert, Badge, Button, InputGroup, Form, Accordion } from "react-bootstrap";
// import { Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, RotateCw, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";

// const ScheduleManagement = () => {
//   // State management
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterSemester, setFilterSemester] = useState("");
//   const [filterYear, setFilterYear] = useState("");
//   const [filterInstructor, setFilterInstructor] = useState("");
//   const [toast, setToast] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   /**
//    * Fetch all schedules from backend
//    */
//   const fetchSchedules = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");
//       const data = await res.json();
//       setSchedules(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching schedules:", err);
//       setError(err.message);
//       showToast("Failed to load schedules", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [API]);

//   /**
//    * Delete a schedule entry with confirmation
//    */
//   const handleDeleteSchedule = async (id) => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete schedule");
      
//       setSchedules((prev) => prev.filter((s) => s.id !== id));
//       setDeleteConfirm(null);
//       showToast("Schedule deleted successfully", "success");
//     } catch (err) {
//       console.error("Error deleting schedule:", err);
//       showToast("Failed to delete schedule", "error");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /**
//    * Show toast notification
//    */
//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   /**
//    * Convert slot index to readable time format (HH:00 - HH:00)
//    */
//   const slotToTime = useCallback((slotIndex) => {
//     const startHour = 8 + slotIndex;
//     const endHour = startHour + 1;
//     return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
//   }, []);

//   /**
//    * Extract unique filter options from schedules
//    */
//   const filterOptions = useMemo(() => {
//     const semesters = [...new Set(schedules.map(s => s.semester || "Unspecified"))];
//     const years = [...new Set(schedules.map(s => s.year_level || "Unspecified"))].sort();
//     const instructors = [...new Set(schedules.map(s => s.instructor_name || "Unassigned"))].sort();
    
//     return {
//       semesters: semesters.filter(s => s),
//       years: years.filter(y => y),
//       instructors: instructors.filter(i => i)
//     };
//   }, [schedules]);

//   /**
//    * Filter schedules based on search and filter criteria
//    */
//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(s => {
//       const matchesSearch = 
//         s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.course_name?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesSemester = !filterSemester || s.semester === filterSemester;
//       const matchesYear = !filterYear || String(s.year_level) === filterYear;
//       const matchesInstructor = !filterInstructor || s.instructor_name === filterInstructor;

//       return matchesSearch && matchesSemester && matchesYear && matchesInstructor;
//     });
//   }, [schedules, searchTerm, filterSemester, filterYear, filterInstructor]);

//   /**
//    * Group filtered schedules by year and semester for hierarchical display
//    */
//   const groupedSchedules = useMemo(() => {
//     return filteredSchedules.reduce((acc, s) => {
//       const semester = s.semester || "Unspecified Semester";
//       const year = s.year_level || "Unspecified Year";
//       const groupKey = `${year} Year - ${semester} Semester`;

//       if (!acc[groupKey]) acc[groupKey] = [];
//       acc[groupKey].push(s);
//       return acc;
//     }, {});
//   }, [filteredSchedules]);

//   /**
//    * Calculate summary statistics
//    */
//   const statistics = useMemo(() => {
//     const totalSchedules = filteredSchedules.length;
//     const uniqueInstructors = new Set(filteredSchedules.map(s => s.instructor_id)).size;
//     const uniqueRooms = new Set(filteredSchedules.map(s => s.room_id).filter(Boolean)).size;
//     const uniqueCourses = new Set(filteredSchedules.map(s => s.course_id).filter(Boolean)).size;

//     return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueCourses };
//   }, [filteredSchedules]);

//   // Fetch schedules on component mount
//   useEffect(() => {
//     fetchSchedules();
//   }, [fetchSchedules]);

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="schedule-loading-container">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Loading schedules...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         /* ============================================
//            EduSched Schedule Management Styles
//            ============================================ */

//         .schedule-management-container {
//           padding: 2rem;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           min-height: 100vh;
//         }

//         .schedule-header {
//           margin-bottom: 2rem;
//         }

//         .schedule-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .schedule-subtitle {
//           color: #666;
//           font-size: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         /* Statistics Cards */
//         .statistics-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           border-left: 4px solid #0077B6;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(0, 119, 182, 0.15);
//         }

//         .stat-icon {
//           color: #0077B6;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 0.5rem;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         /* Filter Section */
//         .filter-section {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .filter-title {
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .filter-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .search-input-group {
//           position: relative;
//         }

//         .search-input {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem 2.5rem 0.75rem 1rem;
//           width: 100%;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .search-icon {
//           position: absolute;
//           right: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #0077B6;
//           pointer-events: none;
//         }

//         .filter-select {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .filter-select:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .filter-label {
//           font-weight: 500;
//           color: #03045E;
//           display: block;
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .refresh-btn {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .refresh-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         /* Loading State */
//         .schedule-loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           color: #0077B6;
//         }

//         /* Empty State */
//         .empty-state-container {
//           text-align: center;
//           padding: 4rem 2rem;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .empty-state-icon {
//           color: #90E0EF;
//           margin-bottom: 1rem;
//         }

//         .empty-state-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .empty-state-text {
//           color: #666;
//           font-size: 0.95rem;
//         }

//         /* Group Cards */
//         .schedule-group-card {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           margin-bottom: 1.5rem;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .schedule-group-card:hover {
//           box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
//         }

//         .group-header {
//           background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
//           color: white;
//           padding: 1.5rem;
//           cursor: pointer;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 600;
//           transition: all 0.3s ease;
//           user-select: none;
//         }

//         .group-header:hover {
//           background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
//         }

//         .group-title {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .group-count {
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 500;
//         }

//         .group-chevron {
//           transition: transform 0.3s ease;
//         }

//         .group-chevron.open {
//           transform: rotate(180deg);
//         }

//         .instructor-card {
//           border-top: 1px solid #E8F4F8;
//           padding: 1rem;
//           background: #FAFCFD;
//           border-left: 4px solid #00B4D8;
//         }

//         .instructor-card:last-child {
//           border-bottom: none;
//         }

//         .instructor-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//           font-weight: 600;
//           color: #03045E;
//         }

//         .instructor-name {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1rem;
//         }

//         .instructor-course {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 400;
//           margin-left: 1.75rem;
//         }

//         .schedule-table {
//           margin-bottom: 0;
//           font-size: 0.9rem;
//         }

//         .schedule-table thead {
//           background: #CAF0F8;
//           color: #03045E;
//         }

//         .schedule-table th {
//           padding: 0.75rem;
//           font-weight: 600;
//           border: none;
//           text-transform: uppercase;
//           font-size: 0.8rem;
//           letter-spacing: 0.5px;
//         }

//         .schedule-table td {
//           padding: 0.75rem;
//           vertical-align: middle;
//           border-bottom: 1px solid #E8F4F8;
//         }

//         .schedule-table tbody tr:hover {
//           background-color: #F8FCFD;
//         }

//         .schedule-table tbody tr:last-child td {
//           border-bottom: none;
//         }

//         .id-badge {
//           font-weight: 600;
//           font-size: 0.85rem;
//         }

//         .day-cell {
//           font-weight: 500;
//           color: #0077B6;
//         }

//         .time-cell {
//           background: linear-gradient(135deg, #E8F4F8 0%, #CAF0F8 100%);
//           font-weight: 600;
//           color: #0077B6;
//           border-radius: 6px;
//           padding: 0.5rem 0.75rem;
//           display: inline-block;
//           white-space: nowrap;
//         }

//         .unassigned-badge {
//           font-size: 0.75rem;
//           padding: 0.25rem 0.5rem;
//         }

//         .action-cell {
//           text-align: center;
//         }

//         .delete-btn {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           border: none;
//           padding: 0.5rem 0.75rem;
//           border-radius: 8px;
//           color: white;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.4rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.85rem;
//         }

//         .delete-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .delete-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Toast Notifications */
//         .edusched-toast {
//           position: fixed;
//           top: 2rem;
//           right: 2rem;
//           min-width: 320px;
//           background: white;
//           border-radius: 12px;
//           padding: 1rem 1.5rem;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           z-index: 9999;
//           animation: slideInToast 0.3s ease;
//           border-left: 4px solid;
//         }

//         @keyframes slideInToast {
//           from {
//             transform: translateX(400px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .toast-success {
//           border-left-color: #00c851;
//         }

//         .toast-error {
//           border-left-color: #ff4444;
//         }

//         .toast-icon {
//           flex-shrink: 0;
//         }

//         .toast-success .toast-icon {
//           color: #00c851;
//         }

//         .toast-error .toast-icon {
//           color: #ff4444;
//         }

//         .toast-message {
//           flex: 1;
//           color: #333;
//           font-weight: 500;
//         }

//         .toast-close {
//           background: none;
//           border: none;
//           color: #999;
//           cursor: pointer;
//           font-size: 1.5rem;
//           padding: 0;
//           line-height: 1;
//           flex-shrink: 0;
//           transition: color 0.3s ease;
//         }

//         .toast-close:hover {
//           color: #333;
//         }

//         /* Delete Confirmation Modal */
//         .delete-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9998;
//           padding: 1rem;
//         }

//         .delete-modal {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           max-width: 400px;
//           width: 100%;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//           animation: slideUp 0.3s ease;
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(50px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .delete-modal-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//           color: #ff4444;
//         }

//         .delete-modal-title {
//           font-size: 1.3rem;
//           font-weight: 700;
//           margin: 0;
//         }

//         .delete-modal-body {
//           color: #666;
//           margin-bottom: 1.5rem;
//           line-height: 1.6;
//         }

//         .delete-modal-footer {
//           display: flex;
//           gap: 1rem;
//           justify-content: flex-end;
//         }

//         .modal-btn {
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .modal-btn-cancel {
//           background: #E8F4F8;
//           color: #0077B6;
//         }

//         .modal-btn-cancel:hover {
//           background: #CAF0F8;
//         }

//         .modal-btn-delete {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           color: white;
//         }

//         .modal-btn-delete:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .modal-btn-delete:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Responsive Design */
//         @media (max-width: 992px) {
//           .schedule-management-container {
//             padding: 1.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           }

//           .schedule-title {
//             font-size: 1.5rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .filter-grid {
//             grid-template-columns: 1fr;
//           }

//           .schedule-table {
//             font-size: 0.8rem;
//           }

//           .schedule-table th,
//           .schedule-table td {
//             padding: 0.5rem 0.25rem;
//           }

//           .action-buttons {
//             flex-direction: column;
//             width: 100%;
//           }

//           .refresh-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .edusched-toast {
//             left: 1rem;
//             right: 1rem;
//             min-width: auto;
//           }

//           .delete-modal {
//             margin: 1rem;
//           }
//         }

//         @media (max-width: 576px) {
//           .schedule-management-container {
//             padding: 1rem;
//           }

//           .schedule-title {
//             font-size: 1.3rem;
//             gap: 0.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: 1fr;
//           }

//           .stat-card {
//             padding: 1rem;
//           }

//           .group-title {
//             gap: 0.5rem;
//             font-size: 0.95rem;
//           }

//           .instructor-card {
//             padding: 0.75rem;
//           }

//           .delete-modal {
//             padding: 1.5rem;
//           }
//         }
//       `}</style>

//       <div className="schedule-management-container">
//         {/* Toast Notifications */}
//         {toast && (
//           <div className={`edusched-toast toast-${toast.type}`}>
//             <div className="toast-icon">
//               {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
//             </div>
//             <span className="toast-message">{toast.message}</span>
//             <button className="toast-close" onClick={() => setToast(null)}>×</button>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="delete-modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
//             <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="delete-modal-header">
//                 <AlertCircle size={28} />
//                 <h3 className="delete-modal-title">Delete Schedule?</h3>
//               </div>
//               <p className="delete-modal-body">
//                 Are you sure you want to delete this schedule? This action cannot be undone.
//               </p>
//               <div className="delete-modal-footer">
//                 <button
//                   className="modal-btn modal-btn-cancel"
//                   onClick={() => setDeleteConfirm(null)}
//                   disabled={deleting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="modal-btn modal-btn-delete"
//                   onClick={() => handleDeleteSchedule(deleteConfirm)}
//                   disabled={deleting}
//                 >
//                   {deleting ? (
//                     <>
//                       <Spinner animation="border" size="sm" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="schedule-header">
//           <div className="schedule-title">
//             <Calendar size={32} />
//             Schedule Management
//           </div>
//           <p className="schedule-subtitle">View and manage all generated class schedules</p>
//         </div>

//         {/* Statistics Section */}
//         {!error && schedules.length > 0 && (
//           <div className="statistics-grid">
//             <div className="stat-card">
//               <Calendar className="stat-icon" size={28} />
//               <div className="stat-label">Total Schedules</div>
//               <div className="stat-value">{statistics.totalSchedules}</div>
//             </div>
//             <div className="stat-card">
//               <Users className="stat-icon" size={28} />
//               <div className="stat-label">Instructors</div>
//               <div className="stat-value">{statistics.uniqueInstructors}</div>
//             </div>
//             <div className="stat-card">
//               <MapPin className="stat-icon" size={28} />
//               <div className="stat-label">Rooms</div>
//               <div className="stat-value">{statistics.uniqueRooms}</div>
//             </div>
//             <div className="stat-card">
//               <BookOpen className="stat-icon" size={28} />
//               <div className="stat-label">Courses</div>
//               <div className="stat-value">{statistics.uniqueCourses}</div>
//             </div>
//           </div>
//         )}

//         {/* Filter Section */}
//         {!error && schedules.length > 0 && (
//           <div className="filter-section">
//             <div className="filter-title">
//               <Search size={20} />
//               Filter & Search
//             </div>
//             <div className="filter-grid">
//               <div className="search-input-group">
//                 <label className="filter-label">Search</label>
//                 <div className="search-input-group" style={{ position: "relative" }}>
//                   <input
//                     type="text"
//                     className="search-input"
//                     placeholder="Search by subject, instructor, room..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <Search className="search-icon" size={18} />
//                 </div>
//               </div>

//               <div>
//                 <label className="filter-label">Semester</label>
//                 <select
//                   className="filter-select"
//                   value={filterSemester}
//                   onChange={(e) => setFilterSemester(e.target.value)}
//                 >
//                   <option value="">All Semesters</option>
//                   {filterOptions.semesters.map(sem => (
//                     <option key={sem} value={sem}>{sem}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Year Level</label>
//                 <select
//                   className="filter-select"
//                   value={filterYear}
//                   onChange={(e) => setFilterYear(e.target.value)}
//                 >
//                   <option value="">All Years</option>
//                   {filterOptions.years.map(year => (
//                     <option key={year} value={year}>{year} Year</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Instructor</label>
//                 <select
//                   className="filter-select"
//                   value={filterInstructor}
//                   onChange={(e) => setFilterInstructor(e.target.value)}
//                 >
//                   <option value="">All Instructors</option>
//                   {filterOptions.instructors.map(inst => (
//                     <option key={inst} value={inst}>{inst}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="action-buttons" style={{ alignSelf: "flex-end", marginTop: "1.5rem" }}>
//                 <button
//                   className="refresh-btn"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setFilterSemester("");
//                     setFilterYear("");
//                     setFilterInstructor("");
//                   }}
//                 >
//                   Clear Filters
//                 </button>
//                 <button className="refresh-btn" onClick={fetchSchedules}>
//                   <RotateCw size={18} />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="empty-state-container">
//             <AlertCircle className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">Unable to Load Schedules</h3>
//             <p className="empty-state-text">{error}</p>
//             <button className="refresh-btn" onClick={fetchSchedules} style={{ marginTop: "1.5rem" }}>
//               <RotateCw size={18} />
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {!error && filteredSchedules.length === 0 && schedules.length === 0 && (
//           <div className="empty-state-container">
//             <Calendar className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Schedules Generated</h3>
//             <p className="empty-state-text">
//               No schedules have been generated yet. Start by having Deans generate class schedules.
//             </p>
//           </div>
//         )}

//         {/* No Results State (After Filtering) */}
//         {!error && filteredSchedules.length === 0 && schedules.length > 0 && (
//           <div className="empty-state-container">
//             <Search className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Results Found</h3>
//             <p className="empty-state-text">
//               No schedules match your current filters. Try adjusting your search criteria.
//             </p>
//             <button
//               className="refresh-btn"
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterSemester("");
//                 setFilterYear("");
//                 setFilterInstructor("");
//               }}
//               style={{ marginTop: "1.5rem" }}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}

//         {/* Schedules Display */}
//         {!error && filteredSchedules.length > 0 && (
//           <div>
//             {Object.keys(groupedSchedules).map((groupKey, groupIndex) => {
//               const [year, semester] = groupKey.split(" - ");
//               const schedulesByInstructor = groupedSchedules[groupKey].reduce((acc, s) => {
//                 const instructor = s.instructor_name || "Unassigned Instructor";
//                 if (!acc[instructor]) acc[instructor] = [];
//                 acc[instructor].push(s);
//                 return acc;
//               }, {});

//               return (
//                 <div key={groupIndex} className="schedule-group-card">
//                   <div className="group-header">
//                     <div className="group-title">
//                       <Calendar size={20} />
//                       {groupKey}
//                       <span className="group-count">
//                         {groupedSchedules[groupKey].length} classes
//                       </span>
//                     </div>
//                     <ChevronDown size={22} className="group-chevron open" />
//                   </div>

//                   <div>
//                     {Object.entries(schedulesByInstructor).map(([instructor, instructorSchedules], i) => (
//                       <div key={i} className="instructor-card">
//                         <div className="instructor-header">
//                           <div>
//                             <div className="instructor-name">
//                               <Users size={18} />
//                               {instructor}
//                             </div>
//                             <div className="instructor-course">
//                               {instructorSchedules[0]?.course_name
//                                 ? `${instructorSchedules[0].course_name}`
//                                 : "(No Course Assigned)"}
//                             </div>
//                           </div>
//                           <Badge bg="secondary" className="id-badge">
//                             {instructorSchedules.length} class{instructorSchedules.length !== 1 ? "es" : ""}
//                           </Badge>
//                         </div>

//                         <div className="table-responsive">
//                           <Table hover className="schedule-table">
//                             <thead>
//                               <tr>
//                                 <th>ID</th>
//                                 <th>Day</th>
//                                 <th>Time</th>
//                                 <th>Subject</th>
//                                 <th>Room</th>
//                                 <th className="action-cell">Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {instructorSchedules.map((schedule) => (
//                                 <tr key={schedule.id}>
//                                   <td>
//                                     <Badge bg="secondary" className="id-badge">
//                                       #{schedule.id}
//                                     </Badge>
//                                   </td>
//                                   <td className="day-cell">
//                                     <strong>{schedule.day}</strong>
//                                   </td>
//                                   <td>
//                                     <span className="time-cell">
//                                       <Clock size={14} className="me-1" style={{ display: "inline" }} />
//                                       {slotToTime(schedule.slot_index)}
//                                     </span>
//                                   </td>
//                                   <td>
//                                     <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
//                                       <strong>{schedule.subject_code}</strong>
//                                       <small style={{ color: "#999" }}>
//                                         {schedule.subject_name}
//                                       </small>
//                                     </div>
//                                   </td>
//                                   <td>
//                                     {schedule.room_name ? (
//                                       <Badge bg="info">
//                                         <MapPin size={12} className="me-1" style={{ display: "inline" }} />
//                                         {schedule.room_name}
//                                       </Badge>
//                                     ) : (
//                                       <Badge bg="secondary" className="unassigned-badge">
//                                         Unassigned
//                                       </Badge>
//                                     )}
//                                   </td>
//                                   <td className="action-cell">
//                                     <button
//                                       className="delete-btn"
//                                       onClick={() => setDeleteConfirm(schedule.id)}
//                                       disabled={deleting}
//                                       title="Delete this schedule"
//                                     >
//                                       <Trash2 size={16} />
//                                       Delete
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </Table>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ScheduleManagement;

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Card, Table, Spinner, Alert, Badge, Button, InputGroup, Form, Accordion } from "react-bootstrap";
// import { Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, RotateCw, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";

// const ScheduleManagement = () => {
//   // State management
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterSemester, setFilterSemester] = useState("");
//   const [filterYear, setFilterYear] = useState("");
//   const [filterInstructor, setFilterInstructor] = useState("");
//   const [toast, setToast] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

//   /**
//    * Fetch all schedules from backend
//    */
//   const fetchSchedules = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");
//       const data = await res.json();
//       setSchedules(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching schedules:", err);
//       setError(err.message);
//       showToast("Failed to load schedules", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [API]);

//   /**
//    * Delete a schedule entry with confirmation
//    */
//   const handleDeleteSchedule = async (ids) => {
//     setDeleting(true);
//     try {
//       // If ids is an array, delete multiple schedules
//       const idsToDelete = Array.isArray(ids) ? ids : [ids];
      
//       await Promise.all(
//         idsToDelete.map(id =>
//           fetch(`${API}/api/scheduler/${id}`, { method: "DELETE" })
//         )
//       );
      
//       setSchedules((prev) => prev.filter((s) => !idsToDelete.includes(s.id)));
//       setDeleteConfirm(null);
//       showToast(
//         `${idsToDelete.length} schedule${idsToDelete.length > 1 ? 's' : ''} deleted successfully`,
//         "success"
//       );
//     } catch (err) {
//       console.error("Error deleting schedule:", err);
//       showToast("Failed to delete schedule", "error");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /**
//    * Show toast notification
//    */
//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   /**
//    * Convert slot index to readable time format (HH:00 - HH:00)
//    */
//   const slotToTime = useCallback((slotIndex) => {
//     const startHour = 8 + slotIndex;
//     const endHour = startHour + 1;
//     return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
//   }, []);

//   /**
//    * Extract unique filter options from schedules
//    */
//   const filterOptions = useMemo(() => {
//     const semesters = [...new Set(schedules.map(s => s.semester || "Unspecified"))];
//     const years = [...new Set(schedules.map(s => s.year_level || "Unspecified"))].sort();
//     const instructors = [...new Set(schedules.map(s => s.instructor_name || "Unassigned"))].sort();
    
//     return {
//       semesters: semesters.filter(s => s),
//       years: years.filter(y => y),
//       instructors: instructors.filter(i => i)
//     };
//   }, [schedules]);

//   /**
//    * Filter schedules based on search and filter criteria
//    */
//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(s => {
//       const matchesSearch = 
//         s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.course_name?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesSemester = !filterSemester || s.semester === filterSemester;
//       const matchesYear = !filterYear || String(s.year_level) === filterYear;
//       const matchesInstructor = !filterInstructor || s.instructor_name === filterInstructor;

//       return matchesSearch && matchesSemester && matchesYear && matchesInstructor;
//     });
//   }, [schedules, searchTerm, filterSemester, filterYear, filterInstructor]);

//   /**
//    * Combine schedules with same subject and room
//    */
//   const combinedSchedules = useMemo(() => {
//     const combined = {};
    
//     filteredSchedules.forEach(schedule => {
//       // Create a unique key based on subject, room, instructor, year, and semester
//       const key = `${schedule.subject_id || 'no-subject'}-${schedule.room_id || 'no-room'}-${schedule.instructor_id || 'no-instructor'}-${schedule.year_level || 'no-year'}-${schedule.semester || 'no-semester'}`;
      
//       if (!combined[key]) {
//         combined[key] = {
//           ...schedule,
//           scheduleIds: [schedule.id],
//           timeslots: [{
//             id: schedule.id,
//             day: schedule.day,
//             slot_index: schedule.slot_index,
//             time: slotToTime(schedule.slot_index)
//           }]
//         };
//       } else {
//         combined[key].scheduleIds.push(schedule.id);
//         combined[key].timeslots.push({
//           id: schedule.id,
//           day: schedule.day,
//           slot_index: schedule.slot_index,
//           time: slotToTime(schedule.slot_index)
//         });
//       }
//     });
    
//     // Sort timeslots by day and time
//     Object.values(combined).forEach(item => {
//       const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
//       item.timeslots.sort((a, b) => {
//         if (dayOrder[a.day] !== dayOrder[b.day]) {
//           return dayOrder[a.day] - dayOrder[b.day];
//         }
//         return a.slot_index - b.slot_index;
//       });
//     });
    
//     return Object.values(combined);
//   }, [filteredSchedules, slotToTime]);

//   /**
//    * Group combined schedules by year and semester
//    */
//   const groupedSchedules = useMemo(() => {
//     return combinedSchedules.reduce((acc, s) => {
//       const semester = s.semester || "Unspecified Semester";
//       const year = s.year_level || "Unspecified Year";
//       const groupKey = `${year} Year - ${semester} Semester`;

//       if (!acc[groupKey]) acc[groupKey] = [];
//       acc[groupKey].push(s);
//       return acc;
//     }, {});
//   }, [combinedSchedules]);

//   /**
//    * Calculate summary statistics
//    */
//   const statistics = useMemo(() => {
//     const totalSchedules = combinedSchedules.length;
//     const uniqueInstructors = new Set(combinedSchedules.map(s => s.instructor_id)).size;
//     const uniqueRooms = new Set(combinedSchedules.map(s => s.room_id).filter(Boolean)).size;
//     const uniqueCourses = new Set(combinedSchedules.map(s => s.course_id).filter(Boolean)).size;

//     return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueCourses };
//   }, [combinedSchedules]);

//   // Fetch schedules on component mount
//   useEffect(() => {
//     fetchSchedules();
//   }, [fetchSchedules]);

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="schedule-loading-container">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Loading schedules...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         /* ============================================
//            EduSched Schedule Management Styles
//            ============================================ */

//         .schedule-management-container {
//           padding: 2rem;
//          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           min-height: 100vh;
//         }

//         .schedule-header {
//           margin-bottom: 2rem;
//         }

//         .schedule-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .schedule-subtitle {
//           color: #666;
//           font-size: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         /* Statistics Cards */
//         .statistics-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           border-left: 4px solid #0077B6;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(0, 119, 182, 0.15);
//         }

//         .stat-icon {
//           color: #0077B6;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 0.5rem;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         /* Filter Section */
//         .filter-section {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .filter-title {
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .filter-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .search-input-group {
//           position: relative;
//         }

//         .search-input {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem 2.5rem 0.75rem 1rem;
//           width: 100%;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .search-icon {
//           position: absolute;
//           right: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #0077B6;
//           pointer-events: none;
//         }

//         .filter-select {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .filter-select:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .filter-label {
//           font-weight: 500;
//           color: #03045E;
//           display: block;
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .refresh-btn {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .refresh-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         /* Loading State */
//         .schedule-loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           color: #0077B6;
//         }

//         /* Empty State */
//         .empty-state-container {
//           text-align: center;
//           padding: 4rem 2rem;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .empty-state-icon {
//           color: #90E0EF;
//           margin-bottom: 1rem;
//         }

//         .empty-state-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .empty-state-text {
//           color: #666;
//           font-size: 0.95rem;
//         }

//         /* Group Cards */
//         .schedule-group-card {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           margin-bottom: 1.5rem;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .schedule-group-card:hover {
//           box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
//         }

//         .group-header {
//           background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
//           color: white;
//           padding: 1.5rem;
//           cursor: pointer;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 600;
//           transition: all 0.3s ease;
//           user-select: none;
//         }

//         .group-header:hover {
//           background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
//         }

//         .group-title {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .group-count {
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 500;
//         }

//         .group-chevron {
//           transition: transform 0.3s ease;
//         }

//         .group-chevron.open {
//           transform: rotate(180deg);
//         }

//         .instructor-card {
//           border-top: 1px solid #E8F4F8;
//           padding: 1rem;
//           background: #FAFCFD;
//           border-left: 4px solid #00B4D8;
//         }

//         .instructor-card:last-child {
//           border-bottom: none;
//         }

//         .instructor-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//           font-weight: 600;
//           color: #03045E;
//         }

//         .instructor-name {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1rem;
//         }

//         .instructor-course {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 400;
//           margin-left: 1.75rem;
//         }

//         .schedule-table {
//           margin-bottom: 0;
//           font-size: 0.9rem;
//         }

//         .schedule-table thead {
//           background: #CAF0F8;
//           color: #03045E;
//         }

//         .schedule-table th {
//           padding: 0.75rem;
//           font-weight: 600;
//           border: none;
//           text-transform: uppercase;
//           font-size: 0.8rem;
//           letter-spacing: 0.5px;
//         }

//         .schedule-table td {
//           padding: 0.75rem;
//           vertical-align: middle;
//           border-bottom: 1px solid #E8F4F8;
//         }

//         .schedule-table tbody tr:hover {
//           background-color: #F8FCFD;
//         }

//         .schedule-table tbody tr:last-child td {
//           border-bottom: none;
//         }

//         .id-badge {
//           font-weight: 600;
//           font-size: 0.85rem;
//         }

//         .timeslots-container {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .timeslot-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.5rem;
//           background: linear-gradient(135deg, #E8F4F8 0%, #CAF0F8 100%);
//           border-radius: 8px;
//           border-left: 3px solid #0077B6;
//         }

//         .day-badge {
//           background: #0077B6;
//           color: white;
//           padding: 0.25rem 0.75rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.85rem;
//           min-width: 90px;
//           text-align: center;
//         }

//         .time-badge {
//           background: white;
//           color: #0077B6;
//           padding: 0.25rem 0.75rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.85rem;
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           border: 1px solid #0077B6;
//         }

//         .unassigned-badge {
//           font-size: 0.75rem;
//           padding: 0.25rem 0.5rem;
//         }

//         .action-cell {
//           text-align: center;
//         }

//         .delete-btn {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           border: none;
//           padding: 0.5rem 0.75rem;
//           border-radius: 8px;
//           color: white;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.4rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.85rem;
//         }

//         .delete-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .delete-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Toast Notifications */
//         .edusched-toast {
//           position: fixed;
//           top: 2rem;
//           right: 2rem;
//           min-width: 320px;
//           background: white;
//           border-radius: 12px;
//           padding: 1rem 1.5rem;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           z-index: 9999;
//           animation: slideInToast 0.3s ease;
//           border-left: 4px solid;
//         }

//         @keyframes slideInToast {
//           from {
//             transform: translateX(400px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .toast-success {
//           border-left-color: #00c851;
//         }

//         .toast-error {
//           border-left-color: #ff4444;
//         }

//         .toast-icon {
//           flex-shrink: 0;
//         }

//         .toast-success .toast-icon {
//           color: #00c851;
//         }

//         .toast-error .toast-icon {
//           color: #ff4444;
//         }

//         .toast-message {
//           flex: 1;
//           color: #333;
//           font-weight: 500;
//         }

//         .toast-close {
//           background: none;
//           border: none;
//           color: #999;
//           cursor: pointer;
//           font-size: 1.5rem;
//           padding: 0;
//           line-height: 1;
//           flex-shrink: 0;
//           transition: color 0.3s ease;
//         }

//         .toast-close:hover {
//           color: #333;
//         }

//         /* Delete Confirmation Modal */
//         .delete-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9998;
//           padding: 1rem;
//         }

//         .delete-modal {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           max-width: 400px;
//           width: 100%;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//           animation: slideUp 0.3s ease;
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(50px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .delete-modal-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//           color: #ff4444;
//         }

//         .delete-modal-title {
//           font-size: 1.3rem;
//           font-weight: 700;
//           margin: 0;
//         }

//         .delete-modal-body {
//           color: #666;
//           margin-bottom: 1.5rem;
//           line-height: 1.6;
//         }

//         .delete-modal-footer {
//           display: flex;
//           gap: 1rem;
//           justify-content: flex-end;
//         }

//         .modal-btn {
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .modal-btn-cancel {
//           background: #E8F4F8;
//           color: #0077B6;
//         }

//         .modal-btn-cancel:hover {
//           background: #CAF0F8;
//         }

//         .modal-btn-delete {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           color: white;
//         }

//         .modal-btn-delete:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .modal-btn-delete:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Responsive Design */
//         @media (max-width: 992px) {
//           .schedule-management-container {
//             padding: 1.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           }

//           .schedule-title {
//             font-size: 1.5rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .filter-grid {
//             grid-template-columns: 1fr;
//           }

//           .schedule-table {
//             font-size: 0.8rem;
//           }

//           .schedule-table th,
//           .schedule-table td {
//             padding: 0.5rem 0.25rem;
//           }

//           .action-buttons {
//             flex-direction: column;
//             width: 100%;
//           }

//           .refresh-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .edusched-toast {
//             left: 1rem;
//             right: 1rem;
//             min-width: auto;
//           }

//           .delete-modal {
//             margin: 1rem;
//           }

//           .timeslot-item {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .day-badge {
//             min-width: auto;
//           }
//         }

//         @media (max-width: 576px) {
//           .schedule-management-container {
//             padding: 1rem;
//           }

//           .schedule-title {
//             font-size: 1.3rem;
//             gap: 0.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: 1fr;
//           }

//           .stat-card {
//             padding: 1rem;
//           }

//           .group-title {
//             gap: 0.5rem;
//             font-size: 0.95rem;
//           }

//           .instructor-card {
//             padding: 0.75rem;
//           }

//           .delete-modal {
//             padding: 1.5rem;
//           }
//         }
//       `}</style>

//       <div className="schedule-management-container">
//         {/* Toast Notifications */}
//         {toast && (
//           <div className={`edusched-toast toast-${toast.type}`}>
//             <div className="toast-icon">
//               {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
//             </div>
//             <span className="toast-message">{toast.message}</span>
//             <button className="toast-close" onClick={() => setToast(null)}>×</button>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="delete-modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
//             <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="delete-modal-header">
//                 <AlertCircle size={28} />
//                 <h3 className="delete-modal-title">Delete Schedule?</h3>
//               </div>
//               <p className="delete-modal-body">
//                 Are you sure you want to delete {Array.isArray(deleteConfirm) ? `these ${deleteConfirm.length} schedules` : 'this schedule'}? This action cannot be undone.
//               </p>
//               <div className="delete-modal-footer">
//                 <button
//                   className="modal-btn modal-btn-cancel"
//                   onClick={() => setDeleteConfirm(null)}
//                   disabled={deleting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="modal-btn modal-btn-delete"
//                   onClick={() => handleDeleteSchedule(deleteConfirm)}
//                   disabled={deleting}
//                 >
//                   {deleting ? (
//                     <>
//                       <Spinner animation="border" size="sm" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="schedule-header">
//           <div className="schedule-title">
//             <Calendar size={32} />
//             Schedule Management
//           </div>
//           <p className="schedule-subtitle">View and manage all generated class schedules</p>
//         </div>

//         {/* Statistics Section */}
//         {!error && schedules.length > 0 && (
//           <div className="statistics-grid">
//             <div className="stat-card">
//               <Calendar className="stat-icon" size={28} />
//               <div className="stat-label">Total Classes</div>
//               <div className="stat-value">{statistics.totalSchedules}</div>
//             </div>
//             <div className="stat-card">
//               <Users className="stat-icon" size={28} />
//               <div className="stat-label">Instructors</div>
//               <div className="stat-value">{statistics.uniqueInstructors}</div>
//             </div>
//             <div className="stat-card">
//               <MapPin className="stat-icon" size={28} />
//               <div className="stat-label">Rooms</div>
//               <div className="stat-value">{statistics.uniqueRooms}</div>
//             </div>
//             <div className="stat-card">
//               <BookOpen className="stat-icon" size={28} />
//               <div className="stat-label">Courses</div>
//               <div className="stat-value">{statistics.uniqueCourses}</div>
//             </div>
//           </div>
//         )}

//         {/* Filter Section */}
//         {!error && schedules.length > 0 && (
//           <div className="filter-section">
//             <div className="filter-title">
//               <Search size={20} />
//               Filter & Search
//             </div>
//             <div className="filter-grid">
//               <div className="search-input-group">
//                 <label className="filter-label">Search</label>
//                 <div className="search-input-group" style={{ position: "relative" }}>
//                   <input
//                     type="text"
//                     className="search-input"
//                     placeholder="Search by subject, instructor, room..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <Search className="search-icon" size={18} />
//                 </div>
//               </div>

//               <div>
//                 <label className="filter-label">Semester</label>
//                 <select
//                   className="filter-select"
//                   value={filterSemester}
//                   onChange={(e) => setFilterSemester(e.target.value)}
//                 >
//                   <option value="">All Semesters</option>
//                   {filterOptions.semesters.map(sem => (
//                     <option key={sem} value={sem}>{sem}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Year Level</label>
//                 <select
//                   className="filter-select"
//                   value={filterYear}
//                   onChange={(e) => setFilterYear(e.target.value)}
//                 >
//                   <option value="">All Years</option>
//                   {filterOptions.years.map(year => (
//                     <option key={year} value={year}>{year} Year</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Instructor</label>
//                 <select
//                   className="filter-select"
//                   value={filterInstructor}
//                   onChange={(e) => setFilterInstructor(e.target.value)}
//                 >
//                   <option value="">All Instructors</option>
//                   {filterOptions.instructors.map(inst => (
//                     <option key={inst} value={inst}>{inst}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="action-buttons" style={{ alignSelf: "flex-end", marginTop: "1.5rem" }}>
//                 <button
//                   className="refresh-btn"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setFilterSemester("");
//                     setFilterYear("");
//                     setFilterInstructor("");
//                   }}
//                 >
//                   Clear Filters
//                 </button>
//                 <button className="refresh-btn" onClick={fetchSchedules}>
//                   <RotateCw size={18} />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="empty-state-container">
//             <AlertCircle className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">Unable to Load Schedules</h3>
//             <p className="empty-state-text">{error}</p>
//             <button className="refresh-btn" onClick={fetchSchedules} style={{ marginTop: "1.5rem" }}>
//               <RotateCw size={18} />
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {!error && combinedSchedules.length === 0 && schedules.length === 0 && (
//           <div className="empty-state-container">
//             <Calendar className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Schedules Generated</h3>
//             <p className="empty-state-text">
//               No schedules have been generated yet. Start by having Deans generate class schedules.
//             </p>
//           </div>
//         )}

//         {/* No Results State (After Filtering) */}
//         {!error && combinedSchedules.length === 0 && schedules.length > 0 && (
//           <div className="empty-state-container">
//             <Search className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Results Found</h3>
//             <p className="empty-state-text">
//               No schedules match your current filters. Try adjusting your search criteria.
//             </p>
//             <button
//               className="refresh-btn"
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterSemester("");
//                 setFilterYear("");
//                 setFilterInstructor("");
//               }}
//               style={{ marginTop: "1.5rem" }}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}

//         {/* Schedules Display */}
//         {!error && combinedSchedules.length > 0 && (
//           <div>
//             {Object.keys(groupedSchedules).map((groupKey, groupIndex) => {
//               const schedulesByInstructor = groupedSchedules[groupKey].reduce((acc, s) => {
//                 const instructor = s.instructor_name || "Unassigned Instructor";
//                 if (!acc[instructor]) acc[instructor] = [];
//                 acc[instructor].push(s);
//                 return acc;
//               }, {});

//               return (
//                 <div key={groupIndex} className="schedule-group-card">
//                   <div className="group-header">
//                     <div className="group-title">
//                       <Calendar size={20} />
//                       {groupKey}
//                       <span className="group-count">
//                         {groupedSchedules[groupKey].length} classes
//                       </span>
//                     </div>
//                     <ChevronDown size={22} className="group-chevron open" />
//                   </div>

//                   <div>
//                     {Object.entries(schedulesByInstructor).map(([instructor, instructorSchedules], i) => (
//                       <div key={i} className="instructor-card">
//                         <div className="instructor-header">
//                           <div>
//                             <div className="instructor-name">
//                               <Users size={18} />
//                               {instructor}
//                             </div>
//                             <div className="instructor-course">
//                               {instructorSchedules[0]?.course_name
//                                 ? `${instructorSchedules[0].course_name}`
//                                 : "(No Course Assigned)"}
//                             </div>
//                           </div>
//                           <Badge bg="secondary" className="id-badge">
//                             {instructorSchedules.length} class{instructorSchedules.length !== 1 ? "es" : ""}
//                           </Badge>
//                         </div>

//                         <div className="table-responsive">
//                           <Table hover className="schedule-table">
//                             <thead>
//                               <tr>
//                                 <th>Subject</th>
//                                 <th>Room</th>
//                                 <th>Schedule</th>
//                                 <th className="action-cell">Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {instructorSchedules.map((schedule) => (
//                                 <tr key={schedule.scheduleIds.join('-')}>
//                                   <td>
//                                     <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
//                                       <strong>{schedule.subject_code}</strong>
//                                       <small style={{ color: "#999" }}>
//                                         {schedule.subject_name}
//                                       </small>
//                                     </div>
//                                   </td>
//                                   <td>
//                                     {schedule.room_name ? (
//                                       <Badge bg="info">
//                                         <MapPin size={12} className="me-1" style={{ display: "inline" }} />
//                                         {schedule.room_name}
//                                       </Badge>
//                                     ) : (
//                                       <Badge bg="secondary" className="unassigned-badge">
//                                         Unassigned
//                                       </Badge>
//                                     )}
//                                   </td>
//                                   <td>
//                                     <div className="timeslots-container">
//                                       {schedule.timeslots.map((timeslot, idx) => (
//                                         <div key={idx} className="timeslot-item">
//                                           <span className="day-badge">{timeslot.day}</span>
//                                           <span className="time-badge">
//                                             <Clock size={12} />
//                                             {timeslot.time}
//                                           </span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </td>
//                                   <td className="action-cell">
//                                     <button
//                                       className="delete-btn"
//                                       onClick={() => setDeleteConfirm(schedule.scheduleIds)}
//                                       disabled={deleting}
//                                       title="Delete all timeslots for this class"
//                                     >
//                                       <Trash2 size={16} />
//                                       Delete
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </Table>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ScheduleManagement;

//WORKING IN PRE ORAL BUT WITHOUT FILTERING

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Card, Table, Spinner, Alert, Badge, Button, InputGroup, Form, Accordion } from "react-bootstrap";
// import { Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, RotateCw, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";
// // import { API } from '../../config/api';

// const ScheduleManagement = () => {
//   // State management
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterSemester, setFilterSemester] = useState("");
//   const [filterYear, setFilterYear] = useState("");
//   const [filterInstructor, setFilterInstructor] = useState("");
//   const [filterCourse, setFilterCourse] = useState("");
//   const [toast, setToast] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   // const API_BASE =
//   // process.env.REACT_APP_API_URL ||
//   // (window.location.hostname === 'localhost'
//   //   ? 'http://localhost:5000'
//   //   : 'https://lavenderblush-chinchilla-571128.hostingersite.com ');

//   const COLORS = {
//     primary: "#03045E",
//     secondary: "#023E8A",
//     accent: "#0077B6",
//     light: "#00B4D8",
//     lighter: "#48CAE4",
//     lightest: "#CAF0F8",
//   };

//   /**
//    * Fetch all schedules from backend with course details
//    */
//   const fetchSchedules = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [schedulesRes, coursesRes] = await Promise.all([
//         fetch(`${API}/api/scheduler`),
//         fetch(`${API}/api/courses`)
//       ]);
      
//       if (!schedulesRes.ok) throw new Error("Failed to fetch schedules");
      
//       const schedulesData = await schedulesRes.json();
//       const coursesData = coursesRes.ok ? await coursesRes.json() : [];
      
//       // Enrich schedules with course information
//       const enrichedSchedules = (Array.isArray(schedulesData) ? schedulesData : []).map(schedule => {
//         const course = (Array.isArray(coursesData) ? coursesData : []).find(c => c.id === schedule.course_id);
//         return {
//           ...schedule,
//           course_name: course?.name || schedule.course_name || 'Unknown Course',
//           course_code: course?.code || schedule.course_code || 'N/A'
//         };
//       });
      
//       setSchedules(enrichedSchedules);
//     } catch (err) {
//       console.error("Error fetching schedules:", err);
//       setError(err.message);
//       showToast("Failed to load schedules", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [API]);

//   /**
//    * Delete a schedule entry with confirmation
//    */
//   const handleDeleteSchedule = async (ids) => {
//     setDeleting(true);
//     try {
//       // If ids is an array, delete multiple schedules
//       const idsToDelete = Array.isArray(ids) ? ids : [ids];
      
//       await Promise.all(
//         idsToDelete.map(id =>
//           fetch(`${API}/api/scheduler/${id}`, { method: "DELETE" })
//         )
//       );
      
//       setSchedules((prev) => prev.filter((s) => !idsToDelete.includes(s.id)));
//       setDeleteConfirm(null);
//       showToast(
//         `${idsToDelete.length} schedule${idsToDelete.length > 1 ? 's' : ''} deleted successfully`,
//         "success"
//       );
//     } catch (err) {
//       console.error("Error deleting schedule:", err);
//       showToast("Failed to delete schedule", "error");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /**
//    * Show toast notification
//    */
//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   /**
//    * Convert slot index to readable time format (HH:00 - HH:00)
//    */
//   const slotToTime = useCallback((slotIndex) => {
//     const startHour = 7 + slotIndex;
//     const endHour = startHour + 1;
//     return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
//   }, []);

//   /**
//    * Extract unique filter options from schedules
//    */
//   const filterOptions = useMemo(() => {
//     const semesters = [...new Set(schedules.map(s => s.semester || "Unspecified"))].sort();
//     const years = [...new Set(schedules.map(s => s.year_level || "Unspecified"))].sort();
//     const instructors = [...new Set(schedules.map(s => s.instructor_name || "Unassigned"))].sort();
//     const courses = [...new Set(schedules.map(s => s.course_name || "Unknown Course"))].sort();
    
//     return {
//       semesters: semesters.filter(s => s),
//       years: years.filter(y => y),
//       instructors: instructors.filter(i => i),
//       courses: courses.filter(c => c)
//     };
//   }, [schedules]);

//   /**
//    * Filter schedules based on search and filter criteria
//    */
//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(s => {
//       const matchesSearch = 
//         s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         s.course_name?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesSemester = !filterSemester || s.semester === filterSemester;
//       const matchesYear = !filterYear || String(s.year_level) === filterYear;
//       const matchesInstructor = !filterInstructor || s.instructor_name === filterInstructor;
//       const matchesCourse = !filterCourse || s.course_name === filterCourse;

//       return matchesSearch && matchesSemester && matchesYear && matchesInstructor && matchesCourse;
//     });
//   }, [schedules, searchTerm, filterSemester, filterYear, filterInstructor, filterCourse]);

//   /**
//    * Combine schedules with same subject and room
//    */
//   const combinedSchedules = useMemo(() => {
//     const combined = {};
    
//     filteredSchedules.forEach(schedule => {
//       // Create a unique key based on subject, room, instructor, year, and semester
//       const key = `${schedule.subject_id || 'no-subject'}-${schedule.room_id || 'no-room'}-${schedule.instructor_id || 'no-instructor'}-${schedule.year_level || 'no-year'}-${schedule.semester || 'no-semester'}`;
      
//       if (!combined[key]) {
//         combined[key] = {
//           ...schedule,
//           scheduleIds: [schedule.id],
//           timeslots: [{
//             id: schedule.id,
//             day: schedule.day,
//             slot_index: schedule.slot_index,
//             time: slotToTime(schedule.slot_index)
//           }]
//         };
//       } else {
//         combined[key].scheduleIds.push(schedule.id);
//         combined[key].timeslots.push({
//           id: schedule.id,
//           day: schedule.day,
//           slot_index: schedule.slot_index,
//           time: slotToTime(schedule.slot_index)
//         });
//       }
//     });
    
//     // Sort timeslots by day and time
//     Object.values(combined).forEach(item => {
//       const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
//       item.timeslots.sort((a, b) => {
//         if (dayOrder[a.day] !== dayOrder[b.day]) {
//           return dayOrder[a.day] - dayOrder[b.day];
//         }
//         return a.slot_index - b.slot_index;
//       });
//     });
    
//     return Object.values(combined);
//   }, [filteredSchedules, slotToTime]);

//   /**
//    * Group combined schedules by course, year and semester
//    */
//   const groupedSchedules = useMemo(() => {
//     return combinedSchedules.reduce((acc, s) => {
//       const course = s.course_name || "Unknown Course";
//       const semester = s.semester || "Unspecified";
//       const year = s.year_level || "Unspecified";
//       const groupKey = `${course} - Year ${year} - Semester ${semester}`;

//       if (!acc[groupKey]) acc[groupKey] = [];
//       acc[groupKey].push(s);
//       return acc;
//     }, {});
//   }, [combinedSchedules]);

//   /**
//    * Calculate summary statistics
//    */
//   const statistics = useMemo(() => {
//     const totalSchedules = combinedSchedules.length;
//     const uniqueInstructors = new Set(combinedSchedules.map(s => s.instructor_id)).size;
//     const uniqueRooms = new Set(combinedSchedules.map(s => s.room_id).filter(Boolean)).size;
//     const uniqueCourses = new Set(combinedSchedules.map(s => s.course_id).filter(Boolean)).size;

//     return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueCourses };
//   }, [combinedSchedules]);

//   // Fetch schedules on component mount
//   useEffect(() => {
//     fetchSchedules();
//   }, [fetchSchedules]);

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="schedule-loading-container">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Loading schedules...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         /* ============================================
//            EduSched Schedule Management Styles
//            ============================================ */

//         .schedule-management-container {
//           padding: 2rem;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           min-height: 100vh;
//         }

//         .schedule-header {
//           margin-bottom: 2rem;
//         }

//         .schedule-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .schedule-subtitle {
//           color: #666;
//           font-size: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         /* Statistics Cards */
//         .statistics-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           border-left: 4px solid #0077B6;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(0, 119, 182, 0.15);
//         }

//         .stat-icon {
//           color: #0077B6;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 0.5rem;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         /* Filter Section */
//         .filter-section {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .filter-title {
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .filter-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .search-input-group {
//           position: relative;
//         }

//         .search-input {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem 2.5rem 0.75rem 1rem;
//           width: 100%;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .search-icon {
//           position: absolute;
//           right: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #0077B6;
//           pointer-events: none;
//         }

//         .filter-select {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .filter-select:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .filter-label {
//           font-weight: 500;
//           color: #03045E;
//           display: block;
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .refresh-btn {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .refresh-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         /* Loading State */
//         .schedule-loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           color: #0077B6;
//         }

//         /* Empty State */
//         .empty-state-container {
//           text-align: center;
//           padding: 4rem 2rem;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .empty-state-icon {
//           color: #90E0EF;
//           margin-bottom: 1rem;
//         }

//         .empty-state-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .empty-state-text {
//           color: #666;
//           font-size: 0.95rem;
//         }

//         /* Group Cards */
//         .schedule-group-card {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           margin-bottom: 1.5rem;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .schedule-group-card:hover {
//           box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
//         }

//         .group-header {
//           background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
//           color: white;
//           padding: 1.5rem;
//           cursor: pointer;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 600;
//           transition: all 0.3s ease;
//           user-select: none;
//         }

//         .group-header:hover {
//           background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
//         }

//         .group-title {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .group-count {
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 500;
//         }

//         .group-chevron {
//           transition: transform 0.3s ease;
//         }

//         .group-chevron.open {
//           transform: rotate(180deg);
//         }

//         .instructor-card {
//           border-top: 1px solid #E8F4F8;
//           padding: 1rem;
//           background: #FAFCFD;
//           border-left: 4px solid #00B4D8;
//         }

//         .instructor-card:last-child {
//           border-bottom: none;
//         }

//         .instructor-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//           font-weight: 600;
//           color: #03045E;
//         }

//         .instructor-name {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1rem;
//         }

//         .instructor-course {
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 400;
//           margin-left: 1.75rem;
//         }

//         .schedule-table {
//           margin-bottom: 0;
//           font-size: 0.9rem;
//         }

//         .schedule-table thead {
//           background: #CAF0F8;
//           color: #03045E;
//         }

//         .schedule-table th {
//           padding: 0.75rem;
//           font-weight: 600;
//           border: none;
//           text-transform: uppercase;
//           font-size: 0.8rem;
//           letter-spacing: 0.5px;
//         }

//         .schedule-table td {
//           padding: 0.75rem;
//           vertical-align: middle;
//           border-bottom: 1px solid #E8F4F8;
//         }

//         .schedule-table tbody tr:hover {
//           background-color: #F8FCFD;
//         }

//         .schedule-table tbody tr:last-child td {
//           border-bottom: none;
//         }

//         .id-badge {
//           font-weight: 600;
//           font-size: 0.85rem;
//         }

//         .timeslots-container {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .timeslot-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.5rem;
//           background: linear-gradient(135deg, #E8F4F8 0%, #CAF0F8 100%);
//           border-radius: 8px;
//           border-left: 3px solid #0077B6;
//         }

//         .day-badge {
//           background: #0077B6;
//           color: white;
//           padding: 0.25rem 0.75rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.85rem;
//           min-width: 90px;
//           text-align: center;
//         }

//         .time-badge {
//           background: white;
//           color: #0077B6;
//           padding: 0.25rem 0.75rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.85rem;
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           border: 1px solid #0077B6;
//         }

//         .unassigned-badge {
//           font-size: 0.75rem;
//           padding: 0.25rem 0.5rem;
//         }

//         .action-cell {
//           text-align: center;
//         }

//         .delete-btn {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           border: none;
//           padding: 0.5rem 0.75rem;
//           border-radius: 8px;
//           color: white;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.4rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.85rem;
//         }

//         .delete-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .delete-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Toast Notifications */
//         .edusched-toast {
//           position: fixed;
//           top: 2rem;
//           right: 2rem;
//           min-width: 320px;
//           background: white;
//           border-radius: 12px;
//           padding: 1rem 1.5rem;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           z-index: 9999;
//           animation: slideInToast 0.3s ease;
//           border-left: 4px solid;
//         }

//         @keyframes slideInToast {
//           from {
//             transform: translateX(400px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .toast-success {
//           border-left-color: #00c851;
//         }

//         .toast-error {
//           border-left-color: #ff4444;
//         }

//         .toast-icon {
//           flex-shrink: 0;
//         }

//         .toast-success .toast-icon {
//           color: #00c851;
//         }

//         .toast-error .toast-icon {
//           color: #ff4444;
//         }

//         .toast-message {
//           flex: 1;
//           color: #333;
//           font-weight: 500;
//         }

//         .toast-close {
//           background: none;
//           border: none;
//           color: #999;
//           cursor: pointer;
//           font-size: 1.5rem;
//           padding: 0;
//           line-height: 1;
//           flex-shrink: 0;
//           transition: color 0.3s ease;
//         }

//         .toast-close:hover {
//           color: #333;
//         }

//         /* Delete Confirmation Modal */
//         .delete-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9998;
//           padding: 1rem;
//         }

//         .delete-modal {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           max-width: 400px;
//           width: 100%;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//           animation: slideUp 0.3s ease;
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(50px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .delete-modal-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//           color: #ff4444;
//         }

//         .delete-modal-title {
//           font-size: 1.3rem;
//           font-weight: 700;
//           margin: 0;
//         }

//         .delete-modal-body {
//           color: #666;
//           margin-bottom: 1.5rem;
//           line-height: 1.6;
//         }

//         .delete-modal-footer {
//           display: flex;
//           gap: 1rem;
//           justify-content: flex-end;
//         }

//         .modal-btn {
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .modal-btn-cancel {
//           background: #E8F4F8;
//           color: #0077B6;
//         }

//         .modal-btn-cancel:hover {
//           background: #CAF0F8;
//         }

//         .modal-btn-delete {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
//           color: white;
//         }

//         .modal-btn-delete:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
//         }

//         .modal-btn-delete:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Responsive Design */
//         @media (max-width: 992px) {
//           .schedule-management-container {
//             padding: 1.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           }

//           .schedule-title {
//             font-size: 1.5rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .filter-grid {
//             grid-template-columns: 1fr;
//           }

//           .schedule-table {
//             font-size: 0.8rem;
//           }

//           .schedule-table th,
//           .schedule-table td {
//             padding: 0.5rem 0.25rem;
//           }

//           .action-buttons {
//             flex-direction: column;
//             width: 100%;
//           }

//           .refresh-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .edusched-toast {
//             left: 1rem;
//             right: 1rem;
//             min-width: auto;
//           }

//           .delete-modal {
//             margin: 1rem;
//           }

//           .timeslot-item {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .day-badge {
//             min-width: auto;
//           }
//         }

//         @media (max-width: 576px) {
//           .schedule-management-container {
//             padding: 1rem;
//           }

//           .schedule-title {
//             font-size: 1.3rem;
//             gap: 0.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: 1fr;
//           }

//           .stat-card {
//             padding: 1rem;
//           }

//           .group-title {
//             gap: 0.5rem;
//             font-size: 0.95rem;
//           }

//           .instructor-card {
//             padding: 0.75rem;
//           }

//           .delete-modal {
//             padding: 1.5rem;
//           }
//         }
//       `}</style>

//       <div className="schedule-management-container">
//         {/* Toast Notifications */}
//         {toast && (
//           <div className={`edusched-toast toast-${toast.type}`}>
//             <div className="toast-icon">
//               {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
//             </div>
//             <span className="toast-message">{toast.message}</span>
//             <button className="toast-close" onClick={() => setToast(null)}>×</button>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="delete-modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
//             <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="delete-modal-header">
//                 <AlertCircle size={28} />
//                 <h3 className="delete-modal-title">Delete Schedule?</h3>
//               </div>
//               <p className="delete-modal-body">
//                 Are you sure you want to delete {Array.isArray(deleteConfirm) ? `these ${deleteConfirm.length} schedules` : 'this schedule'}? This action cannot be undone.
//               </p>
//               <div className="delete-modal-footer">
//                 <button
//                   className="modal-btn modal-btn-cancel"
//                   onClick={() => setDeleteConfirm(null)}
//                   disabled={deleting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="modal-btn modal-btn-delete"
//                   onClick={() => handleDeleteSchedule(deleteConfirm)}
//                   disabled={deleting}
//                 >
//                   {deleting ? (
//                     <>
//                       <Spinner animation="border" size="sm" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="schedule-header">
//           <div className="schedule-title">
//             <Calendar size={32} />
//             Schedule Management
//           </div>
//           <p className="schedule-subtitle">View and manage all generated class schedules</p>
//         </div>

//         {/* Statistics Section */}
//         {!error && schedules.length > 0 && (
//           <div className="statistics-grid">
//             <div className="stat-card">
//               <Calendar className="stat-icon" size={28} />
//               <div className="stat-label">Total Classes</div>
//               <div className="stat-value">{statistics.totalSchedules}</div>
//             </div>
//             <div className="stat-card">
//               <Users className="stat-icon" size={28} />
//               <div className="stat-label">Instructors</div>
//               <div className="stat-value">{statistics.uniqueInstructors}</div>
//             </div>
//             <div className="stat-card">
//               <MapPin className="stat-icon" size={28} />
//               <div className="stat-label">Rooms</div>
//               <div className="stat-value">{statistics.uniqueRooms}</div>
//             </div>
//             <div className="stat-card">
//               <BookOpen className="stat-icon" size={28} />
//               <div className="stat-label">Courses</div>
//               <div className="stat-value">{statistics.uniqueCourses}</div>
//             </div>
//           </div>
//         )}

//         {/* Filter Section */}
//         {!error && schedules.length > 0 && (
//           <div className="filter-section">
//             <div className="filter-title">
//               <Search size={20} />
//               Filter & Search
//             </div>
//             <div className="filter-grid">
//               <div className="search-input-group">
//                 <label className="filter-label">Search</label>
//                 <div className="search-input-group" style={{ position: "relative" }}>
//                   <input
//                     type="text"
//                     className="search-input"
//                     placeholder="Search by subject, instructor, room..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <Search className="search-icon" size={18} />
//                 </div>
//               </div>

//               <div>
//                 <label className="filter-label">Course</label>
//                 <select
//                   className="filter-select"
//                   value={filterCourse}
//                   onChange={(e) => setFilterCourse(e.target.value)}
//                 >
//                   <option value="">All Courses</option>
//                   {filterOptions.courses.map(course => (
//                     <option key={course} value={course}>{course}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Year Level</label>
//                 <select
//                   className="filter-select"
//                   value={filterYear}
//                   onChange={(e) => setFilterYear(e.target.value)}
//                 >
//                   <option value="">All Years</option>
//                   {filterOptions.years.map(year => (
//                     <option key={year} value={year}>Year {year}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Semester</label>
//                 <select
//                   className="filter-select"
//                   value={filterSemester}
//                   onChange={(e) => setFilterSemester(e.target.value)}
//                 >
//                   <option value="">All Semesters</option>
//                   {filterOptions.semesters.map(sem => (
//                     <option key={sem} value={sem}>Semester {sem}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="filter-label">Instructor</label>
//                 <select
//                   className="filter-select"
//                   value={filterInstructor}
//                   onChange={(e) => setFilterInstructor(e.target.value)}
//                 >
//                   <option value="">All Instructors</option>
//                   {filterOptions.instructors.map(inst => (
//                     <option key={inst} value={inst}>{inst}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="action-buttons" style={{ alignSelf: "flex-end", marginTop: "1.5rem" }}>
//                 <button
//                   className="refresh-btn"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setFilterSemester("");
//                     setFilterYear("");
//                     setFilterInstructor("");
//                     setFilterCourse("");
//                   }}
//                 >
//                   Clear Filters
//                 </button>
//                 <button className="refresh-btn" onClick={fetchSchedules}>
//                   <RotateCw size={18} />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="empty-state-container">
//             <AlertCircle className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">Unable to Load Schedules</h3>
//             <p className="empty-state-text">{error}</p>
//             <button className="refresh-btn" onClick={fetchSchedules} style={{ marginTop: "1.5rem" }}>
//               <RotateCw size={18} />
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {!error && combinedSchedules.length === 0 && schedules.length === 0 && (
//           <div className="empty-state-container">
//             <Calendar className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Schedules Generated</h3>
//             <p className="empty-state-text">
//               No schedules have been generated yet. Start by having Deans generate class schedules.
//             </p>
//           </div>
//         )}

//         {/* No Results State (After Filtering) */}
//         {!error && combinedSchedules.length === 0 && schedules.length > 0 && (
//           <div className="empty-state-container">
//             <Search className="empty-state-icon" size={64} />
//             <h3 className="empty-state-title">No Results Found</h3>
//             <p className="empty-state-text">
//               No schedules match your current filters. Try adjusting your search criteria.
//             </p>
//             <button
//               className="refresh-btn"
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterSemester("");
//                 setFilterYear("");
//                 setFilterInstructor("");
//                 setFilterCourse("");
//               }}
//               style={{ marginTop: "1.5rem" }}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}

//         {/* Schedules Display */}
//         {!error && combinedSchedules.length > 0 && (
//           <div>
//             {Object.keys(groupedSchedules).map((groupKey, groupIndex) => {
//               const schedulesByInstructor = groupedSchedules[groupKey].reduce((acc, s) => {
//                 const instructor = s.instructor_name || "Unassigned Instructor";
//                 if (!acc[instructor]) acc[instructor] = [];
//                 acc[instructor].push(s);
//                 return acc;
//               }, {});

//               return (
//                 <div key={groupIndex} className="schedule-group-card">
//                   <div className="group-header">
//                     <div className="group-title">
//                       <Calendar size={20} />
//                       {groupKey}
//                       <span className="group-count">
//                         {groupedSchedules[groupKey].length} classes
//                       </span>
//                     </div>
//                     <ChevronDown size={22} className="group-chevron open" />
//                   </div>

//                   <div>
//                     {Object.entries(schedulesByInstructor).map(([instructor, instructorSchedules], i) => (
//                       <div key={i} className="instructor-card">
//                         <div className="instructor-header">
//                           <div>
//                             <div className="instructor-name">
//                               <Users size={18} />
//                               {instructor}
//                             </div>
//                             <div className="instructor-course">
//                               {instructorSchedules[0]?.course_name
//                                 ? `${instructorSchedules[0].course_name}`
//                                 : "(No Course Assigned)"}
//                             </div>
//                           </div>
//                           <Badge bg="secondary" className="id-badge">
//                             {instructorSchedules.length} class{instructorSchedules.length !== 1 ? "es" : ""}
//                           </Badge>
//                         </div>

//                         <div className="table-responsive">
//                           <Table hover className="schedule-table">
//                             <thead>
//                               <tr>
//                                 <th>Subject</th>
//                                 <th>Room</th>
//                                 <th>Schedule</th>
//                                 <th className="action-cell">Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {instructorSchedules.map((schedule) => (
//                                 <tr key={schedule.scheduleIds.join('-')}>
//                                   <td>
//                                     <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
//                                       <strong>{schedule.subject_code}</strong>
//                                       <small style={{ color: "#999" }}>
//                                         {schedule.subject_name}
//                                       </small>
//                                     </div>
//                                   </td>
//                                   <td>
//                                     {schedule.room_name ? (
//                                       <Badge bg="info">
//                                         <MapPin size={12} className="me-1" style={{ display: "inline" }} />
//                                         {schedule.room_name}
//                                       </Badge>
//                                     ) : (
//                                       <Badge bg="secondary" className="unassigned-badge">
//                                         Unassigned
//                                       </Badge>
//                                     )}
//                                   </td>
//                                   <td>
//                                     <div className="timeslots-container">
//                                       {schedule.timeslots.map((timeslot, idx) => (
//                                         <div key={idx} className="timeslot-item">
//                                           <span className="day-badge">{timeslot.day}</span>
//                                           <span className="time-badge">
//                                             <Clock size={12} />
//                                             {timeslot.time}
//                                           </span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </td>
//                                   <td className="action-cell">
//                                     <button
//                                       className="delete-btn"
//                                       onClick={() => setDeleteConfirm(schedule.scheduleIds)}
//                                       disabled={deleting}
//                                       title="Delete all timeslots for this class"
//                                     >
//                                       <Trash2 size={16} />
//                                       Delete
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </Table>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ScheduleManagement;

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Spinner, Badge } from "react-bootstrap";
// import { 
//   Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, 
//   RotateCw, Filter, AlertCircle, CheckCircle, X, ChevronRight,
//   Grid, List, BarChart3, TrendingUp
// } from "lucide-react";

// const ScheduleManagement = () => {
//   // State management
//   const [courses, setCourses] = useState([]);
//   const [schedules, setSchedules] = useState([]);
//   const [filters, setFilters] = useState({ courseId: "", yearLevel: "", semester: "" });
//   const [loading, setLoading] = useState(false);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [toast, setToast] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [selectedSection, setSelectedSection] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//    const COLORS = {
//     primary: "#03045E",
//     secondary: "#023E8A",
//     accent: "#0077B6",
//     light: "#00B4D8",
//     lighter: "#48CAE4",
//     lightest: "#CAF0F8",
//     success: "#10b981",
//     warning: "#f59e0b",
//     danger: "#ef4444",
//     dark: "#1e293b",
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setLoadingCourses(true);
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchCourses error:", err);
//       setCourses([]);
//       showToast("Failed to load courses", "error");
//     } finally {
//       setLoadingCourses(false);
//     }
//   };

//   const fetchSchedules = useCallback(async () => {
//     const { courseId, yearLevel, semester } = filters;
    
//     if (!courseId || !yearLevel || !semester) {
//       showToast("Please select all filters to view schedules", "warning");
//       setSchedules([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const params = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//       const res = await fetch(`${API}/api/scheduler?${params}`);
      
//       if (!res.ok) throw new Error("Failed to fetch schedules");
      
//       const data = await res.json();
//       const scheduleArray = Array.isArray(data) ? data : [];
      
//       setSchedules(scheduleArray);
      
//       if (scheduleArray.length === 0) {
//         showToast("No schedules found for the selected criteria", "warning");
//       } else {
//         showToast(`Loaded ${scheduleArray.length} schedule entries`, "success");
//       }
//     } catch (err) {
//       console.error("Error fetching schedules:", err);
//       setError(err.message);
//       showToast("Failed to load schedules", "error");
//       setSchedules([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, API]);

//   const handleDeleteSchedule = async (ids) => {
//     setDeleting(true);
//     try {
//       const idsToDelete = Array.isArray(ids) ? ids : [ids];
      
//       await Promise.all(
//         idsToDelete.map(id =>
//           fetch(`${API}/api/scheduler/${id}`, { method: "DELETE" })
//         )
//       );
      
//       setSchedules((prev) => prev.filter((s) => !idsToDelete.includes(s.id)));
//       setDeleteConfirm(null);
//       showToast(`${idsToDelete.length} schedule(s) deleted successfully`, "success");
//     } catch (err) {
//       console.error("Error deleting schedule:", err);
//       showToast("Failed to delete schedule", "error");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return '';
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours);
//     const period = hour >= 12 ? 'PM' : 'AM';
//     const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//     return `${displayHour}:${minutes} ${period}`;
//   };

//   const slotToTime = useCallback((slotIndex) => {
//     const startHour = 7 + slotIndex;
//     const endHour = startHour + 1;
//     const formatHour = (h) => {
//       const period = h >= 12 ? 'PM' : 'AM';
//       const displayHour = h % 12 === 0 ? 12 : h % 12;
//       return `${displayHour}:00 ${period}`;
//     };
//     return `${formatHour(startHour)} - ${formatHour(endHour)}`;
//   }, []);

//   const filteredSchedules = useMemo(() => {
//     if (!searchTerm.trim()) return schedules;
    
//     const term = searchTerm.toLowerCase();
//     return schedules.filter(s => 
//       s.subject_name?.toLowerCase().includes(term) ||
//       s.subject_code?.toLowerCase().includes(term) ||
//       s.instructor_name?.toLowerCase().includes(term) ||
//       s.room_name?.toLowerCase().includes(term) ||
//       s.section_name?.toLowerCase().includes(term)
//     );
//   }, [schedules, searchTerm]);

//   const groupedSchedules = useMemo(() => {
//     const grouped = {};
    
//     filteredSchedules.forEach(schedule => {
//       const sectionId = schedule.section_id || 'unknown';
//       if (!grouped[sectionId]) {
//         grouped[sectionId] = {
//           id: sectionId,
//           section_name: schedule.section_name || 'Unknown Section',
//           course_name: schedule.course_name || 'Unknown Course',
//           course_code: schedule.course_code || 'N/A',
//           year_level: schedule.year_level,
//           semester: schedule.semester,
//           schedules: [],
//           subjects: new Set(),
//           instructors: new Set(),
//           rooms: new Set()
//         };
//       }
//       grouped[sectionId].schedules.push(schedule);
//       if (schedule.subject_code) grouped[sectionId].subjects.add(schedule.subject_code);
//       if (schedule.instructor_name) grouped[sectionId].instructors.add(schedule.instructor_name);
//       if (schedule.room_name) grouped[sectionId].rooms.add(schedule.room_name);
//     });
    
//     return Object.values(grouped);
//   }, [filteredSchedules]);

//   const groupSchedulesBySubject = useCallback((sectionSchedules) => {
//     const grouped = {};
    
//     sectionSchedules.forEach(schedule => {
//       const key = `${schedule.subject_id}-${schedule.instructor_id}-${schedule.room_id}`;
      
//       if (!grouped[key]) {
//         grouped[key] = {
//           subject_code: schedule.subject_code || schedule.subject_name || 'N/A',
//           subject_name: schedule.subject_name || 'N/A',
//           instructor_name: schedule.instructor_name || 'Unassigned',
//           room_name: schedule.room_name || 'TBD',
//           timeslots: [],
//           scheduleIds: []
//         };
//       }
      
//       const timeDisplay = schedule.start_time && schedule.end_time
//         ? `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
//         : slotToTime(schedule.slot_index);
      
//       grouped[key].timeslots.push({
//         id: schedule.id,
//         day: schedule.day,
//         time: timeDisplay
//       });
//       grouped[key].scheduleIds.push(schedule.id);
//     });
    
//     const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
//     Object.values(grouped).forEach(item => {
//       item.timeslots.sort((a, b) => (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0));
//     });
    
//     return Object.values(grouped);
//   }, [slotToTime, formatTime]);

//   const statistics = useMemo(() => {
//     const totalSchedules = filteredSchedules.length;
//     const uniqueInstructors = new Set(filteredSchedules.map(s => s.instructor_id).filter(Boolean)).size;
//     const uniqueRooms = new Set(filteredSchedules.map(s => s.room_id).filter(Boolean)).size;
//     const uniqueSections = groupedSchedules.length;

//     return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueSections };
//   }, [filteredSchedules, groupedSchedules]);

//   const selectedCourse = useMemo(() => {
//     return courses.find(c => c.id === Number(filters.courseId));
//   }, [courses, filters.courseId]);

//   if (loadingCourses) {
//     return (
//       <div className="loading-container">
//         <Spinner animation="border" style={{ color: COLORS.primary }} />
//         <p style={{ marginTop: '1rem', color: COLORS.dark }}>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }

//         .admin-schedule-container {
//           min-height: 100vh;
//            (linear-gradient(135deg, #CAF0F8 0%, #ffffff 100%)),
//           padding: 0;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* Top Navigation Bar */
//         .admin-top-nav {
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(10px);
//           padding: 1.25rem 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//         }

//         .nav-brand {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .nav-brand-icon {
//           width: 40px;
//           height: 40px;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//         }

//         .nav-brand-text h1 {
//           font-size: 1.5rem;
//           font-weight: 700;
//           margin: 0;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .nav-brand-text p {
//           font-size: 0.75rem;
//           color: #64748b;
//           margin: 0;
//         }

//         .nav-actions {
//           display: flex;
//           gap: 0.75rem;
//           align-items: center;
//         }

//         .view-toggle {
//           display: flex;
//           background: ${COLORS.light};
//           border-radius: 8px;
//           padding: 0.25rem;
//         }

//         .view-toggle-btn {
//           background: transparent;
//           border: none;
//           padding: 0.5rem 0.75rem;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           color: ${COLORS.dark};
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .view-toggle-btn.active {
//           background: white;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//           color: ${COLORS.primary};
//         }

//         .refresh-btn {
//           background: ${COLORS.primary};
//           color: white;
//           border: none;
//           padding: 0.65rem 1.25rem;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .refresh-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
//         }

//         /* Main Content Area */
//         .admin-main-content {
//           padding: 2rem;
//           max-width: 1600px;
//           margin: 0 auto;
//         }

//         /* Filter Card */
//         .filter-card {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
//         }

//         .filter-header {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1.5rem;
//           padding-bottom: 1rem;
//           border-bottom: 2px solid ${COLORS.light};
//         }

//         .filter-header-icon {
//           width: 36px;
//           height: 36px;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//         }

//         .filter-header-text h3 {
//           font-size: 1.25rem;
//           font-weight: 700;
//           margin: 0;
//           color: ${COLORS.dark};
//         }

//         .filter-header-text p {
//           font-size: 0.85rem;
//           color: #64748b;
//           margin: 0;
//         }

//         .filter-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 1.25rem;
//         }

//         .filter-field {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .filter-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 600;
//           color: ${COLORS.dark};
//           font-size: 0.9rem;
//         }

//         .filter-select {
//           padding: 0.85rem 1rem;
//           border: 2px solid ${COLORS.lighter};
//           border-radius: 10px;
//           font-size: 0.95rem;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           color: ${COLORS.dark};
//         }

//         .filter-select:focus {
//           outline: none;
//           border-color: ${COLORS.primary};
//           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
//         }

//         .filter-actions {
//           display: flex;
//           gap: 0.75rem;
//           margin-top: 1.5rem;
//         }

//         .btn-primary {
//           flex: 1;
//           padding: 0.85rem 1.5rem;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//         }

//         .btn-primary:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
//         }

//         .btn-primary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .btn-secondary {
//           flex: 1;
//           padding: 0.85rem 1.5rem;
//           background: ${COLORS.light};
//           color: ${COLORS.dark};
//           border: 2px solid ${COLORS.lighter};
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn-secondary:hover {
//           background: ${COLORS.lighter};
//         }

//         /* Stats Dashboard */
//         .stats-dashboard {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 16px;
//           padding: 1.75rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           position: relative;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
//         }

//         .stat-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 4px;
//           background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
//         }

//         .stat-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 1rem;
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
//           color: ${COLORS.primary};
//         }

//         .stat-trend {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           font-size: 0.75rem;
//           color: ${COLORS.success};
//           font-weight: 600;
//         }

//         .stat-label {
//           font-size: 0.85rem;
//           color: #64748b;
//           font-weight: 500;
//           margin-bottom: 0.5rem;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: ${COLORS.dark};
//         }

//         /* Search Bar */
//         .search-section {
//           background: white;
//           border-radius: 16px;
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }

//         .search-wrapper {
//           position: relative;
//         }

//         .search-icon-wrapper {
//           position: absolute;
//           left: 1.25rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//         }

//         .search-input {
//           width: 100%;
//           padding: 1rem 1rem 1rem 3.5rem;
//           border: 2px solid ${COLORS.lighter};
//           border-radius: 12px;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: ${COLORS.primary};
//           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
//         }

//         /* Grid View */
//         .schedules-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//           gap: 1.5rem;
//         }

//         .section-card {
//           background: white;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .section-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
//         }

//         .section-card-header {
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//           padding: 1.5rem;
//         }

//         .section-name {
//           font-size: 1.25rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//         }

//         .section-meta {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.75rem;
//           font-size: 0.85rem;
//           opacity: 0.95;
//         }

//         .section-meta-item {
//           display: flex;
//           align-items: center;
//           gap: 0.35rem;
//         }

//         .section-card-body {
//           padding: 1.5rem;
//         }

//         .section-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         .section-stat {
//           text-align: center;
//         }

//         .section-stat-value {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }

//         .section-stat-label {
//           font-size: 0.75rem;
//           color: #64748b;
//           margin-top: 0.25rem;
//         }

//         .section-card-footer {
//           padding-top: 1rem;
//           border-top: 2px solid ${COLORS.light};
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .view-details-btn {
//           background: ${COLORS.primary};
//           color: white;
//           border: none;
//           padding: 0.65rem 1.25rem;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .view-details-btn:hover {
//           background: ${COLORS.secondary};
//           transform: translateX(4px);
//         }

//         /* List View */
//         .schedules-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .section-list-item {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .section-list-item:hover {
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           transform: translateX(4px);
//         }

//         .section-list-info {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//           flex: 1;
//         }

//         .section-list-icon {
//           width: 56px;
//           height: 56px;
//           border-radius: 12px;
//           background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: ${COLORS.primary};
//         }

//         .section-list-details h4 {
//           font-size: 1.1rem;
//           font-weight: 700;
//           margin: 0 0 0.5rem 0;
//           color: ${COLORS.dark};
//         }

//         .section-list-meta {
//           display: flex;
//           gap: 1rem;
//           font-size: 0.85rem;
//           color: #64748b;
//         }

//         .section-list-stats {
//           display: flex;
//           gap: 2rem;
//           margin-right: 2rem;
//         }

//         .section-list-stat {
//           text-align: center;
//         }

//         /* Modal Overlay */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.6);
//           backdrop-filter: blur(4px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           padding: 1rem;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 20px;
//           max-width: 1200px;
//           width: 100%;
//           max-height: 90vh;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//           display: flex;
//           flex-direction: column;
//         }

//         .modal-header {
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//           padding: 2rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .modal-title h2 {
//           font-size: 1.75rem;
//           font-weight: 700;
//           margin: 0 0 0.5rem 0;
//         }

//         .modal-subtitle {
//           font-size: 0.95rem;
//           opacity: 0.9;
//         }

//         .modal-close {
//           background: rgba(255, 255, 255, 0.2);
//           border: none;
//           color: white;
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//         }

//         .modal-close:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .modal-body {
//           padding: 2rem;
//           overflow-y: auto;
//           flex: 1;
//         }

//         .schedule-detail-table {
//           width: 100%;
//           border-collapse: separate;
//           border-spacing: 0;
//         }

//         .schedule-detail-table thead {
//           background: ${COLORS.light};
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }

//         .schedule-detail-table th {
//           padding: 1rem;
//           text-align: left;
//           font-weight: 600;
//           color: ${COLORS.dark};
//           font-size: 0.85rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .schedule-detail-table td {
//           padding: 1rem;
//           border-bottom: 1px solid ${COLORS.light};
//         }

//         .schedule-detail-table tbody tr:hover {
//           background: ${COLORS.light};
//         }

//         .subject-info {
//           display: flex;
//           flex-direction: column;
//           gap: 0.25rem;
//         }

//         .subject-code {
//           font-weight: 700;
//           color: ${COLORS.dark};
//         }

//         .subject-name {
//           font-size: 0.85rem;
//           color: #64748b;
//         }

//         .timeslot-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem 0.75rem;
//           background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
//           border-radius: 8px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           color: ${COLORS.primary};
//           margin-right: 0.5rem;
//           margin-bottom: 0.5rem;
//         }

//         .delete-btn-small {
//           background: ${COLORS.danger};
//           color: white;
//           border: none;
//           padding: 0.5rem 0.75rem;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.35rem;
//         }

//         .delete-btn-small:hover:not(:disabled) {
//           background: #dc2626;
//           transform: scale(1.05);
//         }

//         .delete-btn-small:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         /* Delete Confirmation Modal */
//         .delete-modal {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           max-width: 450px;
//           width: 100%;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//         }

//         .delete-modal-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//           color: ${COLORS.danger};
//         }

//         .delete-modal-title {
//           font-size: 1.3rem;
//           font-weight: 700;
//           margin: 0;
//         }

//         .delete-modal-body {
//           color: #64748b;
//           margin-bottom: 1.5rem;
//           line-height: 1.6;
//         }

//         .delete-modal-footer {
//           display: flex;
//           gap: 0.75rem;
//         }

//         .btn-delete {
//           flex: 1;
//           padding: 0.85rem;
//           background: ${COLORS.danger};
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//         }

//         .btn-delete:hover:not(:disabled) {
//           background: #dc2626;
//         }

//         .btn-delete:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .btn-cancel {
//           flex: 1;
//           padding: 0.85rem;
//           background: ${COLORS.light};
//           color: ${COLORS.dark};
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn-cancel:hover {
//           background: ${COLORS.lighter};
//         }

//         /* Toast Notification */
//         .toast-notification {
//           position: fixed;
//           top: 2rem;
//           right: 2rem;
//           min-width: 350px;
//           background: white;
//           border-radius: 12px;
//           padding: 1.25rem;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           z-index: 9999;
//           animation: slideIn 0.3s ease;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(400px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .toast-icon {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .toast-success .toast-icon {
//           background: ${COLORS.success}15;
//           color: ${COLORS.success};
//         }

//         .toast-error .toast-icon {
//           background: ${COLORS.danger}15;
//           color: ${COLORS.danger};
//         }

//         .toast-warning .toast-icon {
//           background: ${COLORS.warning}15;
//           color: ${COLORS.warning};
//         }

//         .toast-content {
//           flex: 1;
//         }

//         .toast-message {
//           font-weight: 600;
//           color: ${COLORS.dark};
//           margin: 0;
//         }

//         .toast-close-btn {
//           background: none;
//           border: none;
//           color: #94a3b8;
//           cursor: pointer;
//           padding: 0;
//           width: 24px;
//           height: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 4px;
//           transition: all 0.3s ease;
//         }

//         .toast-close-btn:hover {
//           background: ${COLORS.light};
//           color: ${COLORS.dark};
//         }

//         /* Empty State */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }

//         .empty-icon {
//           width: 80px;
//           height: 80px;
//           margin: 0 auto 1.5rem;
//           background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
//           border-radius: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: ${COLORS.primary};
//         }

//         .empty-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.dark};
//           margin-bottom: 0.75rem;
//         }

//         .empty-text {
//           color: #64748b;
//           font-size: 1rem;
//         }

//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* Responsive */
//         @media (max-width: 1024px) {
//           .filter-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//           .schedules-grid {
//             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//           }
//           .stats-dashboard {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .admin-top-nav {
//             flex-direction: column;
//             gap: 1rem;
//             padding: 1rem;
//           }
//           .nav-actions {
//             width: 100%;
//             justify-content: space-between;
//           }
//           .admin-main-content {
//             padding: 1rem;
//           }
//           .filter-grid {
//             grid-template-columns: 1fr;
//           }
//           .filter-actions {
//             flex-direction: column;
//           }
//           .stats-dashboard {
//             grid-template-columns: 1fr;
//           }
//           .schedules-grid {
//             grid-template-columns: 1fr;
//           }
//           .section-list-info {
//             flex-direction: column;
//             align-items: flex-start;
//           }
//           .section-list-stats {
//             display: none;
//           }
//           .modal-content {
//             max-height: 95vh;
//           }
//           .modal-header {
//             padding: 1.5rem;
//           }
//           .modal-body {
//             padding: 1rem;
//           }
//           .toast-notification {
//             left: 1rem;
//             right: 1rem;
//             min-width: auto;
//           }
//         }

//         @media (max-width: 480px) {
//           .nav-brand-text h1 {
//             font-size: 1.25rem;
//           }
//           .section-card-header {
//             padding: 1rem;
//           }
//           .section-name {
//             font-size: 1.1rem;
//           }
//         }
//       `}</style>

//       <div className="admin-schedule-container">
//         {/* Toast Notification */}
//         {toast && (
//           <div className={`toast-notification toast-${toast.type}`}>
//             <div className="toast-icon">
//               {toast.type === "success" && <CheckCircle size={24} />}
//               {toast.type === "error" && <AlertCircle size={24} />}
//               {toast.type === "warning" && <AlertCircle size={24} />}
//             </div>
//             <div className="toast-content">
//               <p className="toast-message">{toast.message}</p>
//             </div>
//             <button className="toast-close-btn" onClick={() => setToast(null)}>
//               <X size={18} />
//             </button>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
//             <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="delete-modal-header">
//                 <AlertCircle size={28} />
//                 <h3 className="delete-modal-title">Delete Schedule?</h3>
//               </div>
//               <p className="delete-modal-body">
//                 Are you sure you want to delete {Array.isArray(deleteConfirm) ? `these ${deleteConfirm.length} schedules` : 'this schedule'}? This action cannot be undone.
//               </p>
//               <div className="delete-modal-footer">
//                 <button className="btn-cancel" onClick={() => setDeleteConfirm(null)} disabled={deleting}>
//                   Cancel
//                 </button>
//                 <button className="btn-delete" onClick={() => handleDeleteSchedule(deleteConfirm)} disabled={deleting}>
//                   {deleting ? (
//                     <>
//                       <Spinner animation="border" size="sm" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Section Detail Modal */}
//         {selectedSection && (
//           <div className="modal-overlay" onClick={() => setSelectedSection(null)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <div className="modal-title">
//                   <h2>{selectedSection.section_name}</h2>
//                   <div className="modal-subtitle">
//                     {selectedSection.course_name} • Year {selectedSection.year_level} • Semester {selectedSection.semester}
//                   </div>
//                 </div>
//                 <button className="modal-close" onClick={() => setSelectedSection(null)}>
//                   <X size={24} />
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <table className="schedule-detail-table">
//                   <thead>
//                     <tr>
//                       <th>Subject</th>
//                       <th>Instructor</th>
//                       <th>Room</th>
//                       <th>Schedule</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {groupSchedulesBySubject(selectedSection.schedules).map((subject, idx) => (
//                       <tr key={idx}>
//                         <td>
//                           <div className="subject-info">
//                             <span className="subject-code">{subject.subject_code}</span>
//                             <span className="subject-name">{subject.subject_name}</span>
//                           </div>
//                         </td>
//                         <td>{subject.instructor_name}</td>
//                         <td>
//                           <Badge bg={subject.room_name !== 'TBD' ? 'info' : 'secondary'}>
//                             {subject.room_name}
//                           </Badge>
//                         </td>
//                         <td>
//                           <div>
//                             {subject.timeslots.map((slot, sidx) => (
//                               <span key={sidx} className="timeslot-badge">
//                                 <Clock size={14} />
//                                 {slot.day} {slot.time}
//                               </span>
//                             ))}
//                           </div>
//                         </td>
//                         <td>
//                           <button
//                             className="delete-btn-small"
//                             onClick={() => {
//                               setSelectedSection(null);
//                               setDeleteConfirm(subject.scheduleIds);
//                             }}
//                             disabled={deleting}
//                           >
//                             <Trash2 size={14} />
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Top Navigation */}
//         <div className="admin-top-nav">
//           <div className="nav-brand">
//             <div className="nav-brand-icon">
//               <Calendar size={24} />
//             </div>
//             <div className="nav-brand-text">
//               <h1>Schedule Manager</h1>
//               <p>Administrative Dashboard</p>
//             </div>
//           </div>
//           <div className="nav-actions">
//             <div className="view-toggle">
//               <button 
//                 className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                 onClick={() => setViewMode('grid')}
//               >
//                 <Grid size={18} />
//                 Grid
//               </button>
//               <button 
//                 className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                 onClick={() => setViewMode('list')}
//               >
//                 <List size={18} />
//                 List
//               </button>
//             </div>
//             <button className="refresh-btn" onClick={fetchSchedules}>
//               <RotateCw size={18} className={loading ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="admin-main-content">
//           {/* Filter Card */}
//           <div className="filter-card">
//             <div className="filter-header">
//               <div className="filter-header-icon">
//                 <Filter size={20} />
//               </div>
//               <div className="filter-header-text">
//                 <h3>Filter Options</h3>
//                 <p>
//                   {selectedCourse 
//                     ? `Currently viewing: ${selectedCourse.code} — ${selectedCourse.name}`
//                     : 'Select filters to view schedules'
//                   }
//                 </p>
//               </div>
//             </div>
//             <div className="filter-grid">
//               <div className="filter-field">
//                 <label className="filter-label">
//                   <BookOpen size={16} />
//                   Course
//                 </label>
//                 <select
//                   className="filter-select"
//                   value={filters.courseId}
//                   onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
//                 >
//                   <option value="">Select Course</option>
//                   {courses.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.code} — {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="filter-field">
//                 <label className="filter-label">
//                   <Users size={16} />
//                   Year Level
//                 </label>
//                 <select
//                   className="filter-select"
//                   value={filters.yearLevel}
//                   onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
//                 >
//                   <option value="">Select Year</option>
//                   {[1, 2, 3, 4].map((n) => (
//                     <option key={n} value={n}>
//                       Year {n}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="filter-field">
//                 <label className="filter-label">
//                   <Calendar size={16} />
//                   Semester
//                 </label>
//                 <select
//                   className="filter-select"
//                   value={filters.semester}
//                   onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
//                 >
//                   <option value="">Select Semester</option>
//                   <option value="1">1st Semester</option>
//                   <option value="2">2nd Semester</option>
//                 </select>
//               </div>
//             </div>
//             <div className="filter-actions">
//               <button
//                 className="btn-secondary"
//                 onClick={() => {
//                   setFilters({ courseId: "", yearLevel: "", semester: "" });
//                   setSchedules([]);
//                   setSearchTerm("");
//                 }}
//               >
//                 Clear All
//               </button>
//               <button className="btn-primary" onClick={fetchSchedules} disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" />
//                     Loading...
//                   </>
//                 ) : (
//                   <>
//                     <Filter size={18} />
//                     Apply Filters
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Statistics Dashboard */}
//           {schedules.length > 0 && (
//             <div className="stats-dashboard">
//               <div className="stat-card">
//                 <div className="stat-header">
//                   <div className="stat-icon">
//                     <BarChart3 size={24} />
//                   </div>
//                   <div className="stat-trend">
//                     <TrendingUp size={14} />
//                     Active
//                   </div>
//                 </div>
//                 <div className="stat-label">Total Classes</div>
//                 <div className="stat-value">{statistics.totalSchedules}</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-header">
//                   <div className="stat-icon">
//                     <Users size={24} />
//                   </div>
//                   <div className="stat-trend">
//                     <TrendingUp size={14} />
//                     Assigned
//                   </div>
//                 </div>
//                 <div className="stat-label">Instructors</div>
//                 <div className="stat-value">{statistics.uniqueInstructors}</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-header">
//                   <div className="stat-icon">
//                     <MapPin size={24} />
//                   </div>
//                   <div className="stat-trend">
//                     <TrendingUp size={14} />
//                     In Use
//                   </div>
//                 </div>
//                 <div className="stat-label">Rooms</div>
//                 <div className="stat-value">{statistics.uniqueRooms}</div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-header">
//                   <div className="stat-icon">
//                     <BookOpen size={24} />
//                   </div>
//                   <div className="stat-trend">
//                     <TrendingUp size={14} />
//                     Active
//                   </div>
//                 </div>
//                 <div className="stat-label">Sections</div>
//                 <div className="stat-value">{statistics.uniqueSections}</div>
//               </div>
//             </div>
//           )}

//           {/* Search Bar */}
//           {schedules.length > 0 && (
//             <div className="search-section">
//               <div className="search-wrapper">
//                 <div className="search-icon-wrapper">
//                   <Search size={20} />
//                 </div>
//                 <input
//                   type="text"
//                   className="search-input"
//                   placeholder="Search by subject, instructor, room, or section..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {!error && schedules.length === 0 && !loading && (
//             <div className="empty-state">
//               <div className="empty-icon">
//                 <Calendar size={48} />
//               </div>
//               <h3 className="empty-title">No Schedules to Display</h3>
//               <p className="empty-text">
//                 Select course, year level, and semester above to view schedules
//               </p>
//             </div>
//           )}

//           {/* Grid View */}
//           {viewMode === 'grid' && groupedSchedules.length > 0 && (
//             <div className="schedules-grid">
//               {groupedSchedules.map((section) => (
//                 <div key={section.id} className="section-card" onClick={() => setSelectedSection(section)}>
//                   <div className="section-card-header">
//                     <div className="section-name">{section.section_name}</div>
//                     <div className="section-meta">
//                       <div className="section-meta-item">
//                         <BookOpen size={14} />
//                         {section.course_code}
//                       </div>
//                       <div className="section-meta-item">
//                         <Users size={14} />
//                         Year {section.year_level}
//                       </div>
//                       <div className="section-meta-item">
//                         <Calendar size={14} />
//                         Sem {section.semester}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="section-card-body">
//                     <div className="section-stats">
//                       <div className="section-stat">
//                         <div className="section-stat-value">{section.subjects.size}</div>
//                         <div className="section-stat-label">Subjects</div>
//                       </div>
//                       <div className="section-stat">
//                         <div className="section-stat-value">{section.instructors.size}</div>
//                         <div className="section-stat-label">Instructors</div>
//                       </div>
//                       <div className="section-stat">
//                         <div className="section-stat-value">{section.rooms.size}</div>
//                         <div className="section-stat-label">Rooms</div>
//                       </div>
//                     </div>
//                     <div className="section-card-footer">
//                       <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
//                         {section.schedules.length} total classes
//                       </span>
//                       <button className="view-details-btn">
//                         View Details
//                         <ChevronRight size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* List View */}
//           {viewMode === 'list' && groupedSchedules.length > 0 && (
//             <div className="schedules-list">
//               {groupedSchedules.map((section) => (
//                 <div key={section.id} className="section-list-item" onClick={() => setSelectedSection(section)}>
//                   <div className="section-list-info">
//                     <div className="section-list-icon">
//                       <BookOpen size={28} />
//                     </div>
//                     <div className="section-list-details">
//                       <h4>{section.section_name}</h4>
//                       <div className="section-list-meta">
//                         <span>{section.course_name}</span>
//                         <span>•</span>
//                         <span>Year {section.year_level}</span>
//                         <span>•</span>
//                         <span>Semester {section.semester}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="section-list-stats">
//                     <div className="section-list-stat">
//                       <div className="section-stat-value">{section.subjects.size}</div>
//                       <div className="section-stat-label">Subjects</div>
//                     </div>
//                     <div className="section-list-stat">
//                       <div className="section-stat-value">{section.instructors.size}</div>
//                       <div className="section-stat-label">Instructors</div>
//                     </div>
//                     <div className="section-list-stat">
//                       <div className="section-stat-value">{section.schedules.length}</div>
//                       <div className="section-stat-label">Classes</div>
//                     </div>
//                   </div>
//                   <button className="view-details-btn">
//                     View
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScheduleManagement;

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Spinner, Badge } from "react-bootstrap";
import { 
  Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, 
  RotateCw, Filter, AlertCircle, CheckCircle, X, ChevronRight,
  Grid, List, BarChart3, TrendingUp, Award
} from "lucide-react";

const ScheduleManagement = () => {
  // State management
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [filters, setFilters] = useState({ courseId: "", yearLevel: "", semester: "" });
  const [btledMajor, setBtledMajor] = useState('ICT'); // NEW: BTLED major selector
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedSection, setSelectedSection] = useState(null);

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const COLORS = {
    primary: "#03045E",
    secondary: "#023E8A",
    accent: "#0077B6",
    light: "#00B4D8",
    lighter: "#48CAE4",
    lightest: "#CAF0F8",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    dark: "#1e293b",
  };

  const BTLED_MAJORS = [
    { value: 'ICT', label: 'ICT - Information and Communication Technology' },
    { value: 'HE', label: 'HE - Home Economics' }
  ];

  const isBTLEDCourse = (courseCode) => {
    return courseCode === 'BTLED' || courseCode?.startsWith('BTLED');
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch(`${API}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchCourses error:", err);
      setCourses([]);
      showToast("Failed to load courses", "error");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchSchedules = useCallback(async () => {
    const { courseId, yearLevel, semester } = filters;
    
    if (!courseId || !yearLevel || !semester) {
      showToast("Please select all filters to view schedules", "warning");
      setSchedules([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({ courseId, yearLevel, semester });
      
      const selectedCourse = courses.find(c => c.id === Number(courseId));
      const isBTLED = selectedCourse && isBTLEDCourse(selectedCourse.code);
      
      if (isBTLED && yearLevel === "3") {
        params.append('major', btledMajor);
      }

      const res = await fetch(`${API}/api/scheduler?${params}`);
      
      if (!res.ok) throw new Error("Failed to fetch schedules");
      
      const data = await res.json();
      const scheduleArray = Array.isArray(data) ? data : [];
      
      setSchedules(scheduleArray);
      
      if (scheduleArray.length === 0) {
        showToast("No schedules found for the selected criteria", "warning");
      } else {
        showToast(`Loaded ${scheduleArray.length} schedule entries`, "success");
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError(err.message);
      showToast("Failed to load schedules", "error");
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  }, [filters, btledMajor, courses]);

  const handleDeleteSchedule = async (ids) => {
    setDeleting(true);
    try {
      const idsToDelete = Array.isArray(ids) ? ids : [ids];
      
      await Promise.all(
        idsToDelete.map(id =>
          fetch(`${API}/api/scheduler/${id}`, { method: "DELETE" })
        )
      );
      
      setSchedules((prev) => prev.filter((s) => !idsToDelete.includes(s.id)));
      setDeleteConfirm(null);
      showToast(`${idsToDelete.length} schedule(s) deleted successfully`, "success");
    } catch (err) {
      console.error("Error deleting schedule:", err);
      showToast("Failed to delete schedule", "error");
    } finally {
      setDeleting(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const slotToTime = useCallback((slotIndex) => {
    const startHour = 7 + slotIndex;
    const endHour = startHour + 1;
    const formatHour = (h) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      return `${displayHour}:00 ${period}`;
    };
    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
  }, []);

  const filteredSchedules = useMemo(() => {
    if (!searchTerm.trim()) return schedules;
    
    const term = searchTerm.toLowerCase();
    return schedules.filter(s => 
      s.subject_name?.toLowerCase().includes(term) ||
      s.subject_code?.toLowerCase().includes(term) ||
      s.instructor_name?.toLowerCase().includes(term) ||
      s.room_name?.toLowerCase().includes(term) ||
      s.section_name?.toLowerCase().includes(term)
    );
  }, [schedules, searchTerm]);

  const groupedSchedules = useMemo(() => {
    const grouped = {};
    
    filteredSchedules.forEach(schedule => {
      const sectionId = schedule.section_id || 'unknown';
      if (!grouped[sectionId]) {
        grouped[sectionId] = {
          id: sectionId,
          section_name: schedule.section_name || 'Unknown Section',
          course_name: schedule.course_name || 'Unknown Course',
          course_code: schedule.course_code || 'N/A',
          year_level: schedule.year_level,
          semester: schedule.semester,
          schedules: [],
          subjects: new Set(),
          instructors: new Set(),
          rooms: new Set()
        };
      }
      grouped[sectionId].schedules.push(schedule);
      if (schedule.subject_code) grouped[sectionId].subjects.add(schedule.subject_code);
      if (schedule.instructor_name) grouped[sectionId].instructors.add(schedule.instructor_name);
      if (schedule.room_name) grouped[sectionId].rooms.add(schedule.room_name);
    });
    
    return Object.values(grouped);
  }, [filteredSchedules]);

  const groupSchedulesBySubject = useCallback((sectionSchedules) => {
    const grouped = {};
    
    sectionSchedules.forEach(schedule => {
      const key = `${schedule.subject_id}-${schedule.instructor_id}-${schedule.room_id}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          subject_code: schedule.subject_code || schedule.subject_name || 'N/A',
          subject_name: schedule.subject_name || 'N/A',
          instructor_name: schedule.instructor_name || 'Unassigned',
          room_name: schedule.room_name || 'TBD',
          timeslots: [],
          scheduleIds: []
        };
      }
      
      const timeDisplay = schedule.start_time && schedule.end_time
        ? `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
        : slotToTime(schedule.slot_index);
      
      grouped[key].timeslots.push({
        id: schedule.id,
        day: schedule.day,
        time: timeDisplay
      });
      grouped[key].scheduleIds.push(schedule.id);
    });
    
    const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
    Object.values(grouped).forEach(item => {
      item.timeslots.sort((a, b) => (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0));
    });
    
    return Object.values(grouped);
  }, [slotToTime, formatTime]);

  const statistics = useMemo(() => {
    const totalSchedules = filteredSchedules.length;
    const uniqueInstructors = new Set(filteredSchedules.map(s => s.instructor_id).filter(Boolean)).size;
    const uniqueRooms = new Set(filteredSchedules.map(s => s.room_id).filter(Boolean)).size;
    const uniqueSections = groupedSchedules.length;

    return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueSections };
  }, [filteredSchedules, groupedSchedules]);

  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === Number(filters.courseId));
  }, [courses, filters.courseId]);

  const isBTLED = useMemo(() => selectedCourse && isBTLEDCourse(selectedCourse.code), [selectedCourse]);
  const showMajorFilter = isBTLED && filters.yearLevel === "3";

  const majorLabel = useMemo(() => {
    if (!showMajorFilter) return null;
    return BTLED_MAJORS.find(m => m.value === btledMajor)?.label || null;
  }, [showMajorFilter, btledMajor]);

  if (loadingCourses) {
    return (
      <div className="loading-container">
        <Spinner animation="border" style={{ color: COLORS.primary }} />
        <p style={{ marginTop: '1rem', color: COLORS.dark }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .admin-schedule-container {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* Top Navigation Bar */
        .admin-top-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.25rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-brand-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .nav-brand-text h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-brand-text p {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        .nav-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .view-toggle {
          display: flex;
          background: ${COLORS.light};
          border-radius: 8px;
          padding: 0.25rem;
        }

        .view-toggle-btn {
          background: transparent;
          border: none;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${COLORS.dark};
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-toggle-btn.active {
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: ${COLORS.primary};
        }

        .refresh-btn {
          background: ${COLORS.primary};
          color: white;
          border: none;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        /* Main Content Area */
        .admin-main-content {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Filter Card */
        .filter-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .filter-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid ${COLORS.light};
        }

        .filter-header-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .filter-header-text h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
          color: ${COLORS.dark};
        }

        .filter-header-text p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.dark};
          font-size: 0.9rem;
        }

        .filter-select {
          padding: 0.85rem 1rem;
          border: 2px solid ${COLORS.lighter};
          border-radius: 10px;
          font-size: 0.95rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${COLORS.dark};
        }

        .filter-select:focus {
          outline: none;
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .filter-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .btn-primary {
          flex: 1;
          padding: 0.85rem 1.5rem;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          flex: 1;
          padding: 0.85rem 1.5rem;
          background: ${COLORS.light};
          color: ${COLORS.dark};
          border: 2px solid ${COLORS.lighter};
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: ${COLORS.lighter};
        }

        /* Major Badge Styles */
        .major-badge {
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-left: 0.5rem;
        }

        .major-badge-large {
          background: ${COLORS.lighter};
          color: ${COLORS.primary};
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 600;
          margin-left: 1rem;
        }

        /* Stats Dashboard */
        .stats-dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
          color: ${COLORS.primary};
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: ${COLORS.success};
          font-weight: 600;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.dark};
        }

        /* Search Bar */
        .search-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon-wrapper {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          border: 2px solid ${COLORS.lighter};
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        /* Grid View */
        .schedules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .section-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .section-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .section-card-header {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          padding: 1.5rem;
        }

        .section-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .section-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.85rem;
          opacity: 0.95;
        }

        .section-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .section-card-body {
          padding: 1.5rem;
        }

        .section-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .section-stat {
          text-align: center;
        }

        .section-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        .section-stat-label {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        .section-card-footer {
          padding-top: 1rem;
          border-top: 2px solid ${COLORS.light};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .view-details-btn {
          background: ${COLORS.primary};
          color: white;
          border: none;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-details-btn:hover {
          background: ${COLORS.secondary};
          transform: translateX(4px);
        }

        /* List View */
        .schedules-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-list-item {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .section-list-item:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateX(4px);
        }

        .section-list-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .section-list-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${COLORS.primary};
        }

        .section-list-details h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: ${COLORS.dark};
        }

        .section-list-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #64748b;
        }

        .section-list-stats {
          display: flex;
          gap: 2rem;
          margin-right: 2rem;
        }

        .section-list-stat {
          text-align: center;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .modal-subtitle {
          font-size: 0.95rem;
          opacity: 0.9;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .modal-body {
          padding: 2rem;
          overflow-y: auto;
          flex: 1;
        }

        .schedule-detail-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .schedule-detail-table thead {
          background: ${COLORS.light};
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .schedule-detail-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: ${COLORS.dark};
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .schedule-detail-table td {
          padding: 1rem;
          border-bottom: 1px solid ${COLORS.light};
        }

        .schedule-detail-table tbody tr:hover {
          background: ${COLORS.light};
        }

        .subject-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .subject-code {
          font-weight: 700;
          color: ${COLORS.dark};
        }

        .subject-name {
          font-size: 0.85rem;
          color: #64748b;
        }

        .timeslot-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: ${COLORS.primary};
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .delete-btn-small {
          background: ${COLORS.danger};
          color: white;
          border: none;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .delete-btn-small:hover:not(:disabled) {
          background: #dc2626;
          transform: scale(1.05);
        }

        .delete-btn-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Delete Confirmation Modal */
        .delete-modal {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .delete-modal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: ${COLORS.danger};
        }

        .delete-modal-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
        }

        .delete-modal-body {
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .delete-modal-footer {
          display: flex;
          gap: 0.75rem;
        }

        .btn-delete {
          flex: 1;
          padding: 0.85rem;
          background: ${COLORS.danger};
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-delete:hover:not(:disabled) {
          background: #dc2626;
        }

        .btn-delete:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-cancel {
          flex: 1;
          padding: 0.85rem;
          background: ${COLORS.light};
          color: ${COLORS.dark};
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover {
          background: ${COLORS.lighter};
        }

        /* Toast Notification */
        .toast-notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          min-width: 350px;
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 9999;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-success .toast-icon {
          background: ${COLORS.success}15;
          color: ${COLORS.success};
        }

        .toast-error .toast-icon {
          background: ${COLORS.danger}15;
          color: ${COLORS.danger};
        }

        .toast-warning .toast-icon {
          background: ${COLORS.warning}15;
          color: ${COLORS.warning};
        }

        .toast-content {
          flex: 1;
        }

        .toast-message {
          font-weight: 600;
          color: ${COLORS.dark};
          margin: 0;
        }

        .toast-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .toast-close-btn:hover {
          background: ${COLORS.light};
          color: ${COLORS.dark};
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${COLORS.primary};
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.dark};
          margin-bottom: 0.75rem;
        }

        .empty-text {
          color: #64748b;
          font-size: 1rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .schedules-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          .stats-dashboard {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-top-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .nav-actions {
            width: 100%;
            justify-content: space-between;
          }
          .admin-main-content {
            padding: 1rem;
          }
          .filter-grid {
            grid-template-columns: 1fr;
          }
          .filter-actions {
            flex-direction: column;
          }
          .stats-dashboard {
            grid-template-columns: 1fr;
          }
          .schedules-grid {
            grid-template-columns: 1fr;
          }
          .section-list-info {
            flex-direction: column;
            align-items: flex-start;
          }
          .section-list-stats {
            display: none;
          }
          .modal-content {
            max-height: 95vh;
          }
          .modal-header {
            padding: 1.5rem;
          }
          .modal-body {
            padding: 1rem;
          }
          .toast-notification {
            left: 1rem;
            right: 1rem;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .nav-brand-text h1 {
            font-size: 1.25rem;
          }
          .section-card-header {
            padding: 1rem;
          }
          .section-name {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="admin-schedule-container">
        {/* Toast Notification */}
        {toast && (
          <div className={`toast-notification toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === "success" && <CheckCircle size={24} />}
              {toast.type === "error" && <AlertCircle size={24} />}
              {toast.type === "warning" && <AlertCircle size={24} />}
            </div>
            <div className="toast-content">
              <p className="toast-message">{toast.message}</p>
            </div>
            <button className="toast-close-btn" onClick={() => setToast(null)}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-header">
                <AlertCircle size={28} />
                <h3 className="delete-modal-title">Delete Schedule?</h3>
              </div>
              <p className="delete-modal-body">
                Are you sure you want to delete {Array.isArray(deleteConfirm) ? `these ${deleteConfirm.length} schedules` : 'this schedule'}? This action cannot be undone.
              </p>
              <div className="delete-modal-footer">
                <button className="btn-cancel" onClick={() => setDeleteConfirm(null)} disabled={deleting}>
                  Cancel
                </button>
                <button className="btn-delete" onClick={() => handleDeleteSchedule(deleteConfirm)} disabled={deleting}>
                  {deleting ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section Detail Modal */}
        {selectedSection && (
          <div className="modal-overlay" onClick={() => setSelectedSection(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <h2>{selectedSection.section_name}</h2>
                  <div className="modal-subtitle">
                    {selectedSection.course_name} • Year {selectedSection.year_level} • Semester {selectedSection.semester}
                    {majorLabel && <span className="major-badge-large" style={{ marginLeft: '1rem' }}>{majorLabel}</span>}
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedSection(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="modal-body">
                <table className="schedule-detail-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Instructor</th>
                      <th>Room</th>
                      <th>Schedule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupSchedulesBySubject(selectedSection.schedules).map((subject, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="subject-info">
                            <span className="subject-code">{subject.subject_code}</span>
                            <span className="subject-name">{subject.subject_name}</span>
                          </div>
                        </td>
                        <td>{subject.instructor_name}</td>
                        <td>
                          <Badge bg={subject.room_name !== 'TBD' ? 'info' : 'secondary'}>
                            {subject.room_name}
                          </Badge>
                        </td>
                        <td>
                          <div>
                            {subject.timeslots.map((slot, sidx) => (
                              <span key={sidx} className="timeslot-badge">
                                <Clock size={14} />
                                {slot.day} {slot.time}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            className="delete-btn-small"
                            onClick={() => {
                              setSelectedSection(null);
                              setDeleteConfirm(subject.scheduleIds);
                            }}
                            disabled={deleting}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        <div className="admin-top-nav">
          <div className="nav-brand">
            <div className="nav-brand-icon">
              <Calendar size={24} />
            </div>
            <div className="nav-brand-text">
              <h1>Schedule Manager</h1>
              <p>Administrative Dashboard</p>
            </div>
          </div>
          <div className="nav-actions">
            <div className="view-toggle">
              <button 
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
                Grid
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
                List
              </button>
            </div>
            <button className="refresh-btn" onClick={fetchSchedules}>
              <RotateCw size={18} className={loading ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main-content">
          {/* Filter Card */}
          <div className="filter-card">
            <div className="filter-header">
              <div className="filter-header-icon">
                <Filter size={20} />
              </div>
              <div className="filter-header-text">
                <h3>Filter Options</h3>
                <p>
                  {selectedCourse 
                    ? `Currently viewing: ${selectedCourse.code} — ${selectedCourse.name}`
                    : 'Select filters to view schedules'
                  }
                  {majorLabel && <span className="major-badge-large">{majorLabel}</span>}
                </p>
              </div>
            </div>
            <div className="filter-grid">
              <div className="filter-field">
                <label className="filter-label">
                  <BookOpen size={16} />
                  Course
                </label>
                <select
                  className="filter-select"
                  value={filters.courseId}
                  onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BTLED Major Filter */}
              {showMajorFilter && (
                <div className="filter-field">
                  <label className="filter-label">
                    <Award size={16} />
                    BTLED Major
                  </label>
                  <select
                    className="filter-select"
                    value={btledMajor}
                    onChange={(e) => setBtledMajor(e.target.value)}
                  >
                    {BTLED_MAJORS.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="filter-field">
                <label className="filter-label">
                  <Users size={16} />
                  Year Level
                </label>
                <select
                  className="filter-select"
                  value={filters.yearLevel}
                  onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>Year {n}</option>
                  ))}
                </select>
              </div>
              <div className="filter-field">
                <label className="filter-label">
                  <Calendar size={16} />
                  Semester
                </label>
                <select
                  className="filter-select"
                  value={filters.semester}
                  onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>
            </div>
            <div className="filter-actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setFilters({ courseId: "", yearLevel: "", semester: "" });
                  setBtledMajor('ICT');
                  setSchedules([]);
                  setSearchTerm("");
                }}
              >
                Clear All
              </button>
              <button className="btn-primary" onClick={fetchSchedules} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Filter size={18} />
                    Apply Filters
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Statistics Dashboard */}
          {schedules.length > 0 && (
            <div className="stats-dashboard">
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon">
                    <BarChart3 size={24} />
                  </div>
                  <div className="stat-trend">
                    <TrendingUp size={14} />
                    Active
                  </div>
                </div>
                <div className="stat-label">Total Classes</div>
                <div className="stat-value">{statistics.totalSchedules}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-trend">
                    <TrendingUp size={14} />
                    Assigned
                  </div>
                </div>
                <div className="stat-label">Instructors</div>
                <div className="stat-value">{statistics.uniqueInstructors}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="stat-trend">
                    <TrendingUp size={14} />
                    In Use
                  </div>
                </div>
                <div className="stat-label">Rooms</div>
                <div className="stat-value">{statistics.uniqueRooms}</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon">
                    <BookOpen size={24} />
                  </div>
                  <div className="stat-trend">
                    <TrendingUp size={14} />
                    Active
                  </div>
                </div>
                <div className="stat-label">Sections</div>
                <div className="stat-value">{statistics.uniqueSections}</div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          {schedules.length > 0 && (
            <div className="search-section">
              <div className="search-wrapper">
                <div className="search-icon-wrapper">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by subject, instructor, room, or section..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Empty State */}
          {!error && schedules.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-icon">
                <Calendar size={48} />
              </div>
              <h3 className="empty-title">No Schedules to Display</h3>
              <p className="empty-text">
                Select course, year level, and semester above to view schedules
              </p>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && groupedSchedules.length > 0 && (
            <div className="schedules-grid">
              {groupedSchedules.map((section) => (
                <div key={section.id} className="section-card" onClick={() => setSelectedSection(section)}>
                  <div className="section-card-header">
                    <div className="section-name">
                      {section.section_name}
                      {majorLabel && <span className="major-badge">• {majorLabel}</span>}
                    </div>
                    <div className="section-meta">
                      <div className="section-meta-item">
                        <BookOpen size={14} />
                        {section.course_code}
                      </div>
                      <div className="section-meta-item">
                        <Users size={14} />
                        Year {section.year_level}
                      </div>
                      <div className="section-meta-item">
                        <Calendar size={14} />
                        Sem {section.semester}
                      </div>
                    </div>
                  </div>
                  <div className="section-card-body">
                    <div className="section-stats">
                      <div className="section-stat">
                        <div className="section-stat-value">{section.subjects.size}</div>
                        <div className="section-stat-label">Subjects</div>
                      </div>
                      <div className="section-stat">
                        <div className="section-stat-value">{section.instructors.size}</div>
                        <div className="section-stat-label">Instructors</div>
                      </div>
                      <div className="section-stat">
                        <div className="section-stat-value">{section.rooms.size}</div>
                        <div className="section-stat-label">Rooms</div>
                      </div>
                    </div>
                    <div className="section-card-footer">
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {section.schedules.length} total classes
                      </span>
                      <button className="view-details-btn">
                        View Details
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && groupedSchedules.length > 0 && (
            <div className="schedules-list">
              {groupedSchedules.map((section) => (
                <div key={section.id} className="section-list-item" onClick={() => setSelectedSection(section)}>
                  <div className="section-list-info">
                    <div className="section-list-icon">
                      <BookOpen size={28} />
                    </div>
                    <div className="section-list-details">
                      <h4>
                        {section.section_name}
                        {majorLabel && <span className="major-badge">• {majorLabel}</span>}
                      </h4>
                      <div className="section-list-meta">
                        <span>{section.course_name}</span>
                        <span>•</span>
                        <span>Year {section.year_level}</span>
                        <span>•</span>
                        <span>Semester {section.semester}</span>
                      </div>
                    </div>
                  </div>
                  <div className="section-list-stats">
                    <div className="section-list-stat">
                      <div className="section-stat-value">{section.subjects.size}</div>
                      <div className="section-stat-label">Subjects</div>
                    </div>
                    <div className="section-list-stat">
                      <div className="section-stat-value">{section.instructors.size}</div>
                      <div className="section-stat-label">Instructors</div>
                    </div>
                    <div className="section-list-stat">
                      <div className="section-stat-value">{section.schedules.length}</div>
                      <div className="section-stat-label">Classes</div>
                    </div>
                  </div>
                  <button className="view-details-btn">
                    View
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleManagement;