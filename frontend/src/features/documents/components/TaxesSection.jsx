import { Card, Form, Table } from "react-bootstrap";
import { Controller, useWatch } from "react-hook-form";

import useCompany from "../../company/hooks/useCompany";

function TaxesSection({ control }) {
  const { data } = useCompany();

  const gstOptions = data?.data?.gstOptions?.filter((tax) => tax.active) || [];

  const items = useWatch({
    control,
    name: "items",
  });

  const taxes = useWatch({
    control,
    name: "taxes",
  });

  const subtotal =
    items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

  const calculatedTaxes =
    taxes?.map((tax) => ({
      ...tax,
      amount: Number(((subtotal * tax.percentage) / 100).toFixed(2)),
    })) || [];

  const totalTax = calculatedTaxes.reduce((sum, tax) => sum + tax.amount, 0);

  const grandTotal = subtotal + totalTax;

  return (
    <>
      <h5 className="mt-4 mb-3">Taxes</h5>

      <Controller
        control={control}
        name="taxes"
        render={({ field }) => (
          <>
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body>
                {gstOptions.map((gst) => {
                  const checked = field.value.some(
                    (tax) => tax.name === gst.code,
                  );

                  return (
                    <Form.Check
                      key={gst.code}
                      className="mb-2"
                      type="checkbox"
                      label={`${gst.label} (${gst.percentage}%)`}
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([
                            ...field.value,
                            {
                              name: gst.code,
                              percentage: gst.percentage,
                              amount: Number(
                                ((subtotal * gst.percentage) / 100).toFixed(2),
                              ),
                            },
                          ]);
                        } else {
                          field.onChange(
                            field.value.filter((tax) => tax.name !== gst.code),
                          );
                        }
                      }}
                    />
                  );
                })}
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Table borderless className="mb-0">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td className="text-end">₹ {subtotal.toFixed(2)}</td>
                    </tr>

                    {calculatedTaxes.map((tax) => (
                      <tr key={tax.name}>
                        <td>
                          {tax.name} ({tax.percentage}%)
                        </td>

                        <td className="text-end">₹ {tax.amount.toFixed(2)}</td>
                      </tr>
                    ))}

                    <tr>
                      <td>
                        <strong>Total Tax</strong>
                      </td>

                      <td className="text-end">
                        <strong>₹ {totalTax.toFixed(2)}</strong>
                      </td>
                    </tr>

                    <tr className="table-primary">
                      <td>
                        <strong>Grand Total</strong>
                      </td>

                      <td className="text-end">
                        <strong>₹ {grandTotal.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </>
        )}
      />
    </>
  );
}

export default TaxesSection;
