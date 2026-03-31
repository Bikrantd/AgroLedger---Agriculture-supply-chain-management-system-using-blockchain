import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import './StakeholderLogin.css';

function StakeholderLogin() {
    const history = useHistory();
    const location = useLocation();
    const [error, setError] = useState('');
    const [scanning, setScanning] = useState(true);

    const role = new URLSearchParams(location.search).get('role') || 'stakeholder';

    const roleNames = {
        supplier: 'Farmer',
        manufacturer: 'Manufacturer',
        distributor: 'Distributor',
        retailer: 'Retailer'
    };

    const roleIcons = {
        supplier: '🌾',
        manufacturer: '🏭',
        distributor: '🚚',
        retailer: '🏪'
    };

    const handleScan = (data) => {
        if (data) {
            try {
                const loginData = JSON.parse(data);
                
                if (loginData.role !== role) {
                    setError(`This QR code is for ${loginData.role}, not for ${role}`);
                    setTimeout(() => setError(''), 3000);
                    return;
                }
                
                // Clear any old admin role when stakeholder logs in
                localStorage.removeItem('adminRole');
                localStorage.removeItem('adminLoggedIn');
                
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userRole', loginData.role);
                localStorage.setItem('userRoleId', loginData.stakeholderId);
                localStorage.setItem('userName', loginData.name);
                localStorage.setItem('userAddress', loginData.address);
                
                history.push('/home');
            } catch (e) {
                setError('Invalid QR code');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    return (
        <div className="stakeholder-login-container">
            <div className="stakeholder-login-card">
                <div className="role-icon-large">
                    {roleIcons[role] || '🔐'}
                </div>
                <h1>{roleNames[role] || role} Login</h1>
                <p className="subtitle">Scan your QR code to login</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="scanner-container">
                    {scanning && (
                        <QrReader
                            onResult={(result, error) => {
                                if (result) {
                                    handleScan(result.getText());
                                }
                                if (error) {
                                    console.log(error);
                                }
                            }}
                            constraints={{ facingMode: 'environment' }}
                            style={{ width: '100%' }}
                        />
                    )}
                    <p className="scanner-hint">
                        📷 Position QR code in front of camera
                    </p>
                </div>
                
                <button 
                    className="back-btn"
                    onClick={() => history.push('/login')}
                >
                    ← Back to Login
                </button>
            </div>
        </div>
    );
}

export default StakeholderLogin;