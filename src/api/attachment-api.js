import * as request from "./requester";

const BASE_URL = `${import.meta.env.VITE_HEROKU_APP_URL}/attachments`;

const create = async (expenseId, url, name) =>
  request.post(`${BASE_URL}/create`, { expenseId, url, name });

const getAll = async (expenseId) => {
  const attachments = await request.get(`${BASE_URL}/${expenseId}`);
  return attachments;
};

const attachmentAPI = {
  create,
  getAll,
};

export default attachmentAPI;
