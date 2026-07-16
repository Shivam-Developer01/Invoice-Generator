import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as documentService from "../services/documentService";

function useDocuments(params) {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCUMENTS, params],
    queryFn: () => documentService.getDocuments(params),
  });
}

export default useDocuments;
