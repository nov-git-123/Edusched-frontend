// // import React, { useState } from 'react';
// // import { auth } from '../firebase';
// // import { createUserWithEmailAndPassword } from 'firebase/auth';

// // const Signup = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');

// //     const handleSignup = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await createUserWithEmailAndPassword(auth, email, password);
// //             // Redirect or show success message
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     return (
// //         <div className="signup-container">
// //             <h2>Signup</h2>
// //             <form onSubmit={handleSignup}>
// //                 <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
// //                 <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
// //                 <button type="submit">Signup</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Signup;

// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const Signup = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             await createUserWithEmailAndPassword(auth, email, password);
//             alert("Signup successful! You can now log in.");
//         } catch (err) {
//             setError("Signup failed. Please try again.");
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-image">
//                 <img 
//                     src="https://placehold.co/600x400" 
//                     alt="Students studying in a library"
//                 />
//             </div>

//             <div className="auth-form">
//                 <h2>Create Your Account</h2>
//                 {error && <div className="alert alert-danger">{error}</div>}

//                 <form onSubmit={handleSignup}>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input 
//                             type="email" 
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required 
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Password</label>
//                         <input 
//                             type="password" 
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required 
//                         />
//                     </div>

//                     <button type="submit" className="btn-primary">
//                         Sign Up
//                     </button>
//                 </form>

//                 <div className="auth-footer">
//                     Already have an account? <a href="/login">Login</a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;

// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import '../styles/Auth.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       setSuccess("Signup successful! You can now log in.");
//       setEmail('');
//       setPassword('');
//     } catch (err) {
//       setError("Signup failed. Please try again.");
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-wrapper">
        
//         {/* Left side: only logo */}
//         <div className="auth-left">
//           <img 
//             src="/images/newlogo.png" 
//             alt="EduSched Logo" 
//             className="auth-img" 
//           />
//         </div>

//         {/* Right side: signup form */}
//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Sign Up</h2>

//             {/* Error or success messages */}
//             {error && <div className="alert error">{error}</div>}
//             {success && <div className="alert success">{success}</div>}

//             <form onSubmit={handleSignup} className="auth-form">
//             <div className="form-group">
//               <input 
//                 type="email" 
//                 placeholder="Email Address" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//               />
//               </div>

//               <div className="form-group">
//               <input 
//                 type="password" 
//                 placeholder="Password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//               />
//               </div>

//               <button type="submit" className="auth-btn primary">Sign Up</button>
              
//               <p className="divider">or sign up with</p>
//               <button type="button" className="auth-btn google">G</button>

//               <p className="auth-text">
//                 Already have an account? <a href="/login">Login</a>
//               </p>
//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase'; 
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import '../styles/Auth.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('instructor'); // default role
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // 1. Create user in Firebase
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // 2. Save user info & role in backend (MySQL)
//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: user.uid,
//           email: user.email,
//           role: role
//         })
//       });

//       // 3. Redirect user to login page after signup
//       navigate('/login');

//     } catch (err) {
//       console.error('Signup error:', err);
//       setError(err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Sign Up</h2>
//         {error && <p className="error">{error}</p>}

//         <form onSubmit={handleSignup}>
//           {/* Email */}
//           <div className="form-group">
//             <label>Email</label>
//             <input 
//               type="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>

//           {/* Role */}
//           <div className="form-group">
//             <label>Role</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="admin">Admin</option>
//               <option value="dean">Dean</option>
//               <option value="instructor">Instructor</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button type="submit" disabled={loading}>
//             {loading ? 'Signing up...' : 'Sign Up'}
//           </button>
//         </form>

//         <p>
//           Already have an account? <a href="/login">Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//FUNCTIONAL

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, googleProvider } from '../../firebase';
// import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import '../../styles/Signup.css';
// import { FcGoogle } from "react-icons/fc";
// import { Modal, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');  // For password error messages

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState('');

//   const navigate = useNavigate();

//   // Password validation function
//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (password.length < minLength) {
//       return 'Password must be at least 8 characters.';
//     }
//     if (!hasUpperCase) {
//       return 'Password must contain at least one uppercase letter.';
//     }
//     if (!hasLowerCase) {
//       return 'Password must contain at least one lowercase letter.';
//     }
//     if (!hasNumbers) {
//       return 'Password must contain at least one number.';
//     }
//     if (!hasSpecialChar) {
//       return 'Password must contain at least one special character.';
//     }
//     return '';  // No errors
//   };

