import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as documentSettingsService from "../services/documentSettingsService";

function useDocumentSettings() {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCUMENT_SETTINGS],
    queryFn: documentSettingsService.getDocumentSettings,
  });
}

export default useDocumentSettings;
