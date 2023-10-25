const axios = require("axios");

//Get all Departments for the company where the connected user work for
export async function getAllCompanyDepartements() {
  const response = await axios.get("/api/mydepartment/getdepart", {
    withCredentials: true,
  });
  return response.data;
}
// ::::::::////////////////////////////////////::///////////////////////////////////////////////////
export async function getAllCompanyDepartements1() {
  const response = await axios.get("/api/mydepartment/getdepartfinal", {
    withCredentials: true,
  });
  return response.data;
}
//Get all Departments for menbers
export async function getSelectedDepartements1(id) {
  const response = await axios.get(
    `/api/mydepartment/getemployeedepartfinal/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Get all Departments for menbers
export async function getSelectedDepartements(id) {
  const response = await axios.get(
    `/api/mydepartment/getemployeedepart/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
//List of Departments when creating a new Team
export async function getListDepartements() {
  const response = await axios.get("/api/department/list", {
    withCredentials: true,
  });
  return response.data;
}

export async function createDepartement(data) {
  const response = await axios.post("/api/mydepartment/createfinaldepart", {
    department: data,
    withCredentials: true,
  });
  return response.data;
}

export async function updateDepartement(id, data) {
  const response = await axios.put(`/api/mydepartment/update/${id}`, {
    department: data,
    withCredentials: true,
  });
  return response.data;
}
export async function deleteDepartment(id) {
  const response = await axios.delete(`/api/mydepartment/deletedepart/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
