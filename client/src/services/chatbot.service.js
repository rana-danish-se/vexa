import api from "./api";

export const createChatbot = async (data) => {
  const response = await api.post("/chatbots", data);
  return response.data;
};
