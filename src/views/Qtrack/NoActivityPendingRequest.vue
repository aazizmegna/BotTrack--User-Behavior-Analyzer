<template>
  <div>
    <PendingRequestWidget />
    <v-row>
      <v-card>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field
                  outlined
                  v-model="mainSearch"
                  label="Filter requested details"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  outlined
                  v-model="reqbySearch"
                  label="Requested by"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
    <br /><br />
    <v-row>
      <PendingRequestNoActivityTable
        :activitiesData="activities"
        :loader="loader"
        :title="Title"
      />
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
          <span v-if="props.page < totalPages - 3 && totalDisplayedPages > 5"
            >...</span
          >
          <span
            v-else-if="props.page >= totalPages - 3 && totalPages > 5"
            class="ellipsis"
            >...</span
          >
        </template>
      </v-pagination>
    </v-row>
  </div>
</template>
<script>
import PendingRequestNoActivityTable from "../../components/Tables/PendingRequestNoActivityTable.vue";
import PendingRequestWidget from "../../components/widget/PendingRequestWidget.vue";
import { getAllPendingidlrequest } from "../../services/makeProdService";
import { secondToHour } from "../../services/secondToHour";
export default {
  components: {
    PendingRequestNoActivityTable,
    PendingRequestWidget,
  },
  data() {
    return {
      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      totalActivities: 0,
      Title: "No Activities",
      loader: true,
      reqbySearch: null,
      mainSearch: null,
      activities: [],
      dataDate: {},
    };
  },
  mounted() {},
  methods: {
    getActivityData(data) {
      getAllPendingidlrequest(data).then((response) => {
        console.log(response.data);
        this.activities = response.data.map((e) => {
          const now = new Date();
            const last_seen = new Date(e.requested_date);

            const diff = now - last_seen;
            let last = "";
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




          return {
            requestedby: e.requested_by,
            duration: secondToHour(e.duration),
            total_duration: e.duration,
            class: e.activity_class,
            requesteddetail: e.cause,
            staff: "For: " + e.no_activity_for,
            date: e.date_intervale,
            requested_date: last,
            noact_id: e.id,
            act_recog_id: e.activity_recognition_id,
            employee_id: e.employee_id,
          };
        });
        this.totalActivities = response.total;
        this.loader = false;
      });
    },
  },
  computed: {
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
      immediate: true,
      handler() {
        let data = {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          searchrequestedby: this.reqbySearch,
          searchdesc: this.mainSearch,
        };
        this.getActivityData(data);
      },
      deep: true,
    },
    mainSearch: {
      handler() {
        let data = {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          searchrequestedby: this.reqbySearch,
          searchdesc: this.mainSearch,
        };
        this.getActivityData(data);
      },
      deep: true,
    },
    reqbySearch: {
      handler() {
        let data = {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          searchrequestedby: this.reqbySearch,
          searchdesc: this.mainSearch,
        };
        this.getActivityData(data);
      },
      deep: true,
    },
  },
};
</script>
