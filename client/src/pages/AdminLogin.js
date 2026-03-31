import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendAdminOTP } from '../services/emailService';
import './AdminLogin.css';

function AdminLogin() {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(0);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Get admin email from .env
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'bikuchiku07@gmail.com';
    
    // Get password from localStorage or .env
    const getStoredPassword = () => {
        const savedPassword = localStorage.getItem('adminPassword');
        if (savedPassword) {
            return savedPassword;
        }
        // First time: use default from .env and save it
        const defaultPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'Admin123!';
        localStorage.setItem('adminPassword', defaultPassword);
        return defaultPassword;
    };

    const adminPassword = getStoredPassword();

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleLogin = async () => {
        setError('');
        
        if (email !== adminEmail) {
            setError('Invalid email');
            return;
        }
        
        if (password !== adminPassword) {
            setError('Invalid password');
            return;
        }
        
        // Clear any old user role when admin logs in
        localStorage.removeItem('userRole');
        localStorage.removeItem('userLoggedIn');
        
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminRole', 'admin');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        history.push('/admin-dashboard');
    };

    const handleSendOTP = async () => {
        if (email !== adminEmail) {
            setError('Invalid admin email');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const otpCode = generateOTP();
        setGeneratedOtp(otpCode);
        
        const result = await sendAdminOTP(email, otpCode);
        
        if (result.success) {
            setSuccess('✅ OTP sent to your email!');
            setStep(2);
            setTimer(600);
            
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setStep(1);
                        setError('OTP expired. Please try again.');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setError(result.message || 'Failed to send OTP');
        }
        
        setLoading(false);
    };

    const handleVerifyOTP = () => {
        if (otp === generatedOtp) {
            setStep(3);
            setError('');
            setSuccess('');
        } else {
            setError('Invalid OTP');
        }
    };

    const handleResetPassword = () => {
        if (!newPassword) {
            setError('Please enter new password');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        // Save new password to localStorage
        localStorage.setItem('adminPassword', newPassword);
        
        setSuccess('✅ Password changed successfully! Please login with your new password.');
        setStep(1);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-icon">👑</div>
                <h1>Admin Login</h1>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                {step === 1 && (
                    <div className="login-step">
                        <div className="input-group">
                            <label>📧 Email Address</label>
                            <input
                                type="email"
                                placeholder="admin@agroledger.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>🔐 Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <button className="login-btn" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="forgot-btn" onClick={() => setStep(2)}>
                            Forgot Password?
                        </button>
                        <button className="back-to-login" onClick={() => history.push('/login')}>
                            ← Back to Login Page
                        </button>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="login-step">
                        <p className="subtitle">Enter your email to reset password</p>
                        <div className="input-group">
                            <label>📧 Email Address</label>
                            <input
                                type="email"
                                placeholder="admin@agroledger.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        {!generatedOtp ? (
                            <button 
                                className="login-btn"
                                onClick={handleSendOTP}
                                disabled={loading || !email}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label>🔐 Enter OTP</label>
                                    <input
                                        type="text"
                                        placeholder="6-digit OTP"
                                        maxLength="6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className="timer">
                                    ⏱️ Time remaining: {formatTime(timer)}
                                </div>
                                <button 
                                    className="login-btn"
                                    onClick={handleVerifyOTP}
                                    disabled={otp.length !== 6}
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}
                        <button className="back-btn" onClick={() => setStep(1)}>
                            ← Back to Login
                        </button>
                    </div>
                )}
                
                {step === 3 && (
                    <div className="login-step">
                        <p className="subtitle">Set New Password</p>
                        <div className="input-group">
                            <label>🔐 New Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>🔐 Confirm Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <button className="login-btn" onClick={handleResetPassword}>
                            Reset Password
                        </button>
                        <button className="back-btn" onClick={() => setStep(1)}>
                            ← Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminLogin;