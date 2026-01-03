// // src/context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged } from "firebase/auth";

// import { auth } from '../firebase'; // Adjust path if needed

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
  
//       if (user) {
//         fetchUserRole(user.uid);
//       }
//     });
  
//     async function fetchUserRole(uid) {
//       try {
//         const response = await fetch(`/api/users/${uid}/role`);
//         const data = await response.json();
//         setCurrentUser(prev => ({ ...prev, role: data.role }));
//       } catch (err) {
//         console.error("Error fetching role:", err);
//       }
//     }
  
//     return unsubscribe;
//   }, []);
  

//   const value = {
//     currentUser,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


// src/context/AuthContext.js

//PRE-ORAL

// import { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from '../firebase'; // Adjust path if needed

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // Fetch role from backend if logged in
//         fetchUserRole(user);
//       } else {
//         setCurrentUser(null);
//         setLoading(false);
//       }
//     });

//     async function fetchUserRole(user) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${user.uid}/role`);
//         const data = await response.json();
//         setCurrentUser({
//           uid: user.uid,
//           email: user.email,
//           role: data.role,
//           displayName: user.displayName,   // ✅ include full name
//       photoURL: user.photoURL  
//         });
//       } catch (err) {
//         console.error("Error fetching role:", err);
//         setCurrentUser({
//           uid: user.uid,
//           email: user.email,
//           role: null,
//           displayName: user.displayName,   // ✅ still include fallback values
//       photoURL: user.photoURL
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     return unsubscribe;
//   }, []);

//   // ✅ Logout function
//   const logout = () => signOut(auth);

//   const value = {
//     currentUser,
//     setCurrentUser, // <-- Added so Signup.js can set user+role immediately
//     loading,
//     logout // ✅ expose logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

//WORKING BUT IT DIRECTLY GO TO DAHSBOARD

// context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from '../firebase';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // Fetch complete user data from MySQL database
//         fetchUserData(user);
//       } else {
//         setCurrentUser(null);
//         setLoading(false);
//       }
//     });

//     async function fetchUserData(firebaseUser) {
//       try {
//         console.log('=== Fetching user data for Firebase UID:', firebaseUser.uid);
        
//         // Fetch complete user data including role, name, and profile picture
//         const response = await fetch(`http://localhost:5000/api/users/${firebaseUser.uid}/profile`);
//         const data = await response.json();

//         console.log('User data from backend:', data);

//         if (data.success && data.user) {
//           // Set user with complete data from MySQL database
//           setCurrentUser({
//             // Firebase fields
//             firebaseUid: firebaseUser.uid,
//             email: firebaseUser.email,
            
//             // MySQL database fields
//             uid: data.user.uid,                    // MySQL uid (the one in your users table)
//             id: data.user.uid,                     // Alias for compatibility
//             displayName: data.user.full_name,      // MySQL full_name
//             full_name: data.user.full_name,        // Keep original field name
//             photoURL: data.user.profile_picture,   // MySQL profile_picture
//             profile_picture: data.user.profile_picture, // Keep original field name
//             role: data.user.role,                  // User role
//             created_at: data.user.created_at,
//           });
//         } else {
//           // Fallback if user not found in database
//           console.warn('User not found in database, using Firebase data only');
//           setCurrentUser({
//             firebaseUid: firebaseUser.uid,
//             uid: firebaseUser.uid,
//             id: firebaseUser.uid,
//             email: firebaseUser.email,
//             displayName: firebaseUser.displayName || firebaseUser.email,
//             photoURL: firebaseUser.photoURL,
//             role: null,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching user data:", err);
        
//         // Fallback on error
//         setCurrentUser({
//           firebaseUid: firebaseUser.uid,
//           uid: firebaseUser.uid,
//           id: firebaseUser.uid,
//           email: firebaseUser.email,
//           displayName: firebaseUser.displayName || firebaseUser.email,
//           photoURL: firebaseUser.photoURL,
//           role: null,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     return unsubscribe;
//   }, []);

//   // Logout function
//   const logout = () => signOut(auth);

//   // Update user function (for profile updates)
//   const updateCurrentUser = (updates) => {
//     setCurrentUser(prev => ({
//       ...prev,
//       ...updates,
//       // Ensure both field names are updated
//       displayName: updates.displayName || updates.full_name || prev.displayName,
//       full_name: updates.displayName || updates.full_name || prev.full_name,
//       photoURL: updates.photoURL || updates.profile_picture || prev.photoURL,
//       profile_picture: updates.photoURL || updates.profile_picture || prev.profile_picture,
//     }));
//   };

//   const value = {
//     currentUser,
//     setCurrentUser: updateCurrentUser,
//     loading,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


// ==================== BACKEND: Update users.js Route ====================
// Add this new endpoint to your routes/users.js or create it

