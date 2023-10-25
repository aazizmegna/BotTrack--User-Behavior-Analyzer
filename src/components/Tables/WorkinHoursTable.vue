<template>
  <div>
    <br />
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Working Hours
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :sort-by="['date', 'totaltime']"
            :sort-desc="[false, true]"
            :headers="headers"
            :items="datas"
            :search="search"
            height="500"
            :loading="loader"
            loading-text="Loading..."
            :pagination.sync="pagination"
            :items-per-page="pagination.itemsPerPage"
            hide-default-footer
          >
          <template #item="{ item , index }">
            <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      

              <td class="border-cell">{{ item.date }}</td>
              <td class="border-cell">{{ item.user }}</td>
              <td class="border-cell">{{ item.starttime }}</td>
              <td class="border-cell">{{ item.endtime }}</td>
              <td class="border-cell">{{ item.productivity }}</td>
              <td class="border-cell">{{ item.distracting }}</td>
              <td class="border-cell">{{ item.undefined }}</td>
              <td class="border-cell">{{ item.totaltime }}</td>
              <td class="border-cell">{{ item.noactivity }}</td>
    
            </tr>
         </template>
        </v-data-table>
          <v-pagination
            :length="totalDisplayedPages"
            v-model="pagination.page"
            :total-items="totalItems"
            :items-per-page="pagination.itemsPerPage"
            @update:pagination="(val) => (pagination.page = val)"
            show-arrows
            small
          >
            <template v-slot:prevIcon>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
            <template v-slot:nextIcon>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
            <template v-slot:after="props">
              <span
                v-if="props.page < totalPages - 3 && totalDisplayedPages > 5"
                >...</span
              >
              <span
                v-else-if="props.page >= totalPages - 3 && totalPages > 5"
                class="ellipsis"
                >...</span
              >
            </template>
          </v-pagination>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
//import { secondToHour } from "../../services/secondToHour";
import { getWorkingHFilter } from "@/services/activityService";
import { secondToHour } from "@/services/secondToHour";

export default {
  name: "CategoriesTable",
  data() {
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      selectedRowIndex: 0,

      loader: true,
      title: "",
      search: "",
      dataDate: {},
      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      filteredLogs: [],
      totalActivities: 0,
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
        },
        { text: "User", value: "user" },
        { text: "First Activity ", value: "starttime" },
        { text: "Last Activity", value: "endtime" },
        { text: "Productivity", value: "productivity" },
        { text: "Unroductivity", value: "distracting" },
        { text: "Undifined", value: "undefined" },
        { text: "Total Time", value: "totaltime" },
        { text: "No Activity", value: "noactivity" },
      ],
      datas: [],
      datatoday: [],
    };
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
    async getArchival(data) {
      await getWorkingHFilter(
        this.userId,
        data,
        this.pagination.page,
        this.pagination.itemsPerPage
      ).then((response) => {
        console.log(response.data);
        const resp = response.data;

        this.datatoday = resp.map((r) => {
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

          let result = r.working_day;

          if (result === undefined) {
            result = this.dataDate.date[0];
          }
          return {
            date:
              new Intl.DateTimeFormat("en-US", options).format(
                new Date(result)
              ) +
              "(" +
              new Intl.DateTimeFormat("en-US", options2).format(
                new Date(result)
              ) +
              ")",
            totaltime: secondToHour(
              r.productivity + r.nonproductivity + r.undefined + r.noactivity
            ),
            starttime: start,
            endtime: end,
            productivity: secondToHour(r.productivity || 0.01),
            distracting: secondToHour(r.nonproductivity || 0.01),
            undefined: secondToHour(r.undefined || 0.01),
            noactivity: secondToHour(r.noactivity || 0.01),
            user: r.name,
          };
        });
        this.datas = this.datatoday;
        this.totalActivities = response.total;
        this.loader = false;
      });
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

    totalItems() {
      return this.totalActivities;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pagination.itemsPerPage);
    },
    totalDisplayedPages() {
      if (this.totalPages <= 5) {
        return this.totalPages;
      } else if (this.pagination.page <= 3) {
        return 5;
      } else if (this.pagination.page >= this.totalPages - 1) {
        return this.totalPages;
      } else {
        return this.pagination.page + 1;
      }
    },
  },

  watch: {
    pagination: {
      handler() {
         let data = {
              date: this.dataDateDefault,
            };
          this.getArchival(data);
      },
      deep: true,
    },

    datatoday: {
      handler(newVal) {
        this.datas = newVal;
      },
      deep: true,
    },
    userId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
           let data = {
              date: this.dataDateDefault,
            };
            this.getArchival(data);
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
            this.getArchival(data);
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
            this.getArchival(data);
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
            this.getArchival(data);
          }
        }
      },
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
.pointer-cursor {
  cursor: pointer;
}

.my-table {
  overflow-y: scroll;
  height: 500px;
}
</style>
