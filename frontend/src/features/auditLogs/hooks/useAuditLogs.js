import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as auditLogService from "../services/auditLogService";

function useAuditLogs(params) {
  return useQuery({
    queryKey: [QUERY_KEYS.AUDIT_LOGS, params],
    queryFn: () => auditLogService.getAuditLogs(params),
  });
}

export default useAuditLogs;
