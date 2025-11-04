// import React, { useState, useEffect } from 'react'; // Import useEffect
// import { useNavigate } from 'react-router-dom';
// import { 
//   auth, // Import auth
//   googleProvider, // Import googleProvider
//   signInWithEmailAndPassword,
//   signInWithPopup 
// } from '../firebase'; // Adjust the path if necessary
// import { useAuth } from '../context/AuthContext'; // Adjust the path if necessary

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { currentUser  } = useAuth();

//   useEffect(() => {
//     if (currentUser) {
//       if (currentUser.role) {
//         navigate(currentUser.role === 'admin' 
//           ? '/admin/dashboard' 
//           : '/faculty/dashboard');
//       }
//     }
//   }, [currentUser, navigate]);
  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       setError('Google sign-in failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-image">
//         <img 
//           src="/images/logo.jpg" 
//           alt="University campus with students walking between classes"
//         />
//       </div>
//       <div className="auth-form">
//         <h2>Welcome to EduSched</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
        
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email</label>
//             <input 
//               type="email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required 
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required 
//             />
//           </div>
          
//           <button type="submit" className="btn-primary">
//             Login
//           </button>
//         </form>
        
//         <div className="divider">OR</div>
        
//         <button 
//           onClick={handleGoogleLogin}
//           className="btn-google"
//         >
//           Continue with Google
//         </button>
        
//         <div className="auth-footer">
//           Don't have an account? <a href="/signup">Sign up</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
//2nd

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   auth,
//   googleProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup 
// } from '../firebase'; // Adjust path if needed
// import { useAuth } from '../context/AuthContext'; // Adjust path if needed
// import '../styles/Auth.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (currentUser && currentUser.role) {
//       navigate(
//         currentUser.role === 'admin' 
//           ? '/admin/dashboard' 
//           : '/faculty/dashboard'
//       );
//     }
//   }, [currentUser, navigate]);

//   // Handle login with email/password
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   // Handle login with Google
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       setError('Google sign-in failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-wrapper">
//         {/* Left side illustration + tagline */}
//         <div className="auth-left">
//           {/* <h1>
//             <span className="highlight">Master your time:</span> <br />
//             The <span className="highlight">Ultimate Solution</span> <br />
//             for Streamlined Academic Scheduling
//           </h1> */}
//           <img 
//             src="/images/newlogo.png"  
//             alt="EduSched Illustration" 
//             className="auth-img" 
//           />
//         </div>

//         {/* Right side login form */}
//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Welcome to EduSched</h2>
//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleLogin} className="auth-form">
//               <div className="form-group">
//                 <input 
//                   type="email" 
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required 
//                 />
//               </div>

//               <div className="form-group">
//                 <input 
//                   type="password" 
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required 
//                 />
//               </div>

//               <a href="/forgot-password" className="forgot-link">
//                 Forgot Password?
//               </a>

//               <button type="submit" className="auth-btn primary">
//                 Log In
//               </button>
//             </form>

//             <div className="divider">OR</div>

//             <button 
//               type="button" 
//               className="auth-btn google"
//               onClick={handleGoogleLogin}
//             >
//               Continue with Google
//             </button>

//             <div className="auth-footer">
//               Don’t have an account? <a href="/signup">Sign Up</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.js
// WITH GOOGLE
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   auth,
//   googleProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup
// } from '../../firebase';
// import { useAuth } from '../../context/AuthContext';
// import '../../styles/SchedulePage.css';
// import { FcGoogle } from "react-icons/fc";
// import { Modal, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState('');
// const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useAuth();

//   // Redirect after login if role is set
//   useEffect(() => {
//     if (currentUser && currentUser?.role) {
//       if (currentUser.role === 'Admin') {
//         navigate('/Admin/dashboard');
//       } else if (currentUser.role === 'instructor') {
//         navigate('/instructor/dashboard');
//       } else if (currentUser.role === 'dean') {
//         navigate('/dean/dashboard');
//       } else {
//         navigate('/');
//       }
//     }
//   }, [currentUser, navigate]);

//   // Fetch role from backend
//   const fetchUserRole = async (uid) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${uid}`);
//       if (!res.ok) return null;
//       const data = await res.json();
//       return data;
//     } catch (err) {
//       console.error("Error fetching role:", err);
//       return null;
//     }
//   };

//   // Login with email/password
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       setError('');
//       localStorage.setItem("userEmail", userCred.user.email);

//       const roleData = await fetchUserRole(userCred.user.uid);
//       if (roleData && roleData.role) {
//         setCurrentUser({ ...userCred.user, role: roleData.role });
//       } else {
//         setError("Role not found for this user.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError('Invalid email or password');
//     }
//   };

//   // Login with Google
//   const handleGoogleLogin = async () => {
//     try {
//       const userCred = await signInWithPopup(auth, googleProvider);
//       setError('');
//       const { uid, email, displayName } = userCred.user;

//       localStorage.setItem("userEmail", email);

//       // Check if user already exists in backend
//       const roleData = await fetchUserRole(uid);
//       if (roleData && roleData.role) {
//         // Existing user → just login
//         setCurrentUser({ ...userCred.user, role: roleData.role });
//       } else {
//         // New Google user → show modal to select role
//         setGoogleUser(userCred.user);
//         setShowRoleModal(true);
//       }
//     } catch (err) {
//       console.error("Google sign-in error:", err);
//       setError('Google sign-in failed');
//     }
//   };

//   // Save role for new Google users
//   const handleSaveRole = async () => {
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     try {
//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: googleUser.uid,
//           full_name: googleUser.displayName || '',
//           email: googleUser.email,
//           role: role
//         })
//       });

//       setShowRoleModal(false);
//       setCurrentUser({ ...googleUser, role });

//       // Navigate directly after selecting role
//       if (role === 'Admin') navigate('/Admin/dashboard');
//       else if (role === 'instructor') navigate('/instructor/dashboard');
//       else if (role === 'dean') navigate('/dean/dashboard');
//     } catch (err) {
//       console.error("Role save error:", err);
//       setError("Failed to save role. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         {/* Left side */}
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="auth-img" />
//         </div>

//         {/* Right side */}
//         <div className="auth-right">
//           <div className="auth-card login-card">
//             <h2 className="auth-title">Welcome to EduSched</h2>
//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleLogin} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//                {/* PASSWORD FIELD WITH TOGGLE 👇 */}
//               <div className="form-group password-group" style={{ position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "10px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     cursor: "pointer",
//                     color: "#555"
//                   }}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>


//               <a href="/forgot-password" className="forgot-link">Forgot Password?</a>

//               <button type="submit" className="auth-btn primary">
//                 Log In
//               </button>
//             </form>

//             <div className="divider">OR</div>

//             <button
//               type="button"
//               className="auth-btn google"
//               onClick={handleGoogleLogin}
//             >
//               <FcGoogle size={20} /> Continue with Google
//             </button>

//             <div className="auth-footer">
//               Don’t have an account? <a href="/signup">Sign Up</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Role Modal for Google users */}
//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please choose your role to continue.</p>
//           <select
//             className="form-select"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="dean">Dean</option>
//             <option value="instructor">Instructor</option>
//           </select>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSaveRole}>Save Role</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login;
//functional

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   auth,
//   googleProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup
// } from '../../firebase';
// import { useAuth } from '../../context/AuthContext';
// import '../../styles/Login.css';
// import { FcGoogle } from "react-icons/fc";
// import { Modal, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useAuth();

//   useEffect(() => {
//     if (currentUser && currentUser?.role) {
//       if (currentUser.role === 'Admin') navigate('/Admin/dashboard');
//       else if (currentUser.role === 'instructor') navigate('/instructor/dashboard');
//       else if (currentUser.role === 'dean') navigate('/dean/dashboard');
//       else navigate('/');
//     }
//   }, [currentUser, navigate]);

//   const fetchUserRole = async (uid) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${uid}`);
//       if (!res.ok) return null;
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching role:", err);
//       return null;
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       setError('');
//       localStorage.setItem("userEmail", userCred.user.email);


//       const roleData = await fetchUserRole(userCred.user.uid);
//       if (roleData && roleData.role) {
//         setCurrentUser({ ...userCred.user, role: roleData.role });
//       } else {
//         setError("Role not found for this user.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError('Invalid email or password');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const userCred = await signInWithPopup(auth, googleProvider);
//       setError('');
//       const { uid, email, displayName } = userCred.user;

//       localStorage.setItem("userEmail", email);

//       const roleData = await fetchUserRole(uid);
//       if (roleData && roleData.role) {
//         setCurrentUser({ ...userCred.user, role: roleData.role });
//       } else {
//         setGoogleUser(userCred.user);
//         setShowRoleModal(true);
//       }
//     } catch (err) {
//       console.error("Google sign-in error:", err);
//       setError('Google sign-in failed');
//     }
//   };

//   const handleSaveRole = async () => {
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     try {
//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: googleUser.uid,
//           full_name: googleUser.displayName || '',
//           email: googleUser.email,
//           role: role
//         })
//       });

//       setShowRoleModal(false);
//       setCurrentUser({ ...googleUser, role });

//       if (role === 'Admin') navigate('/Admin/dashboard');
//       else if (role === 'instructor') navigate('/instructor/dashboard');
//       else if (role === 'dean') navigate('/dean/dashboard');
//     } catch (err) {
//       console.error("Role save error:", err);
//       setError("Failed to save role. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container login-page" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         {/* Left Side */}
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="auth-img" />
//         </div>

//         {/* Right Side */}
//         <div className="auth-right">
//           <div className="auth-card login-card">
//             <h2 className="auth-title">Welcome to EduSched</h2>
//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleLogin} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* Password with toggle */}
//               <div className="form-group password-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <a href="/forgot-password" className="forgot-link">Forgot Password?</a>

//               <button type="submit" className="auth-btn primary">Log In</button>
//             </form>

//             <div className="divider">OR</div>

//             <button type="button" className="auth-btn google" onClick={handleGoogleLogin}>
//               <FcGoogle size={20} /> Continue with Google
//             </button>

//             <div className="auth-footer">
//               Don’t have an account? <a href="/signup">Sign Up</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Role Modal */}
//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please choose your role to continue.</p>
//           <select
//             className="form-select"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="dean">Dean</option>
//             <option value="instructor">Instructor</option>
//           </select>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSaveRole}>Save Role</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

//  export default Login;

//Functional
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   auth,
//   googleProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup
// } from '../../firebase';
// import { useAuth } from '../../context/AuthContext';
// import '../../styles/Login.css';
// import { FcGoogle } from "react-icons/fc";
// import { Modal, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useAuth();

//   useEffect(() => {
//     if (currentUser && currentUser?.role) {
//       if (currentUser.role === 'Admin') navigate('/Admin/dashboard');
//       else if (currentUser.role === 'instructor') navigate('/instructor/dashboard');
//       else if (currentUser.role === 'dean') navigate('/dean/dashboard');
//       else navigate('/');
//     }
//   }, [currentUser, navigate]);

//   const fetchUserRole = async (uid) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${uid}`);
//       if (!res.ok) return null;
//       return await res.json();
//     } catch (err) {
//       console.error("Error fetching role:", err);
//       return null;
//     }
//   };

//   const fetchInstructorId = async (fullName) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/instructors`);
//       const instructors = await res.json();
//       const match = instructors.find(i => i.name.trim().toLowerCase() === fullName.trim().toLowerCase());
//       return match ? match.id : null;
//     } catch (err) {
//       console.error("Error fetching instructors:", err);
//       return null;
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       setError('');

//       const firebaseUser = userCred.user;
//       const roleData = await fetchUserRole(firebaseUser.uid);

//       if (roleData && roleData.role) {
//         const fullName = roleData.full_name || firebaseUser.displayName || "";
//         const instructorId = await fetchInstructorId(fullName);

//         const userInfo = {
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           role: roleData.role,
//           full_name: fullName,
//           instructorId: instructorId
//         };

//         setCurrentUser(userInfo);
//         localStorage.setItem("user", JSON.stringify(userInfo));
//         console.log("✅ Logged in user:", userInfo);

//         if (userInfo.role === 'Admin') navigate('/Admin/dashboard');
//         else if (userInfo.role === 'instructor') navigate('/instructor/dashboard');
//         else if (userInfo.role === 'dean') navigate('/dean/dashboard');
//         else navigate('/');
//       } else {
//         setError("Role not found for this user.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError('Invalid email or password');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const userCred = await signInWithPopup(auth, googleProvider);
//       setError('');
//       const { uid, email, displayName } = userCred.user;

//       const roleData = await fetchUserRole(uid);
//       if (roleData && roleData.role) {
//         const instructorId = await fetchInstructorId(displayName);
//         const userInfo = {
//           uid,
//           email,
//           full_name: displayName,
//           role: roleData.role,
//           instructorId
//         };
//         setCurrentUser(userInfo);
//         localStorage.setItem("user", JSON.stringify(userInfo));
//       } else {
//         setGoogleUser(userCred.user);
//         setShowRoleModal(true);
//       }
//     } catch (err) {
//       console.error("Google sign-in error:", err);
//       setError('Google sign-in failed');
//     }
//   };

//   const handleSaveRole = async () => {
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     try {
//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: googleUser.uid,
//           full_name: googleUser.displayName || '',
//           email: googleUser.email,
//           role: role
//         })
//       });

//       const instructorId = await fetchInstructorId(googleUser.displayName || '');
//       const userInfo = {
//         uid: googleUser.uid,
//         email: googleUser.email,
//         full_name: googleUser.displayName || '',
//         role,
//         instructorId
//       };

//       setCurrentUser(userInfo);
//       localStorage.setItem("user", JSON.stringify(userInfo));

//       setShowRoleModal(false);
//       if (role === 'Admin') navigate('/Admin/dashboard');
//       else if (role === 'instructor') navigate('/instructor/dashboard');
//       else if (role === 'dean') navigate('/dean/dashboard');
//     } catch (err) {
//       console.error("Role save error:", err);
//       setError("Failed to save role. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container login-page" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="auth-img" />
//         </div>
//         <div className="auth-right">
//           <div className="auth-card login-card">
//             <h2 className="auth-title">Welcome to EduSched</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleLogin} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group password-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
//               <button type="submit" className="auth-btn primary">Log In</button>
//             </form>
//             <div className="divider">OR</div>
//             <button type="button" className="auth-btn google" onClick={handleGoogleLogin}>
//               <FcGoogle size={20} /> Continue with Google
//             </button>
//             <div className="auth-footer">
//               Don’t have an account? <a href="/signup">Sign Up</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please choose your role to continue.</p>
//           <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="dean">Dean</option>
//             <option value="instructor">Instructor</option>
//           </select>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSaveRole}>Save Role</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, 
  CheckCircle, User, X, Loader
} from 'lucide-react';



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



// ==================== AUTH INPUT COMPONENT ====================
const AuthInput = React.memo(({ 
  icon: Icon, 
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete,
  required = false
}) => {
  return (
    <div className="auth-input-group">
      <div className={`auth-input-wrapper ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <Icon size={20} className="input-icon" />
        <input
          type={type}
          className="auth-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
        />
      </div>
      {error && (
        <div className="input-error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

// ==================== PASSWORD INPUT COMPONENT ====================
const PasswordInput = React.memo(({ 
  placeholder,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-input-group">
      <div className={`auth-input-wrapper ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <Lock size={20} className="input-icon" />
        <input
          type={showPassword ? "text" : "password"}
          className="auth-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <div className="input-error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

// ==================== AUTH BUTTON COMPONENT ====================
const AuthButton = React.memo(({ 
  type = "button",
  variant = "primary",
  icon: Icon,
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = true
}) => {
  return (
    <button
      type={type}
      className={`auth-btn ${variant} ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader size={18} className="spinning" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
});

// ==================== ROLE SELECTION MODAL ====================
const RoleSelectionModal = React.memo(({ 
  show, 
  onClose, 
  onSave, 
  loading 
}) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  const roles = [
    { value: 'Admin', label: 'Administrator', description: 'Full system access' },
    { value: 'dean', label: 'Dean', description: 'Faculty management' },
    { value: 'instructor', label: 'Instructor', description: 'Teaching access' },
  ];

  const handleSave = () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }
    setError('');
    onSave(selectedRole);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content role-modal">
        <div className="modal-header">
          <h3>Select Your Role</h3>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Please select your role to access the appropriate portal
          </p>

          <div className="role-options">
            {roles.map((role) => (
              <label
                key={role.value}
                className={`role-option ${selectedRole === role.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRole === role.value}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                />
                <div className="role-content">
                  <User size={24} className="role-icon" />
                  <div className="role-info">
                    <div className="role-label">{role.label}</div>
                    <div className="role-description">{role.description}</div>
                  </div>
                  <CheckCircle size={20} className="role-check" />
                </div>
              </label>
            ))}
          </div>

          {error && (
            <div className="modal-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={16} className="spinning" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

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

// ==================== MAIN LOGIN COMPONENT ====================
export default function Login() {
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Modal State
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  /**
   * Redirect authenticated users to their dashboard
   */
  useEffect(() => {
    if (currentUser?.role) {
      redirectToDashboard(currentUser.role);
    }
  }, [currentUser, navigate]);

  /**
   * Load remembered email if exists
   */
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  /**
   * Fetch user role from backend
   */
  const fetchUserRole = async (uid) => {
    try {
      const res = await fetch(`${API}/api/users/${uid}`);

      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("Error fetching role:", err);
      return null;
    }
  };

  /**
   * Fetch instructor ID by full name
   */
  const fetchInstructorId = async (fullName) => {
    try {
      const res = await fetch(`${API}/api/instructors`);
      const instructors = await res.json();
      const match = instructors.find(i => 
        i.name.trim().toLowerCase() === fullName.trim().toLowerCase()
      );
      return match ? match.id : null;
    } catch (err) {
      console.error("Error fetching instructors:", err);
      return null;
    }
  };

  /**
   * Redirect user based on role
   */
  const redirectToDashboard = useCallback((role) => {
    const routes = {
      'admin': '/admin/dashboard',
      'dean': '/dean/dashboard',
      'instructor': '/instructor/dashboard'
    };
    navigate(routes[role] || '/', { replace: true });
  }, [navigate]);

  /**
   * Validate email format
   */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * Handle email/password login
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate inputs
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;
      
      // Fetch role from backend
      const roleData = await fetchUserRole(firebaseUser.uid);

      if (roleData?.role) {
        const fullName = roleData.full_name || firebaseUser.displayName || "";
        const instructorId = await fetchInstructorId(fullName);

        const userInfo = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: fullName,
          photoURL: firebaseUser.photoURL,
          role: roleData.role,
          full_name: fullName,
          instructorId
        };

        setCurrentUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        showToast('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
          redirectToDashboard(userInfo.role);
        }, 1000);
      } else {
        setErrors({ general: 'Role not found for this user' });
      }
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = 'Invalid email or password';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Google OAuth login
   */
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const { uid, email, displayName, photoURL } = userCred.user;

      // Check if user has a role
      const roleData = await fetchUserRole(uid);
      
      if (roleData?.role) {
        // User exists with role
        const instructorId = await fetchInstructorId(displayName || '');
        const userInfo = {
          uid,
          email,
          displayName: displayName || '',
          photoURL,
          role: roleData.role,
          full_name: displayName || '',
          instructorId
        };
        
        setCurrentUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          redirectToDashboard(userInfo.role);
        }, 1000);
      } else {
        // New user - show role selection
        setGoogleUser(userCred.user);
        setShowRoleModal(true);
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      
      let errorMessage = 'Google sign-in failed';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups for this site';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setGoogleLoading(false);
    }
  };

  /**
   * Handle role selection for Google users
   */
  const handleSaveRole = async (selectedRole) => {
    if (!selectedRole || !googleUser) return;

    setRoleLoading(true);

    try {
      // Save user role to backend
      const response = await fetch(`${API}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: googleUser.uid,
          full_name: googleUser.displayName || '',
          email: googleUser.email,
          role: selectedRole
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save role');
      }

      const instructorId = await fetchInstructorId(googleUser.displayName || '');
      
      const userInfo = {
        uid: googleUser.uid,
        email: googleUser.email,
        displayName: googleUser.displayName || '',
        photoURL: googleUser.photoURL,
        role: selectedRole,
        full_name: googleUser.displayName || '',
        instructorId
      };

      setCurrentUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      setShowRoleModal(false);
      showToast('Role saved successfully! Redirecting...', 'success');
      
      setTimeout(() => {
        redirectToDashboard(selectedRole);
      }, 1000);
    } catch (err) {
      console.error("Role save error:", err);
      setErrors({ general: 'Failed to save role. Please try again.' });
    } finally {
      setRoleLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  return (
    <div className="login-page">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Background */}
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-left">
          <div className="brand-section">
            <img 
              src="/images/trylogo.png" 
              alt="EduSched Logo" 
              className="brand-logo"
            />
            <h1 className="brand-title">EduSched</h1>
            <p className="brand-tagline">
              Smart Academic Scheduling System
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Automated Scheduling</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Quick Scheduling</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Multi-role Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-card">
            <div className="card-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your dashboard</p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="alert-error">
                <AlertCircle size={20} />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="login-form">
              <AuthInput
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={loading || googleLoading}
                autoComplete="email"
                required
              />

              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={loading || googleLoading}
              />

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading || googleLoading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <AuthButton
                type="submit"
                variant="primary"
                icon={LogIn}
                loading={loading}
                disabled={googleLoading}
              >
                Sign In
              </AuthButton>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Sign In */}
            <AuthButton
              variant="google"
              onClick={handleGoogleLogin}
              loading={googleLoading}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </AuthButton>

            {/* Footer */}
            <div className="card-footer">
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        show={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSave={handleSaveRole}
        loading={roleLoading}
      />

      {/* Inline Styles */}
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== BACKGROUND ===== */
        .login-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 50%, ${COLORS.light} 100%);
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: url('/images/bg.jpg') center/cover;
          opacity: 0.1;
        }

        /* ===== CONTAINER ===== */
        .login-container {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          z-index: 1;
        }

        /* ===== LEFT SIDE - BRANDING ===== */
        .login-left {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: white;
          animation: slideInLeft 0.6s ease;
        }

        .brand-section {
          max-width: 500px;
          text-align: center;
        }

        .brand-logo {
          width: 120px;
          height: 120px;
          margin-bottom: 2rem;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .brand-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          letter-spacing: -1px;
        }

        .brand-tagline {
          font-size: 1.25rem;
          opacity: 0.9;
          margin: 0 0 3rem 0;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          opacity: 0.95;
        }

        /* ===== RIGHT SIDE - FORM ===== */
        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: slideInRight 0.6s ease;
        }

        .login-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.5rem 0;
        }

        .card-header p {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        /* ===== FORM ===== */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .auth-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          border: 2px solid ${COLORS.lightest};
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .auth-input-wrapper:focus-within {
          border-color: ${COLORS.light};
          box-shadow: 0 0 0 4px rgba(0, 180, 216, 0.1);
        }

        .auth-input-wrapper.error {
          border-color: #ef4444;
        }

        .auth-input-wrapper.disabled {
          background: #f5f5f5;
          opacity: 0.7;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .auth-input {
          flex: 1;
          padding: 1rem 1rem 1rem 3.25rem;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: ${COLORS.primary};
        }

        .auth-input:focus {
          outline: none;
        }

        .auth-input::placeholder {
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: ${COLORS.secondary};
          opacity: 0.5;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }

        .password-toggle:hover {
          opacity: 1;
        }

        .input-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          font-size: 0.85rem;
          animation: slideDown 0.3s ease;
        }

        .alert-error {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #fee;
          color: #c33;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease;
        }

        /* ===== FORM OPTIONS ===== */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: ${COLORS.secondary};
        }

        .remember-me input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .forgot-link {
          font-size: 0.9rem;
          color: ${COLORS.accent};
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: ${COLORS.light};
        }

        /* ===== BUTTONS ===== */
        .auth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-btn.full-width {
          width: 100%;
        }

        .auth-btn.primary {
          background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.light});
color: white;
}    .auth-btn.primary:hover {
      filter: brightness(1.1);
    }

    .auth-btn.google {
      background: white;
      border: 2px solid ${COLORS.lightest};
      color: ${COLORS.primary};
    }

    .auth-btn.google:hover {
      background: ${COLORS.lightest};
    }

    .auth-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* ===== DIVIDER ===== */
    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 1.5rem 0;
      width: 100%;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${COLORS.lightest};
    }

    .divider span {
      padding: 0 1rem;
      color: ${COLORS.secondary};
      font-weight: 500;
      font-size: 0.9rem;
      white-space: nowrap;
    }
    /* ===== FOOTER ===== */
    .card-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: ${COLORS.secondary};
    }

    .card-footer a {
      color: ${COLORS.accent};
      font-weight: 600;
      text-decoration: none;
    }

    .card-footer a:hover {
      color: ${COLORS.light};
    }

    /* ===== MODAL ===== */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      max-width: 480px;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: ${COLORS.primary};
    }

    .modal-close {
      background: none;
      border: none;
      cursor: pointer;
      color: ${COLORS.secondary};
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .role-options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .role-option {
      display: flex;
      align-items: center;
      border: 2px solid ${COLORS.lightest};
      border-radius: 12px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .role-option.selected {
      border-color: ${COLORS.accent};
      background: ${COLORS.lightest};
    }

    .role-option input[type="radio"] {
      display: none;
    }

    .role-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .role-label {
      font-weight: 600;
      color: ${COLORS.primary};
    }

    .role-description {
      font-size: 0.85rem;
      color: ${COLORS.secondary};
    }

    .role-check {
      opacity: 0;
    }

    .role-option.selected .role-check {
      opacity: 1;
      color: ${COLORS.accent};
    }

    .modal-error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ef4444;
      font-size: 0.85rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-primary {
      background: ${COLORS.accent};
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f0f0f0;
      color: ${COLORS.primary};
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
    }

    .btn-secondary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    /* ===== TOAST ===== */
    .toast-notification {
      position: fixed;
      top: 2rem;
      right: 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.4s ease;
    }

    .toast-notification.success {
      border-left: 4px solid #34A853;
    }

    .toast-notification.error {
      border-left: 4px solid #EA4335;
    }

    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      color: ${COLORS.secondary};
    }

    @keyframes slideIn {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInLeft {
      from { transform: translateX(-50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInRight {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .login-container {
        grid-template-columns: 1fr;
      }

      .login-left {
        display: none;
      }

      .login-right {
        padding: 3rem 1.5rem;
      }
    }
  `}</style>
</div>
);
}