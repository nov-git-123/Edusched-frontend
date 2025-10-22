// // src/components/RoomsPage.js
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// export default function RoomsPage() {
//   const [buildings, setBuildings] = useState([]);
//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuilding, setNewBuilding] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });

//   // ✅ Fetch buildings with rooms
//   useEffect(() => {
//     fetch("http://localhost:5000/api/buildings")
//       .then((res) => res.json())
//       .then((data) => setBuildings(data))
//       .catch((err) => console.error("Error fetching buildings:", err));
//   }, []);

//   // ✅ Add Building
//   const handleAddBuilding = async () => {
//     if (!newBuilding.trim()) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/buildings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuilding }),
//       });
//       const saved = await res.json();
//       setBuildings([...buildings, { ...saved, rooms: [] }]); // ensure rooms array exists
//       setNewBuilding("");
//       setShowBuildingModal(false);
//     } catch (err) {
//       console.error("Error adding building:", err);
//     }
//   };

//   // ✅ Add Room
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/rooms", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newRoom),
//       });
//       const saved = await res.json();

//       // Update UI with new room
//       setBuildings((prev) =>
//         prev.map((b) =>
//           b.id === newRoom.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), saved] }
//             : b
//         )
//       );

//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//     } catch (err) {
//       console.error("Error adding room:", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">🏫 Manage Buildings & Rooms</h2>

//       {/* Buttons */}
//       <div className="mb-3">
//         <Button variant="primary" className="me-2" onClick={() => setShowBuildingModal(true)}>
//           ➕ Add Building
//         </Button>

//         {/* ✅ Only show Add Room if building exists */}
//         {buildings.length > 0 && (
//           <Button variant="success" onClick={() => setShowRoomModal(true)}>
//             ➕ Add Room
//           </Button>
//         )}
//       </div>

//       {/* Display Buildings & Rooms */}
//       {buildings.map((building) => (
//         <div key={building.id} className="mb-4">
//           <h4 className="text-primary">{building.name}</h4>
//           {building.rooms && building.rooms.length > 0 ? (
//             <div className="row">
//               {building.rooms.map((room) => (
//                 <div key={room.id} className="col-md-4 mb-3">
//                   <div className="card shadow-sm">
//                     <div className="card-body">
//                       <h5 className="card-title">{room.name}</h5>
//                       {/* Schedule Table */}
//                       <table className="table table-bordered text-center">
//                         <thead>
//                           <tr>
//                             <th>Day</th>
//                             <th>Schedule</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day) => (
//                             <tr key={day}>
//                               <td>{day}</td>
//                               <td>{room.schedule?.[day] || "Available"}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted">No rooms yet in this building.</p>
//           )}
//         </div>
//       ))}

//       {/* Modal for Adding Building */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Building</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             type="text"
//             placeholder="Enter building name"
//             value={newBuilding}
//             onChange={(e) => setNewBuilding(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBuildingModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleAddBuilding}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for Adding Room */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Select
//             value={newRoom.buildingId}
//             onChange={(e) => setNewRoom({ ...newRoom, buildingId: Number(e.target.value) })} // ✅ Convert to number
//             className="mb-3"
//           >
//             <option value="">Select Building</option>
//             {buildings.map((b) => (
//               <option key={b.id} value={b.id}>{b.name}</option>
//             ))}
//           </Form.Select>
//           <Form.Control
//             type="text"
//             placeholder="Enter room name (e.g., Main-101)"
//             value={newRoom.name}
//             onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoomModal(false)}>Cancel</Button>
//           <Button variant="success" onClick={handleAddRoom}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// src/components/RoomsPage.js
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// export default function RoomsPage() {
//   const [buildings, setBuildings] = useState([]);
//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuilding, setNewBuilding] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // fetch buildings with rooms
//   const loadBuildings = async () => {
//     try {
//       const res = await fetch(`${API}/api/buildings`);
//       const data = await res.json();
//       setBuildings(data);
//     } catch (err) {
//       console.error("Error fetching buildings:", err);
//     }
//   };

//   useEffect(() => {
//     loadBuildings();
//   }, []);

//   // Add Building
//   const handleAddBuilding = async () => {
//     if (!newBuilding.trim()) return;
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuilding }),
//       });
//       const saved = await res.json();
//       // append to UI
//       setBuildings(prev => [saved, ...prev]);
//       setNewBuilding("");
//       setShowBuildingModal(false);
//     } catch (err) {
//       console.error("Error adding building:", err);
//     }
//   };

//   // Add Room
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId),
//         }),
//       });
//       const saved = await res.json();
//       // Update UI: push the new room into the corresponding building
//       setBuildings(prev =>
//         prev.map(b => (b.id === saved.buildingId ? { ...b, rooms: [...(b.rooms||[]), saved] } : b))
//       );
//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//     } catch (err) {
//       console.error("Error adding room:", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">🏫 Manage Buildings & Rooms</h2>

//       <div className="mb-3">
//         <Button variant="primary" className="me-2" onClick={() => setShowBuildingModal(true)}>➕ Add Building</Button>
//         {buildings.length > 0 && (
//           <Button variant="success" onClick={() => setShowRoomModal(true)}>➕ Add Room</Button>
//         )}
//       </div>

//       {buildings.length === 0 ? (
//         <p className="text-muted">No buildings yet. Add one to start adding rooms.</p>
//       ) : (
//         buildings.map(b => (
//           <div key={b.id} className="mb-4">
//             <h4 className="text-primary">{b.name}</h4>
//             {b.rooms && b.rooms.length > 0 ? (
//               <div className="row">
//                 {b.rooms.map(room => (
//                   <div key={room.id} className="col-md-4 mb-3">
//                     <div className="card shadow-sm">
//                       <div className="card-body">
//                         <h5 className="card-title">{room.name}</h5>
//                         <table className="table table-bordered text-center">
//                           <thead>
//                             <tr>
//                               <th>Day</th><th>Schedule</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => (
//                               <tr key={day}>
//                                 <td>{day}</td>
//                                 <td>{room.schedule?.[day] || "Available"}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-muted">No rooms yet in this building.</p>
//             )}
//           </div>
//         ))
//       )}

//       {/* Add Building Modal */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton><Modal.Title>Add Building</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form.Control type="text" placeholder="Enter building name" value={newBuilding} onChange={(e)=>setNewBuilding(e.target.value)} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={()=>setShowBuildingModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleAddBuilding}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Room Modal */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton><Modal.Title>Add Room</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form.Select value={newRoom.buildingId} onChange={(e)=>setNewRoom({...newRoom, buildingId: e.target.value})} className="mb-3">
//             <option value="">Select Building</option>
//             {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
//           </Form.Select>
//           <Form.Control type="text" placeholder="Room name e.g., Main-101" value={newRoom.name} onChange={(e)=>setNewRoom({...newRoom, name: e.target.value})} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={()=>setShowRoomModal(false)}>Cancel</Button>
//           <Button variant="success" onClick={handleAddRoom}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// SCISPACE

// import React, { useState, useEffect } from "react"; 
// import { Button, Modal, Form, Card, Badge, Spinner, Alert } from "react-bootstrap";
// import { FaPlus, FaBuilding, FaDoorOpen } from "react-icons/fa";

// const RoomManagement = () => {
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuildingName, setNewBuildingName] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // ✅ Fetch all buildings with rooms - CORRECTED VERSION
//   const fetchBuildings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Use the correct endpoint that returns buildings with rooms
//       const res = await fetch(`${API}/api/buildings`); // NOT /api/rooms
      
//       if (!res.ok) {
//         throw new Error(`Failed to fetch buildings: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log("✅ Fetched buildings data:", data);
      
//       // The API already returns the correct structure, just ensure rooms array exists
//       const processedBuildings = data.map(building => ({
//         ...building,
//         rooms: building.rooms || [] // Ensure rooms is always an array
//       }));
      
//       setBuildings(processedBuildings);
//       console.log("✅ Processed buildings:", processedBuildings);
      
//     } catch (err) {
//       console.error("❌ Error fetching buildings:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   // Handle adding new building
//   const handleAddBuilding = async () => {
//     if (!newBuildingName.trim()) return;
    
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuildingName }),
//       });
      
//       if (!res.ok) throw new Error("Failed to add building");
      
//       const savedBuilding = await res.json();
//       console.log("✅ Building added:", savedBuilding);
      
//       // Add the new building with empty rooms array
//       const buildingWithRooms = {
//         ...savedBuilding,
//         rooms: []
//       };
      
//       setBuildings(prev => [buildingWithRooms, ...prev]);
//       setNewBuildingName("");
//       setShowBuildingModal(false);
      
//     } catch (err) {
//       console.error("❌ Error adding building:", err);
//       setError("Failed to add building");
//     }
//   };

//   // Handle adding new room - FIXED VERSION
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
    
//     try {
//       console.log("🚪 Adding room:", newRoom);
      
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId),
//         }),
//       });
      
//       if (!res.ok) throw new Error("Failed to add room");
      
//       const savedRoom = await res.json();
//       console.log("✅ Room added:", savedRoom);

//       // Update the specific building's rooms array
//       const targetBuildingId = Number(newRoom.buildingId);
      
//       setBuildings(prevBuildings => {
//         return prevBuildings.map(building => {
//           if (building.id === targetBuildingId) {
//             console.log(`✅ Adding room to building: ${building.name}`);
//             return {
//               ...building,
//               rooms: [...building.rooms, savedRoom]
//             };
//           }
//           return building;
//         });
//       });

//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
      
//       console.log("✅ Room addition completed");
      
//     } catch (err) {
//       console.error("❌ Error adding room:", err);
//       setError("Failed to add room");
//     }
//   };

//   // Manual refresh function
//   const handleRefresh = () => {
//     console.log("🔄 Manual refresh triggered");
//     fetchBuildings();
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2">Loading buildings and rooms...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold mb-0">Room Management</h2>
//         <Button variant="outline-secondary" size="sm" onClick={handleRefresh}>
//           Refresh Data
//         </Button>
//       </div>

//       {error && (
//         <Alert variant="danger" className="shadow-sm mb-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <span>{error}</span>
//             <Button variant="outline-danger" size="sm" onClick={() => setError(null)}>
//               Dismiss
//             </Button>
//           </div>
//         </Alert>
//       )}

//       {/* Add Building/Room Buttons */}
//       <div className="mb-3">
//         <Button
//           variant="primary"
//           className="me-2"
//           onClick={() => setShowBuildingModal(true)}
//         >
//           <FaBuilding className="me-2" />
//           Add Building
//         </Button>
//         {buildings.length > 0 && (
//           <Button
//             variant="success"
//             onClick={() => setShowRoomModal(true)}
//           >
//             <FaDoorOpen className="me-2" />
//             Add Room
//           </Button>
//         )}
//       </div>

//       {/* Buildings Display */}
//       {buildings.length === 0 ? (
//         <Alert variant="info" className="shadow-sm">
//           No buildings available. Add a building to get started.
//         </Alert>
//       ) : (
//         buildings.map((building) => (
//           <Card key={building.id} className="mb-4 border-0 shadow-sm">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
//               <span className="fw-semibold">{building.name}</span>
//               <Badge bg="light" text="dark">
//                 {building.rooms?.length || 0} Rooms
//               </Badge>
//             </Card.Header>
//             <Card.Body>
//               {building.rooms && building.rooms.length > 0 ? (
//                 <div className="row">
//                   {building.rooms.map((room) => (
//                     <div key={room.id} className="col-md-4 mb-3">
//                       <Card className="shadow-sm border-0 h-100">
//                         <Card.Body>
//                           <h5 className="fw-bold text-primary">{room.name}</h5>
//                           <p className="text-muted small mb-2">Room ID: {room.id}</p>
//                           <table className="table table-sm table-bordered text-center align-middle mb-0">
//                             <thead className="table-light">
//                               <tr>
//                                 <th>Day</th>
//                                 <th>Schedule</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
//                                 <tr key={day}>
//                                   <td>{day}</td>
//                                   <td className="fw-medium">
//                                     {room.schedule?.[day] || (
//                                       <span className="text-success">
//                                         Available
//                                       </span>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No rooms yet in this building.</p>
//               )}
//             </Card.Body>
//           </Card>
//         ))
//       )}

