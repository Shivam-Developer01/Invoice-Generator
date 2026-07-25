import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as companyService from "../services/companyService";
import handleApiError from "../../../utils/handleApiError";

const useUploadLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.uploadLogo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },

    onError: handleApiError,
  });
};

export default useUploadLogo;
