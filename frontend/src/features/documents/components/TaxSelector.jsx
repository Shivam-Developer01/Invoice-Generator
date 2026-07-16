import { Form, Row, Col } from "react-bootstrap";

const taxes = [
  { name: "CGST", percentage: 9 },
  { name: "SGST", percentage: 9 },
  { name: "IGST", percentage: 18 },
  { name: "UTGST", percentage: 9 },
  { name: "CESS", percentage: 1 },
];

function TaxSelector({ watch, setValue }) {
  const selectedTaxes = watch("taxes") || [];

  const handleChange = (tax, checked) => {
    if (checked) {
      setValue("taxes", [...selectedTaxes, tax]);
    } else {
      setValue(
        "taxes",
        selectedTaxes.filter((t) => t.name !== tax.name),
      );
    }
  };

  return (
    <>
      <h5 className="mb-3">Taxes</h5>

      <Row>
        {taxes.map((tax) => (
          <Col md={4} key={tax.name} className="mb-2">
            <Form.Check
              type="checkbox"
              label={`${tax.name} (${tax.percentage}%)`}
              checked={selectedTaxes.some((t) => t.name === tax.name)}
              onChange={(e) => handleChange(tax, e.target.checked)}
            />
          </Col>
        ))}
      </Row>
      <Form.Group className="mt-4">
        <Form.Label>Notes</Form.Label>

        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter notes..."
          {...register("notes")}
        />
      </Form.Group>
    </>
  );
}

export default TaxSelector;
