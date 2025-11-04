// // src/components/InstructorsPage.js
// import React, { useEffect, useState } from "react";
// import { Card, Form, Button, Table, Alert, Collapse } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function InstructorsPage() {
//   const [courses, setCourses] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState(null);

//   // add-instructor form
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");

//   // after adding instructor show timeslot UI
//   const [newInstructorId, setNewInstructorId] = useState(null);
//   const [timeslots, setTimeslots] = useState(
//     DAYS.map((d) => ({ day: d, start: "", end: "" }))
//   );

//   // UI control to show timeslots per instructor
//   const [expandedInstructor, setExpandedInstructor] = useState(null);

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   async function fetchInitialData() {
//     setLoading(true);
//     try {
//       const [cRes, iRes] = await Promise.all([
//         fetch(`${API}/api/courses`),
//         fetch(`${API}/api/instructors`)
//       ]);

//       const [coursesData, instructorsData] = await Promise.all([cRes.json(), iRes.json()]);
//       setCourses(Array.isArray(coursesData) ? coursesData : []);
//       setInstructors(Array.isArray(instructorsData) ? instructorsData : []);
//     } catch (err) {
//       console.error("Error loading data:", err);
//       setMessage({ type: "danger", text: "Failed to load data." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   // add instructor (Step 1)
//   async function handleAddInstructor(e) {
//     e.preventDefault();
//     if (!name.trim() || !courseId) {
//       return setMessage({ type: "danger", text: "Please enter name and choose a course." });
//     }
//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: name.trim(), courseId: Number(courseId) })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed");
//       setNewInstructorId(data.instructorId);
//       setMessage({ type: "success", text: "Instructor added. Assign timeslots now." });
//       // prepare timeslot UI
//       setTimeslots(DAYS.map((d) => ({ day: d, start: "", end: "" })));
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ type: "danger", text: "Failed to add instructor." });
//     }
//   }

//   // save timeslots (Step 2)
//   async function handleSaveTimeslots() {
//     if (!newInstructorId) return;
//     try {
//       // only send slots with start or end specified (optional)
//       const payload = timeslots; // backend ignores empty entries
//       const res = await fetch(`${API}/api/instructors/${newInstructorId}/timeslots`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ timeslots: payload })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save timeslots");
//       setMessage({ type: "success", text: "Time slots saved." });
//       // reload instructors list and reset form
//       await fetchInitialData();
//       setNewInstructorId(null);
//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Save timeslots error:", err);
//       setMessage({ type: "danger", text: "Failed to save timeslots." });
//     }
//   }

//   function setSlot(index, field, value) {
//     const copy = [...timeslots];
//     copy[index] = { ...copy[index], [field]: value };
//     setTimeslots(copy);
//   }

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         <h5 className="mb-3">👨‍🏫 Instructors</h5>

//         {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

//         {/* Add instructor form */}
//         <Form onSubmit={handleAddInstructor} className="mb-3">
//           <div className="row g-2 align-items-end">
//             <div className="col-md-5">
//               <Form.Group>
//                 <Form.Label>Instructor Name</Form.Label>
//                 <Form.Control value={name} onChange={(e)=>setName(e.target.value)} placeholder="Instructor Name" required />
//               </Form.Group>
//             </div>

//             <div className="col-md-4">
//               <Form.Group>
//                 <Form.Label>Course</Form.Label>
//                 <Form.Select value={courseId} onChange={(e)=>setCourseId(e.target.value)} required>
//                   <option value="">-- choose course --</option>
//                   {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
//                 </Form.Select>
//               </Form.Group>
//             </div>

//             <div className="col-md-3 text-end">
//               <Button type="submit" variant="primary">➕ Add Instructor</Button>
//             </div>
//           </div>
//         </Form>

//         {/* If we just added an instructor, show Timeslot UI */}
//         {newInstructorId && (
//           <>
//             <h6>📅 Assign Time Slots</h6>
//             <p className="text-muted">Set start/end times for each day (leave blank if not available).</p>

//             <Table size="sm" bordered>
//               <thead>
//                 <tr><th>Day</th><th style={{width:140}}>Start</th><th style={{width:140}}>End</th></tr>
//               </thead>
//               <tbody>
//                 {timeslots.map((t, i) => (
//                   <tr key={t.day}>
//                     <td>{t.day}</td>
//                     <td>
//                       <Form.Control type="time" value={t.start} onChange={(e)=>setSlot(i,'start',e.target.value)} />
//                     </td>
//                     <td>
//                       <Form.Control type="time" value={t.end} onChange={(e)=>setSlot(i,'end',e.target.value)} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             <div className="mb-4">
//               <Button variant="success" onClick={handleSaveTimeslots}>💾 Save Time Slots</Button>{' '}
//               <Button variant="secondary" onClick={() => setNewInstructorId(null)}>Cancel</Button>
//             </div>
//           </>
//         )}

//         {/* Existing instructors list */}
//         <hr />
//         <h6>All Instructors</h6>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           instructors.map((ins) => (
//             <div key={ins.id} className="mb-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <strong>{ins.name}</strong> <small className="text-muted">— {ins.course_code ? `${ins.course_code}` : 'No course'}</small>
//                 </div>
//                 <div>
//                   <Button size="sm" onClick={() => setExpandedInstructor(expandedInstructor === ins.id ? null : ins.id)}>
//                     {expandedInstructor === ins.id ? 'Hide' : 'View Timeslots'}
//                   </Button>
//                 </div>
//               </div>

//               <Collapse in={expandedInstructor === ins.id}>
//                 <div className="mt-2">
//                   {ins.timeslots && ins.timeslots.length ? (
//                     <Table size="sm" bordered>
//                       <thead><tr><th>Day</th><th>Start</th><th>End</th></tr></thead>
//                       <tbody>
//                         {DAYS.map(day => {
//                           const s = ins.timeslots.find(ts => ts.day === day);
//                           return (
//                             <tr key={day}>
//                               <td>{day}</td>
//                               <td>{s ? (s.start || '—') : '—'}</td>
//                               <td>{s ? (s.end || '—') : '—'}</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <div className="text-muted">No timeslots assigned yet.</div>
//                   )}
//                 </div>
//               </Collapse>
//             </div>
//           ))
//         )}
//       </Card.Body>
//     </Card>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Button, Form, Table, Alert, Card } from "react-bootstrap";

// const InstructorsPage = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [message, setMessage] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // 🔹 Slot → Time converter (reuse from SchedulePage.js)
//   const slotToTime = (slotIndex) => {
//     const startHour = 7 + Math.floor(slotIndex / 2);
//     const startMinute = slotIndex % 2 === 0 ? "00" : "30";
//     const endHour = 7 + Math.floor((slotIndex + 1) / 2);
//     const endMinute = (slotIndex + 1) % 2 === 0 ? "00" : "30";
//     return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
//   };

//   // 🔹 Fetch instructors
//   const fetchInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();

//       // Load schedule for each instructor
//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );

//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//     }
//   };

//   // 🔹 Fetch courses
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

//   // 🔹 Fetch instructor’s schedule
//   const fetchInstructorSchedule = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) throw new Error("Failed to fetch instructor schedule");
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   };

//   // 🔹 Add instructor
//   const handleAddInstructor = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !courseId) {
//       return setMessage({
//         type: "danger",
//         text: "Please enter name and choose a course.",
//       });
//     }
//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: name.trim(), courseId: Number(courseId) }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed");

//       // fetch schedule immediately after adding
//       const schedule = await fetchInstructorSchedule(data.id);

//       setInstructors((prev) => [...prev, { ...data, schedule }]);
//       setMessage({ type: "success", text: "Instructor added and schedule loaded." });
//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ type: "danger", text: "Failed to add instructor." });
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, []);

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         <h5 className="mb-3">Instructors</h5>

//         {message && (
//           <Alert
//             variant={message.type}
//             onClose={() => setMessage(null)}
//             dismissible
//           >
//             {message.text}
//           </Alert>
//         )}

//         {/* Add instructor form */}
//         <Form onSubmit={handleAddInstructor} className="mb-4">
//           <div className="d-flex gap-2">
//             <Form.Control
//               placeholder="Instructor name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Form.Select
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//             >
//               <option value="">Select Course</option>
//               {courses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.code}
//                 </option>
//               ))}
//             </Form.Select>
//             <Button type="submit">Add</Button>
//           </div>
//         </Form>

//         {/* Instructors list */}
//         <Table striped bordered hover size="sm">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Course</th>
//               <th>Schedule</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instructors.map((ins) => (
//               <tr key={ins.id}>
//                 <td>{ins.name}</td>
//                 <td>{courses.find((c) => c.id === (ins.course_id || ins.courseId))?.code || "-"}</td>

//                 <td>
//                   {ins.schedule && ins.schedule.length > 0 ? (
//                     <Table size="sm" bordered>
//                       <thead>
//                         <tr>
//                           <th>Day</th>
//                           <th>Time</th>
//                           <th>Subject</th>
//                           <th>Room</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ins.schedule.map((s, i) => (
//                           <tr key={i}>
//                             <td>{s.day}</td>
//                             <td>{slotToTime(s.slot_index)}</td>
//                             <td>{s.subject_code}</td>
//                             <td>{s.room_name || "TBD"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <span className="text-muted">No schedule assigned yet</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorsPage;

//Functional

// import React, { useState, useEffect } from "react";
// import { Button, Form, Table, Alert, Card } from "react-bootstrap";
// import '../../styles/InstructorsPage.css'; // External CSS file for styles

// const InstructorsPage = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [message, setMessage] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const slotToTime = (slotIndex) => {
//     const startHour = 7 + Math.floor(slotIndex / 2);
//     const startMinute = slotIndex % 2 === 0 ? "00" : "30";
//     const endHour = 7 + Math.floor((slotIndex + 1) / 2);
//     const endMinute = (slotIndex + 1) % 2 === 0 ? "00" : "30";
//     return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
//   };

//   const fetchInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();
//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );
//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//     }
//   };

//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

//   const fetchInstructorSchedule = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) throw new Error("Failed to fetch instructor schedule");
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   };

//   const handleAddInstructor = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !courseId) {
//       return setMessage({
//         type: "danger",
//         text: "Please enter name and choose a course.",
//       });
//     }
//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: name.trim(), courseId: Number(courseId) }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed");
//       const schedule = await fetchInstructorSchedule(data.id);
//       setInstructors((prev) => [...prev, { ...data, schedule }]);
//       setMessage({ type: "success", text: "Instructor added and schedule loaded." });
//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ type: "danger", text: "Failed to add instructor." });
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, []);

//   return (
//     <Card className="shadow-sm border-0 rounded-lg">
//       <Card.Body>
//         <h5 className="mb-3 text-primary">Instructors</h5>

//         {message && (
//           <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
//             {message.text}
//           </Alert>
//         )}

//         {/* Add instructor form */}
//         <Form onSubmit={handleAddInstructor} className="mb-4">
//           <div className="d-flex gap-2">
//             <Form.Control
//               placeholder="Instructor name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="rounded-pill"
//             />
//             <Form.Select
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               className="rounded-pill"
//             >
//               <option value="">Select Course</option>
//               {courses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.code}
//                 </option>
//               ))}
//             </Form.Select>
//             <Button type="submit" className="rounded-pill" variant="primary">
//               Add
//             </Button>
//           </div>
//         </Form>

