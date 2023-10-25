const axios = require("axios");

export async function loginService(data) {
  const response = await axios.post(`/api/login`, {
    login: data,
    withCredentials: true,
  });
  return response.data;
}

export async function loginAuthentication() {
  const response = await axios.get("/api/authenticated", {
    withCredentials: true,
  });
  return response.data;
}

export async function logoutService() {
  const response = await axios.get("/api/logout", {
    withCredentials: true,
  });
  return response.data;
}
