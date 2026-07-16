import { useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import DataTable from "../../../components/ui/DataTable/DataTable";
import Pagination from "../../../components/ui/Pagination/Pagination";

import useDocuments from "../hooks/useDocuments";
import DocumentActions from "../components/DocumentActions";

import useTableParams from "../../../hooks/useTableParams";
import useDebounce from "../../../hooks/useDebounce";
import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import routes from "../../../config/routes";
import { useNavigate } from "react-router-dom";
import ViewDocumentModal from "../components/ViewDocumentModal";
import useDownloadPdf from "../hooks/useDownloadPdf";
import useDeleteDocument from "../hooks/useDeleteDocument";
import { formatDate } from "../../../utils/formatDateTime";

function DocumentsPage() {
  const navigate = useNavigate();
  const downloadPdfMutation = useDownloadPdf();
  const deleteDocumentMutation = useDeleteDocument();

  const [modal, setModal] = useState({
    type: null,
    document: null,
  });
  const { params, setSearch, setPage } = useTableParams();

  const debouncedSearch = useDebounce(params.search);

  const { data, isLoading } = useDocuments({
    ...params,
    search: debouncedSearch,
  });

  const documents = data?.data?.data ?? [];

  const pagination = data?.data?.pagination;

  const handleView = (document) => {
    setModal({
      type: "view",
      document,
    });
  };

  const handleDelete = (document) => {
    setModal({
      type: "delete",
      document,
    });
  };

  const confirmDelete = async () => {
    if (!modal?.document) return;

    try {
      await deleteDocumentMutation.mutateAsync(modal.document._id);

      setModal({
        type: null,
        document: null,
      });
    } catch {}
  };

  const handleCloseModal = () => {
    setModal({
      type: null,
      document: null,
    });
  };

  const handleEdit = (document) => {
    navigate(`/documents/${document._id}/edit`);
  };

  const handleDownload = (document) => {
    downloadPdfMutation.mutate(document._id);
  };

  const columns = useMemo(
    () => [
      {
        header: "Document No.",
        accessor: "documentNumber",
      },

      {
        header: "Type",
        accessor: "documentType",
      },

      {
        header: "Customer",
        render: (row) =>
          row.customerSnapshot?.customerName ||
          row.customerId?.customerName ||
          "-",
      },

      {
        header: "Date",
        render: (row) => formatDate(row.documentDate),
      },

      {
        header: "Amount",
        render: (row) => `₹${row.totalAmount.toFixed(2)}`,
      },

      {
        header: "Actions",
        render: (row) => (
          <DocumentActions
            document={row}
            onView={handleView}
            onEdit={handleEdit}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <PageHeader
        title="Documents"
        subtitle="Manage invoices, proformas and credit notes."
      />

      <Section
        action={
          <PrimaryButton onClick={() => navigate(routes.CREATE_DOCUMENT)}>
            Generate Bill
          </PrimaryButton>
        }
      >
        <div className="row mb-4">
          <div className="col-md-4">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search documents..."
                value={params.search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        <DataTable
          loading={isLoading}
          columns={columns}
          data={documents}
          emptyTitle="No Documents Found"
          emptyDescription="Generate your first document."
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
        <ViewDocumentModal
          show={modal.type === "view"}
          document={modal.document}
          onClose={handleCloseModal}
        />
        <Modal
          show={modal?.type === "delete"}
          onHide={() => setModal(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Document</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete{" "}
            <strong>{modal?.document?.documentNumber}</strong>?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModal(null)}>
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteDocumentMutation.isPending}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Section>
    </>
  );
}

export default DocumentsPage;
