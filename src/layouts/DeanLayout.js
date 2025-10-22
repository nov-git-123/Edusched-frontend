// import React, { useMemo } from "react";
// import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/DeanLayout.css"; // create in Step 2
// import { useAuth } from "../context/AuthContext";

// const DeanLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Simple title based on route
//   const title = useMemo(() => {
//     const map = {
//       "/dean/dashboard": "Dashboard",
//       "/dean/instructors": "Instructors",
//       "/dean/courses": "Courses",
//       "/dean/rooms": "Rooms",
//       "/dean/reports": "Reports",
//       "/dean/profile": "Profile / Settings",
//     };
//     return map[location.pathname] || "Dean";
//   }, [location.pathname]);

  

//   const { logout } = useAuth();

// const handleLogout = async () => {
//   try {
//     await logout(); // ✅ calls signOut(auth)
//     navigate("/login", { replace: true });
//   } catch (err) {
//     console.error("Logout failed:", err);
//   }
// };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div         className="text-white p-3"
//          style={{ width: "250px", minHeight: "100vh", backgroundColor: "#48CAE4" }}
//        >
//         <div className="logo">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="img-fluid mx-auto d-block" 
//     style={{ maxWidth: "150px", height: "auto" }}  />
//         </div>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2">
//             <NavLink end to="/dean/dashboard" className="nav-link">
//               📊 Dashboard
//             </NavLink>
//           </li>
//           <li className="nav-item mb-2">
//             <NavLink to="/dean/instructors" className="nav-link">
//               👨‍🏫 Instructors
//             </NavLink>
//           </li>
//           <li className="nav-item mb-2">
//             <NavLink to="/dean/courses" className="nav-link">
//               📚 Courses
//             </NavLink>
//           </li>
//           <li className="nav-item mb-2">
//             <NavLink to="/dean/rooms" className="nav-link">
//               🏫 Rooms
//             </NavLink>
//           </li>
//           <li className="nav-item mb-2">
//             <NavLink to="/dean/reports" className="nav-link">
//               📑 Reports
//             </NavLink>
//           </li>
//           <li className="nav-item mb-2">
//             <NavLink to="/dean/profile" className="nav-link">
//               ⚙ Profile / Settings
//             </NavLink>
//           </li>
//           <li className="nav-item mt-2">
//             <button onClick={handleLogout} className="btn btn-outline-light w-100">
//               🚪 Logout
//             </button>
//           </li>
//         </ul>
//       {/* </aside> */}
//       </div>

//       {/* Right side */}
//       <main className="dean-main flex-grow-1 bg-light">
//         {/* Topbar */}
//         <nav className="dean-topbar shadow-sm px-4 d-flex justify-content-between align-items-center">
//           <span className="navbar-brand fw-semibold m-0">{title}</span>
//           <div className="d-flex align-items-center">
//             <span className="me-3 fw-bold dean-topbar-name">Dean John Doe</span>
//             <img
//               src="/images/dean-avatar.png"
//               alt="Profile"
//               className="rounded-circle border border-2"
//               width="40"
//               height="40"
//             />
//           </div>
//         </nav>

//         {/* Page content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DeanLayout;

//FUNCTIONAL

// import React, { useMemo } from "react";
// import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/DeanLayout.css";
// import { useAuth } from "../context/AuthContext";

// // ✅ Import modern icons (you can swap with others from react-icons)
// import { FaTachometerAlt, FaChalkboardTeacher, FaBook, FaDoorOpen } from "react-icons/fa";
// import { MdMeetingRoom, MdSettings, MdAssessment } from "react-icons/md";

// const DeanLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentUser, logout } = useAuth();
  

