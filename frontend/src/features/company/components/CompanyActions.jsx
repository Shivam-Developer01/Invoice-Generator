import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye, FaEdit, FaCheckCircle, FaBan } from "react-icons/fa";

function CompanyActions({ company, onView, onEdit, onStatusChange }) {
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
        <Dropdown.Item onClick={() => onView(company)}>
          <FaEye className="me-2" />
          View
        </Dropdown.Item>

        <Dropdown.Item onClick={() => onEdit(company)}>
          <FaEdit className="me-2" />
          Edit
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          onClick={() => onStatusChange(company)}
          className={company.isActive ? "text-danger" : "text-success"}
        >
          {company.isActive ? (
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

export default CompanyActions;
