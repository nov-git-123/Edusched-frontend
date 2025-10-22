// import React, { useState } from "react";
// import { Card, Button, Form } from "react-bootstrap";

// const InstructorAvailability = () => {
//   const [day, setDay] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/instructor-availability", {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           instructorId: 1, // Replace with actual logged-in instructor’s ID
//           day,
//           start_time: startTime,
//           end_time: endTime,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save availability");

//       setMessage("Availability saved successfully ✅");
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <h5 className="mb-3">Set Your Availability</h5>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-2">
//           <Form.Label>Day</Form.Label>
//           <Form.Select value={day} onChange={(e) => setDay(e.target.value)}>
//             <option value="">Select Day</option>
//             <option>Monday</option>
//             <option>Tuesday</option>
//             <option>Wednesday</option>
//             <option>Thursday</option>
//             <option>Friday</option>
//             <option>Saturday</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group className="mb-2">
//           <Form.Label>Start Time</Form.Label>
//           <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-2">
//           <Form.Label>End Time</Form.Label>
//           <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
//         </Form.Group>
//         <Button type="submit" className="mt-2">Save</Button>
//       </Form>
//       {message && <p className="mt-2">{message}</p>}
//     </Card>
//   );
// };

// export default InstructorAvailability;

// frontend/components/InstructorAvailabilityInput.js
// src/pages/instructor/InstructorAvailability.js
// import React, { useState } from "react";
// import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";

// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const InstructorAvailability = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.reduce((acc, day) => {
//       acc[day] = { start: "", end: "", message: "" };
//       return acc;
//     }, {})
//   );

//   const handleChange = (day, field, value) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { ...prev[day], [field]: value },
//     }));
//   };

//   const handleSave = async (day) => {
//     const { start, end } = availability[day];

//     // ✅ If both fields are empty, skip saving and just clear message
//     if (!start && !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "No availability set for this day ⏭️" },
//       }));
//       return;
//     }

//     // ❌ If only one field is filled, show error
//     if (!start || !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "Please set both start and end time ❌" },
//       }));
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/instructor-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           instructorId: 1, // TODO: replace with logged-in instructor’s ID
//           day,
//           start_time: start,
//           end_time: end,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save availability");

//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "Availability saved successfully ✅" },
//       }));
//     } catch (err) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: err.message },
//       }));
//     }
//   };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <h5 className="mb-3">Set Your Availability</h5>
//       {daysOfWeek.map((day) => (
//         <div key={day} className="mb-3 border-bottom pb-2">
//           <Row className="align-items-center">
//             <Col md={2}>
//               <strong>{day}</strong>
//             </Col>
//             <Col md={3}>
//               <Form.Control
//                 type="time"
//                 value={availability[day].start}
//                 onChange={(e) => handleChange(day, "start", e.target.value)}
//               />
//             </Col>
//             <Col md={3}>
//               <Form.Control
//                 type="time"
//                 value={availability[day].end}
//                 onChange={(e) => handleChange(day, "end", e.target.value)}
//               />
//             </Col>
//             <Col md={2}>
//               <Button size="sm" onClick={() => handleSave(day)}>
//                 Save
//               </Button>
//             </Col>
//           </Row>
//           {availability[day].message && (
//             <Alert
//               variant={
//                 availability[day].message.includes("✅")
//                   ? "success"
//                   : availability[day].message.includes("⏭️")
//                   ? "secondary"
//                   : "danger"
//               }
//               className="mt-2 mb-0 py-1"
//             >
//               {availability[day].message}
//             </Alert>
//           )}
//         </div>
//       ))}
//     </Card>
//   );
// };

// export default InstructorAvailability;

//FUNCTIONAL

// import React, { useState, useEffect } from "react";
// import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";

// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const InstructorAvailability = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.reduce((acc, day) => {
//       acc[day] = { start: "", end: "", message: "" };
//       return acc;
//     }, {})
//   );

//   const [instructorId, setInstructorId] = useState(null);

//   // ✅ Load logged-in instructor from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log("Logged in user:", user); // debug log
//     if (user && user.role === "instructor" && user.instructorId) {
//       setInstructorId(user.instructorId);
//     }
//   }, []);

//   const handleChange = (day, field, value) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { ...prev[day], [field]: value },
//     }));
//   };

//   const handleSave = async (day) => {
//     const { start, end } = availability[day];

//     if (!instructorId) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "Instructor not logged in or missing ID ❌" },
//       }));
//       return;
//     }

//     // ✅ If both fields are empty, skip saving
//     if (!start && !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "No availability set for this day ⏭️" },
//       }));
//       return;
//     }

//     // ❌ If only one field is filled, show error
//     if (!start || !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "Please set both start and end time ❌" },
//       }));
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/instructor-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           instructorId,
//           day,
//           start_time: start,
//           end_time: end,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save availability");

//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: "Availability saved successfully ✅" },
//       }));
//     } catch (err) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { ...prev[day], message: err.message },
//       }));
//     }
//   };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <h5 className="mb-3">Set Your Availability</h5>
//       {daysOfWeek.map((day) => (
//         <div key={day} className="mb-3 border-bottom pb-2">
//           <Row className="align-items-center">
//             <Col md={2}>
//               <strong>{day}</strong>
//             </Col>
//             <Col md={3}>
//               <Form.Control
//                 type="time"
//                 value={availability[day].start}
//                 onChange={(e) => handleChange(day, "start", e.target.value)}
//               />
//             </Col>
//             <Col md={3}>
//               <Form.Control
//                 type="time"
//                 value={availability[day].end}
//                 onChange={(e) => handleChange(day, "end", e.target.value)}
//               />
//             </Col>
//             <Col md={2}>
//               <Button size="sm" onClick={() => handleSave(day)}>
//                 Save
//               </Button>
//             </Col>
//           </Row>
//           {availability[day].message && (
//             <Alert
//               variant={
//                 availability[day].message.includes("✅")
//                   ? "success"
//                   : availability[day].message.includes("⏭️")
//                   ? "secondary"
//                   : "danger"
//               }
//               className="mt-2 mb-0 py-1"
//             >
//               {availability[day].message}
//             </Alert>
//           )}
//         </div>
//       ))}
//     </Card>
//   );
// };

// export default InstructorAvailability;

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, Save, RefreshCw, Trash2, Info } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ========================================
// // 🔔 TOAST NOTIFICATION COMPONENT
// // ========================================
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
//     warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', Icon: AlertCircle },
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
//       <button onClick={onClose} className="toast-close">×</button>
//     </div>
//   );
// });

// // ========================================
// // 🎨 SUMMARY PANEL COMPONENT
// // ========================================
// const AvailabilitySummary = React.memo(({ availability }) => {
//   const stats = useMemo(() => {
//     let daysSet = 0;
//     let totalHours = 0;

//     daysOfWeek.forEach((day) => {
//       const { start, end, isSaved } = availability[day];
//       if (start && end && isSaved) {
//         daysSet++;
//         const startTime = new Date(`2000-01-01T${start}`);
//         const endTime = new Date(`2000-01-01T${end}`);
//         const hours = (endTime - startTime) / (1000 * 60 * 60);
//         if (hours > 0) totalHours += hours;
//       }
//     });

//     return { daysSet, totalHours: totalHours.toFixed(1) };
//   }, [availability]);

//   return (
//     <div className="stats-grid">
//       <div className="stats-card" style={{ borderTopColor: COLORS.accent }}>
//         <div className="stats-icon" style={{ background: `${COLORS.accent}20`, color: COLORS.accent }}>
//           <Calendar size={24} />
//         </div>
//         <div className="stats-content">
//           <div className="stats-value">{stats.daysSet}</div>
//           <div className="stats-label">Days Available</div>
//         </div>
//       </div>
//       <div className="stats-card" style={{ borderTopColor: COLORS.primary }}>
//         <div className="stats-icon" style={{ background: `${COLORS.primary}20`, color: COLORS.primary }}>
//           <Clock size={24} />
//         </div>
//         <div className="stats-content">
//           <div className="stats-value">{stats.totalHours}h</div>
//           <div className="stats-label">Total Hours/Week</div>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ========================================
// // 🗓️ AVAILABILITY ROW COMPONENT
// // ========================================
// const AvailabilityRow = React.memo(({ 
//   day, 
//   data, 
//   onChange, 
//   onSave, 
//   onClear, 
//   isLoading 
// }) => {
//   const { start, end, message, isSaved, hasError } = data;

//   const getStatusClass = () => {
//     if (hasError) return "status-danger";
//     if (isSaved && start && end) return "status-success";
//     if (start || end) return "status-warning";
//     return "status-secondary";
//   };

//   const duration = useMemo(() => {
//     if (!start || !end) return null;
//     const startTime = new Date(`2000-01-01T${start}`);
//     const endTime = new Date(`2000-01-01T${end}`);
//     const hours = (endTime - startTime) / (1000 * 60 * 60);
//     return hours > 0 ? `${hours.toFixed(1)}h` : null;
//   }, [start, end]);

//   return (
//     <div className="availability-row">
//       <div className="row-content">
//         <div className="day-section">
//           <div className="day-label">
//             <span className={`status-badge ${getStatusClass()}`}>
//               {isSaved && start && end ? <CheckCircle size={14} /> : <Clock size={14} />}
//             </span>
//             <strong>{day}</strong>
//             {duration && <span className="duration-badge">{duration}</span>}
//           </div>
//         </div>

//         <div className="time-inputs">
//           <div className="input-group">
//             <label className="input-label">Start Time</label>
//             <input
//               type="time"
//               value={start}
//               onChange={(e) => onChange(day, "start", e.target.value)}
//               disabled={isLoading}
//               className={`time-input ${hasError ? "invalid" : isSaved ? "valid" : ""}`}
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">End Time</label>
//             <input
//               type="time"
//               value={end}
//               onChange={(e) => onChange(day, "end", e.target.value)}
//               disabled={isLoading}
//               className={`time-input ${hasError ? "invalid" : isSaved ? "valid" : ""}`}
//             />
//           </div>
//         </div>

//         <div className="action-buttons">
//           <button
//             onClick={() => onSave(day)}
//             disabled={isLoading || (!start && !end)}
//             className="action-btn btn-save"
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save size={14} />
//                 Save
//               </>
//             )}
//           </button>
//           <button
//             onClick={() => onClear(day)}
//             disabled={isLoading || (!start && !end)}
//             className="action-btn btn-clear"
//           >
//             <Trash2 size={14} />
//           </button>
//         </div>
//       </div>

//       {message && (
//         <div className={`row-message ${hasError ? "message-danger" : "message-success"}`}>
//           {hasError ? <XCircle size={16} /> : <CheckCircle size={16} />}
//           <span>{message}</span>
//         </div>
//       )}
//     </div>
//   );
// });

// // ========================================
// // 🎯 MAIN COMPONENT
// // ========================================
// const InstructorAvailability = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.reduce((acc, day) => {
//       acc[day] = { start: "", end: "", message: "", isSaved: false, hasError: false };
//       return acc;
//     }, {})
//   );

//   const [instructorId, setInstructorId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   // Load instructor ID from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log("Logged in user:", user);
    
//     if (user && user.role === "instructor" && user.instructorId) {
//       setInstructorId(user.instructorId);
//     } else {
//       showToast("Instructor not logged in. Please log in to manage availability.", "danger");
//       setIsFetching(false);
//     }
//   }, []);

//   // Fetch existing availability
//   const fetchAvailability = useCallback(async () => {
//     if (!instructorId) return;

//     setIsFetching(true);
//     setToast({ message: '', type: '' });

//     try {
//       const res = await fetch(`${API}/api/instructor-availability/${instructorId}`);
      
//       if (!res.ok) {
//         throw new Error("Failed to fetch availability");
//       }

//       const data = await res.json();
//       console.log("Fetched availability:", data);

//       const newAvailability = { ...availability };
      
//       data.forEach((item) => {
//         if (newAvailability[item.day]) {
//           newAvailability[item.day] = {
//             start: item.start_time,
//             end: item.end_time,
//             message: "",
//             isSaved: true,
//             hasError: false
//           };
//         }
//       });

//       setAvailability(newAvailability);
//       showToast("Availability loaded successfully!", "success");
//     } catch (err) {
//       console.error("Fetch error:", err);
//       showToast("Could not load existing availability. You can still set new times.", "warning");
//     } finally {
//       setIsFetching(false);
//     }
//   }, [instructorId]);

//   useEffect(() => {
//     if (instructorId) {
//       fetchAvailability();
//     }
//   }, [instructorId, fetchAvailability]);

//   // Handle input changes
//   const handleChange = useCallback((day, field, value) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { 
//         ...prev[day], 
//         [field]: value,
//         message: "",
//         hasError: false,
//         isSaved: false
//       },
//     }));
//   }, []);

//   // Validate time range
//   const validateTime = useCallback((start, end) => {
//     if (!start || !end) {
//       return { valid: false, error: "Please set both start and end time" };
//     }

//     const startTime = new Date(`2000-01-01T${start}`);
//     const endTime = new Date(`2000-01-01T${end}`);

//     if (endTime <= startTime) {
//       return { valid: false, error: "End time must be after start time" };
//     }

//     return { valid: true };
//   }, []);

//   // Save single day
//   const handleSave = useCallback(async (day) => {
//     const { start, end } = availability[day];

//     if (!instructorId) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "Instructor not logged in",
//           hasError: true
//         },
//       }));
//       return;
//     }

//     if (!start && !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "No availability set for this day",
//           hasError: false
//         },
//       }));
//       return;
//     }

//     const validation = validateTime(start, end);
//     if (!validation.valid) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: validation.error,
//           hasError: true
//         },
//       }));
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await fetch(`${API}/api/instructor-availability`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           instructorId,
//           day,
//           start_time: start,
//           end_time: end,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save availability");

//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "Saved successfully!",
//           isSaved: true,
//           hasError: false
//         },
//       }));
//     } catch (err) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: err.message,
//           hasError: true
//         },
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [availability, instructorId, validateTime]);

//   // Clear single day
//   const handleClear = useCallback((day) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { 
//         start: "", 
//         end: "", 
//         message: "Cleared", 
//         isSaved: false,
//         hasError: false
//       },
//     }));
//   }, []);

//   // Save all days (batch)
//   const handleSaveAll = useCallback(async () => {
//     if (!instructorId) {
//       showToast("Instructor not logged in", "danger");
//       return;
//     }

//     const daysToSave = daysOfWeek.filter(day => {
//       const { start, end } = availability[day];
//       return start && end;
//     });

//     if (daysToSave.length === 0) {
//       showToast("No availability to save. Please set times for at least one day.", "warning");
//       return;
//     }

//     const invalidDays = daysToSave.filter(day => {
//       const { start, end } = availability[day];
//       const validation = validateTime(start, end);
//       return !validation.valid;
//     });

//     if (invalidDays.length > 0) {
//       showToast(`Invalid time ranges on: ${invalidDays.join(", ")}`, "danger");
//       return;
//     }

//     setShowConfirmModal(true);
//   }, [availability, instructorId, validateTime]);

//   // Confirm and execute save all
//   const confirmSaveAll = useCallback(async () => {
//     setShowConfirmModal(false);
//     setIsLoading(true);
//     setToast({ message: '', type: '' });

//     const daysToSave = daysOfWeek.filter(day => {
//       const { start, end } = availability[day];
//       return start && end;
//     });

//     let successCount = 0;
//     let errorCount = 0;

//     for (const day of daysToSave) {
//       const { start, end } = availability[day];

//       try {
//         const res = await fetch(`${API}/api/instructor-availability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             instructorId,
//             day,
//             start_time: start,
//             end_time: end,
//           }),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error);

//         successCount++;
//         setAvailability((prev) => ({
//           ...prev,
//           [day]: { 
//             ...prev[day], 
//             isSaved: true,
//             hasError: false,
//             message: ""
//           },
//         }));
//       } catch (err) {
//         errorCount++;
//         setAvailability((prev) => ({
//           ...prev,
//           [day]: { 
//             ...prev[day], 
//             message: err.message,
//             hasError: true
//           },
//         }));
//       }
//     }

//     setIsLoading(false);
//     showToast(
//       `Saved ${successCount} day(s)${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
//       errorCount === 0 ? "success" : "warning"
//     );
//   }, [availability, instructorId]);

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   if (isFetching) {
//     return (
//       <div className="availability-container">
//         <div className="loading-state">
//           <div className="spinner-large" />
//           <p>Loading your availability...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="availability-container">
//         {/* Toast Notification */}
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={() => setToast({ message: '', type: '' })} 
//         />

//         {/* Page Header */}
//         <div className="page-header">
//           <div className="header-content">
//             <div className="header-title-group">
//               <div className="header-icon">
//                 <Calendar size={32} />
//               </div>
//               <div>
//                 <h1 className="page-title">Set Your Weekly Availability</h1>
//                 <p className="page-subtitle">
//                   Define your available teaching hours for each day of the week
//                 </p>
//               </div>
//             </div>

//             <div className="header-actions">
//               <button
//                 onClick={fetchAvailability}
//                 disabled={isLoading || !instructorId}
//                 className="action-btn btn-refresh"
//               >
//                 <RefreshCw size={16} className={isLoading ? "spinning" : ""} />
//                 Refresh
//               </button>
//               <button
//                 onClick={handleSaveAll}
//                 disabled={isLoading || !instructorId}
//                 className="action-btn btn-primary"
//               >
//                 <Save size={16} />
//                 Save All
//               </button>
//             </div>
//           </div>

//           {/* Stats Summary */}
//           <AvailabilitySummary availability={availability} />
//         </div>

//         {/* Availability List */}
//         <div className="content-section">
//           <div className="availability-list">
//             {daysOfWeek.map((day) => (
//               <AvailabilityRow
//                 key={day}
//                 day={day}
//                 data={availability[day]}
//                 onChange={handleChange}
//                 onSave={handleSave}
//                 onClear={handleClear}
//                 isLoading={isLoading}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h5>Confirm Save All</h5>
//               <button onClick={() => setShowConfirmModal(false)} className="modal-close">×</button>
//             </div>
//             <div className="modal-body">
//               Are you sure you want to save all availability? This will overwrite any existing saved times.
//             </div>
//             <div className="modal-footer">
//               <button onClick={() => setShowConfirmModal(false)} className="action-btn btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={confirmSaveAll} className="action-btn btn-primary">
//                 Save All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//         }

//         .availability-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           padding: 2rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== LOADING STATE ===== */
//         .loading-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 60px 20px;
//           gap: 16px;
//         }

//         .loading-state p {
//           color: ${COLORS.secondary};
//           margin: 0;
//           font-size: 1rem;
//         }

//         .spinner-large {
//           width: 40px;
//           height: 40px;
//           border: 4px solid ${COLORS.lightest};
//           border-top: 4px solid ${COLORS.accent};
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid #ffffff;
//           border-top: 2px solid transparent;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
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

//         .toast-close {
//           background: none;
//           border: none;
//           font-size: 1.5rem;
//           cursor: pointer;
//           margin-left: auto;
//           opacity: 0.7;
//           transition: opacity 0.3s;
//           color: inherit;
//         }

//         .toast-close:hover {
//           opacity: 1;
//         }

//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
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

//         .btn-primary {
//           background: ${COLORS.accent};
//           color: white;
//         }

//         .btn-primary:hover:not(:disabled) {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         .btn-secondary {
//           background: #6c757d;
//           color: white;
//         }

//         .btn-secondary:hover:not(:disabled) {
//           background: #5a6268;
//           transform: translateY(-2px);
//         }

//         .btn-refresh {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .btn-refresh:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .btn-save {
//           background: ${COLORS.accent};
//           color: white;
//           padding: 0.6rem 1rem;
//           font-size: 0.85rem;
//         }

//         .btn-save:hover:not(:disabled) {
//           background: ${COLORS.light};
//         }

//         .btn-clear {
//           background: transparent;
//           color: #dc3545;
//           border: 1px solid #dc3545;
//           padding: 0.6rem 0.75rem;
//         }

//         .btn-clear:hover:not(:disabled) {
//           background: #dc3545;
//           color: white;
//         }

//         .action-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
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
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
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
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
//           padding: 2rem;
//         }

//         .availability-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         /* ===== AVAILABILITY ROW ===== */
//         .availability-row {
//           background: white;
//           border: 1px solid #e9ecef;
//           border-radius: 12px;
//           padding: 1.5rem;
//           transition: all 0.3s ease;
//           animation: fadeIn 0.4s ease;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .availability-row:hover {
//           border-color: ${COLORS.accent};
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .row-content {
//           display: grid;
//           grid-template-columns: 200px 1fr auto;
//           gap: 1.5rem;
//           align-items: center;
//         }

//         .day-label {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .status-badge {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 6px 8px;
//           border-radius: 8px;
//           gap: 4px;
//         }

//         .status-success {
//           background: #d4edda;
//           color: #155724;
//         }

//         .status-danger {
//           background: #f8d7da;
//           color: #721c24;
//         }

//         .status-warning {
//           background: #fff3cd;
//           color: #856404;
//         }

//         .status-secondary {
//           background: #e9ecef;
//           color: #6c757d;
//         }

//         .duration-badge {
//           background: ${COLORS.lightest};
//           color: ${COLORS.accent};
//           font-size: 0.75rem;
//           padding: 4px 10px;
//           border-radius: 12px;
//           font-weight: 600;
//         }

//         .time-inputs {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .input-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .input-label {
//           font-size: 0.85rem;
//           font-weight: 500;
//           color: ${COLORS.secondary};
//           margin: 0;
//         }

//         .time-input {
//           padding: 0.75rem 1rem;
//           border: 1px solid #dee2e6;
//           border-radius: 8px;
//                     background: #f8f9fa;
//           font-size: 0.9rem;
//           transition: border-color 0.2s ease, box-shadow 0.2s ease;
//         }

//         .time-input:focus {
//           outline: none;
//           border-color: ${COLORS.accent};
//           box-shadow: 0 0 0 2px ${COLORS.lightest};
//         }

//         .time-input.valid {
//           border-color: #28a745;
//           background: #e8f5e9;
//         }

//         .time-input.invalid {
//           border-color: #dc3545;
//           background: #f8d7da;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.75rem;
//           justify-content: flex-end;
//         }

//         /* ===== ROW MESSAGES ===== */
//         .row-message {
//           margin-top: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           padding: 0.75rem 1rem;
//           border-radius: 8px;
//         }

//         .message-success {
//           background: #d4edda;
//           color: #155724;
//         }

//         .message-danger {
//           background: #f8d7da;
//           color: #721c24;
//         }

//         /* ===== MODAL ===== */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//           animation: fadeInOverlay 0.3s ease;
//         }

//         @keyframes fadeInOverlay {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-content {
//           background: white;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 400px;
//           overflow: hidden;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
//           animation: scaleIn 0.3s ease;
//         }

//         @keyframes scaleIn {
//           from { transform: scale(0.9); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1rem 1.25rem;
//           background: ${COLORS.primary};
//           color: white;
//           font-weight: 600;
//         }

//         .modal-close {
//           background: transparent;
//           border: none;
//           font-size: 1.5rem;
//           color: white;
//           cursor: pointer;
//         }

//         .modal-body {
//           padding: 1.25rem;
//           color: ${COLORS.secondary};
//           font-size: 0.95rem;
//           line-height: 1.5;
//         }

//         .modal-footer {
//           display: flex;
//           justify-content: flex-end;
//           gap: 1rem;
//           padding: 1rem 1.25rem;
//           border-top: 1px solid #dee2e6;
//         }

//         /* ===== RESPONSIVE DESIGN ===== */
//         @media (max-width: 992px) {
//           .header-content {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .row-content {
//             grid-template-columns: 1fr;
//           }

//           .action-buttons {
//             justify-content: flex-start;
//           }
//         }

//         @media (max-width: 768px) {
//           .page-title {
//             font-size: 1.5rem;
//           }

//           .stats-value {
//             font-size: 1.5rem;
//           }

//           .header-icon {
//             width: 50px;
//             height: 50px;
//           }
//         }

//         @media (max-width: 576px) {
//           .availability-container {
//             padding: 1rem;
//           }

//           .content-section {
//             padding: 1.25rem;
//           }

//           .time-input {
//             font-size: 0.85rem;
//           }

//           .action-btn {
//             padding: 0.6rem 1rem;
//             font-size: 0.85rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default InstructorAvailability;

//withoutavailabilityshow

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, Save, RefreshCw, Trash2, Info } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ========================================
// // 🔔 TOAST NOTIFICATION COMPONENT
// // ========================================
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
//     warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', Icon: AlertCircle },
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
//       <button onClick={onClose} className="toast-close">×</button>
//     </div>
//   );
// });

// // ========================================
// // 🎨 SUMMARY PANEL COMPONENT
// // ========================================
// const AvailabilitySummary = React.memo(({ availability }) => {
//   const stats = useMemo(() => {
//     let daysSet = 0;
//     let totalHours = 0;

//     daysOfWeek.forEach((day) => {
//       const { start, end, isSaved } = availability[day];
//       if (start && end && isSaved) {
//         daysSet++;
//         const startTime = new Date(`2000-01-01T${start}`);
//         const endTime = new Date(`2000-01-01T${end}`);
//         const hours = (endTime - startTime) / (1000 * 60 * 60);
//         if (hours > 0) totalHours += hours;
//       }
//     });

//     return { daysSet, totalHours: totalHours.toFixed(1) };
//   }, [availability]);

//   return (
//     <div className="stats-grid">
//       <div className="stats-card" style={{ borderTopColor: COLORS.accent }}>
//         <div className="stats-icon" style={{ background: `${COLORS.accent}20`, color: COLORS.accent }}>
//           <Calendar size={24} />
//         </div>
//         <div className="stats-content">
//           <div className="stats-value">{stats.daysSet}</div>
//           <div className="stats-label">Days Available</div>
//         </div>
//       </div>
//       <div className="stats-card" style={{ borderTopColor: COLORS.primary }}>
//         <div className="stats-icon" style={{ background: `${COLORS.primary}20`, color: COLORS.primary }}>
//           <Clock size={24} />
//         </div>
//         <div className="stats-content">
//           <div className="stats-value">{stats.totalHours}h</div>
//           <div className="stats-label">Total Hours/Week</div>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ========================================
// // 🗓️ AVAILABILITY ROW COMPONENT
// // ========================================
// const AvailabilityRow = React.memo(({ 
//   day, 
//   data, 
//   onChange, 
//   onSave, 
//   onClear, 
//   isLoading 
// }) => {
//   const { start, end, message, isSaved, hasError } = data;

//   // Generate time slot options from 7:00 AM to 7:00 PM (7-19 in 24-hour format)
//   const generateTimeSlotOptions = () => {
//     const slots = [];
//     // Start at 7 AM (hour 7) and go until 6 PM (hour 18), so end time is 7 PM (hour 19)
//     for (let hour = 7; hour < 19; hour++) {
//       const startHour24 = hour;
//       const endHour24 = hour + 1;
      
//       const startTime24 = `${startHour24.toString().padStart(2, '0')}:00`;
//       const endTime24 = `${endHour24.toString().padStart(2, '0')}:00`;
      
//       // Convert to 12-hour format for display
//       const formatTo12Hour = (h) => {
//         const period = h >= 12 ? 'PM' : 'AM';
//         const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
//         return `${hour12}:00 ${period}`;
//       };
      
//       const displayLabel = `${formatTo12Hour(startHour24)} - ${formatTo12Hour(endHour24)}`;
      
//       slots.push({
//         start: startTime24,
//         end: endTime24,
//         label: displayLabel
//       });
//     }
//     return slots;
//   };

//   const timeSlotOptions = useMemo(() => generateTimeSlotOptions(), []);

//   const getStatusClass = () => {
//     if (hasError) return "status-danger";
//     if (isSaved && start && end) return "status-success";
//     if (start || end) return "status-warning";
//     return "status-secondary";
//   };

//   const duration = useMemo(() => {
//     if (!start || !end) return null;
//     const startTime = new Date(`2000-01-01T${start}`);
//     const endTime = new Date(`2000-01-01T${end}`);
//     const hours = (endTime - startTime) / (1000 * 60 * 60);
//     return hours > 0 ? `${hours.toFixed(1)}h` : null;
//   }, [start, end]);

//   // Find current selected slot
//   const currentSlot = useMemo(() => {
//     if (!start || !end) return "";
//     const slot = timeSlotOptions.find(s => s.start === start && s.end === end);
//     return slot ? `${slot.start}-${slot.end}` : "";
//   }, [start, end, timeSlotOptions]);

//   const handleSlotChange = (value) => {
//     if (!value) {
//       onChange(day, "start", "");
//       onChange(day, "end", "");
//       return;
//     }
    
//     const [startTime, endTime] = value.split('-');
//     onChange(day, "start", startTime);
//     onChange(day, "end", endTime);
//   };

//   return (
//     <div className="availability-row">
//       <div className="row-content">
//         <div className="day-section">
//           <div className="day-label">
//             <span className={`status-badge ${getStatusClass()}`}>
//               {isSaved && start && end ? <CheckCircle size={14} /> : <Clock size={14} />}
//             </span>
//             <strong>{day}</strong>
//             {duration && <span className="duration-badge">{duration}</span>}
//           </div>
//         </div>

//         <div className="time-inputs">
//           <div className="input-group-full">
//             <label className="input-label">Time Slot</label>
//             <select
//               value={currentSlot}
//               onChange={(e) => handleSlotChange(e.target.value)}
//               disabled={isLoading}
//               className={`time-select ${hasError ? "invalid" : isSaved ? "valid" : ""}`}
//             >
//               <option value="">Select time slot</option>
//               {timeSlotOptions.map((slot) => (
//                 <option key={`${slot.start}-${slot.end}`} value={`${slot.start}-${slot.end}`}>
//                   {slot.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="action-buttons">
//           <button
//             onClick={() => onSave(day)}
//             disabled={isLoading || (!start && !end)}
//             className="action-btn btn-save"
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save size={14} />
//                 Save
//               </>
//             )}
//           </button>
//           <button
//             onClick={() => onClear(day)}
//             disabled={isLoading || (!start && !end)}
//             className="action-btn btn-clear"
//           >
//             <Trash2 size={14} />
//           </button>
//         </div>
//       </div>

//       {message && (
//         <div className={`row-message ${hasError ? "message-danger" : "message-success"}`}>
//           {hasError ? <XCircle size={16} /> : <CheckCircle size={16} />}
//           <span>{message}</span>
//         </div>
//       )}
//     </div>
//   );
// });

// // ========================================
// // 🎯 MAIN COMPONENT
// // ========================================
// const InstructorAvailability = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.reduce((acc, day) => {
//       acc[day] = { start: "", end: "", message: "", isSaved: false, hasError: false };
//       return acc;
//     }, {})
//   );

//   const [instructorId, setInstructorId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   // Load instructor ID from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log("Logged in user:", user);
    
//     if (user && user.role === "instructor" && user.instructorId) {
//       setInstructorId(user.instructorId);
//     } else {
//       showToast("Instructor not logged in. Please log in to manage availability.", "danger");
//       setIsFetching(false);
//     }
//   }, []);

//   // Fetch existing availability
//   const fetchAvailability = useCallback(async () => {
//     if (!instructorId) return;

//     setIsFetching(true);
//     setToast({ message: '', type: '' });

//     try {
//       const res = await fetch(`${API}/api/instructor-availability/${instructorId}`);
      
//       if (!res.ok) {
//         throw new Error("Failed to fetch availability");
//       }

//       const data = await res.json();
//       console.log("Fetched availability:", data);

//       const newAvailability = { ...availability };
      
//       data.forEach((item) => {
//         if (newAvailability[item.day]) {
//           newAvailability[item.day] = {
//             start: item.start_time,
//             end: item.end_time,
//             message: "",
//             isSaved: true,
//             hasError: false
//           };
//         }
//       });

//       setAvailability(newAvailability);
//       showToast("Availability loaded successfully!", "success");
//     } catch (err) {
//       console.error("Fetch error:", err);
//       showToast("Could not load existing availability. You can still set new times.", "warning");
//     } finally {
//       setIsFetching(false);
//     }
//   }, [instructorId]);

//   useEffect(() => {
//     if (instructorId) {
//       fetchAvailability();
//     }
//   }, [instructorId, fetchAvailability]);

//   // Handle input changes
//   const handleChange = useCallback((day, field, value) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { 
//         ...prev[day], 
//         [field]: value,
//         message: "",
//         hasError: false,
//         isSaved: false
//       },
//     }));
//   }, []);

//   // Validate time range
//   const validateTime = useCallback((start, end) => {
//     if (!start || !end) {
//       return { valid: false, error: "Please set both start and end time" };
//     }

//     const startTime = new Date(`2000-01-01T${start}`);
//     const endTime = new Date(`2000-01-01T${end}`);

//     if (endTime <= startTime) {
//       return { valid: false, error: "End time must be after start time" };
//     }

//     return { valid: true };
//   }, []);

//   // Save single day
//   const handleSave = useCallback(async (day) => {
//     const { start, end } = availability[day];

//     if (!instructorId) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "Instructor not logged in",
//           hasError: true
//         },
//       }));
//       return;
//     }

//     if (!start && !end) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "No availability set for this day",
//           hasError: false
//         },
//       }));
//       return;
//     }

//     const validation = validateTime(start, end);
//     if (!validation.valid) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: validation.error,
//           hasError: true
//         },
//       }));
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await fetch(`${API}/api/instructor-availability`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           instructorId,
//           day,
//           start_time: start,
//           end_time: end,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save availability");

//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: "Saved successfully!",
//           isSaved: true,
//           hasError: false
//         },
//       }));
//     } catch (err) {
//       setAvailability((prev) => ({
//         ...prev,
//         [day]: { 
//           ...prev[day], 
//           message: err.message,
//           hasError: true
//         },
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [availability, instructorId, validateTime]);

//   // Clear single day
//   const handleClear = useCallback((day) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: { 
//         start: "", 
//         end: "", 
//         message: "Cleared", 
//         isSaved: false,
//         hasError: false
//       },
//     }));
//   }, []);

//   // Save all days (batch)
//   const handleSaveAll = useCallback(async () => {
//     if (!instructorId) {
//       showToast("Instructor not logged in", "danger");
//       return;
//     }

//     const daysToSave = daysOfWeek.filter(day => {
//       const { start, end } = availability[day];
//       return start && end;
//     });

//     if (daysToSave.length === 0) {
//       showToast("No availability to save. Please set times for at least one day.", "warning");
//       return;
//     }

//     const invalidDays = daysToSave.filter(day => {
//       const { start, end } = availability[day];
//       const validation = validateTime(start, end);
//       return !validation.valid;
//     });

//     if (invalidDays.length > 0) {
//       showToast(`Invalid time ranges on: ${invalidDays.join(", ")}`, "danger");
//       return;
//     }

//     setShowConfirmModal(true);
//   }, [availability, instructorId, validateTime]);

//   // Confirm and execute save all
//   const confirmSaveAll = useCallback(async () => {
//     setShowConfirmModal(false);
//     setIsLoading(true);
//     setToast({ message: '', type: '' });

//     const daysToSave = daysOfWeek.filter(day => {
//       const { start, end } = availability[day];
//       return start && end;
//     });

//     let successCount = 0;
//     let errorCount = 0;

//     for (const day of daysToSave) {
//       const { start, end } = availability[day];

//       try {
//         const res = await fetch(`${API}/api/instructor-availability`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             instructorId,
//             day,
//             start_time: start,
//             end_time: end,
//           }),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error);

//         successCount++;
//         setAvailability((prev) => ({
//           ...prev,
//           [day]: { 
//             ...prev[day], 
//             isSaved: true,
//             hasError: false,
//             message: ""
//           },
//         }));
//       } catch (err) {
//         errorCount++;
//         setAvailability((prev) => ({
//           ...prev,
//           [day]: { 
//             ...prev[day], 
//             message: err.message,
//             hasError: true
//           },
//         }));
//       }
//     }

//     setIsLoading(false);
//     showToast(
//       `Saved ${successCount} day(s)${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
//       errorCount === 0 ? "success" : "warning"
//     );
//   }, [availability, instructorId]);

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   if (isFetching) {
//     return (
//       <div className="availability-container">
//         <div className="loading-state">
//           <div className="spinner-large" />
//           <p>Loading your availability...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="availability-container">
//         {/* Toast Notification */}
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={() => setToast({ message: '', type: '' })} 
//         />

//         {/* Page Header */}
//         <div className="page-header">
//           <div className="header-content">
//             <div className="header-title-group">
//               <div className="header-icon">
//                 <Calendar size={32} />
//               </div>
//               <div>
//                 <h1 className="page-title">Set Your Weekly Availability</h1>
//                 <p className="page-subtitle">
//                   Define your available teaching hours for each day of the week
//                 </p>
//               </div>
//             </div>

//             <div className="header-actions">
//               <button
//                 onClick={fetchAvailability}
//                 disabled={isLoading || !instructorId}
//                 className="action-btn btn-refresh"
//               >
//                 <RefreshCw size={16} className={isLoading ? "spinning" : ""} />
//                 Refresh
//               </button>
//               <button
//                 onClick={handleSaveAll}
//                 disabled={isLoading || !instructorId}
//                 className="action-btn btn-primary"
//               >
//                 <Save size={16} />
//                 Save All
//               </button>
//             </div>
//           </div>

//           {/* Stats Summary */}
//           <AvailabilitySummary availability={availability} />
//         </div>

//         {/* Availability List */}
//         <div className="content-section">
//           <div className="availability-list">
//             {daysOfWeek.map((day) => (
//               <AvailabilityRow
//                 key={day}
//                 day={day}
//                 data={availability[day]}
//                 onChange={handleChange}
//                 onSave={handleSave}
//                 onClear={handleClear}
//                 isLoading={isLoading}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h5>Confirm Save All</h5>
//               <button onClick={() => setShowConfirmModal(false)} className="modal-close">×</button>
//             </div>
//             <div className="modal-body">
//               Are you sure you want to save all availability? This will overwrite any existing saved times.
//             </div>
//             <div className="modal-footer">
//               <button onClick={() => setShowConfirmModal(false)} className="action-btn btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={confirmSaveAll} className="action-btn btn-primary">
//                 Save All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//         }

//         .availability-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           padding: 2rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== LOADING STATE ===== */
//         .loading-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 60px 20px;
//           gap: 16px;
//         }

//         .loading-state p {
//           color: ${COLORS.secondary};
//           margin: 0;
//           font-size: 1rem;
//         }

//         .spinner-large {
//           width: 40px;
//           height: 40px;
//           border: 4px solid ${COLORS.lightest};
//           border-top: 4px solid ${COLORS.accent};
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid #ffffff;
//           border-top: 2px solid transparent;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
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

//         .toast-close {
//           background: none;
//           border: none;
//           font-size: 1.5rem;
//           cursor: pointer;
//           margin-left: auto;
//           opacity: 0.7;
//           transition: opacity 0.3s;
//           color: inherit;
//         }

//         .toast-close:hover {
//           opacity: 1;
//         }

//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
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

//         .btn-primary {
//           background: ${COLORS.accent};
//           color: white;
//         }

//         .btn-primary:hover:not(:disabled) {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         .btn-secondary {
//           background: #6c757d;
//           color: white;
//         }

//         .btn-secondary:hover:not(:disabled) {
//           background: #5a6268;
//           transform: translateY(-2px);
//         }

//         .btn-refresh {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .btn-refresh:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .btn-save {
//           background: ${COLORS.accent};
//           color: white;
//           padding: 0.6rem 1rem;
//           font-size: 0.85rem;
//         }

//         .btn-save:hover:not(:disabled) {
//           background: ${COLORS.light};
//         }

//         .btn-clear {
//           background: transparent;
//           color: #dc3545;
//           border: 1px solid #dc3545;
//           padding: 0.6rem 0.75rem;
//         }

//         .btn-clear:hover:not(:disabled) {
//           background: #dc3545;
//           color: white;
//         }

//         .action-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
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
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
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
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
//           padding: 2rem;
//         }

//         .availability-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         /* ===== AVAILABILITY ROW ===== */
//         .availability-row {
//           background: white;
//           border: 1px solid #e9ecef;
//           border-radius: 12px;
//           padding: 1.5rem;
//           transition: all 0.3s ease;
//           animation: fadeIn 0.4s ease;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .availability-row:hover {
//           border-color: ${COLORS.accent};
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .row-content {
//           display: grid;
//           grid-template-columns: 200px 1fr auto;
//           gap: 1.5rem;
//           align-items: center;
//         }

//         .day-label {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .status-badge {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 6px 8px;
//           border-radius: 8px;
//           gap: 4px;
//         }

//         .status-success {
//           background: #d4edda;
//           color: #155724;
//         }

//         .status-danger {
//           background: #f8d7da;
//           color: #721c24;
//         }

//         .status-warning {
//           background: #fff3cd;
//           color: #856404;
//         }

//         .status-secondary {
//           background: #e9ecef;
//           color: #6c757d;
//         }

//         .duration-badge {
//           background: ${COLORS.lightest};
//           color: ${COLORS.accent};
//           font-size: 0.75rem;
//           padding: 4px 10px;
//           border-radius: 12px;
//           font-weight: 600;
//         }

//         .time-inputs {
//           flex: 1;
//         }

//         .input-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .input-group-full {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//           width: 100%;
//         }

//         .input-label {
//           font-size: 0.85rem;
//           font-weight: 500;
//           color: ${COLORS.secondary};
//           margin: 0;
//         }

//         .time-select {
//           padding: 0.75rem 1rem;
//           border: 1px solid #dee2e6;
//           border-radius: 8px;
//           background: #f8f9fa;
//           font-size: 0.9rem;
//           transition: border-color 0.2s ease, box-shadow 0.2s ease;
//           cursor: pointer;
//           width: 100%;
//         }

//         .time-select:focus {
//           outline: none;
//           border-color: ${COLORS.accent};
//           box-shadow: 0 0 0 2px ${COLORS.lightest};
//         }

//         .time-select.valid {
//           border-color: #28a745;
//           background: #e8f5e9;
//         }

//         .time-select.invalid {
//           border-color: #dc3545;
//           background: #f8d7da;
//         }

//         .time-select:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.75rem;
//           justify-content: flex-end;
//         }

//         /* ===== ROW MESSAGES ===== */
//         .row-message {
//           margin-top: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           padding: 0.75rem 1rem;
//           border-radius: 8px;
//         }

//         .message-success {
//           background: #d4edda;
//           color: #155724;
//         }

//         .message-danger {
//           background: #f8d7da;
//           color: #721c24;
//         }

//         /* ===== MODAL ===== */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//           animation: fadeInOverlay 0.3s ease;
//         }

//         @keyframes fadeInOverlay {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-content {
//           background: white;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 400px;
//           overflow: hidden;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
//           animation: scaleIn 0.3s ease;
//         }

//         @keyframes scaleIn {
//           from { transform: scale(0.9); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1rem 1.25rem;
//           background: ${COLORS.primary};
//           color: white;
//           font-weight: 600;
//         }

//         .modal-close {
//           background: transparent;
//           border: none;
//           font-size: 1.5rem;
//           color: white;
//           cursor: pointer;
//         }

//         .modal-body {
//           padding: 1.25rem;
//           color: ${COLORS.secondary};
//           font-size: 0.95rem;
//           line-height: 1.5;
//         }

//         .modal-footer {
//           display: flex;
//           justify-content: flex-end;
//           gap: 1rem;
//           padding: 1rem 1.25rem;
//           border-top: 1px solid #dee2e6;
//         }

//         /* ===== RESPONSIVE DESIGN ===== */
//         @media (max-width: 992px) {
//           .header-content {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .row-content {
//             grid-template-columns: 1fr;
//           }

//           .action-buttons {
//             justify-content: flex-start;
//           }
//         }

//         @media (max-width: 768px) {
//           .page-title {
//             font-size: 1.5rem;
//           }

//           .stats-value {
//             font-size: 1.5rem;
//           }

//           .header-icon {
//             width: 50px;
//             height: 50px;
//           }
//         }

//         @media (max-width: 576px) {
//           .availability-container {
//             padding: 1rem;
//           }

//           .content-section {
//             padding: 1.25rem;
//           }

//           .time-select {
//             font-size: 0.85rem;
//           }

//           .action-btn {
//             padding: 0.6rem 1rem;
//             font-size: 0.85rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default InstructorAvailability;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, Save, RefreshCw, Trash2, Info } from "lucide-react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

// ========================================
// 🔔 TOAST NOTIFICATION COMPONENT
// ========================================
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
    warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', Icon: AlertCircle },
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
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
});

// ========================================
// 🎨 SUMMARY PANEL COMPONENT
// ========================================
const AvailabilitySummary = React.memo(({ availability }) => {
  const stats = useMemo(() => {
    let daysSet = 0;
    let totalHours = 0;

    daysOfWeek.forEach((day) => {
      const { start, end, isSaved } = availability[day];
      if (start && end && isSaved) {
        daysSet++;
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        if (hours > 0) totalHours += hours;
      }
    });

    return { daysSet, totalHours: totalHours.toFixed(1) };
  }, [availability]);

  return (
    <div className="stats-grid">
      <div className="stats-card" style={{ borderTopColor: COLORS.accent }}>
        <div className="stats-icon" style={{ background: `${COLORS.accent}20`, color: COLORS.accent }}>
          <Calendar size={24} />
        </div>
        <div className="stats-content">
          <div className="stats-value">{stats.daysSet}</div>
          <div className="stats-label">Days Available</div>
        </div>
      </div>
      <div className="stats-card" style={{ borderTopColor: COLORS.primary }}>
        <div className="stats-icon" style={{ background: `${COLORS.primary}20`, color: COLORS.primary }}>
          <Clock size={24} />
        </div>
        <div className="stats-content">
          <div className="stats-value">{stats.totalHours}h</div>
          <div className="stats-label">Total Hours/Week</div>
        </div>
      </div>
    </div>
  );
});

// ========================================
// 📅 WEEKLY SCHEDULE VIEW COMPONENT
// ========================================
const WeeklyScheduleView = React.memo(({ availability }) => {
  const formatTime12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  const savedDays = useMemo(() => {
    return daysOfWeek.filter(day => {
      const { start, end, isSaved } = availability[day];
      return start && end && isSaved;
    });
  }, [availability]);

  if (savedDays.length === 0) {
    return (
      <div className="schedule-view empty-schedule">
        <div className="empty-schedule-icon">
          <Calendar size={48} />
        </div>
        <h3>No Availability Set Yet</h3>
        <p>Start by setting your available hours for each day below</p>
      </div>
    );
  }

  return (
    <div className="schedule-view">
      <div className="schedule-header">
        <h3>Your Weekly Schedule</h3>
        <p>Showing {savedDays.length} day{savedDays.length !== 1 ? 's' : ''} with saved availability</p>
      </div>
      <div className="schedule-grid">
        {daysOfWeek.map((day) => {
          const { start, end, isSaved } = availability[day];
          const hasAvailability = start && end && isSaved;
          
          return (
            <div 
              key={day} 
              className={`schedule-day-card ${hasAvailability ? 'has-availability' : 'no-availability'}`}
            >
              <div className="schedule-day-name">{day}</div>
              {hasAvailability ? (
                <div className="schedule-time-slot">
                  <Clock size={16} />
                  <div className="schedule-time-range">
                    <span>{formatTime12Hour(start)}</span>
                    <span className="time-separator">-</span>
                    <span>{formatTime12Hour(end)}</span>
                  </div>
                </div>
              ) : (
                <div className="schedule-no-time">
                  <span>Not Set</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ========================================
// 🗓️ AVAILABILITY ROW COMPONENT
// ========================================
const AvailabilityRow = React.memo(({ 
  day, 
  data, 
  onChange, 
  onSave, 
  onClear, 
  isLoading 
}) => {
  const { start, end, message, isSaved, hasError } = data;

  // Generate time slot options from 7:00 AM to 7:00 PM (7-19 in 24-hour format)
  const generateTimeSlotOptions = () => {
    const slots = [];
    // Start at 7 AM (hour 7) and go until 6 PM (hour 18), so end time is 7 PM (hour 19)
    for (let hour = 7; hour < 19; hour++) {
      const startHour24 = hour;
      const endHour24 = hour + 1;
      
      const startTime24 = `${startHour24.toString().padStart(2, '0')}:00`;
      const endTime24 = `${endHour24.toString().padStart(2, '0')}:00`;
      
      // Convert to 12-hour format for display
      const formatTo12Hour = (h) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${hour12}:00 ${period}`;
      };
      
      const displayLabel = `${formatTo12Hour(startHour24)} - ${formatTo12Hour(endHour24)}`;
      
      slots.push({
        start: startTime24,
        end: endTime24,
        label: displayLabel
      });
    }
    return slots;
  };

  const timeSlotOptions = useMemo(() => generateTimeSlotOptions(), []);

  const getStatusClass = () => {
    if (hasError) return "status-danger";
    if (isSaved && start && end) return "status-success";
    if (start || end) return "status-warning";
    return "status-secondary";
  };

  const duration = useMemo(() => {
    if (!start || !end) return null;
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    return hours > 0 ? `${hours.toFixed(1)}h` : null;
  }, [start, end]);

  // Find current selected slot
  const currentSlot = useMemo(() => {
    if (!start || !end) return "";
    const slot = timeSlotOptions.find(s => s.start === start && s.end === end);
    return slot ? `${slot.start}-${slot.end}` : "";
  }, [start, end, timeSlotOptions]);

  const handleSlotChange = (value) => {
    if (!value) {
      onChange(day, "start", "");
      onChange(day, "end", "");
      return;
    }
    
    const [startTime, endTime] = value.split('-');
    onChange(day, "start", startTime);
    onChange(day, "end", endTime);
  };

  return (
    <div className="availability-row">
      <div className="row-content">
        <div className="day-section">
          <div className="day-label">
            <span className={`status-badge ${getStatusClass()}`}>
              {isSaved && start && end ? <CheckCircle size={14} /> : <Clock size={14} />}
            </span>
            <strong>{day}</strong>
            {duration && <span className="duration-badge">{duration}</span>}
          </div>
        </div>

        <div className="time-inputs">
          <div className="input-group-full">
            <label className="input-label">Time Slot</label>
            <select
              value={currentSlot}
              onChange={(e) => handleSlotChange(e.target.value)}
              disabled={isLoading}
              className={`time-select ${hasError ? "invalid" : isSaved ? "valid" : ""}`}
            >
              <option value="">Select time slot</option>
              {timeSlotOptions.map((slot) => (
                <option key={`${slot.start}-${slot.end}`} value={`${slot.start}-${slot.end}`}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => onSave(day)}
            disabled={isLoading || (!start && !end)}
            className="action-btn btn-save"
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save
              </>
            )}
          </button>
          <button
            onClick={() => onClear(day)}
            disabled={isLoading || (!start && !end)}
            className="action-btn btn-clear"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {message && (
        <div className={`row-message ${hasError ? "message-danger" : "message-success"}`}>
          {hasError ? <XCircle size={16} /> : <CheckCircle size={16} />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
});

// ========================================
// 🎯 MAIN COMPONENT
// ========================================
const InstructorAvailability = () => {
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { start: "", end: "", message: "", isSaved: false, hasError: false };
      return acc;
    }, {})
  );

  const [instructorId, setInstructorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load instructor ID from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user:", user);
    
    if (user && user.role === "instructor" && user.instructorId) {
      setInstructorId(user.instructorId);
    } else {
      showToast("Instructor not logged in. Please log in to manage availability.", "danger");
      setIsFetching(false);
    }
  }, []);

  // Fetch existing availability
  const fetchAvailability = useCallback(async () => {
    if (!instructorId) return;

    setIsFetching(true);
    setToast({ message: '', type: '' });

    try {
      const res = await fetch(`${API}/api/instructor-availability/${instructorId}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch availability");
      }

      const data = await res.json();
      console.log("Fetched availability:", data);

      const newAvailability = { ...availability };
      
      data.forEach((item) => {
        if (newAvailability[item.day]) {
          newAvailability[item.day] = {
            start: item.start_time,
            end: item.end_time,
            message: "",
            isSaved: true,
            hasError: false
          };
        }
      });

      setAvailability(newAvailability);
      // Save to localStorage for persistence
      localStorage.setItem(`availability_${instructorId}`, JSON.stringify(newAvailability));
      showToast("Availability loaded successfully!", "success");
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Could not load existing availability. You can still set new times.", "warning");
    } finally {
      setIsFetching(false);
    }
  }, [instructorId]);

  useEffect(() => {
    if (instructorId) {
      // Try to load from localStorage first
      const cachedAvailability = localStorage.getItem(`availability_${instructorId}`);
      if (cachedAvailability) {
        try {
          const parsedAvailability = JSON.parse(cachedAvailability);
          setAvailability(parsedAvailability);
          setIsFetching(false);
          showToast("Availability loaded from cache", "info");
        } catch (err) {
          console.error("Error parsing cached availability:", err);
          fetchAvailability();
        }
      } else {
        fetchAvailability();
      }
    }
  }, [instructorId, fetchAvailability]);

  // Handle input changes
  const handleChange = useCallback((day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { 
        ...prev[day], 
        [field]: value,
        message: "",
        hasError: false,
        isSaved: false
      },
    }));
  }, []);

  // Validate time range
  const validateTime = useCallback((start, end) => {
    if (!start || !end) {
      return { valid: false, error: "Please set both start and end time" };
    }

    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);

    if (endTime <= startTime) {
      return { valid: false, error: "End time must be after start time" };
    }

    return { valid: true };
  }, []);

  // Save single day
  const handleSave = useCallback(async (day) => {
    const { start, end } = availability[day];

    if (!instructorId) {
      setAvailability((prev) => ({
        ...prev,
        [day]: { 
          ...prev[day], 
          message: "Instructor not logged in",
          hasError: true
        },
      }));
      return;
    }

    if (!start && !end) {
      setAvailability((prev) => ({
        ...prev,
        [day]: { 
          ...prev[day], 
          message: "No availability set for this day",
          hasError: false
        },
      }));
      return;
    }

    const validation = validateTime(start, end);
    if (!validation.valid) {
      setAvailability((prev) => ({
        ...prev,
        [day]: { 
          ...prev[day], 
          message: validation.error,
          hasError: true
        },
      }));
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API}/api/instructor-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instructorId,
          day,
          start_time: start,
          end_time: end,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save availability");

      const updatedAvailability = {
        ...availability,
        [day]: { 
          ...availability[day], 
          message: "Saved successfully!",
          isSaved: true,
          hasError: false
        }
      };
      
      setAvailability(updatedAvailability);
      // Save to localStorage
      localStorage.setItem(`availability_${instructorId}`, JSON.stringify(updatedAvailability));
    } catch (err) {
      setAvailability((prev) => ({
        ...prev,
        [day]: { 
          ...prev[day], 
          message: err.message,
          hasError: true
        },
      }));
    } finally {
      setIsLoading(false);
    }
  }, [availability, instructorId, validateTime]);

  // Clear single day
  const handleClear = useCallback((day) => {
    const updatedAvailability = {
      ...availability,
      [day]: { 
        start: "", 
        end: "", 
        message: "Cleared", 
        isSaved: false,
        hasError: false
      }
    };
    setAvailability(updatedAvailability);
    // Update localStorage
    if (instructorId) {
      localStorage.setItem(`availability_${instructorId}`, JSON.stringify(updatedAvailability));
    }
  }, [availability, instructorId]);

  // Save all days (batch)
  const handleSaveAll = useCallback(async () => {
    if (!instructorId) {
      showToast("Instructor not logged in", "danger");
      return;
    }

    const daysToSave = daysOfWeek.filter(day => {
      const { start, end } = availability[day];
      return start && end;
    });

    if (daysToSave.length === 0) {
      showToast("No availability to save. Please set times for at least one day.", "warning");
      return;
    }

    const invalidDays = daysToSave.filter(day => {
      const { start, end } = availability[day];
      const validation = validateTime(start, end);
      return !validation.valid;
    });

    if (invalidDays.length > 0) {
      showToast(`Invalid time ranges on: ${invalidDays.join(", ")}`, "danger");
      return;
    }

    setShowConfirmModal(true);
  }, [availability, instructorId, validateTime]);

  // Confirm and execute save all
  const confirmSaveAll = useCallback(async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setToast({ message: '', type: '' });

    const daysToSave = daysOfWeek.filter(day => {
      const { start, end } = availability[day];
      return start && end;
    });

    let successCount = 0;
    let errorCount = 0;
    const updatedAvailability = { ...availability };

    for (const day of daysToSave) {
      const { start, end } = availability[day];

      try {
        const res = await fetch(`${API}/api/instructor-availability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instructorId,
            day,
            start_time: start,
            end_time: end,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        successCount++;
        updatedAvailability[day] = {
          ...updatedAvailability[day], 
          isSaved: true,
          hasError: false,
          message: ""
        };
      } catch (err) {
        errorCount++;
        updatedAvailability[day] = {
          ...updatedAvailability[day], 
          message: err.message,
          hasError: true
        };
      }
    }

    setAvailability(updatedAvailability);
    // Save to localStorage
    localStorage.setItem(`availability_${instructorId}`, JSON.stringify(updatedAvailability));

    setIsLoading(false);
    showToast(
      `Saved ${successCount} day(s)${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
      errorCount === 0 ? "success" : "warning"
    );
  }, [availability, instructorId]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  if (isFetching) {
    return (
      <div className="availability-container">
        <div className="loading-state">
          <div className="spinner-large" />
          <p>Loading your availability...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="availability-container">
        {/* Toast Notification */}
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ message: '', type: '' })} 
        />

        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-title-group">
              <div className="header-icon">
                <Calendar size={32} />
              </div>
              <div>
                <h1 className="page-title">Set Your Weekly Availability</h1>
                <p className="page-subtitle">
                  Define your available teaching hours for each day of the week
                </p>
              </div>
            </div>

            <div className="header-actions">
              <button
                onClick={fetchAvailability}
                disabled={isLoading || !instructorId}
                className="action-btn btn-refresh"
              >
                <RefreshCw size={16} className={isLoading ? "spinning" : ""} />
                Refresh
              </button>
              <button
                onClick={handleSaveAll}
                disabled={isLoading || !instructorId}
                className="action-btn btn-primary"
              >
                <Save size={16} />
                Save All
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <AvailabilitySummary availability={availability} />
        </div>

        {/* Weekly Schedule View */}
        <WeeklyScheduleView availability={availability} />

        {/* Availability List */}
        <div className="content-section">
          <div className="section-title">
            <h2>Edit Availability</h2>
            <p>Set or modify your available hours for each day</p>
          </div>
          <div className="availability-list">
            {daysOfWeek.map((day) => (
              <AvailabilityRow
                key={day}
                day={day}
                data={availability[day]}
                onChange={handleChange}
                onSave={handleSave}
                onClear={handleClear}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Save All</h5>
              <button onClick={() => setShowConfirmModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              Are you sure you want to save all availability? This will overwrite any existing saved times.
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowConfirmModal(false)} className="action-btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmSaveAll} className="action-btn btn-primary">
                Save All
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .availability-container {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== LOADING STATE ===== */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 16px;
        }

        .loading-state p {
          color: ${COLORS.secondary};
          margin: 0;
          font-size: 1rem;
        }

        .spinner-large {
          width: 40px;
          height: 40px;
          border: 4px solid ${COLORS.lightest};
          border-top: 4px solid ${COLORS.accent};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1s linear infinite;
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

        .toast-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          margin-left: auto;
          opacity: 0.7;
          transition: opacity 0.3s;
          color: inherit;
        }

        .toast-close:hover {
          opacity: 1;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
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

        .btn-primary {
          background: ${COLORS.accent};
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: ${COLORS.light};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
          transform: translateY(-2px);
        }

        .btn-refresh {
          background: ${COLORS.primary};
          color: white;
        }

        .btn-refresh:hover:not(:disabled) {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        .btn-save {
          background: ${COLORS.accent};
          color: white;
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
        }

        .btn-save:hover:not(:disabled) {
          background: ${COLORS.light};
        }

        .btn-clear {
          background: transparent;
          color: #dc3545;
          border: 1px solid #dc3545;
          padding: 0.6rem 0.75rem;
        }

        .btn-clear:hover:not(:disabled) {
          background: #dc3545;
          color: white;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          transition: transform 0.2s ease, box-shadow 0.2s ease;
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

        /* ===== WEEKLY SCHEDULE VIEW ===== */
        .schedule-view {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .schedule-view.empty-schedule {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          text-align: center;
          color: ${COLORS.secondary};
        }

        .empty-schedule-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.lightest};
          border-radius: 50%;
          margin-bottom: 1.5rem;
          color: ${COLORS.accent};
        }

        .empty-schedule h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
          margin: 0 0 0.75rem 0;
        }

        .empty-schedule p {
          font-size: 1rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        .schedule-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid ${COLORS.lightest};
        }

        .schedule-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .schedule-header p {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .schedule-day-card {
          padding: 1.25rem;
          border-radius: 12px;
          border: 2px solid;
          transition: all 0.3s ease;
        }

        .schedule-day-card.has-availability {
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, white 100%);
          border-color: ${COLORS.accent};
        }

        .schedule-day-card.has-availability:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0, 119, 182, 0.15);
          border-color: ${COLORS.light};
        }

        .schedule-day-card.no-availability {
          background: #f8f9fa;
          border-color: #e9ecef;
          opacity: 0.6;
        }

        .schedule-day-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin-bottom: 0.75rem;
          letter-spacing: -0.3px;
        }

        .schedule-time-slot {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: ${COLORS.accent};
        }

        .schedule-time-range {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .schedule-time-range span {
          display: block;
        }

        .time-separator {
          font-size: 0.8rem;
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .schedule-no-time {
          font-size: 0.9rem;
          color: #6c757d;
          font-style: italic;
        }

        /* ===== CONTENT SECTION ===== */
        .content-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.08);
          padding: 2rem;
          margin-top: 2rem;
        }

        .section-title {
          margin-bottom: 1.5rem;
        }

        .section-title h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .section-title p {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
          margin: 0;
        }

        .availability-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ===== AVAILABILITY ROW ===== */
        .availability-row {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .availability-row:hover {
          border-color: ${COLORS.accent};
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
        }

        .row-content {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 1.5rem;
          align-items: center;
        }

        .day-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
        }

        .status-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 8px;
          border-radius: 8px;
          gap: 4px;
        }

        .status-success {
          background: #d4edda;
          color: #155724;
        }

        .status-danger {
          background: #f8d7da;
          color: #721c24;
        }

        .status-warning {
          background: #fff3cd;
          color: #856404;
        }

        .status-secondary {
          background: #e9ecef;
          color: #6c757d;
        }

        .duration-badge {
          background: ${COLORS.lightest};
          color: ${COLORS.accent};
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
        }

        .time-inputs {
          flex: 1;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group-full {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .input-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: ${COLORS.secondary};
          margin: 0;
        }

        .time-select {
          padding: 0.75rem 1rem;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          background: #f8f9fa;
          font-size: 0.9rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          width: 100%;
        }

        .time-select:focus {
          outline: none;
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 2px ${COLORS.lightest};
        }

        .time-select.valid {
          border-color: #28a745;
          background: #e8f5e9;
        }

        .time-select.invalid {
          border-color: #dc3545;
          background: #f8d7da;
        }

        .time-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        /* ===== ROW MESSAGES ===== */
        .row-message {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
        }

        .message-success {
          background: #d4edda;
          color: #155724;
        }

        .message-danger {
          background: #f8d7da;
          color: #721c24;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: ${COLORS.primary};
          color: white;
          font-weight: 600;
        }

        .modal-close {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: white;
          cursor: pointer;
        }

        .modal-body {
          padding: 1.25rem;
          color: ${COLORS.secondary};
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid #dee2e6;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 992px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .row-content {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.5rem;
          }

          .stats-value {
            font-size: 1.5rem;
          }

          .header-icon {
            width: 50px;
            height: 50px;
          }

          .schedule-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }

        @media (max-width: 576px) {
          .availability-container {
            padding: 1rem;
          }

          .content-section {
            padding: 1.25rem;
          }

          .time-select {
            font-size: 0.85rem;
          }

          .action-btn {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }

          .schedule-view {
            padding: 1.5rem;
          }

          .schedule-grid {
            grid-template-columns: 1fr;
          }
        }
        
      `}</style>
    </>
  );
}

export default InstructorAvailability;