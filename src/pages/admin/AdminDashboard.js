// import React from "react";

// import '../../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   return (
//     <div className="dashboard">
//       {/* Header */}
//       <header className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <p>Welcome back, Admin! Here’s what’s happening today.</p>
//       </header>

//       {/* Cards Section */}
//       <div className="dashboard-cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p className="number">1,245</p>
//         </div>
//         <div className="card">
//           <h3>Active Schedules</h3>
//           <p className="number">342</p>
//         </div>
//         <div className="card">
//           <h3>Reports Generated</h3>
//           <p className="number">87</p>
//         </div>
//         <div className="card">
//           <h3>System Health</h3>
//           <p className="status good">✔ Stable</p>
//         </div>
//       </div>

//       {/* Analytics Section */}
//       <section className="dashboard-analytics">
//         <h2>Analytics Overview</h2>
//         <div className="analytics-box">
//           <div className="analytics-item">
//             <h4>User Growth</h4>
//             <p>📈 12% increase this month</p>
//           </div>
//           <div className="analytics-item">
//             <h4>Schedule Usage</h4>
//             <p>🗓 Peak activity on Mondays & Wednesdays</p>
//           </div>
//           <div className="analytics-item">
//             <h4>Login Activity</h4>
//             <p>👤 432 logins in the last 24 hours</p>
//           </div>
//         </div>
//       </section>

//       {/* Table Section */}
//       <section className="dashboard-table">
//         <h2>Recent User Activity</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Action</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Alice Johnson</td>
//               <td>Created Schedule</td>
//               <td>2025-09-22</td>
//               <td><span className="badge success">Completed</span></td>
//             </tr>
//             <tr>
//               <td>Mark Rivera</td>
//               <td>Updated Role</td>
//               <td>2025-09-21</td>
//               <td><span className="badge warning">Pending</span></td>
//             </tr>
//             <tr>
//               <td>Jane Doe</td>
//               <td>Generated Report</td>
//               <td>2025-09-20</td>
//               <td><span className="badge success">Completed</span></td>
//             </tr>
//             <tr>
//               <td>Chris Evans</td>
//               <td>Deleted Account</td>
//               <td>2025-09-19</td>
//               <td><span className="badge danger">Removed</span></td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Users, Calendar, FileText, Activity, TrendingUp, 
//   TrendingDown, Download, RefreshCw, Search, Filter,
//   CheckCircle, AlertCircle, Clock, BarChart3
// } from "lucide-react";

// // ==================== CONSTANTS ====================
// const COLORS = {
//   primary: "#03045E",
//   secondary: "#023E8A",
//   accent: "#0077B6",
//   light: "#00B4D8",
//   lighter: "#48CAE4",
//   lightest: "#CAF0F8",
// };

// const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // ==================== MOCK DATA (Replace with API calls) ====================
// const MOCK_STATS = {
//   totalUsers: 12,
//   userGrowth: 2,
//   totalCourses: 12,
//   coursesGrowthGrowth: 8,
//   totalInstructors: 8,
//   reportGrowth: 3,
//   systemHealth: 'stable',
//   loginActivity: 12,
// };

// const MOCK_ACTIVITIES = [
//   { id: 1, user: 'Joshua Lasac', action: 'Created Schedule', date: '2025-10-15', status: 'completed' },
//   { id: 2, user: 'Charisse Yambao', action: 'Updated Role', date: '2025-10-15', status: 'pending' },
//   { id: 3, user: 'Karl Erosa', action: 'Generated Report', date: '2025-10-14', status: 'completed' },
//   { id: 4, user: 'Joshua Lasac', action: 'Deleted Account', date: '2025-10-14', status: 'removed' },
//   { id: 5, user: 'Charisse Yambao', action: 'Uploaded Schedule', date: '2025-10-13', status: 'completed' },
// ];

// // ==================== STAT CARD COMPONENT ====================
// const StatCard = React.memo(({ icon: Icon, title, value, growth, color, loading }) => {
//   const isPositive = growth >= 0;

