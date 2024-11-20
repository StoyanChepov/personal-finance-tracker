export const getAccessToken = () => {
  const authJSON = localStorage.getItem("auth");
  if (!authJSON) {
    return null;
  }

  const authData = JSON.parse(authJSON);
  return authData?.accessToken;
};
