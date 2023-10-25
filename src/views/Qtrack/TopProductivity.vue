<template>
  <div>
    <v-row>
      <v-col lg="10" align-self="center">
        <ProductivityChart :seriesData="seriesData" :labelsData="labelsDataProd" />
      </v-col> </v-row><br /><br /><br /><br />
    <v-row>
      <v-col>
        <GanttChart />
      </v-col> </v-row><br /><br />
    <v-row>
      <v-col>
        <GanttChart /> 
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProductivityChart from "../../components/Charts/ProductivityChart.vue";
import GanttChart from "../../components/Charts/GanttChart.vue";
import store from "@/store";
import app from '../../App.vue'
import { getProductivityFilter } from '@/services/activityService';
export default {
  components: {
    ProductivityChart,
    GanttChart,
  },

  data() {
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      seriesData: [],
      seriesDataTod: [],
      seriesTod: [],
      labelsDataProd: [],
      dataDate: {},
      productivityData: ""
    };
  },

  methods: {
    async fetchData() {
      const productivityChart = new app();
      this.productivityData = productivityChart.myfunction();
      console.log('cuduiidid', this.productivityData)
    },
    async getProductivity(data) {
      await Promise.all([
        getProductivityFilter(this.userId, data).then((response) => {
          const dataCat = response.data;
          //console.log(dataCat);
          this.seriesDataTod = dataCat.map((i) => {
            return {
              productivity: i.productivity || 0.1,
              distracting: i.nonproductivity || 0.1,
              undefined: i.undefined || 0.1, // add default value for undefined property
              noactivity: i.noactivity || 0.1,
            };
          });
          this.seriesTod = [];
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

                this.labelsDataProd = [
                  "Productivity",
                  "Distracting",
                  "Undefined",
                  "No activity",
                ];
              }
            }
            this.seriesData = this.seriesTod;
          } else {
            this.seriesData = this.seriesTod;
            this.labelsDataProd = [];
          }
        }),
      ]);
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
            this.getProductivity(data);
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
            this.getProductivity(data);
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
            this.getProductivity(data);
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
            this.getProductivity(data);
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