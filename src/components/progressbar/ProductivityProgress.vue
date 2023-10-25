<template>
  <div>
    <v-card min-height="400" class="smooth-card">
      <v-card-title class="title card-subtitle-line-prod smooth-card-title"
        >Productivity</v-card-title
      >
      <div v-for="item in productivityweb.slice(0, 4)" :key="item.title">
        <v-card-text>
          <div>
            <div class="item">
              <div class="icon">
                <v-btn icon @click="showSubitems(item)"
                  ><v-icon>mdi-expand-all</v-icon></v-btn
                >
                <img
                  src="https://www.youtube.com/favicon.ico"
                  alt="YouTube Favicon"
                />
                {{ item.title }}
              </div>
              <div class="time">
                {{ item.time }}
              </div>
            </div>
            <v-progress-linear
              v-model="item.percent"
              color="green"
              stream
            ></v-progress-linear>
          </div>
        </v-card-text>
      </div>
      <v-expand-transition>
        <div v-if="expandedUn">
          <div v-for="item in productivityweb.slice(4)" :key="item.title">
            <v-card-text>
              <div>
                <div class="item">
                  <div class="icon">
                    <v-btn icon @click="showSubitems(item)"
                      ><v-icon>mdi-expand-all</v-icon></v-btn
                    >
                    {{ item.title }}
                  </div>
                  <div class="time">
                    {{ item.time }}
                  </div>
                </div>
                <v-progress-linear
                  v-model="item.percent"
                  color="green"
                  stream
                ></v-progress-linear>
              </div>
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
      <div class="moreless" v-if="productivityweb.length > 4">
        <span
          @click="expandedUn = !expandedUn"
          v-if="!expandedUn"
          :class="{ 'pointer-cursor': true }"
          >Show more</span
        >
        <span
          @click="expandedUn = !expandedUn"
          v-if="expandedUn"
          :class="{ 'pointer-cursor': true }"
          >Show less</span
        >
      </div>
    </v-card>
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
            <v-progress-linear
              v-model="subitem.percent"
              color="green"
              stream
            ></v-progress-linear>
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
import store from "@/store";
import { getSubActToday, getSubActYesterday, getTopAppFilterTitle } from "@/services/activityService";
import { secondToHour } from '@/services/secondToHour';

Vue.use(Vuetify);
export default {
  name: "ProductivityProgress",
  props: {
    productivityweb: Array,
  },
  data() { 
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      subData: [],
      dataToday: [],
      dataYesterday: [],
      expandedUn: false,
      showDialog: false,
      selectedItem: null,
      selectedacrId: null,
      mydate: 1,
      dataDate: {
        date: [new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10)]
      },

    };
  },
  methods: {
    showSubitems(item) {
      this.selectedItem = item;
      this.selectedacrId = item.acrId;
      //console.log(this.selectedacrId);
      this.getSubApp(this.dataDate);

      // this.getSubActivity(this.mydate);
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.subData = []
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
      console.log('ma date: ',data);

      if (data === 1) {

      getSubActToday(this.userId, this.selectedacrId).then((response) => {
        const resp = response.data;
        //console.log(resp);
        this.dataToday = resp.map((r) => {
          return {
            title: r.title_name,
            percent: r.percentage,
            time: secondToHour(r.duration),
          };
        });
        this.subData = this.dataToday;
      });} else if (data === 2) {
      getSubActYesterday(this.userId, this.selectedacrId).then((response) => {
        const resp = response.data;
        //console.log(resp);
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
      if (this.selectedPeriod === "Today") {
        this.subData = this.dataToday;
        this.mydate = 1;
        console.log('date ',this.mydate);

      } else if (this.selectedPeriod === "Yesterday") {
        this.subData = this.dataYesterday;
        this.mydate = 2;
        console.log('date ',this.mydate);

      }
    },
  },
  mounted() {
    this.dateData = this.dataDateDefault;
    this.getSubApp(this.dataDate);

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
  filters: {
    truncate(value, limit) {
      if (value.length > limit) {
        value = value.substring(0, limit) + "...";
      }
      return value;
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

.card-subtitle-line-prod {
  border-bottom: 1px solid #00c853;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
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

.time2 {
  margin-left: auto;
  text-align: end;
}

.pointer-cursor {
  cursor: pointer;
}
</style>
