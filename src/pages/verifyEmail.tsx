import React, { useState, useEffect } from "react";
import { Card, Alert, Spinner } from "react-bootstrap";

const VerifyEmailPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Simulate email verification process
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Simulate an API call to verify the email
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
        setSuccess("Your email has been successfully verified!");
      } catch (err) {
        setError("Failed to verify your email. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="verify-email-card" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Verify Email</h2>
          {loading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Verifying your email...</p>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          {!loading && !error && !success && (
            <Alert variant="info">Please wait while we verify your email.</Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;