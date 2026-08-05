import { Modal, Row, Col } from "react-bootstrap";

function ViewCompanyModal({ show, company, onClose }) {
  if (!company) return null;

  const renderAddress = (address) => (
    <>
      <div>{address?.addressLine1 || "-"}</div>

      {address?.addressLine2 && <div>{address.addressLine2}</div>}

      <div>
        {address?.city || "-"}, {address?.state || "-"}
      </div>

      <div>
        {address?.country || "-"} - {address?.pincode || "-"}
      </div>
    </>
  );

  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Company Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <strong>Company Logo</strong>

        <div className="mb-4 mt-2">
          {company.logoUrl ? (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${company.logoUrl}?v=${company.updatedAt}`}
              alt={company.companyName}
              className="img-thumbnail shadow-sm"
              style={{
                width: 140,
                height: 140,
                objectFit: "contain",
                borderRadius: 12,
                padding: 10,
                background: "#fff",
              }}
            />
          ) : (
            <div
              className="border rounded-3 d-flex justify-content-center align-items-center bg-light"
              style={{
                width: 140,
                height: 140,
              }}
            >
              <span className="text-muted">No Logo</span>
            </div>
          )}
        </div>

        <Row className="g-4">
          <Col md={6}>
            <strong>Company Name</strong>
            <div>{company.companyName}</div>
          </Col>

          <Col md={6}>
            <strong>GSTIN</strong>
            <div>{company.gstin}</div>
          </Col>

          <Col md={6}>
            <strong>PAN</strong>
            <div>{company.pan}</div>
          </Col>

          <Col md={6}>
            <strong>Phone</strong>
            <div>{company.phone}</div>
          </Col>

          <Col md={6}>
            <strong>Email</strong>
            <div>{company.email}</div>
          </Col>

          <Col md={6}>
            <strong>Website</strong>
            <div>{company.website || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Status</strong>
            <div>
              {company.isActive ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-danger">Inactive</span>
              )}
            </div>
          </Col>

          <Col md={12}>
            <hr />
          </Col>

          <Col md={6}>
            <strong>Registered Office</strong>
            {renderAddress(company.addresses?.registeredOffice)}
          </Col>

          <Col md={6}>
            <strong>Corporate Office</strong>
            {renderAddress(company.addresses?.corporateOffice)}
          </Col>

          <Col md={12}>
            <hr />
          </Col>

          <Col md={6}>
            <strong>Bank Name</strong>
            <div>{company.bankDetails?.bankName || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Branch</strong>
            <div>{company.bankDetails?.branch || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Account Name</strong>
            <div>{company.bankDetails?.accountName || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Account Number</strong>
            <div>{company.bankDetails?.accountNumber || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>IFSC Code</strong>
            <div>{company.bankDetails?.ifscCode || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>UPI ID</strong>
            <div>{company.bankDetails?.upiId || "-"}</div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ViewCompanyModal;
