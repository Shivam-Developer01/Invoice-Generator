import { Modal, Row, Col, Table } from "react-bootstrap";
import { formatDate } from "../../../utils/formatDateTime";

function ViewDocumentModal({ show, document, onClose }) {
  if (!document) return null;

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{document.documentNumber}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-4 mb-4">
          <Col md={6}>
            <strong>Document Type</strong>
            <div>{document.documentType.replace("_", " ")}</div>
          </Col>

          <Col md={6}>
            <strong>Document Date</strong>
            <div>{formatDate(document.documentDate)}</div>
          </Col>

          <Col md={6}>
            <strong>Customer</strong>
            <div>{document.customerSnapshot.customerName}</div>
          </Col>

          <Col md={6}>
            <strong>Due Date</strong>
            <div>
              {document.dueDate
                ? formatDate(document.documentDate)
                : "-"}
            </div>
          </Col>
        </Row>

        <h5 className="mb-3">Items</h5>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>HSN/SAC</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>

          <tbody>
            {document.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>

                <td>{item.hsnSacCode || "-"}</td>

                <td className="text-end">₹{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end mt-4">
          <div style={{ minWidth: "320px" }}>
            <Table borderless size="sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Subtotal</strong>
                  </td>

                  <td className="text-end">₹{document.subtotal.toFixed(2)}</td>
                </tr>

                {document.taxes.map((tax) => (
                  <tr key={tax.name}>
                    <td>
                      {tax.name} ({tax.percentage}%)
                    </td>

                    <td className="text-end">₹{tax.amount.toFixed(2)}</td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <strong>Total Tax</strong>
                  </td>

                  <td className="text-end">
                    <strong>₹{document.totalTax.toFixed(2)}</strong>
                  </td>
                </tr>

                <tr className="table-primary">
                  <td>
                    <strong>Grand Total</strong>
                  </td>

                  <td className="text-end">
                    <strong>₹{document.totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        {document.notes && (
          <>
            <h5 className="mt-4">Notes</h5>

            <p className="mb-0">{document.notes}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewDocumentModal;