//   const title = useMemo(() => {
//     const map = {
//       "/dean/dashboard": "Dashboard",
//       "/dean/instructors": "Instructors",
//       "/dean/courses": "Courses",
//       "/dean/rooms": "Rooms",
//       "/dean/reports": "Reports",
//       "/dean/lists": "Lists",
//       "/dean/availability": "Availability",
//       "/dean/profile": "Profile / Settings",
      
      
//     };
//     return map[location.pathname] || "Dean";
//   }, [location.pathname]);

  

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//   <div className="dean-layout">
//     {/* Sidebar */}
//     <aside className="sidebar-custom">
//       {/* Logo */}
// <div className="logo-container text-center mb-4">
//   <img
//     src="/images/trylogo.png"
//     alt="EduSched Logo"
//     className="logo-img"
//   />
  
// </div>

//       {/* Nav Links */}
//       <ul className="nav flex-column flex-grow-1">
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/dashboard" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <FaTachometerAlt /> Dashboard
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/instructors" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <FaChalkboardTeacher /> Instructors
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/courses" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <FaBook /> Courses
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/rooms" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <MdMeetingRoom /> Rooms
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/reports" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <MdAssessment /> Schedule
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/lists" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <MdAssessment /> Lists
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/availability" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <MdSettings /> Instructor Availability
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink end to="/dean/profile" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>
//             <MdSettings /> Profile / Settings
//           </NavLink>
//         </li>
//       </ul>

//       {/* Logout */}
//       <div className="mt-auto">
//         <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
//           <FaDoorOpen /> Logout
//         </button>
//       </div>
//     </aside>

//     {/* Main Content */}
//     <main className="dean-main">
//       {/* Topbar */}
//       <nav className="dean-topbar shadow-sm px-4 d-flex justify-content-between align-items-center bg-white">
//         <span className="navbar-brand fw-semibold m-0">{title}</span>
//         <div className="d-flex align-items-center">
//           <span className="me-3 fw-bold">{currentUser?.displayName || "Dean"}</span>
//           <img
//             src="/images/dean-avatar.png"
//             alt="Profile"
//             className="rounded-circle border border-2"
//             width="40"
//             height="40"
//           />
//         </div>
//       </nav>

//       {/* Page Content */}
//       <div className="p-4">
//         <Outlet />
//       </div>
//     </main>
//   </div>
// )
// };

// export default DeanLayout;

import React, { useState, useMemo, useCallback } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Users, BookOpen, Building, Calendar,
  List, Clock, Settings, LogOut, Menu, X, ChevronRight,
  Search, Bell, User, ChevronDown
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

/**
 * Navigation menu configuration
 * Centralized menu items for easy maintenance
 */
const MENU_ITEMS = [
  {
    id: "dashboard",
    path: "/dean/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    badge: null,
  },
  {
    id: "instructors",
    path: "/dean/instructors",
    icon: Users,
    label: "Instructors",
    badge: null,
  },
  {
    id: "courses",
    path: "/dean/courses",
    icon: BookOpen,
    label: "Courses",
    badge: null,
  },
  {
    id: "rooms",
    path: "/dean/rooms",
    icon: Building,
    label: "Rooms",
    badge: null,
  },
  {
    id: "reports",
    path: "/dean/reports",
    icon: Calendar,
    label: "Schedule",
    badge: null,
  },
  {
    id: "lists",
    path: "/dean/lists",
    icon: List,
    label: "Lists",
    badge: null,
  },
  {
    id: "availability",
    path: "/dean/availability",
    icon: Clock,
    label: "Availability",
    badge: 2,
  },
  {
    id: "profile",
    path: "/dean/profile",
    icon: Settings,
    label: "Profile",
    badge: null,
  },
];

// ==================== SIDEBAR ITEM COMPONENT ====================
const SidebarItem = React.memo(({ item, isCollapsed, onClick }) => {
  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="sidebar-link-content">
        <item.icon size={20} className="sidebar-icon" />
        {!isCollapsed && (
          <>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </>
        )}
      </div>
      {!isCollapsed && (
        <ChevronRight size={16} className="sidebar-arrow" />
      )}
    </NavLink>
  );
});

