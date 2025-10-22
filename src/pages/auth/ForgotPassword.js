// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../firebase';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setSuccess(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Reset Password</h2>
        
//         {error && <div className="alert alert-danger">{error}</div>}
//         {success ? (
//           <div className="alert alert-success">
//             <p>Password reset email sent!</p>
//             <p>Check your inbox for instructions to reset your password.</p>
//             <button 
//               className="auth-btn primary"
//               onClick={() => navigate('/login')}
//             >
//               Back to Login
//             </button>
//           </div>
//         ) : (
//           <>
//             <p>Enter your email address and we'll send you a link to reset your password.</p>
//             <form onSubmit={handleSubmit} className="auth-form">
//               <div className="form-group">
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 className="auth-btn primary"
//                 disabled={loading}
//               >
//                 {loading ? 'Sending...' : 'Send Reset Link'}
//               </button>
//             </form>
//           </>
//         )}
        
//         <div className="auth-footer">
//           Remember your password? <a href="/login">Log in</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

//FUNCTIONAL

// // src/pages/ForgotPassword.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../../firebase';
// import '../../styles/Auth.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess(false);
  
//     try {
//       await sendPasswordResetEmail(auth, email, {
//         url: "http://localhost:3000/reset-password"
//       });
//       setSuccess(true);
//     } catch (err) {
//       console.error('sendPasswordResetEmail error', err);
//       if (err.code === 'auth/user-not-found') {
//         setError('No account found with that email.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Please enter a valid email address.');
//       } else {
//         setError('Failed to send reset email. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="auth-container" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
//       <div className="auth-wrapper">
//         <div className="auth-left">
//           <img src="/images/newlogo.png" alt="Logo" className="auth-img" />
//         </div>

//         <div className="auth-right">
//           <div className="auth-card">
//             <h2 className="auth-title">Reset Password</h2>

//             {error && <div className="alert alert-danger">{error}</div>}

//             {success ? (
//               <div className="alert alert-success">
//                 A password reset email has been sent. Check your inbox (and spam).
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="auth-form">
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     autoFocus
//                   />
//                 </div>

//                 <button type="submit" className="auth-btn primary" disabled={loading}>
//                   {loading ? 'Sending...' : 'Send Reset Link'}
//                 </button>
//               </form>
//             )}

//             <div className="auth-footer">
//               Remembered your password? <a href="/login">Log in</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// src/pages/ForgotPassword.js
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Lock, Loader } from 'lucide-react';
import '../../styles//ForgotPassword.css';

// ========================================
// 🖼️ BACKGROUND COMPONENT
// ========================================
const AuthBackground = () => (
  <div className="auth-background">
    <div className="background-image" />
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
// ✅ SUCCESS MESSAGE COMPONENT
// ========================================
const SuccessMessage = ({ email }) => (
  <div className="success-container" role="alert" aria-live="polite">
    <div className="success-icon-wrapper">
      <CheckCircle className="success-icon" size={64} />
    </div>
    <h3 className="success-title">Check Your Email</h3>
    <p className="success-description">
      We've sent a password reset link to:
    </p>
    <p className="success-email">{email}</p>
    <div className="success-note">
      <Lock size={16} />
      <span>For security, the link will expire in 1 hour</span>
    </div>
    <p className="success-hint">
      Didn't receive it? Check your spam folder or try again.
    </p>
  </div>
);

// ========================================
// 📧 RESET FORM COMPONENT
// ========================================
const ResetForm = ({ onSubmit, email, setEmail, loading, error }) => {
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Real-time email validation
  const validateEmail = useCallback((value) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      setEmailTouched(true);
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="reset-form" noValidate>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={20} />
          <input
            id="email"
            type="email"
            className={`form-input ${emailTouched && emailError ? 'input-error' : ''} ${emailTouched && !emailError && email ? 'input-valid' : ''}`}
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            disabled={loading}
            autoComplete="email"
            autoFocus
            aria-invalid={emailTouched && emailError ? 'true' : 'false'}
            aria-describedby={emailTouched && emailError ? 'email-error' : undefined}
          />
        </div>
        {emailTouched && emailError && (
          <p id="email-error" className="input-error-message" role="alert">
            <AlertCircle size={14} />
            {emailError}
          </p>
        )}
      </div>

      {error && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={loading || (emailTouched && emailError)}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader className="button-spinner" size={20} />
            <span>Sending Reset Link...</span>
          </>
        ) : (
          <>
            <Mail size={20} />
            <span>Send Reset Link</span>
          </>
        )}
      </button>

      <div className="security-note">
        <Lock size={16} />
        <p>
          We'll send you a secure link to reset your password. 
          Never share this link with anyone.
        </p>
      </div>
    </form>
  );
};

// ========================================
// 🎯 MAIN FORGOT PASSWORD COMPONENT
// ========================================
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to login after successful submission
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login',
        handleCodeInApp: false,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      
      // User-friendly error messages
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account exists with this email address. Please check and try again.');
          break;
        case 'auth/invalid-email':
          setError('The email address is invalid. Please enter a valid email.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please wait a few minutes before trying again.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection and try again.');
          break;
        default:
          setError('Failed to send reset email. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <main className="forgot-password-page">
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
            <h1 className="card-title">Reset Your Password</h1>
            <p className="card-subtitle">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </header>

          {success ? (
            <SuccessMessage email={email} />
          ) : (
            <ResetForm
              onSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              loading={loading}
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

export default ForgotPassword;