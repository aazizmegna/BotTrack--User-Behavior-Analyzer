// const axios = require("axios");

// //---For Productive
// export async function getActivityarchicalproductive() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //---For nonProductive
// export async function getActivityarchicalnonproductive() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalnonproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //---For undefined
// export async function getActivityarchicalundefined() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalundefined",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----------For yesterday

// // Productive
// export async function getActivityarchicalyesterdayprod() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalyesterdayproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Non productive
// export async function getActivityarchicalyesterdaynonprod() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalyesterdaynonproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Undefined
// export async function getActivityarchicalyesterdayundefined() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalyesterdayundefined",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // This is for working hours and last 7/30 activities (on the dashboard) parts

// //----For today

// export async function getActivityarhourstoday() {
//   const response = await axios.get("/api/innerjoin/getproductsummtabletoday", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// //----For yesterday

// export async function getActivityarhoursyesterday() {
//   const response = await axios.get(
//     "/api/innerjoin/getproductsummtableyesterday",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----For last 7 days

// export async function getActivityarhoursweek() {
//   const response = await axios.get("/api/innerjoin/getproductsummtableweek", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// //----For last 30 days

// export async function getActivityhoursmonth() {
//   const response = await axios.get("/api/innerjoin/getproductsummtablemonth", {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // All activities archical that will be display on topWebsite
// export async function getActivityweb() {
//   const response = await axios.get("/api/innerjoin/listtopwebsite", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebyesterday() {
//   const response = await axios.get("/api/innerjoin/listtopwebsiteyesterday", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebweek() {
//   const response = await axios.get("/api/innerjoin/listtopwebsiteweek", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebmounth() {
//   const response = await axios.get("/api/innerjoin/listtopwebsitemounth", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// // All activities archical that will be display on topApp
// export async function getActivityapp() {
//   const response = await axios.get("/api/innerjoin/listtopapp", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappyesterday() {
//   const response = await axios.get("/api/innerjoin/listtopappyesterday", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappweek() {
//   const response = await axios.get("/api/innerjoin/listtopappweek", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappmounth() {
//   const response = await axios.get("/api/innerjoin/listtopappmounth", {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // All activities archical for all users in the company
// export async function getAllActivityArchical() {
//   const response = await axios.get("/api/innerjoin/listallarchical", {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // All activities logs
// export async function getAllActivityLogs(page, itemsPerPage) {
//   const response = await axios.get("/api/innerjoin/listallactivitylog", {
//     params: {
//       page,
//       itemsPerPage,
//     },
//     withCredentials: true,
//   });
//   return response.data;
// }

// //Get the lis of all manage activity, activities of companies and used by
// //Productive
// export async function getAllActivitymanageprod() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivitymanageproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // non-productive
// export async function getAllActivitymanagenonprod() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivitymanagenonproductive",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // Select specific manage activity
// export async function getSelectedActivitymanage(id) {
//   const response = await axios.get(
//     `/api/innerjoin/selectactivitymanage/${id}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // For assigning category to pending plassification
// export async function updateActivityCategory(id, data) {
//   const response = await axios.put(`api/activity/update/${id}`, {
//     activity: data,
//     withCredentials: true,
//   });
//   return response.data;
// }

// // working time
// export async function getWorkingTime() {
//   const response = await axios.get("/api/innerjoin/listworkhours", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// // working time yesterday
// export async function getWorkingTimeYesterday() {
//   const response = await axios.get("/api/innerjoin/listworkhoursyesterday", {
//     withCredentials: true,
//   });
//   return response.data;
// }
// //no activity dashboard  ;
// export async function getNoactivityfortoday() {
//   const response = await axios.get(
//     "/api/innerjoin/listactivityarchicalnoactivity",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //=====================================================================================================
// // All activities archical that will be display on the bottom of the dashboard

// // ----For today-------------

// //---For Productive
// export async function getActivityarchicalproductive1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //---For nonProductive
// export async function getActivityarchicalnonproductive1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalnonproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //---For undefined
// export async function getActivityarchicalundefined1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalundefined/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----------For yesterday

