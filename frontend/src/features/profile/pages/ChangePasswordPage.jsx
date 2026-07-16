import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import routes from "../../../config/routes";

import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

import changePasswordSchema from "../validation/changePasswordSchema";
import useChangePassword from "../hooks/useChangePassword";

function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changePasswordMutation = useChangePassword();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      reset();

      logout();

      navigate(routes.LOGIN, {
        replace: true,
      });
    } catch {
      // handled globally
    }
  };

  return (
    <>
      <Section>
        <Card
          className="border-0 shadow-sm mx-auto"
          style={{
            maxWidth: "750px",
          }}
        >
          <Card.Body className="p-5">
            <div className="text-center mb-5">
              <div
                className="rounded-circle bg-warning text-white d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 70,
                  height: 70,
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                🔒
              </div>

              <h4 className="mt-3">Change Password</h4>

              <p className="text-muted mb-0">
                Choose a strong password to keep your account secure.
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="gy-4 justify-content-center">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        {...register("currentPassword")}
                        isInvalid={!!errors.currentPassword}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>

                      <Form.Control.Feedback type="invalid">
                        {errors.currentPassword?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        {...register("newPassword")}
                        isInvalid={!!errors.newPassword}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>

                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        isInvalid={!!errors.confirmPassword}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>

                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-5">
                <PrimaryButton
                  type="submit"
                  loading={changePasswordMutation.isPending}
                  style={{
                    minWidth: "220px",
                  }}
                >
                  Change Password
                </PrimaryButton>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Section>
    </>
  );
}

export default ChangePasswordPage;
