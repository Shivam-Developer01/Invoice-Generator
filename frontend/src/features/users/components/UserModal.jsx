import { useEffect } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

import userSchema from "../validation/userSchema";

import useCreateUser from "../hooks/useCreateUser";
import useUpdateUser from "../hooks/useUpdateUser";

function UserModal({ show, onClose, user }) {
  const isEditMode = Boolean(user);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema(isEditMode)),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "OTHERS",
    },
  });

  useEffect(() => {
    if (!show) return;

    if (isEditMode) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role.replaceAll("-", "_").toUpperCase(),
      });
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role: "OTHERS",
      });
    }
  }, [show, user, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateUserMutation.mutateAsync({
          id: user._id,
          data,
        });
      } else {
        await createUserMutation.mutateAsync(data);
      }

      onClose();
    } catch {}
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit User" : "Create User"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>

                <Form.Control {...register("name")} isInvalid={!!errors.name} />

                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>

                <Form.Control
                  {...register("email")}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {!isEditMode && (
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    {...register("password")}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}

            <Col md={12}>
              <Form.Group>
                <Form.Label>Role</Form.Label>

                <Form.Select {...register("role")} isInvalid={!!errors.role}>
                  <option value="CO_FOUNDER">Co-Founder</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ACCOUNTANT">Accountant</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.role?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <PrimaryButton
            type="submit"
            loading={
              isEditMode
                ? updateUserMutation.isPending
                : createUserMutation.isPending
            }
          >
            {isEditMode ? "Update User" : "Create User"}
          </PrimaryButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UserModal;
