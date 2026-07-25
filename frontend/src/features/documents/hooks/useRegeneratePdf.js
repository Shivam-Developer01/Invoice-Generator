import { useMutation } from "@tanstack/react-query"

import handleApiError from "../../../utils/handleApiError";
import * as documentService from "../services/documentService";

function useRegeneratePdf() {
  return useMutation({
    mutationFn: documentService.regeneratePdf,
    onError: handleApiError,
  });
}

export default useRegeneratePdf;
