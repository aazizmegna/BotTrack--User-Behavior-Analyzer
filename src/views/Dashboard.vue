<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
    </v-subheader>
    <br />
    <row v-if="showBlock1">
      <WorkingTimeTable :workingPeriod="workingPeriod" />
      <v-row>
        <v-col lg="6" cols="5">
          <v-card height="435" class="smooth-card">
            <v-card-title class="smooth-card-title"><v-icon class="smooth-card-icon" color="purple">mdi-apps</v-icon>Top
              Apps</v-card-title>
            <BarChartTopApp :categories="appLabels" :data="appChart" ref="appChart" />
          </v-card>
        </v-col>
        <v-col lg="6" cols="6">
          <v-card height="435" class="smooth-card">
            <v-card-title class="smooth-card-title"><v-icon class="smooth-card-icon" color="blue">mdi-web</v-icon>Top
              Websites
            </v-card-title>
            <BarChartTopWeb :categories="appLabels1" :data="appChart1" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" cols="5">
          <v-card class="smooth-card">
            <v-card-title class="smooth-card-title">
              <v-icon class="smooth-card-icon">mdi-check-circle</v-icon>
              Productivity
            </v-card-title>
            <ProductivityChart :seriesData="seriesData" :labelsData="labelsDataProd" />
          </v-card>
        </v-col>
        <v-col lg="6" cols="5">
          <v-card class="smooth-card">
            <v-card-title class="smooth-card-title">
              <v-icon class="smooth-card-icon" color="teal">mdi-view-list</v-icon>Top Categories
            </v-card-title>
            <TopCategoriesChart :labelsData="categoryDataLabels" :seriesData="categoryDataSeries" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" cols="6">
          <v-card height="475" class="smooth-card">
            <v-card-title class="smooth-card-title"><v-icon class="smooth-card-icon"
                color="green">mdi-calendar-clock</v-icon>Daily Work done</v-card-title>
            <WorkingTime :seriesData="seriesDaily" />
          </v-card>
        </v-col>
        <v-col lg="6" cols="6">
          <v-card class="smooth-card">
            <v-card-title class="smooth-card-title">
              <v-icon class="smooth-card-icon" color="orange">mdi-clock-outline</v-icon>Pending
              Classifications</v-card-title>
            <PendingClassTable :classes="classes" @refresh-table="handleDataRefresh" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <productivity-progress :productivityweb="productivityweb" />
        </v-col>
        <v-col>
          <unproductivity-progress :unproductivityweb="unproductivityweb" />
        </v-col>

        <v-col lg="3" cols="3">
          <noactivity-progress :noactivity="noactivity" @refresh-noactivities="handleDataRefresh" />
        </v-col>
      </v-row>
    </row>
    <v-row v-if="showWeek">
      <DashboardWeekTable :logs="datawm" :range="range" :nonProdChart="nonProdChart" :prodChart="prodChart" :noActChart="noActChart"
        :date="dateChart" />
    </v-row>
    <v-row v-if="showMonth">
      <DashboardMonthTable :nonProdChart="nonProdChart" :prodChart="prodChart" :noActChart="noActChart" :date="dateChart" :logs="datawm"
        :range="range" />
    </v-row>
  </div>
</template>

<script>
import DashboardWeekTable from "../components/Tables/DashboardWeekTable.vue";
import DashboardMonthTable from "../components/Tables/DashboardMonthTable.vue";
import WorkingTime from "../components/Charts/WorkingTimeChart.vue";
import BarChartTopApp from "../components/Charts/BarChartTopApp.vue";
import BarChartTopWeb from "../components/Charts/BarChartTopWeb.vue";
import ProductivityChart from "../components/Charts/ProductivityChart.vue";
import PendingClassTable from "../components/Tables/PendingClassTable.vue";
import WorkingTimeTable from "../components/Tables/WorkingTimeTable.vue";
import TopCategoriesChart from "../components/Charts/TopCategoriesChart.vue";
import ProductivityProgress from "../components/progressbar/ProductivityProgress.vue";
import UnproductivityProgress from "../components/progressbar/UnproductivityProgress.vue";
import NoactivityProgress from "../components/progressbar/NoactivityProgress.vue";

