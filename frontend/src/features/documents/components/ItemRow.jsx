import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

function ItemRow({
  index,
  register,
  errors,
  remove,
  canDelete,
  sacCodes = [],
  onAddSacCode,
}) {
  const itemErrors = errors?.items?.[index] || {};

  return (
    <tr>
      {/* Description */}
      <td>
        <Form.Control
          {...register(`items.${index}.description`)}
          isInvalid={!!itemErrors.description}
        />

        <Form.Control.Feedback type="invalid">
          {itemErrors.description?.message}
        </Form.Control.Feedback>
      </td>

      {/* SAC Code */}
      <td style={{ minWidth: "260px" }}>
        <div className="d-flex gap-2">
          <Form.Select {...register(`items.${index}.hsnSacCode`)}>
            <option value="">Select SAC Code</option>

            {sacCodes.map((item) => (
              <option key={item._id} value={item.code}>
                {item.code} - {item.description}
              </option>
            ))}
          </Form.Select>

          <Button
            variant="outline-primary"
            onClick={() => onAddSacCode(index)}
            title="Add SAC Code"
          >
            <FaPlus />
          </Button>
        </div>
      </td>

      {/* Amount */}
      <td>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          {...register(`items.${index}.amount`, {
            valueAsNumber: true,
          })}
          isInvalid={!!itemErrors.amount}
        />

        <Form.Control.Feedback type="invalid">
          {itemErrors.amount?.message}
        </Form.Control.Feedback>
      </td>

      {/* Delete */}
      <td className="text-center">
        <Button
          variant="outline-danger"
          size="sm"
          disabled={!canDelete}
          onClick={() => remove(index)}
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
}

export default ItemRow;
