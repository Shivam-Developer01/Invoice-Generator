import { InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import DataTable from "../../../components/ui/DataTable/DataTable";
import Pagination from "../../../components/ui/Pagination/Pagination";
import StatusBadge from "../../../components/ui/StatusBadge/StatusBadge";

import useCustomers from "../hooks/useCustomers";
import useUpdateCustomerStatus from "../hooks/useUpdateCustomerStatus";

import useTableParams from "../../../hooks/useTableParams";
import useDebounce from "../../../hooks/useDebounce";

import CustomerActions from "../components/CustomerActions";
import CustomerModal from "../components/CustomerModal";

import { useState } from "react";
import ViewCustomerModal from "../components/ViewCustomerModal";
import ConfirmationModal from "../../../components/ui/ConfirmationModal/ConfirmationModal";

function CustomersPage() {
  const [modal, setModal] = useState({
    type: null,
    customer: null,
  });

  const { params, setSearch, setPage } = useTableParams();

  const debouncedSearch = useDebounce(params.search);

  const { data, isLoading } = useCustomers({
    ...params,
    search: debouncedSearch,
  });

  const pagination = data?.data?.pagination;

  const handleAddCustomer = () => {
    setModal({
      type: "create",
      customer: null,
    });
  };

  const handleCloseModal = () => {
    setModal({
      type: null,
      customer: null,
    });
  };

  const handleView = (customer) => {
    setModal({
      type: "view",
      customer,
    });
  };

  const handleEdit = (customer) => {
    setModal({
      type: "edit",
      customer,
    });
  };

  const handleStatusChange = (customer) => {
    setModal({
      type: "status",
      customer,
    });
  };

  const statusMutation = useUpdateCustomerStatus();

  const handleConfirmStatus = async () => {
    try {
      await statusMutation.mutateAsync({
        id: modal.customer._id,
        isActive: !modal.customer.isActive,
      });

      handleCloseModal();
    } catch {
      // Already handled
    }
  };

  const columns = [
    {
      header: "Customer",
      accessor: "customerName",
    },
    {
      header: "Contact",
      accessor: "contactPerson",
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
        <CustomerActions
          customer={row}
          onView={handleView}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Manage all customer information."
      />

      <Section
        action={
          <PrimaryButton onClick={handleAddCustomer}>
            Add Customer
          </PrimaryButton>
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
                placeholder="Search by name, GSTIN, email or phone..."

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
          emptyTitle="No Customers Found"
          emptyDescription="Create your first customer."
        />
        <ConfirmationModal
          show={modal.type === "status"}
          title={
            modal.customer?.isActive
              ? "Deactivate Customer"
              : "Activate Customer"
          }
          message={`Are you sure you want to ${
            modal.customer?.isActive ? "deactivate" : "activate"
          } "${modal.customer?.customerName}"?`}
          confirmText={modal.customer?.isActive ? "Deactivate" : "Activate"}
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
        <CustomerModal
          show={modal.type === "create" || modal.type === "edit"}
          customer={modal.customer}
          onClose={handleCloseModal}
        />
        <ViewCustomerModal
          show={modal.type === "view"}
          customer={modal.customer}
          onClose={handleCloseModal}
        />
      </Section>
    </>
  );
}

export default CustomersPage;
