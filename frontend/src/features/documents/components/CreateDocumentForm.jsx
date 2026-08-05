import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDownloadPdf from "../hooks/useDownloadPdf";
import { useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import useRegeneratePdf from "../hooks/useRegeneratePdf";

import useDocument from "../context/useDocument";

import useCreateDocument from "../hooks/useCreateDocument";
import useUpdateDocument from "../hooks/useUpdateDocument";
import useCustomersList from "../hooks/useCustomersList";

import useSacCodes from "../../sacCodes/hooks/useSacCodes";

import documentSchema from "../validation/documentSchema";

import CustomerSection from "./CustomerSection";
import DocumentSection from "./DocumentSection";
import ItemsTable from "./ItemsTable";
import NotesSection from "./NotesSection";
import FooterActions from "./FooterActions";
import TaxesSection from "./TaxesSection";

import AddSacCodeModal from "../../sacCodes/components/AddSacCodeModal";

import useCompanyOptions from "../../company/hooks/useCompanyOptions";

function CreateDocumentForm({ document, isEditMode, loading }) {
  const downloadPdfMutation = useDownloadPdf();
  const regeneratePdfMutation = useRegeneratePdf();

  const navigate = useNavigate();
  const { documentType } = useDocument();

  const createDocumentMutation = useCreateDocument();
  const updateDocumentMutation = useUpdateDocument();

  const { customers, isLoading: customersLoading } = useCustomersList();

  const { data: companiesData } = useCompanyOptions();

  const companies = companiesData?.data || [];

  const [selectedCompany, setSelectedCompany] = useState("");

  const selectedCompanyData = useMemo(
    () => companies.find((company) => company._id === selectedCompany),
    [companies, selectedCompany],
  );

  const customerOptions = customers
    .filter((customer) => customer.isActive)
    .slice();

  if (
    isEditMode &&
    document?.customerId &&
    !customerOptions.some(
      (customer) => customer._id === document.customerId._id,
    )
  ) {
    customerOptions.unshift({
      ...document.customerId,
      isActive: false,
    });
  }

  const { data: sacData } = useSacCodes();

  const sacCodes = sacData?.data || [];

  const [showSacModal, setShowSacModal] = useState(false);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(documentSchema),

    defaultValues: {
      customerId: "",
      documentDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [
        {
          description: "",
          hsnSacCode: "",
          amount: "",
        },
      ],
      taxes: [],
      subtotal: 0,
      totalTax: 0,
      totalAmount: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (!selectedCompany && companies.length) {
      setSelectedCompany(companies[0]._id);
    }
  }, [companies, selectedCompany]);

  useEffect(() => {
    setValue("taxes", []);
  }, [selectedCompany, setValue]);

  useEffect(() => {
    if (
      !isEditMode ||
      !document ||
      customersLoading ||
      customers.length === 0
    ) {
      return;
    }

    if (document?.companyId?._id) {
      setSelectedCompany(document.companyId._id);
    }

    reset({
      customerId: document.customerId._id,

      documentDate: document.documentDate.split("T")[0],

      dueDate: document.dueDate ? document.dueDate.split("T")[0] : "",

      items: document.items,

      taxes: document.taxes,

      notes: document.notes || "",
    });
  }, [document, customers, customersLoading, isEditMode, reset]);

  const onSubmit = async (formData) => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0,
    );

    const taxes = formData.taxes.map((tax) => ({
      ...tax,
      amount: Number(((subtotal * tax.percentage) / 100).toFixed(2)),
    }));

    const totalTax = taxes.reduce((sum, tax) => sum + tax.amount, 0);

    const totalAmount = subtotal + totalTax;

    const payload = {
      ...formData,

      companyId: selectedCompany,

      documentType,

      subtotal,

      taxes,

      totalTax,

      totalAmount,

      notes: formData.notes.trim() || DEFAULT_NOTES,
    };

    try {
      if (isEditMode) {
        await updateDocumentMutation.mutateAsync({
          id: document._id,
          data: payload,
        });

        // Regenerate the PDF on the server
        await regeneratePdfMutation.mutateAsync(document._id);

        // Download the updated PDF
        await downloadPdfMutation.mutateAsync(document._id);
      } else {
        const response = await createDocumentMutation.mutateAsync(payload);

        await downloadPdfMutation.mutateAsync(response.data._id);

        reset();
      }

      navigate(routes.DOCUMENTS);
    } catch {}
  };

  if (loading) {
    return <p>Loading document...</p>;
  }

  const DEFAULT_NOTES =
    "Thank you for your business! We appreciate the opportunity to serve you.";

  console.log("Companies:", companies);
  console.log("Selected Company:", selectedCompanyData);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerSection
          companies={companies}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}

          customers={customerOptions}

          register={register}
          errors={errors}
        />

        <DocumentSection register={register} />

        <ItemsTable
          control={control}
          register={register}
          errors={errors}
          sacCodes={sacCodes}
          onAddSacCode={(index) => {
            setSelectedItemIndex(index);
            setShowSacModal(true);
          }}
        />

        <TaxesSection
          control={control}
          gstOptions={selectedCompanyData?.gstOptions || []}
        />

        <NotesSection register={register} />

        <FooterActions
          loading={
            isEditMode
              ? updateDocumentMutation.isPending ||
                regeneratePdfMutation.isPending ||
                downloadPdfMutation.isPending
              : createDocumentMutation.isPending ||
                downloadPdfMutation.isPending
          }
          text={isEditMode ? "Update Document" : "Generate PDF"}
        />
      </form>

      <AddSacCodeModal
        show={showSacModal}
        onClose={() => setShowSacModal(false)}
        onSuccess={(newSac) => {
          setValue(`items.${selectedItemIndex}.hsnSacCode`, newSac.code);

          setShowSacModal(false);
        }}
      />
    </>
  );
}

export default CreateDocumentForm;
