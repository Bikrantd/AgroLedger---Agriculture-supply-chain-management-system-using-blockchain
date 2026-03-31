import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import SupplyChainABI from '../artifacts/SupplyChain.json';
import './AdminDashboard.css';

function AdminDashboard() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [currentaccount, setCurrentaccount] = useState('');
    const [stakeholders, setStakeholders] = useState({
        suppliers: [],
        manufacturers: [],
        distributors: [],
        retailers: []
    });
    const [showQR, setShowQR] = useState(null);
    const [qrCode, setQrCode] = useState('');

    // Check if admin is logged in
    useEffect(() => {
        const isAdmin = localStorage.getItem('adminLoggedIn');
        if (!isAdmin) {
            history.push('/home');
            return;
        }
        loadBlockchain();
    }, []);

    const loadBlockchain = async () => {
        setLoading(true);
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setCurrentaccount(accounts[0]);
                
                const networkId = await web3.eth.net.getId();
                const networkData = SupplyChainABI.networks[networkId];
                
                if (networkData) {
                    const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
                    setSupplyChain(supplychain);
                    await loadStakeholders(supplychain);
                }
            }
        } catch (error) {
            console.error('Error loading blockchain:', error);
        }
        setLoading(false);
    };

    const loadStakeholders = async (contract) => {
        try {
            // Load Suppliers
            const rmsCount = await contract.methods.rmsCtr().call();
            const suppliers = [];
            for (let i = 1; i <= rmsCount; i++) {
                const supplier = await contract.methods.RMS(i).call();
                suppliers.push({ id: i, name: supplier.name, address: supplier.addr, place: supplier.place });
            }
            
            // Load Manufacturers
            const manCount = await contract.methods.manCtr().call();
            const manufacturers = [];
            for (let i = 1; i <= manCount; i++) {
                const manufacturer = await contract.methods.MAN(i).call();
                manufacturers.push({ id: i, name: manufacturer.name, address: manufacturer.addr, place: manufacturer.place });
            }
            
            // Load Distributors
            const disCount = await contract.methods.disCtr().call();
            const distributors = [];
            for (let i = 1; i <= disCount; i++) {
                const distributor = await contract.methods.DIS(i).call();
                distributors.push({ id: i, name: distributor.name, address: distributor.addr, place: distributor.place });
            }
            
            // Load Retailers
            const retCount = await contract.methods.retCtr().call();
            const retailers = [];
            for (let i = 1; i <= retCount; i++) {
                const retailer = await contract.methods.RET(i).call();
                retailers.push({ id: i, name: retailer.name, address: retailer.addr, place: retailer.place });
            }
            
            setStakeholders({ suppliers, manufacturers, distributors, retailers });
        } catch (error) {
            console.error('Error loading stakeholders:', error);
        }
    };

    const generateQRForStakeholder = (role, stakeholder) => {
        const loginData = {
            role: role,
            stakeholderId: stakeholder.id,
            name: stakeholder.name,
            address: stakeholder.address,
            timestamp: Date.now()
        };
        
        const qrString = JSON.stringify(loginData);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;
        setShowQR({ role, stakeholder, qrUrl, data: loginData });
    };

    // Replace the existing downloadQR function with this:

