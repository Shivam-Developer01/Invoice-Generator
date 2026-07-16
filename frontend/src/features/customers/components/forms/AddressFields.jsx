import { Row, Col, Form } from "react-bootstrap";

function AddressFields({ title, prefix, register, errors }) {
  const addressErrors = errors?.[prefix] || {};

  return (
    <fieldset className="mb-4">
      <legend className="fs-6 fw-semibold mb-3">{title}</legend>

      <Row className="g-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Address Line 1</Form.Label>

            <Form.Control
              type="text"
              {...register(`${prefix}.addressLine1`)}
              isInvalid={!!addressErrors.addressLine1}
            />

            <Form.Control.Feedback type="invalid">
              {addressErrors.addressLine1?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label>Address Line 2</Form.Label>

            <Form.Control type="text" {...register(`${prefix}.addressLine2`)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>City</Form.Label>

            <Form.Control type="text" {...register(`${prefix}.city`)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>State</Form.Label>

            <Form.Control type="text" {...register(`${prefix}.state`)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Country</Form.Label>

            <Form.Control
              type="text"
              placeholder="India"
              {...register(`${prefix}.country`)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Pincode</Form.Label>

            <Form.Control type="text" {...register(`${prefix}.pincode`)} />
          </Form.Group>
        </Col>
      </Row>
    </fieldset>
  );
}

export default AddressFields;
