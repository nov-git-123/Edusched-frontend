// // src/components/InstructorManagement.js
// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Spinner, Alert, Badge } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorManagement = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [availability, setAvailability] = useState("");
//   const [selectedCourseId, setSelectedCourseId] = useState("");

//   // Add-Instructor modal + form state
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newInstructor, setNewInstructor] = useState({ name: "", email: "", department: "" });
//   const [adding, setAdding] = useState(false);

//   // ✅ Fetch instructors
//   const fetchInstructors = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch courses
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       setCourses([]);
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, []);

//   // ✅ Availability
//   const handleAvailability = (instructor) => {
//     setSelectedInstructor(instructor);
//     setAvailability(instructor.availability || "");
//     setShowAvailabilityModal(true);
//   };

//   const saveAvailability = async () => {
//     if (!selectedInstructor) return;
//     try {
//       const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}/availability`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ availability }),
//       });
//       if (!res.ok) throw new Error("Failed to update availability");
//       setInstructors((prev) =>
//         prev.map((i) => (i.id === selectedInstructor.id ? { ...i, availability } : i))
//       );
//       setShowAvailabilityModal(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ✅ Assign Course
//   const handleAssign = (instructor) => {
//     setSelectedInstructor(instructor);
//     setSelectedCourseId("");
//     setShowAssignModal(true);
//   };

//   const saveAssignment = async () => {
//     if (!selectedInstructor || !selectedCourseId) {
//       alert("Please select a course to assign.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}/assign`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ course_id: selectedCourseId }),
//       });
//       if (!res.ok) throw new Error("Failed to assign course");
//       alert("✅ Course assigned successfully!");
//       setShowAssignModal(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ✅ Add Instructor
//   const openAddModal = () => {
//     setNewInstructor({ name: "", email: "", department: "" });
//     setShowAddModal(true);
//   };

//   const saveNewInstructor = async () => {
//     if (!newInstructor.name.trim() || !newInstructor.email.trim()) {
//       alert("Please provide both name and email for the instructor.");
//       return;
//     }

//     setAdding(true);
//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newInstructor),
//       });
//       if (!res.ok) throw new Error("Failed to add instructor");
//       await fetchInstructors();
//       setShowAddModal(false);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setAdding(false);
//     }
//   };

//   // ✅ Delete Instructor
//   const handleDelete = async (inst) => {
//     if (!window.confirm(`Are you sure you want to delete ${inst.name}?`)) return;
//     try {
//       const res = await fetch(`${API}/api/instructors/${inst.id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete instructor");
//       setInstructors((prev) => prev.filter((i) => i.id !== inst.id));
//       alert("✅ Instructor deleted successfully!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="p-4 bg-white shadow rounded">
//       <div className="d-flex justify-content-between align-items-start mb-3">
//         <div>
//           <h2 className="mb-1">👨‍🏫 Instructor Management</h2>
//           <p className="text-muted mb-0">
//             Manage instructor accounts, availability, and subject assignments.
//           </p>
//         </div>
//         <div>
//           <Button variant="success" onClick={openAddModal} className="me-2">
//             + Add Instructor
//           </Button>
//           <Button variant="secondary" onClick={fetchInstructors}>
//             Refresh
//           </Button>
//         </div>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Availability</th>
//             <th style={{ width: "280px" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {instructors.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No instructors found.
//               </td>
//             </tr>
//           ) : (
//             instructors.map((inst) => (
//               <tr key={inst.id}>
//                 <td>{inst.id}</td>
//                 <td>{inst.name}</td>
//                 <td>{inst.email}</td>
//                 <td>{inst.department || <Badge bg="secondary">Unassigned</Badge>}</td>
//                 <td>
//                   {inst.availability ? (
//                     <Badge bg="success">{inst.availability}</Badge>
//                   ) : (
//                     <Badge bg="secondary">Not Set</Badge>
//                   )}
//                 </td>
//                 <td>
//                   <Button
//                     variant="info"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleAvailability(inst)}
//                   >
//                     Set Availability
//                   </Button>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleAssign(inst)}
//                   >
//                     Assign Course
//                   </Button>
//                   <Button variant="danger" size="sm" onClick={() => handleDelete(inst)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       {/* Availability Modal */}
//       <Modal show={showAvailabilityModal} onHide={() => setShowAvailabilityModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Set Availability — {selectedInstructor && selectedInstructor.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Availability (e.g., Mon–Fri, 8AM–12PM)</Form.Label>
//             <Form.Control
//               type="text"
//               value={availability}
//               onChange={(e) => setAvailability(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAvailabilityModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={saveAvailability}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Assign Course Modal */}
//       <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Assign Course — {selectedInstructor && selectedInstructor.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Select Course</Form.Label>
//             <Form.Select
//               value={selectedCourseId}
//               onChange={(e) => setSelectedCourseId(e.target.value)}
//             >
//               <option value="">-- Select a Course --</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={saveAssignment}>
//             Assign
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Instructor Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Instructor</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newInstructor.name}
//                 onChange={(e) =>
//                   setNewInstructor((s) => ({ ...s, name: e.target.value }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={newInstructor.email}
//                 onChange={(e) =>
//                   setNewInstructor((s) => ({ ...s, email: e.target.value }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Department (optional)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newInstructor.department}
//                 onChange={(e) =>
//                   setNewInstructor((s) => ({ ...s, department: e.target.value }))
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAddModal(false)} disabled={adding}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={saveNewInstructor} disabled={adding}>
//             {adding ? (
//               <>
//                 <Spinner animation="border" size="sm" className="me-2" /> Saving...
//               </>
//             ) : (
//               "Add Instructor"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default InstructorManagement;


// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Users, Plus, RefreshCw, Trash2, UserPlus, BookOpen,
//   Search, X, CheckCircle, AlertCircle, Loader
// } from "lucide-react";

// // ==================== CONSTANTS ====================
// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
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

//   const Icon = type === 'success' ? CheckCircle : AlertCircle;

//   return (
//     <div className={`toast-notification ${type}`}>
//       <Icon size={20} />
//       <span>{message}</span>
//       <button onClick={onClose} className="toast-close">
//         <X size={16} />
//       </button>
//     </div>
//   );
// });

// // ==================== ADD INSTRUCTOR MODAL ====================
// const AddInstructorModal = React.memo(({ show, onClose, onSave, loading }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     department: ''
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(formData);
//       setFormData({ name: '', email: '', department: '' });
//       setErrors({});
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h3>Add New Instructor</h3>
//             <button type="button" className="modal-close" onClick={onClose} disabled={loading}>
//               <X size={20} />
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="form-group">
//               <label className="form-label">
//                 <Users size={16} />
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 className={`form-input ${errors.name ? 'error' : ''}`}
//                 placeholder="e.g., John Doe"
//                 value={formData.name}
//                 onChange={e => setFormData({ ...formData, name: e.target.value })}
//                 disabled={loading}
//               />
//               {errors.name && <span className="error-text">{errors.name}</span>}
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 className={`form-input ${errors.email ? 'error' : ''}`}
//                 placeholder="e.g., instructor@university.edu"
//                 value={formData.email}
//                 onChange={e => setFormData({ ...formData, email: e.target.value })}
//                 disabled={loading}
//               />
//               {errors.email && <span className="error-text">{errors.email}</span>}
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Department (Optional)
//               </label>
//               <input
//                 type="text"
//                 className="form-input"
//                 placeholder="e.g., Computer Science"
//                 value={formData.department}
//                 onChange={e => setFormData({ ...formData, department: e.target.value })}
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader size={16} className="spinning" />
//                   Adding...
//                 </>
//               ) : (
//                 <>
//                   <Plus size={16} />
//                   Add Instructor
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// });

