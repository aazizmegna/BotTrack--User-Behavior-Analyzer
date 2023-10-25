const axios = require("axios");

export async function getAllCategories() {
  const response = await axios.get("/api/category/list/:id", {
    withCredentials: true,
  });
  return response.data;
}
export async function getAllCategoriesSetting() {
  const response = await axios.get("/api/tryactivity/showcategories", {
    withCredentials: true,
  });
  return response.data;
}

// // THis will be display on topCategories
// export async function getAllCategoriesActivity() {
//   const response = await axios.get("/api/innerjoin/listcategori", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getAllCategoriesActivityyesterday() {
//   const response = await axios.get("/api/innerjoin/listcategoriyesterday", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getAllCategoriesActivityweek() {
//   const response = await axios.get("/api/innerjoin/listcategoriweek", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getAllCategoriesActivitymonth() {
//   const response = await axios.get("/api/innerjoin/listcategorimonth", {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // THis will be display on qtrack/SettingCategories.vue
// export async function getAllCategoriesActivitynumbers() {
//   const response = await axios.get("/api/innerjoin/categoriesnumber", {
//     withCredentials: true,
//   });
//   return response.data;
// }

// export async function createCategory(data) {
//   const response = await axios.post(`/api/category/create`, { category: data });
//   return response.data;
// }
// export async function deleteCategories(data) {
//   const response = await axios.delete(`/api/category/delete`, {
//     data: data,
//   });
//   return response.data;
// }

// // // THis will be display on topCategories
// // export async function getAllCategoriesActivity1(idUser) {
// //   const response = await axios.get(`/api/innerjoin/listcategori/${idUser}`, {
// //     withCredentials: true,
// //   });
// //   return response.data;
// // }
// // export async function getAllCategoriesActivityyesterday1(idUser) {
// //   const response = await axios.get(
// //     `/api/innerjoin/listcategoriyesterday/${idUser}`,
// //     {
// //       withCredentials: true,
// //     }
// //   );
// //   return response.data;
// // }

// export async function getAllCategoriesActivityweek1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listcategoriweek/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getAllCategoriesActivitymonth1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listcategorimonth/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
