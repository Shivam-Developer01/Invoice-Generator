import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye, FaEdit, FaCheckCircle, FaBan } from "react-icons/fa";

function CustomerActions({ customer, onView, onEdit, onStatusChange }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        size="sm"
        className="border-0 shadow-none"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "170px" }}>
        <Dropdown.Item onClick={() => onView(customer)}>
          <FaEye className="me-2" />
          View
        </Dropdown.Item>

        <Dropdown.Item onClick={() => onEdit(customer)}>
          <FaEdit className="me-2" />
          Edit
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          onClick={() => onStatusChange(customer)}
          className={customer.isActive ? "text-danger" : "text-success"}
        >
          {customer.isActive ? (
            <>
              <FaBan className="me-2" />
              Deactivate
            </>
          ) : (
            <>
              <FaCheckCircle className="me-2" />
              Activate
            </>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomerActions;
