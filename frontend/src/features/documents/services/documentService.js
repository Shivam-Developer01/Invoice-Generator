import api from "../../../api/axios";

export const getDocuments = async (params) => {
  const response = await api.get("/documents", {
    params,
  });

  return response.data;
};

export const createDocument = async (data) => {
  const response = await api.post("/documents", data);

  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/documents/${id}`);

  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);

  return response.data;
};

export const updateDocument = async ({ id, data }) => {
  const response = await api.patch(`/documents/${id}`, data);

  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);

  return response.data;
};

export const downloadPdf = async (id) => {
  const response = await api.get(`/documents/${id}/pdf`, {
    responseType: "blob",
  });

  return {
    blob: response.data,
    fileName:
      response.headers["content-disposition"]
        ?.split("filename=")[1]
        ?.replace(/"/g, "") || "document.pdf",
  };
};

export const regeneratePdf = async (id) => {
  const response = await api.post(`/documents/${id}/regenerate-pdf`);

  return response.data;
};
