import { Form } from "react-bootstrap";

function CustomerSelect({ customers, register, errors }) {

  return (
    <Form.Group className="mb-4">
      <Form.Label>Customer</Form.Label>

      <Form.Select {...register("customerId")} isInvalid={!!errors.customerId}>
        <option value="">Select Customer</option>

        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.customerName}
            {!customer.isActive ? " (Inactive)" : ""}
          </option>
        ))}
      </Form.Select>

      <Form.Control.Feedback type="invalid">
        {errors.customerId?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default CustomerSelect;
