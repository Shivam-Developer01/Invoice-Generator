import { Modal } from "react-bootstrap";

import PrimaryButton from "../Button/PrimaryButton";

function ConfirmationModal({
  show,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <PrimaryButton variant="secondary" onClick={onClose}>
          {cancelText}
        </PrimaryButton>

        <PrimaryButton variant={variant} loading={loading} onClick={onConfirm}>
          {confirmText}
        </PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
