import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as userService from "../services/userService";

function useUser(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: () => userService.getUser(id),
    enabled: Boolean(id),
  });
}

export default useUser;
