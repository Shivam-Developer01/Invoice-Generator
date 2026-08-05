import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";
import handleApiError from "../../../utils/handleApiError";

import * as companyService from "../services/companyService";

const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.createCompany,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMPANIES],
      });
    },

    onError: handleApiError,
  });
};

export default useCreateCompany;
