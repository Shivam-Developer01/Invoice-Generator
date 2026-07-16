import { createContext, useMemo, useState } from "react";

export const DocumentContext = createContext(null);

function DocumentProvider({ children }) {
  const [documentType, setDocumentType] = useState("INVOICE");

  const value = useMemo(
    () => ({
      documentType,
      setDocumentType,
    }),
    [documentType],
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentProvider;
