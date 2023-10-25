<template>
  <div>
    <v-row>
      <v-col>
        <v-toolbar color="white">
          <v-flex xs15>
            <div class="activity-info">
              <div>
                <v-select flat solo-inverted hide-details placeholder="Select Department"
                  :items="[{ id: null, name: 'All' }].concat(departement)" item-text="name" item-value="id"
                  v-model="selectedDepId" v-if="Showit()">
                </v-select>
              </div>
              <div>
                <v-btn @click="calculatBq" class="secondary">Calculate BQ</v-btn>
              </div>
              <div>
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="selectedDate" label="Date picker" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="selectedDate" @input="menu = false" class="small-datepicker"></v-date-picker>
                </v-menu>
              </div>
            </div>
          </v-flex>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="smooth-card" height="350">
          <v-card-title class="smooth-card-title">Daily Productivity Score</v-card-title>
          <v-layout>
            <v-card-text>
              <v-list class="employee-list">
                <v-list-item v-for="(item, index) in employees" :key="index">
                  <v-flex xs15>
                    <div class="employee-info">
                      <div>{{ item.name }}</div>
                      <div class="item">{{ item.wqt }}Pts</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-progress-linear v-model="item.wqt" color="#67c23a" height="7" stream></v-progress-linear>
                  </v-flex>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="smooth-card" height="350">
          <v-card-title class="smooth-card-title">Daily Attendance</v-card-title>
          <v-simple-table fixed-header height="260px" :loading="loader" loading-text="Loading...">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Start time</th>
                  <th class="text-left">Last seen</th>
                </tr>
              </thead>
              <tbody>
                <template>
                  <tr v-for="item in employees" :key="item.name" :class="{ 'pointer-cursor': true }">
                    <td>{{ item.name }}</td>
                    <td>{{ item.start }}</td>
                    <td>{{ item.lastseen }}</td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="smooth-card" height="350">
          <v-card-title class="smooth-card-title">Top 5 Distracting Activities</v-card-title>
          <v-layout>
            <v-card-text>
              <v-list class="activity-list">
                <template v-if="nonproductivity.length > 0">
                  <v-list-item v-for="(item, index) in nonproductivity" :key="index">
                    <v-flex xs15>
                      <div class="activity-info">
                        <div>{{ item.name }}</div>
                        <div class="item">{{ item.time }}</div>
                      </div>
                      <v-spacer></v-spacer>
                      <v-progress-linear v-model="item.percentage" color="#f56c6c" height="7" stream></v-progress-linear>
                    </v-flex>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-item>
                    <v-flex xs12>
                      <div class="text-center">
                        <span class="grey--text">Great No Distracting available.</span>
                      </div>
                    </v-flex>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="smooth-card" height="350">
          <v-card-title class="smooth-card-title">Top 5 Productivity Activities</v-card-title>
          <v-layout>
            <v-card-text>
              <v-list class="activity-list">
                <v-list-item v-for="(item, index) in productivity" :key="index">
                  <v-flex xs15>
                    <div class="activity-info">
                      <div>{{ item.name }}</div>
                      <div class="item">{{ item.time }}</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-progress-linear v-model="item.percentage" color="#67c23a" height="7" stream></v-progress-linear>
                  </v-flex>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { getCompanyDashboardFilter } from "@/services/activityService";
import { secondToHour } from "@/services/secondToHour";
import { getAllCompanyDepartements1 } from "@/services/departmentService";

import { calculateBQ } from "@/services/companyService";
import store from "@/store";

export default {
  name: "CompanyDashboard",
  data() {
    return {
      employees: [],
      productivity: [],
      nonproductivity: [],
      departement: [],
      result: [],
      selectedDepId: null,
      selectedDate: new Date().toISOString().slice(0, 10),
    };
  },
  methods: {
    calculatBq() {
      let data1 = {
        date: this.selectedDate,
      };
      calculateBQ(data1);

      //refresh data

      let data = {
        date: this.selectedDate,
        departement_id: this.selectedDepId,
      };
      this.getData(data);
    },
    loadDepartments() {
      getAllCompanyDepartements1().then((response) => {
        const data = response.result;
        this.departement = data.map((dep) => {
          return {
            id: dep.id,
            name: dep.departement_name,
            //heads: dep.head_name,
          };
        });
      });
    },
    Showit() {
      if (this.userRole === "Super_admin") {
        return true;
      }
      return false;
    },
    getData(data) {
      getCompanyDashboardFilter(data).then((response) => {
        //console.log(response);
        this.employees = response.result1.map((i) => {
          const now = new Date();
          let last = "";
          const last_seen = new Date(i.actual_start_end);
          if (new Date().toISOString().slice(0, 10) === this.selectedDate) {
            const diff = now - last_seen;
            if (diff < 1000 * 60) {
              let d = `${Math.floor(diff / 1000)}`;
              last = `${d} ${d < 2 ? "second" : "seconds"} ago`;
            } else if (diff < 1000 * 60 * 60) {
              let d = `${Math.floor(diff / (1000 * 60))}`;
              last = `${d} ${d < 2 ? "minute" : "minutes"} ago`;
            } else if (diff < 1000 * 60 * 60 * 24) {
              let d = `${Math.floor(diff / (1000 * 60 * 60))}`;
              last = `${d} ${d < 2 ? "hour" : "hours"} ago`;
            } else if (diff < 1000 * 60 * 60 * 24 * 7) {
              let d = `${Math.floor(diff / (1000 * 60 * 60 * 24))}`;
              last = `${d} ${d < 2 ? "day" : "days"} ago`;
            } else if (diff < 1000 * 60 * 60 * 24 * 30) {
              let d = `${Math.floor(diff / (1000 * 60 * 60 * 24 * 7))}`;
              last = `${d} ${d < 2 ? "week" : "weeks"} ago`;
            } else {
              let d = `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))}`;
              last = `${d} ${d < 2 ? "month" : "months"} ago`;
            }
          } else {
            const datetimeStart = new Date(i.actual_start_end);
            last = isNaN(datetimeStart)
              ? "-"
              : datetimeStart.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
          }

          return {
            name: i.name,
            wqt: i.work_quality_score,
            start: i.actual_start_work,
            lastseen: last,
          };
        });
        this.productivity = response.activitiesproduct.map((i) => {
          return {
            name: i.activity_name,
            time: secondToHour(i.duration),
            percentage: i.percentage,
          };
        });
        this.nonproductivity = response.activitiesnonproduct.map((i) => {
          return {
            name: i.activity_name,
            time: secondToHour(i.duration),
            percentage: i.percentage,
          };
        });
      });
    },
  },
  watch: {
    selectedDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            date: this.selectedDate,
            departement_id: this.selectedDepId,
          };
          this.getData(data);
        }
      },
    },
    selectedDepId: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            date: this.selectedDate,
            departement_id: this.selectedDepId,
          };
          console.log(data);
          this.getData(data);
        }
      },
    },
  },
  mounted() {
    let data = {
      date: this.selectedDate,
      departement_id: this.selectedDepId,
    };
    this.getData(data);
    this.loadDepartments();
    this.calculatBq()
  },
  computed: {
    userRole() {
      return store.state.userRole;
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
  border-bottom: 1px solid #ebeef5;
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

.small-datepicker .v-picker__date .v-btn {
  font-size: 0.8rem;
  padding: 4px;
}

.small-datepicker .v-picker__date .v-picker__date__header h2 {
  font-size: 1rem;
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

.employee-list,
.activity-list {
  overflow-y: auto;
  max-height: 230px;
}

.employee-info,
.activity-info {
  display: flex;
  justify-content: space-between;
}
</style>
