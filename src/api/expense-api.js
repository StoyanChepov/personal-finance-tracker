import * as request from "./requester";

const BASE_URL = `${import.meta.env.VITE_HEROKU_APP_URL}/expenses`;

const getAll = async () => {
  const expenses = await request.get(BASE_URL);
  return expenses;
};

export const getLatest = async (count) => {
  const urlSearchParams = new URLSearchParams({
    //sortBy: '_createdOn desc',
    pageSize: count,
  });
  const expenses = await request.get(
    `${BASE_URL}?${urlSearchParams.toString()}`
  );

  const latestExpenses = Object.values(expenses);
  return latestExpenses;
};

const getById = async (expenseId) => {
  const expense = await request.get(`${BASE_URL}/${expenseId}`);
  /*
  const expense = {
    id: 1,
    name: "Rent",
    category: "Housing",
    amount: 500,
    date: "01/01/2021",
    price: 500,
    quantity: 1,
  };
  */
  return expense;
};

const getItemPosById = async (itemPosId) => {
  console.log("itemPosId in getItemPosById: ", itemPosId);
  const itemPos = await request.get(`${BASE_URL}/line/${itemPosId}`);
  return itemPos;
};

export const create = async (expenseData) =>
  request.post(`${BASE_URL}/create`, expenseData);

export const createItemPosition = async (expenseData) =>
  request.post(`${BASE_URL}/create/line`, expenseData);

export const updateItemPosition = async (itemPositionId, data) =>
  request.put(`${BASE_URL}/update/line/${itemPositionId}`, data);

export const update = async (expenseId, expenseData) =>
  request.put(`${BASE_URL}/${expenseId}`, expenseData);
export const remove = async (expenseId) =>
  request.del(`${BASE_URL}/${expenseId}`);

export const removeItemPos = async (itemPosId) =>
  request.del(`${BASE_URL}/delete/line/${itemPosId}`);

const expenseAPI = {
  getAll,
  getItemPosById,
  getById,
  create,
  createItemPosition,
  updateItemPosition,
  update,
  remove,
  getLatest,
  removeItemPos,
};

export default expenseAPI;
