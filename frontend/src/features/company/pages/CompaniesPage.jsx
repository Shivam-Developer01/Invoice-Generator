import { InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import { useState } from "react";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import DataTable from "../../../components/ui/DataTable/DataTable";
import Pagination from "../../../components/ui/Pagination/Pagination";
import StatusBadge from "../../../components/ui/StatusBadge/StatusBadge";
import ConfirmationModal from "../../../components/ui/ConfirmationModal/ConfirmationModal";

import useCompanies from "../hooks/useCompanies";
import useUpdateCompanyStatus from "../hooks/useUpdateCompanyStatus";

import useTableParams from "../../../hooks/useTableParams";
import useDebounce from "../../../hooks/useDebounce";

import CompanyActions from "../components/CompanyActions";
import CompanyModal from "../components/CompanyModal";
import ViewCompanyModal from "../components/ViewCompanyModal";

function CompaniesPage() {
  const [modal, setModal] = useState({
    type: null,
    company: null,
  });

  const { params, setSearch, setPage } = useTableParams();

  const debouncedSearch = useDebounce(params.search);

  const { data, isLoading } = useCompanies({
    ...params,
    search: debouncedSearch,
  });

  const pagination = data?.data?.pagination;

  const handleAddCompany = () => {
    setModal({
      type: "create",
      company: null,
    });
  };

  const handleCloseModal = () => {
    setModal({
      type: null,
      company: null,
    });
  };

  const handleView = (company) => {
    setModal({
      type: "view",
      company,
    });
  };

  const handleEdit = (company) => {
    setModal({
      type: "edit",
      company,
    });
  };

  const handleStatusChange = (company) => {
    setModal({
      type: "status",
      company,
    });
  };

  const statusMutation = useUpdateCompanyStatus();

  const handleConfirmStatus = async () => {
    try {
      await statusMutation.mutateAsync({
        id: modal.company._id,
        isActive: !modal.company.isActive,
      });

      handleCloseModal();
    } catch {}
  };

  const columns = [
    {
      header: "Logo",
      render: (row) =>
        row.logoUrl ? (
          <img
            src={`${import.meta.env.VITE_SERVER_URL}${row.logoUrl}`}
            alt={row.companyName}
            style={{
              width: 45,
              height: 45,
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            className="border rounded bg-light"
            style={{
              width: 45,
              height: 45,
            }}
          />
        ),
    },
    {
      header: "Company",
      accessor: "companyName",
    },
    {
      header: "GSTIN",
      accessor: "gstin",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Status",
      render: (row) => <StatusBadge active={row.isActive} />,
    },
    {
      header: "Actions",
      render: (row) => (
        <CompanyActions
          company={row}
          onView={handleView}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Companies" subtitle="Manage all companies." />

      <Section
        action={
          <PrimaryButton onClick={handleAddCompany}>Add Company</PrimaryButton>
        }
      >
        <div className="row mb-4">
          <div className="col-lg-4 col-md-6">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>

              <Form.Control
                type="search"
                placeholder="Search by company, GSTIN, email or phone..."
                value={params.search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        <DataTable
          loading={isLoading}
          columns={columns}
          data={data?.data?.data || []}
          emptyTitle="No Companies Found"
          emptyDescription="Create your first company."
        />

        <ConfirmationModal
          show={modal.type === "status"}
          title={
            modal.company?.isActive ? "Deactivate Company" : "Activate Company"
          }
          message={`Are you sure you want to ${
            modal.company?.isActive ? "deactivate" : "activate"
          } "${modal.company?.companyName}"?`}
          confirmText={modal.company?.isActive ? "Deactivate" : "Activate"}
          onClose={handleCloseModal}
          onConfirm={handleConfirmStatus}
          loading={statusMutation.isPending}
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

        <CompanyModal
          show={modal.type === "create" || modal.type === "edit"}
          company={modal.company}
          onClose={handleCloseModal}
        />

        <ViewCompanyModal
          show={modal.type === "view"}
          company={modal.company}
          onClose={handleCloseModal}
        />
      </Section>
    </>
  );
}

export default CompaniesPage;
