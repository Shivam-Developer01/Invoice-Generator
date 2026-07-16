import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as sacCodeService from "../services/sacCodeService";

function useCreateSacCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sacCodeService.createSacCode,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SAC_CODES],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
}

export default useCreateSacCode;
