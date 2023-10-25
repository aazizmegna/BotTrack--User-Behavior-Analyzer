import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedPeriod: null,
    selectedDefaultDate: null,
    selectedDate: null,
    selectedDateRange: null,
    id: null,
    loggedInUser: "",
    login_user_name: "",
    login_user_id: null,
    clicked_user_id: null,
    clicked_user_email: null,
    userRole: null,
    sidebarOpen: true,
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },

    SET_LOGGED_IN_USER(state, userEmail) {
      state.loggedInUser = userEmail;
    },
    SET_PERIOD(state, selectedPeriod) {
      state.selectedPeriod = selectedPeriod;
    },

    SET_LOGGED_IN_USER_ROLE(state, userRole) {
      state.userRole = userRole;
    },
    SET_SELECTED_DEFAULT_DATE(state, selectedDefaultDate) {
      state.selectedDefaultDate = selectedDefaultDate;
    },
    SET_SELECTED_DATE(state, selectedDate) {
      state.selectedDate = selectedDate;
    },

    SET_SELECTED_DATE_RANGE(state, selectedDateRange) {
      state.selectedDateRange = selectedDateRange;
    },

    setActivityname(state, activityname) {
      state.activityname = activityname;
    },

    SET_LOGIN_USER_ID(state, id) {
      state.login_user_id = id;
    },
    SET_LOGIN_USER_NAME(state, userName) {
      state.login_user_name = userName;
    },
    SET_CLICKED_USER_ID(state, id) {
      state.clicked_user_id = id;
    },
    SET_CLICKED_USER_EMAIL(state, userEmail) {
      state.clicked_user_email = userEmail;
    },
    SetSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  getters: {},
  actions: {
    setClickedCustumRangeDate({ commit }, selectedDateRange) {
      commit("SET_SELECTED_DATE_RANGE", selectedDateRange);
    },
    setSelectedPeriod({ commit }, selectedPeriod) {
      commit("SET_PERIOD", selectedPeriod);
    },
    setSelectedDefaultDate({ commit }, selectedDefaultDate) {
      commit("SET_SELECTED_DEFAULT_DATE", selectedDefaultDate);
    },
    setClickedCustumDate({ commit }, selectedDate) {
      commit("SET_SELECTED_DATE", selectedDate);
    },
    setLoginUserRole({ commit }, userRole) {
      commit("SET_LOGGED_IN_USER_ROLE", userRole);
    },
    setLoggedInUser({ commit }, userEmail) {
      commit("SET_LOGGED_IN_USER", userEmail);
    },
    setLoginUserName({ commit }, id) {
      commit("SET_LOGIN_USER_NAME", id);
    },

    setClickedUserId({ commit }, id) {
      commit("SET_CLICKED_USER_ID", id);
    },
    setClickedUserEmail({ commit }, userEmail) {
      commit("SET_CLICKED_USER_EMAIL", userEmail);
    },

    setLoginUserId({ commit }, id) {
      commit("SET_LOGIN_USER_ID", id);
    },
  },
  modules: {},
});

export default store;
