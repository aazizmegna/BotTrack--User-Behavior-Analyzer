<template>
<div>
  <v-app-bar app elevate-on-scroll elevation="3" class="grey lighten-5">
    <v-app-bar-nav-icon @click="$store.commit('SetSidebar')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="../assets/avatar.png" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">{{ displayUser }}</span>
          </v-chip>
        </span>
      </template>

      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../assets/avatar.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ displayUser }}</v-list-item-title>
            <v-list-item-subtitle>{{ message }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="getProfile()">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Profile </v-list-item-title>
        </v-list-item>
        <v-list-item link @click="getLogout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  </div>
</template>

<script>
import { loginAuthentication, logoutService } from "../services/loginService";

export default {
  name: "TopBar",

  data() {
    return {
      message: "",
      displayUser: "",
    };
  },
  async created() {
    await this.getAuthenticatedUser();
  },
  methods: {
    async getAuthenticatedUser() {
      await loginAuthentication().then((response) => {
        //console.log(response);
        const user = response;
        this.message = "Logged in";
        this.displayUser = user.employee_email;

        this.$store.dispatch("setLoggedInUser", user.employee_email);
        this.$store.dispatch("setLoginUserName", user.employee_name);
        this.$store.dispatch("setLoginUserId", user.id);
        this.$store.dispatch("setLoginUserRole", user.employee_status);
      });
    },

    getLogout() {
      logoutService().then((response) => {
        console.log(response);
        this.message = "You are not logged in";
        this.displayUser = "User Name";
        this.$router.push("/");
      });
    },
    getProfile() {
      this.$router.push("/Profile");
    },
  },
};
</script>

<style scoped>

</style>