// ==================== SIDEBAR COMPONENT ====================
const Sidebar = React.memo(({ isCollapsed, onToggle, onItemClick }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            src="/images/trylogo.png"
            alt="EduSched"
            className="logo-img"
          />
          {!isCollapsed && (
            <div className="logo-text">
              <h2>EduSched</h2>
              <p>Dean Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {MENU_ITEMS.map((item) => (
            <li key={item.id} className="nav-item">
              <SidebarItem 
                item={item} 
                isCollapsed={isCollapsed}
                onClick={onItemClick}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="divider"></div>
        {!isCollapsed && (
          <div className="sidebar-info">
            <p>Version 1.0.0</p>
            <p>© 2025 EduSched</p>
          </div>
        )}
      </div>
    </aside>
  );
});

// ==================== USER DROPDOWN COMPONENT ====================
const UserDropdown = React.memo(({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/dean/profile");
  };

  return (
    <div className="user-dropdown-container">
      <button
        className="user-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={user?.photoURL || "/images/dean-logo.png"}
          alt="Profile"
          className="user-avatar"
        />
        <div className="user-info">
          <span className="user-name">{user?.displayName || "Dean"}</span>
          <span className="user-role">Administrator</span>
        </div>
        <ChevronDown size={16} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="user-dropdown-menu">
            <button className="dropdown-item" onClick={handleProfileClick}>
              <User size={16} />
              <span>My Profile</span>
            </button>
            <button className="dropdown-item" onClick={handleProfileClick}>
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout" onClick={onLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
});

// ==================== BREADCRUMB COMPONENT ====================
const Breadcrumb = React.memo(({ pathname }) => {
  const crumbs = useMemo(() => {
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      isLast: index === paths.length - 1
    }));
  }, [pathname]);

  return (
    <div className="breadcrumb">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <span className={crumb.isLast ? 'crumb active' : 'crumb'}>
            {crumb.label}
          </span>
          {!crumb.isLast && <ChevronRight size={14} className="separator" />}
        </React.Fragment>
      ))}
    </div>
  );
});

// ==================== TOPBAR COMPONENT ====================
const Topbar = React.memo(({ 
  title, 
  user, 
  onLogout, 
  onMenuToggle, 
  isMobile 
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <nav className="topbar">
      <div className="topbar-left">
        {isMobile && (
          <button className="menu-toggle" onClick={onMenuToggle}>
            <Menu size={24} />
          </button>
        )}
        <div className="topbar-title-section">
          <h1 className="topbar-title">{title}</h1>
          <Breadcrumb pathname={location.pathname} />
        </div>
      </div>

      <div className="topbar-right">
        {/* Search Bar */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <button 
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={20} />
          </button>
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          )}
        </div>

        {/* Notifications */}
        <button className="icon-button notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        {/* User Dropdown */}
        <UserDropdown user={user} onLogout={onLogout} />
      </div>
    </nav>
  );
});

