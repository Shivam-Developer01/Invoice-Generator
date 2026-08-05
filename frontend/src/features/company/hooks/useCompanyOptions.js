import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as companyService from "../services/companyService";

const useCompanyOptions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY_OPTIONS],

    queryFn: companyService.getCompanyOptions,

    staleTime: Infinity,
  });
};

export default useCompanyOptions;
