const axios = require("axios");



export async function getAllShifts() {
  const response = await axios.get("/api/shift/showshift", {
    withCredentials: true,
  });
  return response.data;
}

export async function createShift(data) {
  const response = await axios.post("/api/shift/createshift", {
    data,
    withCredentials: true,
  });
  return response.data;
}

export async function getShifts(id) {
  const response = await axios.get(`/api/shift/shift/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
export async function updateShift(id, data) {
  const response = await axios.put(`/api/shift/update/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}
export async function deleteShifts(id) {
  const response = await axios.delete(`/api/shift/delete/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
export async function getstartend(id) {
  const response = await axios.get(`/api/workstartend/list/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
export async function createStartend(id, data) {
  const response = await axios.post(`/api/workstartend/create/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}