/*
// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get user profile by Firebase UID
router.get('/:firebaseUid/profile', (req, res) => {
  try {
    const { firebaseUid } = req.params;

    console.log('Fetching profile for Firebase UID:', firebaseUid);

    // Query users table using uid column (which stores Firebase UID)
    const sql = `
      SELECT uid, email, full_name, profile_picture, role, created_at, updated_at 
      FROM users 
      WHERE uid = ?
    `;
    
    db.query(sql, [firebaseUid], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error'
        });
      }

      if (results.length === 0) {
        console.log('User not found in database for UID:', firebaseUid);
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('User found:', results[0]);

      res.json({
        success: true,
        user: results[0]
      });
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Keep your existing role endpoint for backwards compatibility
router.get('/:uid/role', (req, res) => {
  try {
    const { uid } = req.params;

    const sql = 'SELECT role FROM users WHERE uid = ?';
    
    db.query(sql, [uid], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        role: results[0].role
      });
    });

  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
*/


// ==================== UPDATE YOUR PROFILE ROUTE ====================
// Your profile route should now use the uid from the users table

/*
// In routes/profile.js, the update and delete routes should work with the uid
// which is the Firebase UID stored in your MySQL users table

// The routes are already correct, just make sure:
// 1. userId from frontend = firebaseUid stored in users.uid column
// 2. All queries use: WHERE uid = ?
*/


// ==================== DATABASE SCHEMA CLARIFICATION ====================
/*
Your users table should have this structure:

CREATE TABLE users (
  uid VARCHAR(255) PRIMARY KEY,        -- This is the Firebase UID
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  profile_picture VARCHAR(500),
  role ENUM('admin', 'dean', 'instructor', 'student'),
  password VARCHAR(255),               -- May be NULL if using Firebase Auth
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

The uid column stores Firebase Authentication UIDs (those long strings like "MW2DuyncOWjU2uQhuJDKDapBcP3cq1")
*/


// ==================== FRONTEND USAGE ====================
/*
Now your components can use currentUser like this:

const { currentUser } = useAuth();

// currentUser will have:
{
  firebaseUid: "abc123...",           // Firebase UID
  uid: "MW2DuyncOWjU2uQhuJDKDapBcP3cq1",  // Same as firebaseUid (from MySQL)
  id: "MW2DuyncOWjU2uQhuJDKDapBcP3cq1",   // Alias for uid
  email: "user@example.com",
  displayName: "John Doe",             // From MySQL full_name
  full_name: "John Doe",               // Original field name
  photoURL: "/uploads/profile-pictures/user-123.jpg",  // From MySQL
  profile_picture: "/uploads/profile-pictures/user-123.jpg",  // Original field name
  role: "dean",
  created_at: "2025-01-01 00:00:00"
}
*/

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('=== Auth State Changed ===');
      console.log('Firebase User:', user ? user.uid : 'null');
      
      // CRITICAL FIX: Check if signup is in progress
      const signupInProgress = localStorage.getItem('signup_in_progress');
      if (signupInProgress === 'true') {
        console.log('Signup in progress - ignoring auth state change');
        setLoading(false);
        return;
      }
      
      if (user) {
        try {
          console.log('Fetching user profile from backend...');
          const response = await fetch(`http://localhost:5000/api/users/${user.uid}/profile`);
          
          if (!response.ok) {
            console.log('Backend returned error, signing out');
            await signOut(auth);
            setCurrentUser(null);
            setLoading(false);
            return;
          }
          
          const data = await response.json();
          console.log('Backend response:', data);

          // If user exists in database with complete data and role, proceed with login
          if (data.success && data.user && data.user.role) {
            console.log('User authenticated with role:', data.user.role);
            setCurrentUser({
              // Firebase fields
              firebaseUid: user.uid,
              email: user.email,
              
              // MySQL database fields
              uid: data.user.uid,
              id: data.user.uid,
              displayName: data.user.full_name,
              full_name: data.user.full_name,
              photoURL: data.user.profile_picture,
              profile_picture: data.user.profile_picture,
              role: data.user.role,
              created_at: data.user.created_at,
            });
            setLoading(false);
          } else {
            // User exists in Firebase but not properly set up in backend
            // This is likely a signup in progress - sign them out
            console.log('User exists but no role found, signing out');
            console.log('Data received:', data);
            await signOut(auth);
            setCurrentUser(null);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          // On error, sign out to be safe
          console.log('Error occurred, signing out user');
          await signOut(auth);
          setCurrentUser(null);
          setLoading(false);
        }
      } else {
        // User is signed out
        console.log('No Firebase user, setting currentUser to null');
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Logout function
  const logout = () => signOut(auth);

  // Update user function (for profile updates)
  const updateCurrentUser = (updates) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates,
      // Ensure both field names are updated
      displayName: updates.displayName || updates.full_name || prev.displayName,
      full_name: updates.displayName || updates.full_name || prev.full_name,
      photoURL: updates.photoURL || updates.profile_picture || prev.photoURL,
      profile_picture: updates.photoURL || updates.profile_picture || prev.profile_picture,
    }));
  };

  const value = {
    currentUser,
    setCurrentUser: updateCurrentUser,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}