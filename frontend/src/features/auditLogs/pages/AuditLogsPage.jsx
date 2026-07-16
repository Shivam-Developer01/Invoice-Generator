import { useMemo, useState } from "react";
import { Badge, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import DataTable from "../../../components/ui/DataTable/DataTable";
import Pagination from "../../../components/ui/Pagination/Pagination";
import TableActions from "../../../components/ui/TableActions/TableActions";

import ViewAuditLogModal from "../components/ViewAuditLogModal";

import useAuditLogs from "../hooks/useAuditLogs";

const ACTION_VARIANTS = {
  CREATE: "success",
  UPDATE: "primary",
  DELETE: "danger",
  LOGIN: "dark",
  CHANGE_PASSWORD: "warning",
  REGENERATE_PDF: "info",
};

const ENTITY_VARIANTS = {
  USER: "secondary",
  CUSTOMER: "info",
  COMPANY: "warning",
  DOCUMENT: "primary",
  DOCUMENT_SETTINGS: "dark",
};

function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search,
    }),
    [page, search],
  );

  const { data, isLoading } = useAuditLogs(params);

  const logs = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const columns = [
    {
      header: "Time",
      render: (log) =>
        new Date(log.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },

    {
      header: "User",
      render: (log) => log.userName,
    },

    {
      header: "Action",
      render: (log) => (
        <Badge bg={ACTION_VARIANTS[log.action] || "secondary"}>
          {log.action}
        </Badge>
      ),
    },

    {
      header: "Entity",
      render: (log) => (
        <Badge bg={ENTITY_VARIANTS[log.entityType] || "secondary"}>
          {log.entityType}
        </Badge>
      ),
    },

    {
      header: "Description",
      render: (log) => (
        <span title={log.description}>
          {log.description.length > 40
            ? `${log.description.slice(0, 40)}...`
            : log.description}
        </span>
      ),
    },

    {
      header: "Actions",
      render: (log) => <TableActions onView={() => setSelectedLog(log)} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Audit Logs"
        subtitle="View all activity performed in the application."
      />

      <Section>
        <div className="row mb-4">
          <div className="col-lg-4 col-md-6">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>

              <Form.Control
                type="search"
                placeholder="Search audit logs..."
                value={search}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
        </div>

        <DataTable
          loading={isLoading}
          columns={columns}
          data={logs}
          emptyTitle="No Audit Logs Found"
          emptyDescription="No activity has been recorded yet."
        />

        <Pagination
          currentPage={pagination?.page ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          totalDocuments={pagination?.totalDocuments ?? 0}
          limit={pagination?.limit ?? 10}
          hasNextPage={pagination?.hasNextPage ?? false}
          hasPreviousPage={pagination?.hasPreviousPage ?? false}
          onPageChange={setPage}
        />

        <ViewAuditLogModal
          show={Boolean(selectedLog)}
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      </Section>
    </>
  );
}

export default AuditLogsPage;
