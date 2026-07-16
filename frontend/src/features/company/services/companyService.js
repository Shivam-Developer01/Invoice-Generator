import api from "../../../api/axios";

export const getCompany = async () => {
  const response = await api.get("/company");

  return response.data;
};

export const updateCompany = async (data) => {
  const response = await api.patch("/company", data);

  return response.data;
};
