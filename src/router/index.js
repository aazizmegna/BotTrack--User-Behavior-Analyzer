import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue";
import UsersGroups from "../views/UsersGroups.vue";
import Productivity from "../views/Productivity.vue";
import WorkingHours from "../views/WorkingHours.vue";
import TopWebsites from "../views/TopWebsites.vue";
import TopApps from "../views/TopApps.vue";
import TopCategories from "../views/TopCategories.vue";
import ActivitiesLog from "../views/ActivitiesLog.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "MyDashboard",
    component: Dashboard,
  },
  {
    path: "/usersgroups",
    name: "usersgroups",
    component: UsersGroups,
  },
  {
    path: "/productivity",
    name: "productivity",
    component: Productivity,
  },
  {
    path: "/workinghours",
    name: "workinghours",
    component: WorkingHours,
  },
  {
    path: "/topwebsites",
    name: "Topwebsites",
    component: TopWebsites,
  },
  {
    path: "/topapps",
    name: "topapps",
    component: TopApps,
  },
  {
    path: "/topcategories",
    name: "topcategories",
    component: TopCategories,
  },
  {
    path: "/activitieslog",
    name: "activitieslog",
    component: ActivitiesLog,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