const downloadQR = async () => {
    if (showQR) {
        try {
            // Fetch the image from the URL
            const response = await fetch(showQR.qrUrl);
            const blob = await response.blob();
            
            // Create a download link
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `${showQR.role}-${showQR.stakeholder.id}-${showQR.stakeholder.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            alert('✅ QR Code downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download. Please try again.');
        }
    }
};

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminRole');
        localStorage.removeItem('adminLoginTime');
        history.push('/login');
    };

    if (loading) {
        return <div className="loading">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>👑 Admin Dashboard</h1>
                <div className="admin-info">
                    <span>Account: {currentaccount.substring(0, 10)}...{currentaccount.substring(-8)}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
            
            <div className="admin-content">
                {/* Suppliers Section */}
                <div className="stakeholder-section">
                    <h2>🌾 Suppliers (Farmers)</h2>
                    {stakeholders.suppliers.length === 0 ? (
                        <p className="no-data">No suppliers registered yet. Go to Register page to add.</p>
                    ) : (
                        <table className="stakeholder-table">
                            <thead>
                                <tr><th>ID</th><th>Name</th><th>Location</th><th>QR Code</th></tr>
                            </thead>
                            <tbody>
                                {stakeholders.suppliers.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td><td>{s.name}</td><td>{s.place}</td>
                                        <td><button onClick={() => generateQRForStakeholder('supplier', s)} className="qr-btn">Generate QR</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                {/* Manufacturers Section */}
                <div className="stakeholder-section">
                    <h2>🏭 Manufacturers</h2>
                    {stakeholders.manufacturers.length === 0 ? (
                        <p className="no-data">No manufacturers registered yet. Go to Register page to add.</p>
                    ) : (
                        <table className="stakeholder-table">
                            <thead><tr><th>ID</th><th>Name</th><th>Location</th><th>QR Code</th></tr></thead>
                            <tbody>
                                {stakeholders.manufacturers.map(m => (
                                    <tr key={m.id}>
                                        <td>{m.id}</td><td>{m.name}</td><td>{m.place}</td>
                                        <td><button onClick={() => generateQRForStakeholder('manufacturer', m)} className="qr-btn">Generate QR</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                {/* Distributors Section */}
                <div className="stakeholder-section">
                    <h2>🚚 Distributors</h2>
                    {stakeholders.distributors.length === 0 ? (
                        <p className="no-data">No distributors registered yet. Go to Register page to add.</p>
                    ) : (
                        <table className="stakeholder-table">
                            <thead><tr><th>ID</th><th>Name</th><th>Location</th><th>QR Code</th></tr></thead>
                            <tbody>
                                {stakeholders.distributors.map(d => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td><td>{d.name}</td><td>{d.place}</td>
                                        <td><button onClick={() => generateQRForStakeholder('distributor', d)} className="qr-btn">Generate QR</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                {/* Retailers Section */}
                <div className="stakeholder-section">
                    <h2>🏪 Retailers</h2>
                    {stakeholders.retailers.length === 0 ? (
                        <p className="no-data">No retailers registered yet. Go to Register page to add.</p>
                    ) : (
                        <table className="stakeholder-table">
                            <thead><tr><th>ID</th><th>Name</th><th>Location</th><th>QR Code</th></tr></thead>
                            <tbody>
                                {stakeholders.retailers.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.id}</td><td>{r.name}</td><td>{r.place}</td>
                                        <td><button onClick={() => generateQRForStakeholder('retailer', r)} className="qr-btn">Generate QR</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                <div className="admin-actions">
                    <button onClick={() => history.push('/roles')} className="action-btn">➕ Register New Stakeholder</button>
                    <button onClick={() => history.push('/')} className="action-btn">🏠 Go to Home</button>
                </div>
            </div>
            
            {/* QR Modal */}
            {showQR && (
                <div className="qr-modal" onClick={() => setShowQR(null)}>
                    <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{showQR.role.toUpperCase()} QR Code</h3>
                        <p><strong>Name:</strong> {showQR.stakeholder.name}</p>
                        <p><strong>ID:</strong> {showQR.stakeholder.id}</p>
                        <img src={showQR.qrUrl} alt="QR Code" className="qr-image" />
                        <div className="qr-actions">
                            <button onClick={downloadQR} className="download-btn">📥 Download QR</button>
                            <button onClick={() => window.print()} className="print-btn">🖨️ Print</button>
                            <button onClick={() => setShowQR(null)} className="close-btn">Close</button>
                        </div>
                        <p className="qr-note">Share this QR code with the stakeholder to login</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;