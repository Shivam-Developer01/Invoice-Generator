import { Row, Col, Form } from "react-bootstrap";

function DocumentSection({ register }) {
  return (
    <>
      <h5 className="mb-3 mt-4">Document Information</h5>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Document Date</Form.Label>

            <Form.Control type="date" {...register("documentDate")} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>

            <Form.Control type="date" {...register("dueDate")} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

export default DocumentSection;
