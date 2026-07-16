import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";

import CompanyForm from "../components/CompanyForm";

import useCompany from "../hooks/useCompany";

function CompanyPage() {
  const { data, isLoading } = useCompany();

  return (
    <>
      <PageHeader
        title="Company Settings"
        subtitle="Manage company information and billing configuration."
      />

      <Section>
        <CompanyForm company={data?.data} loading={isLoading} />
      </Section>
    </>
  );
}

export default CompanyPage;
