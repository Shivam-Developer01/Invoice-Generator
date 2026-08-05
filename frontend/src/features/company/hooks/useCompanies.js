import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as companyService from "../services/companyService";

const useCompanies = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANIES, params],

    queryFn: () => companyService.getCompanies(params),

    keepPreviousData: true,
  });
};

export default useCompanies;
