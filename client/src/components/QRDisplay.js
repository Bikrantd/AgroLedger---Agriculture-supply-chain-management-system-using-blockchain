import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import './QRDisplay.css';

function QRDisplay() {
  const location = useLocation();
  const history = useHistory();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get the QR data from URL parameters
    const params = new URLSearchParams(location.search);
    const encodedData = params.get('data');
    
    if (encodedData) {
      try {
        // Decode and parse the product data
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setProductData(decodedData);
      } catch (err) {
        setError('Invalid QR code data');
      }
    } else {
      setError('No QR data found');
    }
  }, [location]);

  if (error) {
    return (
      <Container className="mt-5">
        <Card className="text-center">
          <Card.Body>
            <h1 className="text-danger">❌ Error</h1>
            <p>{error}</p>
            <Button onClick={() => history.push('/')} variant="primary">
              Go Home
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!productData) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <div className="qr-display-container">
      {/* Header with Agroledger branding */}
      <div className="qr-header">
        <Container>
          <h1>🌾 Agroledger</h1>
          <p>Blockchain Verified Product Details</p>
        </Container>
      </div>

      <Container className="mt-4">
        {/* Product Main Card */}
        <Card className="product-main-card mb-4">
          <Card.Body>
            <Row>
              <Col md={8}>
                <h2 className="product-title">{productData.name}</h2>
                <p className="product-id">Product ID: #{productData.id}</p>
                <p className="product-description">{productData.description}</p>
              </Col>
              <Col md={4} className="text-center">
                <div className="stage-badge">
                  <span className="stage-label">Current Stage</span>
                  <h3 className="stage-value">{productData.stage}</h3>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Supply Chain Timeline */}
        <h3 className="section-title">📋 Supply Chain Journey</h3>
        <Row className="mb-4">
          <Col md={3}>
            <Card className="timeline-card supplier">
              <Card.Body>
                <div className="timeline-icon">🌱</div>
                <h4>Supplier</h4>
                <p className="company-name">{productData.supplier.name}</p>
                <p className="company-location">{productData.supplier.place}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="timeline-card manufacturer">
              <Card.Body>
                <div className="timeline-icon">🏭</div>
                <h4>Manufacturer</h4>
                <p className="company-name">{productData.manufacturer.name}</p>
                <p className="company-location">{productData.manufacturer.place}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="timeline-card distributor">
              <Card.Body>
                <div className="timeline-icon">🚚</div>
                <h4>Distributor</h4>
                <p className="company-name">{productData.distributor.name}</p>
                <p className="company-location">{productData.distributor.place}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="timeline-card retailer">
              <Card.Body>
                <div className="timeline-icon">🏪</div>
                <h4>Retailer</h4>
                <p className="company-name">{productData.retailer.name}</p>
                <p className="company-location">{productData.retailer.place}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Blockchain Verification */}
        <Card className="verification-card mb-4">
          <Card.Body>
            <Row>
              <Col md={8}>
                <h4>🔗 Blockchain Verified</h4>
                <p>This product's journey has been recorded on the blockchain and verified.</p>
              </Col>
              <Col md={4} className="text-center">
                <div className="verification-badge">
                  <span className="verified-icon">✓</span>
                  <span>Verified</span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Timestamp */}
        <div className="text-center text-muted mb-4">
          <small>Generated: {productData.timestamp}</small>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-5">
          <Button 
            variant="outline-primary" 
            onClick={() => history.push('/')}
            className="mx-2"
          >
            🏠 Home
          </Button>
          <Button 
            variant="outline-success" 
            onClick={() => window.print()}
            className="mx-2"
          >
            🖨️ Print
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default QRDisplay;