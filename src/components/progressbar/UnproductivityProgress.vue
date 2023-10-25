<template>
  <div>
    <v-card min-height="400" class="smooth-card">
      <v-card-title class="title card-subtitle-line-unpro smooth-card-title">Unproductivity</v-card-title>
      <div v-for="item in unproductivityweb.slice(0, 4)" :key="item.title">
        <v-card-text>
          <div>
            <div class="item">
              <div class="icon">
                <v-btn icon @click="showSubitems(item)"><v-icon>mdi-expand-all</v-icon></v-btn><img
                  src="//www.w3schools.com/favicon.ico" height="16" width="16" alt="YouTube Favicon" />
                {{ item.title }}
              </div>
              <div class="time">
                {{ item.time }}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" icon @click="dialog = true"><v-icon @click="showSubitemsProd(item)"
                        color="green">thumb_up</v-icon></v-btn>
                  </template>
                  <span>Make it productive</span>
                </v-tooltip>
              </div>
            </div>
            <v-progress-linear v-model="item.percent" color="red" stream></v-progress-linear>
          </div>
        </v-card-text>
      </div>
      <v-expand-transition>
        <div v-if="expandedUn">
          <div v-for="item in unproductivityweb.slice(4)" :key="item.title">
            <v-card-text>
              <div>
                <div class="item">
                  <div class="icon">
                    <v-btn icon @click="showSubitems(item)"><v-icon>mdi-expand-all</v-icon></v-btn>
                    {{ item.title }}
                  </div>
                  <div class="time">
                    {{ item.time }}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" icon @click="dialog = true"><v-icon @click="showSubitemsp(item)"
                            color="green">thumb_up</v-icon></v-btn>
                      </template>
                      <span>Make it productive</span>
                    </v-tooltip>
                  </div>
                </div>
                <v-progress-linear v-model="item.percent" color="red" stream></v-progress-linear>
              </div>
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
      <div class="moreless" v-if="unproductivityweb.length > 4">
        <span @click="expandedUn = !expandedUn" v-if="!expandedUn" :class="{ 'pointer-cursor': true }">Show more</span>
        <span @click="expandedUn = !expandedUn" v-if="expandedUn" :class="{ 'pointer-cursor': true }">Show less</span>
      </div>
    </v-card>
    <v-dialog v-model="showDialogProd" max-width="600px" full-width>
      <v-card>
        <v-card-title v-if="selectedItem">Mark as productive: {{ selectedItem.title }}</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm" v-model="valid">
            <v-select v-model="selectedReason" :items="reason" item-text="name" label="Select your reason"
              :rules="[v => !!v || 'Country is required']" required>
            </v-select>
            <v-radio-group v-model="selectedRadio" row>
              <v-radio label="All" @click="getAllUsers"></v-radio>
              <v-radio label="Select Users" value="option1" @click="getSomeUsers"></v-radio>
            </v-radio-group>
            <v-select v-model="selectedUser" :items="options" item-text="name" item-value="id" v-if="showDropdown"
              label="Select a user" multiple>
            </v-select>
            <div class="text-center mt-4">
              <v-btn text @click="showDate" v-bind:color="type === 1 ? 'primary' : ''">For this date</v-btn>
              <v-btn text @click="showDateRange" v-bind:color="type === 2 ? 'primary' : ''">For this date range</v-btn>
              <v-btn text @click="showAllTime" v-bind:color="type === 3 ? 'primary' : ''">All the time</v-btn>
              <v-date-picker v-model="selectedDateRange" v-if="showDateInputRange" label="Select date range" range
                :allowed-dates="allowedDates"></v-date-picker>
            </div>
            <v-date-picker v-model="selectedDate" v-if="showDateInput" label="Select a date"
              :allowed-dates="allowedDates"></v-date-picker>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitForm" :disabled="!valid">Save</v-btn>
          <v-btn color="secondary" @click="closeDialogProd">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialog" width="500px">
      <v-card>
        <v-card-title v-if="selectedItem">{{
          selectedItem.title
        }}</v-card-title>
        <v-card-text v-if="selectedItem">
          <div v-for="subitem in subData" :key="subitem.title">
            <div class="item">
              <div class="icon">
                <v-list-item-title>{{
                  subitem.title | truncate(20)
                }}</v-list-item-title>
              </div>
              <div class="time">
                <v-list-item-subtitle>{{ subitem.time }}</v-list-item-subtitle>
              </div>
            </div>
            <v-progress-linear v-model="subitem.percent" color="red" stream></v-progress-linear>
            <div class="text-center mt-2">{{ subitem.percent }}%</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import Vuetify from "vuetify";
