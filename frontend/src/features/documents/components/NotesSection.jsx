import { Form } from "react-bootstrap";

function NotesSection({ register }) {
  return (
    <>
      <h5 className="mb-3 mt-4">Additional Notes</h5>

      <Form.Group>
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

export default NotesSection;
