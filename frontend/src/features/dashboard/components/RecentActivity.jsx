import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

// import Loader from "../../../components/ui/Loader/Loader";

import routes from "../../../config/routes";

import useRecentActivities from "../hooks/useRecentActivity";

import { formatDistanceToNow } from "date-fns";
import StatCardSkeleton from "./StatCardSkeleton";

function RecentActivity() {
  const { data, isLoading } = useRecentActivities();

  const activities = data?.data || [];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body
        style={{
          minHeight: "420px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <FaHistory className="me-2 text-primary" />
            Recent Activity
          </h5>

          <Link
            to={routes.AUDIT_LOGS}
            className="text-decoration-none small fw-semibold"
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <StatCardSkeleton rows={5} />
        ) : activities.length === 0 ? (
          <div className="text-center text-muted py-5">
            No recent activity available.
          </div>
        ) : (
          <div
            style={{
              overflowY: "auto",
              paddingRight: "6px",
            }}
          >
            {activities.map((activity, index) => (
              <div className="dashboard-list-item" key={activity._id}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: 42,
                        height: 42,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {activity.userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h6 className="mb-1">{activity.userName}</h6>

                      <p className="text-muted small mb-0">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  <small className="text-muted text-nowrap">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </small>
                </div>

                {index !== activities.length - 1 && <hr className="my-3" />}
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default RecentActivity;
