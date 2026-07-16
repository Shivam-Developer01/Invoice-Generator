import { useState } from "react";

function useTableParams(initialValues = {}) {
  const defaultParams = {
    page: 1,
    limit: 10,
    search: "",
    sort: "createdAt",
    order: "desc",
  };

  const [params, setParams] = useState(defaultParams);

  const setPage = (page) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const setLimit = (limit) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      limit,
    }));
  };

  const setSearch = (search) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const setSort = (sort) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      sort,
    }));
  };

  const resetParams = () => {
    setParams(defaultParams);
  };

  return {
    params,

    setParams,

    setPage,

    setLimit,

    setSearch,

    setSort,

    resetParams,
  };
}

export default useTableParams;
