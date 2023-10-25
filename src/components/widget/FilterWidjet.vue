<template>
  <v-col col="12" sm="12" md="12" lg="12" xl="12">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
      full-width>
      <template v-slot:activator="{ on }">
        <v-btn outlined v-on="on" text style="text-transform: none">
          {{ displayPeriod }}
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(prd, index) in period" :key="index" @click="menu = false">
          <v-btn text style="text-transform: none" @click="handleClickPeriode(prd)">
            {{ prd.name }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text style="text-transform: none" @click="customDateMenu = !customDateMenu">
            Custom Date
          </v-btn>
          <v-menu v-model="customDateMenu" offset-y>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" small>mdi-menu-right</v-icon>
            </template>
            <v-list>
              <v-list-item @click.stop="handleClickPeriode('Single Date')">
                <v-list-item-title @click="customDateMenufn = false">Single Date</v-list-item-title>
              </v-list-item>
              <v-list-item @click.stop="handleClickPeriode('Range Date')">
                <v-list-item-title @click="customDateRangeMenufn = false">Range Date</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn outlined text class=" mx-1" style="text-transform: none" @click="Showform = true">
      <v-icon>mdi-account</v-icon>
      {{ this.displayUser }}

      <v-icon>mdi-menu-down</v-icon>
    </v-btn>
    <v-btn  outlined class="mx-1" text style="text-transform: none" @click="refreshPage">
      <v-icon>mdi-refresh</v-icon>
      Refresh
    </v-btn>
    <v-btn  outlined class="mx-1" text style="text-transform: none">
      <v-icon>mdi-print</v-icon>
      Profile
    </v-btn>

    <v-dialog v-model="Showform" width="500px" v-if="isAlloweditem">
      <v-card>
        <v-card-title>
          <h6>Filter by User</h6>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-simple-table height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>
                    <v-text-field v-model="searchQuery" label="Search" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredUserGroup" :key="item.user">
                  <td link @click="handleClick(item.user, item.id)">
                    <v-icon>mdi-account</v-icon>
                    {{ item.user }}
                  </td>
                </tr>
                <tr v-for="item in groups" :key="item.groups">
                  <td>{{ item.group }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="Showform = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialogDate" max-width="600px" full-width>
      <v-card class="time">
        <v-card-text>
          <v-form>
            <v-date-picker v-model="selectedDate" label="Select a date"></v-date-picker>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitFormDate">Apply</v-btn>
          <v-btn color="secondary" @click="closeDialogProd">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialogDateRange" max-width="600px" full-width>
      <v-card class="time">
        <v-card-text>
          <v-form>
            <v-date-picker label="Select date range" range v-model="selectedDateRange"></v-date-picker>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitFormRange">Apply</v-btn>
          <v-btn color="secondary" @click="closeDialogProd2">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import { loginAuthentication } from "../../services/loginService";
import { getAllEmployees2 } from "../../services/employeeService";

import { getAllPermission } from "@/services/permissionService";
import store from "@/store";
export default {
  name: "FilterWidjet",
  data() {
    return {
      showDialogDate: false,
      showDialogDateRange: false,
      Showform: false,
      menu: false,
      customDateMenu: false,
      searchQuery: "",
      clicked_user: "",
      displayAuthUser: "",
      displayPeriod: "",
      permission: [],
      selectedDate: null,
      selectedDateRange: null,

      period: [
        {
          id: 1,
          name: "Today",
          date: [
            new Date().toISOString().slice(0, 10),
            new Date().toISOString().slice(0, 10),
          ],
        },
        {
          id: 2,
          name: "Yesterday",
          date: [
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
          ],
        },
        {
          id: 3,
          name: "Last 7 Days",
          date: [
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            new Date().toISOString().slice(0, 10)
          ],
        },
        {
          id: 3,
          name: "Last 30 Days",
          date: [
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10),
            new Date().toISOString().slice(0, 10)
          ],
        },
      ],
      usergroup: [],
      groups: {
        user: "All Users",
      },
    };
  },
  methods: {
    closeDialogProd() {
      this.showDialogDate = false;
    },
    closeDialogProd2() {
      this.showDialogDateRange = false;
    },
    submitFormDate() {
      this.showDialogDate = false;
      this.$store.dispatch("setClickedCustumDate", this.selectedDate);
      this.selectedDate = "";
    },
    submitFormRange() {
      this.showDialogDateRange = false;
      this.$store.dispatch("setClickedCustumRangeDate", this.selectedDateRange);
      this.selectedDateRange = "";
    },
    customDateMenufn() {
      (this.menu = false), (this.customDateMenu = false);
      this.showDialogDate = true;
    },
    customDateRangeMenufn() {
      (this.menu = false), (this.customDateMenu = false);
      this.showDialogDateRange = true;
    },

    refreshPage() {
      window.location.reload();
    },
    Getpermission() {
      getAllPermission().then((response) => {
        let data = response.data;
        //console.log("my data", data)
        this.permission = data.map((item) => {
          return {
            permission: item.permission_name,
            roles_allowed: item.roles_allowed,
          };
        });
      });
    },

    handleClick(user, id) {
      this.$emit("filterClicked", user);
      this.clicked_user = user;
      this.Showform = false;
      this.clicked_user_id = id;
      this.$store.dispatch("setClickedUserId", id);
      this.$store.dispatch("setClickedUserEmail", user);
      //this.displayPeriod = "Today";
    },

    handleClickPeriode(period) {
      this.$emit("filterClickedPeriod", period.name);
      this.displayPeriod = period.name;

      this.$store.dispatch("setSelectedDefaultDate", period.date);
      this.$store.dispatch("setSelectedPeriod", period.name);
      if (period === "Single Date") {
        this.displayPeriod = "Single Date"
        this.showDialogDate = true
        this.menu = false
      } else if (period === "Range Date") {
        this.displayPeriod = "Range Date"
        this.showDialogDateRange = true
        this.menu = false
      }
      // console.log(period.date);
    },

    async getAuthenticatedUser() {
      await loginAuthentication().then((response) => {
        const user = response;
        this.message = "Logged in";
        this.displayAuthUser = user.employee_email;
        this.login_user_id = user.id;
        this.displayPeriod = "Today";
      });
    },
    async getAllUsers() {
      await getAllEmployees2().then((response) => {
        const data = response.data;
        this.usergroup = data.map((d) => {
          return { user: d.employee_email, id: d.id };
        });
        this.usergroup.push(this.groups);
      });
    },
  },

  computed: {
    filteredUserGroup() {
      return this.usergroup.filter((item) =>
        item.user.toLowerCase().includes(this.searchQuery)
      );
    },
    userRole() {
      return store.state.userRole;
    },

    clicked_user_email() {
      return store.state.clicked_user_email;
    },
    displayUser() {
      return this.clicked_user_email
        ? this.clicked_user_email
        : this.displayAuthUser;
    },

    isAlloweditem() {
      for (let i = 0; i < this.permission.length; i++) {
        let perm = this.permission[i];

        if (
          perm.permission === "user switch" &&
          perm.roles_allowed.includes(this.userRole)
        ) {
          return true;
        }
        //console.log("ooo", perm.permission)
      }

      return false;
    },
  },
  async mounted() {
    await this.getAuthenticatedUser();
    await this.getAllUsers();
    this.Getpermission();
  },
};
</script>
<style scoped>
.time {
  text-align: center;
}
</style>