import { secondToHour } from "../services/secondToHour";
import store from "@/store";
import { getDashboardFilter } from "../services/activityService";

export default {
  name: "MyDashboard",
  components: {
    BarChartTopApp,
    BarChartTopWeb,
    ProductivityChart,
    PendingClassTable,
    TopCategoriesChart,
    WorkingTime,
    ProductivityProgress,
    UnproductivityProgress,
    NoactivityProgress,
    WorkingTimeTable,
    DashboardMonthTable,
    DashboardWeekTable,
  },

  meta: { requiresAuth: true },

  data() {
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      dateChart: [],
      prodChart: [],
      noActChart: [],
      nonProdChart: [],
      classes: [],
      appLabels: [],
      appChart: [],
      appLabels1: [],
      appChart1: [],
      seriesDaily: [],
      seriesDailyTod: [],

      categoriesApp: [],
      dataApp: [],

      todayCat: [],

      showBlock1: true,
      showWeek: false,
      showMonth: false,
      noactivity: [],
      noactivityTod: [],

      productivityweb: [],
      undefinedweb: [],
      unproductivityweb: [],

      labelsDataProd: [],
      labelsDataProdTod: [],

      dataTodayprod: [],
      dataTodaynonprod: [],
      dataTodayund: [],

      datawm: [],
      mydate: null,

      seriesData: [],
      seriesDataTod: [],
      seriesTod: [],

      workingPeriod: [],
      workingTime: [],

      categoryDataSeries: [],
      categoryDataLabels: [],

      categoryDataSeriesTod: [],
      categoryDataLabelsTod: [],
      dataDate: {},
    };
  },

  methods: {
    async getData(data) {
      await Promise.all([
        getDashboardFilter(this.userId, data).then((response) => {
          ////////For pendind classification//////////////////
          this.classes = response.undefined.map((r) => {
            return {
              name: r.activity_name,
              duration: secondToHour(r.duration),
              arId: r.activity_recognition_id,
              category_id: r.category_id,
            };
          });
          ///// For no activities////////////
          const noactivityData = response.mynoactivity;
          this.noactivityTod = noactivityData.map((i) => {
            return {
              time: i.time,
              title: i.interval,
              percent: i.percentage,
              acrid: i.activity_recognition_id,
              activity_date: i.activity_date,
              company_id: i.company_id,
              employee_id: i.employee_id,
            };
          });
          this.noactivity = this.noactivityTod;

          ////////////////For category chart//////////////
          const dataCat = response.mycat;

          this.categoryDataTod = dataCat.map((i) => {
            return {
              category_name: i.category_name,
              duration: i.duration,
            };
          });
          this.categoryDataSeriesTod = [];
          this.categoryDataLabelsTod = [];
          if (this.categoryDataTod.length > 0) {
            let todaySeries = this.categoryDataTod.map((e) => e.duration);
            let todayLabels = this.categoryDataTod.map((e) => e.category_name);

            if (this.categoryDataTod.length > 0) {
              this.categoryDataSeriesTod = todaySeries;
              this.categoryDataLabelsTod = todayLabels;

              this.categoryDataSeries = this.categoryDataSeriesTod;
              this.categoryDataLabels = this.categoryDataLabelsTod;
            }
          } else {
            this.categoryDataSeries = this.categoryDataSeriesTod;
            this.categoryDataLabels = this.categoryDataLabelsTod;
          }

          ///////////For working hours///////////////
          const dataTime = response.myday;
          this.workingTime = dataTime.map((i) => {
            // let time = i.expected_work_hours;
            // let parts = time.split(":");
            // let hours = parseInt(parts[0], 10);
            // let minutes = parseInt(parts[1], 10);
            // let seconds = hours * 60 * 60 + minutes * 60;

            // let x = (i.actual_work_hours * 100) / seconds;
            // let result = [];
            // result = Math.round(x);

            const options = { month: "short", day: "numeric", year: "numeric" };
            return {
              workingDay: new Intl.DateTimeFormat("en-US", options).format(
                new Date(i.date_of_work)
              ),
              expectedStart: i.expected_start_time,
              expectedEnd: i.expected_end_time,
              expectedTotal: i.expected_work_hours,
              start: i.actual_start_work,
              end: i.actual_start_end,
              totalProductive: secondToHour(i.actual_work_hours),
              wqs: i.work_quality_score,
            };
          });
          this.seriesDailyTod = [];
          for (let i = 0; i < this.workingTime.length; i++) {
            this.seriesDailyTod.push(this.workingTime[i].wqs);
          }
          this.workingPeriod = this.workingTime;
          this.seriesDaily = this.seriesDailyTod;

          ////////For productivity chart////////
          const dataPro = response.produchart;

          this.seriesDataTod = dataPro.map((i) => {
            return {
              productivity: i.productivity || 0.1,
              distracting: i.nonproductivity || 0.1,
              undefined: i.undefined || 0.1,
              noactivity: i.noactivity || 0.1,
            };
          });
          this.seriesTod = [];
          this.labelsDataProdTod = [];
          if (this.seriesDataTod.length > 0) {
            for (let i = 0; i < this.seriesDataTod.length; i++) {
              // check that seriesDataTod has all properties before accessing them
              if (
                this.seriesDataTod[i]?.productivity &&
                this.seriesDataTod[i]?.distracting &&
                this.seriesDataTod[i]?.undefined &&
                this.seriesDataTod[i]?.noactivity
              ) {
                this.seriesTod.push(
                  this.seriesDataTod[i].productivity,
                  this.seriesDataTod[i].distracting,
                  this.seriesDataTod[i].undefined,
                  this.seriesDataTod[i].noactivity
                );
                this.labelsDataProdTod = [
                  "Productivity",
                  "Distracting",
                  "Undefined",
                  "No activity",
                ];
              }
            }
            this.seriesData = this.seriesTod;
            this.labelsDataProd = this.labelsDataProdTod;
          } else {
            this.seriesData = this.seriesTod;
            this.labelsDataProd = this.labelsDataProdTod;
          }

          /////////For productivity ////////////////
          this.dataTodayprod = response.productivity.map((r) => {
            return {
              title: r.activity_name,
              percent: r.percentage,
              total_duration: r.duration,
              time: secondToHour(r.duration),
              acrId: r.activity_recognition_id,
            };
          });
          this.productivityweb = this.dataTodayprod;

          /////////For Distracting ////////////////
          this.dataTodaynonprod = response.unproductivity.map((r) => {
            return {
              title: r.activity_name,
              percent: r.percentage,
              total_duration: r.duration,
              time: secondToHour(r.duration),
              activity_recognition_id: r.activity_recognition_id,
              acrId: r.activity_recognition_id,
            };
          });
          this.unproductivityweb = this.dataTodaynonprod;

          //////For TobApps Barchart//////////////
          try {
            const data = response.apps.map((i) => {
              return { data: i.percentage, categories: i.activity_name };
            });
            if (data.length > 0) {
              this.appLabels = data.map((obj) => obj.categories);
              this.appChart = data.map((obj) => obj.data);
            } else {
              this.appLabels = [0, 0, 0, 0, 0];
              this.appChart = [0, 0, 0, 0, 0];
            }
          } catch (error) {
            console.error(error);
          }
          //////For TobWebs Barchart//////////////
          try {
            const data1 = response.webs.map((i) => {
              return { data: i.percentage, categories: i.activity_name };
            });
            if (data1.length > 0) {
              this.appLabels1 = data1.map((obj) => obj.categories);
              this.appChart1 = data1.map((obj) => obj.data);
            } else {
              this.appLabels1 = [0, 0, 0, 0, 0];
              this.appChart1 = [0, 0, 0, 0, 0];
            }
          } catch (error) {
            console.error(error);
          }
        }),
      ]);
    },
    /////////For 7/30 Days ////////////////
    async getweekmonthdata(data) {
      try {
        const response = await getDashboardFilter(this.userId, data);
        this.datawm = response.result.map((r) => {

          const datetimeStart = new Date(r.start_time);
          const datetimeEnd = new Date(r.end_time);
          const start = isNaN(datetimeStart)
            ? "-"
            : datetimeStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          const end = isNaN(datetimeEnd)
            ? "-"
            : datetimeEnd.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          const options = { month: "short", day: "numeric", year: "numeric" };
          const options2 = { weekday: "long" };
          let result = r.working_day ?? this.dataDate.date[0];
          const formattedDate = new Date(result).toLocaleDateString(
            "en-US",
            options
          );
          const formattedWeekday = new Date(result).toLocaleDateString(
            "en-US",
            options2
          );
          return {
            day: `${formattedDate} (${formattedWeekday})`,
            starttime: start,
            endtime: end,
            total: secondToHour(
              r.productivity + r.nonproductivity + r.undefined + r.noactivity
            ),
            productivity: secondToHour(r.productivity),
            distracting: secondToHour(r.nonproductivity) || secondToHour(0),
            undefined: secondToHour(r.undefined) || secondToHour(0),
            noactivity: secondToHour(r.noactivity),
            prod: r.productivity,
            nonprod: r.nonproductivity,
            noact: r.noactivity,
            date: result,
          };
        });
        this.nonProdChart = this.datawm.map((item) => item.nonprod);
        this.prodChart = this.datawm.map((item) => item.prod);
        this.noActChart = this.datawm.map((item) => item.noact);

        this.dateChart = this.datawm.map((item) => item.date);
        console.log('date', this.dateChart);
        
      } catch (error) {
        console.error(error);
      }
    },

    handleDataRefresh() {
      // Your logic to refresh the table here
      this.getData(this.dataDate);
    },
  },
  watch: {
    userId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: this.dataDateDefault,
            };
            this.getData(data);
            this.dataDate = data;
          }
        }
      },
    },
    defaultDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.selectedPeriod === "Last 7 Days") {
            this.showBlock1 = false;
            this.showWeek = true;
            this.showMonth = false;
            let data = {
              date: this.dataDateDefault,
            };
            this.getweekmonthdata(data);
            // this.dataDate = data;
            this.dataDate = { date: this.dataDateDefault };

            // this.dataDate = data;

            // Get one week ago date
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const options = { month: "short" };
            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(oneWeekAgo);
            const oneWeekAgoDate = `${formattedDate} ${oneWeekAgo
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            // Get today date
            const today = new Date();
            const todayDate = `${formattedDate} ${today
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            this.range =
              oneWeekAgoDate +
              "-" +
              todayDate +
              "," +
              today.toISOString().slice(0, 4);
          } else if (this.selectedPeriod === "Last 30 Days") {
            this.showBlock1 = false;
            this.showWeek = false;
            this.showMonth = true;
            let data = {
              date: this.dataDateDefault,
            };
            this.getweekmonthdata(data);
             this.dataDate = data;

            // Get one month ago date
            const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const options = { month: "short" };
            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(oneMonthAgo);
            const oneMonthAgoDate = `${formattedDate} ${oneMonthAgo
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            // Get today date
            const today = new Date();
            const formattedDate2 = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(today);
            const todayDate = `${formattedDate2} ${today
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            this.range =
              oneMonthAgoDate +
              "-" +
              todayDate +
              "," +
              today.toISOString().slice(0, 4);
          } else {
            this.showBlock1 = true;
            this.showWeek = false;
            this.showMonth = false;
            if (newVal !== undefined && newVal !== null) {
              let data = {
                date: this.dataDateDefault,
              };
              this.getData(data);
            // this.dataDate = data;

            }
          }
        }
      },
    },

    singleDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showBlock1 = true;
          this.showWeek = false;
          this.showMonth = false;
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: [newVal, newVal],
            };
            // this.dataDate = data;
            this.dataDate = { date: [newVal, newVal] };

            // console.log(data);
            this.getData(data);
          }
        }
      },
    },
    rangeDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showBlock1 = false;
          this.showWeek = false;
          this.showMonth = true;
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: newVal,
            };
        this.dataDate = { date: newVal };

            // console.log(data);
            this.getweekmonthdata(data);
            this.dataDate = data;
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

.thick-card {
  border: 1px solid #ecf5ff;
}

.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}

th,
td {
  padding: 15px;
}
</style>
