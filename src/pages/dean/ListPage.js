// FUNCTIONAL
 // src/pages/ListPage.js
// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Form, Button, Spinner, Table, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export default function ListPage() {
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState("");
//   const [yearLevel, setYearLevel] = useState("");
//   const [semester, setSemester] = useState("");

//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   // ✅ Fetch courses
//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchCourses", err);
//       setCourses([]);
//     }
//   }

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // ✅ Fetch schedules based on selection
//   async function fetchSchedules() {
//     if (!courseId || !yearLevel || !semester) {
//       setMessage({ type: "danger", text: "Please select course, year level, and semester." });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const q = new URLSearchParams({
//         courseId,
//         yearLevel,
//         semester,
//       }).toString();

//       const res = await fetch(`${API}/api/scheduler?${q}`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");

//       const data = await res.json();
//       setSchedules(Array.isArray(data) ? data : []);
//       if (data.length === 0) {
//         setMessage({ type: "warning", text: "No schedules found for this selection." });
//       }
//     } catch (err) {
//       console.error("fetchSchedules", err);
//       setMessage({ type: "danger", text: "Error fetching schedules: " + err.message });
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ✅ Slot to Time helper
//   function slotToTime(slotIndex) {
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;
//     return `${pad(start)}:00 - ${pad(end)}:00`;
//   }
//   function pad(n) {
//     return String(n).padStart(2, "0");
//   }

//   // ✅ Grouped Render (like renderScheduleResult)
//   function renderSchedules() {
//     if (!Array.isArray(schedules) || schedules.length === 0) return null;

//     // Group by section_id
//     const grouped = {};
//     for (const s of schedules) {
//       grouped[s.section_id] = grouped[s.section_id] || [];
//       grouped[s.section_id].push(s);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return Object.keys(grouped).map((secId, idx) => (
//       <Card className="my-4 shadow-sm" key={secId}>
//         <Card.Header className="bg-primary text-white">
//           <h6 className="mb-0">
//             Section {grouped[secId][0]?.section_name || String.fromCharCode(65 + idx)}
//           </h6>
//         </Card.Header>
//         <Card.Body>
//           <Table bordered responsive className="align-middle text-center">
//             <thead>
//               <tr>
//                 <th>Room</th>
//                 <th>Subject</th>
//                 <th>Instructor</th>
//                 {days.map((d) => (
//                   <th key={d}>{d}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {grouped[secId].map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.room_name || r.room_id || "TBD"}</td>
//                   <td>{r.subject_code || r.subject_id}</td>
//                   <td>{r.instructor_name || "TBD"}</td>
//                   {days.map((day) => (
//                     <td key={day}>{r.day === day ? slotToTime(r.slot_index) : ""}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   }

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         <Row className="mb-3">
//           <Col><h5>View Generated Schedule</h5></Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         {/* Filters */}
//         <Row className="g-2 mb-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={e => setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map(c => (
//                   <option key={c.id} value={c.id}>
//                     {c.code} — {c.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={e => setYearLevel(e.target.value)}>
//                 <option value="">Select year</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={e => setSemester(e.target.value)}>
//                 <option value="">Select semester</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2} className="d-flex align-items-end">
//             <Button variant="primary" onClick={fetchSchedules} disabled={loading}>
//               {loading ? <Spinner size="sm" animation="border" /> : "View Schedule"}
//             </Button>
//           </Col>
//         </Row>

//         {/* Render grouped schedule */}
//         {renderSchedules()}
//       </Card.Body>
//     </Card>
//   );
// }

//Functional

// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Form, Button, Spinner, Table, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export default function ListPage() {
//   // ========= View Generated Schedule =========
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState("");
//   const [yearLevel, setYearLevel] = useState("");
//   const [semester, setSemester] = useState("");
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   // ========= View Instructor Schedule =========
//   const [instructors, setInstructors] = useState([]);
//   const [instructorSchedules, setInstructorSchedules] = useState({});
//   const [loadingInstructor, setLoadingInstructor] = useState(false);
//   const [messageInstructor, setMessageInstructor] = useState(null);

//   // ✅ Fetch all courses
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchCourses", err);
//       setCourses([]);
//     }
//   }

//   // ✅ Fetch schedules for course-year-sem
//   async function fetchSchedules() {
//     if (!courseId || !yearLevel || !semester) {
//       setMessage({ type: "danger", text: "Please select course, year level, and semester." });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//       const res = await fetch(`${API}/api/scheduler?${q}`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");

//       const data = await res.json();
//       setSchedules(Array.isArray(data) ? data : []);
//       if (data.length === 0) {
//         setMessage({ type: "warning", text: "No schedules found for this selection." });
//       }
//     } catch (err) {
//       console.error("fetchSchedules", err);
//       setMessage({ type: "danger", text: "Error fetching schedules: " + err.message });
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ✅ Fetch instructors & their schedules
//   async function fetchInstructorSchedulesByCourse() {
//     if (!courseId || !yearLevel || !semester) {
//       setMessageInstructor({
//         type: "danger",
//         text: "Please select course, year level, and semester.",
//       });
//       return;
//     }

//     setLoadingInstructor(true);
//     setMessageInstructor(null);

//     try {
//       const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//       if (!res.ok) throw new Error("Failed to fetch instructors for course");
//       const instructorsData = await res.json();
//       setInstructors(instructorsData);

//       const allSchedules = {};
//       for (const inst of instructorsData) {
//         const q = new URLSearchParams({
//           instructorId: inst.id,
//           yearLevel,
//           semester,
//         }).toString();
//        const schedRes = await fetch(`${API}/api/instructors/${inst.id}/schedules`);

//         const schedData = await schedRes.json();
//         allSchedules[inst.id] = Array.isArray(schedData) ? schedData : [];
//       }
//       setInstructorSchedules(allSchedules);
//     } catch (err) {
//       console.error("fetchInstructorSchedulesByCourse", err);
//       setMessageInstructor({
//         type: "danger",
//         text: "Error fetching instructor schedules: " + err.message,
//       });
//     } finally {
//       setLoadingInstructor(false);
//     }
//   }

//   // ✅ Helper: convert slot to readable time
//   function slotToTime(slotIndex) {
//     const startHour = 8 + slotIndex;
//     const endHour = startHour + 1;
//     return `${formatHour(startHour)} - ${formatHour(endHour)}`;
//   }

//   function formatHour(hour) {
//     const suffix = hour >= 12 ? "PM" : "AM";
//     const formatted = ((hour + 11) % 12) + 1;
//     return `${formatted}:00 ${suffix}`;
//   }

//   // ✅ Render generated schedule
//   function renderSchedules() {
//     if (!schedules.length) return null;

//     const grouped = {};
//     for (const s of schedules) {
//       grouped[s.section_id] = grouped[s.section_id] || [];
//       grouped[s.section_id].push(s);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return Object.keys(grouped).map((secId, idx) => (
//       <Card className="my-4 shadow-sm" key={secId}>
//         <Card.Header className="bg-primary text-white">
//           <h6 className="mb-0">
//             Section {grouped[secId][0]?.section_name || String.fromCharCode(65 + idx)}
//           </h6>
//         </Card.Header>
//         <Card.Body>
//           <Table bordered responsive className="align-middle text-center">
//             <thead>
//               <tr>
//                 <th>Room</th>
//                 <th>Subject</th>
//                 <th>Instructor</th>
//                 {days.map((d) => (
//                   <th key={d}>{d}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {grouped[secId].map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.room_name || r.room_id}</td>
//                   <td>{r.subject_code || r.subject_name}</td>
//                   <td>{r.instructor_name || "TBD"}</td>
//                   {days.map((day) => (
//                     <td key={day}>
//                       {r.day === day ? (
//                         <span
//                           style={{
//                             backgroundColor: "#00c85133",
//                             borderRadius: "5px",
//                             padding: "3px 8px",
//                             fontWeight: "600",
//                             color: "green",
//                           }}
//                         >
//                           {slotToTime(r.slot_index)}
//                         </span>
//                       ) : (
//                         ""
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   }

