import requester from "./requester";
const BASE_URL = `${import.meta.env.VITE_HEROKU_APP_URL}/users`;

export const login = (email, password) =>
  requester.post(`${BASE_URL}/login`, { email, password });

export const register = (email, password, repass) =>
  requester.post(`${BASE_URL}/register`, {
    email,
    password,
    repass,
  });

export const logout = () => requester.get(`${BASE_URL}/logout`);
