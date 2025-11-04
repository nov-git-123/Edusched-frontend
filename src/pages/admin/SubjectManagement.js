// // src/components/SubjectManagement.js
// import React, { useEffect, useState } from "react";
// import {
//   Accordion,
//   Table,
//   Button,
//   Spinner,
//   Alert,
//   Modal,
//   Form,
// } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const SubjectManagement = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState({ code: "", title: "" });

//   // ✅ Fetch subjects
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await fetch(`${API}/api/subjects`);
//         if (!res.ok) throw new Error("Failed to fetch subjects");
//         const data = await res.json();
//         setSubjects(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   // ✅ Group subjects by course > year > semester
//   const groupSubjects = () => {
//     const grouped = {};
//     subjects.forEach((subj) => {
//       if (!grouped[subj.course]) grouped[subj.course] = {};
//       if (!grouped[subj.course][subj.yearLevel])
//         grouped[subj.course][subj.yearLevel] = {};
//       if (!grouped[subj.course][subj.yearLevel][subj.semester])
//         grouped[subj.course][subj.yearLevel][subj.semester] = [];
//       grouped[subj.course][subj.yearLevel][subj.semester].push(subj);
//     });
//     return grouped;
//   };

//   // ✅ Handle Edit
//   const handleEdit = (subject) => {
//     setSelectedSubject(subject);
//     setEditForm({ code: subject.code, title: subject.title });
//     setShowEditModal(true);
//   };

//   const saveEdit = async () => {
//     try {
//       const res = await fetch(`${API}/api/subjects/${selectedSubject.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
//       if (!res.ok) throw new Error("Failed to update subject");

//       setSubjects(
//         subjects.map((s) =>
//           s.id === selectedSubject.id ? { ...s, ...editForm } : s
//         )
//       );

//       setShowEditModal(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ✅ Handle Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this subject?")) return;
//     try {
//       const res = await fetch(`${API}/api/subjects/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete subject");

//       setSubjects(subjects.filter((s) => s.id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   const groupedSubjects = groupSubjects();

//   return (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="mb-4">📚 Subject Management</h2>
//       <p className="text-muted">
//         View all subjects categorized by course, year level, and semester.
//       </p>

//       {Object.keys(groupedSubjects).map((course, i) => (
//         <Accordion key={i} defaultActiveKey="0" className="mb-3">
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>{course}</Accordion.Header>
//             <Accordion.Body>
//               {Object.keys(groupedSubjects[course]).map((year) => (
//                 <div key={year} className="mb-3">
//                   <h5 className="text-primary">Year {year}</h5>
//                   {Object.keys(groupedSubjects[course][year]).map((sem) => (
//                     <div key={sem} className="mb-3">
//                       <h6 className="text-muted">Semester {sem}</h6>
//                       <Table bordered hover responsive>
//                         <thead className="table-dark">
//                           <tr>
//                             <th>Code</th>
//                             <th>Title</th>
//                             <th style={{ width: "160px" }}>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {groupedSubjects[course][year][sem].map((subj) => (
//                             <tr key={subj.id}>
//                               <td>{subj.code}</td>
//                               <td>{subj.title}</td>
//                               <td>
//                                 <Button
//                                   variant="info"
//                                   size="sm"
//                                   className="me-2"
//                                   onClick={() => handleEdit(subj)}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button
//                                   variant="danger"
//                                   size="sm"
//                                   onClick={() => handleDelete(subj.id)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       ))}

//       {/* Edit Subject Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Subject</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Code</Form.Label>
//             <Form.Control
//               type="text"
//               value={editForm.code}
//               onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               value={editForm.title}
//               onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={saveEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SubjectManagement;

//FUNCTIONAL
// src/components/SubjectManagement.js
// import React, { useEffect, useState } from "react";
// import { Card, Table, Spinner, Alert, Button, Form, Modal } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export default function CourseManagement() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newCourse, setNewCourse] = useState({ code: "", name: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`${API}/api/courses`);
//       if (!res.ok) throw new Error("Failed to fetch courses");
//       const data = await res.json();

//       // Fetch subjects for each course
//       const withSubjects = await Promise.all(
//         data.map(async (course) => {
//           const subRes = await fetch(`${API}/api/courses/${course.id}/subjects`);
//           const subjects = subRes.ok ? await subRes.json() : [];
//           return { ...course, subjects };
//         })
//       );

