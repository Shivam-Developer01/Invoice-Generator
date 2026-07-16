import CustomerSelect from "./CustomerSelect";

function CustomerSection({ customers, register, errors }) {
  return (
    <>
      <h5 className="mb-3">Customer Information</h5>

      <CustomerSelect
        customers={customers}
        register={register}
        errors={errors}
      />
    </>
  );
}

export default CustomerSection;
