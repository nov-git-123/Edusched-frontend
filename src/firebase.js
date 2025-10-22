// import { initializeApp } from "firebase/app";
// import { 
//   getAuth, 
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyA4KJ_EsCDncAj6KN4SFA3uPe8vifLRKkc",
//   authDomain: "capstone-edusched-project.firebaseapp.com",
//   projectId: "capstone-edusched-project",
//   storageBucket: "capstone-edusched-project.appspot.com",
//   messagingSenderId: "1023887246588",
//   appId: "1:1023887246588:web:662b0f39ca744622b6c379"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// // Export auth methods
// export { 
//   auth,
//   googleProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// };

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4KJ_EsCDncAj6KN4SFA3uPe8vifLRKkc",
  authDomain: "capstone-edusched-project.firebaseapp.com",
  projectId: "capstone-edusched-project",
  storageBucket: "capstone-edusched-project.appspot.com",
  messagingSenderId: "1023887246588",
  appId: "1:1023887246588:web:662b0f39ca744622b6c379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"   // 👈 Always ask which Google account
});

const storage = getStorage(app);



export { 
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  storage  
};
