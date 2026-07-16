import api from "../../../api/axios";

export const getDocumentSettings = async () => {
  const response = await api.get("/document-settings");

  return response.data;
};

export const updateDocumentSettings = async (data) => {
  const response = await api.patch("/document-settings", data);

  return response.data;
};
