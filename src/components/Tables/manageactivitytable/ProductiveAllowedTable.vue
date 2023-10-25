<template>
  <div>
    <div v-if="isData">
      <v-simple-table fixed-header max-height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Affected Date</th>
              <th class="text-left">Assigned To</th>
              <th class="text-left">Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in activities" :key="item.created">
              <td>{{ item.period }}</td>
              <td>{{ item.staff }}</td>
              <td>{{ item.approvedby }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div v-if="isNoData">
      <v-simple-table fixed-header max-height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Affected Date</th>
              <th class="text-left">Assigned To</th>
              <th class="text-left">Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All Time</td>
              <td>All Users</td>
              <td>System</td>
            </tr>
          </tbody>
          <!-- <tbody>
          <tr>
            <td>This activity was afected by default</td>
          </tr>
        </tbody> -->
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
import { getSelectedActivitymanageRule } from "@/services/activityService";
import store from "@/store";
export default {
  name: "ProductiveAllowedTable",
  data() {
    return {
      activities: [],
      isData: false,
      isNoData: false,
    };
  },
  mounted() {
    this.getActivityData();
  },
  computed: {
    // Clicked manage activity id
    id() {
      return store.state.id;
    },
  },
  methods: {
    getActivityData() {
      getSelectedActivitymanageRule(this.id).then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          this.isData = true;
          this.isNoData = false;
        } else {
          this.isData = false;
          this.isNoData = true;
        }
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
            // requestedby: e.activity_classified_by,
            // category: e.cause_rule,
            period: detail.join(" - "),
            //activity: e.activity_name,
            approvedby: e.activity_approved_by,
            staff: e.employee_name.join(", "),
          };
        });
      });

      this.loader = false;
    },
  },
};
</script>
