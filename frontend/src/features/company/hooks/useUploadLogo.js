import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as companyService from "../services/companyService";
import handleApiError from "../../../utils/handleApiError";
import QUERY_KEYS from "../../../constants/queryKeys";
import { toast } from "react-toastify";

const useUploadLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.uploadLogo,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMPANIES],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMPANY],
      });
    },

    onError: handleApiError,
  });
};

export default useUploadLogo;