// // ==================== ASSIGN COURSE MODAL ====================
// const AssignCourseModal = React.memo(({ show, onClose, onSave, instructor, courses, loading }) => {
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedCourseId) {
//       setError('Please select a course');
//       return;
//     }
//     onSave(selectedCourseId);
//     setSelectedCourseId('');
//     setError('');
//   };

//   if (!show || !instructor) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-header">
//             <h3>Assign Course</h3>
//             <button type="button" className="modal-close" onClick={onClose} disabled={loading}>
//               <X size={20} />
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="instructor-info">
//               <Users size={20} className="info-icon" />
//               <div>
//                 <div className="info-name">{instructor.name}</div>
//                 <div className="info-email">{instructor.email}</div>
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label">
//                 <BookOpen size={16} />
//                 Select Course *
//               </label>
//               <select
//                 className={`form-select ${error ? 'error' : ''}`}
//                 value={selectedCourseId}
//                 onChange={e => {
//                   setSelectedCourseId(e.target.value);
//                   setError('');
//                 }}
//                 disabled={loading}
//               >
//                 <option value="">-- Choose a Course --</option>
//                 {courses.map(course => (
//                   <option key={course.id} value={course.id}>
//                     {course.code} — {course.name}
//                   </option>
//                 ))}
//               </select>
//               {error && <span className="error-text">{error}</span>}
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader size={16} className="spinning" />
//                   Assigning...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus size={16} />
//                   Assign Course
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// });

// // ==================== DELETE CONFIRMATION MODAL ====================
// const DeleteConfirmModal = React.memo(({ show, onClose, onConfirm, instructor, loading }) => {
//   if (!show || !instructor) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <AlertCircle size={24} className="warning-icon" />
//           <h3>Delete Instructor?</h3>
//         </div>

//         <div className="modal-body">
//           <p>
//             Are you sure you want to delete <strong>{instructor.name}</strong>? 
//             This action cannot be undone and will remove all associated data.
//           </p>
//         </div>

//         <div className="modal-footer">
//           <button className="btn-secondary" onClick={onClose} disabled={loading}>
//             Cancel
//           </button>
//           <button className="btn-danger" onClick={onConfirm} disabled={loading}>
//             {loading ? (
//               <>
//                 <Loader size={16} className="spinning" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <Trash2 size={16} />
//                 Delete
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== INSTRUCTOR TABLE ====================
// const InstructorTable = React.memo(({ 
//   instructors, 
//   loading, 
//   onAssign, 
//   onDelete,
//   searchTerm 
// }) => {
//   const filteredInstructors = useMemo(() => {
//     if (!searchTerm.trim()) return instructors;
    
//     const term = searchTerm.toLowerCase();
//     return instructors.filter(inst =>
//       inst.name.toLowerCase().includes(term) ||
//       inst.email.toLowerCase().includes(term) ||
//       inst.department?.toLowerCase().includes(term)
//     );
//   }, [instructors, searchTerm]);

//   if (loading) {
//     return (
//       <div className="table-loading">
//         <div className="spinner"></div>
//         <p>Loading instructors...</p>
//       </div>
//     );
//   }

//   if (filteredInstructors.length === 0) {
//     return (
//       <div className="empty-state">
//         <Users size={48} className="empty-icon" />
//         <h3>No Instructors Found</h3>
//         <p>
//           {searchTerm 
//             ? "No instructors match your search criteria"
//             : "Start by adding your first instructor"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="instructor-table">
//         <thead>
//           <tr>
//             <th style={{ width: '60px' }}>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th style={{ width: '200px' }} className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredInstructors.map(inst => (
//             <tr key={inst.id} className="instructor-row">
//               <td className="id-cell">{inst.id}</td>
//               <td>
//                 <div className="name-cell">
//                   <div className="avatar">{inst.name.charAt(0)}</div>
//                   <span>{inst.name}</span>
//                 </div>
//               </td>
//               <td className="email-cell">{inst.email}</td>
//               <td>
//                 {inst.department ? (
//                   <span className="department-badge">{inst.department}</span>
//                 ) : (
//                   <span className="unassigned-badge">Unassigned</span>
//                 )}
//               </td>
//               <td className="actions-cell">
//                 <button
//                   className="action-btn assign"
//                   onClick={() => onAssign(inst)}
//                   title="Assign Course"
//                 >
//                   <UserPlus size={16} />
//                 </button>
//                 <button
//                   className="action-btn delete"
//                   onClick={() => onDelete(inst)}
//                   title="Delete Instructor"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// // ==================== MAIN COMPONENT ====================
// export default function InstructorManagement() {
//   // Data State
//   const [instructors, setInstructors] = useState([]);
//   const [courses, setCourses] = useState([]);
  
//   // UI State
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [toast, setToast] = useState({ message: '', type: '' });
  
//   // Modal State
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
  
//   // Operation Loading States
//   const [addLoading, setAddLoading] = useState(false);
//   const [assignLoading, setAssignLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   /**
//    * Fetch instructors from API
//    */
//   const fetchInstructors = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/api/instructors`);
//       if (!res.ok) throw new Error("Failed to fetch instructors");
//       const data = await res.json();
//       setInstructors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//       showToast("Failed to load instructors", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   /**
//    * Fetch courses from API
//    */
//   const fetchCourses = useCallback(async () => {
//     try {
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();
//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       setCourses([]);
//     }
//   }, []);

//   /**
//    * Initial data load
//    */
//   useEffect(() => {
//     fetchInstructors();
//     fetchCourses();
//   }, [fetchInstructors, fetchCourses]);

//   /**
//    * Handle refresh button
//    */
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchInstructors(), fetchCourses()]);
//     setRefreshing(false);
//     showToast("Data refreshed successfully", "success");
//   };

//   /**
//    * Add new instructor
//    */
//   const handleAddInstructor = async (formData) => {
//     setAddLoading(true);
//     try {
//       const res = await fetch(`${API}/api/instructors`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to add instructor");

//       await fetchInstructors();
//       setShowAddModal(false);
//       showToast("Instructor added successfully! ✓", "success");
//     } catch (err) {
//       console.error("Add instructor error:", err);
//       showToast("Failed to add instructor", "error");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   /**
//    * Open assign course modal
//    */
//   const handleAssignClick = (instructor) => {
//     setSelectedInstructor(instructor);
//     setShowAssignModal(true);
//   };

