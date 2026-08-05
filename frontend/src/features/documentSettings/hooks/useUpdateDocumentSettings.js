import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";
import handleApiError from "../../../utils/handleApiError";

import * as documentSettingsService from "../services/documentSettingsService";

function useUpdateDocumentSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentSettingsService.updateDocumentSettings,

    onSuccess: async (response, variables) => {
      toast.success(response.message);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DOCUMENT_SETTINGS, variables.companyId],
      });
    },

    onError: handleApiError,
  });
}

export default useUpdateDocumentSettings;
