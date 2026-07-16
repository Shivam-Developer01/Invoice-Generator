import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import handleApiError from "../../../utils/handleApiError";
import * as documentService from "../services/documentService";

function useDownloadPdf() {
  return useMutation({
    mutationFn: documentService.downloadPdf,

    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully");
    },

    onError: handleApiError,
  });
}

export default useDownloadPdf;
