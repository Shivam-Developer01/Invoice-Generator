import { useMutation } from "@tanstack/react-query";

import * as authService from "../services/authService";

const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export default useLogin;
