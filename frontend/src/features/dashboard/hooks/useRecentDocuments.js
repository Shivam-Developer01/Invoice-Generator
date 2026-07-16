import { useQuery } from "@tanstack/react-query";

import { getRecentDocuments } from "../services/dashboard.api";

function useRecentDocuments() {
  return useQuery({
    queryKey: ["recent-documents"],
    queryFn: getRecentDocuments,
  });
}

export default useRecentDocuments;
