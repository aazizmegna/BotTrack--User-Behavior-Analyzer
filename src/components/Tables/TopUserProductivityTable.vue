<template>
  <div>
    <v-card>
      <v-card-title>
        Top users and Group
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search User"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        :loading="loader"
        loading-text="Loading..."
        height="450"
        class="custom-header"

        >
        <template #item="{ item , index }">
          <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
            <td class="border-cell">{{ item.User }}</td>
            <td class="border-cell">{{ item.Productivity }}</td>
            <td class="border-cell">{{ item.Distracting }}</td>
            <td class="border-cell">{{ item.Noactivity }}</td>
            <td class="border-cell">{{ item.Undefined }}</td>
            <td class="border-cell">{{ item.Total }}</td>

            <td class="border-cell">          <v-progress-linear
              :background-opacity="0.3"
              :buffer-value="100"
              :height="25"
              :width="150"
              :rounded="true"
              color="green"
              clickable="true"
              style="pointer-events: none"
              :value="item.Progress"
            >
              <div>{{ Math.ceil(item.Progress) }}%</div>
            </v-progress-linear></td>

          </tr>
       </template>
        <template v-slot:[`item.Progress`]="{ item }">
          <v-progress-linear
            :background-opacity="0.3"
            :buffer-value="100"
            :height="25"
            :width="150"
            :rounded="true"
            color="green"
            clickable="true"
            style="pointer-events: none"
            :value="item.Progress"
          >
            <div>{{ Math.ceil(item.Progress) }}%</div>
          </v-progress-linear>
        </template></v-data-table
      >
    </v-card>
  </div>
</template>
<script>
import { getProductivityFilter } from "../../services/activityService";
import { secondToHour } from "../../services/secondToHour";
import store from "@/store";
export default {
  name: "TopUserProductivityTable",

  data() {
    return {
      search:"",
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      loader: true,
      selectedRowIndex: 0,
      headers: [
        {
          text: "User",
          align: "start",
          value: "User",
        },
        { text: "Productivity", value: "Productivity" },
        { text: "Distracting", value: "Distracting" },
        { text: "No-activity", value: "Noactivity" },
        { text: "Undefined", value: "Undefined" },
        { text: "Total", value: "Total" },
        { text: "Productivity Ratio", value: "Progress" },
      ],

      data: [],
      datatoday: [],
      datayesterday: [],
      datamonth: [],
      dataweek: [],
      dataDate: {},
    };
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
    getArchivaltoday(data) {
      getProductivityFilter(this.userId, data).then((response) => {
        console.log(response.data);
        this.datatoday = response.data.map((r) => {
          const totalDuration =
            r.productivity + r.nonproductivity + r.undefined + r.noactivity;
          const progress = (r.productivity / totalDuration) * 100;
          return {
            Total: secondToHour(
              r.productivity + r.nonproductivity + r.undefined + r.noactivity
            ),
            Productivity: secondToHour(r.productivity || 0.01),
            Distracting: secondToHour(r.nonproductivity || 0.01),
            Undefined: secondToHour(r.undefined || 0.1),
            Noactivity: secondToHour(r.noactivity || 0.1),
            User: r.name,
            Progress: progress,
          };
        });
        this.data = this.datatoday;
        this.loader = false;
        console.log(this.defaultDate)
      });
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
            this.getArchivaltoday(data);
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
            this.getArchivaltoday(data);
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
            this.getArchivaltoday(data);
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
            this.getArchivaltoday(data);
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
::v-deep .v-data-table .v-data-table-header {
  background-color: #FAFAFA !important; 

}
::v-deep .selected-row {
  background-color: #626c75 !important;
  color: #fff !important;
}

.custom-header {
  border: 1px solid rgb(206, 206, 206); /* Ajoutez les styles de bordure que vous préférez */
  background-color: rgb(241, 241, 241) !important; 
  padding: 8px; /* Ajoutez le rembourrage que vous préférez */
}
</style>