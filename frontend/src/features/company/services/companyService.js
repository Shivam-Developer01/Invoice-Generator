import api from "../../../api/axios";

export const getCompanies = async (params) => {
  const response = await api.get("/companies", {
    params,
  });

  return response.data;
};

export const getCompany = async (id) => {
  const response = await api.get(`/companies/${id}`);

  return response.data;
};

export const getCompanyOptions = async () => {
  const response = await api.get("/companies/options");

  return response.data;
};

export const createCompany = async (data) => {
  const config = data instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
  const response = await api.post("/companies", data, config);

  return response.data;
};

export const updateCompany = async ({ id, data }) => {
  const config = data instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
  const response = await api.patch(`/companies/${id}`, data, config);

  return response.data;
};

export const updateCompanyStatus = async ({ id, isActive }) => {
  const response = await api.patch(`/companies/${id}/status`, {
    isActive,
  });

  return response.data;
};

export const uploadLogo = async ({ id, data }) => {
  const response = await api.post(`/companies/${id}/logo`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
