<template>
  <v-card>
    <v-card-title>
      {{title}}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :sort-by="[
        'duration',
      ]"
      :sort-desc="[false, true]"
      :headers="headers"
      :items="activitiesData"
      hide-default-footer
      height="450"
      :loading="loader"
      loading-text="Loading..."
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "RequestTable",
  props: ["activitiesData", "loader","title"],
  data() {
    return {
      headers: [
        {
          text: "Requested by",
          align: "start",
          sortable: true,
          value: "requestedby",
        },
        { text: "duration", value: "duration" },
        { text: "Activity", value: "activity" },
        { text: "Reason", value: "reason" },
        { text: "Rejected By", value: "rejectedby" },
      ],
    };
  },
};
</script>
