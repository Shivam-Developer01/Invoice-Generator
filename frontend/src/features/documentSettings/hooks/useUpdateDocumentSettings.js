import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";

import handleApiError from "../../../utils/handleApiError";

import * as documentSettingsService from "../services/documentSettingsService";

function useUpdateDocumentSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentSettingsService.updateDocumentSettings,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DOCUMENT_SETTINGS],
      });
    },

    onError: handleApiError,
  });
}

export default useUpdateDocumentSettings;