//   // Email/password signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     // Validate password
//     const passwordValidationError = validatePassword(password);
//     if (passwordValidationError) {
//       setPasswordError(passwordValidationError);
//       setLoading(false);
//       return;
//     }
//     setPasswordError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       localStorage.setItem("userEmail", user.email);

//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: user.uid,
//           full_name: fullName,
//           email: user.email,
//           role: "instructor" // default role
//         })
//       });

//       setSuccess("Signup successful! You can now log in.");
//       navigate('/login');
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError("Signup failed. Please try again.");
//     }

//     setLoading(false);
//   };

//   // Google signup - step 1: authenticate
//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       setGoogleUser(result.user);
//       setShowRoleModal(true); // show modal after Google login
//     } catch (err) {
//       console.error('Google signup error:', err);
//       setError("Google signup failed. Please try again.");
//     }
//   };

//   // Google signup - step 2: save role
//   const handleSaveRole = async () => {
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     try {
//       localStorage.setItem("userEmail", googleUser.email);

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
//       navigate('/login');
//     } catch (err) {
//       console.error('Role save error:', err);
//       setError("Failed to save role. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container signup-page" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="auth-img" />
//         </div>
//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Sign Up</h2>

//             {error && <div className="alert error">{error}</div>}
//             {success && <div className="alert success">{success}</div>}
//             {passwordError && <div className="alert alert-danger">{passwordError}</div>}

//             <form onSubmit={handleSignup} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* PASSWORD FIELD WITH TOGGLE 👇 */}
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

// {/* ✅ Select Role */}
//               <div className="form-group">
//                 <select
//                   className="form-select"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Role</option>
//                   <option value="admin">Admin</option>
//                   <option value="dean">Dean</option>
//                   <option value="instructor">Instructor</option>
//                 </select>
//               </div>
      
           

//               <button type="submit" className="auth-btn primary" disabled={loading}>
//                 {loading ? 'Signing up...' : 'Sign Up'}
//               </button>

//               <p className="divider">or sign up with</p>
//               <button type="button" onClick={handleGoogleSignup} className="auth-btn google">
//                 <FcGoogle size={20} /> Sign up with Google
//               </button>

//               <p className="auth-footer">Already have an account? <a href="/login">Login</a></p>
//             </form>
//           </div>
//         </div>
//       </div>

      
//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please choose your role to complete signup.</p>
//           <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
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

// export default Signup;

//Functional
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, googleProvider } from '../../firebase';
// import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import '../../styles/Signup.css';
// import { FcGoogle } from "react-icons/fc";
// import { Modal, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState('');
//   const [deanExists, setDeanExists] = useState(false);

//   const navigate = useNavigate();

//   // ✅ Fetch users to check if a dean already exists
//   useEffect(() => {
//     const checkDean = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/users');
//         const data = await res.json();
//         const deanFound = data.some(user => user.role === 'dean');
//         setDeanExists(deanFound);
//       } catch (err) {
//         console.error("Error checking dean:", err);
//       }
//     };
//     checkDean();
//   }, []);

//   // ✅ Password validation
//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (password.length < minLength) return 'Password must be at least 8 characters.';
//     if (!hasUpperCase) return 'Password must contain at least one uppercase letter.';
//     if (!hasLowerCase) return 'Password must contain at least one lowercase letter.';
//     if (!hasNumbers) return 'Password must contain at least one number.';
//     if (!hasSpecialChar) return 'Password must contain at least one special character.';
//     return '';
//   };

//   // ✅ Handle email signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     // Validate password
//     const passwordValidationError = validatePassword(password);
//     if (passwordValidationError) {
//       setPasswordError(passwordValidationError);
//       setLoading(false);
//       return;
//     }
//     setPasswordError('');

//     // Check if dean already exists
//     if (role === 'dean' && deanExists) {
//       alert("A Dean account already exists. You cannot register another Dean.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       localStorage.setItem("userEmail", user.email);

//       await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           uid: user.uid,
//           full_name: fullName,
//           email: user.email,
//           role: role || "instructor"
//         })
//       });

