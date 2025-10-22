

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

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Card, Table, Spinner, Alert, Badge, Button, InputGroup, Form, Accordion } from "react-bootstrap";
import { Trash2, Search, Calendar, Users, BookOpen, Clock, MapPin, RotateCw, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";

const ScheduleManagement = () => {
  // State management
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterInstructor, setFilterInstructor] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

  /**
   * Fetch all schedules from backend
   */
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/scheduler`);
      if (!res.ok) throw new Error("Failed to fetch schedules");
      const data = await res.json();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError(err.message);
      showToast("Failed to load schedules", "error");
    } finally {
      setLoading(false);
    }
  }, [API]);

  /**
   * Delete a schedule entry with confirmation
   */
  const handleDeleteSchedule = async (ids) => {
    setDeleting(true);
    try {
      // If ids is an array, delete multiple schedules
      const idsToDelete = Array.isArray(ids) ? ids : [ids];
      
      await Promise.all(
        idsToDelete.map(id =>
          fetch(`${API}/api/scheduler/${id}`, { method: "DELETE" })
        )
      );
      
      setSchedules((prev) => prev.filter((s) => !idsToDelete.includes(s.id)));
      setDeleteConfirm(null);
      showToast(
        `${idsToDelete.length} schedule${idsToDelete.length > 1 ? 's' : ''} deleted successfully`,
        "success"
      );
    } catch (err) {
      console.error("Error deleting schedule:", err);
      showToast("Failed to delete schedule", "error");
    } finally {
      setDeleting(false);
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  /**
   * Convert slot index to readable time format (HH:00 - HH:00)
   */
  const slotToTime = useCallback((slotIndex) => {
    const startHour = 8 + slotIndex;
    const endHour = startHour + 1;
    return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
  }, []);

  /**
   * Extract unique filter options from schedules
   */
  const filterOptions = useMemo(() => {
    const semesters = [...new Set(schedules.map(s => s.semester || "Unspecified"))];
    const years = [...new Set(schedules.map(s => s.year_level || "Unspecified"))].sort();
    const instructors = [...new Set(schedules.map(s => s.instructor_name || "Unassigned"))].sort();
    
    return {
      semesters: semesters.filter(s => s),
      years: years.filter(y => y),
      instructors: instructors.filter(i => i)
    };
  }, [schedules]);

  /**
   * Filter schedules based on search and filter criteria
   */
  const filteredSchedules = useMemo(() => {
    return schedules.filter(s => {
      const matchesSearch = 
        s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.course_name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSemester = !filterSemester || s.semester === filterSemester;
      const matchesYear = !filterYear || String(s.year_level) === filterYear;
      const matchesInstructor = !filterInstructor || s.instructor_name === filterInstructor;

      return matchesSearch && matchesSemester && matchesYear && matchesInstructor;
    });
  }, [schedules, searchTerm, filterSemester, filterYear, filterInstructor]);

  /**
   * Combine schedules with same subject and room
   */
  const combinedSchedules = useMemo(() => {
    const combined = {};
    
    filteredSchedules.forEach(schedule => {
      // Create a unique key based on subject, room, instructor, year, and semester
      const key = `${schedule.subject_id || 'no-subject'}-${schedule.room_id || 'no-room'}-${schedule.instructor_id || 'no-instructor'}-${schedule.year_level || 'no-year'}-${schedule.semester || 'no-semester'}`;
      
      if (!combined[key]) {
        combined[key] = {
          ...schedule,
          scheduleIds: [schedule.id],
          timeslots: [{
            id: schedule.id,
            day: schedule.day,
            slot_index: schedule.slot_index,
            time: slotToTime(schedule.slot_index)
          }]
        };
      } else {
        combined[key].scheduleIds.push(schedule.id);
        combined[key].timeslots.push({
          id: schedule.id,
          day: schedule.day,
          slot_index: schedule.slot_index,
          time: slotToTime(schedule.slot_index)
        });
      }
    });
    
    // Sort timeslots by day and time
    Object.values(combined).forEach(item => {
      const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
      item.timeslots.sort((a, b) => {
        if (dayOrder[a.day] !== dayOrder[b.day]) {
          return dayOrder[a.day] - dayOrder[b.day];
        }
        return a.slot_index - b.slot_index;
      });
    });
    
    return Object.values(combined);
  }, [filteredSchedules, slotToTime]);

  /**
   * Group combined schedules by year and semester
   */
  const groupedSchedules = useMemo(() => {
    return combinedSchedules.reduce((acc, s) => {
      const semester = s.semester || "Unspecified Semester";
      const year = s.year_level || "Unspecified Year";
      const groupKey = `${year} Year - ${semester} Semester`;

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(s);
      return acc;
    }, {});
  }, [combinedSchedules]);

  /**
   * Calculate summary statistics
   */
  const statistics = useMemo(() => {
    const totalSchedules = combinedSchedules.length;
    const uniqueInstructors = new Set(combinedSchedules.map(s => s.instructor_id)).size;
    const uniqueRooms = new Set(combinedSchedules.map(s => s.room_id).filter(Boolean)).size;
    const uniqueCourses = new Set(combinedSchedules.map(s => s.course_id).filter(Boolean)).size;

    return { totalSchedules, uniqueInstructors, uniqueRooms, uniqueCourses };
  }, [combinedSchedules]);

  // Fetch schedules on component mount
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Render loading state
  if (loading) {
    return (
      <div className="schedule-loading-container">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading schedules...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* ============================================
           EduSched Schedule Management Styles
           ============================================ */

        .schedule-management-container {
          padding: 2rem;
         background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
        }

        .schedule-header {
          margin-bottom: 2rem;
        }

        .schedule-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2rem;
          font-weight: 700;
          color: #03045E;
          margin-bottom: 0.5rem;
        }

        .schedule-subtitle {
          color: #666;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        /* Statistics Cards */
        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          border-left: 4px solid #0077B6;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 119, 182, 0.15);
        }

        .stat-icon {
          color: #0077B6;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #03045E;
        }

        /* Filter Section */
        .filter-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
        }

        .filter-title {
          font-weight: 600;
          color: #03045E;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .search-input-group {
          position: relative;
        }

        .search-input {
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          width: 100%;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
        }

        .search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #0077B6;
          pointer-events: none;
        }

        .filter-select {
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 0.75rem;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
        }

        .filter-label {
          font-weight: 500;
          color: #03045E;
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .refresh-btn {
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
        }

        /* Loading State */
        .schedule-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
          color: #0077B6;
        }

        /* Empty State */
        .empty-state-container {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
        }

        .empty-state-icon {
          color: #90E0EF;
          margin-bottom: 1rem;
        }

        .empty-state-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #03045E;
          margin-bottom: 0.5rem;
        }

        .empty-state-text {
          color: #666;
          font-size: 0.95rem;
        }

        /* Group Cards */
        .schedule-group-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          margin-bottom: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .schedule-group-card:hover {
          box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
        }

        .group-header {
          background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
          color: white;
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: all 0.3s ease;
          user-select: none;
        }

        .group-header:hover {
          background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
        }

        .group-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
        }

        .group-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .group-chevron {
          transition: transform 0.3s ease;
        }

        .group-chevron.open {
          transform: rotate(180deg);
        }

        .instructor-card {
          border-top: 1px solid #E8F4F8;
          padding: 1rem;
          background: #FAFCFD;
          border-left: 4px solid #00B4D8;
        }

        .instructor-card:last-child {
          border-bottom: none;
        }

        .instructor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #03045E;
        }

        .instructor-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .instructor-course {
          color: #666;
          font-size: 0.85rem;
          font-weight: 400;
          margin-left: 1.75rem;
        }

        .schedule-table {
          margin-bottom: 0;
          font-size: 0.9rem;
        }

        .schedule-table thead {
          background: #CAF0F8;
          color: #03045E;
        }

        .schedule-table th {
          padding: 0.75rem;
          font-weight: 600;
          border: none;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }

        .schedule-table td {
          padding: 0.75rem;
          vertical-align: middle;
          border-bottom: 1px solid #E8F4F8;
        }

        .schedule-table tbody tr:hover {
          background-color: #F8FCFD;
        }

        .schedule-table tbody tr:last-child td {
          border-bottom: none;
        }

        .id-badge {
          font-weight: 600;
          font-size: 0.85rem;
        }

        .timeslots-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .timeslot-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: linear-gradient(135deg, #E8F4F8 0%, #CAF0F8 100%);
          border-radius: 8px;
          border-left: 3px solid #0077B6;
        }

        .day-badge {
          background: #0077B6;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          min-width: 90px;
          text-align: center;
        }

        .time-badge {
          background: white;
          color: #0077B6;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          border: 1px solid #0077B6;
        }

        .unassigned-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }

        .action-cell {
          text-align: center;
        }

        .delete-btn {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
          border: none;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
        }

        .delete-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
        }

        .delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Toast Notifications */
        .edusched-toast {
          position: fixed;
          top: 2rem;
          right: 2rem;
          min-width: 320px;
          background: white;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 9999;
          animation: slideInToast 0.3s ease;
          border-left: 4px solid;
        }

        @keyframes slideInToast {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-success {
          border-left-color: #00c851;
        }

        .toast-error {
          border-left-color: #ff4444;
        }

        .toast-icon {
          flex-shrink: 0;
        }

        .toast-success .toast-icon {
          color: #00c851;
        }

        .toast-error .toast-icon {
          color: #ff4444;
        }

        .toast-message {
          flex: 1;
          color: #333;
          font-weight: 500;
        }

        .toast-close {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 0;
          line-height: 1;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .toast-close:hover {
          color: #333;
        }

        /* Delete Confirmation Modal */
        .delete-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          padding: 1rem;
        }

        .delete-modal {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .delete-modal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: #ff4444;
        }

        .delete-modal-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
        }

        .delete-modal-body {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .delete-modal-footer {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .modal-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .modal-btn-cancel {
          background: #E8F4F8;
          color: #0077B6;
        }

        .modal-btn-cancel:hover {
          background: #CAF0F8;
        }

        .modal-btn-delete {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
          color: white;
        }

        .modal-btn-delete:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
        }

        .modal-btn-delete:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .schedule-management-container {
            padding: 1.5rem;
          }

          .statistics-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .schedule-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: 1fr;
          }

          .schedule-table {
            font-size: 0.8rem;
          }

          .schedule-table th,
          .schedule-table td {
            padding: 0.5rem 0.25rem;
          }

          .action-buttons {
            flex-direction: column;
            width: 100%;
          }

          .refresh-btn {
            width: 100%;
            justify-content: center;
          }

          .edusched-toast {
            left: 1rem;
            right: 1rem;
            min-width: auto;
          }

          .delete-modal {
            margin: 1rem;
          }

          .timeslot-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .day-badge {
            min-width: auto;
          }
        }

        @media (max-width: 576px) {
          .schedule-management-container {
            padding: 1rem;
          }

          .schedule-title {
            font-size: 1.3rem;
            gap: 0.5rem;
          }

          .statistics-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 1rem;
          }

          .group-title {
            gap: 0.5rem;
            font-size: 0.95rem;
          }

          .instructor-card {
            padding: 0.75rem;
          }

          .delete-modal {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="schedule-management-container">
        {/* Toast Notifications */}
        {toast && (
          <div className={`edusched-toast toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            </div>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => setToast(null)}>×</button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="delete-modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-header">
                <AlertCircle size={28} />
                <h3 className="delete-modal-title">Delete Schedule?</h3>
              </div>
              <p className="delete-modal-body">
                Are you sure you want to delete {Array.isArray(deleteConfirm) ? `these ${deleteConfirm.length} schedules` : 'this schedule'}? This action cannot be undone.
              </p>
              <div className="delete-modal-footer">
                <button
                  className="modal-btn modal-btn-cancel"
                  onClick={() => setDeleteConfirm(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="modal-btn modal-btn-delete"
                  onClick={() => handleDeleteSchedule(deleteConfirm)}
                  disabled={deleting}
                >
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

        {/* Header */}
        <div className="schedule-header">
          <div className="schedule-title">
            <Calendar size={32} />
            Schedule Management
          </div>
          <p className="schedule-subtitle">View and manage all generated class schedules</p>
        </div>

        {/* Statistics Section */}
        {!error && schedules.length > 0 && (
          <div className="statistics-grid">
            <div className="stat-card">
              <Calendar className="stat-icon" size={28} />
              <div className="stat-label">Total Classes</div>
              <div className="stat-value">{statistics.totalSchedules}</div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" size={28} />
              <div className="stat-label">Instructors</div>
              <div className="stat-value">{statistics.uniqueInstructors}</div>
            </div>
            <div className="stat-card">
              <MapPin className="stat-icon" size={28} />
              <div className="stat-label">Rooms</div>
              <div className="stat-value">{statistics.uniqueRooms}</div>
            </div>
            <div className="stat-card">
              <BookOpen className="stat-icon" size={28} />
              <div className="stat-label">Courses</div>
              <div className="stat-value">{statistics.uniqueCourses}</div>
            </div>
          </div>
        )}

        {/* Filter Section */}
        {!error && schedules.length > 0 && (
          <div className="filter-section">
            <div className="filter-title">
              <Search size={20} />
              Filter & Search
            </div>
            <div className="filter-grid">
              <div className="search-input-group">
                <label className="filter-label">Search</label>
                <div className="search-input-group" style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by subject, instructor, room..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="search-icon" size={18} />
                </div>
              </div>

              <div>
                <label className="filter-label">Semester</label>
                <select
                  className="filter-select"
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                >
                  <option value="">All Semesters</option>
                  {filterOptions.semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-label">Year Level</label>
                <select
                  className="filter-select"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">All Years</option>
                  {filterOptions.years.map(year => (
                    <option key={year} value={year}>{year} Year</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-label">Instructor</label>
                <select
                  className="filter-select"
                  value={filterInstructor}
                  onChange={(e) => setFilterInstructor(e.target.value)}
                >
                  <option value="">All Instructors</option>
                  {filterOptions.instructors.map(inst => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>

              <div className="action-buttons" style={{ alignSelf: "flex-end", marginTop: "1.5rem" }}>
                <button
                  className="refresh-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterSemester("");
                    setFilterYear("");
                    setFilterInstructor("");
                  }}
                >
                  Clear Filters
                </button>
                <button className="refresh-btn" onClick={fetchSchedules}>
                  <RotateCw size={18} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="empty-state-container">
            <AlertCircle className="empty-state-icon" size={64} />
            <h3 className="empty-state-title">Unable to Load Schedules</h3>
            <p className="empty-state-text">{error}</p>
            <button className="refresh-btn" onClick={fetchSchedules} style={{ marginTop: "1.5rem" }}>
              <RotateCw size={18} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!error && combinedSchedules.length === 0 && schedules.length === 0 && (
          <div className="empty-state-container">
            <Calendar className="empty-state-icon" size={64} />
            <h3 className="empty-state-title">No Schedules Generated</h3>
            <p className="empty-state-text">
              No schedules have been generated yet. Start by having Deans generate class schedules.
            </p>
          </div>
        )}

        {/* No Results State (After Filtering) */}
        {!error && combinedSchedules.length === 0 && schedules.length > 0 && (
          <div className="empty-state-container">
            <Search className="empty-state-icon" size={64} />
            <h3 className="empty-state-title">No Results Found</h3>
            <p className="empty-state-text">
              No schedules match your current filters. Try adjusting your search criteria.
            </p>
            <button
              className="refresh-btn"
              onClick={() => {
                setSearchTerm("");
                setFilterSemester("");
                setFilterYear("");
                setFilterInstructor("");
              }}
              style={{ marginTop: "1.5rem" }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Schedules Display */}
        {!error && combinedSchedules.length > 0 && (
          <div>
            {Object.keys(groupedSchedules).map((groupKey, groupIndex) => {
              const schedulesByInstructor = groupedSchedules[groupKey].reduce((acc, s) => {
                const instructor = s.instructor_name || "Unassigned Instructor";
                if (!acc[instructor]) acc[instructor] = [];
                acc[instructor].push(s);
                return acc;
              }, {});

              return (
                <div key={groupIndex} className="schedule-group-card">
                  <div className="group-header">
                    <div className="group-title">
                      <Calendar size={20} />
                      {groupKey}
                      <span className="group-count">
                        {groupedSchedules[groupKey].length} classes
                      </span>
                    </div>
                    <ChevronDown size={22} className="group-chevron open" />
                  </div>

                  <div>
                    {Object.entries(schedulesByInstructor).map(([instructor, instructorSchedules], i) => (
                      <div key={i} className="instructor-card">
                        <div className="instructor-header">
                          <div>
                            <div className="instructor-name">
                              <Users size={18} />
                              {instructor}
                            </div>
                            <div className="instructor-course">
                              {instructorSchedules[0]?.course_name
                                ? `${instructorSchedules[0].course_name}`
                                : "(No Course Assigned)"}
                            </div>
                          </div>
                          <Badge bg="secondary" className="id-badge">
                            {instructorSchedules.length} class{instructorSchedules.length !== 1 ? "es" : ""}
                          </Badge>
                        </div>

                        <div className="table-responsive">
                          <Table hover className="schedule-table">
                            <thead>
                              <tr>
                                <th>Subject</th>
                                <th>Room</th>
                                <th>Schedule</th>
                                <th className="action-cell">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {instructorSchedules.map((schedule) => (
                                <tr key={schedule.scheduleIds.join('-')}>
                                  <td>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                      <strong>{schedule.subject_code}</strong>
                                      <small style={{ color: "#999" }}>
                                        {schedule.subject_name}
                                      </small>
                                    </div>
                                  </td>
                                  <td>
                                    {schedule.room_name ? (
                                      <Badge bg="info">
                                        <MapPin size={12} className="me-1" style={{ display: "inline" }} />
                                        {schedule.room_name}
                                      </Badge>
                                    ) : (
                                      <Badge bg="secondary" className="unassigned-badge">
                                        Unassigned
                                      </Badge>
                                    )}
                                  </td>
                                  <td>
                                    <div className="timeslots-container">
                                      {schedule.timeslots.map((timeslot, idx) => (
                                        <div key={idx} className="timeslot-item">
                                          <span className="day-badge">{timeslot.day}</span>
                                          <span className="time-badge">
                                            <Clock size={12} />
                                            {timeslot.time}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="action-cell">
                                    <button
                                      className="delete-btn"
                                      onClick={() => setDeleteConfirm(schedule.scheduleIds)}
                                      disabled={deleting}
                                      title="Delete all timeslots for this class"
                                    >
                                      <Trash2 size={16} />
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ScheduleManagement;