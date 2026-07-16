import { useParams } from "react-router-dom";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import Section from "../../../components/ui/Section/Section";

import DocumentProvider from "../context/DocumentContext";

import DocumentTabs from "../components/DocumentTabs";
import CreateDocumentForm from "../components/CreateDocumentForm";

import useDocument from "../hooks/useDocument";

function CreateDocumentPage() {
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { data, isLoading } = useDocument(id);

  const document = data?.data;

  return (
    <DocumentProvider>
      <PageHeader
        title={isEditMode ? "Edit Document" : "Generate Bill"}
        subtitle={
          isEditMode
            ? "Update Invoice, Proforma or Credit Note."
            : "Create Invoice, Proforma or Credit Note."
        }
      />

      <Section>
        <DocumentTabs isEditMode={isEditMode} document={document} />

        <CreateDocumentForm
          document={document}
          isEditMode={isEditMode}
          loading={isLoading}
        />
      </Section>
    </DocumentProvider>
  );
}

export default CreateDocumentPage;
