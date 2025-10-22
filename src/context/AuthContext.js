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
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase'; // Adjust path if needed

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch role from backend if logged in
        fetchUserRole(user);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    async function fetchUserRole(user) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.uid}/role`);
        const data = await response.json();
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: data.role,
          displayName: user.displayName,   // ✅ include full name
      photoURL: user.photoURL  
        });
      } catch (err) {
        console.error("Error fetching role:", err);
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: null,
          displayName: user.displayName,   // ✅ still include fallback values
      photoURL: user.photoURL
        });
      } finally {
        setLoading(false);
      }
    }

    return unsubscribe;
  }, []);

  // ✅ Logout function
  const logout = () => signOut(auth);

  const value = {
    currentUser,
    setCurrentUser, // <-- Added so Signup.js can set user+role immediately
    loading,
    logout // ✅ expose logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
