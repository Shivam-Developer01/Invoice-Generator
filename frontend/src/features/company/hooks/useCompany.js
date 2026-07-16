import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as companyService from "../services/companyService";

function useCompany() {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY],
    queryFn: companyService.getCompany,
  });
}

export default useCompany;
