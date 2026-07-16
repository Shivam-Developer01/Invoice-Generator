import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AddressFields from "./forms/AddressFields";
import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

import useCreateCustomer from "../hooks/useCreateCustomer";
import useUpdateCustomer from "../hooks/useUpdateCustomer";

import customerSchema from "../validation/customerSchema";

function CustomerForm({ customer, onClose, onSuccess }) {
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();

  const isEditMode = Boolean(customer);

  const [sameAsBilling, setSameAsBilling] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      customerName: "",
      contactPerson: "",
      email: "",
      phone: "",
      gstin: "",
      pan: "",

      billingAddress: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
      },

      shippingAddress: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
      },
    },
  });

  useEffect(() => {
    if (customer) {
      reset(customer);
      setSameAsBilling(false);
    } else {
      reset();
      setSameAsBilling(true);
    }
  }, [customer, reset]);

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      shippingAddress: sameAsBilling
        ? formData.billingAddress
        : formData.shippingAddress,
    };

    try {
      if (isEditMode) {
        await updateCustomerMutation.mutateAsync({
          id: customer._id,
          data: payload,
        });
      } else {
        await createCustomerMutation.mutateAsync(payload);
      }

      onSuccess();
    } catch {
      // Errors are handled by React Query's onError
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* ---------------- Basic Information ---------------- */}

      <fieldset className="mb-4">
        <legend className="fs-6 fw-semibold mb-3">Basic Information</legend>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Customer Name</Form.Label>

              <Form.Control
                {...register("customerName")}
                isInvalid={!!errors.customerName}
              />

              <Form.Control.Feedback type="invalid">
                {errors.customerName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Contact Person</Form.Label>

              <Form.Control
                {...register("contactPerson")}
                isInvalid={!!errors.contactPerson}
              />

              <Form.Control.Feedback type="invalid">
                {errors.contactPerson?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>

              <Form.Control {...register("phone")} isInvalid={!!errors.phone} />

              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>GSTIN</Form.Label>

              <Form.Control {...register("gstin")} isInvalid={!!errors.gstin} />

              <Form.Control.Feedback type="invalid">
                {errors.gstin?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>PAN</Form.Label>

              <Form.Control {...register("pan")} isInvalid={!!errors.pan} />

              <Form.Control.Feedback type="invalid">
                {errors.pan?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </fieldset>

      <AddressFields
        title="Billing Address"
        prefix="billingAddress"
        register={register}
        errors={errors}
      />

      <Form.Check
        className="mb-4"
        type="checkbox"
        label="Shipping address is same as billing address"
        checked={sameAsBilling}
        onChange={(e) => setSameAsBilling(e.target.checked)}
      />

      {!sameAsBilling && (
        <AddressFields
          title="Shipping Address"
          prefix="shippingAddress"
          register={register}
          errors={errors}
        />
      )}

      <div className="d-flex justify-content-end gap-2">
        <PrimaryButton type="button" variant="secondary" onClick={onClose}>
          Cancel
        </PrimaryButton>

        <PrimaryButton type="submit" loading={createCustomerMutation.isPending}>
          {isEditMode ? "Update Customer" : "Save Customer"}
        </PrimaryButton>
      </div>
    </Form>
  );
}

export default CustomerForm;
