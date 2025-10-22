// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
// import { auth } from '../firebase';

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [oobCode, setOobCode] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const code = searchParams.get('oobCode');
//     if (!code) {
//       setError('Invalid reset link');
//       setLoading(false);
//       return;
//     }

//     setOobCode(code);
//     // Verify the password reset code is valid
//     verifyPasswordResetCode(auth, code)
//       .then(() => {
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Invalid or expired reset link');
//         setLoading(false);
//       });
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     try {
//       await confirmPasswordReset(auth, oobCode, newPassword);
//       setSuccess(true);
//       setError('');
      
//       // Automatically redirect after 3 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="alert alert-info">Verifying reset link...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Reset Your Password</h2>
        
//         {error && <div className="alert alert-danger">{error}</div>}
//         {success ? (
//           <div className="alert alert-success">
//             <p>Password updated successfully!</p>
//             <p>You will be redirected to the login page shortly.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="auth-form">
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 minLength="6"
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 minLength="6"
//               />
//             </div>
//             <button type="submit" className="auth-btn primary">
//               Update Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

//FUNCTIONAL
// src/pages/ResetPassword.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
// import { auth } from '../../firebase';
// import '../../styles/Auth.css';

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [oobCode, setOobCode] = useState('');
//   const [loading, setLoading] = useState(true); // verifying link
//   const [error, setError] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const code = searchParams.get('oobCode');
//     if (!code) {
//       setError('Invalid or missing reset link.');
//       setLoading(false);
//       return;
//     }
//     setOobCode(code);

//     // verify the code is valid (this resolves with the user's email)
//     verifyPasswordResetCode(auth, code)
//       .then((email) => {
//         // Optionally show the email to the user or just proceed
//         console.log('Reset code is valid for:', email);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('verifyPasswordResetCode error', err);
//         setError('This reset link is invalid or has expired.');
//         setLoading(false);
//       });
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       await confirmPasswordReset(auth, oobCode, newPassword);
//       setSuccess(true);
//       // Redirect to login after a short delay
//       setTimeout(() => {
//         navigate('/login');
//       }, 2500);
//     } catch (err) {
//       console.error('confirmPasswordReset error', err);
//       setError('Failed to update password. The link may have expired.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="alert">Verifying reset link...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper" style={{ maxWidth: 700 }}>
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="Logo" className="auth-img" />
//         </div>

//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Choose a New Password</h2>

//             {error && <div className="alert alert-danger">{error}</div>}
//             {success ? (
//               <div className="alert alert-success">
//                 Password updated! Redirecting to login...
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="auth-form">
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                     minLength={6}
//                     autoFocus
//                   />
//                 </div>

//                 <div className="form-group">
//                   <input
//                     type="password"
//                     placeholder="Confirm New Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     minLength={6}
//                   />
//                 </div>

//                 <button type="submit" className="auth-btn primary" disabled={submitting}>
//                   {submitting ? 'Updating...' : 'Update Password'}
//                 </button>
//               </form>
//             )}

//             <div className="auth-footer">
//               <a href="/login">Back to Login</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

// src/pages/ResetPassword.js
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../../firebase';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield, Loader, ArrowLeft } from 'lucide-react';
import '../../styles/ResetPassword.css';


// ========================================
// 🖼️ BACKGROUND COMPONENT
// ========================================
const AuthBackground = () => (
  <div className="auth-background">
    <div className="background-image" style={{ backgroundImage: `url(/imagses/bg.jpg)` }} />
    <div className="background-overlay" />
    <div className="background-pattern" />
  </div>
);

// ========================================
// 🏷️ LOGO COMPONENT
// ========================================
const BrandLogo = () => (
  <div className="brand-logo-container">
    <img src="/images/newlogo.png" alt="EduSched Logo" className="brand-logo" />
  </div>
);

// ========================================
// 💪 PASSWORD STRENGTH INDICATOR
// ========================================
const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return { level: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Weak', color: '#dc3545' },
      { level: 2, text: 'Fair', color: '#fd7e14' },
      { level: 3, text: 'Good', color: '#ffc107' },
      { level: 4, text: 'Strong', color: '#28a745' },
      { level: 5, text: 'Very Strong', color: '#20c997' },
    ];

    return levels[score];
  }, [password]);

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`strength-bar ${bar <= strength.level ? 'active' : ''}`}
            style={{ backgroundColor: bar <= strength.level ? strength.color : '#e0e0e0' }}
          />
        ))}
      </div>
      <span className="strength-text" style={{ color: strength.color }}>
        {strength.text}
      </span>
    </div>
  );
};

