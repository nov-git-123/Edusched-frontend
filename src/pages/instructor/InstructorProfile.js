// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext"; 
// // ⬆️ This is your custom context wrapper for Firebase auth

// import { auth, storage } from "../firebase"; 
// // ⬆️ Make sure firebase.js exports both `auth` and `storage`

// import { updateProfile, updatePassword } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

// const InstructorProfile = () => {
//   // Get currentUser from AuthContext
//   const { currentUser, setCurrentUser } = useAuth();

//   // States for form inputs
//   const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
//   const [photoFile, setPhotoFile] = useState(null);
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle profile picture selection
//   const handlePhotoChange = (e) => {
//     if (e.target.files[0]) {
//       setPhotoFile(e.target.files[0]);
//     }
//   };

//   // Handle update profile button
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       let photoURL = currentUser.photoURL;

//       // 🔹 Upload new profile picture if selected
//       if (photoFile) {
//         const fileRef = ref(storage, `profile-pics/${currentUser.uid}-${uuidv4()}`);
//         await uploadBytes(fileRef, photoFile);
//         photoURL = await getDownloadURL(fileRef);
//       }

//       // 🔹 Update profile in Firebase Authentication
//       await updateProfile(auth.currentUser, {
//         displayName,
//         photoURL,
//       });

//       // 🔹 Update password if provided
//       if (password) {
//         await updatePassword(auth.currentUser, password);
//       }

//       // 🔹 Update local state (so UI refreshes immediately)
//       setCurrentUser({
//         ...currentUser,
//         displayName,
//         photoURL,
//       });

//       setMessage("✅ Profile updated successfully!");
//       setPassword("");
//       setPhotoFile(null);
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Error updating profile: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Profile Settings</h2>

//       {message && <div className="alert alert-info">{message}</div>}

//       <form onSubmit={handleUpdateProfile}>
//         {/* Profile Picture */}
//         <div className="mb-3">
//           <label className="form-label">Profile Picture</label>
//           <div className="d-flex align-items-center mb-2">
//             <img
//               src={
//                 photoFile
//                   ? URL.createObjectURL(photoFile)
//                   : currentUser.photoURL || "/images/dean-avatar.png"
//               }
//               alt="Profile"
//               className="rounded-circle me-3"
//               style={{ width: "80px", height: "80px", objectFit: "cover" }}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//               className="form-control"
//             />
//           </div>
//         </div>

//         {/* Full Name */}
//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         </div>

//         {/* Email (readonly) */}
//         <div className="mb-3">
//           <label className="form-label">Email (cannot change)</label>
//           <input type="email" className="form-control" value={currentUser.email} disabled />
//         </div>

