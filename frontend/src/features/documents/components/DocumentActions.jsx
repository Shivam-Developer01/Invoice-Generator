import TableActions from "../../../components/ui/TableActions/TableActions";

function DocumentActions({ document, onView, onEdit, onDownload, onDelete }) {
  return (
    <TableActions
      onView={() => onView(document)}
      onEdit={() => onEdit(document)}
      onDelete={() => onDelete(document)}
      extraActions={[
        {
          label: "Download PDF",
          onClick: () => onDownload(document),
        },
      ]}
    />
  );
}

export default DocumentActions;
