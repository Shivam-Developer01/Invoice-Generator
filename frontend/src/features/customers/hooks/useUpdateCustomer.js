import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";
import handleApiError from "../../../utils/handleApiError";

import * as customerService from "../services/customerService";

function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.updateCustomer,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CUSTOMERS],
      });
    },

    onError: handleApiError,
  });
}

export default useUpdateCustomer;
