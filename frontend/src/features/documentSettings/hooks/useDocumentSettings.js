import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import * as documentSettingsService from "../services/documentSettingsService";

function useDocumentSettings(companyId) {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_SETTINGS, companyId],

    queryFn: () => documentSettingsService.getDocumentSettings(companyId),

    enabled: !!companyId,
  });
}

export default useDocumentSettings;
