import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import useCreateSacCode from "../hooks/useCreateSacCode";

function AddSacCodeModal({ show, onClose, onSuccess }) {
  const mutation = useCreateSacCode();

  const [formData, setFormData] = useState({
    code: "",
    description: "",
  });

  useEffect(() => {
    if (show) {
      setFormData({
        code: "",
        description: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await mutation.mutateAsync(formData);

      onSuccess?.(response.data);

      onClose();
    } catch {}
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add SAC Code</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>SAC Code</Form.Label>

          <Form.Control
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="998314"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>

          <Form.Control
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Software Development Services"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSacCodeModal;
