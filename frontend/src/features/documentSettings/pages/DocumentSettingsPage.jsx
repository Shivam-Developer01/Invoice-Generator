import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";

import DocumentSettingsForm from "../components/DocumentSettingsForm";

import useDocumentSettings from "../hooks/useDocumentSettings";

import FormSkeleton from "../../../components/ui/FormSkeleton/FormSkeleton";

function DocumentSettingsPage() {
  const { data, isLoading } = useDocumentSettings();

  return (
    <>
      <PageHeader
        title="Document Settings"
        subtitle="Manage document numbering and prefixes."
      />

      <Section>
        {isLoading ? (
          <FormSkeleton rows={6} />
        ) : (
          <DocumentSettingsForm settings={data?.data} />
        )}
      </Section>
    </>
  );
}

export default DocumentSettingsPage;
