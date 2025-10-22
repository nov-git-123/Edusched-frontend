// // src/components/SchedulePage.js
// import React, { useState, useEffect } from 'react';
// import { Button, Card, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // simple timeslots for display (must match backend timeslots)
// const TIMES = [
//   { key: '08:00:00', label: '08:00 - 09:30' },
//   { key: '09:30:00', label: '09:30 - 11:00' },
//   { key: '13:00:00', label: '13:00 - 14:30' },
//   { key: '14:30:00', label: '14:30 - 16:00' }
// ];

// const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// export default function SchedulePage() {
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [running, setRunning] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [schedule, setSchedule] = useState([]);

//   const loadSchedule = async () => {
//     try {
//       const res = await fetch(`${API}/api/schedule`);
//       const data = await res.json();
//       setSchedule(data);
//     } catch (err) {
//       console.error('loadSchedule', err);
//     }
//   };

//   useEffect(() => {
//     loadSchedule();
//   }, []);

//   const handleGenerate = async () => {
//     setMessage(null);
//     setRunning(true);
//     try {
//       const res = await fetch(`${API}/api/schedule/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ yearLevel, semester })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage({ type: 'success', text: `Generated: ${data.assigned} assigned, ${data.unassigned?.length || 0} unassigned.` });
//         await loadSchedule();
//       } else {
//         setMessage({ type: 'danger', text: data.error || 'Generation failed' });
//       }
//     } catch (err) {
//       console.error('generate error', err);
//       setMessage({ type: 'danger', text: 'Server error while generating schedule' });
//     } finally {
//       setRunning(false);
//     }
//   };

//   // organize schedule into map for grid display
//   const scheduleMap = {};
//   schedule.forEach(row => {
//     const key = `${row.day}_${row.start_time}`;
//     scheduleMap[key] = scheduleMap[key] || [];
//     scheduleMap[key].push(row);
//   });

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         <Row className="align-items-center mb-3">
//           <Col>
//             <h5 className="mb-0">📅 Schedule Generator</h5>
//             <small className="text-muted d-block">Generate timetable for subjects (basic greedy solver).</small>
//           </Col>
//           <Col md="auto">
//             <Button variant="primary" onClick={handleGenerate} disabled={running}>
//               {running ? <><Spinner animation="border" size="sm" /> Generating...</> : 'Generate Schedule'}
//             </Button>
//           </Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="mb-3 g-2">
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label>Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={(e) => setYearLevel(Number(e.target.value))}>
//                 <option value={1}>1st Year</option>
//                 <option value={2}>2nd Year</option>
//                 <option value={3}>3rd Year</option>
//                 <option value={4}>4th Year</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)}>
//                 <option value="1">1st Sem</option>
//                 <option value="2">2nd Sem</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <div className="table-responsive">
//           <table className="table table-bordered text-center">
//             <thead className="table-light">
//               <tr>
//                 <th>Time</th>
//                 {DAYS.map(d => <th key={d}>{d}</th>)}
//               </tr>
//             </thead>
//             <tbody>
//               {TIMES.map(t => (
//                 <tr key={t.key}>
//                   <td className="align-middle">{t.label}</td>
//                   {DAYS.map(day => {
//                     const cellKey = `${day}_${t.key}`;
//                     const items = scheduleMap[cellKey] || [];
//                     return (
//                       <td key={cellKey} style={{ minWidth: 180 }}>
//                         {items.length === 0 ? (
//                           <span className="text-muted">Available</span>
//                         ) : items.map(it => (
//                           <div key={it.id} className="p-1 mb-1" style={{ borderRadius: 6, background: '#f8f9fa' }}>
//                             <div><strong>{it.subject_code}</strong></div>
//                             <div className="small">{it.subject_description}</div>
//                             <div className="small text-muted">Instructor: {it.instructor_name}</div>
//                             <div className="small text-muted">Room: {it.room_name}</div>
//                           </div>
//                         ))}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

//OLD
// src/components/SchedulePage.js
// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);

//   async function loadSchedules() {
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error("Failed to fetch schedules");
//       const data = await res.json();
//       setSavedSchedules(data);
//     } catch (err) {
//       console.error("Error loading schedules:", err);
//     }
//   }

//   useEffect(() => {
//     loadSchedules(); // load on mount
//   }, []);

//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     fetch(`${API}/api/courses`).then(r=>r.json()).then(setCourses).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (!courseId) return setSubjects([]);
//     setLoadingSubjects(true);
//     fetch(`${API}/api/subjects?courseId=${courseId}&yearLevel=${yearLevel}&semester=${semester}`)
//       .then(r=>r.json()).then(data=> {
//         setSubjects(data || []);
//         setSelectedSubjects(data.map(s => s.id)); // preselect all
//       })
//       .catch(err => console.error(err))
//       .finally(()=>setLoadingSubjects(false));
//   }, [courseId, yearLevel, semester]);

//   function toggleSubject(id){
//     setSelectedSubjects(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);
//   }

//   async function handleGenerate(){
//     if (!courseId || selectedSubjects.length===0) return setMessage({type:'danger', text:'Select course and subjects.'});
//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);
//     try {
//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify({
//           courseId,
//           yearLevel,
//           semester,
//           studentsCount,
//           sectionCount,
//           subjects: selectedSubjects
//         })
//       });
//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(txt || 'Scheduler failed');
//       }
//       const data = await res.json();
//       setScheduleResult(data);
//       setMessage({type:'success', text:'Schedule generated'});

//       // refresh saved schedules list
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({type:'danger', text: 'Schedule generation failed: ' + (err.message || '')});
//     } finally {
//       setGenerating(false);
//     }
//   }

//   const renderScheduleTable = () => {
//     if (!scheduleResult || !scheduleResult.assignments) return null;
//     const assignments = scheduleResult.assignments;
//     const grouped = {};
//     for (const a of assignments) {
//       const sec = a.section_index;
//       grouped[sec] = grouped[sec] || [];
//       grouped[sec].push(a);
//     }
//     return Object.keys(grouped).map(secIdx => (
//       <Card className="my-3" key={secIdx}>
//         <Card.Body>
//           <h6>Section {String.fromCharCode(65 + Number(secIdx))}</h6>
//           <Table bordered size="sm">
//             <thead><tr><th>Day</th><th>Slot</th><th>Subject ID</th><th>Room</th><th>Instructor</th></tr></thead>
//             <tbody>
//               {grouped[secIdx].map((r, idx) => (
//                 <tr key={idx}>
//                   <td>{r.day}</td>
//                   <td>{slotToTime(r.slot_index)}</td>
//                   <td>{r.subject_id}</td>
//                   <td>{r.room_id || 'TBD'}</td>
//                   <td>{r.instructor_id || 'TBD'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   };

//   function slotToTime(slotIndex){
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;
//     return `${pad(start)}:00 - ${pad(end)}:00`;
//   }
//   function pad(n){ return String(n).padStart(2,'0'); }

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         <Row className="mb-2">
//           <Col><h5>Generate Schedule</h5><small className="text-muted">Select options then generate.</small></Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="g-2">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={e=>setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year</Form.Label>
//               <Form.Select value={yearLevel} onChange={e=>setYearLevel(Number(e.target.value))}>
//                 <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={e=>setSemester(e.target.value)}>
//                 <option value="1">1</option><option value="2">2</option><option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Students</Form.Label>
//               <Form.Control type="number" value={studentsCount} onChange={e=>setStudentsCount(Number(e.target.value))} />
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Sections</Form.Label>
//               <Form.Control type="number" min={1} value={sectionCount} onChange={e=>setSectionCount(Number(e.target.value))} />
//             </Form.Group>
//           </Col>
//         </Row>

//         <hr />

//         <Row>
//           <Col>
//             <h6>Subjects</h6>
//             {loadingSubjects ? <Spinner animation="border" /> : (
//               <div style={{maxHeight: 260, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius:6}}>
//                 {subjects.length === 0 ? <div className="text-muted">No subjects for selection.</div> :
//                   subjects.map(s => (
//                     <div key={s.id} className="form-check">
//                       <input id={`s_${s.id}`} className="form-check-input" type="checkbox" checked={selectedSubjects.includes(s.id)} onChange={()=>toggleSubject(s.id)} />
//                       <label htmlFor={`s_${s.id}`} className="form-check-label ms-2">{s.subject_code} — {s.description} ({s.units}u)</label>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col>
//             <Button variant="primary" onClick={() => setShowConfirm(true)} disabled={generating || selectedSubjects.length===0}>Generate Schedule</Button>
//           </Col>
//         </Row>

//         <hr />
//         <div>
//           {generating && <div><Spinner animation="border" /> Generating...</div>}
//           {scheduleResult && renderScheduleTable()}
//         </div>

//         <hr />
//         <div>
//           <h6>Saved Schedules</h6>
//           {savedSchedules.length === 0 ? (
//             <div className="text-muted">No schedules saved yet.</div>
//           ) : (
//             <Table bordered size="sm">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Course</th>
//                   <th>Year</th>
//                   <th>Semester</th>
//                   <th>Day</th>
//                   <th>Slot</th>
//                   <th>Subject</th>
//                   <th>Room</th>
//                   <th>Instructor</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedSchedules.map((s, idx) => (
//                   <tr key={idx}>
//                     <td>{s.id}</td>
//                     <td>{s.course_id}</td>
//                     <td>{s.year_level}</td>
//                     <td>{s.semester}</td>
//                     <td>{s.day}</td>
//                     <td>{slotToTime(s.slot_index)}</td>
//                     <td>{s.subject_id}</td>
//                     <td>{s.room_id || 'TBD'}</td>
//                     <td>{s.instructor_id || 'TBD'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </div>
//       </Card.Body>

//       <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
//         <Modal.Header closeButton><Modal.Title>Confirm Generate</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <p>Course: <strong>{courses.find(c=>String(c.id)===String(courseId))?.code}</strong></p>
//           <p>Year: {yearLevel} — Semester: {semester}</p>
//           <p>Sections: {sectionCount} — Students: {studentsCount}</p>
//           <p>Subjects count: {selectedSubjects.length}</p>
//           <div className="text-muted small">Click confirm to run the scheduler (this may take a few seconds).</div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={()=>setShowConfirm(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleGenerate}>Confirm & Generate</Button>
//         </Modal.Footer>
//       </Modal>
//     </Card>
//   );
// }

// src/components/SchedulePage.js
// src/components/SchedulePage.js
//functional

// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';



// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);

//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
// const [selectedSection, setSelectedSection] = useState(null);

//   const [instructors, setInstructors] = useState([]); // all instructors
//   const [courseInstructors, setCourseInstructors] = useState([]); // filtered by course
//   const [selectedInstructorId, setSelectedInstructorId] = useState(''); // optional single instructor to force

//   const [rooms, setRooms] = useState([]);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);

//   // Load saved schedules
//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   useEffect(() => {
//     // load everything once
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRoomsRobust();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error('Failed to fetch courses');
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error('Failed to fetch instructors');
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setInstructors([]);
//     }
//   }

//   // Try fetching rooms from /api/rooms or fallback to /api/buildings -> flatten rooms
//   async function fetchRoomsRobust() {
//     try {
//       let res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setRooms(data.map(r => ({
//             id: r.id || r.room_id || r.roomId,
//             name: r.name || r.room_name || r.roomName,
//             capacity: Number(r.capacity || r.cap || 30)
//           })));
//           return;
//         }
//       }

//       // fallback to buildings endpoint
//       res = await fetch(`${API}/api/buildings`);
//       if (res.ok) {
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           const flat = [];
//           data.forEach(b => {
//             if (Array.isArray(b.rooms)) {
//               b.rooms.forEach(r => flat.push({
//                 id: r.id || r.room_id || r.roomId,
//                 name: r.name,
//                 capacity: Number(r.capacity || r.cap || 30),
//                 buildingId: b.id
//               }));
//             }
//           });
//           setRooms(flat);
//           return;
//         }
//       }

//       setRooms([]);
//     } catch (err) {
//       console.error('fetchRoomsRobust', err);
//       setRooms([]);
//     }
//   }

//   // When course/year/semester changes -> load subjects & filter instructors.
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorId('');
//       return;
//     }

//     // load subjects
//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         if (!res.ok) {
//           throw new Error('Failed to fetch subjects');
//         }
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id || s.subjectId).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//         setSelectedSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     // load instructors for course
//     async function loadCourseInstructors() {
//       try {
//         // try server-side filtered endpoint first
//         const tryRes = await fetch(`${API}/api/instructors?courseId=${courseId}`);
//         if (tryRes.ok) {
//           const tryData = await tryRes.json();
//           if (Array.isArray(tryData)) {
//             setCourseInstructors(tryData);
//             setSelectedInstructorId('');
//             return;
//           }
//         }
//       } catch (err) {
//         // ignore
//       }
//       // fallback: filter full list
//       const filtered = instructors.filter(i => {
//         const cid = String(courseId);
//         return (String(i.course_id || i.courseId || (i.course && i.course.id) || '') === cid);
//       });
//       setCourseInstructors(filtered);
//       setSelectedInstructorId('');
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, instructors]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   }

//   // Build minimal payload and call /api/scheduler/generate
//   async function handleGenerate() {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Select course and subjects.' });
//     }

//     // ensure rooms present on client for early validation (server will also validate)
//     if (!rooms || rooms.length === 0) {
//       return setMessage({ type: 'danger', text: 'No rooms available. Add rooms first.' });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);

//     try {
//       // Minimal payload expected by backend: subjects = array of ids
//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester,
//         studentsCount: Number(studentsCount || 30),
//         sectionCount: Number(sectionCount || 1),
//         subjects: selectedSubjects // send IDs only
//       };

//       // If user selected single instructor, attach that (backend will accept optional instructors array)
//       if (selectedInstructorId) {
//         payload.instructors = [Number(selectedInstructorId)];
//       }

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(txt || 'Scheduler failed');
//       }

//       const data = await res.json();
      
      
//       setScheduleResult(data);
//       setMessage({ type: 'success', text: 'Schedule generated' });