//   return (
//     <div className="stat-card" style={{ borderTopColor: color }}>
//       <div className="stat-icon-wrapper" style={{ background: `${color}15`, color }}>
//         <Icon size={28} />
//       </div>
//       <div className="stat-content">
//         {loading ? (
//           <div className="skeleton-value"></div>
//         ) : (
//           <>
//             <div className="stat-value">{value.toLocaleString()}</div>
//             <div className="stat-title">{title}</div>
//             {growth !== undefined && (
//               <div className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
//                 {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
//                 <span>{Math.abs(growth)}% {isPositive ? 'increase' : 'decrease'}</span>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// });

// // ==================== ACTIVITY TABLE COMPONENT ====================
// const ActivityTable = React.memo(({ activities, loading, onRefresh }) => {
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');

//   const filteredActivities = useMemo(() => {
//     let filtered = activities;

//     if (search) {
//       const term = search.toLowerCase();
//       filtered = filtered.filter(a => 
//         a.user.toLowerCase().includes(term) ||
//         a.action.toLowerCase().includes(term)
//       );
//     }

//     if (filter !== 'all') {
//       filtered = filtered.filter(a => a.status === filter);
//     }

//     return filtered;
//   }, [activities, search, filter]);

//   const getStatusBadge = (status) => {
//     const badges = {
//       completed: { label: 'Completed', class: 'success', icon: CheckCircle },
//       pending: { label: 'Pending', class: 'warning', icon: Clock },
//       removed: { label: 'Removed', class: 'danger', icon: AlertCircle },
//     };
//     const badge = badges[status] || badges.completed;
//     const Icon = badge.icon;

//     return (
//       <span className={`status-badge ${badge.class}`}>
//         <Icon size={14} />
//         {badge.label}
//       </span>
//     );
//   };

//   return (
//     <div className="activity-section">
//       <div className="section-header">
//         <h2>Recent User Activity</h2>
//         <div className="header-actions">
//           <div className="search-box">
//             <Search size={16} className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search activities..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           <select
//             className="filter-select"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">All Status</option>
//             <option value="completed">Completed</option>
//             <option value="pending">Pending</option>
//             <option value="removed">Removed</option>
//           </select>

//           <button className="refresh-btn" onClick={onRefresh}>
//             <RefreshCw size={16} />
//           </button>
//         </div>
//       </div>

//       <div className="table-wrapper">
//         {loading ? (
//           <div className="table-loading">
//             <div className="spinner"></div>
//             <p>Loading activities...</p>
//           </div>
//         ) : filteredActivities.length === 0 ? (
//           <div className="empty-state">
//             <Activity size={48} className="empty-icon" />
//             <h3>No Activities Found</h3>
//             <p>No recent activity matches your criteria</p>
//           </div>
//         ) : (
//           <table className="activity-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Action</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredActivities.map((activity) => (
//                 <tr key={activity.id} className="activity-row">
//                   <td>
//                     <div className="user-cell">
//                       <div className="user-avatar">
//                         {activity.user.charAt(0)}
//                       </div>
//                       <span>{activity.user}</span>
//                     </div>
//                   </td>
//                   <td>{activity.action}</td>
//                   <td>{new Date(activity.date).toLocaleDateString()}</td>
//                   <td>{getStatusBadge(activity.status)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// });

// // ==================== MAIN DASHBOARD COMPONENT ====================
// export default function AdminDashboard() {
//   const [stats, setStats] = useState(MOCK_STATS);
//   const [activities, setActivities] = useState(MOCK_ACTIVITIES);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   /**
//    * Fetch dashboard data from API
//    */
//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       // Replace with actual API calls
//       // const response = await fetch(`${API_BASE}/api/admin/stats`);
//       // const data = await response.json();
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       setStats(MOCK_STATS);
//       setActivities(MOCK_ACTIVITIES);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Refresh dashboard data
//    */
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchDashboardData();
//     setRefreshing(false);
//   };

//   // Initial data load
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="header-content">
//           <div>
//             <h1>Super Admin Dashboard</h1>
//             <p>Welcome back! Here's your system overview</p>
//           </div>
//           <div className="header-actions">
//             <button className="action-btn">
//               <Download size={18} />
//               Export Report
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
//       </div>

