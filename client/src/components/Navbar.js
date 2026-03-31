import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';
import logob from '../assets/logob.png';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Admin role takes priority over user role
        const role = localStorage.getItem('adminRole') || localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        history.push('/login');
    };

    const getLinks = () => {
        // Admin menu - REMOVED Metrics link
        if (userRole === 'admin') {
            return [
                { name: 'Register', link: '/roles' },
                { name: 'Place Order', link: '/addproducts' },
                { name: 'Track Food Items', link: '/track' },
                { name: 'Generate QR', link: '/qrcode' }
                // { name: 'Metrics', link: '/admin-metrics' } ← REMOVE THIS LINE
            ];
        }
        
        // Stakeholder menu
        if (userRole === 'supplier' || userRole === 'manufacturer' || userRole === 'distributor' || userRole === 'retailer') {
            return [
                { name: 'Manage Supply Chain', link: '/supply' },
                { name: 'Track Food Items', link: '/track' },
                { name: 'Generate QR', link: '/qrcode' }
            ];
        }
        
        return [
            { name: 'Login', link: '/login' }
        ];
    };

    const links = getLinks();

    if (!userRole) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logob} alt="Logo" style={{ maxWidth: '100px', maxHeight: '40px', marginRight: '10px' }} />
                    AgroLedger
                </Link>

                <button className="navbar-toggler" type="button" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <IoMenu />}
                </button>

                <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        {links.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link to={link.link} className="nav-link" onClick={() => setOpen(false)}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm ms-2" style={{ marginLeft: '10px' }}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;