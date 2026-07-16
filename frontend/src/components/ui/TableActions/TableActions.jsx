import { Dropdown } from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";
import "./TableActions.css"

function TableActions({ onView, onEdit, onDelete, extraActions = [] }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        size="sm"
        className="border-0 shadow-none"
      >
        <FaEllipsisVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "170px" }}>
        {onView && <Dropdown.Item onClick={onView}>View</Dropdown.Item>}

        {onEdit && <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>}

        {extraActions.map((action, index) => (
          <Dropdown.Item key={index} onClick={action.onClick}>
            {action.label}
          </Dropdown.Item>
        ))}

        {onDelete && (
          <>
            <Dropdown.Divider />

            <Dropdown.Item className="text-danger" onClick={onDelete}>
              Delete
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TableActions;