//       {/* Stats Grid */}
//       <div className="stats-grid">
//         <StatCard
//           icon={Users}
//           title="Total Users"
//           value={stats.totalUsers}
//           growth={stats.userGrowth}
//           color={COLORS.accent}
//           loading={loading}
//         />
//         <StatCard
//           icon={Calendar}
//           title="Toatal Courses"
//           value={stats.totalCourses}
//           growth={stats.coursesGrowth}
//           color={COLORS.light}
//           loading={loading}
//         />
//         <StatCard
//           icon={FileText}
//           title="Total Instructors"
//           value={stats.totalInstructors}
//           growth={stats.reportGrowth}
//           color={COLORS.lighter}
//           loading={loading}
//         />
//         <StatCard
//           icon={Activity}
//           title="Login Activity (24h)"
//           value={stats.loginActivity}
//           color={COLORS.secondary}
//           loading={loading}
//         />
//       </div>

//       {/* Analytics Section */}
//       <div className="analytics-section">
//         <div className="section-header">
//           <h2>Analytics Overview</h2>
//           <BarChart3 size={20} />
//         </div>
//         <div className="analytics-grid">
//           <div className="analytics-card">
//             <div className="analytics-icon" style={{ background: `${COLORS.accent}15`, color: COLORS.accent }}>
//               <TrendingUp size={24} />
//             </div>
//             <div className="analytics-content">
//               <h4>User Growth</h4>
//               <p className="analytics-value">📈 12% increase</p>
//               <p className="analytics-description">Compared to last month</p>
//             </div>
//           </div>

//           <div className="analytics-card">
//             <div className="analytics-icon" style={{ background: `${COLORS.light}15`, color: COLORS.light }}>
//               <Calendar size={24} />
//             </div>
//             <div className="analytics-content">
//               <h4>Schedule Usage</h4>
//               <p className="analytics-value">🗓 Peak Activity</p>
//               <p className="analytics-description">Mondays & Wednesdays</p>
//             </div>
//           </div>

//           <div className="analytics-card">
//             <div className="analytics-icon" style={{ background: `${COLORS.lighter}15`, color: COLORS.lighter }}>
//               <Users size={24} />
//             </div>
//             <div className="analytics-content">
//               <h4>System Health</h4>
//               <p className="analytics-value status-good">✓ Stable</p>
//               <p className="analytics-description">All systems operational</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Table */}
//       <ActivityTable
//         activities={activities}
//         loading={loading}
//         onRefresh={handleRefresh}
//       />

//       {/* Inline Styles */}
//       <style jsx>{`
//         .admin-dashboard {
//           padding: 2rem;
//           background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
//           min-height: 100vh;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//         }

//         /* ===== HEADER ===== */
//         .dashboard-header {
//           margin-bottom: 2rem;
//         }

//         .header-content {
//           background: white;
//           padding: 2rem;
//           border-radius: 16px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//         }

//         .header-content h1 {
//           font-size: 2rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.5rem 0;
//         }