//         {/* Instructors list */}
//         <Table striped bordered hover responsive size="sm" className="custom-table">
//           <thead className="bg-primary text-white">
//             <tr>
//               <th>Name</th>
//               <th>Course</th>
//               <th>Schedule</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instructors.map((ins) => (
//               <tr key={ins.id}>
//                 <td>{ins.name}</td>
//                 <td>{courses.find((c) => c.id === (ins.course_id || ins.courseId))?.code || "-"}</td>
//                 <td>
//                   {ins.schedule && ins.schedule.length > 0 ? (
//                     <Table size="sm" bordered responsive className="schedule-table">
//                       <thead>
//                         <tr>
//                           <th>Day</th>
//                           <th>Time</th>
//                           <th>Subject</th>
//                           <th>Room</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ins.schedule.map((s, i) => (
//                           <tr key={i}>
//                             <td>{s.day}</td>
//                             <td>{slotToTime(s.slot_index)}</td>
//                             <td>{s.subject_code}</td>
//                             <td>{s.room_name || "TBD"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <span className="text-muted">No schedule assigned yet</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorsPage;

//FUNCTIONAL

// import React, { useState, useEffect } from "react";
// import { Button, Form, Table, Alert, Card } from "react-bootstrap";
// import '../../styles/InstructorsPage.css'; // External CSS file for styles

// const InstructorsPage = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [message, setMessage] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // ✅ FIXED TIME CONVERSION (Matches generated schedule)
//   const slotToTime = (slotIndex) => {
//     const startHour = 7 + Number(slotIndex); // Example: slot 8 → 3:00 PM
//     const endHour = startHour + 1;

//     const formatTime = (hour) => {
//       const period = hour >= 12 ? "PM" : "AM";
//       const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
//       return `${adjustedHour}:00 ${period}`;
//     };

//     return `${formatTime(startHour)} - ${formatTime(endHour)}`;
//   };

//   // Fetch all instructors
//   const fetchInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();

//       // Fetch each instructor’s schedule
//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );

//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//     }
//   };

//   // Fetch available courses
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

//   // Fetch individual instructor schedule
//   const fetchInstructorSchedule = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) throw new Error("Failed to fetch instructor schedule");
//       const data = await res.json();
//       return data;
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   };

//   // Add new instructor
//   const handleAddInstructor = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !courseId) {
//       return setMessage({
//         type: "danger",
//         text: "Please enter name and choose a course.",
//       });
//     }

//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: name.trim(), courseId: Number(courseId) }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to add instructor");

//       const schedule = await fetchInstructorSchedule(data.id);
//       setInstructors((prev) => [...prev, { ...data, schedule }]);

//       setMessage({
//         type: "success",
//         text: "Instructor added and schedule loaded.",
//       });

//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ type: "danger", text: "Failed to add instructor." });
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, []);

//   return (
//     <Card className="shadow-sm border-0 rounded-lg">
//       <Card.Body>
//         <h5 className="mb-3 text-primary">Instructors</h5>

//         {message && (
//           <Alert
//             variant={message.type}
//             onClose={() => setMessage(null)}
//             dismissible
//           >
//             {message.text}
//           </Alert>
//         )}

//         {/* Add instructor form */}
//         <Form onSubmit={handleAddInstructor} className="mb-4">
//           <div className="d-flex gap-2">
//             <Form.Control
//               placeholder="Instructor name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="rounded-pill"
//             />
//             <Form.Select
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               className="rounded-pill"
//             >
//               <option value="">Select Course</option>
//               {courses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.code}
//                 </option>
//               ))}
//             </Form.Select>
//             <Button type="submit" className="rounded-pill" variant="primary">
//               Add
//             </Button>
//           </div>
//         </Form>

//         {/* Instructors list */}
//         <Table striped bordered hover responsive size="sm" className="custom-table">
//           <thead className="bg-primary text-white">
//             <tr>
//               <th>Name</th>
//               <th>Course</th>
//               <th>Schedule</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instructors.map((ins) => (
//               <tr key={ins.id}>
//                 <td>{ins.name}</td>
//                 <td>
//                   {courses.find(
//                     (c) => c.id === (ins.course_id || ins.courseId)
//                   )?.code || "-"}
//                 </td>
//                 <td>
//                   {ins.schedule && ins.schedule.length > 0 ? (
//                     <Table
//                       size="sm"
//                       bordered
//                       responsive
//                       className="schedule-table"
//                     >
//                       <thead>
//                         <tr>
//                           <th>Day</th>
//                           <th>Time</th>
//                           <th>Subject</th>
//                           <th>Room</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ins.schedule.map((s, i) => (
//                           <tr key={i}>
//                             <td>{s.day}</td>
//                             <td>{slotToTime(Number(s.slot_index))}</td>
//                             <td>{s.subject_description || s.subject_code}</td>
//                             <td>{s.room_name || "TBD"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <span className="text-muted">No schedule assigned yet</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorsPage;

//FUNCTIONAL

// import React, { useState, useEffect } from "react";
// import { Button, Form, Table, Alert, Card } from "react-bootstrap";
// import "../../styles/InstructorsPage.css";

// const InstructorsPage = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [message, setMessage] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const slotTimes = Array.from({ length: 12 }, (_, i) => {
//     const start = 7 + i;
//     const end = start + 1;
//     const format = (h) => {
//       const period = h >= 12 ? "PM" : "AM";
//       const hr = h % 12 === 0 ? 12 : h % 12;
//       return `${hr}:00 ${period}`;
//     };
//     return `${format(start)} - ${format(end)}`;
//   });

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   const fetchInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();

//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );

//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//     }
//   };

//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

//   const fetchInstructorSchedule = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) throw new Error("Failed to fetch instructor schedule");
//       const data = await res.json();
//       return data;
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   };

//   const handleAddInstructor = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !courseId) {
//       return setMessage({
//         type: "danger",
//         text: "Please enter name and choose a course.",
//       });
//     }

//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: name.trim(), courseId: Number(courseId) }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to add instructor");

//       const schedule = await fetchInstructorSchedule(data.id);
//       setInstructors((prev) => [...prev, { ...data, schedule }]);

//       setMessage({
//         type: "success",
//         text: "Instructor added successfully.",
//       });

//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ type: "danger", text: "Failed to add instructor." });
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, []);

//   const renderScheduleTable = (schedule) => {
//     const getScheduleForDay = (day) => schedule.filter((s) => s.day === day);

//     return (
//       <Table bordered size="sm" responsive className="schedule-grid text-center">
//         <thead className="table-primary">
//           <tr>
//             <th>Time</th>
//             {days.map((day) => (
//               <th key={day}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {slotTimes.map((time, index) => (
//             <tr key={time}>
//               <td className="time-cell">{time}</td>
//               {days.map((day) => {
//                 const hasSchedule = getScheduleForDay(day).some(
//                   (s) => s.slot_index === index
//                 );
//                 return (
//                   <td
//                     key={`${day}-${index}`}
//                     className={hasSchedule ? "highlighted-cell" : ""}
//                   >
//                     {hasSchedule ? "📘" : ""}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     );
//   };

//   return (
//     <Card className="shadow-sm border-0 rounded-lg">
//       <Card.Body>
//         <h5 className="mb-3 text-primary fw-bold">Instructors</h5>

//         {message && (
//           <Alert
//             variant={message.type}
//             onClose={() => setMessage(null)}
//             dismissible
//           >
//             {message.text}
//           </Alert>
//         )}

//         <Form onSubmit={handleAddInstructor} className="mb-4">
//           <div className="d-flex gap-2">
//             <Form.Control
//               placeholder="Instructor name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="rounded-pill"
//             />
//             <Form.Select
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               className="rounded-pill"
//             >
//               <option value="">Select Course</option>
//               {courses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.code}
//                 </option>
//               ))}
//             </Form.Select>
//             <Button type="submit" className="rounded-pill" variant="primary">
//               Add
//             </Button>
//           </div>
//         </Form>

//         <Table striped bordered hover responsive size="sm" className="custom-table">
//           <thead className="bg-primary text-white">
//             <tr>
//               <th>Name</th>
//               <th>Course</th>
//               <th>Schedule (7:00 AM - 7:00 PM)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instructors.map((ins) => (
//               <tr key={ins.id}>
//                 <td>{ins.name}</td>
//                 <td>
//                   {courses.find(
//                     (c) => c.id === (ins.course_id || ins.courseId)
//                   )?.code || "-"}
//                 </td>
//                 <td>{renderScheduleTable(ins.schedule)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   );
// };

// export default InstructorsPage;


//OLD DESIGN

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Button, Form, Table, Alert, Card, Row, Col, Badge, Spinner, Modal } from "react-bootstrap";
// import { Search, RefreshCw, Plus, Users, BookOpen, Clock, Trash2, Edit, FileDown, Calendar } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// // ============================================
// // UTILITY FUNCTIONS
// // ============================================

// /**
//  * Converts slot index (0-based) to human-readable time format
//  * @param {number} slotIndex - The time slot index (0 = 7:00 AM)
//  * @returns {string} Formatted time range (e.g., "8:00 AM - 9:00 AM")
//  */
// const slotToTime = (slotIndex) => {
//   const startHour = 7 + Number(slotIndex);
//   const endHour = startHour + 1;

//   const formatTime = (hour) => {
//     const period = hour >= 12 ? "PM" : "AM";
//     const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
//     return `${adjustedHour}:00 ${period}`;
//   };

//   return `${formatTime(startHour)} - ${formatTime(endHour)}`;
// };

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // ============================================
// // STATS CARD COMPONENT
// // ============================================

// const StatsCard = React.memo(({ icon: Icon, title, value, color }) => (
//   <Card className="stats-card border-0 shadow-sm h-100">
//     <Card.Body className="d-flex align-items-center">
//       <div className={`stats-icon-wrapper bg-${color}-subtle me-3`}>
//         <Icon className={`text-${color}`} size={24} />
//       </div>
//       <div>
//         <div className="stats-value">{value}</div>
//         <div className="stats-label text-muted">{title}</div>
//       </div>
//     </Card.Body>
//   </Card>
// ));

// // ============================================
// // NOTIFICATION BANNER COMPONENT
// // ============================================

// const NotificationBanner = React.memo(({ message, onClose }) => {
//   if (!message) return null;

//   return (
//     <Alert 
//       variant={message.type} 
//       dismissible 
//       onClose={onClose}
//       className="notification-banner animate-slide-down"
//     >
//       <div className="d-flex align-items-center">
//         <strong className="me-2">
//           {message.type === "success" ? "✓" : "⚠"}
//         </strong>
//         {message.text}
//       </div>
//     </Alert>
//   );
// });

// // ============================================
// // INSTRUCTOR FORM COMPONENT
// // ============================================

