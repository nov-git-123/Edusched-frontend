// import React from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Register chart components
// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// const DeanDashboard = () => {
//   // Example chart data (can be connected to backend API later)
//   const facultyData = {
//     labels: ["CS", "IT", "Education", "Business", "Engineering"],
//     datasets: [
//       {
//         label: "Faculty per Department",
//         data: [12, 18, 9, 14, 7],
//         backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6f42c1"],
//       },
//     ],
//   };

//   const roomData = {
//     labels: ["Morning", "Afternoon", "Evening"],
//     datasets: [
//       {
//         label: "Room Utilization (%)",
//         data: [75, 60, 45],
//         backgroundColor: ["#20c997", "#fd7e14", "#6610f2"],
//       },
//     ],
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         className="bg-dark text-white p-3"
//         style={{ width: "250px", minHeight: "100vh" }}
//       >
//         <h4 className="mb-4">EduSched</h4>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link text-white">📊 Dashboard</a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link text-white">📅 Schedules</a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link text-white">👨‍🏫 Faculty</a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link text-white">🏫 Rooms</a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link text-white">📑 Reports</a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link text-white">⚙ Settings</a>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 bg-light">
//         {/* Top Navbar */}
//         <nav className="navbar navbar-light bg-white shadow-sm px-4">
//           <span className="navbar-brand">Welcome, Dean 👋</span>
//           <div className="d-flex align-items-center">
//             <span className="me-3">Dean John Doe</span>
//             <img
//               src="/images/dean-avatar.png"
//               alt="Profile"
//               className="rounded-circle"
//               width="40"
//               height="40"
//             />
//           </div>
//         </nav>

//         {/* Content */}
//         <Container fluid className="p-4">
//           <Row className="mb-4">
//             <Col md={3}>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6>Pending Requests</h6>
//                   <h3>8</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6>Faculty Members</h6>
//                   <h3>60</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6>Available Rooms</h6>
//                   <h3>15</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6>Conflict Alerts</h6>
//                   <h3>3</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Card className="shadow-sm border-0 mb-4">
//                 <Card.Body>
//                   <h6 className="mb-3">Faculty Distribution</h6>
//                   <Pie data={facultyData} />
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card className="shadow-sm border-0 mb-4">
//                 <Card.Body>
//                   <h6 className="mb-3">Room Utilization</h6>
//                   <Bar data={roomData} />
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6>Recent Activity</h6>
//                   <ul className="list-unstyled mt-3">
//                     <li>✅ Schedule for BSCS 3A approved</li>
//                     <li>⚠ Conflict detected: Room 201 double-booked</li>
//                     <li>👨‍🏫 New faculty added: Prof. Santos</li>
//                   </ul>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DeanDashboard;

// import React from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);


// const DeanDashboard: React.FC = () => {
//   // Example chart data
//   const facultyData = {
//     labels: ["CS", "IT", "Education", "Business", "Engineering"],
//     datasets: [
//       {
//         label: "Faculty per Department",
//         data: [12, 18, 9, 14, 7],
//         backgroundColor: [
//           "#0077B6",
//           "#0096C7",
//           "#00B4D8",
//           "#48CAE4",
//           "#90E0EF",
//         ],
//       },
//     ],
//   };

//   const roomData = {
//     labels: ["Morning", "Afternoon", "Evening"],
//     datasets: [
//       {
//         label: "Room Utilization",
//         data: [75, 60, 45],
//         backgroundColor: ["#023E8A", "#0077B6", "#00B4D8"],
//       },
//     ],
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         className="text-white p-3"
//         style={{ width: "250px", minHeight: "100vh", backgroundColor: "#03045E" }}
//       >
//         <h4 className="mb-4 fw-bold">EduSched</h4>
//         <ul className="nav flex-column">
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">📊 Dashboard</a>
//   </li>
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">👨‍🏫 Instructors</a>
//   </li>
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">📚 Courses</a>
//   </li>
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">🏫 Rooms</a>
//   </li>
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">📑 Reports</a>
//   </li>
//   <li className="nav-item mb-2">
//     <a href="#" className="nav-link text-white">⚙ Profile / Settings</a>
//   </li>
//   <li className="nav-item">
//     <a href="#" className="nav-link text-white">🚪 Logout</a>
//   </li>
// </ul>

//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 bg-light">
//         {/* Top Navbar */}
//         <nav
//           className="navbar navbar-light shadow-sm px-4"
//           style={{ backgroundColor: "#FFFFFF", borderBottom: "3px solid #0096C7" }}
//         >
//           <span className="navbar-brand fw-semibold">Welcome, Dean 👋</span>
//           <div className="d-flex align-items-center">
//             <span className="me-3 fw-bold text-primary">Dean John Doe</span>
//             <img
//               src="/images/dean-avatar.png"
//               alt="Profile"
//               className="rounded-circle border border-2"
//               style={{ borderColor: "#0096C7" }}
//               width="40"
//               height="40"
//             />
//           </div>
//         </nav>

//         {/* Content */}
//         <Container fluid className="p-4">
//           {/* Stats Cards */}
//           <Row className="mb-4">
//             {[
//               { title: "Pending Requests", value: 8, color: "#0077B6" },
//               { title: "Faculty Members", value: 60, color: "#0096C7" },
//               { title: "Available Rooms", value: 15, color: "#00B4D8" },
//               { title: "Conflict Alerts", value: 3, color: "#FF6B6B" },
//             ].map((stat, index) => (
//               <Col md={3} key={index}>
//                 <Card className="shadow-sm border-0">
//                   <Card.Body style={{ backgroundColor: "#CAF0F8", borderTop: `5px solid ${stat.color}` }}>
//                     <h6 className="fw-semibold">{stat.title}</h6>
//                     <h3 className="fw-bold text-dark">{stat.value}</h3>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Charts */}
//           <Row>
//             <Col md={6}>
//               <Card className="shadow-sm border-0 mb-4">
//                 <Card.Body>
//                   <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>
//                     Faculty Distribution
//                   </h6>
//                   <Pie data={facultyData} />
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card className="shadow-sm border-0 mb-4">
//                 <Card.Body>
//                   <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>
//                     Room Utilization
//                   </h6>
//                   <Bar data={roomData} />
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Recent Activity */}
//           <Row>
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <h6 className="fw-bold mb-3" style={{ color: "#03045E" }}>
//                     Recent Activity
//                   </h6>
//                   <ul className="list-unstyled mt-2">
//                     <li>✅ Schedule for BSCS 3A approved</li>
//                     <li>⚠ Conflict detected: Room 201 double-booked</li>
//                     <li>👨‍🏫 New faculty added: Prof. Santos</li>
//                   </ul>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DeanDashboard;

//DEANDASHBOARD

// import React from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// const DeanDashboard = () => {
//   const facultyData = {
//     labels: ["BSIT", "BSBA", "BSHM", "BSTM", "BSCRIM", "BSAIS", "BTLED"],
//     datasets: [
//       {
//         label: "Faculty per Department",
//         data: [12, 18, 9, 14, 7],
//         backgroundColor: ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"],
//       },
//     ],
//   };

//   const roomData = {
//     labels: ["Morning", "Afternoon", "Evening"],
//     datasets: [
//       {
//         label: "Room Utilization",
//         data: [75, 60, 45],
//         backgroundColor: ["#023E8A", "#0077B6", "#00B4D8"],
//       },
//     ],
//   };

//   return (
//     <Container fluid className="p-0">
//       {/* Stats */}
//       <Row className="mb-4">
//         {[
//           { title: "Pending Requests", value: 8, color: "#0077B6" },
//           { title: "Faculty Members", value: 60, color: "#0096C7" },
//           { title: "Available Rooms", value: 15, color: "#00B4D8" },
//           { title: "Conflict Alerts", value: 3, color: "#FF6B6B" },
//         ].map((stat, i) => (
//           <Col md={3} key={i} className="mb-3">
//             <Card className="shadow-sm border-0">
//               <Card.Body style={{ backgroundColor: "#CAF0F8", borderTop: `5px solid ${stat.color}` }}>
//                 <h6 className="fw-semibold">{stat.title}</h6>
//                 <h3 className="fw-bold text-dark">{stat.value}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Charts */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>Faculty Distribution</h6>
//               <Pie data={facultyData} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>Room Utilization</h6>
//               <Bar data={roomData} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Activity */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="fw-bold mb-3" style={{ color: "#03045E" }}>Recent Activity</h6>
//               <ul className="list-unstyled mt-2">
//                 <li>✅ Schedule for BSCS 3A approved</li>
//                 <li>⚠ Conflict detected: Room 201 double-booked</li>
//                 <li>👨‍🏫 New faculty added: Prof. Santos</li>
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DeanDashboard;

// import React, { useEffect, useState } from "react";
// import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// const DeanDashboard = () => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [stats, setStats] = useState({
//     pending: 0,
//     faculty: 0,
//     rooms: 0,
//     conflicts: 0,
//   });

//   const [facultyDist, setFacultyDist] = useState({});
//   const [roomUtil, setRoomUtil] = useState({});
//   const [activities, setActivities] = useState([]);

//   // Helper: categorize slot_index into Morning / Afternoon / Evening
//   const categorizeSlot = (slotIndex) => {
//     if (slotIndex < 4) return "Morning"; // slots 0–3
//     if (slotIndex < 7) return "Afternoon"; // slots 4–6
//     return "Evening"; // slots 7+
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // 1. Instructors
//         const instructorsRes = await fetch(`${API}/api/instructors`);
//         const instructors = await instructorsRes.json();

//         // 2. Rooms
//         const roomsRes = await fetch(`${API}/api/rooms`);
//         const rooms = await roomsRes.json();

//         // 3. Schedules
//         const schedRes = await fetch(`${API}/api/scheduler`);
//         const schedules = await schedRes.json();

//         // --- Stats ---
//         setStats({
//           pending: 5, // 🔹 Example: replace with /api/requests if you have one
//           faculty: instructors.length,
//           rooms: rooms.length,
//           conflicts: schedules.filter((s) => s.conflict).length, // mark conflicts if available
//         });

//         // --- Faculty Distribution (group instructors by course_code) ---
//         const distMap = {};
//         instructors.forEach((i) => {
//           const course = i.course_code || "Unassigned";
//           distMap[course] = (distMap[course] || 0) + 1;
//         });
//         setFacultyDist(distMap);

//         // --- Room Utilization (group schedules by time of day) ---
//         const utilMap = { Morning: 0, Afternoon: 0, Evening: 0 };
//         schedules.forEach((s) => {
//           utilMap[categorizeSlot(s.slot_index)]++;
//         });
//         setRoomUtil(utilMap);

//         // --- Recent Activity (mock: latest 5 schedules) ---
//         const activityLogs = schedules.slice(-5).map((s) => {
//           return `✅ ${s.subject_code} assigned to ${s.section_name} (${s.day}, slot ${s.slot_index})`;
//         });
//         setActivities(activityLogs);

//         setLoading(false);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Failed to load dashboard data.");
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Faculty Pie Data
//   const facultyData = {
//     labels: Object.keys(facultyDist),
//     datasets: [
//       {
//         label: "Faculty per Department",
//         data: Object.values(facultyDist),
//         backgroundColor: ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"],
//       },
//     ],
//   };

//   // Room Bar Data
//   const roomData = {
//     labels: Object.keys(roomUtil),
//     datasets: [
//       {
//         label: "Room Utilization",
//         data: Object.values(roomUtil),
//         backgroundColor: ["#023E8A", "#0077B6", "#00B4D8"],
//       },
//     ],
//   };

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
//   if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

//   return (
//     <Container fluid className="p-0">
//       {/* Stats */}
//       <Row className="mb-4">
//         {[
//           { title: "Pending Requests", value: stats.pending, color: "#0077B6" },
//           { title: "Faculty Members", value: stats.faculty, color: "#0096C7" },
//           { title: "Available Rooms", value: stats.rooms, color: "#00B4D8" },
//           { title: "Conflict Alerts", value: stats.conflicts, color: "#FF6B6B" },
//         ].map((stat, i) => (
//           <Col md={3} key={i} className="mb-3">
//             <Card className="shadow-sm border-0">
//               <Card.Body style={{ backgroundColor: "#CAF0F8", borderTop: `5px solid ${stat.color}` }}>
//                 <h6 className="fw-semibold">{stat.title}</h6>
//                 <h3 className="fw-bold text-dark">{stat.value}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Charts */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>Faculty Distribution</h6>
//               <Pie data={facultyData} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>Room Utilization</h6>
//               <Bar data={roomData} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Activity */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="fw-bold mb-3" style={{ color: "#03045E" }}>Recent Activity</h6>
//               <ul className="list-unstyled mt-2">
//                 {activities.length > 0 ? (
//                   activities.map((act, i) => <li key={i}>{act}</li>)
//                 ) : (
//                   <li className="text-muted">No recent activity</li>
//                 )}
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DeanDashboard;

//toolkit

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// import { Tabs, Tab } from "react-bootstrap";

// const DeanDashboard = () => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [stats, setStats] = useState({
//     pending: 0,
//     faculty: 0,
//     rooms: 0,
//     conflicts: 0,
//   });

//   const [facultyDist, setFacultyDist] = useState([]);
//   const [roomUtil, setRoomUtil] = useState([]);
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch(`${API}/api/dashboard`);
//         const data = await res.json();

//         if (!res.ok) throw new Error(data.error || "Failed to fetch dashboard");

//         // ✅ Stats
//         setStats({
//           pending: 5, // sample placeholder
//           faculty: data.counts?.instructors || 0,
//           rooms: data.counts?.rooms || 0,
//           conflicts: data.counts?.conflicts || 0,
//         });

//         // ✅ Faculty Distribution
//         const facultyArray =
//           data.facultyDistribution?.map((f) => ({
//             name: f.course_code || "Unassigned",
//             value: f.count,
//           })) || [];
//         setFacultyDist(facultyArray);

//         // ✅ Room Utilization
//         const roomArray = Object.entries(
//           data.roomUtilization || {
//             Morning: 0,
//             Afternoon: 0,
//             Evening: 0,
//           }
//         ).map(([label, value]) => ({ name: label, value }));
//         setRoomUtil(roomArray);

//         // ✅ Activities
//         const logs =
//           data.recent?.map(
//             (s) =>
//               `✅ ${s.subject_code} (${s.section_name}) → ${s.instructor_name} in ${s.room_name} [${s.day}, Slot ${s.slot_index}]`
//           ) || [];
//         setActivities(logs);

//         setLoading(false);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Failed to load dashboard data.");
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, [API]);

//   // 🎨 Chart Colors
//   const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

//   if (loading)
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   if (error)
//     return (
//       <Alert variant="danger" className="mt-4 text-center fw-semibold">
//         {error}
//       </Alert>
//     );

//   return (
//     <div className="p-4">
//       <h2 className="fw-bold mb-3" style={{ color: "#023E8A" }}>
//         📊 Dean Dashboard
//       </h2>
//       <p className="text-muted mb-4">
//         Overview of scheduling metrics and recent system activities
//       </p>

//       <Tabs defaultActiveKey="stats" className="mb-4">
//         {/* 🧾 Stats */}
//         <Tab eventKey="stats" title="Overview">
//           <div className="d-flex flex-wrap gap-3">
//             {[
//               { title: "Pending Requests", value: stats.pending, color: "#0077B6" },
//               { title: "Faculty Members", value: stats.faculty, color: "#0096C7" },
//               { title: "Available Rooms", value: stats.rooms, color: "#00B4D8" },
//               { title: "Conflict Alerts", value: stats.conflicts, color: "#FF6B6B" },
//             ].map((stat, i) => (
//               <Card
//                 key={i}
//                 className="shadow-sm border-0 flex-fill"
//                 style={{
//                   minWidth: "220px",
//                   backgroundColor: "#CAF0F8",
//                   borderTop: `5px solid ${stat.color}`,
//                 }}
//               >
//                 <CardBody>
//                   <CardTitle className="fw-semibold text-secondary">
//                     {stat.title}
//                   </CardTitle>
//                   <h3 className="fw-bold text-dark">{stat.value}</h3>
//                 </CardBody>
//               </Card>
//             ))}
//           </div>
//         </Tab>

//         {/* 📈 Charts */}
//         <Tab eventKey="charts" title="Charts">
//           <div className="row mt-3">
//             {/* Faculty Distribution */}
//             <div className="col-md-6 mb-4">
//               <Card className="shadow-sm border-0">
//                 <CardBody>
//                   <CardTitle
//                     className="fw-bold mb-3"
//                     style={{ color: "#023E8A" }}
//                   >
//                     Faculty Distribution
//                   </CardTitle>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={facultyDist}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={100}
//                         label
//                       >
//                         {facultyDist.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </CardBody>
//               </Card>
//             </div>

//             {/* Room Utilization */}
//             <div className="col-md-6 mb-4">
//               <Card className="shadow-sm border-0">
//                 <CardBody>
//                   <CardTitle
//                     className="fw-bold mb-3"
//                     style={{ color: "#023E8A" }}
//                   >
//                     Room Utilization
//                   </CardTitle>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={roomUtil}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="value" fill="#00B4D8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardBody>
//               </Card>
//             </div>
//           </div>
//         </Tab>

//         {/* 📝 Activity */}
//         <Tab eventKey="activity" title="Recent Activity">
//           <Card className="shadow-sm border-0 mt-3">
//             <CardBody>
//               <CardTitle className="fw-bold mb-3" style={{ color: "#023E8A" }}>
//                 Recent Activity
//               </CardTitle>
//               <ul className="list-unstyled mt-2">
//                 {activities.length > 0 ? (
//                   activities.map((act, i) => (
//                     <li key={i} className="mb-2 text-dark">
//                       {act}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-muted">No recent activity</li>
//                 )}
//               </ul>
//             </CardBody>
//           </Card>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default DeanDashboard;

// edusched-frontend/src/pages/DeanDashboard.js

//FUNCTIONAL
// import React { useEffect, useState } from "react";
// import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title
// );

// const DeanDashboard = () => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [stats, setStats] = useState({
//     pending: 0,
//     faculty: 0,
//     rooms: 0,
//     conflicts: 0,
//   });

//   const [facultyDist, setFacultyDist] = useState({});
//   const [roomUtil, setRoomUtil] = useState({});
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch(`${API}/api/dashboard`);
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.error || "Failed to fetch dashboard data");
//         }

//         // --- Stats ---
//         setStats({
//           pending: 5, // Example placeholder
//           faculty: data.counts?.instructors || 0,
//           rooms: data.counts?.rooms || 0,
//           conflicts: data.counts?.conflicts || 0,
//         });

