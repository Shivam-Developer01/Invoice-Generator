import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as sacCodeService from "../services/sacCodeService";

function useSacCodes() {
  return useQuery({
    queryKey: [QUERY_KEYS.SAC_CODES],

    queryFn: sacCodeService.getSacCodes,
  });
}

export default useSacCodes;
