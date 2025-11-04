// // // src/components/CoursesPage.js
// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1'); // '1' or '2'
//   const [subjects, setSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);

//   // modal for adding subject
//   const [showAdd, setShowAdd] = useState(false);
//   const [newSubject, setNewSubject] = useState({ subject_code: '', description: '', units: 3 });

//   const [message, setMessage] = useState(null);

  

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCourseId) loadSubjects();
//     else setSubjects([]);
//   }, [selectedCourseId, yearLevel, semester]);

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(data);
//       if (data.length && !selectedCourseId) setSelectedCourseId(data[0].id);
//     } catch (err) {
//       console.error('fetchCourses error', err);
//     }
//   }

//   async function loadSubjects() {
//     setLoadingSubjects(true);
//     try {
//       const q = new URLSearchParams({
//         courseId: selectedCourseId,
//         yearLevel,
//         semester
//       }).toString();
//       const res = await fetch(`${API}/api/subjects?${q}`);
//       const data = await res.json();
//       setSubjects(data || []);
//     } catch (err) {
//       console.error('loadSubjects', err);
//     } finally {
//       setLoadingSubjects(false);
//     }
//   }

//   async function handleAddSubject(e) {
//     e.preventDefault();
//     setMessage(null);
//     if (!selectedCourseId) return setMessage({ type: 'danger', text: 'Select a course first.' });

//     // validation
//     if (!newSubject.subject_code.trim() || !newSubject.description.trim() || !newSubject.units) {
//       return setMessage({ type: 'danger', text: 'Please fill all subject fields.' });
//     }

//     try {
//       const res = await fetch(`${API}/api/subjects`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           courseId: Number(selectedCourseId),
//           yearLevel: Number(yearLevel),
//           semester,
//           subject_code: newSubject.subject_code.trim(),
//           description: newSubject.description.trim(),
//           units: Number(newSubject.units)
//         })
//       });
//       if (!res.ok) throw new Error('Failed to save');
//       setNewSubject({ subject_code: '', description: '', units: 3 });
//       setShowAdd(false);
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject added.' });
//     } catch (err) {
//       console.error('handleAddSubject', err);
//       setMessage({ type: 'danger', text: 'Failed to add subject.' });
//     }
//   }

//   async function handleDeleteSubject(id) {
//     if (!window.confirm('Delete this subject?')) return;
//     try {
//       const res = await fetch(`${API}/api/subjects/${id}`, { method: 'DELETE' });
//       if (!res.ok) throw new Error('Delete failed');
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject deleted.' });
//     } catch (err) {
//       console.error('Delete error', err);
//       setMessage({ type: 'danger', text: 'Failed to delete.' });
//     }
//   }

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         <Row className="align-items-center mb-3">
//           <Col>
//             <h5 className="mb-0">📚 Courses & Subjects</h5>
//             <small className="text-muted d-block">Pick course, year and semester — then add subjects.</small>
//           </Col>
//           <Col md="auto">
//             <Button onClick={() => setShowAdd(true)} disabled={!selectedCourseId}>➕ Add Subject</Button>
//           </Col>
//         </Row>

//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row className="mb-3 g-2">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Course</Form.Label>
//               <Form.Select
//                     value={selectedCourseId}
//                     onChange={(e) => setSelectedCourseId(e.target.value)}
//                     aria-label="Select course"
//                   >
//                     {courses.length === 0 && <option value="">No courses available</option>}
//                     {Array.isArray(courses) && courses.map(c => (
//                       <option key={c.id} value={String(c.id)}>
//                         {c.code} — {c.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={3}>
//             <Form.Group>
//               <Form.Label>Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={(e)=>setYearLevel(e.target.value)}>
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
//               <Form.Select value={semester} onChange={(e)=>setSemester(e.target.value)}>
//                 <option value="1">1st Semester</option>
//                 <option value="2">2nd Semester</option>
                
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <div className="table-responsive">
//           <Table striped bordered hover size="sm">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Code</th>
//                 <th>Description</th>
//                 <th>Units</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loadingSubjects ? (
//                 <tr><td colSpan="5" className="text-center">Loading...</td></tr>
//               ) : subjects.length ? subjects.map((s, i) => (
//                 <tr key={s.id}>
//                   <td>{i+1}</td>
//                   <td>{s.subject_code}</td>
//                   <td>{s.description}</td>
//                   <td>{s.units}</td>
//                   <td>
//                     <Button size="sm" variant="outline-danger" onClick={()=>handleDeleteSubject(s.id)}>Delete</Button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="5" className="text-center text-muted">No subjects yet for this selection.</td></tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>

//       {/* Add Subject Modal */}
//       <Modal show={showAdd} onHide={() => setShowAdd(false)}>
//         <Form onSubmit={handleAddSubject}>
//           <Modal.Header closeButton><Modal.Title>Add Subject</Modal.Title></Modal.Header>
//           <Modal.Body>
//             <Form.Group className="mb-2">
//               <Form.Label>Subject Code</Form.Label>
//               <Form.Control value={newSubject.subject_code} onChange={(e)=>setNewSubject({...newSubject, subject_code: e.target.value})} required />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Description</Form.Label>
//               <Form.Control value={newSubject.description} onChange={(e)=>setNewSubject({...newSubject, description: e.target.value})} required />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Units</Form.Label>
//               <Form.Control type="number" step="0.5" min="0" value={newSubject.units} onChange={(e)=>setNewSubject({...newSubject, units: e.target.value})} required />
//             </Form.Group>
//             <div className="text-muted small">Will be added to: <strong>{courses.find(c => String(c.id) === String(selectedCourseId))?.code}</strong>, Year {yearLevel}, Sem {semester}</div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
//             <Button type="submit" variant="primary">Add Subject</Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Card>
//   );
// }

// // src/components/CoursesPage.js
// // import React, { useEffect, useState } from 'react';
// // import { Card, Row, Col, Form, Button, Table, Modal, Alert, Spinner } from 'react-bootstrap';

// // const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // function normalizeCoursesResponse(data) {
// //   // Turn whatever the server returned into an array of course objects
// //   if (!data) return [];
// //   if (Array.isArray(data)) return data;
// //   if (data.courses && Array.isArray(data.courses)) return data.courses;
// //   // Sometimes backend returns an object with numeric keys (rare) -> convert values
// //   if (typeof data === 'object') {
// //     const vals = Object.values(data).filter(v => v && (v.id || v.code || v.name));
// //     if (vals.length) return vals;
// //   }
// //   return [];
// // }

// // export default function CoursesPage() {
// //   const [courses, setCourses] = useState([]);
// //   const [loadingCourses, setLoadingCourses] = useState(true);
// //   const [fetchError, setFetchError] = useState(null);

// //   // use strings for selects (HTML selects work with strings)
// //   const [selectedCourseId, setSelectedCourseId] = useState('');
// //   const [yearLevel, setYearLevel] = useState('1');
// //   const [semester, setSemester] = useState('1');

// //   const [subjects, setSubjects] = useState([]);
// //   const [loadingSubjects, setLoadingSubjects] = useState(false);

// //   // modal for adding subject
// //   const [showAdd, setShowAdd] = useState(false);
// //   const [newSubject, setNewSubject] = useState({ subject_code: '', description: '', units: 3 });