//         .header-content p {
//           margin: 0;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
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
//           background: ${COLORS.primary};
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .action-btn:hover:not(:disabled) {
//           background: ${COLORS.secondary};
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
//         }

//         .action-btn.refresh {
//           background: ${COLORS.accent};
//         }

//         .action-btn:disabled {
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

//         /* ===== STATS GRID ===== */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 16px;
//           padding: 1.75rem;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           border-top: 4px solid;
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           transition: all 0.3s ease;
//           animation: fadeInUp 0.5s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
//         }

//         .stat-icon-wrapper {
//           width: 64px;
//           height: 64px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 14px;
//         }

//         .stat-content {
//           flex: 1;
//         }

//         .stat-value {
//           font-size: 2.25rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           line-height: 1;
//           margin-bottom: 0.5rem;
//         }

//         .stat-title {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//           margin-bottom: 0.5rem;
//         }

//         .stat-growth {
//           display: flex;
//           align-items: center;
//           gap: 0.35rem;
//           font-size: 0.85rem;
//           font-weight: 600;
//         }

//         .stat-growth.positive {
//           color: #10b981;
//         }

//         .stat-growth.negative {
//           color: #ef4444;
//         }

//         .skeleton-value {
//           width: 120px;
//           height: 40px;
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         /* ===== ANALYTICS SECTION ===== */
//         .analytics-section {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           margin-bottom: 2rem;
//         }

//         .section-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//         }

//         .section-header h2 {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0;
//         }

//         .analytics-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         .analytics-card {
//           display: flex;
//           align-items: center;
//           gap: 1.25rem;
//           padding: 1.5rem;
//           background: #f8f9fa;
//           border-radius: 12px;
//           transition: all 0.3s ease;
//         }

//         .analytics-card:hover {
//                     background: #f1f5f9;
//           transform: translateY(-4px);
//         }

//         .analytics-icon {
//           width: 56px;
//           height: 56px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//           font-size: 1.5rem;
//         }

//         .analytics-content h4 {
//           font-size: 1rem;
//           font-weight: 700;
//           color: ${COLORS.primary};
//           margin: 0 0 0.25rem 0;
//         }

//         .analytics-value {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: ${COLORS.secondary};
//           margin: 0;
//         }

//         .analytics-value.status-good {
//           color: #10b981;
//           font-weight: 700;
//         }

//         .analytics-description {
//           font-size: 0.85rem;
//           color: ${COLORS.secondary};
//           opacity: 0.7;
//         }

//         /* ===== ACTIVITY TABLE ===== */
//         .activity-section {
//           background: white;
//           border-radius: 16px;
//           padding: 2rem;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//           margin-bottom: 2rem;
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .activity-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 1rem;
//         }

//         .activity-table th,
//         .activity-table td {
//           padding: 0.75rem 1rem;
//           text-align: left;
//           border-bottom: 1px solid #e5e7eb;
//         }

//         .activity-table th {
//           font-size: 0.9rem;
//           color: ${COLORS.primary};
//           font-weight: 700;
//           text-transform: uppercase;
//           background: #f8fafc;
//         }

//         .activity-table td {
//           font-size: 0.95rem;
//           color: ${COLORS.secondary};
//         }

//         .activity-row:hover {
//           background: #f1f5f9;
//           transition: all 0.3s ease;
//         }

//         .user-cell {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .user-avatar {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           background: ${COLORS.lightest};
//           color: ${COLORS.primary};
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .status-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.3rem;
//           padding: 0.3rem 0.6rem;
//           border-radius: 8px;
//           font-size: 0.8rem;
//           font-weight: 600;
//         }

//         .status-badge.success {
//           background: #dcfce7;
//           color: #15803d;
//         }

//         .status-badge.warning {
//           background: #fef9c3;
//           color: #854d0e;
//         }

//         .status-badge.danger {
//           background: #fee2e2;
//           color: #b91c1c;
//         }

//         .section-header .header-actions {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .search-box {
//           position: relative;
//         }

//         .search-icon {
//           position: absolute;
//           top: 50%;
//           left: 10px;
//           transform: translateY(-50%);
//           color: #6b7280;
//         }

//         .search-input {
//           padding: 0.5rem 0.75rem 0.5rem 2rem;
//           border-radius: 8px;
//           border: 1px solid #e5e7eb;
//           outline: none;
//           transition: all 0.3s ease;
//         }

//         .search-input:focus {
//           border-color: ${COLORS.accent};
//           box-shadow: 0 0 0 2px ${COLORS.lightest};
//         }

//         .filter-select {
//           padding: 0.5rem;
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           outline: none;
//           background: white;
//           color: ${COLORS.secondary};
//         }

//         .refresh-btn {
//           background: ${COLORS.primary};
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 0.5rem 0.75rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .refresh-btn:hover {
//           background: ${COLORS.accent};
//           transform: rotate(10deg);
//         }

//         .table-loading {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 2rem 0;
//         }

//         .spinner {
//           width: 36px;
//           height: 36px;
//           border: 3px solid #e5e7eb;
//           border-top-color: ${COLORS.accent};
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .empty-state {
//           text-align: center;
//           padding: 2rem 0;
//           color: ${COLORS.secondary};
//         }

//         .empty-icon {
//           color: ${COLORS.accent};
//           margin-bottom: 1rem;
//         }

//         /* ===== ANIMATIONS ===== */
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* ===== RESPONSIVE DESIGN ===== */
//         @media (max-width: 768px) {
//           .header-content {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .stats-grid {
//             grid-template-columns: 1fr;
//           }

//           .analytics-grid {
//             grid-template-columns: 1fr;
//           }

//           .activity-section {
//             padding: 1rem;
//           }

//           .action-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .header-actions {
//             flex-direction: column;
//             width: 100%;
//           }

//           .search-input {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import {
  Users, Calendar, FileText, Activity, TrendingUp, 
  TrendingDown, Download, RefreshCw, Search, Filter,
  CheckCircle, AlertCircle, Clock, BarChart3
} from "lucide-react";



// ==================== CONSTANTS ====================
const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

 const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// const API_BASE =
//   process.env.REACT_APP_API_URL ||
//   (window.location.hostname === 'localhost'
//     ? 'http://localhost:5000'
//     : 'https://lavenderblush-chinchilla-571128.hostingersite.com ');


// ==================== STAT CARD COMPONENT ====================
const StatCard = React.memo(({ icon: Icon, title, value, growth, color, loading }) => {
  const isPositive = growth >= 0;

  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon-wrapper" style={{ background: `${color}15`, color }}>
        <Icon size={28} />
      </div>
      <div className="stat-content">
        {loading ? (
          <div className="skeleton-value"></div>
        ) : (
          <>
            <div className="stat-value">{value.toLocaleString()}</div>
            <div className="stat-title">{title}</div>
            {growth !== undefined && (
              <div className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(growth)}% {isPositive ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

// ==================== ACTIVITY TABLE COMPONENT ====================
const ActivityTable = React.memo(({ activities, loading, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredActivities = useMemo(() => {
    let filtered = activities;

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(a => 
        a.user.toLowerCase().includes(term) ||
        a.action.toLowerCase().includes(term)
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(a => a.status === filter);
    }

    return filtered;
  }, [activities, search, filter]);

  const getStatusBadge = (status) => {
    const badges = {
      completed: { label: 'Completed', class: 'success', icon: CheckCircle },
      pending: { label: 'Pending', class: 'warning', icon: Clock },
      removed: { label: 'Removed', class: 'danger', icon: AlertCircle },
    };
    const badge = badges[status] || badges.completed;
    const Icon = badge.icon;

    return (
      <span className={`status-badge ${badge.class}`}>
        <Icon size={14} />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="activity-section">
      <div className="section-header">
        <h2>Recent User Activity</h2>
        <div className="header-actions">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="removed">Removed</option>
          </select>

          <button className="refresh-btn" onClick={onRefresh}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading">
            <div className="spinner"></div>
            <p>Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="empty-state">
            <Activity size={48} className="empty-icon" />
            <h3>No Activities Found</h3>
            <p>No recent activity matches your criteria</p>
          </div>
        ) : (
          <table className="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="activity-row">
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {activity.user.charAt(0)}
                      </div>
                      <span>{activity.user}</span>
                    </div>
                  </td>
                  <td>{activity.action}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{getStatusBadge(activity.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

// ==================== MAIN DASHBOARD COMPONENT ====================
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    userGrowth: 0,
    totalCourses: 0,
    coursesGrowth: 0,
    totalInstructors: 0,
    instructorGrowth: 0,
    loginActivity: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch dashboard data from API
   */
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch users
      const usersRes = await fetch(`${API}/api/users`);
      if (!usersRes.ok) throw new Error("Failed to fetch users");
      const users = await usersRes.json();

      // Fetch instructors
      const instructorsRes = await fetch(`${API}/api/instructors`);
      if (!instructorsRes.ok) throw new Error("Failed to fetch instructors");
      const instructors = await instructorsRes.json();

      // Fetch schedules to count courses
      const schedulesRes = await fetch(`${API}/api/scheduler`);
      if (!schedulesRes.ok) throw new Error("Failed to fetch schedules");
      const schedules = await schedulesRes.json();

      // Count unique courses
      const uniqueCourses = new Set(schedules.map(s => s.subject_code));

      // Calculate growth (mock data - in real app, compare with previous period)
      const userGrowth = users.length > 0 ? Math.round((users.length * 0.15)) : 0;
      const coursesGrowth = uniqueCourses.size > 0 ? Math.round((uniqueCourses.size * 0.08)) : 0;
      const instructorGrowth = instructors.length > 0 ? Math.round((instructors.length * 0.12)) : 0;

      // Count recent logins (last 24 hours) - mock data
      const loginActivity = Math.floor(users.length * 0.6);

      setStats({
        totalUsers: users.length,
        userGrowth: 15, // percentage
        totalCourses: uniqueCourses.size,
        coursesGrowth: 8, // percentage
        totalInstructors: instructors.length,
        instructorGrowth: 12, // percentage
        loginActivity: loginActivity,
      });

      // Generate activity log from recent data
      const recentActivities = [];
      
      // Add instructor activities
      instructors.slice(0, 3).forEach((inst, idx) => {
        recentActivities.push({
          id: `inst-${idx}`,
          user: inst.name,
          action: 'Updated Schedule',
          date: new Date(Date.now() - idx * 86400000).toISOString().split('T')[0],
          status: 'completed'
        });
      });

      // Add user activities
      users.slice(0, 2).forEach((user, idx) => {
        recentActivities.push({
          id: `user-${idx}`,
          user: user.name || user.email,
          action: idx === 0 ? 'Created Account' : 'Updated Profile',
          date: new Date(Date.now() - (idx + 3) * 86400000).toISOString().split('T')[0],
          status: idx === 0 ? 'completed' : 'pending'
        });
      });

      // Sort by date (newest first)
      recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

      setActivities(recentActivities.slice(0, 10));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || "Failed to load dashboard data");
      setLoading(false);
    }
  };

  /**
   * Refresh dashboard data
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  /**
   * Export report (mock implementation)
   */
  const handleExport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      stats: stats,
      activities: activities
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Initial data load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Error Alert */}
      {error && (
        <div className="error-alert">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Super Admin Dashboard</h1>
            <p>Welcome back! Here's your system overview</p>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={handleExport}>
              <Download size={18} />
              Export Report
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
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          growth={stats.userGrowth}
          color={COLORS.accent}
          loading={loading}
        />
        <StatCard
          icon={Calendar}
          title="Total Courses"
          value={stats.totalCourses}
          growth={stats.coursesGrowth}
          color={COLORS.light}
          loading={loading}
        />
        <StatCard
          icon={FileText}
          title="Total Instructors"
          value={stats.totalInstructors}
          growth={stats.instructorGrowth}
          color={COLORS.lighter}
          loading={loading}
        />
        <StatCard
          icon={Activity}
          title="Login Activity (24h)"
          value={stats.loginActivity}
          color={COLORS.secondary}
          loading={loading}
        />
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <div className="section-header">
          <h2>Analytics Overview</h2>
          <BarChart3 size={20} />
        </div>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-icon" style={{ background: `${COLORS.accent}15`, color: COLORS.accent }}>
              <TrendingUp size={24} />
            </div>
            <div className="analytics-content">
              <h4>User Growth</h4>
              <p className="analytics-value">📈 {stats.userGrowth}% increase</p>
              <p className="analytics-description">Compared to last month</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-icon" style={{ background: `${COLORS.light}15`, color: COLORS.light }}>
              <Calendar size={24} />
            </div>
            <div className="analytics-content">
              <h4>Course Activity</h4>
              <p className="analytics-value">📚 {stats.totalCourses} Active</p>
              <p className="analytics-description">{stats.coursesGrowth}% growth this semester</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-icon" style={{ background: `${COLORS.lighter}15`, color: COLORS.lighter }}>
              <Users size={24} />
            </div>
            <div className="analytics-content">
              <h4>System Health</h4>
              <p className="analytics-value status-good">✓ Stable</p>
              <p className="analytics-description">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <ActivityTable
        activities={activities}
        loading={loading}
        onRefresh={handleRefresh}
      />

      {/* Inline Styles */}
      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== ERROR ALERT ===== */
        .error-alert {
          background: #fee2e2;
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #dc2626;
          animation: slideDown 0.3s ease;
        }

        /* ===== HEADER ===== */
        .dashboard-header {
          margin-bottom: 2rem;
        }

        .header-content {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .header-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .header-content p {
          margin: 0;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: ${COLORS.primary};
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover:not(:disabled) {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        .action-btn.refresh {
          background: ${COLORS.accent};
        }

        .action-btn:disabled {
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-top: 4px solid;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .stat-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: ${COLORS.primary};
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-title {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }

        .stat-growth {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-growth.positive {
          color: #10b981;
        }

        .stat-growth.negative {
          color: #ef4444;
        }

        .skeleton-value {
          width: 120px;
          height: 40px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ===== ANALYTICS SECTION ===== */
        .analytics-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .analytics-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .analytics-card:hover {
          background: #f1f5f9;
          transform: translateY(-4px);
        }

        .analytics-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.5rem;
        }

        .analytics-content h4 {
          font-size: 1rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.25rem 0;
        }

        .analytics-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: ${COLORS.secondary};
          margin: 0 0 0.25rem 0;
        }

        .analytics-value.status-good {
          color: #10b981;
          font-weight: 700;
        }

        .analytics-description {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        /* ===== ACTIVITY TABLE ===== */
        .activity-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }

        .section-header .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .search-input {
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .search-input:focus {
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 2px ${COLORS.lightest};
        }

        .filter-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          background: white;
          color: ${COLORS.secondary};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          border-color: ${COLORS.accent};
          box-shadow: 0 0 0 2px ${COLORS.lightest};
        }

        .refresh-btn {
          background: ${COLORS.primary};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-btn:hover {
          background: ${COLORS.accent};
          transform: scale(1.05);
        }

        .table-wrapper {
          overflow-x: auto;
          margin-top: 1rem;
        }

        .activity-table {
          width: 100%;
          border-collapse: collapse;
        }

        .activity-table th,
        .activity-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .activity-table th {
          font-size: 0.875rem;
          color: ${COLORS.primary};
          font-weight: 700;
          text-transform: uppercase;
          background: #f8fafc;
          letter-spacing: 0.5px;
        }

        .activity-table td {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
        }

        .activity-row {
          transition: all 0.2s ease;
        }

        .activity-row:hover {
          background: #f8fafc;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.light} 100%);
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.success {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge.warning {
          background: #fef9c3;
          color: #854d0e;
        }

        .status-badge.danger {
          background: #fee2e2;
          color: #b91c1c;
        }

        .table-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
          gap: 1rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: ${COLORS.accent};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .table-loading p {
          color: ${COLORS.secondary};
          margin: 0;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: ${COLORS.secondary};
        }

        .empty-icon {
          color: ${COLORS.accent};
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          margin: 0;
          opacity: 0.7;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
          }

          .header-actions {
            flex-direction: column;
            width: 100%;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .analytics-section {
            padding: 1.5rem;
          }

          .activity-section {
            padding: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .section-header .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .search-input {
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .refresh-btn {
            width: 100%;
          }

          .activity-table {
            font-size: 0.875rem;
          }

          .activity-table th,
          .activity-table td {
            padding: 0.75rem 0.5rem;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .header-content h1 {
            font-size: 1.5rem;
          }

          .stat-value {
            font-size: 1.75rem;
          }

          .stat-icon-wrapper {
            width: 52px;
            height: 52px;
          }

          .analytics-card {
            flex-direction: column;
            text-align: center;
          }

          .analytics-icon {
            width: 48px;
            height: 48px;
          }

          /* Make table scrollable on very small screens */
          .table-wrapper {
            overflow-x: scroll;
          }

          .activity-table {
            min-width: 500px;
          }
        }

        /* ===== ACCESSIBILITY ===== */
        .action-btn:focus,
        .refresh-btn:focus,
        .search-input:focus,
        .filter-select:focus {
          outline: 2px solid ${COLORS.accent};
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}