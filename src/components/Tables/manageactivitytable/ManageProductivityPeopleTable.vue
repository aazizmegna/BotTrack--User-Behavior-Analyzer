<template>
  <v-data-table
    :sort-desc="[false, true]"
    :headers="headers"
    :items="activity"
    :search="search"
    height="550"
    :loading="loader"
    loading-text="Loading..."
  ></v-data-table>
</template>
<script>
import { getSelectedActivitymanage } from "../../../services/activityService";
import { secondToHour } from "../../../services/secondToHour";
import store from "@/store";

export default {
  name: "ManageProductivityPeopleTable",
  data() {
    return {
      activity: [],
      loader: true,
      mangeId: null, 
      headers: [
        {
          text: "name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Time Spent", value: "time" },
        { text: "Last Seen", value: "lastseen" },
      ],
    };
  },

  created() {
    this.mangeId = this.$route.params.id
    this.fetchActivityDetails();
  },
  computed: {
    id() {
      return store.state.id;
    },
  },
  methods: {
    fetchActivityDetails() {
      getSelectedActivitymanage(this.mangeId)
        .then((response) => {
          console.log(response);
          const rep = response.data;

          this.activity = rep.map((r) => {
            const now = new Date();
            const last_seen = new Date(r.last_seen);

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
              lastseen: last,
              time: secondToHour(r.duration),
              name: r.employee_name,
            };
          });
          this.loader = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
