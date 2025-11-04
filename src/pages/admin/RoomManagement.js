// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Alert,
//   Badge,
// } from "react-bootstrap";

// const RoomManagement = () => {
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("building");
//   const [selectedBuilding, setSelectedBuilding] = useState(null);
//   const [formData, setFormData] = useState({ name: "", building_id: "" });

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // ✅ Fetch all buildings with rooms
//   const fetchBuildings = async () => {
//     try {
//       const res = await fetch(`${API}/api/buildings`);
//       if (!res.ok) throw new Error("Failed to fetch buildings");
//       const data = await res.json();
//       setBuildings(data);
//     } catch (err) {
//       console.error("Error fetching buildings:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add Building or Room
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const url =
//         modalType === "building"
//           ? `${API}/api/buildings`
//           : `${API}/api/rooms`;

//       const payload =
//         modalType === "building"
//           ? { name: formData.name }
//           : { name: formData.name, buildingId: selectedBuilding.id };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to add");
//       await fetchBuildings();
//       handleClose();
//     } catch (err) {
//       console.error("Error adding:", err);
//       alert(err.message);
//     }
//   };

//   // ✅ Delete Building or Room
//   const handleDelete = async (type, id) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete this ${type}?`
//     );
//     if (!confirmDelete) return;

//     try {
//       const url =
//         type === "building"
//           ? `${API}/api/buildings/${id}`
//           : `${API}/api/rooms/${id}`;

//       const res = await fetch(url, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete");
//       await fetchBuildings();
//     } catch (err) {
//       console.error("Error deleting:", err);
//       alert(err.message);
//     }
//   };

//   // ✅ Modal Controls
//   const handleShow = (type, building = null) => {
//     setModalType(type);
//     setSelectedBuilding(building);
//     setFormData({ name: "", building_id: building?.id || "" });
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setFormData({ name: "", building_id: "" });
//   };

//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2">Loading buildings and rooms...</span>
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="shadow-sm">
//         {error}
//       </Alert>
//     );

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Room Management</h2>
//         <Button variant="primary" onClick={() => handleShow("building")}>
//           + Add Building
//         </Button>
//       </div>