// const InstructorForm = React.memo(({ 
//   name, 
//   setName, 
//   courseId, 
//   setCourseId, 
//   courses, 
//   onSubmit, 
//   isLoading 
// }) => (
//   <Card className="form-card border-0 shadow-sm mb-4 animate-fade-in">
//     <Card.Header className="bg-gradient-primary text-white border-0">
//       <h5 className="mb-0 d-flex align-items-center">
//         <Plus size={20} className="me-2" />
//         Add New Instructor
//       </h5>
//     </Card.Header>
//     <Card.Body>
//       <Form onSubmit={onSubmit}>
//         <Row className="g-3">
//           <Col md={5}>
//             <Form.Group>
//               <Form.Label className="fw-semibold">Instructor Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="form-input"
//                 disabled={isLoading}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={5}>
//             <Form.Group>
//               <Form.Label className="fw-semibold">Assigned Course</Form.Label>
//               <Form.Select
//                 value={courseId}
//                 onChange={(e) => setCourseId(e.target.value)}
//                 className="form-input"
//                 disabled={isLoading}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.code} - {c.name || ""}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2} className="d-flex align-items-end">
//             <Button 
//               type="submit" 
//               variant="primary" 
//               className="w-100 btn-add"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Spinner size="sm" className="me-2" />
//                   Adding...
//                 </>
//               ) : (
//                 <>
//                   <Plus size={18} className="me-1" />
//                   Add
//                 </>
//               )}
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Card.Body>
//   </Card>
// ));

// // ============================================
// // SCHEDULE TABLE COMPONENT
// // ============================================

// const ScheduleTable = React.memo(({ schedule }) => {
//   if (!schedule || schedule.length === 0) {
//     return (
//       <div className="text-center py-3 text-muted">
//         <Calendar size={24} className="mb-2 opacity-50" />
//         <div>No schedule assigned yet</div>
//       </div>
//     );
//   }

//   // Group schedule by day
//   const grouped = DAYS.reduce((acc, day) => {
//     acc[day] = schedule.filter((s) => s.day === day);
//     return acc;
//   }, {});

//   return (
//     <Table bordered size="sm" responsive className="schedule-table mb-0">
//       <thead className="table-header-blue">
//         <tr>
//           {DAYS.map((day) => (
//             <th key={day} className="text-center day-header">
//               {day.substring(0, 3)}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           {DAYS.map((day) => (
//             <td key={day} className="schedule-cell">
//               {grouped[day].length > 0 ? (
//                 grouped[day].map((s, i) => (
//                   <Badge 
//                     key={i} 
//                     bg="primary" 
//                     className="time-badge d-block mb-1"
//                   >
//                     <Clock size={12} className="me-1" />
//                     {slotToTime(s.slot_index)}
//                   </Badge>
//                 ))
//               ) : (
//                 <span className="text-muted">—</span>
//               )}
//             </td>
//           ))}
//         </tr>
//       </tbody>
//     </Table>
//   );
// });

// // ============================================
// // LOADING SKELETON COMPONENT
// // ============================================

// const LoadingSkeleton = () => (
//   <Card className="border-0 shadow-sm mb-3">
//     <Card.Body>
//       <div className="skeleton-loader">
//         <div className="skeleton-line w-25 mb-3"></div>
//         <div className="skeleton-line w-50 mb-2"></div>
//         <div className="skeleton-line w-75"></div>
//       </div>
//     </Card.Body>
//   </Card>
// );

// // ============================================
// // DELETE CONFIRMATION MODAL
// // ============================================

// const DeleteConfirmModal = ({ show, onHide, onConfirm, instructorName }) => (
//   <Modal show={show} onHide={onHide} centered>
//     <Modal.Header closeButton className="border-0">
//       <Modal.Title>Confirm Deletion</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <p className="mb-0">
//         Are you sure you want to delete instructor <strong>{instructorName}</strong>? 
//         This action cannot be undone.
//       </p>
//     </Modal.Body>
//     <Modal.Footer className="border-0">
//       <Button variant="secondary" onClick={onHide}>
//         Cancel
//       </Button>
//       <Button variant="danger" onClick={onConfirm}>
//         <Trash2 size={16} className="me-2" />
//         Delete
//       </Button>
//     </Modal.Footer>
//   </Modal>
// );

// // ============================================
// // MAIN INSTRUCTORS PAGE COMPONENT
// // ============================================

// const InstructorsPage = () => {
//   // State management
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [message, setMessage] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCourse, setFilterCourse] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAdding, setIsAdding] = useState(false);
//   const [deleteModal, setDeleteModal] = useState({ show: false, instructor: null });

//   /**
//    * Fetches all instructors with their schedules from the API
//    * Uses Promise.all for parallel schedule fetching to optimize performance
//    */
//   const fetchInstructors = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();

//       // Fetch schedules in parallel for better performance
//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );

//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//       setMessage({ 
//         type: "danger", 
//         text: "Failed to load instructors. Please try again." 
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   /**
//    * Fetches available courses from the API
//    */
//   const fetchCourses = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   }, []);

//   /**
//    * Fetches schedule for a specific instructor
//    * @param {number} id - Instructor ID
//    * @returns {Array} Schedule data or empty array on error
//    */
//   const fetchInstructorSchedule = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) throw new Error("Failed to fetch instructor schedule");
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   };

//   /**
//    * Handles adding a new instructor
//    * Validates input, sends POST request, and updates local state
//    */
//   const handleAddInstructor = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !courseId) {
//       return setMessage({
//         type: "danger",
//         text: "Please enter instructor name and select a course.",
//       });
//     }

//     try {
//       setIsAdding(true);
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           name: name.trim(), 
//           courseId: Number(courseId) 
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to add instructor");

//       // Fetch schedule for newly added instructor
//       const schedule = await fetchInstructorSchedule(data.id);
//       setInstructors((prev) => [...prev, { ...data, schedule }]);

//       setMessage({
//         type: "success",
//         text: `✓ Instructor "${name}" added successfully!`,
//       });

//       // Reset form
//       setName("");
//       setCourseId("");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       setMessage({ 
//         type: "danger", 
//         text: err.message || "Failed to add instructor." 
//       });
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   /**
//    * Handles instructor deletion
//    * @param {number} id - Instructor ID to delete
//    */
//   const handleDeleteInstructor = async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete instructor");

//       setInstructors((prev) => prev.filter((ins) => ins.id !== id));
//       setMessage({
//         type: "success",
//         text: "✓ Instructor deleted successfully!",
//       });
//       setDeleteModal({ show: false, instructor: null });
//     } catch (err) {
//       console.error("Delete error:", err);
//       setMessage({ 
//         type: "danger", 
//         text: "Failed to delete instructor." 
//       });
//     }
//   };

//   /**
//    * Filters and searches instructors based on search term and course filter
//    * Uses useMemo for performance optimization
//    */
//   const filteredInstructors = useMemo(() => {
//     return instructors.filter((ins) => {
//       const matchesSearch = ins.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesCourse = !filterCourse || 
//         String(ins.course_id || ins.courseId) === filterCourse;
//       return matchesSearch && matchesCourse;
//     });
//   }, [instructors, searchTerm, filterCourse]);

//   /**
//    * Calculates total teaching hours for an instructor
//    * @param {Array} schedule - Instructor's schedule array
//    * @returns {number} Total hours
//    */
//   const calculateTotalHours = useCallback((schedule) => {
//     return schedule ? schedule.length : 0;
//   }, []);

//   // Initial data fetch on component mount
//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, [fetchInstructors, fetchCourses]);

//   // Auto-dismiss notifications after 5 seconds
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   return (
//     <div className="instructors-page">
//       <style>{`
//         .instructors-page {
//           padding: 2rem;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           min-height: 100vh;
//         }

//         .page-header {
//           background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
//           color: white;
//           padding: 2rem;
//           border-radius: 12px;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.2);
//         }

//         .page-title {
//           font-size: 2rem;
//           font-weight: 700;
//           margin: 0;
//           display: flex;
//           align-items: center;
//         }

//         .page-subtitle {
//           color: #ADE8F4;
//           margin: 0.5rem 0 0 0;
//           font-size: 1rem;
//         }

//         .stats-card {
//           border-radius: 12px;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }

//         .stats-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
//         }

//         .stats-icon-wrapper {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 10px;
//         }

//         .stats-value {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         .stats-label {
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .form-card {
//           border-radius: 12px;
//         }

//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//         }

//         .form-input {
//           border: 2px solid #E8F4F8;
//           border-radius: 8px;
//           padding: 0.6rem 1rem;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }

//         .form-input:focus {
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.15);
//         }

//         .btn-add {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           padding: 0.6rem 1.5rem;
//           border-radius: 8px;
//           font-weight: 600;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }

//         .btn-add:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         .search-filter-bar {
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           margin-bottom: 2rem;
//         }

//         .search-input {
//           border: 2px solid #E8F4F8;
//           border-radius: 8px;
//           padding: 0.6rem 1rem 0.6rem 2.5rem;
//         }

//         .search-icon-wrapper {
//           position: absolute;
//           left: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #6c757d;
//         }

//         .instructors-table-card {
//           border-radius: 12px;
//           border: none;
//           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
//         }

//         .table-header-custom {
//           background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
//           color: white;
//         }

//         .table-header-custom th {
//           padding: 1rem;
//           font-weight: 600;
//           border: none;
//         }

//         .instructor-table tbody tr {
//           transition: background-color 0.2s, transform 0.2s;
//         }

//         .instructor-table tbody tr:hover {
//           background-color: #CAF0F8;
//           transform: scale(1.01);
//         }

//         .instructor-name {
//           font-weight: 600;
//           color: #03045E;
//         }

//         .course-badge {
//           background: #ADE8F4;
//           color: #03045E;
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.875rem;
//         }

//         .schedule-table {
//           font-size: 0.85rem;
//           margin-top: 0.5rem;
//         }

//         .table-header-blue {
//           background: #90E0EF;
//         }

//         .day-header {
//           font-weight: 600;
//           color: #03045E;
//           padding: 0.5rem;
//           font-size: 0.875rem;
//         }

//         .schedule-cell {
//           vertical-align: middle;
//           padding: 0.5rem;
//         }

//         .time-badge {
//           font-size: 0.75rem;
//           padding: 0.3rem 0.5rem;
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           white-space: nowrap;
//         }

//         .action-btn {
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           border: none;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }

//         .action-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//         }

//         .btn-refresh {
//           background: white;
//           color: #0077B6;
//           border: 2px solid #0077B6;
//         }

//         .btn-refresh:hover {
//           background: #0077B6;
//           color: white;
//         }

//         .hours-badge {
//           background: #48CAE4;
//           color: #03045E;
//           padding: 0.3rem 0.6rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.875rem;
//         }

//         .notification-banner {
//           border-radius: 8px;
//           border-left: 4px solid;
//         }

//         .skeleton-loader {
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .skeleton-line {
//           height: 12px;
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 4px;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-in;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-slide-down {
//           animation: slideDown 0.3s ease-out;
//         }

//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .empty-state {
//           text-align: center;
//           padding: 3rem 2rem;
//           color: #6c757d;
//         }

//         .empty-state-icon {
//           font-size: 4rem;
//           margin-bottom: 1rem;
//           opacity: 0.3;
//         }

//         @media (max-width: 768px) {
//           .instructors-page {
//             padding: 1rem;
//           }

//           .page-title {
//             font-size: 1.5rem;
//           }

//           .stats-value {
//             font-size: 1.5rem;
//           }

//           .schedule-table {
//             font-size: 0.75rem;
//           }

//           .time-badge {
//             font-size: 0.65rem;
//             padding: 0.2rem 0.4rem;
//           }
//         }
//       `}</style>

//       {/* Page Header */}
//       <div className="page-header animate-fade-in">
//         <Row className="align-items-center">
//           <Col>
//             <h1 className="page-title">
//               <Users size={32} className="me-3" />
//               Instructor Management Dashboard
//             </h1>
//             <p className="page-subtitle">
//               Manage instructors, assign courses, and view teaching schedules
//             </p>
//           </Col>
//           <Col xs="auto">
//             <Button 
//               variant="light" 
//               className="btn-refresh action-btn"
//               onClick={() => {
//                 fetchInstructors();
//                 fetchCourses();
//               }}
//             >
//               <RefreshCw size={18} className="me-2" />
//               Refresh
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       {/* Statistics Cards */}
//       <Row className="mb-4 g-3">
//         <Col md={4}>
//           <StatsCard
//             icon={Users}
//             title="Total Instructors"
//             value={instructors.length}
//             color="primary"
//           />
//         </Col>
//         <Col md={4}>
//           <StatsCard
//             icon={BookOpen}
//             title="Available Courses"
//             value={courses.length}
//             color="info"
//           />
//         </Col>
//         <Col md={4}>
//           <StatsCard
//             icon={Clock}
//             title="Active Schedules"
//             value={instructors.filter(i => i.schedule?.length > 0).length}
//             color="success"
//           />
//         </Col>
//       </Row>

//       {/* Notification Banner */}
//       <NotificationBanner 
//         message={message} 
//         onClose={() => setMessage(null)} 
//       />

//       {/* Add Instructor Form */}
//       <InstructorForm
//         name={name}
//         setName={setName}
//         courseId={courseId}
//         setCourseId={setCourseId}
//         courses={courses}
//         onSubmit={handleAddInstructor}
//         isLoading={isAdding}
//       />

//       {/* Search and Filter Bar */}
//       <div className="search-filter-bar animate-fade-in">
//         <Row className="g-3">
//           <Col md={8}>
//             <div className="position-relative">
//               <div className="search-icon-wrapper">
//                 <Search size={18} />
//               </div>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by instructor name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>
//           </Col>
//           <Col md={4}>
//             <Form.Select
//               value={filterCourse}
//               onChange={(e) => setFilterCourse(e.target.value)}
//               className="form-input"
//             >
//               <option value="">All Courses</option>
//               {courses.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.code}
//                 </option>
//               ))}
//             </Form.Select>
//           </Col>
//         </Row>
//       </div>

//       {/* Instructors Table */}
//       <Card className="instructors-table-card animate-fade-in">
//         <Card.Header className="table-header-custom">
//           <h5 className="mb-0">
//             Instructors List
//             {filteredInstructors.length > 0 && (
//               <Badge bg="light" text="dark" className="ms-2">
//                 {filteredInstructors.length}
//               </Badge>
//             )}
//           </h5>
//         </Card.Header>
//         <Card.Body className="p-0">
//           {isLoading ? (
//             <div className="p-4">
//               {[1, 2, 3].map((i) => (
//                 <LoadingSkeleton key={i} />
//               ))}
//             </div>
//           ) : filteredInstructors.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-state-icon">📚</div>
//               <h4>No Instructors Found</h4>
//               <p className="text-muted">
//                 {searchTerm || filterCourse
//                   ? "Try adjusting your search or filter"
//                   : "Add your first instructor to get started"}
//               </p>
//             </div>
//           ) : (
//             <Table responsive hover className="instructor-table mb-0">
//               <thead>
//                 <tr>
//                   <th style={{ width: "20%" }}>Instructor Name</th>
//                   <th style={{ width: "15%" }}>Course</th>
//                   <th style={{ width: "10%" }} className="text-center">Hours</th>
//                   <th style={{ width: "45%" }}>Weekly Schedule</th>
//                   <th style={{ width: "10%" }} className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredInstructors.map((ins) => (
//                   <tr key={ins.id}>
//                     <td className="align-middle">
//                       <div className="instructor-name">{ins.name}</div>
//                     </td>
//                     <td className="align-middle">
//                       <span className="course-badge">
//                         {courses.find(
//                           (c) => c.id === (ins.course_id || ins.courseId)
//                         )?.code || "-"}
//                       </span>
//                     </td>
//                     <td className="align-middle text-center">
//                       <span className="hours-badge">
//                         {calculateTotalHours(ins.schedule)}h
//                       </span>
//                     </td>
//                     <td className="align-middle">
//                       <ScheduleTable schedule={ins.schedule} />
//                     </td>
//                     <td className="align-middle text-center">
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         className="action-btn"
//                         onClick={() => setDeleteModal({ 
//                           show: true, 
//                           instructor: ins 
//                         })}
//                       >
//                         <Trash2 size={14} />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         show={deleteModal.show}
//         onHide={() => setDeleteModal({ show: false, instructor: null })}
//         onConfirm={() => handleDeleteInstructor(deleteModal.instructor?.id)}
//         instructorName={deleteModal.instructor?.name}
//       />
//     </div>
//   );
// };

// export default InstructorsPage;

//NEW function without title background
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Users,
//   Plus,
//   Trash2,
//   Edit,
//   RefreshCw,
//   Search,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   BookOpen,
//   Calendar,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   X
// } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };
// // Time slots configuration (7 AM - 7 PM)
// const SLOT_TIMES = Array.from({ length: 12 }, (_, i) => {
//   const start = 7 + i;
//   const end = start + 1;
//   const format = (h) => {
//     const period = h >= 12 ? "PM" : "AM";
//     const hr = h % 12 === 0 ? 12 : h % 12;
//     return `${hr}:00 ${period}`;
//   };
//   return `${format(start)} - ${format(end)}`;
// });

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // ========================================
// // 🎨 TOAST NOTIFICATION COMPONENT
// // ========================================
// const Toast = React.memo(({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const icons = {
//     success: <CheckCircle size={18} />,
//     error: <XCircle size={18} />,
//     info: <AlertCircle size={18} />
//   };

//   return (
//     <div className={`toast toast-${type}`}>
//       {icons[type]}
//       <span>{message}</span>
//       <button onClick={onClose} className="toast-close">×</button>
//     </div>
//   );
// });

// // ========================================
// // 📅 SCHEDULE GRID COMPONENT
// // ========================================
// const ScheduleGrid = React.memo(({ schedule }) => {
//   const getScheduleForSlot = useCallback((day, slotIndex) => {
//     return schedule.find(s => s.day === day && s.slot_index === slotIndex);
//   }, [schedule]);

//   return (
//     <div className="schedule-grid-container">
//       <table className="schedule-grid">
//         <thead>
//           <tr>
//             <th className="time-header">Time</th>
//             {DAYS.map((day) => (
//               <th key={day} className="day-header">{day.slice(0, 3)}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {SLOT_TIMES.map((time, slotIndex) => (
//             <tr key={slotIndex}>
//               <td className="time-cell">{time}</td>
//               {DAYS.map((day) => {
//                 const scheduleItem = getScheduleForSlot(day, slotIndex);
//                 const hasSchedule = !!scheduleItem;
                
//                 return (
//                   <td
//                     key={`${day}-${slotIndex}`}
//                     className={`schedule-cell ${hasSchedule ? 'occupied' : 'available'}`}
//                     title={hasSchedule ? `${scheduleItem.subject_code || 'Class'}` : 'Available'}
//                   >
//                     {hasSchedule && (
//                       <div className="schedule-indicator">
//                         <BookOpen size={14} />
//                       </div>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ========================================
// // 👨‍🏫 INSTRUCTOR ROW COMPONENT
// // ========================================
// const InstructorRow = React.memo(({ 
//   instructor, 
//   course,
//   onEdit, 
//   onDelete 
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const totalSlots = useMemo(() => {
//     return instructor.schedule?.length || 0;
//   }, [instructor.schedule]);

//   const activeDays = useMemo(() => {
//     if (!instructor.schedule || instructor.schedule.length === 0) return 0;
//     const uniqueDays = new Set(instructor.schedule.map(s => s.day));
//     return uniqueDays.size;
//   }, [instructor.schedule]);

//   return (
//     <>
//       <tr className="instructor-row">
//         <td>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="expand-btn"
//             aria-label={isExpanded ? "Collapse schedule" : "Expand schedule"}
//           >
//             {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </button>
//         </td>
//         <td>
//           <div className="instructor-info">
//             <Users size={16} className="instructor-icon" />
//             <strong>{instructor.name}</strong>
//           </div>
//         </td>
//         <td>
//           <span className="course-badge">{course?.code || "-"}</span>
//         </td>
//         <td className="text-center">
//           <span className="stat-badge stat-primary">{activeDays} days</span>
//         </td>
//         <td className="text-center">
//           <span className="stat-badge stat-secondary">{totalSlots} slots</span>
//         </td>
//         <td>
//           <div className="action-buttons">
//             <button
//               onClick={() => onEdit(instructor)}
//               className="btn-icon btn-edit"
//               title="Edit Instructor"
//             >
//               <Edit size={14} />
//             </button>
//             <button
//               onClick={() => onDelete(instructor)}
//               className="btn-icon btn-delete"
//               title="Delete Instructor"
//             >
//               <Trash2 size={14} />
//             </button>
//           </div>
//         </td>
//       </tr>
//       {isExpanded && (
//         <tr className="schedule-row">
//           <td colSpan="6">
//             <div className="schedule-container">
//               <h6 className="schedule-title">
//                 <Calendar size={16} />
//                 Weekly Schedule
//               </h6>
//               {instructor.schedule && instructor.schedule.length > 0 ? (
//                 <ScheduleGrid schedule={instructor.schedule} />
//               ) : (
//                 <div className="empty-schedule">
//                   <Clock size={32} />
//                   <p>No schedule assigned yet</p>
//                 </div>
//               )}
//             </div>
//           </td>
//         </tr>
//       )}
//     </>
//   );
// });

// // ========================================
// // ➕ ADD/EDIT INSTRUCTOR MODAL
// // ========================================
// const InstructorModal = React.memo(({ 
//   show, 
//   onClose, 
//   onSave, 
//   instructor,
//   courses,
//   isSubmitting 
// }) => {
//   const [formData, setFormData] = useState({ name: "", courseId: "" });
//   const [errors, setErrors] = useState({});

//   const isEditMode = !!instructor;

//   useEffect(() => {
//     if (instructor) {
//       setFormData({ 
//         name: instructor.name,
//         courseId: instructor.course_id || instructor.courseId || ""
//       });
//     } else {
//       setFormData({ name: "", courseId: "" });
//     }
//     setErrors({});
//   }, [instructor, show]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) {
//       newErrors.name = "Instructor name is required";
//     }
//     if (!formData.courseId) {
//       newErrors.courseId = "Please select a course";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(formData);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title">
//             <Users size={24} />
//             <h3>{isEditMode ? 'Edit Instructor' : 'Add New Instructor'}</h3>
//           </div>
//           <button onClick={onClose} className="close-btn">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="modal-body">
//           <div className="form-group">
//             <label htmlFor="instructorName">Instructor Name *</label>
//             <input
//               id="instructorName"
//               type="text"
//               placeholder="e.g., Dr. John Smith"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className={errors.name ? "input-error" : ""}
//               disabled={isSubmitting}
//               autoFocus
//             />
//             {errors.name && <span className="error-text">{errors.name}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="courseId">Course *</label>
//             <select
//               id="courseId"
//               value={formData.courseId}
//               onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
//               className={errors.courseId ? "input-error" : ""}
//               disabled={isSubmitting}
//             >
//               <option value="">Select a course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.code} - {course.name}
//                 </option>
//               ))}
//             </select>
//             {errors.courseId && <span className="error-text">{errors.courseId}</span>}
//           </div>

//           <div className="modal-footer">
//             <button
//               type="button"
//               onClick={onClose}
//               className="btn btn-secondary"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="spinner" />
//                   {isEditMode ? 'Updating...' : 'Adding...'}
//                 </>
//               ) : (
//                 <>
//                   {isEditMode ? <Edit size={16} /> : <Plus size={16} />}
//                   {isEditMode ? 'Update' : 'Add'} Instructor
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// });

// // ========================================
// // 🗑️ DELETE CONFIRMATION MODAL
// // ========================================
// const DeleteModal = React.memo(({ show, onClose, onConfirm, instructor, isDeleting }) => {
//   if (!show) return null;

//   const hasSchedule = instructor?.schedule?.length > 0;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title">
//             <AlertCircle size={24} className="text-danger" />
//             <h3>Confirm Deletion</h3>
//           </div>
//           <button onClick={onClose} className="close-btn">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <p>
//             Are you sure you want to delete <strong>{instructor?.name}</strong>?
//           </p>
//           {hasSchedule && (
//             <div className="warning-box">
//               <AlertCircle size={16} />
//               <span>
//                 This instructor has {instructor.schedule.length} scheduled class(es). 
//                 All schedules will be removed.
//               </span>
//             </div>
//           )}
//           <p className="text-muted">This action cannot be undone.</p>
//         </div>

//         <div className="modal-footer">
//           <button
//             onClick={onClose}
//             className="btn btn-secondary"
//             disabled={isDeleting}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="btn btn-danger"
//             disabled={isDeleting}
//           >
//             {isDeleting ? (
//               <>
//                 <div className="spinner" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <Trash2 size={16} />
//                 Delete Instructor
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ========================================
// // 🎯 MAIN COMPONENT
// // ========================================
// const InstructorsPage = () => {
//   // State management
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [toast, setToast] = useState(null);

//   // Modal states
//   const [showInstructorModal, setShowInstructorModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editingInstructor, setEditingInstructor] = useState(null);
//   const [deletingInstructor, setDeletingInstructor] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ========================================
//   // 📡 FETCH FUNCTIONS
//   // ========================================
//   const fetchInstructorSchedule = useCallback(async (id) => {
//     try {
//       const res = await fetch(`${API}/api/instructors/${id}/schedule`);
//       if (!res.ok) return [];
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//       return [];
//     }
//   }, []);

//   const fetchInstructors = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();

//       // Fetch schedules for all instructors
//       const withSchedules = await Promise.all(
//         data.map(async (ins) => {
//           const schedule = await fetchInstructorSchedule(ins.id);
//           return { ...ins, schedule };
//         })
//       );

//       setInstructors(withSchedules);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//       setError(err.message);
//       showToast("Failed to load instructors", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchInstructorSchedule]);

//   const fetchCourses = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       showToast("Failed to load courses", "error");
//     }
//   }, []);

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, [fetchInstructors, fetchCourses]);

//   // ========================================
//   // 🍞 TOAST HELPER
//   // ========================================
//   const showToast = useCallback((message, type = "info") => {
//     setToast({ message, type });
//   }, []);

//   const closeToast = useCallback(() => {
//     setToast(null);
//   }, []);

//   // ========================================
//   // 📊 FILTERED INSTRUCTORS
//   // ========================================
//   const filteredInstructors = useMemo(() => {
//     if (!searchQuery.trim()) return instructors;

//     return instructors.filter(instructor => {
//       const nameMatch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
//       const course = courses.find(c => c.id === (instructor.course_id || instructor.courseId));
//       const courseMatch = course?.code.toLowerCase().includes(searchQuery.toLowerCase());
//       return nameMatch || courseMatch;
//     });
//   }, [instructors, courses, searchQuery]);

//   // ========================================
//   // 📈 STATISTICS
//   // ========================================
//   const stats = useMemo(() => {
//     const totalInstructors = instructors.length;
//     const totalScheduledSlots = instructors.reduce((sum, ins) => 
//       sum + (ins.schedule?.length || 0), 0
//     );
//     const instructorsWithSchedule = instructors.filter(ins => 
//       ins.schedule && ins.schedule.length > 0
//     ).length;

//     return { totalInstructors, totalScheduledSlots, instructorsWithSchedule };
//   }, [instructors]);

//   // ========================================
//   // ➕ ADD/EDIT INSTRUCTOR
//   // ========================================
//   const handleSaveInstructor = useCallback(async (formData) => {
//     setIsSubmitting(true);

//     try {
//       const isEdit = !!editingInstructor;
//       const url = isEdit 
//         ? `${API}/api/instructors/${editingInstructor.id}`
//         : `${API}/api/instructors`;
//       const method = isEdit ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           courseId: Number(formData.courseId)
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || `Failed to ${isEdit ? 'update' : 'add'} instructor`);
//       }

//       const savedInstructor = await res.json();
//       const schedule = await fetchInstructorSchedule(savedInstructor.id);

//       if (isEdit) {
//         setInstructors(prev => prev.map(ins => 
//           ins.id === savedInstructor.id 
//             ? { ...savedInstructor, schedule }
//             : ins
//         ));
//       } else {
//         setInstructors(prev => [...prev, { ...savedInstructor, schedule }]);
//       }

//       setShowInstructorModal(false);
//       setEditingInstructor(null);
      
//       showToast(
//         `Instructor ${isEdit ? 'updated' : 'added'} successfully!`,
//         "success"
//       );
//     } catch (err) {
//       console.error("Save error:", err);
//       showToast(err.message, "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [editingInstructor, fetchInstructorSchedule, showToast]);

//   // ========================================
//   // 🗑️ DELETE INSTRUCTOR
//   // ========================================
//   const handleDeleteInstructor = useCallback(async () => {
//     if (!deletingInstructor) return;

//     setIsDeleting(true);

//     try {
//       const res = await fetch(`${API}/api/instructors/${deletingInstructor.id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to delete instructor");
//       }

//       setInstructors(prev => prev.filter(ins => ins.id !== deletingInstructor.id));
//       setShowDeleteModal(false);
//       setDeletingInstructor(null);
      
//       showToast("Instructor deleted successfully!", "success");
//     } catch (err) {
//       console.error("Delete error:", err);
//       showToast(err.message, "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   }, [deletingInstructor, showToast]);

//   // ========================================
//   // 🎬 MODAL HANDLERS
//   // ========================================
//   const openAddModal = useCallback(() => {
//     setEditingInstructor(null);
//     setShowInstructorModal(true);
//   }, []);

//   const openEditModal = useCallback((instructor) => {
//     setEditingInstructor(instructor);
//     setShowInstructorModal(true);
//   }, []);

//   const openDeleteModal = useCallback((instructor) => {
//     setDeletingInstructor(instructor);
//     setShowDeleteModal(true);
//   }, []);

//   const closeModals = useCallback(() => {
//     setShowInstructorModal(false);
//     setShowDeleteModal(false);
//     setEditingInstructor(null);
//     setDeletingInstructor(null);
//   }, []);

//   // ========================================
//   // 🔄 REFRESH HANDLER
//   // ========================================
//   const handleRefresh = useCallback(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, [fetchInstructors, fetchCourses]);

//   // ========================================
//   // 🎨 RENDER
//   // ========================================
//   return (
//     <div className="instructor-management">
//       {/* Toast Notifications */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={closeToast}
//         />
//       )}

//       {/* Header Section */}
//       <div className="page-header">
//         <div className="header-left">
//           <div className="header-icon">
//             <Users size={32} />
//           </div>
//           <div>
//             <h2 className="page-title">Instructor Management</h2>
//             <p className="page-subtitle">
//               Manage faculty members and their teaching schedules
//             </p>
//           </div>
//         </div>

//         <div className="header-actions">
//           <button
//             onClick={handleRefresh}
//             className="btn btn-outline"
//             disabled={loading}
//             title="Refresh"
//           >
//             <RefreshCw size={18} className={loading ? "spinning" : ""} />
//             Refresh
//           </button>
//           <button
//             onClick={openAddModal}
//             className="btn btn-primary"
//           >
//             <Plus size={18} />
//             Add Instructor
//           </button>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="stats-bar">
//         <div className="stat-card">
//           <Users size={20} />
//           <div>
//             <div className="stat-value">{stats.totalInstructors}</div>
//             <div className="stat-label">Total Instructors</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <Calendar size={20} />
//           <div>
//             <div className="stat-value">{stats.instructorsWithSchedule}</div>
//             <div className="stat-label">With Schedules</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <Clock size={20} />
//           <div>
//             <div className="stat-value">{stats.totalScheduledSlots}</div>
//             <div className="stat-label">Total Slots</div>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="controls-bar">
//         <div className="search-box">
//           <Search size={18} />
//           <input
//             type="text"
//             placeholder="Search by instructor name or course..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="clear-search"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="content-card">
//         {loading ? (
//           <div className="loading-state">
//             <div className="spinner-large" />
//             <p>Loading instructors...</p>
//           </div>
//         ) : error ? (
//           <div className="error-state">
//             <XCircle size={48} />
//             <h3>Error Loading Data</h3>
//             <p>{error}</p>
//             <button onClick={handleRefresh} className="btn btn-primary">
//               Try Again
//             </button>
//           </div>
//         ) : filteredInstructors.length === 0 ? (
//           <div className="empty-state">
//             <Users size={64} className="empty-icon" />
//             <h3>
//               {searchQuery 
//                 ? "No instructors match your search"
//                 : "No Instructors Yet"}
//             </h3>
//             <p>
//               {searchQuery 
//                 ? "Try adjusting your search criteria"
//                 : "Get started by adding your first instructor"}
//             </p>
//             {!searchQuery && (
//               <button onClick={openAddModal} className="btn btn-primary">
//                 <Plus size={18} />
//                 Add First Instructor
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="instructor-table">
//               <thead>
//                 <tr>
//                   <th style={{width: '50px'}}></th>
//                   <th>Instructor Name</th>
//                   <th>Course</th>
//                   <th className="text-center">Active Days</th>
//                   <th className="text-center">Teaching Slots</th>
//                   <th style={{width: '120px'}}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredInstructors.map((instructor) => {
//                   const course = courses.find(c => 
//                     c.id === (instructor.course_id || instructor.courseId)
//                   );
//                   return (
//                     <InstructorRow
//                       key={instructor.id}
//                       instructor={instructor}
//                       course={course}
//                       onEdit={openEditModal}
//                       onDelete={openDeleteModal}
//                     />
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <InstructorModal
//         show={showInstructorModal}
//         onClose={closeModals}
//         onSave={handleSaveInstructor}
//         instructor={editingInstructor}
//         courses={courses}
//         isSubmitting={isSubmitting}
//       />

//       <DeleteModal
//         show={showDeleteModal}
//         onClose={closeModals}
//         onConfirm={handleDeleteInstructor}
//         instructor={deletingInstructor}
//         isDeleting={isDeleting}
//       />

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//         }

//         .instructor-management {
//           max-width: 1600px;
//           margin: 0 auto;
//           padding: 24px;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//         }

//         /* Toast Notifications */
//         .toast {
//           position: fixed;
//           top: 24px;
//           right: 24px;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 16px 20px;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           z-index: 2000;
//           animation: slideIn 0.3s ease;
//           min-width: 300px;
//           max-width: 500px;
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100%);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .toast-success {
//           background: #d4edda;
//           color: #155724;
//           border-left: 4px solid #28a745;
//         }

//         .toast-error {
//           background: #f8d7da;
//           color: #721c24;
//           border-left: 4px solid #dc3545;
//         }

//         .toast-info {
//           background: #d1ecf1;
//           color: #0c5460;
//           border-left: 4px solid #17a2b8;
//         }

//         .toast-close {
//           margin-left: auto;
//           background: none;
//           border: none;
//           font-size: 1.5rem;
//           cursor: pointer;
//           opacity: 0.6;
//           transition: opacity 0.3s;
//         }

//         .toast-close:hover {
//           opacity: 1;
//         }

//         /* Header */
//         .page-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }

//         .header-left {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .header-icon {
//           background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
//           color: white;
//           padding: 12px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .page-title {
//           margin: 0;
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         .page-subtitle {
//           margin: 4px 0 0;
//           font-size: 0.9rem;
//           color: #6c757d;
//         }

//         .header-actions {
//           display: flex;
//           gap: 12px;
//         }

//         .btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 20px;
//           font-size: 0.95rem;
//           font-weight: 600;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
//           color: white;
//         }

//         .btn-primary:hover:not(:disabled) {
//           background: linear-gradient(135deg, #0096C7 0%, #0077B6 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//         }

//         .btn-outline {
//           background: white;
//           color: #0077B6;
//           border: 2px solid #0077B6;
//         }

//         .btn-outline:hover:not(:disabled) {
//           background: #f0f8ff;
//         }

//         .btn-secondary {
//           background: #6c757d;
//           color: white;
//         }

//         .btn-secondary:hover:not(:disabled) {
//           background: #5a6268;
//         }

//         .btn-danger {
//           background: #dc3545;
//           color: white;
//         }

//         .btn-danger:hover:not(:disabled) {
//           background: #c82333;
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* Stats Bar */
//         .stats-bar {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//           margin-bottom: 24px;
//         }

//         .stat-card {
//           background: white;
//           padding: 20px;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .stat-card svg {
//           color: #0077B6;
//           flex-shrink: 0;
//         }

//         .stat-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//           line-height: 1;
//         }

//         .stat-label {
//           font-size: 0.85rem;
//           color: #6c757d;
//           margin-top: 4px;
//         }

//         /* Controls Bar */
//         .controls-bar {
//           margin-bottom: 24px;
//         }

//         .search-box {
//           position: relative;
//           display: flex;
//           align-items: center;
//           max-width: 500px;
//         }

//         .search-box svg {
//           position: absolute;
//           left: 12px;
//           color: #6c757d;
//           pointer-events: none;
//         }

//         .search-box input {
//           width: 100%;
//           padding: 12px 40px 12px 40px;
//           border: 2px solid #dee2e6;
//           border-radius: 8px;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .search-box input:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
//         }

//         .clear-search {
//           position: absolute;
//           right: 8px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #6c757d;
//           padding: 4px;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .clear-search:hover {
//           background: #f8f9fa;
//           color: #dc3545;
//         }

//         /* Content Card */
//         .content-card {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
//           overflow: hidden;
//         }

//         .loading-state,
//         .error-state,
//         .empty-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 60px 20px;
//           gap: 16px;
//         }

//         .loading-state p,
//         .error-state p,
//         .empty-state p {
//           color: #6c757d;
//           margin: 0;
//         }

//         .error-state h3 {
//           color: #dc3545;
//           margin: 8px 0;
//         }

//         .error-state svg {
//           color: #dc3545;
//         }

//         .empty-state h3 {
//           color: #03045E;
//           margin: 8px 0;
//         }

//         .empty-icon {
//           color: #0077B6;
//           opacity: 0.5;
//         }

//         .spinner-large {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #0077B6;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid currentColor;
//           border-top: 2px solid transparent;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         /* Table */
//         .table-container {
//           overflow-x: auto;
//         }

//         .instructor-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .instructor-table thead {
//           background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
//           border-bottom: 2px solid #dee2e6;
//         }

//         .instructor-table th {
//           padding: 16px 20px;
//           text-align: left;
//           font-size: 0.9rem;
//           font-weight: 700;
//           color: #03045E;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .instructor-table th.text-center {
//           text-align: center;
//         }

//         .instructor-row {
//           border-bottom: 1px solid #e9ecef;
//           transition: all 0.3s ease;
//         }

//         .instructor-row:hover {
//           background: #f8f9fa;
//         }

//         .instructor-row td {
//           padding: 16px 20px;
//           vertical-align: middle;
//         }

//         .expand-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #6c757d;
//           transition: all 0.3s ease;
//         }

//         .expand-btn:hover {
//           color: #0077B6;
//           background: #f0f8ff;
//           border-radius: 4px;
//         }

//         .instructor-info {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .instructor-icon {
//           color: #0077B6;
//         }

//         .course-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
//           color: #0277bd;
//           border-radius: 12px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .stat-badge {
//           display: inline-block;
//           padding: 4px 10px;
//           border-radius: 12px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .stat-primary {
//           background: #e3f2fd;
//           color: #0277bd;
//         }

//         .stat-secondary {
//           background: #f3e5f5;
//           color: #6a1b9a;
//         }

//         .text-center {
//           text-align: center;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 8px;
//           justify-content: center;
//         }

//         .btn-icon {
//           padding: 8px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//         }

//         .btn-edit {
//           background: #e3f2fd;
//           color: #0277bd;
//         }

//         .btn-edit:hover {
//           background: #0277bd;
//           color: white;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(2, 119, 189, 0.3);
//         }

//         .btn-delete {
//           background: #ffebee;
//           color: #c62828;
//         }

//         .btn-delete:hover {
//           background: #c62828;
//           color: white;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(198, 40, 40, 0.3);
//         }

//         /* Schedule Row */
//         .schedule-row {
//           background: #f8f9fa;
//           border-bottom: 2px solid #dee2e6 !important;
//         }

//         .schedule-row td {
//           padding: 24px !important;
//         }

//         .schedule-container {
//           background: white;
//           border-radius: 8px;
//           padding: 20px;
//         }

//         .schedule-title {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin: 0 0 16px 0;
//           font-size: 1rem;
//           font-weight: 600;
//           color: #03045E;
//         }

//         .schedule-title svg {
//           color: #0077B6;
//         }

//         /* Schedule Grid */
//         .schedule-grid-container {
//           overflow-x: auto;
//           border-radius: 8px;
//           border: 1px solid #dee2e6;
//         }

//         .schedule-grid {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.85rem;
//         }

//         .schedule-grid thead {
//           background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
//           color: white;
//         }

//         .schedule-grid th {
//           padding: 10px 8px;
//           text-align: center;
//           font-weight: 600;
//           font-size: 0.8rem;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .time-header {
//           min-width: 120px;
//           text-align: left !important;
//           padding-left: 12px !important;
//         }

//         .day-header {
//           min-width: 60px;
//         }

//         .schedule-grid tbody tr:nth-child(even) {
//           background: #f8f9fa;
//         }

//         .schedule-grid td {
//           padding: 8px;
//           text-align: center;
//           border: 1px solid #dee2e6;
//         }

//         .time-cell {
//           font-weight: 600;
//           color: #495057;
//           text-align: left;
//           padding-left: 12px;
//           font-size: 0.8rem;
//         }

//         .schedule-cell {
//           position: relative;
//           min-height: 40px;
//           transition: all 0.3s ease;
//         }

//         .schedule-cell.available {
//           background: white;
//         }

//         .schedule-cell.available:hover {
//           background: #f0f8ff;
//         }

//         .schedule-cell.occupied {
//           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
//         }

//         .schedule-indicator {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #0277bd;
//         }

//         .empty-schedule {
//           text-align: center;
//           padding: 40px 20px;
//           color: #6c757d;
//         }

//         .empty-schedule svg {
//           color: #0077B6;
//           opacity: 0.5;
//           margin-bottom: 12px;
//         }

//         .empty-schedule p {
//           margin: 0;
//         }

//         /* Modal Styles */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           animation: fadeIn 0.3s ease;
//           backdrop-filter: blur(4px);
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .modal-content {
//           background: white;
//           border-radius: 16px;
//           max-width: 600px;
//           width: 90%;
//           max-height: 90vh;
//           overflow: auto;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//           animation: modalSlideUp 0.4s ease;
//         }

//         .modal-sm {
//           max-width: 450px;
//         }

//         @keyframes modalSlideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         .modal-header {
//           padding: 24px 28px;
//           border-bottom: 1px solid #e9ecef;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
//         }

//         .modal-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin: 0;
//         }

//         .modal-title h3 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         .modal-title svg {
//           color: #0077B6;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #6c757d;
//           width: 36px;
//           height: 36px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 6px;
//           transition: all 0.3s;
//         }

//         .close-btn:hover {
//           background: #f8f9fa;
//           color: #dc3545;
//         }

//         .modal-body {
//           padding: 28px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: #495057;
//         }

//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 12px 16px;
//           border: 2px solid #dee2e6;
//           border-radius: 8px;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
//         }

//         .input-error {
//           border-color: #dc3545 !important;
//         }

//         .error-text {
//           display: block;
//           margin-top: 6px;
//           font-size: 0.85rem;
//           color: #dc3545;
//         }

//         .modal-footer {
//           padding: 20px 28px;
//           border-top: 1px solid #e9ecef;
//           display: flex;
//           justify-content: flex-end;
//           gap: 12px;
//           background: #f8f9fa;
//         }

//         .warning-box {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 16px;
//           background: #fff3cd;
//           border-left: 4px solid #ffc107;
//           border-radius: 8px;
//           margin: 16px 0;
//           font-size: 0.9rem;
//           color: #856404;
//         }

//         .warning-box svg {
//           color: #ffc107;
//           flex-shrink: 0;
//           margin-top: 2px;
//         }

//         .text-danger {
//           color: #dc3545;
//         }

//         .text-muted {
//           color: #6c757d;
//           font-size: 0.9rem;
//         }

//         /* Responsive Design */
//         @media (max-width: 1200px) {
//           .schedule-grid th,
//           .schedule-grid td {
//             font-size: 0.75rem;
//             padding: 6px;
//           }

//           .time-cell {
//             font-size: 0.7rem;
//           }

//           .day-header {
//             min-width: 50px;
//           }
//         }

//         @media (max-width: 992px) {
//           .page-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .header-actions {
//             width: 100%;
//             justify-content: flex-end;
//           }

//           .stats-bar {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 768px) {
//           .instructor-management {
//             padding: 16px;
//           }

//           .page-title {
//             font-size: 1.5rem;
//           }

//           .header-actions {
//             flex-direction: column;
//             width: 100%;
//           }

//           .header-actions button {
//             width: 100%;
//           }

//           .instructor-table th,
//           .instructor-table td {
//             padding: 12px;
//             font-size: 0.85rem;
//           }

//           .modal-content {
//             width: 95%;
//             max-height: 95vh;
//           }

//           .modal-header,
//           .modal-body,
//           .modal-footer {
//             padding: 20px;
//           }

//           .schedule-grid-container {
//             font-size: 0.7rem;
//           }

//           .schedule-grid th {
//             padding: 8px 4px;
//           }

//           .schedule-grid td {
//             padding: 6px 4px;
//           }

//           .time-cell {
//             font-size: 0.65rem;
//             padding: 6px 8px;
//           }

//           .day-header {
//             min-width: 40px;
//           }
//         }

//         @media (max-width: 576px) {
//           .stats-bar {
//             gap: 12px;
//           }

//           .stat-card {
//             padding: 16px;
//           }

//           .stat-value {
//             font-size: 1.5rem;
//           }

//           .instructor-table {
//             font-size: 0.8rem;
//           }

//           .instructor-info {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 6px;
//           }

//           .action-buttons {
//             flex-direction: column;
//             width: 100%;
//           }

//           .btn-icon {
//             width: 100%;
//             justify-content: center;
//           }

//           .schedule-container {
//             padding: 12px;
//           }

//           .schedule-title {
//             font-size: 0.9rem;
//           }
//         }

//         /* Accessibility */
//         @media (prefers-reduced-motion: reduce) {
//           *,
//           *::before,
//           *::after {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }

//         *:focus-visible {
//           outline: 2px solid #0077B6;
//           outline-offset: 2px;
//         }

//         input:focus-visible,
//         select:focus-visible {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
//         }

//         /* Print Styles */
//         @media print {
//           .page-header,
//           .stats-bar,
//           .controls-bar,
//           .action-buttons,
//           .expand-btn,
//           .btn {
//             display: none !important;
//           }

//           .content-card {
//             box-shadow: none;
//           }

//           .instructor-table {
//             font-size: 10pt;
//           }

//           .schedule-row {
//             page-break-inside: avoid;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InstructorsPage;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
// import { API } from '../../config/api';


const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const API_BASE =
//   process.env.REACT_APP_API_URL ||
//   (window.location.hostname === 'localhost'
//     ? 'http://localhost:5000'
//     : 'https://lavenderblush-chinchilla-571128.hostingersite.com ');

const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

// Time slots configuration (7 AM - 7 PM)
const SLOT_TIMES = Array.from({ length: 12 }, (_, i) => {
  const start = 7 + i;
  const end = start + 1;
  const format = (h) => {
    const period = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return `${hr}:00 ${period}`;
  };
  return `${format(start)} - ${format(end)}`;
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ========================================
// 🎨 TOAST NOTIFICATION COMPONENT
// ========================================
const Toast = React.memo(({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <AlertCircle size={18} />
  };

  return (
    <div className={`toast toast-${type}`}>
      {icons[type]}
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
});

// ========================================
// 📅 SCHEDULE GRID COMPONENT
// ========================================
const ScheduleGrid = React.memo(({ schedule }) => {
  const getScheduleForSlot = useCallback((day, slotIndex) => {
    return schedule.find(s => s.day === day && s.slot_index === slotIndex);
  }, [schedule]);

  return (
    <div className="schedule-grid-container">
      <table className="schedule-grid">
        <thead>
          <tr>
            <th className="time-header">Time</th>
            {DAYS.map((day) => (
              <th key={day} className="day-header">{day.slice(0, 3)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOT_TIMES.map((time, slotIndex) => (
            <tr key={slotIndex}>
              <td className="time-cell">{time}</td>
              {DAYS.map((day) => {
                const scheduleItem = getScheduleForSlot(day, slotIndex);
                const hasSchedule = !!scheduleItem;
                
                return (
                  <td
                    key={`${day}-${slotIndex}`}
                    className={`schedule-cell ${hasSchedule ? 'occupied' : 'available'}`}
                    title={hasSchedule ? `${scheduleItem.subject_code || 'Class'}` : 'Available'}
                  >
                    {hasSchedule && (
                      <div className="schedule-indicator">
                        <BookOpen size={14} />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ========================================
// 👨‍🏫 INSTRUCTOR ROW COMPONENT
// ========================================
const InstructorRow = React.memo(({ 
  instructor, 
  course,
  onEdit, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalSlots = useMemo(() => {
    return instructor.schedule?.length || 0;
  }, [instructor.schedule]);

  const activeDays = useMemo(() => {
    if (!instructor.schedule || instructor.schedule.length === 0) return 0;
    const uniqueDays = new Set(instructor.schedule.map(s => s.day));
    return uniqueDays.size;
  }, [instructor.schedule]);

  return (
    <>
      <tr className="instructor-row">
        <td>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-btn"
            aria-label={isExpanded ? "Collapse schedule" : "Expand schedule"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td>
          <div className="instructor-info">
            <Users size={16} className="instructor-icon" />
            <strong>{instructor.name}</strong>
          </div>
        </td>
        <td>
          <span className="course-badge">{course?.code || "-"}</span>
        </td>
        <td className="text-center">
          <span className="stat-badge stat-primary">{activeDays} days</span>
        </td>
        <td className="text-center">
          <span className="stat-badge stat-secondary">{totalSlots} slots</span>
        </td>
        <td>
          <div className="action-buttons">
            <button
              onClick={() => onEdit(instructor)}
              className="btn-icon btn-edit"
              title="Edit Instructor"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => onDelete(instructor)}
              className="btn-icon btn-delete"
              title="Delete Instructor"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="schedule-row">
          <td colSpan="6">
            <div className="schedule-container">
              <h6 className="schedule-title">
                <Calendar size={16} />
                Weekly Schedule
              </h6>
              {instructor.schedule && instructor.schedule.length > 0 ? (
                <ScheduleGrid schedule={instructor.schedule} />
              ) : (
                <div className="empty-schedule">
                  <Clock size={32} />
                  <p>No schedule assigned yet</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
});

// ========================================
// ➕ ADD/EDIT INSTRUCTOR MODAL
// ========================================
const InstructorModal = React.memo(({ 
  show, 
  onClose, 
  onSave, 
  instructor,
  courses,
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({ name: "", courseId: "" });
  const [errors, setErrors] = useState({});

  const isEditMode = !!instructor;

  useEffect(() => {
    if (instructor) {
      setFormData({ 
        name: instructor.name,
        courseId: instructor.course_id || instructor.courseId || ""
      });
    } else {
      setFormData({ name: "", courseId: "" });
    }
    setErrors({});
  }, [instructor, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Instructor name is required";
    }
    if (!formData.courseId) {
      newErrors.courseId = "Please select a course";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <div className="modal-title">
            <Users size={24} />
            <h3>{isEditMode ? 'Edit Instructor' : 'Add New Instructor'}</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="instructorName">Instructor Name *</label>
            <input
              id="instructorName"
              type="text"
              placeholder="e.g., Dr. John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "input-error" : ""}
              disabled={isSubmitting}
              autoFocus
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="courseId">Course *</label>
            <select
              id="courseId"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              className={errors.courseId ? "input-error" : ""}
              disabled={isSubmitting}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
            {errors.courseId && <span className="error-text">{errors.courseId}</span>}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  {isEditMode ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {isEditMode ? <Edit size={16} /> : <Plus size={16} />}
                  {isEditMode ? 'Update' : 'Add'} Instructor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// ========================================
// 🗑️ DELETE CONFIRMATION MODAL
// ========================================
const DeleteModal = React.memo(({ show, onClose, onConfirm, instructor, isDeleting }) => {
  if (!show) return null;

  const hasSchedule = instructor?.schedule?.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <div className="modal-title">
            <AlertCircle size={24} className="text-danger" />
            <h3>Confirm Deletion</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{instructor?.name}</strong>?
          </p>
          {hasSchedule && (
            <div className="warning-box">
              <AlertCircle size={16} />
              <span>
                This instructor has {instructor.schedule.length} scheduled class(es). 
                All schedules will be removed.
              </span>
            </div>
          )}
          <p className="text-muted">This action cannot be undone.</p>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="spinner" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Instructor
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// ========================================
// 🎯 MAIN COMPONENT
// ========================================
const InstructorsPage = () => {
  // State management
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // Modal states
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [deletingInstructor, setDeletingInstructor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ========================================
  // 📡 FETCH FUNCTIONS
  // ========================================
  const fetchInstructorSchedule = useCallback(async (id) => {
    try {
      const res = await fetch(`${API}/api/instructors/${id}/schedule`);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error("Error fetching schedule:", err);
      return [];
    }
  }, []);

  const fetchInstructors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API}/api/instructors`);
      if (!res.ok) throw new Error("Failed to fetch instructors");
      const data = await res.json();

      // Fetch schedules for all instructors
      const withSchedules = await Promise.all(
        data.map(async (ins) => {
          const schedule = await fetchInstructorSchedule(ins.id);
          return { ...ins, schedule };
        })
      );

      setInstructors(withSchedules);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError(err.message);
      showToast("Failed to load instructors", "error");
    } finally {
      setLoading(false);
    }
  }, [fetchInstructorSchedule]);

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      showToast("Failed to load courses", "error");
    }
  }, []);

  useEffect(() => {
    fetchInstructors();
    fetchCourses();
  }, [fetchInstructors, fetchCourses]);

  // ========================================
  // 🍞 TOAST HELPER
  // ========================================
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // ========================================
  // 📊 FILTERED INSTRUCTORS
  // ========================================
  const filteredInstructors = useMemo(() => {
    if (!searchQuery.trim()) return instructors;

    return instructors.filter(instructor => {
      const nameMatch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const course = courses.find(c => c.id === (instructor.course_id || instructor.courseId));
      const courseMatch = course?.code.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || courseMatch;
    });
  }, [instructors, courses, searchQuery]);

  // ========================================
  // 📈 STATISTICS
  // ========================================
  const stats = useMemo(() => {
    const totalInstructors = instructors.length;
    const totalScheduledSlots = instructors.reduce((sum, ins) => 
      sum + (ins.schedule?.length || 0), 0
    );
    const instructorsWithSchedule = instructors.filter(ins => 
      ins.schedule && ins.schedule.length > 0
    ).length;

    return { totalInstructors, totalScheduledSlots, instructorsWithSchedule };
  }, [instructors]);

  // ========================================
  // ➕ ADD/EDIT INSTRUCTOR
  // ========================================
  const handleSaveInstructor = useCallback(async (formData) => {
    setIsSubmitting(true);

    try {
      const isEdit = !!editingInstructor;
      const url = isEdit 
        ? `${API}/api/instructors/${editingInstructor.id}`
        : `${API}/api/instructors`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          courseId: Number(formData.courseId)
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to ${isEdit ? 'update' : 'add'} instructor`);
      }

      const savedInstructor = await res.json();
      const schedule = await fetchInstructorSchedule(savedInstructor.id);

      if (isEdit) {
        setInstructors(prev => prev.map(ins => 
          ins.id === savedInstructor.id 
            ? { ...savedInstructor, schedule }
            : ins
        ));
      } else {
        setInstructors(prev => [...prev, { ...savedInstructor, schedule }]);
      }

      setShowInstructorModal(false);
      setEditingInstructor(null);
      
      showToast(
        `Instructor ${isEdit ? 'updated' : 'added'} successfully!`,
        "success"
      );
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [editingInstructor, fetchInstructorSchedule, showToast]);

  // ========================================
  // 🗑️ DELETE INSTRUCTOR
  // ========================================
  const handleDeleteInstructor = useCallback(async () => {
    if (!deletingInstructor) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`${API}/api/instructors/${deletingInstructor.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete instructor");
      }

      setInstructors(prev => prev.filter(ins => ins.id !== deletingInstructor.id));
      setShowDeleteModal(false);
      setDeletingInstructor(null);
      
      showToast("Instructor deleted successfully!", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingInstructor, showToast]);

  // ========================================
  // 🎬 MODAL HANDLERS
  // ========================================
  const openAddModal = useCallback(() => {
    setEditingInstructor(null);
    setShowInstructorModal(true);
  }, []);

  const openEditModal = useCallback((instructor) => {
    setEditingInstructor(instructor);
    setShowInstructorModal(true);
  }, []);

  const openDeleteModal = useCallback((instructor) => {
    setDeletingInstructor(instructor);
    setShowDeleteModal(true);
  }, []);

  const closeModals = useCallback(() => {
    setShowInstructorModal(false);
    setShowDeleteModal(false);
    setEditingInstructor(null);
    setDeletingInstructor(null);
  }, []);

  // ========================================
  // 🔄 REFRESH HANDLER
  // ========================================
  const handleRefresh = useCallback(() => {
    fetchInstructors();
    fetchCourses();
  }, [fetchInstructors, fetchCourses]);

  // ========================================
  // 🎨 RENDER
  // ========================================
  return (
    <div className="instructor-management">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      {/* Header Section with Gradient */}
      <div className="page-header-instructor">
        <div className="page-title-section-gradient-instructor">
          <div className="page-title-content-instructor">
            <h1 className="page-title-gradient-instructor">
              <Users size={36} />
              Instructor Management
            </h1>
            <p className="page-subtitle-gradient-instructor">
              Manage faculty members and their teaching schedules
            </p>
          </div>
          <div className="header-actions">
            <button
              onClick={handleRefresh}
              className="action-btn-instructor"
              disabled={loading}
              title="Refresh"
            >
              <RefreshCw size={18} className={loading ? "spinning" : ""} />
              Refresh
            </button>
            <button
              onClick={openAddModal}
              className="action-btn-instructor"
            >
              <Plus size={18} />
              Add Instructor
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <Users size={20} />
          <div>
            <div className="stat-value">{stats.totalInstructors}</div>
            <div className="stat-label">Total Instructors</div>
          </div>
        </div>
        <div className="stat-card">
          <Calendar size={20} />
          <div>
            <div className="stat-value">{stats.instructorsWithSchedule}</div>
            <div className="stat-label">With Schedules</div>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={20} />
          <div>
            <div className="stat-value">{stats.totalScheduledSlots}</div>
            <div className="stat-label">Total Slots</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by instructor name or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large" />
            <p>Loading instructors...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <XCircle size={48} />
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={handleRefresh} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : filteredInstructors.length === 0 ? (
          <div className="empty-state">
            <Users size={64} className="empty-icon" />
            <h3>
              {searchQuery 
                ? "No instructors match your search"
                : "No Instructors Yet"}
            </h3>
            <p>
              {searchQuery 
                ? "Try adjusting your search criteria"
                : "Get started by adding your first instructor"}
            </p>
            {!searchQuery && (
              <button onClick={openAddModal} className="btn btn-primary">
                <Plus size={18} />
                Add First Instructor
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="instructor-table">
              <thead>
                <tr>
                  <th style={{width: '50px'}}></th>
                  <th>Instructor Name</th>
                  <th>Course</th>
                  <th className="text-center">Active Days</th>
                  <th className="text-center">Teaching Slots</th>
                  <th style={{width: '120px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstructors.map((instructor) => {
                  const course = courses.find(c => 
                    c.id === (instructor.course_id || instructor.courseId)
                  );
                  return (
                    <InstructorRow
                      key={instructor.id}
                      instructor={instructor}
                      course={course}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <InstructorModal
        show={showInstructorModal}
        onClose={closeModals}
        onSave={handleSaveInstructor}
        instructor={editingInstructor}
        courses={courses}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleDeleteInstructor}
        instructor={deletingInstructor}
        isDeleting={isDeleting}
      />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .instructor-management {
          max-width: 1600px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
        }

        /* Page Header with Gradient */
        .page-header-instructor {
          margin-bottom: 2rem;
        }

        .page-title-section-gradient-instructor {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title-content-instructor {
          color: white;
        }

        .page-title-gradient-instructor {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .page-subtitle-gradient-instructor {
          font-size: 1.05rem;
          color: white;
          margin: 0;
          opacity: 0.9;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn-instructor {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          font-size: 0.95rem;
        }

        .action-btn-instructor:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .action-btn-instructor:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Toast Notifications */
        .toast {
          position: fixed;
          top: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 2000;
          animation: slideIn 0.3s ease;
          min-width: 300px;
          max-width: 500px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .toast-success {
          background: #d4edda;
          color: #155724;
          border-left: 4px solid #28a745;
        }

        .toast-error {
          background: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }

        .toast-info {
          background: #d1ecf1;
          color: #0c5460;
          border-left: 4px solid #17a2b8;
        }

        .toast-close {
          margin-left: auto;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .toast-close:hover {
          opacity: 1;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Stats Bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-card svg {
          color: #0077B6;
          flex-shrink: 0;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #03045E;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #6c757d;
          margin-top: 4px;
        }

        /* Controls Bar */
        .controls-bar {
          margin-bottom: 24px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 500px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          color: #6c757d;
          pointer-events: none;
        }

        .search-box input {
          width: 100%;
          padding: 12px 40px 12px 40px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6c757d;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-search:hover {
          background: #f8f9fa;
          color: #dc3545;
        }

        /* Content Card */
        .content-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .loading-state,
        .error-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 16px;
        }

        .loading-state p,
        .error-state p,
        .empty-state p {
          color: #6c757d;
          margin: 0;
        }

        .error-state h3 {
          color: #dc3545;
          margin: 8px 0;
        }

        .error-state svg {
          color: #dc3545;
        }

        .empty-state h3 {
          color: #03045E;
          margin: 8px 0;
        }

        .empty-icon {
          color: #0077B6;
          opacity: 0.5;
        }

        .spinner-large {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0077B6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #0096C7 0%, #0077B6 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: #c82333;
        }

        /* Table */
        .table-container {
          overflow-x: auto;
        }

        .instructor-table {
          width: 100%;
          border-collapse: collapse;
        }

        .instructor-table thead {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 2px solid #dee2e6;
        }

        .instructor-table th {
          padding: 16px 20px;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 700;
          color: #03045E;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .instructor-table th.text-center {
          text-align: center;
        }

        .instructor-row {
          border-bottom: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .instructor-row:hover {
          background: #f8f9fa;
        }

        .instructor-row td {
          padding: 16px 20px;
          vertical-align: middle;
        }

        .expand-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
          transition: all 0.3s ease;
        }

        .expand-btn:hover {
          color: #0077B6;
          background: #f0f8ff;
          border-radius: 4px;
        }

        .instructor-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .instructor-icon {
          color: #0077B6;
        }

        .course-badge {
          display: inline-block;
          padding: 4px 12px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          color: #0277bd;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-primary {
          background: #e3f2fd;
          color: #0277bd;
        }

        .stat-secondary {
          background: #f3e5f5;
          color: #6a1b9a;
        }

        .text-center {
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .btn-icon {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-edit {
          background: #e3f2fd;
          color: #0277bd;
        }

        .btn-edit:hover {
          background: #0277bd;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(2, 119, 189, 0.3);
        }

        .btn-delete {
          background: #ffebee;
          color: #c62828;
        }

        .btn-delete:hover {
          background: #c62828;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(198, 40, 40, 0.3);
        }

        /* Schedule Row */
        .schedule-row {
          background: #f8f9fa;
          border-bottom: 2px solid #dee2e6 !important;
        }

        .schedule-row td {
          padding: 24px !important;
        }

        .schedule-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
        }

        .schedule-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 1rem;
          font-weight: 600;
          color: #03045E;
        }

        .schedule-title svg {
          color: #0077B6;
        }

        /* Schedule Grid */
        .schedule-grid-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .schedule-grid {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }

        .schedule-grid thead {
          background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
          color: white;
        }

        .schedule-grid th {
          padding: 10px 8px;
          text-align: center;
          font-weight: 600;
          font-size: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .time-header {
          min-width: 120px;
          text-align: left !important;
          padding-left: 12px !important;
        }

        .day-header {
          min-width: 60px;
        }

        .schedule-grid tbody tr:nth-child(even) {
          background: #f8f9fa;
        }

        .schedule-grid td {
          padding: 8px;
          text-align: center;
          border: 1px solid #dee2e6;
        }

        .time-cell {
          font-weight: 600;
          color: #495057;
          text-align: left;
          padding-left: 12px;
          font-size: 0.8rem;
        }

        .schedule-cell {
          position: relative;
          min-height: 40px;
          transition: all 0.3s ease;
        }

        .schedule-cell.available {
          background: white;
        }

        .schedule-cell.available:hover {
          background: #f0f8ff;
        }

        .schedule-cell.occupied {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        }

        .schedule-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0277bd;
        }

        .empty-schedule {
          text-align: center;
          padding: 40px 20px;
          color: #6c757d;
        }

        .empty-schedule svg {
          color: #0077B6;
          opacity: 0.5;
          margin-bottom: 12px;
        }

        .empty-schedule p {
          margin: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(4px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideUp 0.4s ease;
        }

        .modal-sm {
          max-width: 450px;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header-custom {
          padding: 24px 28px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .modal-title h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .modal-title svg {
          color: white;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          cursor: pointer;
          color: white;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .modal-body {
          padding: 28px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #495057;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
        }

        .input-error {
          border-color: #dc3545 !important;
        }

        .error-text {
          display: block;
          margin-top: 6px;
          font-size: 0.85rem;
          color: #dc3545;
        }

        .modal-footer {
          padding: 20px 28px;
          border-top: 1px solid #e9ecef;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: #f8f9fa;
        }

        .warning-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          border-radius: 8px;
          margin: 16px 0;
          font-size: 0.9rem;
          color: #856404;
        }

        .warning-box svg {
          color: #ffc107;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .text-danger {
          color: #dc3545;
        }

        .text-muted {
          color: #6c757d;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .page-title-section-gradient-instructor {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .action-btn-instructor {
            flex: 1;
            justify-content: center;
          }

          .stats-bar {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .instructor-management {
            padding: 1rem;
          }

          .page-title-gradient-instructor {
            font-size: 2rem;
          }

          .instructor-table th,
          .instructor-table td {
            padding: 12px;
            font-size: 0.85rem;
          }

          .modal-content {
            width: 95%;
            max-height: 95vh;
          }

          .modal-header-custom,
          .modal-body,
          .modal-footer {
            padding: 20px;
          }

          .schedule-grid-container {
            font-size: 0.7rem;
          }

          .schedule-grid th {
            padding: 8px 4px;
          }

          .schedule-grid td {
            padding: 6px 4px;
          }

          .time-cell {
            font-size: 0.65rem;
            padding: 6px 8px;
          }

          .day-header {
            min-width: 40px;
          }
        }

        @media (max-width: 576px) {
          .instructor-management {
            padding: 0.5rem;
          }

          .page-title-gradient-instructor {
            font-size: 1.5rem;
          }

          .stats-bar {
            gap: 12px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .instructor-table {
            font-size: 0.8rem;
          }

          .instructor-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .action-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn-icon {
            width: 100%;
            justify-content: center;
          }

          .schedule-container {
            padding: 12px;
          }

          .schedule-title {
            font-size: 0.9rem;
          }
        }

        /* Accessibility */
        *:focus-visible {
          outline: 2px solid #0077B6;
          outline-offset: 2px;
        }

        input:focus-visible,
        select:focus-visible {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
        }
      `}</style>
    </div>
  );
};

export default InstructorsPage;