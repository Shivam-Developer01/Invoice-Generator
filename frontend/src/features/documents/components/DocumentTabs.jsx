import { Nav } from "react-bootstrap";
import { useEffect } from "react";

import useDocument from "../context/useDocument";
import documentTypes from "../config/documentTypes";

function DocumentTabs({ isEditMode = false, document }) {
  const { documentType, setDocumentType } = useDocument();

  useEffect(() => {
    if (isEditMode && document?.documentType) {
      setDocumentType(document.documentType);
    }
  }, [document, isEditMode, setDocumentType]);

  return (
    <>
      <Nav
        variant="tabs"
        activeKey={documentType}
        className="mb-2"
        onSelect={(key) => {
          if (!isEditMode) {
            setDocumentType(key);
          }
        }}
      >
        {documentTypes.map((type) => (
          <Nav.Item key={type.value}>
            <Nav.Link
              eventKey={type.value}
              disabled={isEditMode && documentType !== type.value}
            >
              {type.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {isEditMode && (
        <small className="text-muted">
          Document type cannot be changed after creation.
        </small>
      )}
    </>
  );
}

export default DocumentTabs;