//         {/* Password */}
//         <div className="mb-3">
//           <label className="form-label">New Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Leave blank to keep current password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* Submit */}
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InstructorProfile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const InstructorProfile = () => {
//   const user = JSON.parse(localStorage.getItem("user")); // expected: { uid, email, instructorId, role }
//   const [profile, setProfile] = useState(null);
//   const [displayName, setDisplayName] = useState("");
//   const [photoFile, setPhotoFile] = useState(null);
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (!user) {
//           console.error("🚫 No user found in localStorage");
//           setMessage("No user found. Please log in again.");
//           setLoadingProfile(false);
//           return;
//         }

//         console.log("📤 Fetching profile for:", user);

//         let endpoint = "";

//         // ✅ Correct endpoint for instructor
//         if (user.role === "instructor" && user.instructorId) {
//           endpoint = `${API}/api/instructors/${user.instructorId}`;
//         } 
//         // ✅ Fallback if instructorId missing
//         else if (user.id) {
//           endpoint = `${API}/api/instructors/${user.id}`;
//         } 
//         // ✅ Fallback to email
//         else if (user.email) {
//           endpoint = `${API}/api/profile/email/${encodeURIComponent(user.email)}`;
//         } 
//         else {
//           setMessage("User data missing ID or email.");
//           setLoadingProfile(false);
//           return;
//         }

//         console.log("📡 Requesting:", endpoint);

//         const res = await axios.get(endpoint);

//         console.log("✅ Profile data received:", res.data);

//         if (!res.data || Object.keys(res.data).length === 0) {
//           setMessage("Profile not found in database.");
//         } else {
//           setProfile(res.data);
//           setDisplayName(res.data.name || res.data.full_name || "");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching profile:", err.response?.data || err.message);
//         setMessage(
//           `❌ Failed to load profile. ${
//             err.response?.data?.message || err.message
//           }`
//         );
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handlePhotoChange = (e) => {
//     if (e.target.files[0]) {
//       setPhotoFile(e.target.files[0]);
//     }
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     if (!profile) return;

//     setLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("id", profile.id || user.instructorId || user.id);
//     formData.append("name", displayName);
//     if (photoFile) formData.append("photo", photoFile);
//     if (password.trim() !== "") formData.append("password", password);

//     try {
//       const res = await axios.post(`${API}/api/profile/update`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setProfile({
//         ...profile,
//         name: displayName,
//         photo_url: res.data.photo_url || profile.photo_url,
//       });

//       setMessage("✅ Profile updated successfully!");
//       setPhotoFile(null);
//       setPassword("");
//     } catch (err) {
//       console.error("❌ Update failed:", err.response?.data || err.message);
//       setMessage(
//         `❌ Failed to update profile. ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingProfile) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <p className="text-muted">Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <p className="text-danger">
//           {message || "Profile not found. Please log in again."}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-center mt-5">
//       <div
//         className="card shadow-lg p-4"
//         style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
//       >
//         <h3 className="text-center mb-4">👤 Profile Settings</h3>

//         {message && (
//           <div
//             className={`alert ${
//               message.includes("✅") ? "alert-success" : "alert-danger"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleUpdateProfile}>
//           {/* Profile Picture */}
//           <div className="text-center mb-3">
//             <div className="position-relative d-inline-block">
//               <img
//                 src={
//                   photoFile
//                     ? URL.createObjectURL(photoFile)
//                     : profile.photo_url
//                     ? `${API}${profile.photo_url}`
//                     : "/images/dean-avatar.png"
//                 }
//                 alt="Profile"
//                 className="rounded-circle border"
//                 style={{
//                   width: "120px",
//                   height: "120px",
//                   objectFit: "cover",
//                 }}
//               />
//               <label
//                 htmlFor="profilePic"
//                 className="btn btn-sm btn-outline-primary position-absolute"
//                 style={{
//                   bottom: "5px",
//                   right: "5px",
//                   borderRadius: "50%",
//                   padding: "5px 8px",
//                 }}
//               >
//                 ✏️
//               </label>
//               <input
//                 id="profilePic"
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="d-none"
//               />
//             </div>
//           </div>

//           {/* Full Name */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Full Name</label>
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">Email</label>
//             <input
//               type="email"
//               className="form-control rounded-pill"
//               value={profile.email || ""}
//               disabled
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="form-label fw-bold">New Password</label>
//             <input
//               type="password"
//               className="form-control rounded-pill"
//               placeholder="Leave blank to keep current password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="btn btn-primary w-100 rounded-pill"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InstructorProfile;

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, storage } from "../../firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { 
  User, Mail, Lock, Camera, Check, X, AlertCircle, 
  Upload, Eye, EyeOff, Sun, Moon
} from "lucide-react";
// import { API } from '../../config/api';

// ==================== CONSTANTS ====================
const COLORS = {
  primary: "#03045E",
  secondary: "#023E8A",
  accent: "#0077B6",
  light: "#00B4D8",
  lighter: "#48CAE4",
  lightest: "#CAF0F8",
};

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ==================== TOAST NOTIFICATION ====================
const Toast = React.memo(({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', Icon: Check },
    error: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', Icon: AlertCircle },
    warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', Icon: AlertCircle },
  };

  const style = styles[type] || styles.success;
  const Icon = style.Icon;

  return (
    <div className="toast-notification" style={{ 
      background: style.bg, 
      borderColor: style.border, 
      color: style.color 
    }}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
});

// ==================== PROFILE PHOTO UPLOADER ====================
const ProfilePhotoUploader = React.memo(({ 
  currentPhotoURL, 
  photoFile, 
  onPhotoChange, 
  onPhotoRemove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const photoPreview = photoFile 
    ? URL.createObjectURL(photoFile)
    : currentPhotoURL || "/images/default-avatar.png";

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
      onPhotoChange(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="photo-uploader">
      <div 
        className={`photo-container ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="photo-wrapper">
          <img
            src={photoPreview}
            alt="Profile"
            className="profile-photo"
          />
          <div className="photo-overlay">
            <button
              type="button"
              className="photo-btn upload"
              onClick={() => fileInputRef.current?.click()}
              title="Upload photo"
            >
              <Camera size={20} />
            </button>
            {(photoFile || currentPhotoURL) && (
              <button
                type="button"
                className="photo-btn remove"
                onClick={onPhotoRemove}
                title="Remove photo"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleFileSelect}
          className="photo-input"
        />
      </div>
      <p className="photo-hint">
        <Upload size={14} />
        Drag & drop or click to upload (Max 5MB)
      </p>
    </div>
  );
});

// ==================== FORM INPUT COMPONENT ====================
const FormInput = React.memo(({ 
  icon: Icon, 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder,
  disabled = false,
  required = false,
  helperText,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="form-group">
      <label className="form-label">
        <Icon size={16} />
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="input-wrapper">
        <input
          type={inputType}
          className={`form-input ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        {type === "password" && value && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
});

// ==================== CONFIRMATION MODAL ====================
const ConfirmationModal = React.memo(({ show, onClose, onConfirm, title, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <AlertCircle size={24} className="warning-icon" />
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
export default function InstructorProfile() {
  const { currentUser, setCurrentUser } = useAuth();
  
  // State Management
  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [darkMode, setDarkMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form with current user data
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
    }
  }, [currentUser]);

  /**
   * Validates the profile form
   */
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validate display name
    if (!displayName.trim()) {
      newErrors.displayName = "Name is required";
    } else if (displayName.trim().length < 2) {
      newErrors.displayName = "Name must be at least 2 characters";
    }

    // Validate photo file if selected
    if (photoFile) {
      if (!ALLOWED_FILE_TYPES.includes(photoFile.type)) {
        newErrors.photo = "Invalid file type. Please use JPEG, PNG, GIF, or WebP";
      } else if (photoFile.size > MAX_FILE_SIZE) {
        newErrors.photo = "File size must be less than 5MB";
      }
    }

    // Validate password if provided
    if (password) {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [displayName, photoFile, password, confirmPassword]);

  /**
   * Handles photo file selection
   */
  const handlePhotoChange = useCallback((file) => {
    if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
      if (file.size <= MAX_FILE_SIZE) {
        setPhotoFile(file);
        setErrors(prev => ({ ...prev, photo: null }));
      } else {
        showToast("File size must be less than 5MB", "error");
      }
    } else {
      showToast("Invalid file type. Please use JPEG, PNG, GIF, or WebP", "error");
    }
  }, []);

  /**
   * Removes selected photo
   */
  const handlePhotoRemove = useCallback(() => {
    setPhotoFile(null);
    setErrors(prev => ({ ...prev, photo: null }));
  }, []);

  /**
   * Handles profile update submission
   */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      showToast("Please fix the errors before submitting", "error");
      return;
    }

    // Show confirmation if password is being changed
    if (password) {
      setShowConfirmModal(true);
      return;
    }

    await performUpdate();
  };

  /**
   * Performs the actual profile update
   */
  const performUpdate = async () => {
    setLoading(true);
    setShowConfirmModal(false);

    try {
      let photoURL = currentUser?.photoURL;

      // Upload new profile picture if selected
      if (photoFile) {
        const fileRef = ref(storage, `profile-pics/${currentUser.uid}-${uuidv4()}`);
        await uploadBytes(fileRef, photoFile);
        photoURL = await getDownloadURL(fileRef);
      }

      // Update Firebase profile (name + photo)
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL,
      });

      // Update password if provided
      if (password) {
        try {
          await updatePassword(auth.currentUser, password);
          showToast("Profile and password updated successfully!", "success");
        } catch (err) {
          if (err.code === "auth/requires-recent-login") {
            showToast("Please log out and log in again before changing your password", "warning");
          } else {
            showToast(`Error updating password: ${err.message}`, "error");
          }
          setLoading(false);
          return;
        }
      } else {
        showToast("Profile updated successfully!", "success");
      }

      // Update local context with new info
      setCurrentUser({
        ...currentUser,
        displayName: displayName.trim(),
        photoURL,
      });

      // Reset form
      setPassword("");
      setConfirmPassword("");
      setPhotoFile(null);
      setErrors({});
    } catch (error) {
      console.error("Profile update error:", error);
      showToast(`Error updating profile: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Shows toast notification
   */
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: "", type: "" });
  };

  return (
    <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-content">
            <div className="header-icon">
              <User size={32} />
            </div>
            <div>
              <h1 className="header-title">Profile Settings</h1>
              <p className="header-subtitle">Manage your account information</p>
            </div>
          </div>
          
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Profile Form Card */}
        <div className="profile-card">
          <form onSubmit={handleUpdateProfile}>
            {/* Profile Photo Section */}
            <div className="photo-section">
              <ProfilePhotoUploader
                currentPhotoURL={currentUser?.photoURL}
                photoFile={photoFile}
                onPhotoChange={handlePhotoChange}
                onPhotoRemove={handlePhotoRemove}
              />
              {errors.photo && <p className="error-text center">{errors.photo}</p>}
            </div>

            {/* Form Fields */}
            <div className="form-section">
              <FormInput
                icon={User}
                label="Full Name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                required
                error={errors.displayName}
              />

              <FormInput
                icon={Mail}
                label="Email Address"
                type="email"
                value={currentUser?.email || ""}
                disabled
                helperText="Email cannot be changed"
              />

              <div className="divider">
                <span>Change Password</span>
              </div>

              <FormInput
                icon={Lock}
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                helperText="Password must be at least 6 characters"
                error={errors.password}
              />

              {password && (
                <FormInput
                  icon={Lock}
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  required={!!password}
                  error={errors.confirmPassword}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <AlertCircle size={20} className="info-icon" />
            <div className="info-content">
              <h4>Security Tip</h4>
              <p>Use a strong password with at least 8 characters, including letters, numbers, and symbols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={performUpdate}
        title="Confirm Password Change"
        message="Are you sure you want to change your password? You may need to log in again after this change."
      />

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, ${COLORS.lightest} 0%, #ffffff 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          transition: all 0.3s ease;
        }

        .profile-page.dark-mode {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #e0e0e0;
        }

        .toast-notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 2px solid;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.3s ease;
          max-width: 400px;
        }

        .toast-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .toast-close:hover {
          opacity: 1;
        }

        .profile-container {
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 0.5s ease;
        }

        .profile-header {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dark-mode .profile-header {
          background: #1e293b;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .header-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          border-radius: 14px;
          color: white;
        }

        .header-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 0.25rem 0;
        }

        .dark-mode .header-title {
          color: #e0e0e0;
        }

        .header-subtitle {
          font-size: 0.95rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        .dark-mode .header-subtitle {
          color: #94a3b8;
        }

        .theme-toggle {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.lightest};
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${COLORS.primary};
        }

        .theme-toggle:hover {
          background: ${COLORS.lighter};
          transform: translateY(-2px);
        }

        .dark-mode .theme-toggle {
          background: #334155;
          color: #e0e0e0;
        }

        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 6px rgba(3, 4, 94, 0.1);
          margin-bottom: 2rem;
        }

        .dark-mode .profile-card {
          background: #1e293b;
        }

        .photo-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .photo-uploader {
          display: inline-block;
        }

        .photo-container {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .photo-container.dragging {
          transform: scale(1.05);
        }

        .photo-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid ${COLORS.light};
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
          transition: all 0.3s ease;
        }

        .photo-wrapper:hover {
          border-color: ${COLORS.lighter};
          box-shadow: 0 6px 16px rgba(0, 119, 182, 0.3);
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(3, 4, 94, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .photo-wrapper:hover .photo-overlay {
          opacity: 1;
        }

        .photo-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${COLORS.primary};
        }

        .photo-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .photo-btn.remove {
          background: #ef4444;
          color: white;
        }

        .photo-input {
          display: none;
        }

        .photo-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: ${COLORS.secondary};
          font-size: 0.95rem;
        }

        .dark-mode .form-label {
          color: #94a3b8;
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1.25rem;
          border: 2px solid ${COLORS.lightest};
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: white;
          color: ${COLORS.primary};
        }

        .form-input:focus {
          outline: none;
          border-color: ${COLORS.light};
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
        }

        .form-input.disabled {
          background: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .dark-mode .form-input {
          background: #334155;
          border-color: #475569;
          color: #e0e0e0;
        }

        .dark-mode .form-input.disabled {
          background: #1e293b;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: ${COLORS.secondary};
          opacity: 0.6;
          transition: opacity 0.2s ease;
          padding: 0.25rem;
        }

        .password-toggle:hover {
          opacity: 1;
        }

        .helper-text {
          font-size: 0.85rem;
          color: ${COLORS.secondary};
          opacity: 0.7;
          margin: 0;
        }

        .dark-mode .helper-text {
          color: #94a3b8;
        }

        .error-text {
          font-size: 0.85rem;
          color: #ef4444;
          margin: 0;
        }

        .error-text.center {
          text-align: center;
          margin-top: 0.5rem;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1rem 0;
          color: ${COLORS.secondary};
          opacity: 0.5;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid ${COLORS.lightest};
        }

        .divider span {
          padding: 0 1rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .dark-mode .divider::before,
        .dark-mode .divider::after {
          border-bottom-color: #475569;
        }

        .form-actions {
          margin-top: 2rem;
        }

        .btn-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(3, 4, 94, 0.3);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-card {
          background: white;
          border-left: 4px solid ${COLORS.light};
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 1rem;
        }

        .dark-mode .info-card {
          background: #1e293b;
        }

        .info-icon {
          color: ${COLORS.light};
          flex-shrink: 0;
        }

        .info-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: ${COLORS.primary};
        }

        .dark-mode .info-content h4 {
          color: #e0e0e0;
        }

        .info-content p {
          margin: 0;
          font-size: 0.9rem;
          color: ${COLORS.secondary};
          opacity: 0.8;
          line-height: 1.5;
        }

        .dark-mode .info-content p {
          color: #94a3b8;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: scaleIn 0.3s ease;
        }

        .dark-mode .modal-content {
          background: #1e293b;
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 2px solid ${COLORS.lightest};
        }

        .dark-mode .modal-header {
          border-bottom-color: #334155;
        }

        .warning-icon {
          color: #f59e0b;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: ${COLORS.primary};
        }

        .dark-mode .modal-header h3 {
          color: #e0e0e0;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-body p {
          margin: 0;
          color: ${COLORS.secondary};
          line-height: 1.6;
        }

        .dark-mode .modal-body p {
          color: #94a3b8;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.5rem;
          border-top: 2px solid ${COLORS.lightest};
        }

        .dark-mode .modal-footer {
          border-top-color: #334155;
        }

        .btn-secondary,
        .btn-primary {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: ${COLORS.secondary};
        }

        .btn-secondary:hover {
          background: #d1d5db;
        }

        .btn-primary {
          background: ${COLORS.primary};
          color: white;
        }

        .btn-primary:hover {
          background: ${COLORS.secondary};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(3, 4, 94, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .profile-page {
            padding: 1rem;
          }

          .profile-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .theme-toggle {
            align-self: flex-end;
          }

          .header-title {
            font-size: 1.5rem;
          }

          .profile-card {
            padding: 1.5rem;
          }

          .photo-wrapper {
            width: 120px;
            height: 120px;
          }

          .form-input {
            padding: 0.75rem 1rem;
          }

          .btn-submit {
            padding: 0.875rem 1.5rem;
          }

          .info-card {
            flex-direction: column;
          }

          .toast-notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-icon {
            width: 48px;
            height: 48px;
          }

          .header-title {
            font-size: 1.25rem;
          }

          .photo-wrapper {
            width: 100px;
            height: 100px;
          }

          .modal-content {
            width: 95%;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }
        }

        .form-input:focus-visible,
        .photo-btn:focus-visible,
        .btn-submit:focus-visible,
        .theme-toggle:focus-visible {
          outline: 3px solid ${COLORS.light};
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media print {
          .profile-page {
            background: white;
          }

          .toast-notification,
          .theme-toggle,
          .btn-submit,
          .photo-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}