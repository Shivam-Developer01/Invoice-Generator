import { Modal, Badge, Row, Col } from "react-bootstrap";
import { formatDateTime } from "../../../utils/formatDateTime";

function ViewUserModal({ show, onClose, user }) {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="gy-3">
          <Col xs={5}>
            <strong>Name</strong>
          </Col>

          <Col xs={7}>{user.name}</Col>

          <Col xs={5}>
            <strong>Email</strong>
          </Col>

          <Col xs={7}>{user.email}</Col>

          <Col xs={5}>
            <strong>Role</strong>
          </Col>

          <Col xs={7}>{user.role.replaceAll("_", " ")}</Col>

          <Col xs={5}>
            <strong>Status</strong>
          </Col>

          <Col xs={7}>
            <Badge bg={user.isActive ? "success" : "danger"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </Col>

          <Col xs={5}>
            <strong>Created At</strong>
          </Col>

          <Col xs={7}>{formatDateTime(user.createdAt)}</Col>

          <Col xs={5}>
            <strong>Updated At</strong>
          </Col>

          <Col xs={7}>{formatDateTime(user.updatedAt)}</Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ViewUserModal;
