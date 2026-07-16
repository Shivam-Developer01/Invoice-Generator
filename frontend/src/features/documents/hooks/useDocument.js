import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as documentService from "../services/documentService";

function useDocument(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT, id],
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  });
}

export default useDocument;