//         // --- Faculty Distribution ---
//         const distMap = {};
//         data.facultyDistribution?.forEach((f) => {
//           distMap[f.course_code || "Unassigned"] = f.count;
//         });
//         setFacultyDist(distMap);

//         // --- Room Utilization ---
//         setRoomUtil(data.roomUtilization || { Morning: 0, Afternoon: 0, Evening: 0 });

//         // --- Recent Activity ---
//         const activityLogs =
//           data.recent?.map((s) => {
//             return `✅ ${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name} in ${s.room_name} [${s.day}, slot ${s.slot_index}]`;
//           }) || [];
//         setActivities(activityLogs);

//         setLoading(false);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Failed to load dashboard data.");
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [API]);

//   // Faculty Pie Data
//   const facultyData = {
//     labels: Object.keys(facultyDist),
//     datasets: [
//       {
//         label: "Faculty per Department",
//         data: Object.values(facultyDist),
//         backgroundColor: ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"],
//       },
//     ],
//   };

//   // Room Bar Data
//   const roomData = {
//     labels: Object.keys(roomUtil),
//     datasets: [
//       {
//         label: "Room Utilization",
//         data: Object.values(roomUtil),
//         backgroundColor: ["#023E8A", "#0077B6", "#00B4D8"],
//       },
//     ],
//   };

//   if (loading)
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

//   return (
//     <Container fluid className="p-0">
//       {/* Stats */}
//       <Row className="mb-4">
//         {[
//           { title: "Pending Requests", value: stats.pending, color: "#0077B6" },
//           { title: "Faculty Members", value: stats.faculty, color: "#0096C7" },
//           { title: "Available Rooms", value: stats.rooms, color: "#00B4D8" },
//           { title: "Conflict Alerts", value: stats.conflicts, color: "#FF6B6B" },
//         ].map((stat, i) => (
//           <Col md={3} key={i} className="mb-3">
//             <Card className="shadow-sm border-0">
//               <Card.Body
//                 style={{
//                   backgroundColor: "#CAF0F8",
//                   borderTop: `5px solid ${stat.color}`,
//                 }}
//               >
//                 <h6 className="fw-semibold">{stat.title}</h6>
//                 <h3 className="fw-bold text-dark">{stat.value}</h3>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Charts */}
//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>
//                 Faculty Distribution
//               </h6>
//               <Pie data={facultyData} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="mb-3 fw-bold" style={{ color: "#023E8A" }}>
//                 Room Utilization
//               </h6>
//               <Bar data={roomData} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Activity */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <h6 className="fw-bold mb-3" style={{ color: "#03045E" }}>
//                 Recent Activity
//               </h6>
//               <ul className="list-unstyled mt-2">
//                 {activities.length > 0 ? (
//                   activities.map((act, i) => <li key={i}>{act}</li>)
//                 ) : (
//                   <li className="text-muted">No recent activity</li>
//                 )}
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DeanDashboard;

// import React, { useEffect, useState, useMemo } from "react";
// import "../../styles/DeanDashboard.css";

// import {
//   Users,
//   DoorOpen,
//   Clock,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   Calendar,
//   Moon,
//   Sun,
//   Bell,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // ==================== SUB-COMPONENTS ====================

// const StatsCard = ({ title, value, icon: Icon, color, trend, loading }) => {
//   if (loading) {
//     return (
//       <div className="stat-card skeleton">
//         <div className="skeleton-content"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="stat-card" style={{ borderTopColor: color }}>
//       <div className="stat-card-header">
//         <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
//           <Icon size={24} style={{ color }} />
//         </div>
//         {trend && (
//           <div className={`trend-badge ${trend.direction}`}>
//             {trend.direction === "up" ? (
//               <TrendingUp size={14} />
//             ) : (
//               <TrendingDown size={14} />
//             )}
//             <span>{trend.value}%</span>
//           </div>
//         )}
//       </div>
//       <div className="stat-card-body">
//         <h6 className="stat-title">{title}</h6>
//         <h2 className="stat-value">{value}</h2>
//       </div>
//     </div>
//   );
// };

// const ChartCard = ({ title, children, loading }) => (
//   <div className={`chart-card ${loading ? "skeleton" : "fade-in"}`}>
//     <div className="chart-card-header">
//       <h6>{title}</h6>
//     </div>
//     <div className="chart-card-body">
//       {loading ? <div className="chart-skeleton"></div> : children}
//     </div>
//   </div>
// );

// const ActivityList = ({ activities, loading }) => (
//   <div className="activity-card fade-in">
//     <div className="activity-header">
//       <h6>Recent Scheduling Activity</h6>
//       {!loading && <span className="badge">{activities.length} events</span>}
//     </div>
//     {loading ? (
//       <div className="activity-skeleton"></div>
//     ) : (
//       <div className="activity-list">
//         {activities.length > 0 ? (
//           activities.map((act, i) => (
//             <div key={i} className="activity-item">
//               <CheckCircle size={16} className="activity-icon" />
//               <span className="activity-text">{act}</span>
//             </div>
//           ))
//         ) : (
//           <div className="activity-empty">
//             <Clock size={32} className="empty-icon" />
//             <p>No recent activity</p>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// );

// const InstructorTable = ({ instructors, loading }) => (
//   <div className="instructor-table fade-in">
//     <div className="table-header">
//       <h6>Recently Active Instructors</h6>
//     </div>
//     {loading ? (
//       <div className="table-skeleton"></div>
//     ) : (
//       <div className="table-responsive">
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Department</th>
//               <th>Load</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {instructors.map((inst, i) => (
//               <tr key={i}>
//                 <td className="instructor-name">{inst.name}</td>
//                 <td>{inst.department}</td>
//                 <td>
//                   <div className="load-bar">
//                     <div
//                       className="load-fill"
//                       style={{
//                         width: `${inst.load}%`,
//                         backgroundColor:
//                           inst.load > 80 ? "#FF6B6B" : "#0077B6",
//                       }}
//                     ></div>
//                     <span>{inst.load}%</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span
//                     className={`status-badge ${
//                       inst.status === "Active" ? "success" : "secondary"
//                     }`}
//                   >
//                     {inst.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>
// );

// const ErrorBoundary = ({ error, onRetry }) => (
//   <div className="error-boundary">
//     <div className="error-content">
//       <XCircle size={48} className="error-icon" />
//       <h5>Failed to Load Dashboard Data</h5>
//       <p>{error}</p>
//       <button className="retry-btn" onClick={onRetry}>
//         Retry
//       </button>
//     </div>
//   </div>
// );

// const NotificationBanner = ({ conflicts }) => {
//   if (conflicts === 0) return null;
//   return (
//     <div className="notification-banner">
//       <AlertTriangle size={20} />
//       <span>
//         <strong>{conflicts} scheduling conflicts</strong> detected. Review
//         required.
//       </span>
//       <button className="banner-action">Review</button>
//     </div>
//   );
// };

// const Dropdown = ({ label, options, value, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="dropdown">
//       <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
//         <Calendar size={16} /> {value}
//       </button>
//       {isOpen && (
//         <div className="dropdown-menu">
//           {options.map((option, i) => (
//             <div
//               key={i}
//               className="dropdown-item"
//               onClick={() => {
//                 onChange(option);
//                 setIsOpen(false);
//               }}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== MAIN COMPONENT ====================

// const DeanDashboard = () => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [timeFilter, setTimeFilter] = useState("This Month");

//   const [stats, setStats] = useState({
//     pending: 0,
//     faculty: 0,
//     rooms: 0,
//     conflicts: 0,
//   });

//   const [trends] = useState({
//     pending: { direction: "up", value: 12 },
//     faculty: { direction: "up", value: 5 },
//     rooms: { direction: "down", value: 3 },
//     conflicts: { direction: "down", value: 8 },
//   });

//   const [facultyDist, setFacultyDist] = useState([]);
//   const [roomUtil, setRoomUtil] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [instructors, setInstructors] = useState([]);

//   const greeting = useMemo(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   }, []);

//   const currentDate = useMemo(
//     () =>
//       new Date().toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//     []
//   );

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch(`${API}/api/dashboard`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch dashboard data");

//       setStats({
//         pending: data.counts?.pending || 12,
//         faculty: data.counts?.instructors || 45,
//         rooms: data.counts?.rooms || 28,
//         conflicts: data.counts?.conflicts || 3,
//       });

//       const distArray =
//         data.facultyDistribution?.map((f) => ({
//           name: f.course_code || "Unassigned",
//           value: f.count,
//         })) || [
//           { name: "CS", value: 15 },
//           { name: "IT", value: 12 },
//           { name: "IS", value: 10 },
//           { name: "DS", value: 8 },
//         ];
//       setFacultyDist(distArray);

//       const utilData = data.roomUtilization || {
//         Morning: 12,
//         Afternoon: 18,
//         Evening: 8,
//       };
//       setRoomUtil(Object.entries(utilData).map(([k, v]) => ({ name: k, value: v })));

//       const activityLogs =
//         data.recent?.map(
//           (s) =>
//             `${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name} in ${s.room_name} [${s.day}, slot ${s.slot_index}]`
//         ) || [
//           "CS101 (Section A) assigned to Dr. Maria Santos in Room 301 [Monday, slot 1]",
//           "IT202 (Section B) assigned to Prof. John Reyes in Room 205 [Tuesday, slot 3]",
//           "IS303 (Section C) assigned to Dr. Ana Cruz in Room 401 [Wednesday, slot 2]",
//         ];
//       setActivities(activityLogs);

//       setInstructors([
//         { name: "Dr. Maria Santos", department: "CS", load: 85, status: "Active" },
//         { name: "Prof. John Reyes", department: "IT", load: 72, status: "Active" },
//         { name: "Dr. Ana Cruz", department: "IS", load: 45, status: "Active" },
//         { name: "Prof. Mark Lopez", department: "CS", load: 90, status: "Active" },
//       ]);

//       setLoading(false);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//       setError(err.message || "Failed to load dashboard data.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, [timeFilter]);

//   const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

//   if (error)
//     return (
//       <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
//         <ErrorBoundary error={error} onRetry={fetchDashboardData} />
//       </div>
//     );

//   return (
//     <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
//       {/* HEADER */}
//       <div className="dashboard-header">
//         <div className="header-content">
//           <div>
//             <h1 className="dashboard-title">Dean Dashboard</h1>
//             <p className="dashboard-subtitle">
//               {greeting}, Dean! • {currentDate}
//             </p>
//           </div>
//           <div className="header-actions">
//             <Dropdown
//               label="Time Filter"
//               value={timeFilter}
//               options={["This Week", "This Month", "This Semester"]}
//               onChange={setTimeFilter}
//             />
//             <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className="icon-btn notification-btn">
//               <Bell size={20} />
//               {stats.conflicts > 0 && <span className="notification-dot"></span>}
//             </button>
//           </div>
//         </div>
//       </div>

//       <NotificationBanner conflicts={stats.conflicts} />

//       {/* STATS SECTION */}
//       <div className="stats-grid">
//         <StatsCard
//           title="Pending Requests"
//           value={stats.pending}
//           icon={Clock}
//           color="#0077B6"
//           trend={trends.pending}
//           loading={loading}
//         />
//         <StatsCard
//           title="Faculty Members"
//           value={stats.faculty}
//           icon={Users}
//           color="#0096C7"
//           trend={trends.faculty}
//           loading={loading}
//         />
//         <StatsCard
//           title="Available Rooms"
//           value={stats.rooms}
//           icon={DoorOpen}
//           color="#00B4D8"
//           trend={trends.rooms}
//           loading={loading}
//         />
//         <StatsCard
//           title="Conflict Alerts"
//           value={stats.conflicts}
//           icon={AlertTriangle}
//           color="#FF6B6B"
//           trend={trends.conflicts}
//           loading={loading}
//         />
//       </div>

//       {/* CHARTS */}
//       <div className="charts-grid">
//         <ChartCard title="Faculty Distribution by Department" loading={loading}>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={facultyDist}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {facultyDist.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Room Utilization by Time Slot" loading={loading}>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={roomUtil}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* ACTIVITY + TABLE */}
//       <div className="content-grid">
//         <ActivityList activities={activities} loading={loading} />
//         <InstructorTable instructors={instructors} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default DeanDashboard;

//OLD DESIGN
// import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
// import {
//   Users,
//   DoorOpen,
//   Clock,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   Calendar,
//   Moon,
//   Sun,
//   Bell,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Download,
//   Search,
//   Filter,
//   ChevronDown,
//   FileText,
//   Activity,
//   BarChart3,
//   GraduationCap,
//   ArrowUpRight,
//   ArrowDownRight,
//   Info,
//   X,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // ==================== CUSTOM HOOKS ====================

// /**
//  * Custom hook for fetching and managing dashboard data
//  * Handles loading states, error handling, and data transformations
//  */
// const useDashboardData = (timeFilter) => {
//   const API = "http://localhost:5000";
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     stats: { pending: 0, faculty: 0, rooms: 0, conflicts: 0 },
//     facultyDist: [],
//     roomUtil: [],
//     activities: [],
//     instructors: [],
//     trends: {
//       pending: { direction: "up", value: 12 },
//       faculty: { direction: "up", value: 5 },
//       rooms: { direction: "down", value: 3 },
//       conflicts: { direction: "down", value: 8 },
//     },
//   });

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Simulate API call with timeout for demo
//       await new Promise(resolve => setTimeout(resolve, 1200));
      
//       // Mock data - replace with actual API call
//       const mockData = {
//         counts: { pending: 12, instructors: 45, rooms: 28, conflicts: 3 },
//         facultyDistribution: [
//           { course_code: "BSIT", count: 15 },
//           { course_code: "BSBA", count: 12 },
//           { course_code: "BSTM", count: 10 },
//           { course_code: "BSHM", count: 8 },
//           { course_code: "BSCRIM", count: 8 },
//           { course_code: "BTLED", count: 8 },
//           { course_code: "BSAIS", count: 8 },
//         ],
//         roomUtilization: { Morning: 12, Afternoon: 18 },
//         recent: [
//           { subject_code: "CS101", section_name: "A", instructor_name: "Joshua Lasac", room_name: "301", day: "Monday", slot_index: 1 },
//           { subject_code: "IT202", section_name: "B", instructor_name: "Charisse Yambao", room_name: "205", day: "Tuesday", slot_index: 3 },
//           { subject_code: "IS303", section_name: "C", instructor_name: "Karl Erosa", room_name: "401", day: "Wednesday", slot_index: 2 },
//         ],
//       };

//       setDashboardData({
//         stats: {
//           pending: mockData.counts.pending,
//           faculty: mockData.counts.instructors,
//           rooms: mockData.counts.rooms,
//           conflicts: mockData.counts.conflicts,
//         },
//         facultyDist: mockData.facultyDistribution.map(f => ({
//           name: f.course_code,
//           value: f.count,
//         })),
//         roomUtil: Object.entries(mockData.roomUtilization).map(([k, v]) => ({
//           name: k,
//           value: v,
//         })),
//         activities: mockData.recent.map(s =>
//           `${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name} in Room ${s.room_name} [${s.day}, slot ${s.slot_index}]`
//         ),
//         instructors: [
//           { name: "Joshua Lasac", department: "BSIT", load: 85, status: "Active" },
//           { name: "Karl Erosa", department: "BSAIS", load: 72, status: "Active" },
//           { name: "Charisse Yambao", department: "BSBA", load: 45, status: "Active" },
//           { name: "Karl Erosa", department: "BSHM", load: 90, status: "Active" },
//         ],
//         trends: dashboardData.trends,
//       });

//       setLastUpdated(new Date());
//       setLoading(false);
//     } catch (err) {
//       setError(err.message || "Failed to load dashboard data");
//       setLoading(false);
//     }
//   }, [timeFilter]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { ...dashboardData, loading, error, lastUpdated, refetch: fetchData };
// };

// /**
//  * Custom hook for theme management with localStorage persistence
//  */
// const useTheme = () => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("edusched-theme");
//     return saved === "dark";
//   });

//   const toggleTheme = useCallback(() => {
//     setDarkMode(prev => {
//       const newMode = !prev;
//       localStorage.setItem("edusched-theme", newMode ? "dark" : "light");
//       return newMode;
//     });
//   }, []);

//   return { darkMode, toggleTheme };
// };

// // ==================== ANIMATED COUNTER ====================

// const AnimatedCounter = ({ value, duration = 1000 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (start === end) return;

//     const timer = setInterval(() => {
//       start += Math.ceil(end / (duration / 50));
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <span>{count}</span>;
// };

// // ==================== TOAST NOTIFICATION ====================

// const Toast = ({ message, type, onClose }) => (
//   <div className={`toast toast-${type}`} style={{
//     position: 'fixed',
//     top: '20px',
//     right: '20px',
//     background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
//     color: 'white',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     animation: 'slideIn 0.3s ease-out',
//     zIndex: 10000,
//   }}>
//     <span>{message}</span>
//     <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
//       <X size={16} />
//     </button>
//   </div>
// );

// // ==================== DASHBOARD HEADER ====================

// const DashboardHeader = ({ darkMode, toggleTheme, onRefresh, refreshing, conflictCount, onExport }) => {
//   const greeting = useMemo(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   }, []);

//   const currentDate = useMemo(() =>
//     new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }), []
//   );

//   return (
//     <div className="dashboard-header" style={{
//       background: darkMode 
//         ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
//         : 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
//       padding: '32px 40px',
//       borderRadius: '16px',
//       marginBottom: '24px',
//       boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//       animation: 'fadeIn 0.5s ease-out',
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
//             <GraduationCap size={32} color="white" />
//             <h1 style={{ 
//               fontSize: '32px', 
//               fontWeight: '700', 
//               color: 'white',
//               margin: 0,
//               letterSpacing: '-0.5px',
//             }}>
//               EduSched Dean Dashboard
//             </h1>
//           </div>
//           <p style={{ 
//             fontSize: '16px', 
//             color: 'rgba(255,255,255,0.9)',
//             margin: 0,
//             fontWeight: '400',
//           }}>
//             {greeting}, Dean! • {currentDate}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//           <button onClick={onExport} style={{
//             padding: '10px 20px',
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             fontSize: '14px',
//             fontWeight: '500',
//             transition: 'all 0.2s',
//           }} onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
//              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.2)'}>
//             <Download size={18} />
//             Export Report
//           </button>
          
//           <button onClick={onRefresh} disabled={refreshing} style={{
//             padding: '10px',
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             cursor: refreshing ? 'not-allowed' : 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             transition: 'all 0.2s',
//           }}>
//             <RefreshCw size={20} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
//           </button>
          
//           <button onClick={toggleTheme} style={{
//             padding: '10px',
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             transition: 'all 0.2s',
//           }}>
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <button style={{
//             padding: '10px',
//             background: 'rgba(255,255,255,0.2)',
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             position: 'relative',
//             transition: 'all 0.2s',
//           }}>
//             <Bell size={20} />
//             {conflictCount > 0 && (
//               <span style={{
//                 position: 'absolute',
//                 top: '-4px',
//                 right: '-4px',
//                 background: '#ef4444',
//                 color: 'white',
//                 borderRadius: '50%',
//                 width: '20px',
//                 height: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '11px',
//                 fontWeight: '600',
//               }}>{conflictCount}</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== STATS CARD ====================

// const StatsCard = ({ title, value, icon: Icon, color, trend, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div style={{
//         background: darkMode ? '#1e293b' : 'white',
//         borderRadius: '16px',
//         padding: '24px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//         animation: 'pulse 1.5s ease-in-out infinite',
//       }}>
//         <div style={{ height: '120px', background: darkMode ? '#334155' : '#f1f5f9', borderRadius: '8px' }} />
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       background: darkMode ? '#1e293b' : 'white',
//       borderRadius: '16px',
//       padding: '24px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//       borderTop: `4px solid ${color}`,
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       animation: 'fadeIn 0.5s ease-out',
//     }} onMouseEnter={e => {
//       e.currentTarget.style.transform = 'translateY(-4px)';
//       e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
//     }} onMouseLeave={e => {
//       e.currentTarget.style.transform = 'translateY(0)';
//       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//         <div style={{
//           background: `${color}20`,
//           padding: '12px',
//           borderRadius: '12px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <Icon size={24} color={color} />
//         </div>
        
//         {trend && (
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             padding: '4px 8px',
//             borderRadius: '6px',
//             background: trend.direction === 'up' ? '#10b98120' : '#ef444420',
//             color: trend.direction === 'up' ? '#10b981' : '#ef4444',
//             fontSize: '13px',
//             fontWeight: '600',
//           }}>
//             {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//             {trend.value}%
//           </div>
//         )}
//       </div>
      
//       <h3 style={{ 
//         fontSize: '36px', 
//         fontWeight: '700', 
//         margin: '0 0 8px 0',
//         color: darkMode ? 'white' : '#1e293b',
//       }}>
//         <AnimatedCounter value={value} />
//       </h3>
      
//       <p style={{ 
//         fontSize: '14px', 
//         color: darkMode ? '#94a3b8' : '#64748b',
//         margin: 0,
//         fontWeight: '500',
//       }}>
//         {title}
//       </p>
//     </div>
//   );
// };

// // ==================== STATS GRID ====================

// const StatsGrid = ({ stats, trends, loading, darkMode }) => (
//   <div style={{
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//     gap: '20px',
//     marginBottom: '24px',
//   }}>
//     <StatsCard
//       title="Pending Requests"
//       value={stats.pending}
//       icon={Clock}
//       color="#0077B6"
//       trend={trends.pending}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Faculty Members"
//       value={stats.faculty}
//       icon={Users}
//       color="#0096C7"
//       trend={trends.faculty}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Available Rooms"
//       value={stats.rooms}
//       icon={DoorOpen}
//       color="#00B4D8"
//       trend={trends.rooms}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Conflict Alerts"
//       value={stats.conflicts}
//       icon={AlertTriangle}
//       color="#ef4444"
//       trend={trends.conflicts}
//       loading={loading}
//       darkMode={darkMode}
//     />
//   </div>
// );

// // ==================== CHART SECTION ====================

// const ChartSection = ({ facultyDist, roomUtil, loading, darkMode }) => {
//   const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{
//           background: darkMode ? '#1e293b' : 'white',
//           padding: '12px 16px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           border: `2px solid ${COLORS[0]}`,
//         }}>
//           <p style={{ margin: 0, fontWeight: '600', color: darkMode ? 'white' : '#1e293b' }}>
//             {payload[0].name}: {payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
//         {[1, 2].map(i => (
//           <div key={i} style={{
//             background: darkMode ? '#1e293b' : 'white',
//             borderRadius: '16px',
//             padding: '24px',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//           }}>
//             <div style={{ height: '300px', background: darkMode ? '#334155' : '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
//       <div style={{
//         background: darkMode ? '#1e293b' : 'white',
//         borderRadius: '16px',
//         padding: '24px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//         animation: 'fadeIn 0.5s ease-out',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: darkMode ? 'white' : '#1e293b' }}>
//             Faculty Distribution by Department
//           </h3>
//           <Info size={18} color={darkMode ? '#94a3b8' : '#64748b'} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={facultyDist}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {facultyDist.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', textAlign: 'center', marginTop: '16px' }}>
//           CS department leads with 33% faculty allocation
//         </p>
//       </div>

//       <div style={{
//         background: darkMode ? '#1e293b' : 'white',
//         borderRadius: '16px',
//         padding: '24px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//         animation: 'fadeIn 0.5s ease-out',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: darkMode ? 'white' : '#1e293b' }}>
//             Room Utilization by Time Slot
//           </h3>
//           <Info size={18} color={darkMode ? '#94a3b8' : '#64748b'} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={roomUtil}>
//             <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
//             <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#64748b'} />
//             <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', textAlign: 'center', marginTop: '16px' }}>
//           Afternoon slots show highest utilization at 47%
//         </p>
//       </div>
//     </div>
//   );
// };

// // ==================== ACTIVITY FEED ====================

// const ActivityFeed = ({ activities, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div style={{
//         background: darkMode ? '#1e293b' : 'white',
//         borderRadius: '16px',
//         padding: '24px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//       }}>
//         <div style={{ height: '300px', background: darkMode ? '#334155' : '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       background: darkMode ? '#1e293b' : 'white',
//       borderRadius: '16px',
//       padding: '24px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//       animation: 'fadeIn 0.5s ease-out',
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: darkMode ? 'white' : '#1e293b' }}>
//           Recent Scheduling Activity
//         </h3>
//         <span style={{
//           background: '#0077B620',
//           color: '#0077B6',
//           padding: '4px 12px',
//           borderRadius: '12px',
//           fontSize: '13px',
//           fontWeight: '600',
//         }}>
//           {activities.length} events
//         </span>
//       </div>

//       <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//         {activities.length > 0 ? (
//           activities.map((act, i) => (
//             <div key={i} style={{
//               display: 'flex',
//               alignItems: 'flex-start',
//               gap: '12px',
//               padding: '12px',
//               borderRadius: '8px',
//               marginBottom: '8px',
//               background: darkMode ? '#334155' : '#f8fafc',
//               transition: 'all 0.2s',
//               cursor: 'pointer',
//             }} onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#475569' : '#e2e8f0'}
//                onMouseLeave={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}>
//               <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
//               <span style={{ fontSize: '14px', color: darkMode ? '#e2e8f0' : '#475569', lineHeight: '1.6' }}>
//                 {act}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px 20px', color: darkMode ? '#94a3b8' : '#64748b' }}>
//             <Activity size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
//             <p>No recent activity</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ==================== FACULTY TABLE ====================

// const FacultyTable = ({ instructors, loading, darkMode }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDept, setFilterDept] = useState("All");

//   const filteredInstructors = useMemo(() => {
//     return instructors.filter(inst => {
//       const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDept = filterDept === "All" || inst.department === filterDept;
//       return matchesSearch && matchesDept;
//     });
//   }, [instructors, searchTerm, filterDept]);

//   if (loading) {
//     return (
//       <div style={{
//         background: darkMode ? '#1e293b' : 'white',
//         borderRadius: '16px',
//         padding: '24px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//       }}>
//         <div style={{ height: '300px', background: darkMode ? '#334155' : '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       background: darkMode ? '#1e293b' : 'white',
//       borderRadius: '16px',
//       padding: '24px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//       animation: 'fadeIn 0.5s ease-out',
//     }}>
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: darkMode ? 'white' : '#1e293b' }}>
//           Recently Active Faculty
//         </h3>
        