// // Productive
// export async function getActivityarchicalyesterdayprod1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalyesterdayproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Non productive
// export async function getActivityarchicalyesterdaynonprod1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalyesterdaynonproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Undefined
// export async function getActivityarchicalyesterdayundefined1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalyesterdayundefined/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // This is for working hours and last 7/30 activities (on the dashboard) parts

// //----For today

// export async function getActivityarhourstoday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/getproductsummtabletoday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----For yesterday

// export async function getActivityarhoursyesterday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/getproductsummtableyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----For last 7 days

// export async function getActivityarhoursweek1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/getproductsummtableweek/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //----For last 30 days

// export async function getActivityhoursmonth1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/getproductsummtablemonth/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // All activities archical that will be display on topWebsite
// export async function getActivityweb1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listtopwebsite/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebyesterday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listtopwebsiteyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getActivitywebweek1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listtopwebsiteweek/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getActivitywebmounth1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listtopwebsitemonth/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // All activities archical that will be display on topApp
// export async function getActivityapp1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listtopapp/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappyesterday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listtopappyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getActivityappweek1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listtopappweek/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappmounth1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listtopappmonth/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // All activities archical for all users in the company
// export async function getAllActivityArchical1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listallarchical/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // All activities logs
// export async function getAllActivityLogs1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listallactivitylog/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //Get the lis of all manage activity, activities of companies and used by
// //Productive
// export async function getAllActivitymanageprod1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivitymanageproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // non-productive
// export async function getAllActivitymanagenonprod1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivitymanagenonproductive/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // Select specific manage activity
// export async function getSelectedActivitymanage1(id) {
//   const response = await axios.get(
//     `/api/innerjoin/selectactivitymanage/${id}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // For assigning category to pending plassification
// export async function updateActivityCategory1(id, data) {
//   const response = await axios.put(`api/activity/update/${id}`, {
//     activity: data,
//     withCredentials: true,
//   });
//   return response.data;
// }

// // working time
// export async function getWorkingTime1(idUser) {
//   const response = await axios.get(`/api/innerjoin/listworkhours/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// // working time yesterday
// export async function getWorkingTimeYesterday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listworkhoursyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //no activity dashboard  ;
// export async function getNoactivityfortoday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalnoactivity/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getNoactivityforyesterday1(idUser) {
//   const response = await axios.get(
//     `/api/innerjoin/listactivityarchicalnoactivityyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

const axios = require("axios");

