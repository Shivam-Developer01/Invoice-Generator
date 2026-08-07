import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Row, Col, Form, Button } from "react-bootstrap";

import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import companySchema from "../validation/companySchema";
import useUpdateCompany from "../hooks/useUpdateCompany";
import useCreateCompany from "../hooks/useCreateCompany";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constants/queryKeys";

function CompanyForm({ company, loading, onSuccess }) {
  const createCompanyMutation = useCreateCompany();

  const updateCompanyMutation = useUpdateCompany();

  const queryClient = useQueryClient();

  const isEditMode = Boolean(company?._id);
  const fileInputRef = useRef(null);

  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState(company?.logoUrl || "");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),

    defaultValues: {
      companyName: "",
      gstin: "",
      pan: "",
      email: "",
      phone: "",
      website: "",

      addresses: {
        registeredOffice: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
        },

        corporateOffice: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
        },
      },

      bankDetails: {
        bankName: "",
        accountName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        upiId: "",
      },

      gstOptions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gstOptions",
  });

  const selectedGstOptions = useWatch({
    control,
    name: "gstOptions",
  });

  useEffect(() => {
    setLogoUrl(company?.logoUrl || "");
    setSelectedLogoFile(null);
    setLogoPreviewUrl("");
  }, [company]);

  useEffect(() => {
    if (!company) return;

    reset({
      companyName: company.companyName || "",
      gstin: company.gstin || "",
      pan: company.pan || "",
      email: company.email || "",
      phone: company.phone || "",
      website: company.website || "",

      addresses: company.addresses || {
        registeredOffice: {},
        corporateOffice: {},
      },

      bankDetails: company.bankDetails || {
        bankName: "",
        accountName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        upiId: "",
      },

      gstOptions: company.gstOptions || [],
    });
  }, [company, reset]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      let payload = data;
      if (selectedLogoFile) {
        const formData = new FormData();
        formData.append("logo", selectedLogoFile);
        formData.append("data", JSON.stringify(data));
        payload = formData;
      }

      if (isEditMode) {
        await updateCompanyMutation.mutateAsync({
          id: company._id,
          data: payload,
        });
      } else {
        await createCompanyMutation.mutateAsync(payload);
      }

      onSuccess?.();
    } catch {}
  };

  if (loading) {
    return <p>Loading company details...</p>;
  }

  const GST_CODES = ["CGST", "SGST", "IGST", "UTGST", "CESS"];
  const currentLogoDisplay = logoPreviewUrl || (logoUrl ? `${import.meta.env.VITE_SERVER_URL}${logoUrl}?t=${Date.now()}` : "");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {" "}
      <div className="border rounded-4 bg-light p-4 mb-4 text-center">
        <h5 className="fw-semibold mb-3">Company Logo</h5>

        {currentLogoDisplay ? (
          <img
            src={currentLogoDisplay}
            alt="Company Logo"
            className="img-thumbnail shadow-sm"
            style={{
              width: 130,
              height: 130,
              objectFit: "contain",
              borderRadius: 12,
              padding: 10,
              background: "#fff",
            }}
          />
        ) : (
          <div
            className="border rounded-3 d-flex justify-content-center align-items-center bg-white mx-auto"
            style={{
              width: 130,
              height: 130,
            }}
          >
            <span className="text-muted">No Logo</span>
          </div>
        )}

        <Form.Control
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="d-none"
          onChange={handleLogoChange}
        />

        <div className="mt-4">
          <PrimaryButton
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            {currentLogoDisplay ? "Change Logo" : "Upload Logo"}
          </PrimaryButton>

          <div
            className="text-muted mt-2"
            style={{
              fontSize: "0.85rem",
            }}
          >
            PNG, JPG • Max 1 MB
          </div>
        </div>
      </div>
      {/* Company Information */}
      <h5 className="mb-3">Company Information</h5>
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>

            <Form.Control
              {...register("companyName")}
              isInvalid={!!errors.companyName}
            />

            <Form.Control.Feedback type="invalid">
              {errors.companyName?.message}
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
            <Form.Label>Email</Form.Label>

            <Form.Control {...register("email")} isInvalid={!!errors.email} />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Website</Form.Label>

            <Form.Control {...register("website")} />
          </Form.Group>
        </Col>
      </Row>
      {/* Registered Office */}
      <h5 className="mb-3">Registered Office</h5>
      <Row className="g-3 mb-4">
        <Col md={12}>
          <Form.Control
            placeholder="Address Line 1"
            {...register("addresses.registeredOffice.addressLine1")}
          />
        </Col>

        <Col md={12}>
          <Form.Control
            placeholder="Address Line 2"
            {...register("addresses.registeredOffice.addressLine2")}
          />
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="City"
            {...register("addresses.registeredOffice.city")}
          />
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="State"
            {...register("addresses.registeredOffice.state")}
          />
        </Col>

        <Col md={2}>
          <Form.Control
            placeholder="Country"
            {...register("addresses.registeredOffice.country")}
          />
        </Col>

        <Col md={2}>
          <Form.Control
            placeholder="Pincode"
            {...register("addresses.registeredOffice.pincode")}
          />
        </Col>
      </Row>
      {/* Corporate Office */}
      <h5 className="mb-3">Corporate Office</h5>
      <Row className="g-3 mb-4">
        <Col md={12}>
          <Form.Control
            placeholder="Address Line 1"
            {...register("addresses.corporateOffice.addressLine1")}
          />
        </Col>

        <Col md={12}>
          <Form.Control
            placeholder="Address Line 2"
            {...register("addresses.corporateOffice.addressLine2")}
          />
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="City"
            {...register("addresses.corporateOffice.city")}
          />
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="State"
            {...register("addresses.corporateOffice.state")}
          />
        </Col>

        <Col md={2}>
          <Form.Control
            placeholder="Country"
            {...register("addresses.corporateOffice.country")}
          />
        </Col>

        <Col md={2}>
          <Form.Control
            placeholder="Pincode"
            {...register("addresses.corporateOffice.pincode")}
          />
        </Col>
      </Row>
      {/* Bank Details */}
      <h5 className="mb-3">Bank Details</h5>
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Control
            placeholder="Bank Name"
            {...register("bankDetails.bankName")}
          />
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="Branch"
            {...register("bankDetails.branch")}
          />
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="Account Name"
            {...register("bankDetails.accountName")}
          />
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="IFSC Code"
            {...register("bankDetails.ifscCode")}
          />
        </Col>

        <Col md={12}>
          <Form.Control
            placeholder="Account Number"
            {...register("bankDetails.accountNumber")}
          />
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>UPI ID (Optional)</Form.Label>

            <Form.Control
              placeholder="company@upi"
              {...register("bankDetails.upiId")}
            />

            <Form.Text className="text-muted">
              This will appear on invoices for quick digital payments.
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>{" "}
      {/* GST Options */}
      <h5 className="mb-3">GST Options</h5>
      <div className="table-responsive mb-3">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Code</th>
              <th>Label</th>
              <th>Percentage</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>
                  <Form.Select
                    {...register(`gstOptions.${index}.code`)}
                    isInvalid={!!errors.gstOptions?.[index]?.code}
                  >
                    {GST_CODES.map((code) => {
                      const alreadySelected = selectedGstOptions?.some(
                        (item, i) => i !== index && item.code === code,
                      );

                      return (
                        <option
                          key={code}
                          value={code}
                          disabled={alreadySelected}
                        >
                          {code}
                        </option>
                      );
                    })}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.gstOptions?.[index]?.code?.message}
                  </Form.Control.Feedback>

                  <Form.Control.Feedback type="invalid">
                    {errors.gstOptions?.[index]?.code?.message}
                  </Form.Control.Feedback>
                </td>

                <td>
                  <Form.Control
                    {...register(`gstOptions.${index}.label`)}
                    isInvalid={!!errors.gstOptions?.[index]?.label}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.gstOptions?.[index]?.label?.message}
                  </Form.Control.Feedback>
                </td>

                <td>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register(`gstOptions.${index}.percentage`, {
                      valueAsNumber: true,
                    })}
                    isInvalid={!!errors.gstOptions?.[index]?.percentage}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.gstOptions?.[index]?.percentage?.message}
                  </Form.Control.Feedback>
                </td>

                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    {...register(`gstOptions.${index}.active`)}
                  />
                </td>

                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        variant="outline-primary"
        onClick={() => {
          const availableCode = GST_CODES.find(
            (code) => !selectedGstOptions?.some((item) => item.code === code),
          );

          if (!availableCode) return;

          append({
            code: availableCode,
            label: "",
            percentage: 0,
            active: true,
          });
        }}
        disabled={fields.length >= GST_CODES.length}
      >
        + Add GST Option
      </Button>
      <div className="d-flex justify-content-end">
        <PrimaryButton
          type="submit"
          loading={
            createCompanyMutation.isPending || updateCompanyMutation.isPending
          }
        >
          {isEditMode ? "Save Changes" : "Create Company"}
        </PrimaryButton>
      </div>
    </Form>
  );
}

export default CompanyForm;