//         <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//           <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
//             <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
//             <input
//               type="text"
//               placeholder="Search instructors..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '10px 12px 10px 40px',
//                 borderRadius: '8px',
//                 border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
//                 background: darkMode ? '#334155' : '#f8fafc',
//                 color: darkMode ? 'white' : '#1e293b',
//                 fontSize: '14px',
//                 outline: 'none',
//               }}
//             />
//           </div>
          
//           <select
//             value={filterDept}
//             onChange={(e) => setFilterDept(e.target.value)}
//             style={{
//               padding: '10px 36px 10px 12px',
//               borderRadius: '8px',
//               border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
//               background: darkMode ? '#334155' : '#f8fafc',
//               color: darkMode ? 'white' : '#1e293b',
//               fontSize: '14px',
//               cursor: 'pointer',
//               outline: 'none',
//             }}
//           >
//             <option>All</option>
//             <option>BSIT</option>
//             <option>BSBA</option>
//             <option>BTLED</option>
//             <option>BSTM</option>
//           </select>
//         </div>
//       </div>

//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ borderBottom: darkMode ? '2px solid #334155' : '2px solid #e2e8f0' }}>
//               <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: darkMode ? '#94a3b8' : '#64748b' }}>Instructor</th>
//               <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: darkMode ? '#94a3b8' : '#64748b' }}>Department</th>
//               <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: darkMode ? '#94a3b8' : '#64748b' }}>Load</th>
//               <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: darkMode ? '#94a3b8' : '#64748b' }}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInstructors.map((inst, i) => (
//               <tr key={i} style={{
//                 borderBottom: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
//                 transition: 'all 0.2s',
//               }} onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}
//                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                 <td style={{ padding: '16px 12px', fontSize: '14px', fontWeight: '600', color: darkMode ? 'white' : '#1e293b' }}>
//                   {inst.name}
//                 </td>
//                 <td style={{ padding: '16px 12px', fontSize: '14px', color: darkMode ? '#e2e8f0' : '#475569' }}>
//                   {inst.department}
//                 </td>
//                 <td style={{ padding: '16px 12px' }}>
//                   <div style={{ position: 'relative', width: '100%', maxWidth: '120px' }}>
//                     <div style={{
//                       width: '100%',
//                       height: '8px',
//                       background: darkMode ? '#334155' : '#e2e8f0',
//                       borderRadius: '4px',
//                       overflow: 'hidden',
//                     }}>
//                       <div style={{
//                         width: `${inst.load}%`,
//                         height: '100%',
//                         background: inst.load > 80 ? '#ef4444' : inst.load > 60 ? '#f59e0b' : '#10b981',
//                         borderRadius: '4px',
//                         transition: 'width 0.5s ease-out',
//                       }} />
//                     </div>
//                     <span style={{ fontSize: '13px', fontWeight: '600', color: darkMode ? '#e2e8f0' : '#475569', marginTop: '4px', display: 'block' }}>
//                       {inst.load}%
//                     </span>
//                   </div>
//                 </td>
//                 <td style={{ padding: '16px 12px' }}>
//                   <span style={{
//                     padding: '4px 12px',
//                     borderRadius: '12px',
//                     fontSize: '12px',
//                     fontWeight: '600',
//                     background: inst.status === 'Active' ? '#10b98120' : '#64748b20',
//                     color: inst.status === 'Active' ? '#10b981' : '#64748b',
//                   }}>
//                     {inst.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ==================== QUICK INSIGHTS PANEL ====================

// const QuickInsights = ({ stats, darkMode }) => (
//   <div style={{
//     background: darkMode ? '#1e293b' : 'white',
//     borderRadius: '16px',
//     padding: '24px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//     animation: 'fadeIn 0.5s ease-out',
//     marginBottom: '24px',
//   }}>
//     <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0', color: darkMode ? 'white' : '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
//       <BarChart3 size={22} color="#0077B6" />
//       Quick Insights
//     </h3>
    
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
//       <div style={{
//         padding: '16px',
//         background: darkMode ? '#334155' : '#f8fafc',
//         borderRadius: '12px',
//         borderLeft: '4px solid #0077B6',
//       }}>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', margin: '0 0 8px 0' }}>Total Schedules</p>
//         <p style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? 'white' : '#1e293b', margin: 0 }}>
//           <AnimatedCounter value={156} />
//         </p>
//       </div>
      
//       <div style={{
//         padding: '16px',
//         background: darkMode ? '#334155' : '#f8fafc',
//         borderRadius: '12px',
//         borderLeft: '4px solid #10b981',
//       }}>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', margin: '0 0 8px 0' }}>Avg. Room Utilization</p>
//         <p style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? 'white' : '#1e293b', margin: 0 }}>78%</p>
//       </div>
      
//       <div style={{
//         padding: '16px',
//         background: darkMode ? '#334155' : '#f8fafc',
//         borderRadius: '12px',
//         borderLeft: '4px solid #f59e0b',
//       }}>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', margin: '0 0 8px 0' }}>Peak Hours</p>
//         <p style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? 'white' : '#1e293b', margin: 0 }}>1-3 PM</p>
//       </div>
      
//       <div style={{
//         padding: '16px',
//         background: darkMode ? '#334155' : '#f8fafc',
//         borderRadius: '12px',
//         borderLeft: '4px solid #8b5cf6',
//       }}>
//         <p style={{ fontSize: '13px', color: darkMode ? '#94a3b8' : '#64748b', margin: '0 0 8px 0' }}>Efficiency Score</p>
//         <p style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? 'white' : '#1e293b', margin: 0 }}>92%</p>
//       </div>
//     </div>
//   </div>
// );

// // ==================== ERROR BOUNDARY ====================

// const ErrorBoundary = ({ error, onRetry, darkMode }) => (
//   <div style={{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '400px',
//     background: darkMode ? '#1e293b' : 'white',
//     borderRadius: '16px',
//     padding: '40px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//   }}>
//     <div style={{ textAlign: 'center', maxWidth: '400px' }}>
//       <XCircle size={64} color="#ef4444" style={{ marginBottom: '20px' }} />
//       <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? 'white' : '#1e293b', marginBottom: '12px' }}>
//         Failed to Load Dashboard
//       </h3>
//       <p style={{ fontSize: '14px', color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '24px' }}>
//         {error}
//       </p>
//       <button onClick={onRetry} style={{
//         padding: '12px 32px',
//         background: '#0077B6',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '14px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         transition: 'all 0.2s',
//       }} onMouseEnter={e => e.target.style.background = '#005f8f'}
//          onMouseLeave={e => e.target.style.background = '#0077B6'}>
//         Retry Loading
//       </button>
//     </div>
//   </div>
// );

// // ==================== MAIN DASHBOARD COMPONENT ====================

// const DeanDashboard = () => {
//   const { darkMode, toggleTheme } = useTheme();
//   const [timeFilter, setTimeFilter] = useState("This Month");
//   const [toast, setToast] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     stats,
//     trends,
//     facultyDist,
//     roomUtil,
//     activities,
//     instructors,
//     loading,
//     error,
//     lastUpdated,
//     refetch,
//   } = useDashboardData(timeFilter);

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//     setToast({ message: "Dashboard refreshed successfully", type: "success" });
//     setTimeout(() => setToast(null), 3000);
//   }, [refetch]);

//   const handleExport = useCallback(() => {
//     setToast({ message: "Exporting report... (PDF generation)", type: "success" });
//     setTimeout(() => setToast(null), 3000);
//     // Implement actual PDF export logic here
//   }, []);

//   const timeAgo = useMemo(() => {
//     if (!lastUpdated) return "";
//     const seconds = Math.floor((new Date() - lastUpdated) / 1000);
//     if (seconds < 60) return `${seconds} seconds ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
//   }, [lastUpdated]);

//   if (error) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         background: darkMode ? '#0f172a' : '#f1f5f9',
//         padding: '20px',
//         transition: 'background 0.3s ease',
//       }}>
//         <ErrorBoundary error={error} onRetry={refetch} darkMode={darkMode} />
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: darkMode ? '#0f172a' : '#ADE8F4 ',
//       padding: '20px',
//       transition: 'background 0.3s ease',
//     }}>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
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
//           background: ${darkMode ? '#1e293b' : '#f1f5f9'};
//         }
//         ::-webkit-scrollbar-thumb {
//           background: ${darkMode ? '#475569' : '#cbd5e1'};
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: ${darkMode ? '#64748b' : '#94a3b8'};
//         }
//       `}</style>

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
//         <DashboardHeader
//           darkMode={darkMode}
//           toggleTheme={toggleTheme}
//           onRefresh={handleRefresh}
//           refreshing={refreshing}
//           conflictCount={stats.conflicts}
//           onExport={handleExport}
//         />

//         {stats.conflicts > 0 && (
//           <div style={{
//             background: '#fef2f2',
//             border: '1px solid #fecaca',
//             borderRadius: '12px',
//             padding: '16px 20px',
//             marginBottom: '24px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             animation: 'fadeIn 0.5s ease-out',
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <AlertTriangle size={22} color="#ef4444" />
//               <span style={{ fontSize: '14px', color: '#991b1b', fontWeight: '500' }}>
//                 <strong>{stats.conflicts} scheduling conflict{stats.conflicts > 1 ? 's' : ''}</strong> detected and require immediate review
//               </span>
//             </div>
//             <button style={{
//               padding: '8px 20px',
//               background: '#ef4444',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               fontSize: '13px',
//               fontWeight: '600',
//               cursor: 'pointer',
//             }}>
//               Review Now
//             </button>
//           </div>
//         )}

//         {lastUpdated && (
//           <div style={{
//             textAlign: 'right',
//             fontSize: '13px',
//             color: darkMode ? '#94a3b8' : '#64748b',
//             marginBottom: '16px',
//           }}>
//             Last updated: {timeAgo}
//           </div>
//         )}

//         <StatsGrid stats={stats} trends={trends} loading={loading} darkMode={darkMode} />
        
//         <QuickInsights stats={stats} darkMode={darkMode} />
        
//         <ChartSection
//           facultyDist={facultyDist}
//           roomUtil={roomUtil}
//           loading={loading}
//           darkMode={darkMode}
//         />

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//           gap: '20px',
//         }}>
//           <ActivityFeed activities={activities} loading={loading} darkMode={darkMode} />
//           <FacultyTable instructors={instructors} loading={loading} darkMode={darkMode} />
//         </div>

//         <div style={{
//           marginTop: '32px',
//           padding: '20px',
//           textAlign: 'center',
//           fontSize: '13px',
//           color: darkMode ? '#64748b' : '#94a3b8',
//         }}>
//           <p style={{ margin: 0 }}>
//             EduSched Academic Management System © 2025 • Built for Excellence in Education
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeanDashboard;

//GOOD DASHBOARD

