import api from "../../../api/axios";

export const getCustomers = async (params) => {
  const response = await api.get("/customers", {
    params,
  });

  return response.data;
};

export const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);

  return response.data;
};

export const createCustomer = async (data) => {
  const response = await api.post("/customers", data);

  return response.data;
};

export const updateCustomer = async ({ id, data }) => {
  const response = await api.patch(`/customers/${id}`, data);

  return response.data;
};

export const updateCustomerStatus = async ({ id, isActive }) => {
  const response = await api.patch(`/customers/${id}/status`, { isActive });

  return response.data;
};
