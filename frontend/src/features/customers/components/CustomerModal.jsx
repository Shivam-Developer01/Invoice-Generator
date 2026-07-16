import { Modal } from "react-bootstrap";

import CustomerForm from "./CustomerForm";

function CustomerModal({ show, customer, onClose }) {
  const isEditMode = Boolean(customer);

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode
            ? `Edit Customer — ${customer.customerName}`
            : "Add Customer"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CustomerForm
          customer={customer}
          onClose={onClose}
          onSuccess={onClose}
        />
      </Modal.Body>
    </Modal>
  );
}

export default CustomerModal;
