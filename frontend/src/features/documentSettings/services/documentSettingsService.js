import api from "../../../api/axios";

export const getDocumentSettings = async (companyId) => {
  const response = await api.get(`/document-settings/${companyId}`);

  return response.data;
};

export const updateDocumentSettings = async ({ companyId, data }) => {
  const response = await api.patch(`/document-settings/${companyId}`, data);

  return response.data;
};