// import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
// import {
//   Users,
//   DoorOpen,
//   Clock,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   Calendar,
//   Moon,
//   Sun,
//   Bell,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Download,
//   Search,
//   Filter,
//   ChevronDown,
//   FileText,
//   Activity,
//   BarChart3,
//   GraduationCap,
//   ArrowUpRight,
//   ArrowDownRight,
//   Info,
//   X,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // ==================== CUSTOM HOOKS ====================
// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };
// const useDashboardData = (timeFilter) => {
//   const API = "http://localhost:5000";
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     stats: { pending: 0, faculty: 0, rooms: 0, conflicts: 0 },
//     facultyDist: [],
//     roomUtil: [],
//     activities: [],
//     instructors: [],
//     trends: {
//       pending: { direction: "up", value: 12 },
//       faculty: { direction: "up", value: 5 },
//       rooms: { direction: "down", value: 3 },
//       conflicts: { direction: "down", value: 8 },
//     },
//   });

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       await new Promise(resolve => setTimeout(resolve, 1200));
      
//       const mockData = {
//         counts: { pending: 12, instructors: 45, rooms: 28, conflicts: 3 },
//         facultyDistribution: [
//           { course_code: "BSIT", count: 15 },
//           { course_code: "BSBA", count: 12 },
//           { course_code: "BSTM", count: 10 },
//           { course_code: "BSHM", count: 8 },
//           { course_code: "BSCRIM", count: 8 },
//           { course_code: "BTLED", count: 8 },
//           { course_code: "BSAIS", count: 8 },
//         ],
//         roomUtilization: { Morning: 12, Afternoon: 18 },
//         recent: [
//           { subject_code: "CS101", section_name: "A", instructor_name: "Joshua Lasac", room_name: "301", day: "Monday", slot_index: 1 },
//           { subject_code: "IT202", section_name: "B", instructor_name: "Charisse Yambao", room_name: "205", day: "Tuesday", slot_index: 3 },
//           { subject_code: "IS303", section_name: "C", instructor_name: "Karl Erosa", room_name: "401", day: "Wednesday", slot_index: 2 },
//         ],
//       };

//       setDashboardData({
//         stats: {
//           pending: mockData.counts.pending,
//           faculty: mockData.counts.instructors,
//           rooms: mockData.counts.rooms,
//           conflicts: mockData.counts.conflicts,
//         },
//         facultyDist: mockData.facultyDistribution.map(f => ({
//           name: f.course_code,
//           value: f.count,
//         })),
//         roomUtil: Object.entries(mockData.roomUtilization).map(([k, v]) => ({
//           name: k,
//           value: v,
//         })),
//         activities: mockData.recent.map(s =>
//           `${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name} in Room ${s.room_name} [${s.day}, slot ${s.slot_index}]`
//         ),
//         instructors: [
//           { name: "Joshua Lasac", department: "BSIT", load: 85, status: "Active" },
//           { name: "Karl Erosa", department: "BSAIS", load: 72, status: "Active" },
//           { name: "Charisse Yambao", department: "BSBA", load: 45, status: "Active" },
//           { name: "Karl Erosa", department: "BSHM", load: 90, status: "Active" },
//         ],
//         trends: dashboardData.trends,
//       });

//       setLastUpdated(new Date());
//       setLoading(false);
//     } catch (err) {
//       setError(err.message || "Failed to load dashboard data");
//       setLoading(false);
//     }
//   }, [timeFilter]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { ...dashboardData, loading, error, lastUpdated, refetch: fetchData };
// };

// const useTheme = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = useCallback(() => {
//     setDarkMode(prev => !prev);
//   }, []);

//   return { darkMode, toggleTheme };
// };

// // ==================== ANIMATED COUNTER ====================

// const AnimatedCounter = ({ value, duration = 1000 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (start === end) return;

//     const timer = setInterval(() => {
//       start += Math.ceil(end / (duration / 50));
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <span>{count}</span>;
// };

// // ==================== TOAST NOTIFICATION ====================

// const Toast = ({ message, type, onClose }) => (
//   <div className="toast" style={{
//     position: 'fixed',
//     top: '20px',
//     right: '20px',
//     background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
//     color: 'white',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     zIndex: 10000,
//   }}>
//     <span>{message}</span>
//     <button onClick={onClose} className="toast-close">
//       <X size={16} />
//     </button>
//   </div>
// );

// // ==================== DASHBOARD HEADER ====================

// const DashboardHeader = ({ darkMode, toggleTheme, onRefresh, refreshing, conflictCount, onExport }) => {
//   const greeting = useMemo(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   }, []);

//   const currentDate = useMemo(() =>
//     new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }), []
//   );

//   return (
//     <div className="dashboard-header">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
//             <GraduationCap size={32} color="white" />
//             <h1 className="header-title">
//               EduSched Dean Dashboard
//             </h1>
//           </div>
//           <p className="header-subtitle">
//             {greeting}, Dean! • {currentDate}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//           <button onClick={onExport} className="header-btn">
//             <Download size={18} />
//             Export Report
//           </button>
          
//           <button onClick={onRefresh} disabled={refreshing} className="header-btn">
//             <RefreshCw size={20} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
//           </button>
          
//           <button onClick={toggleTheme} className="header-btn">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <button className="header-btn notification-btn">
//             <Bell size={20} />
//             {conflictCount > 0 && (
//               <span className="notification-badge">{conflictCount}</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== STATS CARD ====================

// const StatsCard = ({ title, value, icon: Icon, color, trend, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="stats-card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="stats-card" onMouseEnter={e => {
//       e.currentTarget.style.transform = 'translateY(-4px)';
//       e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
//     }} onMouseLeave={e => {
//       e.currentTarget.style.transform = 'translateY(0)';
//       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//         <div className="stats-icon" style={{ background: `${color}20` }}>
//           <Icon size={24} color={color} />
//         </div>
        
//         {trend && (
//           <div className="trend-badge" style={{
//             background: trend.direction === 'up' ? '#10b98120' : '#ef444420',
//             color: trend.direction === 'up' ? '#10b981' : '#ef4444',
//           }}>
//             {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//             {trend.value}%
//           </div>
//         )}
//       </div>
      
//       <h3 className="stats-value">
//         <AnimatedCounter value={value} />
//       </h3>
      
//       <p className="stats-label">
//         {title}
//       </p>
//     </div>
//   );
// };

// // ==================== STATS GRID ====================

// const StatsGrid = ({ stats, trends, loading, darkMode }) => (
//   <div className="stats-grid">
//     <StatsCard
//       title="Pending Requests"
//       value={stats.pending}
//       icon={Clock}
//       color="#0077B6"
//       trend={trends.pending}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Faculty Members"
//       value={stats.faculty}
//       icon={Users}
//       color="#0096C7"
//       trend={trends.faculty}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Available Rooms"
//       value={stats.rooms}
//       icon={DoorOpen}
//       color="#00B4D8"
//       trend={trends.rooms}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Conflict Alerts"
//       value={stats.conflicts}
//       icon={AlertTriangle}
//       color="#ef4444"
//       trend={trends.conflicts}
//       loading={loading}
//       darkMode={darkMode}
//     />
//   </div>
// );

// // ==================== CHART SECTION ====================

// const ChartSection = ({ facultyDist, roomUtil, loading, darkMode }) => {
//   const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="chart-tooltip" style={{
//           background: darkMode ? '#1e293b' : 'white',
//           borderColor: COLORS[0],
//         }}>
//           <p>
//             {payload[0].name}: {payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="chart-grid">
//         {[1, 2].map(i => (
//           <div key={i} className="chart-card skeleton">
//             <div className="skeleton-line"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="chart-grid">
//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Faculty Distribution by Department</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={facultyDist}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {facultyDist.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           CS department leads with 33% faculty allocation
//         </p>
//       </div>

//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Room Utilization by Time Slot</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={roomUtil}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           Afternoon slots show highest utilization at 47%
//         </p>
//       </div>
//     </div>
//   );
// };

// // ==================== ACTIVITY FEED ====================

// const ActivityFeed = ({ activities, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recent Scheduling Activity</h3>
//         <span className="activity-count">{activities.length} events</span>
//       </div>

//       <div className="activity-list">
//         {activities.length > 0 ? (
//           activities.map((act, i) => (
//             <div key={i} className="activity-item" onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#475569' : '#e2e8f0'}
//                onMouseLeave={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}>
//               <CheckCircle size={18} color="#10b981" />
//               <span>{act}</span>
//             </div>
//           ))
//         ) : (
//           <div className="empty-activity">
//             <Activity size={48} />
//             <p>No recent activity</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ==================== FACULTY TABLE ====================

// const FacultyTable = ({ instructors, loading, darkMode }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDept, setFilterDept] = useState("All");

//   const filteredInstructors = useMemo(() => {
//     return instructors.filter(inst => {
//       const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDept = filterDept === "All" || inst.department === filterDept;
//       return matchesSearch && matchesDept;
//     });
//   }, [instructors, searchTerm, filterDept]);

//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recently Active Faculty</h3>
//       </div>
      
//       <div className="table-controls">
//         <div className="search-box">
//           <Search size={18} />
//           <input
//             type="text"
//             placeholder="Search instructors..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <select
//           value={filterDept}
//           onChange={(e) => setFilterDept(e.target.value)}
//           className="filter-select"
//         >
//           <option>All</option>
//           <option>BSIT</option>
//           <option>BSBA</option>
//           <option>BTLED</option>
//           <option>BSTM</option>
//         </select>
//       </div>

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Department</th>
//               <th>Load</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInstructors.map((inst, i) => (
//               <tr key={i}>
//                 <td className="instructor-name">{inst.name}</td>
//                 <td>{inst.department}</td>
//                 <td>
//                   <div className="load-bar">
//                     <div className="load-fill" style={{
//                       width: `${inst.load}%`,
//                       backgroundColor: inst.load > 80 ? '#ef4444' : inst.load > 60 ? '#f59e0b' : '#10b981',
//                     }}></div>
//                   </div>
//                   <span className="load-text">{inst.load}%</span>
//                 </td>
//                 <td>
//                   <span className={`status-badge ${inst.status.toLowerCase()}`}>
//                     {inst.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ==================== QUICK INSIGHTS PANEL ====================

// const QuickInsights = ({ stats, darkMode }) => (
//   <div className="quick-insights">
//     <h3><BarChart3 size={22} /> Quick Insights</h3>
    
//     <div className="insights-grid">
//       <div className="insight-box">
//         <p>Total Schedules</p>
//         <div className="insight-value"><AnimatedCounter value={156} /></div>
//       </div>
      
//       <div className="insight-box">
//         <p>Avg. Room Utilization</p>
//         <div className="insight-value">78%</div>
//       </div>
      
//       <div className="insight-box">
//         <p>Peak Hours</p>
//         <div className="insight-value">1-3 PM</div>
//       </div>
      
//       <div className="insight-box">
//         <p>Efficiency Score</p>
//         <div className="insight-value">92%</div>
//       </div>
//     </div>
//   </div>
// );

// // ==================== ERROR BOUNDARY ====================

// const ErrorBoundary = ({ error, onRetry, darkMode }) => (
//   <div className="error-container">
//     <XCircle size={64} color="#ef4444" />
//     <h3>Failed to Load Dashboard</h3>
//     <p>{error}</p>
//     <button onClick={onRetry} className="retry-btn">
//       Retry Loading
//     </button>
//   </div>
// );

// // ==================== MAIN DASHBOARD COMPONENT ====================

// const DeanDashboard = () => {
//   const { darkMode, toggleTheme } = useTheme();
//   const [timeFilter, setTimeFilter] = useState("This Month");
//   const [toast, setToast] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     stats,
//     trends,
//     facultyDist,
//     roomUtil,
//     activities,
//     instructors,
//     loading,
//     error,
//     lastUpdated,
//     refetch,
//   } = useDashboardData(timeFilter);

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//     setToast({ message: "Dashboard refreshed successfully", type: "success" });
//     setTimeout(() => setToast(null), 3000);
//   }, [refetch]);

//   const handleExport = useCallback(() => {
//     setToast({ message: "Exporting report... (PDF generation)", type: "success" });
//     setTimeout(() => setToast(null), 3000);
//   }, []);

//   const timeAgo = useMemo(() => {
//     if (!lastUpdated) return "";
//     const seconds = Math.floor((new Date() - lastUpdated) / 1000);
//     if (seconds < 60) return `${seconds} seconds ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
//   }, [lastUpdated]);

//   if (error) {
//     return (
//       <div className="page-background">
//         <ErrorBoundary error={error} onRetry={refetch} darkMode={darkMode} />
//       </div>
//     );
//   }

//   return (
//     <div className={`page-background ${darkMode ? 'dark' : 'light'}`}>
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="page-container">
//         <DashboardHeader
//           darkMode={darkMode}
//           toggleTheme={toggleTheme}
//           onRefresh={handleRefresh}
//           refreshing={refreshing}
//           conflictCount={stats.conflicts}
//           onExport={handleExport}
//         />

//         {stats.conflicts > 0 && (
//           <div className="conflict-alert">
//             <div>
//               <AlertTriangle size={22} color="#ef4444" />
//               <span>
//                 <strong>{stats.conflicts} scheduling conflict{stats.conflicts > 1 ? 's' : ''}</strong> detected and require immediate review
//               </span>
//             </div>
//             <button>Review Now</button>
//           </div>
//         )}

//         {lastUpdated && (
//           <div className="last-updated">
//             Last updated: {timeAgo}
//           </div>
//         )}

//         <StatsGrid stats={stats} trends={trends} loading={loading} darkMode={darkMode} />
        
//         <QuickInsights stats={stats} darkMode={darkMode} />
        
//         <ChartSection
//           facultyDist={facultyDist}
//           roomUtil={roomUtil}
//           loading={loading}
//           darkMode={darkMode}
//         />

//         <div className="two-column-grid">
//           <ActivityFeed activities={activities} loading={loading} darkMode={darkMode} />
//           <FacultyTable instructors={instructors} loading={loading} darkMode={darkMode} />
//         </div>

//         <div className="footer">
//           <p>EduSched Academic Management System © 2025 • Built for Excellence in Education</p>
//         </div>
//       </div>

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//         }

//         .page-background {
//           min-height: 100vh;
//           padding: 20px;
//           transition: background 0.3s ease;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);

//         }

//         .page-background.light {
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//         }

//         .page-background.dark {
//           background: #0f172a;
//         }

//         .page-container {
//           max-width: 1600px;
//           margin: 0 auto;
//         }

//         /* ===== HEADER ===== */
//         .dashboard-header {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           padding: 32px 40px;
//           border-radius: 16px;
//           margin-bottom: 24px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//         }

//         .header-title {
//           font-size: 32px;
//           font-weight: 700;
//           color: white;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         .header-subtitle {
//           font-size: 16px;
//           color: rgba(255,255,255,0.9);
//           margin: 0;
//           font-weight: 400;
//         }

//         .header-btn {
//           padding: 10px 20px;
//           background: rgba(255,255,255,0.2);
//           border: none;
//           border-radius: 8px;
//           color: white;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .header-btn:hover:not(:disabled) {
//           background: rgba(255,255,255,0.3);
//         }

//         .notification-btn {
//           position: relative;
//         }

//         .notification-badge {
//           position: absolute;
//           top: -4px;
//           right: -4px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           width: 20px;
//           height: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         /* ===== STATS GRID ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .stats-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .stats-card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .skeleton-line {
//           height: 120px;
//           background: #e2e8f0;
//           border-radius: 8px;
//         }

//         .stats-icon {
//           width: 56px;
//           height: 56px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .trend-badge {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           padding: 4px 8px;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .stats-value {
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 8px 0;
//           color: #1e293b;
//         }

//         .stats-label {
//           font-size: 14px;
//           color: #64748b;
//           margin: 0;
//           font-weight: 500;
//         }

//         /* ===== QUICK INSIGHTS ===== */
//         .quick-insights {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           margin-bottom: 24px;
//         }

//         .quick-insights h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0 0 20px 0;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #1e293b;
//         }

//         .insights-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//         }

//         .insight-box {
//           padding: 16px;
//           background: #f8fafc;
//           border-radius: 12px;
//           border-left: 4px solid #0077B6;
//         }

//         .insight-box p {
//           font-size: 13px;
//           color: #64748b;
//           margin: 0 0 8px 0;
//         }

//         .insight-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         /* ===== CHARTS ===== */
//         .chart-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .chart-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .chart-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .chart-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .chart-caption {
//           font-size: 13px;
//           color: #64748b;
//           text-align: center;
//           margin-top: 16px;
//         }

//         .chart-tooltip {
//           padding: 12px 16px;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           border: 2px solid;
//         }

//         .chart-tooltip p {
//           margin: 0;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         /* ===== CARDS ===== */
//         .card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .card-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .activity-count {
//           background: #0077B620;
//           color: #0077B6;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         /* ===== ACTIVITY FEED ===== */
//         .activity-list {
//           max-height: 400px;
//           overflow-y: auto;
//         }

//         .activity-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 8px;
//           background: #f8fafc;
//           transition: all 0.2s;
//           cursor: pointer;
//         }

//         .activity-item:hover {
//           background: #e2e8f0;
//         }

//         .activity-item span {
//           font-size: 14px;
//           color: #475569;
//           line-height: 1.6;
//         }

//         .empty-activity {
//           text-align: center;
//           padding: 40px 20px;
//           color: #64748b;
//         }

//         .empty-activity svg {
//           opacity: 0.3;
//           margin-bottom: 12px;
//         }

//         /* ===== TABLE CONTROLS ===== */
//         .table-controls {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//           margin-bottom: 16px;
//         }

//         .search-box {
//           position: relative;
//           flex: 1;
//           min-width: 200px;
//         }

//         .search-box svg {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//         }

//         .search-box input {
//           width: 100%;
//           padding: 10px 12px 10px 40px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           outline: none;
//         }

//         .search-box input:focus {
//           border-color: #0077B6;
//           background: white;
//         }

//         .filter-select {
//           padding: 10px 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           cursor: pointer;
//           outline: none;
//         }

//         .filter-select:hover {
//           border-color: #0077B6;
//         }

