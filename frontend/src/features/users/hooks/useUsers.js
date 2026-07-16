import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as userService from "../services/userService";

function useUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: userService.getUsers,
  });
}

export default useUsers;