//       {/* Add Building Modal */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Building</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             type="text"
//             placeholder="Enter building name"
//             value={newBuildingName}
//             onChange={(e) => setNewBuildingName(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleAddBuilding()}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBuildingModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="primary" 
//             onClick={handleAddBuilding}
//             disabled={!newBuildingName.trim()}
//           >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Room Modal */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Select
//             value={newRoom.buildingId}
//             onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
//             className="mb-3"
//           >
//             <option value="">Select Building</option>
//             {buildings.map((building) => (
//               <option key={building.id} value={building.id}>
//                 {building.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Form.Control
//             type="text"
//             placeholder="Room name e.g., Main-101"
//             value={newRoom.name}
//             onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//             onKeyPress={(e) => e.key === 'Enter' && handleAddRoom()}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="success" 
//             onClick={handleAddRoom}
//             disabled={!newRoom.name.trim() || !newRoom.buildingId}
//           >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoomManagement;

//functional
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Card, Badge, Spinner, Alert } from "react-bootstrap";
// import { FaPlus, FaBuilding, FaDoorOpen } from "react-icons/fa";

// const RoomsPage = () => {
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuildingName, setNewBuildingName] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });

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

//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   // ✅ Handle adding new building
//   const handleAddBuilding = async () => {
//     if (!newBuildingName.trim()) return;
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuildingName }),
//       });

//       if (!res.ok) throw new Error("Failed to add building");
//       const savedBuilding = await res.json();

//       setBuildings(prev => [...prev, { ...savedBuilding, rooms: [] }]);
//       setNewBuildingName("");
//       setShowBuildingModal(false);
//     } catch (err) {
//       console.error("Error adding building:", err);
//       setError(err.message);
//     }
//   };

//   // ✅ Handle adding new room
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId),
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add room");
//       const savedRoom = await res.json();

//       // Update UI immediately by inserting room into correct building
//       setBuildings(prevBuildings =>
//         prevBuildings.map(b =>
//           b.id === savedRoom.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), savedRoom] }
//             : b
//         )
//       );

//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//     } catch (err) {
//       console.error("Error adding room:", err);
//       setError(err.message);
//     }
//   };

//   // ✅ UI
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2">Loading buildings and rooms...</span>
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
//       <h2 className="fw-bold mb-4">Room Management</h2>

//       {/* Add Building + Room Buttons */}
//       <div className="mb-3">
//         <Button
//           variant="primary"
//           className="me-2"
//           onClick={() => setShowBuildingModal(true)}
//         >
//           <FaBuilding className="me-2" />
//           Add Building
//         </Button>
//         {buildings.length > 0 && (
//           <Button
//             variant="success"
//             onClick={() => setShowRoomModal(true)}
//           >
//             <FaDoorOpen className="me-2" />
//             Add Room
//           </Button>
//         )}
//       </div>

//       {/* Building + Rooms List */}
//       {buildings.length === 0 ? (
//         <Alert variant="info" className="shadow-sm">
//           No buildings available.
//         </Alert>
//       ) : (
//         buildings.map((b) => (
//           <Card key={b.id} className="mb-4 border-0 shadow-sm">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
//               <span className="fw-semibold">{b.name}</span>
//               <Badge bg="light" text="dark">
//                 {b.rooms?.length || 0} Rooms
//               </Badge>
//             </Card.Header>
//             <Card.Body>
//               {b.rooms && b.rooms.length > 0 ? (
//                 <div className="row">
//                   {b.rooms.map((room) => (
//                     <div key={room.id} className="col-md-4 mb-3">
//                       <Card className="shadow-sm border-0 h-100">
//                         <Card.Body>
//                           <h5 className="fw-bold text-primary">{room.name}</h5>
//                           <table className="table table-sm table-bordered text-center align-middle mb-0">
//                             <thead className="table-light">
//                               <tr>
//                                 <th>Day</th>
//                                 <th>Schedule</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
//                                 <tr key={day}>
//                                   <td>{day}</td>
//                                   <td className="fw-medium">
//                                     {room.schedule?.[day] || (
//                                       <span className="text-success">
//                                         Available
//                                       </span>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No rooms yet in this building.</p>
//               )}
//             </Card.Body>
//           </Card>
//         ))
//       )}

//       {/* Add Building Modal */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Building</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             type="text"
//             placeholder="Enter building name"
//             value={newBuildingName}
//             onChange={(e) => setNewBuildingName(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBuildingModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleAddBuilding}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Room Modal */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Select
//             value={newRoom.buildingId}
//             onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
//             className="mb-3"
//           >
//             <option value="">Select Building</option>
//             {buildings.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Form.Control
//             type="text"
//             placeholder="Room name e.g., Main-101"
//             value={newRoom.name}
//             onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAddRoom}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoomsPage;

//FUNCTIONAL
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Card, Badge, Spinner, Alert } from "react-bootstrap";
// import { FaPlus, FaBuilding, FaDoorOpen } from "react-icons/fa";

// const RoomsPage = () => {
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuildingName, setNewBuildingName] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // ✅ Fetch all buildings with rooms + schedules
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

//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   // ✅ Add new building
//   const handleAddBuilding = async () => {
//     if (!newBuildingName.trim()) return;
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuildingName }),
//       });

//       if (!res.ok) throw new Error("Failed to add building");
//       const savedBuilding = await res.json();

//       setBuildings((prev) => [...prev, { ...savedBuilding, rooms: [] }]);
//       setNewBuildingName("");
//       setShowBuildingModal(false);
//     } catch (err) {
//       console.error("Error adding building:", err);
//       setError(err.message);
//     }
//   };

//   // ✅ Add new room
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId),
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add room");
//       const savedRoom = await res.json();

//       setBuildings((prevBuildings) =>
//         prevBuildings.map((b) =>
//           b.id === savedRoom.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), savedRoom] }
//             : b
//         )
//       );

//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//     } catch (err) {
//       console.error("Error adding room:", err);
//       setError(err.message);
//     }
//   };

//   // ✅ Helper to get room status per day
//   const getRoomStatus = (room, day) => {
//     const schedules = room.schedules || []; // backend must send schedules
//     const daySchedules = schedules.filter((s) => s.day === day);

//     if (daySchedules.length > 0) {
//       return (
//         <div>
//           {daySchedules.map((s, idx) => (
//             <div key={idx} className="text-danger fw-semibold">
//               Already in Use ({s.start_time} - {s.end_time})
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return <span className="text-success fw-semibold">Available</span>;
//   };

//   // ✅ UI Rendering
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-2">Loading buildings and rooms...</span>
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
//       <h2 className="fw-bold mb-4">Room Management</h2>

//       {/* ➕ Add Buttons */}
//       <div className="mb-3">
//         <Button
//           variant="primary"
//           className="me-2"
//           onClick={() => setShowBuildingModal(true)}
//         >
//           <FaBuilding className="me-2" />
//           Add Building
//         </Button>
//         {buildings.length > 0 && (
//           <Button
//             variant="success"
//             onClick={() => setShowRoomModal(true)}
//           >
//             <FaDoorOpen className="me-2" />
//             Add Room
//           </Button>
//         )}
//       </div>

//       {/* 🏢 Building and Rooms */}
//       {buildings.length === 0 ? (
//         <Alert variant="info" className="shadow-sm">
//           No buildings available.
//         </Alert>
//       ) : (
//         buildings.map((b) => (
//           <Card key={b.id} className="mb-4 border-0 shadow-sm">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
//               <span className="fw-semibold">{b.name}</span>
//               <Badge bg="light" text="dark">
//                 {b.rooms?.length || 0} Rooms
//               </Badge>
//             </Card.Header>
//             <Card.Body>
//               {b.rooms && b.rooms.length > 0 ? (
//                 <div className="row">
//                   {b.rooms.map((room) => (
//                     <div key={room.id} className="col-md-4 mb-3">
//                       <Card className="shadow-sm border-0 h-100">
//                         <Card.Body>
//                           <h5 className="fw-bold text-primary">{room.name}</h5>
//                           <table className="table table-sm table-bordered text-center align-middle mb-0">
//                             <thead className="table-light">
//                               <tr>
//                                 <th>Day</th>
//                                 <th>Status</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {[
//                                 "Monday",
//                                 "Tuesday",
//                                 "Wednesday",
//                                 "Thursday",
//                                 "Friday",
//                                 "Saturday",
//                               ].map((day) => (
//                                 <tr key={day}>
//                                   <td>{day}</td>
//                                   <td>{getRoomStatus(room, day)}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No rooms yet in this building.</p>
//               )}
//             </Card.Body>
//           </Card>
//         ))
//       )}

//       {/* 🏗 Add Building Modal */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Building</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             type="text"
//             placeholder="Enter building name"
//             value={newBuildingName}
//             onChange={(e) => setNewBuildingName(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBuildingModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleAddBuilding}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* 🚪 Add Room Modal */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Select
//             value={newRoom.buildingId}
//             onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
//             className="mb-3"
//           >
//             <option value="">Select Building</option>
//             {buildings.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Form.Control
//             type="text"
//             placeholder="Room name e.g., Main-101"
//             value={newRoom.name}
//             onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAddRoom}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoomsPage;

//FUNCTIONAL

// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Card, Badge, Spinner, Alert } from "react-bootstrap";
// import { FaPlus, FaBuilding, FaDoorOpen } from "react-icons/fa";

// const RoomsPage = () => {
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [newBuildingName, setNewBuildingName] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   // Generate time slots from 7:00 AM to 7:00 PM (hourly)
//   const timeSlots = [];
//   for (let hour = 7; hour < 19; hour++) {
//     const start = `${hour.toString().padStart(2, "0")}:00`;
//     const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
//     timeSlots.push({ start, end });
//   }

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(":");
//     let h = parseInt(hour);
//     const ampm = h >= 12 ? "PM" : "AM";
//     h = h % 12 || 12;
//     return `${h}:${minute} ${ampm}`;
//   };

//   // Fetch all buildings with rooms + schedules
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

//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   // Add new building
//   const handleAddBuilding = async () => {
//     if (!newBuildingName.trim()) return;
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuildingName }),
//       });
//       if (!res.ok) throw new Error("Failed to add building");
//       const saved = await res.json();
//       setBuildings((prev) => [...prev, { ...saved, rooms: [] }]);
//       setNewBuildingName("");
//       setShowBuildingModal(false);
//     } catch (err) {
//       console.error("Error adding building:", err);
//       setError(err.message);
//     }
//   };

//   // Add new room
//   const handleAddRoom = async () => {
//     if (!newRoom.name.trim() || !newRoom.buildingId) return;
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId),
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to add room");
//       const saved = await res.json();
//       setBuildings((prev) =>
//         prev.map((b) =>
//           b.id === saved.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), saved] }
//             : b
//         )
//       );
//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//     } catch (err) {
//       console.error("Error adding room:", err);
//       setError(err.message);
//     }
//   };

//   const handleOpenRoomModal = (buildingId) => {
//     setNewRoom({ name: "", buildingId });
//     setShowRoomModal(true);
//   };

//   // Check if room is used in that slot/day
//   const isRoomInUse = (room, day, start, end) => {
//     const schedules = room.schedules || [];
//     return schedules.some((s) => {
//       if (s.day !== day) return false;
//       return (
//         (s.start_time <= start && s.end_time > start) ||
//         (s.start_time < end && s.end_time >= end)
//       );
//     });
//   };

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center py-5">
//         <Spinner animation="border" />
//         <span className="ms-2">Loading...</span>
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="container-fluid py-4">
//       <h2 className="fw-bold mb-4">Room Management</h2>

//       <Button variant="primary" onClick={() => setShowBuildingModal(true)}>
//         <FaBuilding className="me-2" /> Add Building
//       </Button>