//       setSuccess("Signup successful! You can now log in.");
//       alert("Signup successful! You can now log in.");
//       navigate('/login');
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError("Signup failed. Please try again.");
//     }

//     setLoading(false);
//   };

//   // ✅ Handle Google signup
//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       setGoogleUser(result.user);
//       setShowRoleModal(true);
//     } catch (err) {
//       console.error('Google signup error:', err);
//       setError("Google signup failed. Please try again.");
//     }
//   };

//   // ✅ Save role after Google signup
//   const handleSaveRole = async () => {
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     if (role === 'dean' && deanExists) {
//       alert("A Dean account already exists. You cannot register another Dean.");
//       return;
//     }

//     try {
//       localStorage.setItem("userEmail", googleUser.email);

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

//       alert("Signup successful! You can now log in.");
//       setShowRoleModal(false);
//       navigate('/login');
//     } catch (err) {
//       console.error('Role save error:', err);
//       setError("Failed to save role. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container signup-page" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="EduSched Logo" className="auth-img" />
//         </div>
//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Sign Up</h2>

//             {error && <div className="alert error">{error}</div>}
//             {success && <div className="alert success">{success}</div>}
//             {passwordError && <div className="alert alert-danger">{passwordError}</div>}

//             <form onSubmit={handleSignup} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* PASSWORD FIELD */}
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

//               {/* ✅ Select Role */}
//               <div className="form-group">
//                 <select
//                   className="form-select"
//                   value={role}
//                   onChange={(e) => {
//                     if (e.target.value === 'dean' && deanExists) {
//                       alert("A Dean account already exists.");
//                       setRole('');
//                     } else {
//                       setRole(e.target.value);
//                     }
//                   }}
//                   required
//                 >
//                   <option value="">Select Role</option>
//                   <option value="admin">Admin</option>
//                   <option value="dean" disabled={deanExists}>Dean</option>
//                   <option value="instructor">Instructor</option>
//                 </select>
//               </div>

//               <button type="submit" className="auth-btn primary" disabled={loading}>
//                 {loading ? 'Signing up...' : 'Sign Up'}
//               </button>

//               <p className="divider">or sign up with</p>
//               <button type="button" onClick={handleGoogleSignup} className="auth-btn google">
//                 <FcGoogle size={20} /> Sign up with Google
//               </button>

//               <p className="auth-footer">Already have an account? <a href="/login">Login</a></p>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Modal for Google role selection */}
//       <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please choose your role to complete signup.</p>
//           <select
//             className="form-select"
//             value={role}
//             onChange={(e) => {
//               if (e.target.value === 'dean' && deanExists) {
//                 alert("A Dean account already exists.");
//                 setRole('');
//               } else {
//                 setRole(e.target.value);
//               }
//             }}
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="dean" disabled={deanExists}>Dean</option>
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

// export default Signup;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { 
  Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, 
  CheckCircle, User, X, Loader, ShieldCheck
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
  disabled = false,
  showStrength = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(value);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

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
          autoComplete="new-password"
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
      
      {showStrength && value && (
        <div className="password-strength">
          <div className="strength-bar">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`strength-segment ${i < strength ? 'active' : ''}`}
                style={{
                  backgroundColor: i < strength ? strengthColors[strength - 1] : '#e5e5e5'
                }}
              />
            ))}
          </div>
          <span className="strength-label" style={{ color: strengthColors[strength - 1] || '#666' }}>
            {value.length > 0 ? strengthLabels[strength - 1] || 'Very Weak' : ''}
          </span>
        </div>
      )}
      
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
  loading,
  deanExists 
}) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  const roles = [
    { value: 'admin', label: 'Administrator', description: 'Full system access', icon: ShieldCheck },
    { value: 'dean', label: 'Dean', description: 'Faculty management', icon: User, disabled: deanExists },
    { value: 'instructor', label: 'Instructor', description: 'Teaching access', icon: User },
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
            Please select your role to complete signup
          </p>

          {deanExists && (
            <div className="dean-warning">
              <AlertCircle size={16} />
              <span>A Dean account already exists. Dean role is unavailable.</span>
            </div>
          )}

          <div className="role-options">
            {roles.map((role) => (
              <label
                key={role.value}
                className={`role-option ${selectedRole === role.value ? 'selected' : ''} ${role.disabled ? 'disabled' : ''}`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRole === role.value}
                  onChange={(e) => {
                    if (!role.disabled) {
                      setSelectedRole(e.target.value);
                      setError('');
                    }
                  }}
                  disabled={loading || role.disabled}
                />
                <div className="role-content">
                  <role.icon size={24} className="role-icon" />
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

// ==================== MAIN SIGNUP COMPONENT ====================
export default function Signup() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Modal State
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [deanExists, setDeanExists] = useState(false);

  const navigate = useNavigate();

  /**
   * Check if dean already exists
   */
  useEffect(() => {
    const checkDean = async () => {
      try {
        const res = await fetch(`${API}/api/users`);
        const data = await res.json();
        const deanFound = data.some(user => user.role === 'dean');
        setDeanExists(deanFound);
      } catch (err) {
        console.error("Error checking dean:", err);
      }
    };
    checkDean();
  }, []);

  /**
   * Validate email format
   */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * Validate password strength
   */
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('one number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('one special character');
    
    if (errors.length > 0) {
      return `Password must contain ${errors.join(', ')}`;
    }
    return '';
  };

  /**
   * Handle email/password signup
   */
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate inputs
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }
    
    if (!role) {
      newErrors.role = 'Please select a role';
    }
    
    if (role === 'dean' && deanExists) {
      newErrors.role = 'A Dean account already exists';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to backend
      const response = await fetch(`${API}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          full_name: fullName.trim(),
          email: user.email,
          role: role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      showToast('Signup successful! Redirecting to login...', 'success');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err);
      
      let errorMessage = 'Signup failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Google OAuth signup
   */
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setGoogleUser(result.user);
      setShowRoleModal(true);
    } catch (err) {
      console.error('Google signup error:', err);
      
      let errorMessage = 'Google signup failed';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-up cancelled';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups for this site';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email';
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

    if (selectedRole === 'dean' && deanExists) {
      setErrors({ general: 'A Dean account already exists' });
      return;
    }

    setRoleLoading(true);

    try {
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

      setShowRoleModal(false);
      showToast('Signup successful! Redirecting to login...', 'success');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Role save error:', err);
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
    <div className="signup-page">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Background */}
      <div className="signup-background">
        <div className="gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-left">
          <div className="brand-section">
            <img 
              src="/images/trylogo.png" 
              alt="EduSched Logo" 
              className="brand-logo"
            />
            <h1 className="brand-title">EduSched</h1>
            <p className="brand-tagline">
              Join Our Smart Academic Scheduling System
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Quick Registration</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Secure Authentication</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Role-based Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-right">
          <div className="signup-card">
            <div className="card-header">
              <h2>Create Account</h2>
              <p>Sign up to get started</p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="alert-error">
                <AlertCircle size={20} />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="signup-form">
              <AuthInput
                icon={User}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                disabled={loading || googleLoading}
                autoComplete="name"
                required
              />

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
                showStrength={true}
              />

              {/* Role Selection */}
              <div className="auth-input-group">
                <div className={`auth-input-wrapper ${errors.role ? 'error' : ''} ${loading || googleLoading ? 'disabled' : ''}`}>
                  <ShieldCheck size={20} className="input-icon" />
                  <select
                    className="auth-input auth-select"
                    value={role}
                    onChange={(e) => {
                      if (e.target.value === 'dean' && deanExists) {
                        setErrors({ ...errors, role: 'A Dean account already exists' });
                        setRole('');
                      } else {
                        setRole(e.target.value);
                        setErrors({ ...errors, role: '' });
                      }
                    }}
                    disabled={loading || googleLoading}
                    required
                  >
                    <option value="">Select Role</option>
                    {/* <option value="admin">Administrator</option> */}
                    <option value="dean" disabled={deanExists}>
                      Dean {deanExists ? '(Unavailable)' : ''}
                    </option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
                {errors.role && (
                  <div className="input-error">
                    <AlertCircle size={14} />
                    <span>{errors.role}</span>
                  </div>
                )}
              </div>

              <AuthButton
                type="submit"
                variant="primary"
                icon={UserPlus}
                loading={loading}
                disabled={googleLoading}
              >
                Sign Up
              </AuthButton>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Sign Up */}
            <AuthButton
              variant="google"
              onClick={handleGoogleSignup}
              loading={googleLoading}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Sign up with Google
            </AuthButton>

            {/* Footer */}
            <div className="card-footer">
              <p>
                Already have an account? <a href="/login">Login</a>
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
        deanExists={deanExists}
      />

      {/* Inline Styles */}
      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        /* ===== BACKGROUND ===== */
        .signup-background {
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
        .signup-container {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          z-index: 1;
        }

        /* ===== LEFT SIDE - BRANDING ===== */
        .signup-left {
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
        .signup-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: slideInRight 0.6s ease;
        }

        .signup-card {
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
        .signup-form {
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

        .auth-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23023E8A' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 3rem;
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

        .password-          opacity: 0.6;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .password-toggle:hover {
          opacity: 1;
        }

        .input-error {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #ef4444;
          font-size: 0.85rem;
        }

        /* ===== PASSWORD STRENGTH BAR ===== */
        .password-strength {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .strength-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.3rem;
        }

        .strength-segment {
          height: 6px;
          border-radius: 4px;
          background-color: #e5e5e5;
          transition: all 0.3s ease;
        }

        .strength-label {
          font-size: 0.8rem;
          text-align: right;
          opacity: 0.8;
        }

        /* ===== BUTTONS ===== */
        .auth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem 1rem;
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
          background-color: ${COLORS.primary};
          color: white;
        }

        .auth-btn.primary:hover:not(:disabled) {
          background-color: ${COLORS.secondary};
        }

        .auth-btn.google {
          background-color: white;
          border: 2px solid ${COLORS.light};
          color: ${COLORS.secondary};
        }

        .auth-btn.google:hover:not(:disabled) {
          background-color: ${COLORS.lightest};
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* ===== DIVIDER ===== */
        .divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          position: relative;
          z-index: 2;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(0,0,0,0.1);
          transform: translateY(-50%);
        }

        /* ===== FOOTER ===== */
        .card-footer {
          text-align: center;
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          margin-top: 1rem;
        }

        .card-footer a {
          color: ${COLORS.accent};
          font-weight: 600;
          text-decoration: none;
          margin-left: 0.25rem;
        }

        .card-footer a:hover {
          text-decoration: underline;
        }

        /* ===== ALERTS ===== */
        .alert-error {
          background: #fee2e2;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        /* ===== TOAST ===== */
        .toast-notification {
          position: fixed;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          z-index: 9999;
          animation: slideIn 0.4s ease;
          color: white;
          font-weight: 500;
        }

        .toast-notification.success {
          background-color: #22c55e;
        }

        .toast-notification.error {
          background-color: #ef4444;
        }

        .toast-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .toast-close:hover {
          opacity: 1;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== ROLE MODAL ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }

        .modal-header, .modal-footer {
          padding: 1rem 1.5rem;
        }

        .modal-header {
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        .modal-close {
          background: none;
          border: none;
          color: ${COLORS.secondary};
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .modal-close:hover {
          opacity: 1;
        }

        .role-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .role-option {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .role-option.selected {
          border-color: ${COLORS.accent};
          background: ${COLORS.lightest};
        }

        .role-option.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .role-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .role-label {
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .role-description {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
        }

        .role-check {
          color: ${COLORS.accent};
          opacity: 0;
          transition: opacity 0.3s;
        }

        .role-option.selected .role-check {
          opacity: 1;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          border-top: 1px solid #eee;
        }

        .btn-primary, .btn-secondary {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background-color: ${COLORS.primary};
          color: white;
        }

        .btn-primary:hover {
          background-color: ${COLORS.accent};
        }

        .btn-secondary {
          background-color: #f1f5f9;
          color: ${COLORS.primary};
        }

        .btn-secondary:hover {
          background-color: #e2e8f0;
        }

        .dean-warning {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #fff7ed;
          color: #b45309;
          font-size: 0.9rem;
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          margin-top: 0.5rem;
        }

        .modal-error {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          font-size: 0.9rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .signup-container {
            grid-template-columns: 1fr;
          }
          .signup-left {
            display: none;
          }
          .signup-right {
            padding: 1.5rem;
          }
          .signup-card {
            padding: 2rem;
          }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
