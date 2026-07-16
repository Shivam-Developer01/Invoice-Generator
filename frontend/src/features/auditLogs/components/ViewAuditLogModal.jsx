import { Modal, Row, Col, Badge } from "react-bootstrap";

function ViewAuditLogModal({ show, onClose, log }) {
  if (!log) return null;

  const actionVariant = {
    CREATE: "success",
    UPDATE: "primary",
    DELETE: "danger",
    LOGIN: "dark",
    CHANGE_PASSWORD: "warning",
    REGENERATE_PDF: "info",
  };

  const entityVariant = {
    USER: "secondary",
    CUSTOMER: "info",
    COMPANY: "warning",
    DOCUMENT: "primary",
    DOCUMENT_SETTINGS: "dark",
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Audit Log Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="gy-3">
          <Col md={6}>
            <strong>User</strong>

            <div>{log.userName}</div>
          </Col>

          <Col md={6}>
            <strong>Time</strong>

            <div>{new Date(log.createdAt).toLocaleString()}</div>
          </Col>

          <Col md={6}>
            <strong>Action</strong>

            <div>
              <Badge bg={actionVariant[log.action]}>{log.action}</Badge>
            </div>
          </Col>

          <Col md={6}>
            <strong>Entity</strong>

            <div>
              <Badge bg={entityVariant[log.entityType]}>{log.entityType}</Badge>
            </div>
          </Col>

          <Col md={12}>
            <strong>Description</strong>

            <div>{log.description}</div>
          </Col>

          <Col md={12}>
            <strong>Metadata</strong>

            <pre
              className="bg-light border rounded p-3 mt-2"
              style={{
                maxHeight: "300px",
                overflow: "auto",
                fontSize: "0.85rem",
              }}
            >
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ViewAuditLogModal;
