import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../services/dashboard.api";

function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}

export default useDashboardStats;