//       setCourses(withSubjects);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleAddCourse = async (e) => {
//     e.preventDefault();
//     if (!newCourse.code.trim() || !newCourse.name.trim()) {
//       alert("Please enter both course code and name.");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const res = await fetch(`${API}/api/courses`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCourse),
//       });

//       if (!res.ok) throw new Error("Failed to add course");
//       await fetchCourses();

//       setShowAddModal(false);
//       setNewCourse({ code: "", name: "" });
//     } catch (err) {
//       alert("Error adding course: " + err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       const res = await fetch(`${API}/api/courses/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete course");
//       await fetchCourses();
//     } catch (err) {
//       alert("Error deleting course: " + err.message);
//     }
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <Card className="shadow-sm border-0 p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>🎓 Course Management</h4>
//         <Button variant="primary" onClick={() => setShowAddModal(true)}>
//           + Add Course
//         </Button>
//       </div>

//       {courses.length === 0 ? (
//         <Alert variant="info">No courses found.</Alert>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead className="table-dark">
//             <tr>
//               <th>Course Code</th>
//               <th>Course Name</th>
//               <th>Subjects</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.id}>
//                 <td>{course.code}</td>
//                 <td>{course.name}</td>
//                 <td>
//                   {course.subjects?.length > 0 ? (
//                     <ul className="mb-0">
//                       {course.subjects.map((subj) => (
//                         <li key={subj.id}>
//                           {subj.subject_code} - {subj.description}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <em>No subjects</em>
//                   )}
//                 </td>
//                 <td>
//                   <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* ✅ Add Course Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAddCourse}>
//             <Form.Group className="mb-3">
//               <Form.Label>Course Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newCourse.code}
//                 onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Course Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newCourse.name}
//                 onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <div className="text-end">
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowAddModal(false)}
//                 className="me-2"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" disabled={submitting}>
//                 {submitting ? "Adding..." : "Add Course"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Card>
//   );
// }
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit, 
  RefreshCw, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BookMarked,
  List,
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
// 📊 COURSE TABLE COMPONENT
// ========================================
const CourseTable = React.memo(({ 
  courses, 
  searchQuery, 
  sortBy, 
  onEdit, 
  onDelete 
}) => {
  // Filter and sort courses
  const filteredAndSorted = useMemo(() => {
    let filtered = courses.filter(course => 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort courses
    filtered.sort((a, b) => {
      if (sortBy === 'code') {
        return a.code.localeCompare(b.code);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'subjects') {
        return (b.subjects?.length || 0) - (a.subjects?.length || 0);
      }
      return 0;
    });

    return filtered;
  }, [courses, searchQuery, sortBy]);

  if (filteredAndSorted.length === 0) {
    return (
      <div className="empty-state">
        <BookOpen size={48} className="empty-icon" />
        <h3>No Courses Found</h3>
        <p>
          {searchQuery 
            ? "No courses match your search criteria." 
            : "Get started by adding your first course."}
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSorted.map((course) => (
            <tr key={course.id} className="course-row">
              <td>
                <div className="course-code">
                  <BookMarked size={16} />
                  <strong>{course.code}</strong>
                </div>
              </td>
              <td className="course-name">{course.name}</td>
              <td>
                {course.subjects?.length > 0 ? (
                  <div className="subjects-cell">
                    <span className="subject-badge">
                      {course.subjects.length} {course.subjects.length === 1 ? 'Subject' : 'Subjects'}
                    </span>
                    <div className="subjects-list">
                      {course.subjects.map((subj) => (
                        <div key={subj.id} className="subject-item">
                          <List size={12} />
                          <span>{subj.subject_code} - {subj.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted">No subjects</span>
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(course)}
                    className="btn-icon btn-edit"
                    title="Edit Course"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(course)}
                    className="btn-icon btn-delete"
                    title="Delete Course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ========================================
// ➕ ADD/EDIT COURSE MODAL
// ========================================
const CourseModal = React.memo(({ 
  show, 
  onClose, 
  onSave, 
  course, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({ code: "", name: "" });
  const [errors, setErrors] = useState({});

  const isEditMode = !!course;

  // Initialize form data when course changes
  useEffect(() => {
    if (course) {
      setFormData({ code: course.code, name: course.name });
    } else {
      setFormData({ code: "", name: "" });
    }
    setErrors({});
  }, [course, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code.trim()) {
      newErrors.code = "Course code is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
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
        <div className="modal-header">
          <div className="modal-title">
            {isEditMode ? <Edit size={24} /> : <Plus size={24} />}
            <h3>{isEditMode ? 'Edit Course' : 'Add New Course'}</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="courseCode">Course Code *</label>
            <input
              id="courseCode"
              type="text"
              placeholder="e.g., BSCS, BSIT, BSBA"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className={errors.code ? "input-error" : ""}
              disabled={isSubmitting}
            />
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="courseName">Course Name *</label>
            <input
              id="courseName"
              type="text"
              placeholder="e.g., Bachelor of Science in Computer Science"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "input-error" : ""}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
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
                  {isEditMode ? 'Update Course' : 'Add Course'}
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
const DeleteModal = React.memo(({ show, onClose, onConfirm, course, isDeleting }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
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
            Are you sure you want to delete <strong>{course?.code} - {course?.name}</strong>?
          </p>
          {course?.subjects?.length > 0 && (
            <div className="warning-box">
              <AlertCircle size={16} />
              <span>
                This course has {course.subjects.length} associated subject(s). 
                They will also be removed.
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
                Delete Course
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
const CourseManagement = () => {
  // State management
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("code");
  const [toast, setToast] = useState(null);

  // Modal states
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ========================================
  // 📡 FETCH COURSES
  // ========================================
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch(`${API}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();

      // Fetch subjects for each course
      const withSubjects = await Promise.all(
        data.map(async (course) => {
          try {
            const subRes = await fetch(`${API}/api/courses/${course.id}/subjects`);
            const subjects = subRes.ok ? await subRes.json() : [];
            return { ...course, subjects };
          } catch (err) {
            console.error(`Error fetching subjects for course ${course.id}:`, err);
            return { ...course, subjects: [] };
          }
        })
      );

      setCourses(withSubjects);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      showToast("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
  // ➕ ADD/EDIT COURSE
  // ========================================
  const handleSaveCourse = useCallback(async (formData) => {
    setIsSubmitting(true);

    try {
      const isEdit = !!editingCourse;
      const url = isEdit 
        ? `${API}/api/courses/${editingCourse.id}`
        : `${API}/api/courses`;
      
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${isEdit ? 'update' : 'add'} course`);
      }

      await fetchCourses();
      setShowCourseModal(false);
      setEditingCourse(null);
      
      showToast(
        `Course ${isEdit ? 'updated' : 'added'} successfully!`,
        "success"
      );
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [editingCourse, fetchCourses, showToast]);

  // ========================================
  // 🗑️ DELETE COURSE
  // ========================================
  const handleDeleteCourse = useCallback(async () => {
    if (!deletingCourse) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`${API}/api/courses/${deletingCourse.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete course");
      }

      await fetchCourses();
      setShowDeleteModal(false);
      setDeletingCourse(null);
      
      showToast("Course deleted successfully!", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingCourse, fetchCourses, showToast]);

  // ========================================
  // 🎬 MODAL HANDLERS
  // ========================================
  const openAddModal = useCallback(() => {
    setEditingCourse(null);
    setShowCourseModal(true);
  }, []);

  const openEditModal = useCallback((course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  }, []);

  const openDeleteModal = useCallback((course) => {
    setDeletingCourse(course);
    setShowDeleteModal(true);
  }, []);

  const closeModals = useCallback(() => {
    setShowCourseModal(false);
    setShowDeleteModal(false);
    setEditingCourse(null);
    setDeletingCourse(null);
  }, []);

  // ========================================
  // 🎨 RENDER
  // ========================================
  return (
    <div className="course-management">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      {/* Header Section */}
      <div className="page-header">
        <div className="header-left">
          <div className="header-icon">
            <BookOpen size={32} />
          </div>
          <div>
            <h2 className="page-title">Course Management</h2>
            <p className="page-subtitle">
              Manage academic courses and their associated subjects
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={fetchCourses}
            className="btn btn-outline"
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "spinning" : ""} />
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <BookOpen size={20} />
          <div>
            <div className="stat-value">{courses.length}</div>
            <div className="stat-label">Total Courses</div>
          </div>
        </div>
        <div className="stat-card">
          <BookMarked size={20} />
          <div>
            <div className="stat-value">
              {courses.reduce((sum, c) => sum + (c.subjects?.length || 0), 0)}
            </div>
            <div className="stat-label">Total Subjects</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses by code or name..."
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

        <div className="sort-box">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="code">Course Code</option>
            <option value="name">Course Name</option>
            <option value="subjects">Subject Count</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large" />
            <p>Loading courses...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <XCircle size={48} />
            <h3>Error Loading Courses</h3>
            <p>{error}</p>
            <button onClick={fetchCourses} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : (
          <CourseTable
            courses={courses}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      {/* Modals */}
      <CourseModal
        show={showCourseModal}
        onClose={closeModals}
        onSave={handleSaveCourse}
        course={editingCourse}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleDeleteCourse}
        course={deletingCourse}
        isDeleting={isDeleting}
      />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .course-management {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          
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

        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          background: linear-gradient(135deg, #0077B6 0%, #023E8A 100%);
          color: white;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: #03045E;
        }

        .page-subtitle {
          margin: 4px 0 0;
          font-size: 0.9rem;
          color: #6c757d;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

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

        .btn-outline {
          background: white;
          color: #0077B6;
          border: 2px solid #0077B6;
        }

        .btn-outline:hover:not(:disabled) {
          background: #f0f8ff;
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
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
          position: relative;
          display: flex;
          align-items: center;
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

        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-box label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #495057;
          margin: 0;
        }

        .sort-box select {
          padding: 10px 32px 10px 12px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          background: white;
          transition: all 0.3s ease;
        }

        .sort-box select:focus {
          outline: none;
          border-color: #0077B6;
        }

        /* Content Card */
        .content-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .loading-state,
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 16px;
        }

        .loading-state p,
        .error-state p {
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

        /* Table */
        .table-container {
          overflow-x: auto;
        }

        .course-table {
          width: 100%;
          border-collapse: collapse;
        }

        .course-table thead {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 2px solid #dee2e6;
        }

        .course-table th {
          padding: 16px 20px;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 700;
          color: #03045E;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .course-table tbody tr {
          border-bottom: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .course-table tbody tr:hover {
          background: #f8f9fa;
          transform: translateX(4px);
        }

        .course-table td {
          padding: 16px 20px;
          vertical-align: top;
        }

        .course-code {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0077B6;
          font-weight: 600;
        }

        .course-name {
          color: #495057;
          font-size: 0.95rem;
        }

        .subjects-cell {
          position: relative;
        }

        .subject-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          color: #0277bd;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .subjects-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .subject-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 0.85rem;
          color: #495057;
          border-left: 3px solid #0077B6;
        }

        .subject-item svg {
          color: #0077B6;
          flex-shrink: 0;
        }

        .text-muted {
          color: #6c757d;
          font-style: italic;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
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

        /* Empty State */
        .empty-state {
          padding: 60px 20px;
          text-align: center;
        }

        .empty-icon {
          color: #0077B6;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          color: #03045E;
          margin-bottom: 8px;
          font-size: 1.5rem;
        }

        .empty-state p {
          color: #6c757d;
          font-size: 0.95rem;
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        .modal-header {
          padding: 24px 28px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
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
          color: #03045E;
        }

        .modal-title svg {
          color: #0077B6;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6c757d;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: #f8f9fa;
          color: #dc3545;
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
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
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

        /* Responsive Design */
        @media (max-width: 992px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-end;
          }

          .stats-bar {
            grid-template-columns: 1fr;
          }

          .controls-bar {
            flex-direction: column;
          }

          .search-box {
            min-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .course-management {
            padding: 16px;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .header-actions {
            flex-direction: column;
            width: 100%;
          }

          .header-actions button {
            width: 100%;
          }

          .course-table th,
          .course-table td {
            padding: 12px;
            font-size: 0.85rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .modal-content {
            width: 95%;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 20px;
          }
        }

        @media (max-width: 576px) {
          .page-header {
            margin-bottom: 16px;
          }

          .stats-bar {
            margin-bottom: 16px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .controls-bar {
            margin-bottom: 16px;
          }

          .course-table {
            font-size: 0.8rem;
          }

          .subjects-list {
            display: none;
          }

          .subject-badge {
            font-size: 0.75rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        *:focus-visible {
          outline: 2px solid #0077B6;
          outline-offset: 2px;
        }

        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
        }

        /* Print Styles */
        @media print {
          .page-header,
          .stats-bar,
          .controls-bar,
          .action-buttons,
          .btn {
            display: none !important;
          }

          .content-card {
            box-shadow: none;
          }

          .course-table {
            font-size: 10pt;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseManagement;