import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import * as changePasswordService from "../services/changePasswordService";

import handleApiError from "../../../utils/handleApiError";

function useChangePassword() {
  return useMutation({
    mutationFn: changePasswordService.changePassword,

    onSuccess: (response) => {
      toast.success(response.message);
    },

    onError: handleApiError,
  });
}

export default useChangePassword;
