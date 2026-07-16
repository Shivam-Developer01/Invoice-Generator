import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";
import handleApiError from "../../../utils/handleApiError";

import * as documentService from "../services/documentService";

function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.deleteDocument,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DOCUMENTS],
      });
    },

    onError: handleApiError,
  });
}

export default useDeleteDocument;
