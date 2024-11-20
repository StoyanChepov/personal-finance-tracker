import { getAccessToken } from "../utils/authUtils";

async function requester(method, endpoint, body) {
  console.log("Requester endpoint", endpoint);
  console.log("Requester method", method);
  console.log("Requester body", body);
  const options = { method, headers: {} };

  const accessToken = getAccessToken();
console.log("Requester accessToken", accessToken);

  if (accessToken) {
    options.headers = {
      ...options.headers,
      "X-Authorization": accessToken,
    };
  }
  if (body) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(body);
  }
  const response = await fetch(endpoint, options);
  if (response.status === 204) {
    return response;
  }
  const result = await response.json();
  if (response.ok === false) {
    //1alert(result);
    throw result;
  }
  console.log("Requester", result);
  return result;
}

export const get = requester.bind(undefined, "GET");
export const post = requester.bind(undefined, "POST");
export const put = requester.bind(undefined, "PUT");
export const del = requester.bind(undefined, "DELETE");

export default {
  get,
  post,
  put,
  del,
};