//   /**
//    * Assign course to instructor
//    */
//   const handleAssignCourse = async (courseId) => {
//     if (!selectedInstructor) return;

//     setAssignLoading(true);
//     try {
//       const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}/assign`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ course_id: courseId }),
//       });

//       if (!res.ok) throw new Error("Failed to assign course");

//       setShowAssignModal(false);
//       setSelectedInstructor(null);
//       showToast("Course assigned successfully! ✓", "success");
//       await fetchInstructors();
//     } catch (err) {
//       console.error("Assign course error:", err);
//       showToast("Failed to assign course", "error");
//     } finally {
//       setAssignLoading(false);
//     }
//   };

//   /**
//    * Open delete confirmation modal
//    */
//   const handleDeleteClick = (instructor) => {
//     setSelectedInstructor(instructor);
//     setShowDeleteModal(true);
//   };

//   /**
//    * Delete instructor
//    */
//   const handleDeleteConfirm = async () => {
//     if (!selectedInstructor) return;

//     setDeleteLoading(true);
//     try {
//       const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}`, {
//         method: "DELETE"
//       });

//       if (!res.ok) throw new Error("Failed to delete instructor");

//       setInstructors(prev => prev.filter(i => i.id !== selectedInstructor.id));
//       setShowDeleteModal(false);
//       setSelectedInstructor(null);
//       showToast("Instructor deleted successfully ✓", "success");
//     } catch (err) {
//       console.error("Delete instructor error:", err);
//       showToast("Failed to delete instructor", "error");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   /**
//    * Show toast notification
//    */
//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   const closeToast = () => {
//     setToast({ message: '', type: '' });
//   };

//   return (
//     <div className="instructor-management">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={closeToast} />

//       {/* Header */}
//       <div className="management-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <Users size={28} />
//             </div>
//             <div>
//               <h1>Instructor Management</h1>
//               <p>Manage instructor accounts and course assignments</p>
//             </div>
//           </div>

//           <div className="header-actions">
//             <button className="action-btn primary" onClick={() => setShowAddModal(true)}>
//               <Plus size={18} />
//               Add Instructor
//             </button>
//             <button 
//               className="action-btn refresh"
//               onClick={handleRefresh}
//               disabled={refreshing}
//             >
//               <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="search-section">
//           <div className="search-container">
//             <Search size={18} className="search-icon" />
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search instructors by name, email, or department..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button className="search-clear" onClick={() => setSearchTerm('')}>
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Instructor Table */}
//       <div className="table-section">
//         <InstructorTable
//           instructors={instructors}
//           loading={loading}
//           onAssign={handleAssignClick}
//           onDelete={handleDeleteClick}
//           searchTerm={searchTerm}
//         />
//       </div>

//       {/* Modals */}
//       <AddInstructorModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSave={handleAddInstructor}
//         loading={addLoading}
//       />

//       <AssignCourseModal
//         show={showAssignModal}
//         onClose={() => {
//           setShowAssignModal(false);
//           setSelectedInstructor(null);
//         }}
//         onSave={handleAssignCourse}
//         instructor={selectedInstructor}
//         courses={courses}
//         loading={assignLoading}
//       />

//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setSelectedInstructor(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         instructor={selectedInstructor}
//         loading={deleteLoading}
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//         .instructor-management {
//           padding: 2rem;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          
//           min-height: 100vh;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== TOAST ===== */
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
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
//           animation: slideInRight 0.3s ease;
//           min-width: 300px;
//         }

//         .toast-notification.success {
//           background: #d4edda;
//           color: #155724;
//           border: 2px solid #c3e6cb;
//         }

//         .toast-notification.error {
//           background: #f8d7da;
//           color: #721c24;
//           border: 2px solid #f5c6cb;
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
//           margin-left: auto;
//         }

//         .toast-close:hover {
//           opacity: 1;
//         }

//         /* ===== HEADER ===== */
//         .management-header {
//                     background: white;
//           border-radius: 16px;
//           padding: 1.5rem 2rem;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//           margin-bottom: 1.5rem;
//         }

//         .header-content {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .header-title-group {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .header-icon {
//           background: ${COLORS.lightest};
//           padding: 0.8rem;
//           border-radius: 12px;
//           color: ${COLORS.primary};
//         }

//         .header-title-group h1 {
//           font-size: 1.5rem;
//           margin: 0;
//           font-weight: 600;
//           color: ${COLORS.primary};
//         }

