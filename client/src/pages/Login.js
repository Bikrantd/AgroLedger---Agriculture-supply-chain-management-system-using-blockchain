import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
    const history = useHistory();

    const roles = [
        { id: 'admin', name: 'Admin', icon: '👑', color: '#2c3e50', route: '/admin-login' },
        { id: 'farmer', name: 'Farmer', icon: '🌾', color: '#27ae60', route: '/stakeholder-login?role=supplier' },
        { id: 'manufacturer', name: 'Manufacturer', icon: '🏭', color: '#2980b9', route: '/stakeholder-login?role=manufacturer' },
        { id: 'distributor', name: 'Distributor', icon: '🚚', color: '#f39c12', route: '/stakeholder-login?role=distributor' },
        { id: 'retailer', name: 'Retailer', icon: '🏪', color: '#e67e22', route: '/stakeholder-login?role=retailer' }
    ];

    const handleRoleClick = (route) => {
        history.push(route);
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>🌾 Agroledger</h1>
                <p>Blockchain Food Supply Chain</p>
            </div>
            
            <div className="roles-container">
                <h2>Select Your Role</h2>
                <div className="roles-grid">
                    {roles.map(role => (
                        <div
                            key={role.id}
                            className="role-card"
                            onClick={() => handleRoleClick(role.route)}
                            style={{ borderColor: role.color }}
                        >
                            <div className="role-icon" style={{ backgroundColor: `${role.color}15` }}>
                                <span style={{ fontSize: '48px' }}>{role.icon}</span>
                            </div>
                            <h3 style={{ color: role.color }}>{role.name}</h3>
                            <p>Click to login</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="login-footer">
                <p>© 2024 Agroledger - Blockchain Verified Supply Chain</p>
            </div>
        </div>
    );
}

export default Login;