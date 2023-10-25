import axios from "axios";
export async function getAllPermission() {
  const response = await axios.get("/api/permission/getpermission", {
    withCredentials: true,
  });
  return response.data;
}

export async function updatePermission(data) {
  const response = await axios.put("/api/permission/updatepermission", {
    withCredentials: true,
    data,
  });
  return response.data;
}
