import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as customerService from "../services/customerService";

const useCustomers = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMERS, params],

    queryFn: () => customerService.getCustomers(params),

    keepPreviousData: true,
  });
};

export default useCustomers;
