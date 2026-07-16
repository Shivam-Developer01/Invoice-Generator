import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, Row, Col } from "react-bootstrap";

import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

import documentSettingsSchema from "../validation/documentSettingsSchema";

import useUpdateDocumentSettings from "../hooks/useUpdateDocumentSettings";

function DocumentSettingsForm({ settings, loading }) {
  const updateSettingsMutation = useUpdateDocumentSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(documentSettingsSchema),

    defaultValues: {
      companyPrefix: "",
      separator: "-",
      financialYear: "",
      resetYearly: true,

      documentPrefixes: [
        {
          type: "INVOICE",
          prefix: "",
        },
        {
          type: "PROFORMA",
          prefix: "",
        },
        {
          type: "CREDIT_NOTE",
          prefix: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (!settings) return;

    reset({
      companyPrefix: settings.companyPrefix,
      separator: settings.separator,
      financialYear: settings.financialYear,
      resetYearly: settings.resetYearly,
      documentPrefixes: settings.documentPrefixes,
    });
  }, [settings, reset]);

  const onSubmit = async (data) => {
    try {
      await updateSettingsMutation.mutateAsync(data);
    } catch {}
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-3">General Settings</h5>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Company Prefix</Form.Label>

            <Form.Control
              {...register("companyPrefix")}
              isInvalid={!!errors.companyPrefix}
            />

            <Form.Control.Feedback type="invalid">
              {errors.companyPrefix?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Separator</Form.Label>

            <Form.Control
              {...register("separator")}
              isInvalid={!!errors.separator}
            />

            <Form.Control.Feedback type="invalid">
              {errors.separator?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Financial Year</Form.Label>

            <Form.Control
              {...register("financialYear")}
              isInvalid={!!errors.financialYear}
            />

            <Form.Control.Feedback type="invalid">
              {errors.financialYear?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            label="Reset Every Year"
            {...register("resetYearly")}
          />
        </Col>
      </Row>

      <h5 className="mb-3">Document Prefixes</h5>

      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Invoice Prefix</Form.Label>

            <Form.Control
              {...register("documentPrefixes.0.prefix")}
              isInvalid={!!errors.documentPrefixes?.[0]?.prefix}
            />

            <Form.Control.Feedback type="invalid">
              {errors.documentPrefixes?.[0]?.prefix?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <input type="hidden" {...register("documentPrefixes.0.type")} />
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Proforma Prefix</Form.Label>

            <Form.Control
              {...register("documentPrefixes.1.prefix")}
              isInvalid={!!errors.documentPrefixes?.[1]?.prefix}
            />

            <Form.Control.Feedback type="invalid">
              {errors.documentPrefixes?.[1]?.prefix?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <input type="hidden" {...register("documentPrefixes.1.type")} />
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Credit Note Prefix</Form.Label>

            <Form.Control
              {...register("documentPrefixes.2.prefix")}
              isInvalid={!!errors.documentPrefixes?.[2]?.prefix}
            />

            <Form.Control.Feedback type="invalid">
              {errors.documentPrefixes?.[2]?.prefix?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <input type="hidden" {...register("documentPrefixes.2.type")} />
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <PrimaryButton type="submit" loading={updateSettingsMutation.isPending}>
          Save Changes
        </PrimaryButton>
      </div>
    </Form>
  );
}

export default DocumentSettingsForm;
