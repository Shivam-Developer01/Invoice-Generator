import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import useCompanyOptions from "../../company/hooks/useCompanyOptions";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";

import DocumentSettingsForm from "../components/DocumentSettingsForm";

import useDocumentSettings from "../hooks/useDocumentSettings";

import FormSkeleton from "../../../components/ui/FormSkeleton/FormSkeleton";

function DocumentSettingsPage() {
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: companies } = useCompanyOptions();

  useEffect(() => {
    if (!selectedCompany && companies?.data?.length) {
      setSelectedCompany(companies.data[0]._id);
    }
  }, [companies, selectedCompany]);

  const { data, isLoading } = useDocumentSettings(selectedCompany);

  return (
    <>
      <PageHeader
        title="Document Settings"
        subtitle="Manage document numbering and prefixes."
      />

      <Section>
        <>
          <Row className="mb-4">
            <Col md={5}>
              <Form.Group>
                <Form.Label>Select Company</Form.Label>

                <Form.Select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  {companies?.data?.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {isLoading ? (
            <FormSkeleton rows={6} />
          ) : (
            <DocumentSettingsForm
              settings={data?.data}
              companyId={selectedCompany}
            />
          )}
        </>
      </Section>
    </>
  );
}

export default DocumentSettingsPage;
