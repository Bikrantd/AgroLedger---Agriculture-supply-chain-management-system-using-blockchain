# AgroLedger---Agriculture-supply-chain-management-system-using-blockchain

Agroledger is a decentralized supply chain management system built on Ethereum blockchain that enables transparent tracking of agricultural products from farm to table. The system connects farmers, manufacturers, distributors, retailers, and consumers through a secure, immutable platform.

## ✨ Features

- **Role-Based Access Control**: Separate dashboards for Admin, Farmer, Manufacturer, Distributor, and Retailer
- **QR Code Integration**: Stakeholder login QR codes and product tracking QR codes
- **Real-Time Product Tracking**: Complete product journey from order to sale with 6 stages
- **Blockchain Immutability**: All transactions permanently recorded on Ethereum blockchain
- **Secure Authentication**: Admin login with email, password, and OTP verification
- **MetaMask Wallet Integration**: Secure transaction signing and user authentication
- **Performance Dashboard**: Real-time metrics including transaction success rate, gas usage, and traceability scores

---

## 🏗️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Blockchain** | Ethereum (Ganache for development) |
| **Smart Contract** | Solidity, Truffle |
| **Frontend** | React.js, Web3.js |
| **Wallet** | MetaMask |
| **Email Service** | EmailJS (OTP verification) |
| **Authentication** | QR Code Scanner, Email + OTP |

---

## 📋 Prerequisites

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | v16+ | JavaScript runtime |
| npm | v8+ | Package manager |
| Ganache | Latest | Local blockchain for development |
| MetaMask | Latest | Browser extension for wallet connection |
| Truffle | v5+ | Smart contract deployment |
| Git | Latest | Version control |

---

## 🚀 Installation Guide

### Step 1: Clone the Repository
git clone https://github.com/Bikrantd/AgroLedger---Agriculture-supply-chain-management-system-using-blockchain.git
cd AgroLedger

Step 2: Install Backend Dependencies
npm install

Step 3: Install Frontend Dependencies
cd client
npm install
cd ..

Step 4: Start Ganache
Open Ganache application

Click "New Workspace" or "Quickstart"

Ensure it's running on http://127.0.0.1:7545 or by deafault on http://127.0.0.1:1337

Note the accounts (Account 0 is the contract owner)

Step 5: Compile and Deploy Smart Contracts
bash
truffle compile
truffle migrate --reset
Step 6: Import Ganache Account to MetaMask
Open MetaMask browser extension

Click "Import Account"

Copy a private key from Ganache (Account 0 for admin)

Paste and import

Add Custom Network:

Network Name: Ganache

New RPC URL: http://127.0.0.1:7545

Chain ID: 1337

Currency Symbol: ETH

📧 EmailJS Setup (Required for Admin OTP)
Admin login requires email OTP verification. Set up a free EmailJS account.

Step 1: Create EmailJS Account
Go to EmailJS.com

Click "Sign Up Free"

Sign up using Google or GitHub (no credit card required)

Free tier: 200 emails/month (enough for admin login)

Step 2: Create Email Service
Click "Email Services" in the dashboard

Click "Add New Service"

Select "Gmail" (or any email provider)

Connect your Gmail account

Name it: agroledger_service

Copy your Service ID (starts with service_)

Step 3: Create Email Template
Click "Email Templates" in the dashboard

Click "Create New Template"

Choose "One-Time Password" or "Blank Template"

Field	Value
Template Name	Agroledger Admin OTP
Subject	Your Agroledger Admin Login OTP
To	{{to_email}}
Email Content:

html
<h1>🌾 Agroledger</h1>
<h2>Admin Login OTP</h2>
<p>Your One-Time Password is:</p>
<h2 style="background:#f0f0f0; padding:15px; text-align:center;">
    <strong>{{passcode}}</strong>
</h2>
<p>This OTP is valid for 15 minutes.</p>
<p>If you didn't request this, please ignore this email.</p>
Click "Save"

Copy your Template ID (starts with template_)

Step 4: Get Your Public Key
Click "Account" (top right) → "API Keys"

Copy your Public Key (starts with user_ or a string like yTsJIoBTI6CL8zAlr)

🔐 Environment Variables Setup
Create a .env file in the client folder:

bash
cd client
touch .env
Add the following content to .env:

env
# EmailJS Configuration (from steps above)
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

# Admin Credentials
REACT_APP_ADMIN_EMAIL=your_email@gmail.com
REACT_APP_ADMIN_PASSWORD=Admin123!
⚠️ Important: Never commit .env file to GitHub. It's already in .gitignore.

🏃 Running the Project
Start the React Frontend
bash
cd client
npm start
The app will open at http://localhost:3000

Login Credentials
User Type	Login Method	Credentials
Admin	Email + Password + OTP	Email: your_email@gmail.com
Password: Admin123!
Farmer	QR Code	Scan QR from Admin Dashboard
Manufacturer	QR Code	Scan QR from Admin Dashboard
Distributor	QR Code	Scan QR from Admin Dashboard
Retailer	QR Code	Scan QR from Admin Dashboard
📁 Project Structure
text
OriginChain/
├── contracts/
│   └── SupplyChain.sol          # Smart contract
├── client/
│   ├── src/
│   │   ├── pages/               # Login, Dashboard pages
│   │   ├── components/          # Navbar, QR components
│   │   ├── artifacts/           # Contract ABIs
│   │   └── services/
│   │       └── emailService.js  # EmailJS integration
│   ├── public/                  # Static assets
│   └── .env                     # Environment variables
├── migrations/                  # Truffle deployment scripts
├── test/                        # Contract tests
├── truffle-config.js
└── package.json

👥 Role-Based Access
Role	Permissions
Admin	Register stakeholders, place orders, generate QR codes, view metrics
Farmer	Supply raw materials, track products, generate product QR codes
Manufacturer	Process food products, track products, generate QR codes
Distributor	Distribute products, track products, generate QR codes
Retailer	Retail products, mark as sold, track products, generate QR codes
📊 Supply Chain Stages
Products progress through 6 stages:

text
Ordered → Supplied → Processed → Distributed → Retailed → Sold
📈 Performance Metrics
Metric	Value
Transaction Success Rate	100%
Average Gas per Transaction	98,500 gas units
System Throughput	0.43 transactions/second
Traceability Score	62.5%
🔧 Troubleshooting
Issue	Solution
MetaMask not connecting	Ensure Ganache is running and MetaMask is on Custom RPC http://127.0.0.1:7545 with Chain ID 1337
Contract not deployed	Run truffle migrate --reset
OTP email not received	Check spam folder, verify EmailJS credentials in .env
Invalid OTP	OTP expires in 15 minutes, request a new one
📄 License
MIT

🙏 Acknowledgments
Ethereum Blockchain

Truffle Framework

React.js

EmailJS

