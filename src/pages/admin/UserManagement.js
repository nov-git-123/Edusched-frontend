// // src/components/UserManagement.js
// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newRole, setNewRole] = useState("");

//   // ✅ Fetch all users on page load
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch(`${API}/api/users`);
//         if (!res.ok) throw new Error("Failed to fetch users");
//         const data = await res.json();
//         setUsers(data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ✅ Delete a user
//   const handleDelete = async (uid) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const res = await fetch(`${API}/api/users/${uid}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete user");
//       setUsers(users.filter((u) => u.uid !== uid));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ✅ Open role modal
//   const openRoleModal = (user) => {
//     setSelectedUser(user);
//     setNewRole(user.role);
//     setShowRoleModal(true);
//   };

//   // ✅ Update role
//   const handleUpdateRole = async () => {
//     try {
//       const res = await fetch(`${API}/api/users/${selectedUser.uid}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: newRole }),
//       });
//       if (!res.ok) throw new Error("Failed to update role");

//       // Update UI instantly
//       setUsers(
//         users.map((u) =>
//           u.uid === selectedUser.uid ? { ...u, role: newRole } : u
//         )
//       );

//       setShowRoleModal(false);
//       setSelectedUser(null);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="mb-4">👥 User Management</h2>

//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>UID</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th style={{ width: "180px" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 No users found.
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.uid}>
//                 <td>{user.uid}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => openRoleModal(user)}
//                   >
//                     Edit Role
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(user.uid)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       {/* Role Edit Modal */}
//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Select Role</Form.Label>
//               <Form.Select
//                 value={newRole}
//                 onChange={(e) => setNewRole(e.target.value)}
//               >
//                 <option value="admin">Admin</option>
//                 <option value="dean">Dean</option>
//                 <option value="instructor">Instructor</option>
//                 <option value="student">Student</option>
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleUpdateRole}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Search, Edit2, Trash2, Shield, Users, UserCheck,
  GraduationCap, AlertCircle, CheckCircle, X, Loader,
  Filter, ChevronDown, ChevronUp
} from "lucide-react";
// import { API } from '../../config/api';


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
  accentLight: "#0096C7",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    color: "#0077B6",
    bgColor: "#CAF0F8",
    icon: Shield,
  },
  dean: {
    label: "Dean",
    color: "#6366f1",
    bgColor: "#e0e7ff",
    icon: UserCheck,
  },
  instructor: {
    label: "Instructor",
    color: "#10b981",
    bgColor: "#d1fae5",
    icon: Users,
  },
  student: {
    label: "Student",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    icon: GraduationCap,
  },
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

// ==================== ROLE BADGE ====================
const RoleBadge = React.memo(({ role }) => {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.student;
  const Icon = config.icon;

  return (
    <div
      className="role-badge"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      <Icon size={14} />
      <span>{config.label}</span>
    </div>
  );
});

// ==================== STATS CARD ====================
const StatsCard = React.memo(({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ backgroundColor: bgColor, color }}>
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <div className="stats-label">{title}</div>
        <div className="stats-value">{value}</div>
      </div>
    </div>
  );
});

