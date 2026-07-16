import { Button, Table } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";

import ItemRow from "./ItemRow";

function ItemsTable({ control, register, errors, sacCodes, onAddSacCode }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleAddItem = () => {
    append({
      description: "",
      sacCode: "",
      sacDescription: "",
      amount: "",
    });
  };

  return (
    <>
      <h5 className="mb-3">Items</h5>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Description</th>

            <th style={{ width: "25%" }}>SAC Code</th>

            <th style={{ width: "15%" }}>Amount</th>

            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((field, index) => (
            <ItemRow
              key={field.id}
              index={index}
              register={register}
              errors={errors}
              remove={remove}
              canDelete={fields.length > 1}
              sacCodes={sacCodes}
              onAddSacCode={onAddSacCode}
            />
          ))}
        </tbody>
      </Table>

      <Button variant="outline-primary" onClick={handleAddItem}>
        + Add Item
      </Button>
    </>
  );
}

export default ItemsTable;
