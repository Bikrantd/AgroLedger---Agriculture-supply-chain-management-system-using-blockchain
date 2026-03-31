import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Import your existing components
import AssignRoles from './AssignRoles';
// import AdminMetrics from './pages/AdminMetrics'; ← REMOVE THIS LINE
import Home from './Home';
import AddProducts from './AddProducts';
import Supply from './Supply';
import Track from './Track';
import News from './News';
import Navbar from './components/Navbar';
import QRGenerator from './components/QR_gen';
import QRScanner from './components/QRScanner';
import QRDisplay from './components/QRDisplay';

// Import Login pages
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import StakeholderLogin from './pages/StakeholderLogin';

// Protected Route Component - Only shows if logged in
function PrivateRoute({ component: Component, ...rest }) {
    const isLoggedIn = localStorage.getItem('userLoggedIn') || localStorage.getItem('adminLoggedIn');
    
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <>
                        <Navbar />
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    {/* Redirect root to login */}
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    
                    {/* Public Routes - Login Pages */}
                    <Route path="/login" exact component={Login} />
                    <Route path="/admin-login" exact component={AdminLogin} />
                    <Route path="/stakeholder-login" exact component={StakeholderLogin} />
                    <Route path="/admin-dashboard" exact component={AdminDashboard} />
                    
                    {/* Protected Routes - Only after login */}
                    <PrivateRoute path="/home" exact component={Home} />
                    <PrivateRoute path="/roles" component={AssignRoles} />
                    <PrivateRoute path="/addproducts" component={AddProducts} />
                    <PrivateRoute path="/supply" component={Supply} />
                    <PrivateRoute path="/track" component={Track} />
                    <PrivateRoute path="/qrcode" component={QRGenerator} />
                    <PrivateRoute path="/scan-qr" component={QRScanner} />
                    <PrivateRoute path="/qr-display" component={QRDisplay} />
                    <PrivateRoute path="/news" component={News} />
                    {/* <PrivateRoute path="/admin-metrics" component={AdminMetrics} /> ← REMOVE THIS LINE */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;