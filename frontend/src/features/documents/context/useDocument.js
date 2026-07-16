import { useContext } from "react";
import { DocumentContext } from "./DocumentContext";

function useDocument() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error("useDocument must be used inside DocumentProvider");
  }

  return context;
}

export default useDocument;