//         /* ===== TABLE ===== */
//         .table-wrapper {
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         table thead {
//           background: #f8fafc;
//         }

//         table th {
//           padding: 12px;
//           text-align: left;
//           font-size: 13px;
//           font-weight: 600;
//           color: #64748b;
//           border-bottom: 2px solid #e2e8f0;
//         }

//         table td {
//           padding: 16px 12px;
//           border-bottom: 1px solid #e2e8f0;
//           font-size: 14px;
//           color: #475569;
//         }

//         table tbody tr:hover {
//           background: #f8fafc;
//         }

//         .instructor-name {
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .load-bar {
//           width: 100%;
//           max-width: 120px;
//           height: 8px;
//           background: #e2e8f0;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-bottom: 4px;
//         }

//         .load-fill {
//           height: 100%;
//           border-radius: 4px;
//           transition: width 0.5s ease-out;
//         }

//         .load-text {
//           font-size: 13px;
//           font-weight: 600;
//           color: #475569;
//           display: block;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .status-badge.active {
//           background: #10b98120;
//           color: #10b981;
//         }

//         /* ===== ALERTS ===== */
//         .conflict-alert {
//           background: #fef2f2;
//           border: 1px solid #fecaca;
//           border-radius: 12px;
//           padding: 16px 20px;
//           margin-bottom: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .conflict-alert div {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .conflict-alert span {
//           font-size: 14px;
//           color: #991b1b;
//           font-weight: 500;
//         }

//         .conflict-alert button {
//           padding: 8px 20px;
//           background: #ef4444;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .conflict-alert button:hover {
//           background: #dc2626;
//         }

//         /* ===== LAYOUT ===== */
//         .two-column-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//         }

//         .last-updated {
//           text-align: right;
//           font-size: 13px;
//           color: #64748b;
//           margin-bottom: 16px;
//         }

//         .error-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 400px;
//           background: white;
//           border-radius: 16px;
//           padding: 40px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           text-align: center;
//           max-width: 400px;
//           margin: 0 auto;
//         }

//         .error-container h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 12px;
//         }

//         .error-container p {
//           font-size: 14px;
//           color: #64748b;
//           margin-bottom: 24px;
//         }

//         .retry-btn {
//           padding: 12px 32px;
//           background: #0077B6;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .retry-btn:hover {
//           background: #005f8f;
//         }

//         .footer {
//           margin-top: 32px;
//           padding: 20px;
//           text-align: center;
//           font-size: 13px;
//           color: #64748b;
//         }

//         .footer p {
//           margin: 0;
//         }

//         /* ===== TOAST ===== */
//         .toast {
//           animation: slideIn 0.3s ease-out;
//         }

//         .toast-close {
//           background: transparent;
//           border: none;
//           color: white;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//         }

//         /* ===== ANIMATIONS ===== */
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== SCROLLBAR ===== */
//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f1f5f9;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
// </div>
//  );
// }

// export default DeanDashboard;

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import {
//   Users,
//   DoorOpen,
//   Clock,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   Calendar,
//   Moon,
//   Sun,
//   Bell,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Download,
//   Search,
//   Filter,
//   ChevronDown,
//   FileText,
//   Activity,
//   BarChart3,
//   GraduationCap,
//   ArrowUpRight,
//   ArrowDownRight,
//   Info,
//   X,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // ==================== CONSTANTS ====================
// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// const CHART_COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

// // ==================== UTILITY FUNCTIONS ====================
// const categorizeSlot = (slotIndex) => {
//   if (slotIndex < 4) return "Morning";
//   if (slotIndex < 7) return "Afternoon";
//   return "Evening";
// };

// // ==================== CUSTOM HOOKS ====================
// const useDashboardData = () => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     stats: { pending: 0, faculty: 0, rooms: 0, conflicts: 0 },
//     facultyDist: [],
//     roomUtil: [],
//     activities: [],
//     instructors: [],
//     trends: {
//       pending: { direction: "up", value: 12 },
//       faculty: { direction: "up", value: 5 },
//       rooms: { direction: "down", value: 3 },
//       conflicts: { direction: "down", value: 8 },
//     },
//   });

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch instructors
//       const instructorsRes = await fetch(`${API}/api/instructors`);
//       const instructors = await instructorsRes.json();

//       // Fetch rooms
//       const roomsRes = await fetch(`${API}/api/rooms`);
//       const rooms = await roomsRes.json();

//       // Fetch schedules
//       const schedRes = await fetch(`${API}/api/schedules`);
//       const schedules = await schedRes.json();

//       // Calculate stats
//       const conflictCount = schedules.filter((s) => s.conflict).length || 0;

//       // Faculty distribution by course
//       const distMap = {};
//       instructors.forEach((instructor) => {
//         const course = instructor.course_code || "Unassigned";
//         distMap[course] = (distMap[course] || 0) + 1;
//       });

//       // Room utilization by time slot
//       const utilMap = { Morning: 0, Afternoon: 0, Evening: 0 };
//       schedules.forEach((schedule) => {
//         const timeSlot = categorizeSlot(schedule.time_slot || schedule.slot_index);
//         utilMap[timeSlot]++;
//       });

//       // Recent activities
//       const recentSchedules = schedules.slice(-5).map((s) => {
//         const subjectCode = s.subject_code || s.subject_description || "Unknown";
//         const sectionName = s.section_name || s.section || "N/A";
//         const instructorName = s.instructor_name || s.instructor_email || "TBA";
//         const roomName = s.room_name || "TBA";
//         const day = s.day || "N/A";
//         const slot = s.time_slot !== undefined ? s.time_slot : s.slot_index;
        
//         return `${subjectCode} (${sectionName}) assigned to ${instructorName} in Room ${roomName} [${day}, slot ${slot}]`;
//       });

//       // Prepare instructor table data
//       const instructorTableData = instructors.slice(0, 10).map((inst) => {
//         // Calculate load based on number of schedules
//         const instructorSchedules = schedules.filter(
//           s => s.instructor_email === inst.email || s.instructor_name === inst.name
//         );
//         const load = Math.min(Math.round((instructorSchedules.length / 6) * 100), 100);

//         return {
//           name: inst.name,
//           department: inst.course_code || "N/A",
//           load: load,
//           status: "Active",
//         };
//       });

//       setDashboardData({
//         stats: {
//           pending: 5, // Mock value - replace with actual pending requests endpoint
//           faculty: instructors.length,
//           rooms: rooms.length,
//           conflicts: conflictCount,
//         },
//         facultyDist: Object.entries(distMap).map(([name, value]) => ({
//           name,
//           value,
//         })),
//         roomUtil: Object.entries(utilMap).map(([name, value]) => ({
//           name,
//           value,
//         })),
//         activities: recentSchedules.reverse(),
//         instructors: instructorTableData,
//         trends: {
//           pending: { direction: "up", value: 12 },
//           faculty: { direction: "up", value: 5 },
//           rooms: { direction: "down", value: 3 },
//           conflicts: { direction: "down", value: 8 },
//         },
//       });

//       setLastUpdated(new Date());
//       setLoading(false);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//       setError(err.message || "Failed to load dashboard data");
//       setLoading(false);
//     }
//   }, [API]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { ...dashboardData, loading, error, lastUpdated, refetch: fetchData };
// };

// const useTheme = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = useCallback(() => {
//     setDarkMode(prev => !prev);
//   }, []);

//   return { darkMode, toggleTheme };
// };

// // ==================== ANIMATED COUNTER ====================
// const AnimatedCounter = ({ value, duration = 1000 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (start === end) return;

//     const timer = setInterval(() => {
//       start += Math.ceil(end / (duration / 50));
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <span>{count}</span>;
// };

// // ==================== TOAST NOTIFICATION ====================
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="toast" style={{
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
//       color: 'white',
//       padding: '12px 20px',
//       borderRadius: '8px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       zIndex: 10000,
//       animation: 'slideIn 0.3s ease-out',
//     }}>
//       <span>{message}</span>
//       <button onClick={onClose} className="toast-close" style={{
//         background: 'transparent',
//         border: 'none',
//         color: 'white',
//         cursor: 'pointer',
//         padding: 0,
//         display: 'flex',
//       }}>
//         <X size={16} />
//       </button>
//     </div>
//   );
// };

// // ==================== DASHBOARD HEADER ====================
// const DashboardHeader = ({ darkMode, toggleTheme, onRefresh, refreshing, conflictCount, onExport }) => {
//   const greeting = useMemo(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   }, []);

//   const currentDate = useMemo(() =>
//     new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }), []
//   );

//   return (
//     <div className="dashboard-header">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
//             <GraduationCap size={32} color="white" />
//             <h1 className="header-title">
//               EduSched Dean Dashboard
//             </h1>
//           </div>
//           <p className="header-subtitle">
//             {greeting}, Dean! • {currentDate}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//           <button onClick={onExport} className="header-btn">
//             <Download size={18} />
//             Export Report
//           </button>
          
//           <button onClick={onRefresh} disabled={refreshing} className="header-btn">
//             <RefreshCw size={20} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
//           </button>
          
//           <button onClick={toggleTheme} className="header-btn">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <button className="header-btn notification-btn">
//             <Bell size={20} />
//             {conflictCount > 0 && (
//               <span className="notification-badge">{conflictCount}</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== STATS CARD ====================
// const StatsCard = ({ title, value, icon: Icon, color, trend, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="stats-card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="stats-card" onMouseEnter={e => {
//       e.currentTarget.style.transform = 'translateY(-4px)';
//       e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
//     }} onMouseLeave={e => {
//       e.currentTarget.style.transform = 'translateY(0)';
//       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//         <div className="stats-icon" style={{ background: `${color}20` }}>
//           <Icon size={24} color={color} />
//         </div>
        
//         {trend && (
//           <div className="trend-badge" style={{
//             background: trend.direction === 'up' ? '#10b98120' : '#ef444420',
//             color: trend.direction === 'up' ? '#10b981' : '#ef4444',
//           }}>
//             {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//             {trend.value}%
//           </div>
//         )}
//       </div>
      
//       <h3 className="stats-value">
//         <AnimatedCounter value={value} />
//       </h3>
      
//       <p className="stats-label">
//         {title}
//       </p>
//     </div>
//   );
// };

// // ==================== STATS GRID ====================
// const StatsGrid = ({ stats, trends, loading, darkMode }) => (
//   <div className="stats-grid">
//     <StatsCard
//       title="Pending Requests"
//       value={stats.pending}
//       icon={Clock}
//       color="#0077B6"
//       trend={trends.pending}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Faculty Members"
//       value={stats.faculty}
//       icon={Users}
//       color="#0096C7"
//       trend={trends.faculty}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Available Rooms"
//       value={stats.rooms}
//       icon={DoorOpen}
//       color="#00B4D8"
//       trend={trends.rooms}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Conflict Alerts"
//       value={stats.conflicts}
//       icon={AlertTriangle}
//       color="#ef4444"
//       trend={trends.conflicts}
//       loading={loading}
//       darkMode={darkMode}
//     />
//   </div>
// );

// // ==================== CHART SECTION ====================
// const ChartSection = ({ facultyDist, roomUtil, loading, darkMode }) => {
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="chart-tooltip" style={{
//           background: darkMode ? '#1e293b' : 'white',
//           borderColor: CHART_COLORS[0],
//           padding: '12px 16px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           border: '2px solid',
//         }}>
//           <p style={{ margin: 0, fontWeight: 600, color: darkMode ? 'white' : '#1e293b' }}>
//             {payload[0].name}: {payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="chart-grid">
//         {[1, 2].map(i => (
//           <div key={i} className="chart-card skeleton">
//             <div className="skeleton-line"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="chart-grid">
//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Faculty Distribution by Department</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={facultyDist}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {facultyDist.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           Distribution of faculty members across departments
//         </p>
//       </div>

//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Room Utilization by Time Slot</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={roomUtil}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           Schedules distribution across different time periods
//         </p>
//       </div>
//     </div>
//   );
// };

// // ==================== ACTIVITY FEED ====================
// const ActivityFeed = ({ activities, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recent Scheduling Activity</h3>
//         <span className="activity-count">{activities.length} events</span>
//       </div>

//       <div className="activity-list">
//         {activities.length > 0 ? (
//           activities.map((act, i) => (
//             <div key={i} className="activity-item" onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#475569' : '#e2e8f0'}
//                onMouseLeave={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}>
//               <CheckCircle size={18} color="#10b981" />
//               <span>{act}</span>
//             </div>
//           ))
//         ) : (
//           <div className="empty-activity">
//             <Activity size={48} />
//             <p>No recent activity</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ==================== FACULTY TABLE ====================
// const FacultyTable = ({ instructors, loading, darkMode }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDept, setFilterDept] = useState("All");

//   const filteredInstructors = useMemo(() => {
//     return instructors.filter(inst => {
//       const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDept = filterDept === "All" || inst.department === filterDept;
//       return matchesSearch && matchesDept;
//     });
//   }, [instructors, searchTerm, filterDept]);

//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recently Active Faculty</h3>
//       </div>
      
//       <div className="table-controls">
//         <div className="search-box">
//           <Search size={18} />
//           <input
//             type="text"
//             placeholder="Search instructors..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <select
//           value={filterDept}
//           onChange={(e) => setFilterDept(e.target.value)}
//           className="filter-select"
//         >
//           <option>All</option>
//           <option>BSIT</option>
//           <option>BSBA</option>
//           <option>BTLED</option>
//           <option>BSTM</option>
//           <option>BSHM</option>
//           <option>BSCRIM</option>
//           <option>BSAIS</option>
//         </select>
//       </div>

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Department</th>
//               <th>Load</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInstructors.length > 0 ? (
//               filteredInstructors.map((inst, i) => (
//                 <tr key={i}>
//                   <td className="instructor-name">{inst.name}</td>
//                   <td>{inst.department}</td>
//                   <td>
//                     <div className="load-bar">
//                       <div className="load-fill" style={{
//                         width: `${inst.load}%`,
//                         backgroundColor: inst.load > 80 ? '#ef4444' : inst.load > 60 ? '#f59e0b' : '#10b981',
//                       }}></div>
//                     </div>
//                     <span className="load-text">{inst.load}%</span>
//                   </td>
//                   <td>
//                     <span className={`status-badge ${inst.status.toLowerCase()}`}>
//                       {inst.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
//                   No instructors found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ==================== QUICK INSIGHTS PANEL ====================
// const QuickInsights = ({ stats, dashboardData }) => {
//   const totalSchedules = useMemo(() => {
//     return dashboardData.activities?.length * 10 || 0; // Estimate based on recent activity
//   }, [dashboardData]);

//   const avgUtilization = useMemo(() => {
//     const total = dashboardData.roomUtil?.reduce((acc, curr) => acc + curr.value, 0) || 0;
//     const avg = dashboardData.roomUtil?.length > 0 ? Math.round(total / dashboardData.roomUtil.length) : 0;
//     return avg;
//   }, [dashboardData]);

//   return (
//     <div className="quick-insights">
//       <h3><BarChart3 size={22} /> Quick Insights</h3>
      
//       <div className="insights-grid">
//         <div className="insight-box">
//           <p>Total Schedules</p>
//           <div className="insight-value"><AnimatedCounter value={totalSchedules} /></div>
//         </div>
        
//         <div className="insight-box">
//           <p>Avg. Room Utilization</p>
//           <div className="insight-value">{avgUtilization}%</div>
//         </div>
        
//         <div className="insight-box">
//           <p>Faculty Count</p>
//           <div className="insight-value"><AnimatedCounter value={stats.faculty} /></div>
//         </div>
        
//         <div className="insight-box">
//           <p>Room Count</p>
//           <div className="insight-value"><AnimatedCounter value={stats.rooms} /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== ERROR BOUNDARY ====================
// const ErrorBoundary = ({ error, onRetry }) => (
//   <div className="error-container">
//     <XCircle size={64} color="#ef4444" />
//     <h3>Failed to Load Dashboard</h3>
//     <p>{error}</p>
//     <button onClick={onRetry} className="retry-btn">
//       Retry Loading
//     </button>
//   </div>
// );

// // ==================== MAIN DASHBOARD COMPONENT ====================
// const DeanDashboard = () => {
//   const { darkMode, toggleTheme } = useTheme();
//   const [toast, setToast] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     stats,
//     trends,
//     facultyDist,
//     roomUtil,
//     activities,
//     instructors,
//     loading,
//     error,
//     lastUpdated,
//     refetch,
//   } = useDashboardData();

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//     setToast({ message: "Dashboard refreshed successfully", type: "success" });
//   }, [refetch]);

//   const handleExport = useCallback(() => {
//     setToast({ message: "Exporting report... (PDF generation)", type: "success" });
//   }, []);

//   const timeAgo = useMemo(() => {
//     if (!lastUpdated) return "";
//     const seconds = Math.floor((new Date() - lastUpdated) / 1000);
//     if (seconds < 60) return `${seconds} seconds ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
//   }, [lastUpdated]);

//   if (error) {
//     return (
//       <div className="page-background">
//         <ErrorBoundary error={error} onRetry={refetch} />
//       </div>
//     );
//   }

//   return (
//     <div className={`page-background ${darkMode ? 'dark' : 'light'}`}>
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="page-container">
//         <DashboardHeader
//           darkMode={darkMode}
//           toggleTheme={toggleTheme}
//           onRefresh={handleRefresh}
//           refreshing={refreshing}
//           conflictCount={stats.conflicts}
//           onExport={handleExport}
//         />

//         {stats.conflicts > 0 && (
//           <div className="conflict-alert">
//             <div>
//               <AlertTriangle size={22} color="#ef4444" />
//               <span>
//                 <strong>{stats.conflicts} scheduling conflict{stats.conflicts > 1 ? 's' : ''}</strong> detected and require immediate review
//               </span>
//             </div>
//             <button>Review Now</button>
//           </div>
//         )}

//         {lastUpdated && (
//           <div className="last-updated">
//             Last updated: {timeAgo}
//           </div>
//         )}

//         <StatsGrid stats={stats} trends={trends} loading={loading} darkMode={darkMode} />
        
//         <QuickInsights stats={stats} dashboardData={{ activities, roomUtil }} />
        
//         <ChartSection
//           facultyDist={facultyDist}
//           roomUtil={roomUtil}
//           loading={loading}
//           darkMode={darkMode}
//         />

//         <div className="two-column-grid">
//           <ActivityFeed activities={activities} loading={loading} darkMode={darkMode} />
//           <FacultyTable instructors={instructors} loading={loading} darkMode={darkMode} />
//         </div>

//         <div className="footer">
//           <p>EduSched Academic Management System © 2025 • Built for Excellence in Education</p>
//         </div>
//       </div>

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//         }

//         .page-background {
//           min-height: 100vh;
//           padding: 20px;
//           transition: background 0.3s ease;
//         }

//         .page-background.light {
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//         }

//         .page-background.dark {
//           background: #0f172a;
//         }

//         .page-container {
//           max-width: 1600px;
//           margin: 0 auto;
//         }

//         .dashboard-header {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           padding: 32px 40px;
//           border-radius: 16px;
//           margin-bottom: 24px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//         }

//         .header-title {
//           font-size: 32px;
//           font-weight: 700;
//           color: white;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         .header-subtitle {
//           font-size: 16px;
//           color: rgba(255,255,255,0.9);
//           margin: 0;
//           font-weight: 400;
//         }

//         .header-btn {
//           padding: 10px 20px;
//           background: rgba(255,255,255,0.2);
//           border: none;
//           border-radius: 8px;
//           color: white;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .header-btn:hover:not(:disabled) {
//           background: rgba(255,255,255,0.3);
//         }

//         .header-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .notification-btn {
//           position: relative;
//         }

//         .notification-badge {
//           position: absolute;
//           top: -4px;
//           right: -4px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           width: 20px;
//           height: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .stats-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .stats-card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .skeleton-line {
//           height: 120px;
//           background: #e2e8f0;
//           border-radius: 8px;
//         }

//         .stats-icon {
//           width: 56px;
//           height: 56px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .trend-badge {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           padding: 4px 8px;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .stats-value {
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 8px 0;
//           color: #1e293b;
//         }

//         .stats-label {
//           font-size: 14px;
//           color: #64748b;
//           margin: 0;
//           font-weight: 500;
//         }

//         .quick-insights {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           margin-bottom: 24px;
//         }

//         .quick-insights h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0 0 20px 0;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #1e293b;
//         }

//         .insights-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//         }

//         .insight-box {
//           padding: 16px;
//           background: #f8fafc;
//           border-radius: 12px;
//           border-left: 4px solid #0077B6;
//         }

//         .insight-box p {
//           font-size: 13px;
//           color: #64748b;
//           margin: 0 0 8px 0;
//         }

//         .insight-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         .chart-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .chart-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .chart-card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .chart-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .chart-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .chart-caption {
//           font-size: 13px;
//           color: #64748b;
//           text-align: center;
//           margin-top: 16px;
//         }

//         .card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .card-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .activity-count {
//           background: #0077B620;
//           color: #0077B6;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .activity-list {
//           max-height: 400px;
//           overflow-y: auto;
//         }

//         .activity-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 8px;
//           background: #f8fafc;
//           transition: all 0.2s;
//           cursor: pointer;
//         }

//         .activity-item span {
//           font-size: 14px;
//           color: #475569;
//           line-height: 1.6;
//         }

//         .empty-activity {
//           text-align: center;
//           padding: 40px 20px;
//           color: #64748b;
//         }

//         .empty-activity svg {
//           opacity: 0.3;
//           margin-bottom: 12px;
//         }

//         .table-controls {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//           margin-bottom: 16px;
//         }

//         .search-box {
//           position: relative;
//           flex: 1;
//           min-width: 200px;
//         }

//         .search-box svg {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//         }

//         .search-box input {
//           width: 100%;
//           padding: 10px 12px 10px 40px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           outline: none;
//         }

//         .search-box input:focus {
//           border-color: #0077B6;
//           background: white;
//         }

//         .filter-select {
//           padding: 10px 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           cursor: pointer;
//           outline: none;
//         }

//         .filter-select:hover {
//           border-color: #0077B6;
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         table thead {
//           background: #f8fafc;
//         }

//         table th {
//           padding: 12px;
//           text-align: left;
//           font-size: 13px;
//           font-weight: 600;
//           color: #64748b;
//           border-bottom: 2px solid #e2e8f0;
//         }

//         table td {
//           padding: 16px 12px;
//           border-bottom: 1px solid #e2e8f0;
//           font-size: 14px;
//           color: #475569;
//         }

//         table tbody tr:hover {
//           background: #f8fafc;
//         }

//         .instructor-name {
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .load-bar {
//           width: 100%;
//           max-width: 120px;
//           height: 8px;
//           background: #e2e8f0;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-bottom: 4px;
//         }

//         .load-fill {
//           height: 100%;
//           border-radius: 4px;
//           transition: width 0.5s ease-out;
//         }

//         .load-text {
//           font-size: 13px;
//           font-weight: 600;
//           color: #475569;
//           display: block;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .status-badge.active {
//           background: #10b98120;
//           color: #10b981;
//         }

//         .conflict-alert {
//           background: #fef2f2;
//           border: 1px solid #fecaca;
//           border-radius: 12px;
//           padding: 16px 20px;
//           margin-bottom: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .conflict-alert div {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .conflict-alert span {
//           font-size: 14px;
//           color: #991b1b;
//           font-weight: 500;
//         }

//         .conflict-alert button {
//           padding: 8px 20px;
//           background: #ef4444;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .conflict-alert button:hover {
//           background: #dc2626;
//         }

//         .two-column-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .last-updated {
//           text-align: right;
//           font-size: 13px;
//           color: #64748b;
//           margin-bottom: 16px;
//         }

//         .error-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 400px;
//           background: white;
//           border-radius: 16px;
//           padding: 40px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           text-align: center;
//           max-width: 400px;
//           margin: 0 auto;
//         }

//         .error-container h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//           margin: 16px 0 12px 0;
//         }

//         .error-container p {
//           font-size: 14px;
//           color: #64748b;
//           margin-bottom: 24px;
//         }

//         .retry-btn {
//           padding: 12px 32px;
//           background: #0077B6;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .retry-btn:hover {
//           background: #005f8f;
//         }

//         .footer {
//           margin-top: 32px;
//           padding: 20px;
//           text-align: center;
//           font-size: 13px;
//           color: #64748b;
//         }

//         .footer p {
//           margin: 0;
//         }

//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f1f5f9;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }

//         @media (max-width: 768px) {
//           .dashboard-header {
//             padding: 20px;
//           }

//           .header-title {
//             font-size: 24px;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr;
//           }

//           .chart-grid {
//             grid-template-columns: 1fr;
//           }

//           .two-column-grid {
//             grid-template-columns: 1fr;
//           }

//           .insights-grid {
//             grid-template-columns: 1fr 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DeanDashboard;

//FUNCTIONAL DEAN DASHBOARD

// import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
// import {
//   Users,
//   DoorOpen,
//   Clock,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   Calendar,
//   Moon,
//   Sun,
//   Bell,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Download,
//   Search,
//   Filter,
//   ChevronDown,
//   FileText,
//   Activity,
//   BarChart3,
//   GraduationCap,
//   ArrowUpRight,
//   ArrowDownRight,
//   Info,
//   X,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // ==================== CUSTOM HOOKS ====================
// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// const useDashboardData = (timeFilter) => {
//   const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     stats: { pending: 0, faculty: 0, rooms: 0, conflicts: 0 },
//     facultyDist: [],
//     roomUtil: [],
//     activities: [],
//     instructors: [],
//     trends: {
//       pending: { direction: "up", value: 12 },
//       faculty: { direction: "up", value: 5 },
//       rooms: { direction: "down", value: 3 },
//       conflicts: { direction: "down", value: 8 },
//     },
//   });

//   // Helper: categorize slot_index into Morning / Afternoon / Evening
//   const categorizeSlot = (slotIndex) => {
//     if (slotIndex < 4) return "Morning"; // slots 0–3
//     if (slotIndex < 7) return "Afternoon"; // slots 4–6
//     return "Evening"; // slots 7+
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // 1. Fetch Instructors
//       const instructorsRes = await fetch(`${API}/api/instructors`);
//       if (!instructorsRes.ok) {
//         throw new Error(`Failed to fetch instructors: ${instructorsRes.status}`);
//       }
//       const instructorsText = await instructorsRes.text();
//       const instructors = instructorsText ? JSON.parse(instructorsText) : [];

//       // 2. Fetch Rooms
//       const roomsRes = await fetch(`${API}/api/rooms`);
//       if (!roomsRes.ok) {
//         throw new Error(`Failed to fetch rooms: ${roomsRes.status}`);
//       }
//       const roomsText = await roomsRes.text();
//       const rooms = roomsText ? JSON.parse(roomsText) : [];

//       // 3. Fetch Schedules
//       const schedRes = await fetch(`${API}/api/scheduler`);
//       if (!schedRes.ok) {
//         throw new Error(`Failed to fetch schedules: ${schedRes.status}`);
//       }
//       const schedText = await schedRes.text();
//       const schedules = schedText ? JSON.parse(schedText) : [];

//       // --- Stats ---
//       const conflictCount = schedules.filter((s) => s.conflict).length;
      
//       // --- Faculty Distribution (group instructors by course_code) ---
//       const distMap = {};
//       instructors.forEach((i) => {
//         const course = i.course_code || "Unassigned";
//         distMap[course] = (distMap[course] || 0) + 1;
//       });

//       // --- Room Utilization (group schedules by time of day) ---
//       const utilMap = { Morning: 0, Afternoon: 0, Evening: 0 };
//       schedules.forEach((s) => {
//         utilMap[categorizeSlot(s.slot_index)]++;
//       });

//       // --- Recent Activity (latest 10 schedules) ---
//       const activityLogs = schedules.slice(-10).map((s) => {
//         return `${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name || 'TBA'} in Room ${s.room_name || 'TBA'} [${s.day}, slot ${s.slot_index}]`;
//       });

//       // --- Build instructors list with details ---
//       const instructorsList = instructors.slice(0, 10).map((inst) => {
//         // Count schedules for this instructor
//         const instSchedules = schedules.filter(s => s.instructor_id === inst.id);
//         const loadPercentage = Math.min(Math.round((instSchedules.length / 20) * 100), 100);
        
//         return {
//           name: inst.name,
//           department: inst.course_code || "N/A",
//           load: loadPercentage,
//           status: "Active"
//         };
//       });

//       setDashboardData({
//         stats: {
//           pending: 10, // Replace with /api/requests if available
//           faculty: instructors.length,
//           rooms: rooms.length,
//           conflicts: conflictCount,
//         },
//         facultyDist: Object.entries(distMap).map(([name, value]) => ({
//           name,
//           value,
//         })),
//         roomUtil: Object.entries(utilMap).map(([name, value]) => ({
//           name,
//           value,
//         })),
//         activities: activityLogs,
//         instructors: instructorsList,
//         trends: dashboardData.trends,
//       });

//       setLastUpdated(new Date());
//       setLoading(false);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//       let errorMessage = "Failed to load dashboard data";
      
//       if (err.message.includes("Failed to fetch")) {
//         errorMessage = "Cannot connect to server. Make sure your backend is running on " + API;
//       } else if (err.message.includes("JSON")) {
//         errorMessage = "Server returned invalid data. Check if API endpoints exist: /api/instructors, /api/rooms, /api/scheduler";
//       } else {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//       setLoading(false);
//     }
//   }, [API, timeFilter]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { ...dashboardData, loading, error, lastUpdated, refetch: fetchData };
// };

// const useTheme = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = useCallback(() => {
//     setDarkMode(prev => !prev);
//   }, []);

//   return { darkMode, toggleTheme };
// };

// // ==================== ANIMATED COUNTER ====================

// const AnimatedCounter = ({ value, duration = 1000 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (start === end) return;

//     const timer = setInterval(() => {
//       start += Math.ceil(end / (duration / 50));
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <span>{count}</span>;
// };

// // ==================== TOAST NOTIFICATION ====================

// const Toast = ({ message, type, onClose }) => (
//   <div className="toast" style={{
//     position: 'fixed',
//     top: '20px',
//     right: '20px',
//     background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
//     color: 'white',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     zIndex: 10000,
//   }}>
//     <span>{message}</span>
//     <button onClick={onClose} className="toast-close">
//       <X size={16} />
//     </button>
//   </div>
// );

// // ==================== DASHBOARD HEADER ====================

// const DashboardHeader = ({ darkMode, toggleTheme, onRefresh, refreshing, conflictCount, onExport }) => {
//   const greeting = useMemo(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   }, []);

//   const currentDate = useMemo(() =>
//     new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }), []
//   );

//   return (
//     <div className="dashboard-header">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
//             <GraduationCap size={32} color="white" />
//             <h1 className="header-title">
//               EduSched Dean Dashboard
//             </h1>
//           </div>
//           <p className="header-subtitle">
//             {greeting}, Dean! • {currentDate}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//           <button onClick={onExport} className="header-btn">
//             <Download size={18} />
//             Export Report
//           </button>
          
//           <button onClick={onRefresh} disabled={refreshing} className="header-btn">
//             <RefreshCw size={20} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
//           </button>
          
//           <button onClick={toggleTheme} className="header-btn">
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <button className="header-btn notification-btn">
//             <Bell size={20} />
//             {conflictCount > 0 && (
//               <span className="notification-badge">{conflictCount}</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // ==================== STATS CARD ====================

// const StatsCard = ({ title, value, icon: Icon, color, trend, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="stats-card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="stats-card" onMouseEnter={e => {
//       e.currentTarget.style.transform = 'translateY(-4px)';
//       e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
//     }} onMouseLeave={e => {
//       e.currentTarget.style.transform = 'translateY(0)';
//       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//         <div className="stats-icon" style={{ background: `${color}20` }}>
//           <Icon size={24} color={color} />
//         </div>
        
//         {trend && (
//           <div className="trend-badge" style={{
//             background: trend.direction === 'up' ? '#10b98120' : '#ef444420',
//             color: trend.direction === 'up' ? '#10b981' : '#ef4444',
//           }}>
//             {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
//             {trend.value}%
//           </div>
//         )}
//       </div>
      
//       <h3 className="stats-value">
//         <AnimatedCounter value={value} />
//       </h3>
      
//       <p className="stats-label">
//         {title}
//       </p>
//     </div>
//   );
// };

// // ==================== STATS GRID ====================

// const StatsGrid = ({ stats, trends, loading, darkMode }) => (
//   <div className="stats-grid">
//     <StatsCard
//       title="Pending Requests"
//       value={stats.pending}
//       icon={Clock}
//       color="#0077B6"
//       trend={trends.pending}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Faculty Members"
//       value={stats.faculty}
//       icon={Users}
//       color="#0096C7"
//       trend={trends.faculty}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Available Rooms"
//       value={stats.rooms}
//       icon={DoorOpen}
//       color="#00B4D8"
//       trend={trends.rooms}
//       loading={loading}
//       darkMode={darkMode}
//     />
//     <StatsCard
//       title="Conflict Alerts"
//       value={stats.conflicts}
//       icon={AlertTriangle}
//       color="#ef4444"
//       trend={trends.conflicts}
//       loading={loading}
//       darkMode={darkMode}
//     />
//   </div>
// );

// // ==================== CHART SECTION ====================

// const ChartSection = ({ facultyDist, roomUtil, loading, darkMode }) => {
//   const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="chart-tooltip" style={{
//           background: darkMode ? '#1e293b' : 'white',
//           borderColor: COLORS[0],
//         }}>
//           <p>
//             {payload[0].name}: {payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="chart-grid">
//         {[1, 2].map(i => (
//           <div key={i} className="chart-card skeleton">
//             <div className="skeleton-line"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="chart-grid">
//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Faculty Distribution by Department</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={facultyDist}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {facultyDist.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           Faculty allocation across departments
//         </p>
//       </div>

//       <div className="chart-card">
//         <div className="chart-header">
//           <h3>Room Utilization by Time Slot</h3>
//           <Info size={18} />
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={roomUtil}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//         <p className="chart-caption">
//           Schedule distribution throughout the day
//         </p>
//       </div>
//     </div>
//   );
// };

// // ==================== ACTIVITY FEED ====================

// const ActivityFeed = ({ activities, loading, darkMode }) => {
//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recent Scheduling Activity</h3>
//         <span className="activity-count">{activities.length} events</span>
//       </div>

//       <div className="activity-list">
//         {activities.length > 0 ? (
//           activities.map((act, i) => (
//             <div key={i} className="activity-item" onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#475569' : '#e2e8f0'}
//                onMouseLeave={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}>
//               <CheckCircle size={18} color="#10b981" />
//               <span>{act}</span>
//             </div>
//           ))
//         ) : (
//           <div className="empty-activity">
//             <Activity size={48} />
//             <p>No recent activity</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ==================== FACULTY TABLE ====================

// const FacultyTable = ({ instructors, loading, darkMode }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDept, setFilterDept] = useState("All");

//   const filteredInstructors = useMemo(() => {
//     return instructors.filter(inst => {
//       const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDept = filterDept === "All" || inst.department === filterDept;
//       return matchesSearch && matchesDept;
//     });
//   }, [instructors, searchTerm, filterDept]);

//   if (loading) {
//     return (
//       <div className="card skeleton">
//         <div className="skeleton-line"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Faculty Overview</h3>
//       </div>
      
//       <div className="table-controls">
//         <div className="search-box">
//           <Search size={18} />
//           <input
//             type="text"
//             placeholder="Search instructors..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <select
//           value={filterDept}
//           onChange={(e) => setFilterDept(e.target.value)}
//           className="filter-select"
//         >
//           <option>All</option>
//           <option>BSIT</option>
//           <option>BSBA</option>
//           <option>BTLED</option>
//           <option>BSTM</option>
//         </select>
//       </div>

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Instructor</th>
//               <th>Department</th>
//               <th>Load</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInstructors.map((inst, i) => (
//               <tr key={i}>
//                 <td className="instructor-name">{inst.name}</td>
//                 <td>{inst.department}</td>
//                 <td>
//                   <div className="load-bar">
//                     <div className="load-fill" style={{
//                       width: `${inst.load}%`,
//                       backgroundColor: inst.load > 80 ? '#ef4444' : inst.load > 60 ? '#f59e0b' : '#10b981',
//                     }}></div>
//                   </div>
//                   <span className="load-text">{inst.load}%</span>
//                 </td>
//                 <td>
//                   <span className={`status-badge ${inst.status.toLowerCase()}`}>
//                     {inst.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ==================== QUICK INSIGHTS PANEL ====================

// const QuickInsights = ({ stats, darkMode }) => (
//   <div className="quick-insights">
//     <h3><BarChart3 size={22} /> Quick Insights</h3>
    
//     <div className="insights-grid">
//       <div className="insight-box">
//         <p>Total Schedules</p>
//         <div className="insight-value"><AnimatedCounter value={156} /></div>
//       </div>
      
//       <div className="insight-box">
//         <p>Avg. Room Utilization</p>
//         <div className="insight-value">78%</div>
//       </div>
      
//       <div className="insight-box">
//         <p>Peak Hours</p>
//         <div className="insight-value">1-3 PM</div>
//       </div>
      
//       <div className="insight-box">
//         <p>Efficiency Score</p>
//         <div className="insight-value">92%</div>
//       </div>
//     </div>
//   </div>
// );

// // ==================== ERROR BOUNDARY ====================

// const ErrorBoundary = ({ error, onRetry, darkMode }) => (
//   <div className="error-container">
//     <XCircle size={64} color="#ef4444" />
//     <h3>Failed to Load Dashboard</h3>
//     <p>{error}</p>
//     <button onClick={onRetry} className="retry-btn">
//       Retry Loading
//     </button>
//   </div>
// );

// // ==================== MAIN DASHBOARD COMPONENT ====================

// const DeanDashboard = () => {
//   const { darkMode, toggleTheme } = useTheme();
//   const [timeFilter, setTimeFilter] = useState("This Month");
//   const [toast, setToast] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     stats,
//     trends,
//     facultyDist,
//     roomUtil,
//     activities,
//     instructors,
//     loading,
//     error,
//     lastUpdated,
//     refetch,
//   } = useDashboardData(timeFilter);

//   const handleRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//     setToast({ message: "Dashboard refreshed successfully", type: "success" });
//     setTimeout(() => setToast(null), 3000);
//   }, [refetch]);

//   const handleExport = useCallback(() => {
//     try {
//       // Create CSV content
//       const csvContent = generateCSVReport(stats, facultyDist, roomUtil, activities, instructors);
      
//       // Create blob and download
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const url = URL.createObjectURL(blob);
      
//       link.setAttribute('href', url);
//       link.setAttribute('download', `EduSched_Report_${new Date().toISOString().split('T')[0]}.csv`);
//       link.style.visibility = 'hidden';
      
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       setToast({ message: "Report exported successfully!", type: "success" });
//       setTimeout(() => setToast(null), 3000);
//     } catch (error) {
//       setToast({ message: "Failed to export report", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     }
//   }, [stats, facultyDist, roomUtil, activities, instructors]);

//   // Helper function to generate CSV report
//   const generateCSVReport = (stats, facultyDist, roomUtil, activities, instructors) => {
//     let csv = 'EduSched Dashboard Report\n';
//     csv += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
//     // Stats Section
//     csv += 'SUMMARY STATISTICS\n';
//     csv += 'Metric,Value\n';
//     csv += `Pending Requests,${stats.pending}\n`;
//     csv += `Faculty Members,${stats.faculty}\n`;
//     csv += `Available Rooms,${stats.rooms}\n`;
//     csv += `Conflict Alerts,${stats.conflicts}\n\n`;
    
//     // Faculty Distribution
//     csv += 'FACULTY DISTRIBUTION BY DEPARTMENT\n';
//     csv += 'Department,Count\n';
//     facultyDist.forEach(dept => {
//       csv += `${dept.name},${dept.value}\n`;
//     });
//     csv += '\n';
    
//     // Room Utilization
//     csv += 'ROOM UTILIZATION BY TIME SLOT\n';
//     csv += 'Time Slot,Count\n';
//     roomUtil.forEach(slot => {
//       csv += `${slot.name},${slot.value}\n`;
//     });
//     csv += '\n';
    
//     // Faculty Overview
//     csv += 'FACULTY OVERVIEW\n';
//     csv += 'Instructor,Department,Load %,Status\n';
//     instructors.forEach(inst => {
//       csv += `${inst.name},${inst.department},${inst.load},${inst.status}\n`;
//     });
//     csv += '\n';
    
//     // Recent Activity
//     csv += 'RECENT SCHEDULING ACTIVITY\n';
//     csv += 'Activity\n';
//     activities.forEach(act => {
//       csv += `"${act}"\n`;
//     });
    
//     return csv;
//   };

//   const timeAgo = useMemo(() => {
//     if (!lastUpdated) return "";
//     const seconds = Math.floor((new Date() - lastUpdated) / 1000);
//     if (seconds < 60) return `${seconds} seconds ago`;
//     const minutes = Math.floor(seconds / 60);
//     if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
//   }, [lastUpdated]);

//   if (error) {
//     return (
//       <div className="page-background">
//         <ErrorBoundary error={error} onRetry={refetch} darkMode={darkMode} />
//       </div>
//     );
//   }

//   return (
//     <div className={`page-background ${darkMode ? 'dark' : 'light'}`}>
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="page-container">
//         <DashboardHeader
//           darkMode={darkMode}
//           toggleTheme={toggleTheme}
//           onRefresh={handleRefresh}
//           refreshing={refreshing}
//           conflictCount={stats.conflicts}
//           onExport={handleExport}
//         />

//         {stats.conflicts > 0 && (
//           <div className="conflict-alert">
//             <div>
//               <AlertTriangle size={22} color="#ef4444" />
//               <span>
//                 <strong>{stats.conflicts} scheduling conflict{stats.conflicts > 1 ? 's' : ''}</strong> detected and require immediate review
//               </span>
//             </div>
//             <button>Review Now</button>
//           </div>
//         )}

//         {lastUpdated && (
//           <div className="last-updated">
//             Last updated: {timeAgo}
//           </div>
//         )}

//         <StatsGrid stats={stats} trends={trends} loading={loading} darkMode={darkMode} />
        
//         <QuickInsights stats={stats} darkMode={darkMode} />
        
//         <ChartSection
//           facultyDist={facultyDist}
//           roomUtil={roomUtil}
//           loading={loading}
//           darkMode={darkMode}
//         />

//         <div className="two-column-grid">
//           <ActivityFeed activities={activities} loading={loading} darkMode={darkMode} />
//           <FacultyTable instructors={instructors} loading={loading} darkMode={darkMode} />
//         </div>

//         <div className="footer">
//           <p>EduSched Academic Management System © 2025 • Built for Excellence in Education</p>
//         </div>
//       </div>

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//         }

//         .page-background {
//           min-height: 100vh;
//           padding: 20px;
//           transition: background 0.3s ease;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);

//         }

//         .page-background.light {
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//         }

//         .page-background.dark {
//           background: #0f172a;
//         }

//         .page-background.dark .stats-card {
//           background: #1e293b;
//           color: #e2e8f0;
//         }

//         .page-background.dark .stats-value {
//           color: #e2e8f0;
//         }

//         .page-background.dark .stats-label {
//           color: #94a3b8;
//         }

//         .page-background.dark .quick-insights {
//           background: #1e293b;
//         }

//         .page-background.dark .quick-insights h3 {
//           color: #e2e8f0;
//         }

//         .page-background.dark .insight-box {
//           background: #334155;
//         }

//         .page-background.dark .insight-value {
//           color: #e2e8f0;
//         }

//         .page-background.dark .chart-card {
//           background: #1e293b;
//         }

//         .page-background.dark .chart-header h3 {
//           color: #e2e8f0;
//         }

//         .page-background.dark .chart-caption {
//           color: #94a3b8;
//         }

//         .page-background.dark .card {
//           background: #1e293b;
//         }

//         .page-background.dark .card-header h3 {
//           color: #e2e8f0;
//         }

//         .page-background.dark .activity-item {
//           background: #334155;
//         }

//         .page-background.dark .activity-item span {
//           color: #cbd5e1;
//         }

//         .page-background.dark .empty-activity {
//           color: #94a3b8;
//         }

//         .page-background.dark table thead {
//           background: #334155;
//         }

//         .page-background.dark table th {
//           color: #94a3b8;
//           border-bottom-color: #334155;
//         }

//         .page-background.dark table td {
//           color: #cbd5e1;
//           border-bottom-color: #334155;
//         }

//         .page-background.dark table tbody tr:hover {
//           background: #334155;
//         }

//         .page-background.dark .instructor-name {
//           color: #e2e8f0;
//         }

//         .page-background.dark .search-box input {
//           background: #334155;
//           color: #e2e8f0;
//           border-color: #475569;
//         }

//         .page-background.dark .search-box input:focus {
//           background: #475569;
//           border-color: #0077B6;
//         }

//         .page-background.dark .filter-select {
//           background: #334155;
//           color: #e2e8f0;
//           border-color: #475569;
//         }

//         .page-background.dark .last-updated {
//           color: #94a3b8;
//         }

//         .page-background.dark .footer {
//           color: #94a3b8;
//         }

//         .page-background.dark .error-container {
//           background: #1e293b;
//         }

//         .page-background.dark .error-container h3 {
//           color: #e2e8f0;
//         }

//         .page-background.dark .error-container p {
//           color: #94a3b8;
//         }

//         .page-container {
//           max-width: 1600px;
//           margin: 0 auto;
//         }

//         /* ===== HEADER ===== */
//         .dashboard-header {
//           background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
//           padding: 32px 40px;
//           border-radius: 16px;
//           margin-bottom: 24px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//         }

//         .header-title {
//           font-size: 32px;
//           font-weight: 700;
//           color: white;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         .header-subtitle {
//           font-size: 16px;
//           color: rgba(255,255,255,0.9);
//           margin: 0;
//           font-weight: 400;
//         }

//         .header-btn {
//           padding: 10px 20px;
//           background: rgba(255,255,255,0.2);
//           border: none;
//           border-radius: 8px;
//           color: white;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .header-btn:hover:not(:disabled) {
//           background: rgba(255,255,255,0.3);
//         }

//         .notification-btn {
//           position: relative;
//         }

//         .notification-badge {
//           position: absolute;
//           top: -4px;
//           right: -4px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           width: 20px;
//           height: 20px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         /* ===== STATS GRID ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .stats-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .stats-card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .skeleton-line {
//           height: 120px;
//           background: #e2e8f0;
//           border-radius: 8px;
//         }

//         .stats-icon {
//           width: 56px;
//           height: 56px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .trend-badge {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           padding: 4px 8px;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .stats-value {
//           font-size: 36px;
//           font-weight: 700;
//           margin: 0 0 8px 0;
//           color: #1e293b;
//         }

//         .stats-label {
//           font-size: 14px;
//           color: #64748b;
//           margin: 0;
//           font-weight: 500;
//         }

//         /* ===== QUICK INSIGHTS ===== */
//         .quick-insights {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           margin-bottom: 24px;
//         }

//         .quick-insights h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0 0 20px 0;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #1e293b;
//         }

//         .insights-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//         }

//         .insight-box {
//           padding: 16px;
//           background: #f8fafc;
//           border-radius: 12px;
//           border-left: 4px solid #0077B6;
//         }

//         .insight-box p {
//           font-size: 13px;
//           color: #64748b;
//           margin: 0 0 8px 0;
//         }

//         .insight-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         /* ===== CHARTS ===== */
//         .chart-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .chart-card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .chart-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .chart-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .chart-caption {
//           font-size: 13px;
//           color: #64748b;
//           text-align: center;
//           margin-top: 16px;
//         }

//         .chart-tooltip {
//           padding: 12px 16px;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           border: 2px solid;
//         }

//         .chart-tooltip p {
//           margin: 0;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         /* ===== CARDS ===== */
//         .card {
//           background: white;
//           border-radius: 16px;
//           padding: 24px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .card.skeleton {
//           background: #f1f5f9;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .card-header h3 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 0;
//           color: #1e293b;
//         }

//         .activity-count {
//           background: #0077B620;
//           color: #0077B6;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         /* ===== ACTIVITY FEED ===== */
//         .activity-list {
//           max-height: 400px;
//           overflow-y: auto;
//         }

//         .activity-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 8px;
//           background: #f8fafc;
//           transition: all 0.2s;
//           cursor: pointer;
//         }

//         .activity-item:hover {
//           background: #e2e8f0;
//         }

//         .activity-item span {
//           font-size: 14px;
//           color: #475569;
//           line-height: 1.6;
//         }

//         .empty-activity {
//           text-align: center;
//           padding: 40px 20px;
//           color: #64748b;
//         }

//         .empty-activity svg {
//           opacity: 0.3;
//           margin-bottom: 12px;
//         }

//         /* ===== TABLE CONTROLS ===== */
//         .table-controls {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//           margin-bottom: 16px;
//         }

//         .search-box {
//           position: relative;
//           flex: 1;
//           min-width: 200px;
//         }

//         .search-box svg {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//         }

//         .search-box input {
//           width: 100%;
//           padding: 10px 12px 10px 40px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           outline: none;
//         }

//         .search-box input:focus {
//           border-color: #0077B6;
//           background: white;
//         }

//         .filter-select {
//           padding: 10px 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           background: #f8fafc;
//           color: #1e293b;
//           font-size: 14px;
//           cursor: pointer;
//           outline: none;
//         }

//         .filter-select:hover {
//           border-color: #0077B6;
//         }

//         /* ===== TABLE ===== */
//         .table-wrapper {
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         table thead {
//           background: #f8fafc;
//         }

//         table th {
//           padding: 12px;
//           text-align: left;
//           font-size: 13px;
//           font-weight: 600;
//           color: #64748b;
//           border-bottom: 2px solid #e2e8f0;
//         }

//         table td {
//           padding: 16px 12px;
//           border-bottom: 1px solid #e2e8f0;
//           font-size: 14px;
//           color: #475569;
//         }

//         table tbody tr:hover {
//           background: #f8fafc;
//         }

//         .instructor-name {
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .load-bar {
//           width: 100%;
//           max-width: 120px;
//           height: 8px;
//           background: #e2e8f0;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-bottom: 4px;
//         }

//         .load-fill {
//           height: 100%;
//           border-radius: 4px;
//           transition: width 0.5s ease-out;
//         }

//         .load-text {
//           font-size: 13px;
//           font-weight: 600;
//           color: #475569;
//           display: block;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .status-badge.active {
//           background: #10b98120;
//           color: #10b981;
//         }

//         /* ===== ALERTS ===== */
//         .conflict-alert {
//           background: #fef2f2;
//           border: 1px solid #fecaca;
//           border-radius: 12px;
//           padding: 16px 20px;
//           margin-bottom: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .conflict-alert div {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .conflict-alert span {
//           font-size: 14px;
//           color: #991b1b;
//           font-weight: 500;
//         }

//         .conflict-alert button {
//           padding: 8px 20px;
//           background: #ef4444;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .conflict-alert button:hover {
//           background: #dc2626;
//         }

//         /* ===== LAYOUT ===== */
//         .two-column-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 20px;
//         }

//         .last-updated {
//           text-align: right;
//           font-size: 13px;
//           color: #64748b;
//           margin-bottom: 16px;
//         }

//         .error-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 400px;
//           background: white;
//           border-radius: 16px;
//           padding: 40px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           text-align: center;
//           max-width: 400px;
//           margin: 0 auto;
//         }

//         .error-container h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 12px;
//         }

//         .error-container p {
//           font-size: 14px;
//           color: #64748b;
//           margin-bottom: 24px;
//         }

//         .retry-btn {
//           padding: 12px 32px;
//           background: #0077B6;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .retry-btn:hover {
//           background: #005f8f;
//         }

//         .footer {
//           margin-top: 32px;
//           padding: 20px;
//           text-align: center;
//           font-size: 13px;
//           color: #64748b;
//         }

//         .footer p {
//           margin: 0;
//         }

//         /* ===== TOAST ===== */
//         .toast {
//           animation: slideIn 0.3s ease-out;
//         }

//         .toast-close {
//           background: transparent;
//           border: none;
//           color: white;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//         }

//         /* ===== ANIMATIONS ===== */
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         /* ===== SCROLLBAR ===== */
//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f1f5f9;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DeanDashboard;

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  Users,
  DoorOpen,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Moon,
  Sun,
  Bell,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Search,
  Filter,
  ChevronDown,
  FileText,
  Activity,
  BarChart3,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import { API } from '../../config/api';


// ==================== CUSTOM HOOKS ====================
const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

const useDashboardData = (timeFilter) => {
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // const API_BASE =
  // process.env.REACT_APP_API_URL ||
  // (window.location.hostname === 'localhost'
  //   ? 'http://localhost:5000'
  //   : 'https://lavenderblush-chinchilla-571128.hostingersite.com ');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: { pending: 0, faculty: 0, rooms: 0, conflicts: 0 },
    facultyDist: [],
    roomUtil: [],
    activities: [],
    instructors: [],
    trends: {
      pending: { direction: "up", value: 12 },
      faculty: { direction: "up", value: 5 },
      rooms: { direction: "down", value: 3 },
      conflicts: { direction: "down", value: 8 },
    },
  });

  // Helper: categorize slot_index into Morning / Afternoon / Evening
  const categorizeSlot = (slotIndex) => {
    if (slotIndex < 4) return "Morning"; // slots 0–3
    if (slotIndex < 7) return "Afternoon"; // slots 4–6
    return "Evening"; // slots 7+
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch Instructors
      const instructorsRes = await fetch(`${API}/api/instructors`);
      if (!instructorsRes.ok) {
        throw new Error(`Failed to fetch instructors: ${instructorsRes.status}`);
      }
      const instructorsText = await instructorsRes.text();
      const instructors = instructorsText ? JSON.parse(instructorsText) : [];

      // 2. Fetch Rooms
      const roomsRes = await fetch(`${API}/api/rooms`);
      if (!roomsRes.ok) {
        throw new Error(`Failed to fetch rooms: ${roomsRes.status}`);
      }
      const roomsText = await roomsRes.text();
      const rooms = roomsText ? JSON.parse(roomsText) : [];

      // 3. Fetch Schedules
      const schedRes = await fetch(`${API}/api/scheduler`);
      if (!schedRes.ok) {
        throw new Error(`Failed to fetch schedules: ${schedRes.status}`);
      }
      const schedText = await schedRes.text();
      const schedules = schedText ? JSON.parse(schedText) : [];

      // 4. Fetch Instructor Availability (for pending requests count)
      const availabilityRes = await fetch(`${API}/api/instructor-availability`);
      let pendingCount = 0;
      if (availabilityRes.ok) {
        const availabilityText = await availabilityRes.text();
        const availability = availabilityText ? JSON.parse(availabilityText) : [];
        // Count unique instructors with availability submissions as "pending requests"
        const uniqueInstructors = new Set(
          Array.isArray(availability) 
            ? availability.map(item => item.instructorName || item.instructor_id) 
            : []
        );
        pendingCount = uniqueInstructors.size;
      }

      // --- Stats ---
      const conflictCount = schedules.filter((s) => s.conflict).length;
      
      // --- Faculty Distribution (group instructors by course_code) ---
      const distMap = {};
      instructors.forEach((i) => {
        const course = i.course_code || "Unassigned";
        distMap[course] = (distMap[course] || 0) + 1;
      });

      // --- Room Utilization (group schedules by time of day) ---
      const utilMap = { Morning: 0, Afternoon: 0, Evening: 0 };
      schedules.forEach((s) => {
        utilMap[categorizeSlot(s.slot_index)]++;
      });

      // --- Recent Activity (latest 10 schedules) ---
      const activityLogs = schedules.slice(-10).map((s) => {
        return `${s.subject_code} (${s.section_name}) assigned to ${s.instructor_name || 'TBA'} in Room ${s.room_name || 'TBA'} [${s.day}, slot ${s.slot_index}]`;
      });

      // --- Build instructors list with details ---
      const instructorsList = instructors.slice(0, 10).map((inst) => {
        // Count schedules for this instructor
        const instSchedules = schedules.filter(s => s.instructor_id === inst.id);
        const loadPercentage = Math.min(Math.round((instSchedules.length / 20) * 100), 100);
        
        return {
          name: inst.name,
          department: inst.course_code || "N/A",
          load: loadPercentage,
          status: "Active"
        };
      });

      setDashboardData({
        stats: {
          pending: pendingCount,
          faculty: instructors.length,
          rooms: rooms.length,
          conflicts: conflictCount,
        },
        facultyDist: Object.entries(distMap).map(([name, value]) => ({
          name,
          value,
        })),
        roomUtil: Object.entries(utilMap).map(([name, value]) => ({
          name,
          value,
        })),
        activities: activityLogs,
        instructors: instructorsList,
        trends: dashboardData.trends,
      });

      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Dashboard error:", err);
      let errorMessage = "Failed to load dashboard data";
      
      if (err.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to server. Make sure your backend is running on " + API;
      } else if (err.message.includes("JSON")) {
        errorMessage = "Server returned invalid data. Check if API endpoints exist: /api/instructors, /api/rooms, /api/scheduler, /api/instructor-availability";
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  }, [API, timeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...dashboardData, loading, error, lastUpdated, refetch: fetchData };
};

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return { darkMode, toggleTheme };
};

// ==================== ANIMATED COUNTER ====================

const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / 50));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

// ==================== TOAST NOTIFICATION ====================

const Toast = ({ message, type, onClose }) => (
  <div className="toast" style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 10000,
  }}>
    <span>{message}</span>
    <button onClick={onClose} className="toast-close">
      <X size={16} />
    </button>
  </div>
);

// ==================== DASHBOARD HEADER ====================

const DashboardHeader = ({ darkMode, toggleTheme, onRefresh, refreshing, conflictCount, onExport }) => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const currentDate = useMemo(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }), []
  );

  return (
    <div className="dashboard-header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <GraduationCap size={32} color="white" />
            <h1 className="header-title">
              EduSched Dean Dashboard
            </h1>
          </div>
          <p className="header-subtitle">
            {greeting}, Dean! • {currentDate}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={onExport} className="header-btn">
            <Download size={18} />
            Export Report
          </button>
          
          <button onClick={onRefresh} disabled={refreshing} className="header-btn">
            <RefreshCw size={20} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
          </button>
          
          <button onClick={toggleTheme} className="header-btn">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="header-btn notification-btn">
            <Bell size={20} />
            {conflictCount > 0 && (
              <span className="notification-badge">{conflictCount}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


// ==================== STATS CARD ====================

const StatsCard = ({ title, value, icon: Icon, color, trend, loading, darkMode }) => {
  if (loading) {
    return (
      <div className="stats-card skeleton">
        <div className="skeleton-line"></div>
      </div>
    );
  }

  return (
    <div className="stats-card" onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
    }} onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div className="stats-icon" style={{ background: `${color}20` }}>
          <Icon size={24} color={color} />
        </div>
        
        {trend && (
          <div className="trend-badge" style={{
            background: trend.direction === 'up' ? '#10b98120' : '#ef444420',
            color: trend.direction === 'up' ? '#10b981' : '#ef4444',
          }}>
            {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {trend.value}%
          </div>
        )}
      </div>
      
      <h3 className="stats-value">
        <AnimatedCounter value={value} />
      </h3>
      
      <p className="stats-label">
        {title}
      </p>
    </div>
  );
};

// ==================== STATS GRID ====================

const StatsGrid = ({ stats, trends, loading, darkMode }) => (
  <div className="stats-grid">
    <StatsCard
      title="Pending Requests"
      value={stats.pending}
      icon={Clock}
      color="#0077B6"
      trend={trends.pending}
      loading={loading}
      darkMode={darkMode}
    />
    <StatsCard
      title="Faculty Members"
      value={stats.faculty}
      icon={Users}
      color="#0096C7"
      trend={trends.faculty}
      loading={loading}
      darkMode={darkMode}
    />
    <StatsCard
      title="Available Rooms"
      value={stats.rooms}
      icon={DoorOpen}
      color="#00B4D8"
      trend={trends.rooms}
      loading={loading}
      darkMode={darkMode}
    />
    <StatsCard
      title="Conflict Alerts"
      value={stats.conflicts}
      icon={AlertTriangle}
      color="#ef4444"
      trend={trends.conflicts}
      loading={loading}
      darkMode={darkMode}
    />
  </div>
);

// ==================== CHART SECTION ====================

const ChartSection = ({ facultyDist, roomUtil, loading, darkMode }) => {
  const COLORS = ["#0077B6", "#0096C7", "#00B4D8", "#48CAE4", "#90E0EF"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip" style={{
          background: darkMode ? '#1e293b' : 'white',
          borderColor: COLORS[0],
        }}>
          <p>
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="chart-grid">
        {[1, 2].map(i => (
          <div key={i} className="chart-card skeleton">
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <div className="chart-header">
          <h3>Faculty Distribution by Department</h3>
          <Info size={18} />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={facultyDist}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {facultyDist.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <p className="chart-caption">
          Faculty allocation across departments
        </p>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>Room Utilization by Time Slot</h3>
          <Info size={18} />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roomUtil}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#0077B6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="chart-caption">
          Schedule distribution throughout the day
        </p>
      </div>
    </div>
  );
};

// ==================== ACTIVITY FEED ====================

const ActivityFeed = ({ activities, loading, darkMode }) => {
  if (loading) {
    return (
      <div className="card skeleton">
        <div className="skeleton-line"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Recent Scheduling Activity</h3>
        <span className="activity-count">{activities.length} events</span>
      </div>

      <div className="activity-list">
        {activities.length > 0 ? (
          activities.map((act, i) => (
            <div key={i} className="activity-item" onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#475569' : '#e2e8f0'}
               onMouseLeave={e => e.currentTarget.style.background = darkMode ? '#334155' : '#f8fafc'}>
              <CheckCircle size={18} color="#10b981" />
              <span>{act}</span>
            </div>
          ))
        ) : (
          <div className="empty-activity">
            <Activity size={48} />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== FACULTY TABLE ====================

const FacultyTable = ({ instructors, loading, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const filteredInstructors = useMemo(() => {
    return instructors.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === "All" || inst.department === filterDept;
      return matchesSearch && matchesDept;
    });
  }, [instructors, searchTerm, filterDept]);

  if (loading) {
    return (
      <div className="card skeleton">
        <div className="skeleton-line"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Faculty Overview</h3>
      </div>
      
      <div className="table-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="filter-select"
        >
          <option>All</option>
          <option>BSIT</option>
          <option>BSBA</option>
          <option>BTLED</option>
          <option>BSTM</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Instructor</th>
              <th>Department</th>
              <th>Load</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.map((inst, i) => (
              <tr key={i}>
                <td className="instructor-name">{inst.name}</td>
                <td>{inst.department}</td>
                <td>
                  <div className="load-bar">
                    <div className="load-fill" style={{
                      width: `${inst.load}%`,
                      backgroundColor: inst.load > 80 ? '#ef4444' : inst.load > 60 ? '#f59e0b' : '#10b981',
                    }}></div>
                  </div>
                  <span className="load-text">{inst.load}%</span>
                </td>
                <td>
                  <span className={`status-badge ${inst.status.toLowerCase()}`}>
                    {inst.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==================== QUICK INSIGHTS PANEL ====================

const QuickInsights = ({ stats, darkMode }) => (
  <div className="quick-insights">
    <h3><BarChart3 size={22} /> Quick Insights</h3>
    
    <div className="insights-grid">
      <div className="insight-box">
        <p>Total Schedules</p>
        <div className="insight-value"><AnimatedCounter value={156} /></div>
      </div>
      
      <div className="insight-box">
        <p>Avg. Room Utilization</p>
        <div className="insight-value">78%</div>
      </div>
      
      <div className="insight-box">
        <p>Peak Hours</p>
        <div className="insight-value">1-3 PM</div>
      </div>
      
      <div className="insight-box">
        <p>Efficiency Score</p>
        <div className="insight-value">92%</div>
      </div>
    </div>
  </div>
);

// ==================== ERROR BOUNDARY ====================

const ErrorBoundary = ({ error, onRetry, darkMode }) => (
  <div className="error-container">
    <XCircle size={64} color="#ef4444" />
    <h3>Failed to Load Dashboard</h3>
    <p>{error}</p>
    <button onClick={onRetry} className="retry-btn">
      Retry Loading
    </button>
  </div>
);

// ==================== MAIN DASHBOARD COMPONENT ====================

const DeanDashboard = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [toast, setToast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const {
    stats,
    trends,
    facultyDist,
    roomUtil,
    activities,
    instructors,
    loading,
    error,
    lastUpdated,
    refetch,
  } = useDashboardData(timeFilter);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    setToast({ message: "Dashboard refreshed successfully", type: "success" });
    setTimeout(() => setToast(null), 3000);
  }, [refetch]);

  const handleExport = useCallback(() => {
    try {
      // Create CSV content
      const csvContent = generateCSVReport(stats, facultyDist, roomUtil, activities, instructors);
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `EduSched_Report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setToast({ message: "Report exported successfully!", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({ message: "Failed to export report", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  }, [stats, facultyDist, roomUtil, activities, instructors]);

  // Helper function to generate CSV report
  const generateCSVReport = (stats, facultyDist, roomUtil, activities, instructors) => {
    let csv = 'EduSched Dashboard Report\n';
    csv += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    // Stats Section
    csv += 'SUMMARY STATISTICS\n';
    csv += 'Metric,Value\n';
    csv += `Pending Requests,${stats.pending}\n`;
    csv += `Faculty Members,${stats.faculty}\n`;
    csv += `Available Rooms,${stats.rooms}\n`;
    csv += `Conflict Alerts,${stats.conflicts}\n\n`;
    
    // Faculty Distribution
    csv += 'FACULTY DISTRIBUTION BY DEPARTMENT\n';
    csv += 'Department,Count\n';
    facultyDist.forEach(dept => {
      csv += `${dept.name},${dept.value}\n`;
    });
    csv += '\n';
    
    // Room Utilization
    csv += 'ROOM UTILIZATION BY TIME SLOT\n';
    csv += 'Time Slot,Count\n';
    roomUtil.forEach(slot => {
      csv += `${slot.name},${slot.value}\n`;
    });
    csv += '\n';
    
    // Faculty Overview
    csv += 'FACULTY OVERVIEW\n';
    csv += 'Instructor,Department,Load %,Status\n';
    instructors.forEach(inst => {
      csv += `${inst.name},${inst.department},${inst.load},${inst.status}\n`;
    });
    csv += '\n';
    
    // Recent Activity
    csv += 'RECENT SCHEDULING ACTIVITY\n';
    csv += 'Activity\n';
    activities.forEach(act => {
      csv += `"${act}"\n`;
    });
    
    return csv;
  };

  const timeAgo = useMemo(() => {
    if (!lastUpdated) return "";
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
  }, [lastUpdated]);

  if (error) {
    return (
      <div className="page-background">
        <ErrorBoundary error={error} onRetry={refetch} darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div className={`page-background ${darkMode ? 'dark' : 'light'}`}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-container">
        <DashboardHeader
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          conflictCount={stats.conflicts}
          onExport={handleExport}
        />

        {stats.conflicts > 0 && (
          <div className="conflict-alert">
            <div>
              <AlertTriangle size={22} color="#ef4444" />
              <span>
                <strong>{stats.conflicts} scheduling conflict{stats.conflicts > 1 ? 's' : ''}</strong> detected and require immediate review
              </span>
            </div>
            <button>Review Now</button>
          </div>
        )}

        {lastUpdated && (
          <div className="last-updated">
            Last updated: {timeAgo}
          </div>
        )}

        <StatsGrid stats={stats} trends={trends} loading={loading} darkMode={darkMode} />
        
        <QuickInsights stats={stats} darkMode={darkMode} />
        
        <ChartSection
          facultyDist={facultyDist}
          roomUtil={roomUtil}
          loading={loading}
          darkMode={darkMode}
        />

        <div className="two-column-grid">
          <ActivityFeed activities={activities} loading={loading} darkMode={darkMode} />
          <FacultyTable instructors={instructors} loading={loading} darkMode={darkMode} />
        </div>

        <div className="footer">
          <p>EduSched Academic Management System © 2025 • Built for Excellence in Education</p>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .page-background {
          min-height: 100vh;
          padding: 20px;
          transition: background 0.3s ease;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);

        }

        .page-background.light {
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
        }

        .page-background.dark {
          background: #0f172a;
        }

        .page-background.dark .stats-card {
          background: #1e293b;
          color: #e2e8f0;
        }

        .page-background.dark .stats-value {
          color: #e2e8f0;
        }

        .page-background.dark .stats-label {
          color: #94a3b8;
        }

        .page-background.dark .quick-insights {
          background: #1e293b;
        }

        .page-background.dark .quick-insights h3 {
          color: #e2e8f0;
        }

        .page-background.dark .insight-box {
          background: #334155;
        }

        .page-background.dark .insight-value {
          color: #e2e8f0;
        }

        .page-background.dark .chart-card {
          background: #1e293b;
        }

        .page-background.dark .chart-header h3 {
          color: #e2e8f0;
        }

        .page-background.dark .chart-caption {
          color: #94a3b8;
        }

        .page-background.dark .card {
          background: #1e293b;
        }

        .page-background.dark .card-header h3 {
          color: #e2e8f0;
        }

        .page-background.dark .activity-item {
          background: #334155;
        }

        .page-background.dark .activity-item span {
          color: #cbd5e1;
        }

        .page-background.dark .empty-activity {
          color: #94a3b8;
        }

        .page-background.dark table thead {
          background: #334155;
        }

        .page-background.dark table th {
          color: #94a3b8;
          border-bottom-color: #334155;
        }

        .page-background.dark table td {
          color: #cbd5e1;
          border-bottom-color: #334155;
        }

        .page-background.dark table tbody tr:hover {
          background: #334155;
        }

        .page-background.dark .instructor-name {
          color: #e2e8f0;
        }

        .page-background.dark .search-box input {
          background: #334155;
          color: #e2e8f0;
          border-color: #475569;
        }

        .page-background.dark .search-box input:focus {
          background: #475569;
          border-color: #0077B6;
        }

        .page-background.dark .filter-select {
          background: #334155;
          color: #e2e8f0;
          border-color: #475569;
        }

        .page-background.dark .last-updated {
          color: #94a3b8;
        }

        .page-background.dark .footer {
          color: #94a3b8;
        }

        .page-background.dark .error-container {
          background: #1e293b;
        }

        .page-background.dark .error-container h3 {
          color: #e2e8f0;
        }

        .page-background.dark .error-container p {
          color: #94a3b8;
        }

        .page-container {
          max-width: 1600px;
          margin: 0 auto;
        }

        /* ===== HEADER ===== */
        .dashboard-header {
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          padding: 32px 40px;
          border-radius: 16px;
          margin-bottom: 24px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .header-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .header-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.9);
          margin: 0;
          font-weight: 400;
        }

        .header-btn {
          padding: 10px 20px;
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .header-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.3);
        }

        .notification-btn {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .stats-card.skeleton {
          background: #f1f5f9;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-line {
          height: 120px;
          background: #e2e8f0;
          border-radius: 8px;
        }

        .stats-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trend-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .stats-value {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1e293b;
        }

        .stats-label {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }

        /* ===== QUICK INSIGHTS ===== */
        .quick-insights {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-bottom: 24px;
        }

        .quick-insights h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e293b;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .insight-box {
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #0077B6;
        }

        .insight-box p {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 8px 0;
        }

        .insight-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
        }

        /* ===== CHARTS ===== */
        .chart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #1e293b;
        }

        .chart-caption {
          font-size: 13px;
          color: #64748b;
          text-align: center;
          margin-top: 16px;
        }

        .chart-tooltip {
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 2px solid;
        }

        .chart-tooltip p {
          margin: 0;
          font-weight: 600;
          color: #1e293b;
        }

        /* ===== CARDS ===== */
        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .card.skeleton {
          background: #f1f5f9;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #1e293b;
        }

        .activity-count {
          background: #0077B620;
          color: #0077B6;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        /* ===== ACTIVITY FEED ===== */
        .activity-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
          background: #f8fafc;
          transition: all 0.2s;
          cursor: pointer;
        }

        .activity-item:hover {
          background: #e2e8f0;
        }

        .activity-item span {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }

        .empty-activity {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
        }

        .empty-activity svg {
          opacity: 0.3;
          margin-bottom: 12px;
        }

        /* ===== TABLE CONTROLS ===== */
        .table-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-box input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #1e293b;
          font-size: 14px;
          outline: none;
        }

        .search-box input:focus {
          border-color: #0077B6;
          background: white;
        }

        .filter-select {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #1e293b;
          font-size: 14px;
          cursor: pointer;
          outline: none;
        }

        .filter-select:hover {
          border-color: #0077B6;
        }

        /* ===== TABLE ===== */
        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        table thead {
          background: #f8fafc;
        }

        table th {
          padding: 12px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          border-bottom: 2px solid #e2e8f0;
        }

        table td {
          padding: 16px 12px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
          color: #475569;
        }

        table tbody tr:hover {
          background: #f8fafc;
        }

        .instructor-name {
          font-weight: 600;
          color: #1e293b;
        }

        .load-bar {
          width: 100%;
          max-width: 120px;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .load-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease-out;
        }

        .load-text {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          display: block;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.active {
          background: #10b98120;
          color: #10b981;
        }

        /* ===== ALERTS ===== */
        .conflict-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .conflict-alert div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .conflict-alert span {
          font-size: 14px;
          color: #991b1b;
          font-weight: 500;
        }

        .conflict-alert button {
          padding: 8px 20px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .conflict-alert button:hover {
          background: #dc2626;
        }

        /* ===== LAYOUT ===== */
        .two-column-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .last-updated {
          text-align: right;
          font-size: 13px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .error-container h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .error-container p {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
        }

        .retry-btn {
          padding: 12px 32px;
          background: #0077B6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .retry-btn:hover {
          background: #005f8f;
        }

        .footer {
          margin-top: 32px;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
        }

        .footer p {
          margin: 0;
        }

        /* ===== TOAST ===== */
        .toast {
          animation: slideIn 0.3s ease-out;
        }

        .toast-close {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default DeanDashboard;