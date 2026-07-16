import api from "../../../api/axios";

export const getSacCodes = async () => {
  const response = await api.get("/sac-codes/dropdown");

  return response.data;
};

export const createSacCode = async (data) => {
  const response = await api.post("/sac-codes", data);

  return response.data;
};
