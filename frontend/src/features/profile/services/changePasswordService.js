import api from "../../../api/axios";

export const changePassword = async (data) => {
  const response = await api.patch("/users/change-password", data);

  return response.data;
};