//         .header-title-group p {
//           font-size: 0.9rem;
//           color: #6c757d;
//           margin: 0.25rem 0 0;
//         }

//         .header-actions {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .action-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           border: none;
//           border-radius: 10px;
//           padding: 0.6rem 1.2rem;
//           font-size: 0.9rem;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.25s ease;
//         }

//         .action-btn.primary {
//           background: ${COLORS.primary};
//           color: white;
//         }

//         .action-btn.primary:hover {
//           background: ${COLORS.secondary};
//         }

//         .action-btn.refresh {
//           background: ${COLORS.lightest};
//           color: ${COLORS.primary};
//           border: 1px solid ${COLORS.light};
//         }

//         .action-btn.refresh:hover {
//           background: ${COLORS.lighter};
//           color: white;
//         }

//         .spinning {
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

//         /* ===== SEARCH BAR ===== */
//         .search-section {
//           margin-top: 1.25rem;
//           display: flex;
//           justify-content: flex-end;
//         }

//         .search-container {
//           display: flex;
//           align-items: center;
//           background: #f1f3f5;
//           border-radius: 12px;
//           padding: 0.4rem 0.75rem;
//           width: 100%;
//           max-width: 400px;
//           border: 1px solid #dee2e6;
//         }

//         .search-input {
//           flex: 1;
//           border: none;
//           background: transparent;
//           outline: none;
//           padding: 0.4rem 0.6rem;
//           font-size: 0.9rem;
//         }

//         .search-icon {
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         .search-clear {
//           background: none;
//           border: none;
//           color: #888;
//           cursor: pointer;
//           transition: color 0.2s ease;
//         }

//         .search-clear:hover {
//           color: ${COLORS.primary};
//         }

//         /* ===== TABLE ===== */
//         .table-section {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
//           padding: 1.5rem;
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         table.instructor-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.95rem;
//         }

//         th, td {
//           text-align: left;
//           padding: 0.85rem 1rem;
//           border-bottom: 1px solid #eee;
//         }

//         th {
//           background: ${COLORS.lightest};
//           color: ${COLORS.primary};
//           font-weight: 600;
//         }

//         tr:hover {
//           background: #f8f9fa;
//         }

//         .id-cell {
//           color: #6c757d;
//         }

//         .name-cell {
//           display: flex;
//           align-items: center;
//           gap: 0.6rem;
//         }

//         .avatar {
//           width: 32px;
//           height: 32px;
//           background: ${COLORS.light};
//           border-radius: 50%;
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 600;
//         }

//         .department-badge {
//           background: ${COLORS.lightest};
//           color: ${COLORS.primary};
//           padding: 0.3rem 0.6rem;
//           border-radius: 8px;
//           font-size: 0.8rem;
//         }

//         .unassigned-badge {
//           background: #f8d7da;
//           color: #721c24;
//           padding: 0.3rem 0.6rem;
//           border-radius: 8px;
//           font-size: 0.8rem;
//         }

//         .actions-cell {
//           display: flex;
//           justify-content: center;
//           gap: 0.5rem;
//         }

//         .action-btn.assign {
//           background: ${COLORS.light};
//           color: white;
//         }

//         .action-btn.assign:hover {
//           background: ${COLORS.accent};
//         }

//         .action-btn.delete {
//           background: #ffdddd;
//           color: #d9534f;
//         }

//         .action-btn.delete:hover {
//           background: #ffcccc;
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
//           z-index: 2000;
//         }

//         .modal-content {
//           background: white;
//           padding: 1.5rem 2rem;
//           border-radius: 14px;
//           width: 100%;
//           max-width: 480px;
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//           animation: fadeIn 0.3s ease;
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//         }

//         .modal-header h3 {
//           margin: 0;
//           font-size: 1.2rem;
//           color: ${COLORS.primary};
//         }

//         .modal-close {
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #888;
//           transition: color 0.2s ease;
//         }

//         .modal-close:hover {
//           color: ${COLORS.primary};
//         }

//         .modal-body {
//           margin-bottom: 1.5rem;
//         }

//         .form-group {
//           margin-bottom: 1rem;
//         }

//         .form-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 600;
//           color: ${COLORS.primary};
//           font-size: 0.9rem;
//           margin-bottom: 0.4rem;
//         }

//         .form-input, .form-select {
//           width: 100%;
//           padding: 0.6rem 0.75rem;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 0.9rem;
//           transition: border-color 0.2s ease;
//         }

//         .form-input:focus, .form-select:focus {
//           outline: none;
//           border-color: ${COLORS.accent};
//         }

//         .form-input.error, .form-select.error {
//           border-color: #e63946;
//         }

//         .error-text {
//           color: #e63946;
//           font-size: 0.8rem;
//           margin-top: 0.25rem;
//         }

//         .modal-footer {
//           display: flex;
//           justify-content: flex-end;
//           gap: 0.75rem;
//         }

//         .btn-primary {
//           background: ${COLORS.primary};
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 0.6rem 1.2rem;
//           cursor: pointer;
//           font-weight: 500;
//           transition: background 0.25s ease;
//         }

//         .btn-primary:hover {
//           background: ${COLORS.secondary};
//         }

//         .btn-secondary {
//           background: #e9ecef;
//           color: ${COLORS.primary};
//           border: none;
//           border-radius: 8px;
//           padding: 0.6rem 1.2rem;
//           cursor: pointer;
//           font-weight: 500;
//           transition: background 0.25s ease;
//         }

//         .btn-secondary:hover {
//           background: #dee2e6;
//         }

//         .btn-danger {
//           background: #dc3545;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 0.6rem 1.2rem;
//           cursor: pointer;
//         }

//         .btn-danger:hover {
//           background: #c82333;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Users, Plus, RefreshCw, Trash2, UserPlus, BookOpen,
  Search, X, CheckCircle, AlertCircle, Loader
} from "lucide-react";



