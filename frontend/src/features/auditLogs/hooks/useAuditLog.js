import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import * as auditLogService from "../services/auditLogService";

function useAuditLog(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.AUDIT_LOG, id],
    queryFn: () => auditLogService.getAuditLog(id),
    enabled: Boolean(id),
  });
}

export default useAuditLog;