//   // ✅ Render instructor schedules
//   function renderInstructorSchedule() {
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     if (!instructors.length) return null;

//     return instructors.map((inst) => (
//       <Card className="my-4 shadow-sm" key={inst.id}>
//         <Card.Header className="bg-success text-white">
//           <h6 className="mb-0">Instructor: {inst.instructor_name}</h6>
//         </Card.Header>
//         <Card.Body>
//           <Table bordered responsive className="align-middle text-center">
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Section</th>
//                 <th>Year Level</th>
//                 <th>Subject</th>
//                 <th>Room</th>
//                 {days.map((d) => (
//                   <th key={d}>{d}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {instructorSchedules[inst.id]?.map((s, i) => (
//                 <tr key={i}>
//                   <td>{s.course_name || "—"}</td>
//                   <td>{s.section_name || "—"}</td>
//                   <td>{s.year_level || "—"}</td>
//                   <td>{s.subject_code || s.subject_name}</td>
//                   <td>{s.room_name || "—"}</td>
//                   {days.map((day) => (
//                     <td key={day}>
//                       {s.day === day ? (
//                         <span
//                           style={{
//                             backgroundColor: "#00c85133",
//                             borderRadius: "5px",
//                             padding: "3px 8px",
//                             fontWeight: "600",
//                             color: "green",
//                           }}
//                         >
//                           {slotToTime(s.slot_index)}
//                         </span>
//                       ) : (
//                         ""
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   }

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         {/* ========= View Generated Schedule ========= */}
//         <Row className="mb-3">
//           <Col>
//             <h5>View Generated Schedule</h5>
//           </Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="g-2 mb-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.code} — {c.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)}>
//                 <option value="">Select year</option>
//                 {[1, 2, 3, 4].map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)}>
//                 <option value="">Select semester</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2} className="d-flex align-items-end">
//             <Button variant="primary" onClick={fetchSchedules} disabled={loading}>
//               {loading ? <Spinner size="sm" animation="border" /> : "View Schedule"}
//             </Button>
//           </Col>
//         </Row>

//         {renderSchedules()}

//         {/* ========= View Instructor Schedule ========= */}
//         <hr className="my-4" />
//         <Row className="mb-3">
//           <Col>
//             <h5>View Instructor Schedule (By Course)</h5>
//           </Col>
//         </Row>

//         {messageInstructor && (
//           <Alert variant={messageInstructor.type}>{messageInstructor.text}</Alert>
//         )}

//         <Row className="g-2 mb-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.code} — {c.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)}>
//                 <option value="">Select year</option>
//                 {[1, 2, 3, 4].map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)}>
//                 <option value="">Select semester</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2} className="d-flex align-items-end">
//             <Button
//               variant="success"
//               onClick={fetchInstructorSchedulesByCourse}
//               disabled={loadingInstructor}
//             >
//               {loadingInstructor ? (
//                 <Spinner size="sm" animation="border" />
//               ) : (
//                 "View Instructor Schedules"
//               )}
//             </Button>
//           </Col>
//         </Row>

//         {renderInstructorSchedule()}
//       </Card.Body>
//     </Card>
//   );
// }