// ========================================
// ✅ SUCCESS MESSAGE COMPONENT
// ========================================
const SuccessMessage = () => (
  <div className="success-container" role="alert" aria-live="polite">
    <div className="success-icon-wrapper">
      <CheckCircle className="success-icon" size={64} />
    </div>
    <h3 className="success-title">Password Updated Successfully!</h3>
    <p className="success-description">
      Your password has been changed. You can now log in with your new password.
    </p>
    <div className="success-note">
      <Shield size={16} />
      <span>Redirecting to login page...</span>
    </div>
  </div>
);

// ========================================
// 🔐 RESET FORM COMPONENT
// ========================================
const ResetForm = ({ onSubmit, newPassword, setNewPassword, confirmPassword, setConfirmPassword, submitting, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [validationErrors, setValidationErrors] = useState({});

  // Validate password on blur
  const validatePassword = useCallback((value) => {
    const errors = {};
    if (value.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  }, []);

  // Validate confirm password
  const validateConfirm = useCallback((value, password) => {
    const errors = {};
    if (value && value !== password) {
      errors.confirm = 'Passwords do not match';
    }
    return errors;
  }, []);

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setValidationErrors(prev => ({ ...prev, ...validatePassword(newPassword) }));
  };

  const handleConfirmBlur = () => {
    setTouched(prev => ({ ...prev, confirm: true }));
    setValidationErrors(prev => ({ ...prev, ...validateConfirm(confirmPassword, newPassword) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (touched.password) {
      setValidationErrors(prev => ({ ...prev, ...validatePassword(value) }));
    }
    if (touched.confirm && confirmPassword) {
      setValidationErrors(prev => ({ ...prev, ...validateConfirm(confirmPassword, value) }));
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirm) {
      setValidationErrors(prev => ({ ...prev, ...validateConfirm(value, newPassword) }));
    }
  };

  const isValid = newPassword.length >= 6 && newPassword === confirmPassword;

  return (
    <form onSubmit={onSubmit} className="reset-form" noValidate>
      {/* New Password */}
      <div className="form-group">
        <label htmlFor="new-password" className="form-label">
          New Password
        </label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={20} />
          <input
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            className={`form-input ${touched.password && validationErrors.password ? 'input-error' : ''} ${touched.password && !validationErrors.password && newPassword ? 'input-valid' : ''}`}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            disabled={submitting}
            autoComplete="new-password"
            autoFocus
            aria-invalid={touched.password && validationErrors.password ? 'true' : 'false'}
            aria-describedby={touched.password && validationErrors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <PasswordStrength password={newPassword} />
        {touched.password && validationErrors.password && (
          <p id="password-error" className="input-error-message" role="alert">
            <AlertCircle size={14} />
            {validationErrors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password
        </label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={20} />
          <input
            id="confirm-password"
            type={showConfirm ? 'text' : 'password'}
            className={`form-input ${touched.confirm && validationErrors.confirm ? 'input-error' : ''} ${touched.confirm && !validationErrors.confirm && confirmPassword ? 'input-valid' : ''}`}
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            onBlur={handleConfirmBlur}
            disabled={submitting}
            autoComplete="new-password"
            aria-invalid={touched.confirm && validationErrors.confirm ? 'true' : 'false'}
            aria-describedby={touched.confirm && validationErrors.confirm ? 'confirm-error' : undefined}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {touched.confirm && validationErrors.confirm && (
          <p id="confirm-error" className="input-error-message" role="alert">
            <AlertCircle size={14} />
            {validationErrors.confirm}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="submit-button"
        disabled={submitting || !isValid}
        aria-busy={submitting}
      >
        {submitting ? (
          <>
            <Loader className="button-spinner" size={20} />
            <span>Updating Password...</span>
          </>
        ) : (
          <>
            <Shield size={20} />
            <span>Update Password</span>
          </>
        )}
      </button>

      {/* Security Note */}
      <div className="security-note">
        <Shield size={16} />
        <p>
          For your security, create a strong password with at least 6 characters,
          including uppercase, lowercase, numbers, and symbols.
        </p>
      </div>
    </form>
  );
};

// ========================================
// 🎯 MAIN RESET PASSWORD COMPONENT
// ========================================
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Verify the reset code on mount
  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (!code) {
      setError('Invalid or missing reset link.');
      setLoading(false);
      return;
    }
    setOobCode(code);

    // Verify the code is valid and get the user's email
    verifyPasswordResetCode(auth, code)
      .then((email) => {
        console.log('Reset code is valid for:', email);
        setUserEmail(email);
        setLoading(false);
      })
      .catch((err) => {
        console.error('verifyPasswordResetCode error:', err);
        let errorMessage = 'This reset link is invalid or has expired.';
        
        switch (err.code) {
          case 'auth/expired-action-code':
            errorMessage = 'This reset link has expired. Please request a new one.';
            break;
          case 'auth/invalid-action-code':
            errorMessage = 'This reset link is invalid. It may have already been used.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this reset link.';
            break;
          default:
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      });
  }, [searchParams]);

  // Redirect to login after successful password reset
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
    } catch (err) {
      console.error('confirmPasswordReset error:', err);
      
      let errorMessage = 'Failed to update password. Please try again.';
      
      switch (err.code) {
        case 'auth/expired-action-code':
          errorMessage = 'This reset link has expired. Please request a new one.';
          break;
        case 'auth/invalid-action-code':
          errorMessage = 'This reset link is invalid or has already been used.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          break;
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [oobCode, newPassword, confirmPassword]);

  // Loading state while verifying link
  if (loading) {
    return (
      <main className="reset-password-page">
        <AuthBackground />
        <BrandLogo />
        <div className="content-container">
          <div className="auth-card loading-card">
            <div className="loading-container">
              <Loader className="loading-spinner" size={48} />
              <p className="loading-text">Verifying reset link...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state for invalid/expired link
  if (error && !oobCode) {
    return (
      <main className="reset-password-page">
        <AuthBackground />
        <BrandLogo />
        <div className="content-container">
          <div className="auth-card">
            <Link to="/forgot-password" className="back-button" aria-label="Back to forgot password">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>

            <header className="card-header">
              <div className="icon-circle error-circle">
                <AlertCircle size={32} />
              </div>
              <h1 className="card-title">Invalid Reset Link</h1>
              <p className="card-subtitle error-subtitle">{error}</p>
            </header>

            <div className="error-actions">
              <Link to="/forgot-password" className="action-link primary">
                Request New Reset Link
              </Link>
              <Link to="/login" className="action-link secondary">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="reset-password-page">
      <AuthBackground />
      <BrandLogo />

      <div className="content-container">
        <div className="auth-card">
          <Link to="/login" className="back-button" aria-label="Back to login">
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>

          <header className="card-header">
            <div className="icon-circle">
              <Lock size={32} />
            </div>
            <h1 className="card-title">Choose a New Password</h1>
            <p className="card-subtitle">
              {userEmail && `Resetting password for: ${userEmail}`}
            </p>
          </header>

          {success ? (
            <SuccessMessage />
          ) : (
            <ResetForm
              onSubmit={handleSubmit}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              submitting={submitting}
              error={error}
            />
          )}

          <footer className="card-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="footer-link">
                Sign in instead
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;