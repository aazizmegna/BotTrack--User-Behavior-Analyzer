const axios = require("axios");

export async function createCompany(data) {
  const response = await axios.post(`/api/company/create`, { company: data });
  return response.data;
}
export async function getCompanyInfos() {
  const response = await axios.get("/api/company/companyinfo", {
    withCredentials: true,
  });
  return response.data;
}
export async function getidleinfo() {
  const response = await axios.get("/api/settingidle/getidleinfo", {
    withCredentials: true,
  });
  return response.data;
}
export async function updateIdle(data) {
  const response = await axios.put("/api/settingidle/updateidle", {
    data,
    withCredentials: true,
  });
  return response.data;
}
export async function updateCompany(id, data) {
  const response = await axios.put(`/api/company/update/${id}`, {
    data,
    withCredentials: true,
  });
  return response.data;
}
export async function calculateBQ(data) {
  const response = await axios.put("/api/workingtime/calculate", {
    data,
    withCredentials: true,
  });
  return response.data;
}
