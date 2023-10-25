<template>
  <div>
    <v-row>
        <v-card>
          <v-card-title>
            Activity Count
            <v-spacer></v-spacer>
            <v-text-field
              v-model="mainSearch"
              append-icon="mdi-magnify"
              label="Search Activity"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :sort-by="[
              'visitedtimes',
            ]"
            :sort-desc="[false, true]"
            :headers="headers"
            :items="pagedLogs"
            hide-default-footer
            :search="search"
            height="550"
            :loading="loader"
            loading-text="Loading..."
            :pagination.sync="pagination"
            :items-per-page="pagination.itemsPerPage"
          >
          <template #item="{ item , index }">
            <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
              <td class="border-cell">{{ item.activityname }}</td>
              <td class="border-cell">{{ item.activitytitle }}</td>
              <td class="border-cell">{{ formatDate(item.activitydate) }}</td>
              <td class="border-cell">{{ item.duration }}</td>
              <td class="border-cell">{{ item.visitedtimes }}</td>
  

  
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
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
//import { secondToHour } from "../../services/secondToHour";
import { getActivityCountFilter } from "@/services/activityService";
import { secondToHour } from "@/services/secondToHour";

export default {
  name: "ActivitiesCount",
  data() {
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      mainSearch: undefined,
      subitems: [],
      clickedItemName: "",
      clickedCatId: null,
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
      selectedRowIndex: 0,

      headers: [
        {
          text: "Activity Name",
          align: "start",
          sortable: true,
          value: "activityname",
        },
        { text: "Activity Title", value: "activitytitle" },
        { text: "Activity Date", value: "activitydate" },
        { text: "Duration", value: "duration" },
        
        { text: "Visited Time", value: "visitedtimes" },
      ],
      pagedLogs: [],
    };
  },
  methods: {
    formatDate(timestamp) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Date(timestamp);
      return date.toLocaleString("en-US", options);
    },
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },

    async getArchival(data) {
      await getActivityCountFilter(
        this.userId,
        data,
        this.pagination.page,
        this.pagination.itemsPerPage
      ).then((response) => {
        console.log(response.data);
        const resp = response.data;
        this.today = resp.map((d) => {
          return {
            activityname: d.activity,
            duration: secondToHour(d.duration),
            activitytitle: d.title,
            activitydate: d.activity_date,
            visitedtimes: d.visited_time,
          };
        });
        this.totalActivities = response.total;
        this.pagedLogs = this.today;
        this.loader = false;
      });
    },

  },
  //mounted(){this.getArchival()},

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
    pagedLogs: {
      handler() {
        this.subitems = [];
        this.clickedItemName = "";
      },
      deep: true,
    },
   pagination: {
      handler() {
        let data = {
          date: this.dataDateDefault,
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage
        };
        this.getArchival(data);
      },
      deep: true,
    },
    userId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: this.dataDateDefault,
            };
            this.getArchival(data);
            this.dataDate = data;
            this.pagination.page = 1;
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
            this.pagination.page = 1;
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
            this.pagination.page = 1;
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
            this.pagination.page = 1;
          }
        }
      },
    },

    mainSearch: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            date: this.dataDateDefault,
            search: this.mainSearch,
          };
          //console.log(data)
          this.getArchival(data);
          this.dataDate = data;
          this.pagination.page = 1;
        }
      },
    },
  },
};
</script>
<style scoped>
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
