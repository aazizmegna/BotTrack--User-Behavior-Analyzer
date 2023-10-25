const axios = require("axios");

//Get all enployees for the company where the connected user work for
export async function getAllEmployees(data) {
  const response = await axios.get("/api/employee/listall", {
    params: {
      data,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function getAllManagers(data) {
  const response = await axios.get("/api/employee/listmanager", {
    params: {
      data,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function getAllEmployees1(data) {
  const response = await axios.get("/api/employee/listall1", {
    params: {
      data,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function getAllEmployees2(data) {
  const response = await axios.get("/api/employee/listall2", {
    params: {
      data,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function createEmployee(data) {
  const response = await axios.post("/api/employee/create", {
    employee: data,
    withCredentials: true,
  });
  return response.data;
}
export async function changeRole(id, data) {
  const response = await axios.put(`/api/employee/updateRole/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}
export async function updatePassword(id, data) {
  const response = await axios.put(`/api/employee/updatepassword/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}
export async function updateMyProfile(id, data) {
  const response = await axios.put(`/api/employee/updateprofile/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}
