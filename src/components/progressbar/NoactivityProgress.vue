<template>
  <div>
    <v-card min-height="400" class="smooth-card">
      <v-card-title class="title card-subtitle-line-unpro smooth-card-title">No Activity</v-card-title>
      <div v-for="item in noactivities.slice(0, 4)" :key="item.title">
        <v-card-text>
          <div>
            <div class="item">
              <div class="icon">
                <i class="fas fa-ban"></i>
                {{ item.title }}
              </div>
              <div class="time">
                {{ item.time }}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" icon @click="showSubitemsProd(item)"><v-icon
                        color="green">thumb_up</v-icon></v-btn>
                  </template>
                  <span>Make it productive</span>
                </v-tooltip>
              </div>
            </div>
            <v-progress-linear v-model="item.percent" color="#ffeb3b" stream></v-progress-linear>
          </div>
        </v-card-text>
      </div>
      <v-expand-transition>
        <div v-if="expandedUn">
          <div v-for="item in noactivities.slice(4)" :key="item.title">
            <v-card-text>
              <div>
                <div class="item">
                  <div class="icon">
                    {{ item.title }}
                  </div>
                  <div class="time">
                    {{ item.time }}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" icon @click="showSubitemsProd(item)"><v-icon
                            color="green">thumb_up</v-icon></v-btn>
                      </template>
                      <span>Make it productive</span>
                    </v-tooltip>
                  </div>
                </div>
                <v-progress-linear v-model="item.percent" color="#ffeb3b" stream></v-progress-linear>
              </div>
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
      <div class="moreless" v-if="noactivities.length > 4">
        <span @click="expandedUn = !expandedUn" v-if="!expandedUn" :class="{ 'pointer-cursor': true }">Show more</span>
        <span @click="expandedUn = !expandedUn" v-if="expandedUn" :class="{ 'pointer-cursor': true }">Show less</span>
      </div>
    </v-card>
    <v-dialog v-model="showDialogProd" max-width="600px" height="400px" full-width>
      <v-card v-if="selectedItem">
        <v-card-title>
          <h5>
            Request to add new time entry as productive for:
            {{ selectedItem.title }}
          </h5>
          <br />
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <h6>Date: {{ this.today }}</h6>
            <br />
            <v-text-field v-model="yourreason" label="Reason" outlined required></v-text-field>
            <br />
            <div class="timepicker">
              <v-text-field v-model="startT" outlined dense disabled></v-text-field>
              <v-text-field v-model="endT" height="5px" outlined dense disabled></v-text-field>{{ selectedItem.time }}
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitForm">Save</v-btn>
          <v-btn color="secondary" @click="closeDialogProd">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { getAllEmployees } from "../../services/employeeService";
import { noActivityToProductive } from "../../services/makeProdService";
import { secondToHour } from "../../services/secondToHour";

export default {
  name: "NoactivityProgress",
  components: {
    //VueTimepicker,
  },
  props: ["noactivity"],
  data() {
    return {
      showDialogProd: false,
      selectedItem: null,
      dialog: false,
      expandedUn: false,
      moreorless: false,
      valid: false,
      yourreason: "",
      type: "",
      selectedAllUsers: [],
      options: [],
      startT: "",
      endT: "",
      showDropdown: false,
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Form is valid, do something with the form data
        try {
          this.makeProd();
          this.yourreason = "";
          this.showDialogProd = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    makeProd() {
      const id = this.selectedItem.acrid;
      const data = {
        company_id: this.selectedItem.company_id,
        employee_id: this.selectedItem.employee_id,
        total_duration: this.selectedItem.duration,
        cause: this.yourreason,
        activity_date: this.selectedItem.activity_date,
        date_intervale: this.date_intervale,
      };

      noActivityToProductive(id, data);
      this.$emit('refresh-noactivities');
    },

    closeDialogProd() {
      this.showDialogProd = false;

      this.selectedReason = null;
      this.selectedRadio = null;
      this.selectedDate = null;
      this.selectedDateRange = null;
      this.showDateInputRange = false;
      this.showDateInput = false;
      this.selectedDateRange = null;
      this.selectedDate = null;
      this.showDropdown = false;
    },

    loadEmployees() {
      getAllEmployees().then((response) => {
        const data = response.data;
        this.options = data.map((emp) => {
          return {
            name: emp.employee_name,
            id: emp.id,
          };
        });
      });
    },
    showSubitemsProd(item) {
      this.selectedItem = item;
      this.showDialogProd = true;
      this.endT = this.selectedItem.endTime;
      this.startT = this.selectedItem.startTime;
    },
  },

  computed: {
    noactivities() {
      return this.noactivity.map((item) => ({
        time: secondToHour(item.time),
        duration: item.time,
        title: item.title[0],
        startTime: item.title[0],
        endTime: item.title.slice(-1)[0],
        percent: item.percent,
        acrid: item.acrid,
        activity_date: item.activity_date,
        company_id: item.company_id,
        employee_id: item.employee_id,
      }));
    },
    today() {
      const options = { month: "short", day: "numeric", year: "numeric" };
      const today = new Date();
      const todayDate = new Intl.DateTimeFormat("en-US", options).format(today);
      return todayDate;
    },
    date_intervale() {
      const endDate = this.selectedItem.endTime;
      const startDate = this.selectedItem.startTime;
      return `${this.today}. ${startDate} - ${endDate}`;
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.timepicker {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
}

.card-subtitle-line-unpro {
  border-bottom: 1px solid #ffeb3b;
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
</style>