import { getAllEmployees1 } from "../../services/employeeService";
import { makeProductive } from "../../services/makeProdService";
import store from "@/store";
import { getSubActToday, getSubActYesterday, getTopAppFilterTitle } from "@/services/activityService";
import { secondToHour } from "@/services/secondToHour";

Vue.use(Vuetify);
export default {
  name: "UnproductivityProgress",
  props: ["unproductivityweb"],
  data() {
    return {
      subData: [],
      dataToday: [],
      dataYesterday: [],
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],

      AU: false, //All users
      AT: false, //All time
      RT: false, // Range time
      ST: false, // Selected time
      SU: false, // Selected Users

      selectedReason: false,
      showDialog: false,
      showDialogProd: false,
      selectedItem: null,
      dialog: false,
      expandedUn: false,
      valid: false,
      mydate: 1,
      name: "",
      email: "",
      message: "",
      type: "",
      selectedRadio: "",
      selectedUser: [],
      selectedAllUsers: [],
      options: [],
      reason: [
        "Work",
        "Business",
        "Education",
        "Meeting",
        "Urgence",
        "Curiosity",
        "Error",
      ],
      showDateInput: false,
      showDateInputRange: false,
      selectedDate: null,
      selectedDateRange: null,
      showDropdown: false,
      dataDate: {
        date: [new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10)]
      },
    };
  },
  filters: {
    truncate(value, limit) {
      if (value.length > limit) {
        value = value.substring(0, limit) + "...";
      }
      return value;
    },
  },
  methods: {
    reasonRequired(value) {
      return !!value || 'Please select a reason';
    },
    loadEmployees() {
      getAllEmployees1().then((response) => {
        const data = response.data;
        this.options = data.map((emp) => {
          return {
            name: emp.employee_name,
            id: emp.id,
          };
        });
      });
    },
    getAllUsers() {
      this.selectedAllUsers = this.options.map((u) => u.id);
      this.all_user = "yes";
      this.showDropdown = false;

      this.AU = true;
      this.SU = false;
    },
    getSomeUsers() {
      this.showDropdown = true;
      this.all_user = "no";

      this.SU = true;
      this.AU = false;
    },
    showDateRange() {
      this.type = 2;
      this.showDateInputRange = true;
      this.showDateInput = false;
      this.selectedDate = null;

      this.RT = true;
      this.ST = false;
      this.AT = false;
    },
    showDate() {
      this.type = 1;
      this.showDateInputRange = false;
      this.showDateInput = true;
      this.selectedDateRange = null;

      this.ST = true;
      this.AT = false;
      this.RT = false;
    },
    showAllTime() {
      this.type = 3;
      this.showDateInputRange = false;
      this.showDateInput = false;
      this.selectedDateRange = null;
      this.selectedDate = null;

      this.AT = true;
      this.ST = false;
      this.RT = false;
    },
    allowedDates: (val) => {
      const selectedDate = new Date(val);
      const currentDate = new Date();
      return selectedDate >= currentDate.setHours(0, 0, 0, 0);
    },
    submitForm() {
      try {
        this.makeItProductive();
        this.showDialogProd = false;

        this.selectedReason = null;
        this.selectedRadio = null;
        this.selectedUser = [];
        this.selectedDate = null;
        this.selectedDateRange = null;
        this.showDateInputRange = false;
        this.showDateInput = false;
        this.selectedDateRange = null;
        this.selectedDate = null;
        this.showDropdown = false;
      } catch (error) {
        console.error(error);
      }
    },
    showSubitems(item) {
      this.selectedItem = item;
      console.log(this.selectedItem);
      this.selectedacrId = item.acrId;
      console.log(this.selectedacrId);
      this.getSubApp(this.dataDate);

      // this.getSubActivity(this.mydate);
      this.showDialog = true;
    },
    showSubitemsProd(item) {
      this.selectedItem = item;
      this.showDialogProd = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.showDropdown = false;
      this.subData = [];
    },
    closeDialogProd() {
      this.showDialogProd = false;

      this.selectedReason = null;
      this.selectedRadio = null;
      this.selectedUser = [];
      this.selectedDate = null;
      this.selectedDateRange = null;
      this.showDateInputRange = false;
      this.showDateInput = false;
      this.selectedDateRange = null;
      this.selectedDate = null;
      this.showDropdown = false;
    },

    selectedAllUser() {
      return this.selectedOptions.map((option) => option.name);
    },
    makeItProductive() {
      let data;
      let id = this.selectedItem.activity_recognition_id;
      if (this.AU && this.AT) {
        //All users and All time
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: "All_time",
          end_rule: "All_time",
        };
      } else if (this.AU && this.RT) {
        //All users and range time
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: this.selectedDateRange[0],
          end_rule: this.selectedDateRange[this.selectedDateRange.length - 1],
        };
      } else if (this.AU && this.ST) {
        //All users and single date
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: this.selectedDate,
          end_rule: this.selectedDate,
        };
      } else if (this.SU && this.AT) {
        //Selected users and All time
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: "All_time",
          end_rule: "All_time",
        };
      } else if (this.SU && this.RT) {
        //Selected users and range date
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: this.selectedDateRange[0],
          end_rule: this.selectedDateRange[this.selectedDateRange.length - 1],
        };
      } else if (this.SU && this.ST) {
        //Selected users and single date
        data = {
          cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: this.selectedDate,
          end_rule: this.selectedDate,
        };
      }
      makeProductive(id, data);
    },
    async getSubApp(data) {
      console.log('avant dentrer date ', data);
      await getTopAppFilterTitle(this.userId, this.selectedacrId, data).then(
        (response) => {
          let resp = response.data;
          console.log('my data',resp);
          this.dataToday = resp.map((i) => {
            return {
              title: i.title_name,
              duration: secondToHour(i.duration),
              percent: i.percentage,
              time: secondToHour(i.duration),

            };
          });

        this.subData = this.dataToday;
        }
      );
    },

    getSubActivity(data) {
      // console.log('ma date: ',data);
      if (data === 1) {
      
      getSubActToday(this.userId, this.selectedacrId).then((response) => {
        const resp = response.data;
        console.log('activite unpro',resp);
        this.dataToday = resp.map((r) => {
          return {
            title: r.title_name,
            percent: r.percentage,
            time: secondToHour(r.duration),
          };
        });
        this.subData = this.dataToday;
      });}else if (data === 2) {
      getSubActYesterday(this.userId, this.selectedacrId).then((response) => {
        const resp = response.data;
        // console.log('yesterday unpro',resp);
        this.dataYesterday = resp.map((r) => {
          return {
            title: r.title_name,
            percent: r.percentage,
            time: secondToHour(r.duration),
          };
        });
        this.subData = this.dataYesterday;

      });}
    },
    handlePeriodChange() {
      //console.log("okokok:" + this.selectedPeriod);
      // console.log('date ',this.subData);

      if (this.selectedPeriod === "Today") {
        this.subData = this.dataToday;
        this.mydate = 1;
        // console.log('date ',this.mydate);
      } else if (this.selectedPeriod === "Yesterday") {
        this.subData = this.dataYesterday;
        this.mydate = 2;
        // console.log(this.mydate);

      }
    },
  },
  mounted() {
    this.dateData = this.dataDateDefault;
    this.getSubApp(this.dataDate);
    this.loadEmployees();


  },
  watch: {
    userId: {
      //immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            this.getSubApp(this.dataDate);
          }
        }
      },
    },
    defaultDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: this.dataDateDefault,
            };
            this.dataDate = { date: this.dataDateDefault };
        console.log('default date', data);

          }
        }
      },
    },
    singleDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: [newVal, newVal],
            };
            this.dataDate = { date: [newVal, newVal] };
        console.log('single date', data);

          }
        }
      },
    },
    rangeDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: newVal,
            };
        console.log('range date', data);
        this.dataDate = { date: newVal };
          }
        }
      },
    },

  },
  computed: {
    selectedPeriod() {
      return store.state.selectedPeriod;
    },
    defaultDate() {
      return store.state.selectedDefaultDate;
    },
    dataDateDefault() {
      return this.defaultDate ? this.defaultDate : this.todayDate;
    },

    singleDate() {
      return store.state.selectedDate;
    },
    rangeDate() {
      return store.state.selectedDateRange;
    },

    login_user_id() {
      return store.state.login_user_id;
    },
    clicked_user_id() {
      return store.state.clicked_user_id;
    },
    userId() {
      return this.clicked_user_id ? this.clicked_user_id : this.login_user_id;
    },
  },
};
</script>
<style scoped>
.smooth-card {
  border-radius: 12px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.smooth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.smooth-card-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #2d4059;
  padding: 24px;
  background-color: #fff;
}

.smooth-card-icon {
  font-size: 36px;
  color: #22a5ff;
  margin-right: 12px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-subtitle-line-unpro {
  border-bottom: 1px solid #e53935;
}

.moreless {
  text-align: center;
}

.item {
  display: flex;
}

.time {
  margin-left: auto;
}

.pointer-cursor {
  cursor: pointer;
}
</style>
