import * as request from "./requester";

const BASE_URL = `${import.meta.env.VITE_HEROKU_APP_URL}/categories`;

const create = async (name) =>
  request.post(`${BASE_URL}/create`, { name });

const getAll = async () => {
  const categories = await request.get(`${BASE_URL}`);
  return categories;
};

const categoryAPI = {
  create,
  getAll,
};

export default categoryAPI;
