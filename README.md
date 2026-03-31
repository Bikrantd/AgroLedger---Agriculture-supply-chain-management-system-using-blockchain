# 🌾 Agroledger - Blockchain Food Supply Chain Management System

Agroledger is a decentralized supply chain management system built on Ethereum blockchain that enables transparent tracking of agricultural products from farm to table.

[![Solidity](https://img.shields.io/badge/Solidity-0.8.x-blue)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.x-green)](https://reactjs.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-1.10.x-yellow)](https://web3js.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 📋 Quick Setup

### Prerequisites

| Software | Version | Download |
|----------|---------|----------|
| Node.js | v16+ | [nodejs.org](https://nodejs.org/) |
| Ganache | Latest | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| MetaMask | Latest | [metamask.io](https://metamask.io/) |
| Truffle | v5+ | `npm install -g truffle` |


# 🌾 Agroledger - Blockchain Food Supply Chain Management System

Agroledger is a decentralized supply chain management system built on Ethereum blockchain that enables transparent tracking of agricultural products from farm to table. The system connects farmers, manufacturers, distributors, retailers, and consumers through a secure, immutable platform.

[![Solidity](https://img.shields.io/badge/Solidity-0.8.x-blue)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.x-green)](https://reactjs.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-1.10.x-yellow)](https://web3js.org/)
[![Truffle](https://img.shields.io/badge/Truffle-5.x-orange)](https://trufflesuite.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [EmailJS Setup](#emailjs-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Login Credentials](#login-credentials)
- [Project Structure](#project-structure)
- [Role Permissions](#role-permissions)
- [Supply Chain Stages](#supply-chain-stages)
- [Performance Metrics](#performance-metrics)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

| Software | Version | Purpose | Download Link |
|----------|---------|---------|---------------|
| Node.js | v16+ | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| npm | v8+ | Package manager | Comes with Node.js |
| Ganache | Latest | Local blockchain | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| MetaMask | Latest | Browser wallet | [metamask.io](https://metamask.io/) |
| Truffle | v5+ | Smart contract deployment | `npm install -g truffle` |
| Git | Latest | Version control | [git-scm.com](https://git-scm.com/) |

---

## 🚀 Installation

### Step 1: Clone the Repository

Open your terminal and run:
git clone https://github.com/Bikrantd/AgroLedger.git
cd AgroLedger

Step 2: Install Backend Dependencies
npm install

Step 3: Install Frontend Dependencies
cd client
npm install
cd ..

Step 4: Start Ganache (Local Blockchain)
Open Ganache application
Click "Quickstart" or "New Workspace"
Ensure it's running on:
RPC Server: http://127.0.0.1:7545
Network ID: 1337
Keep Ganache running in the background

Step 5: Compile and Deploy Smart Contracts
truffle compile
truffle migrate --reset

Step 6: Import Ganache Account to MetaMask
Open MetaMask browser extension
Click account icon → "Add account" → "Import account"
In Ganache, click the key icon next to Account 0
Copy the private key
Paste in MetaMask and click "Import"
Add Custom Network:
Network Name: Ganache
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol: ETH
Switch to the Ganache network

----------------------------------------------------
EmailJS Setup (Required for Admin OTP)
Admin login requires OTP verification via email. Set up a free EmailJS account.
Step 1: Create EmailJS Account
Go to EmailJS.com
Click "Sign Up Free"
Sign up with Google or GitHub (no credit card required)
Free tier: 200 emails/month
Step 2: Create Email Service
Click "Email Services" in the left sidebar
Click "Add New Service"
Select "Gmail" (or any email provider)
Connect your Gmail account
Name it: agroledger_service
Copy your Service ID (format: service_xxxxxxx)


Step 3: Create Email Template
Click "Email Templates" in the left sidebar
Click "Create New Template"
Select "One-Time Password" or "Blank Template"
Field	Value
Template Name	Agroledger Admin OTP
Subject	Your Agroledger Admin Login OTP
To	{{to_email}}

<h1>🌾 Agroledger</h1>
<h2>Admin Login OTP</h2>
<p>Your One-Time Password is:</p>
<div style="background:#f0f0f0; padding:15px; text-align:center; font-size:28px;">
    <strong>{{passcode}}</strong>
</div>
<p>This OTP is valid for 15 minutes.</p>
<p>If you didn't request this, please ignore this email.</p>
Click "Save"
Copy your Template ID (format: template_xxxxxxx)

Step 4: Get Your Public Key
Click "Account" (top right) → "API Keys"
Copy your Public Key (format: yTsJIoBTI6CL8zAlr)

Environment Variables
Create a .env file in the client folder.

------------------=============
Add the following to .env:
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

# Admin Credentials
REACT_APP_ADMIN_EMAIL=your_email@gmail.com   
REACT_APP_ADMIN_PASSWORD=Admin123! for example

🏃 Running the Project
cd client
npm start


---------------
👥 Login Credentials
Role	Login Method	Credentials
Admin	Email + Password + OTP	Email: your_email@gmail.com
Password: Admin123!
Farmer	QR Code	Scan QR from Admin Dashboard
Manufacturer	QR Code	Scan QR from Admin Dashboard
Distributor	QR Code	Scan QR from Admin Dashboard
Retailer	QR Code	Scan QR from Admin Dashboard


📈 Performance Metrics
Metric	Value
Transaction Success Rate	100%
Average Gas per Transaction	98,500 gas units
Total Gas Used	4,137,000 gas units
System Throughput	0.43 transactions/second
Average Block Time	2.3 seconds
Traceability Score	62.5%

Troubleshooting 🔧
Issue	Solution
MetaMask not connecting	Start Ganache. Check network: Custom RPC http://127.0.0.1:7545, Chain ID 1337
Contract not deployed	Run truffle migrate --reset. Verify Ganache is running
OTP email not received	Check spam folder. Verify EmailJS credentials in .env
Invalid OTP	OTP expires in 15 minutes. Click "Resend" or request new OTP
"addMedicine is not a function"	Run truffle migrate --reset. Ensure all roles are registered
Blank page after login	Open browser console (F12). Check MetaMask connection
Gas estimation failed	Register all roles first (Admin must register farmers, manufacturers, etc.)

📚 Documentation
https://img.shields.io/badge/Full%2520Report-PDF-brightgreen

For complete project documentation including system architecture, smart contract details, UI screenshots, performance analysis, and testing results, download the full report.

Download Full Project Report

 Ganache Network Settings
Setting	Value
RPC URL	http://127.0.0.1:7545 or 1337 its depend on version
Chain ID	1337
Currency Symbol	ETH


  ===========================================================================================
                               ⭐ Support
                   GitHub Repository: Bikrantd/AgroLedger
               Star this repository if you found it helpful!
