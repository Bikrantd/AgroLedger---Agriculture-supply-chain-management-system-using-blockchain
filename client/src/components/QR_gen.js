import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";

function QRGenerator() {
  const [productId, setProductId] = useState('');
  const [qr, setQr] = useState('');
  const [loading, setLoading] = useState(false);
  const [SupplyChain, setSupplyChain] = useState();
  const [currentaccount, setCurrentaccount] = useState("");

  useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      loadBlockchainData();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      loadBlockchainData();
    } else {
      alert("Please install MetaMask");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setCurrentaccount(accounts[0]);
    
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    
    if (networkData) {
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(supplychain);
    }
  };

  const generateQRCode = async () => {
    if (!productId) {
      alert('Please enter a Product ID');
      return;
    }

    if (!SupplyChain) {
      alert('Blockchain not connected. Please make sure MetaMask is connected.');
      return;
    }

    setLoading(true);
    
    try {
      const product = await SupplyChain.methods.MedicineStock(productId).call();
      const stage = await SupplyChain.methods.showStage(productId).call();
      const supplier = await SupplyChain.methods.RMS(product.RMSid).call();
      const manufacturer = await SupplyChain.methods.MAN(product.MANid).call();
      const distributor = await SupplyChain.methods.DIS(product.DISid).call();
      const retailer = await SupplyChain.methods.RET(product.RETid).call();
      
      const textDetails = 
`AGROLEDGER PRODUCT DETAILS
===========================

PRODUCT INFORMATION
-------------------
Product ID: ${product.id}
Name: ${product.name}
Description: ${product.description}
Current Stage: ${stage.replace(/Medicine|med|MED|Med/g, 'Product')}

SUPPLIER INFORMATION
--------------------
Supplier ID: ${supplier.id}
Name: ${supplier.name}
Location: ${supplier.place}
Contact: ${supplier.eSewaId || 'N/A'}

MANUFACTURER INFORMATION
------------------------
Manufacturer ID: ${manufacturer.id}
Name: ${manufacturer.name}
Location: ${manufacturer.place}

DISTRIBUTOR INFORMATION
-----------------------
Distributor ID: ${distributor.id}
Name: ${distributor.name}
Location: ${distributor.place}

RETAILER INFORMATION
--------------------
Retailer ID: ${retailer.id}
Name: ${retailer.name}
Location: ${retailer.place}

VERIFICATION
------------
Status: ✅ Verified on Blockchain
Generated: ${new Date().toLocaleString()}

This product's journey is recorded on the blockchain.
Scan with any QR reader to verify.`;

      QRCode.toDataURL(textDetails, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      }, (err, url) => {
        if (err) {
          console.error(err);
          alert('Error generating QR code');
          setLoading(false);
          return;
        }

        setQr(url);
        setLoading(false);
      });

    } catch (error) {
      console.error("Error:", error);
      alert('Error fetching product details');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">QR Code Generator</h2>
            </div>
            <div className="card-body">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Product ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="e.g. 1, 2, 3..."
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  onClick={generateQRCode}
                  disabled={loading}
                  size="lg"
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Generating...
                    </>
                  ) : 'Generate QR Code'}
                </Button>
              </Form>

              {qr && (
                <div className="mt-5 text-center">
                  <Image 
                    src={qr} 
                    alt="QR Code" 
                    fluid 
                    style={{ 
                      maxWidth: '300px',
                      border: '5px solid white',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }} 
                  />
                  
                  <div className="mt-4">
                    <Button
                      variant="success"
                      size="lg"
                      href={qr}
                      download={`product-${productId}.png`}
                    >
                      Download QR Code
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default QRGenerator;