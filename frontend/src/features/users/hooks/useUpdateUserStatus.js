import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import QUERY_KEYS from "../../../constants/queryKeys";

import handleApiError from "../../../utils/handleApiError";

import * as userService from "../services/userService";

function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUserStatus,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },

    onError: handleApiError,
  });
}

export default useUpdateUserStatus;