// ==================== MAIN LAYOUT COMPONENT ====================
export default function DeanLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // State Management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  /**
   * Dynamic page title based on current route
   */
  const pageTitle = useMemo(() => {
    const titleMap = {
      "/dean/dashboard": "Dashboard Overview",
      "/dean/instructors": "Instructor Management",
      "/dean/courses": "Course Management",
      "/dean/rooms": "Room Management",
      "/dean/reports": "Schedule Reports",
      "/dean/lists": "Schedule Lists",
      "/dean/availability": "Instructor Availability",
      "/dean/profile": "Profile Settings",
    };
    return titleMap[location.pathname] || "Dean Portal";
  }, [location.pathname]);

  /**
   * Handle window resize for responsive behavior
   */
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handle logout with error handling
   */
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  }, [logout, navigate]);

  /**
   * Toggle sidebar collapse on desktop
   */
  const handleSidebarToggle = useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  }, [isMobile, mobileSidebarOpen, sidebarCollapsed]);

  /**
   * Close mobile sidebar when clicking menu item
   */
  const handleMenuItemClick = useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="dean-layout">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isMobile ? false : sidebarCollapsed}
        onToggle={handleSidebarToggle}
        onItemClick={handleMenuItemClick}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileSidebarOpen && (
        <>
          <div 
            className="sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="mobile-sidebar">
            <div className="mobile-sidebar-header">
              <img src="/images/trylogo.png" alt="EduSched" className="logo" />
              <button 
                className="close-btn"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="mobile-nav">
              {MENU_ITEMS.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isCollapsed={false}
                  onClick={handleMenuItemClick}
                />
              ))}
            </nav>
            <div className="mobile-sidebar-footer">
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className={`main-content ${sidebarCollapsed && !isMobile ? 'expanded' : ''}`}>
        {/* Topbar */}
        <Topbar
          title={pageTitle}
          user={currentUser}
          onLogout={handleLogout}
          onMenuToggle={handleSidebarToggle}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      {/* Sidebar Toggle Button (Desktop) */}
      {!isMobile && (
        <button
          className="sidebar-toggle-btn"
          onClick={handleSidebarToggle}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <X size={20} />}
        </button>
      )}

      {/* Inline Styles */}
      <style jsx>{`
        .dean-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-img {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: contain;
          background: white;
          padding: 0.5rem;
        }

        .logo-text h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .logo-text p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 0;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin: 0.35rem 0.75rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .sidebar-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 60%;
          background: ${COLORS.lighter};
          border-radius: 0 4px 4px 0;
        }

        .sidebar-link-content {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          flex: 1;
        }

        .sidebar-icon {
          flex-shrink: 0;
        }

        .sidebar-label {
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .sidebar-badge {
          margin-left: auto;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .sidebar-arrow {
          opacity: 0;
          transition: all 0.3s ease;
        }

        .sidebar-link:hover .sidebar-arrow,
        .sidebar-link.active .sidebar-arrow {
          opacity: 0.6;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 1rem 0;
        }

        .sidebar-info {
          text-align: center;
          opacity: 0.6;
          font-size: 0.8rem;
        }

        .sidebar-info p {
          margin: 0.25rem 0;
        }

        /* ===== MOBILE SIDEBAR ===== */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        .mobile-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 280px;
          background: linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%);
          color: white;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          animation: slideInLeft 0.3s ease;
        }

        .mobile-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-sidebar-header .logo {
          width: 40px;
          height: 40px;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-nav {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
        }

        .mobile-sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem;
          background: rgba(239, 68, 68, 0.2);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        /* ===== MAIN CONTENT ===== */
        .main-content {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-content.expanded {
          margin-left: 80px;
        }

        /* ===== TOPBAR ===== */
        .topbar {
          background: white;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: ${COLORS.primary};
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .topbar-title-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .topbar-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .crumb {
          color: ${COLORS.secondary};
          opacity: 0.6;
          text-transform: capitalize;
        }

        .crumb.active {
          color: ${COLORS.accent};
          opacity: 1;
          font-weight: 600;
        }

        .separator {
          opacity: 0.4;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* ===== SEARCH ===== */
        .search-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .search-toggle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.lightest};
          border: none;
          border-radius: 10px;
          color: ${COLORS.primary};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-toggle:hover {
          background: ${COLORS.lighter};
        }

        .search-input {
          padding: 0.5rem 1rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 10px;
          font-size: 0.9rem;
          width: 200px;
          animation: slideInRight 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${COLORS.light};
        }

        /* ===== NOTIFICATIONS ===== */
        .icon-button {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.lightest};
          border: none;
          border-radius: 10px;
          color: ${COLORS.primary};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .icon-button:hover {
          background: ${COLORS.lighter};
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ===== USER DROPDOWN ===== */
        .user-dropdown-container {
          position: relative;
        }

        .user-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: ${COLORS.lightest};
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-dropdown-trigger:hover {
          background: ${COLORS.lighter};
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${COLORS.light};
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .user-role {
          font-size: 0.75rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .dropdown-icon {
          transition: transform 0.3s ease;
          color: ${COLORS.secondary};
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .dropdown-overlay {
          position: fixed;
          inset: 0;
          z-index: 998;
        }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          min-width: 200px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 999;
          animation: fadeInDown 0.2s ease;
          overflow: hidden;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s ease;
          color: ${COLORS.secondary};
        }

        .dropdown-item:hover {
          background: ${COLORS.lightest};
        }

        .dropdown-item.logout {
          color: #ef4444;
        }

        .dropdown-item.logout:hover {
          background: #fee;
        }

        .dropdown-divider {
          height: 1px;
          background: ${COLORS.lightest};
          margin: 0.5rem 0;
        }

        /* ===== PAGE CONTENT ===== */
        .page-content {
          flex: 1;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        /* ===== SIDEBAR TOGGLE BUTTON ===== */
        .sidebar-toggle-btn {
          position: fixed;
          left: 280px;
          top: 80px;
          width: 32px;
          height: 32px;
          background: white;
          border: 2px solid ${COLORS.lightest};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 999;
          color: ${COLORS.primary};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .main-content.expanded ~ .sidebar-toggle-btn {
          left: 80px;
        }

        .sidebar-toggle-btn:hover {
          background: ${COLORS.lightest};
          transform: scale(1.1);
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
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

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .main-content {
            margin-left: 0;
          }

          .sidebar-toggle-btn {
            display: none;
          }

          .topbar {
            padding: 0 1rem;
          }

          .topbar-title {
            font-size: 1.25rem;
          }

          .breadcrumb {
            display: none;
          }

          .user-info {
            display: none;
          }

          .page-content {
            padding: 1rem;
          }

          .search-input {
            width: 150px;
          }
        }

        @media (max-width: 480px) {
          .topbar {
            padding: 0 0.75rem;
          }

          .topbar-title {
            font-size: 1.1rem;
          }

          .search-container.active .search-toggle {
            display: none;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
          }
        }

        /* ===== SCROLLBAR STYLING ===== */
        .sidebar-nav::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* ===== ACCESSIBILITY ===== */
        .sidebar-link:focus-visible,
        .menu-toggle:focus-visible,
        .search-toggle:focus-visible,
        .icon-button:focus-visible,
        .user-dropdown-trigger:focus-visible,
        .dropdown-item:focus-visible,
        .sidebar-toggle-btn:focus-visible {
          outline: 3px solid ${COLORS.light};
          outline-offset: 2px;
        }

        /* Keyboard navigation improvements */
        .nav-list:focus-within .sidebar-link:focus {
          background: rgba(255, 255, 255, 0.15);
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .sidebar {
            border-right: 2px solid white;
          }

          .sidebar-link {
            border: 1px solid transparent;
          }

          .sidebar-link.active {
            border-color: white;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ===== PRINT STYLES ===== */
        @media print {
          .sidebar,
          .topbar,
          .sidebar-toggle-btn {
            display: none;
          }

          .main-content {
            margin-left: 0;
          }

          .page-content {
            padding: 0;
          }
        }

        /* ===== DARK MODE SUPPORT (Future Enhancement) ===== */
        @media (prefers-color-scheme: dark) {
          .dean-layout {
            background: #1a1a2e;
          }

          .topbar {
            background: #16213e;
            color: #e0e0e0;
          }

          .topbar-title {
            color: #e0e0e0;
          }

          .user-dropdown-trigger,
          .search-toggle,
          .icon-button {
            background: #0f3460;
            color: #e0e0e0;
          }

          .user-dropdown-menu {
            background: #16213e;
          }

          .dropdown-item {
            color: #e0e0e0;
          }

          .dropdown-item:hover {
            background: #0f3460;
          }
        }
      `}</style>
    </div>
  );
}