// //   const [message, setMessage] = useState(null);

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   useEffect(() => {
// //     // whenever the course/year/sem changes, load subjects
// //     if (selectedCourseId) {
// //       loadSubjects();
// //     } else {
// //       setSubjects([]);
// //     }
// //   }, [selectedCourseId, yearLevel, semester]);

// //   async function fetchCourses() {
// //     setLoadingCourses(true);
// //     setFetchError(null);
// //     try {
// //       const res = await fetch(`${API}/api/courses`);
// //       if (!res.ok) {
// //         throw new Error(`Server returned ${res.status}`);
// //       }
// //       const data = await res.json();
// //       console.log('DEBUG /api/courses response:', data); // <-- check network payload
// //       const normalized = normalizeCoursesResponse(data);
// //       setCourses(normalized);
// //       // set first course as selected (if any)
// //       if (normalized.length && !selectedCourseId) {
// //         setSelectedCourseId(String(normalized[0].id));
// //       }
// //     } catch (err) {
// //       console.error('fetchCourses error', err);
// //       setFetchError('Failed to load courses. Check backend /api/courses.');
// //     } finally {
// //       setLoadingCourses(false);
// //     }
// //   }

// //   async function loadSubjects() {
// //     if (!selectedCourseId) return;
// //     setLoadingSubjects(true);
// //     setMessage(null);
// //     try {
// //       const q = new URLSearchParams({
// //         courseId: selectedCourseId,
// //         yearLevel,
// //         semester
// //       }).toString();
// //       const res = await fetch(`${API}/api/subjects?${q}`);
// //       if (!res.ok) {
// //         throw new Error(`Server returned ${res.status}`);
// //       }
// //       const data = await res.json();
// //       console.log('DEBUG /api/subjects response:', data);
// //       // ensure array
// //       setSubjects(Array.isArray(data) ? data : []);
// //     } catch (err) {
// //       console.error('loadSubjects', err);
// //       setMessage({ type: 'danger', text: 'Failed to load subjects.' });
// //       setSubjects([]);
// //     } finally {
// //       setLoadingSubjects(false);
// //     }
// //   }

// //   async function handleAddSubject(e) {
// //     e.preventDefault();
// //     setMessage(null);
// //     if (!selectedCourseId) return setMessage({ type: 'danger', text: 'Select a course first.' });

// //     // validation
// //     if (!newSubject.subject_code.trim() || !newSubject.description.trim() || !newSubject.units) {
// //       return setMessage({ type: 'danger', text: 'Please fill all subject fields.' });
// //     }

// //     try {
// //       const res = await fetch(`${API}/api/subjects`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           courseId: Number(selectedCourseId),
// //           yearLevel: Number(yearLevel),
// //           semester,
// //           subject_code: newSubject.subject_code.trim(),
// //           description: newSubject.description.trim(),
// //           units: Number(newSubject.units)
// //         })
// //       });
// //       if (!res.ok) {
// //         const txt = await res.text().catch(()=>null);
// //         throw new Error(txt || 'Failed to save');
// //       }
// //       setNewSubject({ subject_code: '', description: '', units: 3 });
// //       setShowAdd(false);
// //       await loadSubjects(); // refresh
// //       setMessage({ type: 'success', text: 'Subject added.' });
// //     } catch (err) {
// //       console.error('handleAddSubject', err);
// //       setMessage({ type: 'danger', text: 'Failed to add subject.' });
// //     }
// //   }

// //   async function handleDeleteSubject(id) {
// //     if (!window.confirm('Delete this subject?')) return;
// //     try {
// //       const res = await fetch(`${API}/api/subjects/${id}`, { method: 'DELETE' });
// //       if (!res.ok) throw new Error('Delete failed');
// //       await loadSubjects();
// //       setMessage({ type: 'success', text: 'Subject deleted.' });
// //     } catch (err) {
// //       console.error('Delete error', err);
// //       setMessage({ type: 'danger', text: 'Failed to delete.' });
// //     }
// //   }

// //   return (
// //     <Card className="shadow-sm border-0">
// //       <Card.Body>
// //         <Row className="align-items-center mb-3">
// //           <Col>
// //             <h5 className="mb-0">📚 Courses & Subjects</h5>
// //             <small className="text-muted d-block">Pick course, year and semester — then add subjects.</small>
// //           </Col>
// //           <Col md="auto">
// //             <Button onClick={() => setShowAdd(true)} disabled={!selectedCourseId}>➕ Add Subject</Button>
// //           </Col>
// //         </Row>

// //         {message && <Alert variant={message.type}>{message.text}</Alert>}

// //         {loadingCourses ? (
// //           <div className="text-center py-4"><Spinner animation="border" /></div>
// //         ) : fetchError ? (
// //           <Alert variant="danger">{fetchError}</Alert>
// //         ) : (
// //           <>
// //             <Row className="mb-3 g-2">
// //               <Col md={4}>
// //                 <Form.Group>
// //                   <Form.Label>Course</Form.Label>
// //                   <Form.Select
// //                     value={selectedCourseId}
// //                     onChange={(e) => setSelectedCourseId(e.target.value)}
// //                     aria-label="Select course"
// //                   >
// //                     {courses.length === 0 && <option value="">No courses available</option>}
// //                     {Array.isArray(courses) && courses.map(c => (
// //                       <option key={c.id} value={String(c.id)}>
// //                         {c.code} — {c.name}
// //                       </option>
// //                     ))}
// //                   </Form.Select>
// //                 </Form.Group>
// //               </Col>

// //               <Col md={3}>
// //                 <Form.Group>
// //                   <Form.Label>Year Level</Form.Label>
// //                   <Form.Select value={String(yearLevel)} onChange={(e) => setYearLevel(e.target.value)}>
// //                     <option value="1">1st Year</option>
// //                     <option value="2">2nd Year</option>
// //                     <option value="3">3rd Year</option>
// //                     <option value="4">4th Year</option>
// //                   </Form.Select>
// //                 </Form.Group>
// //               </Col>

// //               <Col md={3}>
// //                 <Form.Group>
// //                   <Form.Label>Semester</Form.Label>
// //                   <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)}>
// //                     <option value="1">1st Semester</option>
// //                     <option value="2">2nd Semester</option>
// //                     <option value="Summer">Summer</option>
// //                   </Form.Select>
// //                 </Form.Group>
// //               </Col>
// //             </Row>

// //             <div className="table-responsive">
// //               <Table striped bordered hover size="sm">
// //                 <thead>
// //                   <tr>
// //                     <th>#</th>
// //                     <th>Code</th>
// //                     <th>Description</th>
// //                     <th>Units</th>
// //                     <th>Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {loadingSubjects ? (
// //                     <tr><td colSpan="5" className="text-center">Loading...</td></tr>
// //                   ) : (subjects && subjects.length ? subjects.map((s, i) => (
// //                     <tr key={s.id}>
// //                       <td>{i + 1}</td>
// //                       <td>{s.subject_code}</td>
// //                       <td>{s.description}</td>
// //                       <td>{s.units}</td>
// //                       <td>
// //                         <Button size="sm" variant="outline-danger" onClick={() => handleDeleteSubject(s.id)}>Delete</Button>
// //                       </td>
// //                     </tr>
// //                   )) : (
// //                     <tr><td colSpan="5" className="text-center text-muted">No subjects yet for this selection.</td></tr>
// //                   ))}
// //                 </tbody>
// //               </Table>
// //             </div>
// //           </>
// //         )}
// //       </Card.Body>

// //       {/* Add Subject Modal */}
// //       <Modal show={showAdd} onHide={() => setShowAdd(false)}>
// //         <Form onSubmit={handleAddSubject}>
// //           <Modal.Header closeButton><Modal.Title>Add Subject</Modal.Title></Modal.Header>
// //           <Modal.Body>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Subject Code</Form.Label>
// //               <Form.Control value={newSubject.subject_code} onChange={(e) => setNewSubject({ ...newSubject, subject_code: e.target.value })} required />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Description</Form.Label>
// //               <Form.Control value={newSubject.description} onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })} required />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Units</Form.Label>
// //               <Form.Control type="number" step="0.5" min="0" value={newSubject.units} onChange={(e) => setNewSubject({ ...newSubject, units: e.target.value })} required />
// //             </Form.Group>
// //             <div className="text-muted small">Will be added to: <strong>{courses.find(c => String(c.id) === String(selectedCourseId))?.code || '—'}</strong>, Year {yearLevel}, Sem {semester}</div>
// //           </Modal.Body>
// //           <Modal.Footer>
// //             <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
// //             <Button type="submit" variant="primary">Add Subject</Button>
// //           </Modal.Footer>
// //         </Form>
// //       </Modal>
// //     </Card>
// //   );
// // }

// // src/components/CoursesPage.js
// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Form, Button, Table, Modal, Alert, Spinner } from 'react-bootstrap';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [subjects, setSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [showAdd, setShowAdd] = useState(false);
//   const [newSubject, setNewSubject] = useState({ subject_code: '', description: '', units: 3 });
//   const [message, setMessage] = useState(null);

//   useEffect(() => { fetchCourses(); }, []);
//   useEffect(() => { selectedCourseId ? loadSubjects() : setSubjects([]); }, [selectedCourseId, yearLevel, semester]);

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(data);
//       if (data.length && !selectedCourseId) setSelectedCourseId(data[0].id);
//     } catch (err) { console.error('fetchCourses error', err); }
//   }

//   async function loadSubjects() {
//     setLoadingSubjects(true);
//     try {
//       const q = new URLSearchParams({ courseId: selectedCourseId, yearLevel, semester }).toString();
//       const res = await fetch(`${API}/api/subjects?${q}`);
//       const data = await res.json();
//       setSubjects(data || []);
//     } catch (err) {
//       console.error('loadSubjects', err);
//     } finally { setLoadingSubjects(false); }
//   }

//   async function handleAddSubject(e) {
//     e.preventDefault();
//     setMessage(null);
//     if (!selectedCourseId) return setMessage({ type: 'danger', text: 'Select a course first.' });

//     if (!newSubject.subject_code.trim() || !newSubject.description.trim() || !newSubject.units) {
//       return setMessage({ type: 'danger', text: 'Please fill all subject fields.' });
//     }

//     try {
//       const res = await fetch(`${API}/api/subjects`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           courseId: Number(selectedCourseId),
//           yearLevel: Number(yearLevel),
//           semester,
//           subject_code: newSubject.subject_code.trim(),
//           description: newSubject.description.trim(),
//           units: Number(newSubject.units)
//         })
//       });
//       if (!res.ok) throw new Error('Failed to save');
//       setNewSubject({ subject_code: '', description: '', units: 3 });
//       setShowAdd(false);
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject added successfully 🎉' });
//     } catch (err) {
//       console.error('handleAddSubject', err);
//       setMessage({ type: 'danger', text: 'Failed to add subject.' });
//     }
//   }

//   async function handleDeleteSubject(id) {
//     if (!window.confirm('Delete this subject?')) return;
//     try {
//       const res = await fetch(`${API}/api/subjects/${id}`, { method: 'DELETE' });
//       if (!res.ok) throw new Error('Delete failed');
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject deleted ✅' });
//     } catch (err) {
//       console.error('Delete error', err);
//       setMessage({ type: 'danger', text: 'Failed to delete.' });
//     }
//   }

//   return (
//     <Card className="shadow-lg border-0 rounded-4 bg-light bg-gradient" style={{ backdropFilter: 'blur(10px)' }}>
//       <Card.Body>
//         {/* Header */}
//         <Row className="align-items-center mb-4">
//           <Col>
//             <h4 className="fw-bold text-primary mb-1">📚 Courses & Subjects</h4>
//             <small className="text-muted">Pick course, year, and semester — then add subjects.</small>
//           </Col>
//           <Col md="auto">
//             <Button 
//               className="px-4 fw-semibold shadow-sm"
//               style={{ background: "linear-gradient(90deg, #4A90E2, #357ABD)", border: "none" }}
//               onClick={() => setShowAdd(true)} 
//               disabled={!selectedCourseId}
//             >
//               ➕ Add Subject
//             </Button>
//           </Col>
//         </Row>

//         {/* Alerts */}
//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         {/* Filters */}
//         <Row className="mb-4 g-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label className="fw-semibold">Course</Form.Label>
//               <Form.Select
//                 value={selectedCourseId}
//                 onChange={(e) => setSelectedCourseId(e.target.value)}
//               >
//                 {courses.length === 0 && <option value="">No courses available</option>}
//                 {Array.isArray(courses) && courses.map(c => (
//                   <option key={c.id} value={String(c.id)}>{c.code} — {c.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label className="fw-semibold">Year Level</Form.Label>
//               <Form.Select value={yearLevel} onChange={(e)=>setYearLevel(e.target.value)}>
//                 <option value={1}>1st Year</option>
//                 <option value={2}>2nd Year</option>
//                 <option value={3}>3rd Year</option>
//                 <option value={4}>4th Year</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label className="fw-semibold">Semester</Form.Label>
//               <Form.Select value={semester} onChange={(e)=>setSemester(e.target.value)}>
//                 <option value="1">1st Semester</option>
//                 <option value="2">2nd Semester</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Subjects Table */}
//         <div className="table-responsive rounded-3 overflow-hidden">
//           <Table hover borderless className="align-middle shadow-sm">
//             <thead className="text-white" style={{ background: "linear-gradient(90deg, #4A90E2, #357ABD)" }}>
//               <tr>
//                 <th>#</th>
//                 <th>Code</th>
//                 <th>Description</th>
//                 <th>Units</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loadingSubjects ? (
//                 <tr><td colSpan="5" className="text-center py-3"><Spinner animation="border" /></td></tr>
//               ) : subjects.length ? subjects.map((s, i) => (
//                 <tr key={s.id}>
//                   <td className="fw-semibold">{i+1}</td>
//                   <td>{s.subject_code}</td>
//                   <td>{s.description}</td>
//                   <td>{s.units}</td>
//                   <td className="text-center">
//                     <Button size="sm" variant="outline-danger" className="rounded-pill px-3"
//                       onClick={()=>handleDeleteSubject(s.id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="5" className="text-center text-muted py-3">No subjects yet for this selection.</td></tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>

//       {/* Add Subject Modal */}
//       <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
//         <Form onSubmit={handleAddSubject}>
//           <Modal.Header closeButton className="border-0">
//             <Modal.Title className="fw-bold text-primary">➕ Add New Subject</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Subject Code</Form.Label>
//               <Form.Control value={newSubject.subject_code} 
//                 onChange={(e)=>setNewSubject({...newSubject, subject_code: e.target.value})} required />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control value={newSubject.description} 
//                 onChange={(e)=>setNewSubject({...newSubject, description: e.target.value})} required />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Units</Form.Label>
//               <Form.Control type="number" step="0.5" min="0" value={newSubject.units} 
//                 onChange={(e)=>setNewSubject({...newSubject, units: e.target.value})} required />
//             </Form.Group>
//             <div className="text-muted small">
//               Will be added to: <strong>{courses.find(c => String(c.id) === String(selectedCourseId))?.code}</strong>, Year {yearLevel}, Sem {semester}
//             </div>
//           </Modal.Body>
//           <Modal.Footer className="border-0">
//             <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
//             <Button type="submit" 
//               style={{ background: "linear-gradient(90deg, #4A90E2, #357ABD)", border: "none" }}>
//               Add Subject
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Card>
//   );
// }

//FUNCTIONAL

// import React, { useEffect, useState } from 'react';
// import { Card, Form, Button, Table, Modal, Alert, Spinner } from 'react-bootstrap';
// import '../../styles/Addsubject.css'; // Updated styles

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [subjects, setSubjects] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [showAdd, setShowAdd] = useState(false);
//   const [newSubject, setNewSubject] = useState({ subject_code: '', description: '', units: 3 });
//   const [message, setMessage] = useState(null);

//   useEffect(() => { fetchCourses(); }, []);
//   useEffect(() => { selectedCourseId ? loadSubjects() : setSubjects([]); }, [selectedCourseId, yearLevel, semester]);

//   async function fetchCourses() {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(data);
//       if (data.length && !selectedCourseId) setSelectedCourseId(data[0].id);
//     } catch (err) { console.error('fetchCourses error', err); }
//   }

//   async function loadSubjects() {
//     setLoadingSubjects(true);
//     try {
//       const q = new URLSearchParams({ courseId: selectedCourseId, yearLevel, semester }).toString();
//       const res = await fetch(`${API}/api/subjects?${q}`);
//       const data = await res.json();
//       setSubjects(data || []);
//     } catch (err) {
//       console.error('loadSubjects', err);
//     } finally { setLoadingSubjects(false); }
//   }

//   async function handleAddSubject(e) {
//     e.preventDefault();
//     setMessage(null);
//     if (!selectedCourseId) return setMessage({ type: 'danger', text: 'Select a course first.' });

//     if (!newSubject.subject_code.trim() || !newSubject.description.trim() || !newSubject.units) {
//       return setMessage({ type: 'danger', text: 'Please fill all subject fields.' });
//     }

//     try {
//       const res = await fetch(`${API}/api/subjects`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           courseId: Number(selectedCourseId),
//           yearLevel: Number(yearLevel),
//           semester,
//           subject_code: newSubject.subject_code.trim(),
//           description: newSubject.description.trim(),
//           units: Number(newSubject.units)
//         })
//       });
//       if (!res.ok) throw new Error('Failed to save');
//       setNewSubject({ subject_code: '', description: '', units: 3 });
//       setShowAdd(false);
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject added successfully 🎉' });
//     } catch (err) {
//       console.error('handleAddSubject', err);
//       setMessage({ type: 'danger', text: 'Failed to add subject.' });
//     }
//   }

//   async function handleDeleteSubject(id) {
//     if (!window.confirm('Delete this subject?')) return;
//     try {
//       const res = await fetch(`${API}/api/subjects/${id}`, { method: 'DELETE' });
//       if (!res.ok) throw new Error('Delete failed');
//       loadSubjects();
//       setMessage({ type: 'success', text: 'Subject deleted ✅' });
//     } catch (err) {
//       console.error('Delete error', err);
//       setMessage({ type: 'danger', text: 'Failed to delete.' });
//     }
//   }

//   return (
//     <div className="container-fluid py-4 full-bg">
//       <Card className="addsubject-card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '1200px' }}>
//         <Card.Body>

//           {/* === Page Title === */}
//           <div className="text-center mb-4">
//             <h4 className="fw-bold" style={{ color: '#023E8A' }}>
//               {selectedCourseId
//                 ? courses.find(c => String(c.id) === String(selectedCourseId))?.name
//                 : "Select a Course"}
//             </h4>
//             {selectedCourseId && (
//               <small className="text-muted d-block mt-1">
//                 {courses.find(c => String(c.id) === String(selectedCourseId))?.code}
//               </small>
//             )}
//             <small className="text-muted d-block mt-2">
//               Select Year Level, Semester, and Course to manage subjects.
//             </small>
//           </div>

//           {/* === Year Level Section === */}
//           <div className="addsubject-section">
//             <span className="addsubject-section-label">Year Level:</span>
//             <div className="scroll-container">
//               {[1, 2, 3, 4].map(year => (
//                 <Button
//                   key={year}
//                   variant={year === yearLevel ? "primary" : "outline-primary"}
//                   onClick={() => setYearLevel(year)}
//                   className={`addsubject-btn-year ${year === yearLevel ? 'active' : ''}`}
//                 >
//                   {year === 1 ? 'First Year' :
//                     year === 2 ? 'Second Year' :
//                       year === 3 ? 'Third Year' : 'Fourth Year'}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* === Semester Section === */}
//           <div className="addsubject-section">
//             <span className="addsubject-section-label">Semester:</span>
//             <div className="scroll-container">
//               {['1', '2'].map(s => (
//                 <Button
//                   key={s}
//                   variant={s === semester ? "primary" : "outline-primary"}
//                   onClick={() => setSemester(s)}
//                   className={`addsubject-btn-sem ${s === semester ? 'active' : ''}`}
//                 >
//                   {s === '1' ? 'First Semester' : 'Second Semester'}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* === Course Section === */}
//           <div className="addsubject-section">
//             <span className="addsubject-section-label">Course:</span>
//             <div className="scroll-container">
//               {courses.map(course => (
//                 <Button
//                   key={course.id}
//                   variant={course.id === selectedCourseId ? "primary" : "outline-primary"}
//                   onClick={() => setSelectedCourseId(course.id)}
//                   className={`addsubject-btn-course ${course.id === selectedCourseId ? 'active' : ''}`}
//                 >
//                   {course.code}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* === Add Subject Button === */}
//           <div className="text-center mb-4">
//             <Button
//               className="addsubject-btn-primary fw-semibold shadow-sm"
//               onClick={() => setShowAdd(true)}
//               disabled={!selectedCourseId}
//             >
//               ➕ Add Subject
//             </Button>
//           </div>

//           {/* === Alert Message === */}
//           {message && (
//             <div className="text-center mb-3">
//               <Alert variant={message.type} className="d-inline-block w-auto">
//                 {message.text}
//               </Alert>
//             </div>
//           )}

//           {/* === Subjects Table === */}
//           <div className="addsubject-table-container">
//             <h5 className="fw-bold text-center mb-3 text-primary">
//               {yearLevel === 1 ? 'First' : yearLevel === 2 ? 'Second' : yearLevel === 3 ? 'Third' : 'Fourth'} Year —
//               {semester === '1' ? ' First' : ' Second'} Semester
//             </h5>
//             <Table hover responsive borderless className="addsubject-table align-middle shadow-sm">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Code</th>
//                   <th>Description</th>
//                   <th>Units</th>
//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loadingSubjects ? (
//                   <tr><td colSpan="5" className="text-center py-3"><Spinner animation="border" /></td></tr>
//                 ) : subjects.length ? subjects.map((s, i) => (
//                   <tr key={s.id}>
//                     <td className="fw-semibold">{i + 1}</td>
//                     <td>{s.subject_code}</td>
//                     <td>{s.description}</td>
//                     <td>{s.units}</td>
//                     <td className="text-center">
//                       <Button
//                         size="sm"
//                         variant="outline-danger"
//                         onClick={() => handleDeleteSubject(s.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="5" className="text-center text-muted py-3">
//                       No subjects yet for this selection.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>

//           {/* === Add Subject Modal === */}
//           <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
//             <Form onSubmit={handleAddSubject}>
//               <Modal.Header closeButton>
//                 <Modal.Title className="fw-bold">➕ Add New Subject</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Subject Code</Form.Label>
//                   <Form.Control
//                     value={newSubject.subject_code}
//                     onChange={(e) => setNewSubject({ ...newSubject, subject_code: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     value={newSubject.description}
//                     onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Units</Form.Label>
//                   <Form.Control
//                     type="number"
//                     step="0.5"
//                     min="0"
//                     value={newSubject.units}
//                     onChange={(e) => setNewSubject({ ...newSubject, units: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <div className="text-muted small">
//               Will be added to: <strong>{courses.find(c => String(c.id) === String(selectedCourseId))?.code}</strong>, Year {yearLevel}, Sem {semester}
//            </div>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
//                 <Button type="submit" className="btn btn-primary">Add Subject</Button>
//               </Modal.Footer>
//             </Form>
//           </Modal>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { 
//   BookOpen, Plus, Search, RefreshCw, Edit2, Trash2, X, 
//   Check, ChevronDown, ChevronUp, Filter, Download, 
//   AlertCircle, CheckCircle, Calendar, Users, Award
// } from 'lucide-react';

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ==================== UTILITY FUNCTIONS ====================
// const getYearLabel = (year) => {
//   const labels = { 1: 'First Year', 2: 'Second Year', 3: 'Third Year', 4: 'Fourth Year' };
//   return labels[year] || `Year ${year}`;
// };

// const getSemesterLabel = (sem) => {
//   const labels = { '1': '1st Semester', '2': '2nd Semester', 'Summer': 'Summer' };
//   return labels[sem] || sem;
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
//       <button onClick={onClose} className="toast-close">
//         <X size={16} />
//       </button>
//     </div>
//   );
// });

// // ==================== LOADING SKELETON ====================
// const Skeleton = React.memo(({ width = '100%', height = '40px' }) => (
//   <div className="skeleton" style={{ width, height }} />
// ));

// const TableSkeleton = React.memo(() => (
//   <div className="table-skeleton">
//     {[1, 2, 3, 4, 5].map(i => (
//       <div key={i} className="skeleton-row">
//         <Skeleton width="40px" height="50px" />
//         <Skeleton width="120px" height="50px" />
//         <Skeleton height="50px" />
//         <Skeleton width="80px" height="50px" />
//         <Skeleton width="100px" height="50px" />
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

// // ==================== COURSE SELECTOR ====================
// const CourseSelector = React.memo(({ courses, selectedCourseId, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <BookOpen size={18} />
//       <h3>Select Course</h3>
//     </div>
//     <div className="course-grid">
//       {courses.map(course => (
//         <button
//           key={course.id}
//           className={`course-btn ${course.id === selectedCourseId ? 'active' : ''}`}
//           onClick={() => onChange(course.id)}
//         >
//           <div className="course-code">{course.code}</div>
//           <div className="course-name">{course.name}</div>
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== YEAR SELECTOR ====================
// const YearSelector = React.memo(({ yearLevel, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <Users size={18} />
//       <h3>Year Level</h3>
//     </div>
//     <div className="button-group">
//       {[1, 2, 3, 4].map(year => (
//         <button
//           key={year}
//           className={`selector-btn ${year === yearLevel ? 'active' : ''}`}
//           onClick={() => onChange(year)}
//         >
//           {getYearLabel(year)}
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== SEMESTER SELECTOR ====================
// const SemesterSelector = React.memo(({ semester, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <Calendar size={18} />
//       <h3>Semester</h3>
//     </div>
//     <div className="button-group">
//       {['1', '2', 'Summer'].map(sem => (
//         <button
//           key={sem}
//           className={`selector-btn ${sem === semester ? 'active' : ''}`}
//           onClick={() => onChange(sem)}
//         >
//           {getSemesterLabel(sem)}
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== SUBJECT TABLE ====================
// const SubjectTable = React.memo(({ 
//   subjects, 
//   loading, 
//   onDelete, 
//   searchTerm, 
//   sortBy 
// }) => {
//   const filteredAndSortedSubjects = useMemo(() => {
//     let filtered = subjects;

//     // Apply search filter
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       filtered = subjects.filter(s =>
//         s.subject_code?.toLowerCase().includes(term) ||
//         s.description?.toLowerCase().includes(term)
//       );
//     }

//     // Apply sorting
//     const sorted = [...filtered].sort((a, b) => {
//       switch (sortBy) {
//         case 'code':
//           return (a.subject_code || '').localeCompare(b.subject_code || '');
//         case 'description':
//           return (a.description || '').localeCompare(b.description || '');
//         case 'units':
//           return (b.units || 0) - (a.units || 0);
//         default:
//           return 0;
//       }
//     });

//     return sorted;
//   }, [subjects, searchTerm, sortBy]);

//   if (loading) return <TableSkeleton />;

//   if (filteredAndSortedSubjects.length === 0) {
//     return (
//       <div className="empty-state">
//         <BookOpen size={48} className="empty-icon" />
//         <h3>No Subjects Found</h3>
//         <p>
//           {searchTerm 
//             ? "No subjects match your search criteria"
//             : "No subjects available for this selection"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="subjects-table">
//         <thead>
//           <tr>
//             <th style={{ width: '60px' }}>#</th>
//             <th>Subject Code</th>
//             <th>Description</th>
//             <th style={{ width: '100px' }}>Units</th>
//             <th style={{ width: '120px' }} className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAndSortedSubjects.map((subject, index) => (
//             <tr key={subject.id} className="subject-row">
//               <td className="row-number">{index + 1}</td>
//               <td>
//                 <div className="subject-code-cell">{subject.subject_code}</div>
//               </td>
//               <td>
//                 <div className="subject-desc">{subject.description}</div>
//               </td>
//               <td>
//                 <div className="units-badge">{subject.units}</div>
//               </td>
//               <td className="text-center">
//                 <button
//                   className="delete-btn"
//                   onClick={() => onDelete(subject.id)}
//                   title="Delete subject"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ==================== ADD SUBJECT MODAL ====================
// const AddSubjectModal = React.memo(({ 
//   show, 
//   onClose, 
//   onSave, 
//   courseName, 
//   yearLevel, 
//   semester 
// }) => {
//   const [formData, setFormData] = useState({
//     subject_code: '',
//     description: '',
//     units: 3
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.subject_code.trim() && formData.description.trim() && formData.units) {
//       onSave(formData);
//       setFormData({ subject_code: '', description: '', units: 3 });
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h3>Add New Subject</h3>
//             <button type="button" onClick={onClose} className="modal-close">
//               <X size={20} />
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Subject Code
//               </label>
//               <input
//                 type="text"
//                 className="form-input"
//                 placeholder="e.g., CS101, MATH201"
//                 value={formData.subject_code}
//                 onChange={e => setFormData({ ...formData, subject_code: e.target.value })}
//                 required
//                 autoFocus
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Description
//               </label>
//               <input
//                 type="text"
//                 className="form-input"
//                 placeholder="e.g., Introduction to Programming"
//                 value={formData.description}
//                 onChange={e => setFormData({ ...formData, description: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <Award size={16} />
//                 Units
//               </label>
//               <input
//                 type="number"
//                 className="form-input"
//                 step="0.5"
//                 min="0"
//                 max="10"
//                 value={formData.units}
//                 onChange={e => setFormData({ ...formData, units: parseFloat(e.target.value) })}
//                 required
//               />
//             </div>

//             <div className="form-info">
//               <div className="info-label">Will be added to:</div>
//               <div className="info-details">
//                 <strong>{courseName}</strong> • {getYearLabel(yearLevel)} • {getSemesterLabel(semester)}
//               </div>
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button type="button" onClick={onClose} className="btn-secondary">
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary">
//               <Plus size={16} />
//               Add Subject
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// });

// // ==================== DELETE CONFIRMATION MODAL ====================
// const DeleteConfirmModal = React.memo(({ show, onClose, onConfirm, subjectCode }) => {
//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <AlertCircle size={24} className="warning-icon" />
//           <h3>Delete Subject?</h3>
//         </div>

//         <div className="modal-body">
//           <p>
//             Are you sure you want to delete <strong>{subjectCode}</strong>? 
//             This action cannot be undone.
//           </p>
//         </div>

//         <div className="modal-footer">
//           <button onClick={onClose} className="btn-secondary">
//             Cancel
//           </button>
//           <button onClick={onConfirm} className="btn-danger">
//             <Trash2 size={16} />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function CoursesPage() {
//   // State Management
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [subjects, setSubjects] = useState([]);
  
//   const [loading, setLoading] = useState({
//     initial: true,
//     subjects: false,
//   });
  
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('code');
  
//   const [toast, setToast] = useState({ message: '', type: '' });

//   // Initial data fetch
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Fetch subjects when course/year/semester changes
//   useEffect(() => {
//     if (selectedCourseId) {
//       loadSubjects();
//     } else {
//       setSubjects([]);
//     }
//   }, [selectedCourseId, yearLevel, semester]);

//   // API Functions
//   const fetchCourses = async () => {
//     setLoading(prev => ({ ...prev, initial: true }));
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
      
//       if (data.length && !selectedCourseId) {
//         setSelectedCourseId(data[0].id);
//       }
//     } catch (err) {
//       console.error('fetchCourses error:', err);
//       showToast('Failed to load courses', 'danger');
//     } finally {
//       setLoading(prev => ({ ...prev, initial: false }));
//     }
//   };

//   const loadSubjects = async () => {
//     setLoading(prev => ({ ...prev, subjects: true }));
//     try {
//       const params = new URLSearchParams({ 
//         courseId: selectedCourseId, 
//         yearLevel, 
//         semester 
//       });
//       const res = await fetch(`${API}/api/subjects?${params}`);
//       const data = await res.json();
//       setSubjects(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('loadSubjects error:', err);
//       showToast('Failed to load subjects', 'danger');
//     } finally {
//       setLoading(prev => ({ ...prev, subjects: false }));
//     }
//   };

//   const handleAddSubject = async (formData) => {
//     if (!selectedCourseId) {
//       showToast('Please select a course first', 'danger');
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/api/subjects`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           courseId: Number(selectedCourseId),
//           yearLevel: Number(yearLevel),
//           semester,
//           subject_code: formData.subject_code.trim(),
//           description: formData.description.trim(),
//           units: Number(formData.units)
//         })
//       });

//       if (!res.ok) throw new Error('Failed to add subject');

//       setShowAddModal(false);
//       await loadSubjects();
//       showToast('Subject added successfully! 🎉', 'success');
//     } catch (err) {
//       console.error('handleAddSubject error:', err);
//       showToast('Failed to add subject', 'danger');
//     }
//   };

//   const handleDeleteClick = (subject) => {
//     setDeleteTarget(subject);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteTarget) return;

//     try {
//       const res = await fetch(`${API}/api/subjects/${deleteTarget.id}`, {
//         method: 'DELETE'
//       });

//       if (!res.ok) throw new Error('Failed to delete subject');

//       setShowDeleteModal(false);
//       setDeleteTarget(null);
//       await loadSubjects();
//       showToast('Subject deleted successfully ✓', 'success');
//     } catch (err) {
//       console.error('handleDeleteConfirm error:', err);
//       showToast('Failed to delete subject', 'danger');
//     }
//   };

//   const handleRefresh = useCallback(async () => {
//     await Promise.all([fetchCourses(), selectedCourseId && loadSubjects()]);
//     showToast('Data refreshed successfully', 'success');
//   }, [selectedCourseId]);

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   const closeToast = () => {
//     setToast({ message: '', type: '' });
//   };

//   // Get selected course info
//   const selectedCourse = useMemo(() => {
//     return courses.find(c => c.id === selectedCourseId);
//   }, [courses, selectedCourseId]);

//   // Calculate stats
//   const stats = useMemo(() => {
//     const totalUnits = subjects.reduce((sum, s) => sum + (s.units || 0), 0);
//     return {
//       courses: courses.length,
//       subjects: subjects.length,
//       totalUnits,
//     };
//   }, [courses, subjects]);

//   return (
//     <div className="courses-page">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={closeToast} />

//       {/* Page Header */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <BookOpen size={32} />
//             </div>
//             <div>
//               <h1 className="page-title">Course & Subject Management</h1>
//               <p className="page-subtitle">
//                 {selectedCourse 
//                   ? `${selectedCourse.code} — ${selectedCourse.name}`
//                   : 'Select a course to manage subjects'
//                 }
//               </p>
//             </div>
//           </div>

//           <div className="header-actions">
//             <button 
//               className="action-btn primary"
//               onClick={() => setShowAddModal(true)}
//               disabled={!selectedCourseId}
//             >
//               <Plus size={18} />
//               Add Subject
//             </button>
//             <button 
//               className="action-btn refresh"
//               onClick={handleRefresh}
//               disabled={loading.initial}
//             >
//               <RefreshCw size={18} className={loading.initial ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="stats-grid">
//           <StatsCard
//             icon={BookOpen}
//             label="Total Courses"
//             value={stats.courses}
//             color={COLORS.primary}
//           />
//           <StatsCard
//             icon={BookOpen}
//             label="Subjects Loaded"
//             value={stats.subjects}
//             color={COLORS.accent}
//           />
//           <StatsCard
//             icon={Award}
//             label="Total Units"
//             value={stats.totalUnits}
//             color={COLORS.light}
//           />
//         </div>
//       </div>

//       {/* Selectors Section */}
//       <div className="selectors-section">
//         <CourseSelector
//           courses={courses}
//           selectedCourseId={selectedCourseId}
//           onChange={setSelectedCourseId}
//         />

//         <div className="dual-selectors">
//           <YearSelector yearLevel={yearLevel} onChange={setYearLevel} />
//           <SemesterSelector semester={semester} onChange={setSemester} />
//         </div>
//       </div>

//       {/* Subjects Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <div className="table-title">
//             <h2>
//               {getYearLabel(yearLevel)} — {getSemesterLabel(semester)}
//             </h2>
//             <span className="subject-count">{subjects.length} Subjects</span>
//           </div>

//           <div className="table-controls">
//             <div className="search-container">
//               <Search size={16} className="search-icon" />
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Search subjects..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && (
//                 <button 
//                   className="search-clear"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <X size={14} />
//                 </button>
//               )}
//             </div>

//             <div className="sort-container">
//               <Filter size={16} />
//               <select
//                 className="sort-select"
//                 value={sortBy}
//                 onChange={e => setSortBy(e.target.value)}
//               >
//                 <option value="code">Sort by Code</option>
//                 <option value="description">Sort by Description</option>
//                 <option value="units">Sort by Units</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <SubjectTable
//           subjects={subjects}
//           loading={loading.subjects}
//           onDelete={handleDeleteClick}
//           searchTerm={searchTerm}
//           sortBy={sortBy}
//         />
//       </div>

//       {/* Modals */}
//       <AddSubjectModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSave={handleAddSubject}
//         courseName={selectedCourse?.code || ''}
//         yearLevel={yearLevel}
//         semester={semester}
//       />

//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         subjectCode={deleteTarget?.subject_code}
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//         .courses-page {
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
//           opacity: 0.7;
//           transition: opacity 0.2s ease;
//         }

//         .toast-close:hover {
//           opacity: 1;
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

//         .action-btn.primary {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .action-btn.primary:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .action-btn.refresh {
//           background: ${COLORS.accent};
//           color: white;
//         }

//         .action-btn.refresh:hover:not(:disabled) {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
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

//         /* ===== SELECTORS SECTION ===== */
//         .selectors-section {
//           display: grid;
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .selector-section {
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//         }

//         .selector-header {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1rem;
//           color: ${COLORS.primary};
//         }

//         .selector-header h3 {
//           margin: 0;
//           font-size: 1.1rem;
//           font-weight: 700;
//         }

//         .course-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//           gap: 1rem;
//         }

//         .course-btn {
//           padding: 1rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 10px;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: left;
//         }

//         .course-btn:hover {
//           border-color: ${COLORS.lighter};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
//         }

//         .course-btn.active {
//           border-color: ${COLORS.light};
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//         }

//         .course-code {
//           font-size: 1.1rem;
//           font-weight: 700;
//           margin-bottom: 0.25rem;
//         }

//         .course-name {
//           font-size: 0.85rem;
//           opacity: 0.8;
//         }

//         .dual-selectors {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1.5rem;
//         }

//         .button-group {
//           display: flex;
//           gap: 0.75rem;
//           flex-wrap: wrap;
//         }

//         .selector-btn {
//           flex: 1;
//           min-width: 140px;
//           padding: 0.75rem 1.25rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 10px;
//           background: white;
//           color: ${COLORS.secondary};
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .selector-btn:hover {
//           border-color: ${COLORS.lighter};
//           background: ${COLORS.lightest};
//         }

//         .selector-btn.active {
//           border-color: ${COLORS.light};
//           background: ${COLORS.light};
//           color: white;
//         }

//         /* ===== TABLE SECTION ===== */
//         .table-section {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//           overflow: hidden;
//         }

//         .table-header {
//           padding: 1.5rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .table-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .table-title h2 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }

//         .subject-count {
//           background: ${COLORS.lighter};
//           color: ${COLORS.primary};
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .table-controls {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .search-container {
//           position: relative;
//           flex: 1;
//           min-width: 250px;
//           max-width: 400px;
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
//           padding: 0.65rem 2.5rem 0.65rem 2.5rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 8px;
//           font-size: 0.9rem;
//           transition: all 0.3s ease;
//           background: #f8f9fa;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           background: white;
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         .search-clear {
//           position: absolute;
//           right: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.25rem;
//           display: flex;
//           align-items: center;
//           color: ${COLORS.secondary};
//           opacity: 0.5;
//           transition: opacity 0.2s ease;
//         }

//         .search-clear:hover {
//           opacity: 1;
//         }

//         .sort-container {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: ${COLORS.secondary};
//         }

//         .sort-select {
//           padding: 0.65rem 1rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 8px;
//           font-size: 0.9rem;
//           background: #f8f9fa;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .sort-select:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           background: white;
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         /* ===== SUBJECTS TABLE ===== */
//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .subjects-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .subjects-table thead {
//           background: ${COLORS.lightest};
//         }

//         .subjects-table th {
//           padding: 1rem 1.25rem;
//           text-align: left;
//           font-weight: 600;
//           color: ${COLORS.secondary};
//           border-bottom: 2px solid ${COLORS.lighter};
//           white-space: nowrap;
//         }

//         .subjects-table th.text-center {
//           text-align: center;
//         }

//         .subjects-table td {
//           padding: 1rem 1.25rem;
//           border-bottom: 1px solid ${COLORS.lightest};
//         }

//         .subjects-table td.text-center {
//           text-align: center;
//         }

//         .subject-row {
//           transition: background 0.2s ease;
//         }

//         .subject-row:hover {
//           background: ${COLORS.lightest};
//         }

//         .row-number {
//           font-weight: 700;
//           color: ${COLORS.accent};
//         }

//         .subject-code-cell {
//           font-weight: 700;
//           color: ${COLORS.primary};
//           font-size: 0.95rem;
//         }

//         .subject-desc {
//           color: ${COLORS.secondary};
//         }

//         .units-badge {
//           display: inline-block;
//           background: ${COLORS.light};
//           color: white;
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           font-weight: 600;
//           font-size: 0.85rem;
//         }

//         .delete-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.35rem;
//           padding: 0.5rem 1rem;
//           background: #fee;
//           color: #c33;
//           border: 1px solid #fcc;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .delete-btn:hover {
//           background: #fcc;
//           border-color: #faa;
//           transform: translateY(-1px);
//         }

//         /* ===== EMPTY STATE ===== */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           color: ${COLORS.secondary};
//         }

//         .empty-icon {
//           color: ${COLORS.lighter};
//           margin-bottom: 1rem;
//         }

//         .empty-state h3 {
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//         }

//         .empty-state p {
//           opacity: 0.7;
//           margin: 0;
//         }

//         /* ===== LOADING SKELETON ===== */
//         .skeleton {
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         .table-skeleton {
//           padding: 1rem;
//         }

//         .skeleton-row {
//           display: grid;
//           grid-template-columns: 60px 120px 1fr 80px 100px;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         /* ===== MODALS ===== */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           animation: fadeIn 0.2s ease;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 16px;
//           max-width: 500px;
//           width: 90%;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
//           animation: scaleIn 0.3s ease;
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.5rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .modal-header h3 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }
//               .course-btn.active {
//       border-color: ${COLORS.primary};
//       background: ${COLORS.lightest};
//       box-shadow: 0 0 0 3px ${COLORS.primary}20;
//     }

//     .course-code {
//       font-weight: 700;
//       color: ${COLORS.primary};
//     }

//     .course-name {
//       font-size: 0.9rem;
//       color: ${COLORS.secondary};
//       opacity: 0.8;
//     }

//     .button-group {
//       display: flex;
//       gap: 0.75rem;
//       flex-wrap: wrap;
//     }

//     .selector-btn {
//       padding: 0.75rem 1rem;
//       border: 2px solid ${COLORS.lighter};
//       border-radius: 8px;
//       background: white;
//       font-weight: 600;
//       color: ${COLORS.secondary};
//       cursor: pointer;
//       transition: all 0.3s ease;
//     }

//     .selector-btn.active {
//       background: ${COLORS.primary};
//       color: white;
//       border-color: ${COLORS.primary};
//       box-shadow: 0 0 0 3px ${COLORS.primary}20;
//     }

//     .selector-btn:hover:not(.active) {
//       border-color: ${COLORS.accent};
//       color: ${COLORS.primary};
//     }

//     .dual-selectors {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//       gap: 1.5rem;
//     }

//     /* ===== TABLE SECTION ===== */
//     .table-section {
//       background: white;
//       border-radius: 16px;
//       padding: 1.5rem;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//     }

//     .table-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       flex-wrap: wrap;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .table-title {
//       display: flex;
//       flex-direction: column;
//       gap: 0.25rem;
//     }

//     .table-title h2 {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: ${COLORS.primary};
//       margin: 0;
//     }

//     .subject-count {
//       font-size: 0.9rem;
//       color: ${COLORS.secondary};
//       opacity: 0.7;
//     }

//     .table-controls {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }

//     .search-container {
//       position: relative;
//     }

//     .search-icon {
//       position: absolute;
//       top: 50%;
//       left: 0.75rem;
//       transform: translateY(-50%);
//       color: ${COLORS.secondary};
//       opacity: 0.6;
//     }

//     .search-input {
//       padding: 0.5rem 2.5rem 0.5rem 2rem;
//       border: 2px solid ${COLORS.lightest};
//       border-radius: 8px;
//       outline: none;
//       font-size: 0.95rem;
//       transition: all 0.3s ease;
//     }

//     .search-input:focus {
//       border-color: ${COLORS.primary};
//     }

//     .search-clear {
//       position: absolute;
//       right: 0.5rem;
//       top: 50%;
//       transform: translateY(-50%);
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: ${COLORS.secondary};
//       opacity: 0.7;
//     }

//     .sort-select {
//       border: 2px solid ${COLORS.lightest};
//       border-radius: 8px;
//       padding: 0.5rem 1rem;
//       font-size: 0.95rem;
//       cursor: pointer;
//       outline: none;
//       transition: all 0.3s ease;
//     }

//     .sort-select:hover {
//       border-color: ${COLORS.accent};
//     }

//     .subjects-table {
//       width: 100%;
//       border-collapse: collapse;
//     }

//     .subjects-table th {
//       text-align: left;
//       background: ${COLORS.lightest};
//       color: ${COLORS.primary};
//       padding: 0.75rem 1rem;
//       font-weight: 700;
//       border-bottom: 2px solid ${COLORS.lighter};
//     }

//     .subjects-table td {
//       padding: 0.75rem 1rem;
//       border-bottom: 1px solid #f1f5f9;
//     }

//     .subject-row:hover {
//       background: #f9fcff;
//     }

//     .delete-btn {
//       background: #fee2e2;
//       border: none;
//       color: #b91c1c;
//       padding: 0.4rem 0.8rem;
//       border-radius: 8px;
//       font-size: 0.85rem;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.4rem;
//       cursor: pointer;
//       transition: background 0.3s ease;
//     }

//     .delete-btn:hover {
//       background: #fecaca;
//     }

//     .empty-state {
//       text-align: center;
//       padding: 3rem 1rem;
//       color: ${COLORS.secondary};
//     }

//     .empty-icon {
//       color: ${COLORS.light};
//       margin-bottom: 1rem;
//     }

//     /* ===== MODALS ===== */
//     .modal-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(0, 0, 0, 0.5);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       z-index: 9999;
//       animation: fadeIn 0.3s ease;
//     }

//     .modal-content {
//       background: white;
//       border-radius: 12px;
//       width: 100%;
//       max-width: 500px;
//       overflow: hidden;
//       animation: slideUp 0.3s ease;
//     }

//     .modal-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 1rem 1.5rem;
//       border-bottom: 1px solid #f1f5f9;
//     }

//     .modal-body {
//       padding: 1.5rem;
//     }

//     .modal-footer {
//       padding: 1rem 1.5rem;
//       display: flex;
//       justify-content: flex-end;
//       gap: 1rem;
//       border-top: 1px solid #f1f5f9;
//     }

//     .form-group {
//       display: flex;
//       flex-direction: column;
//       margin-bottom: 1rem;
//     }

//     .form-label {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//       color: ${COLORS.primary};
//     }

//     .form-input {
//       padding: 0.5rem 0.75rem;
//       border: 2px solid #e2e8f0;
//       border-radius: 8px;
//       outline: none;
//       transition: all 0.3s ease;
//     }

//     .form-input:focus {
//       border-color: ${COLORS.primary};
//     }

//     .btn-primary {
//       background: ${COLORS.primary};
//       color: white;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .btn-primary:hover {
//       background: ${COLORS.secondary};
//     }

//     .btn-secondary {
//       background: #e2e8f0;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//     }

//     .btn-danger {
//       background: #dc2626;
//       color: white;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.4rem;
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to { opacity: 1; }
//     }

//     @keyframes slideUp {
//       from { transform: translateY(30px); opacity: 0; }
//       to { transform: translateY(0); opacity: 1; }
//     }
//   `}</style>
// </div>
//  );
// }

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { 
//   BookOpen, Plus, Search, RefreshCw, Edit2, Trash2, X, 
//   Check, ChevronDown, ChevronUp, Filter, Download, 
//   AlertCircle, CheckCircle, Calendar, Users, Award
// } from 'lucide-react';

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// // ==================== UTILITY FUNCTIONS ====================
// const getYearLabel = (year) => {
//   const labels = { 1: 'First Year', 2: 'Second Year', 3: 'Third Year', 4: 'Fourth Year' };
//   return labels[year] || `Year ${year}`;
// };

// const getSemesterLabel = (sem) => {
//   const labels = { '1': '1st Semester', '2': '2nd Semester', 'Summer': 'Summer' };
//   return labels[sem] || sem;
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
//       <button onClick={onClose} className="toast-close">
//         <X size={16} />
//       </button>
//     </div>
//   );
// });

// // ==================== LOADING SKELETON ====================
// const Skeleton = React.memo(({ width = '100%', height = '40px' }) => (
//   <div className="skeleton" style={{ width, height }} />
// ));

// const TableSkeleton = React.memo(() => (
//   <div className="table-skeleton">
//     {[1, 2, 3, 4, 5].map(i => (
//       <div key={i} className="skeleton-row">
//         <Skeleton width="40px" height="50px" />
//         <Skeleton width="120px" height="50px" />
//         <Skeleton height="50px" />
//         <Skeleton width="80px" height="50px" />
//         <Skeleton width="100px" height="50px" />
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

// // ==================== COURSE SELECTOR ====================
// const CourseSelector = React.memo(({ courses, selectedCourseId, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <BookOpen size={18} />
//       <h3>Select Course</h3>
//     </div>
//     <div className="course-grid">
//       {courses.map(course => (
//         <button
//           key={course.id}
//           className={`course-btn ${course.id === selectedCourseId ? 'active' : ''}`}
//           onClick={() => onChange(course.id)}
//         >
//           <div className="course-code">{course.code}</div>
//           <div className="course-name">{course.name}</div>
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== YEAR SELECTOR ====================
// const YearSelector = React.memo(({ yearLevel, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <Users size={18} />
//       <h3>Year Level</h3>
//     </div>
//     <div className="button-group">
//       {[1, 2, 3, 4].map(year => (
//         <button
//           key={year}
//           className={`selector-btn ${year === yearLevel ? 'active' : ''}`}
//           onClick={() => onChange(year)}
//         >
//           {getYearLabel(year)}
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== SEMESTER SELECTOR ====================
// const SemesterSelector = React.memo(({ semester, onChange }) => (
//   <div className="selector-section">
//     <div className="selector-header">
//       <Calendar size={18} />
//       <h3>Semester</h3>
//     </div>
//     <div className="button-group">
//       {['1', '2', 'Summer'].map(sem => (
//         <button
//           key={sem}
//           className={`selector-btn ${sem === semester ? 'active' : ''}`}
//           onClick={() => onChange(sem)}
//         >
//           {getSemesterLabel(sem)}
//         </button>
//       ))}
//     </div>
//   </div>
// ));

// // ==================== SUBJECT TABLE ====================
// const SubjectTable = React.memo(({ 
//   subjects, 
//   loading, 
//   onDelete, 
//   searchTerm, 
//   sortBy 
// }) => {
//   const filteredAndSortedSubjects = useMemo(() => {
//     let filtered = subjects;

//     // Apply search filter
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       filtered = subjects.filter(s =>
//         s.subject_code?.toLowerCase().includes(term) ||
//         s.description?.toLowerCase().includes(term)
//       );
//     }

//     // Apply sorting
//     const sorted = [...filtered].sort((a, b) => {
//       switch (sortBy) {
//         case 'code':
//           return (a.subject_code || '').localeCompare(b.subject_code || '');
//         case 'description':
//           return (a.description || '').localeCompare(b.description || '');
//         case 'units':
//           return (b.units || 0) - (a.units || 0);
//         default:
//           return 0;
//       }
//     });

//     return sorted;
//   }, [subjects, searchTerm, sortBy]);

//   if (loading) return <TableSkeleton />;

//   if (filteredAndSortedSubjects.length === 0) {
//     return (
//       <div className="empty-state">
//         <BookOpen size={48} className="empty-icon" />
//         <h3>No Subjects Found</h3>
//         <p>
//           {searchTerm 
//             ? "No subjects match your search criteria"
//             : "No subjects available for this selection"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="subjects-table">
//         <thead>
//           <tr>
//             <th style={{ width: '60px' }}>#</th>
//             <th>Subject Code</th>
//             <th>Description</th>
//             <th style={{ width: '100px' }}>Units</th>
//             <th style={{ width: '120px' }} className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAndSortedSubjects.map((subject, index) => (
//             <tr key={subject.id} className="subject-row">
//               <td className="row-number">{index + 1}</td>
//               <td>
//                 <div className="subject-code-cell">{subject.subject_code}</div>
//               </td>
//               <td>
//                 <div className="subject-desc">{subject.description}</div>
//               </td>
//               <td>
//                 <div className="units-badge">{subject.units}</div>
//               </td>
//               <td className="text-center">
//                 <button
//                   className="delete-btn"
//                   onClick={() => onDelete(subject.id)}
//                   title="Delete subject"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ==================== ADD SUBJECT MODAL ====================
// const AddSubjectModal = React.memo(({ 
//   show, 
//   onClose, 
//   onSave, 
//   courseName, 
//   yearLevel, 
//   semester 
// }) => {
//   const [formData, setFormData] = useState({
//     subject_code: '',
//     description: '',
//     units: 3
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.subject_code.trim() && formData.description.trim() && formData.units) {
//       onSave(formData);
//       setFormData({ subject_code: '', description: '', units: 3 });
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h3>Add New Subject</h3>
//             <button type="button" onClick={onClose} className="modal-close">
//               <X size={20} />
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Subject Code
//               </label>
//               <input
//                 type="text"
//                 className="form-input"
//                 placeholder="e.g., CS101, MATH201"
//                 value={formData.subject_code}
//                 onChange={e => setFormData({ ...formData, subject_code: e.target.value })}
//                 required
//                 autoFocus
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Description
//               </label>
//               <input
//                 type="text"
//                 className="form-input"
//                 placeholder="e.g., Introduction to Programming"
//                 value={formData.description}
//                 onChange={e => setFormData({ ...formData, description: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <Award size={16} />
//                 Units
//               </label>
//               <input
//                 type="number"
//                 className="form-input"
//                 step="0.5"
//                 min="0"
//                 max="10"
//                 value={formData.units}
//                 onChange={e => setFormData({ ...formData, units: parseFloat(e.target.value) })}
//                 required
//               />
//             </div>

//             <div className="form-info">
//               <div className="info-label">Will be added to:</div>
//               <div className="info-details">
//                 <strong>{courseName}</strong> • {getYearLabel(yearLevel)} • {getSemesterLabel(semester)}
//               </div>
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button type="button" onClick={onClose} className="btn-secondary">
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary">
//               <Plus size={16} />
//               Add Subject
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// });

// // ==================== DELETE CONFIRMATION MODAL ====================
// const DeleteConfirmModal = React.memo(({ show, onClose, onConfirm, subjectCode }) => {
//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <AlertCircle size={24} className="warning-icon" />
//           <h3>Delete Subject?</h3>
//         </div>

//         <div className="modal-body">
//           <p>
//             Are you sure you want to delete <strong>{subjectCode}</strong>? 
//             This action cannot be undone.
//           </p>
//         </div>

//         <div className="modal-footer">
//           <button onClick={onClose} className="btn-secondary">
//             Cancel
//           </button>
//           <button onClick={onConfirm} className="btn-danger">
//             <Trash2 size={16} />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function CoursesPage() {
//   // State Management
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [yearLevel, setYearLevel] = useState(1);
//   const [semester, setSemester] = useState('1');
//   const [subjects, setSubjects] = useState([]);
  
//   const [loading, setLoading] = useState({
//     initial: true,
//     subjects: false,
//   });
  
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('code');
  
//   const [toast, setToast] = useState({ message: '', type: '' });

//   // Initial data fetch
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Fetch subjects when course/year/semester changes
//   useEffect(() => {
//     if (selectedCourseId) {
//       loadSubjects();
//     } else {
//       setSubjects([]);
//     }
//   }, [selectedCourseId, yearLevel, semester]);

//   // API Functions
//   const fetchCourses = async () => {
//     setLoading(prev => ({ ...prev, initial: true }));
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
      
//       if (data.length && !selectedCourseId) {
//         setSelectedCourseId(data[0].id);
//       }
//     } catch (err) {
//       console.error('fetchCourses error:', err);
//       showToast('Failed to load courses', 'danger');
//     } finally {
//       setLoading(prev => ({ ...prev, initial: false }));
//     }
//   };

//   const loadSubjects = async () => {
//     setLoading(prev => ({ ...prev, subjects: true }));
//     try {
//       const params = new URLSearchParams({ 
//         courseId: selectedCourseId, 
//         yearLevel, 
//         semester 
//       });
//       const res = await fetch(`${API}/api/subjects?${params}`);
//       const data = await res.json();
//       setSubjects(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('loadSubjects error:', err);
//       showToast('Failed to load subjects', 'danger');
//     } finally {
//       setLoading(prev => ({ ...prev, subjects: false }));
//     }
//   };

//   const handleAddSubject = async (formData) => {
//     if (!selectedCourseId) {
//       showToast('Please select a course first', 'danger');
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/api/subjects`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           courseId: Number(selectedCourseId),
//           yearLevel: Number(yearLevel),
//           semester,
//           subject_code: formData.subject_code.trim(),
//           description: formData.description.trim(),
//           units: Number(formData.units)
//         })
//       });

//       if (!res.ok) throw new Error('Failed to add subject');

//       setShowAddModal(false);
//       await loadSubjects();
//       showToast('Subject added successfully! 🎉', 'success');
//     } catch (err) {
//       console.error('handleAddSubject error:', err);
//       showToast('Failed to add subject', 'danger');
//     }
//   };

//   const handleDeleteClick = (subject) => {
//     setDeleteTarget(subject);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteTarget) return;

//     try {
//       const res = await fetch(`${API}/api/subjects/${deleteTarget.id}`, {
//         method: 'DELETE'
//       });

//       if (!res.ok) throw new Error('Failed to delete subject');

//       setShowDeleteModal(false);
//       setDeleteTarget(null);
//       await loadSubjects();
//       showToast('Subject deleted successfully ✓', 'success');
//     } catch (err) {
//       console.error('handleDeleteConfirm error:', err);
//       showToast('Failed to delete subject', 'danger');
//     }
//   };

//   const handleRefresh = useCallback(async () => {
//     await Promise.all([fetchCourses(), selectedCourseId && loadSubjects()]);
//     showToast('Data refreshed successfully', 'success');
//   }, [selectedCourseId]);

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   const closeToast = () => {
//     setToast({ message: '', type: '' });
//   };

//   // Get selected course info
//   const selectedCourse = useMemo(() => {
//     return courses.find(c => c.id === selectedCourseId);
//   }, [courses, selectedCourseId]);

//   // Calculate stats
//   const stats = useMemo(() => {
//     const totalUnits = subjects.reduce((sum, s) => sum + (s.units || 0), 0);
//     return {
//       courses: courses.length,
//       subjects: subjects.length,
//       totalUnits,
//     };
//   }, [courses, subjects]);

//   return (
//     <div className="courses-page">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={closeToast} />

//       {/* Page Header */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <BookOpen size={32} />
//             </div>
//             <div>
//               <h1 className="page-title">Course & Subject Management</h1>
//               <p className="page-subtitle">
//                 {selectedCourse 
//                   ? `${selectedCourse.code} — ${selectedCourse.name}`
//                   : 'Select a course to manage subjects'
//                 }
//               </p>
//             </div>
//           </div>

//           <div className="header-actions">
//             <button 
//               className="action-btn primary"
//               onClick={() => setShowAddModal(true)}
//               disabled={!selectedCourseId}
//             >
//               <Plus size={18} />
//               Add Subject
//             </button>
//             <button 
//               className="action-btn refresh"
//               onClick={handleRefresh}
//               disabled={loading.initial}
//             >
//               <RefreshCw size={18} className={loading.initial ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="stats-grid">
//           <StatsCard
//             icon={BookOpen}
//             label="Total Courses"
//             value={stats.courses}
//             color={COLORS.primary}
//           />
//           <StatsCard
//             icon={BookOpen}
//             label="Subjects Loaded"
//             value={stats.subjects}
//             color={COLORS.accent}
//           />
//           <StatsCard
//             icon={Award}
//             label="Total Units"
//             value={stats.totalUnits}
//             color={COLORS.light}
//           />
//         </div>
//       </div>

//       {/* Selectors Section */}
//       <div className="selectors-section">
//         <CourseSelector
//           courses={courses}
//           selectedCourseId={selectedCourseId}
//           onChange={setSelectedCourseId}
//         />

//         <div className="dual-selectors">
//           <YearSelector yearLevel={yearLevel} onChange={setYearLevel} />
//           <SemesterSelector semester={semester} onChange={setSemester} />
//         </div>
//       </div>

//       {/* Subjects Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <div className="table-title">
//             <h2>
//               {getYearLabel(yearLevel)} — {getSemesterLabel(semester)}
//             </h2>
//             <span className="subject-count">{subjects.length} Subjects</span>
//           </div>

//           <div className="table-controls">
//             <div className="search-container">
//               <Search size={16} className="search-icon" />
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Search subjects..."
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && (
//                 <button 
//                   className="search-clear"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <X size={14} />
//                 </button>
//               )}
//             </div>

//             <div className="sort-container">
//               <Filter size={16} />
//               <select
//                 className="sort-select"
//                 value={sortBy}
//                 onChange={e => setSortBy(e.target.value)}
//               >
//                 <option value="code">Sort by Code</option>
//                 <option value="description">Sort by Description</option>
//                 <option value="units">Sort by Units</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <SubjectTable
//           subjects={subjects}
//           loading={loading.subjects}
//           onDelete={handleDeleteClick}
//           searchTerm={searchTerm}
//           sortBy={sortBy}
//         />
//       </div>

//       {/* Modals */}
//       <AddSubjectModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSave={handleAddSubject}
//         courseName={selectedCourse?.code || ''}
//         yearLevel={yearLevel}
//         semester={semester}
//       />

//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         subjectCode={deleteTarget?.subject_code}
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//         .courses-page {
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
//           opacity: 0.7;
//           transition: opacity 0.2s ease;
//         }

//         .toast-close:hover {
//           opacity: 1;
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

//         .action-btn.primary {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .action-btn.primary:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .action-btn.refresh {
//           background: ${COLORS.accent};
//           color: white;
//         }

//         .action-btn.refresh:hover:not(:disabled) {
//           background: ${COLORS.light};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
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

//         /* ===== SELECTORS SECTION ===== */
//         .selectors-section {
//           display: grid;
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .selector-section {
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//         }

//         .selector-header {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1rem;
//           color: ${COLORS.primary};
//         }

//         .selector-header h3 {
//           margin: 0;
//           font-size: 1.1rem;
//           font-weight: 700;
//         }

//         .course-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//           gap: 1rem;
//         }

//         .course-btn {
//           padding: 1rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 10px;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: left;
//         }

//         .course-btn:hover {
//           border-color: ${COLORS.lighter};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
//         }

//         .course-btn.active {
//           border-color: ${COLORS.light};
//           background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//           color: white;
//         }

//         .course-code {
//           font-size: 1.1rem;
//           font-weight: 700;
//           margin-bottom: 0.25rem;
//         }

//         .course-name {
//           font-size: 0.85rem;
//           opacity: 0.8;
//         }

//         .dual-selectors {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1.5rem;
//         }

//         .button-group {
//           display: flex;
//           gap: 0.75rem;
//           flex-wrap: wrap;
//         }

//         .selector-btn {
//           flex: 1;
//           min-width: 140px;
//           padding: 0.75rem 1.25rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 10px;
//           background: white;
//           color: ${COLORS.secondary};
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .selector-btn:hover {
//           border-color: ${COLORS.lighter};
//           background: ${COLORS.lightest};
//         }

//         .selector-btn.active {
//           border-color: ${COLORS.light};
//           background: ${COLORS.light};
//           color: white;
//         }

//         /* ===== TABLE SECTION ===== */
//         .table-section {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//           overflow: hidden;
//         }

//         .table-header {
//           padding: 1.5rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .table-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .table-title h2 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }

//         .subject-count {
//           background: ${COLORS.lighter};
//           color: ${COLORS.primary};
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .table-controls {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .search-container {
//           position: relative;
//           flex: 1;
//           min-width: 250px;
//           max-width: 400px;
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
//           padding: 0.65rem 2.5rem 0.65rem 2.5rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 8px;
//           font-size: 0.9rem;
//           transition: all 0.3s ease;
//           background: #f8f9fa;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           background: white;
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         .search-clear {
//           position: absolute;
//           right: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.25rem;
//           display: flex;
//           align-items: center;
//           color: ${COLORS.secondary};
//           opacity: 0.5;
//           transition: opacity 0.2s ease;
//         }

//         .search-clear:hover {
//           opacity: 1;
//         }

//         .sort-container {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: ${COLORS.secondary};
//         }

//         .sort-select {
//           padding: 0.65rem 1rem;
//           border: 2px solid ${COLORS.lightest};
//           border-radius: 8px;
//           font-size: 0.9rem;
//           background: #f8f9fa;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .sort-select:focus {
//           outline: none;
//           border-color: ${COLORS.light};
//           background: white;
//           box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
//         }

//         /* ===== SUBJECTS TABLE ===== */
//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .subjects-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .subjects-table thead {
//           background: ${COLORS.lightest};
//         }

//         .subjects-table th {
//           padding: 1rem 1.25rem;
//           text-align: left;
//           font-weight: 600;
//           color: ${COLORS.secondary};
//           border-bottom: 2px solid ${COLORS.lighter};
//           white-space: nowrap;
//         }

//         .subjects-table th.text-center {
//           text-align: center;
//         }

//         .subjects-table td {
//           padding: 1rem 1.25rem;
//           border-bottom: 1px solid ${COLORS.lightest};
//         }

//         .subjects-table td.text-center {
//           text-align: center;
//         }

//         .subject-row {
//           transition: background 0.2s ease;
//         }

//         .subject-row:hover {
//           background: ${COLORS.lightest};
//         }

//         .row-number {
//           font-weight: 700;
//           color: ${COLORS.accent};
//         }

//         .subject-code-cell {
//           font-weight: 700;
//           color: ${COLORS.primary};
//           font-size: 0.95rem;
//         }

//         .subject-desc {
//           color: ${COLORS.secondary};
//         }

//         .units-badge {
//           display: inline-block;
//           background: ${COLORS.light};
//           color: white;
//           padding: 0.35rem 0.75rem;
//           border-radius: 20px;
//           font-weight: 600;
//           font-size: 0.85rem;
//         }

//         .delete-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.35rem;
//           padding: 0.5rem 1rem;
//           background: #fee;
//           color: #c33;
//           border: 1px solid #fcc;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .delete-btn:hover {
//           background: #fcc;
//           border-color: #faa;
//           transform: translateY(-1px);
//         }

//         /* ===== EMPTY STATE ===== */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           color: ${COLORS.secondary};
//         }

//         .empty-icon {
//           color: ${COLORS.lighter};
//           margin-bottom: 1rem;
//         }

//         .empty-state h3 {
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//         }

//         .empty-state p {
//           opacity: 0.7;
//           margin: 0;
//         }

//         /* ===== LOADING SKELETON ===== */
//         .skeleton {
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         .table-skeleton {
//           padding: 1rem;
//         }

//         .skeleton-row {
//           display: grid;
//           grid-template-columns: 60px 120px 1fr 80px 100px;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         /* ===== MODALS ===== */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           animation: fadeIn 0.2s ease;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 16px;
//           max-width: 500px;
//           width: 90%;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
//           animation: scaleIn 0.3s ease;
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.5rem;
//           border-bottom: 2px solid ${COLORS.lightest};
//         }

//         .modal-header h3 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//         }
//               .course-btn.active {
//       border-color: ${COLORS.primary};
//       background: ${COLORS.lightest};
//       box-shadow: 0 0 0 3px ${COLORS.primary}20;
//     }

//     .course-code {
//       font-weight: 700;
//       color: ${COLORS.primary};
//     }

//     .course-name {
//       font-size: 0.9rem;
//       color: ${COLORS.secondary};
//       opacity: 0.8;
//     }

//     .button-group {
//       display: flex;
//       gap: 0.75rem;
//       flex-wrap: wrap;
//     }

//     .selector-btn {
//       padding: 0.75rem 1rem;
//       border: 2px solid ${COLORS.lighter};
//       border-radius: 8px;
//       background: white;
//       font-weight: 600;
//       color: ${COLORS.secondary};
//       cursor: pointer;
//       transition: all 0.3s ease;
//     }

//     .selector-btn.active {
//       background: ${COLORS.primary};
//       color: white;
//       border-color: ${COLORS.primary};
//       box-shadow: 0 0 0 3px ${COLORS.primary}20;
//     }

//     .selector-btn:hover:not(.active) {
//       border-color: ${COLORS.accent};
//       color: ${COLORS.primary};
//     }

//     .dual-selectors {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//       gap: 1.5rem;
//     }

//     /* ===== TABLE SECTION ===== */
//     .table-section {
//       background: white;
//       border-radius: 16px;
//       padding: 1.5rem;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//     }

//     .table-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       flex-wrap: wrap;
//       gap: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .table-title {
//       display: flex;
//       flex-direction: column;
//       gap: 0.25rem;
//     }

//     .table-title h2 {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: ${COLORS.primary};
//       margin: 0;
//     }

//     .subject-count {
//       font-size: 0.9rem;
//       color: ${COLORS.secondary};
//       opacity: 0.7;
//     }

//     .table-controls {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }

//     .search-container {
//       position: relative;
//     }

//     .search-icon {
//       position: absolute;
//       top: 50%;
//       left: 0.75rem;
//       transform: translateY(-50%);
//       color: ${COLORS.secondary};
//       opacity: 0.6;
//     }

//     .search-input {
//       padding: 0.5rem 2.5rem 0.5rem 2rem;
//       border: 2px solid ${COLORS.lightest};
//       border-radius: 8px;
//       outline: none;
//       font-size: 0.95rem;
//       transition: all 0.3s ease;
//     }

//     .search-input:focus {
//       border-color: ${COLORS.primary};
//     }

//     .search-clear {
//       position: absolute;
//       right: 0.5rem;
//       top: 50%;
//       transform: translateY(-50%);
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: ${COLORS.secondary};
//       opacity: 0.7;
//     }

//     .sort-select {
//       border: 2px solid ${COLORS.lightest};
//       border-radius: 8px;
//       padding: 0.5rem 1rem;
//       font-size: 0.95rem;
//       cursor: pointer;
//       outline: none;
//       transition: all 0.3s ease;
//     }

//     .sort-select:hover {
//       border-color: ${COLORS.accent};
//     }

//     .subjects-table {
//       width: 100%;
//       border-collapse: collapse;
//     }

//     .subjects-table th {
//       text-align: left;
//       background: ${COLORS.lightest};
//       color: ${COLORS.primary};
//       padding: 0.75rem 1rem;
//       font-weight: 700;
//       border-bottom: 2px solid ${COLORS.lighter};
//     }

//     .subjects-table td {
//       padding: 0.75rem 1rem;
//       border-bottom: 1px solid #f1f5f9;
//     }

//     .subject-row:hover {
//       background: #f9fcff;
//     }

//     .delete-btn {
//       background: #fee2e2;
//       border: none;
//       color: #b91c1c;
//       padding: 0.4rem 0.8rem;
//       border-radius: 8px;
//       font-size: 0.85rem;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.4rem;
//       cursor: pointer;
//       transition: background 0.3s ease;
//     }

//     .delete-btn:hover {
//       background: #fecaca;
//     }

//     .empty-state {
//       text-align: center;
//       padding: 3rem 1rem;
//       color: ${COLORS.secondary};
//     }

//     .empty-icon {
//       color: ${COLORS.light};
//       margin-bottom: 1rem;
//     }

//     /* ===== MODALS ===== */
//     .modal-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(0, 0, 0, 0.5);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       z-index: 9999;
//       animation: fadeIn 0.3s ease;
//     }

//     .modal-content {
//       background: white;
//       border-radius: 12px;
//       width: 100%;
//       max-width: 500px;
//       overflow: hidden;
//       animation: slideUp 0.3s ease;
//     }

//     .modal-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 1rem 1.5rem;
//       border-bottom: 1px solid #f1f5f9;
//     }

//     .modal-body {
//       padding: 1.5rem;
//     }

//     .modal-footer {
//       padding: 1rem 1.5rem;
//       display: flex;
//       justify-content: flex-end;
//       gap: 1rem;
//       border-top: 1px solid #f1f5f9;
//     }

//     .form-group {
//       display: flex;
//       flex-direction: column;
//       margin-bottom: 1rem;
//     }

//     .form-label {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//       color: ${COLORS.primary};
//     }

//     .form-input {
//       padding: 0.5rem 0.75rem;
//       border: 2px solid #e2e8f0;
//       border-radius: 8px;
//       outline: none;
//       transition: all 0.3s ease;
//     }

//     .form-input:focus {
//       border-color: ${COLORS.primary};
//     }

//     .btn-primary {
//       background: ${COLORS.primary};
//       color: white;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .btn-primary:hover {
//       background: ${COLORS.secondary};
//     }

//     .btn-secondary {
//       background: #e2e8f0;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//     }

//     .btn-danger {
//       background: #dc2626;
//       color: white;
//       border: none;
//       border-radius: 8px;
//       padding: 0.6rem 1.2rem;
//       cursor: pointer;
//       font-weight: 600;
//       display: inline-flex;
//       align-items: center;
//       gap: 0.4rem;
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to { opacity: 1; }
//     }

//     @keyframes slideUp {
//       from { transform: translateY(30px); opacity: 0; }
//       to { transform: translateY(0); opacity: 1; }
//     }
//   `}</style>
// </div>
//  );
// }

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  BookOpen, Plus, Search, RefreshCw, Edit2, Trash2, X, 
  Check, ChevronDown, ChevronUp, Filter, Download, 
  AlertCircle, CheckCircle, Calendar, Users, Award
} from 'lucide-react';
// import { API } from '../../config/api';


// ==================== CONSTANTS ====================
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
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

// ==================== UTILITY FUNCTIONS ====================
const getYearLabel = (year) => {
  const labels = { 1: 'First Year', 2: 'Second Year', 3: 'Third Year', 4: 'Fourth Year' };
  return labels[year] || `Year ${year}`;
};

const getSemesterLabel = (sem) => {
  const labels = { '1': '1st Semester', '2': '2nd Semester', 'Summer': 'Summer' };
  return labels[sem] || sem;
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
      <button onClick={onClose} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
});

// ==================== LOADING SKELETON ====================
const Skeleton = React.memo(({ width = '100%', height = '40px' }) => (
  <div className="skeleton" style={{ width, height }} />
));

const TableSkeleton = React.memo(() => (
  <div className="table-skeleton">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className="skeleton-row">
        <Skeleton width="40px" height="50px" />
        <Skeleton width="120px" height="50px" />
        <Skeleton height="50px" />
        <Skeleton width="80px" height="50px" />
        <Skeleton width="100px" height="50px" />
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

// ==================== COURSE SELECTOR ====================
const CourseSelector = React.memo(({ courses, selectedCourseId, onChange }) => (
  <div className="selector-section">
    <div className="selector-header">
      <BookOpen size={18} />
      <h3>Select Course</h3>
    </div>
    <div className="course-grid">
      {courses.map(course => (
        <button
          key={course.id}
          className={`course-btn ${course.id === selectedCourseId ? 'active' : ''}`}
          onClick={() => onChange(course.id)}
        >
          <div className="course-code">{course.code}</div>
          <div className="course-name">{course.name}</div>
        </button>
      ))}
    </div>
  </div>
));

// ==================== YEAR SELECTOR ====================
const YearSelector = React.memo(({ yearLevel, onChange }) => (
  <div className="selector-section">
    <div className="selector-header">
      <Users size={18} />
      <h3>Year Level</h3>
    </div>
    <div className="button-group">
      {[1, 2, 3, 4].map(year => (
        <button
          key={year}
          className={`selector-btn ${year === yearLevel ? 'active' : ''}`}
          onClick={() => onChange(year)}
        >
          {getYearLabel(year)}
        </button>
      ))}
    </div>
  </div>
));

// ==================== SEMESTER SELECTOR ====================
const SemesterSelector = React.memo(({ semester, onChange }) => (
  <div className="selector-section">
    <div className="selector-header">
      <Calendar size={18} />
      <h3>Semester</h3>
    </div>
    <div className="button-group">
      {['1', '2', ].map(sem => (
        <button
          key={sem}
          className={`selector-btn ${sem === semester ? 'active' : ''}`}
          onClick={() => onChange(sem)}
        >
          {getSemesterLabel(sem)}
        </button>
      ))}
    </div>
  </div>
));

// ==================== SUBJECT TABLE ====================
const SubjectTable = React.memo(({ 
  subjects, 
  loading, 
  onDelete, 
  searchTerm, 
  sortBy 
}) => {
  const filteredAndSortedSubjects = useMemo(() => {
    let filtered = subjects;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = subjects.filter(s =>
        s.subject_code?.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'code':
          return (a.subject_code || '').localeCompare(b.subject_code || '');
        case 'description':
          return (a.description || '').localeCompare(b.description || '');
        case 'units':
          return (b.units || 0) - (a.units || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [subjects, searchTerm, sortBy]);

  if (loading) return <TableSkeleton />;

  if (filteredAndSortedSubjects.length === 0) {
    return (
      <div className="empty-state">
        <BookOpen size={48} className="empty-icon" />
        <h3>No Subjects Found</h3>
        <p>
          {searchTerm 
            ? "No subjects match your search criteria"
            : "No subjects available for this selection"}
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="subjects-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>#</th>
            <th>Subject Code</th>
            <th>Description</th>
            <th style={{ width: '100px' }}>Units</th>
            <th style={{ width: '120px' }} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedSubjects.map((subject, index) => (
            <tr key={subject.id} className="subject-row">
              <td className="row-number">{index + 1}</td>
              <td>
                <div className="subject-code-cell">{subject.subject_code}</div>
              </td>
              <td>
                <div className="subject-desc">{subject.description}</div>
              </td>
              <td>
                <div className="units-badge">{subject.units}</div>
              </td>
              <td className="text-center">
                <button
                  className="delete-btn"
                  onClick={() => onDelete(subject.id)}
                  title="Delete subject"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ==================== ADD SUBJECT MODAL ====================
const AddSubjectModal = React.memo(({ 
  show, 
  onClose, 
  onSave, 
  courseName, 
  yearLevel, 
  semester 
}) => {
  const [formData, setFormData] = useState({
    subject_code: '',
    description: '',
    units: 3
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.subject_code.trim() && formData.description.trim() && formData.units) {
      onSave(formData);
      setFormData({ subject_code: '', description: '', units: 3 });
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h3>Add New Subject</h3>
            <button type="button" onClick={onClose} className="modal-close">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                <BookOpen size={16} />
                Subject Code
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., CS101, MATH201"
                value={formData.subject_code}
                onChange={e => setFormData({ ...formData, subject_code: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <BookOpen size={16} />
                Description
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Introduction to Programming"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Award size={16} />
                Units
              </label>
              <input
                type="number"
                className="form-input"
                step="0.5"
                min="0"
                max="10"
                value={formData.units}
                onChange={e => setFormData({ ...formData, units: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="form-info">
              <div className="info-label">Will be added to:</div>
              <div className="info-details">
                <strong>{courseName}</strong> • {getYearLabel(yearLevel)} • {getSemesterLabel(semester)}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// ==================== DELETE CONFIRMATION MODAL ====================
const DeleteConfirmModal = React.memo(({ show, onClose, onConfirm, subjectCode }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <AlertCircle size={24} className="warning-icon" />
          <h3>Delete Subject?</h3>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{subjectCode}</strong>? 
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function CoursesPage() {
  // State Management
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [yearLevel, setYearLevel] = useState(1);
  const [semester, setSemester] = useState('1');
  const [subjects, setSubjects] = useState([]);
  
  const [loading, setLoading] = useState({
    initial: true,
    subjects: false,
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('code');
  
  const [toast, setToast] = useState({ message: '', type: '' });

  // Initial data fetch
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch subjects when course/year/semester changes
  useEffect(() => {
    if (selectedCourseId) {
      loadSubjects();
    } else {
      setSubjects([]);
    }
  }, [selectedCourseId, yearLevel, semester]);

  // API Functions
  const fetchCourses = async () => {
    setLoading(prev => ({ ...prev, initial: true }));
    try {
      const res = await fetch(`${API}/api/courses`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
      
      if (data.length && !selectedCourseId) {
        setSelectedCourseId(data[0].id);
      }
    } catch (err) {
      console.error('fetchCourses error:', err);
      showToast('Failed to load courses', 'danger');
    } finally {
      setLoading(prev => ({ ...prev, initial: false }));
    }
  };

  const loadSubjects = async () => {
    setLoading(prev => ({ ...prev, subjects: true }));
    try {
      const params = new URLSearchParams({ 
        courseId: selectedCourseId, 
        yearLevel, 
        semester 
      });
      const res = await fetch(`${API}/api/subjects?${params}`);
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('loadSubjects error:', err);
      showToast('Failed to load subjects', 'danger');
    } finally {
      setLoading(prev => ({ ...prev, subjects: false }));
    }
  };

  const handleAddSubject = async (formData) => {
    if (!selectedCourseId) {
      showToast('Please select a course first', 'danger');
      return;
    }

    try {
      const res = await fetch(`${API}/api/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: Number(selectedCourseId),
          yearLevel: Number(yearLevel),
          semester,
          subject_code: formData.subject_code.trim(),
          description: formData.description.trim(),
          units: Number(formData.units)
        })
      });

      if (!res.ok) throw new Error('Failed to add subject');

      setShowAddModal(false);
      await loadSubjects();
      showToast('Subject added successfully! 🎉', 'success');
    } catch (err) {
      console.error('handleAddSubject error:', err);
      showToast('Failed to add subject', 'danger');
    }
  };

  const handleDeleteClick = (subject) => {
    setDeleteTarget(subject);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`${API}/api/subjects/${deleteTarget.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete subject');

      setShowDeleteModal(false);
      setDeleteTarget(null);
      await loadSubjects();
      showToast('Subject deleted successfully ✓', 'success');
    } catch (err) {
      console.error('handleDeleteConfirm error:', err);
      showToast('Failed to delete subject', 'danger');
    }
  };

  const handleRefresh = useCallback(async () => {
    await Promise.all([fetchCourses(), selectedCourseId && loadSubjects()]);
    showToast('Data refreshed successfully', 'success');
  }, [selectedCourseId]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  // Get selected course info
  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourseId);
  }, [courses, selectedCourseId]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalUnits = subjects.reduce((sum, s) => sum + (s.units || 0), 0);
    return {
      courses: courses.length,
      subjects: subjects.length,
      totalUnits,
    };
  }, [courses, subjects]);

  return (
    <div className="courses-page">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Page Header with Gradient */}
      <div className="page-header-courses">
        <div className="page-title-section-gradient-courses">
          <div className="page-title-content-courses">
            <h1 className="page-title-gradient-courses">
              <BookOpen size={36} />
              Course & Subject Management
            </h1>
            <p className="page-subtitle-gradient-courses">
              {selectedCourse 
                ? `${selectedCourse.code} — ${selectedCourse.name}`
                : 'Select a course to manage subjects'
              }
            </p>
          </div>
          <div className="header-actions-courses">
            <button 
              className="action-btn-courses"
              onClick={() => setShowAddModal(true)}
              disabled={!selectedCourseId}
            >
              <Plus size={18} />
              Add Subject
            </button>
            <button 
              className="action-btn-courses"
              onClick={handleRefresh}
              disabled={loading.initial}
            >
              <RefreshCw size={18} className={loading.initial ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-grid">
        <StatsCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.courses}
          color={COLORS.primary}
        />
        <StatsCard
          icon={BookOpen}
          label="Subjects Loaded"
          value={stats.subjects}
          color={COLORS.accent}
        />
        <StatsCard
          icon={Award}
          label="Total Units"
          value={stats.totalUnits}
          color={COLORS.light}
        />
      </div>

      {/* Selectors Section */}
      <div className="selectors-section">
        <CourseSelector
          courses={courses}
          selectedCourseId={selectedCourseId}
          onChange={setSelectedCourseId}
        />

        <div className="dual-selectors">
          <YearSelector yearLevel={yearLevel} onChange={setYearLevel} />
          <SemesterSelector semester={semester} onChange={setSemester} />
        </div>
      </div>

      {/* Subjects Table Section */}
      <div className="table-section">
        <div className="table-header">
          <div className="table-title">
            <h2>
              {getYearLabel(yearLevel)} — {getSemesterLabel(semester)}
            </h2>
            <span className="subject-count">{subjects.length} Subjects</span>
          </div>

          <div className="table-controls">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="search-clear"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="sort-container">
              <Filter size={16} />
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="code">Sort by Code</option>
                <option value="description">Sort by Description</option>
                <option value="units">Sort by Units</option>
              </select>
            </div>
          </div>
        </div>

        <SubjectTable
          subjects={subjects}
          loading={loading.subjects}
          onDelete={handleDeleteClick}
          searchTerm={searchTerm}
          sortBy={sortBy}
        />
      </div>

      {/* Modals */}
      <AddSubjectModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddSubject}
        courseName={selectedCourse?.code || ''}
        yearLevel={yearLevel}
        semester={semester}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
        subjectCode={deleteTarget?.subject_code}
      />

      {/* Inline Styles */}
      <style jsx>{`
        .courses-page {
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

        .toast-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .toast-close:hover {
          opacity: 1;
        }

        /* ===== PAGE HEADER WITH GRADIENT ===== */
        .page-header-courses {
          margin-bottom: 2rem;
        }

        .page-title-section-gradient-courses {
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .page-title-content-courses {
          color: white;
        }

        .page-title-gradient-courses {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .page-subtitle-gradient-courses {
          font-size: 1.05rem;
          color: white;
          margin: 0;
          opacity: 0.9;
        }

        .header-actions-courses {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn-courses {
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

        .action-btn-courses:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .action-btn-courses:disabled {
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
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

        /* ===== SELECTORS SECTION ===== */
        .selectors-section {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .selector-section {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .selector-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: ${COLORS.primary};
        }

        .selector-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .course-btn {
          padding: 1rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .course-btn:hover {
          border-color: ${COLORS.lighter};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
        }

        .course-btn.active {
          border-color: ${COLORS.primary};
          background: ${COLORS.lightest};
          box-shadow: 0 0 0 3px ${COLORS.primary}20;
        }

        .course-code {
          font-weight: 700;
          color: ${COLORS.primary};
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .course-name {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        .dual-selectors {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .button-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .selector-btn {
          flex: 1;
          min-width: 140px;
          padding: 0.75rem 1.25rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 10px;
          background: white;
          color: ${COLORS.secondary};
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .selector-btn:hover {
          border-color: ${COLORS.lighter};
          background: ${COLORS.lightest};
        }

        .selector-btn.active {
          border-color: ${COLORS.light};
          background: ${COLORS.light};
          color: white;
        }

        /* ===== TABLE SECTION ===== */
        .table-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .table-header {
          padding: 1.5rem;
          border-bottom: 2px solid ${COLORS.lightest};
        }

        .table-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .table-title h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        .subject-count {
          background: ${COLORS.lighter};
          color: ${COLORS.primary};
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .table-controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
          max-width: 400px;
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
          padding: 0.65rem 2.5rem 0.65rem 2.5rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.light};
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        .search-clear {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          color: ${COLORS.secondary};
          opacity: 0.5;
          transition: opacity 0.2s ease;
        }

        .search-clear:hover {
          opacity: 1;
        }

        .sort-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: ${COLORS.secondary};
        }

        .sort-select {
          padding: 0.65rem 1rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 8px;
          font-size: 0.9rem;
          background: #f8f9fa;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sort-select:focus {
          outline: none;
          border-color: ${COLORS.light};
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        /* ===== SUBJECTS TABLE ===== */
        .table-wrapper {
          overflow-x: auto;
        }

        .subjects-table {
          width: 100%;
          border-collapse: collapse;
        }

        .subjects-table thead {
          background: ${COLORS.lightest};
        }

        .subjects-table th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-weight: 600;
          color: ${COLORS.secondary};
          border-bottom: 2px solid ${COLORS.lighter};
          white-space: nowrap;
        }

        .subjects-table th.text-center {
          text-align: center;
        }

        .subjects-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid ${COLORS.lightest};
        }

        .subjects-table td.text-center {
          text-align: center;
        }

        .subject-row {
          transition: background 0.2s ease;
        }

        .subject-row:hover {
          background: ${COLORS.lightest};
        }

        .row-number {
          font-weight: 700;
          color: ${COLORS.accent};
        }

        .subject-code-cell {
          font-weight: 700;
          color: ${COLORS.primary};
          font-size: 0.95rem;
        }

        .subject-desc {
          color: ${COLORS.secondary};
        }

        .units-badge {
          display: inline-block;
          background: ${COLORS.light};
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          background: #fee;
          color: #c33;
          border: 1px solid #fcc;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #fcc;
          border-color: #faa;
          transform: translateY(-1px);
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: ${COLORS.secondary};
        }

        .empty-icon {
          color: ${COLORS.lighter};
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          opacity: 0.7;
          margin: 0;
        }

        /* ===== LOADING SKELETON ===== */
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        .table-skeleton {
          padding: 1rem;
        }

        .skeleton-row {
          display: grid;
          grid-template-columns: 60px 120px 1fr 80px 100px;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ===== MODALS ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: scaleIn 0.3s ease;
        }

        .confirm-modal {
          max-width: 400px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 2px solid ${COLORS.lightest};
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .warning-icon {
          color: #f59e0b;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          color: ${COLORS.secondary};
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .modal-close:hover {
          opacity: 1;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-footer {
          padding: 1.5rem;
          border-top: 2px solid ${COLORS.lightest};
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: ${COLORS.light};
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        .form-info {
          background: ${COLORS.lightest};
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .info-label {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .info-details {
          font-size: 0.95rem;
          color: ${COLORS.primary};
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: ${COLORS.primary};
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: #e2e8f0;
          color: ${COLORS.secondary};
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #cbd5e1;
        }

        .btn-danger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-danger:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 992px) {
          .page-title-section-gradient-courses {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions-courses {
            width: 100%;
          }

          .action-btn-courses {
            flex: 1;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .courses-page {
            padding: 1rem;
          }

          .page-title-gradient-courses {
            font-size: 2rem;
          }

          .course-grid {
            grid-template-columns: 1fr;
          }

          .dual-selectors {
            grid-template-columns: 1fr;
          }

          .table-controls {
            flex-direction: column;
          }

          .search-container {
            width: 100%;
            max-width: none;
          }

          .subjects-table th,
          .subjects-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 576px) {
          .courses-page {
            padding: 0.5rem;
          }

          .page-title-gradient-courses {
            font-size: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }

          .selector-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}