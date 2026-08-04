import { Modal, Row, Col } from "react-bootstrap";

function ViewCustomerModal({ show, customer, onClose }) {
  if (!customer) return null;

  const {
    customerCode,
    customerName,
    contactPerson,
    email,
    phone,
    gstin,
    pan,
    billingAddress,
    shippingAddress,
    isActive,
  } = customer;

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
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-4">
          <Col md={6}>
            <strong>Customer Code</strong>
            <div>{customerCode}</div>
          </Col>
          <Col md={6}>
            <strong>Customer Name</strong>
            <div>{customerName}</div>
          </Col>

          <Col md={6}>
            <strong>Contact Person</strong>
            <div>{contactPerson || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Email</strong>
            <div>{email || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Phone</strong>
            <div>{phone || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>GSTIN</strong>
            <div>{gstin || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>PAN</strong>
            <div>{pan || "-"}</div>
          </Col>

          <Col md={6}>
            <strong>Status</strong>

            <div>
              {isActive ? (
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
            <strong>Billing Address</strong>

            {renderAddress(billingAddress)}
          </Col>

          <Col md={6}>
            <strong>Shipping Address</strong>

            {renderAddress(shippingAddress)}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ViewCustomerModal;
