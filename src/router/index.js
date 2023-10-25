import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { SideBar: false, FilterWidjet: false },
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/logfile",
    name: "logfile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/ActivityLog.vue"),
  },
  {
    path: "/category",
    name: "category",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/TopCategories.vue"
      ),
  },
  {
    path: "/task",
    name: "task",
    meta: { FilterWidjet: false },
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/TaskManager.vue"
      ),
  },
  {
    path: "/workingcalendar/:id",
    name: "vueshift",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/showIdividualShift.vue"
      ),
  },
  {
    path: "/workshift/:id",
    name: "workshift",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/workShift.vue"),
  },
  {
    path: "/activitiescount",
    name: "activitiescount",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/Activitiescount.vue"
      ),
  },
  {
    path: "/workinghuours",
    name: "workinghuours",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/WorkingHours.vue"
      ),
  },
  {
    path: "/topapps",
    name: "topapps",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/TopApps.vue"),
  },
  {
    path: "/topwebs",
    name: "topwebs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/TopWebs.vue"),
  },
  {
    path: "/productivity",
    name: "productivity",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/TopProductivity.vue"
      ),
  },
  {
    path: "/topusers",
    name: "topusers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/TopUsersGroup.vue"
      ),
  },
  {
    path: "/noactivitiespendingrequest",
    name: "noactivitiespendingrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/NoActivityPendingRequest.vue"
      ),
  },
  {
    path: "/noactivitiesdeniedrequest",
    name: "noactivitiesseniedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/NoActivityDeniedRequest.vue"
      ),
  },
  {
    path: "/activitiesdeniedrequest",
    name: "activitiesseniedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ActivityDeniedRequest.vue"
      ),
  },
  {
    path: "/noactivitiesapprouvedrequest",
    name: "noactivitiesapprouvedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/NoActivityApprouvedRequest.vue"
      ),
  },
  {
    path: "/activitiespendingrequest",
    name: "activitiespendingrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ActivityPendingRequest.vue"
      ),
  },
  {
    path: "/activitiesapprouvedrequest",
    name: "activitiesapprouvedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ActivityApprouvedRequest.vue"
      ),
  },
  {
    path: "/manageactivity",
    name: "manageactivity",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ManageActivity/ManageActiivity.vue"
      ),
  },
  {
    path: "/manageactivity/:id",
    name: "productiveallowed",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ManageActivity/ProductivityAllowed.vue"
      ),
  },
  {
    path: "/categorysettinng",
    name: "categorysettinng",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Setting/SettingCategory.vue"
      ),
  },
  {
    path: "/staff",
    name: "staff",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/Staff/StaFf.vue"),
  },
  {
    path: "/computer",
    name: "MoreComputer",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/Staff/MoreComputer.vue"
      ),
  },
  {
    path: "/workingcalendar",
    name: "workingcalendar",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/WorkingCalendar.vue"
      ),
  },
  {
    path: "/pendingrequest",
    name: "pendingrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/PendingRequest.vue"
      ),
  },
  {
    path: "/deniedrequest",
    name: "deniedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/DeniedRequest.vue"
      ),
  },
  {
    path: "/approuvedrequest",
    name: "approuvedrequest",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/ApprouvedRequest.vue"
      ),
  },
  {
    path: "/manager",
    name: "manager",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Qtrack/Staff/ManaGer.vue"
      ),
  },
  {
    path: "/team",
    name: "team",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/Staff/TeaM.vue"),
  },
  {
    path: "/role",
    name: "role",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qtrack/Staff/RoLe.vue"),
  },
  {
    path: "/Profile",
    name: "profile",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Setting/ProfileSetting.vue"
      ),
  },
  {
    path: "/accountdetails",
    name: "accountdetails",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Setting/AccountDetails.vue"
      ),
  },
  {
    path: "/company",
    name: "company",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompanyDashboard.vue"),
  },
  {
    path: "/WorkQuality",
    name: "WorkQuality",
    meta: { FilterWidjet: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Setting/WqQScore.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
