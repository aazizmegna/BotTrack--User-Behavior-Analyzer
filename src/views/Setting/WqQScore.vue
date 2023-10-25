<template>
  <v-row>
    <v-card style="height: 380px" color="#ffffff">
      <v-row style="background: #ffeacc">
        <v-col>
          <h6>
            <v-icon color="info">mdi-information</v-icon>
            Below settings impacts Work Quality (WQ) score calculation
            algorithm.
          </h6>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="8" md="9">
          <h6>
            <v-icon color="#ffeb3b" size="70">mdi-circle-small</v-icon>
            Treat user as idle when there is no mouse or keyboard activity for
          </h6>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-select
            v-model="idle"
            :items="idleOptions"
            label="Select idle time"
            outlined
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="8" md="9">
          <h6>
            <v-icon color="#67c23a" size="70">mdi-circle-small</v-icon>
            While calculating Work Quaility (WQ) score include activities in
          </h6>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-select
            v-model="rule"
            :items="activitiesSending"
            item-text="rule"
            label="Select activity"
            outlined
            dense
          ></v-select>
          <v-col>
            <v-btn
              :disabled="!rule || !idle"
              @click="updateData"
              class="primary"
              >Save</v-btn
            >
          </v-col>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="8" md="9">
          <h6>
            <v-icon color="info">mdi-information</v-icon>
            All day (24 hours) option, includes Productive or Distrating
            activities outside of working hours. Idle time is ignored for out of
            working hours.
          </h6>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import { getidleinfo, updateIdle } from "@/services/companyService";
export default {
  data() {
    return {
      idle: null,
      rule: null,
      data: [],
      idleOptions: ["5 min", "10 min", "15 min", "20 min", "30 min"],
      activitiesSending: ["All day (24 hours)", "Working hours only"],
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
  getidleinfo().then((response) => {
    console.log(response.data);
    this.data = response.data.map((i) => {
      return {
        idle_time: i.idle_time + " min",
        idle: i.idle_time,
        rule: i.rules_of_calculating_point,
      };
    });
    if (this.data.length > 0) {
      this.idle = this.data[0].idle_time;
      this.rule = this.data[0].rule;
    }
  });
},

    updateData() {
      let data = {
        idle_time: parseInt(this.idle),
        rules_of_calculating_point: this.rule,
      };
      updateIdle(data);
    },
  },
};
</script>
