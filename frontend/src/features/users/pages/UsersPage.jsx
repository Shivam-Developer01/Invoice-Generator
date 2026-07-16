import { useMemo, useState } from "react";
import { Form, InputGroup, Badge } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import DataTable from "../../../components/ui/DataTable/DataTable";
import ConfirmationModal from "../../../components/ui/ConfirmationModal/ConfirmationModal";
import TableActions from "../../../components/ui/TableActions/TableActions";

import UserModal from "../components/UserModal";
import ViewUserModal from "../components/ViewUserModal";

import useUsers from "../hooks/useUsers";
import useUpdateUserStatus from "../hooks/useUpdateUserStatus";

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState({
    type: null,
    user: null,
  });

  const { data, isLoading } = useUsers();

  const statusMutation = useUpdateUserStatus();

  const users = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const value = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  const handleAddUser = () => {
    setModal({
      type: "create",
      user: null,
    });
  };

  const handleView = (user) => {
    setModal({
      type: "view",
      user,
    });
  };

  const handleEdit = (user) => {
    setModal({
      type: "edit",
      user,
    });
  };

  const handleStatus = (user) => {
    setModal({
      type: "status",
      user,
    });
  };

  const handleCloseModal = () => {
    setModal({
      type: null,
      user: null,
    });
  };

  const handleConfirmStatus = async () => {
    try {
      await statusMutation.mutateAsync({
        id: modal.user._id,
        isActive: !modal.user.isActive,
      });

      handleCloseModal();
    } catch {}
  };

  const columns = [
    {
      header: "Name",
      render: (user) => user.name,
    },

    {
      header: "Email",
      render: (user) => user.email,
    },

    {
      header: "Role",
      render: (user) => user.role.replaceAll("_", " "),
    },

    {
      header: "Status",
      render: (user) => (
        <Badge bg={user.isActive ? "success" : "danger"}>
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },

    {
      header: "Actions",
      render: (user) => (
        <TableActions
          onView={() => handleView(user)}
          onEdit={() => handleEdit(user)}
          extraActions={[
            {
              label: user.isActive ? "Deactivate" : "Activate",
              onClick: () => handleStatus(user),
            },
          ]}
        />
      ),
    },
  ];
  return (
    <>
      <PageHeader title="Users" subtitle="Manage application users." />

      <Section
        action={<PrimaryButton onClick={handleAddUser}>Add User</PrimaryButton>}
      >
        <div className="row mb-4">
          <div className="col-lg-4">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        <DataTable
          loading={isLoading}
          columns={columns}
          data={filteredUsers}
          emptyTitle="No Users Found"
          emptyDescription="Create your first user."
        />

        <ConfirmationModal
          show={modal.type === "status"}
          title={modal.user?.isActive ? "Deactivate User" : "Activate User"}

          message={`Are you sure you want to ${
            modal.user?.isActive ? "deactivate" : "activate"
          } "${modal.user?.name}"?`}
          confirmText={modal.user?.isActive ? "Deactivate" : "Activate"}
          loading={statusMutation.isPending}
          onClose={handleCloseModal}
          onConfirm={handleConfirmStatus}
        />

        <UserModal
          show={modal.type === "create" || modal.type === "edit"}
          user={modal.user}
          onClose={handleCloseModal}
        />

        <ViewUserModal
          show={modal.type === "view"}
          user={modal.user}
          onClose={handleCloseModal}
        />
      </Section>
    </>
  );
};

export default UsersPage;