// ==================== CONFIRMATION MODAL ====================
const ConfirmationModal = React.memo(({ show, onClose, onConfirm, loading, user }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirmation-modal">
        <div className="modal-icon-warning">
          <AlertCircle size={48} />
        </div>
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete user <strong>{user?.email}</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={16} className="spinning" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== ROLE EDIT MODAL ====================
const RoleEditModal = React.memo(({ show, onClose, onSave, loading, user }) => {
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    if (!selectedRole) return;
    onSave(selectedRole);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content role-edit-modal">
        <div className="modal-header">
          <h3>Edit User Role</h3>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="user-info-section">
            <div className="user-avatar-large">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="user-email">{user?.email}</div>
              <div className="user-uid">UID: {user?.uid?.slice(0, 12)}...</div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select New Role</label>
            <div className="role-options">
              {Object.entries(ROLE_CONFIG).map(([roleKey, roleData]) => {
                const Icon = roleData.icon;
                return (
                  <label
                    key={roleKey}
                    className={`role-option-card ${
                      selectedRole === roleKey ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={roleKey}
                      checked={selectedRole === roleKey}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      disabled={loading}
                    />
                    <div
                      className="role-option-icon"
                      style={{
                        backgroundColor: roleData.bgColor,
                        color: roleData.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="role-option-label">{roleData.label}</span>
                    {selectedRole === roleKey && (
                      <CheckCircle size={18} className="role-check" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader size={16} className="spinning" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== ACTION BUTTONS ====================
const ActionButtons = React.memo(({ user, onEdit, onDelete, disabled }) => {
  return (
    <div className="action-buttons">
      <button
        className="action-btn edit"
        onClick={() => onEdit(user)}
        disabled={disabled}
        title="Edit Role"
      >
        <Edit2 size={16} />
      </button>
      <button
        className="action-btn delete"
        onClick={() => onDelete(user)}
        disabled={disabled}
        title="Delete User"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
});

// ==================== USER TABLE ====================
const UserTable = React.memo(({
  users,
  onEdit,
  onDelete,
  loading,
  sortConfig,
  onSort,
}) => {
  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => onSort("email")} className="sortable">
              <div className="th-content">
                Email
                {getSortIcon("email")}
              </div>
            </th>
            <th onClick={() => onSort("role")} className="sortable">
              <div className="th-content">
                Role
                {getSortIcon("role")}
              </div>
            </th>
            <th>UID</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-state">
                <Users size={48} />
                <p>No users found</p>
                <span>Try adjusting your search or filters</span>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.uid}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-email">{user.email}</span>
                  </div>
                </td>
                <td>
                  <RoleBadge role={user.role} />
                </td>
                <td>
                  <span className="uid-text">{user.uid?.slice(0, 12)}...</span>
                </td>
                <td>
                  <ActionButtons
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    disabled={loading}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function UserManagement() {
  // State Management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "email", direction: "asc" });

  // Modal State
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Toast State
  const [toast, setToast] = useState({ message: "", type: "" });

  /**
   * Fetch all users on component mount
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      showToast("Failed to load users. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user deletion
   */
  const handleDelete = useCallback(async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      const res = await fetch(`${API}/api/users/${selectedUser.uid}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((u) => u.uid !== selectedUser.uid));
      showToast("User deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      showToast("Failed to delete user. Please try again.", "error");
    } finally {
      setActionLoading(false);
    }
  }, [selectedUser]);

  /**
   * Handle role update
   */
  const handleUpdateRole = useCallback(
    async (newRole) => {
      if (!selectedUser || !newRole) return;

      try {
        setActionLoading(true);
        const res = await fetch(`${API}/api/users/${selectedUser.uid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        });

        if (!res.ok) throw new Error("Failed to update role");

        setUsers((prev) =>
          prev.map((u) =>
            u.uid === selectedUser.uid ? { ...u, role: newRole } : u
          )
        );

        showToast("Role updated successfully", "success");
        setShowRoleModal(false);
        setSelectedUser(null);
      } catch (err) {
        console.error("Error updating role:", err);
        showToast("Failed to update role. Please try again.", "error");
      } finally {
        setActionLoading(false);
      }
    },
    [selectedUser]
  );

  /**
   * Open edit role modal
   */
  const openEditModal = useCallback((user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  }, []);

  /**
   * Open delete confirmation modal
   */
  const openDeleteModal = useCallback((user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }, []);

  /**
   * Show toast notification
   */
  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast({ message: "", type: "" });
  }, []);

  /**
   * Filter and search users
   */
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.email?.toLowerCase().includes(query) ||
          u.uid?.toLowerCase().includes(query) ||
          u.role?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [users, filterRole, searchQuery, sortConfig]);

  /**
   * Handle column sorting
   */
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  /**
   * Calculate statistics
   */
  const stats = useMemo(() => {
    const total = users.length;
    const byRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      admin: byRole.admin || 0,
      dean: byRole.dean || 0,
      instructor: byRole.instructor || 0,
      student: byRole.student || 0,
    };
  }, [users]);

  return (
    <div className="user-management">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">
            Manage system users, roles, and permissions
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={stats.total}
          icon={Users}
          color={COLORS.accent}
          bgColor={COLORS.lightest}
        />
        <StatsCard
          title="Admins"
          value={stats.admin}
          icon={Shield}
          color={ROLE_CONFIG.admin.color}
          bgColor={ROLE_CONFIG.admin.bgColor}
        />
        <StatsCard
          title="Deans"
          value={stats.dean}
          icon={UserCheck}
          color={ROLE_CONFIG.dean.color}
          bgColor={ROLE_CONFIG.dean.bgColor}
        />
        <StatsCard
          title="Instructors"
          value={stats.instructor}
          icon={Users}
          color={ROLE_CONFIG.instructor.color}
          bgColor={ROLE_CONFIG.instructor.bgColor}
        />
      </div>

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by email, UID, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            className="filter-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            {Object.entries(ROLE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        <div className="results-count">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* User Table */}
      {loading ? (
        <div className="loading-state">
          <Loader size={48} className="spinning" />
          <p>Loading users...</p>
        </div>
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          loading={actionLoading}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      )}

      {/* Role Edit Modal */}
      <RoleEditModal
        show={showRoleModal}
        onClose={() => {
          setShowRoleModal(false);
          setSelectedUser(null);
        }}
        onSave={handleUpdateRole}
        loading={actionLoading}
        user={selectedUser}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
        loading={actionLoading}
        user={selectedUser}
      />

      {/* Styles */}
      <style jsx>{`
        .user-management {
          padding: 0;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
        }

        /* ===== PAGE HEADER ===== */
        .page-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0;
        }

        .page-subtitle {
          font-size: 1rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-left: 4px solid;
          transition: all 0.3s ease;
        }

        .stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .stats-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-content {
          flex: 1;
        }

        .stats-label {
          font-size: 0.875rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin-bottom: 0.25rem;
        }

        .stats-value {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        /* ===== CONTROLS SECTION ===== */
        .controls-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .search-bar {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.light};
          box-shadow: 0 0 0 4px rgba(0, 180, 216, 0.1);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: ${COLORS.secondary};
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 12px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 150px;
        }

        .filter-select:focus {
          outline: none;
          border-color: ${COLORS.light};
        }

        .results-count {
          margin-left: auto;
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          font-weight: 500;
        }

        /* ===== TABLE ===== */
        .table-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table thead {
          background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
          color: white;
        }

        .user-table th {
          padding: 1.25rem 1.5rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .user-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: background 0.2s ease;
        }

        .user-table th.sortable:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .th-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-table tbody tr {
          border-bottom: 1px solid ${COLORS.lightest};
          transition: background 0.2s ease;
        }

        .user-table tbody tr:hover {
          background: ${COLORS.lightest}40;
        }

        .user-table tbody tr:last-child {
          border-bottom: none;
        }

        .user-table td {
          padding: 1.25rem 1.5rem;
          color: ${COLORS.secondary};
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.light});
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .user-email {
          font-weight: 500;
          color: ${COLORS.primary};
        }

        .uid-text {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .actions-column {
          width: 120px;
        }

        /* ===== ROLE BADGE ===== */
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* ===== ACTION BUTTONS ===== */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
                    align-items: center;
          justify-content: center;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.edit {
          background-color: ${COLORS.lightest};
          color: ${COLORS.accent};
        }

        .action-btn.delete {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .empty-state svg {
          margin-bottom: 1rem;
          color: ${COLORS.light};
        }

        .empty-state p {
          font-weight: 600;
          font-size: 1.1rem;
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
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 480px;
          padding: 2rem;
          animation: slideInUp 0.3s ease;
        }

        .confirmation-modal h3 {
          margin-bottom: 1rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        .confirmation-modal p {
          color: ${COLORS.secondary};
          margin-bottom: 2rem;
          text-align: center;
        }

        .modal-icon-warning {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          color: #f59e0b;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .btn-primary,
        .btn-secondary,
        .btn-danger {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: ${COLORS.accent};
          color: white;
        }

        .btn-primary:hover {
          background: ${COLORS.primary};
        }

        .btn-secondary {
          background: ${COLORS.lightest};
          color: ${COLORS.primary};
        }

        .btn-secondary:hover {
          background: ${COLORS.lighter};
        }

        .btn-danger {
          background: #dc2626;
          color: white;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        /* ===== ROLE EDIT MODAL ===== */
        .role-edit-modal .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .modal-close {
          background: none;
          border: none;
          color: ${COLORS.secondary};
          cursor: pointer;
        }

        .user-info-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .user-avatar-large {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.light});
          color: white;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .user-email {
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .user-uid {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .role-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .role-option-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          border: 2px solid transparent;
          background: ${COLORS.lightest};
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .role-option-card.selected {
          border-color: ${COLORS.accent};
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .role-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-option-label {
          font-weight: 500;
          color: ${COLORS.primary};
        }

        .role-check {
          position: absolute;
          top: 8px;
          right: 8px;
          color: ${COLORS.accent};
        }

        .modal-footer {
          margin-top: 1.5rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        /* ===== TOAST ===== */
        .toast-notification {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          background: white;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: slideInRight 0.4s ease;
          z-index: 2000;
        }

        .toast-notification.success {
          border-left: 5px solid #10b981;
          color: #065f46;
        }

        .toast-notification.error {
          border-left: 5px solid #dc2626;
          color: #7f1d1d;
        }

        .toast-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
        }

        /* ===== LOADING STATE ===== */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: ${COLORS.secondary};
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }

          .results-count {
            align-self: flex-start;
          }

          .stats-card {
            padding: 1rem;
          }

          .user-table th,
          .user-table td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