//FUNCTIONAL WITHout SCHEDULE MANAGEMENT BACKGROUD
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { 
//   Search, RefreshCw, Download, Calendar, Users, BookOpen, 
//   Clock, ChevronDown, ChevronUp, Filter, FileText, X 
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
// const slotToTime = (slotIndex) => {
//   const startHour = 8 + slotIndex;
//   const endHour = startHour + 1;
//   return `${formatHour(startHour)} - ${formatHour(endHour)}`;
// };

// const formatHour = (hour) => {
//   const suffix = hour >= 12 ? "PM" : "AM";
//   const formatted = ((hour + 11) % 12) + 1;
//   return `${formatted}:00 ${suffix}`;
// };

// // ==================== LOADING SKELETON ====================
// const TableSkeleton = React.memo(() => (
//   <div className="skeleton-table">
//     {[1, 2, 3, 4].map((i) => (
//       <div key={i} className="skeleton-row">
//         <div className="skeleton-cell"></div>
//         <div className="skeleton-cell"></div>
//         <div className="skeleton-cell"></div>
//         <div className="skeleton-cell"></div>
//       </div>
//     ))}
//   </div>
// ));

// // ==================== NOTIFICATION BANNER ====================
// const NotificationBanner = React.memo(({ message, onClose }) => {
//   if (!message) return null;

//   const variantStyles = {
//     success: { bg: "#d4edda", border: "#c3e6cb", text: "#155724" },
//     warning: { bg: "#fff3cd", border: "#ffeaa7", text: "#856404" },
//     danger: { bg: "#f8d7da", border: "#f5c6cb", text: "#721c24" },
//   };

//   const style = variantStyles[message.type] || variantStyles.danger;

//   return (
//     <div 
//       className="notification-banner"
//       style={{
//         background: style.bg,
//         borderColor: style.border,
//         color: style.text,
//       }}
//     >
//       <span>{message.text}</span>
//       <button className="notification-close" onClick={onClose}>
//         <X size={18} />
//       </button>
//     </div>
//   );
// });

// // ==================== SCHEDULE FILTERS ====================
// const ScheduleFilters = React.memo(({ 
//   courses, 
//   filters, 
//   onChange, 
//   onSubmit, 
//   loading,
//   buttonLabel = "View Schedule",
//   buttonVariant = "primary"
// }) => {
//   return (
//     <div className="filters-container">
//       <div className="filter-grid">
//         <div className="filter-group">
//           <label className="filter-label">
//             <BookOpen size={16} />
//             Course
//           </label>
//           <select
//             className="filter-select"
//             value={filters.courseId}
//             onChange={(e) => onChange({ ...filters, courseId: e.target.value })}
//           >
//             <option value="">Select Course</option>
//             {courses.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.code} — {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="filter-group">
//           <label className="filter-label">
//             <Users size={16} />
//             Year Level
//           </label>
//           <select
//             className="filter-select"
//             value={filters.yearLevel}
//             onChange={(e) => onChange({ ...filters, yearLevel: e.target.value })}
//           >
//             <option value="">Select Year</option>
//             {[1, 2, 3, 4].map((n) => (
//               <option key={n} value={n}>Year {n}</option>
//             ))}
//           </select>
//         </div>

//         <div className="filter-group">
//           <label className="filter-label">
//             <Calendar size={16} />
//             Semester
//           </label>
//           <select
//             className="filter-select"
//             value={filters.semester}
//             onChange={(e) => onChange({ ...filters, semester: e.target.value })}
//           >
//             <option value="">Select Semester</option>
//             <option value="1">1st Semester</option>
//             <option value="2">2nd Semester</option>
//             <option value="Summer">Summer</option>
//           </select>
//         </div>

//         <div className="filter-group">
//           <button
//             className={`submit-button ${buttonVariant}`}
//             onClick={onSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <RefreshCw size={16} className="spinning" />
//                 Loading...
//               </>
//             ) : (
//               <>
//                 <Filter size={16} />
//                 {buttonLabel}
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== SECTION STATS ====================
// const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
//   <div className="stat-card" style={{ borderTopColor: color }}>
//     <div className="stat-icon" style={{ color }}>
//       <Icon size={24} />
//     </div>
//     <div className="stat-content">
//       <div className="stat-value">{value}</div>
//       <div className="stat-label">{label}</div>
//     </div>
//   </div>
// ));

// // ==================== GENERATED SCHEDULE TABLE ====================
// const GeneratedScheduleTable = React.memo(({ schedules, onExport }) => {
//   const [expandedSections, setExpandedSections] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

//   // Group schedules by section
//   const groupedSchedules = useMemo(() => {
//     const grouped = {};
//     schedules.forEach((s) => {
//       const key = s.section_id;
//       if (!grouped[key]) grouped[key] = [];
//       grouped[key].push(s);
//     });
//     return grouped;
//   }, [schedules]);

//   // Filter by search term
//   const filteredSections = useMemo(() => {
//     if (!searchTerm.trim()) return groupedSchedules;
    
//     const term = searchTerm.toLowerCase();
//     return Object.entries(groupedSchedules).reduce((acc, [key, items]) => {
//       const matchesSection = items.some(
//         (s) =>
//           s.section_name?.toLowerCase().includes(term) ||
//           s.subject_code?.toLowerCase().includes(term) ||
//           s.instructor_name?.toLowerCase().includes(term) ||
//           s.room_name?.toLowerCase().includes(term)
//       );
//       if (matchesSection) acc[key] = items;
//       return acc;
//     }, {});
//   }, [groupedSchedules, searchTerm]);

//   const toggleSection = useCallback((sectionId) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   }, []);

//   if (schedules.length === 0) {
//     return (
//       <div className="empty-state">
//         <Calendar size={48} className="empty-icon" />
//         <h3 className="empty-title">No Schedules Found</h3>
//         <p className="empty-text">
//           Select a course, year level, and semester to view the generated schedule
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="schedule-section">
//       <div className="section-header">
//         <div className="section-title-group">
//           <h2 className="section-title">Generated Class Schedules</h2>
//           <span className="section-count">{Object.keys(filteredSections).length} Sections</span>
//         </div>
        
//         <div className="section-actions">
//           <div className="search-box">
//             <Search size={16} className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search sections, subjects, instructors..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>
//           <button className="export-button" onClick={() => onExport('schedule')}>
//             <Download size={16} />
//             Export
//           </button>
//         </div>
//       </div>

//       <div className="schedules-container">
//         {Object.entries(filteredSections).map(([sectionId, sectionSchedules], idx) => {
//           const isExpanded = expandedSections[sectionId] !== false;
//           const sectionName = sectionSchedules[0]?.section_name || `Section ${String.fromCharCode(65 + idx)}`;

//           return (
//             <div key={sectionId} className="schedule-card fade-in">
//               <div 
//                 className="schedule-card-header"
//                 onClick={() => toggleSection(sectionId)}
//               >
//                 <div className="schedule-card-title">
//                   <div className="section-badge">{sectionName}</div>
//                   <span className="schedule-count">
//                     {sectionSchedules.length} Classes
//                   </span>
//                 </div>
//                 <button className="expand-button">
//                   {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//               </div>

//               {isExpanded && (
//                 <div className="schedule-card-body">
//                   <div className="table-responsive">
//                     <table className="schedule-table">
//                       <thead>
//                         <tr>
//                           <th>Room</th>
//                           <th>Subject</th>
//                           <th>Instructor</th>
//                           {DAYS_ORDER.map((day) => (
//                             <th key={day} className="day-column">{day}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {sectionSchedules.map((schedule, i) => (
//                           <tr key={i} className="schedule-row">
//                             <td>
//                               <div className="cell-content">
//                                 <div className="cell-icon">📍</div>
//                                 {schedule.room_name || schedule.room_id}
//                               </div>
//                             </td>
//                             <td>
//                               <div className="cell-content">
//                                 <div className="subject-code">
//                                   {schedule.subject_code || schedule.subject_name}
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="cell-content">
//                                 <Users size={14} className="cell-icon" />
//                                 {schedule.instructor_name || "TBD"}
//                               </div>
//                             </td>
//                             {DAYS_ORDER.map((day) => (
//                               <td key={day} className="time-cell">
//                                 {schedule.day === day && (
//                                   <div className="time-badge">
//                                     <Clock size={12} />
//                                     {slotToTime(schedule.slot_index)}
//                                   </div>
//                                 )}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

// // ==================== INSTRUCTOR SCHEDULE TABLE ====================
// const InstructorScheduleTable = React.memo(({ instructors, schedules, onExport }) => {
//   const [expandedInstructors, setExpandedInstructors] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleInstructor = useCallback((instructorId) => {
//     setExpandedInstructors((prev) => ({
//       ...prev,
//       [instructorId]: !prev[instructorId],
//     }));
//   }, []);

//   // Filter instructors by search term
//   const filteredInstructors = useMemo(() => {
//     if (!searchTerm.trim()) return instructors;
    
//     const term = searchTerm.toLowerCase();
//     return instructors.filter((inst) =>
//       inst.instructor_name?.toLowerCase().includes(term)
//     );
//   }, [instructors, searchTerm]);

//   if (instructors.length === 0) {
//     return (
//       <div className="empty-state">
//         <Users size={48} className="empty-icon" />
//         <h3 className="empty-title">No Instructor Schedules</h3>
//         <p className="empty-text">
//           Select filters above to view instructor teaching schedules
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="schedule-section">
//       <div className="section-header">
//         <div className="section-title-group">
//           <h2 className="section-title">Instructor Teaching Schedules</h2>
//           <span className="section-count">{filteredInstructors.length} Instructors</span>
//         </div>
        
//         <div className="section-actions">
//           <div className="search-box">
//             <Search size={16} className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search instructors..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>
//           <button className="export-button" onClick={() => onExport('instructor')}>
//             <Download size={16} />
//             Export
//           </button>
//         </div>
//       </div>

//       <div className="schedules-container">
//         {filteredInstructors.map((instructor) => {
//           const isExpanded = expandedInstructors[instructor.id] !== false;
//           const instructorSchedules = schedules[instructor.id] || [];

//           return (
//             <div key={instructor.id} className="schedule-card instructor-card fade-in">
//               <div 
//                 className="schedule-card-header instructor-header"
//                 onClick={() => toggleInstructor(instructor.id)}
//               >
//                 <div className="schedule-card-title">
//                   <div className="instructor-info">
//                     <Users size={18} />
//                     <span className="instructor-name">{instructor.instructor_name}</span>
//                   </div>
//                   <span className="schedule-count">
//                     {instructorSchedules.length} Classes
//                   </span>
//                 </div>
//                 <button className="expand-button">
//                   {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//               </div>

//               {isExpanded && (
//                 <div className="schedule-card-body">
//                   <div className="table-responsive">
//                     <table className="schedule-table">
//                       <thead>
//                         <tr>
//                           <th>Course</th>
//                           <th>Section</th>
//                           <th>Year</th>
//                           <th>Subject</th>
//                           <th>Room</th>
//                           {DAYS_ORDER.map((day) => (
//                             <th key={day} className="day-column">{day}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {instructorSchedules.length > 0 ? (
//                           instructorSchedules.map((schedule, i) => (
//                             <tr key={i} className="schedule-row">
//                               <td>{schedule.course_name || "—"}</td>
//                               <td>
//                                 <div className="section-badge small">
//                                   {schedule.section_name || "—"}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="year-badge">
//                                   Year {schedule.year_level || "—"}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="subject-code">
//                                   {schedule.subject_code || schedule.subject_name}
//                                 </div>
//                               </td>
//                               <td>{schedule.room_name || "—"}</td>
//                               {DAYS_ORDER.map((day) => (
//                                 <td key={day} className="time-cell">
//                                   {schedule.day === day && (
//                                     <div className="time-badge">
//                                       <Clock size={12} />
//                                       {slotToTime(schedule.slot_index)}
//                                     </div>
//                                   )}
//                                 </td>
//                               ))}
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan={5 + DAYS_ORDER.length} className="no-data">
//                               No schedules assigned
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function ListPage() {
//   // State management
//   const [courses, setCourses] = useState([]);
//   const [scheduleFilters, setScheduleFilters] = useState({
//     courseId: "",
//     yearLevel: "",
//     semester: "",
//   });
//   const [instructorFilters, setInstructorFilters] = useState({
//     courseId: "",
//     yearLevel: "",
//     semester: "",
//   });
  
//   const [schedules, setSchedules] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [instructorSchedules, setInstructorSchedules] = useState({});
  
//   const [loadingSchedules, setLoadingSchedules] = useState(false);
//   const [loadingInstructors, setLoadingInstructors] = useState(false);
  
//   const [scheduleMessage, setScheduleMessage] = useState(null);
//   const [instructorMessage, setInstructorMessage] = useState(null);

//   // Fetch courses on mount
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("fetchCourses", err);
//       setCourses([]);
//     }
//   };

//   // Fetch generated schedules
//   const fetchSchedules = useCallback(async () => {
//     const { courseId, yearLevel, semester } = scheduleFilters;
    
//     if (!courseId || !yearLevel || !semester) {
//       setScheduleMessage({
//         type: "warning",
//         text: "Please select course, year level, and semester to view schedules.",
//       });
//       return;
//     }

//     setLoadingSchedules(true);
//     setScheduleMessage(null);

//     try {
//       const params = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//       const res = await fetch(`${API}/api/scheduler?${params}`);
      
//       if (!res.ok) throw new Error("Failed to fetch schedules");

//       const data = await res.json();
//       const scheduleArray = Array.isArray(data) ? data : [];
      
//       setSchedules(scheduleArray);
      
//       if (scheduleArray.length === 0) {
//         setScheduleMessage({
//           type: "warning",
//           text: "No schedules found for the selected criteria.",
//         });
//       } else {
//         setScheduleMessage({
//           type: "success",
//           text: `Successfully loaded ${scheduleArray.length} schedule entries.`,
//         });
//       }
//     } catch (err) {
//       console.error("fetchSchedules", err);
//       setScheduleMessage({
//         type: "danger",
//         text: `Error fetching schedules: ${err.message}`,
//       });
//       setSchedules([]);
//     } finally {
//       setLoadingSchedules(false);
//     }
//   }, [scheduleFilters]);

//   // Fetch instructor schedules
//   const fetchInstructorSchedules = useCallback(async () => {
//     const { courseId, yearLevel, semester } = instructorFilters;
    
//     if (!courseId || !yearLevel || !semester) {
//       setInstructorMessage({
//         type: "warning",
//         text: "Please select course, year level, and semester to view instructor schedules.",
//       });
//       return;
//     }

//     setLoadingInstructors(true);
//     setInstructorMessage(null);

//     try {
//       const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
      
//       const instructorsData = await res.json();
//       setInstructors(instructorsData);

//       const allSchedules = {};
//       for (const inst of instructorsData) {
//         const schedRes = await fetch(`${API}/api/instructors/${inst.id}/schedules`);
//         const schedData = await schedRes.json();
//         allSchedules[inst.id] = Array.isArray(schedData) ? schedData : [];
//       }
      
//       setInstructorSchedules(allSchedules);
//       setInstructorMessage({
//         type: "success",
//         text: `Successfully loaded schedules for ${instructorsData.length} instructors.`,
//       });
//     } catch (err) {
//       console.error("fetchInstructorSchedules", err);
//       setInstructorMessage({
//         type: "danger",
//         text: `Error fetching instructor schedules: ${err.message}`,
//       });
//       setInstructors([]);
//       setInstructorSchedules({});
//     } finally {
//       setLoadingInstructors(false);
//     }
//   }, [instructorFilters]);

//   // Calculate statistics
//   const scheduleStats = useMemo(() => {
//     const sections = new Set(schedules.map((s) => s.section_id)).size;
//     const instructorsCount = new Set(schedules.map((s) => s.instructor_name)).size;
//     const classes = schedules.length;
//     return { sections, instructors: instructorsCount, classes };
//   }, [schedules]);

//   const instructorStats = useMemo(() => {
//     const totalClasses = Object.values(instructorSchedules)
//       .flat()
//       .length;
//     return {
//       instructors: instructors.length,
//       classes: totalClasses,
//     };
//   }, [instructors, instructorSchedules]);

//   // Export functionality (placeholder)
//   const handleExport = useCallback((type) => {
//     // In a real app, this would generate CSV/PDF
//     console.log(`Exporting ${type} schedules...`);
//     alert(`Export functionality would generate a downloadable ${type} schedule file.`);
//   }, []);

//   return (
//     <div className="list-page-container">
//       {/* Page Header */}
//       <div className="page-header">
//         <div className="page-title-section">
//           <h1 className="page-title">Schedule Management</h1>
//           <p className="page-subtitle">View and manage generated class schedules and instructor assignments</p>
//         </div>
//       </div>

//       {/* Generated Schedules Section */}
//       <div className="content-section">
//         <div className="section-header-main">
//           <div className="section-icon-wrapper" style={{ background: COLORS.primary }}>
//             <Calendar size={24} />
//           </div>
//           <div>
//             <h2 className="section-main-title">Generated Class Schedules</h2>
//             <p className="section-description">
//               View automatically generated class schedules organized by section
//             </p>
//           </div>
//         </div>

//         <ScheduleFilters
//           courses={courses}
//           filters={scheduleFilters}
//           onChange={setScheduleFilters}
//           onSubmit={fetchSchedules}
//           loading={loadingSchedules}
//           buttonLabel="View Schedules"
//           buttonVariant="primary"
//         />

//         <NotificationBanner
//           message={scheduleMessage}
//           onClose={() => setScheduleMessage(null)}
//         />

//         {schedules.length > 0 && (
//           <div className="stats-grid">
//             <StatsCard
//               icon={FileText}
//               label="Total Sections"
//               value={scheduleStats.sections}
//               color={COLORS.accent}
//             />
//             <StatsCard
//               icon={Users}
//               label="Instructors"
//               value={scheduleStats.instructors}
//               color={COLORS.light}
//             />
//             <StatsCard
//               icon={BookOpen}
//               label="Total Classes"
//               value={scheduleStats.classes}
//               color={COLORS.lighter}
//             />
//           </div>
//         )}

//         {loadingSchedules ? (
//           <TableSkeleton />
//         ) : (
//           <GeneratedScheduleTable
//             schedules={schedules}
//             onExport={handleExport}
//           />
//         )}
//       </div>

//       {/* Instructor Schedules Section */}
//       <div className="content-section">
//         <div className="section-header-main">
//           <div className="section-icon-wrapper" style={{ background: COLORS.secondary }}>
//             <Users size={24} />
//           </div>
//           <div>
//             <h2 className="section-main-title">Instructor Teaching Schedules</h2>
//             <p className="section-description">
//               View individual instructor schedules filtered by course
//             </p>
//           </div>
//         </div>

//         <ScheduleFilters
//           courses={courses}
//           filters={instructorFilters}
//           onChange={setInstructorFilters}
//           onSubmit={fetchInstructorSchedules}
//           loading={loadingInstructors}
//           buttonLabel="View Instructor Schedules"
//           buttonVariant="secondary"
//         />

//         <NotificationBanner
//           message={instructorMessage}
//           onClose={() => setInstructorMessage(null)}
//         />

//         {instructors.length > 0 && (
//           <div className="stats-grid">
//             <StatsCard
//               icon={Users}
//               label="Total Instructors"
//               value={instructorStats.instructors}
//               color={COLORS.secondary}
//             />
//             <StatsCard
//               icon={BookOpen}
//               label="Teaching Assignments"
//               value={instructorStats.classes}
//               color={COLORS.accent}
//             />
//           </div>
//         )}

//         {loadingInstructors ? (
//           <TableSkeleton />
//         ) : (
//           <InstructorScheduleTable
//             instructors={instructors}
//             schedules={instructorSchedules}
//             onExport={handleExport}
//           />
//         )}
//       </div>

//       {/* Inline Styles */}
//       <style jsx>{`
//         .list-page-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           padding: 2rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== PAGE HEADER ===== */
//         .page-header {
//           margin-bottom: 2rem;
//         }

//         .page-title-section {
//           background: white;
//           padding: 2rem;
//           border-radius: 16px;
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
//         }

//         .page-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//           letter-spacing: -0.5px;
//         }

//         .page-subtitle {
//           font-size: 1.05rem;
//           color: ${COLORS.secondary};
//           margin: 0;
//           opacity: 0.8;
//         }

//         /* ===== CONTENT SECTIONS ===== */
//         .content-section {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
//         }

//         .section-header-main {
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           margin-bottom: 2rem;
//           padding-bottom: 1.5rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .section-icon-wrapper {
//           width: 56px;
//           height: 56px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//           color: white;
//         }

//         .section-main-title {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.25rem 0;
//         }

//         .section-description {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           margin: 0;
//           opacity: 0.7;
//         }

//         /* ===== FILTERS ===== */
//         .filters-container {
//           background: ${COLORS.lightest};
//           padding: 1.5rem;
//           border-radius: 12px;
//           margin-bottom: 2rem;
//         }

//         .filter-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 1rem;
//         }

//         .filter-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .filter-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: ${COLORS.secondary};
//         }

//         .filter-select {
//           padding: 0.75rem 1rem;
//           border: 2px solid #e0e0e0;
//           border-radius: 8px;
//           font-size: 0.95rem;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .filter-select:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         .submit-button {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 8px;
//           font-size: 0.95rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 1.75rem;
//         }

//         .submit-button.primary {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .submit-button.primary:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .submit-button.secondary {
//           background: ${COLORS.secondary};
//           color: white;
//         }

//         .submit-button.secondary:hover:not(:disabled) {
//           background: ${COLORS.accent};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(2, 62, 138, 0.3);
//         }

//         .submit-button:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== NOTIFICATION BANNER ===== */
//         .notification-banner {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 1rem 1.25rem;
//           border-radius: 10px;
//           border: 2px solid;
//           margin-bottom: 1.5rem;
//           animation: slideDown 0.3s ease;
//           font-size: 0.95rem;
//         }

//         .notification-close {
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.25rem;
//           display: flex;
//           align-items: center;
//           opacity: 0.7;
//           transition: opacity 0.2s ease;
//         }

//         .notification-close:hover {
//           opacity: 1;
//         }

//         /* ===== STATS GRID ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
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

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 10px;
//           background: rgba(0, 180, 216, 0.1);
//         }

//         .stat-content {
//           flex: 1;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           line-height: 1;
//         }

//         .stat-label {
//           font-size: 0.9rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin-top: 0.25rem;
//         }

//         /* ===== SCHEDULE SECTION ===== */
//         .schedule-section {
//           margin-top: 2rem;
//         }

//         .section-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .section-title-group {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .section-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0;
//         }

//         .section-count {
//           background: ${COLORS.lighter};
//           color: ${COLORS.primary};
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .section-actions {
//           display: flex;
//           gap: 1rem;
//           align-items: center;
//         }

//         .search-box {
//           position: relative;
//           min-width: 280px;
//         }

//         .search-icon {
//           position: absolute;
//           left: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: ${COLORS.secondary};
//           opacity: 0.5;
//         }

//         .search-input {
//           width: 100%;
//           padding: 0.65rem 0.75rem 0.65rem 2.5rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 8px;
//           font-size: 0.9rem;
//           background: #f8f9fa;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           background: white;
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         .export-button {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.65rem 1.25rem;
//           background: ${COLORS.accent};
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 0.9rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }

//         .export-button:hover {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(0, 119, 182, 0.3);
//         }

//         /* ===== SCHEDULE CARDS ===== */
//         .schedules-container {
//           display: flex;
//           flex-direction: column;
//           gap: 1.25rem;
//         }

//         .schedule-card {
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .schedule-card:hover {
//           border-color: ${COLORS.lighter};
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
//         }

//         .schedule-card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.25rem 1.5rem;
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//           cursor: pointer;
//           user-select: none;
//           transition: background 0.3s ease;
//         }

//         .schedule-card-header:hover {
//           background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
//         }

//         .instructor-header {
//           background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
//         }

//         .instructor-header:hover {
//           background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
//         }

//         .schedule-card-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .section-badge {
//           font-size: 1.1rem;
//           font-weight: 700;
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.5rem 1rem;
//           border-radius: 8px;
//           backdrop-filter: blur(10px);
//         }

//         .section-badge.small {
//           font-size: 0.9rem;
//           padding: 0.35rem 0.75rem;
//           background: ${COLORS.lighter};
//           color: ${COLORS.primary};
//           font-weight: 600;
//         }

//         .instructor-info {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-size: 1.1rem;
//           font-weight: 700;
//         }

//         .instructor-name {
//           font-weight: 700;
//         }

//         .schedule-count {
//           font-size: 0.875rem;
//           opacity: 0.9;
//         }

//         .expand-button {
//           background: rgba(255, 255, 255, 0.2);
//           border: none;
//           color: white;
//           padding: 0.5rem;
//           border-radius: 6px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//         }

//         .expand-button:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .schedule-card-body {
//           padding: 1.5rem;
//           background: #fafbfc;
//         }

//         /* ===== TABLE STYLES ===== */
//         .table-responsive {
//           overflow-x: auto;
//           border-radius: 8px;
//           border: 1px solid ${COLORS.lightest};
//         }

//         .schedule-table {
//           width: 100%;
//           border-collapse: collapse;
//           background: white;
//           font-size: 0.9rem;
//         }

//         .schedule-table thead {
//           background: ${COLORS.lightest};
//         }

//         .schedule-table th {
//           padding: 1rem;
//           text-align: left;
//           font-weight: 600;
//           color: ${COLORS.secondary};
//           border-bottom: 2px solid ${COLORS.lighter};
//           white-space: nowrap;
//         }

//         .schedule-table th.day-column {
//           text-align: center;
//           min-width: 100px;
//         }

//         .schedule-table td {
//           padding: 1rem;
//           border-bottom: 1px solid ${COLORS.lightest};
//         }

//         .schedule-row {
//           transition: background 0.2s ease;
//         }

//         .schedule-row:hover {
//           background: ${COLORS.lightest};
//         }

//         .schedule-row:last-child td {
//           border-bottom: none;
//         }

//         .cell-content {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .cell-icon {
//           opacity: 0.6;
//         }

//         .subject-code {
//           font-weight: 600;
//           color: ${COLORS.accent};
//         }

//         .time-cell {
//           text-align: center;
//           vertical-align: middle;
//         }

//         .time-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.35rem;
//           background: linear-gradient(135deg, ${COLORS.light} 0%, ${COLORS.lighter} 100%);
//           color: white;
//           padding: 0.5rem 0.75rem;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           box-shadow: 0 2px 4px rgba(0, 119, 182, 0.2);
//           white-space: nowrap;
//         }

//         .year-badge {
//           display: inline-block;
//           background: ${COLORS.lightest};
//           color: ${COLORS.primary};
//           padding: 0.35rem 0.75rem;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .no-data {
//           text-align: center;
//           color: #999;
//           font-style: italic;
//           padding: 2rem !important;
//         }

//         /* ===== EMPTY STATE ===== */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           color: ${COLORS.secondary};
//         }

//         .empty-icon {
//           color: ${COLORS.lighter};
//           margin-bottom: 1.25rem;
//         }

//         .empty-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.75rem 0;
//         }

//         .empty-text {
//           font-size: 1rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin: 0;
//           line-height: 1.6;
//         }

//         /* ===== LOADING SKELETON ===== */
//         .skeleton-table {
//           padding: 1rem 0;
//         }

//         .skeleton-row {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         .skeleton-cell {
//           height: 60px;
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         /* ===== ANIMATIONS ===== */
//         .fade-in {
//           animation: fadeIn 0.5s ease;
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

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* ===== RESPONSIVE DESIGN ===== */
//         @media (max-width: 1024px) {
//           .filter-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .section-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .section-actions {
//             width: 100%;
//             flex-direction: column;
//           }

//           .search-box {
//             width: 100%;
//             min-width: auto;
//           }

//           .export-button {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 768px) {
//           .list-page-container {
//             padding: 1rem;
//           }

//           .content-section {
//             padding: 1.5rem;
//           }

//           .page-title {
//             font-size: 2rem;
//           }

//           .filter-grid {
//             grid-template-columns: 1fr;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr;
//           }

//           .schedule-card-header {
//             padding: 1rem;
//           }

//           .section-badge {
//             font-size: 0.95rem;
//             padding: 0.4rem 0.75rem;
//           }

//           .schedule-table {
//             font-size: 0.85rem;
//           }

//           .schedule-table th,
//           .schedule-table td {
//             padding: 0.75rem 0.5rem;
//           }

//           .time-badge {
//             font-size: 0.75rem;
//             padding: 0.4rem 0.6rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .page-title {
//             font-size: 1.5rem;
//           }

//           .section-main-title {
//             font-size: 1.35rem;
//           }

//           .schedule-table th.day-column {
//             min-width: 80px;
//             font-size: 0.75rem;
//           }

//           .cell-content {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 0.25rem;
//           }

//           .time-badge {
//             flex-direction: column;
//             gap: 0.15rem;
//             font-size: 0.7rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Search, RefreshCw, Download, Calendar, Users, BookOpen, 
  Clock, ChevronDown, ChevronUp, Filter, FileText, X 
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
const slotToTime = (slotIndex) => {
  const startHour = 8 + slotIndex;
  const endHour = startHour + 1;
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
};

const formatHour = (hour) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const formatted = ((hour + 11) % 12) + 1;
  return `${formatted}:00 ${suffix}`;
};

// ==================== LOADING SKELETON ====================
const TableSkeleton = React.memo(() => (
  <div className="skeleton-table">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="skeleton-row">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
    ))}
  </div>
));

