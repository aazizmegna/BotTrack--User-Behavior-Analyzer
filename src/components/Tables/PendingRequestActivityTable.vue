<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table :sort-by="['duration']" :sort-desc="[false, true]" :headers="headers" :items="activitiesData"
      :search="mainSearch" height="500" :loading="loader" loading-text="Loading..." :pagination.sync="pagination"
      :items-per-page="pagination.itemsPerPage" hide-default-footer>
      <template v-slot:[`item.approval`]="{ item }">
        <div>
          <v-btn text icon color="green lighten-2" v-if="Showit()">
            <v-icon @click.stop="onThumbUpClick(item)">mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn class="ma-2" text icon color="red lighten-2" v-if="Showit()">
            <v-icon @click.stop="onThumbDownClick(item)">mdi-thumb-down</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="showDialogDown" persistent max-width="600px">
      <v-card>
        <v-form ref="form1" v-model="valid">
          <v-card-title v-if="selectedItem">
            Decline Request: {{ selectedItem.activity }}
          </v-card-title>
          <br />
          <v-card-text>
            <v-container>
              <h6>Your reason:</h6>
              <v-text-field v-model="declinedReason" label="Reason" outlined></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitDeclined"> Reject </v-btn>
            <v-btn color="secondary" @click="closeShowDialogDown">
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!--Thumb up dialog-->
    <v-dialog v-model="showDialogUp" max-width="600px" persistent full-width>
      <v-card v-if="selectedItem">
        <v-card-title>Mark '{{ selectedItem.activity }}' as productive</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col>
                <h5>Reason</h5>
              </v-col>
              <v-col>
                <h5>Period</h5>
              </v-col>
            </v-row>
            <v-row>
              <v-col>{{ selectedItem.class }}</v-col>
              <v-col>{{ displayedPeriod }}</v-col>
            </v-row>
            <br />
            <br />
            <v-radio-group v-model="selectedRadio" row>
              <v-radio label="All" value="option1" @click="getAllUsers"></v-radio>
              <v-radio label="Select Users" @click="getSomeUsers"></v-radio>
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
          <v-btn color="primary" @click="submitForm">Approuve</v-btn>
          <v-btn color="secondary" @click="closeDialogProd">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { getAllEmployees1 } from "../../services/employeeService";
import store from "@/store";
import {
  //RejectNoActivityRequest,
  ApproveActivityRequest,
  RejectActivityRequest,
} from "../../services/makeProdService";
export default {
  name: "RequestTable",
  props: [
    "activitiesData",
    "loader",
    "title",
  ],
  data() {
    return {
      type: 0,
      AU: false, //All users
      AT: false, //All time
      RT: false, // Range time
      ST: false, // Selected time
      SU: false, // Selected Users

      showDialog: false,
      showDialogUp: false,
      showDialogDown: false,
      selectedItem: null,
      selectedRadio: null,
      selectedUser: [],
      selectedAllUsers: [],
      showDateInput: false,
      showDateInputRange: false,
      selectedDate: null,
      selectedDateRange: null,
      displayedPeriod: [],
      options: [],

      search: "",

      pagination: {},
      declinedReason: "",
      headers: [
        {
          text: "Requested by",
          align: "start",
          sortable: true,
          value: "requestedby",
        },
        { text: "Activity", value: "activity" },
        { text: "Class", value: "class" },
        { text: "Employees", value: "employee_name" },
        { text: "Requested Details", value: "requesteddetail" },
        { text: "Requested Date", value: "requesteddate" },
        {
          text: "",
          value: "approval",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    Showit() {
      if (this.userRole === "Super_admin" || this.userRole === "Admin") {
        return true
      }
      return false
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
    submitForm() {
      if (this.$refs.form.validate()) {
        // Form is valid, do something with the form data
        try {
          this.approvedRequest();

          this.showDialogUp = false;
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
          console.log(error);
        }
      }
    },
    approvedRequest() {
      let data;
      let id = this.selectedItem.productive_id;
      if (this.AU && this.AT) {
        //All users and All time
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: "All_time",
          end_rule: "All_time",
        };
      } else if (this.AU && this.RT) {
        //All users and range time
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: this.selectedDateRange[0],
          end_rule: this.selectedDateRange[this.selectedDateRange.length - 1],
        };
      } else if (this.AU && this.ST) {
        //All users and single date
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedAllUsers,
          all_user: this.all_user,
          start_rule: this.selectedDate,
          end_rule: this.selectedDate,
        };
      } else if (this.SU && this.AT) {
        //Selected users and All time
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: "All_time",
          end_rule: "All_time",
        };
      } else if (this.SU && this.RT) {
        //Selected users and range date
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: this.selectedDateRange[0],
          end_rule: this.selectedDateRange[this.selectedDateRange.length - 1],
        };
      } else if (this.SU && this.ST) {
        //Selected users and single date
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: this.selectedDate,
          end_rule: this.selectedDate,
        };
      } else if (this.SU && this.ST === false && this.RT === false) {
        //Selected users and single date
        data = {
          //cause_rule: this.selectedReason,
          people: this.selectedUser,
          all_user: this.all_user,
          start_rule: this.selectedItem.start_end_rule[0],
          end_rule:
            this.selectedItem.start_end_rule[
            this.selectedItem.start_end_rule.length - 1
            ],
        };
      }
      ApproveActivityRequest(id, data);
      console.log(id, data);
    },
    submitDeclined() {
      let data = {
        reason: this.declinedReason,
        productive_id: this.selectedItem.productive_id
      };

      RejectActivityRequest(data);
      this.declinedReason = "";
      this.closeShowDialogDown()
    },

    setDefaultSelection(names) {
      const selectedIds = this.options
        .filter((user) => names.includes(user.name))
        .map((user) => user.id);

      this.selectedUser = selectedIds;
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
      this.displayedPeriod = "Select a new date range";

      this.RT = true;
      this.ST = false;
      this.AT = false;
    },
    showDate() {
      this.type = 1;
      this.showDateInputRange = false;
      this.showDateInput = true;
      this.selectedDateRange = null;
      this.displayedPeriod = "Select a new date";

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
      this.displayedPeriod = "All the time";

      this.AT = true;
      this.ST = false;
      this.RT = false;
    },
    onThumbUpClick(item) {
      this.getSomeUsers();
      this.showDialogUp = true;
      this.selectedItem = item;
      //this.selectedRadio = false;
      this.setDefaultSelection(item.employee);
      this.displayedPeriod = item.period;
    },
    onThumbDownClick(item) {
      this.showDialogDown = true;
      this.selectedItem = item;
    },
    closeShowDialogDown() {
      this.showDialogDown = false;
      this.declinedReason = "";
    },
    closeDialogProd() {
      this.showDialogUp = false;

      this.selectedRadio = null;
      this.selectedUser = [];
      this.selectedDate = null;
      this.selectedDateRange = null;
      this.showDateInputRange = false;
      this.showDateInput = false;
      this.selectedDateRange = null;
      this.selectedDate = null;
      this.showDropdown = false;
      this.type = 0;
    },
    allowedDates: (val) => {
      const selectedDate = new Date(val);
      const currentDate = new Date();
      return selectedDate >= currentDate.setHours(0, 0, 0, 0);
    },
  },
  computed: {
    userRole() {
      return store.state.userRole;
    },
  }
};
</script>
