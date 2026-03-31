import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { QrReader } from 'react-qr-reader'; // Named import
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';

function QRScanner() {
    const history = useHistory();
    const [scanning, setScanning] = useState(true);
    const [error, setError] = useState('');

    const handleScan = (data) => {
        if (data) {
            console.log("Scanned:", data);
            
            if (data.includes('productId=')) {
                const productId = data.split('productId=')[1].split('&')[0];
                history.push(`/track?productId=${productId}`);
            } 
            else if (!isNaN(data) && data.trim() !== '') {
                history.push(`/track?productId=${data}`);
            }
            else {
                setError('Invalid QR Code - No Product ID found');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <Card>
                        <Card.Header>
                            <h3>Scan Product QR Code</h3>
                        </Card.Header>
                        <Card.Body>
                            {error && (
                                <Alert variant="danger" onClose={() => setError('')} dismissible>
                                    {error}
                                </Alert>
                            )}
                            
                            {scanning ? (
                                <div>
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
                                    <p className="text-center mt-3 text-muted">
                                        Position QR code in front of camera
                                    </p>
                                </div>
                            ) : null}
                            
                            <div className="text-center mt-3">
                                <Button 
                                    variant="secondary"
                                    onClick={() => history.push('/track')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default QRScanner;