// ==================== NOTIFICATION BANNER ====================
const NotificationBanner = React.memo(({ message, onClose }) => {
  if (!message) return null;

  const variantStyles = {
    success: { bg: "#d4edda", border: "#c3e6cb", text: "#155724" },
    warning: { bg: "#fff3cd", border: "#ffeaa7", text: "#856404" },
    danger: { bg: "#f8d7da", border: "#f5c6cb", text: "#721c24" },
  };

  const style = variantStyles[message.type] || variantStyles.danger;

  return (
    <div 
      className="notification-banner"
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
    >
      <span>{message.text}</span>
      <button className="notification-close" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
});

// ==================== SCHEDULE FILTERS ====================
const ScheduleFilters = React.memo(({ 
  courses, 
  filters, 
  onChange, 
  onSubmit, 
  loading,
  buttonLabel = "View Schedule",
  buttonVariant = "primary"
}) => {
  return (
    <div className="filters-container">
      <div className="filter-grid">
        <div className="filter-group">
          <label className="filter-label">
            <BookOpen size={16} />
            Course
          </label>
          <select
            className="filter-select"
            value={filters.courseId}
            onChange={(e) => onChange({ ...filters, courseId: e.target.value })}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <Users size={16} />
            Year Level
          </label>
          <select
            className="filter-select"
            value={filters.yearLevel}
            onChange={(e) => onChange({ ...filters, yearLevel: e.target.value })}
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>Year {n}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <Calendar size={16} />
            Semester
          </label>
          <select
            className="filter-select"
            value={filters.semester}
            onChange={(e) => onChange({ ...filters, semester: e.target.value })}
          >
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="Summer">Summer</option>
          </select>
        </div>

        <div className="filter-group">
          <button
            className={`submit-button ${buttonVariant}`}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="spinning" />
                Loading...
              </>
            ) : (
              <>
                <Filter size={16} />
                {buttonLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== SECTION STATS ====================
const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
  <div className="stat-card" style={{ borderTopColor: color }}>
    <div className="stat-icon" style={{ color }}>
      <Icon size={24} />
    </div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
));

// ==================== GENERATED SCHEDULE TABLE ====================
const GeneratedScheduleTable = React.memo(({ schedules, onExport }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Group schedules by section
  const groupedSchedules = useMemo(() => {
    const grouped = {};
    schedules.forEach((s) => {
      const key = s.section_id;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(s);
    });
    return grouped;
  }, [schedules]);

  // Filter by search term
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return groupedSchedules;
    
    const term = searchTerm.toLowerCase();
    return Object.entries(groupedSchedules).reduce((acc, [key, items]) => {
      const matchesSection = items.some(
        (s) =>
          s.section_name?.toLowerCase().includes(term) ||
          s.subject_code?.toLowerCase().includes(term) ||
          s.instructor_name?.toLowerCase().includes(term) ||
          s.room_name?.toLowerCase().includes(term)
      );
      if (matchesSection) acc[key] = items;
      return acc;
    }, {});
  }, [groupedSchedules, searchTerm]);

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  if (schedules.length === 0) {
    return (
      <div className="empty-state">
        <Calendar size={48} className="empty-icon" />
        <h3 className="empty-title">No Schedules Found</h3>
        <p className="empty-text">
          Select a course, year level, and semester to view the generated schedule
        </p>
      </div>
    );
  }

  return (
    <div className="schedule-section">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title">Generated Class Schedules</h2>
          <span className="section-count">{Object.keys(filteredSections).length} Sections</span>
        </div>
        
        <div className="section-actions">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search sections, subjects, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="export-button" onClick={() => onExport('schedule')}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="schedules-container">
        {Object.entries(filteredSections).map(([sectionId, sectionSchedules], idx) => {
          const isExpanded = expandedSections[sectionId] !== false;
          const sectionName = sectionSchedules[0]?.section_name || `Section ${String.fromCharCode(65 + idx)}`;

          return (
            <div key={sectionId} className="schedule-card fade-in">
              <div 
                className="schedule-card-header"
                onClick={() => toggleSection(sectionId)}
              >
                <div className="schedule-card-title">
                  <div className="section-badge">{sectionName}</div>
                  <span className="schedule-count">
                    {sectionSchedules.length} Classes
                  </span>
                </div>
                <button className="expand-button">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {isExpanded && (
                <div className="schedule-card-body">
                  <div className="table-responsive">
                    <table className="schedule-table">
                      <thead>
                        <tr>
                          <th>Room</th>
                          <th>Subject</th>
                          <th>Instructor</th>
                          {DAYS_ORDER.map((day) => (
                            <th key={day} className="day-column">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sectionSchedules.map((schedule, i) => (
                          <tr key={i} className="schedule-row">
                            <td>
                              <div className="cell-content">
                                <div className="cell-icon">📍</div>
                                {schedule.room_name || schedule.room_id}
                              </div>
                            </td>
                            <td>
                              <div className="cell-content">
                                <div className="subject-code">
                                  {schedule.subject_code || schedule.subject_name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="cell-content">
                                <Users size={14} className="cell-icon" />
                                {schedule.instructor_name || "TBD"}
                              </div>
                            </td>
                            {DAYS_ORDER.map((day) => (
                              <td key={day} className="time-cell">
                                {schedule.day === day && (
                                  <div className="time-badge">
                                    <Clock size={12} />
                                    {slotToTime(schedule.slot_index)}
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ==================== INSTRUCTOR SCHEDULE TABLE ====================
const InstructorScheduleTable = React.memo(({ instructors, schedules, onExport }) => {
  const [expandedInstructors, setExpandedInstructors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleInstructor = useCallback((instructorId) => {
    setExpandedInstructors((prev) => ({
      ...prev,
      [instructorId]: !prev[instructorId],
    }));
  }, []);

  // Filter instructors by search term
  const filteredInstructors = useMemo(() => {
    if (!searchTerm.trim()) return instructors;
    
    const term = searchTerm.toLowerCase();
    return instructors.filter((inst) =>
      inst.instructor_name?.toLowerCase().includes(term)
    );
  }, [instructors, searchTerm]);

  if (instructors.length === 0) {
    return (
      <div className="empty-state">
        <Users size={48} className="empty-icon" />
        <h3 className="empty-title">No Instructor Schedules</h3>
        <p className="empty-text">
          Select filters above to view instructor teaching schedules
        </p>
      </div>
    );
  }

  return (
    <div className="schedule-section">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title">Instructor Teaching Schedules</h2>
          <span className="section-count">{filteredInstructors.length} Instructors</span>
        </div>
        
        <div className="section-actions">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="export-button" onClick={() => onExport('instructor')}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="schedules-container">
        {filteredInstructors.map((instructor) => {
          const isExpanded = expandedInstructors[instructor.id] !== false;
          const instructorSchedules = schedules[instructor.id] || [];

          return (
            <div key={instructor.id} className="schedule-card instructor-card fade-in">
              <div 
                className="schedule-card-header instructor-header"
                onClick={() => toggleInstructor(instructor.id)}
              >
                <div className="schedule-card-title">
                  <div className="instructor-info">
                    <Users size={18} />
                    <span className="instructor-name">{instructor.instructor_name}</span>
                  </div>
                  <span className="schedule-count">
                    {instructorSchedules.length} Classes
                  </span>
                </div>
                <button className="expand-button">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {isExpanded && (
                <div className="schedule-card-body">
                  <div className="table-responsive">
                    <table className="schedule-table">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Section</th>
                          <th>Year</th>
                          <th>Subject</th>
                          <th>Room</th>
                          {DAYS_ORDER.map((day) => (
                            <th key={day} className="day-column">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {instructorSchedules.length > 0 ? (
                          instructorSchedules.map((schedule, i) => (
                            <tr key={i} className="schedule-row">
                              <td>{schedule.course_name || "—"}</td>
                              <td>
                                <div className="section-badge small">
                                  {schedule.section_name || "—"}
                                </div>
                              </td>
                              <td>
                                <div className="year-badge">
                                  Year {schedule.year_level || "—"}
                                </div>
                              </td>
                              <td>
                                <div className="subject-code">
                                  {schedule.subject_code || schedule.subject_name}
                                </div>
                              </td>
                              <td>{schedule.room_name || "—"}</td>
                              {DAYS_ORDER.map((day) => (
                                <td key={day} className="time-cell">
                                  {schedule.day === day && (
                                    <div className="time-badge">
                                      <Clock size={12} />
                                      {slotToTime(schedule.slot_index)}
                                    </div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5 + DAYS_ORDER.length} className="no-data">
                              No schedules assigned
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function ListPage() {
  // State management
  const [courses, setCourses] = useState([]);
  const [scheduleFilters, setScheduleFilters] = useState({
    courseId: "",
    yearLevel: "",
    semester: "",
  });
  const [instructorFilters, setInstructorFilters] = useState({
    courseId: "",
    yearLevel: "",
    semester: "",
  });
  
  const [schedules, setSchedules] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [instructorSchedules, setInstructorSchedules] = useState({});
  
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [loadingInstructors, setLoadingInstructors] = useState(false);
  
  const [scheduleMessage, setScheduleMessage] = useState(null);
  const [instructorMessage, setInstructorMessage] = useState(null);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchCourses", err);
      setCourses([]);
    }
  };

  // Fetch generated schedules
  const fetchSchedules = useCallback(async () => {
    const { courseId, yearLevel, semester } = scheduleFilters;
    
    if (!courseId || !yearLevel || !semester) {
      setScheduleMessage({
        type: "warning",
        text: "Please select course, year level, and semester to view schedules.",
      });
      return;
    }

    setLoadingSchedules(true);
    setScheduleMessage(null);

    try {
      const params = new URLSearchParams({ courseId, yearLevel, semester }).toString();
      const res = await fetch(`${API}/api/scheduler?${params}`);
      
      if (!res.ok) throw new Error("Failed to fetch schedules");

      const data = await res.json();
      const scheduleArray = Array.isArray(data) ? data : [];
      
      setSchedules(scheduleArray);
      
      if (scheduleArray.length === 0) {
        setScheduleMessage({
          type: "warning",
          text: "No schedules found for the selected criteria.",
        });
      } else {
        setScheduleMessage({
          type: "success",
          text: `Successfully loaded ${scheduleArray.length} schedule entries.`,
        });
      }
    } catch (err) {
      console.error("fetchSchedules", err);
      setScheduleMessage({
        type: "danger",
        text: `Error fetching schedules: ${err.message}`,
      });
      setSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  }, [scheduleFilters]);

  // Fetch instructor schedules
  const fetchInstructorSchedules = useCallback(async () => {
    const { courseId, yearLevel, semester } = instructorFilters;
    
    if (!courseId || !yearLevel || !semester) {
      setInstructorMessage({
        type: "warning",
        text: "Please select course, year level, and semester to view instructor schedules.",
      });
      return;
    }

    setLoadingInstructors(true);
    setInstructorMessage(null);

    try {
      const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
      if (!res.ok) throw new Error("Failed to fetch instructors");
      
      const instructorsData = await res.json();
      setInstructors(instructorsData);

      const allSchedules = {};
      for (const inst of instructorsData) {
        const schedRes = await fetch(`${API}/api/instructors/${inst.id}/schedules`);
        const schedData = await schedRes.json();
        allSchedules[inst.id] = Array.isArray(schedData) ? schedData : [];
      }
      
      setInstructorSchedules(allSchedules);
      setInstructorMessage({
        type: "success",
        text: `Successfully loaded schedules for ${instructorsData.length} instructors.`,
      });
    } catch (err) {
      console.error("fetchInstructorSchedules", err);
      setInstructorMessage({
        type: "danger",
        text: `Error fetching instructor schedules: ${err.message}`,
      });
      setInstructors([]);
      setInstructorSchedules({});
    } finally {
      setLoadingInstructors(false);
    }
  }, [instructorFilters]);

  // Calculate statistics
  const scheduleStats = useMemo(() => {
    const sections = new Set(schedules.map((s) => s.section_id)).size;
    const instructorsCount = new Set(schedules.map((s) => s.instructor_name)).size;
    const classes = schedules.length;
    return { sections, instructors: instructorsCount, classes };
  }, [schedules]);

  const instructorStats = useMemo(() => {
    const totalClasses = Object.values(instructorSchedules)
      .flat()
      .length;
    return {
      instructors: instructors.length,
      classes: totalClasses,
    };
  }, [instructors, instructorSchedules]);

  // Export functionality (placeholder)
  const handleExport = useCallback((type) => {
    // In a real app, this would generate CSV/PDF
    console.log(`Exporting ${type} schedules...`);
    alert(`Export functionality would generate a downloadable ${type} schedule file.`);
  }, []);

  return (
    <div className="list-page-container">
      {/* Page Header with Gradient */}
      <div className="page-header">
        <div className="page-title-section-gradient">
          <h1 className="page-title-gradient">Schedule Management</h1>
          <p className="page-subtitle-gradient">View and manage generated class schedules and instructor assignments</p>
        </div>
      </div>

      {/* Generated Schedules Section */}
      <div className="content-section">
        <div className="section-header-main">
          <div className="section-icon-wrapper" style={{ background: COLORS.primary }}>
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="section-main-title">Generated Class Schedules</h2>
            <p className="section-description">
              View automatically generated class schedules organized by section
            </p>
          </div>
        </div>

        <ScheduleFilters
          courses={courses}
          filters={scheduleFilters}
          onChange={setScheduleFilters}
          onSubmit={fetchSchedules}
          loading={loadingSchedules}
          buttonLabel="View Schedules"
          buttonVariant="primary"
        />

        <NotificationBanner
          message={scheduleMessage}
          onClose={() => setScheduleMessage(null)}
        />

        {schedules.length > 0 && (
          <div className="stats-grid">
            <StatsCard
              icon={FileText}
              label="Total Sections"
              value={scheduleStats.sections}
              color={COLORS.accent}
            />
            <StatsCard
              icon={Users}
              label="Instructors"
              value={scheduleStats.instructors}
              color={COLORS.light}
            />
            <StatsCard
              icon={BookOpen}
              label="Total Classes"
              value={scheduleStats.classes}
              color={COLORS.lighter}
            />
          </div>
        )}

        {loadingSchedules ? (
          <TableSkeleton />
        ) : (
          <GeneratedScheduleTable
            schedules={schedules}
            onExport={handleExport}
          />
        )}
      </div>

      {/* Instructor Schedules Section */}
      <div className="content-section">
        <div className="section-header-main">
          <div className="section-icon-wrapper" style={{ background: COLORS.secondary }}>
            <Users size={24} />
          </div>
          <div>
            <h2 className="section-main-title">Instructor Teaching Schedules</h2>
            <p className="section-description">
              View individual instructor schedules filtered by course
            </p>
          </div>
        </div>

        <ScheduleFilters
          courses={courses}
          filters={instructorFilters}
          onChange={setInstructorFilters}
          onSubmit={fetchInstructorSchedules}
          loading={loadingInstructors}
          buttonLabel="View Instructor Schedules"
          buttonVariant="secondary"
        />

        <NotificationBanner
          message={instructorMessage}
          onClose={() => setInstructorMessage(null)}
        />

        {instructors.length > 0 && (
          <div className="stats-grid">
            <StatsCard
              icon={Users}
              label="Total Instructors"
              value={instructorStats.instructors}
              color={COLORS.secondary}
            />
            <StatsCard
              icon={BookOpen}
              label="Teaching Assignments"
              value={instructorStats.classes}
              color={COLORS.accent}
            />
          </div>
        )}

        {loadingInstructors ? (
          <TableSkeleton />
        ) : (
          <InstructorScheduleTable
            instructors={instructors}
            schedules={instructorSchedules}
            onExport={handleExport}
          />
        )}
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .list-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== PAGE HEADER WITH GRADIENT ===== */
        .page-header {
          margin-bottom: 2rem;
        }

        .page-title-section-gradient {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.15);
        }

        .page-title-gradient {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
        }

        .page-subtitle-gradient {
          font-size: 1.05rem;
          color: white;
          margin: 0;
          opacity: 0.9;
        }

        /* ===== CONTENT SECTIONS ===== */
        .content-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
        }

        .section-header-main {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid ${COLORS.lightest};
        }

        .section-icon-wrapper {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: white;
        }

        .section-main-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.25rem 0;
        }

        .section-description {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          margin: 0;
          opacity: 0.7;
        }

        /* ===== FILTERS ===== */
        .filters-container {
          background: ${COLORS.lightest};
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: ${COLORS.secondary};
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 0.95rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: ${COLORS.light};
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1.75rem;
        }

        .submit-button.primary {
          background: ${COLORS.primary};
          color: white;
        }

        .submit-button.primary:hover:not(:disabled) {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        .submit-button.secondary {
          background: ${COLORS.secondary};
          color: white;
        }

        .submit-button.secondary:hover:not(:disabled) {
          background: ${COLORS.accent};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 62, 138, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ===== NOTIFICATION BANNER ===== */
        .notification-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          border: 2px solid;
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease;
          font-size: 0.95rem;
        }

        .notification-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .notification-close:hover {
          opacity: 1;
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
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

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(0, 180, 216, 0.1);
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin-top: 0.25rem;
        }

        /* ===== SCHEDULE SECTION ===== */
        .schedule-section {
          margin-top: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0;
        }

        .section-count {
          background: ${COLORS.lighter};
          color: ${COLORS.primary};
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .section-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-box {
          position: relative;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .search-input {
          width: 100%;
          padding: 0.65rem 0.75rem 0.65rem 2.5rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.light};
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        .export-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: ${COLORS.accent};
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .export-button:hover {
          background: ${COLORS.light};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 119, 182, 0.3);
        }

        /* ===== SCHEDULE CARDS ===== */
        .schedules-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .schedule-card {
          border: 2px solid ${COLORS.lightest};
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .schedule-card:hover {
          border-color: ${COLORS.lighter};
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
        }

        .schedule-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          cursor: pointer;
          user-select: none;
          transition: background 0.3s ease;
        }

        .schedule-card-header:hover {
          background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
        }

        .instructor-header {
          background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
        }

        .instructor-header:hover {
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
        }

        .schedule-card-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .section-badge {
          font-size: 1.1rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .section-badge.small {
          font-size: 0.9rem;
          padding: 0.35rem 0.75rem;
          background: ${COLORS.lighter};
          color: ${COLORS.primary};
          font-weight: 600;
        }

        .instructor-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .instructor-name {
          font-weight: 700;
        }

        .schedule-count {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .expand-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .expand-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .schedule-card-body {
          padding: 1.5rem;
          background: #fafbfc;
        }

        /* ===== TABLE STYLES ===== */
       /* ===== TABLE STYLES ===== */
        .table-responsive {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid ${COLORS.lightest};
          -webkit-overflow-scrolling: touch;
        }

        .schedule-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
          background: white;
          font-size: 0.9rem;
        }

        
        .schedule-table thead {
          background: ${COLORS.lightest};
        }

        .schedule-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: ${COLORS.secondary};
          border-bottom: 2px solid ${COLORS.lighter};
          white-space: nowrap;
        }

        .schedule-table th.day-column {
          text-align: center;
          min-width: 100px;
        }

        .schedule-table td {
          padding: 1rem;
          border-bottom: 1px solid ${COLORS.lightest};
        }

        .schedule-row {
          transition: background 0.2s ease;
        }

        .schedule-row:hover {
          background: ${COLORS.lightest};
        }

        .schedule-row:last-child td {
          border-bottom: none;
        }

        .cell-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cell-icon {
          opacity: 0.6;
        }

        .subject-code {
          font-weight: 600;
          color: ${COLORS.accent};
        }

        .time-cell {
          text-align: center;
          vertical-align: middle;
        }

        .time-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, ${COLORS.light} 0%, ${COLORS.lighter} 100%);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0, 119, 182, 0.2);
          white-space: nowrap;
        }

        .year-badge {
          display: inline-block;
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .no-data {
          text-align: center;
          color: #999;
          font-style: italic;
          padding: 2rem !important;
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: ${COLORS.secondary};
        }

        .empty-icon {
          color: ${COLORS.lighter};
          margin-bottom: 1.25rem;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.75rem 0;
        }

        .empty-text {
          font-size: 1rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
          line-height: 1.6;
        }

        /* ===== LOADING SKELETON ===== */
        .skeleton-table {
          padding: 1rem 0;
        }

        .skeleton-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .skeleton-cell {
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ===== ANIMATIONS ===== */
        .fade-in {
          animation: fadeIn 0.5s ease;
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-actions {
            width: 100%;
            flex-direction: column;
          }

          .search-box {
            width: 100%;
            min-width: auto;
          }

          .export-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .list-page-container {
            padding: 1rem;
          }

          .content-section {
            padding: 1.5rem;
          }

          .page-title-gradient {
            font-size: 2rem;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .schedule-card-header {
            padding: 1rem;
          }

          .section-badge {
            font-size: 0.95rem;
            padding: 0.4rem 0.75rem;
          }

          .schedule-table {
            font-size: 0.85rem;
          }

          .schedule-table th,
          .schedule-table td {
            padding: 0.75rem 0.5rem;
          }

          .time-badge {
            font-size: 0.75rem;
            padding: 0.4rem 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .page-title-gradient {
            font-size: 1.5rem;
          }

          .section-main-title {
            font-size: 1.35rem;
          }

          .schedule-table th.day-column {
            min-width: 80px;
            font-size: 0.75rem;
          }

          .cell-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .time-badge {
            flex-direction: column;
            gap: 0.15rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}