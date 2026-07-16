import { Badge, Card } from "react-bootstrap";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

import { useAuth } from "../../../context/AuthContext";

import ROLE_LABELS from "../../../constants/roleLabels";

import { useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import { formatDateTime } from "../../../utils/formatDateTime";

function ProfilePage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Profile" subtitle="View your account information." />

      <Section>
        <Card
          className="border-0 shadow-sm mx-auto"
          style={{ maxWidth: "750px" }}
        >
          <Card.Body className="p-5">
            <div className="text-center mb-5">
              <div
                className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 100,
                  height: 100,
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-3 mb-2">{user?.name}</h3>

              <Badge bg="secondary">{ROLE_LABELS[user?.role]}</Badge>
            </div>

            <div className="border-top">
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <span>Name</span>
                <strong>{user?.name}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <span>Email</span>
                <strong>{user?.email}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <span>Role</span>
                <strong>{ROLE_LABELS[user?.role]}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <span>Status</span>

                <Badge bg={user?.isActive ? "success" : "danger"}>
                  {user?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <span>Created At</span>

                <strong>{formatDateTime(user.createdAt)}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center py-3">
                <span>Updated At</span>

                <strong>{formatDateTime(user.updatedAt)}</strong>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-5">
              <PrimaryButton onClick={() => navigate(routes.CHANGE_PASSWORD)}>
                Change Password
              </PrimaryButton>
            </div>
          </Card.Body>
        </Card>
      </Section>
    </>
  );
}

export default ProfilePage;
