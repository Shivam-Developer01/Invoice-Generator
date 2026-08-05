import { Form } from "react-bootstrap";

import CustomerSelect from "./CustomerSelect";

function CustomerSection({
  companies,
  selectedCompany,
  setSelectedCompany,

  customers,
  register,
  errors,
}) {
  return (
    <>
      <h5 className="mb-3">Customer Information</h5>

      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>

        <Form.Select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <CustomerSelect
        customers={customers}
        register={register}
        errors={errors}
      />
    </>
  );
}

export default CustomerSection;
