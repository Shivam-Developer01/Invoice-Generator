import useCustomers from "../../customers/hooks/useCustomers";

function useCustomersList() {
  const { data, ...rest } = useCustomers({
    page: 1,
    limit: 1000,
    search: "",
  });

  return {
    customers: data?.data?.data ?? [],
    ...rest,
  };
}

export default useCustomersList;
