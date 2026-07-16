import { useQuery } from "@tanstack/react-query";

import { getDashboardCharts } from "../services/dashboard.api";

function useDashboardCharts() {
  return useQuery({
    queryKey: ["dashboard-charts"],
    queryFn: getDashboardCharts,
  });
}

export default useDashboardCharts;