// // Get 5 top apps, top webs and top categories for currenday
// export async function getTop5Today(idUser) {
//   const response = await axios.get(`/api/appweb/showmostusedtoday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// // Get 5 top apps, top webs and top categories for yesterday
// export async function getTop5Yesterday(idUser) {
//   const response = await axios.get(
//     `/api/appweb/showmostusedyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // Get working time and productivity for today
// export async function getWorkingProToday(idUser) {
//   const response = await axios.get(
//     `/api/workingtime/getworkinghourstoday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Get working time and productivity for today
// export async function getWorkingProWeek(idUser) {
//   const response = await axios.get(
//     `/api/workingtime/getuserandgrouponeweek/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Get working time and productivity for today
// export async function getWorkingProMonth(idUser) {
//   const response = await axios.get(
//     `/api/workingtime/getuserandgroupomonth/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Get working time and productivity for yesterday
// export async function getWorkingProYesterday(idUser) {
//   const response = await axios.get(
//     `/api/workingtime/getworkinghoursyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // Get working hours range for a week, month and range date
// export async function getWorkingProRange(idUser, daterange) {
//   const response = await axios.get(
//     `/api/workingtime/getworkinghourarangedate/${idUser}/${daterange}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // get productivity unproductivity undifend and no activity for today
// export async function getActivitiesToday(idUser) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiestoday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // get productivity unproductivity undifend and no activity for yesterday
// export async function getActivitiesYestesday(idUser) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiesyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// // get working hours
// export async function getWorkingHoursToday(idUser) {
//   const response = await axios.get(`/api/appweb/listworkhoursToday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getWorkingHoursYesterday(idUser) {
//   const response = await axios.get(
//     `/api/appweb/listworkhoursYesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //Get sub-activities
// export async function getSubActToday(idUser, acrId) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiestitlestoday/${idUser}/${acrId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getSubActYesterday(idUser, acrId) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiestitlesyesterday/${idUser}/${acrId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// // All activities logs
// export async function getAllActivityLogs(idUser, page, itemsPerPage) {
//   const response = await axios.get(
//     `/api/innerjoin/listallactivitylog/${idUser}`,
//     {
//       params: {
//         page,
//         itemsPerPage,
//       },
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getAllActivityLogsYesterday(idUser, page, itemsPerPage) {
//   const response = await axios.get(
//     `/api/innerjoin/listallactivitylogyesterday/${idUser}`,
//     {
//       params: {
//         page,
//         itemsPerPage,
//       },
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getAllActivityLogsWeek(idUser, page, itemsPerPage) {
//   const response = await axios.get(
//     `/api/innerjoin/listallactivityoneweekago/${idUser}`,
//     {
//       params: {
//         page,
//         itemsPerPage,
//       },
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getAllActivityLogsMonth(idUser, page, itemsPerPage) {
//   const response = await axios.get(
//     `/api/innerjoin/listallactivityonemonthago/${idUser}`,
//     {
//       params: {
//         page,
//         itemsPerPage,
//       },
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //Top websites

// export async function getActivityweb(idUser) {
//   const response = await axios.get(`/api/appweb/websstoday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebyesterday(idUser) {
//   const response = await axios.get(`/api/appweb/websyesterday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebweek(idUser) {
//   const response = await axios.get(`/api/appweb/websoneweek/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivitywebmounth(idUser) {
//   const response = await axios.get(`/api/appweb/websonemonth/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// //to app
// export async function getActivityapp(idUser) {
//   const response = await axios.get(`/api/appweb/appstoday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappyesterday(idUser) {
//   const response = await axios.get(`/api/appweb/appsyesterday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappweek(idUser) {
//   const response = await axios.get(`/api/appweb/appsoneweek/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityappmonth(idUser) {
//   const response = await axios.get(`/api/appweb/appsonemonth/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// //get top 5 productivity for everyone on company_activities for today

// export async function getTop5CompanyProToday() {
//   const response = await axios.get(
//     "/api/appweb/listtop5productivitiesforcompanytoday/",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getTop5CompanyProYesterday() {
//   const response = await axios.get(
//     "/api/appweb/listtop5productivitiesforcompanyyesterday/",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// //get top 5 Distracting for everyone on company_activities for today

// export async function getTop5CompanyDisToday() {
//   const response = await axios.get(
//     "/api/appweb/listtop5nonproductivitiesforcompanytoday/",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getTop5CompanyDisYesterday() {
//   const response = await axios.get(
//     "/api/appweb/listtop5nonproductivitiesforcompanyyesterday/",
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //Get subtitle top web
// export async function getSubActivitywebtoday(idUser, icrId) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiestitlestoday/${idUser}/${icrId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getSubActivitywebyesterday(idUser, icrId) {
//   const response = await axios.get(
//     `/api/appweb/showactivitiestitlesyesterday/${idUser}/${icrId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //top Categories
// export async function getActivityCat(idUser) {
//   const response = await axios.get(`/api/appweb/categoriestoday/${idUser}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }
// export async function getActivityCatyesterday(idUser) {
//   const response = await axios.get(
//     `/api/appweb/categoriesyesterday/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getActivityCatWeek(idUser) {
//   const response = await axios.get(
//     `/api/appweb/categoriesoneweekago/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getActivityCatMonth(idUser) {
//   const response = await axios.get(
//     `/api/appweb/categoriesonemounth/${idUser}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

// //Get subtitle top category
// export async function getSubCategorytoday(idUser, catId) {
//   const response = await axios.get(
//     `/api/appweb/categoriestitlestoday/${idUser}/${catId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }
// export async function getSubCategoryyesterday(idUser, catId) {
//   const response = await axios.get(
//     `/api/appweb/categoriestitlesyesterday/${idUser}/${catId}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data;
// }

///////////////////////////Filter start here///////////////////////////////////
// Category filter route
export async function getCategoryFilter(id, data, page, itemsPerPage) {
  const response = await axios.get(`/api/search/category/${id}`, {
    withCredentials: true,
    params: {
      data,
      page,
      itemsPerPage,
    },
  });
  return response.data;
}
// Category title filter route
export async function getCategoryFilterTitle(id, catId, data) {
  const response = await axios.post(
    `/api/search/categoriestitles/${id}/${catId}`,
    {
      category: data,
      withCredentials: true,
    }
  );
  return response.data;
}
// Top App filter route
export async function getTopAppFilter(id, data, page, itemsPerPage) {
  const response = await axios.get(`/api/search/apps/${id}`, {
    withCredentials: true,
    params: {
      data,
      page,
      itemsPerPage,
    },
  });
  return response.data;
}
// Top Web filter route
export async function getTopWebFilter(id, data, page, itemsPerPage) {
  const response = await axios.get(`/api/search/webs/${id}`, {
    withCredentials: true,
    params:{
      data,
      page,
      itemsPerPage,
    }
  });
  return response.data;
}
// Top Apps and Webs title filter route
export async function getTopAppFilterTitle(id, acrId, data) {
  console.log('id and arcId', [id,acrId]);
  const response = await axios.get(
    `/api/search/activitytitles/${id}/${acrId}`,
    {
      withCredentials: true,
      params: {
        data,
      },
    }
  );
  console.log('api data',response.data);
  return response.data;
}
// Top working hours filter route
export async function getWorkingHFilter(id, data) {
  const response = await axios.get(
    `/api/search/getworkinghour/${id}`,
    {
      withCredentials: true,
      params: {
        data,
      },
    }
  );
  return response.data;
}
// Productivity and userGroup filter route
export async function getProductivityFilter(id, data) {
  const response = await axios.post(`/api/search/showmoproductivity/${id}`,
    {
      withCredentials: true,
      data,
  });
  return response.data;
}
// ActivityLog filter route
export async function getActivityLogFilter(id, data, page, itemsPerPage) {
  const response = await axios.get(`/api/search/showactivitylog/${id}`, {
    withCredentials: true,
    params: {
      data,
      page,
      itemsPerPage,
    },
  });
  return response.data;
}
// Company_dashboard filter route
export async function getCompanyDashboardFilter(data) {
  const response = await axios.get("/api/search/company_dashboard", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
// Company_dashboard filter route
export async function getManageProdFilter(data) {
  const response = await axios.get("/api/search/getmanageproductive", {
    withCredentials: true,
    params: {
      data, 
    },
  });
  return response.data;
}
export async function getManageNonProdFilter(data) {
  const response = await axios.get("/api/search/getmanagenonproductive", {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
//Company dashboard
export async function getDashboardFilter(id, data) {
  const response = await axios.get(`/api/search/showmosdashboard/${id}`, {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}

export async function getActivityCountFilter(id, data) {
  const response = await axios.get(`/api/search/showcount/${id}`, {
    withCredentials: true,
    params: {
      data,
    },
  });
  return response.data;
}
// For assigning category to pending plassification
export async function updateActivityCategory(id, oldCatId, data) {
  const response = await axios.put(`api/activity/update/${id}/${oldCatId}`, {
    category_id: data,
    withCredentials: true,
  });
  return response.data;
}

//Get the lis of all manage activity, activities of companies and used by
//Productive
export async function getAllActivitymanageprod() {
  const response = await axios.get("/api/manageactivity/getmanageproductive", {
    withCredentials: true,
  });
  return response.data;
}

// non-productive
export async function getAllActivitymanagenonprod() {
  const response = await axios.get(
    "/api/manageactivity/getmanagenonproductive/",
    {
      withCredentials: true,
    }
  );
  return response.data;
}
// Select specific manage activity rule
export async function getSelectedActivitymanageRule(id) {
  const response = await axios.get(
    `/api/manageactivity/getrules_manage/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

// Select specific manage activity
export async function getSelectedActivitymanage(id) {
  const response = await axios.get(
    `/api/manageactivity/getmanage_people/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

//Get sub-activities
export async function getSubActToday(idUser, acrId) {
  const response = await axios.get(
    `/api/appweb/showactivitiestitlestoday/${idUser}/${acrId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
export async function getSubActYesterday(idUser, acrId) {
  const response = await axios.get(
    `/api/appweb/showactivitiestitlesyesterday/${idUser}/${acrId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}