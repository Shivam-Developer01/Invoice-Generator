import { Modal } from "react-bootstrap";

import CompanyForm from "./CompanyForm";

function CompanyModal({ show, company, onClose }) {
  const isEditMode = Boolean(company);

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? `Edit Company — ${company.companyName}` : "Add Company"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CompanyForm company={company} onClose={onClose} onSuccess={onClose} />
      </Modal.Body>
    </Modal>
  );
}

export default CompanyModal;