// ==================== CONSTANTS ====================
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

// ==================== TOAST NOTIFICATION ====================
const Toast = React.memo(({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`toast-notification ${type}`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
});

// ==================== ADD INSTRUCTOR MODAL ====================
const AddInstructorModal = React.memo(({ show, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({ name: '', email: '', department: '' });
      setErrors({});
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h3>Add New Instructor</h3>
            <button type="button" className="modal-close" onClick={onClose} disabled={loading}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                <Users size={16} />
                Full Name *
              </label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g., John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <BookOpen size={16} />
                Email Address *
              </label>
              <input
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="e.g., instructor@university.edu"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <BookOpen size={16} />
                Department (Optional)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Computer Science"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader size={16} className="spinning" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Instructor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// ==================== ASSIGN COURSE MODAL ====================
const AssignCourseModal = React.memo(({ show, onClose, onSave, instructor, courses, loading }) => {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setError('Please select a course');
      return;
    }
    onSave(selectedCourseId);
    setSelectedCourseId('');
    setError('');
  };

  if (!show || !instructor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h3>Assign Course</h3>
            <button type="button" className="modal-close" onClick={onClose} disabled={loading}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="instructor-info">
              <Users size={20} className="info-icon" />
              <div>
                <div className="info-name">{instructor.name}</div>
                <div className="info-email">{instructor.email}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <BookOpen size={16} />
                Select Course *
              </label>
              <select
                className={`form-select ${error ? 'error' : ''}`}
                value={selectedCourseId}
                onChange={e => {
                  setSelectedCourseId(e.target.value);
                  setError('');
                }}
                disabled={loading}
              >
                <option value="">-- Choose a Course --</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} — {course.name}
                  </option>
                ))}
              </select>
              {error && <span className="error-text">{error}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader size={16} className="spinning" />
                  Assigning...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Assign Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// ==================== DELETE CONFIRMATION MODAL ====================
const DeleteConfirmModal = React.memo(({ show, onClose, onConfirm, instructor, loading }) => {
  if (!show || !instructor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <AlertCircle size={24} className="warning-icon" />
          <h3>Delete Instructor?</h3>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{instructor.name}</strong>? 
            This action cannot be undone and will remove all associated data.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? (
              <>
                <Loader size={16} className="spinning" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== INSTRUCTOR TABLE ====================
const InstructorTable = React.memo(({ 
  instructors, 
  loading, 
  onAssign, 
  onDelete,
  searchTerm 
}) => {
  const filteredInstructors = useMemo(() => {
    if (!searchTerm.trim()) return instructors;
    
    const term = searchTerm.toLowerCase();
    return instructors.filter(inst =>
      inst.name?.toLowerCase().includes(term) ||
      inst.email?.toLowerCase().includes(term) ||
      inst.department?.toLowerCase().includes(term) ||
      inst.course_code?.toLowerCase().includes(term)
    );
  }, [instructors, searchTerm]);

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading instructors...</p>
      </div>
    );
  }

  if (filteredInstructors.length === 0) {
    return (
      <div className="empty-state">
        <Users size={48} className="empty-icon" />
        <h3>No Instructors Found</h3>
        <p>
          {searchTerm 
            ? "No instructors match your search criteria"
            : "Start by adding your first instructor"}
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="instructor-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course / Department</th>
            <th style={{ width: '200px' }} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstructors.map(inst => (
            <tr key={inst.id} className="instructor-row">
              <td className="id-cell">{inst.id}</td>
              <td>
                <div className="name-cell">
                  <div className="avatar">{inst.name?.charAt(0) || '?'}</div>
                  <span>{inst.name || 'Unknown'}</span>
                </div>
              </td>
              <td>
                <span className="user-email">{inst.email || 'No email'}</span>
              </td>
              <td>
                {inst.course_code ? (
                  <span className="course-badge">{inst.course_code}</span>
                ) : inst.department ? (
                  <span className="department-badge">{inst.department}</span>
                ) : (
                  <span className="unassigned-badge">No course assigned</span>
                )}
              </td>
              <td className="actions-cell">
                <button
                  className="action-btn assign"
                  onClick={() => onAssign(inst)}
                  title="Assign Course"
                >
                  <UserPlus size={16} />
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => onDelete(inst)}
                  title="Delete Instructor"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function InstructorManagement() {
  // Data State
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  
  // Operation Loading States
  const [addLoading, setAddLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /**
   * Fetch instructors from API
   */
  const fetchInstructors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/instructors`);
      if (!res.ok) throw new Error("Failed to fetch instructors");
      const data = await res.json();
      console.log("Fetched instructors:", data); // Debug log
      
      // Ensure data is an array and has proper structure
      const instructorsList = Array.isArray(data) ? data : [];
      setInstructors(instructorsList);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      showToast("Failed to load instructors", "error");
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch courses from API
   */
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      console.log("Fetched courses:", data); // Debug log
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  }, []);

  /**
   * Initial data load
   */
  useEffect(() => {
    fetchInstructors();
    fetchCourses();
  }, [fetchInstructors, fetchCourses]);

  /**
   * Handle refresh button
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchInstructors(), fetchCourses()]);
    setRefreshing(false);
    showToast("Data refreshed successfully", "success");
  };

  /**
   * Add new instructor
   */
  const handleAddInstructor = async (formData) => {
    setAddLoading(true);
    try {
      const res = await fetch(`${API}/api/instructors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add instructor");
      }

      await fetchInstructors();
      setShowAddModal(false);
      showToast("Instructor added successfully! ✓", "success");
    } catch (err) {
      console.error("Add instructor error:", err);
      showToast(err.message || "Failed to add instructor", "error");
    } finally {
      setAddLoading(false);
    }
  };

  /**
   * Open assign course modal
   */
  const handleAssignClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowAssignModal(true);
  };

  /**
   * Assign course to instructor
   */
  const handleAssignCourse = async (courseId) => {
    if (!selectedInstructor) return;

    setAssignLoading(true);
    try {
      const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id: courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to assign course");
      }

      setShowAssignModal(false);
      setSelectedInstructor(null);
      showToast("Course assigned successfully! ✓", "success");
      await fetchInstructors();
    } catch (err) {
      console.error("Assign course error:", err);
      showToast(err.message || "Failed to assign course", "error");
    } finally {
      setAssignLoading(false);
    }
  };

  /**
   * Open delete confirmation modal
   */
  const handleDeleteClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowDeleteModal(true);
  };

  /**
   * Delete instructor
   */
  const handleDeleteConfirm = async () => {
    if (!selectedInstructor) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/api/instructors/${selectedInstructor.id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete instructor");
      }

      setInstructors(prev => prev.filter(i => i.id !== selectedInstructor.id));
      setShowDeleteModal(false);
      setSelectedInstructor(null);
      showToast("Instructor deleted successfully ✓", "success");
    } catch (err) {
      console.error("Delete instructor error:", err);
      showToast(err.message || "Failed to delete instructor", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  return (
    <div className="instructor-management">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Header */}
      <div className="management-header">
        <div className="header-content">
          <div className="header-title-group">
            <div className="header-icon">
              <Users size={28} />
            </div>
            <div>
              <h1>Instructor Management</h1>
              <p>Manage instructor accounts and course assignments</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-btn primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} />
              Add Instructor
            </button>
            <button 
              className="action-btn refresh"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search instructors by name, email, or course..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instructor Table */}
      <div className="table-section">
        <InstructorTable
          instructors={instructors}
          loading={loading}
          onAssign={handleAssignClick}
          onDelete={handleDeleteClick}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modals */}
      <AddInstructorModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddInstructor}
        loading={addLoading}
      />

      <AssignCourseModal
        show={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedInstructor(null);
        }}
        onSave={handleAssignCourse}
        instructor={selectedInstructor}
        courses={courses}
        loading={assignLoading}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedInstructor(null);
        }}
        onConfirm={handleDeleteConfirm}
        instructor={selectedInstructor}
        loading={deleteLoading}
      />

      
      {/* Inline Styles */}
      <style jsx>{`
        .instructor-management {
          padding: 2rem;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== TOAST ===== */
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
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          animation: slideInRight 0.3s ease;
          min-width: 300px;
        }

        .toast-notification.success {
          background: #d4edda;
          color: #155724;
          border: 2px solid #c3e6cb;
        }

        .toast-notification.error {
          background: #f8d7da;
          color: #721c24;
          border: 2px solid #f5c6cb;
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
          margin-left: auto;
        }

        .toast-close:hover {
          opacity: 1;
        }

        /* ===== HEADER ===== */
        .management-header {
          background: white;
          border-radius: 16px;
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 1.5rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-title-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          background: ${COLORS.lightest};
          padding: 0.8rem;
          border-radius: 12px;
          color: ${COLORS.primary};
        }

        .header-title-group h1 {
          font-size: 1.5rem;
          margin: 0;
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .header-title-group p {
          font-size: 0.9rem;
          color: #6c757d;
          margin: 0.25rem 0 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .action-btn.primary {
          background: ${COLORS.primary};
          color: white;
        }

        .action-btn.primary:hover {
          background: ${COLORS.secondary};
        }

        .action-btn.refresh {
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
          border: 1px solid ${COLORS.light};
        }

        .action-btn.refresh:hover {
          background: ${COLORS.lighter};
          color: white;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* ===== SEARCH BAR ===== */
        .search-section {
          margin-top: 1.25rem;
          display: flex;
          justify-content: flex-end;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: #f1f3f5;
          border-radius: 12px;
          padding: 0.4rem 0.75rem;
          width: 100%;
          max-width: 400px;
          border: 1px solid #dee2e6;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          padding: 0.4rem 0.6rem;
          font-size: 0.9rem;
        }

        .search-icon {
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .search-clear {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .search-clear:hover {
          color: ${COLORS.primary};
        }

        /* ===== TABLE ===== */
        .table-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          padding: 1.5rem;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table.instructor-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        th, td {
          text-align: left;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #eee;
        }

        th {
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
          font-weight: 600;
        }

        tr:hover {
          background: #f8f9fa;
        }

        .id-cell {
          color: #6c757d;
        }

        .name-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: ${COLORS.light};
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .user-email {
          font-weight: 500;
          color: ${COLORS.primary};
        }

        .department-badge {
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .courses-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .course-badge {
          background: ${COLORS.lighter};
          color: white;
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .unassigned-badge {
          background: #f8d7da;
          color: #721c24;
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .actions-cell {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .action-btn.assign {
          background: ${COLORS.light};
          color: white;
        }

        .action-btn.assign:hover {
          background: ${COLORS.accent};
        }

        .action-btn.delete {
          background: #ffdddd;
          color: #d9534f;
        }

        .action-btn.delete:hover {
          background: #ffcccc;
        }

        .table-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: ${COLORS.primary};
        }

        .spinner {
          border: 3px solid ${COLORS.lightest};
          border-top: 3px solid ${COLORS.primary};
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: #6c757d;
        }

        .empty-icon {
          color: ${COLORS.lighter};
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          margin: 0.5rem 0;
          color: ${COLORS.primary};
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
          z-index: 2000;
        }

        .modal-content {
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 14px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.2rem;
          color: ${COLORS.primary};
        }

        .warning-icon {
          color: #f0ad4e;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          transition: color 0.2s ease;
          padding: 0.25rem;
          display: flex;
          align-items: center;
        }

        .modal-close:hover {
          color: ${COLORS.primary};
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .instructor-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: ${COLORS.lightest};
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }

        .info-icon {
          color: ${COLORS.primary};
        }

        .info-name {
          font-weight: 600;
          color: ${COLORS.primary};
          font-size: 1rem;
        }

        .info-email {
          font-size: 0.85rem;
          color: #6c757d;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.primary};
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 0.9rem;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: ${COLORS.accent};
        }

        .form-input.error, .form-select.error {
          border-color: #e63946;
        }

        .error-text {
          color: #e63946;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .btn-primary {
          background: ${COLORS.primary};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          background: ${COLORS.secondary};
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #e9ecef;
          color: ${COLORS.primary};
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.25s ease;
        }

        .btn-secondary:hover {
          background: #dee2e6;
        }

        .btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-danger:hover {
          background: #c82333;
        }

        .btn-danger:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .confirm-modal .modal-body p {
          color: #495057;
          line-height: 1.6;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .instructor-management {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .search-container {
            max-width: 100%;
          }

          .table-wrapper {
            overflow-x: scroll;
          }

          .modal-content {
            margin: 1rem;
            max-width: calc(100% - 2rem);
          }

          .toast-notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            min-width: unset;
          }
        }
          `}</style>     
          </div>
);
 }