//       {buildings.length === 0 ? (
//         <Alert variant="info" className="mt-3">
//           No buildings found.
//         </Alert>
//       ) : (
//         buildings.map((b) => (
//           <Card key={b.id} className="my-4 shadow-sm border-0">
//             <Card.Header className="bg-primary text-white d-flex justify-content-between">
//               <div>
//                 <FaBuilding className="me-2" />
//                 {b.name}
//               </div>
//               <Button size="sm" variant="light" onClick={() => handleOpenRoomModal(b.id)}>
//                 <FaDoorOpen className="me-1" />
//                 Add Room
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               {b.rooms?.length ? (
//                 <div className="row">
//                   {b.rooms.map((room) => (
//                     <div key={room.id} className="col-12 mb-4">
//                       <h5 className="fw-bold text-primary mb-3">{room.name}</h5>
//                       <div className="table-responsive">
//                         <table className="table table-bordered text-center align-middle">
//                           <thead className="table-light">
//                             <tr>
//                               <th>Time</th>
//                               {days.map((day) => (
//                                 <th key={day}>{day}</th>
//                               ))}
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {timeSlots.map(({ start, end }) => (
//                               <tr key={start}>
//                                 <td className="fw-semibold small">
//                                   {formatTime(start)} - {formatTime(end)}
//                                 </td>
//                                 {days.map((day) => {
//                                   const used = isRoomInUse(room, day, start, end);
//                                   return (
//                                     <td
//                                       key={day}
//                                       className={`${
//                                         used ? "bg-danger text-white" : "bg-success text-white"
//                                       }`}
//                                     >
//                                       {used ? "In Use" : "Available"}
//                                     </td>
//                                   );
//                                 })}
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted mb-0">No rooms yet in this building.</p>
//               )}
//             </Card.Body>
//           </Card>
//         ))
//       )}

//       {/* Building Modal */}
//       <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Building</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             type="text"
//             placeholder="Building name"
//             value={newBuildingName}
//             onChange={(e) => setNewBuildingName(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBuildingModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleAddBuilding}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Room Modal */}
//       <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Select
//             value={newRoom.buildingId}
//             onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
//             className="mb-3"
//             disabled={!!newRoom.buildingId}
//           >
//             <option value="">Select Building</option>
//             {buildings.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </Form.Select>
//           <Form.Control
//             type="text"
//             placeholder="Room name e.g., Main-101"
//             value={newRoom.name}
//             onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleAddRoom}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoomsPage;


//OLD design
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { 
//   Building, Plus, Search, RefreshCw, Calendar, Clock, 
//   Edit2, Trash2, X, Check, ChevronDown, ChevronUp, 
//   AlertCircle, CheckCircle, Info, Filter, TrendingUp
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
//   success: "#10b981",
//   danger: "#ef4444",
//   warning: "#f59e0b",
// };

// // ==================== UTILITY FUNCTIONS ====================
// const formatTime = (time) => {
//   if (!time) return "";
//   const [hour, minute] = time.split(":");
//   let h = parseInt(hour);
//   const ampm = h >= 12 ? "PM" : "AM";
//   h = h % 12 || 12;
//   return `${h}:${minute} ${ampm}`;
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
//     success: { bg: "#d4edda", border: "#c3e6cb", color: "#155724", Icon: CheckCircle },
//     danger: { bg: "#f8d7da", border: "#f5c6cb", color: "#721c24", Icon: AlertCircle },
//     info: { bg: "#d1ecf1", border: "#bee5eb", color: "#0c5460", Icon: Info },
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
// const Skeleton = React.memo(({ width = '100%', height = '40px', className = '' }) => (
//   <div className="skeleton" style={{ width, height }} />
// ));

// const BuildingSkeleton = React.memo(() => (
//   <div className="building-skeleton">
//     {[1, 2, 3].map(i => (
//       <div key={i} className="skeleton-card">
//         <Skeleton height="60px" className="mb-3" />
//         <div className="skeleton-grid">
//           <Skeleton height="200px" />
//           <Skeleton height="200px" />
//           <Skeleton height="200px" />
//         </div>
//       </div>
//     ))}
//   </div>
// ));

// // ==================== STATS CARD ====================
// const StatsCard = React.memo(({ icon: Icon, label, value, color, trend }) => (
//   <div className="stats-card" style={{ borderTopColor: color }}>
//     <div className="stats-icon" style={{ background: `${color}20`, color }}>
//       <Icon size={24} />
//     </div>
//     <div className="stats-content">
//       <div className="stats-value">{value}</div>
//       <div className="stats-label">{label}</div>
//       {trend && (
//         <div className="stats-trend">
//           <TrendingUp size={12} />
//           <span>{trend}</span>
//         </div>
//       )}
//     </div>
//   </div>
// ));

// // ==================== ROOM STATUS BADGE ====================
// const RoomStatusBadge = React.memo(({ room, day }) => {
//   const schedules = room.schedules || [];
//   const daySchedules = schedules.filter(s => s.day === day);

//   if (daySchedules.length === 0) {
//     return (
//       <div className="status-badge available">
//         <div className="status-dot"></div>
//         Available
//       </div>
//     );
//   }

//   return (
//     <div className="status-badge in-use">
//       <div className="status-dot"></div>
//       <div className="status-times">
//         {daySchedules.map((s, idx) => (
//           <div key={idx} className="time-slot">
//             <Clock size={11} />
//             {formatTime(s.start_time)} - {formatTime(s.end_time)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// });

// // ==================== ROOM TABLE ====================
// const RoomTable = React.memo(({ room }) => {
//   const totalUsedSlots = useMemo(() => {
//     return (room.schedules || []).length;
//   }, [room.schedules]);

//   return (
//     <div className="room-card">
//       <div className="room-header">
//         <div className="room-title">
//           <Building size={18} className="room-icon" />
//           <h4>{room.name}</h4>
//         </div>
//         <div className="room-usage">
//           <span className="usage-label">Weekly Usage:</span>
//           <span className="usage-value">{totalUsedSlots} slots</span>
//         </div>
//       </div>

//       <div className="room-schedule">
//         <table className="schedule-table">
//           <thead>
//             <tr>
//               <th>Day</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {DAYS_ORDER.map(day => (
//               <tr key={day}>
//                 <td className="day-cell">
//                   <Calendar size={14} />
//                   {day}
//                 </td>
//                 <td className="status-cell">
//                   <RoomStatusBadge room={room} day={day} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// });

// // ==================== BUILDING CARD ====================
// const BuildingCard = React.memo(({ 
//   building, 
//   onAddRoom, 
//   onDeleteBuilding,
//   searchTerm 
// }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   // Filter rooms based on search term
//   const filteredRooms = useMemo(() => {
//     if (!searchTerm.trim()) return building.rooms || [];
//     const term = searchTerm.toLowerCase();
//     return (building.rooms || []).filter(room => 
//       room.name.toLowerCase().includes(term)
//     );
//   }, [building.rooms, searchTerm]);

//   const availableRooms = useMemo(() => {
//     return filteredRooms.filter(room => 
//       (room.schedules || []).length === 0
//     ).length;
//   }, [filteredRooms]);

//   const totalRooms = filteredRooms.length;

//   return (
//     <div className="building-card fade-in">
//       <div className="building-header">
//         <div className="building-info">
//           <button 
//             className="expand-btn"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>
          
//           <div className="building-icon">
//             <Building size={24} />
//           </div>
          
//           <div className="building-details">
//             <h3>{building.name}</h3>
//             <div className="building-stats">
//               <span className="stat-item">
//                 <Building size={14} />
//                 {totalRooms} Rooms
//               </span>
//               <span className="stat-item available">
//                 <CheckCircle size={14} />
//                 {availableRooms} Available
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="building-actions">
//           <button
//             className="action-btn add"
//             onClick={() => onAddRoom(building.id)}
//             title="Add Room"
//           >
//             <Plus size={18} />
//             Add Room
//           </button>
//           <button
//             className="action-btn delete"
//             onClick={() => onDeleteBuilding(building.id)}
//             title="Delete Building"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="building-body">
//           {filteredRooms.length === 0 ? (
//             <div className="empty-state">
//               <Building size={40} className="empty-icon" />
//               <p>No rooms available in this building</p>
//               <button
//                 className="empty-action-btn"
//                 onClick={() => onAddRoom(building.id)}
//               >
//                 <Plus size={16} />
//                 Add First Room
//               </button>
//             </div>
//           ) : (
//             <div className="rooms-grid">
//               {filteredRooms.map(room => (
//                 <RoomTable key={room.id} room={room} />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// // ==================== ADD BUILDING MODAL ====================
// const AddBuildingModal = React.memo(({ show, onClose, onSave }) => {
//   const [buildingName, setBuildingName] = useState("");

//   const handleSave = () => {
//     if (buildingName.trim()) {
//       onSave(buildingName);
//       setBuildingName("");
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>Add New Building</h3>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">
//               <Building size={16} />
//               Building Name
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="e.g., Main Building, Science Hall"
//               value={buildingName}
//               onChange={e => setBuildingName(e.target.value)}
//               onKeyPress={e => e.key === 'Enter' && handleSave()}
//               autoFocus
//             />
//           </div>
//         </div>

//         <div className="modal-footer">
//           <button onClick={onClose} className="btn-secondary">
//             Cancel
//           </button>
//           <button 
//             onClick={handleSave} 
//             className="btn-primary"
//             disabled={!buildingName.trim()}
//           >
//             <Plus size={16} />
//             Add Building
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== ADD ROOM MODAL ====================
// const AddRoomModal = React.memo(({ show, onClose, onSave, buildings, selectedBuildingId }) => {
//   const [roomData, setRoomData] = useState({
//     name: "",
//     buildingId: selectedBuildingId || ""
//   });

//   useEffect(() => {
//     if (selectedBuildingId) {
//       setRoomData(prev => ({ ...prev, buildingId: selectedBuildingId }));
//     }
//   }, [selectedBuildingId]);

//   const handleSave = () => {
//     if (roomData.name.trim() && roomData.buildingId) {
//       onSave(roomData);
//       setRoomData({ name: "", buildingId: selectedBuildingId || "" });
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>Add New Room</h3>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">
//               <Building size={16} />
//               Select Building
//             </label>
//             <select
//               className="form-select"
//               value={roomData.buildingId}
//               onChange={e => setRoomData({ ...roomData, buildingId: e.target.value })}
//               disabled={!!selectedBuildingId}
//             >
//               <option value="">Choose a building</option>
//               {buildings.map(b => (
//                 <option key={b.id} value={b.id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label className="form-label">
//               <Building size={16} />
//               Room Name
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="e.g., Room 101, Lab A, Auditorium"
//               value={roomData.name}
//               onChange={e => setRoomData({ ...roomData, name: e.target.value })}
//               onKeyPress={e => e.key === 'Enter' && handleSave()}
//             />
//           </div>
//         </div>

//         <div className="modal-footer">
//           <button onClick={onClose} className="btn-secondary">
//             Cancel
//           </button>
//           <button 
//             onClick={handleSave} 
//             className="btn-primary"
//             disabled={!roomData.name.trim() || !roomData.buildingId}
//           >
//             <Plus size={16} />
//             Add Room
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// // ==================== CONFIRMATION MODAL ====================
// const ConfirmationModal = React.memo(({ show, onClose, onConfirm, title, message }) => {
//   if (!show) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <AlertCircle size={24} className="warning-icon" />
//           <h3>{title}</h3>
//         </div>

//         <div className="modal-body">
//           <p>{message}</p>
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
// export default function RoomsPage() {
//   // State Management
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
  
//   const [toast, setToast] = useState({ message: "", type: "" });

//   // Initial data fetch
//   useEffect(() => {
//     fetchBuildings();
//   }, []);

//   // API Functions
//   const fetchBuildings = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/api/buildings`);
//       if (!res.ok) throw new Error("Failed to fetch buildings");
//       const data = await res.json();
//       setBuildings(data);
//       showToast("Buildings loaded successfully", "success");
//     } catch (err) {
//       console.error("Error fetching buildings:", err);
//       showToast(err.message, "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddBuilding = async (buildingName) => {
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: buildingName }),
//       });

//       if (!res.ok) throw new Error("Failed to add building");
//       const savedBuilding = await res.json();

//       setBuildings(prev => [...prev, { ...savedBuilding, rooms: [] }]);
//       setShowBuildingModal(false);
//       showToast("Building added successfully", "success");
//     } catch (err) {
//       console.error("Error adding building:", err);
//       showToast(err.message, "danger");
//     }
//   };

//   const handleAddRoom = async (roomData) => {
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: roomData.name,
//           buildingId: Number(roomData.buildingId),
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to add room");
//       const savedRoom = await res.json();

//       setBuildings(prev =>
//         prev.map(b =>
//           b.id === savedRoom.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), savedRoom] }
//             : b
//         )
//       );

//       setShowRoomModal(false);
//       setSelectedBuildingId(null);
//       showToast("Room added successfully", "success");
//     } catch (err) {
//       console.error("Error adding room:", err);
//       showToast(err.message, "danger");
//     }
//   };

//   const handleDeleteBuilding = (buildingId) => {
//     setDeleteTarget({ type: "building", id: buildingId });
//     setShowConfirmModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!deleteTarget) return;

//     try {
//       // In a real app, you would call the API to delete
//       // For now, we'll just remove from state
//       setBuildings(prev => prev.filter(b => b.id !== deleteTarget.id));
//       showToast("Building deleted successfully", "success");
//     } catch (err) {
//       console.error("Error deleting building:", err);
//       showToast(err.message, "danger");
//     } finally {
//       setShowConfirmModal(false);
//       setDeleteTarget(null);
//     }
//   };

//   const handleOpenRoomModal = (buildingId) => {
//     setSelectedBuildingId(buildingId);
//     setShowRoomModal(true);
//   };

//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   const closeToast = () => {
//     setToast({ message: "", type: "" });
//   };

//   // Filter buildings based on search
//   const filteredBuildings = useMemo(() => {
//     if (!searchTerm.trim()) return buildings;
//     const term = searchTerm.toLowerCase();
//     return buildings.filter(b =>
//       b.name.toLowerCase().includes(term) ||
//       (b.rooms || []).some(r => r.name.toLowerCase().includes(term))
//     );
//   }, [buildings, searchTerm]);

//   // Calculate stats
//   const stats = useMemo(() => {
//     const totalRooms = buildings.reduce((sum, b) => sum + (b.rooms?.length || 0), 0);
//     const totalSchedules = buildings.reduce((sum, b) => 
//       sum + (b.rooms || []).reduce((rSum, r) => rSum + (r.schedules?.length || 0), 0), 0
//     );
//     const availableRooms = buildings.reduce((sum, b) =>
//       sum + (b.rooms || []).filter(r => (r.schedules || []).length === 0).length, 0
//     );

//     return {
//       buildings: buildings.length,
//       rooms: totalRooms,
//       available: availableRooms,
//       scheduled: totalSchedules,
//     };
//   }, [buildings]);

//   return (
//     <div className="rooms-page">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} onClose={closeToast} />

//       {/* Page Header */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title-group">
//             <div className="header-icon">
//               <Building size={32} />
//             </div>
//             <div>
//               <h1 className="page-title">Room Management</h1>
//               <p className="page-subtitle">
//                 Manage buildings, rooms, and view real-time availability schedules
//               </p>
//             </div>
//           </div>

//           <div className="header-actions">
//             <button className="action-btn primary" onClick={() => setShowBuildingModal(true)}>
//               <Plus size={18} />
//               Add Building
//             </button>
//             <button 
//               className="action-btn refresh"
//               onClick={fetchBuildings}
//               disabled={loading}
//             >
//               <RefreshCw size={18} className={loading ? 'spinning' : ''} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="stats-grid">
//           <StatsCard
//             icon={Building}
//             label="Total Buildings"
//             value={stats.buildings}
//             color={COLORS.primary}
//           />
//           <StatsCard
//             icon={Building}
//             label="Total Rooms"
//             value={stats.rooms}
//             color={COLORS.accent}
//           />
//           <StatsCard
//             icon={CheckCircle}
//             label="Available Now"
//             value={stats.available}
//             color={COLORS.success}
//           />
//           <StatsCard
//             icon={Calendar}
//             label="Scheduled Slots"
//             value={stats.scheduled}
//             color={COLORS.light}
//           />
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="controls-section">
//         <div className="search-container">
//           <Search size={18} className="search-icon" />
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search buildings or rooms..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           {searchTerm && (
//             <button 
//               className="search-clear"
//               onClick={() => setSearchTerm("")}
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         <div className="results-info">
//           Showing {filteredBuildings.length} of {buildings.length} buildings
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="content-section">
//         {loading ? (
//           <BuildingSkeleton />
//         ) : filteredBuildings.length === 0 ? (
//           <div className="empty-state-main">
//             <Building size={64} className="empty-icon" />
//             <h3>No Buildings Found</h3>
//             <p>
//               {searchTerm 
//                 ? "No buildings or rooms match your search. Try a different term."
//                 : "Start by adding your first building to manage rooms and schedules."
//               }
//             </p>
//             {!searchTerm && (
//               <button
//                 className="empty-action-btn"
//                 onClick={() => setShowBuildingModal(true)}
//               >
//                 <Plus size={18} />
//                 Add First Building
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="buildings-container">
//             {filteredBuildings.map(building => (
//               <BuildingCard
//                 key={building.id}
//                 building={building}
//                 onAddRoom={handleOpenRoomModal}
//                 onDeleteBuilding={handleDeleteBuilding}
//                 searchTerm={searchTerm}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <AddBuildingModal
//         show={showBuildingModal}
//         onClose={() => setShowBuildingModal(false)}
//         onSave={handleAddBuilding}
//       />

//       <AddRoomModal
//         show={showRoomModal}
//         onClose={() => {
//           setShowRoomModal(false);
//           setSelectedBuildingId(null);
//         }}
//         onSave={handleAddRoom}
//         buildings={buildings}
//         selectedBuildingId={selectedBuildingId}
//       />

//       <ConfirmationModal
//         show={showConfirmModal}
//         onClose={() => {
//           setShowConfirmModal(false);
//           setDeleteTarget(null);
//         }}
//         onConfirm={confirmDelete}
//         title="Delete Building?"
//         message="Are you sure you want to delete this building? This action cannot be undone and will remove all associated rooms."
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//   /* ================== GLOBAL ================== */
//   .rooms-page {
//     min-height: 100vh;
//     background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//     padding: 2rem;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//   }

//   /* ================== TOAST ================== */
//   .toast-notification {
//     position: fixed;
//     top: 1.5rem;
//     right: 1.5rem;
//     z-index: 10000;
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     padding: 1rem 1.25rem;
//     border-radius: 12px;
//     border: 2px solid;
//     max-width: 360px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     animation: slideInRight 0.3s ease;
//   }

//   @keyframes slideInRight {
//     from { opacity: 0; transform: translateX(40px); }
//     to { opacity: 1; transform: translateX(0); }
//   }

//   .toast-close {
//     background: none;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     opacity: 0.6;
//     transition: opacity 0.2s ease;
//   }
//   .toast-close:hover { opacity: 1; }

//   /* ================== HEADER ================== */
//   .page-header { margin-bottom: 2.5rem; }

//   .header-content {
//     background: white;
//     padding: 2rem;
//     border-radius: 16px;
//     box-shadow: 0 4px 10px rgba(3, 4, 94, 0.1);
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 1.5rem;
//     margin-bottom: 2rem;
//   }

//   .header-title-group {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//   }

//   .header-icon {
//     width: 64px;
//     height: 64px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 16px;
//     background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
//     color: white;
//   }

//   .page-title {
//     font-size: 2rem;
//     font-weight: 700;
//     color: ${COLORS.primary};
//     margin: 0;
//   }

//   .page-subtitle {
//     font-size: 0.95rem;
//     color: ${COLORS.secondary};
//     opacity: 0.85;
//   }

//   .header-actions {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
//   }

//   .action-btn {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     padding: 0.75rem 1.25rem;
//     border: none;
//     border-radius: 10px;
//     font-size: 0.95rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s ease;
//   }

//   .action-btn.primary {
//     background: ${COLORS.primary};
//     color: white;
//   }

//   .action-btn.primary:hover {
//     background: ${COLORS.secondary};
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//   }

//   .action-btn.refresh {
//     background: ${COLORS.accent};
//     color: white;
//   }

//   .action-btn.refresh:hover:not(:disabled) {
//     background: ${COLORS.light};
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
//   }

//   .action-btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   .spinning { animation: spin 1s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   /* ================== STATS ================== */
//   .stats-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//     gap: 1.5rem;
//   }

//   .stats-card {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     background: white;
//     padding: 1.25rem 1.5rem;
//     border-radius: 12px;
//     border-top: 4px solid;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//     transition: transform 0.2s ease, box-shadow 0.2s ease;
//   }

//   .stats-card:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
//   }

//   .stats-icon {
//     width: 56px;
//     height: 56px;
//     border-radius: 12px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .stats-value {
//     font-size: 1.5rem;
//     font-weight: 700;
//     color: ${COLORS.primary};
//     margin-bottom: 0.25rem;
//   }

//   .stats-label {
//     font-size: 0.9rem;
//     color: ${COLORS.secondary};
//   }

//   .stats-trend {
//     font-size: 0.8rem;
//     color: ${COLORS.success};
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//   }

//   /* ================== SEARCH & FILTER ================== */
//   .controls-section {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     align-items: center;
//     gap: 1rem;
//     margin-bottom: 1.5rem;
//   }

//   .search-container {
//     position: relative;
//     flex: 1;
//     max-width: 400px;
//   }

//   .search-icon {
//     position: absolute;
//     top: 50%;
//     left: 0.75rem;
//     transform: translateY(-50%);
//     color: ${COLORS.secondary};
//     opacity: 0.7;
//   }

//   .search-input {
//     width: 100%;
//     padding: 0.75rem 2.25rem 0.75rem 2.25rem;
//     border: 1.5px solid #d0d7de;
//     border-radius: 10px;
//     font-size: 0.95rem;
//     transition: border-color 0.2s ease;
//   }

//   .search-input:focus {
//     border-color: ${COLORS.primary};
//     outline: none;
//   }

//   .search-clear {
//     position: absolute;
//     right: 0.75rem;
//     top: 50%;
//     transform: translateY(-50%);
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: ${COLORS.danger};
//     opacity: 0.7;
//   }

//   .results-info {
//     font-size: 0.9rem;
//     color: ${COLORS.secondary};
//     opacity: 0.8;
//   }

//   /* ================== CONTENT ================== */
//   .content-section {
//     margin-top: 1rem;
//   }

//   .buildings-container {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
//     gap: 2rem;
//   }

//   .building-card {
//     background: white;
//     border-radius: 14px;
//     padding: 1.25rem 1.5rem;
//     box-shadow: 0 2px 10px rgba(3, 4, 94, 0.08);
//     transition: transform 0.2s ease, box-shadow 0.2s ease;
//   }

//   .building-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 4px 14px rgba(3, 4, 94, 0.12);
//   }

//   .building-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
//     flex-wrap: wrap;
//     gap: 1rem;
//   }

//   .building-info {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//   }

//   .building-details h3 {
//     margin: 0;
//     font-size: 1.25rem;
//     color: ${COLORS.primary};
//   }

//   .building-stats {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
//     font-size: 0.9rem;
//     color: ${COLORS.secondary};
//   }

//   .stat-item {
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//   }

//   .stat-item.available {
//     color: ${COLORS.success};
//   }

//   .rooms-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     gap: 1rem;
//   }

//   .room-card {
//     background: #f8fafc;
//     border-radius: 10px;
//     padding: 1rem;
//     border: 1px solid #e5e7eb;
//   }

//   .schedule-table {
//     width: 100%;
//     border-collapse: collapse;
//   }

//   .schedule-table th, .schedule-table td {
//     padding: 0.5rem;
//     border-bottom: 1px solid #e5e7eb;
//     text-align: left;
//   }

//   .schedule-table th {
//     background: ${COLORS.lightest};
//     color: ${COLORS.primary};
//   }

//   .status-badge {
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//     font-size: 0.85rem;
//     border-radius: 8px;
//     padding: 0.25rem 0.5rem;
//   }

//   .status-badge.available {
//     background: rgba(16, 185, 129, 0.1);
//     color: ${COLORS.success};
//   }

//   .status-badge.in-use {
//     background: rgba(239, 68, 68, 0.1);
//     color: ${COLORS.danger};
//     flex-direction: column;
//     align-items: flex-start;
//   }

//   .status-dot {
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     background: currentColor;
//   }

//   .status-times {
//     display: flex;
//     flex-direction: column;
//     gap: 0.25rem;
//   }

//   .empty-state-main {
//     text-align: center;
//     padding: 3rem 1rem;
//   }

//   .empty-icon {
//     color: ${COLORS.light};
//     margin-bottom: 1rem;
//   }

//   .empty-action-btn {
//     margin-top: 1rem;
//     background: ${COLORS.primary};
//     color: white;
//     padding: 0.75rem 1.5rem;
//     border-radius: 8px;
//     border: none;
//     cursor: pointer;
//   }

//   /* ================== MODALS ================== */
//   .modal-overlay {
//     position: fixed;
//     top: 0; left: 0;
//     width: 100%; height: 100%;
//     background: rgba(0,0,0,0.4);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 9999;
//     padding: 1rem;
//   }

//   .modal-content {
//     background: white;
//     border-radius: 12px;
//     padding: 1.5rem;
//     width: 100%;
//     max-width: 420px;
//     box-shadow: 0 6px 20px rgba(0,0,0,0.15);
//     animation: fadeIn 0.25s ease;
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(-10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   .modal-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
//   }

//   .modal-header h3 {
//     margin: 0;
//     color: ${COLORS.primary};
//   }

//   .modal-body {
//     margin-bottom: 1rem;
//   }

//   .form-group {
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//     margin-bottom: 1rem;
//   }

//   .form-label {
//     font-weight: 600;
//     color: ${COLORS.secondary};
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//   }

//   .form-input, .form-select {
//     padding: 0.6rem 0.75rem;
//     border: 1.5px solid #d0d7de;
//     border-radius: 8px;
//     font-size: 0.95rem;
//   }

//   .form-input:focus, .form-select:focus {
//     border-color: ${COLORS.primary};
//     outline: none;
//   }

//   .modal-footer {
//     display: flex;
//     justify-content: flex-end;
//     gap: 0.75rem;
//   }

//   .btn-primary {
//     background: ${COLORS.primary};
//     color: white;
//     padding: 0.6rem 1.2rem;
//     border-radius: 8px;
//     border: none;
//     cursor: pointer;
//   }

//   .btn-secondary {
//     background: #e5e7eb;
//     padding: 0.6rem 1.2rem;
//     border-radius: 8px;
//     border: none;
//     cursor: pointer;
//   }

//   .btn-danger {
//     background: ${COLORS.danger};
//     color: white;
//     padding: 0.6rem 1.2rem;
//     border-radius: 8px;
//     border: none;
//     cursor: pointer;
//   }

//   /* ============= RESPONSIVE FIXES ============= */
//   @media (max-width: 768px) {
//     .header-content {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .buildings-container {
//       grid-template-columns: 1fr;
//     }

//     .rooms-grid {
//       grid-template-columns: 1fr;
//     }
//   }
// `}</style>

//     </div>
//   );
// }

//NEW FUNCTIONAL ROOMMANAGEMENT BACKGROUND
//  import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Card, Button, Modal, Form, Spinner, Badge, InputGroup } from "react-bootstrap";
// import { Building2, DoorOpen, Search, Plus, RotateCw, Trash2, Edit, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

// const RoomManagement = () => {
//   // State management
//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedBuildings, setExpandedBuildings] = useState({});
//   const [toast, setToast] = useState(null);

//   // Modal states
//   const [showBuildingModal, setShowBuildingModal] = useState(false);
//   const [showRoomModal, setShowRoomModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
//   const [newBuildingName, setNewBuildingName] = useState("");
//   const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });
//   const [modalLoading, setModalLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [selectedBuildingForRoom, setSelectedBuildingForRoom] = useState(null);

//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

//   // Time slots: 7:00 AM to 7:00 PM
//   const timeSlots = useMemo(() => {
//     const slots = [];
//     for (let hour = 7; hour < 19; hour++) {
//       const start = `${hour.toString().padStart(2, "0")}:00`;
//       const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
//       slots.push({ start, end, hour });
//     }
//     return slots;
//   }, []);

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   /**
//    * Format time from 24-hour to 12-hour format
//    */
//   const formatTime = useCallback((time) => {
//     const [hour, minute] = time.split(":");
//     let h = parseInt(hour);
//     const ampm = h >= 12 ? "PM" : "AM";
//     h = h % 12 || 12;
//     return `${h}:${minute} ${ampm}`;
//   }, []);

//   /**
//    * Fetch all buildings with rooms and schedules
//    */
//   const fetchBuildings = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API}/api/buildings`);
//       if (!res.ok) throw new Error("Failed to fetch buildings");
//       const data = await res.json();
//       setBuildings(Array.isArray(data) ? data : []);
      
//       // Initialize expanded state for all buildings
//       const expandedState = {};
//       data.forEach(b => {
//         expandedState[b.id] = true;
//       });
//       setExpandedBuildings(expandedState);
//     } catch (err) {
//       console.error("Error fetching buildings:", err);
//       setError(err.message);
//       showToast("Failed to load buildings", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [API]);

//   /**
//    * Show toast notification
//    */
//   const showToast = (message, type) => {
//     setToast({ message, type });
//   };

//   /**
//    * Toggle building expansion
//    */
//   const toggleBuildingExpansion = (buildingId) => {
//     setExpandedBuildings(prev => ({
//       ...prev,
//       [buildingId]: !prev[buildingId]
//     }));
//   };

//   /**
//    * Expand all buildings
//    */
//   const expandAllBuildings = () => {
//     const expanded = {};
//     buildings.forEach(b => {
//       expanded[b.id] = true;
//     });
//     setExpandedBuildings(expanded);
//   };

//   /**
//    * Collapse all buildings
//    */
//   const collapseAllBuildings = () => {
//     const collapsed = {};
//     buildings.forEach(b => {
//       collapsed[b.id] = false;
//     });
//     setExpandedBuildings(collapsed);
//   };

//   /**
//    * Add new building
//    */
//   const handleAddBuilding = async (e) => {
//     e.preventDefault();
//     if (!newBuildingName.trim()) {
//       showToast("Please enter a building name", "error");
//       return;
//     }

//     setModalLoading(true);
//     try {
//       const res = await fetch(`${API}/api/buildings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newBuildingName })
//       });
      
//       if (!res.ok) throw new Error("Failed to add building");
      
//       const saved = await res.json();
//       setBuildings(prev => [...prev, { ...saved, rooms: [] }]);
//       setExpandedBuildings(prev => ({ ...prev, [saved.id]: true }));
//       setNewBuildingName("");
//       setShowBuildingModal(false);
//       showToast(`Building "${saved.name}" added successfully`, "success");
//     } catch (err) {
//       console.error("Error adding building:", err);
//       showToast(err.message || "Failed to add building", "error");
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   /**
//    * Delete a building
//    */
//   const handleDeleteBuilding = async (buildingId) => {
//     setDeleteLoading(true);
//     try {
//       const res = await fetch(`${API}/api/buildings/${buildingId}`, {
//         method: "DELETE"
//       });
      
//       if (!res.ok) throw new Error("Failed to delete building");
      
//       setBuildings(prev => prev.filter(b => b.id !== buildingId));
//       setShowDeleteConfirm(null);
//       showToast("Building deleted successfully", "success");
//     } catch (err) {
//       console.error("Error deleting building:", err);
//       showToast("Failed to delete building", "error");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   /**
//    * Add new room
//    */
//   const handleAddRoom = async (e) => {
//     e.preventDefault();
//     if (!newRoom.name.trim() || !newRoom.buildingId) {
//       showToast("Please enter room name and select building", "error");
//       return;
//     }

//     setModalLoading(true);
//     try {
//       const res = await fetch(`${API}/api/rooms`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: newRoom.name,
//           buildingId: Number(newRoom.buildingId)
//         })
//       });
      
//       if (!res.ok) throw new Error("Failed to add room");
      
//       const saved = await res.json();
//       setBuildings(prev =>
//         prev.map(b =>
//           b.id === saved.buildingId
//             ? { ...b, rooms: [...(b.rooms || []), saved] }
//             : b
//         )
//       );
//       setNewRoom({ name: "", buildingId: "" });
//       setShowRoomModal(false);
//       setSelectedBuildingForRoom(null);
//       showToast(`Room "${saved.name}" added successfully`, "success");
//     } catch (err) {
//       console.error("Error adding room:", err);
//       showToast(err.message || "Failed to add room", "error");
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   /**
//    * Delete a room
//    */
//   const handleDeleteRoom = async (roomId, buildingId) => {
//     setDeleteLoading(true);
//     try {
//       const res = await fetch(`${API}/api/rooms/${roomId}`, {
//         method: "DELETE"
//       });
      
//       if (!res.ok) throw new Error("Failed to delete room");
      
//       setBuildings(prev =>
//         prev.map(b =>
//           b.id === buildingId
//             ? { ...b, rooms: b.rooms.filter(r => r.id !== roomId) }
//             : b
//         )
//       );
//       setShowDeleteConfirm(null);
//       showToast("Room deleted successfully", "success");
//     } catch (err) {
//       console.error("Error deleting room:", err);
//       showToast("Failed to delete room", "error");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   /**
//    * Open add room modal with pre-selected building
//    */
//   const handleOpenRoomModal = (buildingId) => {
//     setSelectedBuildingForRoom(buildingId);
//     setNewRoom({ name: "", buildingId: String(buildingId) });
//     setShowRoomModal(true);
//   };

//   /**
//    * Check if room is in use for a specific day/time slot
//    */
//   const isRoomInUse = useCallback((room, day, startTime, endTime) => {
//     const schedules = room.schedules || [];
//     return schedules.some(s => {
//       if (s.day !== day) return false;
//       return (
//         (s.start_time <= startTime && s.end_time > startTime) ||
//         (s.start_time < endTime && s.end_time >= endTime)
//       );
//     });
//   }, []);

//   /**
//    * Calculate utilization statistics for a room
//    */
//   const getRoomStats = useCallback((room) => {
//     const schedules = room.schedules || [];
//     const totalSlots = timeSlots.length * days.length;
//     const usedSlots = schedules.length;
//     const utilizationPercent = Math.round((usedSlots / totalSlots) * 100);
    
//     return {
//       totalSlots,
//       usedSlots,
//       availableSlots: totalSlots - usedSlots,
//       utilizationPercent
//     };
//   }, [timeSlots.length, days.length]);

//   /**
//    * Calculate utilization statistics for a building
//    */
//   const getBuildingStats = useCallback((building) => {
//     const rooms = building.rooms || [];
//     const totalRooms = rooms.length;
//     const totalSlots = totalRooms * timeSlots.length * days.length;
//     const totalUsedSlots = rooms.reduce((sum, r) => sum + (r.schedules?.length || 0), 0);
//     const utilizationPercent = totalSlots > 0 ? Math.round((totalUsedSlots / totalSlots) * 100) : 0;
    
//     return {
//       totalRooms,
//       totalUsedSlots,
//       utilizationPercent
//     };
//   }, [timeSlots.length, days.length]);

//   /**
//    * Filter buildings based on search term
//    */
//   const filteredBuildings = useMemo(() => {
//     return buildings.filter(b =>
//       b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.rooms?.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [buildings, searchTerm]);

//   /**
//    * Calculate overall statistics
//    */
//   const overallStats = useMemo(() => {
//     const totalBuildings = buildings.length;
//     const totalRooms = buildings.reduce((sum, b) => sum + (b.rooms?.length || 0), 0);
//     const totalSchedules = buildings.reduce((sum, b) =>
//       sum + (b.rooms?.reduce((roomSum, r) => roomSum + (r.schedules?.length || 0), 0) || 0),
//       0
//     );
    
//     return { totalBuildings, totalRooms, totalSchedules };
//   }, [buildings]);

//   // Fetch buildings on mount
//   useEffect(() => {
//     fetchBuildings();
//   }, [fetchBuildings]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="room-loading-container">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Loading facilities...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         /* ============================================
//            EduSched Room Management Styles
//            ============================================ */

//         .room-management-container {
//           padding: 2rem;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           min-height: 100vh;
//         }

//         .room-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 2rem;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .room-title {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 2rem;
//           font-weight: 700;
//           color: #03045E;
//         }

//         .header-actions {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .action-btn {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .action-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 119, 182, 0.3);
//         }

//         .action-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* Statistics Section */
//         .statistics-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           border-left: 4px solid #0077B6;
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

//         /* Search Section */
//         .search-section {
//           background: white;
//           border-radius: 12px;
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//         }

//         .search-input {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem 1rem 0.75rem 2.5rem;
//           width: 100%;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//         }

//         .search-icon-wrapper {
//           position: relative;
//         }

//         .search-icon {
//           position: absolute;
//           left: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #0077B6;
//           pointer-events: none;
//         }

//         /* Building Card */
//         .building-card {
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
//           margin-bottom: 1.5rem;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           animation: slideIn 0.3s ease;
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .building-card:hover {
//           box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
//         }

//         .building-header {
//           background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
//           color: white;
//           padding: 1.5rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           cursor: pointer;
//           user-select: none;
//           transition: all 0.3s ease;
//         }

//         .building-header:hover {
//           background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
//         }

//         .building-info {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           flex: 1;
//         }

//         .building-name {
//           font-size: 1.2rem;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .building-stats {
//           display: flex;
//           gap: 1rem;
//           margin-left: auto;
//         }

//         .building-stat {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//         }

//         .building-actions {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .icon-btn {
//           background: rgba(255, 255, 255, 0.2);
//           border: none;
//           color: white;
//           padding: 0.5rem;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .icon-btn:hover {
//           background: rgba(255, 255, 255, 0.4);
//           transform: scale(1.1);
//         }

//         .chevron-icon {
//           transition: transform 0.3s ease;
//         }

//         .chevron-icon.open {
//           transform: rotate(180deg);
//         }

//         /* Building Content */
//         .building-content {
//           padding: 1.5rem;
//         }

//         .empty-rooms {
//           text-align: center;
//           padding: 2rem;
//           color: #999;
//         }

//         /* Room Section */
//         .room-section {
//           margin-bottom: 2rem;
//         }

//         .room-header-custom {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1rem;
//           background: #CAF0F8;
//           border-radius: 10px;
//           margin-bottom: 1rem;
//           border-left: 4px solid #0077B6;
//         }

//         .room-title-custom {
//           font-weight: 600;
//           color: #03045E;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1rem;
//         }

//         .room-stats-custom {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .room-stat-badge {
//           background: white;
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           font-size: 0.85rem;
//           font-weight: 500;
//           border: 1px solid #90E0EF;
//         }

//         .utilization-badge {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           color: white;
//           border: none;
//         }

//         /* Schedule Table */
//         .room-table {
//           border-collapse: collapse;
//           width: 100%;
//           font-size: 0.9rem;
//           margin-bottom: 1rem;
//         }

//         .room-table thead {
//           background: #CAF0F8;
//           color: #03045E;
//         }

//         .room-table th {
//           padding: 0.75rem;
//           font-weight: 600;
//           text-align: center;
//           border: 1px solid #90E0EF;
//           font-size: 0.85rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .room-table td {
//           padding: 0.75rem;
//           border: 1px solid #E8F4F8;
//           text-align: center;
//           vertical-align: middle;
//           transition: all 0.3s ease;
//         }

//         .room-table tbody tr:nth-child(odd) {
//           background: #FAFCFD;
//         }

//         .room-table tbody tr:hover {
//           background: #E8F4F8;
//         }

//         .time-cell {
//           font-weight: 500;
//           color: #0077B6;
//           text-align: left;
//           padding-left: 1rem;
//         }

//         .status-available {
//           background: linear-gradient(135deg, #90EE90 0%, #76D776 100%);
//           color: white;
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.8rem;
//         }

//         .status-in-use {
//           background: linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%);
//           color: white;
//           padding: 0.4rem 0.8rem;
//           border-radius: 6px;
//           font-weight: 600;
//           font-size: 0.8rem;
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

//         /* Modal Styles */
//         .edusched-modal .modal-content {
//           border-radius: 16px;
//           border: none;
//           overflow: hidden;
//         }

//         .modal-header-custom {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           color: white;
//           padding: 1.5rem 2rem;
//           border: none;
//         }

//         .modal-header-custom .modal-title {
//           display: flex;
//           align-items: center;
//           font-weight: 700;
//           font-size: 1.3rem;
//           gap: 0.75rem;
//         }

//         .modal-header-custom .btn-close {
//           filter: brightness(0) invert(1);
//         }

//         .modal-body-custom {
//           padding: 2rem;
//         }

//         .form-label-custom {
//           font-weight: 600;
//           color: #03045E;
//           margin-bottom: 0.5rem;
//         }

//         .form-input-custom {
//           border: 2px solid #90E0EF;
//           border-radius: 10px;
//           padding: 0.75rem;
//           transition: all 0.3s ease;
//         }

//         .form-input-custom:focus {
//           border-color: #0077B6;
//           box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
//           outline: none;
//         }

//         .modal-footer-custom {
//           padding: 1.5rem 2rem;
//           border-top: 1px solid #E8F4F8;
//         }

//         .btn-primary-custom {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           border: none;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           color: white;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .btn-primary-custom:hover:not(:disabled) {
//           background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
//         }

//         .btn-secondary-custom {
//           background: white;
//           border: 2px solid #90E0EF;
//           color: #0077B6;
//           padding: 0.75rem 1.5rem;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn-secondary-custom:hover {
//           background: #F8FCFD;
//           border-color: #0077B6;
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

//         .room-loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
//           color: #0077B6;
//         }

//         /* Responsive Design */
//         @media (max-width: 992px) {
//           .room-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .header-actions {
//             width: 100%;
//           }

//           .action-btn {
//             flex: 1;
//             justify-content: center;
//           }

//           .building-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .building-stats {
//             margin-left: 0;
//             margin-top: 0.5rem;
//           }

//           .room-table {
//             font-size: 0.8rem;
//           }

//           .room-table th,
//           .room-table td {
//             padding: 0.5rem 0.25rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .room-management-container {
//             padding: 1rem;
//           }

//           .statistics-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .room-title {
//             font-size: 1.5rem;
//           }

//           .building-info {
//             flex-direction: column;
//             gap: 0.5rem;
//           }

//           .building-stat {
//             font-size: 0.75rem;
//             padding: 0.25rem 0.5rem;
//           }

//           .room-table {
//             font-size: 0.75rem;
//             display: block;
//             overflow-x: auto;
//           }

//           .edusched-toast {
//             left: 1rem;
//             right: 1rem;
//             min-width: auto;
//           }
//         }

//         @media (max-width: 576px) {
//           .room-management-container {
//             padding: 0.5rem;
//           }

//           .statistics-grid {
//             grid-template-columns: 1fr;
//           }

//           .room-title {
//             font-size: 1.3rem;
//           }

//           .building-name {
//             font-size: 1rem;
//           }

//           .delete-modal {
//             padding: 1.5rem;
//           }
//         }
//       `}</style>

//       <div className="room-management-container">
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
//         {showDeleteConfirm && (
//           <div className="delete-modal-overlay" onClick={() => !deleteLoading && setShowDeleteConfirm(null)}>
//             <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
//               <div className="delete-modal-header">
//                 <AlertCircle size={28} />
//                 <h3 className="delete-modal-title">Confirm Delete</h3>
//               </div>
//               <p className="delete-modal-body">
//                 Are you sure you want to delete this? This action cannot be undone.
//               </p>
//               <div className="delete-modal-footer">
//                 <button
//                   className="btn-secondary-custom"
//                   onClick={() => setShowDeleteConfirm(null)}
//                   disabled={deleteLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="btn-primary-custom"
//                   style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%)" }}
//                   onClick={() => {
//                     if (showDeleteConfirm.type === "building") {
//                       handleDeleteBuilding(showDeleteConfirm.id);
//                     } else if (showDeleteConfirm.type === "room") {
//                       handleDeleteRoom(showDeleteConfirm.id, showDeleteConfirm.buildingId);
//                     }
//                   }}
//                   disabled={deleteLoading}
//                 >
//                   {deleteLoading ? (
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

//         {/* Page Header */}
//         <div className="room-header">
//           <div className="room-title">
//             <Building2 size={36} />
//             Room Management
//           </div>
//           <div className="header-actions">
//             <button className="action-btn" onClick={() => setShowBuildingModal(true)}>
//               <Plus size={20} />
//               Add Building
//             </button>
//             <button className="action-btn" onClick={fetchBuildings}>
//               <RotateCw size={20} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Statistics Section */}
//         <div className="statistics-grid">
//           <div className="stat-card">
//             <div className="stat-label">Total Buildings</div>
//             <div className="stat-value">{overallStats.totalBuildings}</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-label">Total Rooms</div>
//             <div className="stat-value">{overallStats.totalRooms}</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-label">Total Schedules</div>
//             <div className="stat-value">{overallStats.totalSchedules}</div>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div style={{
//             borderRadius: "12px",
//             padding: "2rem",
//             textAlign: "center",
//             marginBottom: "2rem",
//             boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
//           }}>
//             <AlertCircle size={64} style={{ color: "#ff4444", marginBottom: "1rem" }} />
//             <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>Unable to Load Facilities</h4>
//             <p style={{ color: "#666", marginBottom: "1.5rem" }}>{error}</p>
//             <button className="action-btn" onClick={fetchBuildings}>
//               <RotateCw size={20} />
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Search Section */}
//         {!error && buildings.length > 0 && (
//           <div className="search-section">
//             <div className="search-icon-wrapper">
//               <Search className="search-icon" size={20} />
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Search buildings or rooms..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         )}

//         {/* Expand/Collapse Controls */}
//         {!error && filteredBuildings.length > 0 && (
//           <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
//             <button className="action-btn" onClick={expandAllBuildings} style={{ fontSize: "0.9rem" }}>
//               Expand All
//             </button>
//             <button className="action-btn" onClick={collapseAllBuildings} style={{ fontSize: "0.9rem" }}>
//               Collapse All
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {!error && buildings.length === 0 && (
//           <div style={{
//             background: "white",
//             borderRadius: "12px",
//             padding: "4rem 2rem",
//             textAlign: "center",
//             boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
//           }}>
//             <Building2 size={64} style={{ color: "#90E0EF", marginBottom: "1rem" }} />
//             <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>No Buildings Yet</h4>
//             <p style={{ color: "#666" }}>Create your first building to get started with room management.</p>
//           </div>
//         )}

//         {/* No Results State */}
//         {!error && buildings.length > 0 && filteredBuildings.length === 0 && (
//           <div style={{
//             background: "white",
//             borderRadius: "12px",
//             padding: "4rem 2rem",
//             textAlign: "center",
//             boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
//           }}>
//             <Search size={64} style={{ color: "#90E0EF", marginBottom: "1rem" }} />
//             <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>No Results Found</h4>
//             <p style={{ color: "#666" }}>Try adjusting your search criteria.</p>
//           </div>
//         )}

//         {/* Buildings List */}
//         {!error && filteredBuildings.map(building => {
//           const buildingStats = getBuildingStats(building);
//           const isExpanded = expandedBuildings[building.id] !== false;

//           return (
//             <div key={building.id} className="building-card">
//               <div
//                 className="building-header"
//                 onClick={() => toggleBuildingExpansion(building.id)}
//               >
//                 <div className="building-info">
//                   <div className="building-name">
//                     <Building2 size={22} />
//                     {building.name}
//                   </div>
//                   <div className="building-stats">
//                     <div className="building-stat">
//                       <DoorOpen size={14} />
//                       {buildingStats.totalRooms} room{buildingStats.totalRooms !== 1 ? "s" : ""}
//                     </div>
//                     <div className="building-stat">
//                       Utilization: {buildingStats.utilizationPercent}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="building-actions">
//                   <button
//                     className="icon-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleOpenRoomModal(building.id);
//                     }}
//                     title="Add Room"
//                   >
//                     <Plus size={18} />
//                   </button>
//                   <button
//                     className="icon-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setShowDeleteConfirm({ type: "building", id: building.id });
//                     }}
//                     title="Delete Building"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                   <ChevronDown className={`chevron-icon ${isExpanded ? "open" : ""}`} size={20} />
//                 </div>
//               </div>

//               {isExpanded && (
//                 <div className="building-content">
//                   {!building.rooms || building.rooms.length === 0 ? (
//                     <div className="empty-rooms">
//                       <p>No rooms added yet</p>
//                     </div>
//                   ) : (
//                     building.rooms.map(room => {
//                       const roomStats = getRoomStats(room);
                      
//                       return (
//                         <div key={room.id} className="room-section">
//                           <div className="room-header-custom">
//                             <div className="room-title-custom">
//                               <DoorOpen size={18} />
//                               {room.name}
//                             </div>
//                             <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginLeft: "auto" }}>
//                               <div className="room-stats-custom">
//                                 <div className="room-stat-badge">
//                                   {roomStats.usedSlots} / {roomStats.totalSlots} slots
//                                 </div>
//                                 <div className="room-stat-badge utilization-badge">
//                                   {roomStats.utilizationPercent}% utilized
//                                 </div>
//                               </div>
//                               <button
//                                 className="icon-btn"
//                                 onClick={() => setShowDeleteConfirm({ type: "room", id: room.id, buildingId: building.id })}
//                                 style={{ background: "#ff4444", marginLeft: "0.5rem" }}
//                                 title="Delete Room"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>

//                           <div style={{ overflowX: "auto" }}>
//                             <table className="room-table">
//                               <thead>
//                                 <tr>
//                                   <th>Time</th>
//                                   {days.map(day => (
//                                     <th key={day}>{day}</th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {timeSlots.map(slot => (
//                                   <tr key={slot.start}>
//                                     <td className="time-cell">
//                                       {formatTime(slot.start)} - {formatTime(slot.end)}
//                                     </td>
//                                     {days.map(day => {
//                                       const inUse = isRoomInUse(room, day, slot.start, slot.end);
//                                       return (
//                                         <td key={day}>
//                                           <span className={inUse ? "status-in-use" : "status-available"}>
//                                             {inUse ? "In Use" : "Available"}
//                                           </span>
//                                         </td>
//                                       );
//                                     })}
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {/* Add Building Modal */}
//         <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)} centered className="edusched-modal">
//           <Modal.Header closeButton className="modal-header-custom">
//             <Modal.Title>
//               <Building2 size={24} />
//               Add New Building
//             </Modal.Title>
//           </Modal.Header>
//           <Form onSubmit={handleAddBuilding}>
//             <Modal.Body className="modal-body-custom">
//               <Form.Group>
//                 <Form.Label className="form-label-custom">Building Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="e.g., Engineering Building A"
//                   value={newBuildingName}
//                   onChange={(e) => setNewBuildingName(e.target.value)}
//                   className="form-input-custom"
//                   disabled={modalLoading}
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer className="modal-footer-custom">
//               <button
//                 className="btn-secondary-custom"
//                 onClick={() => setShowBuildingModal(false)}
//                 disabled={modalLoading}
//               >
//                 Cancel
//               </button>
//               <button className="btn-primary-custom" type="submit" disabled={modalLoading}>
//                 {modalLoading ? (
//                   <>
//                     <Spinner size="sm" animation="border" />
//                     Adding...
//                   </>
//                 ) : (
//                   <>
//                     <Plus size={18} />
//                     Add Building
//                   </>
//                 )}
//               </button>
//             </Modal.Footer>
//           </Form>
//         </Modal>

//         {/* Add Room Modal */}
//         <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)} centered className="edusched-modal">
//           <Modal.Header closeButton className="modal-header-custom">
//             <Modal.Title>
//               <DoorOpen size={24} />
//               Add New Room
//             </Modal.Title>
//           </Modal.Header>
//           <Form onSubmit={handleAddRoom}>
//             <Modal.Body className="modal-body-custom">
//               <Form.Group className="mb-3">
//                 <Form.Label className="form-label-custom">Building</Form.Label>
//                 <Form.Select
//                   value={newRoom.buildingId}
//                   onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
//                   className="form-input-custom"
//                   disabled={modalLoading}
//                 >
//                   <option value="">Select Building</option>
//                   {buildings
//                     .filter(b => !selectedBuildingForRoom || b.id === Number(selectedBuildingForRoom))
//                     .map(b => (
//                       <option key={b.id} value={b.id}>{b.name}</option>
//                     ))}
//                 </Form.Select>
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label className="form-label-custom">Room Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="e.g., Main-101"
//                   value={newRoom.name}
//                   onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
//                   className="form-input-custom"
//                   disabled={modalLoading}
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer className="modal-footer-custom">
//               <button
//                 className="btn-secondary-custom"
//                 onClick={() => {
//                   setShowRoomModal(false);
//                   setSelectedBuildingForRoom(null);
//                 }}
//                 disabled={modalLoading}
//               >
//                 Cancel
//               </button>
//               <button className="btn-primary-custom" type="submit" disabled={modalLoading}>
//                 {modalLoading ? (
//                   <>
//                     <Spinner size="sm" animation="border" />
//                     Adding...
//                   </>
//                 ) : (
//                   <>
//                     <Plus size={18} />
//                     Add Room
//                   </>
//                 )}
//               </button>
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default RoomManagement;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Button, Modal, Form, Spinner, Badge, InputGroup } from "react-bootstrap";
import { Building2, DoorOpen, Search, Plus, RotateCw, Trash2, Edit, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const RoomManagement = () => {
  // State management
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBuildings, setExpandedBuildings] = useState({});
  const [toast, setToast] = useState(null);

  // Modal states
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newBuildingName, setNewBuildingName] = useState("");
  const [newRoom, setNewRoom] = useState({ name: "", buildingId: "" });
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedBuildingForRoom, setSelectedBuildingForRoom] = useState(null);

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const COLORS = {
    primary: "#03045E",
    secondary: "#023E8A",
    accent: "#0077B6",
    light: "#00B4D8",
    lighter: "#48CAE4",
    lightest: "#CAF0F8",
  };

  // Time slots: 7:00 AM to 7:00 PM
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 7; hour < 19; hour++) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
      slots.push({ start, end, hour });
    }
    return slots;
  }, []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /**
   * Format time from 24-hour to 12-hour format
   */
  const formatTime = useCallback((time) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  }, []);

  /**
   * Fetch all buildings with rooms and schedules
   */
  const fetchBuildings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/buildings`);
      if (!res.ok) throw new Error("Failed to fetch buildings");
      const data = await res.json();
      setBuildings(Array.isArray(data) ? data : []);
      
      // Initialize expanded state for all buildings
      const expandedState = {};
      data.forEach(b => {
        expandedState[b.id] = true;
      });
      setExpandedBuildings(expandedState);
    } catch (err) {
      console.error("Error fetching buildings:", err);
      setError(err.message);
      showToast("Failed to load buildings", "error");
    } finally {
      setLoading(false);
    }
  }, [API]);

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  /**
   * Toggle building expansion
   */
  const toggleBuildingExpansion = (buildingId) => {
    setExpandedBuildings(prev => ({
      ...prev,
      [buildingId]: !prev[buildingId]
    }));
  };

  /**
   * Expand all buildings
   */
  const expandAllBuildings = () => {
    const expanded = {};
    buildings.forEach(b => {
      expanded[b.id] = true;
    });
    setExpandedBuildings(expanded);
  };

  /**
   * Collapse all buildings
   */
  const collapseAllBuildings = () => {
    const collapsed = {};
    buildings.forEach(b => {
      collapsed[b.id] = false;
    });
    setExpandedBuildings(collapsed);
  };

  /**
   * Add new building
   */
  const handleAddBuilding = async (e) => {
    e.preventDefault();
    if (!newBuildingName.trim()) {
      showToast("Please enter a building name", "error");
      return;
    }

    setModalLoading(true);
    try {
      const res = await fetch(`${API}/api/buildings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBuildingName })
      });
      
      if (!res.ok) throw new Error("Failed to add building");
      
      const saved = await res.json();
      setBuildings(prev => [...prev, { ...saved, rooms: [] }]);
      setExpandedBuildings(prev => ({ ...prev, [saved.id]: true }));
      setNewBuildingName("");
      setShowBuildingModal(false);
      showToast(`Building "${saved.name}" added successfully`, "success");
    } catch (err) {
      console.error("Error adding building:", err);
      showToast(err.message || "Failed to add building", "error");
    } finally {
      setModalLoading(false);
    }
  };

  /**
   * Delete a building
   */
  const handleDeleteBuilding = async (buildingId) => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/api/buildings/${buildingId}`, {
        method: "DELETE"
      });
      
      if (!res.ok) throw new Error("Failed to delete building");
      
      setBuildings(prev => prev.filter(b => b.id !== buildingId));
      setShowDeleteConfirm(null);
      showToast("Building deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting building:", err);
      showToast("Failed to delete building", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Add new room
   */
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!newRoom.name.trim() || !newRoom.buildingId) {
      showToast("Please enter room name and select building", "error");
      return;
    }

    setModalLoading(true);
    try {
      const res = await fetch(`${API}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRoom.name,
          buildingId: Number(newRoom.buildingId)
        })
      });
      
      if (!res.ok) throw new Error("Failed to add room");
      
      const saved = await res.json();
      setBuildings(prev =>
        prev.map(b =>
          b.id === saved.buildingId
            ? { ...b, rooms: [...(b.rooms || []), saved] }
            : b
        )
      );
      setNewRoom({ name: "", buildingId: "" });
      setShowRoomModal(false);
      setSelectedBuildingForRoom(null);
      showToast(`Room "${saved.name}" added successfully`, "success");
    } catch (err) {
      console.error("Error adding room:", err);
      showToast(err.message || "Failed to add room", "error");
    } finally {
      setModalLoading(false);
    }
  };

  /**
   * Delete a room
   */
  const handleDeleteRoom = async (roomId, buildingId) => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/api/rooms/${roomId}`, {
        method: "DELETE"
      });
      
      if (!res.ok) throw new Error("Failed to delete room");
      
      setBuildings(prev =>
        prev.map(b =>
          b.id === buildingId
            ? { ...b, rooms: b.rooms.filter(r => r.id !== roomId) }
            : b
        )
      );
      setShowDeleteConfirm(null);
      showToast("Room deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting room:", err);
      showToast("Failed to delete room", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Open add room modal with pre-selected building
   */
  const handleOpenRoomModal = (buildingId) => {
    setSelectedBuildingForRoom(buildingId);
    setNewRoom({ name: "", buildingId: String(buildingId) });
    setShowRoomModal(true);
  };

  /**
   * Check if room is in use for a specific day/time slot
   */
  const isRoomInUse = useCallback((room, day, startTime, endTime) => {
    const schedules = room.schedules || [];
    return schedules.some(s => {
      if (s.day !== day) return false;
      return (
        (s.start_time <= startTime && s.end_time > startTime) ||
        (s.start_time < endTime && s.end_time >= endTime)
      );
    });
  }, []);

  /**
   * Calculate utilization statistics for a room
   */
  const getRoomStats = useCallback((room) => {
    const schedules = room.schedules || [];
    const totalSlots = timeSlots.length * days.length;
    const usedSlots = schedules.length;
    const utilizationPercent = Math.round((usedSlots / totalSlots) * 100);
    
    return {
      totalSlots,
      usedSlots,
      availableSlots: totalSlots - usedSlots,
      utilizationPercent
    };
  }, [timeSlots.length, days.length]);

  /**
   * Calculate utilization statistics for a building
   */
  const getBuildingStats = useCallback((building) => {
    const rooms = building.rooms || [];
    const totalRooms = rooms.length;
    const totalSlots = totalRooms * timeSlots.length * days.length;
    const totalUsedSlots = rooms.reduce((sum, r) => sum + (r.schedules?.length || 0), 0);
    const utilizationPercent = totalSlots > 0 ? Math.round((totalUsedSlots / totalSlots) * 100) : 0;
    
    return {
      totalRooms,
      totalUsedSlots,
      utilizationPercent
    };
  }, [timeSlots.length, days.length]);

  /**
   * Filter buildings based on search term
   */
  const filteredBuildings = useMemo(() => {
    return buildings.filter(b =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.rooms?.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [buildings, searchTerm]);

  /**
   * Calculate overall statistics
   */
  const overallStats = useMemo(() => {
    const totalBuildings = buildings.length;
    const totalRooms = buildings.reduce((sum, b) => sum + (b.rooms?.length || 0), 0);
    const totalSchedules = buildings.reduce((sum, b) =>
      sum + (b.rooms?.reduce((roomSum, r) => roomSum + (r.schedules?.length || 0), 0) || 0),
      0
    );
    
    return { totalBuildings, totalRooms, totalSchedules };
  }, [buildings]);

  // Fetch buildings on mount
  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  // Loading state
  if (loading) {
    return (
      <div className="room-loading-container">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading facilities...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* ============================================
           EduSched Room Management Styles
           ============================================ */

        .room-management-container {
          padding: 2rem;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
        }

        /* Page Header with Gradient */
        .page-header-room {
          margin-bottom: 2rem;
        }

        .page-title-section-gradient-room {
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

        .page-title-content-room {
          color: white;
        }

        .page-title-gradient-room {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .page-subtitle-gradient-room {
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

        .action-btn {
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
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Statistics Section */
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
          border-left: 4px solid #0077B6;
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
          color: #03045E;
        }

        /* Search Section */
        .search-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
        }

        .search-input {
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          width: 100%;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #0077B6;
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
        }

        .search-icon-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #0077B6;
          pointer-events: none;
        }

        /* Building Card */
        .building-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.1);
          margin-bottom: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
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

        .building-card:hover {
          box-shadow: 0 8px 24px rgba(0, 119, 182, 0.15);
        }

        .building-header {
          background: linear-gradient(135deg, #03045E 0%, #0077B6 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s ease;
        }

        .building-header:hover {
          background: linear-gradient(135deg, #023E8A 0%, #023E8A 100%);
        }

        .building-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .building-name {
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .building-stats {
          display: flex;
          gap: 1rem;
          margin-left: auto;
        }

        .building-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
        }

        .building-actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }

        .chevron-icon.open {
          transform: rotate(180deg);
        }

        /* Building Content */
        .building-content {
          padding: 1.5rem;
        }

        .empty-rooms {
          text-align: center;
          padding: 2rem;
          color: #999;
        }

        /* Room Section */
        .room-section {
          margin-bottom: 2rem;
        }

        .room-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #CAF0F8;
          border-radius: 10px;
          margin-bottom: 1rem;
          border-left: 4px solid #0077B6;
        }

        .room-title-custom {
          font-weight: 600;
          color: #03045E;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .room-stats-custom {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .room-stat-badge {
          background: white;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid #90E0EF;
        }

        .utilization-badge {
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          color: white;
          border: none;
        }

        /* Schedule Table */
        .room-table {
          border-collapse: collapse;
          width: 100%;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .room-table thead {
          background: #CAF0F8;
          color: #03045E;
        }

        .room-table th {
          padding: 0.75rem;
          font-weight: 600;
          text-align: center;
          border: 1px solid #90E0EF;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .room-table td {
          padding: 0.75rem;
          border: 1px solid #E8F4F8;
          text-align: center;
          vertical-align: middle;
          transition: all 0.3s ease;
        }

        .room-table tbody tr:nth-child(odd) {
          background: #FAFCFD;
        }

        .room-table tbody tr:hover {
          background: #E8F4F8;
        }

        .time-cell {
          font-weight: 500;
          color: #0077B6;
          text-align: left;
          padding-left: 1rem;
        }

        .status-available {
          background: linear-gradient(135deg, #90EE90 0%, #76D776 100%);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .status-in-use {
          background: linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.8rem;
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

        /* Modal Styles */
        .edusched-modal .modal-content {
          border-radius: 16px;
          border: none;
          overflow: hidden;
        }

        .modal-header-custom {
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          color: white;
          padding: 1.5rem 2rem;
          border: none;
        }

        .modal-header-custom .modal-title {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.3rem;
          gap: 0.75rem;
        }

        .modal-header-custom .btn-close {
          filter: brightness(0) invert(1);
        }

        .modal-body-custom {
          padding: 2rem;
        }

        .form-label-custom {
          font-weight: 600;
          color: #03045E;
          margin-bottom: 0.5rem;
        }

        .form-input-custom {
          border: 2px solid #90E0EF;
          border-radius: 10px;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }

        .form-input-custom:focus {
          border-color: #0077B6;
          box-shadow: 0 0 0 0.2rem rgba(0, 119, 182, 0.25);
          outline: none;
        }

        .modal-footer-custom {
          padding: 1.5rem 2rem;
          border-top: 1px solid #E8F4F8;
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary-custom:hover:not(:disabled) {
          background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
        }

        .btn-secondary-custom {
          background: white;
          border: 2px solid #90E0EF;
          color: #0077B6;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary-custom:hover {
          background: #F8FCFD;
          border-color: #0077B6;
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

        .room-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 100%);
          color: #0077B6;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .page-title-section-gradient-room {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .action-btn {
            flex: 1;
            justify-content: center;
          }

          .building-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .building-stats {
            margin-left: 0;
            margin-top: 0.5rem;
          }

          .room-table {
            font-size: 0.8rem;
          }

          .room-table th,
          .room-table td {
            padding: 0.5rem 0.25rem;
          }
        }

        @media (max-width: 768px) {
          .room-management-container {
            padding: 1rem;
          }

          .statistics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .page-title-gradient-room {
            font-size: 2rem;
          }

          .building-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .building-stat {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
          }

          .room-table {
            font-size: 0.75rem;
            display: block;
            overflow-x: auto;
          }

          .edusched-toast {
            left: 1rem;
            right: 1rem;
            min-width: auto;
          }
        }

        @media (max-width: 576px) {
          .room-management-container {
            padding: 0.5rem;
          }

          .statistics-grid {
            grid-template-columns: 1fr;
          }

          .page-title-gradient-room {
            font-size: 1.5rem;
          }

          .building-name {
            font-size: 1rem;
          }

          .delete-modal {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="room-management-container">
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
        {showDeleteConfirm && (
          <div className="delete-modal-overlay" onClick={() => !deleteLoading && setShowDeleteConfirm(null)}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-header">
                <AlertCircle size={28} />
                <h3 className="delete-modal-title">Confirm Delete</h3>
              </div>
              <p className="delete-modal-body">
                Are you sure you want to delete this? This action cannot be undone.
              </p>
              <div className="delete-modal-footer">
                <button
                  className="btn-secondary-custom"
                  onClick={() => setShowDeleteConfirm(null)}
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary-custom"
                  style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%)" }}
                  onClick={() => {
                    if (showDeleteConfirm.type === "building") {
                      handleDeleteBuilding(showDeleteConfirm.id);
                    } else if (showDeleteConfirm.type === "room") {
                      handleDeleteRoom(showDeleteConfirm.id, showDeleteConfirm.buildingId);
                    }
                  }}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
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

        {/* Page Header with Gradient */}
        <div className="page-header-room">
          <div className="page-title-section-gradient-room">
            <div className="page-title-content-room">
              <h1 className="page-title-gradient-room">
                <Building2 size={36} />
                Room Management
              </h1>
              <p className="page-subtitle-gradient-room">
                Manage buildings, rooms, and track facility utilization
              </p>
            </div>
            <div className="header-actions">
              <button className="action-btn" onClick={() => setShowBuildingModal(true)}>
                <Plus size={20} />
                Add Building
              </button>
              <button className="action-btn" onClick={fetchBuildings}>
                <RotateCw size={20} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="statistics-grid">
          <div className="stat-card">
            <div className="stat-label">Total Buildings</div>
            <div className="stat-value">{overallStats.totalBuildings}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Rooms</div>
            <div className="stat-value">{overallStats.totalRooms}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Schedules</div>
            <div className="stat-value">{overallStats.totalSchedules}</div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
            boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
          }}>
            <AlertCircle size={64} style={{ color: "#ff4444", marginBottom: "1rem" }} />
            <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>Unable to Load Facilities</h4>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>{error}</p>
            <button className="action-btn" onClick={fetchBuildings} style={{ 
              background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
              border: "none"
            }}>
              <RotateCw size={20} />
              Try Again
            </button>
          </div>
        )}

        {/* Search Section */}
        {!error && buildings.length > 0 && (
          <div className="search-section">
            <div className="search-icon-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search buildings or rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Expand/Collapse Controls */}
        {!error && filteredBuildings.length > 0 && (
          <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
            <button 
              className="action-btn" 
              onClick={expandAllBuildings} 
              style={{ 
                fontSize: "0.9rem",
                background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
                border: "none"
              }}
            >
              Expand All
            </button>
            <button 
              className="action-btn" 
              onClick={collapseAllBuildings} 
              style={{ 
                fontSize: "0.9rem",
                background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
                border: "none"
              }}
            >
              Collapse All
            </button>
          </div>
        )}

        {/* Empty State */}
        {!error && buildings.length === 0 && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "4rem 2rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
          }}>
            <Building2 size={64} style={{ color: "#90E0EF", marginBottom: "1rem" }} />
            <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>No Buildings Yet</h4>
            <p style={{ color: "#666" }}>Create your first building to get started with room management.</p>
          </div>
        )}

        {/* No Results State */}
        {!error && buildings.length > 0 && filteredBuildings.length === 0 && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "4rem 2rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 119, 182, 0.1)"
          }}>
            <Search size={64} style={{ color: "#90E0EF", marginBottom: "1rem" }} />
            <h4 style={{ color: "#03045E", marginBottom: "0.5rem" }}>No Results Found</h4>
            <p style={{ color: "#666" }}>Try adjusting your search criteria.</p>
          </div>
        )}

        {/* Buildings List */}
        {!error && filteredBuildings.map(building => {
          const buildingStats = getBuildingStats(building);
          const isExpanded = expandedBuildings[building.id] !== false;

          return (
            <div key={building.id} className="building-card">
              <div
                className="building-header"
                onClick={() => toggleBuildingExpansion(building.id)}
              >
                <div className="building-info">
                  <div className="building-name">
                    <Building2 size={22} />
                    {building.name}
                  </div>
                  <div className="building-stats">
                    <div className="building-stat">
                      <DoorOpen size={14} />
                      {buildingStats.totalRooms} room{buildingStats.totalRooms !== 1 ? "s" : ""}
                    </div>
                    <div className="building-stat">
                      Utilization: {buildingStats.utilizationPercent}%
                    </div>
                  </div>
                </div>
                <div className="building-actions">
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenRoomModal(building.id);
                    }}
                    title="Add Room"
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm({ type: "building", id: building.id });
                    }}
                    title="Delete Building"
                  >
                    <Trash2 size={18} />
                  </button>
                  <ChevronDown className={`chevron-icon ${isExpanded ? "open" : ""}`} size={20} />
                </div>
              </div>

              {isExpanded && (
                <div className="building-content">
                  {!building.rooms || building.rooms.length === 0 ? (
                    <div className="empty-rooms">
                      <p>No rooms added yet</p>
                    </div>
                  ) : (
                    building.rooms.map(room => {
                      const roomStats = getRoomStats(room);
                      
                      return (
                        <div key={room.id} className="room-section">
                          <div className="room-header-custom">
                            <div className="room-title-custom">
                              <DoorOpen size={18} />
                              {room.name}
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginLeft: "auto" }}>
                              <div className="room-stats-custom">
                                <div className="room-stat-badge">
                                  {roomStats.usedSlots} / {roomStats.totalSlots} slots
                                </div>
                                <div className="room-stat-badge utilization-badge">
                                  {roomStats.utilizationPercent}% utilized
                                </div>
                              </div>
                              <button
                                className="icon-btn"
                                onClick={() => setShowDeleteConfirm({ type: "room", id: room.id, buildingId: building.id })}
                                style={{ background: "#ff4444", marginLeft: "0.5rem" }}
                                title="Delete Room"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div style={{ overflowX: "auto" }}>
                            <table className="room-table">
                              <thead>
                                <tr>
                                  <th>Time</th>
                                  {days.map(day => (
                                    <th key={day}>{day}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {timeSlots.map(slot => (
                                  <tr key={slot.start}>
                                    <td className="time-cell">
                                      {formatTime(slot.start)} - {formatTime(slot.end)}
                                    </td>
                                    {days.map(day => {
                                      const inUse = isRoomInUse(room, day, slot.start, slot.end);
                                      return (
                                        <td key={day}>
                                          <span className={inUse ? "status-in-use" : "status-available"}>
                                            {inUse ? "In Use" : "Available"}
                                          </span>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Building Modal */}
        <Modal show={showBuildingModal} onHide={() => setShowBuildingModal(false)} centered className="edusched-modal">
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              <Building2 size={24} />
              Add New Building
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddBuilding}>
            <Modal.Body className="modal-body-custom">
              <Form.Group>
                <Form.Label className="form-label-custom">Building Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Engineering Building A"
                  value={newBuildingName}
                  onChange={(e) => setNewBuildingName(e.target.value)}
                  className="form-input-custom"
                  disabled={modalLoading}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
              <button
                className="btn-secondary-custom"
                onClick={() => setShowBuildingModal(false)}
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button className="btn-primary-custom" type="submit" disabled={modalLoading}>
                {modalLoading ? (
                  <>
                    <Spinner size="sm" animation="border" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Building
                  </>
                )}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Add Room Modal */}
        <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)} centered className="edusched-modal">
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              <DoorOpen size={24} />
              Add New Room
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddRoom}>
            <Modal.Body className="modal-body-custom">
              <Form.Group className="mb-3">
                <Form.Label className="form-label-custom">Building</Form.Label>
                <Form.Select
                  value={newRoom.buildingId}
                  onChange={(e) => setNewRoom({ ...newRoom, buildingId: e.target.value })}
                  className="form-input-custom"
                  disabled={modalLoading}
                >
                  <option value="">Select Building</option>
                  {buildings
                    .filter(b => !selectedBuildingForRoom || b.id === Number(selectedBuildingForRoom))
                    .map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="form-label-custom">Room Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Main-101"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="form-input-custom"
                  disabled={modalLoading}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
              <button
                className="btn-secondary-custom"
                onClick={() => {
                  setShowRoomModal(false);
                  setSelectedBuildingForRoom(null);
                }}
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button className="btn-primary-custom" type="submit" disabled={modalLoading}>
                {modalLoading ? (
                  <>
                    <Spinner size="sm" animation="border" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Room
                  </>
                )}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default RoomManagement;