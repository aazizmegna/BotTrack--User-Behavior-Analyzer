<template>
  <div>
    <v-row>
      <v-card>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field
                  outlined
                  v-model="mainSearch"
                  label="Filter activities"
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
      <ApprouvedRequestTableActivity
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
import ApprouvedRequestTableActivity from "../../components/Tables/ApprouvedRequestTableActivity.vue";
import { getAllActvApprouvedrequest } from "../../services/makeProdService";
export default {
  components: {
    ApprouvedRequestTableActivity,
  },
  data() {
    return {
      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      totalActivities: 0,
      Title: "Activities",
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
      getAllActvApprouvedrequest(data).then((response) => {
        console.log(response.data);
        this.activities = response.data.map((e) => {
          let detail = [];
          let detail1 = e.start_end_rule[0];
          let detail2 = e.start_end_rule[e.start_end_rule.length - 1];

          if (detail1 === detail2) {
            detail = [detail1];
          } else {
            detail = [detail1, detail2]; 
          }
          return {
            requestedby: e.activity_classified_by,
            category: e.cause_rule,
            period: detail.join(" - "),
            activity: e.activity_name,
            approvedby: e.activity_approved_by,
            staff: "For: " + e.employee_name.join(", "),
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


