import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";

// import Loader from "../../../components/ui/Loader/Loader";

import routes from "../../../config/routes";

import useRecentDocuments from "../hooks/useRecentDocuments";

import { Badge } from "react-bootstrap";
import StatCardSkeleton from "./StatCardSkeleton";

function RecentDocuments() {
  const { data, isLoading } = useRecentDocuments();

  const documents = data?.data || [];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body
        style={{
          minHeight: "420px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <FaFileInvoice className="me-2 text-primary" />
            Recent Documents
          </h5>

          <Link
            to={routes.DOCUMENTS}
            className="text-decoration-none small fw-semibold"
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <StatCardSkeleton rows={5} />
        ) : documents.length === 0 ? (
          <p className="text-muted mb-0">No documents found.</p>
        ) : (
          documents.map((document, index) => (
            <div key={document._id}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">{document.documentNumber}</h6>

                  <p className="text-muted small mb-1">
                    {document.customerId?.customerName}
                  </p>

                  <Badge
                    bg={
                      document.documentType === "INVOICE"
                        ? "success"
                        : document.documentType === "PROFORMA"
                          ? "primary"
                          : "warning"
                    }
                  >
                    {document.documentType.replaceAll("_", " ")}
                  </Badge>
                </div>

                <div className="text-end">
                  <h6 className="mb-1">
                    ₹
                    {document.totalAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h6>

                  <small className="text-muted">
                    {new Date(document.documentDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </small>
                </div>
              </div>

              {index !== documents.length - 1 && <hr className="my-3" />}
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}

export default RecentDocuments;
