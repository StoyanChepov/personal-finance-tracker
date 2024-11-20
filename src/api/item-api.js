import * as request from "./requester";

const BASE_URL = `${import.meta.env.VITE_HEROKU_APP_URL}/items`;

const create = async (name, type) =>
  request.post(`${BASE_URL}/create`, { name, type });

const getAll = async () => {
  const items = await request.get(`${BASE_URL}`);
  return items;
};

const getAllUnits = async () => {
  const units = await request.get(`${BASE_URL}/units`);
  return units;
};

const getAllItemTypes = async () => {
  const items = await request.get(`${BASE_URL}/types`);
  return items;
};

const itemAPI = {
  create,
  getAll,
  getAllItemTypes,
  getAllUnits,
};

export default itemAPI;