//       {buildings.length === 0 ? (
//         <Alert variant="info" className="shadow-sm">
//           No buildings available.
//         </Alert>
//       ) : (
//         buildings.map((b) => (
//           <Card key={b.id} className="mb-4 border-0 shadow-sm">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
//               <span className="fw-semibold">{b.name}</span>
//               <div>
//                 <Badge bg="light" text="dark" className="me-2">
//                   {b.rooms?.length || 0} Rooms
//                 </Badge>
//                 <Button
//                   variant="light"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => handleShow("room", b)}
//                 >
//                   + Room
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete("building", b.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </Card.Header>
//             <Card.Body>
//               {b.rooms && b.rooms.length > 0 ? (
//                 <div className="d-flex flex-wrap gap-3">
//                   {b.rooms.map((room) => (
//                     <Card key={room.id} className="p-3 border-0 shadow-sm">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h6 className="fw-bold text-primary mb-0">
//                           {room.name}
//                         </h6>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDelete("room", room.id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No rooms yet in this building.</p>
//               )}
//             </Card.Body>
//           </Card>
//         ))
//       )}

//       {/* ✅ Add Building / Room Modal */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Add {modalType === "building" ? "Building" : "Room"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAdd}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder={`Enter ${modalType} name`}
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>

//             {modalType === "room" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Building</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={selectedBuilding?.name || ""}
//                   disabled
//                 />
//               </Form.Group>
//             )}

//             <div className="text-end">
//               <Button variant="secondary" onClick={handleClose} className="me-2">
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default RoomManagement;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  DoorOpen,
  X,
  Home
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
// 🏠 ROOM CARD COMPONENT
// ========================================
const RoomCard = React.memo(({ room, onEdit, onDelete }) => {
  return (
    <div className="room-card">
      <div className="room-header">
        <div className="room-info">
          <DoorOpen size={20} className="room-icon" />
          <h6 className="room-name">{room.name}</h6>
        </div>
        <div className="room-actions">
          <button
            onClick={() => onEdit(room)}
            className="btn-icon btn-edit"
            title="Edit Room"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(room)}
            className="btn-icon btn-delete"
            title="Delete Room"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
});

// ========================================
// 🏢 BUILDING CARD COMPONENT
// ========================================
const BuildingCard = React.memo(({ 
  building, 
  onAddRoom, 
  onEditBuilding, 
  onDeleteBuilding,
  onEditRoom,
  onDeleteRoom 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="building-card">
      <div className="building-header">
        <div className="building-info">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-btn"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>▶</span>
          </button>
          <Building2 size={24} className="building-icon" />
          <div>
            <h5 className="building-name">{building.name}</h5>
            <span className="room-count">
              {building.rooms?.length || 0} {building.rooms?.length === 1 ? 'Room' : 'Rooms'}
            </span>
          </div>
        </div>
        <div className="building-actions">
          <button
            onClick={() => onAddRoom(building)}
            className="btn btn-sm btn-primary"
          >
            <Plus size={16} />
            Add Room
          </button>
          <button
            onClick={() => onEditBuilding(building)}
            className="btn-icon btn-edit"
            title="Edit Building"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDeleteBuilding(building)}
            className="btn-icon btn-delete"
            title="Delete Building"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="building-body">
          {building.rooms && building.rooms.length > 0 ? (
            <div className="rooms-grid">
              {building.rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onEdit={onEditRoom}
                  onDelete={onDeleteRoom}
                />
              ))}
            </div>
          ) : (
            <div className="empty-rooms">
              <DoorOpen size={32} className="empty-icon" />
              <p>No rooms in this building yet.</p>
              <button
                onClick={() => onAddRoom(building)}
                className="btn btn-sm btn-outline"
              >
                <Plus size={14} />
                Add First Room
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

// ========================================
// 📝 ADD/EDIT MODAL COMPONENT
// ========================================
const EntityModal = React.memo(({ 
  show, 
  onClose, 
  onSave, 
  type, 
  entity,
  building,
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const isEditMode = !!entity;
  const isRoom = type === "room";

  useEffect(() => {
    if (entity) {
      setFormData({ name: entity.name });
    } else {
      setFormData({ name: "" });
    }
    setErrors({});
  }, [entity, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = `${isRoom ? 'Room' : 'Building'} name is required`;
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
            {isRoom ? <DoorOpen size={24} /> : <Building2 size={24} />}
            <h3>
              {isEditMode ? 'Edit' : 'Add'} {isRoom ? 'Room' : 'Building'}
            </h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="entityName">
              {isRoom ? 'Room' : 'Building'} Name *
            </label>
            <input
              id="entityName"
              type="text"
              placeholder={`e.g., ${isRoom ? 'Room 101, Lab A' : 'Main Building, Science Wing'}`}
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className={errors.name ? "input-error" : ""}
              disabled={isSubmitting}
              autoFocus
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {isRoom && building && (
            <div className="form-group">
              <label>Building</label>
              <input
                type="text"
                value={building.name}
                disabled
                className="input-disabled"
              />
            </div>
          )}

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
                  {isEditMode ? 'Update' : 'Add'} {isRoom ? 'Room' : 'Building'}
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
const DeleteModal = React.memo(({ 
  show, 
  onClose, 
  onConfirm, 
  entity, 
  type,
  isDeleting 
}) => {
  if (!show) return null;

  const isBuilding = type === "building";
  const roomCount = isBuilding ? entity?.rooms?.length || 0 : 0;

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
            Are you sure you want to delete <strong>{entity?.name}</strong>?
          </p>
          {isBuilding && roomCount > 0 && (
            <div className="warning-box">
              <AlertCircle size={16} />
              <span>
                This building has {roomCount} room(s). All rooms will also be deleted.
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
                Delete {type === "building" ? 'Building' : 'Room'}
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
const RoomManagement = () => {
  // State management
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // Modal states
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("building");
  const [editingEntity, setEditingEntity] = useState(null);
  const [deletingEntity, setDeletingEntity] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ========================================
  // 📡 FETCH BUILDINGS
  // ========================================
  const fetchBuildings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API}/api/buildings`);
      if (!res.ok) throw new Error("Failed to fetch buildings");
      const data = await res.json();
      setBuildings(data);
    } catch (err) {
      console.error("Error fetching buildings:", err);
      setError(err.message);
      showToast("Failed to load buildings", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

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
  // 📊 FILTERED BUILDINGS
  // ========================================
  const filteredBuildings = useMemo(() => {
    if (!searchQuery.trim()) return buildings;

    return buildings.filter(building => {
      const buildingMatch = building.name.toLowerCase().includes(searchQuery.toLowerCase());
      const roomMatch = building.rooms?.some(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return buildingMatch || roomMatch;
    });
  }, [buildings, searchQuery]);

  // ========================================
  // 📈 STATISTICS
  // ========================================
  const stats = useMemo(() => {
    const totalBuildings = buildings.length;
    const totalRooms = buildings.reduce((sum, b) => sum + (b.rooms?.length || 0), 0);
    return { totalBuildings, totalRooms };
  }, [buildings]);

  // ========================================
  // ➕ ADD/EDIT ENTITY
  // ========================================
  const handleSaveEntity = useCallback(async (formData) => {
    setIsSubmitting(true);

    try {
      const isEdit = !!editingEntity;
      const isRoom = modalType === "room";

      let url, method, payload;

      if (isRoom) {
        url = isEdit 
          ? `${API}/api/rooms/${editingEntity.id}`
          : `${API}/api/rooms`;
        method = isEdit ? "PUT" : "POST";
        payload = {
          name: formData.name,
          buildingId: selectedBuilding.id
        };
      } else {
        url = isEdit
          ? `${API}/api/buildings/${editingEntity.id}`
          : `${API}/api/buildings`;
        method = isEdit ? "PUT" : "POST";
        payload = { name: formData.name };
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${isEdit ? 'update' : 'add'}`);
      }

      await fetchBuildings();
      setShowEntityModal(false);
      setEditingEntity(null);
      setSelectedBuilding(null);
      
      showToast(
        `${isRoom ? 'Room' : 'Building'} ${isEdit ? 'updated' : 'added'} successfully!`,
        "success"
      );
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [editingEntity, modalType, selectedBuilding, fetchBuildings, showToast]);

  // ========================================
  // 🗑️ DELETE ENTITY
  // ========================================
  const handleDeleteEntity = useCallback(async () => {
    if (!deletingEntity) return;

    setIsDeleting(true);

    try {
      const isBuilding = deletingEntity.type === "building";
      const url = isBuilding
        ? `${API}/api/buildings/${deletingEntity.entity.id}`
        : `${API}/api/rooms/${deletingEntity.entity.id}`;

      const res = await fetch(url, { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete");
      }

      await fetchBuildings();
      setShowDeleteModal(false);
      setDeletingEntity(null);
      
      showToast(
        `${isBuilding ? 'Building' : 'Room'} deleted successfully!`,
        "success"
      );
    } catch (err) {
      console.error("Delete error:", err);
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingEntity, fetchBuildings, showToast]);

  // ========================================
  // 🎬 MODAL HANDLERS
  // ========================================
  const openAddBuildingModal = useCallback(() => {
    setModalType("building");
    setEditingEntity(null);
    setSelectedBuilding(null);
    setShowEntityModal(true);
  }, []);

  const openAddRoomModal = useCallback((building) => {
    setModalType("room");
    setEditingEntity(null);
    setSelectedBuilding(building);
    setShowEntityModal(true);
  }, []);

  const openEditBuildingModal = useCallback((building) => {
    setModalType("building");
    setEditingEntity(building);
    setSelectedBuilding(null);
    setShowEntityModal(true);
  }, []);

  const openEditRoomModal = useCallback((room) => {
    setModalType("room");
    setEditingEntity(room);
    // Find the building this room belongs to
    const building = buildings.find(b => 
      b.rooms?.some(r => r.id === room.id)
    );
    setSelectedBuilding(building);
    setShowEntityModal(true);
  }, [buildings]);

  const openDeleteModal = useCallback((entity, type) => {
    setDeletingEntity({ entity, type });
    setShowDeleteModal(true);
  }, []);

  const closeModals = useCallback(() => {
    setShowEntityModal(false);
    setShowDeleteModal(false);
    setEditingEntity(null);
    setDeletingEntity(null);
    setSelectedBuilding(null);
  }, []);

  // ========================================
  // 🎨 RENDER
  // ========================================
  return (
    <div className="room-management">
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
            <Building2 size={32} />
          </div>
          <div>
            <h2 className="page-title">Room Management</h2>
            <p className="page-subtitle">
              Manage buildings and classrooms for scheduling
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={fetchBuildings}
            className="btn btn-outline"
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "spinning" : ""} />
            Refresh
          </button>
          <button
            onClick={openAddBuildingModal}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add Building
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <Building2 size={20} />
          <div>
            <div className="stat-value">{stats.totalBuildings}</div>
            <div className="stat-label">Total Buildings</div>
          </div>
        </div>
        <div className="stat-card">
          <DoorOpen size={20} />
          <div>
            <div className="stat-value">{stats.totalRooms}</div>
            <div className="stat-label">Total Rooms</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search buildings or rooms..."
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
      <div className="content-area">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large" />
            <p>Loading buildings and rooms...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <XCircle size={48} />
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={fetchBuildings} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : filteredBuildings.length === 0 ? (
          <div className="empty-state">
            <Home size={64} className="empty-icon" />
            <h3>
              {searchQuery 
                ? "No buildings or rooms match your search"
                : "No Buildings Yet"}
            </h3>
            <p>
              {searchQuery 
                ? "Try adjusting your search criteria"
                : "Get started by adding your first building"}
            </p>
            {!searchQuery && (
              <button onClick={openAddBuildingModal} className="btn btn-primary">
                <Plus size={18} />
                Add First Building
              </button>
            )}
          </div>
        ) : (
          <div className="buildings-list">
            {filteredBuildings.map((building) => (
              <BuildingCard
                key={building.id}
                building={building}
                onAddRoom={openAddRoomModal}
                onEditBuilding={openEditBuildingModal}
                onDeleteBuilding={(b) => openDeleteModal(b, "building")}
                onEditRoom={openEditRoomModal}
                onDeleteRoom={(r) => openDeleteModal(r, "room")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <EntityModal
        show={showEntityModal}
        onClose={closeModals}
        onSave={handleSaveEntity}
        type={modalType}
        entity={editingEntity}
        building={selectedBuilding}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleDeleteEntity}
        entity={deletingEntity?.entity}
        type={deletingEntity?.type}
        isDeleting={isDeleting}
      />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .room-management {
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

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.85rem;
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
          justify-content: flex-end;
}
          padding: 8px;
border-radius: 50%;
transition: background 0.2s ease;
}
    .clear-search:hover {
      background: #f0f0f0;
    }

    /* Content Area */
    .content-area {
      min-height: 400px;
    }

    .loading-state,
    .error-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 20px;
      color: #6c757d;
    }

    .loading-state .spinner-large {
      width: 40px;
      height: 40px;
      border: 4px solid #e9ecef;
      border-top: 4px solid #0077B6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .error-state h3,
    .empty-state h3 {
      color: #03045E;
      margin-top: 16px;
    }

    .empty-state p {
      margin-top: 4px;
      color: #6c757d;
      max-width: 400px;
    }

    .empty-state .btn {
      margin-top: 16px;
    }

    /* Building List */
    .buildings-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .building-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .building-card:hover {
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .building-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #f1f1f1;
      background: #f8f9fa;
    }

    .building-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .building-icon {
      color: #0077B6;
    }

    .building-name {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }

    .room-count {
      font-size: 0.85rem;
      color: #6c757d;
    }

    .building-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6c757d;
      font-size: 1.2rem;
      transform: rotate(0deg);
      transition: transform 0.2s ease;
    }

    .chevron.expanded {
      transform: rotate(90deg);
    }

    /* Room Grid */
    .building-body {
      padding: 16px 20px;
      background: #fff;
    }

    .rooms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .room-card {
      border: 1px solid #dee2e6;
      border-radius: 10px;
      padding: 14px 16px;
      background: #fafafa;
      transition: background 0.2s ease, box-shadow 0.3s ease;
    }

    .room-card:hover {
      background: #f0f8ff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .room-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .room-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #03045E;
      margin: 0;
    }

    .room-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      color: #6c757d;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .btn-icon:hover {
      background: #e9ecef;
      color: #0077B6;
    }

    .btn-edit {
      color: #0077B6;
    }

    .btn-delete {
      color: #dc3545;
    }

    /* Empty Rooms */
    .empty-rooms {
      text-align: center;
      padding: 24px;
      color: #6c757d;
    }

    .empty-rooms .empty-icon {
      color: #adb5bd;
      margin-bottom: 12px;
    }

    /* Modals */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 100%;
      max-width: 450px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      animation: popIn 0.3s ease;
    }

    @keyframes popIn {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .modal-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-group label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .form-group input {
      padding: 10px 12px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }

    .form-group input:focus {
      border-color: #0077B6;
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
    }

    .input-error {
      border-color: #dc3545 !important;
    }

    .error-text {
      color: #dc3545;
      font-size: 0.85rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 16px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .close-btn:hover {
      color: #000;
    }

    .modal-sm {
      max-width: 400px;
    }

    .warning-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fff3cd;
      color: #856404;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #e9ecef;
      border-top: 2px solid #0077B6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 6px;
    }
  `}</style>
</div>
);
};
export default RoomManagement;