//       // refresh saved schedules
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: 'Schedule generation failed: ' + (err.message || '') });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   function slotToTime(slotIndex) {
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;
//     return `${pad(start)}:00 - ${pad(end)}:00`;
//   }
//   function pad(n) { return String(n).padStart(2, '0'); }

//   function downloadScheduleCSV() {
//     if (!scheduleResult || !Array.isArray(scheduleResult.assignments)) return;
//     let csv = "section,day,slot,subject_id,room_id,instructor\n";
//     scheduleResult.assignments.forEach(a => {
//       const instrName = (courseInstructors.find(i => String(i.id) === String(a.instructor_id)) || instructors.find(i => String(i.id) === String(a.instructor_id)))?.name || 'TBD';
//       csv += `${a.section_index},${a.day},${slotToTime(a.slot_index)},${a.subject_id},${a.room_id || 'TBD'},${instrName}\n`;
//     });
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'schedule.csv';
//     a.click();
//     URL.revokeObjectURL(url);
//   }
// //functional
//   // const renderScheduleResult = () => {
//   //   if (!scheduleResult || !Array.isArray(scheduleResult.assignments)) return null;
//   //   const grouped = {};
//   //   for (const a of scheduleResult.assignments) {
//   //     grouped[a.section_index] = grouped[a.section_index] || [];
//   //     grouped[a.section_index].push(a);
//   //   }
//   //   return Object.keys(grouped).map(secIdx => (
//   //     <Card className="my-3" key={secIdx}>
//   //       <Card.Body>
//   //         <h6>Section {String.fromCharCode(65 + Number(secIdx))}</h6>
//   //         <Table bordered size="sm">
//   //           <thead><tr><th>Day</th><th>Slot</th><th>Subject</th><th>Room</th><th>Instructor</th></tr></thead>
//   //           <tbody>
//   //             {grouped[secIdx].map((r, i) => {
//   //               const instr = courseInstructors.find(x => String(x.id) === String(r.instructor_id)) || instructors.find(x => String(x.id) === String(r.instructor_id));
//   //               return (
//   //                 <tr key={i}>
//   //                   <td>{r.day}</td>
//   //                   <td>{slotToTime(r.slot_index)}</td>
//   //                   <td>{r.subject_id}</td>
//   //                   <td>{r.room_id || 'TBD'}</td>
//   //                   <td>{instr ? instr.name : 'TBD'}</td>
//   //                 </tr>
//   //               );
//   //             })}
//   //           </tbody>
//   //         </Table>
//   //       </Card.Body>
//   //     </Card>
//   //   ));
//   // };
// const renderScheduleResult = () => {
//   if (!scheduleResult || !Array.isArray(scheduleResult.assignments)) return null;

//   // Group by section
//   const grouped = {};
//   for (const a of scheduleResult.assignments) {
//     grouped[a.section_index] = grouped[a.section_index] || [];
//     grouped[a.section_index].push(a);
//   }

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   // Only render the selected section if one is chosen
//   const sectionKeys = selectedSection !== null 
//     ? [String(selectedSection)] 
//     : Object.keys(grouped);

//   return sectionKeys.map(secIdx => (
//     <Card className="my-4 shadow-sm" key={secIdx}>
//       <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
//         <h6 className="mb-0">
//           Section {String.fromCharCode(65 + Number(secIdx))}
//         </h6>
//         <Button variant="warning" size="sm" onClick={downloadScheduleCSV}>
//           Download
//         </Button>
//       </Card.Header>
//       <Card.Body>
//         <Table bordered responsive className="align-middle text-center">
//           <thead>
//             <tr>
//               <th>Room</th>
//               <th>Subject</th>
//               <th>Instructor</th>
//               {days.map(d => <th key={d}>{d}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {grouped[secIdx].map((r, i) => {
//               const instr = courseInstructors.find(x => String(x.id) === String(r.instructor_id)) 
//                          || instructors.find(x => String(x.id) === String(r.instructor_id));

//               return (
//                 <tr key={i}>
//                   <td>{r.room_name || r.room_id || "TBD"}</td>
//                   <td>{r.subject_code || r.subject_id}</td>
//                   <td>{instr ? instr.name : "TBD"}</td>
//                   {days.map(day => (
//                     <td key={day}>
//                       {r.day === day ? slotToTime(r.slot_index) : ""}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   ));
// };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         <Row className="mb-2">
//           <Col><h5>Generate Schedule</h5><small className="text-muted">Select course → subjects. Instructor list is filtered by course. Rooms are automatic.</small></Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="g-2">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={e => setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year</Form.Label>
//               <Form.Select value={yearLevel} onChange={e => setYearLevel(Number(e.target.value))}>
//                 <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={e => setSemester(e.target.value)}>
//                 <option value="1">1</option><option value="2">2</option><option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Students</Form.Label>
//               <Form.Control type="number" value={studentsCount} onChange={e => setStudentsCount(Number(e.target.value || 0))} />
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Sections</Form.Label>
//               <Form.Control type="number" min={1} value={sectionCount} onChange={e => setSectionCount(Number(e.target.value || 1))} />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Instructor (optional)</Form.Label>
//               <Form.Select value={selectedInstructorId} onChange={e => setSelectedInstructorId(e.target.value)}>
//                 <option value="">Auto assign (use course instructors)</option>
//                 {courseInstructors.map(i => <option key={i.id} value={i.id}>{i.name}{i.course_code ? ` — ${i.course_code}` : ''}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <hr />

//         <Row>
//           <Col md={6}>
//             <h6>Subjects</h6>
//             {loadingSubjects ? <Spinner animation="border" /> : (
//               <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
//                 {subjects.length === 0 ? <div className="text-muted">No subjects for selection.</div> :
//                   subjects.map(s => (
//                     <div key={s.id || s.subject_id} className="form-check">
//                       <input id={`s_${s.id || s.subject_id}`} className="form-check-input" type="checkbox"
//                         checked={selectedSubjects.includes(s.id || s.subject_id)} onChange={() => toggleSubject(s.id || s.subject_id)} />
//                       <label htmlFor={`s_${s.id || s.subject_id}`} className="form-check-label ms-2">{s.subject_code || s.code} — {s.description} ({s.units}u)</label>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}
//           </Col>

//           <Col md={6}>
//             <h6>Rooms (automatic)</h6>
//             <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
//               {rooms.length === 0 ? <div className="text-muted">No rooms found (scheduler needs rooms).</div> : (
//                 rooms.map(r => <div key={r.id} className="small mb-1">{r.name} (cap: {r.capacity})</div>)
//               )}
//             </div>
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col>
//             <Button variant="primary" onClick={() => setShowConfirm(true)} disabled={generating || selectedSubjects.length === 0}>Generate Schedule</Button>{' '}
//             <Button variant="success" onClick={downloadScheduleCSV} disabled={!scheduleResult}>Download CSV</Button>
//           </Col>
//         </Row>

//         <hr />
//         <div>
          
//            {generating && <div><Spinner animation="border" /> Generating...</div>}
//           {scheduleResult && renderScheduleResult()} 
          
//         </div>

//         <hr />
//         <div>
//           <h6>Saved Schedules</h6>
//           {loadingSaved ? <div><Spinner animation="border" /></div> : (
//             savedSchedules.length === 0 ? <div className="text-muted">No schedules saved yet.</div> : (
//               <Table bordered size="sm">
//                 <thead>
//                   <tr>
//                     <th>ID</th><th>Course</th><th>Year</th><th>Semester</th><th>Day</th><th>Slot</th><th>Subject</th><th>Room</th><th>Instructor</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {savedSchedules.map((s, idx) => (
//                     <tr key={idx}>
//                       <td>{s.id}</td>
//                       <td>{s.course_id}</td>
//                       <td>{s.year_level}</td>
//                       <td>{s.semester}</td>
//                       <td>{s.day}</td>
//                       <td>{slotToTime(s.slot_index)}</td>
//                       <td>{s.subject_id}</td>
//                       <td>{s.room_id || 'TBD'}</td>
//                       <td>{
//                         (courseInstructors.find(i => String(i.id) === String(s.instructor_id)) || instructors.find(i => String(i.id) === String(s.instructor_id)))?.name || 'TBD'
//                       }</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )
//           )}
//         </div>
//       </Card.Body>

//       <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
//         <Modal.Header closeButton><Modal.Title>Confirm Generate</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <p>Course: <strong>{courses.find(c => String(c.id) === String(courseId))?.code || ''}</strong></p>
//           <p>Year: {yearLevel} — Semester: {semester}</p>
//           <p>Sections: {sectionCount} — Students: {studentsCount}</p>
//           <p>Subjects count: {selectedSubjects.length}</p>
//           <p>Instructor (if chosen): {selectedInstructorId ? (courseInstructors.find(i => String(i.id) === String(selectedInstructorId))?.name || 'TBD') : 'Auto'}</p>
//           <div className="text-muted small">Click confirm to run the scheduler (this may take a few seconds).</div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleGenerate}>Confirm & Generate</Button>
//         </Modal.Footer>
//       </Modal>
//     </Card>
//   );
// }

//FUNCTIONAL

// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);

//   const [instructors, setInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorId, setSelectedInstructorId] = useState('');

//   const [rooms, setRooms] = useState([]);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRoomsSilently(); // rooms load silently, no UI display
//   }, []);

//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setInstructors([]);
//     }
//   }

//   // Silent room loading (no display)
//   async function fetchRoomsSilently() {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRoomsSilently', err);
//       setRooms([]);
//     }
//   }

//   // Load subjects & instructors based on course
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorId('');
//       return;
//     }

//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     async function loadCourseInstructors() {
//       try {
//         const tryRes = await fetch(`${API}/api/instructors?courseId=${courseId}`);
//         if (tryRes.ok) {
//           const tryData = await tryRes.json();
//           if (Array.isArray(tryData)) {
//             setCourseInstructors(tryData);
//             return;
//           }
//         }
//       } catch (err) {}
//       const filtered = instructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, instructors]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   async function handleGenerate() {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Select course and subjects.' });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);

//     try {
//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester,
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//       };
//       if (selectedInstructorId) payload.instructors = [Number(selectedInstructorId)];

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error(await res.text());

//       const data = await res.json();
//       setScheduleResult(data);
//       setMessage({ type: 'success', text: 'Schedule generated successfully!' });
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   function slotToTime(slotIndex) {
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;
//     return `${start}:00 - ${end}:00`;
//   }

//   const renderScheduleResult = () => {
//     if (!scheduleResult?.assignments) return null;

//     const grouped = {};
//     for (const a of scheduleResult.assignments) {
//       grouped[a.section_index] = grouped[a.section_index] || [];
//       grouped[a.section_index].push(a);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return Object.keys(grouped).map(secIdx => (
//       <Card className="my-4 shadow-sm" key={secIdx}>
//         <Card.Header className="bg-primary text-white">
//           <h6 className="mb-0">Section {String.fromCharCode(65 + Number(secIdx))}</h6>
//         </Card.Header>
//         <Card.Body>
//           <Table bordered responsive className="text-center align-middle">
//             <thead>
//               <tr>
//                 <th>Room</th>
//                 <th>Subject</th>
//                 <th>Instructor</th>
//                 {days.map(d => <th key={d}>{d}</th>)}
//               </tr>
//             </thead>
//             <tbody>
//               {grouped[secIdx].map((r, i) => {
//                 const instr =
//                   courseInstructors.find(x => String(x.id) === String(r.instructor_id)) ||
//                   instructors.find(x => String(x.id) === String(r.instructor_id));
//                 return (
//                   <tr key={i}>
//                     <td>{r.room_name || r.room_id || "TBD"}</td>
//                     <td>{r.subject_code || r.subject_id}</td>
//                     <td>{instr ? instr.name : "TBD"}</td>
//                     {days.map(day => (
//                       <td key={day}>{r.day === day ? slotToTime(r.slot_index) : ""}</td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         <h5>Generate Schedule</h5>
//         <small className="text-muted">Select course → subjects. Rooms assign automatically.</small>
//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="g-2 mt-2">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={e => setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map(c => (
//                   <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year</Form.Label>
//               <Form.Select value={yearLevel} onChange={e => setYearLevel(Number(e.target.value))}>
//                 {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={e => setSemester(e.target.value)}>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Students</Form.Label>
//               <Form.Control type="number" value={studentsCount} onChange={e => setStudentsCount(e.target.value)} />
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Sections</Form.Label>
//               <Form.Control type="number" value={sectionCount} onChange={e => setSectionCount(e.target.value)} />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Instructor (optional)</Form.Label>
//               <Form.Select value={selectedInstructorId} onChange={e => setSelectedInstructorId(e.target.value)}>
//                 <option value="">Auto assign</option>
//                 {courseInstructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <hr />

//         <h6>Subjects</h6>
//         {loadingSubjects ? <Spinner animation="border" /> : (
//           <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
//             {subjects.length === 0 ? (
//               <div className="text-muted">No subjects available.</div>
//             ) : (
//               subjects.map(s => (
//                 <div key={s.id} className="form-check">
//                   <input
//                     id={`s_${s.id}`}
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={selectedSubjects.includes(s.id)}
//                     onChange={() => toggleSubject(s.id)}
//                   />
//                   <label htmlFor={`s_${s.id}`} className="form-check-label ms-2">
//                     {s.subject_code || s.code} — {s.description} ({s.units}u)
//                   </label>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         <div className="mt-3">
//           <Button variant="primary" onClick={() => setShowConfirm(true)} disabled={generating || !selectedSubjects.length}>
//             Generate Schedule
//           </Button>
//         </div>

//         <hr />
//         {generating && <div><Spinner animation="border" /> Generating schedule...</div>}
//         {scheduleResult && renderScheduleResult()}

//         <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
//           <Modal.Header closeButton><Modal.Title>Confirm Generate</Modal.Title></Modal.Header>
//           <Modal.Body>
//             <p>Course: {courses.find(c => String(c.id) === String(courseId))?.code}</p>
//             <p>Year: {yearLevel} — Semester: {semester}</p>
//             <p>Sections: {sectionCount} — Students: {studentsCount}</p>
//             <p>Subjects: {selectedSubjects.length}</p>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleGenerate}>Confirm & Generate</Button>
//           </Modal.Footer>
//         </Modal>
//       </Card.Body>
//     </Card>
//   );
// }

//FUNCTIONAL-okay

// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);

//   const [instructors, setInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorId, setSelectedInstructorId] = useState('');

//   const [rooms, setRooms] = useState([]);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRoomsSilently();
//   }, []);

//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setInstructors([]);
//     }
//   }

//   async function fetchRoomsSilently() {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRoomsSilently', err);
//       setRooms([]);
//     }
//   }

//   // Load subjects & instructors based on course
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorId('');
//       return;
//     }

//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     async function loadCourseInstructors() {
//       try {
//         const tryRes = await fetch(`${API}/api/instructors?courseId=${courseId}`);
//         if (tryRes.ok) {
//           const tryData = await tryRes.json();
//           if (Array.isArray(tryData)) {
//             setCourseInstructors(tryData);
//             return;
//           }
//         }
//       } catch (err) {}
//       const filtered = instructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, instructors]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   async function handleGenerate() {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Select course and subjects.' });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);

//     try {
//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester,
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//       };
//       if (selectedInstructorId) payload.instructors = [Number(selectedInstructorId)];

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error(await res.text());

//       const data = await res.json();
//       setScheduleResult(data);
//       setMessage({ type: 'success', text: 'Schedule generated successfully!' });
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   // ✅ Convert 24-hour slot to 12-hour AM/PM format
//   function slotToTime(slotIndex) {
//     const startHour = 8;
//     const start = startHour + slotIndex;
//     const end = start + 1;

//     const formatTime = (hour) => {
//       const suffix = hour >= 12 ? 'PM' : 'AM';
//       const formattedHour = ((hour + 11) % 12) + 1;
//       return `${formattedHour}:00 ${suffix}`;
//     };

//     return `${formatTime(start)} - ${formatTime(end)}`;
//   }

//   const renderScheduleResult = () => {
//     if (!scheduleResult?.assignments) return null;

//     const grouped = {};
//     for (const a of scheduleResult.assignments) {
//       grouped[a.section_index] = grouped[a.section_index] || [];
//       grouped[a.section_index].push(a);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return Object.keys(grouped).map(secIdx => (
//       <Card className="my-4 shadow-sm" key={secIdx}>
//         <Card.Header className="bg-primary text-white">
//           <h6 className="mb-0">Section {String.fromCharCode(65 + Number(secIdx))}</h6>
//         </Card.Header>
//         <Card.Body>
//           <Table bordered responsive className="text-center align-middle">
//             <thead>
//               <tr>
//                 <th>Room</th>
//                 <th>Subject</th>
//                 <th>Instructor</th>
//                 {days.map(d => <th key={d}>{d}</th>)}
//               </tr>
//             </thead>
//             <tbody>
//               {grouped[secIdx].map((r, i) => {
//                 const instr =
//                   courseInstructors.find(x => String(x.id) === String(r.instructor_id)) ||
//                   instructors.find(x => String(x.id) === String(r.instructor_id));
//                 return (
//                   <tr key={i}>
//                     <td>{r.room_name || r.room_id || "TBD"}</td>
//                     <td>{r.subject_code || r.subject_id}</td>
//                     <td>{instr ? instr.name : "TBD"}</td>
//                     {days.map(day => (
//                       <td key={day}>{r.day === day ? slotToTime(r.slot_index) : ""}</td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     ));
//   };

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <Card.Body>
//         <h5>Generate Schedule</h5>
//         <small className="text-muted">Select course → subjects. Rooms assign automatically.</small>
//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="g-2 mt-2">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select value={courseId} onChange={e => setCourseId(e.target.value)}>
//                 <option value="">Select course</option>
//                 {courses.map(c => (
//                   <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Year</Form.Label>
//               <Form.Select value={yearLevel} onChange={e => setYearLevel(Number(e.target.value))}>
//                 {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Semester</Form.Label>
//               <Form.Select value={semester} onChange={e => setSemester(e.target.value)}>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="Summer">Summer</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Students</Form.Label>
//               <Form.Control type="number" value={studentsCount} onChange={e => setStudentsCount(e.target.value)} />
//             </Form.Group>
//           </Col>
//           <Col md={2}>
//             <Form.Group>
//               <Form.Label>Sections</Form.Label>
//               <Form.Control type="number" value={sectionCount} onChange={e => setSectionCount(e.target.value)} />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Instructor (optional)</Form.Label>
//               <Form.Select value={selectedInstructorId} onChange={e => setSelectedInstructorId(e.target.value)}>
//                 <option value="">Auto assign</option>
//                 {courseInstructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <hr />

//         <h6>Subjects</h6>
//         {loadingSubjects ? <Spinner animation="border" /> : (
//           <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
//             {subjects.length === 0 ? (
//               <div className="text-muted">No subjects available.</div>
//             ) : (
//               subjects.map(s => (
//                 <div key={s.id} className="form-check">
//                   <input
//                     id={`s_${s.id}`}
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={selectedSubjects.includes(s.id)}
//                     onChange={() => toggleSubject(s.id)}
//                   />
//                   <label htmlFor={`s_${s.id}`} className="form-check-label ms-2">
//                     {s.subject_code || s.code} — {s.description} ({s.units}u)
//                   </label>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         <div className="mt-3">
//           <Button variant="primary" onClick={() => setShowConfirm(true)} disabled={generating || !selectedSubjects.length}>
//             Generate Schedule
//           </Button>
//         </div>

//         <hr />
//         {generating && <div><Spinner animation="border" /> Generating schedule...</div>}
//         {scheduleResult && renderScheduleResult()}

//         <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
//           <Modal.Header closeButton><Modal.Title>Confirm Generate</Modal.Title></Modal.Header>
//           <Modal.Body>
//             <p>Course: {courses.find(c => String(c.id) === String(courseId))?.code}</p>
//             <p>Year: {yearLevel} — Semester: {semester}</p>
//             <p>Sections: {sectionCount} — Students: {studentsCount}</p>
//             <p>Subjects: {selectedSubjects.length}</p>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleGenerate}>Confirm & Generate</Button>
//           </Modal.Footer>
//         </Modal>
//       </Card.Body>
//     </Card>
//   );
// }

//FUNCTIONAL -new maganda

// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert, Badge } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);
  
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
  
//   const [allInstructors, setAllInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
  
//   const [rooms, setRooms] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRooms();
//   }, []);

//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setAllInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setAllInstructors([]);
//     }
//   }

//   async function fetchRooms() {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRooms', err);
//       setRooms([]);
//     }
//   }

//   // ✅ Load subjects & instructors based on course selection
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorIds([]);
//       return;
//     }

//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     async function loadCourseInstructors() {
//       try {
//         // ✅ Try the new byCourse endpoint first
//         const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setCourseInstructors(data);
//             return;
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching instructors by course:', err);
//       }

//       // Fallback: filter from all instructors
//       const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, allInstructors]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function toggleInstructor(id) {
//     setSelectedInstructorIds(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function selectAllInstructors() {
//     setSelectedInstructorIds(courseInstructors.map(i => i.id));
//   }

//   function deselectAllInstructors() {
//     setSelectedInstructorIds([]);
//   }

//   async function handleGenerate() {
//     // Validation
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select a course and at least one subject.' });
//     }

//     if (selectedInstructorIds.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select at least one instructor for this course.' });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);
//     setScheduleResult(null);

//     try {
//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester: String(semester),
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//         instructors: selectedInstructorIds, // ✅ Send selected instructors
//       };

//       console.log('📤 Sending payload:', payload);

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || 'Schedule generation failed');
//       }

//       setScheduleResult(data);
//       setMessage({ type: 'success', text: data.message || 'Schedule generated successfully!' });
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: err.message || 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   // ✅ Convert slot index to time range (7 AM - 7 PM)
//   function slotToTime(slotIndex) {
//     const startHour = 7 + Number(slotIndex);
//     const endHour = startHour + 1;

//     const formatTime = (hour) => {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//       return `${adjusted}:00 ${period}`;
//     };

//     return `${formatTime(startHour)} - ${formatTime(endHour)}`;
//   }

//   const renderScheduleResult = () => {
//     if (!scheduleResult?.assignments) return null;

//     const grouped = {};
//     for (const a of scheduleResult.assignments) {
//       grouped[a.section_index] = grouped[a.section_index] || [];
//       grouped[a.section_index].push(a);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return (
//       <div className="mt-4">
//         <h5 className="mb-3">
//           Generated Schedule 
//           {scheduleResult.stats && (
//             <Badge bg="success" className="ms-2">
//               {scheduleResult.stats.totalAssignments} assignments
//             </Badge>
//           )}
//         </h5>
        
//         {Object.keys(grouped).map(secIdx => {
//           const sectionLetter = String.fromCharCode(65 + Number(secIdx));
//           return (
//             <Card className="my-3 shadow-sm" key={secIdx}>
//               <Card.Header className="bg-primary text-white">
//                 <h6 className="mb-0">Section {sectionLetter}</h6>
//               </Card.Header>
//               <Card.Body>
//                 <div style={{ overflowX: 'auto' }}>
//                   <Table bordered hover responsive className="text-center align-middle mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th style={{ minWidth: '120px' }}>Subject</th>
//                         <th style={{ minWidth: '150px' }}>Instructor</th>
//                         <th style={{ minWidth: '100px' }}>Room</th>
//                         {days.map(d => (
//                           <th key={d} style={{ minWidth: '120px' }}>{d}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {grouped[secIdx].map((r, i) => {
//                         const subject = subjects.find(s => s.id === r.subject_id);
//                         const instructor = courseInstructors.find(ins => ins.id === r.instructor_id) ||
//                                          allInstructors.find(ins => ins.id === r.instructor_id);
//                         const room = rooms.find(rm => rm.id === r.room_id);

//                         return (
//                           <tr key={i}>
//                             <td>
//                               <strong>{subject?.subject_code || r.subject_id}</strong>
//                               <br />
//                               <small className="text-muted">{subject?.description}</small>
//                             </td>
//                             <td>{instructor?.name || instructor?.instructor_name || 'TBD'}</td>
//                             <td>{room?.name || r.room_id || 'TBD'}</td>
//                             {days.map(day => {
//                               const matchingSlot = grouped[secIdx].find(
//                                 slot => slot.subject_id === r.subject_id && slot.day === day
//                               );
//                               return (
//                                 <td key={day}>
//                                   {matchingSlot ? (
//                                     <Badge bg="info" className="p-2">
//                                       {slotToTime(matchingSlot.slot_index)}
//                                     </Badge>
//                                   ) : (
//                                     <span className="text-muted">—</span>
//                                   )}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>
//               </Card.Body>
//             </Card>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid py-4">
//       <Card className="shadow-sm border-0">
//         <Card.Body className="p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h4 className="mb-1">📅 Generate Class Schedule</h4>
//               <small className="text-muted">
//                 Select course, subjects, and instructors. The system will automatically assign rooms and time slots (7 AM - 7 PM).
//               </small>
//             </div>
//           </div>

//           {message && (
//             <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
//               {message.text}
//             </Alert>
//           )}

//           {/* Course Selection */}
//           <Row className="g-3 mb-4">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Course *</Form.Label>
//                 <Form.Select
//                   value={courseId}
//                   onChange={e => setCourseId(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="">-- Select Course --</option>
//                   {courses.map(c => (
//                     <option key={c.id} value={c.id}>
//                       {c.code} — {c.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Year Level *</Form.Label>
//                 <Form.Select
//                   value={yearLevel}
//                   onChange={e => setYearLevel(Number(e.target.value))}
//                   disabled={generating}
//                 >
//                   {[1, 2, 3, 4].map(y => (
//                     <option key={y} value={y}>{y}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Semester *</Form.Label>
//                 <Form.Select
//                   value={semester}
//                   onChange={e => setSemester(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="1">1st Semester</option>
//                   <option value="2">2nd Semester</option>
//                   <option value="Summer">Summer</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Students per Section</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   value={studentsCount}
//                   onChange={e => setStudentsCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Number of Sections</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={sectionCount}
//                   onChange={e => setSectionCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <hr />

//           <Row>
//             {/* Subjects Selection */}
//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">📚 Subjects *</h6>
//                 {subjects.length > 0 && (
//                   <small className="text-muted">
//                     {selectedSubjects.length} / {subjects.length} selected
//                   </small>
//                 )}
//               </div>

//               {loadingSubjects ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" size="sm" />
//                   <span className="ms-2">Loading subjects...</span>
//                 </div>
//               ) : !courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : subjects.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No subjects available for this course, year, and semester.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {subjects.map(s => (
//                     <div key={s.id} className="form-check mb-2">
//                       <input
//                         id={`subj_${s.id}`}
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={selectedSubjects.includes(s.id)}
//                         onChange={() => toggleSubject(s.id)}
//                         disabled={generating}
//                       />
//                       <label htmlFor={`subj_${s.id}`} className="form-check-label">
//                         <strong>{s.subject_code || s.code}</strong> — {s.description}
//                         <Badge bg="secondary" className="ms-2">{s.units}u</Badge>
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>

//             {/* Instructors Selection */}
//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">👨‍🏫 Instructors *</h6>
//                 {courseInstructors.length > 0 && (
//                   <div>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={selectAllInstructors}
//                       disabled={generating}
//                     >
//                       Select All
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={deselectAllInstructors}
//                       disabled={generating}
//                     >
//                       Deselect All
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               {!courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : courseInstructors.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No instructors assigned to this course. Please assign instructors first.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {courseInstructors.map(ins => (
//                     <div key={ins.id} className="form-check mb-2">
//                       <input
//                         id={`instr_${ins.id}`}
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={selectedInstructorIds.includes(ins.id)}
//                         onChange={() => toggleInstructor(ins.id)}
//                         disabled={generating}
//                       />
//                       <label htmlFor={`instr_${ins.id}`} className="form-check-label">
//                         <strong>{ins.name || ins.instructor_name}</strong>
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>
//           </Row>

//           <hr />

//           {/* Generate Button */}
//           <div className="d-flex gap-2">
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={() => setShowConfirm(true)}
//               disabled={generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0}
//             >
//               {generating ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Generating...
//                 </>
//               ) : (
//                 '🚀 Generate Schedule'
//               )}
//             </Button>

//             {scheduleResult && (
//               <Button
//                 variant="outline-secondary"
//                 size="lg"
//                 onClick={() => setScheduleResult(null)}
//               >
//                 Clear Results
//               </Button>
//             )}
//           </div>

//           {/* Results */}
//           {scheduleResult && renderScheduleResult()}

//           {/* Confirmation Modal */}
//           <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Confirm Schedule Generation</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <p><strong>Course:</strong> {courses.find(c => String(c.id) === String(courseId))?.name}</p>
//               <p><strong>Year Level:</strong> {yearLevel}</p>
//               <p><strong>Semester:</strong> {semester}</p>
//               <p><strong>Sections:</strong> {sectionCount}</p>
//               <p><strong>Students per Section:</strong> {studentsCount}</p>
//               <p><strong>Subjects:</strong> {selectedSubjects.length}</p>
//               <p><strong>Instructors:</strong> {selectedInstructorIds.length}</p>
//               <hr />
//               <Alert variant="info" className="mb-0">
//                 <small>
//                   The system will automatically assign rooms and time slots (7 AM - 7 PM) 
//                   while preventing any scheduling conflicts.
//                 </small>
//               </Alert>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleGenerate}>
//                 Confirm & Generate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }


// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { 
//   Calendar, Clock, Users, BookOpen, Building, RefreshCw, 
//   CheckCircle, AlertCircle, ChevronDown, ChevronUp, Search,
//   Settings, Filter, X, Sparkles, Info, Eye, Download
// } from 'lucide-react';

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
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
//   const formatHour = (hour) => {
//     const suffix = hour >= 12 ? 'PM' : 'AM';
//     const formatted = ((hour + 11) % 12) + 1;
//     return `${formatted}:00 ${suffix}`;
//   };
//   return `${formatHour(startHour)} - ${formatHour(endHour)}`;
// };

// // ==================== TOAST NOTIFICATION ====================
// const Toast = React.memo(({ message, type, onClose }) => {
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(onClose, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, onClose]);

//   if (!message) return null;

//   const styles = {
//     success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724' },
//     danger: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24' },
//     warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404' },
//   };

//   const style = styles[type] || styles.success;
//   const Icon = type === 'success' ? CheckCircle : AlertCircle;

//   return (
//     <div className="toast-notification" style={{ 
//       background: style.bg, 
//       borderColor: style.border, 
//       color: style.color 
//     }}>
//       <Icon size={20} />
//       <span>{message}</span>
//       <button onClick={onClose} className="toast-close">
//         <X size={16} />
//       </button>
//     </div>
//   );
// });

// // ==================== LOADING SKELETON ====================
// const Skeleton = React.memo(({ width = '100%', height = '40px', className = '' }) => (
//   <div className={`skeleton ${className}`} style={{ width, height }} />
// ));

// const FormSkeleton = React.memo(() => (
//   <div className="form-skeleton">
//     <Skeleton height="48px" className="mb-3" />
//     <div className="skeleton-grid">
//       <Skeleton height="80px" />
//       <Skeleton height="80px" />
//       <Skeleton height="80px" />
//     </div>
//   </div>
// ));

// // ==================== SCHEDULE FORM ====================
// const ScheduleForm = React.memo(({ 
//   courses, 
//   formData, 
//   onChange, 
//   courseInstructors,
//   loading 
// }) => {
//   if (loading) return <FormSkeleton />;

//   return (
//     <div className="schedule-form">
//       <div className="form-grid">
//         <div className="form-group">
//           <label className="form-label">
//             <BookOpen size={16} />
//             Course
//           </label>
//           <select
//             className="form-select"
//             value={formData.courseId}
//             onChange={(e) => onChange({ ...formData, courseId: e.target.value })}
//           >
//             <option value="">Select Course</option>
//             {courses.map(c => (
//               <option key={c.id} value={c.id}>
//                 {c.code} — {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="form-label">
//             <Users size={16} />
//             Year Level
//           </label>
//           <select
//             className="form-select"
//             value={formData.yearLevel}
//             onChange={(e) => onChange({ ...formData, yearLevel: Number(e.target.value) })}
//           >
//             {[1, 2, 3, 4].map(y => (
//               <option key={y} value={y}>Year {y}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="form-label">
//             <Calendar size={16} />
//             Semester
//           </label>
//           <select
//             className="form-select"
//             value={formData.semester}
//             onChange={(e) => onChange({ ...formData, semester: e.target.value })}
//           >
//             <option value="1">1st Semester</option>
//             <option value="2">2nd Semester</option>
//             <option value="Summer">Summer</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="form-label">
//             <Users size={16} />
//             Students Per Section
//           </label>
//           <input
//             type="number"
//             className="form-input"
//             value={formData.studentsCount}
//             onChange={(e) => onChange({ ...formData, studentsCount: e.target.value })}
//             min="1"
//             max="100"
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">
//             <Building size={16} />
//             Number of Sections
//           </label>
//           <input
//             type="number"
//             className="form-input"
//             value={formData.sectionCount}
//             onChange={(e) => onChange({ ...formData, sectionCount: e.target.value })}
//             min="1"
//             max="10"
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">
//             <Users size={16} />
//             Preferred Instructor
//           </label>
//           <select
//             className="form-select"
//             value={formData.selectedInstructorId}
//             onChange={(e) => onChange({ ...formData, selectedInstructorId: e.target.value })}
//           >
//             <option value="">Auto Assign</option>
//             {courseInstructors.map(i => (
//               <option key={i.id} value={i.id}>{i.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== SUBJECTS SELECTOR ====================
// const SubjectsSelector = React.memo(({ 
//   subjects, 
//   selectedSubjects, 
//   onToggle, 
//   loading 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredSubjects = useMemo(() => {
//     if (!searchTerm.trim()) return subjects;
//     const term = searchTerm.toLowerCase();
//     return subjects.filter(s => 
//       s.subject_code?.toLowerCase().includes(term) ||
//       s.code?.toLowerCase().includes(term) ||
//       s.description?.toLowerCase().includes(term)
//     );
//   }, [subjects, searchTerm]);

//   const allSelected = filteredSubjects.length > 0 && 
//     filteredSubjects.every(s => selectedSubjects.includes(s.id));

//   const toggleAll = () => {
//     if (allSelected) {
//       const filtered = selectedSubjects.filter(id => 
//         !filteredSubjects.find(s => s.id === id)
//       );
//       filteredSubjects.forEach(s => onToggle(s.id, false));
//     } else {
//       filteredSubjects.forEach(s => {
//         if (!selectedSubjects.includes(s.id)) {
//           onToggle(s.id, true);
//         }
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="subjects-skeleton">
//         {[1, 2, 3, 4].map(i => <Skeleton key={i} height="50px" className="mb-2" />)}
//       </div>
//     );
//   }

//   return (
//     <div className="subjects-selector">
//       <div className="subjects-header">
//         <div className="subjects-title">
//           <BookOpen size={18} />
//           <h3>Select Subjects</h3>
//           <span className="subject-count">
//             {selectedSubjects.length} of {subjects.length} selected
//           </span>
//         </div>
        
//         <div className="subjects-controls">
//           <div className="search-box-mini">
//             <Search size={14} />
//             <input
//               type="text"
//               placeholder="Search subjects..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input-mini"
//             />
//           </div>
//           {filteredSubjects.length > 0 && (
//             <button className="select-all-btn" onClick={toggleAll}>
//               {allSelected ? 'Deselect All' : 'Select All'}
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="subjects-list">
//         {filteredSubjects.length === 0 ? (
//           <div className="empty-subjects">
//             <BookOpen size={32} className="empty-icon" />
//             <p>No subjects available</p>
//           </div>
//         ) : (
//           filteredSubjects.map(s => (
//             <label key={s.id} className="subject-item">
//               <input
//                 type="checkbox"
//                 checked={selectedSubjects.includes(s.id)}
//                 onChange={() => onToggle(s.id)}
//                 className="subject-checkbox"
//               />
//               <div className="subject-info">
//                 <div className="subject-code">{s.subject_code || s.code}</div>
//                 <div className="subject-description">{s.description}</div>
//               </div>
//               <div className="subject-units">{s.units} units</div>
//             </label>
//           ))
//         )}
//       </div>
//     </div>
//   );
// });

// // ==================== GENERATED SCHEDULE TABLE ====================
// const GeneratedScheduleTable = React.memo(({ 
//   scheduleResult, 
//   instructors, 
//   courseInstructors 
// }) => {
//   const [expandedSections, setExpandedSections] = useState({});

//   // Move hooks (useMemo) before any early returns to satisfy rules-of-hooks
//   const grouped = useMemo(() => {
//     const result = {};
//     const assignments = scheduleResult?.assignments || [];
//     assignments.forEach(a => {
//       if (!result[a.section_index]) result[a.section_index] = [];
//       result[a.section_index].push(a);
//     });
//     return result;
//   }, [scheduleResult]);

//   // Early return if no assignments (safe because hook above always runs)
//   if (!scheduleResult?.assignments || scheduleResult.assignments.length === 0) return null;

//   const toggleSection = (sectionIdx) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [sectionIdx]: !prev[sectionIdx]
//     }));
//   };

//   return (
//     <div className="generated-schedules">
//       <div className="schedules-header">
//         <div className="schedules-title">
//           <Sparkles size={20} />
//           <h3>Generated Schedule</h3>
//           <span className="sections-badge">
//             {Object.keys(grouped).length} Sections
//           </span>
//         </div>
//       </div>

//       <div className="schedule-cards">
//         {Object.entries(grouped).map(([sectionIdx, assignments]) => {
//           const isExpanded = expandedSections[sectionIdx] !== false;
//           const sectionLetter = String.fromCharCode(65 + Number(sectionIdx));

//           return (
//             <div key={sectionIdx} className="schedule-card fade-in">
//               <div 
//                 className="schedule-card-header"
//                 onClick={() => toggleSection(sectionIdx)}
//               >
//                 <div className="section-info">
//                   <div className="section-name">Section {sectionLetter}</div>
//                   <span className="class-count">{assignments.length} Classes</span>
//                 </div>
//                 <button className="expand-btn">
//                   {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//               </div>

//               {isExpanded && (
//                 <div className="schedule-card-body">
//                   <div className="table-wrapper">
//                     <table className="schedule-table">
//                       <thead>
//                         <tr>
//                           <th>Room</th>
//                           <th>Subject</th>
//                           <th>Instructor</th>
//                           {DAYS_ORDER.map(day => (
//                             <th key={day} className="day-col">{day}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {assignments.map((assignment, idx) => {
//                           const instructor = 
//                             courseInstructors.find(i => String(i.id) === String(assignment.instructor_id)) ||
//                             instructors.find(i => String(i.id) === String(assignment.instructor_id));

//                           return (
//                             <tr key={idx}>
//                               <td>
//                                 <div className="cell-content">
//                                   <Building size={14} className="cell-icon" />
//                                   {assignment.room_name || assignment.room_id || 'TBD'}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="subject-cell">
//                                   {assignment.subject_code || assignment.subject_id}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="cell-content">
//                                   <Users size={14} className="cell-icon" />
//                                   {instructor?.name || 'TBD'}
//                                 </div>
//                               </td>
//                               {DAYS_ORDER.map(day => (
//                                 <td key={day} className="time-cell">
//                                   {assignment.day === day && (
//                                     <div className="time-badge">
//                                       <Clock size={12} />
//                                       {slotToTime(assignment.slot_index)}
//                                     </div>
//                                   )}
//                                 </td>
//                               ))}
//                             </tr>
//                           );
//                         })}
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

// // ==================== CONFIRMATION MODAL ====================
// const ConfirmationModal = React.memo(({ 
//   show, 
//   onClose, 
//   onConfirm, 
//   formData, 
//   courses, 
//   selectedSubjectsCount 
// }) => {
//   if (!show) return null;

//   const course = courses.find(c => String(c.id) === String(formData.courseId));

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>Confirm Schedule Generation</h3>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="confirmation-item">
//             <BookOpen size={18} />
//             <div>
//               <div className="conf-label">Course</div>
//               <div className="conf-value">{course?.code} — {course?.name}</div>
//             </div>
//           </div>

//           <div className="confirmation-item">
//             <Calendar size={18} />
//             <div>
//               <div className="conf-label">Academic Period</div>
//               <div className="conf-value">
//                 Year {formData.yearLevel} — Semester {formData.semester}
//               </div>
//             </div>
//           </div>

//           <div className="confirmation-item">
//             <Users size={18} />
//             <div>
//               <div className="conf-label">Sections & Students</div>
//               <div className="conf-value">
//                 {formData.sectionCount} Section(s) × {formData.studentsCount} Students
//               </div>
//             </div>
//           </div>

//           <div className="confirmation-item">
//             <BookOpen size={18} />
//             <div>
//               <div className="conf-label">Subjects Selected</div>
//               <div className="conf-value">{selectedSubjectsCount} Subjects</div>
//             </div>
//           </div>

//           <div className="modal-warning">
//             <Info size={18} />
//             <span>
//               This will generate a new schedule. Existing schedules for this 
//               configuration may be overwritten.
//             </span>
//           </div>
//         </div>

//         <div className="modal-footer">
//           <button onClick={onClose} className="btn-secondary">
//             Cancel
//           </button>
//           <button onClick={onConfirm} className="btn-primary">
//             <Sparkles size={16} />
//             Generate Schedule
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== STATS CARD ====================
// const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
//   <div className="stats-card" style={{ borderLeftColor: color }}>
//     <div className="stats-icon" style={{ color }}>
//       <Icon size={24} />
//     </div>
//     <div className="stats-content">
//       <div className="stats-value">{value}</div>
//       <div className="stats-label">{label}</div>
//     </div>
//   </div>
// ));

// // ==================== MAIN COMPONENT ====================
// export default function SchedulePage() {
//   // State Management
//   const [courses, setCourses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [rooms, setRooms] = useState([]);
  
//   const [formData, setFormData] = useState({
//     courseId: '',
//     yearLevel: 1,
//     semester: '1',
//     studentsCount: 30,
//     sectionCount: 1,
//     selectedInstructorId: '',
//   });
  
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [scheduleResult, setScheduleResult] = useState(null);
  
//   const [loading, setLoading] = useState({
//     initial: true,
//     subjects: false,
//     generating: false,
//   });
  
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [toast, setToast] = useState({ message: '', type: '' });

//   // Initial data fetch
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setLoading(prev => ({ ...prev, initial: true }));
      
//       try {
//         await Promise.all([
//           fetchCourses(),
//           fetchAllInstructors(),
//           fetchRooms(),
//         ]);
//       } catch (err) {
//         console.error('Error fetching initial data:', err);
//         showToast('Failed to load initial data', 'danger');
//       } finally {
//         setLoading(prev => ({ ...prev, initial: false }));
//       }
//     };

//     fetchInitialData();
//   }, []);

//   // Fetch subjects when course/year/semester changes
//   useEffect(() => {
//     if (!formData.courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       return;
//     }

//     const loadCourseData = async () => {
//       setLoading(prev => ({ ...prev, subjects: true }));
      
//       try {
//         await Promise.all([
//           loadSubjects(),
//           loadCourseInstructors(),
//         ]);
//       } catch (err) {
//         console.error('Error loading course data:', err);
//       } finally {
//         setLoading(prev => ({ ...prev, subjects: false }));
//       }
//     };

//     loadCourseData();
//   }, [formData.courseId, formData.yearLevel, formData.semester]);

//   // API Functions
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses error:', err);
//       setCourses([]);
//     }
//   };

//   const fetchAllInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors error:', err);
//       setInstructors([]);
//     }
//   };

//   const fetchRooms = async () => {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRooms error:', err);
//       setRooms([]);
//     }
//   };

//   const loadSubjects = async () => {
//     try {
//       const params = new URLSearchParams({
//         courseId: formData.courseId,
//         yearLevel: formData.yearLevel,
//         semester: formData.semester,
//       });
      
//       const res = await fetch(`${API}/api/subjects?${params}`);
//       const data = await res.json();
//       const arr = Array.isArray(data) ? data : [];
      
//       setSubjects(arr);
//       setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//     } catch (err) {
//       console.error('loadSubjects error:', err);
//       setSubjects([]);
//     }
//   };

//   const loadCourseInstructors = async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors?courseId=${formData.courseId}`);
//       if (res.ok) {
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setCourseInstructors(data);
//           return;
//         }
//       }
      
//       const filtered = instructors.filter(i => 
//         String(i.course_id) === String(formData.courseId)
//       );
//       setCourseInstructors(filtered);
//     } catch (err) {
//       console.error('loadCourseInstructors error:', err);
//       const filtered = instructors.filter(i => 
//         String(i.course_id) === String(formData.courseId)
//       );
//       setCourseInstructors(filtered);
//     }
//   };

//   // Handlers
//   const handleRefresh = useCallback(async () => {
//     setLoading(prev => ({ ...prev, initial: true }));
//     await Promise.all([fetchCourses(), fetchAllInstructors(), fetchRooms()]);
//     setLoading(prev => ({ ...prev, initial: false }));
//     showToast('Data refreshed successfully', 'success');
//   }, []);

//   const toggleSubject = useCallback((id, forceValue) => {
//     setSelectedSubjects(prev => {
//       if (forceValue !== undefined) {
//         return forceValue ? [...prev, id] : prev.filter(x => x !== id);
//       }
//       return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
//     });
//   }, []);

//   const handleGenerate = async () => {
//     if (!formData.courseId || selectedSubjects.length === 0) {
//       showToast('Please select a course and at least one subject', 'warning');
//       return;
//     }

//     setShowConfirmModal(false);
//     setLoading(prev => ({ ...prev, generating: true }));

//     try {
//       const payload = {
//         courseId: Number(formData.courseId),
//         yearLevel: Number(formData.yearLevel),
//         semester: formData.semester,
//         studentsCount: Number(formData.studentsCount),
//         sectionCount: Number(formData.sectionCount),
//         subjects: selectedSubjects,
//       };

//       if (formData.selectedInstructorId) {
//         payload.instructors = [Number(formData.selectedInstructorId)];
//       }

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || 'Failed to generate schedule');
//       }

//       const data = await res.json();
//       setScheduleResult(data);
//       showToast('Schedule generated successfully!', 'success');
//     } catch (err) {
//       console.error('Generate schedule error:', err);
//       showToast(`Failed to generate schedule: ${err.message}`, 'danger');
//     } finally {
//       setLoading(prev => ({ ...prev, generating: false }));
//     }
//   };

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   const closeToast = () => {
//     setToast({ message: '', type: '' });
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     courses: courses.length,
//     subjects: subjects.length,
//     instructors: courseInstructors.length,
//     rooms: rooms.length,
//   }), [courses, subjects, courseInstructors, rooms]);

//   return (
//     <div className="schedule-page">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={closeToast} />

//       {/* Page Header */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <Sparkles size={32} />
//             </div>
//             <div>
//               <h1 className="page-title">Schedule Generator</h1>
//               <p className="page-subtitle">
//                 Create optimized class schedules with automatic room and instructor assignment
//               </p>
//             </div>
//           </div>
          
//           <button 
//             className="refresh-button"
//             onClick={handleRefresh}
//             disabled={loading.initial}
//           >
//             <RefreshCw size={18} className={loading.initial ? 'spinning' : ''} />
//             Refresh Data
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="stats-grid">
//           <StatsCard 
//             icon={BookOpen} 
//             label="Available Courses" 
//             value={stats.courses}
//             color={COLORS.accent}
//           />
//           <StatsCard 
//             icon={BookOpen} 
//             label="Subjects" 
//             value={stats.subjects}
//             color={COLORS.light}
//           />
//           <StatsCard 
//             icon={Users} 
//             label="Instructors" 
//             value={stats.instructors}
//             color={COLORS.lighter}
//           />
//           <StatsCard 
//             icon={Building} 
//             label="Rooms" 
//             value={stats.rooms}
//             color={COLORS.secondary}
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="content-wrapper">
//         {/* Configuration Panel */}
//         <div className="config-panel">
//           <div className="panel-header">
//             <Settings size={20} />
//             <h2>Schedule Configuration</h2>
//           </div>

//           <ScheduleForm
//             courses={courses}
//             formData={formData}
//             onChange={setFormData}
//             courseInstructors={courseInstructors}
//             loading={loading.initial}
//           />

//           {formData.courseId && (
//             <SubjectsSelector
//               subjects={subjects}
//               selectedSubjects={selectedSubjects}
//               onToggle={toggleSubject}
//               loading={loading.subjects}
//             />
//           )}

//           <div className="action-buttons">
//             <button
//               className="generate-button"
//               onClick={() => setShowConfirmModal(true)}
//               disabled={loading.generating || !formData.courseId || selectedSubjects.length === 0}
//             >
//               {loading.generating ? (
//                 <>
//                   <RefreshCw size={18} className="spinning" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles size={18} />
//                   Generate Schedule
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Results Panel */}
//         {loading.generating && (
//           <div className="generating-overlay">
//             <div className="generating-content">
//               <RefreshCw size={48} className="spinning" />
//               <h3>Generating Your Schedule</h3>
//               <p>This may take a few moments...</p>
//             </div>
//           </div>
//         )}

//         {scheduleResult && !loading.generating && (
//           <div className="results-panel">
//             <GeneratedScheduleTable
//               scheduleResult={scheduleResult}
//               instructors={instructors}
//               courseInstructors={courseInstructors}
//             />
//           </div>
//         )}
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         show={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleGenerate}
//         formData={formData}
//         courses={courses}
//         selectedSubjectsCount={selectedSubjects.length}
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//         .schedule-page {
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

//         .toast-close {
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.25rem;
//           display: flex;
//           align-items: center;
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(100%);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         /* ===== HEADER ===== */
//         .page-header {
//           margin-bottom: 2rem;
//         }

//         .header-content {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//         }

//         .header-title-group {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .header-icon {
//           color: ${COLORS.primary};
//           background: ${COLORS.lightest};
//           padding: 0.8rem;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .page-title {
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0;
//         }

//         .page-subtitle {
//           color: #555;
//           font-size: 0.95rem;
//         }

//         .refresh-button {
//           background: ${COLORS.accent};
//           color: white;
//           padding: 0.6rem 1.2rem;
//           border: none;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }

//         .refresh-button:hover {
//           background: ${COLORS.secondary};
//         }

//         .spinning {
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== STATS CARDS ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 1rem;
//         }

//         .stats-card {
//           background: white;
//           padding: 1rem 1.25rem;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.05);
//           border-left: 6px solid;
//         }

//         .stats-icon {
//           font-size: 1.5rem;
//         }

//         .stats-value {
//           font-size: 1.4rem;
//           font-weight: 600;
//         }

//         .stats-label {
//           color: #666;
//           font-size: 0.9rem;
//         }

//         /* ===== CONTENT WRAPPER ===== */
//         .content-wrapper {
//           display: flex;
//           gap: 2rem;
//           align-items: flex-start;
//         }

//         .config-panel {
//           flex: 0.35;
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .results-panel {
//           flex: 0.65;
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           max-height: 80vh;
//           overflow-y: auto;
//         }

//         .panel-header {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: ${COLORS.primary};
//           font-weight: 600;
//           font-size: 1.1rem;
//           margin-bottom: 1rem;
//         }

//         /* ===== SCHEDULE FORM ===== */
//         .form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .form-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: ${COLORS.primary};
//           font-weight: 600;
//           margin-bottom: 0.25rem;
//         }

//         .form-select, .form-input {
//           padding: 0.6rem;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 0.95rem;
//           outline: none;
//           transition: all 0.2s ease;
//         }

//         .form-select:focus, .form-input:focus {
//           border-color: ${COLORS.accent};
//           box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.15);
//         }

//         /* ===== SUBJECT SELECTOR ===== */
//         .subjects-selector {
//           margin-top: 1.5rem;
//           background: #f9f9f9;
//           border-radius: 10px;
//           padding: 1rem;
//         }

//         .subjects-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 0.75rem;
//         }

//         .subjects-title {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .subject-count {
//           font-size: 0.85rem;
//           color: #555;
//         }

//         .search-box-mini {
//           display: flex;
//           align-items: center;
//           background: white;
//           padding: 0.3rem 0.6rem;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//         }

//         .search-input-mini {
//           border: none;
//           outline: none;
//           font-size: 0.9rem;
//           margin-left: 0.5rem;
//           width: 120px;
//         }

//         .select-all-btn {
//           background: ${COLORS.light};
//           border: none;
//           color: white;
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .select-all-btn:hover {
//           background: ${COLORS.accent};
//         }

//         .subjects-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//           max-height: 300px;
//           overflow-y: auto;
//         }

//         .subject-item {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: white;
//           padding: 0.6rem 0.8rem;
//           border-radius: 8px;
//           border: 1px solid #ddd;
//           cursor: pointer;
//           transition: background 0.2s ease;
//         }

//         .subject-item:hover {
//           background: ${COLORS.lightest};
//         }

//         .subject-info {
//           flex: 1;
//           margin-left: 0.5rem;
//         }

//         .subject-code {
//           font-weight: 600;
//           color: ${COLORS.primary};
//         }

//         .subject-units {
//           font-size: 0.9rem;
//           color: #666;
//         }

//         /* ===== ACTION BUTTONS ===== */
//         .action-buttons {
//           margin-top: 1.5rem;
//           text-align: right;
//         }

//         .generate-button {
//           background: ${COLORS.primary};
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .generate-button:hover {
//           background: ${COLORS.secondary};
//         }

//         /* ===== MODAL ===== */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 10000;
//           animation: fadeIn 0.3s ease;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 480px;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.2);
//           padding: 1.5rem;
//           animation: slideUp 0.4s ease;
//         }

//         .modal-header, .modal-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .modal-body {
//           margin: 1rem 0;
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .modal-warning {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #fff3cd;
//           color: #856404;
//           padding: 0.8rem;
//           border-radius: 8px;
//           font-size: 0.9rem;
//         }

//         .btn-primary {
//           background: ${COLORS.primary};
//           color: white;
//           padding: 0.6rem 1.2rem;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//         }

//         .btn-secondary {
//           background: #ddd;
//           color: #333;
//           padding: 0.6rem 1.2rem;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideUp {
//           from { transform: translateY(30px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }

//WITH INSTRUCTOR AVAILABILITY
// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
// import { AlertCircle, CheckCircle } from 'lucide-react';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);
  
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
  
//   const [allInstructors, setAllInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
//   const [instructorAvailability, setInstructorAvailability] = useState({});
//   const [availabilityData, setAvailabilityData] = useState({});
  
//   const [rooms, setRooms] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);
//   const [considerAvailability, setConsiderAvailability] = useState(true);
//   const [availabilityLoaded, setAvailabilityLoaded] = useState(false);

//   // Fetch initial data
//   useEffect(() => {
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRooms();
//     fetchAvailabilityData();
//   }, []);

//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setAllInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setAllInstructors([]);
//     }
//   }

//   async function fetchRooms() {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRooms', err);
//       setRooms([]);
//     }
//   }

//   // Fetch instructor availability data
//   async function fetchAvailabilityData() {
//     try {
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) throw new Error('Failed to fetch availability');
//       const data = await res.json();
      
//       // Build a map: instructorName -> array of {day, start_time, end_time}
//       const availMap = {};
//       if (Array.isArray(data)) {
//         data.forEach(item => {
//           const name = item.instructorName || 'Unknown';
//           if (!availMap[name]) {
//             availMap[name] = [];
//           }
//           availMap[name].push({
//             day: item.day,
//             start_time: item.start_time,
//             end_time: item.end_time
//           });
//         });
//       }
//       setAvailabilityData(availMap);
//       setAvailabilityLoaded(true);
//     } catch (err) {
//       console.error('Error fetching availability data:', err);
//       setAvailabilityLoaded(true);
//     }
//   }

//   // Load subjects & instructors based on course selection
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorIds([]);
//       setInstructorAvailability({});
//       return;
//     }

//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     async function loadCourseInstructors() {
//       try {
//         const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setCourseInstructors(data);
//             initializeAvailability(data);
//             return;
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching instructors by course:', err);
//       }

//       const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//       initializeAvailability(filtered);
//     }

//     function initializeAvailability(instructors) {
//       const availMap = {};
//       instructors.forEach(i => {
//         // Mark as available if instructor has availability data
//         const hasAvailability = availabilityData[i.name || i.instructor_name] !== undefined;
//         availMap[i.id] = hasAvailability;
//       });
//       setInstructorAvailability(availMap);
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, allInstructors, availabilityData]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function toggleInstructor(id) {
//     setSelectedInstructorIds(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function toggleInstructorAvailability(id) {
//     setInstructorAvailability(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   }

//   function selectAllInstructors() {
//     setSelectedInstructorIds(courseInstructors.map(i => i.id));
//   }

//   function deselectAllInstructors() {
//     setSelectedInstructorIds([]);
//   }

//   function getInstructorAvailabilityStatus(instructor) {
//     const name = instructor.name || instructor.instructor_name;
//     return availabilityData[name] ? 'Has availability data' : 'No availability data';
//   }

//   function getInstructorSlots(instructor) {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
//     return slots.length;
//   }

//   function getInstructorAvailabilityTimes(instructor) {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
    
//     // Group by day
//     const byDay = {};
//     slots.forEach(slot => {
//       const day = slot.day || 'Unknown';
//       if (!byDay[day]) {
//         byDay[day] = [];
//       }
//       byDay[day].push(`${slot.start_time} - ${slot.end_time}`);
//     });
    
//     return byDay;
//   }

//   function formatTimeRange(startTime, endTime) {
//     const formatTime = (time) => {
//       const [hours, minutes] = time.split(':');
//       const hour = parseInt(hours);
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//       return `${displayHour}:${minutes} ${period}`;
//     };
//     return `${formatTime(startTime)} - ${formatTime(endTime)}`;
//   }

//   async function handleGenerate() {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select a course and at least one subject.' });
//     }

//     if (selectedInstructorIds.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select at least one instructor for this course.' });
//     }

//     const selectedButUnavailable = selectedInstructorIds.filter(id => !instructorAvailability[id]);
//     if (considerAvailability && selectedButUnavailable.length > 0) {
//       return setMessage({ 
//         type: 'warning', 
//         text: `${selectedButUnavailable.length} selected instructor(s) have no availability data. They will be excluded from scheduling.` 
//       });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);
//     setScheduleResult(null);

//     try {
//       const instructorsPayload = selectedInstructorIds.map(id => ({
//         id,
//         available: instructorAvailability[id] || true
//       }));

//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester: String(semester),
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//         instructors: instructorsPayload,
//         considerInstructorAvailability: considerAvailability
//       };

//       console.log('Sending payload:', payload);

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || 'Schedule generation failed');
//       }

//       setScheduleResult(data);
//       setMessage({ type: 'success', text: data.message || 'Schedule generated successfully!' });
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: err.message || 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   function slotToTime(slotIndex) {
//     const startHour = 7 + Number(slotIndex);
//     const endHour = startHour + 1;

//     const formatTime = (hour) => {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//       return `${adjusted}:00 ${period}`;
//     };

//     return `${formatTime(startHour)} - ${formatTime(endHour)}`;
//   }

//   const renderScheduleResult = () => {
//     if (!scheduleResult?.assignments) return null;

//     const grouped = {};
//     for (const a of scheduleResult.assignments) {
//       grouped[a.section_index] = grouped[a.section_index] || [];
//       grouped[a.section_index].push(a);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return (
//       <div className="mt-4">
//         <h5 className="mb-3">
//           Generated Schedule 
//           {scheduleResult.stats && (
//             <Badge bg="success" className="ms-2">
//               {scheduleResult.stats.totalAssignments} assignments
//             </Badge>
//           )}
//         </h5>
        
//         {Object.keys(grouped).map(secIdx => {
//           const sectionLetter = String.fromCharCode(65 + Number(secIdx));
//           return (
//             <Card className="my-3 shadow-sm" key={secIdx}>
//               <Card.Header className="bg-primary text-white">
//                 <h6 className="mb-0">Section {sectionLetter}</h6>
//               </Card.Header>
//               <Card.Body>
//                 <div style={{ overflowX: 'auto' }}>
//                   <Table bordered hover responsive className="text-center align-middle mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th style={{ minWidth: '120px' }}>Subject</th>
//                         <th style={{ minWidth: '150px' }}>Instructor</th>
//                         <th style={{ minWidth: '100px' }}>Room</th>
//                         {days.map(d => (
//                           <th key={d} style={{ minWidth: '120px' }}>{d}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {grouped[secIdx].map((r, i) => {
//                         const subject = subjects.find(s => s.id === r.subject_id);
//                         const instructor = courseInstructors.find(ins => ins.id === r.instructor_id) ||
//                                          allInstructors.find(ins => ins.id === r.instructor_id);
//                         const room = rooms.find(rm => rm.id === r.room_id);

//                         return (
//                           <tr key={i}>
//                             <td>
//                               <strong>{subject?.subject_code || r.subject_id}</strong>
//                               <br />
//                               <small className="text-muted">{subject?.description}</small>
//                             </td>
//                             <td>{instructor?.name || instructor?.instructor_name || 'TBD'}</td>
//                             <td>{room?.name || r.room_id || 'TBD'}</td>
//                             {days.map(day => {
//                               const matchingSlot = grouped[secIdx].find(
//                                 slot => slot.subject_id === r.subject_id && slot.day === day
//                               );
//                               return (
//                                 <td key={day}>
//                                   {matchingSlot ? (
//                                     <Badge bg="info" className="p-2">
//                                       {slotToTime(matchingSlot.slot_index)}
//                                     </Badge>
//                                   ) : (
//                                     <span className="text-muted">—</span>
//                                   )}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>
//               </Card.Body>
//             </Card>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid py-4">
//       <Card className="shadow-sm border-0">
//         <Card.Body className="p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h4 className="mb-1">Generate Class Schedule</h4>
//               <small className="text-muted">
//                 Select course, subjects, and instructors. The system will automatically assign rooms and time slots (7 AM - 7 PM).
//               </small>
//             </div>
//           </div>

//           {message && (
//             <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
//               {message.text}
//             </Alert>
//           )}

//           <Row className="g-3 mb-4">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Course *</Form.Label>
//                 <Form.Select
//                   value={courseId}
//                   onChange={e => setCourseId(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="">-- Select Course --</option>
//                   {courses.map(c => (
//                     <option key={c.id} value={c.id}>
//                       {c.code} — {c.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Year Level *</Form.Label>
//                 <Form.Select
//                   value={yearLevel}
//                   onChange={e => setYearLevel(Number(e.target.value))}
//                   disabled={generating}
//                 >
//                   {[1, 2, 3, 4].map(y => (
//                     <option key={y} value={y}>{y}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Semester *</Form.Label>
//                 <Form.Select
//                   value={semester}
//                   onChange={e => setSemester(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="1">1st Semester</option>
//                   <option value="2">2nd Semester</option>
//                   <option value="Summer">Summer</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Students per Section</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   value={studentsCount}
//                   onChange={e => setStudentsCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Number of Sections</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={sectionCount}
//                   onChange={e => setSectionCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Card className="mb-4 bg-light border">
//             <Card.Body className="p-3">
//               <Form.Check
//                 type="checkbox"
//                 id="considerAvailabilityCheck"
//                 label={
//                   <span>
//                     <strong>Consider Instructor Availability</strong>
//                     <br />
//                     <small className="text-muted">
//                       When enabled, only instructors with availability data will be scheduled. 
//                       {availabilityLoaded && !availabilityData ? ' (No availability data loaded)' : ''}
//                     </small>
//                   </span>
//                 }
//                 checked={considerAvailability}
//                 onChange={e => setConsiderAvailability(e.target.checked)}
//                 disabled={generating}
//               />
//             </Card.Body>
//           </Card>

//           <hr />

//           <Row>
//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">Subjects *</h6>
//                 {subjects.length > 0 && (
//                   <small className="text-muted">
//                     {selectedSubjects.length} / {subjects.length} selected
//                   </small>
//                 )}
//               </div>

//               {loadingSubjects ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" size="sm" />
//                   <span className="ms-2">Loading subjects...</span>
//                 </div>
//               ) : !courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : subjects.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No subjects available for this course, year, and semester.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {subjects.map(s => (
//                     <div key={s.id} className="form-check mb-2">
//                       <input
//                         id={`subj_${s.id}`}
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={selectedSubjects.includes(s.id)}
//                         onChange={() => toggleSubject(s.id)}
//                         disabled={generating}
//                       />
//                       <label htmlFor={`subj_${s.id}`} className="form-check-label">
//                         <strong>{s.subject_code || s.code}</strong> — {s.description}
//                         <Badge bg="secondary" className="ms-2">{s.units}u</Badge>
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>

//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">Instructors * {considerAvailability && <Badge bg="warning">Availability Enabled</Badge>}</h6>
//                 {courseInstructors.length > 0 && (
//                   <div>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={selectAllInstructors}
//                       disabled={generating}
//                     >
//                       Select All
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={deselectAllInstructors}
//                       disabled={generating}
//                     >
//                       Deselect All
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               {!courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : courseInstructors.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No instructors assigned to this course. Please assign instructors first.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {courseInstructors.map(ins => (
//                     <div key={ins.id} className="mb-3 pb-2" style={{ borderBottom: '1px solid #dee2e6' }}>
//                       <div className="form-check mb-2">
//                         <input
//                           id={`instr_${ins.id}`}
//                           className="form-check-input"
//                           type="checkbox"
//                           checked={selectedInstructorIds.includes(ins.id)}
//                           onChange={() => toggleInstructor(ins.id)}
//                           disabled={generating}
//                         />
//                         <label htmlFor={`instr_${ins.id}`} className="form-check-label">
//                           <strong>{ins.name || ins.instructor_name}</strong>
//                         </label>
//                       </div>
//                       {considerAvailability && (
//                         <div className="ms-4">
//                           {instructorAvailability[ins.id] ? (
//                             <>
//                               <div className="d-flex align-items-center gap-2 mb-2">
//                                 <CheckCircle size={14} className="text-success" />
//                                 <small className="text-success fw-bold">{getInstructorSlots(ins)} availability slots</small>
//                               </div>
//                               <div style={{ fontSize: '0.8rem', color: '#666', marginLeft: '1.5rem' }}>
//                                 {Object.entries(getInstructorAvailabilityTimes(ins)).map(([day, times]) => (
//                                   <div key={day} style={{ marginBottom: '0.3rem' }}>
//                                     <strong>{day}:</strong> {times.map((t, idx) => (
//                                       <span key={idx}>
//                                         {formatTimeRange(t.split(' - ')[0], t.split(' - ')[1])}
//                                         {idx < times.length - 1 && ', '}
//                                       </span>
//                                     ))}
//                                   </div>
//                                 ))}
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <div className="d-flex align-items-center gap-2">
//                                 <AlertCircle size={14} className="text-warning" />
//                                 <small className="text-warning">No availability data</small>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>
//           </Row>

//           <hr />

//           <div className="d-flex gap-2">
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={() => setShowConfirm(true)}
//               disabled={generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0}
//             >
//               {generating ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Generating...
//                 </>
//               ) : (
//                 'Generate Schedule'
//               )}
//             </Button>

//             {scheduleResult && (
//               <Button
//                 variant="outline-secondary"
//                 size="lg"
//                 onClick={() => setScheduleResult(null)}
//               >
//                 Clear Results
//               </Button>
//             )}
//           </div>

//           {scheduleResult && renderScheduleResult()}

//           <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Confirm Schedule Generation</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <p><strong>Course:</strong> {courses.find(c => String(c.id) === String(courseId))?.name}</p>
//               <p><strong>Year Level:</strong> {yearLevel}</p>
//               <p><strong>Semester:</strong> {semester}</p>
//               <p><strong>Sections:</strong> {sectionCount}</p>
//               <p><strong>Students per Section:</strong> {studentsCount}</p>
//               <p><strong>Subjects:</strong> {selectedSubjects.length}</p>
//               <p><strong>Instructors:</strong> {selectedInstructorIds.length}</p>
//               <p>
//                 <strong>Instructor Availability:</strong> {considerAvailability ? 'Enforced' : 'Ignored'}
//               </p>
//               <hr />
//               <Alert variant="info" className="mb-0">
//                 <small>
//                   The system will automatically assign rooms and time slots (7 AM - 7 PM) 
//                   while preventing any scheduling conflicts.
//                 </small>
//               </Alert>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleGenerate}>
//                 Confirm & Generate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

//FUNCTIONAL WITH INSTRUCTOR AVAILABILITY

// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
// import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function SchedulePage() {
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);
  
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
  
//   const [allInstructors, setAllInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
//   const [instructorAvailability, setInstructorAvailability] = useState({});
//   const [availabilityData, setAvailabilityData] = useState({});
  
//   const [rooms, setRooms] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [loadingSaved, setLoadingSaved] = useState(false);
//   const [considerAvailability, setConsiderAvailability] = useState(true);
//   const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
//   const [conflicts, setConflicts] = useState([]);

//   // Fetch initial data
//   useEffect(() => {
//     loadSchedules();
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRooms();
//     fetchAvailabilityData();
//   }, []);

//   async function loadSchedules() {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(data || []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses', err);
//       setCourses([]);
//     }
//   }

//   async function fetchAllInstructors() {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setAllInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors', err);
//       setAllInstructors([]);
//     }
//   }

//   async function fetchRooms() {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRooms', err);
//       setRooms([]);
//     }
//   }

//   async function fetchAvailabilityData() {
//     try {
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) throw new Error('Failed to fetch availability');
//       const data = await res.json();
      
//       const availMap = {};
//       if (Array.isArray(data)) {
//         data.forEach(item => {
//           const name = item.instructorName || 'Unknown';
//           if (!availMap[name]) {
//             availMap[name] = [];
//           }
//           availMap[name].push({
//             day: item.day,
//             start_time: item.start_time,
//             end_time: item.end_time
//           });
//         });
//       }
//       setAvailabilityData(availMap);
//       setAvailabilityLoaded(true);
//     } catch (err) {
//       console.error('Error fetching availability data:', err);
//       setAvailabilityLoaded(true);
//     }
//   }

//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorIds([]);
//       setInstructorAvailability({});
//       return;
//     }

//     async function loadSubjects() {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     }

//     async function loadCourseInstructors() {
//       try {
//         const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setCourseInstructors(data);
//             initializeAvailability(data);
//             return;
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching instructors by course:', err);
//       }

//       const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//       initializeAvailability(filtered);
//     }

//     function initializeAvailability(instructors) {
//       const availMap = {};
//       instructors.forEach(i => {
//         const hasAvailability = availabilityData[i.name || i.instructor_name] !== undefined;
//         availMap[i.id] = hasAvailability;
//       });
//       setInstructorAvailability(availMap);
//     }

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, allInstructors, availabilityData]);

//   function toggleSubject(id) {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function toggleInstructor(id) {
//     setSelectedInstructorIds(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }

//   function selectAllInstructors() {
//     setSelectedInstructorIds(courseInstructors.map(i => i.id));
//   }

//   function deselectAllInstructors() {
//     setSelectedInstructorIds([]);
//   }

//   function getInstructorSlots(instructor) {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
//     return slots.length;
//   }

//   function getInstructorAvailabilityTimes(instructor) {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
    
//     const byDay = {};
//     slots.forEach(slot => {
//       const day = slot.day || 'Unknown';
//       if (!byDay[day]) {
//         byDay[day] = [];
//       }
//       byDay[day].push(`${slot.start_time} - ${slot.end_time}`);
//     });
    
//     return byDay;
//   }

//   function formatTimeRange(startTime, endTime) {
//     const formatTime = (time) => {
//       const [hours, minutes] = time.split(':');
//       const hour = parseInt(hours);
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//       return `${displayHour}:${minutes} ${period}`;
//     };
//     return `${formatTime(startTime)} - ${formatTime(endTime)}`;
//   }

//   function slotToTime(slotIndex) {
//     const startHour = 7 + Number(slotIndex);
//     const endHour = startHour + 1;

//     const formatTime = (hour) => {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//       return `${adjusted}:00 ${period}`;
//     };

//     return `${formatTime(startHour)} - ${formatTime(endHour)}`;
//   }

//   function detectConflicts(assignments) {
//     const conflictList = [];
//     const roomUsage = new Map();
//     const instructorUsage = new Map();
//     const sectionUsage = new Map();

//     assignments.forEach((a, idx) => {
//       const room = rooms.find(r => r.id === a.room_id);
//       const instructor = courseInstructors.find(i => i.id === a.instructor_id) || 
//                          allInstructors.find(i => i.id === a.instructor_id);
//       const subject = subjects.find(s => s.id === a.subject_id);

//       // Check room conflicts
//       const roomKey = `${a.room_id}-${a.day}-${a.slot_index}`;
//       if (roomUsage.has(roomKey)) {
//         const existing = roomUsage.get(roomKey);
//         conflictList.push({
//           type: 'room',
//           message: `Room "${room?.name || a.room_id}" is double-booked on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Conflict between subjects: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       roomUsage.set(roomKey, { ...a, subject: subject?.subject_code });

//       // Check instructor conflicts
//       const instrKey = `${a.instructor_id}-${a.day}-${a.slot_index}`;
//       if (instructorUsage.has(instrKey)) {
//         const existing = instructorUsage.get(instrKey);
//         conflictList.push({
//           type: 'instructor',
//           message: `Instructor "${instructor?.name || a.instructor_id}" is scheduled twice on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Teaching both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       instructorUsage.set(instrKey, { ...a, subject: subject?.subject_code });

//       // Check section conflicts
//       const sectionKey = `${a.section_index}-${a.day}-${a.slot_index}`;
//       if (sectionUsage.has(sectionKey)) {
//         const existing = sectionUsage.get(sectionKey);
//         const sectionName = String.fromCharCode(65 + a.section_index);
//         conflictList.push({
//           type: 'section',
//           message: `Section ${sectionName} has overlapping classes on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       sectionUsage.set(sectionKey, { ...a, subject: subject?.subject_code });
//     });

//     return conflictList;
//   }

//   async function handleGenerate() {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select a course and at least one subject.' });
//     }

//     if (selectedInstructorIds.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select at least one instructor for this course.' });
//     }

//     const selectedButUnavailable = selectedInstructorIds.filter(id => !instructorAvailability[id]);
//     if (considerAvailability && selectedButUnavailable.length > 0) {
//       return setMessage({ 
//         type: 'warning', 
//         text: `${selectedButUnavailable.length} selected instructor(s) have no availability data. They will be excluded from scheduling.` 
//       });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);
//     setScheduleResult(null);
//     setConflicts([]);

//     try {
//       const instructorsPayload = selectedInstructorIds.map(id => ({
//         id,
//         available: instructorAvailability[id] || true
//       }));

//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester: String(semester),
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//         instructors: instructorsPayload,
//         considerInstructorAvailability: considerAvailability
//       };

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || 'Schedule generation failed');
//       }

//       // Check for conflicts
//       const detectedConflicts = detectConflicts(data.assignments || []);
//       setConflicts(detectedConflicts);

//       setScheduleResult(data);
      
//       if (detectedConflicts.length > 0) {
//         setMessage({ 
//           type: 'warning', 
//           text: `Schedule generated with ${detectedConflicts.length} conflict(s). Please review below.` 
//         });
//       } else {
//         setMessage({ type: 'success', text: data.message || 'Schedule generated successfully with no conflicts!' });
//       }
      
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: err.message || 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }

//   const renderScheduleResult = () => {
//     if (!scheduleResult?.assignments) return null;

//     const grouped = {};
//     for (const a of scheduleResult.assignments) {
//       grouped[a.section_index] = grouped[a.section_index] || [];
//       grouped[a.section_index].push(a);
//     }

//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     return (
//       <div className="mt-4">
//         {conflicts.length > 0 && (
//           <Alert variant="danger" className="mb-4">
//             <div className="d-flex align-items-center mb-2">
//               <AlertTriangle size={20} className="me-2" />
//               <strong>Schedule Conflicts Detected ({conflicts.length})</strong>
//             </div>
//             <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
//               {conflicts.map((conflict, idx) => (
//                 <li key={idx}>
//                   <strong>{conflict.type.toUpperCase()}:</strong> {conflict.message}
//                   <br />
//                   <small className="text-muted">{conflict.details}</small>
//                 </li>
//               ))}
//             </ul>
//           </Alert>
//         )}

//         <h5 className="mb-3">
//           Generated Schedule 
//           {scheduleResult.stats && (
//             <>
//               <Badge bg="success" className="ms-2">
//                 {scheduleResult.stats.totalAssignments} assignments
//               </Badge>
//               {conflicts.length === 0 && (
//                 <Badge bg="success" className="ms-2">
//                   <CheckCircle size={14} className="me-1" />
//                   No Conflicts
//                 </Badge>
//               )}
//               {conflicts.length > 0 && (
//                 <Badge bg="danger" className="ms-2">
//                   <AlertTriangle size={14} className="me-1" />
//                   {conflicts.length} Conflicts
//                 </Badge>
//               )}
//             </>
//           )}
//         </h5>
        
//         {Object.keys(grouped).map(secIdx => {
//           const sectionLetter = String.fromCharCode(65 + Number(secIdx));
//           return (
//             <Card className="my-3 shadow-sm" key={secIdx}>
//               <Card.Header className="bg-primary text-white">
//                 <h6 className="mb-0">Section {sectionLetter}</h6>
//               </Card.Header>
//               <Card.Body>
//                 <div style={{ overflowX: 'auto' }}>
//                   <Table bordered hover responsive className="text-center align-middle mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th style={{ minWidth: '120px' }}>Subject</th>
//                         <th style={{ minWidth: '150px' }}>Instructor</th>
//                         <th style={{ minWidth: '150px' }}>Room</th>
//                         {days.map(d => (
//                           <th key={d} style={{ minWidth: '120px' }}>{d}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {grouped[secIdx].map((r, i) => {
//                         const subject = subjects.find(s => s.id === r.subject_id);
//                         const instructor = courseInstructors.find(ins => ins.id === r.instructor_id) ||
//                                          allInstructors.find(ins => ins.id === r.instructor_id);
//                         const room = rooms.find(rm => rm.id === r.room_id);

//                         return (
//                           <tr key={i}>
//                             <td>
//                               <strong>{subject?.subject_code || r.subject_id}</strong>
//                               <br />
//                               <small className="text-muted">{subject?.description}</small>
//                             </td>
//                             <td>{instructor?.name || instructor?.instructor_name || 'TBD'}</td>
//                             <td>
//                               <strong>{room?.name || 'TBD'}</strong>
//                               {!room && r.room_id && (
//                                 <><br /><small className="text-muted">ID: {r.room_id}</small></>
//                               )}
//                             </td>
//                             {days.map(day => {
//                               const matchingSlot = grouped[secIdx].find(
//                                 slot => slot.subject_id === r.subject_id && slot.day === day
//                               );
//                               return (
//                                 <td key={day}>
//                                   {matchingSlot ? (
//                                     <Badge bg="info" className="p-2">
//                                       {slotToTime(matchingSlot.slot_index)}
//                                     </Badge>
//                                   ) : (
//                                     <span className="text-muted">—</span>
//                                   )}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>
//               </Card.Body>
//             </Card>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid py-4">
//       <Card className="shadow-sm border-0">
//         <Card.Body className="p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h4 className="mb-1">Generate Class Schedule</h4>
//               <small className="text-muted">
//                 Select course, subjects, and instructors. The system will automatically assign rooms and time slots (7 AM - 7 PM).
//               </small>
//             </div>
//           </div>

//           {message && (
//             <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
//               {message.text}
//             </Alert>
//           )}

//           <Row className="g-3 mb-4">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Course *</Form.Label>
//                 <Form.Select
//                   value={courseId}
//                   onChange={e => setCourseId(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="">-- Select Course --</option>
//                   {courses.map(c => (
//                     <option key={c.id} value={c.id}>
//                       {c.code} — {c.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Year Level *</Form.Label>
//                 <Form.Select
//                   value={yearLevel}
//                   onChange={e => setYearLevel(Number(e.target.value))}
//                   disabled={generating}
//                 >
//                   {[1, 2, 3, 4].map(y => (
//                     <option key={y} value={y}>{y}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Semester *</Form.Label>
//                 <Form.Select
//                   value={semester}
//                   onChange={e => setSemester(e.target.value)}
//                   disabled={generating}
//                 >
//                   <option value="1">1st Semester</option>
//                   <option value="2">2nd Semester</option>
//                   <option value="Summer">Summer</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Students per Section</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   value={studentsCount}
//                   onChange={e => setStudentsCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={2}>
//               <Form.Group>
//                 <Form.Label className="fw-bold">Number of Sections</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={sectionCount}
//                   onChange={e => setSectionCount(Number(e.target.value))}
//                   disabled={generating}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Card className="mb-4 bg-light border">
//             <Card.Body className="p-3">
//               <Form.Check
//                 type="checkbox"
//                 id="considerAvailabilityCheck"
//                 label={
//                   <span>
//                     <strong>Consider Instructor Availability</strong>
//                     <br />
//                     <small className="text-muted">
//                       When enabled, only instructors with availability data will be scheduled. 
//                       {availabilityLoaded && Object.keys(availabilityData).length === 0 ? ' (No availability data loaded)' : ''}
//                     </small>
//                   </span>
//                 }
//                 checked={considerAvailability}
//                 onChange={e => setConsiderAvailability(e.target.checked)}
//                 disabled={generating}
//               />
//             </Card.Body>
//           </Card>

//           <hr />

//           <Row>
//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">Subjects *</h6>
//                 {subjects.length > 0 && (
//                   <small className="text-muted">
//                     {selectedSubjects.length} / {subjects.length} selected
//                   </small>
//                 )}
//               </div>

//               {loadingSubjects ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" size="sm" />
//                   <span className="ms-2">Loading subjects...</span>
//                 </div>
//               ) : !courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : subjects.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No subjects available for this course, year, and semester.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {subjects.map(s => (
//                     <div key={s.id} className="form-check mb-2">
//                       <input
//                         id={`subj_${s.id}`}
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={selectedSubjects.includes(s.id)}
//                         onChange={() => toggleSubject(s.id)}
//                         disabled={generating}
//                       />
//                       <label htmlFor={`subj_${s.id}`} className="form-check-label">
//                         <strong>{s.subject_code || s.code}</strong> — {s.description}
//                         <Badge bg="secondary" className="ms-2">{s.units}u</Badge>
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>

//             <Col md={6}>
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="mb-0">Instructors * {considerAvailability && <Badge bg="warning">Availability Enabled</Badge>}</h6>
//                 {courseInstructors.length > 0 && (
//                   <div>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={selectAllInstructors}
//                       disabled={generating}
//                     >
//                       Select All
//                     </Button>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       onClick={deselectAllInstructors}
//                       disabled={generating}
//                     >
//                       Deselect All
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               {!courseId ? (
//                 <Alert variant="info" className="mb-0">
//                   Please select a course first.
//                 </Alert>
//               ) : courseInstructors.length === 0 ? (
//                 <Alert variant="warning" className="mb-0">
//                   No instructors assigned to this course. Please assign instructors first.
//                 </Alert>
//               ) : (
//                 <div
//                   style={{
//                     maxHeight: '300px',
//                     overflowY: 'auto',
//                     border: '1px solid #dee2e6',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: '#f8f9fa'
//                   }}
//                 >
//                   {courseInstructors.map(ins => (
//                     <div key={ins.id} className="mb-3 pb-2" style={{ borderBottom: '1px solid #dee2e6' }}>
//                       <div className="form-check mb-2">
//                         <input
//                           id={`instr_${ins.id}`}
//                           className="form-check-input"
//                           type="checkbox"
//                           checked={selectedInstructorIds.includes(ins.id)}
//                           onChange={() => toggleInstructor(ins.id)}
//                           disabled={generating}
//                         />
//                         <label htmlFor={`instr_${ins.id}`} className="form-check-label">
//                           <strong>{ins.name || ins.instructor_name}</strong>
//                         </label>
//                       </div>
//                       {considerAvailability && (
//                         <div className="ms-4">
//                           {instructorAvailability[ins.id] ? (
//                             <>
//                               <div className="d-flex align-items-center gap-2 mb-2">
//                                 <CheckCircle size={14} className="text-success" />
//                                 <small className="text-success fw-bold">{getInstructorSlots(ins)} availability slots</small>
//                               </div>
//                               <div style={{ fontSize: '0.8rem', color: '#666', marginLeft: '1.5rem' }}>
//                                 {Object.entries(getInstructorAvailabilityTimes(ins)).map(([day, times]) => (
//                                   <div key={day} style={{ marginBottom: '0.3rem' }}>
//                                     <strong>{day}:</strong> {times.map((t, idx) => (
//                                       <span key={idx}>
//                                         {formatTimeRange(t.split(' - ')[0], t.split(' - ')[1])}
//                                         {idx < times.length - 1 && ', '}
//                                       </span>
//                                     ))}
//                                   </div>
//                                 ))}
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <div className="d-flex align-items-center gap-2">
//                                 <AlertCircle size={14} className="text-warning" />
//                                 <small className="text-warning">No availability data</small>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Col>
//           </Row>

//           <hr />

//           <div className="d-flex gap-2">
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={() => setShowConfirm(true)}
//               disabled={generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0}
//             >
//               {generating ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Generating...
//                 </>
//               ) : (
//                 'Generate Schedule'
//               )}
//             </Button>

//             {scheduleResult && (
//               <Button
//                 variant="outline-secondary"
//                 size="lg"
//                 onClick={() => {
//                   setScheduleResult(null);
//                   setConflicts([]);
//                 }}
//               >
//                 Clear Results
//               </Button>
//             )}
//           </div>

//           {scheduleResult && renderScheduleResult()}

//           <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Confirm Schedule Generation</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <p><strong>Course:</strong> {courses.find(c => String(c.id) === String(courseId))?.name}</p>
//               <p><strong>Year Level:</strong> {yearLevel}</p>
//               <p><strong>Semester:</strong> {semester}</p>
//               <p><strong>Sections:</strong> {sectionCount}</p>
//               <p><strong>Students per Section:</strong> {studentsCount}</p>
//               <p><strong>Subjects:</strong> {selectedSubjects.length}</p>
//               <p><strong>Instructors:</strong> {selectedInstructorIds.length}</p>
//               <p>
//                 <strong>Instructor Availability:</strong> {considerAvailability ? 'Enforced' : 'Ignored'}
//               </p>
//               <hr />
//               <Alert variant="info" className="mb-0">
//                 <small>
//                   The system will automatically assign rooms and time slots (7 AM - 7 PM) 
//                   while preventing any scheduling conflicts.
//                 </small>
//               </Alert>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleGenerate}>
//                 Confirm & Generate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import {
//   BookOpen,
//   Users,
//   Calendar,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Play,
//   RefreshCw,
//   Download,
//   Search,
//   Filter,
//   X,
//   ChevronDown,
//   Award,
//   DoorOpen,
//   Zap,
//   TrendingUp,
//   FileText,
//   Eye,
//   Edit2,
//   Trash2,
//   Plus
// } from 'lucide-react';

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const COLORS = {
//   primary: '#03045E',
//   secondary: '#023E8A',
//   accent: '#0077B6',
//   accentLight: '#0096C7',
//   light: '#00B4D8',
//   lighter: '#48CAE4',
//   lightest: '#90E0EF',
//   background: '#ADE8F4',
//   ultraLight: '#CAF0F8',
// };

// const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
//   const hour = 7 + i;
//   const displayHour = hour > 12 ? hour - 12 : hour;
//   const period = hour >= 12 ? 'PM' : 'AM';
//   return `${displayHour}:00 ${period}`;
// });

// const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// // ==================== UTILITY FUNCTIONS ====================
// const getYearLabel = (year) => {
//   const labels = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };
//   return labels[year] || `Year ${year}`;
// };

// const getSemesterLabel = (sem) => {
//   const labels = { '1': '1st Semester', '2': '2nd Semester', 'Summer': 'Summer' };
//   return labels[sem] || sem;
// };

// const slotToTime = (slotIndex) => {
//   const startHour = 7 + Number(slotIndex);
//   const endHour = startHour + 1;
//   const formatTime = (hour) => {
//     const period = hour >= 12 ? 'PM' : 'AM';
//     const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//     return `${adjusted}:00 ${period}`;
//   };
//   return `${formatTime(startHour)}-${formatTime(endHour)}`;
// };

// // ==================== TOAST NOTIFICATION ====================
// const Toast = React.memo(({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   if (!message) return null;

//   const styles = {
//     success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', Icon: CheckCircle },
//     warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', Icon: AlertCircle },
//     danger: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', Icon: AlertCircle },
//   };

//   const style = styles[type] || styles.success;
//   const Icon = style.Icon;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       zIndex: 10000,
//       background: style.bg,
//       border: `2px solid ${style.border}`,
//       color: style.color,
//       padding: '16px 20px',
//       borderRadius: '12px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       minWidth: '300px',
//       animation: 'slideIn 0.3s ease-out',
//     }}>
//       <Icon size={20} />
//       <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{message}</span>
//       <button onClick={onClose} style={{
//         background: 'transparent',
//         border: 'none',
//         cursor: 'pointer',
//         padding: '4px',
//         display: 'flex',
//         alignItems: 'center',
//         color: 'inherit',
//         opacity: 0.7,
//       }}>
//         <X size={16} />
//       </button>
//     </div>
//   );
// });

// // ==================== LOADING SKELETON ====================
// const LoadingState = React.memo(() => (
//   <div style={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '60px 20px',
//     gap: '16px',
//   }}>
//     <div style={{
//       width: '48px',
//       height: '48px',
//       border: `4px solid ${COLORS.ultraLight}`,
//       borderTop: `4px solid ${COLORS.primary}`,
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite',
//     }} />
//     <p style={{ color: COLORS.secondary, fontSize: '14px', margin: 0 }}>Loading schedule data...</p>
//   </div>
// ));

// // ==================== STATS CARD ====================
// const StatsCard = React.memo(({ icon: Icon, label, value, color }) => (
//   <div style={{
//     background: 'white',
//     padding: '20px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//     borderTop: `4px solid ${color}`,
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     transition: 'transform 0.2s ease',
//     cursor: 'pointer',
//   }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
//      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
//     <div style={{
//       width: '56px',
//       height: '56px',
//       borderRadius: '12px',
//       background: `${color}20`,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color,
//     }}>
//       <Icon size={28} />
//     </div>
//     <div>
//       <div style={{
//         fontSize: '28px',
//         fontWeight: '700',
//         color: COLORS.primary,
//         lineHeight: 1,
//         marginBottom: '4px',
//       }}>{value}</div>
//       <div style={{ fontSize: '13px', color: COLORS.secondary, opacity: 0.8 }}>{label}</div>
//     </div>
//   </div>
// ));

// // ==================== COURSE SELECTION FORM ====================
// const CourseSelectionForm = React.memo(({
//   courses,
//   courseId,
//   setCourseId,
//   yearLevel,
//   setYearLevel,
//   semester,
//   setSemester,
//   studentsCount,
//   setStudentsCount,
//   sectionCount,
//   setSectionCount,
//   disabled
// }) => (
//   <div style={{
//     background: 'white',
//     padding: '24px',
//     borderRadius: '16px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     marginBottom: '20px',
//   }}>
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       marginBottom: '20px',
//       paddingBottom: '16px',
//       borderBottom: `2px solid ${COLORS.ultraLight}`,
//     }}>
//       <BookOpen size={24} color={COLORS.primary} />
//       <h3 style={{ fontSize: '18px', fontWeight: '700', color: COLORS.primary, margin: 0 }}>
//         Course & Schedule Configuration
//       </h3>
//     </div>

//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '16px',
//     }}>
//       <div>
//         <label style={{
//           display: 'block',
//           fontSize: '13px',
//           fontWeight: '600',
//           color: COLORS.secondary,
//           marginBottom: '8px',
//         }}>
//           Course *
//         </label>
//         <select
//           value={courseId}
//           onChange={e => setCourseId(e.target.value)}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '10px 12px',
//             border: `2px solid ${COLORS.ultraLight}`,
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: COLORS.primary,
//             outline: 'none',
//             cursor: 'pointer',
//             transition: 'border-color 0.2s',
//           }}
//         >
//           <option value="">-- Select Course --</option>
//           {courses.map(c => (
//             <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label style={{
//           display: 'block',
//           fontSize: '13px',
//           fontWeight: '600',
//           color: COLORS.secondary,
//           marginBottom: '8px',
//         }}>
//           Year Level *
//         </label>
//         <select
//           value={yearLevel}
//           onChange={e => setYearLevel(Number(e.target.value))}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '10px 12px',
//             border: `2px solid ${COLORS.ultraLight}`,
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: COLORS.primary,
//             outline: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           {[1, 2, 3, 4].map(y => (
//             <option key={y} value={y}>{getYearLabel(y)}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label style={{
//           display: 'block',
//           fontSize: '13px',
//           fontWeight: '600',
//           color: COLORS.secondary,
//           marginBottom: '8px',
//         }}>
//           Semester *
//         </label>
//         <select
//           value={semester}
//           onChange={e => setSemester(e.target.value)}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '10px 12px',
//             border: `2px solid ${COLORS.ultraLight}`,
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: COLORS.primary,
//             outline: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <option value="1">1st Semester</option>
//           <option value="2">2nd Semester</option>
//           <option value="Summer">Summer</option>
//         </select>
//       </div>

//       <div>
//         <label style={{
//           display: 'block',
//           fontSize: '13px',
//           fontWeight: '600',
//           color: COLORS.secondary,
//           marginBottom: '8px',
//         }}>
//           Students/Section
//         </label>
//         <input
//           type="number"
//           min="1"
//           value={studentsCount}
//           onChange={e => setStudentsCount(Number(e.target.value))}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '10px 12px',
//             border: `2px solid ${COLORS.ultraLight}`,
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: COLORS.primary,
//             outline: 'none',
//           }}
//         />
//       </div>

//       <div>
//         <label style={{
//           display: 'block',
//           fontSize: '13px',
//           fontWeight: '600',
//           color: COLORS.secondary,
//           marginBottom: '8px',
//         }}>
//           Number of Sections
//         </label>
//         <input
//           type="number"
//           min="1"
//           max="10"
//           value={sectionCount}
//           onChange={e => setSectionCount(Number(e.target.value))}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '10px 12px',
//             border: `2px solid ${COLORS.ultraLight}`,
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: COLORS.primary,
//             outline: 'none',
//           }}
//         />
//       </div>
//     </div>
//   </div>
// ));

// // ==================== INSTRUCTOR AVAILABILITY TOGGLE ====================
// const AvailabilityToggle = React.memo(({ enabled, onChange, disabled, availabilityLoaded }) => (
//   <div style={{
//     background: enabled ? `${COLORS.light}15` : '#f8f9fa',
//     border: `2px solid ${enabled ? COLORS.light : '#e2e8f0'}`,
//     borderRadius: '12px',
//     padding: '16px 20px',
//     marginBottom: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//   }}>
//     <input
//       type="checkbox"
//       checked={enabled}
//       onChange={e => onChange(e.target.checked)}
//       disabled={disabled}
//       style={{
//         width: '20px',
//         height: '20px',
//         cursor: 'pointer',
//         accentColor: COLORS.primary,
//       }}
//     />
//     <div style={{ flex: 1 }}>
//       <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.primary, marginBottom: '4px' }}>
//         Consider Instructor Availability
//       </div>
//       <div style={{ fontSize: '12px', color: COLORS.secondary, opacity: 0.8 }}>
//         When enabled, only instructors with availability data will be scheduled
//         {!availabilityLoaded && ' (Loading availability data...)'}
//       </div>
//     </div>
//     {enabled && <CheckCircle size={20} color={COLORS.light} />}
//   </div>
// ));

// // ==================== SUBJECT LIST ====================
// const SubjectList = React.memo(({
//   subjects,
//   selectedSubjects,
//   onToggle,
//   loading,
//   disabled,
//   courseId
// }) => {
//   if (loading) {
//     return (
//       <div style={{ padding: '40px', textAlign: 'center' }}>
//         <div style={{
//           width: '32px',
//           height: '32px',
//           border: `3px solid ${COLORS.ultraLight}`,
//           borderTop: `3px solid ${COLORS.primary}`,
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite',
//           margin: '0 auto 12px',
//         }} />
//         <p style={{ fontSize: '13px', color: COLORS.secondary }}>Loading subjects...</p>
//       </div>
//     );
//   }

//   if (!courseId) {
//     return (
//       <div style={{
//         padding: '40px',
//         textAlign: 'center',
//         background: COLORS.ultraLight,
//         borderRadius: '8px',
//       }}>
//         <BookOpen size={48} color={COLORS.lighter} style={{ marginBottom: '12px' }} />
//         <p style={{ fontSize: '14px', color: COLORS.secondary, margin: 0 }}>
//           Select a course to view subjects
//         </p>
//       </div>
//     );
//   }

//   if (subjects.length === 0) {
//     return (
//       <div style={{
//         padding: '40px',
//         textAlign: 'center',
//         background: '#fff3cd',
//         border: '2px solid #ffeaa7',
//         borderRadius: '8px',
//       }}>
//         <AlertCircle size={48} color="#856404" style={{ marginBottom: '12px' }} />
//         <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
//           No subjects available for this selection
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxHeight: '350px',
//       overflowY: 'auto',
//       border: `2px solid ${COLORS.ultraLight}`,
//       borderRadius: '8px',
//       padding: '12px',
//       background: '#f8f9fa',
//     }}>
//       {subjects.map(s => (
//         <div key={s.id} style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           gap: '12px',
//           padding: '12px',
//           background: 'white',
//           borderRadius: '8px',
//           marginBottom: '8px',
//           border: `2px solid ${selectedSubjects.includes(s.id) ? COLORS.light : 'transparent'}`,
//           transition: 'all 0.2s',
//           cursor: 'pointer',
//         }} onClick={() => !disabled && onToggle(s.id)}>
//           <input
//             type="checkbox"
//             checked={selectedSubjects.includes(s.id)}
//             onChange={() => {}}
//             disabled={disabled}
//             style={{
//               width: '18px',
//               height: '18px',
//               marginTop: '2px',
//               cursor: 'pointer',
//               accentColor: COLORS.primary,
//             }}
//           />
//           <div style={{ flex: 1 }}>
//             <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.primary, marginBottom: '4px' }}>
//               {s.subject_code || s.code}
//             </div>
//             <div style={{ fontSize: '13px', color: COLORS.secondary, opacity: 0.8 }}>
//               {s.description}
//             </div>
//           </div>
//           <span style={{
//             background: COLORS.lightest,
//             color: COLORS.primary,
//             padding: '4px 12px',
//             borderRadius: '12px',
//             fontSize: '12px',
//             fontWeight: '600',
//           }}>
//             {s.units}u
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// });

// // ==================== INSTRUCTOR LIST ====================
// const InstructorList = React.memo(({
//   instructors,
//   selectedIds,
//   onToggle,
//   availabilityData,
//   considerAvailability,
//   courseId,
//   disabled
// }) => {
//   const formatTimeRange = (start, end) => {
//     const formatTime = (time) => {
//       const [hours, minutes] = time.split(':');
//       const hour = parseInt(hours);
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//       return `${displayHour}:${minutes} ${period}`;
//     };
//     return `${formatTime(start)} - ${formatTime(end)}`;
//   };

//   if (!courseId) {
//     return (
//       <div style={{
//         padding: '40px',
//         textAlign: 'center',
//         background: COLORS.ultraLight,
//         borderRadius: '8px',
//       }}>
//         <Users size={48} color={COLORS.lighter} style={{ marginBottom: '12px' }} />
//         <p style={{ fontSize: '14px', color: COLORS.secondary, margin: 0 }}>
//           Select a course to view instructors
//         </p>
//       </div>
//     );
//   }

//   if (instructors.length === 0) {
//     return (
//       <div style={{
//         padding: '40px',
//         textAlign: 'center',
//         background: '#fff3cd',
//         border: '2px solid #ffeaa7',
//         borderRadius: '8px',
//       }}>
//         <AlertCircle size={48} color="#856404" style={{ marginBottom: '12px' }} />
//         <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
//           No instructors assigned to this course
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxHeight: '350px',
//       overflowY: 'auto',
//       border: `2px solid ${COLORS.ultraLight}`,
//       borderRadius: '8px',
//       padding: '12px',
//       background: '#f8f9fa',
//     }}>
//       {instructors.map(ins => {
//         const name = ins.name || ins.instructor_name;
//         const slots = availabilityData[name] || [];
//         const hasAvailability = slots.length > 0;

//         // Group slots by day
//         const byDay = {};
//         slots.forEach(slot => {
//           const day = slot.day || 'Unknown';
//           if (!byDay[day]) byDay[day] = [];
//           byDay[day].push(`${slot.start_time} - ${slot.end_time}`);
//         });

//         return (
//           <div key={ins.id} style={{
//             background: 'white',
//             borderRadius: '8px',
//             marginBottom: '8px',
//             border: `2px solid ${selectedIds.includes(ins.id) ? COLORS.light : 'transparent'}`,
//             overflow: 'hidden',
//             transition: 'all 0.2s',
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'flex-start',
//               gap: '12px',
//               padding: '12px',
//               cursor: 'pointer',
//             }} onClick={() => !disabled && onToggle(ins.id)}>
//               <input
//                 type="checkbox"
//                 checked={selectedIds.includes(ins.id)}
//                 onChange={() => {}}
//                 disabled={disabled}
//                 style={{
//                   width: '18px',
//                   height: '18px',
//                   marginTop: '2px',
//                   cursor: 'pointer',
//                   accentColor: COLORS.primary,
//                 }}
//               />
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.primary, marginBottom: '4px' }}>
//                   {name}
//                 </div>
//                 {considerAvailability && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
//                     {hasAvailability ? (
//                       <>
//                         <CheckCircle size={14} color="#10b981" />
//                         <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
//                           {slots.length} availability slots
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <AlertCircle size={14} color="#f59e0b" />
//                         <span style={{ fontSize: '12px', color: '#f59e0b' }}>
//                           No availability data
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {considerAvailability && hasAvailability && selectedIds.includes(ins.id) && (
//               <div style={{
//                 background: COLORS.ultraLight,
//                 padding: '12px',
//                 borderTop: `1px solid ${COLORS.lightest}`,
//               }}>
//                 <div style={{ fontSize: '11px', fontWeight: '600', color: COLORS.secondary, marginBottom: '8px' }}>
//                   Available Time Slots:
//                 </div>
//                 {Object.entries(byDay).map(([day, times]) => (
//                   <div key={day} style={{ fontSize: '11px', color: COLORS.secondary, marginBottom: '4px' }}>
//                     <strong>{day}:</strong> {times.map((t, idx) => {
//                       const [start, end] = t.split(' - ');
//                       return (
//                         <span key={idx}>
//                           {formatTimeRange(start, end)}
//                           {idx < times.length - 1 && ', '}
//                         </span>
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// });

// // ==================== SCHEDULE PREVIEW ====================
// const SchedulePreview = React.memo(({
//   scheduleResult,
//   subjects,
//   instructors,
//   rooms,
//   onClear
// }) => {
//   if (!scheduleResult?.assignments) return null;

//   const grouped = {};
//   scheduleResult.assignments.forEach(a => {
//     const key = a.section_index;
//     if (!grouped[key]) grouped[key] = [];
//     grouped[key].push(a);
//   });

//   return (
//     <div style={{
//       background: 'white',
//       borderRadius: '16px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//       marginTop: '20px',
//     }}>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '20px',
//         paddingBottom: '16px',
//         borderBottom: `2px solid ${COLORS.ultraLight}`,
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <Calendar size={24} color={COLORS.primary} />
//           <h3 style={{ fontSize: '18px', fontWeight: '700', color: COLORS.primary, margin: 0 }}>
//             Generated Schedule
//           </h3>
//           {scheduleResult.stats && (
//             <span style={{
//               background: '#10b98120',
//               color: '#10b981',
//               padding: '4px 12px',
//               borderRadius: '12px',
//               fontSize: '12px',
//               fontWeight: '600',
//             }}>
//               {scheduleResult.stats.totalAssignments} assignments
//             </span>
//           )}
//         </div>
//         <button onClick={onClear} style={{
//           padding: '8px 16px',
//           background: '#f1f5f9',
//           border: 'none',
//           borderRadius: '8px',
//           color: COLORS.secondary,
//           fontSize: '13px',
//           fontWeight: '600',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '6px',
//           transition: 'all 0.2s',
//         }}>
//           <X size={16} />
//           Clear Results
//         </button>
//       </div>

//       {Object.keys(grouped).map(secIdx => {
//         const sectionLetter = String.fromCharCode(65 + Number(secIdx));
//         return (
//           <div key={secIdx} style={{
//             background: COLORS.ultraLight,
//             borderRadius: '12px',
//             padding: '20px',
//             marginBottom: '16px',
//             border: `2px solid ${COLORS.lightest}`,
//           }}>
//             <h4 style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               color: COLORS.primary,
//               marginBottom: '16px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//             }}>
//               <Award size={20} />
//               Section {sectionLetter}
//             </h4>

//             <div style={{ overflowX: 'auto' }}>
//               <table style={{
//                 width: '100%',
//                 borderCollapse: 'collapse',
//                 background: 'white',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//               }}>
//                 <thead>
//                   <tr style={{ background: COLORS.primary }}>
//                     <th style={{
//                       padding: '12px',
//                       textAlign: 'left',
//                       color: 'white',
//                       fontSize: '13px',
//                       fontWeight: '600',
//                       minWidth: '120px',
//                     }}>Subject</th>
//                     <th style={{
//                       padding: '12px',
//                       textAlign: 'left',
//                       color: 'white',
//                       fontSize: '13px',
//                       fontWeight: '600',
//                       minWidth: '150px',
//                     }}>Instructor</th>
//                     <th style={{
//                       padding: '12px',
//                       textAlign: 'left',
//                       color: 'white',
//                       fontSize: '13px',
//                       fontWeight: '600',
//                       minWidth: '100px',
//                     }}>Room</th>
//                     {DAYS.map(d => (
//                       <th key={d} style={{
//                         padding: '12px',
//                         textAlign: 'center',
//                         color: 'white',
//                         fontSize: '13px',
//                         fontWeight: '600',
//                         minWidth: '120px',
//                       }}>{d}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {grouped[secIdx].map((r, i) => {
//                     const subject = subjects.find(s => s.id === r.subject_id);
//                     const instructor = instructors.find(ins => ins.id === r.instructor_id);
//                     const room = rooms.find(rm => rm.id === r.room_id);

//                     return (
//                       <tr key={i} style={{ borderBottom: `1px solid ${COLORS.ultraLight}` }}>
//                         <td style={{ padding: '12px' }}>
//                           <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.primary }}>
//                             {subject?.subject_code || r.subject_id}
//                           </div>
//                           <div style={{ fontSize: '11px', color: COLORS.secondary, opacity: 0.8 }}>
//                             {subject?.description}
//                           </div>
//                         </td>
//                         <td style={{ padding: '12px', fontSize: '13px', color: COLORS.secondary }}>
//                           {instructor?.name || instructor?.instructor_name || 'TBD'}
//                         </td>
//                         <td style={{ padding: '12px' }}>
//                           <span style={{
//                             background: COLORS.lightest,
//                             color: COLORS.primary,
//                             padding: '4px 10px',
//                             borderRadius: '6px',
//                             fontSize: '12px',
//                             fontWeight: '600',
//                           }}>
//                             {room?.name || r.room_id || 'TBD'}
//                           </span>
//                         </td>
//                         {DAYS.map(day => {
//                           const matchingSlot = grouped[secIdx].find(
//                             slot => slot.subject_id === r.subject_id && slot.day === day
//                           );
//                           return (
//                             <td key={day} style={{ padding: '12px', textAlign: 'center' }}>
//                               {matchingSlot ? (
//                                 <span style={{
//                                   background: COLORS.light,
//                                   color: 'white',
//                                   padding: '6px 12px',
//                                   borderRadius: '6px',
//                                   fontSize: '11px',
//                                   fontWeight: '600',
//                                   display: 'inline-block',
//                                 }}>
//                                   {slotToTime(matchingSlot.slot_index)}
//                                 </span>
//                               ) : (
//                                 <span style={{ color: COLORS.lighter }}>—</span>
//                               )}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// });

// // ==================== CONFIRMATION MODAL ====================
// const ConfirmationModal = React.memo(({
//   show,
//   onClose,
//   onConfirm,
//   course,
//   yearLevel,
//   semester,
//   sectionCount,
//   studentsCount,
//   subjectCount,
//   instructorCount,
//   considerAvailability
// }) => {
//   if (!show) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 9999,
//       animation: 'fadeIn 0.2s ease',
//     }} onClick={onClose}>
//       <div style={{
//         background: 'white',
//         borderRadius: '16px',
//         maxWidth: '500px',
//         width: '90%',
//         overflow: 'hidden',
//         boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//         animation: 'scaleIn 0.3s ease',
//       }} onClick={e => e.stopPropagation()}>
//         <div style={{
//           background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//           padding: '20px 24px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//           <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>
//             Confirm Schedule Generation
//           </h3>
//           <button onClick={onClose} style={{
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             color: 'white',
//             cursor: 'pointer',
//             width: '32px',
//             height: '32px',
//             borderRadius: '8px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//             <X size={18} />
//           </button>
//         </div>

//         <div style={{ padding: '24px' }}>
//           <div style={{
//             background: COLORS.ultraLight,
//             borderRadius: '12px',
//             padding: '16px',
//             marginBottom: '20px',
//           }}>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'auto 1fr',
//               gap: '12px 16px',
//               fontSize: '14px',
//             }}>
//               <strong style={{ color: COLORS.secondary }}>Course:</strong>
//               <span style={{ color: COLORS.primary, fontWeight: '600' }}>{course?.name || 'N/A'}</span>

//               <strong style={{ color: COLORS.secondary }}>Year Level:</strong>
//               <span style={{ color: COLORS.primary }}>{getYearLabel(yearLevel)}</span>

//               <strong style={{ color: COLORS.secondary }}>Semester:</strong>
//               <span style={{ color: COLORS.primary }}>{getSemesterLabel(semester)}</span>

//               <strong style={{ color: COLORS.secondary }}>Sections:</strong>
//               <span style={{ color: COLORS.primary }}>{sectionCount}</span>

//               <strong style={{ color: COLORS.secondary }}>Students/Section:</strong>
//               <span style={{ color: COLORS.primary }}>{studentsCount}</span>

//               <strong style={{ color: COLORS.secondary }}>Subjects:</strong>
//               <span style={{ color: COLORS.primary }}>{subjectCount}</span>

//               <strong style={{ color: COLORS.secondary }}>Instructors:</strong>
//               <span style={{ color: COLORS.primary }}>{instructorCount}</span>

//               <strong style={{ color: COLORS.secondary }}>Availability:</strong>
//               <span style={{ color: considerAvailability ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
//                 {considerAvailability ? 'Enforced' : 'Ignored'}
//               </span>
//             </div>
//           </div>

//           <div style={{
//             background: '#e0f2fe',
//             border: '2px solid #bae6fd',
//             borderRadius: '8px',
//             padding: '12px',
//             marginBottom: '20px',
//           }}>
//             <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
//               <AlertCircle size={18} color={COLORS.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
//               <p style={{ fontSize: '13px', color: COLORS.secondary, margin: 0, lineHeight: '1.5' }}>
//                 The system will automatically assign rooms and time slots (7 AM - 7 PM) 
//                 while preventing any scheduling conflicts.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div style={{
//           padding: '16px 24px',
//           borderTop: `2px solid ${COLORS.ultraLight}`,
//           display: 'flex',
//           justifyContent: 'flex-end',
//           gap: '12px',
//         }}>
//           <button onClick={onClose} style={{
//             padding: '10px 20px',
//             background: '#f1f5f9',
//             border: 'none',
//             borderRadius: '8px',
//             color: COLORS.secondary,
//             fontSize: '14px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             transition: 'all 0.2s',
//           }}>
//             Cancel
//           </button>
//           <button onClick={onConfirm} style={{
//             padding: '10px 20px',
//             background: COLORS.primary,
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             fontSize: '14px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             transition: 'all 0.2s',
//           }}>
//             <Play size={16} />
//             Confirm & Generate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function DeanSchedulePage() {
//   // State Management
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);

//   const [allInstructors, setAllInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
//   const [availabilityData, setAvailabilityData] = useState({});
//   const [availabilityLoaded, setAvailabilityLoaded] = useState(false);

//   const [rooms, setRooms] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [considerAvailability, setConsiderAvailability] = useState(true);

//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [loadingSaved, setLoadingSaved] = useState(false);

//   // Initial data fetch
//   useEffect(() => {
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRooms();
//     fetchAvailabilityData();
//     loadSchedules();
//   }, []);

//   // API Functions
//   const loadSchedules = useCallback(async () => {
//     setLoadingSaved(true);
//     try {
//       const res = await fetch(`${API}/api/scheduler`);
//       if (!res.ok) throw new Error('Failed to fetch schedules');
//       const data = await res.json();
//       setSavedSchedules(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Error loading schedules:', err);
//       setSavedSchedules([]);
//     } finally {
//       setLoadingSaved(false);
//     }
//   }, []);

//   const fetchCourses = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchCourses error:', err);
//       setCourses([]);
//     }
//   }, []);

//   const fetchAllInstructors = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setAllInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('fetchAllInstructors error:', err);
//       setAllInstructors([]);
//     }
//   }, []);

//   const fetchRooms = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('fetchRooms error:', err);
//       setRooms([]);
//     }
//   }, []);

//   const fetchAvailabilityData = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) throw new Error('Failed to fetch availability');
//       const data = await res.json();

//       const availMap = {};
//       if (Array.isArray(data)) {
//         data.forEach(item => {
//           const name = item.instructorName || 'Unknown';
//           if (!availMap[name]) {
//             availMap[name] = [];
//           }
//           availMap[name].push({
//             day: item.day,
//             start_time: item.start_time,
//             end_time: item.end_time
//           });
//         });
//       }
//       setAvailabilityData(availMap);
//       setAvailabilityLoaded(true);
//     } catch (err) {
//       console.error('Error fetching availability data:', err);
//       setAvailabilityLoaded(true);
//     }
//   }, []);

//   // Load subjects & instructors based on course selection
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorIds([]);
//       return;
//     }

//     const loadSubjects = async () => {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     };

//     const loadCourseInstructors = async () => {
//       try {
//         const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setCourseInstructors(data);
//             return;
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching instructors by course:', err);
//       }

//       const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//     };

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, allInstructors]);

//   const toggleSubject = useCallback((id) => {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }, []);

//   const toggleInstructor = useCallback((id) => {
//     setSelectedInstructorIds(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }, []);

//   const selectAllInstructors = useCallback(() => {
//     setSelectedInstructorIds(courseInstructors.map(i => i.id));
//   }, [courseInstructors]);

//   const deselectAllInstructors = useCallback(() => {
//     setSelectedInstructorIds([]);
//   }, []);

//   const showToast = useCallback((message, type) => {
//     setToast({ message, type });
//   }, []);

//   const handleGenerate = useCallback(async () => {
//     if (!courseId || selectedSubjects.length === 0) {
//       showToast('Please select a course and at least one subject', 'danger');
//       return;
//     }

//     if (selectedInstructorIds.length === 0) {
//       showToast('Please select at least one instructor', 'danger');
//       return;
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setScheduleResult(null);

//     try {
//       const instructorsPayload = selectedInstructorIds.map(id => ({
//         id,
//         available: true
//       }));

//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester: String(semester),
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//         instructors: instructorsPayload,
//         considerInstructorAvailability: considerAvailability
//       };

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || 'Schedule generation failed');
//       }

//       setScheduleResult(data);
//       showToast(data.message || 'Schedule generated successfully!', 'success');
//       await loadSchedules();
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       showToast(err.message || 'Schedule generation failed', 'danger');
//     } finally {
//       setGenerating(false);
//     }
//   }, [courseId, selectedSubjects, selectedInstructorIds, yearLevel, semester, studentsCount, sectionCount, considerAvailability, showToast, loadSchedules]);

//   const selectedCourse = useMemo(() => {
//     return courses.find(c => String(c.id) === String(courseId));
//   }, [courses, courseId]);

//   const stats = useMemo(() => ({
//     totalCourses: courses.length,
//     totalSubjects: subjects.length,
//     selectedInstructors: selectedInstructorIds.length,
//     savedSchedules: savedSchedules.length,
//   }), [courses, subjects, selectedInstructorIds, savedSchedules]);

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${COLORS.ultraLight} 0%, #ffffff 100%)`,
//       padding: '20px',
//     }}>
//       <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

//       <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{
//           background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//           borderRadius: '16px',
//           padding: '32px 40px',
//           marginBottom: '24px',
//           boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
//                 <Calendar size={32} color="white" />
//                 <h1 style={{
//                   fontSize: '32px',
//                   fontWeight: '700',
//                   color: 'white',
//                   margin: 0,
//                   letterSpacing: '-0.5px',
//                 }}>
//                   Schedule Generation
//                 </h1>
//               </div>
//               <p style={{
//                 fontSize: '16px',
//                 color: 'rgba(255,255,255,0.9)',
//                 margin: 0,
//               }}>
//                 Generate and manage class schedules with automatic conflict resolution
//               </p>
//             </div>

//             <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//               <button onClick={loadSchedules} disabled={loadingSaved} style={{
//                 padding: '10px 20px',
//                 background: 'rgba(255,255,255,0.2)',
//                 border: 'none',
//                 borderRadius: '8px',
//                 color: 'white',
//                 cursor: loadingSaved ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 fontSize: '14px',
//                 fontWeight: '500',
//               }}>
//                 <RefreshCw size={18} style={{ animation: loadingSaved ? 'spin 1s linear infinite' : 'none' }} />
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//           gap: '20px',
//           marginBottom: '24px',
//         }}>
//           <StatsCard icon={BookOpen} label="Total Courses" value={stats.totalCourses} color={COLORS.primary} />
//           <StatsCard icon={Users} label="Selected Instructors" value={stats.selectedInstructors} color={COLORS.accent} />
//           <StatsCard icon={Award} label="Subjects Available" value={stats.totalSubjects} color={COLORS.light} />
//           <StatsCard icon={Calendar} label="Saved Schedules" value={stats.savedSchedules} color={COLORS.lighter} />
//         </div>

//         {/* Course Selection Form */}
//         <CourseSelectionForm
//           courses={courses}
//           courseId={courseId}
//           setCourseId={setCourseId}
//           yearLevel={yearLevel}
//           setYearLevel={setYearLevel}
//           semester={semester}
//           setSemester={setSemester}
//           studentsCount={studentsCount}
//           setStudentsCount={setStudentsCount}
//           sectionCount={sectionCount}
//           setSectionCount={setSectionCount}
//           disabled={generating}
//         />

//         {/* Availability Toggle */}
//         <AvailabilityToggle
//           enabled={considerAvailability}
//           onChange={setConsiderAvailability}
//           disabled={generating}
//           availabilityLoaded={availabilityLoaded}
//         />

//         {/* Subjects & Instructors Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//           gap: '20px',
//           marginBottom: '24px',
//         }}>
//           {/* Subjects Panel */}
//           <div style={{
//             background: 'white',
//             borderRadius: '16px',
//             padding: '24px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px',
//               paddingBottom: '12px',
//               borderBottom: `2px solid ${COLORS.ultraLight}`,
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <BookOpen size={20} color={COLORS.primary} />
//                 <h3 style={{ fontSize: '16px', fontWeight: '700', color: COLORS.primary, margin: 0 }}>
//                   Subjects
//                 </h3>
//               </div>
//               {subjects.length > 0 && (
//                 <span style={{
//                   background: COLORS.lightest,
//                   color: COLORS.primary,
//                   padding: '4px 12px',
//                   borderRadius: '12px',
//                   fontSize: '12px',
//                   fontWeight: '600',
//                 }}>
//                   {selectedSubjects.length} / {subjects.length}
//                 </span>
//               )}
//             </div>

//             <SubjectList
//               subjects={subjects}
//               selectedSubjects={selectedSubjects}
//               onToggle={toggleSubject}
//               loading={loadingSubjects}
//               disabled={generating}
//               courseId={courseId}
//             />
//           </div>

//           {/* Instructors Panel */}
//           <div style={{
//             background: 'white',
//             borderRadius: '16px',
//             padding: '24px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px',
//               paddingBottom: '12px',
//               borderBottom: `2px solid ${COLORS.ultraLight}`,
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <Users size={20} color={COLORS.primary} />
//                 <h3 style={{ fontSize: '16px', fontWeight: '700', color: COLORS.primary, margin: 0 }}>
//                   Instructors
//                 </h3>
//                 {considerAvailability && (
//                   <span style={{
//                     background: '#fff3cd',
//                     color: '#856404',
//                     padding: '4px 8px',
//                     borderRadius: '8px',
//                     fontSize: '10px',
//                     fontWeight: '600',
//                   }}>
//                     AVAILABILITY ON
//                   </span>
//                 )}
//               </div>
//               {courseInstructors.length > 0 && (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                   <button onClick={selectAllInstructors} disabled={generating} style={{
//                     padding: '4px 12px',
//                     background: 'transparent',
//                     border: `1px solid ${COLORS.light}`,
//                     borderRadius: '6px',
//                     color: COLORS.light,
//                     fontSize: '11px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                   }}>
//                     Select All
//                   </button>
//                   <button onClick={deselectAllInstructors} disabled={generating} style={{
//                     padding: '4px 12px',
//                     background: 'transparent',
//                     border: '1px solid #cbd5e1',
//                     borderRadius: '6px',
//                     color: '#64748b',
//                     fontSize: '11px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                   }}>
//                     Clear
//                   </button>
//                 </div>
//               )}
//             </div>

//             <InstructorList
//               instructors={courseInstructors}
//               selectedIds={selectedInstructorIds}
//               onToggle={toggleInstructor}
//               availabilityData={availabilityData}
//               considerAvailability={considerAvailability}
//               courseId={courseId}
//               disabled={generating}
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div style={{
//           background: 'white',
//           borderRadius: '16px',
//           padding: '24px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '16px',
//         }}>
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <button
//               onClick={() => setShowConfirm(true)}
//               disabled={generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0}
//               style={{
//                 padding: '14px 32px',
//                 background: generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0
//                   ? '#cbd5e1'
//                   : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 border: 'none',
//                 borderRadius: '10px',
//                 color: 'white',
//                 fontSize: '15px',
//                 fontWeight: '600',
//                 cursor: generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0 ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 boxShadow: generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0 ? 'none' : '0 4px 12px rgba(3, 4, 94, 0.3)',
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               {generating ? (
//                 <>
//                   <div style={{
//                     width: '18px',
//                     height: '18px',
//                     border: '3px solid rgba(255,255,255,0.3)',
//                     borderTop: '3px solid white',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite',
//                   }} />
//                   Generating Schedule...
//                 </>
//               ) : (
//                 <>
//                   <Play size={18} />
//                   Generate Schedule
//                 </>
//               )}
//             </button>

//             {scheduleResult && (
//               <button
//                 onClick={() => setScheduleResult(null)}
//                 style={{
//                   padding: '14px 24px',
//                   background: '#f1f5f9',
//                   border: 'none',
//                   borderRadius: '10px',
//                   color: COLORS.secondary,
//                   fontSize: '15px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   transition: 'all 0.2s',
//                 }}
//               >
//                 <X size={18} />
//                 Clear Results
//               </button>
//             )}
//           </div>

//           {scheduleResult && (
//             <button style={{
//               padding: '14px 24px',
//               background: COLORS.light,
//               border: 'none',
//               borderRadius: '10px',
//               color: 'white',
//               fontSize: '15px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//             }}>
//               <Download size={18} />
//               Export Schedule
//             </button>
//           )}
//         </div>

//         {/* Schedule Preview */}
//         <SchedulePreview
//           scheduleResult={scheduleResult}
//           subjects={subjects}
//           instructors={courseInstructors.length > 0 ? courseInstructors : allInstructors}
//           rooms={rooms}
//           onClear={() => setScheduleResult(null)}
//         />

//         {/* Confirmation Modal */}
//         <ConfirmationModal
//           show={showConfirm}
//           onClose={() => setShowConfirm(false)}
//           onConfirm={handleGenerate}
//           course={selectedCourse}
//           yearLevel={yearLevel}
//           semester={semester}
//           sectionCount={sectionCount}
//           studentsCount={studentsCount}
//           subjectCount={selectedSubjects.length}
//           instructorCount={selectedInstructorIds.length}
//           considerAvailability={considerAvailability}
//         />

//         {/* Footer */}
//         <div style={{
//           marginTop: '40px',
//           padding: '20px',
//           textAlign: 'center',
//           fontSize: '13px',
//           color: COLORS.secondary,
//           opacity: 0.7,
//         }}>
//           <p style={{ margin: 0 }}>
//             EduSched Academic Management System © 2025 • Built for Excellence in Education
//           </p>
//         </div>
//       </div>

//       {/* CSS Styles */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }

//         @keyframes scaleIn {
//           from { transform: scale(0.95); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         * {
//           box-sizing: border-box;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//         }

//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: ${COLORS.ultraLight};
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: ${COLORS.lighter};
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: ${COLORS.light};
//         }

//         input:focus,
//         select:focus,
//         button:focus {
//           outline: none;
//           box-shadow: 0 0 0 3px ${COLORS.ultraLight};
//         }

//         button:not(:disabled):hover {
//           transform: translateY(-1px);
//         }

//         button:not(:disabled):active {
//           transform: translateY(0);
//         }

//         @media (max-width: 768px) {
//           h1 {
//             font-size: 24px !important;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr !important;
//           }

//           table {
//             font-size: 12px;
//           }

//           th, td {
//             padding: 8px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { Calendar, Settings, CheckCircle, AlertTriangle, Clock, Users, BookOpen, Loader, Download, RefreshCw, Search, Filter, X } from 'lucide-react';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // ============================================
// // UTILITY FUNCTIONS
// // ============================================

// const formatTime = (time) => {
//   const [hours, minutes] = time.split(':');
//   const hour = parseInt(hours);
//   const period = hour >= 12 ? 'PM' : 'AM';
//   const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//   return `${displayHour}:${minutes} ${period}`;
// };

// const formatTimeRange = (startTime, endTime) => {
//   return `${formatTime(startTime)} - ${formatTime(endTime)}`;
// };

// const slotToTime = (slotIndex) => {
//   const startHour = 7 + Number(slotIndex);
//   const endHour = startHour + 1;
//   const formatHour = (hour) => {
//     const period = hour >= 12 ? 'PM' : 'AM';
//     const adjusted = hour % 12 === 0 ? 12 : hour % 12;
//     return `${adjusted}:00 ${period}`;
//   };
//   return `${formatHour(startHour)} - ${formatHour(endHour)}`;
// };

// // ============================================
// // LOADING STATE COMPONENT
// // ============================================

// const LoadingState = ({ message = 'Loading...' }) => (
//   <div className="text-center py-5">
//     <Loader className="animate-spin mx-auto mb-3" size={32} style={{ color: '#0077B6' }} />
//     <p className="text-muted">{message}</p>
//   </div>
// );

// // ============================================
// // ERROR ALERT COMPONENT
// // ============================================

// const ErrorAlert = ({ message, onClose }) => (
//   <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
//     <AlertTriangle size={20} className="me-2 flex-shrink-0" />
//     <div className="flex-grow-1">{message}</div>
//     {onClose && (
//       <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//     )}
//   </div>
// );

// // ============================================
// // SUCCESS ALERT COMPONENT
// // ============================================

// const SuccessAlert = ({ message, onClose }) => (
//   <div className="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
//     <CheckCircle size={20} className="me-2 flex-shrink-0" />
//     <div className="flex-grow-1">{message}</div>
//     {onClose && (
//       <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//     )}
//   </div>
// );

// // ============================================
// // SCHEDULE FORM COMPONENT
// // ============================================

// const DeanScheduleForm = ({ 
//   courses, 
//   courseId, 
//   setCourseId,
//   yearLevel,
//   setYearLevel,
//   semester,
//   setSemester,
//   studentsCount,
//   setStudentsCount,
//   sectionCount,
//   setSectionCount,
//   considerAvailability,
//   setConsiderAvailability,
//   generating,
//   availabilityLoaded,
//   availabilityDataCount
// }) => (
//   <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
//     <div className="card-header text-white d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)', borderRadius: '12px 12px 0 0' }}>
//       <Settings size={20} className="me-2" />
//       <h5 className="mb-0">Schedule Configuration</h5>
//     </div>
//     <div className="card-body p-4">
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label fw-semibold" style={{ color: '#03045E' }}>
//             <BookOpen size={16} className="me-2" />
//             Course *
//           </label>
//           <select
//             className="form-select"
//             value={courseId}
//             onChange={e => setCourseId(e.target.value)}
//             disabled={generating}
//             style={{ borderColor: '#90E0EF' }}
//           >
//             <option value="">-- Select Course --</option>
//             {courses.map(c => (
//               <option key={c.id} value={c.id}>
//                 {c.code} — {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="col-md-2">
//           <label className="form-label fw-semibold" style={{ color: '#03045E' }}>Year Level *</label>
//           <select
//             className="form-select"
//             value={yearLevel}
//             onChange={e => setYearLevel(Number(e.target.value))}
//             disabled={generating}
//             style={{ borderColor: '#90E0EF' }}
//           >
//             {[1, 2, 3, 4].map(y => (
//               <option key={y} value={y}>{y}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label fw-semibold" style={{ color: '#03045E' }}>Semester *</label>
//           <select
//             className="form-select"
//             value={semester}
//             onChange={e => setSemester(e.target.value)}
//             disabled={generating}
//             style={{ borderColor: '#90E0EF' }}
//           >
//             <option value="1">1st Semester</option>
//             <option value="2">2nd Semester</option>
//             <option value="Summer">Summer</option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold" style={{ color: '#03045E' }}>
//             <Users size={16} className="me-2" />
//             Students per Section
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             min="1"
//             value={studentsCount}
//             onChange={e => setStudentsCount(Number(e.target.value))}
//             disabled={generating}
//             style={{ borderColor: '#90E0EF' }}
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold" style={{ color: '#03045E' }}>Number of Sections</label>
//           <input
//             type="number"
//             className="form-control"
//             min="1"
//             max="10"
//             value={sectionCount}
//             onChange={e => setSectionCount(Number(e.target.value))}
//             disabled={generating}
//             style={{ borderColor: '#90E0EF' }}
//           />
//         </div>
//       </div>

//       <div className="mt-4 p-3" style={{ backgroundColor: '#CAF0F8', borderRadius: '8px', border: '1px solid #90E0EF' }}>
//         <div className="form-check">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="considerAvailabilityCheck"
//             checked={considerAvailability}
//             onChange={e => setConsiderAvailability(e.target.checked)}
//             disabled={generating}
//           />
//           <label className="form-check-label" htmlFor="considerAvailabilityCheck">
//             <strong style={{ color: '#03045E' }}>Consider Instructor Availability</strong>
//             <br />
//             <small className="text-muted">
//               When enabled, only instructors with availability data will be scheduled.
//               {availabilityLoaded && availabilityDataCount === 0 && ' (No availability data loaded)'}
//             </small>
//           </label>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // ============================================
// // SUBJECT LIST COMPONENT
// // ============================================

// const SubjectList = ({ 
//   subjects, 
//   selectedSubjects, 
//   toggleSubject, 
//   generating, 
//   loading, 
//   courseId 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredSubjects = useMemo(() => {
//     if (!searchTerm) return subjects;
//     const term = searchTerm.toLowerCase();
//     return subjects.filter(s => 
//       (s.subject_code || s.code || '').toLowerCase().includes(term) ||
//       (s.description || '').toLowerCase().includes(term)
//     );
//   }, [subjects, searchTerm]);

//   return (
//     <div className="card shadow-sm border-0" style={{ borderRadius: '12px', height: '100%' }}>
//       <div className="card-header text-white d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)', borderRadius: '12px 12px 0 0' }}>
//         <div className="d-flex align-items-center">
//           <BookOpen size={18} className="me-2" />
//           <h6 className="mb-0">Subjects *</h6>
//         </div>
//         {subjects.length > 0 && (
//           <span className="badge" style={{ backgroundColor: '#023E8A' }}>
//             {selectedSubjects.length} / {subjects.length}
//           </span>
//         )}
//       </div>
//       <div className="card-body p-3">
//         {loading ? (
//           <LoadingState message="Loading subjects..." />
//         ) : !courseId ? (
//           <div className="alert alert-info mb-0 d-flex align-items-center">
//             <AlertTriangle size={18} className="me-2" />
//             Please select a course first.
//           </div>
//         ) : subjects.length === 0 ? (
//           <div className="alert alert-warning mb-0">
//             No subjects available for this course, year, and semester.
//           </div>
//         ) : (
//           <>
//             <div className="input-group mb-3">
//               <span className="input-group-text bg-white" style={{ borderColor: '#90E0EF' }}>
//                 <Search size={16} style={{ color: '#0077B6' }} />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search subjects..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 style={{ borderColor: '#90E0EF' }}
//               />
//               {searchTerm && (
//                 <button 
//                   className="btn btn-outline-secondary" 
//                   onClick={() => setSearchTerm('')}
//                   style={{ borderColor: '#90E0EF' }}
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
//               {filteredSubjects.map(s => (
//                 <div 
//                   key={s.id} 
//                   className="form-check p-3 mb-2 rounded"
//                   style={{ 
//                     backgroundColor: selectedSubjects.includes(s.id) ? '#E6F7FF' : '#F8F9FA',
//                     border: selectedSubjects.includes(s.id) ? '2px solid #00B4D8' : '1px solid #E9ECEF',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   <input
//                     id={`subj_${s.id}`}
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={selectedSubjects.includes(s.id)}
//                     onChange={() => toggleSubject(s.id)}
//                     disabled={generating}
//                     style={{ cursor: 'pointer' }}
//                   />
//                   <label 
//                     htmlFor={`subj_${s.id}`} 
//                     className="form-check-label d-flex justify-content-between align-items-center w-100"
//                     style={{ cursor: 'pointer' }}
//                   >
//                     <div>
//                       <strong style={{ color: '#03045E' }}>{s.subject_code || s.code}</strong>
//                       <br />
//                       <small className="text-muted">{s.description}</small>
//                     </div>
//                     <span className="badge bg-secondary">{s.units}u</span>
//                   </label>
//                 </div>
//               ))}
//               {filteredSubjects.length === 0 && (
//                 <div className="text-center text-muted py-3">
//                   No subjects match your search
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // INSTRUCTOR LIST COMPONENT
// // ============================================

// const InstructorSubjectList = ({ 
//   instructors, 
//   selectedInstructorIds, 
//   toggleInstructor, 
//   selectAllInstructors,
//   deselectAllInstructors,
//   instructorAvailability,
//   availabilityData,
//   considerAvailability,
//   generating, 
//   courseId 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredInstructors = useMemo(() => {
//     if (!searchTerm) return instructors;
//     const term = searchTerm.toLowerCase();
//     return instructors.filter(i => 
//       (i.name || i.instructor_name || '').toLowerCase().includes(term)
//     );
//   }, [instructors, searchTerm]);

//   const getInstructorAvailabilityTimes = useCallback((instructor) => {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
//     const byDay = {};
//     slots.forEach(slot => {
//       const day = slot.day || 'Unknown';
//       if (!byDay[day]) byDay[day] = [];
//       byDay[day].push(`${slot.start_time} - ${slot.end_time}`);
//     });
//     return byDay;
//   }, [availabilityData]);

//   const getInstructorSlots = useCallback((instructor) => {
//     const name = instructor.name || instructor.instructor_name;
//     const slots = availabilityData[name] || [];
//     return slots.length;
//   }, [availabilityData]);

//   return (
//     <div className="card shadow-sm border-0" style={{ borderRadius: '12px', height: '100%' }}>
//       <div className="card-header text-white d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(135deg, #0096C7 0%, #023E8A 100%)', borderRadius: '12px 12px 0 0' }}>
//         <div className="d-flex align-items-center">
//           <Users size={18} className="me-2" />
//           <h6 className="mb-0">Instructors *</h6>
//           {considerAvailability && (
//             <span className="badge bg-warning ms-2" style={{ fontSize: '0.7rem' }}>
//               Availability Enabled
//             </span>
//           )}
//         </div>
//         {instructors.length > 0 && (
//           <div>
//             <button 
//               className="btn btn-sm btn-light me-1" 
//               onClick={selectAllInstructors}
//               disabled={generating}
//               style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
//             >
//               Select All
//             </button>
//             <button 
//               className="btn btn-sm btn-light" 
//               onClick={deselectAllInstructors}
//               disabled={generating}
//               style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
//             >
//               Clear
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="card-body p-3">
//         {!courseId ? (
//           <div className="alert alert-info mb-0 d-flex align-items-center">
//             <AlertTriangle size={18} className="me-2" />
//             Please select a course first.
//           </div>
//         ) : instructors.length === 0 ? (
//           <div className="alert alert-warning mb-0">
//             No instructors assigned to this course. Please assign instructors first.
//           </div>
//         ) : (
//           <>
//             <div className="input-group mb-3">
//               <span className="input-group-text bg-white" style={{ borderColor: '#90E0EF' }}>
//                 <Search size={16} style={{ color: '#0077B6' }} />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search instructors..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 style={{ borderColor: '#90E0EF' }}
//               />
//               {searchTerm && (
//                 <button 
//                   className="btn btn-outline-secondary" 
//                   onClick={() => setSearchTerm('')}
//                   style={{ borderColor: '#90E0EF' }}
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
//               {filteredInstructors.map(ins => (
//                 <div 
//                   key={ins.id} 
//                   className="p-3 mb-2 rounded"
//                   style={{ 
//                     backgroundColor: selectedInstructorIds.includes(ins.id) ? '#E6F7FF' : '#F8F9FA',
//                     border: selectedInstructorIds.includes(ins.id) ? '2px solid #00B4D8' : '1px solid #E9ECEF',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   <div className="form-check">
//                     <input
//                       id={`instr_${ins.id}`}
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={selectedInstructorIds.includes(ins.id)}
//                       onChange={() => toggleInstructor(ins.id)}
//                       disabled={generating}
//                       style={{ cursor: 'pointer' }}
//                     />
//                     <label 
//                       htmlFor={`instr_${ins.id}`} 
//                       className="form-check-label"
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <strong style={{ color: '#03045E' }}>{ins.name || ins.instructor_name}</strong>
//                     </label>
//                   </div>
                  
//                   {considerAvailability && (
//                     <div className="mt-2 ms-4">
//                       {instructorAvailability[ins.id] ? (
//                         <>
//                           <div className="d-flex align-items-center mb-2">
//                             <CheckCircle size={14} style={{ color: '#10B981' }} className="me-2" />
//                             <small className="fw-semibold" style={{ color: '#10B981' }}>
//                               {getInstructorSlots(ins)} availability slots
//                             </small>
//                           </div>
//                           <div style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '1.5rem' }}>
//                             {Object.entries(getInstructorAvailabilityTimes(ins)).map(([day, times]) => (
//                               <div key={day} className="mb-1">
//                                 <strong>{day}:</strong>{' '}
//                                 {times.map((t, idx) => {
//                                   const [start, end] = t.split(' - ');
//                                   return (
//                                     <span key={idx}>
//                                       {formatTimeRange(start, end)}
//                                       {idx < times.length - 1 && ', '}
//                                     </span>
//                                   );
//                                 })}
//                               </div>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <div className="d-flex align-items-center">
//                           <AlertTriangle size={14} style={{ color: '#F59E0B' }} className="me-2" />
//                           <small style={{ color: '#F59E0B' }}>No availability data</small>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {filteredInstructors.length === 0 && (
//                 <div className="text-center text-muted py-3">
//                   No instructors match your search
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // SCHEDULE PREVIEW COMPONENT
// // ============================================

// const SchedulePreview = ({ 
//   scheduleResult, 
//   conflicts, 
//   subjects, 
//   instructors, 
//   rooms, 
//   onClear 
// }) => {
//   if (!scheduleResult?.assignments) return null;

//   const grouped = {};
//   scheduleResult.assignments.forEach(a => {
//     if (!grouped[a.section_index]) grouped[a.section_index] = [];
//     grouped[a.section_index].push(a);
//   });

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   return (
//     <div className="mt-4">
//       {conflicts.length > 0 && (
//         <div className="alert alert-danger d-flex align-items-start mb-4" role="alert">
//           <AlertTriangle size={24} className="me-3 flex-shrink-0 mt-1" />
//           <div className="flex-grow-1">
//             <h6 className="alert-heading mb-2">Schedule Conflicts Detected ({conflicts.length})</h6>
//             <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
//               {conflicts.map((conflict, idx) => (
//                 <li key={idx} className="mb-2">
//                   <strong className="text-uppercase">{conflict.type}:</strong> {conflict.message}
//                   <br />
//                   <small className="text-muted">{conflict.details}</small>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0" style={{ color: '#03045E' }}>
//           <Calendar size={24} className="me-2" />
//           Generated Schedule
//         </h5>
//         <div className="d-flex gap-2">
//           {scheduleResult.stats && (
//             <>
//               <span className="badge bg-success px-3 py-2">
//                 {scheduleResult.stats.totalAssignments} assignments
//               </span>
//               {conflicts.length === 0 ? (
//                 <span className="badge bg-success px-3 py-2">
//                   <CheckCircle size={14} className="me-1" />
//                   No Conflicts
//                 </span>
//               ) : (
//                 <span className="badge bg-danger px-3 py-2">
//                   <AlertTriangle size={14} className="me-1" />
//                   {conflicts.length} Conflicts
//                 </span>
//               )}
//             </>
//           )}
//           <button className="btn btn-outline-secondary btn-sm" onClick={onClear}>
//             <X size={16} className="me-1" />
//             Clear
//           </button>
//         </div>
//       </div>

//       {Object.keys(grouped).map(secIdx => {
//         const sectionLetter = String.fromCharCode(65 + Number(secIdx));
//         return (
//           <div 
//             key={secIdx} 
//             className="card shadow-sm border-0 mb-4" 
//             style={{ borderRadius: '12px' }}
//           >
//             <div 
//               className="card-header text-white" 
//               style={{ 
//                 background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)',
//                 borderRadius: '12px 12px 0 0'
//               }}
//             >
//               <h6 className="mb-0">Section {sectionLetter}</h6>
//             </div>
//             <div className="card-body p-0">
//               <div style={{ overflowX: 'auto' }}>
//                 <table className="table table-hover mb-0" style={{ minWidth: '900px' }}>
//                   <thead style={{ backgroundColor: '#CAF0F8' }}>
//                     <tr>
//                       <th className="text-center" style={{ color: '#03045E' }}>Subject</th>
//                       <th className="text-center" style={{ color: '#03045E' }}>Instructor</th>
//                       <th className="text-center" style={{ color: '#03045E' }}>Room</th>
//                       {days.map(d => (
//                         <th key={d} className="text-center" style={{ color: '#03045E' }}>{d}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {grouped[secIdx].map((r, i) => {
//                       const subject = subjects.find(s => s.id === r.subject_id);
//                       const instructor = instructors.find(ins => ins.id === r.instructor_id);
//                       const room = rooms.find(rm => rm.id === r.room_id);

//                       return (
//                         <tr key={i}>
//                           <td className="text-center">
//                             <strong style={{ color: '#0077B6' }}>
//                               {subject?.subject_code || r.subject_id}
//                             </strong>
//                             <br />
//                             <small className="text-muted">{subject?.description}</small>
//                           </td>
//                           <td className="text-center">{instructor?.name || instructor?.instructor_name || 'TBD'}</td>
//                           <td className="text-center">
//                             <strong>{room?.name || 'TBD'}</strong>
//                           </td>
//                           {days.map(day => {
//                             const matchingSlot = grouped[secIdx].find(
//                               slot => slot.subject_id === r.subject_id && slot.day === day
//                             );
//                             return (
//                               <td key={day} className="text-center">
//                                 {matchingSlot ? (
//                                   <span 
//                                     className="badge px-3 py-2" 
//                                     style={{ 
//                                       backgroundColor: '#48CAE4', 
//                                       color: '#03045E',
//                                       fontSize: '0.8rem'
//                                     }}
//                                   >
//                                     <Clock size={12} className="me-1" />
//                                     {slotToTime(matchingSlot.slot_index)}
//                                   </span>
//                                 ) : (
//                                   <span className="text-muted">—</span>
//                                 )}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ============================================
// // CONFIRMATION MODAL COMPONENT
// // ============================================

// const GenerateModal = ({ 
//   show, 
//   onHide, 
//   onConfirm, 
//   courses, 
//   courseId, 
//   yearLevel, 
//   semester, 
//   sectionCount, 
//   studentsCount, 
//   selectedSubjects, 
//   selectedInstructorIds, 
//   considerAvailability 
// }) => {
//   if (!show) return null;

//   const selectedCourse = courses.find(c => String(c.id) === String(courseId));

//   return (
//     <div 
//       className="modal fade show d-block" 
//       style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//       onClick={onHide}
//     >
//       <div 
//         className="modal-dialog modal-dialog-centered"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="modal-content" style={{ borderRadius: '12px', border: 'none' }}>
//           <div 
//             className="modal-header text-white border-0" 
//             style={{ 
//               background: 'linear-gradient(135deg, #0077B6 0%, #023E8A 100%)',
//               borderRadius: '12px 12px 0 0'
//             }}
//           >
//             <h5 className="modal-title d-flex align-items-center">
//               <Settings size={20} className="me-2" />
//               Confirm Schedule Generation
//             </h5>
//             <button 
//               type="button" 
//               className="btn-close btn-close-white" 
//               onClick={onHide}
//             ></button>
//           </div>
//           <div className="modal-body p-4">
//             <div className="row g-3">
//               <div className="col-12">
//                 <strong style={{ color: '#0077B6' }}>Course:</strong>
//                 <p className="mb-2">{selectedCourse?.name || 'N/A'}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Year Level:</strong>
//                 <p className="mb-2">{yearLevel}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Semester:</strong>
//                 <p className="mb-2">{semester}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Sections:</strong>
//                 <p className="mb-2">{sectionCount}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Students/Section:</strong>
//                 <p className="mb-2">{studentsCount}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Subjects:</strong>
//                 <p className="mb-2">{selectedSubjects.length}</p>
//               </div>
//               <div className="col-6">
//                 <strong style={{ color: '#0077B6' }}>Instructors:</strong>
//                 <p className="mb-2">{selectedInstructorIds.length}</p>
//               </div>
//               <div className="col-12">
//                 <strong style={{ color: '#0077B6' }}>Availability Check:</strong>
//                 <p className="mb-2">
//                   {considerAvailability ? (
//                     <span className="badge bg-success">Enforced</span>
//                   ) : (
//                     <span className="badge bg-secondary">Ignored</span>
//                   )}
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="alert alert-info mb-0 d-flex align-items-start">
//               <AlertTriangle size={18} className="me-2 flex-shrink-0 mt-1" />
//               <small>
//                 The system will automatically assign rooms and time slots (7 AM - 7 PM) 
//                 while preventing scheduling conflicts.
//               </small>
//             </div>
//           </div>
//           <div className="modal-footer border-0">
//             <button 
//               type="button" 
//               className="btn btn-secondary" 
//               onClick={onHide}
//             >
//               Cancel
//             </button>
//             <button 
//               type="button" 
//               className="btn text-white" 
//               onClick={onConfirm}
//               style={{ backgroundColor: '#0077B6' }}
//             >
//               <CheckCircle size={16} className="me-2" />
//               Confirm & Generate
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MAIN COMPONENT
// // ============================================

// export default function DeanSchedulePage() {
//   // State Management
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [studentsCount, setStudentsCount] = useState(30);
//   const [sectionCount, setSectionCount] = useState(1);
  
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
  
//   const [allInstructors, setAllInstructors] = useState([]);
//   const [courseInstructors, setCourseInstructors] = useState([]);
//   const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
//   const [instructorAvailability, setInstructorAvailability] = useState({});
//   const [availabilityData, setAvailabilityData] = useState({});
  
//   const [rooms, setRooms] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [scheduleResult, setScheduleResult] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [considerAvailability, setConsiderAvailability] = useState(true);
//   const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
//   const [conflicts, setConflicts] = useState([]);

//   // Fetch initial data on mount
//   useEffect(() => {
//     fetchCourses();
//     fetchAllInstructors();
//     fetchRooms();
//     fetchAvailabilityData();
//   }, []);

//   // API Fetch Functions
//   const fetchCourses = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Error fetching courses:', err);
//       setCourses([]);
//     }
//   }, []);

//   const fetchAllInstructors = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       const data = await res.json();
//       setAllInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Error fetching instructors:', err);
//       setAllInstructors([]);
//     }
//   }, []);

//   const fetchRooms = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/rooms`);
//       if (res.ok) {
//         const data = await res.json();
//         setRooms(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error('Error fetching rooms:', err);
//       setRooms([]);
//     }
//   }, []);

//   const fetchAvailabilityData = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/instructor-availability`);
//       if (!res.ok) throw new Error('Failed to fetch availability');
//       const data = await res.json();
      
//       const availMap = {};
//       if (Array.isArray(data)) {
//         data.forEach(item => {
//           const name = item.instructorName || 'Unknown';
//           if (!availMap[name]) {
//             availMap[name] = [];
//           }
//           availMap[name].push({
//             day: item.day,
//             start_time: item.start_time,
//             end_time: item.end_time
//           });
//         });
//       }
//       setAvailabilityData(availMap);
//       setAvailabilityLoaded(true);
//     } catch (err) {
//       console.error('Error fetching availability data:', err);
//       setAvailabilityLoaded(true);
//     }
//   }, []);

//   // Load subjects and instructors when course/year/semester changes
//   useEffect(() => {
//     if (!courseId) {
//       setSubjects([]);
//       setSelectedSubjects([]);
//       setCourseInstructors([]);
//       setSelectedInstructorIds([]);
//       setInstructorAvailability({});
//       return;
//     }

//     const loadSubjects = async () => {
//       setLoadingSubjects(true);
//       try {
//         const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
//         const res = await fetch(`${API}/api/subjects?${q}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         setSubjects(arr);
//         setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
//       } catch (err) {
//         console.error('Error loading subjects:', err);
//         setSubjects([]);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     };

//     const loadCourseInstructors = async () => {
//       try {
//         const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setCourseInstructors(data);
//             initializeAvailability(data);
//             return;
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching instructors by course:', err);
//       }

//       const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
//       setCourseInstructors(filtered);
//       initializeAvailability(filtered);
//     };

//     const initializeAvailability = (instructors) => {
//       const availMap = {};
//       instructors.forEach(i => {
//         const hasAvailability = availabilityData[i.name || i.instructor_name] !== undefined;
//         availMap[i.id] = hasAvailability;
//       });
//       setInstructorAvailability(availMap);
//     };

//     loadSubjects();
//     loadCourseInstructors();
//   }, [courseId, yearLevel, semester, allInstructors, availabilityData]);

//   // Toggle Functions
//   const toggleSubject = useCallback((id) => {
//     setSelectedSubjects(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }, []);

//   const toggleInstructor = useCallback((id) => {
//     setSelectedInstructorIds(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   }, []);

//   const selectAllInstructors = useCallback(() => {
//     setSelectedInstructorIds(courseInstructors.map(i => i.id));
//   }, [courseInstructors]);

//   const deselectAllInstructors = useCallback(() => {
//     setSelectedInstructorIds([]);
//   }, []);

//   // Conflict Detection
//   const detectConflicts = useCallback((assignments) => {
//     const conflictList = [];
//     const roomUsage = new Map();
//     const instructorUsage = new Map();
//     const sectionUsage = new Map();

//     assignments.forEach((a) => {
//       const room = rooms.find(r => r.id === a.room_id);
//       const instructor = courseInstructors.find(i => i.id === a.instructor_id) || 
//                          allInstructors.find(i => i.id === a.instructor_id);
//       const subject = subjects.find(s => s.id === a.subject_id);

//       // Check room conflicts
//       const roomKey = `${a.room_id}-${a.day}-${a.slot_index}`;
//       if (roomUsage.has(roomKey)) {
//         const existing = roomUsage.get(roomKey);
//         conflictList.push({
//           type: 'room',
//           message: `Room "${room?.name || a.room_id}" is double-booked on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Conflict between subjects: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       roomUsage.set(roomKey, { ...a, subject: subject?.subject_code });

//       // Check instructor conflicts
//       const instrKey = `${a.instructor_id}-${a.day}-${a.slot_index}`;
//       if (instructorUsage.has(instrKey)) {
//         const existing = instructorUsage.get(instrKey);
//         conflictList.push({
//           type: 'instructor',
//           message: `Instructor "${instructor?.name || a.instructor_id}" is scheduled twice on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Teaching both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       instructorUsage.set(instrKey, { ...a, subject: subject?.subject_code });

//       // Check section conflicts
//       const sectionKey = `${a.section_index}-${a.day}-${a.slot_index}`;
//       if (sectionUsage.has(sectionKey)) {
//         const existing = sectionUsage.get(sectionKey);
//         const sectionName = String.fromCharCode(65 + a.section_index);
//         conflictList.push({
//           type: 'section',
//           message: `Section ${sectionName} has overlapping classes on ${a.day} at ${slotToTime(a.slot_index)}`,
//           details: `Both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
//         });
//       }
//       sectionUsage.set(sectionKey, { ...a, subject: subject?.subject_code });
//     });

//     return conflictList;
//   }, [rooms, courseInstructors, allInstructors, subjects]);

//   // Generate Schedule Handler
//   const handleGenerate = useCallback(async () => {
//     if (!courseId || selectedSubjects.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select a course and at least one subject.' });
//     }

//     if (selectedInstructorIds.length === 0) {
//       return setMessage({ type: 'danger', text: 'Please select at least one instructor for this course.' });
//     }

//     const selectedButUnavailable = selectedInstructorIds.filter(id => !instructorAvailability[id]);
//     if (considerAvailability && selectedButUnavailable.length > 0) {
//       return setMessage({ 
//         type: 'warning', 
//         text: `${selectedButUnavailable.length} selected instructor(s) have no availability data. They will be excluded from scheduling.` 
//       });
//     }

//     setShowConfirm(false);
//     setGenerating(true);
//     setMessage(null);
//     setScheduleResult(null);
//     setConflicts([]);

//     try {
//       const instructorsPayload = selectedInstructorIds.map(id => ({
//         id,
//         available: instructorAvailability[id] || true
//       }));

//       const payload = {
//         courseId: Number(courseId),
//         yearLevel: Number(yearLevel),
//         semester: String(semester),
//         studentsCount: Number(studentsCount),
//         sectionCount: Number(sectionCount),
//         subjects: selectedSubjects,
//         instructors: instructorsPayload,
//         considerInstructorAvailability: considerAvailability
//       };

//       const res = await fetch(`${API}/api/scheduler/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || 'Schedule generation failed');
//       }

//       const detectedConflicts = detectConflicts(data.assignments || []);
//       setConflicts(detectedConflicts);
//       setScheduleResult(data);
      
//       if (detectedConflicts.length > 0) {
//         setMessage({ 
//           type: 'warning', 
//           text: `Schedule generated with ${detectedConflicts.length} conflict(s). Please review below.` 
//         });
//       } else {
//         setMessage({ type: 'success', text: data.message || 'Schedule generated successfully with no conflicts!' });
//       }
//     } catch (err) {
//       console.error('Error generating schedule:', err);
//       setMessage({ type: 'danger', text: err.message || 'Schedule generation failed.' });
//     } finally {
//       setGenerating(false);
//     }
//   }, [
//     courseId, 
//     selectedSubjects, 
//     selectedInstructorIds, 
//     instructorAvailability, 
//     considerAvailability,
//     yearLevel,
//     semester,
//     studentsCount,
//     sectionCount,
//     detectConflicts
//   ]);

//   // Memoized values
//   const availabilityDataCount = useMemo(() => Object.keys(availabilityData).length, [availabilityData]);

//   return (
//     <main className="container-fluid py-4" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
//       {/* Header */}
//       <div className="mb-4">
//         <div className="d-flex align-items-center mb-2">
//           <Calendar size={32} style={{ color: '#0077B6' }} className="me-3" />
//           <div>
//             <h3 className="mb-1" style={{ color: '#03045E', fontWeight: '700' }}>
//               Class Schedule Generator
//             </h3>
//             <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
//               Configure and generate optimized class schedules with automatic conflict detection
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Alert Messages */}
//       {message && (
//         <div className="mb-4">
//           {message.type === 'success' && (
//             <SuccessAlert message={message.text} onClose={() => setMessage(null)} />
//           )}
//           {message.type === 'danger' && (
//             <ErrorAlert message={message.text} onClose={() => setMessage(null)} />
//           )}
//           {message.type === 'warning' && (
//             <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center" role="alert">
//               <AlertTriangle size={20} className="me-2 flex-shrink-0" />
//               <div className="flex-grow-1">{message.text}</div>
//               <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Schedule Configuration Form */}
//       <DeanScheduleForm
//         courses={courses}
//         courseId={courseId}
//         setCourseId={setCourseId}
//         yearLevel={yearLevel}
//         setYearLevel={setYearLevel}
//         semester={semester}
//         setSemester={setSemester}
//         studentsCount={studentsCount}
//         setStudentsCount={setStudentsCount}
//         sectionCount={sectionCount}
//         setSectionCount={setSectionCount}
//         considerAvailability={considerAvailability}
//         setConsiderAvailability={setConsiderAvailability}
//         generating={generating}
//         availabilityLoaded={availabilityLoaded}
//         availabilityDataCount={availabilityDataCount}
//       />

//       {/* Subjects and Instructors Selection */}
//       <div className="row g-4 mb-4">
//         <div className="col-lg-6">
//           <SubjectList
//             subjects={subjects}
//             selectedSubjects={selectedSubjects}
//             toggleSubject={toggleSubject}
//             generating={generating}
//             loading={loadingSubjects}
//             courseId={courseId}
//           />
//         </div>
//         <div className="col-lg-6">
//           <InstructorSubjectList
//             instructors={courseInstructors}
//             selectedInstructorIds={selectedInstructorIds}
//             toggleInstructor={toggleInstructor}
//             selectAllInstructors={selectAllInstructors}
//             deselectAllInstructors={deselectAllInstructors}
//             instructorAvailability={instructorAvailability}
//             availabilityData={availabilityData}
//             considerAvailability={considerAvailability}
//             generating={generating}
//             courseId={courseId}
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="d-flex gap-3 mb-4">
//         <button
//           className="btn btn-lg text-white shadow-sm"
//           onClick={() => setShowConfirm(true)}
//           disabled={generating || !courseId || selectedSubjects.length === 0 || selectedInstructorIds.length === 0}
//           style={{ 
//             backgroundColor: '#0077B6',
//             borderRadius: '8px',
//             padding: '0.75rem 2rem',
//             fontWeight: '600'
//           }}
//         >
//           {generating ? (
//             <>
//               <Loader className="animate-spin me-2" size={18} />
//               Generating Schedule...
//             </>
//           ) : (
//             <>
//               <Settings size={18} className="me-2" />
//               Generate Schedule
//             </>
//           )}
//         </button>

//         {scheduleResult && (
//           <button
//             className="btn btn-lg btn-outline-secondary shadow-sm"
//             onClick={() => {
//               setScheduleResult(null);
//               setConflicts([]);
//               setMessage(null);
//             }}
//             style={{ borderRadius: '8px', padding: '0.75rem 2rem' }}
//           >
//             <RefreshCw size={18} className="me-2" />
//             Clear Results
//           </button>
//         )}
//       </div>

//       {/* Schedule Preview */}
//       {scheduleResult && (
//         <SchedulePreview
//           scheduleResult={scheduleResult}
//           conflicts={conflicts}
//           subjects={subjects}
//           instructors={[...courseInstructors, ...allInstructors]}
//           rooms={rooms}
//           onClear={() => {
//             setScheduleResult(null);
//             setConflicts([]);
//             setMessage(null);
//           }}
//         />
//       )}

//       {/* Confirmation Modal */}
//       <GenerateModal
//         show={showConfirm}
//         onHide={() => setShowConfirm(false)}
//         onConfirm={handleGenerate}
//         courses={courses}
//         courseId={courseId}
//         yearLevel={yearLevel}
//         semester={semester}
//         sectionCount={sectionCount}
//         studentsCount={studentsCount}
//         selectedSubjects={selectedSubjects}
//         selectedInstructorIds={selectedInstructorIds}
//         considerAvailability={considerAvailability}
//       />

//       <style jsx>{`
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
        
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .form-check-input:checked {
//           background-color: #0077B6;
//           border-color: #0077B6;
//         }

//         .btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .table-hover tbody tr:hover {
//           background-color: #F0F9FF;
//         }

//         .card {
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         .card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 16px rgba(0, 119, 182, 0.15) !important;
//         }

//         .badge {
//           font-weight: 600;
//         }

//         .alert {
//           border-radius: 8px;
//           border: none;
//         }

//         .modal-content {
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
//         }

//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #90E0EF;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #48CAE4;
//         }
//       `}</style>
//     </main>
//   );


import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Calendar, Settings, CheckCircle, AlertTriangle, Clock, Users, BookOpen, Loader, Download, RefreshCw, Search, Filter, X, Plus, Building2, DoorOpen, ChevronDown, ChevronUp } from 'lucide-react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minutes} ${period}`;
};

const formatTimeRange = (startTime, endTime) => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

const slotToTime = (slotIndex) => {
  const startHour = 7 + Number(slotIndex);
  const endHour = startHour + 1;
  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjusted = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjusted}:00 ${period}`;
  };
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
};

// ============================================
// TOAST NOTIFICATION COMPONENT
// ============================================

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`edusched-toast toast-${type}`}>
      <div className="toast-icon">
        {type === "success" ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
      </div>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

// ============================================
// LOADING STATE COMPONENT
// ============================================

const LoadingState = ({ message = 'Loading...' }) => (
  <div style={{ textAlign: 'center', padding: '3rem' }}>
    <Loader className="animate-spin" size={40} style={{ color: COLORS.accent, margin: '0 auto 1rem' }} />
    <p style={{ color: '#666', fontSize: '1rem' }}>{message}</p>
  </div>
);

// ============================================
// SCHEDULE FORM COMPONENT
// ============================================

const DeanScheduleForm = ({ 
  courses, 
  courseId, 
  setCourseId,
  yearLevel,
  setYearLevel,
  semester,
  setSemester,
  studentsCount,
  setStudentsCount,
  sectionCount,
  setSectionCount,
  considerAvailability,
  setConsiderAvailability,
  generating,
  availabilityLoaded,
  availabilityDataCount
}) => (
  <div className="config-card">
    <div className="config-card-header">
      <Settings size={20} />
      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Schedule Configuration</h3>
    </div>
    <div className="config-card-body">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label-custom">
            <BookOpen size={16} style={{ marginRight: '0.5rem' }} />
            Course *
          </label>
          <select
            className="form-input-custom"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            disabled={generating}
          >
            <option value="">-- Select Course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label-custom">Year Level *</label>
          <select
            className="form-input-custom"
            value={yearLevel}
            onChange={e => setYearLevel(Number(e.target.value))}
            disabled={generating}
          >
            {[1, 2, 3, 4].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label-custom">Semester *</label>
          <select
            className="form-input-custom"
            value={semester}
            onChange={e => setSemester(e.target.value)}
            disabled={generating}
          >
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="Summer">Summer</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label-custom">
            <Users size={16} style={{ marginRight: '0.5rem' }} />
            Students per Section
          </label>
          <input
            type="number"
            className="form-input-custom"
            min="1"
            value={studentsCount}
            onChange={e => setStudentsCount(Number(e.target.value))}
            disabled={generating}
          />
        </div>

        <div className="form-group">
          <label className="form-label-custom">Number of Sections</label>
          <input
            type="number"
            className="form-input-custom"
            min="1"
            max="10"
            value={sectionCount}
            onChange={e => setSectionCount(Number(e.target.value))}
            disabled={generating}
          />
        </div>
      </div>

      <div className="availability-section">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={considerAvailability}
            onChange={e => setConsiderAvailability(e.target.checked)}
            disabled={generating}
          />
          <span className="checkbox-label">
            <strong>Consider Instructor Availability</strong>
            <br />
            <small style={{ color: '#666' }}>
              When enabled, only instructors with availability data will be scheduled.
              {availabilityLoaded && availabilityDataCount === 0 && ' (No availability data loaded)'}
            </small>
          </span>
        </label>
      </div>
    </div>
  </div>
);

// ============================================
// SUBJECT LIST COMPONENT
// ============================================

const SubjectList = ({ 
  subjects, 
  selectedSubjects, 
  toggleSubject, 
  generating, 
  loading, 
  courseId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredSubjects = useMemo(() => {
    if (!searchTerm) return subjects;
    const term = searchTerm.toLowerCase();
    return subjects.filter(s => 
      (s.subject_code || s.code || '').toLowerCase().includes(term) ||
      (s.description || '').toLowerCase().includes(term)
    );
  }, [subjects, searchTerm]);

  return (
    <div className="selection-card">
      <div className="selection-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Subjects *</h3>
          {subjects.length > 0 && (
            <span className="count-badge">
              {selectedSubjects.length} / {subjects.length}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isExpanded && (
        <div className="selection-card-body">
          {loading ? (
            <LoadingState message="Loading subjects..." />
          ) : !courseId ? (
            <div className="info-box">
              <AlertTriangle size={18} />
              <span>Please select a course first.</span>
            </div>
          ) : subjects.length === 0 ? (
            <div className="warning-box">
              No subjects available for this course, year, and semester.
            </div>
          ) : (
            <>
              <div className="search-box">
                <Search size={16} className="search-icon-inline" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="clear-btn">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="items-list">
                {filteredSubjects.map(s => (
                  <label 
                    key={s.id} 
                    className={`item-checkbox ${selectedSubjects.includes(s.id) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(s.id)}
                      onChange={() => toggleSubject(s.id)}
                      disabled={generating}
                    />
                    <div className="item-content">
                      <div>
                        <strong style={{ color: COLORS.primary }}>{s.subject_code || s.code}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{s.description}</small>
                      </div>
                      <span className="units-badge">{s.units}u</span>
                    </div>
                  </label>
                ))}
                {filteredSubjects.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                    No subjects match your search
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// INSTRUCTOR LIST COMPONENT
// ============================================

const InstructorSubjectList = ({ 
  instructors, 
  selectedInstructorIds, 
  toggleInstructor, 
  selectAllInstructors,
  deselectAllInstructors,
  instructorAvailability,
  availabilityData,
  considerAvailability,
  generating, 
  courseId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredInstructors = useMemo(() => {
    if (!searchTerm) return instructors;
    const term = searchTerm.toLowerCase();
    return instructors.filter(i => 
      (i.name || i.instructor_name || '').toLowerCase().includes(term)
    );
  }, [instructors, searchTerm]);

  const getInstructorAvailabilityTimes = useCallback((instructor) => {
    const name = instructor.name || instructor.instructor_name;
    const slots = availabilityData[name] || [];
    const byDay = {};
    slots.forEach(slot => {
      const day = slot.day || 'Unknown';
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(`${slot.start_time} - ${slot.end_time}`);
    });
    return byDay;
  }, [availabilityData]);

  const getInstructorSlots = useCallback((instructor) => {
    const name = instructor.name || instructor.instructor_name;
    const slots = availabilityData[name] || [];
    return slots.length;
  }, [availabilityData]);

  return (
    <div className="selection-card">
      <div className="selection-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Users size={18} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Instructors *</h3>
          {considerAvailability && (
            <span className="warning-badge">Availability Enabled</span>
          )}
          {instructors.length > 0 && (
            <span className="count-badge" style={{ marginLeft: 'auto' }}>
              {selectedInstructorIds.length} / {instructors.length}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {instructors.length > 0 && (
            <>
              <button 
                className="small-btn" 
                onClick={(e) => { e.stopPropagation(); selectAllInstructors(); }}
                disabled={generating}
              >
                Select All
              </button>
              <button 
                className="small-btn" 
                onClick={(e) => { e.stopPropagation(); deselectAllInstructors(); }}
                disabled={generating}
              >
                Clear
              </button>
            </>
          )}
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="selection-card-body">
          {!courseId ? (
            <div className="info-box">
              <AlertTriangle size={18} />
              <span>Please select a course first.</span>
            </div>
          ) : instructors.length === 0 ? (
            <div className="warning-box">
              No instructors assigned to this course. Please assign instructors first.
            </div>
          ) : (
            <>
              <div className="search-box">
                <Search size={16} className="search-icon-inline" />
                <input
                  type="text"
                  placeholder="Search instructors..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="clear-btn">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="items-list">
                {filteredInstructors.map(ins => (
                  <label 
                    key={ins.id} 
                    className={`item-checkbox ${selectedInstructorIds.includes(ins.id) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedInstructorIds.includes(ins.id)}
                      onChange={() => toggleInstructor(ins.id)}
                      disabled={generating}
                    />
                    <div className="item-content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <strong style={{ color: COLORS.primary }}>{ins.name || ins.instructor_name}</strong>
                      
                      {considerAvailability && (
                        <div style={{ marginTop: '0.5rem', width: '100%' }}>
                          {instructorAvailability[ins.id] ? (
                            <>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <CheckCircle size={14} style={{ color: '#10B981', marginRight: '0.5rem' }} />
                                <small style={{ color: '#10B981', fontWeight: 600 }}>
                                  {getInstructorSlots(ins)} availability slots
                                </small>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#6B7280', paddingLeft: '1.5rem' }}>
                                {Object.entries(getInstructorAvailabilityTimes(ins)).map(([day, times]) => (
                                  <div key={day} style={{ marginBottom: '0.25rem' }}>
                                    <strong>{day}:</strong>{' '}
                                    {times.map((t, idx) => {
                                      const [start, end] = t.split(' - ');
                                      return (
                                        <span key={idx}>
                                          {formatTimeRange(start, end)}
                                          {idx < times.length - 1 && ', '}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <AlertTriangle size={14} style={{ color: '#F59E0B', marginRight: '0.5rem' }} />
                              <small style={{ color: '#F59E0B' }}>No availability data</small>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
                {filteredInstructors.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                    No instructors match your search
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// SCHEDULE PREVIEW COMPONENT
// ============================================

const SchedulePreview = ({ 
  scheduleResult, 
  conflicts, 
  subjects, 
  instructors, 
  rooms, 
  onClear 
}) => {
  if (!scheduleResult?.assignments) return null;

  const grouped = {};
  scheduleResult.assignments.forEach(a => {
    if (!grouped[a.section_index]) grouped[a.section_index] = [];
    grouped[a.section_index].push(a);
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div style={{ marginTop: '2rem' }}>
      {conflicts.length > 0 && (
        <div className="conflicts-box">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ color: '#ff4444', flexShrink: 0, marginTop: '0.25rem' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#ff4444', fontSize: '1.1rem' }}>
                Schedule Conflicts Detected ({conflicts.length})
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {conflicts.map((conflict, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ textTransform: 'uppercase' }}>{conflict.type}:</strong> {conflict.message}
                    <br />
                    <small style={{ color: '#666' }}>{conflict.details}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="preview-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={24} style={{ color: COLORS.accent }} />
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: COLORS.primary }}>
            Generated Schedule
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {scheduleResult.stats && (
            <>
              <span className="preview-badge success">
                {scheduleResult.stats.totalAssignments} assignments
              </span>
              {conflicts.length === 0 ? (
                <span className="preview-badge success">
                  <CheckCircle size={14} style={{ marginRight: '0.25rem' }} />
                  No Conflicts
                </span>
              ) : (
                <span className="preview-badge danger">
                  <AlertTriangle size={14} style={{ marginRight: '0.25rem' }} />
                  {conflicts.length} Conflicts
                </span>
              )}
            </>
          )}
          <button className="action-btn secondary" onClick={onClear}>
            <X size={16} />
            Clear
          </button>
        </div>
      </div>

      {Object.keys(grouped).map(secIdx => {
        const sectionLetter = String.fromCharCode(65 + Number(secIdx));
        return (
          <div key={secIdx} className="section-card">
            <div className="section-header">
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Section {sectionLetter}</h4>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Instructor</th>
                    <th>Room</th>
                    {days.map(d => (
                      <th key={d}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grouped[secIdx].map((r, i) => {
                    const subject = subjects.find(s => s.id === r.subject_id);
                    const instructor = instructors.find(ins => ins.id === r.instructor_id);
                    const room = rooms.find(rm => rm.id === r.room_id);

                    return (
                      <tr key={i}>
                        <td>
                          <strong style={{ color: COLORS.accent }}>
                            {subject?.subject_code || r.subject_id}
                          </strong>
                          <br />
                          <small style={{ color: '#666' }}>{subject?.description}</small>
                        </td>
                        <td>{instructor?.name || instructor?.instructor_name || 'TBD'}</td>
                        <td>
                          <strong>{room?.name || 'TBD'}</strong>
                        </td>
                        {days.map(day => {
                          const matchingSlot = grouped[secIdx].find(
                            slot => slot.subject_id === r.subject_id && slot.day === day
                          );
                          return (
                            <td key={day}>
                              {matchingSlot ? (
                                <span className="time-badge">
                                  <Clock size={12} />
                                  {slotToTime(matchingSlot.slot_index)}
                                </span>
                              ) : (
                                <span style={{ color: '#ccc' }}>—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// CONFIRMATION MODAL COMPONENT
// ============================================

const GenerateModal = ({ 
  show, 
  onHide, 
  onConfirm, 
  courses, 
  courseId, 
  yearLevel, 
  semester, 
  sectionCount, 
  studentsCount, 
  selectedSubjects, 
  selectedInstructorIds, 
  considerAvailability 
}) => {
  if (!show) return null;

  const selectedCourse = courses.find(c => String(c.id) === String(courseId));

  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={24} />
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>
              Confirm Schedule Generation
            </h3>
          </div>
          <button className="modal-close" onClick={onHide}>×</button>
        </div>
        <div className="modal-body-custom">
          <div className="modal-info-grid">
            <div>
              <strong style={{ color: COLORS.accent }}>Course:</strong>
              <p>{selectedCourse?.name || 'N/A'}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Year Level:</strong>
              <p>{yearLevel}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Semester:</strong>
              <p>{semester}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Sections:</strong>
              <p>{sectionCount}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Students/Section:</strong>
              <p>{studentsCount}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Subjects:</strong>
              <p>{selectedSubjects.length}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Instructors:</strong>
              <p>{selectedInstructorIds.length}</p>
            </div>
            <div>
              <strong style={{ color: COLORS.accent }}>Availability Check:</strong>
              <p>
                {considerAvailability ? (
                  <span className="modal-badge success">Enforced</span>
                ) : (
                  <span className="modal-badge secondary">Ignored</span>
                )}
              </p>
            </div>
          </div>
          <div className="modal-info-box">
            <AlertTriangle size={18} />
            <small>
              The system will automatically assign rooms and time slots (7 AM - 7 PM) 
              while preventing scheduling conflicts.
            </small>
          </div>
        </div>
        <div className="modal-footer-custom">
          <button className="action-btn secondary" onClick={onHide}>
            Cancel
          </button>
          <button className="action-btn primary" onClick={onConfirm}>
            <CheckCircle size={16} />
            Confirm & Generate
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function DeanSchedulePage() {
  // State Management
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [yearLevel, setYearLevel] = useState(1);
  const [semester, setSemester] = useState('1');
  const [studentsCount, setStudentsCount] = useState(30);
  const [sectionCount, setSectionCount] = useState(1);
  
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  
  const [allInstructors, setAllInstructors] = useState([]);
  const [courseInstructors, setCourseInstructors] = useState([]);
  const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
  const [instructorAvailability, setInstructorAvailability] = useState({});
  const [availabilityData, setAvailabilityData] = useState({});
  
  const [rooms, setRooms] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [scheduleResult, setScheduleResult] = useState(null);
  const [toast, setToast] = useState(null);
  const [considerAvailability, setConsiderAvailability] = useState(true);
  const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data on mount
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCourses(),
        fetchAllInstructors(),
        fetchRooms(),
        fetchAvailabilityData()
      ]);
      setLoading(false);
    };
    initData();
  }, []);

  // API Fetch Functions
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/courses`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setCourses([]);
    }
  }, []);

  const fetchAllInstructors = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/instructors`);
      const data = await res.json();
      setAllInstructors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching instructors:', err);
      setAllInstructors([]);
    }
  }, []);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/rooms`);
      if (res.ok) {
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setRooms([]);
    }
  }, []);

  const fetchAvailabilityData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/instructor-availability`);
      if (!res.ok) throw new Error('Failed to fetch availability');
      const data = await res.json();
      
      const availMap = {};
      if (Array.isArray(data)) {
        data.forEach(item => {
          const name = item.instructorName || 'Unknown';
          if (!availMap[name]) {
            availMap[name] = [];
          }
          availMap[name].push({
            day: item.day,
            start_time: item.start_time,
            end_time: item.end_time
          });
        });
      }
      setAvailabilityData(availMap);
      setAvailabilityLoaded(true);
    } catch (err) {
      console.error('Error fetching availability data:', err);
      setAvailabilityLoaded(true);
    }
  }, []);

  // Load subjects and instructors when course/year/semester changes
  useEffect(() => {
    if (!courseId) {
      setSubjects([]);
      setSelectedSubjects([]);
      setCourseInstructors([]);
      setSelectedInstructorIds([]);
      setInstructorAvailability({});
      return;
    }

    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const q = new URLSearchParams({ courseId, yearLevel, semester }).toString();
        const res = await fetch(`${API}/api/subjects?${q}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        setSubjects(arr);
        setSelectedSubjects(arr.map(s => s.id || s.subject_id).filter(Boolean));
      } catch (err) {
        console.error('Error loading subjects:', err);
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    const loadCourseInstructors = async () => {
      try {
        const res = await fetch(`${API}/api/instructors/byCourse/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCourseInstructors(data);
            initializeAvailability(data);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching instructors by course:', err);
      }

      const filtered = allInstructors.filter(i => String(i.course_id) === String(courseId));
      setCourseInstructors(filtered);
      initializeAvailability(filtered);
    };

    const initializeAvailability = (instructors) => {
      const availMap = {};
      instructors.forEach(i => {
        const hasAvailability = availabilityData[i.name || i.instructor_name] !== undefined;
        availMap[i.id] = hasAvailability;
      });
      setInstructorAvailability(availMap);
    };

    loadSubjects();
    loadCourseInstructors();
  }, [courseId, yearLevel, semester, allInstructors, availabilityData]);

  // Toggle Functions
  const toggleSubject = useCallback((id) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const toggleInstructor = useCallback((id) => {
    setSelectedInstructorIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const selectAllInstructors = useCallback(() => {
    setSelectedInstructorIds(courseInstructors.map(i => i.id));
  }, [courseInstructors]);

  const deselectAllInstructors = useCallback(() => {
    setSelectedInstructorIds([]);
  }, []);

  // Conflict Detection
  const detectConflicts = useCallback((assignments) => {
    const conflictList = [];
    const roomUsage = new Map();
    const instructorUsage = new Map();
    const sectionUsage = new Map();

    assignments.forEach((a) => {
      const room = rooms.find(r => r.id === a.room_id);
      const instructor = courseInstructors.find(i => i.id === a.instructor_id) || 
                         allInstructors.find(i => i.id === a.instructor_id);
      const subject = subjects.find(s => s.id === a.subject_id);

      // Check room conflicts
      const roomKey = `${a.room_id}-${a.day}-${a.slot_index}`;
      if (roomUsage.has(roomKey)) {
        const existing = roomUsage.get(roomKey);
        conflictList.push({
          type: 'room',
          message: `Room "${room?.name || a.room_id}" is double-booked on ${a.day} at ${slotToTime(a.slot_index)}`,
          details: `Conflict between subjects: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
        });
      }
      roomUsage.set(roomKey, { ...a, subject: subject?.subject_code });

      // Check instructor conflicts
      const instrKey = `${a.instructor_id}-${a.day}-${a.slot_index}`;
      if (instructorUsage.has(instrKey)) {
        const existing = instructorUsage.get(instrKey);
        conflictList.push({
          type: 'instructor',
          message: `Instructor "${instructor?.name || a.instructor_id}" is scheduled twice on ${a.day} at ${slotToTime(a.slot_index)}`,
          details: `Teaching both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
        });
      }
      instructorUsage.set(instrKey, { ...a, subject: subject?.subject_code });

      // Check section conflicts
      const sectionKey = `${a.section_index}-${a.day}-${a.slot_index}`;
      if (sectionUsage.has(sectionKey)) {
        const existing = sectionUsage.get(sectionKey);
        const sectionName = String.fromCharCode(65 + a.section_index);
        conflictList.push({
          type: 'section',
          message: `Section ${sectionName} has overlapping classes on ${a.day} at ${slotToTime(a.slot_index)}`,
          details: `Both: ${existing.subject} and ${subject?.subject_code || a.subject_id}`
        });
      }
      sectionUsage.set(sectionKey, { ...a, subject: subject?.subject_code });
    });

    return conflictList;
  }, [rooms, courseInstructors, allInstructors, subjects]);

  // Generate Schedule Handler
  const handleGenerate = useCallback(async () => {
    if (!courseId || selectedSubjects.length === 0) {
      setToast({ type: 'error', message: 'Please select a course and at least one subject.' });
      return;
    }

    if (selectedInstructorIds.length === 0) {
      setToast({ type: 'error', message: 'Please select at least one instructor for this course.' });
      return;
    }

    const selectedButUnavailable = selectedInstructorIds.filter(id => !instructorAvailability[id]);
    if (considerAvailability && selectedButUnavailable.length > 0) {
      setToast({ 
        type: 'error', 
        message: `${selectedButUnavailable.length} selected instructor(s) have no availability data. They will be excluded from scheduling.` 
      });
      return;
    }

    setShowConfirm(false);
    setGenerating(true);
    setToast(null);
    setScheduleResult(null);
    setConflicts([]);

    try {
      const instructorsPayload = selectedInstructorIds.map(id => ({
        id,
        available: instructorAvailability[id] || true
      }));

      const payload = {
        courseId: Number(courseId),
        yearLevel: Number(yearLevel),
        semester: String(semester),
        studentsCount: Number(studentsCount),
        sectionCount: Number(sectionCount),
        subjects: selectedSubjects,
        instructors: instructorsPayload,
        considerInstructorAvailability: considerAvailability
      };

      const res = await fetch(`${API}/api/scheduler/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Schedule generation failed');
      }

      const detectedConflicts = detectConflicts(data.assignments || []);
      setConflicts(detectedConflicts);
      setScheduleResult(data);
      
      if (detectedConflicts.length > 0) {
        setToast({ 
          type: 'error', 
          message: `Schedule generated with ${detectedConflicts.length} conflict(s). Please review below.` 
        });
      } else {
        setToast({ type: 'success', message: data.message || 'Schedule generated successfully with no conflicts!' });
      }
    } catch (err) {
      console.error('Error generating schedule:', err);
      setToast({ type: 'error', message: err.message || 'Schedule generation failed.' });
    } finally {
      setGenerating(false);
    }
  }, [
    courseId, 
    selectedSubjects, 
    selectedInstructorIds, 
    instructorAvailability, 
    considerAvailability,
    yearLevel,
    semester,
    studentsCount,
    sectionCount,
    detectConflicts
  ]);

  // Memoized values
  const availabilityDataCount = useMemo(() => Object.keys(availabilityData).length, [availabilityData]);

  const overallStats = useMemo(() => {
    return {
      totalCourses: courses.length,
      totalSubjects: subjects.length,
      totalInstructors: courseInstructors.length,
      selectedSubjects: selectedSubjects.length,
      selectedInstructors: selectedInstructorIds.length
    };
  }, [courses.length, subjects.length, courseInstructors.length, selectedSubjects.length, selectedInstructorIds.length]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%)`
      }}>
        <Loader className="animate-spin" size={48} style={{ color: COLORS.accent, marginBottom: '1rem' }} />
        <p style={{ color: COLORS.accent, fontSize: '1.1rem' }}>Loading schedule generator...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        .schedule-container {
          padding: 2rem;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
        }

        .page-header {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.15);
          margin-bottom: 2rem;
          color: white;
        }

        .page-title-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 1.05rem;
          margin: 0;
          opacity: 0.9;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
          color: white;
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          backdrop-filter: blur(10px);
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .action-btn.primary:hover:not(:disabled) {
          background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.accent} 100%);
        }

        .action-btn.secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          border-left: 4px solid ${COLORS.accent};
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
          color: ${COLORS.primary};
        }

        .config-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          margin-bottom: 2rem;
          overflow: hidden;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .config-card-header {
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .config-card-body {
          padding: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label-custom {
          font-weight: 600;
          color: ${COLORS.primary};
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .form-input-custom {
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 0.75rem;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input-custom:focus {
          outline: none;
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
        }

        .form-input-custom:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .availability-section {
          background: ${COLORS.lightest};
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 1.5rem;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-container input[type="checkbox"] {
          margin-top: 0.25rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .checkbox-label {
          flex: 1;
          color: ${COLORS.primary};
        }

        .selection-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          overflow: hidden;
          animation: slideIn 0.3s ease;
        }

        .selection-card-header {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          color: white;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s ease;
        }

        .selection-card-header:hover {
          background: linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary} 100%);
        }

        .selection-card-body {
          padding: 1.5rem;
        }

        .count-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .warning-badge {
          background: #F59E0B;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .small-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .small-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
        }

        .small-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-box {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid #90E0EF;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          outline: none;
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
        }

        .search-icon-inline {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${COLORS.accent};
          pointer-events: none;
        }

        .clear-btn {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .clear-btn:hover {
          color: ${COLORS.accent};
        }

        .items-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .item-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          margin-bottom: 0.75rem;
          border-radius: 10px;
          border: 2px solid #E9ECEF;
          background: #F8F9FA;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .item-checkbox.selected {
          background: #E6F7FF;
          border-color: ${COLORS.light};
        }

        .item-checkbox:hover {
          border-color: ${COLORS.accent};
          transform: translateX(4px);
        }

        .item-checkbox input[type="checkbox"] {
          margin-top: 0.25rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .item-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .units-badge {
          background: #6c757d;
          color: white;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .info-box {
          background: #E3F2FD;
          border: 2px solid #90CAF9;
          border-radius: 10px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #1565C0;
        }

        .warning-box {
          background: #FFF3CD;
          border: 2px solid #FFE69C;
          border-radius: 10px;
          padding: 1.5rem;
          color: #856404;
        }

        .conflicts-box {
          background: #FFE6E6;
          border: 2px solid #FFB3B3;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .preview-badge {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .preview-badge.success {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
        }

        .preview-badge.danger {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
          color: white;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .section-header {
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
          color: white;
          padding: 1.25rem 1.5rem;
        }

        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .schedule-table thead {
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
        }

        .schedule-table th {
          padding: 0.75rem;
          font-weight: 600;
          text-align: center;
          border: 1px solid #90E0EF;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .schedule-table td {
          padding: 0.75rem;
          border: 1px solid #E8F4F8;
          text-align: center;
          vertical-align: middle;
          transition: all 0.3s ease;
        }

        .schedule-table tbody tr:nth-child(odd) {
          background: #FAFCFD;
        }

        .schedule-table tbody tr:hover {
          background: #E8F4F8;
        }

        .time-badge {
          background: linear-gradient(135deg, ${COLORS.lighter} 0%, ${COLORS.light} 100%);
          color: ${COLORS.primary};
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
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

        .modal-header-custom {
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
          color: white;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-close {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          transition: transform 0.3s ease;
        }

        .modal-close:hover {
          transform: scale(1.2);
        }

        .modal-body-custom {
          padding: 2rem;
        }

        .modal-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .modal-info-grid > div {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-info-grid p {
          margin: 0;
          color: #333;
          font-size: 0.95rem;
        }

        .modal-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .modal-badge.success {
          background: #10B981;
          color: white;
        }

        .modal-badge.secondary {
          background: #6c757d;
          color: white;
        }

        .modal-info-box {
          background: #E3F2FD;
          border: 2px solid #90CAF9;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #1565C0;
        }

        .modal-footer-custom {
          padding: 1.5rem 2rem;
          border-top: 1px solid #E8F4F8;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

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

        .edusched-toast.toast-success { border-left-color: #10B981; }
        .edusched-toast.toast-error { border-left-color: #ff6b6b; }

        .edusched-toast .toast-icon { display: flex; align-items: center; }
        .edusched-toast .toast-message { flex: 1; color: #111827; font-weight: 600; }
        .edusched-toast .toast-close {
          background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #6B7280;
        }
        .edusched-toast .toast-close:hover { color: ${COLORS.accent}; }

        .page-content-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1100px) {
          .page-content-grid { grid-template-columns: 1fr; }
        }

        .left-col { display: flex; flex-direction: column; gap: 1.5rem; }
        .right-col { display: flex; flex-direction: column; gap: 1.5rem; }

        .footer-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .divider {
          height: 1px;
          background: #E8F4F8;
          margin: 1.25rem 0;
        }
      `}</style>

      <div className="schedule-container">
        {/* HEADER */}
        <div className="page-header">
          <div className="page-title-section">
            <div>
              <h1 className="page-title">
                <Calendar size={28} />
                 Schedule Generator
              </h1>
              <p className="page-subtitle">
                Auto-assign rooms & times while preventing conflicts. Uses 7:00 AM – 7:00 PM slots (hourly).
              </p>
            </div>

            <div className="header-actions">
              <button
                className="action-btn secondary"
                onClick={async () => {
                  setLoading(true);
                  await Promise.all([fetchCourses(), fetchAllInstructors(), fetchRooms(), fetchAvailabilityData()]);
                  setLoading(false);
                  setToast({ type: 'success', message: 'Data reloaded successfully.' });
                }}
                disabled={loading || generating}
                title="Reload courses, instructors, rooms, availability"
              >
                <RefreshCw size={16} />
                Reload Data
              </button>

              <button
                className="action-btn secondary"
                onClick={() => {
                  setScheduleResult(null);
                  setConflicts([]);
                  setSelectedSubjects([]);
                  setSelectedInstructorIds([]);
                  setToast({ type: 'success', message: 'Selections cleared.' });
                }}
                disabled={generating}
                title="Clear selections & preview"
              >
                <X size={16} />
                Reset Selections
              </button>

              <button
                className="action-btn primary"
                onClick={() => setShowConfirm(true)}
                disabled={generating}
                title="Generate schedule"
              >
                <CheckCircle size={16} />
                {generating ? 'Generating…' : 'Generate Schedule'}
              </button>
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="statistics-grid">
          <div className="stat-card">
            <div className="stat-label"><BookOpen size={14} style={{ marginRight: 6, verticalAlign: -2 }} /> Total Courses</div>
            <div className="stat-value">{overallStats.totalCourses}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label"><Users size={14} style={{ marginRight: 6, verticalAlign: -2 }} /> Course Instructors</div>
            <div className="stat-value">{overallStats.totalInstructors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label"><DoorOpen size={14} style={{ marginRight: 6, verticalAlign: -2 }} /> Total Rooms</div>
            <div className="stat-value">{rooms.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Selected Subjects</div>
            <div className="stat-value">{overallStats.selectedSubjects}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Selected Instructors</div>
            <div className="stat-value">{overallStats.selectedInstructors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Availability Records</div>
            <div className="stat-value">{availabilityDataCount}</div>
          </div>
        </div>

        {/* BODY GRID */}
        <div className="page-content-grid">
          <div className="left-col">
            <DeanScheduleForm
              courses={courses}
              courseId={courseId}
              setCourseId={setCourseId}
              yearLevel={yearLevel}
              setYearLevel={setYearLevel}
              semester={semester}
              setSemester={setSemester}
              studentsCount={studentsCount}
              setStudentsCount={setStudentsCount}
              sectionCount={sectionCount}
              setSectionCount={setSectionCount}
              considerAvailability={considerAvailability}
              setConsiderAvailability={setConsiderAvailability}
              generating={generating}
              availabilityLoaded={availabilityLoaded}
              availabilityDataCount={availabilityDataCount}
            />

            {/* Optional: quick rooms glance */}
            <div className="selection-card">
              <div className="selection-card-header" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={18} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Rooms (Auto-assigned)</h3>
                </div>
              </div>
              <div className="selection-card-body">
                {rooms.length === 0 ? (
                  <div className="warning-box">No rooms found. Add rooms in the admin first.</div>
                ) : (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {rooms.slice(0, 18).map(r => (
                        <span
                          key={r.id}
                          className="preview-badge"
                          style={{ background: '#EEF8FF', color: COLORS.primary }}
                        >
                          {r.name}
                        </span>
                      ))}
                      {rooms.length > 18 && (
                        <span className="preview-badge" style={{ background: '#EEF8FF', color: COLORS.primary }}>
                          +{rooms.length - 18} more
                        </span>
                      )}
                    </div>
                    <div className="divider" />
                    <small style={{ color: '#6B7280' }}>
                      Rooms are assigned automatically to avoid conflicts.
                    </small>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="right-col">
            <SubjectList
              subjects={subjects}
              selectedSubjects={selectedSubjects}
              toggleSubject={toggleSubject}
              generating={generating}
              loading={loadingSubjects}
              courseId={courseId}
            />

            <InstructorSubjectList
              instructors={courseInstructors}
              selectedInstructorIds={selectedInstructorIds}
              toggleInstructor={toggleInstructor}
              selectAllInstructors={selectAllInstructors}
              deselectAllInstructors={deselectAllInstructors}
              instructorAvailability={instructorAvailability}
              availabilityData={availabilityData}
              considerAvailability={considerAvailability}
              generating={generating}
              courseId={courseId}
            />

            <div className="footer-actions">
              <button
                className="action-btn secondary"
                onClick={() => {
                  setSelectedSubjects(subjects.map(s => s.id || s.subject_id).filter(Boolean));
                  setSelectedInstructorIds(courseInstructors.map(i => i.id));
                }}
                disabled={generating || subjects.length === 0 || courseInstructors.length === 0}
              >
                <Plus size={16} />
                Select All
              </button>
              <button
                className="action-btn secondary"
                onClick={() => {
                  setSelectedSubjects([]);
                  setSelectedInstructorIds([]);
                }}
                disabled={generating}
              >
                <X size={16} />
                Clear All
              </button>
              <button
                className="action-btn primary"
                onClick={() => setShowConfirm(true)}
                disabled={generating}
              >
                <CheckCircle size={16} />
                {generating ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <SchedulePreview
          scheduleResult={scheduleResult}
          conflicts={conflicts}
          subjects={subjects}
          instructors={allInstructors}
          rooms={rooms}
          onClear={() => {
            setScheduleResult(null);
            setConflicts([]);
          }}
        />
      </div>

      {/* MODAL */}
      <GenerateModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleGenerate}
        courses={courses}
        courseId={courseId}
        yearLevel={yearLevel}
        semester={semester}
        sectionCount={sectionCount}
        studentsCount={studentsCount}
        selectedSubjects={selectedSubjects}
        selectedInstructorIds={selectedInstructorIds}
        considerAvailability={considerAvailability}
      />

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type === 'success' ? 'success' : 'error'}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
