import { useQuery } from "@tanstack/react-query";

import { getRecentActivities } from "../services/dashboard.api";

function useRecentActivities() {
  return useQuery({
    queryKey: ["recent-activities"],
    queryFn: getRecentActivities,
  });
}

export default useRecentActivities;
